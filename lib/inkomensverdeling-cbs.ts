/**
 * Waar sta je met je inkomen? De inkomensverdeling van het CBS, vertaald naar
 * besteedbaar inkomen per maand per huishouden.
 *
 * Reden (24-sep-2026): de pijler `top-10-procent-inkomen-nederland`, H2 en
 * is-4000 hebben allemaal dezelfde grenzen nodig ("vanaf welk netto bedrag hoor
 * je bij de hoogste 10 procent?"). Die grenzen staan nergens kant-en-klaar in
 * netto per maand. Ze zijn af te leiden uit twee tabellen van het CBS. Deze
 * afleiding hoort in code en niet in proza, zodat een tabel, een FAQ en een
 * rekenaar nooit een ander getal kunnen noemen. Zelfde les als de "top 25
 * procent" die op 6 september ongesourced uit is-4000 moest.
 *
 * BRONNEN, alle drie in Chrome geopend en uitgelezen op 24 september 2026:
 *
 * 1. CBS, visualisatie "Verdeling gestandaardiseerd inkomen" (3-6-2026), tabel
 *    "Verdeling van gestandaardiseerd inkomen, 2024", kolom "Alle huishoudens".
 *    Aantal huishoudens (x 1.000) per klasse van € 2.000 per jaar.
 *    https://www.cbs.nl/nl-nl/visualisaties/inkomensverdeling
 *
 * 2. CBS, visualisatie "Verdeling besteedbaar inkomen" (3-6-2026), tabel
 *    "Verdeling van besteedbaar inkomen, 2024", kolommen per huishoudtype.
 *    https://www.cbs.nl/nl-nl/visualisaties/inkomensverdeling-besteedbaar
 *
 * 3. CBS, "Materiële welvaart in Nederland 2024", bijlage A, tabel met de
 *    equivalentiefactoren die vanaf verslagjaar 2018 gelden.
 *    https://longreads.cbs.nl/materiele-welvaart-in-nederland-2024/bijlagen/
 *
 * Definitie (CBS, begrip "besteedbaar inkomen", ook op 24-9-2026 geopend):
 * het bruto-inkomen min betaalde inkomensoverdrachten, premies
 * inkomensverzekeringen, premies ziektekostenverzekeringen en belastingen op
 * inkomen en vermogen. In gewone woorden: je nettoloon inclusief vakantiegeld,
 * plus toeslagen en kinderbijslag, min je zorgpremie. Het is dus NIET hetzelfde
 * als het nettobedrag op je loonstrook, en dat staat op elke pagina erbij.
 *
 * Gestandaardiseerd inkomen is het besteedbaar inkomen gedeeld door de
 * equivalentiefactor van het huishouden. Terugrekenen naar een huishouden is
 * dus: grens gestandaardiseerd x factor / 12.
 *
 * METHODE EN BEPERKINGEN, expliciet:
 *   - Het CBS publiceert hier klassen van € 2.000 per jaar, geen percentielen.
 *     Een grens binnen een klasse is lineair geïnterpoleerd. De onzekerheid
 *     daarvan is ongeveer € 80 per maand; daarom rondt elke weergave af op
 *     honderden (afgerondOpHonderd).
 *   - Peiljaar is 2024 (voorlopige cijfers). Inkomens zijn sindsdien gestegen,
 *     dus in euro's van nu liggen de grenzen hoger. Er wordt NIET geïndexeerd:
 *     daar bestaat geen officiële reeks voor en een eigen indexatie is een
 *     verzonnen getal. De pagina zegt dat de grenzen van 2024 zijn.
 *   - Aantallen in de tabel zijn door het CBS afgerond op duizenden. Kleine
 *     klassen (0, 1, 2) zijn daardoor grof; voor grenzen tussen 10 en 90
 *     procent maakt dat vrijwel niets uit.
 *   - Het gaat om huishoudens, niet om personen, en om alle huishoudens,
 *     inclusief gepensioneerden en studenten.
 */

import { afgerondOpHonderd } from "./salaris-vuistregel";

export const INKOMEN_PEILJAAR = 2024;
export const INKOMEN_OPGEHAALD = "24 september 2026";
export const INKOMEN_GEPUBLICEERD = "3 juni 2026";

