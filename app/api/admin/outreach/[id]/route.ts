import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET /api/admin/outreach/[id] — contact, mailhistorie en notities voor het
// detailpaneel (zie docs/admin-redesign-30-jul-2026.md sectie 5c).
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { id } = params;

  const [{ data: contact, error: contactError }, { data: mails }, { data: notities }, { data: gekoppeld }] =
    await Promise.all([
      supabase.from("outreach_contacts").select("*").eq("id", id).single(),
      supabase
        .from("outreach_mails")
        .select("*")
        .eq("contact_id", id)
        .order("nummer", { ascending: true }),
      supabase
        .from("contact_notities")
        .select("*")
        .eq("outreach_contact_id", id)
        .order("created_at", { ascending: false }),
      // Is dit outreach-contact al doorgezet naar contacten? Zie
      // docs/admin-redesign-30-jul-2026.md sectie 7 ("Doorzetten in een
      // klik"): de knop moet dan een link worden, niet nogmaals doorzetten.
      supabase.from("contacten").select("id").eq("outreach_contact_id", id).maybeSingle(),
    ]);

  if (contactError || !contact) {
    return NextResponse.json({ error: "Contact niet gevonden" }, { status: 404 });
  }

  return NextResponse.json({
    contact: { ...contact, contact_id: gekoppeld?.id ?? null },
    mails: mails ?? [],
    notities: notities ?? [],
  });
}
