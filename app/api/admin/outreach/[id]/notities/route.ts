import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// POST /api/admin/outreach/[id]/notities, handmatige notitie toevoegen
// Body: { tekst: string }
// Systeemnotities (mail verstuurd) worden elders geschreven (send-route en
// de follow-up-cron), niet via deze route.
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { id } = params;
  const { tekst } = await req.json();

  if (typeof tekst !== "string" || !tekst.trim()) {
    return NextResponse.json({ error: "tekst ontbreekt" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("contact_notities")
    .insert({
      outreach_contact_id: id,
      tekst: tekst.trim(),
      soort: "notitie",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
