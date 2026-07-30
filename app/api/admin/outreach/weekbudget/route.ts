import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

// GET /api/admin/outreach/weekbudget
// Telt hoeveel eerste mails (verstuurd_at) al de deze week zijn verstuurd,
// tegenover het weekbudget uit env OUTREACH_WEEKBUDGET (standaard 10). Alleen
// mail 1 telt mee, want het budget gaat over nieuwe eerste contacten, niet
// over automatische follow-ups (zie docs/admin-redesign-30-jul-2026.md
// sectie 5a en groeibeslissing-aug-2026.md).
// Weekgrens is maandag 00:00 UTC. Een kleine afwijking rond middernacht t.o.v.
// Europe/Amsterdam is voor dit doel (een zichtbaar richtgetal, geen harde
// blokkade) acceptabel.
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  const budgetEnv = Number(process.env.OUTREACH_WEEKBUDGET);
  const budget = Number.isFinite(budgetEnv) && budgetEnv > 0 ? budgetEnv : 10;

  const nu = new Date();
  const dagVanWeek = (nu.getUTCDay() + 6) % 7; // maandag = 0
  const maandag = new Date(Date.UTC(nu.getUTCFullYear(), nu.getUTCMonth(), nu.getUTCDate() - dagVanWeek));

  const { count, error } = await supabase
    .from("outreach_contacts")
    .select("id", { count: "exact", head: true })
    .gte("verstuurd_at", maandag.toISOString());

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const verstuurd = count ?? 0;
  return NextResponse.json({
    verstuurd,
    budget,
    resterend: Math.max(0, budget - verstuurd),
    weekStart: maandag.toISOString(),
  });
}
