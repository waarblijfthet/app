/**
 * Bronbedragen voor de vijf geldmomenten (25-sep-2026).
 *
 * Alles hier is op 25 september 2026 in Chrome op de pagina van de uitvoerder
 * zelf geopend. De vindplaatsen en de letterlijke zinnen staan in
 * docs/serp-geldmomenten-25-sep-2026.md, sectie 3. Een bedrag dat daar niet
 * staat, hoort hier niet. Nibud-bedragen alleen als ze op een geopende
 * Nibud-pagina stonden.
 *
 * Herzien: kinderbijslag per 1 januari 2027 (SVB), studiefinanciering per
 * 1 januari 2027 (DUO), eigen risico 2027 (Rijksoverheid, half november). Zie
 * de datumtabel in docs/bouwvolgorde.md.
 */

export const BRON_DATUM = "25 september 2026";

/**
 * SVB, "Bedragen en betaaldagen kinderbijslag", bedrag per kind per kwartaal,
 * derde kwartaal 2026 (de kinderbijslag ging per 1 juli 2026 omhoog).
 */
export const KINDERBIJSLAG_KWARTAAL_2026 = {
  tot6: 298.4,
  tot12: 362.35,
  tot18: 426.29,
} as const;

export type KinderbijslagLeeftijd = keyof typeof KINDERBIJSLAG_KWARTAAL_2026;

/** Kinderbijslag per maand, afgerond op hele euro's. Kwartaalbedrag gedeeld door drie. */
export function kinderbijslagPerMaand(leeftijd: KinderbijslagLeeftijd): number {
  return Math.round(KINDERBIJSLAG_KWARTAAL_2026[leeftijd] / 3);
}

/** Rijksoverheid, "Wanneer betaal ik een eigen risico": het verplichte eigen risico voor 2026. */
export const EIGEN_RISICO_2026 = 385;

/** Belastingdienst, "Voor hoeveel opvanguren krijg ik kinderopvangtoeslag?". */
export const MAX_OPVANGUREN_PER_MAAND = 230;

/**
 * DUO, "Bedragen studiefinanciering", maximale bedragen per maand.
 * Hbo en universiteit: september tot en met december 2026.
 * Mbo: augustus tot en met december 2026.
 */
export const DUO_2026 = {
  hboWo: { basisThuis: 130.21, basisUit: 324.52, aanvullendMax: 491.08 },
  mbo: { basisThuis: 107.26, basisUit: 350.03, aanvullendThuis: 442.5, aanvullendUit: 470.82 },
} as const;

/**
 * Nibud, "Studeren en wat daarbij komt kijken": wat ouders gemiddeld per
 * maand bijdragen, naast de studiekosten die ze eventueel betalen.
 */
export const NIBUD_OUDERBIJDRAGE = {
  hboWoAandeelOuders: 58,
  hboWoThuis: 137,
  hboWoUit: 317,
  bolAandeelOuders: 64,
  bolThuis: 69,
  bolUit: 233,
  /** "Een richtbedrag voor de kosten van studeren is ongeveer 1000 euro per maand." */
  richtbedragStuderen: 1000,
} as const;

/** Nibud, "Kostgeld": 40 procent van de thuiswonende 18- tot en met 30-jarigen betaalt kostgeld. */
export const NIBUD_KOSTGELD_AANDEEL = 40;

/**
 * Nibud, "Wat kost een kind?", op basis van CBS: aandeel van het besteedbaar
 * inkomen dat kinderen gemiddeld kosten. Index = aantal kinderen.
 */
export const NIBUD_KINDKOSTEN_PCT = {
  tweeouder: { 1: 15, 2: 25, 3: 29, 4: 35 },
  eenouder: { 1: 23, 2: 31, 3: 37, 4: 42 },
} as const;

export interface GeldmomentBron {
  label: string;
  url: string;
}

