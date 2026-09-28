import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

/**
 * Meetgebeurtenissen uit de browser wegschrijven, server-side (28-sep-2026).
 *
 * Reden: lib/track.ts deed sinds 10-jul-2026
 * `void supabase.from("paginagebeurtenissen").insert(...)`. Een Supabase-query
 * is lui: het verzoek gaat pas de deur uit bij `await` of `.then()`. Met
 * `void` ervoor gebeurde dat nooit, dus is er vanuit de browser nooit een
 * gebeurtenis weggeschreven (geen CTA-klik, geen resultaatstap, geen
 * vraagstap). Alleen gebeurtenissen die een server-route zelf schrijft
 * (analyse_vraag_verstuurd) konden er komen.
 *
 * Nu via deze route met de service key, zoals /api/analyse-voortgang. De
 * browser stuurt met sendBeacon, zodat een klik die meteen naar een andere
 * pagina gaat (CTA's) ook aankomt. Body is tekst met JSON, omdat sendBeacon
 * met text/plain overal zonder preflight werkt.
 */

const GEBEURTENIS_PATROON = /^[a-z0-9_]{1,64}$/;
const APPARATEN = ["mobiel", "desktop", "onbekend"];
const MAX_META_TEKENS = 2000;

export async function POST(request: NextRequest) {
  try {
    // Eigen bezoeken tellen niet mee, ook als de browsercheck iets mist.
    if (request.cookies.get("wb_eigenaar")?.value === "true") {
      return NextResponse.json({ ok: true, eigen: true });
    }

    const tekst = await request.text();
    if (!tekst || tekst.length > 4000) return NextResponse.json({ ok: false }, { status: 200 });
    const body = JSON.parse(tekst) as Record<string, unknown>;

    const sessieId = typeof body.sessie_id === "string" ? body.sessie_id.slice(0, 64) : "";
    const gebeurtenis = typeof body.gebeurtenis === "string" ? body.gebeurtenis : "";
    if (!sessieId || !GEBEURTENIS_PATROON.test(gebeurtenis)) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const pakket = typeof body.pakket === "string" ? body.pakket.slice(0, 32) : null;
    const apparaat =
      typeof body.apparaat === "string" && APPARATEN.includes(body.apparaat) ? body.apparaat : "onbekend";
    let meta: Record<string, unknown> | null = null;
    if (body.meta && typeof body.meta === "object" && !Array.isArray(body.meta)) {
      if (JSON.stringify(body.meta).length <= MAX_META_TEKENS) meta = body.meta as Record<string, unknown>;
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("paginagebeurtenissen").insert({
      sessie_id: sessieId,
      gebeurtenis: gebeurtenis,
      pakket: pakket,
      apparaat: apparaat,
      meta: meta,
    });
    if (error) {
      // Meten mag de site nooit breken, dus geen 500 naar de browser.
      console.error("gebeurtenis insert mislukt:", error.message);
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
