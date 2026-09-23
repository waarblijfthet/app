import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { haalAlleRijen, leesPeriode, periodeStart } from "@/lib/admin-periode";

/**
 * GET /api/admin/bezoekers?periode=vandaag|week|maand|alles
 *
 * Reden (23-sep-2026): het Bezoekers-tabblad haalde in de browser de laatste
 * 500 paginabezoeken op en telde die zelf. Voor vandaag ging dat goed, voor
 * week, maand en alles bleef elk totaal op 500 staan. Nu telt de server.
 *
 * Eerst via de Postgres-functie bezoekers_statistiek (supabase/admin_statistiek.sql,
 * één aanroep). Bestaat die nog niet, dan bladert de route door alle rijen in
 * blokken van 1000 en meldt dat met bron "terugval", zodat het tabblad een
 * zichtbare melding kan tonen in plaats van stil trager te worden
 * (CLAUDE.md 10.3).
 */

type PaginaStat = {
  pagina: string;
  totaal: number;
  mobiel: number;
  desktop: number;
  laatste_bezoek: string;
};

type Statistiek = {
  views: number;
  sessies: number;
  mobiel: number;
  paginas: PaginaStat[];
  steden: { stad: string; aantal: number }[];
};

type Rij = {
  pagina: string;
  apparaat: string | null;
  sessie_id: string;
  stad: string | null;
  created_at: string;
};

function telZelf(rijen: Rij[]): Statistiek {
  const paginaMap = new Map<string, PaginaStat>();
  const stedenMap = new Map<string, number>();
  const sessies = new Set<string>();
  let mobiel = 0;

  for (const r of rijen) {
    sessies.add(r.sessie_id);
    const isMobiel = r.apparaat === "mobiel";
    if (isMobiel) mobiel++;
    const bestaand = paginaMap.get(r.pagina);
    if (bestaand) {
      bestaand.totaal++;
      if (isMobiel) bestaand.mobiel++;
      else bestaand.desktop++;
      if (r.created_at > bestaand.laatste_bezoek) bestaand.laatste_bezoek = r.created_at;
    } else {
      paginaMap.set(r.pagina, {
        pagina: r.pagina,
        totaal: 1,
        mobiel: isMobiel ? 1 : 0,
        desktop: isMobiel ? 0 : 1,
        laatste_bezoek: r.created_at,
      });
    }
    if (r.stad) stedenMap.set(r.stad, (stedenMap.get(r.stad) ?? 0) + 1);
  }

  return {
    views: rijen.length,
    sessies: sessies.size,
    mobiel: mobiel,
    paginas: Array.from(paginaMap.values())
      .sort((a, b) => b.totaal - a.totaal)
      .slice(0, 200),
    steden: Array.from(stedenMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([stad, aantal]) => ({ stad: stad, aantal: aantal })),
  };
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const periode = leesPeriode(request.nextUrl.searchParams.get("periode"));
  const sinds = periodeStart(periode);
  const supabase = createServiceClient();

  try {
    const [statRes, liveRes] = await Promise.all([
      supabase.rpc("bezoekers_statistiek", { sinds: sinds }),
      supabase
        .from("paginabezoeken")
        .select("id,created_at,pagina,apparaat,referrer,sessie_id,stad,regio,land")
        .gte("created_at", sinds)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (liveRes.error) throw liveRes.error;

    let statistiek: Statistiek;
    let bron: "functie" | "terugval" = "functie";

    if (statRes.error || !statRes.data) {
      bron = "terugval";
      const rijen = await haalAlleRijen<Rij>(
        supabase,
        "paginabezoeken",
        "pagina,apparaat,sessie_id,stad,created_at",
        (q) => q.gte("created_at", sinds)
      );
      statistiek = telZelf(rijen);
    } else {
      const ruw = statRes.data as Statistiek;
      statistiek = {
        views: Number(ruw.views),
        sessies: Number(ruw.sessies),
        mobiel: Number(ruw.mobiel),
        paginas: (ruw.paginas ?? []).map((p) => ({
          pagina: p.pagina,
          totaal: Number(p.totaal),
          mobiel: Number(p.mobiel),
          desktop: Number(p.desktop),
          laatste_bezoek: p.laatste_bezoek,
        })),
        steden: (ruw.steden ?? []).map((s) => ({ stad: s.stad, aantal: Number(s.aantal) })),
      };
    }

    return NextResponse.json({
      periode: periode,
      bron: bron,
      statistiek: statistiek,
      live: liveRes.data ?? [],
    });
  } catch (e) {
    console.error("admin/bezoekers: ophalen mislukt", e);
    const message = e instanceof Error ? e.message : "Kon de bezoekcijfers niet laden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
