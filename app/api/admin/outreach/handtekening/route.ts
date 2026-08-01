import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { DEFAULT_HANDTEKENING } from "@/lib/outreach/mails";

// GET /api/admin/outreach/handtekening
// Geeft de actief gebruikte handtekening terug: de databaserij indien
// aanwezig, anders de terugvaltekst uit lib/outreach/mails.ts (zelfde
// aanpak als GET /api/admin/outreach/templates).
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("outreach_instellingen")
    .select("waarde, updated_at")
    .eq("sleutel", "handtekening")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const tekst = (data?.waarde as { tekst?: string } | null)?.tekst;
  return NextResponse.json({
    tekst: typeof tekst === "string" && tekst.trim() ? tekst : DEFAULT_HANDTEKENING,
    aangepast: Boolean(data),
    updatedAt: data?.updated_at ?? null,
  });
}

// PATCH /api/admin/outreach/handtekening
// Body: { tekst: string }
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const body = await req.json();
  const tekst = body?.tekst;
  if (typeof tekst !== "string" || !tekst.trim()) {
    return NextResponse.json({ error: "tekst mag niet leeg zijn" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("outreach_instellingen").upsert(
    {
      sleutel: "handtekening",
      waarde: { tekst },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "sleutel" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/outreach/handtekening
// Zet de handtekening terug op de standaardtekst uit de code.
export async function DELETE() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { error } = await supabase.from("outreach_instellingen").delete().eq("sleutel", "handtekening");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
