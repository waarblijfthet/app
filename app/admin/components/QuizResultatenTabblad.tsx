"use client";

import { useState, useMemo } from "react";
import { QuizResultaat } from "../page";

interface Props {
  resultaten: QuizResultaat[];
}

function fmtEur(n: number | null) {
  if (n == null) return "—";
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}

function profielSamenvatting(r: QuizResultaat) {
  const delen = [
    r.woonsituatie === "koop" ? "Koop" : r.woonsituatie === "huur" ? "Huur" : null,
    r.aantal_kinderen === 0
      ? "geen kinderen"
      : `${r.aantal_kinderen === 3 ? "3+" : r.aantal_kinderen} kind${r.aantal_kinderen !== 1 ? "eren" : ""}`,
    r.auto_situatie === "geen"
      ? "geen auto"
      : r.auto_situatie === "eigen"
      ? "eigen auto"
      : r.auto_situatie === "lease_privé"
      ? "lease"
      : r.auto_situatie === "zakelijk"
      ? "zakelijk"
      : null,
  ].filter(Boolean);
  return delen.join(", ");
}

const VERDICT_PILL: Record<string, { cls: string; label: string }> = {
  goed: { cls: "bg-green-light text-[#2D6A4F]", label: "🟢 Goed" },
  matig: { cls: "bg-[#FDF3E3] text-[#92600A]", label: "🟡 Matig" },
  zorgelijk: { cls: "bg-[#FDECEA] text-[#B03A2E]", label: "🔴 Zorgelijk" },
};

