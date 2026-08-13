import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET/PATCH /api/admin/outreach/automatisering
// Sleutel "automatisering" in outreach_instellingen (zelfde tabel/patroon
// als de handtekening, zie app/api/admin/outreach/handtekening/route.ts).
// Drie losse toggles, één per mail:
// - eersteMailAutomatisch: of /api/cron/outreach-eerste-mail (dagelijkse
//   cron, 07:15 UTC) nieuwe contacten (status "nieuw") hun eerste mail
//   stuurt, tot het dagbudget resterend is.
// - tweedeMailAutomatisch / derdeMailAutomatisch: of /api/cron/outreach-followups
//   (dagelijkse cron, 07:20 UTC) respectievelijk follow-up 1 (mail 2) en
//   follow-up 2 (mail 3) automatisch verstuurt zodra een contact daarvoor
//   in aanmerking komt.
// Alle drie default UIT: dit is een gedragsverandering (echt e-mailen
// zonder klik), dus bewust niet stilzwijgend aan bij het draaien van de
// migratie. Jarno zet ze zelf aan op /admin/outreach.
type AutomatiseringWaarde = {
  eersteMailAutomatisch?: boolean;
  tweedeMailAutomatisch?: boolean;
  derdeMailAutomatisch?: boolean;
};

const VELDEN = ["eersteMailAutomatisch", "tweedeMailAutomatisch", "derdeMailAutomatisch"] as const;

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

  const waarde = data?.waarde as AutomatiseringWaarde | null;
  return NextResponse.json({
    eersteMailAutomatisch: Boolean(waarde?.eersteMailAutomatisch),
    tweedeMailAutomatisch: Boolean(waarde?.tweedeMailAutomatisch),
    derdeMailAutomatisch: Boolean(waarde?.derdeMailAutomatisch),
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const body = await req.json();

  const aanpassingen: AutomatiseringWaarde = {};
  for (const veld of VELDEN) {
    if (body?.[veld] === undefined) continue;
    if (typeof body[veld] !== "boolean") {
      return NextResponse.json({ error: `${veld} moet true of false zijn` }, { status: 400 });
    }
    aanpassingen[veld] = body[veld];
  }
  if (Object.keys(aanpassingen).length === 0) {
    return NextResponse.json(
      { error: "Geef minstens één van eersteMailAutomatisch, tweedeMailAutomatisch of derdeMailAutomatisch op" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Merge met bestaande waarde: PATCH zet hier steeds maar één toggle per
  // keer (zie zetAutomatisering in OutreachTabblad), dus zonder deze merge
  // zou het aanzetten van mail 2 automatisch mail 1 en 3 weer uitzetten.
  const { data: bestaand, error: leesFout } = await supabase
    .from("outreach_instellingen")
    .select("waarde")
    .eq("sleutel", "automatisering")
    .maybeSingle();
  if (leesFout) return NextResponse.json({ error: leesFout.message }, { status: 500 });

  const nieuweWaarde: AutomatiseringWaarde = {
    ...(bestaand?.waarde as AutomatiseringWaarde | null),
    ...aanpassingen,
  };

  const { error } = await supabase.from("outreach_instellingen").upsert(
    {
      sleutel: "automatisering",
      waarde: nieuweWaarde,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "sleutel" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    eersteMailAutomatisch: Boolean(nieuweWaarde.eersteMailAutomatisch),
    tweedeMailAutomatisch: Boolean(nieuweWaarde.tweedeMailAutomatisch),
    derdeMailAutomatisch: Boolean(nieuweWaarde.derdeMailAutomatisch),
  });
}
