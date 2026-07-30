import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { berekenWeekbudget } from "@/lib/outreach/weekbudget";

// GET /api/admin/outreach/weekbudget
// Telt hoeveel eerste mails (verstuurd_at) al de deze week zijn verstuurd,
// tegenover het weekbudget uit env OUTREACH_WEEKBUDGET (standaard 10). Alleen
// mail 1 telt mee, want het budget gaat over nieuwe eerste contacten, niet
// over automatische follow-ups (zie docs/admin-redesign-30-jul-2026.md
// sectie 5a en groeibeslissing-aug-2026.md).
// Berekening zit in lib/outreach/weekbudget.ts (gedeeld met /api/admin/vandaag,
// zie sectie 6), dit is alleen nog de HTTP-wrapper eromheen.
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  try {
    const resultaat = await berekenWeekbudget(supabase);
    return NextResponse.json(resultaat);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Kon weekbudget niet berekenen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
