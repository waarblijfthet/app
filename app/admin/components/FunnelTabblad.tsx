"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Lead, IntakeAanvraag } from "../page";

interface Props {
  leads: Lead[];
  aanvragen: IntakeAanvraag[];
}

type FilterOptie = "week" | "maand" | "alles";

type BezoekRij = { pagina: string; sessie_id: string; created_at: string };
type VoortgangRij = { max_stap: number | null; voltooid: boolean | null; created_at: string; totaal_inkomen: number | null; maandelijks_over: number | null; verdict: string | null; aantal_kinderen: number | null; woonsituatie: string | null; eerste_interactie: boolean | null; apparaat: string | null };

const PAGINA_LABELS: Record<string, string> = {
  "/": "Homepage",
  "/analyse": "Analyse",
  "/inzichten": "Inzichten overzicht",
  "/aanbod": "Aanbod",
  "/over": "Over ons",
  "/woordenlijst": "Woordenlijst",
};

function paginaLabel(pagina: string) {
  if (PAGINA_LABELS[pagina]) return PAGINA_LABELS[pagina];
  if (pagina.startsWith("/inzichten/")) return pagina.replace("/inzichten/", "📄 ");
  return pagina;
}

function vanafMs(filter: FilterOptie): number {
  if (filter === "week") return Date.now() - 7 * 864e5;
  if (filter === "maand") return Date.now() - 30 * 864e5;
  return 0;
}

function pct(deel: number, totaal: number): string {
  if (totaal <= 0) return "—";
  return Math.round((deel / totaal) * 100) + "%";
}

