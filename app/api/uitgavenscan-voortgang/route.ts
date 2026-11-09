import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { schermIndex, valideerMeting } from "@/lib/uitgavenscan/meting";

/**
 * POST /api/uitgavenscan-voortgang (9-nov-2026): de wizard van de uitgavenscan meldt welk scherm in
 * beeld kwam en een paar kenmerken. Eén rij per sessie in uitgavenscan_voortgang, zoals
 * /api/analyse-voortgang voor de analyse. Schrijft met de service key; de browser kan niet zelf in
 * de tabel (supabase/uitgavenscan_voortgang.sql).
 *
 * De body wordt strikt gecontroleerd (lib/uitgavenscan/meting.ts): alleen vaste keuzes en kleine
 * tellingen, nooit bedragen of namen. Het verste scherm kan alleen omhoog, en per scherm blijft het
 * eerste moment staan. Jarno's eigen rondes (cookie wb_eigenaar) worden gemarkeerd, niet weggegooid,
 * zodat hij zelf kan testen en de admin ze standaard weglaat.
 */

const MAX_TEKENS = 2000;

export async function POST(request: NextRequest) {
  try {
    const tekst = await request.text();
    if (!tekst || tekst.length > MAX_TEKENS) return NextResponse.json({ ok: false }, { status: 200 });
    let body: unknown;
    try {
      body = JSON.parse(tekst);
    } catch {
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    const v = valideerMeting(body);
    if (!v.ok) return NextResponse.json({ ok: false }, { status: 200 });
    const m = v.meting;
    const eigenaar = request.cookies.get("wb_eigenaar")?.value === "true";

    const supabase = createServiceClient();
    const { data: bestaand, error: leesFout } = await supabase
      .from("uitgavenscan_voortgang")
      .select("max_scherm_index,kenmerken,tijden")
      .eq("sessie_id", m.sessieId)
      .maybeSingle();
    if (leesFout) {
      console.error("uitgavenscan-voortgang lezen mislukt:", leesFout.message);
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const nu = new Date().toISOString();
    const tijden: Record<string, string> = { ...((bestaand?.tijden as Record<string, string> | null) ?? {}) };
    if (!tijden[m.scherm]) tijden[m.scherm] = nu;
    const rij = {
      sessie_id: m.sessieId,
      updated_at: nu,
      huidig_scherm: m.scherm,
      max_scherm_index: Math.max(bestaand?.max_scherm_index ?? -1, schermIndex(m.scherm)),
      apparaat: m.apparaat,
      eigenaar: eigenaar,
      kenmerken: { ...((bestaand?.kenmerken as Record<string, unknown> | null) ?? {}), ...m.kenmerken },
      tijden: tijden,
    };
    const { error } = await supabase.from("uitgavenscan_voortgang").upsert(rij, { onConflict: "sessie_id" });
    if (error) {
      // Meten mag de wizard nooit breken, dus geen 500 naar de browser.
      console.error("uitgavenscan-voortgang schrijven mislukt:", error.message);
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
