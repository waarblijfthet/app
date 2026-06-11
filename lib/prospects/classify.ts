// Doelgroep-classificatie op basis van trefwoorden in de paginatekst

import { Doelgroep, DOELGROEPEN } from "./types";

const TREFWOORDEN: Record<Doelgroep, { woord: string; gewicht: number }[]> = {
  relatietherapeuten: [
    { woord: "relatietherapie", gewicht: 3 },
    { woord: "relatietherapeut", gewicht: 3 },
    { woord: "systeemtherapie", gewicht: 2 },
    { woord: "gezinstherapie", gewicht: 2 },
    { woord: "emotionally focused", gewicht: 2 },
    { woord: "eft", gewicht: 1 },
    { woord: "stellen", gewicht: 1 },
    { woord: "relatieproblemen", gewicht: 2 },
    { woord: "partners", gewicht: 1 },
  ],
  budgetcoaches: [
    { woord: "budgetcoach", gewicht: 3 },
    { woord: "budgetcoaching", gewicht: 3 },
    { woord: "budgetbeheer", gewicht: 2 },
    { woord: "geldzorgen", gewicht: 2 },
    { woord: "schuldhulp", gewicht: 2 },
    { woord: "huishoudboekje", gewicht: 2 },
    { woord: "rondkomen", gewicht: 1 },
    { woord: "geldplan", gewicht: 1 },
  ],
  "financieel-planners": [
    { woord: "financieel planner", gewicht: 3 },
    { woord: "financiële planning", gewicht: 3 },
    { woord: "financiele planning", gewicht: 3 },
    { woord: "vermogensopbouw", gewicht: 2 },
    { woord: "pensioenadvies", gewicht: 2 },
    { woord: "hypotheekadvies", gewicht: 2 },
    { woord: "vermogensplanning", gewicht: 2 },
    { woord: "ffp", gewicht: 2 },
    { woord: "financieel advies", gewicht: 1 },
  ],
  "burnout-coaches": [
    { woord: "burnout", gewicht: 3 },
    { woord: "burn-out", gewicht: 3 },
    { woord: "overspannen", gewicht: 2 },
    { woord: "stresscoach", gewicht: 3 },
    { woord: "stressklachten", gewicht: 2 },
    { woord: "vitaliteit", gewicht: 1 },
    { woord: "verzuim", gewicht: 1 },
    { woord: "herstelcoach", gewicht: 2 },
  ],
};

/**
 * Bepaalt de meest waarschijnlijke doelgroep voor een paginatekst.
 * Geeft ook een score terug zodat de admin lage scores kan herkennen.
 */
export function classificeer(
  tekst: string,
  vasteDoelgroep?: Doelgroep | null
): { doelgroep: Doelgroep; score: number } {
  const lower = tekst.toLowerCase();
  const scores = new Map<Doelgroep, number>();

  for (const doelgroep of DOELGROEPEN) {
    let score = 0;
    for (const { woord, gewicht } of TREFWOORDEN[doelgroep]) {
      let idx = lower.indexOf(woord);
      let teller = 0;
      while (idx !== -1 && teller < 10) {
        teller += 1;
        idx = lower.indexOf(woord, idx + woord.length);
      }
      score += teller * gewicht;
    }
    scores.set(doelgroep, score);
  }

  let beste: Doelgroep = "relatietherapeuten";
  let hoogste = -1;
  for (const [doelgroep, score] of Array.from(scores.entries())) {
    if (score > hoogste) {
      hoogste = score;
      beste = doelgroep;
    }
  }

  if (vasteDoelgroep) {
    return { doelgroep: vasteDoelgroep, score: scores.get(vasteDoelgroep) ?? 0 };
  }
  return { doelgroep: beste, score: hoogste };
}