export default function FunnelTabblad({ leads, aanvragen }: Props) {
  const [bezoeken, setBezoeken] = useState<BezoekRij[]>([]);
  const [voortgang, setVoortgang] = useState<VoortgangRij[]>([]);
  const [laden, setLaden] = useState(true);
  const [filter, setFilter] = useState<FilterOptie>("maand");

  useEffect(() => {
    let actief = true;
    async function laad() {
      setLaden(true);
      const supabase = createClient();
      const sinds = new Date(vanafMs(filter)).toISOString();
      const [bezoekRes, voortgangRes] = await Promise.all([
        supabase
          .from("paginabezoeken")
          .select("pagina,sessie_id,created_at")
          .gte("created_at", sinds)
          .order("created_at", { ascending: false })
          .limit(8000),
        supabase
          .from("quiz_voortgang")
          .select("max_stap,voltooid,created_at,totaal_inkomen,maandelijks_over,verdict,aantal_kinderen,woonsituatie,eerste_interactie,apparaat")
          .order("created_at", { ascending: false })
          .gte("created_at", sinds)
          .limit(8000),
      ]);
      if (actief) {
        setBezoeken((bezoekRes.data as BezoekRij[]) ?? []);
        setVoortgang((voortgangRes.data as VoortgangRij[]) ?? []);
        setLaden(false);
      }
    }
    laad();
    return () => {
      actief = false;
    };
  }, [filter]);

  const grens = vanafMs(filter);

  // Period-filtered counts uit props
  const aantalLeads = useMemo(
    () => leads.filter((l) => new Date(l.created_at).getTime() >= grens).length,
    [leads, grens]
  );
  const aantalAanvragen = useMemo(
    () => aanvragen.filter((a) => new Date(a.created_at).getTime() >= grens).length,
    [aanvragen, grens]
  );

  // Sessie -> bezochte pagina's
  const { bezoekers, analyseGestart, paginaNaarAnalyse } = useMemo(() => {
    const sessiePaginas = new Map<string, Set<string>>();
    bezoeken.forEach((b) => {
      if (!sessiePaginas.has(b.sessie_id)) sessiePaginas.set(b.sessie_id, new Set());
      sessiePaginas.get(b.sessie_id)!.add(b.pagina);
    });
    const bezoekers = sessiePaginas.size;
    let analyseGestart = 0;
    sessiePaginas.forEach((set) => {
      if (set.has("/analyse")) analyseGestart++;
    });

    // Per pagina: hoeveel sessies zagen 'm, en hoeveel daarvan ook /analyse
    const zag = new Map<string, number>();
    const zagEnAnalyse = new Map<string, number>();
    sessiePaginas.forEach((set) => {
      const heeftAnalyse = set.has("/analyse");
      set.forEach((p) => {
        if (p === "/analyse") return;
        zag.set(p, (zag.get(p) ?? 0) + 1);
        if (heeftAnalyse) zagEnAnalyse.set(p, (zagEnAnalyse.get(p) ?? 0) + 1);
      });
    });
    const paginaNaarAnalyse = Array.from(zag.entries())
      .map(([pagina, sessies]) => ({
        pagina,
        sessies,
        naarAnalyse: zagEnAnalyse.get(pagina) ?? 0,
        ratio: sessies > 0 ? (zagEnAnalyse.get(pagina) ?? 0) / sessies : 0,
      }))
      .filter((r) => r.sessies >= 3)
      .sort((a, b) => b.naarAnalyse - a.naarAnalyse || b.ratio - a.ratio)
      .slice(0, 15);

    return { bezoekers, analyseGestart, paginaNaarAnalyse };
  }, [bezoeken]);

  const stapTrechter = useMemo(() => {
    const labels = ["1. Profiel", "2. Inkomsten", "3. Wonen", "4. Vervoer", "5. Dagelijks", "6. Resultaat"];
    const starts = voortgang.length;
    const bereikt = labels.map(
      (_, i) => voortgang.filter((v) => (v.max_stap ?? 1) >= i + 1).length
    );
    const voltooid = voortgang.filter((v) => v.voltooid).length;
    const gestart = voortgang.filter((v) => v.eerste_interactie === true).length;
    return { labels, starts, bereikt, voltooid, gestart };
  }, [voortgang]);

  // Apparaat-verdeling: geladen vs begon in te vullen vs voltooid.
  const apparaatSplit = useMemo(() => {
    const tel = (filterFn: (v: VoortgangRij) => boolean) => {
      let mobiel = 0;
      let desktop = 0;
      let onbekend = 0;
      voortgang.filter(filterFn).forEach((v) => {
        if (v.apparaat === "mobiel") mobiel++;
        else if (v.apparaat === "desktop") desktop++;
        else onbekend++;
      });
      return { mobiel, desktop, onbekend };
    };
    return {
      geladen: tel(() => true),
      gestart: tel((v) => v.eerste_interactie === true),
      voltooid: tel((v) => v.voltooid === true),
    };
  }, [voortgang]);

  const stappen = [
    { label: "Bezoekers (unieke sessies)", waarde: bezoekers, vorige: 0 },
    { label: "Analyse gestart", waarde: analyseGestart, vorige: bezoekers },
    { label: "Analyse voltooid", waarde: stapTrechter.voltooid, vorige: analyseGestart },
    { label: "E-mail achtergelaten (lead)", waarde: aantalLeads, vorige: stapTrechter.voltooid },
    { label: "Betaalde aanvraag", waarde: aantalAanvragen, vorige: aantalLeads },
  ];
  const maxWaarde = Math.max(bezoekers, 1);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(["week", "maand", "alles"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize font-body ${
              filter === f
                ? "bg-[#16211F] text-[#F7F8F7] border-[#16211F]"
                : "bg-white text-[#4A5A56] border-[#E6E9E7] hover:border-[#16211F]"
            }`}
          >
            {f === "week" ? "7 dagen" : f === "maand" ? "30 dagen" : "Alles"}
          </button>
        ))}
      </div>

      {laden ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#16211F] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Funnel */}
          <div className="bg-white rounded-xl border border-[#E6E9E7] p-5 mb-6">
            <p className="text-xs font-medium text-[#4A5A56] mb-4 uppercase tracking-wider font-body">
              Conversie-funnel
            </p>
            <div className="space-y-3">
              {stappen.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#16211F] font-body">{s.label}</span>
                    <span className="text-sm font-body">
                      <strong className="text-[#16211F]">{s.waarde}</strong>
                      {i > 0 && (
                        <span className="text-[#8B958F] ml-2">
                          {pct(s.waarde, s.vorige)} van vorige stap
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="h-3 bg-[#F0F3F1] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, (s.waarde / maxWaarde) * 100)}%`,
                        backgroundColor: i === 0 ? "#16211F" : i === stappen.length - 1 ? "#2D6A4F" : "#0B7A6E",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#8B958F] mt-4 font-body">
              Eindconversie bezoeker → betaalde aanvraag:{" "}
              <strong>{pct(aantalAanvragen, bezoekers)}</strong>. &ldquo;Analyse
              voltooid&rdquo; en verder zijn periodetotalen; de stap-percentages
              zijn indicatief (niet sessie-gekoppeld).
            </p>
          </div>

          {/* Stap-voor-stap drop-off binnen de analyse */}
          <div className="bg-white rounded-xl border border-[#E6E9E7] p-5 mb-6">
            <p className="text-xs font-medium text-[#4A5A56] mb-1 uppercase tracking-wider font-body">
              Drop-off binnen de analyse (per stap)
            </p>
            <p className="text-xs text-[#8B958F] mb-4 font-body">
              Hoeveel mensen elke stap bereikten. Waar de balk terugloopt, haken
              mensen af.
            </p>
            {stapTrechter.starts === 0 ? (
              <p className="text-sm text-[#8B958F] py-6 text-center font-body">
                Nog geen voortgangsdata. (Verschijnt zodra de tabel
                quiz_voortgang bestaat en iemand de analyse start.)
              </p>
            ) : (
              <div className="space-y-2.5">
                {stapTrechter.labels.map((label, i) => {
                  const aantal = stapTrechter.bereikt[i];
                  const start = stapTrechter.bereikt[0] || 1;
                  const vorige = i > 0 ? stapTrechter.bereikt[i - 1] : aantal;
                  const drop = vorige - aantal;
                  return (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xs text-[#16211F] font-body w-24 flex-shrink-0">
                        {label}
                      </span>
                      <div className="flex-1 h-4 bg-[#F0F3F1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#16211F] rounded-full"
                          style={{ width: `${Math.round((aantal / start) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-body text-[#4A5A56] w-28 text-right flex-shrink-0">
                        {aantal}
                        {i > 0 && drop > 0 && (
                          <span className="text-[#B03A2E]"> (−{drop})</span>
                        )}
                      </span>
                    </div>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-[#F0F3F1] space-y-1">
                  <p className="text-xs text-[#4A5A56] font-body">
                    Pagina geladen: <strong>{stapTrechter.starts}</strong> · Begon in te
                    vullen: <strong>{stapTrechter.gestart}</strong>{" "}
                    ({pct(stapTrechter.gestart, stapTrechter.starts)}) · Voltooid:{" "}
                    <strong>{stapTrechter.voltooid}</strong>{" "}
                    ({pct(stapTrechter.voltooid, stapTrechter.starts)}).
                  </p>
                  <p className="text-xs text-[#8B958F] font-body">
                    Het verschil tussen geladen en begon in te vullen is de afhaak
                    op het introscherm (vóór de eerste vraag). &ldquo;Begon in te
                    vullen&rdquo; telt vanaf het moment dat de nieuwe meting live staat.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Apparaat-verdeling */}
          {stapTrechter.starts > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E9E7] p-5 mb-6">
              <p className="text-xs font-medium text-[#4A5A56] mb-1 uppercase tracking-wider font-body">
                Apparaat
              </p>
              <p className="text-xs text-[#8B958F] mb-4 font-body">
                Mobiel versus desktop per fase. Veel mobiel met een lage start = de
                drempel zit waarschijnlijk op mobiel.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full text-sm" style={{ minWidth: "440px" }}>
                  <thead>
                    <tr className="bg-[#16211F]">
                      {["Fase", "Mobiel", "Desktop", "Onbekend"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-[#F7F8F7] font-medium text-xs font-body">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Geladen", v: apparaatSplit.geladen },
                      { label: "Begon in te vullen", v: apparaatSplit.gestart },
                      { label: "Voltooid", v: apparaatSplit.voltooid },
                    ].map((rij, i) => (
                      <tr key={rij.label} className={i % 2 === 0 ? "bg-white" : "bg-[#FFFFFF]"}>
                        <td className="px-3 py-2 text-[#16211F] text-xs font-body">{rij.label}</td>
                        <td className="px-3 py-2 text-[#4A5A56] text-xs font-body">{rij.v.mobiel}</td>
                        <td className="px-3 py-2 text-[#4A5A56] text-xs font-body">{rij.v.desktop}</td>
                        <td className="px-3 py-2 text-[#8B958F] text-xs font-body">{rij.v.onbekend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Laatste voltooide analyses (anoniem, uit quiz_voortgang) */}
          {voortgang.filter((v) => v.voltooid).length > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E9E7] p-5 mb-6">
              <p className="text-xs font-medium text-[#4A5A56] mb-1 uppercase tracking-wider font-body">
                Laatste voltooide analyses
              </p>
              <p className="text-xs text-[#8B958F] mb-3 font-body">
                Anonieme afronding (geen e-mail vereist). Volledige resultaten met contactgegevens staan onder &ldquo;Analyse resultaten&rdquo;.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full text-sm" style={{ minWidth: "520px" }}>
                  <thead>
                    <tr className="bg-[#16211F]">
                      {["Datum", "Profiel", "Inkomen", "Houdt over", "Oordeel"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-[#F7F8F7] font-medium text-xs font-body">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {voortgang
                      .filter((v) => v.voltooid)
                      .slice(0, 12)
                      .map((v, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FFFFFF]"}>
                          <td className="px-3 py-2 text-[#8B958F] text-xs font-body whitespace-nowrap">
                            {new Date(v.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
                          </td>
                          <td className="px-3 py-2 text-[#4A5A56] text-xs font-body">
                            {v.woonsituatie ?? "—"}, {v.aantal_kinderen ?? 0} kind(eren)
                          </td>
                          <td className="px-3 py-2 text-[#16211F] text-xs font-body">
                            {v.totaal_inkomen ? "€" + v.totaal_inkomen.toLocaleString("nl-NL") : "—"}
                          </td>
                          <td className="px-3 py-2 text-xs font-body" style={{ color: (v.maandelijks_over ?? 0) < 0 ? "#B03A2E" : "#2D6A4F" }}>
                            {v.maandelijks_over != null ? "€" + v.maandelijks_over.toLocaleString("nl-NL") : "—"}
                          </td>
                          <td className="px-3 py-2 text-xs font-body">
                            <span className="px-2 py-0.5 rounded-full" style={{
                              backgroundColor: v.verdict === "goed" ? "#E7F1EE" : v.verdict === "matig" ? "#FDF3E3" : "#FDECEA",
                              color: v.verdict === "goed" ? "#2D6A4F" : v.verdict === "matig" ? "#92600A" : "#B03A2E",
                            }}>
                              {v.verdict ?? "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagina's naar analyse */}
          <div className="bg-white rounded-xl border border-[#E6E9E7] p-5">
            <p className="text-xs font-medium text-[#4A5A56] mb-1 uppercase tracking-wider font-body">
              Welke pagina&apos;s leiden naar de analyse?
            </p>
            <p className="text-xs text-[#8B958F] mb-4 font-body">
              Sessies die deze pagina én de analyse bezochten. Hoge ratio = sterke
              doorstroom naar de tool.
            </p>
            {paginaNaarAnalyse.length === 0 ? (
              <p className="text-sm text-[#8B958F] py-6 text-center font-body">
                Nog te weinig data in deze periode.
              </p>
            ) : (
              <div className="space-y-2.5">
                {paginaNaarAnalyse.map((r) => (
                  <div key={r.pagina} className="flex items-center gap-3">
                    <span className="text-xs text-[#16211F] font-body w-44 flex-shrink-0 truncate" title={r.pagina}>
                      {paginaLabel(r.pagina)}
                    </span>
                    <div className="flex-1 h-4 bg-[#F0F3F1] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2D6A4F] rounded-full"
                        style={{ width: `${Math.round(r.ratio * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-body text-[#4A5A56] w-32 text-right flex-shrink-0">
                      {r.naarAnalyse}/{r.sessies} → {Math.round(r.ratio * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
