import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const GELDIGE_STATUSSEN = ["nieuw", "contact_opgenomen", "betaald", "gestart"];

// PATCH /api/admin/aanvragen, status van een intake-aanvraag bijwerken
//
// Zodra een aanvraag met pakket = 'geldscan' voor het eerst naar status
// 'gestart' gaat, stempelen we rapport_verzonden_at (zie
// supabase/aanvragen_rapport_verzonden.sql en docs/admin-redesign-
// 30-jul-2026.md sectie 6). Bij een geldscan is er geen apart traject om te
// "starten"; 'gestart' betekent hier afgehandeld/rapport verstuurd. Alleen de
// eerste keer stempelen, niet opnieuw als de status later nog eens wisselt.
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

  const update: Record<string, unknown> = { status };

  if (status === "gestart") {
    const { data: huidig } = await supabase
      .from("intake_aanvragen")
      .select("pakket, rapport_verzonden_at")
      .eq("id", id)
      .maybeSingle();
    if (huidig?.pakket === "geldscan" && !huidig.rapport_verzonden_at) {
      update.rapport_verzonden_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from("intake_aanvragen")
    .update(update)
    .eq("id", id);

  if (error) {
    console.error("admin/aanvragen: status bijwerken mislukt", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/admin/aanvragen?id=..., een intake-aanvraag definitief verwijderen.
//
// Hard verwijderen, want dit is de enige plek waar testaanmeldingen en dubbele
// aanvragen opgeruimd moeten kunnen worden. Er hangt geen contactrij aan vast:
// contacten worden los aangemaakt via /api/admin/contacten/doorzetten en houden
// hun eigen rij. Een gekoppelde analyse in quiz_resultaten blijft ook staan,
// die hoort bij het e-mailadres en niet bij de aanvraag.
export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is verplicht" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("intake_aanvragen").delete().eq("id", id);

  if (error) {
    console.error("admin/aanvragen: verwijderen mislukt", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
