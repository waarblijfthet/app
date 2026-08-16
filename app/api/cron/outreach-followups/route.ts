import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import {
  Doelgroep,
  MAX_FOLLOWUPS,
  eersteMail,
  followupMail,
  haalHandtekening,
  naarHtml,
  naarText,
} from "@/lib/outreach/mails";
import { afmeldApiUrl, afmeldPaginaUrl } from "@/lib/outreach/afmelden";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Cadans uit de outreach-strategie: FU1 op dag 3-4, FU2 op dag 8-9.
const FU1_NA_DAGEN = 3;
const FU2_NA_VORIGE_DAGEN = 5;
// Vangrail: nooit meer dan dit aantal automatische mails per dag.
const MAX_PER_RUN = 20;

// GET /api/cron/outreach-followups (dagelijks via Vercel cron)
// Verstuurt automatisch follow-up 1 (mail 2) en follow-up 2 (mail 3) voor
// contacten die eraan toe zijn, maar allebei alleen als hun eigen toggle
// ("tweedeMailAutomatisch" / "derdeMailAutomatisch" in outreach_instellingen,
// sleutel "automatisering", zelfde patroon als "eersteMailAutomatisch", zie
// app/api/admin/outreach/automatisering/route.ts) aan staat. Beide default
// UIT: zonder toggle verandert er niets aan het bestaande gedrag, blijft een
// follow-up een bewuste, handmatige actie in /admin/outreach. De twee
// toggles staan los van elkaar, dus mail 2 kan automatisch gaan terwijl
// mail 3 nog handmatig blijft (of omgekeerd).
// OUTREACH_AUTO_FOLLOWUP=uit blijft daarnaast werken als harde noodstop die
// alles uitzet, los van de toggles (handmatige knoppen blijven werken).
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();
  const handtekening = await haalHandtekening();

  if (process.env.OUTREACH_AUTO_FOLLOWUP === "uit") {
    await supabase.from("cron_runs").insert({
      job: "outreach-followups",
      duration_ms: Date.now() - start,
      status: "ok",
      result: { overgeslagen: "OUTREACH_AUTO_FOLLOWUP=uit" },
    });
    return NextResponse.json({ ok: true, overgeslagen: true });
  }

  const { data: instelling } = await supabase
    .from("outreach_instellingen")
    .select("waarde")
    .eq("sleutel", "automatisering")
    .maybeSingle();
  const waarde = instelling?.waarde as
    | { tweedeMailAutomatisch?: boolean; derdeMailAutomatisch?: boolean }
    | null;
  const mail2Aan = Boolean(waarde?.tweedeMailAutomatisch);
  const mail3Aan = Boolean(waarde?.derdeMailAutomatisch);

  if (!mail2Aan && !mail3Aan) {
    await supabase.from("cron_runs").insert({
      job: "outreach-followups",
      duration_ms: Date.now() - start,
      status: "ok",
      result: { overgeslagen: "tweedeMailAutomatisch en derdeMailAutomatisch staan beide uit" },
    });
    return NextResponse.json({ ok: true, overgeslagen: true });
  }

  // Kandidaten: eerste mail gehad, nog geen reactie of bounce, minder dan 2 follow-ups,
  // en niet handmatig gestopt (los van status, zie outreach_crm.sql).
  const { data: kandidaten, error } = await supabase
    .from("outreach_contacts")
    .select("*")
    .in("status", ["verstuurd", "geopend", "geklikt"])
    .lt("followups", MAX_FOLLOWUPS)
    .eq("gestopt", false)
    .limit(200);
  if (error) {
    await supabase.from("cron_runs").insert({
      job: "outreach-followups",
      duration_ms: Date.now() - start,
      status: "error",
      result: { fout: error.message },
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const nu = Date.now();
  const due = (kandidaten ?? [])
    .filter((c) => {
      if ((c.followups ?? 0) === 0) {
        if (!mail2Aan) return false;
        if (!c.verstuurd_at) return false;
        return (nu - new Date(c.verstuurd_at).getTime()) / 86400000 >= FU1_NA_DAGEN;
      }
      if (!mail3Aan) return false;
      if (!c.laatste_followup_at) return false;
      return (nu - new Date(c.laatste_followup_at).getTime()) / 86400000 >= FU2_NA_VORIGE_DAGEN;
    })
    .slice(0, MAX_PER_RUN);

  // Blocklist-check, zelfde vangnet als in de send-route en de eerste-mail-cron.
  // Iemand die zich afmeldt gaat op gestopt (dus hij valt hierboven al af),
  // maar een adres kan ook op andere manieren op de blocklist komen; dat mag
  // nooit alsnog een follow-up krijgen. Zie app/api/afmelden/[token]/route.ts.
  const dueEmails = due.map((c) => c.email as string);
  const { data: geblokkeerd } = await supabase
    .from("email_blocklist")
    .select("email")
    .in("email", dueEmails.length > 0 ? dueEmails : [""]);
  const blocklist = new Set((geblokkeerd ?? []).map((b) => b.email));

  const resend = new Resend(process.env.RESEND_API_KEY);
  let verstuurd = 0;
  const fouten: string[] = [];

  for (const contact of due) {
    if (blocklist.has(contact.email)) continue;
    try {
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;
      const eersteSubject = (await eersteMail(contact.naam, doelgroep)).subject;
      const mail = await followupMail(contact.naam, doelgroep, (contact.followups ?? 0) + 1, eersteSubject);
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
          followups: (contact.followups ?? 0) + 1,
          laatste_followup_at: new Date().toISOString(),
          resend_id: verzonden?.id ?? null,
        })
        .eq("id", contact.id);

      // Zelfde outreach_mails/contact_notities-schrijfactie als de handmatige
      // send-route (app/api/admin/outreach/send/route.ts), zodat de
      // mailhistorie compleet is ongeacht of het contact automatisch of
      // handmatig een follow-up kreeg. Wachttijdlogica en volgorde hierboven
      // blijven ongewijzigd.
      const mailNummer = (contact.followups ?? 0) + 2;
      await supabase.from("outreach_mails").upsert(
        {
          contact_id: contact.id,
          nummer: mailNummer,
          verstuurd_at: new Date().toISOString(),
          resend_id: verzonden?.id ?? null,
        },
        { onConflict: "contact_id,nummer" }
      );
      await supabase.from("contact_notities").insert({
        outreach_contact_id: contact.id,
        soort: "systeem",
        tekst: `Mail ${mailNummer} automatisch verstuurd (cron).`,
      });

      verstuurd += 1;
    } catch (err: unknown) {
      fouten.push(`${contact.naam}: ${err instanceof Error ? err.message : "onbekende fout"}`);
    }

    if (due.indexOf(contact) < due.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }

  await supabase.from("cron_runs").insert({
    job: "outreach-followups",
    duration_ms: Date.now() - start,
    status: fouten.length > 0 ? "error" : "ok",
    result: { kandidaten: due.length, verstuurd, fouten, mail2Aan, mail3Aan },
  });

  return NextResponse.json({ ok: true, kandidaten: due.length, verstuurd, fouten });
}
