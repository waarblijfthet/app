import { fmtEur } from "@/lib/quiz-types";
import { bepaalRichting } from "../../components/vergelijking-labels";
import type { AfwijkingEntry } from "./types";

/**
 * Eén categorie: elke balk draagt zijn eigen label en bedrag, op dezelfde
 * schaal (beide gedeeld door hetzelfde max), zodat de lengte direct en zonder
 * legenda te lezen is. Geen bedrag hoeft uit een balk afgeleid te worden, het
 * staat er altijd ook gewoon bij in tekst.
 */
function CategorieVergelijking({
  label,
  jij,
  benchmark,
  interpretatie,
}: {
  label: string;
  jij: number;
  benchmark: number;
  interpretatie: string;
}) {
  const richting = bepaalRichting(jij, benchmark);
  const verschil = jij - benchmark;
  const max = Math.max(jij, benchmark, 1);
  const verschilTekst =
    richting === "rond"
      ? "Ongeveer gelijk aan vergelijkbare huishoudens"
      : `${fmtEur(Math.abs(verschil))} ${richting} per maand`;
  const verschilKleur =
    richting === "hoger"
      ? "text-[#A15A32]"
      : richting === "lager"
      ? "text-[#0B7A6E]"
      : "text-text-muted";

  return (
    <div className="py-6 border-b border-[#E6E9E7] last:border-0">
      <div className="flex justify-between items-baseline gap-3 mb-4">
        <span className="section-eyebrow">{label}</span>
        <span className={`text-sm font-body font-medium ${verschilKleur}`}>{verschilTekst}</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-body text-xs text-text-muted">Vergelijkbare huishoudens</span>
            <span className="font-body text-sm text-text-soft">{fmtEur(benchmark)}</span>
          </div>
          <div className="h-2.5 bg-[#F0F3F1] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#B2CCC6]"
              style={{ width: `${(benchmark / max) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-body text-xs text-text-muted">Jullie</span>
            <span className="font-body text-sm font-medium text-primary">{fmtEur(jij)}</span>
          </div>
          <div className="h-2.5 bg-[#F0F3F1] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${richting === "hoger" ? "bg-[#C4603A]" : "bg-primary"}`}
              style={{ width: `${(jij / max) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className="font-body text-sm text-text-soft mt-4 leading-relaxed">{interpretatie}</p>
    </div>
  );
}

interface Props {
  opvallend: AfwijkingEntry[];
  zinVoor: (a: AfwijkingEntry, i: number) => string;
  onVerder: () => void;
}

/**
 * Uitkomst 2 van 4: maximaal drie afwijkingen, constaterend, niet oordelend.
 */
export default function Resultaat2Verschil({ opvallend, zinVoor, onVerder }: Props) {
  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2 leading-snug">
        Hier zit het grootste verschil.
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-8">
        Dit zijn de uitgaven die het meest afwijken van vergelijkbare huishoudens.
      </p>

      {opvallend.length > 0 && (
        <div className="card-base border border-[#E6E9E7]">
          {opvallend.map((a, i) => (
            <CategorieVergelijking
              key={a.label}
              label={a.label}
              jij={a.jij}
              benchmark={a.bench}
              interpretatie={zinVoor(a, i)}
            />
          ))}
        </div>
      )}

      <p className="font-body font-light text-text-soft text-sm text-center mt-8 mb-5 leading-relaxed">
        Je ziet nu waar jullie het meest afwijken. Maar deze cijfers vertellen nog niet waarom.
      </p>

      <div className="text-center">
        <button type="button" onClick={onVerder} className="btn-primary">
          Wat betekent dit verschil? →
        </button>
      </div>
    </div>
  );
}
