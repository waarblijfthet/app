"use client";

// Sessie-id, apparaat en de eigenaarscookie komen sinds 6-sep-2026 uit één
// bron, zodat paginabezoeken, kliks en analysevoortgang dezelfde sessie-id
// dragen en de trechter aan elkaar te rekenen is.
import { getSessieId, getApparaat, isEigenaar } from "@/lib/sessie";

export type Pakket = "geldscan" | "gesprek" | "intensief";

/**
 * Logt een gebeurtenis (klik of formulier-actie) in paginagebeurtenissen.
 * PII-vrij en stil falend: tracking mag de site nooit breken en telt
 * eigen bezoeken niet mee.
 *
 * Sinds 28-sep-2026 via /api/gebeurtenis. Hiervoor stond hier
 * `void supabase.from(...).insert(...)`, en een Supabase-query zonder
 * `await` of `.then()` wordt nooit verstuurd. Daardoor is er van 10-jul tot
 * 28-sep-2026 geen enkele browsergebeurtenis weggeschreven. Zie de route.
 * sendBeacon overleeft een navigatie direct na de klik; fetch met keepalive
 * is de terugval.
 */
export function logGebeurtenis(
  gebeurtenis: string,
  opties?: { pakket?: Pakket | string | null; meta?: Record<string, unknown> }
): void {
  try {
    if (typeof window === "undefined") return;
    if (isEigenaar()) return;
    const tekst = JSON.stringify({
      sessie_id: getSessieId(),
      gebeurtenis: gebeurtenis,
      pakket: opties?.pakket ?? null,
      apparaat: getApparaat(),
      meta: opties?.meta ?? null,
    });
    const blob = new Blob([tekst], { type: "text/plain;charset=UTF-8" });
    const verstuurd =
      typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function"
        ? navigator.sendBeacon("/api/gebeurtenis", blob)
        : false;
    if (!verstuurd) {
      void fetch("/api/gebeurtenis", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: tekst,
        keepalive: true,
      }).catch(() => {
        // stil falen
      });
    }
  } catch {
    // Stil falen, tracking mag nooit de site breken.
  }
}
