import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// GET /api/admin/outreach — alle contacten ophalen
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("outreach_contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/outreach — contact toevoegen
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { naam, email, doelgroep } = await req.json();

  if (!naam || !email) {
    return NextResponse.json({ error: "naam en email zijn verplicht" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("outreach_contacts")
    .insert({ naam, email, doelgroep: doelgroep ?? "relatietherapeuten" })
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

// DELETE /api/admin/outreach?id=xxx — contact verwijderen
export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const { error } = await supabase
    .from("outreach_contacts")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
