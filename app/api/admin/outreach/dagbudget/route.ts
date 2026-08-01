import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { berekenDagbudget } from "@/lib/outreach/dagbudget";

// GET /api/admin/outreach/dagbudget
// Telt hoeveel eerste mails (verstuurd_at) vandaag al zijn verstuurd,
// tegenover env OUTREACH_DAGBUDGET (standaard 25). Alleen mail 1 telt mee,
// want het budget gaat over nieuwe eerste contacten, niet over
// (automatische) follow-ups. Was tot 1-aug-2026 een weekbudget van 10, op
// verzoek van Jarno omgezet naar een dagbudget en hoger gezet.
// Berekening zit in lib/outreach/dagbudget.ts (gedeeld met /api/admin/vandaag
// en de cron voor automatisch versturen), dit is alleen nog de HTTP-wrapper.
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  try {
    const resultaat = await berekenDagbudget(supabase);
    return NextResponse.json(resultaat);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Kon dagbudget niet berekenen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
