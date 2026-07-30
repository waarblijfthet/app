import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET /api/admin/contacten/[id], contact en notitietijdlijn voor het
// detailpaneel (sectie 7).
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { id } = params;

  const [{ data: contact, error: contactError }, { data: notities }] = await Promise.all([
    supabase.from("contacten").select("*").eq("id", id).single(),
    supabase
      .from("contact_notities")
      .select("*")
      .eq("contact_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (contactError || !contact) {
    return NextResponse.json({ error: "Contact niet gevonden" }, { status: 404 });
  }

  return NextResponse.json({ contact, notities: notities ?? [] });
}
