// Gedeelde dagbudget-berekening: hoeveel eerste mails (verstuurd_at) zijn
// vandaag al verstuurd, tegenover OUTREACH_DAGBUDGET (standaard 25).
// Was tot 1-aug-2026 een weekbudget van standaard 10 (bewuste tijdelijke
// rem, zie docs/groeibeslissing-aug-2026.md); op verzoek van Jarno
// omgezet naar een dagbudget, hoger gezet en gebruikt om ook het
// automatisch versturen van de eerste mail te begrenzen (zie
// lib/outreach/mails.ts / app/api/cron/outreach-eerste-mail).
// Eerst alleen in app/api/admin/outreach/dagbudget/route.ts, nu ook gebruikt
// door /api/admin/vandaag en de cron zodat ze nooit uit de pas kunnen lopen.
// Zie docs/admin-redesign-30-jul-2026.md sectie 6.

import type { SupabaseClient } from "@supabase/supabase-js";

export interface DagBudgetResultaat {
  verstuurd: number;
  budget: number;
  resterend: number;
  dagStart: string;
}

// Daggrens is vandaag 00:00 in Europe/Amsterdam, berekend via de
// Amsterdamse datumnotatie zodat een DST-overgang de grens niet 1 uur laat
// verschuiven (zelfde probleem als de "vandaag" telling in PageTracker,
// zie CLAUDE.md technische lessen).
export function daggrens(nu: Date = new Date()): Date {
  const datumString = nu.toLocaleDateString("en-CA", { timeZone: "Europe/Amsterdam" }); // YYYY-MM-DD
  return new Date(`${datumString}T00:00:00+00:00`);
}

// Weekgrens (maandag 00:00 UTC), losstaand van het dagbudget hierboven: dit
// blijft nodig voor de "deze week vs vorige week"-vergelijking op het
// Vandaag-dashboard (blok 3), wat een kalenderweek-rapportage is en geen
// verzendbudget. Een kleine afwijking rond middernacht t.o.v.
// Europe/Amsterdam is voor dat doel acceptabel (zichtbaar richtgetal, geen
// harde grens).
export function maandagGrens(nu: Date = new Date()): Date {
  const dagVanWeek = (nu.getUTCDay() + 6) % 7; // maandag = 0
  return new Date(Date.UTC(nu.getUTCFullYear(), nu.getUTCMonth(), nu.getUTCDate() - dagVanWeek));
}

export async function berekenDagbudget(
  supabase: SupabaseClient,
  nu: Date = new Date()
): Promise<DagBudgetResultaat> {
  const budgetEnv = Number(process.env.OUTREACH_DAGBUDGET);
  const budget = Number.isFinite(budgetEnv) && budgetEnv > 0 ? budgetEnv : 25;

  const start = daggrens(nu);

  const { count, error } = await supabase
    .from("outreach_contacts")
    .select("id", { count: "exact", head: true })
    .gte("verstuurd_at", start.toISOString());

  if (error) throw error;

  const verstuurd = count ?? 0;
  return {
    verstuurd,
    budget,
    resterend: Math.max(0, budget - verstuurd),
    dagStart: start.toISOString(),
  };
}
