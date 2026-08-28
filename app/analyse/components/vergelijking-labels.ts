import { fmtEur } from "@/lib/quiz-types";

/**
 * Presentatielaag voor de live vergelijking (21-aug-2026).
 *
 * De rekenkundige status komt uit getVergelijkingStatus in lib/benchmarks.ts en
 * blijft ongewijzigd. Wat hier gebeurt is puur tekst en kleur: tijdens het
 * invullen mag de vergelijking geen oordeel uitspreken. "Meer" is niet
 * automatisch "slecht", dus geen waarschuwingsicoon en geen alarmkleur zolang
 * iemand nog aan het invullen is.
 */
export type Richting = "lager" | "rond" | "hoger";

/**
 * Naast de relatieve marge ook een bodem in euro's (28-aug-2026, pass 4). Op een
 * post van 80 euro is tien procent acht euro, en dan kreeg een verschil van 15
 * euro het label "hoger dan gemiddeld" en kantelde het daarmee de conclusietekst
 * in de uitkomst. Onder dit bedrag noemen we het niet, want dat is ruis binnen
 * schattingen die de bezoeker uit zijn hoofd invult.
 */
const BODEM_EUR = 25;

export function bepaalRichting(
  jij: number,
  benchmark: number,
  tolerantie = 0.1
): Richting {
  if (!benchmark) return "rond";
  const verschil = jij - benchmark;
  if (Math.abs(verschil) < BODEM_EUR) return "rond";
  const pct = verschil / benchmark;
  if (pct < -tolerantie) return "lager";
  if (pct > tolerantie) return "hoger";
  return "rond";
}

export const RICHTING_LABEL: Record<Richting, string> = {
  lager: "Lager dan gemiddeld",
  rond: "Ongeveer gemiddeld",
  hoger: "Hoger dan gemiddeld",
};

export const RICHTING_PIL: Record<Richting, string> = {
  lager: "bg-[#E7F1EE] text-[#0B7A6E]",
  rond: "bg-[#F0F3F1] text-[#4A5A56]",
  hoger: "bg-[#F6EEE8] text-[#A15A32]",
};

export const RICHTING_BALK: Record<Richting, string> = {
  lager: "bg-accent",
  rond: "bg-primary",
  hoger: "bg-[#C4603A]",
};

/** Korte, feitelijke toelichting bij een categorie. Geen oordeel. */
export function verschilTekst(jij: number, benchmark: number): string {
  const verschil = jij - benchmark;
  if (!benchmark || Math.abs(verschil) < BODEM_EUR) return "";
  return verschil > 0
    ? `${fmtEur(verschil)} boven gemiddeld`
    : `${fmtEur(Math.abs(verschil))} onder gemiddeld`;
}
