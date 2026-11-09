import "server-only";
import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

/**
 * Limieten voor de server-routes van de uitgavenscan (beveiligingseis: niemand mag via onze sleutel
 * onbeperkt AI-aanroepen doen). Geen eigen tabel nodig: elke aanroep is een regel in
 * paginagebeurtenissen met een gehasht IP-adres (nooit het adres zelf), en we tellen de laatste 24 uur.
 *
 * Bovenop deze limiet staat de bestedingslimiet in de Anthropic-console. Gaat het tellen zelf mis
 * (Supabase even weg), dan laten we de aanroep door en loggen we het: liever een advies te veel dan
 * een bezoeker die nergens meer verder kan. De console-limiet vangt het ergste op.
 */

export type Soort = "advies" | "indelen" | "aanvraag";

const STANDAARD: Record<Soort, { perIp: number; perDag: number }> = {
  advies: { perIp: 6, perDag: 300 },
  indelen: { perIp: 10, perDag: 600 },
  aanvraag: { perIp: 5, perDag: 200 },
};

function perDag(soort: Soort): number {
  const env = Number(process.env["UITGAVENSCAN_MAX_" + soort.toUpperCase() + "_PER_DAG"]);
  return Number.isFinite(env) && env > 0 ? env : STANDAARD[soort].perDag;
}

export function ipHash(request: NextRequest): string {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "onbekend";
  const zout = process.env.UITGAVENSCAN_IP_ZOUT || "waarblijfthet-uitgavenscan";
  return createHash("sha256").update(zout + ":" + ip).digest("hex").slice(0, 32);
}

/** true als de aanroep door mag; telt hem dan ook meteen mee. */
export async function binnenLimiet(request: NextRequest, soort: Soort): Promise<boolean> {
  const gebeurtenis = "uitgavenscan_" + soort + "_aanroep";
  const hash = ipHash(request);
  const sinds = new Date(Date.now() - 86400000).toISOString();
  try {
    const supabase = createServiceClient();
    const [perIp, totaal] = await Promise.all([
      supabase.from("paginagebeurtenissen").select("id", { count: "exact", head: true }).eq("gebeurtenis", gebeurtenis).eq("meta->>ip", hash).gte("created_at", sinds),
      supabase.from("paginagebeurtenissen").select("id", { count: "exact", head: true }).eq("gebeurtenis", gebeurtenis).gte("created_at", sinds),
    ]);
    if (perIp.error || totaal.error) throw perIp.error || totaal.error;
    if ((perIp.count ?? 0) >= STANDAARD[soort].perIp || (totaal.count ?? 0) >= perDag(soort)) return false;
    const { error } = await supabase.from("paginagebeurtenissen").insert({
      sessie_id: "server",
      gebeurtenis: gebeurtenis,
      pakket: null,
      apparaat: "onbekend",
      meta: { ip: hash },
    });
    if (error) console.error("uitgavenscan limiet: wegschrijven mislukt", error.message);
    return true;
  } catch (e) {
    console.error("uitgavenscan limiet: tellen mislukt, aanroep doorgelaten", e instanceof Error ? e.message : e);
    return true;
  }
}

/** Leest de body als tekst met een maximale lengte en parset JSON. null bij te groot of ongeldig. */
export async function leesJson(request: NextRequest, maxTekens: number): Promise<unknown | null> {
  try {
    const tekst = await request.text();
    if (!tekst || tekst.length > maxTekens) return null;
    return JSON.parse(tekst);
  } catch {
    return null;
  }
}
