"use client";

import { useState, useMemo, useEffect } from "react";
import { QuizResultaat } from "../page";

interface Props {
  resultaten: QuizResultaat[];
}

function fmtEur(n: number | null) {
  if (n == null) return "geen";
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
  goed: { cls: "bg-green-light text-[#0B7A6E]", label: "🟢 Goed" },
  matig: { cls: "bg-[#FDF3E3] text-[#92600A]", label: "🟡 Matig" },
  zorgelijk: { cls: "bg-[#FDECEA] text-[#B03A2E]", label: "🔴 Zorgelijk" },
};

function Rij({ label, waarde }: { label: string; waarde: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[#E6E9E7] last:border-0">
      <span className="font-body text-sm text-text-soft">{label}</span>
      <span className="font-body text-sm font-medium text-primary text-right">{waarde}</span>
    </div>
  );
}

function Groep({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="font-body text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
        {titel}
      </p>
      <div className="rounded-lg border border-[#E6E9E7] bg-card px-4 py-1">{children}</div>
    </div>
  );
}

/** Grote modal met alles wat deze bezoeker heeft ingevuld, in de volgorde van de analyse. */
function AnalyseModal({ r, onSluit }: { r: QuizResultaat; onSluit: () => void }) {
  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      if (e.key === "Escape") onSluit();
    }
    window.addEventListener("keydown", opToets);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", opToets);
      document.body.style.overflow = "";
    };
  }, [onSluit]);

  const verdict = r.verdict ? VERDICT_PILL[r.verdict] : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-8"
      onClick={onSluit}
      role="dialog"
      aria-modal="true"
      aria-label="Volledige analyse"
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-background shadow-card-hover my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E6E9E7] px-6 py-4">
          <div>
            <p className="font-body text-xs uppercase tracking-wide text-text-muted mb-1">
              Ingevulde analyse
            </p>
            <p className="font-body font-semibold text-primary">
              {r.email ?? "geen e-mailadres achtergelaten"}
            </p>
            <p className="font-body text-xs text-text-muted mt-0.5">
              {new Date(r.created_at).toLocaleString("nl-NL")} · {profielSamenvatting(r)}
            </p>
          </div>
          <button
            onClick={onSluit}
            className="font-body text-sm text-text-muted hover:text-primary shrink-0"
            aria-label="Sluiten"
          >
            Sluiten
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div>
              <Groep titel="Stap 1, profiel">
                <Rij label="Woonsituatie" waarde={r.woonsituatie ?? "geen"} />
                <Rij label="Volwassenen" waarde={r.aantal_volwassenen ?? "geen"} />
                <Rij
                  label="Kinderen"
                  waarde={r.aantal_kinderen === 3 ? "3 of meer" : r.aantal_kinderen}
                />
                <Rij label="Auto" waarde={r.auto_situatie ?? "geen"} />
              </Groep>

              <Groep titel="Stap 2, inkomsten">
                <Rij label="Salaris 1" waarde={fmtEur(r.salaris_1)} />
                <Rij label="Salaris 2" waarde={fmtEur(r.salaris_2)} />
                <Rij label="Totaal inkomen" waarde={fmtEur(r.totaal_inkomen_berekend)} />
              </Groep>

              <Groep titel="Stap 3, wonen">
                <Rij label="Huur of hypotheek" waarde={fmtEur(r.wonen_huur_hypotheek)} />
                <Rij label="Energie" waarde={fmtEur(r.wonen_energie)} />
                <Rij label="Internet en tv" waarde={fmtEur(r.wonen_internet_tv)} />
                <Rij label="Wonen totaal" waarde={fmtEur(r.wonen_totaal)} />
              </Groep>
            </div>

            <div>
              <Groep titel="Stap 4, vervoer en verzekeringen">
                <Rij label="Vervoer totaal" waarde={fmtEur(r.vervoer_totaal)} />
                <Rij label="Zorg per persoon" waarde={fmtEur(r.verzekering_zorg_per_persoon)} />
                <Rij label="Overige verzekeringen" waarde={fmtEur(r.verzekering_overig)} />
                <Rij label="Verzekeringen totaal" waarde={fmtEur(r.verzekering_totaal)} />
              </Groep>

              <Groep titel="Stap 5, dagelijks">
                <Rij label="Boodschappen" waarde={fmtEur(r.boodschappen)} />
                <Rij label="Abonnementen" waarde={fmtEur(r.abonnementen_totaal)} />
                <Rij label="Kinderkosten" waarde={fmtEur(r.kinderen_totaal)} />
              </Groep>

              <Groep titel="Uitkomst">
                <Rij label="Totaal uitgaven" waarde={fmtEur(r.totaal_uitgaven_berekend)} />
                <Rij label="Houdt over" waarde={fmtEur(r.maandelijks_over_berekend)} />
                <Rij label="Verwacht volgens vuistregel" waarde={fmtEur(r.benchmark_over_verwacht)} />
                <Rij label="Verschil" waarde={fmtEur(r.verschil_met_benchmark)} />
                <Rij label="Grootste afwijking" waarde={r.grootste_afwijking ?? "geen"} />
                <Rij
                  label="Oordeel"
                  waarde={
                    verdict ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${verdict.cls}`}>
                        {verdict.label}
                      </span>
                    ) : (
                      "geen"
                    )
                  }
                />
              </Groep>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-[#E6E9E7] pt-4">
            {r.token && (
              <a
                href={`/resultaat/${r.token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-accent hover:underline"
              >
                Bekijk de resultaatpagina die zij zagen &rarr;
              </a>
            )}
            {r.email && (
              <a href={`mailto:${r.email}`} className="font-body text-sm text-accent hover:underline">
                Mail deze persoon &rarr;
              </a>
            )}
            <span className="font-body text-xs text-text-muted ml-auto">
              Leeg betekent: niet ingevuld door de bezoeker.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizResultatenTabblad({ resultaten }: Props) {
  const [verdictFilter, setVerdictFilter] = useState("alle");
  const [woonFilter, setWoonFilter] = useState("alle");
  const [kinderenFilter, setKinderenFilter] = useState("alle");
  const [openRij, setOpenRij] = useState<string | null>(null);
  const open = useMemo(
    () => resultaten.find((r) => r.id === openRij) ?? null,
    [resultaten, openRij]
  );

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
                        {r.email ?? <span className="text-text-muted">geen</span>}
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
                        (r.verschil_met_benchmark ?? 0) >= 0 ? "text-[#0B7A6E]" : "text-[#B03A2E]"
                      }`}>
                        {r.verschil_met_benchmark != null
                          ? `${r.verschil_met_benchmark >= 0 ? "+" : ""}${fmtEur(r.verschil_met_benchmark)}`
                          : "geen"}
                      </td>
                      <td className="px-3 py-3">
                        {r.verdict && VERDICT_PILL[r.verdict] ? (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${VERDICT_PILL[r.verdict].cls}`}>
                            {VERDICT_PILL[r.verdict].label}
                          </span>
                        ) : (
                          <span className="text-text-muted">geen</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-text-soft text-xs">
                        {r.grootste_afwijking || "geen"}
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
                          <span className="text-text-muted text-xs">geen</span>
                        )}
                      </td>
                    </tr>

                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-text-muted font-body mt-2 text-center">
        Klik op een rij voor de volledige ingevulde analyse
      </p>

      {open && <AnalyseModal r={open} onSluit={() => setOpenRij(null)} />}
    </div>
  );
}
