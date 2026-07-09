"use client";

import { useState, useEffect, useCallback } from "react";

interface IndexingRow {
  id: string;
  url: string;
  status: string;
  verdict: string | null;
  coverage_state: string | null;
  last_submitted_at: string | null;
  last_crawled_at: string | null;
  submit_count: number;
  error_message: string | null;
}

interface Summary {
  total: number;
  pending: number;
  submitted: number;
  indexed: number;
  not_indexed: number;
  error: number;
}

interface CronRun {
  ran_at: string;
  status: string;
  duration_ms: number | null;
  result: {
    inspected?: number;
    indexed?: number;
    not_indexed?: number;
    errors?: number;
    error?: string;
  } | null;
}

interface StatusResponse {
  rows: IndexingRow[];
  summary: Summary;
  lastCronRun: CronRun | null;
}

interface InspectDebug {
  siteUrl?: string;
  tokenAccount?: string;
  urlsChecked?: number;
}

interface InspectResponse {
  inspected?: number;
  indexed?: number;
  not_indexed?: number;
  errors?: string[];
  urlResults?: Record<string, string>;
  debug?: InspectDebug;
  error?: string;
  done?: boolean;
  remaining?: number;
  runStartedAt?: string;
}

// Leest het antwoord eerst als tekst en probeert het dan pas als JSON te parsen.
// Zo crasht de UI nooit op een platform-foutpagina ("An error occurred…") die
// geen geldige JSON is; we tonen dan een nette melding met de HTTP-status.
async function leesJson<T>(res: Response): Promise<{ data: T | null; raw: string }> {
  const raw = await res.text();
  try {
    return { data: JSON.parse(raw) as T, raw };
  } catch {
    return { data: null, raw };
  }
}

interface ActionResult {
  message: string;
  type: "success" | "error" | "info";
  errors?: string[];
  debug?: InspectDebug;
}

const STATUS_BADGE: Record<string, { label: string; kleur: string }> = {
  pending:     { label: "pending",           kleur: "bg-gray-100 text-gray-600" },
  submitted:   { label: "ingediend",         kleur: "bg-amber-100 text-amber-700" },
  indexed:     { label: "geïndexeerd",       kleur: "bg-green-100 text-green-700" },
  not_indexed: { label: "niet geïndexeerd",  kleur: "bg-red-100 text-red-700" },
  error:       { label: "fout ×",            kleur: "bg-red-100 text-red-700" },
};

