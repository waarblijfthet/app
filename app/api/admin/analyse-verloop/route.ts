import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { haalAlleRijen, leesPeriode, periodeStart } from "@/lib/admin-periode";

/**
 * GET /api/admin/analyse-verloop?periode=vandaag|week|maand|alles
 *
 * Voedt /admin/analyse-verloop (23-sep-2026): hoeveel analyses er geopend en
 * gestart zijn, tot welk scherm iedereen kwam en waar ze afhaakten.
 *
 * Waarom deze route er moest komen: "Analyses voltooid" op Vandaag telde
 * quiz_resultaten, en daar komt alleen een rij in als iemand een e-mailadres
 * achterlaat. De afhaaklijst per scherm van 6-sep-2026 stond in
 * FunnelTabblad.tsx, dat door geen enkele route meer werd geladen. Wie de
 * analyse afrondde zonder e-mail, of halverwege stopte, was dus nergens te
 * zien.
 *
 * De route levert ruwe rijen; welk scherm bij welke positie hoort rekent de
 * pagina uit met dezelfde schermenlijst als de analyse zelf
 * (app/analyse/schermen), zodat die twee nooit uit de pas lopen.
 *
 * Er staat geen naam of e-mailadres in quiz_voortgang; voor de zekerheid
 * worden die sleutels hier ook nog uit de antwoorden gehaald.
 */

type VoortgangRij = {
  id: string;
  sessie_id: string;
  created_at: string;
  updated_at: string;
  huidig_scherm: string | null;
  max_scherm_index: number | null;
  voltooid: boolean | null;
  eerste_interactie: boolean | null;
  apparaat: string | null;
  toestemming_data_asset: boolean | null;
  antwoorden: Record<string, unknown> | null;
};

type AnalyseBezoek = {
  sessie_id: string;
  referrer: string | null;
  created_at: string;
};

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const periode = leesPeriode(request.nextUrl.searchParams.get("periode") ?? "maand");
  const sinds = periodeStart(periode);
  const supabase = createServiceClient();

  try {
    const [voortgang, analyseBezoeken, emailRes, geldscanRes] = await Promise.all([
      haalAlleRijen<VoortgangRij>(
        supabase,
        "quiz_voortgang",
        "id,sessie_id,created_at,updated_at,huidig_scherm,max_scherm_index,voltooid,eerste_interactie,apparaat,toestemming_data_asset,antwoorden",
        (q) => q.gte("created_at", sinds)
      ),
      haalAlleRijen<AnalyseBezoek>(
        supabase,
        "paginabezoeken",
        "sessie_id,referrer,created_at",
        (q) => q.eq("pagina", "/analyse").gte("created_at", sinds)
      ),
      supabase
        .from("quiz_resultaten")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinds),
      supabase
        .from("intake_aanvragen")
        .select("id", { count: "exact", head: true })
        .eq("pakket", "geldscan")
        .gte("created_at", sinds),
    ]);
    if (emailRes.error) throw emailRes.error;
    if (geldscanRes.error) throw geldscanRes.error;

    const sessies = voortgang.map((r) => {
      const antwoorden = { ...(r.antwoorden ?? {}) };
      delete antwoorden.email;
      delete antwoorden.naam;
      return {
        id: r.id,
        sessie_id: r.sessie_id,
        created_at: r.created_at,
        updated_at: r.updated_at,
        huidig_scherm: r.huidig_scherm,
        max_scherm_index: r.max_scherm_index ?? 0,
        voltooid: r.voltooid === true,
        eerste_interactie: r.eerste_interactie === true,
        apparaat: r.apparaat,
        toestemming_data_asset: r.toestemming_data_asset === true,
        antwoorden: antwoorden,
      };
    });

    return NextResponse.json({
      periode: periode,
      sinds: sinds,
      sessies: sessies,
      analyseBezoeken: analyseBezoeken,
      emailAchtergelaten: emailRes.count ?? 0,
      geldscanAanvragen: geldscanRes.count ?? 0,
    });
  } catch (e) {
    console.error("admin/analyse-verloop: ophalen mislukt", e);
    const message = e instanceof Error ? e.message : "Kon het analyse-verloop niet laden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
