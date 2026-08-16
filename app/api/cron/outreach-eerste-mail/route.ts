import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import {
  Doelgroep,
  eersteMail,
  haalHandtekening,
  naarHtml,
  naarText,
} from "@/lib/outreach/mails";
import { berekenDagbudget } from "@/lib/outreach/dagbudget";
import { afmeldApiUrl, afmeldPaginaUrl } from "@/lib/outreach/afmelden";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Extra harde bovengrens per run, los van het dagbudget: als iemand het
// dagbudget per ongeluk op een absurd getal zet, mag deze cron nooit in één
// keer honderden mails versturen.
const MAX_PER_RUN = 50;

// GET /api/cron/outreach-eerste-mail (dagelijks via Vercel cron, na de
// follow-up-cron). Verstuurt automatisch de eerste mail aan nieuwe contacten
// (status "nieuw"), maar alleen als de toggle "eersteMailAutomatisch" aan
// staat (sleutel "automatisering" in outreach_instellingen, standaard uit;
// zie app/api/admin/outreach/automatisering/route.ts). Zonder die toggle
// verandert er niets aan het bestaande gedrag: de eerste mail blijft dan
// een bewuste, handmatige actie in /admin/outreach.
//
// Respecteert hetzelfde dagbudget (lib/outreach/dagbudget.ts) als de
// werklijst en het Vandaag-dashboard laten zien, zodat automatisch en
// handmatig verzenden nooit samen boven het budget uitkomen: het budget
// telt alle vandaag verstuurde eerste mails, ongeacht de bron.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();

  const { data: instelling } = await supabase
    .from("outreach_instellingen")
    .select("waarde")
    .eq("sleutel", "automatisering")
    .maybeSingle();
  const aan = Boolean((instelling?.waarde as { eersteMailAutomatisch?: boolean } | null)?.eersteMailAutomatisch);

  if (!aan) {
    await supabase.from("cron_runs").insert({
      job: "outreach-eerste-mail",
      duration_ms: Date.now() - start,
      status: "ok",
      result: { overgeslagen: "eersteMailAutomatisch staat uit" },
    });
    return NextResponse.json({ ok: true, overgeslagen: true });
  }

  const dagbudget = await berekenDagbudget(supabase);
  const limiet = Math.max(0, Math.min(dagbudget.resterend, MAX_PER_RUN));

  if (limiet === 0) {
    await supabase.from("cron_runs").insert({
      job: "outreach-eerste-mail",
      duration_ms: Date.now() - start,
      status: "ok",
      result: { overgeslagen: "dagbudget vandaag al op", dagbudget },
    });
    return NextResponse.json({ ok: true, overgeslagen: true, dagbudget });
  }

  // Kandidaten: nieuw, niet gestopt, niet gearchiveerd. Oudste eerst (fair
  // wachten in de wachtrij), zelfde volgorde als de prospect-review ze aanlevert.
  const { data: kandidaten, error } = await supabase
    .from("outreach_contacts")
    .select("*")
    .eq("status", "nieuw")
    .eq("gestopt", false)
    .is("archived_at", null)
    .order("created_at", { ascending: true })
    .limit(limiet);
  if (error) {
    await supabase.from("cron_runs").insert({
      job: "outreach-eerste-mail",
      duration_ms: Date.now() - start,
      status: "error",
      result: { fout: error.message },
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const contacten = kandidaten ?? [];
  const emails = contacten.map((c) => c.email);
  const { data: geblokkeerd } = await supabase
    .from("email_blocklist")
    .select("email")
    .in("email", emails.length > 0 ? emails : [""]);
  const blocklist = new Set((geblokkeerd ?? []).map((b) => b.email));

  const handtekening = await haalHandtekening();
  const resend = new Resend(process.env.RESEND_API_KEY);
  let verstuurd = 0;
  const fouten: string[] = [];

  for (const contact of contacten) {
    if (blocklist.has(contact.email)) continue;
    try {
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;
      const mail = await eersteMail(contact.naam, doelgroep, contact.ps_zin, contact.plaats);
      // Zelfde afmeldlink als de handmatige send-route, zie lib/outreach/afmelden.ts.
      const paginaUrl = afmeldPaginaUrl(contact.afmeld_token);

      const { data: verzonden, error: sendError } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject: mail.subject,
        html: naarHtml(mail.alineas, handtekening, paginaUrl),
        text: naarText(mail.alineas, handtekening, paginaUrl),
        headers: {
          "List-Unsubscribe": `<${afmeldApiUrl(contact.afmeld_token)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      if (sendError) throw new Error(sendError.message);

      await supabase
        .from("outreach_contacts")
        .update({
          status: "verstuurd",
          verstuurd_at: new Date().toISOString(),
          resend_id: verzonden?.id ?? null,
        })
        .eq("id", contact.id);

      // Zelfde outreach_mails/contact_notities-schrijfactie als de
      // handmatige send-route en de follow-up-cron, zodat de mailhistorie
      // compleet is ongeacht de bron.
      await supabase.from("outreach_mails").upsert(
        {
          contact_id: contact.id,
          nummer: 1,
          verstuurd_at: new Date().toISOString(),
          resend_id: verzonden?.id ?? null,
        },
        { onConflict: "contact_id,nummer" }
      );
      await supabase.from("contact_notities").insert({
        outreach_contact_id: contact.id,
        soort: "systeem",
        tekst: "Mail 1 automatisch verstuurd (cron).",
      });

      verstuurd += 1;
    } catch (err: unknown) {
      fouten.push(`${contact.naam}: ${err instanceof Error ? err.message : "onbekende fout"}`);
    }

    if (contacten.indexOf(contact) < contacten.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }

  await supabase.from("cron_runs").insert({
    job: "outreach-eerste-mail",
    duration_ms: Date.now() - start,
    status: fouten.length > 0 ? "error" : "ok",
    result: { kandidaten: contacten.length, verstuurd, fouten, dagbudget },
  });

  return NextResponse.json({ ok: true, kandidaten: contacten.length, verstuurd, fouten });
}
