"use client";

import { useState, useEffect, useCallback } from "react";

type Mode = "site-queries" | "site-pages" | "page-queries";

interface Rij {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface Totals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface Range {
  startDate: string;
  endDate: string;
  days: number;
}
interface ApiResponse {
  rows?: Rij[];
  totals?: Totals | null;
  range?: Range | null;
  cached?: boolean;
  error?: string;
}

type SortKey = "key" | "clicks" | "impressions" | "ctr" | "position";

async function leesJson<T>(res: Response): Promise<{ data: T | null; raw: string }> {
  const raw = await res.text();
  try {
    return { data: JSON.parse(raw) as T, raw };
  } catch {
    return { data: null, raw };
  }
}

const HOST = "https://www.waarblijfthet.nl";
function urlKort(url: string): string {
  return url.replace(HOST, "") || "/";
}
const getal = (n: number) => Math.round(n).toLocaleString("nl-NL");
const pct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;
const pos = (n: number) => n.toFixed(1).replace(".", ",");
function datumKort(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}

export default function ZoekwoordenTabblad() {
  const [mode, setMode] = useState<Mode>("site-queries");
  const [page, setPage] = useState<string | null>(null);
  const [days, setDays] = useState<7 | 28 | 90>(28);
  const [rows, setRows] = useState<Rij[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const [cached, setCached] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("clicks");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const laad = useCallback(
    async (refresh = false) => {
      setBezig(true);
      setFout(null);
      try {
        const res = await fetch("/api/admin/search-analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, page, days, refresh }),
        });
        const { data } = await leesJson<ApiResponse>(res);
        if (!data) throw new Error(`server gaf een ${res.status}-antwoord zonder geldige JSON`);
        if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
        setRows(data.rows ?? []);
        setTotals(data.totals ?? null);
        setRange(data.range ?? null);
        setCached(Boolean(data.cached));
      } catch (err) {
        setFout(String(err));
        setRows([]);
        setTotals(null);
      } finally {
        setBezig(false);
      }
    },
    [mode, page, days]
  );

  useEffect(() => {
    void laad(false);
  }, [laad]);

  function kiesMode(m: Mode) {
    setPage(null);
    setMode(m);
  }
  function openPagina(url: string) {
    setPage(url);
    setMode("page-queries");
  }
  function sorteer(k: SortKey) {
    if (k === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(k);
      setSortDir(k === "key" ? "asc" : "desc");
    }
  }

  const gesorteerd = [...rows].sort((a, b) => {
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === "string" && typeof vb === "string") {
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
  });

  const eersteKolom = mode === "site-pages" ? "Pagina" : "Zoekwoord";
  const pill = (actief: boolean) =>
    `text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
      actief
        ? "bg-[#1C3A2A] text-white"
        : "border border-[#D6CEBC] text-[#4A5E4E] hover:bg-[#F5F0E8]"
    }`;
  const sortPijl = (k: SortKey) => (sortKey === k ? (sortDir === "desc" ? " ↓" : " ↑") : "");

  return (
    <div className="space-y-6">
      {/* View-keuze + datumbereik */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={pill(mode === "site-queries")} onClick={() => kiesMode("site-queries")}>
            Top zoekwoorden
          </button>
          <button type="button" className={pill(mode === "site-pages")} onClick={() => kiesMode("site-pages")}>
            Top pagina&apos;s
          </button>
          {mode === "page-queries" && (
            <span className={pill(true)}>Per pagina</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {([7, 28, 90] as const).map((d) => (
            <button key={d} type="button" className={pill(days === d)} onClick={() => setDays(d)}>
              {d}d
            </button>
          ))}
          <button
            type="button"
            onClick={() => void laad(true)}
            disabled={bezig}
            className="text-sm px-3 py-1.5 rounded-lg font-medium border border-[#D6CEBC] text-[#4A5E4E] hover:bg-[#F5F0E8] disabled:opacity-50"
          >
            {bezig ? "Bezig…" : "↻ Vernieuwen"}
          </button>
        </div>
      </div>

      {/* Drill-down teruglink + datumrange */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#4A5E4E]">
        {mode === "page-queries" && page && (
          <button
            type="button"
            onClick={() => kiesMode("site-pages")}
            className="text-[#C4603A] hover:underline"
          >
            ← Terug naar pagina&apos;s
          </button>
        )}
        {mode === "page-queries" && page && (
          <span className="font-mono text-xs text-[#1C3A2A]">{urlKort(page)}</span>
        )}
        {range && (
          <span className="text-[#8A9E8E]">
            {datumKort(range.startDate)} tot {datumKort(range.endDate)}
            {cached && " · uit cache"}
          </span>
        )}
      </div>

      {/* Samenvatting */}
      {totals && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Klikken", waarde: getal(totals.clicks) },
            { label: "Vertoningen", waarde: getal(totals.impressions) },
            { label: "CTR", waarde: pct(totals.ctr) },
            { label: "Gem. positie", waarde: pos(totals.position) },
          ].map((kaart) => (
            <div key={kaart.label} className="rounded-xl bg-[#F5F0E8] border border-[#E8E0D0] px-4 py-3">
              <div className="text-xs text-[#8A9E8E]">{kaart.label}</div>
              <div className="text-2xl font-display font-light text-[#1C3A2A]">{kaart.waarde}</div>
            </div>
          ))}
        </div>
      )}

      {/* Foutmelding */}
      {fout && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm px-4 py-3">
          {fout}
        </div>
      )}

      {/* Tabel */}
      {bezig && rows.length === 0 ? (
        <p className="text-sm text-[#4A5E4E]">Laden…</p>
      ) : !bezig && rows.length === 0 && !fout ? (
        <div className="text-center py-12 text-[#4A5E4E] text-sm">
          Nog geen zoekwoorddata voor deze selectie. Dit verschijnt zodra Google vertoningen registreert.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E8E0D0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F0E8] border-b border-[#E8E0D0]">
                <th
                  className="text-left px-4 py-3 font-medium text-[#1C3A2A] cursor-pointer select-none"
                  onClick={() => sorteer("key")}
                >
                  {eersteKolom}{sortPijl("key")}
                </th>
                {([
                  ["clicks", "Klikken"],
                  ["impressions", "Vertoningen"],
                  ["ctr", "CTR"],
                  ["position", "Positie"],
                ] as [SortKey, string][]).map(([k, label]) => (
                  <th
                    key={k}
                    className="text-right px-4 py-3 font-medium text-[#1C3A2A] cursor-pointer select-none whitespace-nowrap"
                    onClick={() => sorteer(k)}
                  >
                    {label}{sortPijl(k)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gesorteerd.map((r, i) => (
                <tr
                  key={r.key + i}
                  className={`border-b border-[#E8E0D0] ${i % 2 === 0 ? "bg-white" : "bg-[#FDFAF4]"} hover:bg-[#F5F0E8] transition-colors`}
                >
                  <td className="px-4 py-3 max-w-md">
                    {mode === "site-pages" ? (
                      <button
                        type="button"
                        onClick={() => openPagina(r.key)}
                        className="font-mono text-xs text-[#C4603A] hover:underline text-left truncate block max-w-full"
                        title={r.key}
                      >
                        {urlKort(r.key)}
                      </button>
                    ) : (
                      <span className="text-[#1C3A2A] truncate block" title={r.key}>
                        {r.key}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-[#1C3A2A]">{getal(r.clicks)}</td>
                  <td className="px-4 py-3 text-right text-[#4A5E4E]">{getal(r.impressions)}</td>
                  <td className="px-4 py-3 text-right text-[#4A5E4E]">{pct(r.ctr)}</td>
                  <td className="px-4 py-3 text-right text-[#4A5E4E]">{pos(r.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-[#8A9E8E]">
        Data loopt 2 tot 3 dagen achter. Google verbergt zeldzame zoekwoorden, dus de som van
        losse zoekwoorden kan iets lager liggen dan het werkelijke totaal.
      </p>
    </div>
  );
}
