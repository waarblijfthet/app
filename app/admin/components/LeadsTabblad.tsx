"use client";

import { useState, useMemo } from "react";
import { Lead } from "../page";

interface Props {
  leads: Lead[];
}

const PER_PAGINA = 25;

function exporteerCSV(leads: Lead[]) {
  const headers = [
    "Email",
    "Naam",
    "Bron",
    "Datum",
    "Quiz voltooid",
    "Marketing toestemming",
  ];
  const rijen = leads.map((l) => [
    l.email,
    l.naam || "",
    l.bron,
    new Date(l.created_at).toLocaleDateString("nl-NL"),
    l.quiz_voltooid ? "Ja" : "Nee",
    l.toestemming_marketing ? "Ja" : "Nee",
  ]);
  const csv = [headers, ...rijen].map((r) => r.join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsTabblad({ leads }: Props) {
  const [zoek, setZoek] = useState("");
  const [pagina, setPagina] = useState(1);

  const gefilterd = useMemo(
    () =>
      leads.filter(
        (l) =>
          l.email.toLowerCase().includes(zoek.toLowerCase()) ||
          (l.naam && l.naam.toLowerCase().includes(zoek.toLowerCase()))
      ),
    [leads, zoek]
  );

  const aantalPaginas = Math.ceil(gefilterd.length / PER_PAGINA);
  const zichtbaar = gefilterd.slice(
    (pagina - 1) * PER_PAGINA,
    pagina * PER_PAGINA
  );

  function handleZoek(v: string) {
    setZoek(v);
    setPagina(1);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-text-muted">
            <strong className="text-primary">{gefilterd.length}</strong> leads
          </span>
          <input
            type="search"
            value={zoek}
            onChange={(e) => handleZoek(e.target.value)}
            placeholder="Zoek op email of naam…"
            className="input-base w-64 text-sm py-2"
            aria-label="Zoek leads"
          />
        </div>
        <button
          onClick={() => exporteerCSV(gefilterd)}
          className="btn-outline text-sm py-2 px-4"
        >
          ↓ Exporteer CSV
        </button>
      </div>

      {/* Tabel */}
      <div className="rounded-xl overflow-hidden shadow-card border border-[#E8E0D0]">
        <table className="w-full text-sm font-body border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {["Email", "Naam", "Bron", "Datum", "Quiz", "Marketing"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wide first:pl-5"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {zichtbaar.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-text-muted bg-card"
                >
                  Geen leads gevonden
                </td>
              </tr>
            ) : (
              zichtbaar.map((lead, i) => (
                <tr
                  key={lead.id}
                  className={`border-b border-[#E8E0D0] last:border-0 ${
                    i % 2 === 0 ? "bg-card" : "bg-background"
                  }`}
                >
                  <td className="px-4 py-3 pl-5 text-primary font-medium">
                    {lead.email}
                  </td>
                  <td className="px-4 py-3 text-text-soft">
                    {lead.naam || <span className="text-text-muted">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#F0EDE6] text-text-soft text-xs px-2 py-0.5 rounded-full">
                      {lead.bron}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(lead.created_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {lead.quiz_voltooid ? (
                      <span className="text-[#2D6A4F]">✓</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {lead.toestemming_marketing ? (
                      <span className="text-[#2D6A4F]">✓</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginering */}
      {aantalPaginas > 1 && (
        <div className="flex items-center gap-2 justify-center mt-5">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="px-3 py-1.5 rounded-lg border border-[#D6CEBC] text-sm font-body text-text-soft hover:border-primary disabled:opacity-40"
          >
            ←
          </button>
          {Array.from({ length: aantalPaginas }, (_, i) => i + 1)
            .filter(
              (p) => p === 1 || p === aantalPaginas || Math.abs(p - pagina) <= 1
            )
            .reduce<(number | "…")[]>((acc, p, idx, arr) => {
              if (idx > 0 && (arr[idx - 1] as number) < p - 1) acc.push("…");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="text-text-muted text-sm px-1">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPagina(p as number)}
                  className={`w-8 h-8 rounded-lg text-sm font-body font-medium transition-all ${
                    pagina === p
                      ? "bg-primary text-white"
                      : "border border-[#D6CEBC] text-text-soft hover:border-primary"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => setPagina((p) => Math.min(aantalPaginas, p + 1))}
            disabled={pagina === aantalPaginas}
            className="px-3 py-1.5 rounded-lg border border-[#D6CEBC] text-sm font-body text-text-soft hover:border-primary disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
