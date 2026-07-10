"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

type Bezoek = {
  id: string;
  created_at: string;
  pagina: string;
  apparaat: string;
  referrer: string | null;
  sessie_id: string;
  stad: string | null;
  regio: string | null;
  land: string | null;
};

type PaginaStat = {
  pagina: string;
  totaal: number;
  mobiel: number;
  desktop: number;
  laatste_bezoek: string;
};

type FilterOptie = "vandaag" | "week" | "maand" | "alles";
type ViewOptie = "live" | "paginas";

const PAGINA_LABELS: Record<string, string> = {
  "/": "Homepage",
  "/analyse": "Analyse",
  "/inzichten": "Inzichten overzicht",
  "/aanbod": "Aanbod",
  "/aanbod/intake": "Intake formulier",
  "/aanbod/intake/bedankt": "Bedankt pagina",
  "/privacy": "Privacy",
  "/resultaat/[token]": "Resultaat pagina",
};

function paginaLabel(pagina: string) {
  return PAGINA_LABELS[pagina] || pagina;
}

function formatTijd(iso: string) {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function bronLabel(referrer: string | null): string {
  if (!referrer) return "Direct";
  if (referrer.includes("instagram") || referrer.includes("ig.com")) return "📸 Instagram";
  if (referrer.includes("google")) return "🔍 Google";
  if (referrer.includes("facebook") || referrer.includes("fb.com")) return "📘 Facebook";
  if (referrer.includes("linkedin")) return "💼 LinkedIn";
  if (referrer.includes("waarblijfthet.nl")) return "🔁 Intern";
  return "🔗 Overig";
}

function vanafDatum(filter: FilterOptie): string {
  if (filter === "vandaag")
    return new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  if (filter === "week")
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  if (filter === "maand")
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  return new Date(0).toISOString();
}

function isEigenaarGezet(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("wb_eigenaar=true");
}

function setEigenaarCookie() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `wb_eigenaar=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  window.location.reload();
}

function verwijderEigenaarCookie() {
  document.cookie =
    "wb_eigenaar=true; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  window.location.reload();
}

export function BezoekersTabblad() {
  const [bezoeken, setBezoeken] = useState<Bezoek[]>([]);
  const [stats, setStats] = useState<PaginaStat[]>([]);
  const [view, setView] = useState<ViewOptie>("live");
  const [laden, setLaden] = useState(true);
  const [filter, setFilter] = useState<FilterOptie>("week");
  // Client-side cookie state (avoids hydration mismatch)
  const [eigenaarGezet, setEigenaarGezet] = useState(false);

  useEffect(() => {
    setEigenaarGezet(isEigenaarGezet());
  }, []);

  useEffect(() => {
    laadData();
    const interval = setInterval(laadData, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function laadData() {
    const supabase = createClient();
    const { data } = await supabase
      .from("paginabezoeken")
      .select("*")
      .gte("created_at", vanafDatum(filter))
      .order("created_at", { ascending: false })
      .limit(500);

    if (data) {
      setBezoeken(data);

      const paginaMap = new Map<string, PaginaStat>();
      data.forEach((b: Bezoek) => {
        const bestaand = paginaMap.get(b.pagina);
        if (bestaand) {
          bestaand.totaal++;
          if (b.apparaat === "mobiel") bestaand.mobiel++;
          else bestaand.desktop++;
          if (b.created_at > bestaand.laatste_bezoek)
            bestaand.laatste_bezoek = b.created_at;
        } else {
          paginaMap.set(b.pagina, {
            pagina: b.pagina,
            totaal: 1,
            mobiel: b.apparaat === "mobiel" ? 1 : 0,
            desktop: b.apparaat === "desktop" ? 1 : 0,
            laatste_bezoek: b.created_at,
          });
        }
      });

      setStats(
        Array.from(paginaMap.values()).sort((a, b) => b.totaal - a.totaal)
      );
    }
    setLaden(false);
  }

  const totaalBezoeken = bezoeken.length;
  const uniekeSessionen = new Set(bezoeken.map((b) => b.sessie_id)).size;
  const mobieleBezoeken = bezoeken.filter((b) => b.apparaat === "mobiel").length;
  const mobieleP =
    totaalBezoeken > 0
      ? Math.round((mobieleBezoeken / totaalBezoeken) * 100)
      : 0;

  if (laden) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#16211F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Eigenaar filter banner */}
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl mb-4 border ${
          eigenaarGezet
            ? "bg-[#E7F1EE] border-[#B9DDD3]"
            : "bg-[#E4F1EE] border-[#E4F1EE]"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              eigenaarGezet ? "bg-[#0B7A6E]" : "bg-[#0B7A6E]"
            }`}
          />
          <p className="text-sm text-[#16211F] font-body">
            {eigenaarGezet
              ? "Jouw bezoeken worden niet meegeteld"
              : "Jouw bezoeken tellen nu mee in de statistieken"}
          </p>
        </div>
        <button
          onClick={eigenaarGezet ? verwijderEigenaarCookie : setEigenaarCookie}
          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all font-body ${
            eigenaarGezet
              ? "border-[#0B7A6E] text-[#0B7A6E] hover:bg-[#0B7A6E] hover:text-white"
              : "bg-[#0B7A6E] text-white border-[#0B7A6E] hover:opacity-90"
          }`}
        >
          {eigenaarGezet
            ? "Filter verwijderen"
            : "Dit ben ik, filter mijn bezoeken"}
        </button>
      </div>

      {/* Filter + refresh indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {(["vandaag", "week", "maand", "alles"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setLaden(true);
                setFilter(f);
              }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize font-body ${
                filter === f
                  ? "bg-[#16211F] text-[#F7F8F7] border-[#16211F]"
                  : "bg-white text-[#4A5A56] border-[#E6E9E7] hover:border-[#16211F]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8B958F] font-body">
          <div className="w-2 h-2 rounded-full bg-[#0B7A6E] animate-pulse" />
          Ververst elke 30 sec
        </div>
      </div>

      {/* Statistieken */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[#E6E9E7] text-center">
          <p
            className="text-2xl font-semibold text-[#16211F]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {totaalBezoeken}
          </p>
          <p className="text-xs text-[#8B958F] mt-1 font-body">Paginabezoeken</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E6E9E7] text-center">
          <p
            className="text-2xl font-semibold text-[#16211F]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {uniekeSessionen}
          </p>
          <p className="text-xs text-[#8B958F] mt-1 font-body">Unieke sessies</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E6E9E7] text-center">
          <p
            className="text-2xl font-semibold text-[#0B7A6E]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {mobieleP}%
          </p>
          <p className="text-xs text-[#8B958F] mt-1 font-body">Mobiel</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-[#E6E9E7] mb-4">
        {(
          [
            ["live", "Live feed"],
            ["paginas", "Per pagina"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors font-body ${
              view === key
                ? "text-[#16211F] border-b-2 border-[#16211F]"
                : "text-[#8B958F] hover:text-[#4A5A56]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Live feed */}
      {view === "live" && (
        <div className="bg-white rounded-xl border border-[#E6E9E7] overflow-hidden">
          {bezoeken.length === 0 ? (
            <div className="text-center py-12 text-[#8B958F] text-sm font-body">
              Nog geen bezoeken in deze periode
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="w-full text-sm" style={{ minWidth: "620px" }}>
                <thead>
                  <tr className="bg-[#16211F]">
                    <th className="text-left px-4 py-3 text-[#F7F8F7] font-medium text-xs font-body">
                      Pagina
                    </th>
                    <th className="text-left px-4 py-3 text-[#F7F8F7] font-medium text-xs font-body">
                      Apparaat
                    </th>
                    <th className="text-left px-4 py-3 text-[#F7F8F7] font-medium text-xs font-body hidden sm:table-cell">
                      Locatie
                    </th>
                    <th className="text-left px-4 py-3 text-[#F7F8F7] font-medium text-xs font-body">
                      Tijdstip
                    </th>
                    <th className="text-left px-4 py-3 text-[#F7F8F7] font-medium text-xs font-body hidden sm:table-cell">
                      Bron
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bezoeken.slice(0, 50).map((b, i) => (
                    <tr
                      key={b.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FFFFFF]"}
                    >
                      <td className="px-4 py-2.5 text-[#16211F] font-medium text-xs font-body max-w-[240px]">
                        <span className="block truncate" title={b.pagina}>
                          {paginaLabel(b.pagina)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium font-body ${
                            b.apparaat === "mobiel"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#E7F1EE] text-[#0B7A6E]"
                          }`}
                        >
                          {b.apparaat === "mobiel" ? "📱 Mobiel" : "💻 Desktop"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[#8B958F] text-xs font-body hidden sm:table-cell">
                        {b.stad
                          ? `${b.stad}${b.regio ? `, ${b.regio}` : ""}`
                          : b.land || "Onbekend"}
                      </td>
                      <td className="px-4 py-2.5 text-[#8B958F] text-xs font-body">
                        {formatTijd(b.created_at)}
                      </td>
                      <td className="px-4 py-2.5 text-[#8B958F] text-xs font-body hidden sm:table-cell">
                        {bronLabel(b.referrer)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Per pagina */}
      {view === "paginas" && (
        <div className="space-y-3">
          {stats.length === 0 ? (
            <div className="text-center py-12 text-[#8B958F] text-sm bg-white rounded-xl border border-[#E6E9E7] font-body">
              Nog geen bezoeken in deze periode
            </div>
          ) : (
            <>
              {stats.map((s) => (
                <div
                  key={s.pagina}
                  className="bg-white rounded-xl p-4 border border-[#E6E9E7]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-[#16211F] text-sm font-body">
                      {paginaLabel(s.pagina)}
                    </p>
                    <span
                      className="text-lg font-semibold text-[#16211F]"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {s.totaal}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-[#0B7A6E] rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (s.totaal / (stats[0]?.totaal || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#8B958F] font-body">
                    <div className="flex gap-3">
                      <span>📱 {s.mobiel} mobiel</span>
                      <span>💻 {s.desktop} desktop</span>
                    </div>
                    <span>Laatste: {formatTijd(s.laatste_bezoek)}</span>
                  </div>
                </div>
              ))}

              {/* Top steden */}
              <div className="mt-6">
                <p className="text-xs font-medium text-[#4A5A56] mb-3 uppercase tracking-wider font-body">
                  Top steden
                </p>
                <div className="bg-white rounded-xl border border-[#E6E9E7] overflow-hidden">
                  {(() => {
                    const stedenMap = new Map<string, number>();
                    bezoeken.forEach((b) => {
                      if (b.stad) {
                        stedenMap.set(b.stad, (stedenMap.get(b.stad) || 0) + 1);
                      }
                    });
                    const steden = Array.from(stedenMap.entries())
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 8);
                    const max = steden[0]?.[1] || 1;

                    return steden.length > 0 ? (
                      <div className="p-4 space-y-2">
                        {steden.map(([stad, aantal]) => (
                          <div key={stad} className="flex items-center gap-3">
                            <span className="text-xs text-[#4A5A56] w-28 flex-shrink-0 font-body">
                              {stad}
                            </span>
                            <div className="flex-1 h-4 bg-[#F0F3F1] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#16211F] rounded-full transition-all"
                                style={{ width: `${(aantal / max) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-[#16211F] w-6 text-right font-body">
                              {aantal}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8B958F] p-4 font-body">
                        Nog geen locatiedata beschikbaar
                      </p>
                    );
                  })()}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