function datumKort(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function datumTijd(iso: string): string {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function urlKort(url: string): string {
  return url.replace("https://www.waarblijfthet.nl", "") || "/";
}

function ArtikelKaart({
  artikel,
  featured = false,
}: {
  artikel: IndexingRow;
  featured?: boolean;
}) {
  return null; // unused placeholder
}

export default function IndexingTabblad() {
  const [rows, setRows] = useState<IndexingRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [lastCronRun, setLastCronRun] = useState<CronRun | null>(null);
  const [laden, setLaden] = useState(true);
  const [bezig, setBezig] = useState<string | null>(null);
  const [resultaat, setResultaat] = useState<ActionResult | null>(null);
  const [foutUitgeklapt, setFoutUitgeklapt] = useState(false);
  const [debugUitgeklapt, setDebugUitgeklapt] = useState(false);

  const laadStatus = useCallback(async () => {
    setLaden(true);
    try {
      const res = await fetch("/api/admin/indexing/status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as StatusResponse;
      setRows(data.rows ?? []);
      setSummary(data.summary ?? null);
      setLastCronRun(data.lastCronRun ?? null);
    } catch (err) {
      setResultaat({ message: `Laden mislukt: ${String(err)}`, type: "error" });
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => { void laadStatus(); }, [laadStatus]);

  async function syncUrls() {
    setBezig("sync");
    setResultaat(null);
    try {
      const res = await fetch("/api/admin/indexing/sync", { method: "POST" });
      const data = await res.json() as { added?: number; total?: number; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResultaat({ message: `Sync klaar: ${data.added} URLs verwerkt (totaal: ${data.total})`, type: "success" });
      await laadStatus();
    } catch (err) {
      setResultaat({ message: `Sync mislukt: ${String(err)}`, type: "error" });
    } finally {
      setBezig(null);
    }
  }

  async function indienen(urls?: string[]) {
    setBezig("submit");
    setResultaat(null);
    try {
      const res = await fetch("/api/admin/indexing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(urls ? { urls } : {}),
      });
      const data = await res.json() as { submitted?: number; skipped?: number; errors?: string[]; error?: string };
      if (res.status === 429) {
        setResultaat({ message: data.error ?? "Dagelijks limiet bereikt", type: "info" });
        return;
      }
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      const errCount = data.errors?.length ?? 0;
      setFoutUitgeklapt(false);
      setResultaat({
        message: `${data.submitted ?? 0} ingediend, ${data.skipped ?? 0} overgeslagen${errCount > 0 ? ` · ${errCount} fout(en)` : ""}`,
        type: errCount > 0 ? "error" : "success",
        errors: data.errors,
      });
      await laadStatus();
    } catch (err) {
      setResultaat({ message: `Indienen mislukt: ${String(err)}`, type: "error" });
    } finally {
      setBezig(null);
    }
  }

  async function inspecteer(urls?: string[]) {
    setBezig(urls ? `inspect-${urls[0]}` : "inspect");
    setResultaat(null);
    setFoutUitgeklapt(false);
    setDebugUitgeklapt(false);

    // Eén losse stap-aanroep. Geeft de geparste response terug, of gooit een
    // nette Error als de server geen geldige JSON teruggaf (bijv. een time-out).
    async function stap(body: Record<string, unknown>): Promise<InspectResponse> {
      const res = await fetch("/api/admin/indexing/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const { data, raw } = await leesJson<InspectResponse>(res);
      if (!data) {
        const kort = raw.replace(/\s+/g, " ").trim().slice(0, 140);
        throw new Error(
          `server gaf een ${res.status}-antwoord zonder geldige JSON${kort ? ` ("${kort}…")` : ""}`
        );
      }
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      return data;
    }

    try {
      // Eén URL: enkele aanroep, geen lus nodig.
      if (urls) {
        const data = await stap({ urls });
        const errCount = data.errors?.length ?? 0;
        setResultaat({
          message: `${data.inspected ?? 0} gecheckt · ${data.indexed ?? 0} geïndexeerd · ${data.not_indexed ?? 0} niet geïndexeerd${errCount > 0 ? ` · ${errCount} fout(en)` : ""}`,
          type: errCount > 0 ? "error" : "success",
          errors: data.errors,
          debug: data.debug,
        });
        await laadStatus();
        return;
      }

      // Hele wachtrij: blijf stappen aanroepen tot de server done=true meldt.
      const runStartedAt = new Date().toISOString();
      let inspected = 0;
      let indexed = 0;
      let not_indexed = 0;
      const errors: string[] = [];
      let laatsteDebug: InspectDebug | undefined;

      for (let i = 0; i < 50; i++) {
        const data = await stap({ runStartedAt });
        inspected += data.inspected ?? 0;
        indexed += data.indexed ?? 0;
        not_indexed += data.not_indexed ?? 0;
        if (data.errors) errors.push(...data.errors);
        laatsteDebug = data.debug;

        // Tussenstand tonen zolang er nog werk in de wachtrij staat.
        if (!data.done) {
          setResultaat({
            message: `Bezig… ${inspected} gecheckt · ${indexed} geïndexeerd · ${not_indexed} niet geïndexeerd · nog ${data.remaining ?? 0} te gaan`,
            type: "info",
          });
        }
        if (data.done) break;
      }

      setResultaat({
        message: `${inspected} gecheckt · ${indexed} geïndexeerd · ${not_indexed} niet geïndexeerd${errors.length > 0 ? ` · ${errors.length} fout(en)` : ""}`,
        type: errors.length > 0 ? "error" : "success",
        errors,
        debug: laatsteDebug,
      });
      await laadStatus();
    } catch (err) {
      setResultaat({ message: `Inspectie mislukt: ${String(err)}`, type: "error" });
    } finally {
      setBezig(null);
    }
  }

  const resultaatKleur = resultaat?.type === "success"
    ? "bg-green-50 border-green-200 text-green-800"
    : resultaat?.type === "error"
    ? "bg-red-50 border-red-200 text-red-800"
    : "bg-amber-50 border-amber-200 text-amber-800";

  return (
    <div className="space-y-6">

      {/* Laatste automatische run */}
      {lastCronRun ? (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm px-4 py-2.5 rounded-lg border ${
          lastCronRun.status === "ok"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <span>
            🕐 <strong>Laatste automatische run:</strong> {datumTijd(lastCronRun.ran_at)}
          </span>
          {lastCronRun.result && lastCronRun.status === "ok" && (
            <span className="opacity-75">
              {lastCronRun.result.inspected ?? 0} gecheckt · {lastCronRun.result.indexed ?? 0} geïndexeerd · {lastCronRun.result.not_indexed ?? 0} niet geïndexeerd
              {(lastCronRun.result.errors ?? 0) > 0 && ` · ${lastCronRun.result.errors} fout(en)`}
            </span>
          )}
          {lastCronRun.status === "error" && (
            <span className="opacity-75">{lastCronRun.result?.error ?? "onbekende fout"}</span>
          )}
          {lastCronRun.duration_ms != null && (
            <span className="opacity-50 text-xs">{(lastCronRun.duration_ms / 1000).toFixed(1)}s</span>
          )}
        </div>
      ) : !laden ? (
        <div className="text-sm px-4 py-2.5 rounded-lg border border-[#E6E9E7] bg-[#F7F8F7] text-[#8B958F]">
          🕐 Nog geen automatische run gedraaid. Eerste run is morgen om 09:00.
        </div>
      ) : null}

      {/* Statusbalk */}
      {summary && (
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Pending",           waarde: summary.pending,     kleur: "bg-gray-100 text-gray-700" },
            { label: "Ingediend",         waarde: summary.submitted,   kleur: "bg-amber-100 text-amber-700" },
            { label: "Geïndexeerd",       waarde: summary.indexed,     kleur: "bg-green-100 text-green-700" },
            { label: "Niet geïndexeerd",  waarde: summary.not_indexed, kleur: "bg-red-100 text-red-700" },
            { label: "Fout",              waarde: summary.error,       kleur: "bg-red-100 text-red-700" },
          ].map((p) => (
            <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${p.kleur}`}>
              {p.label}: <strong>{p.waarde}</strong>
            </span>
          ))}
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#E6E9E7] text-[#4A5A56]">
            Totaal: <strong className="ml-1">{summary.total}</strong>
          </span>
        </div>
      )}

      {/* Actieknoppen */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={syncUrls}
          disabled={!!bezig}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#16211F] text-white hover:bg-[#2D6A4F] disabled:opacity-50 transition-colors"
        >
          {bezig === "sync" ? "Bezig…" : "🔄 Sync URLs"}
        </button>
        <button
          type="button"
          onClick={() => void indienen()}
          disabled={!!bezig}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0B7A6E] text-white hover:bg-[#0A6A5F] disabled:opacity-50 transition-colors"
        >
          {bezig === "submit" ? "Bezig…" : "📤 Indienen bij Google (max 200/dag)"}
        </button>
        <button
          type="button"
          onClick={() => void inspecteer()}
          disabled={!!bezig}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#16211F] text-[#16211F] hover:bg-[#E8F0EB] disabled:opacity-50 transition-colors"
        >
          {bezig === "inspect" ? "Bezig…" : "🔍 Status ophalen"}
        </button>
        <button
          type="button"
          onClick={() => void laadStatus()}
          disabled={!!bezig || laden}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#D9DEDC] text-[#4A5A56] hover:bg-[#F7F8F7] disabled:opacity-50 transition-colors"
        >
          ↻ Vernieuwen
        </button>
      </div>

      {/* Resultaatmelding */}
      {resultaat && (
        <div className={`rounded-lg border text-sm ${resultaatKleur}`}>
          <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-2">
            <span>{resultaat.message}</span>
            <div className="flex gap-3">
              {resultaat.debug && (
                <button
                  type="button"
                  onClick={() => setDebugUitgeklapt((v) => !v)}
                  className="underline text-xs opacity-70 hover:opacity-100 whitespace-nowrap"
                >
                  {debugUitgeklapt ? "Verberg debug" : "🔧 Debug info"}
                </button>
              )}
              {resultaat.errors && resultaat.errors.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFoutUitgeklapt((v) => !v)}
                  className="underline text-xs opacity-70 hover:opacity-100 whitespace-nowrap"
                >
                  {foutUitgeklapt ? "Verberg fouten" : `⚠ ${resultaat.errors.length} fout(en)`}
                </button>
              )}
            </div>
          </div>
          {debugUitgeklapt && resultaat.debug && (
            <div className="border-t border-current/20 px-4 py-3 space-y-1 font-mono text-xs">
              <div><strong>siteUrl:</strong> {resultaat.debug.siteUrl ?? "—"}</div>
              <div><strong>tokenAccount:</strong> {resultaat.debug.tokenAccount ?? "—"}</div>
              <div><strong>urlsChecked:</strong> {resultaat.debug.urlsChecked ?? "—"}</div>
            </div>
          )}
          {foutUitgeklapt && resultaat.errors && resultaat.errors.length > 0 && (
            <div className="border-t border-current/20 px-4 py-3 space-y-1">
              {resultaat.errors.map((e, i) => (
                <div key={i} className="font-mono text-xs break-all opacity-90">{e}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* URL-tabel */}
      {laden ? (
        <p className="text-sm text-[#4A5A56]">Laden…</p>
      ) : rows.length === 0 ? (
        <div className="text-center py-12 text-[#4A5A56] text-sm">
          <p>Geen URLs gevonden. Klik op <strong>Sync URLs</strong> om te beginnen.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E6E9E7]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F8F7] border-b border-[#E6E9E7]">
                <th className="text-left px-4 py-3 font-medium text-[#16211F]">URL / Fout</th>
                <th className="text-left px-4 py-3 font-medium text-[#16211F]">Status</th>
                <th className="text-left px-4 py-3 font-medium text-[#16211F]">Verdict</th>
                <th className="text-left px-4 py-3 font-medium text-[#16211F]">Laatste crawl</th>
                <th className="text-left px-4 py-3 font-medium text-[#16211F]">Ingediend</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const badge = STATUS_BADGE[row.status] ?? { label: row.status, kleur: "bg-gray-100 text-gray-600" };
                const bezigMetDezeUrl = bezig === `inspect-${row.url}`;
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-[#E6E9E7] ${i % 2 === 0 ? "bg-white" : "bg-[#FFFFFF]"} hover:bg-[#F7F8F7] transition-colors`}
                  >
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-mono text-xs text-[#16211F] truncate" title={row.url}>
                        {urlKort(row.url)}
                      </div>
                      {row.error_message && (
                        <details className="mt-1">
                          <summary className="text-xs text-red-600 cursor-pointer select-none">
                            ⚠ Fout, klik voor details
                          </summary>
                          <div className="mt-1 text-xs text-red-600 break-all leading-snug font-mono bg-red-50 rounded p-2">
                            {row.error_message}
                          </div>
                        </details>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badge.kleur}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#4A5A56]">{row.verdict ?? "—"}</td>
                    <td className="px-4 py-3 text-[#4A5A56]">{datumKort(row.last_crawled_at)}</td>
                    <td className="px-4 py-3 text-[#4A5A56]">{datumKort(row.last_submitted_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => void inspecteer([row.url])}
                          disabled={!!bezig}
                          className="text-xs px-2.5 py-1 rounded border border-[#16211F] text-[#16211F] hover:bg-[#E8F0EB] disabled:opacity-40 transition-colors whitespace-nowrap"
                        >
                          {bezigMetDezeUrl ? "…" : "🔍"}
                        </button>
                        {row.status !== "indexed" && (
                          <button
                            type="button"
                            onClick={() => void indienen([row.url])}
                            disabled={!!bezig}
                            className="text-xs px-2.5 py-1 rounded border border-[#0B7A6E] text-[#0B7A6E] hover:bg-[#FDF0EC] disabled:opacity-40 transition-colors whitespace-nowrap"
                          >
                            {row.status === "pending" ? "Indienen" : "Opnieuw"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
