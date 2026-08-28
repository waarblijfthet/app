import { fmtEur } from "@/lib/quiz-types";
import type { AfwijkingEntry } from "./types";

function AfwijkingRij({
  label,
  jij,
  benchmark,
  zin,
}: {
  label: string;
  jij: number;
  benchmark: number;
  zin: string;
}) {
  const verschil = jij - benchmark;
  const max = Math.max(jij, benchmark, 1);
  return (
    <div className="py-5 border-b border-[#E6E9E7] last:border-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-body font-medium text-base text-primary">{label}</span>
        <span
          className={`text-sm font-body font-medium ${
            verschil > 0 ? "text-[#A15A32]" : "text-[#0B7A6E]"
          }`}
        >
          {verschil > 0 ? "+" : "-"}
          {fmtEur(Math.abs(verschil))}
        </span>
      </div>
      <p className="font-body text-sm text-text-soft mb-3">{zin}</p>
      <div className="flex gap-4 text-xs text-text-muted font-body mb-2">
        <span>Jullie: {fmtEur(jij)}</span>
        <span>Vergelijkbaar: {fmtEur(benchmark)}</span>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 bg-[#F0F3F1] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              verschil > 100 ? "bg-[#C4603A]" : "bg-primary"
            }`}
            style={{ width: `${(jij / max) * 100}%` }}
          />
        </div>
        <div className="h-2 bg-[#F0F3F1] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#B2CCC6]"
            style={{ width: `${(benchmark / max) * 100}%` }}
          />
        </div>
      </div>
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
 * Als er niets noemenswaardig afwijkt (opvallend is leeg) claimen we ook geen
 * "grootste verschil" dat er niet is, dat zou de waarheidsregels raken.
 */
export default function Resultaat2Verschil({ opvallend, zinVoor, onVerder }: Props) {
  const heeftAfwijkingen = opvallend.length > 0;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2 leading-snug">
        {heeftAfwijkingen ? "Hier zit het grootste verschil." : "Hier valt niets bijzonders op."}
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-8">
        {heeftAfwijkingen
          ? "Dit zijn de uitgaven die het meest afwijken van vergelijkbare huishoudens."
          : "Geen van je uitgaven wijkt duidelijk af van vergelijkbare huishoudens."}
      </p>

      {heeftAfwijkingen && (
        <div className="card-base border border-[#E6E9E7]">
          {opvallend.map((a, i) => (
            <AfwijkingRij
              key={a.label}
              label={a.label}
              jij={a.jij}
              benchmark={a.bench}
              zin={zinVoor(a, i)}
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button type="button" onClick={onVerder} className="btn-primary">
          Wat betekent dit? →
        </button>
      </div>
    </div>
  );
}
