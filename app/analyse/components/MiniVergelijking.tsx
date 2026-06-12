import { getVergelijkingStatus, VergelijkingStatus } from "@/lib/benchmarks";
import { fmtEur } from "@/lib/quiz-types";

interface MiniVergelijkingProps {
  jij: number;
  benchmark: number;
}

const STYLES: Record<VergelijkingStatus, string> = {
  goed: "bg-green-light text-[#2D6A4F]",
  matig: "bg-[#FDF3E3] text-[#92600A]",
  zorgelijk: "bg-[#FDECEA] text-[#B03A2E]",
};

const ICONS: Record<VergelijkingStatus, string> = {
  goed: "✓",
  matig: "~",
  zorgelijk: "⚠",
};

export default function MiniVergelijking({ jij, benchmark }: MiniVergelijkingProps) {
  if (!jij || !benchmark) return null;

  const status = getVergelijkingStatus(jij, benchmark);
  const verschil = Math.abs(jij - benchmark);

  const labels: Record<VergelijkingStatus, string> = {
    goed: `Rond of onder gemiddeld (${fmtEur(benchmark)})`,
    matig: `Rond gemiddeld (${fmtEur(benchmark)})`,
    zorgelijk: `${fmtEur(verschil)} boven gemiddeld`,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-body font-medium px-2.5 py-1 rounded-full ${STYLES[status]}`}
    >
      {ICONS[status]} {labels[status]}
    </span>
  );
}
