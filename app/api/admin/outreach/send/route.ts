import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  Doelgroep,
  FOLLOWUP_WACHTDAGEN,
  MAX_FOLLOWUPS,
  Mail,
  eersteMail,
  followupMail,
  naarHtml,
  naarText,
} from "@/lib/outreach/mails";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Versturen ────────────────────────────────────────────────────────────────
// POST /api/admin/outreach/send
// Body: { id: string } of { ids: string[] }       , eerste mail (status 'nieuw')
// Body: { ids: string[], type: "followup" }       , follow-up (max 2, na 3+ dagen)
// Follow-ups gaan daarnaast automatisch via /api/cron/outreach-followups.

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();

  const ids: string[] = body.ids ?? (body.id ? [body.id] : []);
  const isFollowup = body.type === "followup";
  if (ids.length === 0) {
    return NextResponse.json({ error: "id(s) ontbreken" }, { status: 400 });
  }

  const query = supabase.from("outreach_contacts").select("*").in("id", ids);
  const { data: contacten, error: fetchError } = isFollowup
    ? await query.in("status", ["verstuurd", "geopend", "geklikt"])
    : await query.eq("status", "nieuw");

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!contacten || contacten.length === 0) {
    return NextResponse.json(
      { error: isFollowup ? "Geen contacten die een follow-up kunnen krijgen" : "Geen nieuwe contacten gevonden" },
      { status: 404 }
    );
  }

  const resultaten: { id: string; naam: string; ok: boolean; fout?: string }[] = [];

  for (const contact of contacten) {
    try {
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;

      let mail: Mail;
      if (isFollowup) {
        const alGedaan: number = contact.followups ?? 0;
        if (alGedaan >= MAX_FOLLOWUPS) {
          resultaten.push({ id: contact.id, naam: contact.naam, ok: false, fout: "Max follow-ups bereikt" });
          continue;
        }
        const laatsteContact = new Date(contact.laatste_followup_at ?? contact.verstuurd_at ?? 0);
        const dagenGeleden = (Date.now() - laatsteContact.getTime()) / 86400000;
        if (dagenGeleden < FOLLOWUP_WACHTDAGEN) {
          resultaten.push({
            id: contact.id, naam: contact.naam, ok: false,
            fout: `Laatste mail is ${Math.floor(dagenGeleden)} dag(en) oud, wacht minimaal ${FOLLOWUP_WACHTDAGEN}`,
          });
          continue;
        }
        const eersteSubject = eersteMail(contact.naam, doelgroep).subject;
        mail = followupMail(contact.naam, doelgroep, alGedaan + 1, eersteSubject);
      } else {
        mail = eersteMail(contact.naam, doelgroep, contact.ps_zin, contact.plaats);
      }

      const { data: verzonden } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject: mail.subject,
        html: naarHtml(mail.alineas),
        text: naarText(mail.alineas),
      });

      const update = isFollowup
        ? {
            followups: (contact.followups ?? 0) + 1,
            laatste_followup_at: new Date().toISOString(),
            resend_id: verzonden?.id ?? null,
          }
        : {
            status: "verstuurd",
            verstuurd_at: new Date().toISOString(),
            resend_id: verzonden?.id ?? null,
          };

      await supabase.from("outreach_contacts").update(update).eq("id", contact.id);

      resultaten.push({ id: contact.id, naam: contact.naam, ok: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Onbekende fout";
      resultaten.push({ id: contact.id, naam: contact.naam, ok: false, fout: message });
    }

    if (contacten.indexOf(contact) < contacten.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }

  return NextResponse.json({ resultaten });
}