export const BRON_GESTANDAARDISEERD_URL = "https://www.cbs.nl/nl-nl/visualisaties/inkomensverdeling";
export const BRON_BESTEEDBAAR_URL = "https://www.cbs.nl/nl-nl/visualisaties/inkomensverdeling-besteedbaar";
export const BRON_EQUIVALENTIE_URL = "https://longreads.cbs.nl/materiele-welvaart-in-nederland-2024/bijlagen/";

/**
 * Equivalentiefactoren van het CBS, vanaf verslagjaar 2018. Index is het aantal
 * minderjarige kinderen (0 tot en met 4). Bron 3.
 */
export const EQUIVALENTIEFACTOR: Record<1 | 2, number[]> = {
  1: [1.0, 1.32, 1.52, 1.73, 1.93],
  2: [1.4, 1.69, 1.91, 2.09, 2.28],
};

export function equivalentiefactor(volwassenen: 1 | 2, kinderen: number): number {
  const rij = EQUIVALENTIEFACTOR[volwassenen];
  const k = Math.max(0, Math.min(rij.length - 1, Math.round(kinderen)));
  return rij[k];
}

/**
 * Een verdeling in klassen van € 2.000 per jaar (x 1.000 euro). Klasse 0 is
 * "minder dan ondergrens", daarna klassen van 2 breed vanaf de ondergrens, de
 * laatste is "meer dan bovengrens".
 */
interface Verdeling {
  ondergrens: number;
  bovengrens: number;
  aantallen: number[];
}

/** Bron 1, kolom "Alle huishoudens". 55 klassen: < -6, -6 tot 100 per 2, > 100. */
const GESTANDAARDISEERD_ALLE: Verdeling = {
  ondergrens: -6,
  bovengrens: 100,
  aantallen: [
    5, 1, 3, 20, 25, 33, 50, 49, 54, 72, 67, 86, 147, 325, 322, 348, 396, 435, 412,
    399, 396, 394, 387, 381, 369, 349, 321, 292, 263, 234, 208, 184, 159, 137, 118,
    101, 86, 73, 62, 53, 45, 39, 33, 29, 25, 22, 19, 17, 15, 13, 12, 11, 10, 9, 143,
  ],
};

export type HuishoudType =
  | "alleenOnderAow"
  | "paarZonderKinderen"
  | "paarZonderKinderenOnderAow"
  | "paarMetKinderen"
  | "eenoudergezin";

export const HUISHOUDTYPE_LABEL: Record<HuishoudType, string> = {
  alleenOnderAow: "Alleenstaand, onder de AOW-leeftijd",
  paarZonderKinderen: "Stel zonder kinderen, alle leeftijden",
  paarZonderKinderenOnderAow: "Stel zonder kinderen, onder de AOW-leeftijd",
  paarMetKinderen: "Stel met kinderen",
  eenoudergezin: "Eenoudergezin",
};

/** Bron 2, per huishoudtype. 75 klassen: < -6, -6 tot 140 per 2, > 140. */
const BESTEEDBAAR: Record<HuishoudType, Verdeling> = {
  alleenOnderAow: {
    ondergrens: -6,
    bovengrens: 140,
    aantallen: [
      2, 1, 1, 16, 19, 24, 41, 38, 39, 50, 42, 51, 73, 192, 118, 90, 96, 123, 123, 114,
      113, 109, 97, 88, 77, 67, 57, 49, 42, 36, 30, 27, 21, 17, 14, 12, 10, 8, 7, 6, 5,
      4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 9,
    ],
  },
  paarZonderKinderen: {
    ondergrens: -6,
    bovengrens: 140,
    aantallen: [
      1, 0, 1, 1, 1, 2, 2, 2, 2, 3, 4, 4, 4, 6, 8, 12, 25, 33, 37, 50, 70, 72, 72, 74, 76,
      77, 74, 73, 74, 76, 77, 79, 78, 76, 74, 72, 70, 67, 64, 60, 56, 52, 48, 44, 40, 36,
      33, 29, 27, 24, 21, 19, 17, 16, 14, 12, 11, 10, 9, 8, 7, 7, 6, 6, 5, 5, 4, 4, 4, 3,
      3, 3, 3, 3, 57,
    ],
  },
  paarZonderKinderenOnderAow: {
    ondergrens: -6,
    bovengrens: 140,
    aantallen: [
      1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 5, 7, 16, 13, 13, 15, 17, 18, 20, 22, 24,
      26, 28, 31, 33, 36, 39, 42, 44, 46, 47, 48, 49, 48, 47, 45, 43, 41, 38, 35, 32, 30,
      27, 24, 22, 20, 18, 16, 14, 13, 12, 10, 10, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 3, 3,
      3, 2, 2, 2, 44,
    ],
  },
  paarMetKinderen: {
    ondergrens: -6,
    bovengrens: 140,
    aantallen: [
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 7, 8, 11, 12, 15, 15, 17, 18,
      19, 21, 22, 24, 27, 30, 33, 36, 39, 43, 46, 49, 52, 55, 57, 58, 59, 60, 59, 58, 56,
      54, 53, 50, 48, 46, 43, 41, 39, 36, 34, 32, 30, 28, 26, 24, 23, 21, 20, 19, 17, 16,
      14, 13, 13, 11, 11, 10, 168,
    ],
  },
  eenoudergezin: {
    ondergrens: -6,
    bovengrens: 140,
    aantallen: [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 3, 4, 5, 7, 11, 24, 21, 25, 23, 24, 25, 26, 26,
      26, 25, 24, 23, 22, 20, 19, 18, 16, 15, 14, 13, 12, 11, 9, 9, 8, 7, 6, 6, 5, 4, 4,
      4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5,
    ],
  },
};

