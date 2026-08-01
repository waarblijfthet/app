import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET/PATCH /api/admin/outreach/automatisering
// Sleutel "automatisering" in outreach_instellingen (zelfde tabel/patroon
// als de handtekening, zie app/api/admin/outreach/handtekening/route.ts).
// Nu alleen eersteMailAutomatisch: of /api/cron/outreach-eerste-mail (zelfde
// dagelijkse cron als de follow-ups, 07:15 UTC) ook nieuwe contacten
// (status "nieuw") hun eerste mail stuurt, tot het dagbudget resterend is.
// Default UIT: dit is een gedragsverandering (echt e-mailen zonder klik),
// dus bewust niet stilzwijgend aan bij het draaien van de migratie. Jarno
// zet 'm zelf aan op /admin/outreach.
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("outreach_instellingen")
    .select("waarde")
    .eq("sleutel", "automatisering")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const waarde = data?.waarde as { eersteMailAutomatisch?: boolean } | null;
  return NextResponse.json({
    eersteMailAutomatisch: Boolean(waarde?.eersteMailAutomatisch),
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const body = await req.json();
  if (typeof body?.eersteMailAutomatisch !== "boolean") {
    return NextResponse.json({ error: "eersteMailAutomatisch moet true of false zijn" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("outreach_instellingen").upsert(
    {
      sleutel: "automatisering",
      waarde: { eersteMailAutomatisch: body.eersteMailAutomatisch },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "sleutel" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, eersteMailAutomatisch: body.eersteMailAutomatisch });
}
