import { fmtEur } from "@/lib/quiz-types";
import {
  bepaalRichting,
  RICHTING_LABEL,
  RICHTING_PIL,
  verschilTekst,
} from "./vergelijking-labels";

interface MiniVergelijkingProps {
  jij: number;
  benchmark: number;
  /** Zet "Voorlopig:" voor het verschil, want het beeld is nog niet compleet. */
  voorlopig?: boolean;
}

export default function MiniVergelijking({
  jij,
  benchmark,
  voorlopig = true,
}: MiniVergelijkingProps) {
  if (!jij || !benchmark) return null;

  const richting = bepaalRichting(jij, benchmark);
  const verschil = verschilTekst(jij, benchmark);

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span
        className={`inline-flex items-center text-xs font-body font-medium px-2.5 py-1 rounded-full ${RICHTING_PIL[richting]}`}
      >
        {RICHTING_LABEL[richting]}
      </span>
      <span className="font-body text-xs text-text-muted">
        {verschil ? `${voorlopig ? "Voorlopig: " : ""}${verschil}. ` : ""}
        Vergelijkbare huishoudens: {fmtEur(benchmark)}
      </span>
    </div>
  );
}
