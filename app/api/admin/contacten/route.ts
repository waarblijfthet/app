import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const SOORTEN = ["verwijzer", "klant", "lead", "overig"];

// GET /api/admin/contacten, lijst voor de contactenpagina.
// Query: soort ('verwijzer'|'klant'|'lead'|'overig'), actie ('1', vandaag of
// eerder en niet gearchiveerd), zoekterm (naam/email/praktijk/plaats).
// Geen paginering: dit blijft een handvol rijen (sectie 7).
export async function GET(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const sp = req.nextUrl.searchParams;
  const soort = sp.get("soort");
  const actie = sp.get("actie");
  const zoekterm = sp.get("zoekterm");

  let query = supabase
    .from("contacten")
    .select("*")
    .is("archived_at", null)
    .order("volgende_actie_op", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (soort && SOORTEN.includes(soort)) query = query.eq("soort", soort);
  if (actie === "1") {
    const vandaag = new Date().toISOString().slice(0, 10);
    query = query.lte("volgende_actie_op", vandaag);
  }
  if (zoekterm) {
    query = query.or(
      `naam.ilike.%${zoekterm}%,email.ilike.%${zoekterm}%,praktijk.ilike.%${zoekterm}%,plaats.ilike.%${zoekterm}%`
    );
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/contacten, contact met de hand toevoegen.
// Dubbel e-mailadres geeft een leesbare 409 met het id van de bestaande rij,
// geen databasefout (opdracht 4).
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();

  const naam = typeof body.naam === "string" ? body.naam.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!naam || !email) {
    return NextResponse.json({ error: "naam en email zijn verplicht" }, { status: 400 });
  }

  const { data: bestaand } = await supabase
    .from("contacten")
    .select("id, naam")
    .eq("email", email)
    .maybeSingle();
  if (bestaand) {
    return NextResponse.json(
      {
        error: `Dit e-mailadres staat al bij ${bestaand.naam}.`,
        bestaandContactId: bestaand.id,
      },
      { status: 409 }
    );
  }

  const soort = typeof body.soort === "string" && SOORTEN.includes(body.soort) ? body.soort : "lead";

  const insert: Record<string, unknown> = {
    naam,
    email,
    telefoon: leesTekst(body.telefoon),
    praktijk: leesTekst(body.praktijk),
    website: leesTekst(body.website),
    plaats: leesTekst(body.plaats),
    soort,
    fase: leesTekst(body.fase) ?? standaardFase(soort),
    bron: leesTekst(body.bron) ?? "handmatig",
    doelgroep: soort === "verwijzer" ? leesTekst(body.doelgroep) : null,
    outreach_contact_id: leesTekst(body.outreach_contact_id),
    lead_id: leesTekst(body.lead_id),
    analyse_token: leesTekst(body.analyse_token),
    intake_id: leesTekst(body.intake_id),
    volgende_actie: leesTekst(body.volgende_actie),
    volgende_actie_op: leesTekst(body.volgende_actie_op),
  };

  const { data, error } = await supabase.from("contacten").insert(insert).select().single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Dit e-mailadres staat er al in" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/contacten: gegevens, soort/fase, volgende actie bijwerken.
// Body: { id, naam?, email?, telefoon?, praktijk?, website?, plaats?, soort?,
//         fase?, doelgroep?, volgende_actie?, volgende_actie_op?,
//         laatste_contact_at? }
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.naam === "string" && body.naam.trim()) update.naam = body.naam.trim();
  if (typeof body.email === "string" && body.email.trim()) update.email = body.email.trim().toLowerCase();
  if ("telefoon" in body) update.telefoon = leesTekst(body.telefoon);
  if ("praktijk" in body) update.praktijk = leesTekst(body.praktijk);
  if ("website" in body) update.website = leesTekst(body.website);
  if ("plaats" in body) update.plaats = leesTekst(body.plaats);
  if (typeof body.soort === "string" && SOORTEN.includes(body.soort)) update.soort = body.soort;
  if ("fase" in body) update.fase = leesTekst(body.fase);
  if ("doelgroep" in body) update.doelgroep = leesTekst(body.doelgroep);
  if ("volgende_actie" in body) update.volgende_actie = leesTekst(body.volgende_actie);
  if ("volgende_actie_op" in body) update.volgende_actie_op = leesTekst(body.volgende_actie_op);
  if ("laatste_contact_at" in body) update.laatste_contact_at = leesTekst(body.laatste_contact_at);

  const { data, error } = await supabase
    .from("contacten")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Dit e-mailadres staat er al in" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

function leesTekst(waarde: unknown): string | null {
  if (typeof waarde !== "string") return null;
  const getrimd = waarde.trim();
  return getrimd ? getrimd : null;
}

function standaardFase(soort: string): string {
  if (soort === "klant") return "aangemeld";
  if (soort === "verwijzer") return "gereageerd";
  if (soort === "lead") return "nieuw";
  return "nieuw";
}
