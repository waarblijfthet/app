import { fmtEur } from "@/lib/quiz-types";

/**
 * Rondingsgrootte op basis van het bedrag zelf. Klein bedrag, kleine stap: bij
 * 62 euro internet is een stap van 500 nutteloos, bij 3000 euro hypotheek is
 * een stap van 10 euro overbodige precisie voor een tikbare snelkeuze.
 */
function slimmeStap(bedrag: number): number {
  if (bedrag < 150) return 10;
  if (bedrag < 400) return 25;
  if (bedrag < 1000) return 50;
  if (bedrag < 2500) return 100;
  if (bedrag < 6000) return 250;
  return 500;
}

export interface BedragKeuze {
  value: number;
  label: string;
}

/**
 * Genereert snelkeuzes rond een middelpunt, afgeleid van de bestaande
 * benchmarkdata in plaats van los verzonnen bedragen (28-aug-2026, pass 5).
 * De laatste keuze krijgt een "+", want dat is de hoogste tikbare optie, geen
 * exacte schatting.
 */
export function keuzesRond(
  center: number,
  factoren: number[] = [0.75, 1, 1.25, 1.5]
): BedragKeuze[] {
  const stap = slimmeStap(center);
  const rond = (n: number) => Math.max(stap, Math.round(n / stap) * stap);
  const waarden = Array.from(new Set(factoren.map((f) => rond(center * f)))).sort(
    (a, b) => a - b
  );
  return waarden.map((v, i) => ({
    value: v,
    label: i === waarden.length - 1 ? `${fmtEur(v)}+` : fmtEur(v),
  }));
}
