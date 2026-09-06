import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

/**
 * Voortgang van de analyse wegschrijven, server-side.
 *
 * Reden (6-sep-2026): dit ging rechtstreeks vanuit de browser met de anon-rol,
 * wat betekende dat de anon-sleutel uit de bundle mocht schrijven in een tabel
 * met huishoudbedragen. Vanaf nu schrijft alleen deze route, met de service
 * key. Zie supabase/quiz_voortgang_v3.sql.
 *
 * Bewust een witte lijst met velden: het formulier stuurt een vrij object mee
 * en dat mag nooit ongefilterd een kolom raken die er niet voor bedoeld is.
 */

const VELDEN = [
  "huidige_stap",
  "max_stap",
  "huidig_scherm",
  "max_scherm_index",
  "voltooid",
  "apparaat",
  "eerste_interactie",
  "woonsituatie",
  "aantal_kinderen",
  "auto_situatie",
  "totaal_inkomen",
  "totaal_uitgaven",
  "maandelijks_over",
  "verdict",
  "grootste_afwijking",
  "antwoorden",
  "toestemming_data_asset",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const sessieId = typeof body.sessie_id === "string" ? body.sessie_id.slice(0, 64) : "";
    if (!sessieId) {
      return NextResponse.json({ ok: false, fout: "sessie_id ontbreekt" }, { status: 400 });
    }

    const rij: Record<string, unknown> = {
      sessie_id: sessieId,
      updated_at: new Date().toISOString(),
    };
    for (const veld of VELDEN) {
      if (veld in body) rij[veld] = body[veld];
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from("quiz_voortgang")
      .upsert(rij, { onConflict: "sessie_id" });

    if (error) {
      // Meten mag de tool nooit breken, dus geen 500 naar de browser.
      console.error("analyse-voortgang upsert mislukt:", error.message);
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