/** Onder- en bovengrens (x 1.000 euro per jaar) van klasse i. Null bij de open bovenklasse. */
function klasse(v: Verdeling, i: number): [number, number | null] {
  if (i === 0) return [v.ondergrens - 2, v.ondergrens];
  if (i === v.aantallen.length - 1) return [v.bovengrens, null];
  const van = v.ondergrens + (i - 1) * 2;
  return [van, van + 2];
}

function totaal(v: Verdeling): number {
  return v.aantallen.reduce((som, n) => som + n, 0);
}

/**
 * Het jaarinkomen (x 1.000 euro) waaronder een aandeel `p` van de huishoudens
 * valt. Null als de grens in de open bovenklasse ligt: dan is er geen grens te
 * geven en dat zeggen we dan ook.
 */
function grens(v: Verdeling, p: number): number | null {
  const doel = totaal(v) * p;
  let cum = 0;
  for (let i = 0; i < v.aantallen.length; i += 1) {
    const n = v.aantallen[i];
    if (n > 0 && cum + n >= doel) {
      const [van, tot] = klasse(v, i);
      if (tot === null) return null;
      return van + ((tot - van) * (doel - cum)) / n;
    }
    cum += n;
  }
  return null;
}

/** Aandeel huishoudens met een lager jaarinkomen dan `waarde` (x 1.000 euro). */
function aandeelOnder(v: Verdeling, waarde: number): number {
  let cum = 0;
  for (let i = 0; i < v.aantallen.length; i += 1) {
    const n = v.aantallen[i];
    const [van, tot] = klasse(v, i);
    // In de open bovenklasse valt niet te interpoleren. Dan telt de hele klasse
    // als "meer": de uitkomst is een bovengrens voor het aandeel met meer, en
    // de rekenaar zegt in dat geval "minder dan".
    if (tot === null) return cum / totaal(v);
    if (waarde < tot) {
      const binnen = waarde <= van ? 0 : ((waarde - van) / (tot - van)) * n;
      return (cum + binnen) / totaal(v);
    }
    cum += n;
  }
  return 1;
}

/** Ligt dit jaarinkomen in de open bovenklasse van de verdeling? */
function inBovenklasse(v: Verdeling, waarde: number): boolean {
  return waarde >= v.bovengrens;
}

/**
 * De grens in besteedbaar inkomen per maand voor een huishouden van deze
 * samenstelling, gemeten tegen ALLE huishoudens in Nederland (via het
 * gestandaardiseerd inkomen). `p` is het aandeel dat eronder zit: 0,9 is de
 * ondergrens van de hoogste 10 procent. Niet afgerond.
 */
export function grensPerMaandNl(p: number, volwassenen: 1 | 2, kinderen: number): number | null {
  const g = grens(GESTANDAARDISEERD_ALLE, p);
  if (g === null) return null;
  return (g * 1000 * equivalentiefactor(volwassenen, kinderen)) / 12;
}

/** Zelfde, afgerond op honderden voor weergave. */
export function grensPerMaandNlRond(p: number, volwassenen: 1 | 2, kinderen: number): number | null {
  const g = grensPerMaandNl(p, volwassenen, kinderen);
  return g === null ? null : afgerondOpHonderd(g);
}

