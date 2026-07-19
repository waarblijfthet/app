import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import {
  Doelgroep,
  MAX_FOLLOWUPS,
  eersteMail,
  followupMail,
  naarHtml,
  naarText,
} from "@/lib/outreach/mails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Cadans uit de outreach-strategie: FU1 op dag 3-4, FU2 op dag 8-9.
const FU1_NA_DAGEN = 3;
const FU2_NA_VORIGE_DAGEN = 5;
// Vangrail: nooit meer dan dit aantal automatische mails per dag.
const MAX_PER_RUN = 20;

// GET /api/cron/outreach-followups (dagelijks via Vercel cron)
// Verstuurt automatisch follow-up 1 en 2 voor contacten die eraan toe zijn.
// Uitzetten kan met env OUTREACH_AUTO_FOLLOWUP=uit (handmatige knoppen blijven werken).
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();

  if (process.env.OUTREACH_AUTO_FOLLOWUP === "uit") {
    await supabase.from("cron_runs").insert({
      job: "outreach-followups",
      duration_ms: Date.now() - start,
      status: "ok",
      result: { overgeslagen: "OUTREACH_AUTO_FOLLOWUP=uit" },
    });
    return NextResponse.json({ ok: true, overgeslagen: true });
  }

  // Kandidaten: eerste mail gehad, nog geen reactie of bounce, minder dan 2 follow-ups.
  const { data: kandidaten, error } = await supabase
    .from("outreach_contacts")
    .select("*")
    .in("status", ["verstuurd", "geopend", "geklikt"])
    .lt("followups", MAX_FOLLOWUPS)
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
        if (!c.verstuurd_at) return false;
        return (nu - new Date(c.verstuurd_at).getTime()) / 86400000 >= FU1_NA_DAGEN;
      }
      if (!c.laatste_followup_at) return false;
      return (nu - new Date(c.laatste_followup_at).getTime()) / 86400000 >= FU2_NA_VORIGE_DAGEN;
    })
    .slice(0, MAX_PER_RUN);

  const resend = new Resend(process.env.RESEND_API_KEY);
  let verstuurd = 0;
  const fouten: string[] = [];

  for (const contact of due) {
    try {
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;
      const eersteSubject = eersteMail(contact.naam, doelgroep).subject;
      const mail = followupMail(contact.naam, doelgroep, (contact.followups ?? 0) + 1, eersteSubject);

      const { data: verzonden, error: sendError } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject: mail.subject,
        html: naarHtml(mail.alineas),
        text: naarText(mail.alineas),
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
    result: { kandidaten: due.length, verstuurd, fouten },
  });

  return NextResponse.json({ ok: true, kandidaten: due.length, verstuurd, fouten });
}