export default function QuizResultatenTabblad({ resultaten }: Props) {
  const [verdictFilter, setVerdictFilter] = useState("alle");
  const [woonFilter, setWoonFilter] = useState("alle");
  const [kinderenFilter, setKinderenFilter] = useState("alle");
  const [openRij, setOpenRij] = useState<string | null>(null);

  const gefilterd = useMemo(
    () =>
      resultaten.filter((r) => {
        if (verdictFilter !== "alle" && r.verdict !== verdictFilter) return false;
        if (woonFilter !== "alle" && r.woonsituatie !== woonFilter) return false;
        if (kinderenFilter === "geen" && r.aantal_kinderen !== 0) return false;
        if (kinderenFilter === "met" && r.aantal_kinderen === 0) return false;
        return true;
      }),
    [resultaten, verdictFilter, woonFilter, kinderenFilter]
  );

  function FilterBtn({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`text-xs font-body font-medium px-3 py-1.5 rounded-lg transition-all ${
          active
            ? "bg-primary text-white"
            : "bg-card border border-[#D9DEDC] text-text-soft hover:border-primary"
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-5 items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted font-body mr-1">Verdict:</span>
          {["alle", "goed", "matig", "zorgelijk"].map((v) => (
            <FilterBtn key={v} active={verdictFilter === v} onClick={() => setVerdictFilter(v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </FilterBtn>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted font-body mr-1">Woning:</span>
          {[
            { val: "alle", label: "Alle" },
            { val: "koop", label: "Koop" },
            { val: "huur", label: "Huur" },
          ].map((f) => (
            <FilterBtn key={f.val} active={woonFilter === f.val} onClick={() => setWoonFilter(f.val)}>
              {f.label}
            </FilterBtn>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-text-muted font-body mr-1">Kinderen:</span>
          {[
            { val: "alle", label: "Alle" },
            { val: "geen", label: "Geen" },
            { val: "met", label: "Met kinderen" },
          ].map((f) => (
            <FilterBtn key={f.val} active={kinderenFilter === f.val} onClick={() => setKinderenFilter(f.val)}>
              {f.label}
            </FilterBtn>
          ))}
        </div>
        <span className="text-xs text-text-muted font-body ml-auto">
          {gefilterd.length} resultaten
        </span>
      </div>

      {/* Tabel */}
      <div className="rounded-xl overflow-hidden shadow-card border border-[#E6E9E7]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-primary text-white">
                {["Datum", "Email", "Situatie", "Inkomen", "Uitgaven", "Over", "Benchmark", "Verschil", "Verdict", "Afwijking", ""].map(
                  (h) => (
                    <th key={h} className="text-left px-3 py-3 font-medium text-xs uppercase tracking-wide first:pl-5">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {gefilterd.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-10 text-text-muted bg-card">
                    Geen resultaten gevonden
                  </td>
                </tr>
              ) : (
                gefilterd.map((r, i) => (
                  <>
                    <tr
                      key={r.id}
                      onClick={() => setOpenRij(openRij === r.id ? null : r.id)}
                      className={`border-b border-[#E6E9E7] cursor-pointer hover:shadow-card transition-shadow ${
                        i % 2 === 0 ? "bg-card" : "bg-background"
                      }`}
                    >
                      <td className="px-3 py-3 pl-5 text-text-muted whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="px-3 py-3 text-text-soft text-xs max-w-[140px] truncate" title={r.email ?? undefined}>
                        {r.email ?? <span className="text-text-muted">—</span>}
                      </td>
                      <td className="px-3 py-3 text-text-soft text-xs max-w-[140px]">
                        {profielSamenvatting(r)}
                      </td>
                      <td className="px-3 py-3 text-primary font-medium">
                        {fmtEur(r.totaal_inkomen_berekend)}
                      </td>
                      <td className="px-3 py-3 text-text-soft">
                        {fmtEur(r.totaal_uitgaven_berekend)}
                      </td>
                      <td className={`px-3 py-3 font-medium ${
                        (r.maandelijks_over_berekend ?? 0) < 0 ? "text-[#B03A2E]" : "text-primary"
                      }`}>
                        {fmtEur(r.maandelijks_over_berekend)}
                      </td>
                      <td className="px-3 py-3 text-text-muted">
                        {fmtEur(r.benchmark_over_verwacht)}
                      </td>
                      <td className={`px-3 py-3 font-medium ${
                        (r.verschil_met_benchmark ?? 0) >= 0 ? "text-[#2D6A4F]" : "text-[#B03A2E]"
                      }`}>
                        {r.verschil_met_benchmark != null
                          ? `${r.verschil_met_benchmark >= 0 ? "+" : ""}${fmtEur(r.verschil_met_benchmark)}`
                          : "—"}
                      </td>
                      <td className="px-3 py-3">
                        {r.verdict && VERDICT_PILL[r.verdict] ? (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${VERDICT_PILL[r.verdict].cls}`}>
                            {VERDICT_PILL[r.verdict].label}
                          </span>
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-text-soft text-xs">
                        {r.grootste_afwijking || "—"}
                      </td>
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        {r.token ? (
                          <a
                            href={`/resultaat/${r.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary underline hover:no-underline font-body whitespace-nowrap"
                          >
                            Bekijk →
                          </a>
                        ) : (
                          <span className="text-text-muted text-xs">—</span>
                        )}
                      </td>
                    </tr>

                    {/* Uitklapbaar detailpaneel */}
                    {openRij === r.id && (
                      <tr key={`${r.id}-detail`} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                        <td colSpan={11} className="px-5 py-4 border-b border-[#E6E9E7]">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: "Huur/Hypotheek", val: r.wonen_huur_hypotheek },
                              { label: "Energie", val: r.wonen_energie },
                              { label: "Internet/TV", val: r.wonen_internet_tv },
                              { label: "Boodschappen", val: r.boodschappen },
                              { label: "Zorgverzekering", val: r.verzekering_zorg_per_persoon },
                              { label: "Overige verzekeringen", val: r.verzekering_overig },
                            ].map(({ label, val }) => (
                              <div key={label} className="bg-[#F0F3F1] rounded-lg p-3">
                                <p className="text-xs text-text-muted font-body mb-0.5">{label}</p>
                                <p className="text-sm font-medium text-primary font-body">{fmtEur(val)}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-text-muted font-body mt-2 text-center">
        Klik op een rij voor details
      </p>
    </div>
  );
}
