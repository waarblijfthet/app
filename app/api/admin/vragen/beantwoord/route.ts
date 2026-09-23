import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { BEANTWOORD_PREFIX, VRAAG_ACTIE } from "@/lib/vraagstap";

/**
 * POST /api/admin/vragen/beantwoord { contactId }
 *
 * De knop "Beantwoord" op het Vandaag-dashboard (23-sep-2026). Jarno antwoordt
 * in zijn eigen mailbox; deze route legt alleen vast dat het gebeurd is:
 * volgende actie leeg, laatste contact nu, fase "warm" voor een lead, en een
 * notitie "Vraag beantwoord" zodat de admin kan tellen hoeveel er deze week
 * beantwoord zijn en hoe snel.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { contactId?: string };
  const contactId = typeof body.contactId === "string" ? body.contactId : "";
  if (!contactId) return NextResponse.json({ error: "contactId ontbreekt" }, { status: 400 });

  const supabase = createServiceClient();
  const { data: contact, error: zoekErr } = await supabase
    .from("contacten")
    .select("id, soort, volgende_actie")
    .eq("id", contactId)
    .maybeSingle();
  if (zoekErr) return NextResponse.json({ error: zoekErr.message }, { status: 500 });
  if (!contact) return NextResponse.json({ error: "Contact niet gevonden" }, { status: 404 });

  const nu = new Date().toISOString();
  const update: Record<string, unknown> = { laatste_contact_at: nu, updated_at: nu };
  if (contact.volgende_actie === VRAAG_ACTIE) {
    update.volgende_actie = null;
    update.volgende_actie_op = null;
  }
  if (contact.soort === "lead") update.fase = "warm";

  const { error: updErr } = await supabase.from("contacten").update(update).eq("id", contactId);
  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

  const { error: notErr } = await supabase
    .from("contact_notities")
    .insert({ contact_id: contactId, tekst: `${BEANTWOORD_PREFIX} (via Vandaag).`, soort: "mail" });
  if (notErr) return NextResponse.json({ error: notErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
