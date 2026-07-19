import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  Doelgroep,
  FOLLOWUP_WACHTDAGEN,
  MAX_FOLLOWUPS,
  eersteMail,
  followupMail,
  naarText,
} from "@/lib/outreach/mails";

// POST /api/admin/outreach/preview
// Body: { ids: string[], type?: "followup" }
// Bouwt de mails die verstuurd zouden worden, zonder te versturen.
// De admin toont dit als controle-overzicht voor bulk-verzending.
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();
  const ids: string[] = body.ids ?? [];
  const isFollowup = body.type === "followup";
  if (ids.length === 0) {
    return NextResponse.json({ error: "ids ontbreken" }, { status: 400 });
  }

  const query = supabase.from("outreach_contacts").select("*").in("id", ids);
  const { data: contacten, error } = isFollowup
    ? await query.in("status", ["verstuurd", "geopend", "geklikt"])
    : await query.eq("status", "nieuw");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  interface PreviewItem {
    id: string;
    naam: string;
    email: string;
    doelgroep: string;
    plaats: string | null;
    mailNummer: number;
    subject: string;
    text: string;
    heeftPsZin: boolean;
  }
  const items: PreviewItem[] = [];
  const overgeslagen: { naam: string; reden: string }[] = [];

  for (const contact of contacten ?? []) {
    const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;
    if (isFollowup) {
      const alGedaan: number = contact.followups ?? 0;
      if (alGedaan >= MAX_FOLLOWUPS) {
        overgeslagen.push({ naam: contact.naam, reden: "max follow-ups bereikt" });
        continue;
      }
      const laatste = new Date(contact.laatste_followup_at ?? contact.verstuurd_at ?? 0);
      const dagen = (Date.now() - laatste.getTime()) / 86400000;
      if (dagen < FOLLOWUP_WACHTDAGEN) {
        overgeslagen.push({ naam: contact.naam, reden: `laatste mail is ${Math.floor(dagen)} dag(en) oud` });
        continue;
      }
      const eersteSubject = eersteMail(contact.naam, doelgroep).subject;
      const mail = followupMail(contact.naam, doelgroep, alGedaan + 1, eersteSubject);
      items.push({
        id: contact.id, naam: contact.naam, email: contact.email,
        doelgroep, plaats: contact.plaats ?? null,
        mailNummer: alGedaan + 2, subject: mail.subject, text: naarText(mail.alineas),
        heeftPsZin: true,
      });
    } else {
      const mail = eersteMail(contact.naam, doelgroep, contact.ps_zin, contact.plaats);
      items.push({
        id: contact.id, naam: contact.naam, email: contact.email,
        doelgroep, plaats: contact.plaats ?? null,
        mailNummer: 1, subject: mail.subject, text: naarText(mail.alineas),
        heeftPsZin: Boolean(contact.ps_zin && String(contact.ps_zin).trim()),
      });
    }
  }

  return NextResponse.json({ items, overgeslagen });
}
