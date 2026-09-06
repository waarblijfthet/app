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

/**
 * Afronden op honderdtallen voor koppen en metaTitels.
 *
 * Reden (6-sep-2026, hub H1): een vuistregel op vijf huishoudens die "€3.878"
 * in de titel zet suggereert een precisie die hij niet heeft, en een zoeker
 * leest een rond bedrag sneller. De tabel eronder toont wel het exacte bedrag.
 * Titel en eerste alinea moeten hetzelfde getal noemen, dus beide gebruiken
 * deze functie.
 */
export const afgerondOpHonderd = (n: number) => Math.round(n / 100) * 100;

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

/**
 * De herkomst per post: het bedrag, hoeveel van de vijf doorgerekende
 * huishoudens eronder liggen, en waar het vandaan komt.
 *
 * Reden (6-sep-2026, hub H1): de hub voor tweeverdieners met kinderen laat de
 * begroting per post zien en moet er per bedrag n bij zetten. Die n stond
 * alleen in commentaar boven in `lib/benchmarks.ts` en was daarmee niet
 * renderbaar. Nu staat hij naast het bedrag zelf, zodat een artikel de n nooit
 * met de hand hoeft te typen en de twee niet uit elkaar kunnen lopen.
 *
 * De n en de toelichting zijn overgenomen uit de herkomstsectie van
 * `lib/benchmarks.ts`, herijkt op 30-jul-2026 op de vijf huishoudens die op
 * /rapporten staan. Wijzigt daar een getal, wijzig het hier mee.
 *
 * WAARSCHUWING: dit is geen norm. Bij n van 1 of 2 is het een richting. De
 * bedragen komen uit vijf huishoudens met een bovenmodaal inkomen, niet uit een
 * landelijke steekproef, en dat staat er op de pagina ook bij.
 */
export interface HerkomstRegel {
  post: string;
  /** Het bedrag als tekst, want sommige posten zijn een percentage. */
  bedrag: string;
  /** Aantal van de vijf huishoudens waarop dit getal rust. */
  n: number;
  herkomst: string;
}

export const VUISTREGEL_HERKOMST: HerkomstRegel[] = [
  {
    post: "Woonlast, twee volwassenen",
    bedrag: Math.round(VUISTREGEL.woonlastPctTwee * 100) + "% van het netto inkomen",
    n: 3,
    herkomst: "23,6, 24,4 en 24,6 procent bij de drie huishoudens met twee volwassenen",
  },
  {
    post: "Energie",
    bedrag: euro(VUISTREGEL.energie),
    n: 5,
    herkomst: "145, 165, 220, 230 en 245 euro",
  },
  {
    post: "Internet en tv",
    bedrag: euro(VUISTREGEL.internet),
    n: 5,
    herkomst: "52, 58, 64, 65 en 72 euro",
  },
  {
    post: "Gemeentelijke lasten en waterschap",
    bedrag: euro(VUISTREGEL.lokaleLasten),
    n: 5,
    herkomst: "de jaarnota van alle vijf, omgerekend naar de maand",
  },
  {
    post: "Boodschappen, basis voor twee volwassenen",
    bedrag: euro(VUISTREGEL.boodschappenBasisTwee),
    n: 2,
    herkomst: "690 en 720 euro. Dit was de post die bij alle vijf het verst naast de norm lag",
  },
  {
    post: "Boodschappen, per kind erbij",
    bedrag: euro(VUISTREGEL.boodschappenPerKind),
    n: 2,
    herkomst: "afgeleid uit 1.150 euro bij drie kinderen en 790 euro bij twee",
  },
  {
    post: "Opvang, school, sport en hobby, per kind",
    bedrag: euro(VUISTREGEL.kinderenPerKind),
    n: 2,
    herkomst: "540 euro bij drie kinderen en 410 euro bij twee. Zonder eten, kleding en woonruimte",
  },
  {
    post: "Vervoer, \u00e9\u00e9n eigen auto",
    bedrag: euro(VERVOER.eigen),
    n: 4,
    herkomst: "brandstof, verzekering en wegenbelasting samen. Klopte bij vier van de vijf",
  },
  {
    post: "Zorgverzekering, per volwassene",
    bedrag: euro(VUISTREGEL.zorgPerVolwassene),
    n: 5,
    herkomst: "van 4 euro onder tot 28 euro boven dit bedrag",
  },
  {
    post: "Overige verzekeringen",
    bedrag: euro(VUISTREGEL.verzekeringOverig),
    n: 5,
    herkomst: "inboedel, aansprakelijkheid, opstal en rechtsbijstand samen",
  },
  {
    post: "Abonnementen",
    bedrag: euro(VUISTREGEL.abonnementen),
    n: 5,
    herkomst: "119, 132, 155, 165 en 175 euro. Streaming, mobiel en de rest",
  },
  {
    post: "Vrije tijd",
    bedrag: Math.round(VUISTREGEL.vrijetijdPct * 100) + "% van het netto inkomen",
    n: 5,
    herkomst: "de minst betrouwbare post: de spreiding liep van 7,5 tot 15 procent",
  },
];
