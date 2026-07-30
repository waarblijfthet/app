// Gedeelde weekbudget-berekening: hoeveel eerste mails (verstuurd_at) zijn
// deze week al verstuurd, tegenover OUTREACH_WEEKBUDGET (standaard 10).
// Eerst alleen in app/api/admin/outreach/weekbudget/route.ts, nu ook gebruikt
// door /api/admin/vandaag zodat blok 2 op Vandaag nooit uit de pas kan lopen
// met wat de outreach-werklijst laat zien.
// Zie docs/admin-redesign-30-jul-2026.md sectie 6.

import type { SupabaseClient } from "@supabase/supabase-js";

export interface WeekBudgetResultaat {
  verstuurd: number;
  budget: number;
  resterend: number;
  weekStart: string;
}

// Weekgrens is maandag 00:00 UTC. Een kleine afwijking rond middernacht
// t.o.v. Europe/Amsterdam is voor dit doel (een zichtbaar richtgetal, geen
// harde blokkade) acceptabel.
export function maandagGrens(nu: Date = new Date()): Date {
  const dagVanWeek = (nu.getUTCDay() + 6) % 7; // maandag = 0
  return new Date(Date.UTC(nu.getUTCFullYear(), nu.getUTCMonth(), nu.getUTCDate() - dagVanWeek));
}

export async function berekenWeekbudget(
  supabase: SupabaseClient,
  nu: Date = new Date()
): Promise<WeekBudgetResultaat> {
  const budgetEnv = Number(process.env.OUTREACH_WEEKBUDGET);
  const budget = Number.isFinite(budgetEnv) && budgetEnv > 0 ? budgetEnv : 10;

  const maandag = maandagGrens(nu);

  const { count, error } = await supabase
    .from("outreach_contacts")
    .select("id", { count: "exact", head: true })
    .gte("verstuurd_at", maandag.toISOString());

  if (error) throw error;

  const verstuurd = count ?? 0;
  return {
    verstuurd,
    budget,
    resterend: Math.max(0, budget - verstuurd),
    weekStart: maandag.toISOString(),
  };
}
