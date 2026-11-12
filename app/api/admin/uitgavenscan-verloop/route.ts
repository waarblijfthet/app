import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { haalAlleRijen, leesPeriode, periodeStart } from "@/lib/admin-periode";
import type { VoortgangRij } from "@/lib/uitgavenscan/verloop";
import { ADVIES_KOLOMMEN, type AdviesRij } from "@/lib/uitgavenscan/adviezen";

/**
 * GET /api/admin/uitgavenscan-verloop?periode=vandaag|week|maand|alles (9-nov-2026)
 * Ruwe rijen uit uitgavenscan_voortgang; /admin/uitgavenscan-verloop rekent de trechter uit met
 * lib/uitgavenscan/verloop.ts. Er staan geen bedragen of namen in deze tabel.
 *
 * 12-nov-2026: ook de bewaarde voorlopige adviezen uit uitgavenscan_adviezen (samenvatting en advies,
 * zonder naam of e-mail). Los opgehaald: ontbreekt die tabel nog, dan werkt de trechter gewoon en
 * krijgt het scherm adviezenFout, zodat het niet stil blijft.
 */
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const periode = leesPeriode(request.nextUrl.searchParams.get("periode") ?? "maand");
  const sinds = periodeStart(periode);
  const supabase = createServiceClient();
  try {
    const rijen = await haalAlleRijen<VoortgangRij>(
      supabase,
      "uitgavenscan_voortgang",
      "id,sessie_id,created_at,updated_at,huidig_scherm,max_scherm_index,apparaat,eigenaar,kenmerken,tijden",
      (q) => q.gte("created_at", sinds)
    );
    let adviezen: AdviesRij[] | null = null;
    let adviezenFout: string | null = null;
    try {
      adviezen = await haalAlleRijen<AdviesRij>(supabase, "uitgavenscan_adviezen", ADVIES_KOLOMMEN, (q) => q.gte("created_at", sinds));
      adviezen.sort((a, b) => b.created_at.localeCompare(a.created_at));
    } catch (e) {
      console.error("admin/uitgavenscan-verloop: adviezen ophalen mislukt", e);
      const m = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : "";
      adviezenFout = m || "Kon de adviezen niet laden.";
    }
    return NextResponse.json({ periode: periode, sinds: sinds, rijen: rijen, adviezen: adviezen, adviezenFout: adviezenFout });
  } catch (e) {
    console.error("admin/uitgavenscan-verloop: ophalen mislukt", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kon het verloop niet laden." }, { status: 500 });
  }
}
