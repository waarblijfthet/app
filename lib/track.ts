"use client";

import { createClient } from "@/lib/supabase-browser";
// Sessie-id, apparaat en de eigenaarscookie komen sinds 6-sep-2026 uit één
// bron, zodat paginabezoeken, kliks en analysevoortgang dezelfde sessie-id
// dragen en de trechter aan elkaar te rekenen is.
import { getSessieId, getApparaat, isEigenaar } from "@/lib/sessie";

export type Pakket = "geldscan" | "gesprek" | "intensief";

/**
 * Logt een gebeurtenis (klik of formulier-actie) in paginagebeurtenissen.
 * PII-vrij en stil falend: tracking mag de site nooit breken en telt
 * eigen bezoeken niet mee.
 */
export function logGebeurtenis(
  gebeurtenis: string,
  opties?: { pakket?: Pakket | string | null; meta?: Record<string, unknown> }
): void {
  try {
    if (isEigenaar()) return;
    const supabase = createClient();
    void supabase.from("paginagebeurtenissen").insert({
      sessie_id: getSessieId(),
      gebeurtenis,
      pakket: opties?.pakket ?? null,
      apparaat: getApparaat(),
      meta: opties?.meta ?? null,
    });
  } catch {
    // Stil falen, tracking mag nooit de site breken.
  }
}
