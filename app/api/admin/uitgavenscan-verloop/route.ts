import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { haalAlleRijen, leesPeriode, periodeStart } from "@/lib/admin-periode";
import type { VoortgangRij } from "@/lib/uitgavenscan/verloop";

/**
 * GET /api/admin/uitgavenscan-verloop?periode=vandaag|week|maand|alles (9-nov-2026)
 * Ruwe rijen uit uitgavenscan_voortgang; /admin/uitgavenscan-verloop rekent de trechter uit met
 * lib/uitgavenscan/verloop.ts. Er staan geen bedragen of namen in deze tabel.
 */
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const periode = leesPeriode(request.nextUrl.searchParams.get("periode") ?? "maand");
  const sinds = periodeStart(periode);
  try {
    const rijen = await haalAlleRijen<VoortgangRij>(
      createServiceClient(),
      "uitgavenscan_voortgang",
      "id,sessie_id,created_at,updated_at,huidig_scherm,max_scherm_index,apparaat,eigenaar,kenmerken,tijden",
      (q) => q.gte("created_at", sinds)
    );
    return NextResponse.json({ periode: periode, sinds: sinds, rijen: rijen });
  } catch (e) {
    console.error("admin/uitgavenscan-verloop: ophalen mislukt", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kon het verloop niet laden." }, { status: 500 });
  }
}
