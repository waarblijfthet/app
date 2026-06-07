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

interface StatusResponse {
  rows: IndexingRow[];
  summary: Summary;
}

interface ActionResult {
  message: string;
  type: "success" | "error" | "info";
  errors?: string[];
}

const STATUS_BADGE: Record<string, { label: string; kleur: string }> = {
  pending:     { label: "pending",        kleur: "bg-gray-100 text-gray-600" },
  submitted:   { label: "ingediend",      kleur: "bg-amber-100 text-amber-700" },
  indexed:     { label: "geïndexeerd",    kleur: "bg-green-100 text-green-700" },
  not_indexed: { label: "niet geïndexeerd", kleur: "bg-red-100 text-red-700" },
  error:       { label: "fout ×",         kleur: "bg-red-100 text-red-700" },
};

function datumKort(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function urlKort(url: string): string {
  return url.replace("https://www.waarblijfthet.nl", "") || "/";
}

export default function IndexingTabblad() {
  const [rows, setRows] = useState<IndexingRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [laden, setLaden] = useState(true);
  const [bezig, setBezig] = useState<string | null>(null);
  const [resultaat, setResultaat] = useState<ActionResult | null>(null);
  const [foutUitgeklapt, setFoutUitgeklapt] = useState(false);

  const laadStatus = useCallback(async () => {
    setLaden(true);
    try {
      const res = await fetch("/api/admin/indexing/status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as StatusResponse;
      setRows(data.rows ?? []);
      setSummary(data.summary ?? null);
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
      setResultaat({ message: `Sync klaar — ${data.added} URLs verwerkt (totaal: ${data.total})`, type: "success" });
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
    setBezig("inspect");
    setResultaat(null);
    try {
      const res = await fetch("/api/admin/indexing/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(urls ? { urls } : {}),
      });
      const data = await res.json() as { inspected?: number; indexed?: number; not_indexed?: number; errors?: string[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      const errCount = data.errors?.length ?? 0;
      setFoutUitgeklapt(false);
      setResultaat({
        message: `${data.inspected ?? 0} gecheckt · ${data.indexed ?? 0} geïndexeerd · ${data.not_indexed ?? 0} niet geïndexeerd${errCount > 0 ? ` · ${errCount} fout(en)` : ""}`,
        type: errCount > 0 ? "error" : "success",
        errors: data.errors,
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
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#E8E0D0] text-[#4A5E4E]">
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
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1C3A2A] text-white hover:bg-[#2D6A4F] disabled:opacity-50 transition-colors"
        >
          {bezig === "sync" ? "Bezig…" : "🔄 Sync URLs"}
        </button>
        <button
          type="button"
          onClick={() => void indienen()}
          disabled={!!bezig}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#C4603A] text-white hover:bg-[#b05530] disabled:opacity-50 transition-colors"
        >
          {bezig === "submit" ? "Bezig…" : "📤 Indienen bij Google (max 200/dag)"}
        </button>
        <button
          type="button"
          onClick={() => void inspecteer()}
          disabled={!!bezig}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#1C3A2A] text-[#1C3A2A] hover:bg-[#E8F0EB] disabled:opacity-50 transition-colors"
        >
          {bezig === "inspect" ? "Bezig…" : "🔍 Status ophalen"}
        </button>
        <button
          type="button"
          onClick={() => void laadStatus()}
          disabled={!!bezig || laden}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#D6CEBC] text-[#4A5E4E] hover:bg-[#F5F0E8] disabled:opacity-50 transition-colors"
        >
          ↻ Vernieuwen
        </button>
      </div>

      {/* Resultaatmelding */}
      {resultaat && (
        <div className={`rounded-lg border text-sm ${resultaatKleur}`}>
          <div className="flex items-center justify-between px-4 py-3">
            <span>{resultaat.message}</span>
            {resultaat.errors && resultaat.errors.length > 0 && (
              <button
                type="button"
                onClick={() => setFoutUitgeklapt((v) => !v)}
                className="ml-4 underline text-xs opacity-70 hover:opacity-100 whitespace-nowrap"
              >
                {foutUitgeklapt ? "Verberg details" : "Toon foutdetails"}
              </button>
            )}
          </div>
          {foutUitgeklapt && resultaat.errors && resultaat.errors.length > 0 && (
            <div className="border-t border-current/20 px-4 py-3 space-y-1">
              {resultaat.errors.map((e, i) => (
                <div key={i} className="font-mono text-xs break-all opacity-90">
                  {e}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* URL-tabel */}
      {laden ? (
        <p className="text-sm text-[#4A5E4E]">Laden…</p>
      ) : rows.length === 0 ? (
        <div className="text-center py-12 text-[#4A5E4E] text-sm">
          <p>Geen URLs gevonden. Klik op <strong>Sync URLs</strong> om te beginnen.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E8E0D0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F0E8] border-b border-[#E8E0D0]">
                <th className="text-left px-4 py-3 font-medium text-[#1C3A2A]">URL / Fout</th>
                <th className="text-left px-4 py-3 font-medium text-[#1C3A2A]">Status</th>
                <th className="text-left px-4 py-3 font-medium text-[#1C3A2A]">Verdict</th>
                <th className="text-left px-4 py-3 font-medium text-[#1C3A2A]">Laatste crawl</th>
                <th className="text-left px-4 py-3 font-medium text-[#1C3A2A]">Ingediend</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const badge = STATUS_BADGE[row.status] ?? { label: row.status, kleur: "bg-gray-100 text-gray-600" };
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-[#E8E0D0] ${i % 2 === 0 ? "bg-white" : "bg-[#FDFAF4]"} hover:bg-[#F5F0E8] transition-colors`}
                  >
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-mono text-xs text-[#1C3A2A] truncate" title={row.url}>
                        {urlKort(row.url)}
                      </div>
                      {row.error_message && (
                        <div className="mt-1 text-xs text-red-600 break-all leading-snug" title={row.error_message}>
                          ⚠ {row.error_message.length > 120
                            ? row.error_message.slice(0, 120) + "…"
                            : row.error_message}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badge.kleur}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#4A5E4E]">
                      {row.verdict ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[#4A5E4E]">
                      {datumKort(row.last_crawled_at)}
                    </td>
                    <td className="px-4 py-3 text-[#4A5E4E]">
                      {datumKort(row.last_submitted_at)}
                    </td>
                    <td className="px-4 py-3">
                      {row.status !== "indexed" && (
                        <button
                          type="button"
                          onClick={() => void indienen([row.url])}
                          disabled={!!bezig}
                          className="text-xs px-2.5 py-1 rounded border border-[#C4603A] text-[#C4603A] hover:bg-[#FDF0EC] disabled:opacity-40 transition-colors whitespace-nowrap"
                        >
                          {row.status === "pending" ? "Indienen" : "Opnieuw indienen"}
                        </button>
                      )}
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
