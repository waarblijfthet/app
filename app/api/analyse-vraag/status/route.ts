import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { vraagstapStatus } from "@/lib/vraagstap";

/**
 * GET /api/analyse-vraag/status: staat de vraagstap aan? Alleen een ja of nee
 * naar buiten, geen aantallen. Faalt de telling, dan staat hij uit: liever het
 * oude tekstscherm dan een belofte die niet waargemaakt wordt.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const status = await vraagstapStatus(createServiceClient());
    return NextResponse.json({ aan: status.aan });
  } catch (e) {
    console.error("analyse-vraag/status: telling mislukt", e);
    return NextResponse.json({ aan: false });
  }
}
