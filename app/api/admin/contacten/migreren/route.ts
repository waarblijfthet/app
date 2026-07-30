import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// POST /api/admin/contacten/migreren — eenmalige migratie: elke
// intake_aanvraag met status betaald of gestart wordt een contact met
// soort klant, intake_id en analyse_token mee (opdracht 5).
//
// Idempotent op twee manieren: een intake die al eerder is doorgezet (er
// bestaat al een contacten-rij met dit intake_id) wordt overgeslagen, en een
// e-mailadres dat al in contacten staat (bijvoorbeeld handmatig toegevoegd)
// geeft geen databasefout maar telt ook als overgeslagen. Zo geeft twee keer
// klikken nooit dubbele rijen.
export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  const { data: aanvragen, error: aanvragenError } = await supabase
    .from("intake_aanvragen")
    .select("id, naam, email, status, analyse_token, created_at")
    .in("status", ["betaald", "gestart"]);

  if (aanvragenError) {
    return NextResponse.json({ error: aanvragenError.message }, { status: 500 });
  }

  let aangemaakt = 0;
  const overgeslagen: { naam: string; reden: string }[] = [];

  for (const aanvraag of aanvragen ?? []) {
    const { data: bestaandIntake } = await supabase
      .from("contacten")
      .select("id")
      .eq("intake_id", aanvraag.id)
      .maybeSingle();
    if (bestaandIntake) {
      overgeslagen.push({ naam: aanvraag.naam, reden: "al eerder gemigreerd" });
      continue;
    }

    const { error: insertError } = await supabase.from("contacten").insert({
      naam: aanvraag.naam,
      email: aanvraag.email,
      soort: "klant",
      fase: aanvraag.status === "gestart" ? "gegevens binnen" : "betaald",
      bron: "intake",
      intake_id: aanvraag.id,
      analyse_token: aanvraag.analyse_token,
      laatste_contact_at: aanvraag.created_at,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        overgeslagen.push({ naam: aanvraag.naam, reden: "e-mailadres bestond al in contacten" });
        continue;
      }
      overgeslagen.push({ naam: aanvraag.naam, reden: insertError.message });
      continue;
    }
    aangemaakt += 1;
  }

  return NextResponse.json({ aangemaakt, overgeslagen: overgeslagen.length, details: overgeslagen });
}
