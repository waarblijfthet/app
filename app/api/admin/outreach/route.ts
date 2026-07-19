import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET /api/admin/outreach — alle contacten ophalen
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("outreach_contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/outreach — contact toevoegen
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { naam, email, doelgroep, plaats } = await req.json();

  if (!naam || !email) {
    return NextResponse.json({ error: "naam en email zijn verplicht" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("outreach_contacts")
    .insert({
      naam,
      email,
      doelgroep: doelgroep ?? "relatietherapeuten",
      plaats: typeof plaats === "string" && plaats.trim() ? plaats.trim() : null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Dit e-mailadres staat er al in" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/outreach — naam, e-mail, categorie of persoonlijke zin wijzigen,
// of een reply markeren.
// Body: { id: string, naam?: string, email?: string, doelgroep?: string,
//         ps_zin?: string, gereageerd?: boolean }
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { id, naam, email, doelgroep, ps_zin, plaats, gereageerd } = await req.json();
  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const update: {
    naam?: string; email?: string; doelgroep?: string;
    ps_zin?: string | null; plaats?: string | null; status?: string; gereageerd_at?: string;
  } = {};
  if (typeof naam === "string" && naam.trim()) update.naam = naam.trim();
  if (typeof email === "string" && email.trim()) update.email = email.trim();
  if (typeof doelgroep === "string" && doelgroep.trim()) update.doelgroep = doelgroep.trim();
  if (typeof ps_zin === "string") update.ps_zin = ps_zin.trim() || null;
  if (typeof plaats === "string") update.plaats = plaats.trim() || null;
  if (gereageerd === true) {
    update.status = "gereageerd";
    update.gereageerd_at = new Date().toISOString();
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "niets om bij te werken" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("outreach_contacts")
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

// DELETE /api/admin/outreach?id=xxx — contact verwijderen
export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const { error } = await supabase
    .from("outreach_contacts")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
