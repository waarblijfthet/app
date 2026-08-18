/**
 * Eén bron voor de vuistregel achter de salarisrekenaar en de bedragentabel.
 *
 * Reden (17-aug-2026): de constanten stonden twee keer in de codebase, in
 * `lib/benchmarks.ts` en nog een keer los in `components/artikel/SalarisRekenaar.tsx`.
 * Zodra er een derde plek bij komt (de bedragentabel op het 4.000-artikel) kan
 * de tabel iets anders zeggen dan de rekenaar die er tien centimeter boven
 * staat, op dezelfde pagina. Dat is niet een bug die je later merkt, dat is een
 * lezer die terecht besluit dat de cijfers hier niet kloppen.
 *
 * De getallen zijn dezelfde als in `lib/benchmarks.ts` en komen daar vandaan:
 * de huishoudens die ik zelf heb doorgerekend, herijkt op 30-jul-2026. Zie de
 * herkomstsectie boven in dat bestand voor de n per getal.
 */

export type AutoKeuze = "geen" | "eigen" | "twee" | "zakelijk";

export const VUISTREGEL = {
  boodschappenBasisTwee: 700,
  boodschappenBasisEen: 475,
  boodschappenPerKind: 150,
  kinderenPerKind: 190,
  abonnementen: 150,
  energie: 200,
  internet: 62,
  lokaleLasten: 95,
  zorgPerVolwassene: 148,
  verzekeringOverig: 120,
  woonlastPctEen: 0.33,
  woonlastPctTwee: 0.25,
  vrijetijdPct: 0.1,
} as const;

export const VERVOER: Record<AutoKeuze, number> = {
  geen: 80,
  eigen: 350,
  twee: 650,
  zakelijk: 0,
};

export const AUTO_LABELS: Record<AutoKeuze, string> = {
  geen: "Geen auto",
  eigen: "Eén auto",
  twee: "Twee auto's",
  zakelijk: "Auto van de zaak",
};

export interface HuishoudInvoer {
  inkomen: number;
  volwassenen: 1 | 2;
  kinderen: number;
  auto: AutoKeuze;
}

export interface Vuistregel {
  wonen: number;
  boodschappen: number;
  vervoer: number;
  verzekeringen: number;
  abonnementen: number;
  kinderkosten: number;
  vrijetijd: number;
  /** Inkomen min alle posten hierboven. Kan negatief zijn. */
  verwachtOver: number;
}

export function berekenVuistregel({
  inkomen,
  volwassenen,
  kinderen,
  auto,
}: HuishoudInvoer): Vuistregel {
  const alleen = volwassenen === 1;
  const V = VUISTREGEL;

  const woonlast = Math.round(
    inkomen * (alleen ? V.woonlastPctEen : V.woonlastPctTwee)
  );
  const wonen = woonlast + V.energie + V.internet + V.lokaleLasten;
  const boodschappen =
    (alleen ? V.boodschappenBasisEen : V.boodschappenBasisTwee) +
    kinderen * V.boodschappenPerKind;
  const verzekeringen = V.zorgPerVolwassene * volwassenen + V.verzekeringOverig;
  const vervoer = VERVOER[auto];
  const kinderkosten = kinderen * V.kinderenPerKind;
  const vrijetijd = Math.round(inkomen * V.vrijetijdPct);

  const som =
    wonen +
    boodschappen +
    vervoer +
    verzekeringen +
    V.abonnementen +
    kinderkosten +
    vrijetijd;

  return {
    wonen,
    boodschappen,
    vervoer,
    verzekeringen,
    abonnementen: V.abonnementen,
    kinderkosten,
    vrijetijd,
    verwachtOver: inkomen - som,
  };
}

/**
 * Het eerste (gehele) netto inkomen waarop dit huishouden bij deze vuistregel
 * niet meer in de min staat, afgerond op tientallen.
 *
 * Reden (17-aug-2026): dit stond eerst alleen lokaal in
 * `components/artikel/SalarisBedragenTabel.tsx`. Het 4.000-euro-artikel over
 * "waarom kom ik er niet mee uit" heeft exact hetzelfde omslagpunt nodig. Twee
 * plekken die allebei zelf het omslagpunt uitrekenen kunnen na een wijziging in
 * `VUISTREGEL` uit elkaar gaan lopen zonder dat iemand dat op het scherm ziet.
 * Vandaar hierheen verplaatst, één berekening voor alle artikelen.
 *
 * Afgerond omdat "rond €4.081" een precisie suggereert die een vuistregel op
 * vijf huishoudens niet heeft.
 */
export function omslagpunt(
  volwassenen: 1 | 2,
  kinderen: number,
  auto: AutoKeuze = "eigen"
): number {
  for (let i = 2000; i <= 12000; i += 1) {
    if (berekenVuistregel({ inkomen: i, volwassenen, kinderen, auto }).verwachtOver >= 0) {
      return Math.ceil(i / 10) * 10;
    }
  }
  return 0;
}

export const euro = (n: number) => "€" + Math.round(n).toLocaleString("nl-NL");

export const euroSigned = (n: number) =>
  n < 0 ? "-" + euro(Math.abs(n)) : euro(n);

/**
 * Situatiesleutel voor /geldscan. Moet exact overeenkomen met SituatieSleutel
 * in app/geldscan/page.tsx.
 */
export function geldscanSituatie(
  volwassenen: 1 | 2,
  kinderen: number,
  wisselend = false
): string {
  if (wisselend) return "zzp";
  if (volwassenen === 1) return kinderen > 0 ? "alleenstaande-ouder" : "alleenstaand";
  return kinderen > 0 ? "gezin" : "stel";
}
