"use client";

/**
 * Meten in de wizard van de uitgavenscan. Roep meet(scherm) aan zodra een scherm in beeld komt, en
 * meet(scherm, kenmerken) bij een uitkomst (bank gekozen, bestand gelezen of niet, advies gemaakt).
 * Stil falend: meten mag de wizard nooit breken. Zie lib/uitgavenscan/meting.ts voor wat er mag.
 *
 * Bewust GEEN bedragen of namen meesturen. Alleen de velden uit Kenmerken, die de server ook nog
 * eens strikt controleert.
 */
import { getSessieId, getApparaat } from "@/lib/sessie";
import type { Kenmerken, SchermId } from "./meting";

export function meet(scherm: SchermId, kenmerken?: Kenmerken): void {
  try {
    if (typeof window === "undefined") return;
    const sessie = getSessieId();
    if (!sessie) return;
    const tekst = JSON.stringify({ sessie_id: sessie, scherm: scherm, apparaat: getApparaat(), kenmerken: kenmerken ?? null });
    const blob = new Blob([tekst], { type: "text/plain;charset=UTF-8" });
    const verstuurd = typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function" ? navigator.sendBeacon("/api/uitgavenscan-voortgang", blob) : false;
    if (!verstuurd) {
      void fetch("/api/uitgavenscan-voortgang", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: tekst,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // stil falen
  }
}