/**
 * Welk aandeel van alle huishoudens in Nederland heeft méér te besteden dan
 * een huishouden van deze samenstelling met dit besteedbaar inkomen per maand,
 * gecorrigeerd voor de grootte van het huishouden. Tussen 0 en 1.
 */
export function aandeelMetMeerNl(bedragPerMaand: number, volwassenen: 1 | 2, kinderen: number): number {
  return 1 - aandeelOnder(GESTANDAARDISEERD_ALLE, gestandaardiseerdVoor(bedragPerMaand, volwassenen, kinderen));
}

/** Het gestandaardiseerde jaarinkomen (x 1.000 euro) dat hoort bij dit bedrag per maand. */
function gestandaardiseerdVoor(bedragPerMaand: number, volwassenen: 1 | 2, kinderen: number): number {
  return (bedragPerMaand * 12) / 1000 / equivalentiefactor(volwassenen, kinderen);
}

/**
 * Valt dit huishouden in de open bovenklasse (meer dan € 100.000
 * gestandaardiseerd)? Dan is aandeelMetMeerNl een bovengrens en zegt de pagina
 * "minder dan".
 */
export function bovenTabelNl(bedragPerMaand: number, volwassenen: 1 | 2, kinderen: number): boolean {
  return inBovenklasse(GESTANDAARDISEERD_ALLE, gestandaardiseerdVoor(bedragPerMaand, volwassenen, kinderen));
}

/**
 * De grens in besteedbaar inkomen per maand binnen één huishoudtype, zonder
 * correctie voor grootte: "van alle stellen zonder kinderen heeft 10 procent
 * meer dan dit". Niet afgerond. Null in de open bovenklasse.
 */
export function grensPerMaandBinnenType(type: HuishoudType, p: number): number | null {
  const g = grens(BESTEEDBAAR[type], p);
  return g === null ? null : (g * 1000) / 12;
}

export function grensPerMaandBinnenTypeRond(type: HuishoudType, p: number): number | null {
  const g = grensPerMaandBinnenType(type, p);
  return g === null ? null : afgerondOpHonderd(g);
}

/** Aandeel huishoudens van dit type met méér besteedbaar inkomen per maand dan `bedragPerMaand`. */
export function aandeelMetMeerBinnenType(type: HuishoudType, bedragPerMaand: number): number {
  return 1 - aandeelOnder(BESTEEDBAAR[type], (bedragPerMaand * 12) / 1000);
}

/** Aantal huishoudens (x 1.000) in de tabel van dit type, voor de n op de pagina. */
export function aantalHuishoudensBinnenType(type: HuishoudType): number {
  return totaal(BESTEEDBAAR[type]);
}

export function aantalHuishoudensNl(): number {
  return totaal(GESTANDAARDISEERD_ALLE);
}

/** De huishoudens waarvoor de pijler een rij toont, in deze volgorde. */
export const SAMENSTELLINGEN: { label: string; volwassenen: 1 | 2; kinderen: number }[] = [
  { label: "Alleenstaand", volwassenen: 1, kinderen: 0 },
  { label: "Alleenstaand met 1 kind", volwassenen: 1, kinderen: 1 },
  { label: "Alleenstaand met 2 kinderen", volwassenen: 1, kinderen: 2 },
  { label: "Stel zonder kinderen", volwassenen: 2, kinderen: 0 },
  { label: "Stel met 1 kind", volwassenen: 2, kinderen: 1 },
  { label: "Stel met 2 kinderen", volwassenen: 2, kinderen: 2 },
  { label: "Stel met 3 kinderen", volwassenen: 2, kinderen: 3 },
];

/** De grenzen die de pijler toont: de helft, de hoogste 25 en 10 procent. Drie kolommen, zodat de tabel op 390px past. */
export const GRENZEN: { p: number; label: string }[] = [
  { p: 0.5, label: "Midden" },
  { p: 0.75, label: "Top 25%" },
  { p: 0.9, label: "Top 10%" },
];

/** Percentage als geheel getal, voor tekst. */
export const procent = (aandeel: number) => Math.round(aandeel * 100) + "%";

/** Een equivalentiefactor zoals het CBS hem schrijft: "1,40", niet "1,4". */
export const factorTekst = (n: number) => n.toLocaleString("nl-NL", { minimumFractionDigits: 2 });