/** De bron-URL's, zoals geopend op BRON_DATUM. */
export const BRONNEN = {
  svbBedragen: {
    label: "SVB: bedragen en betaaldagen kinderbijslag",
    url: "https://www.svb.nl/nl/kinderbijslag/bedragen-betaaldagen/bedragen-kinderbijslag",
  },
  svb18: {
    label: "SVB: uw kind wordt 18 jaar",
    url: "https://www.svb.nl/nl/kinderbijslag/uw-kind-is-16-of-ouder/uw-kind-wordt-18-jaar",
  },
  kgbVoorwaarden: {
    label: "Dienst Toeslagen: voorwaarden kindgebonden budget",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kindgebonden-budget/voorwaarden/voorwaarden-kindgebonden-budget",
  },
  kgbHoeveel: {
    label: "Dienst Toeslagen: hoeveel kindgebonden budget krijg ik?",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/kindgebonden-budget/content/hoeveel-kindgebonden-budget",
  },
  toeslagen18: {
    label: "Dienst Toeslagen: ik ben 18 geworden, heb ik recht op toeslagen?",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen-jongeren/content/ik-ben-18-geworden-heb-ik-recht-op-toeslagen",
  },
  toeslagenScheiden: {
    label: "Dienst Toeslagen: wij gaan uit elkaar, wat moet ik regelen?",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/wij-gaan-uit-elkaar",
  },
  opvanguren: {
    label: "Dienst Toeslagen: voor hoeveel opvanguren krijg ik kinderopvangtoeslag?",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kinderopvangtoeslag/hoeveel-kinderopvangtoeslag-kan-ik-krijgen/voor-hoeveel-uur-kinderopvangtoeslag",
  },
  zorgverzekering18: {
    label: "Rijksoverheid: is een zorgverzekering verplicht?",
    url: "https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/ben-ik-verplicht-een-zorgverzekering-af-te-sluiten",
  },
  eigenRisico: {
    label: "Rijksoverheid: wanneer betaal ik een eigen risico?",
    url: "https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/eigen-risico-zorgverzekering",
  },
  duoBedragen: {
    label: "DUO: bedragen studiefinanciering",
    url: "https://www.duo.nl/particulier/studiefinanciering/bedragen.jsp",
  },
  nibudKind: {
    label: "Nibud: wat kost een kind?",
    url: "https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/wat-kost-een-kind/",
  },
  nibud18: {
    label: "Nibud: je kind wordt 18 jaar, wat moeten jullie regelen?",
    url: "https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/je-kind-wordt-18-jaar/",
  },
  nibudKnip18: {
    label: "Nibud: huishoudens verliezen fors inkomsten als kind 18 wordt (15 januari 2026)",
    url: "https://www.nibud.nl/nieuws/huishoudens-verliezen-fors-inkomsten-als-kind-18-wordt/",
  },
  nibudKostgeld: {
    label: "Nibud: kostgeld, hoeveel moet je vragen?",
    url: "https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/kostgeld/",
  },
  nibudStuderen: {
    label: "Nibud: studeren en wat daarbij komt kijken",
    url: "https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/studeren/",
  },
  werkuren: {
    label: "Nibud: WerkUrenBerekenaar",
    url: "https://www.nibud.nl/tools/werkurenberekenaar/",
  },
  geldplanScheiden: {
    label: "Nibud: Geldplan Scheiden",
    url: "https://www.nibud.nl/tools/geldplan-scheiden/",
  },
  nibudHypotheek: {
    label: "Nibud: hypotheek afsluiten, wat moet je weten",
    url: "https://www.nibud.nl/onderwerpen/wonen/hypotheek-afsluiten/",
  },
  nibudWoonlasten: {
    label: "Nibud: woonlasten en woonverzekeringen",
    url: "https://www.nibud.nl/onderwerpen/wonen/woonlasten-woonverzekeringen/",
  },
  pensioenoverzicht: {
    label: "Mijnpensioenoverzicht.nl",
    url: "https://www.mijnpensioenoverzicht.nl/",
  },
} as const satisfies Record<string, GeldmomentBron>;
