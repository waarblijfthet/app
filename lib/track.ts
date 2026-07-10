"use client";

import { createClient } from "@/lib/supabase-browser";

// Zelfde sessie-sleutel als PageTracker, zodat kliks en paginabezoeken
// bij dezelfde sessie horen.
function getSessieId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("wb_sessie");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("wb_sessie", id);
  }
  return id;
}

function getApparaat(): string {
  if (typeof window === "undefined") return "onbekend";
  return window.innerWidth < 768 ? "mobiel" : "desktop";
}

function isEigenaar(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("wb_eigenaar=true");
}

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
