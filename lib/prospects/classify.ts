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
  boekhouders: [
    { woord: "boekhouder", gewicht: 3 },
    { woord: "boekhouding", gewicht: 3 },
    { woord: "administratiekantoor", gewicht: 3 },
    { woord: "accountant", gewicht: 2 },
    { woord: "jaarrekening", gewicht: 2 },
    { woord: "salarisadministratie", gewicht: 2 },
    { woord: "aangifte", gewicht: 1 },
    { woord: "btw-aangifte", gewicht: 2 },
    { woord: "zzp-administratie", gewicht: 2 },
  ],
};

// Regex-cache per trefwoord: woordgrens op basis van een lookaround in
// plaats van \b, want \b beschouwt ë/ï/ö niet als letter en zou de grens
// midden in een woord als "financiële" leggen.
const LETTER = "a-zA-ZÀ-ÿ0-9";
const woordPatroonCache = new Map<string, RegExp>();
function woordPatroon(woord: string): RegExp {
  let patroon = woordPatroonCache.get(woord);
  if (!patroon) {
    const escaped = woord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    patroon = new RegExp(`(?<![${LETTER}])${escaped}(?![${LETTER}])`, "gi");
    woordPatroonCache.set(woord, patroon);
  }
  patroon.lastIndex = 0;
  return patroon;
}

/** Telt hoe vaak een trefwoord als los woord voorkomt (max 10, tegen uitschieters). */
function telWoord(lower: string, woord: string): number {
  const patroon = woordPatroon(woord);
  let teller = 0;
  while (teller < 10 && patroon.exec(lower)) teller += 1;
  return teller;
}

/**
 * Bepaalt de meest waarschijnlijke doelgroep voor een paginatekst.
 * Geeft ook een score terug zodat de admin lage scores kan herkennen.
 * Zonder vaste doelgroep levert een score van 0 of een gelijkspel tussen
 * twee doelgroepen geen keuze op (doelgroep: null): een gok die er als een
 * keuze uitziet is erger dan een leeg veld dat om een keuze vraagt.
 */
export function classificeer(
  tekst: string,
  vasteDoelgroep?: Doelgroep | null
): { doelgroep: Doelgroep | null; score: number } {
  const lower = tekst.toLowerCase();
  const scores = new Map<Doelgroep, number>();

  for (const doelgroep of DOELGROEPEN) {
    let score = 0;
    for (const { woord, gewicht } of TREFWOORDEN[doelgroep]) {
      score += telWoord(lower, woord) * gewicht;
    }
    scores.set(doelgroep, score);
  }

  if (vasteDoelgroep) {
    return { doelgroep: vasteDoelgroep, score: scores.get(vasteDoelgroep) ?? 0 };
  }

  let hoogste = -1;
  let winnaars: Doelgroep[] = [];
  for (const [doelgroep, score] of Array.from(scores.entries())) {
    if (score > hoogste) {
      hoogste = score;
      winnaars = [doelgroep];
    } else if (score === hoogste) {
      winnaars.push(doelgroep);
    }
  }

  if (hoogste <= 0 || winnaars.length > 1) {
    return { doelgroep: null, score: hoogste };
  }
  return { doelgroep: winnaars[0], score: hoogste };
}
