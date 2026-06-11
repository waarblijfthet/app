import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { Doelgroep, DOELGROEPEN } from "@/lib/prospects/types";

export const dynamic = "force-dynamic";

// POST /api/admin/prospects/review
// Body: { ids: string[], actie: "goedkeuren" | "afwijzen" }
// Goedkeuren zet het contact in outreach_contacts (status nieuw).
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { ids, actie } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids ontbreken" }, { status: 400 });
  }
  if (actie !== "goedkeuren" && actie !== "afwijzen") {
    return NextResponse.json({ error: "actie moet 'goedkeuren' of 'afwijzen' zijn" }, { status: 400 });
  }

  if (actie === "afwijzen") {
    const { error } = await supabase
      .from("prospects")
      .update({ status: "afgewezen" })
      .in("id", ids)
      .eq("status", "gevonden");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, afgewezen: ids.length });
  }

  const { data: prospects, error: fetchError } = await supabase
    .from("prospects").select("*").in("id", ids).eq("status", "gevonden");
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

  const resultaten: { id: string; naam: string; ok: boolean; fout?: string }[] = [];
  for (const p of prospects ?? []) {
    const { error } = await supabase.from("outreach_contacts").insert({
      naam: p.naam,
      email: p.email,
      doelgroep: DOELGROEPEN.includes(p.doelgroep as Doelgroep)
        ? p.doelgroep
        : "relatietherapeuten",
    });
    if (error && error.code !== "23505") {
      resultaten.push({ id: p.id, naam: p.naam, ok: false, fout: error.message });
      continue;
    }
    // 23505 = stond al in outreach; prospect alsnog als goedgekeurd markeren
    await supabase.from("prospects").update({ status: "goedgekeurd" }).eq("id", p.id);
    resultaten.push({ id: p.id, naam: p.naam, ok: true });
  }

  return NextResponse.json({ resultaten });
}

// PATCH /api/admin/prospects/review
// Body: { id: string, naam?: string, doelgroep?: string }
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { id, naam, doelgroep } = await req.json();
  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const update: { naam?: string; doelgroep?: string } = {};
  if (typeof naam === "string" && naam.trim()) update.naam = naam.trim();
  if (typeof doelgroep === "string") {
    if (!DOELGROEPEN.includes(doelgroep as Doelgroep)) {
      return NextResponse.json({ error: "ongeldige doelgroep" }, { status: 400 });
    }
    update.doelgroep = doelgroep;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "niets om bij te werken" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("prospects").update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
