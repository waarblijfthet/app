/**
 * De kleine doorrekening vóór een keuze (25-sep-2026).
 *
 * HARDE PRODUCTGRENS (besluit Jarno, 25 september 2026). Deze doorrekening
 * beantwoordt alleen "wat verandert er ongeveer aan onze maand als we deze
 * keuze maken?". Ze mag de Geldscan niet vervangen. Dus:
 * - alleen de paar posten die door de keuze veranderen, nooit een begroting;
 * - de vrije ruimte nu is één schatting van de bezoeker, niet uitgerekend;
 * - geen bruto-netto, geen maximale hypotheek, geen alimentatie, geen pensioen;
 * - geen oordeel of iemand het kan betalen, alleen het verschil.
 * Wie hier een scenario toevoegt: maximaal vijf rijen, en elke startwaarde komt
 * uit lib/geldmomenten-bronnen.ts of blijft leeg.
 *
 * De logica is voor alle scenario's gelijk (berekenDoorrekening). Een scenario
 * is alleen configuratie: welke rijen, welke startwaarden, welke uitleg.
 */

import type { KeuzeSleutel } from "./geldmomenten";
import type { SituatieSleutel } from "./cta";
import { kinderbijslagPerMaand, EIGEN_RISICO_2026, NIBUD_OUDERBIJDRAGE } from "./geldmomenten-bronnen";

export type RijSoort = "inkomen" | "uitgave";

export interface DoorrekenRij {
  id: string;
  label: string;
  soort: RijSoort;
  hint?: string;
  /** Startwaarde voor "nu". Leeg laten als er geen bron is. */
  startNu?: number;
  /** Startwaarde voor "na". Leeg laten als er geen bron is. */
  startNa?: number;
  /** "Nu" staat vast op dit bedrag en is geen invoerveld (bijvoorbeeld 0 voor een nieuwe post). */
  nuVast?: number;
  /** "Na" staat vast op dit bedrag en is geen invoerveld (bijvoorbeeld 0 voor een post die stopt). */
  naVast?: number;
}

export interface DoorrekenScenario {
  keuze: Exclude<KeuzeSleutel, "anders" | "scheiding">;
  kop: string;
  intro: string;
  /** "jullie" of "jij", voor de uitkomstzin. */
  aanspreek: "jullie" | "jij";
  situatie?: SituatieSleutel;
  /** De rij waarvan "nu" als inkomen meegaat naar de analyse, als die er is. */
  inkomenRij?: string;
  rijen: DoorrekenRij[];
}

export const SCENARIOS: Record<DoorrekenScenario["keuze"], DoorrekenScenario> = {
  "minder-werken": {
    keuze: "minder-werken",
    kop: "Wat doet een dag minder werken met jullie maand?",
    intro:
      "Vul in wat er verandert. Het netto inkomen na de keuze reken ik niet voor je uit: haal het uit de WerkUrenBerekenaar van het Nibud of uit een proefloonstrook.",
    aanspreek: "jullie",
    situatie: "gezin",
    inkomenRij: "inkomen",
    rijen: [
      {
        id: "inkomen",
        label: "Netto inkomen samen, per maand",
        soort: "inkomen",
        hint: "Na: het netto inkomen met minder uren, uit de WerkUrenBerekenaar of je loonstrook.",
      },
      {
        id: "opvang",
        label: "Kinderopvang, wat je zelf betaalt na toeslag",
        soort: "uitgave",
        hint: "Minder werkdagen betekent vaak minder opvangdagen. Geen opvang? Laat het leeg.",
      },
    ],
  },
  huis: {
    keuze: "huis",
    kop: "Wat doet de nieuwe woonlast met jullie maand?",
    intro:
      "Hoeveel je mag lenen zegt de bank. Hier zie je alleen wat de nieuwe maandlast met jullie maand doet. Vul de woonlast in die jullie is genoemd.",
    aanspreek: "jullie",
    rijen: [
      {
        id: "woonlast",
        label: "Woonlast: hypotheek of huur, per maand",
        soort: "uitgave",
        hint: "Na: de maandlast uit het voorstel van de bank of adviseur. Vergelijk bruto met bruto of netto met netto.",
      },
      {
        id: "onderhoud",
        label: "Onderhoud, gereserveerd per maand",
        soort: "uitgave",
        hint: "Ook als je er nu niets voor opzijzet: wat zou het nieuwe huis vragen?",
      },
      {
        id: "overig",
        label: "Energie, gemeente, waterschap en opstalverzekering",
        soort: "uitgave",
        hint: "Een groter huis kost vaak meer aan energie en lokale lasten.",
      },
    ],
  },
  kind: {
    keuze: "kind",
    kop: "Wat doet een (tweede) kind met jullie maand?",
    intro:
      "Vul in wat er verandert. De kinderbijslag staat al ingevuld met het bedrag van de SVB voor een kind tot 6 jaar.",
    aanspreek: "jullie",
    situatie: "gezin",
    inkomenRij: "inkomen",
    rijen: [
      {
        id: "inkomen",
        label: "Netto inkomen samen, per maand",
        soort: "inkomen",
        hint: "Gaat een van jullie minder werken? Vul bij na het nieuwe netto in, uit de WerkUrenBerekenaar of je loonstrook.",
      },
      {
        id: "kinderbijslag",
        label: "Kinderbijslag voor het nieuwe kind",
        soort: "inkomen",
        nuVast: 0,
        startNa: kinderbijslagPerMaand("tot6"),
        hint: "SVB, derde kwartaal 2026, per maand gerekend.",
      },
      {
        id: "opvang",
        label: "Kinderopvang, wat je zelf betaalt na toeslag",
        soort: "uitgave",
        hint: "Voor het tweede kind krijg je een hoger percentage toeslag dan voor het eerste.",
      },
      {
        id: "overig",
        label: "Andere nieuwe kosten voor het kind, per maand",
        soort: "uitgave",
        nuVast: 0,
        hint: "Luiers, kleding, voeding, een grotere auto. Wat verwachten jullie zelf?",
      },
    ],
  },
  "kind-18": {
    keuze: "kind-18",
    kop: "Wat verandert er aan jullie maand als je kind 18 wordt?",
    intro:
      "Links wat er nu binnenkomt en uitgaat voor dit kind, rechts wat er na de 18e verjaardag verandert. Wat vaststaat is al ingevuld.",
    aanspreek: "jullie",
    situatie: "gezin",
    rijen: [
      {
        id: "kinderbijslag",
        label: "Kinderbijslag voor dit kind",
        soort: "inkomen",
        startNu: kinderbijslagPerMaand("tot18"),
        naVast: 0,
        hint: "SVB, 12 tot en met 17 jaar, derde kwartaal 2026, per maand gerekend. Stopt in het kwartaal waarop je kind op de eerste dag 18 is.",
      },
      {
        id: "kgb",
        label: "Kindgebonden budget voor dit kind",
        soort: "inkomen",
        naVast: 0,
        hint: "Staat op je beschikking van Dienst Toeslagen. Bij een goed inkomen vaak laag of nul.",
      },
      {
        id: "zorg",
        label: "Zorgverzekering van je kind, per maand",
        soort: "uitgave",
        nuVast: 0,
        hint: `Premie vanaf de eerste maand na de 18e verjaardag, plus het eigen risico van €${EIGEN_RISICO_2026} per jaar (2026). Je kind kan zelf zorgtoeslag aanvragen.`,
      },
      {
        id: "studie",
        label: "Jullie bijdrage aan studie, kamer of reizen",
        soort: "uitgave",
        nuVast: 0,
        hint: `Nibud: ouders geven een hbo- of wo-student gemiddeld €${NIBUD_OUDERBIJDRAGE.hboWoThuis} per maand als hij thuis woont, €${NIBUD_OUDERBIJDRAGE.hboWoUit} als hij uitwonend is.`,
      },
      {
        id: "kostgeld",
        label: "Kostgeld van je kind, als dat thuis blijft wonen",
        soort: "inkomen",
        nuVast: 0,
        hint: "Er is geen standaardbedrag, zegt het Nibud. Spreek het samen af.",
      },
    ],
  },
};

