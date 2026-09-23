import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * De vraagstap in de analyse (23-sep-2026): een bezoeker stelt na zijn
 * resultaat één vraag, Jarno antwoordt binnen 2 werkdagen persoonlijk.
 * Ontwerp: docs/vraagstap-ontwerp-23-sep-2026.md.
 *
 * Alles loopt via bestaande tabellen, zonder migratie:
 * - de vraag staat als notitie in contact_notities, met VRAAG_PREFIX ervoor;
 * - het contact krijgt volgende_actie = VRAAG_ACTIE met een datum, zodat hij
 *   op het Vandaag-dashboard verschijnt;
 * - beantwoord = volgende_actie leeg plus een notitie met BEANTWOORD_PREFIX.
 */

export const VRAAG_PREFIX = "Vraag via analyse:";
export const BEANTWOORD_PREFIX = "Vraag beantwoord";
export const VRAAG_ACTIE = "Vraag beantwoorden";

/** Besluit Jarno 23-sep-2026: boven 15 vragen in 7 dagen gaat de stap tijdelijk uit. */
export const MAX_VRAGEN_PER_WEEK = 15;

/** Belofte op het scherm en in de mail (besluit Jarno 23-sep-2026). */
export const ANTWOORD_WERKDAGEN = 2;

export async function telVragenAfgelopenWeek(supabase: SupabaseClient): Promise<number> {
  const sinds = new Date(Date.now() - 7 * 86400000).toISOString();
  const { count, error } = await supabase
    .from("contact_notities")
    .select("id", { count: "exact", head: true })
    .like("tekst", `${VRAAG_PREFIX}%`)
    .gte("created_at", sinds);
  if (error) throw error;
  return count ?? 0;
}

export type VraagstapStatus = {
  aan: boolean;
  reden: "aan" | "handmatig-uit" | "vol";
  dezeWeek: number;
  max: number;
};

/**
 * Staat de vraagstap aan? Uit als VRAAGSTAP_UIT=1 in Vercel staat (vakantie,
 * drukte), of automatisch als er in de afgelopen 7 dagen 15 vragen binnen zijn.
 */
export async function vraagstapStatus(supabase: SupabaseClient): Promise<VraagstapStatus> {
  const dezeWeek = await telVragenAfgelopenWeek(supabase);
  if (process.env.VRAAGSTAP_UIT === "1") {
    return { aan: false, reden: "handmatig-uit", dezeWeek: dezeWeek, max: MAX_VRAGEN_PER_WEEK };
  }
  if (dezeWeek >= MAX_VRAGEN_PER_WEEK) {
    return { aan: false, reden: "vol", dezeWeek: dezeWeek, max: MAX_VRAGEN_PER_WEEK };
  }
  return { aan: true, reden: "aan", dezeWeek: dezeWeek, max: MAX_VRAGEN_PER_WEEK };
}

/** Datum over `aantal` werkdagen, in Nederlandse tijd. Feestdagen niet meegeteld. */
export function werkdagenVerder(aantal: number, vanaf: Date = new Date()): Date {
  const nlDatum = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(vanaf);
  const datum = new Date(`${nlDatum}T12:00:00Z`);
  let over = aantal;
  while (over > 0) {
    datum.setUTCDate(datum.getUTCDate() + 1);
    const dag = datum.getUTCDay();
    if (dag !== 0 && dag !== 6) over -= 1;
  }
  return datum;
}

export function formatDagNl(datum: Date): string {
  return datum.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Amsterdam",
  });
}

export function escapeHtml(tekst: string): string {
  return tekst
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
