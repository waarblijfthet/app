import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { afmeldPaginaUrl } from "@/lib/outreach/afmelden";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/afmelden/<token>
//
// Publieke route (bewust niet onder /api/admin, dus buiten de matcher van
// middleware.ts): het afmeld_token uit de mail is het bewijs, niet een login.
// Twee bronnen komen hier binnen:
//   1. De knop op /afmelden/<token>, de zichtbare link in de mail.
//   2. De ingebouwde "Uitschrijven"-knop van Gmail/Outlook, via de
//      List-Unsubscribe- en List-Unsubscribe-Post-headers (RFC 8058). Die
//      stuurt een POST met body "List-Unsubscribe=One-Click".
//
// Alleen POST meldt af, nooit GET: link-scanners van Outlook en virusscanners
// openen alle links in een mail automatisch met GET en zouden mensen anders
// ongewild afmelden. Zie lib/outreach/afmelden.ts.
//
// Wat er gebeurt (idempotent, herhalen mag):
//   - het contact gaat op gestopt, zodat de crons en de handmatige knoppen
//     hem overslaan (die filteren allemaal op gestopt = false);
//   - het e-mailadres gaat op email_blocklist met reden "afgemeld", zodat het
//     ook via een nieuwe import of een andere doelgroep nooit meer een mail
//     krijgt (de prospect-review en de send-routes checken die lijst);
//   - er komt een systeemnotitie bij het contact, zodat het in het
//     detailpaneel zichtbaar is zonder dat Jarno iets hoeft te doen.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET op dezelfde url meldt bewust niemand af, maar stuurt door naar de
// pagina met de bevestigknop. Nodig omdat sommige mailprogramma's de
// List-Unsubscribe-url gewoon openen in plaats van de POST te doen, en omdat
// link-scanners hier anders op een 405 zouden stuiten.
export function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  return NextResponse.redirect(afmeldPaginaUrl(params.token), 302);
}

export async function POST(_req: NextRequest, { params }: { params: { token: string } }) {
  const token = (params.token ?? "").trim();
  // Vormcontrole vooraf: scheelt een query op willekeurige rommel en voorkomt
  // een type-fout in Postgres bij het vergelijken met een uuid-kolom.
  if (!UUID.test(token)) {
    return NextResponse.json({ ok: false, fout: "onbekende-link" }, { status: 404 });
  }

  const supabase = createServiceClient();

  const { data: contact, error } = await supabase
    .from("outreach_contacts")
    .select("id, naam, email, afgemeld_at")
    .eq("afmeld_token", token)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, fout: "serverfout" }, { status: 500 });
  }
  if (!contact) {
    return NextResponse.json({ ok: false, fout: "onbekende-link" }, { status: 404 });
  }

  // Al eerder afgemeld: niets opnieuw wegschrijven (anders komt er bij elke
  // klik een notitie bij), maar wel een geslaagd antwoord. Voor de afzender
  // van een one-click-POST is "stond al uit" hetzelfde als succes.
  if (contact.afgemeld_at) {
    return NextResponse.json({ ok: true, alAfgemeld: true, email: contact.email });
  }

  const nu = new Date().toISOString();

  const { error: updateFout } = await supabase
    .from("outreach_contacts")
    .update({
      gestopt: true,
      gestopt_at: nu,
      gestopt_reden: "Afgemeld via de link in de mail",
      afgemeld_at: nu,
    })
    .eq("id", contact.id);
  if (updateFout) {
    return NextResponse.json({ ok: false, fout: "serverfout" }, { status: 500 });
  }

  // Blocklist en notitie zijn aanvullend: als een van beide faalt, is het
  // afmelden zelf (gestopt = true) al geregeld en mag de bezoeker geen
  // foutmelding zien.
  await supabase.from("email_blocklist").upsert(
    {
      email: contact.email,
      reden: "afgemeld",
      notitie: "Zelf afgemeld via de link onderaan de mail",
    },
    { onConflict: "email", ignoreDuplicates: true }
  );

  await supabase.from("contact_notities").insert({
    outreach_contact_id: contact.id,
    soort: "systeem",
    tekst: "Afgemeld via de link in de mail. Contact gestopt en e-mailadres op de blocklist.",
  });

  return NextResponse.json({ ok: true, alAfgemeld: false, email: contact.email });
}