/** Een ingevuld veld. Leeg is null. */
export type Invoer = number | null;

export interface DoorrekenWaarden {
  /** Wat de bezoeker nu ongeveer overhoudt. Leeg telt als 0. */
  overNu: Invoer;
  nu: Record<string, Invoer>;
  na: Record<string, Invoer>;
}

export interface RijUitkomst {
  id: string;
  label: string;
  soort: RijSoort;
  nu: number;
  na: number;
  /** Effect op de vrije ruimte: positief is er meer over. */
  effect: number;
}

export interface DoorrekenUitkomst {
  vrijNu: number;
  vrijNa: number;
  verschilMaand: number;
  verschilJaar: number;
  /** Alleen de rijen die echt veranderen, grootste effect eerst. */
  veranderd: RijUitkomst[];
  /** Het inkomen nu, voor de analyse-CTA, als het scenario dat kent en het is ingevuld. */
  inkomenNu: number | null;
}

/** Leest de startwaarden van een scenario uit, zodat de component en een test hetzelfde beginnen. */
export function startWaarden(scenario: DoorrekenScenario): DoorrekenWaarden {
  const nu: Record<string, Invoer> = {};
  const na: Record<string, Invoer> = {};
  scenario.rijen.forEach((rij) => {
    nu[rij.id] = rij.startNu ?? null;
    na[rij.id] = rij.startNa ?? null;
  });
  return { overNu: null, nu: nu, na: na };
}

/**
 * Rekent de uitkomst uit. Regels:
 * - "nu" leeg telt als 0;
 * - "na" leeg betekent: verandert niet, dus gelijk aan nu;
 * - een vaste waarde wint altijd van de invoer.
 */
export function berekenDoorrekening(
  scenario: DoorrekenScenario,
  waarden: DoorrekenWaarden
): DoorrekenUitkomst {
  const rijen: RijUitkomst[] = scenario.rijen.map((rij) => {
    const nu = rij.nuVast ?? waarden.nu[rij.id] ?? 0;
    const naInvoer = waarden.na[rij.id];
    const na = rij.naVast ?? (naInvoer === null || naInvoer === undefined ? nu : naInvoer);
    const teken = rij.soort === "inkomen" ? 1 : -1;
    return {
      id: rij.id,
      label: rij.label,
      soort: rij.soort,
      nu: nu,
      na: na,
      effect: teken * (na - nu),
    };
  });

  const vrijNu = waarden.overNu ?? 0;
  const verschilMaand = rijen.reduce((som, r) => som + r.effect, 0);
  const inkomenInvoer = scenario.inkomenRij ? waarden.nu[scenario.inkomenRij] : null;

  return {
    vrijNu: vrijNu,
    vrijNa: vrijNu + verschilMaand,
    verschilMaand: verschilMaand,
    verschilJaar: verschilMaand * 12,
    veranderd: rijen
      .filter((r) => r.effect !== 0)
      .sort((a, b) => Math.abs(b.effect) - Math.abs(a.effect)),
    inkomenNu: inkomenInvoer && inkomenInvoer > 0 ? inkomenInvoer : null,
  };
}
