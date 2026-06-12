import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const GELDIGE_STATUSSEN = ["nieuw", "contact_opgenomen", "betaald", "gestart"];

// PATCH /api/admin/aanvragen — status van een intake-aanvraag bijwerken
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { id, status } = await req.json();
  if (!id || typeof status !== "string") {
    return NextResponse.json({ error: "id en status zijn verplicht" }, { status: 400 });
  }
  if (!GELDIGE_STATUSSEN.includes(status)) {
    return NextResponse.json({ error: "Ongeldige status" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("intake_aanvragen")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("admin/aanvragen: status bijwerken mislukt", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
