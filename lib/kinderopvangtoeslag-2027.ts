/**
 * Kinderopvangtoeslag: de tabel 2026 en de stap die in 2027 wordt gezet.
 *
 * Zelfde reden als `lib/kindgebonden-budget.ts` en `lib/prinsjesdag-2027.ts`: de
 * tabel, de rekenaar en de FAQ-antwoorden op het artikel moeten uit dezelfde
 * functie komen, anders zeggen ze na de eerste wijziging iets anders.
 *
 * Bijgewerkt op 18 september 2026, drie dagen na Prinsjesdag. De vorige versie
 * rekende met het ontwerpbesluit uit de internetconsultatie. Dat ontwerp is door
 * de begroting 2027 ingehaald en de getallen zijn kleiner geworden, zie hieronder.
 *
 * VASTGESTELD (2026)
 * - De volledige tabel toetsingsinkomen naar vergoedingspercentage voor het
 *   eerste en tweede kind: Belastingdienst / Rijksoverheid, "Bedragen
 *   kinderopvangtoeslag 2026", opgehaald 13 september 2026. Twee onafhankelijke
 *   herpublicaties van dezelfde tabel gecontroleerd en gelijk bevonden.
 * - Maximum uurprijzen 2026: dagopvang €11,23, buitenschoolse opvang €9,98,
 *   gastouderopvang €8,49. Belastingdienst, "Maximaal uurtarief voor de
 *   kinderopvang", opgehaald 13 september 2026. Bevestigd in de SZW-begroting
 *   2027, tabel 81.
 *
 * VASTGESTELD (2027), opgehaald 18 september 2026
 * Bron: SZW-begroting 2027, Tweede Kamer 2026/2027, 37 020 XV, nr. 2,
 * aangeboden op Prinsjesdag 15 september 2026.
 * - Maximum uurprijzen 2027 (tabel 81, p. 121): dagopvang €11,60, buitenschoolse
 *   opvang €10,31, gastouderopvang €8,77.
 * - De stap op het ingroeipad (p. 116): voor 2027 was €715 miljoen gereserveerd;
 *   dat bedrag is met €350 miljoen verlaagd naar €365 miljoen.
 * - Werkende ouders met een gezamenlijk toetsingsinkomen tot €71.903 krijgen het
 *   maximale vergoedingspercentage van 96 voor het eerste kind.
 * - Ouders met een inkomen tussen €71.904 en €175.430 krijgen voor het eerste
 *   kind een percentage dat 5,1 procentpunt hoger ligt dan in 2026.
 * - De hoogste inkomens krijgen een percentage dat 2,6 procentpunt hoger ligt dan
 *   in 2026. De vaste voet gaat daarmee van 36,5 naar 39,1 procent.
 *
 * WAT ER OP PRINSJESDAG IS VERANDERD TEN OPZICHTE VAN HET ONTWERPBESLUIT
 * Het ontwerpbesluit uit de internetconsultatie ging uit van 96 procent tot
 * €87.767, 12,5 procentpunt extra in de middenband en een vaste voet van 42,9
 * procent. Geen van die drie getallen is het geworden. Het kabinet heeft de stap
 * bewust kleiner gemaakt dan in het coalitieakkoord stond; de toeslag gaat in
 * 2027 nog steeds omhoog, maar minder ver. Wie het oude ontwerp ergens
 * tegenkomt, leest een plan dat is bijgesteld.
 *
 * NIET GEPUBLICEERD
 * De begroting noemt de percentages voor het eerste kind. Voor het tweede en
 * volgende kind staat er geen percentage voor 2027 in. Zolang dat zo is rekenen
 * de functies hieronder het tweede kind door met het percentage van 2026. Dat is
 * de voorzichtige kant: de werkelijke toeslag valt voor het tweede kind
 * waarschijnlijk iets hoger uit. Zet dat er in elke tekst bij.
 *
 * De inkomensgrenzen van de 2026-tabel zijn hieronder ook voor 2027 gebruikt.
 * De begroting zet de maatregel zelf zo neer, als procentpunten "ten opzichte van
 * 2026". De grenzen schuiven met de indexatie nog een klein stuk op; de twee
 * grenzen die de begroting wel in bedragen van 2027 noemt (€71.903 en €175.430)
 * staan hieronder als eigen constante.
 */

export type OpvangType = "dagopvang" | "bso" | "gastouder";

/** Belastingdienst, tabel kinderopvangtoeslag 2026. Bovengrens van elke schijf. */
interface Schijf {
  tot: number;
  eersteKind: number;
  tweedeKind: number;
}

export const KOT_2026_TABEL: Schijf[] = [
  { tot: 56412, eersteKind: 0.96, tweedeKind: 0.96 },
  { tot: 58184, eersteKind: 0.955, tweedeKind: 0.956 },
  { tot: 59957, eersteKind: 0.948, tweedeKind: 0.956 },
  { tot: 61895, eersteKind: 0.939, tweedeKind: 0.956 },
  { tot: 65695, eersteKind: 0.924, tweedeKind: 0.956 },
  { tot: 69492, eersteKind: 0.916, tweedeKind: 0.952 },
  { tot: 73292, eersteKind: 0.905, tweedeKind: 0.946 },
  { tot: 77094, eersteKind: 0.882, tweedeKind: 0.942 },
  { tot: 80891, eersteKind: 0.859, tweedeKind: 0.939 },
  { tot: 84693, eersteKind: 0.837, tweedeKind: 0.932 },
  { tot: 88491, eersteKind: 0.812, tweedeKind: 0.927 },
  { tot: 92291, eersteKind: 0.789, tweedeKind: 0.922 },
  { tot: 96091, eersteKind: 0.767, tweedeKind: 0.915 },
  { tot: 99889, eersteKind: 0.743, tweedeKind: 0.909 },
  { tot: 103694, eersteKind: 0.721, tweedeKind: 0.905 },
  { tot: 107492, eersteKind: 0.696, tweedeKind: 0.902 },
  { tot: 111290, eersteKind: 0.673, tweedeKind: 0.895 },
  { tot: 115090, eersteKind: 0.651, tweedeKind: 0.891 },
  { tot: 118963, eersteKind: 0.627, tweedeKind: 0.886 },
  { tot: 122857, eersteKind: 0.606, tweedeKind: 0.879 },
  { tot: 126747, eersteKind: 0.585, tweedeKind: 0.874 },
  { tot: 130638, eersteKind: 0.564, tweedeKind: 0.87 },
  { tot: 134527, eersteKind: 0.542, tweedeKind: 0.867 },
  { tot: 138420, eersteKind: 0.523, tweedeKind: 0.86 },
  { tot: 142312, eersteKind: 0.504, tweedeKind: 0.854 },
  { tot: 146205, eersteKind: 0.485, tweedeKind: 0.85 },
  { tot: 150092, eersteKind: 0.465, tweedeKind: 0.844 },
  { tot: 153982, eersteKind: 0.445, tweedeKind: 0.84 },
  { tot: 157877, eersteKind: 0.425, tweedeKind: 0.833 },
  { tot: 161766, eersteKind: 0.405, tweedeKind: 0.827 },
  { tot: 165657, eersteKind: 0.385, tweedeKind: 0.817 },
  { tot: 169547, eersteKind: 0.365, tweedeKind: 0.814 },
  { tot: 173440, eersteKind: 0.365, tweedeKind: 0.806 },
  { tot: 177335, eersteKind: 0.365, tweedeKind: 0.797 },
  { tot: 181223, eersteKind: 0.365, tweedeKind: 0.791 },
  { tot: 185114, eersteKind: 0.365, tweedeKind: 0.782 },
  { tot: 189002, eersteKind: 0.365, tweedeKind: 0.777 },
  { tot: 192896, eersteKind: 0.365, tweedeKind: 0.769 },
  { tot: 196789, eersteKind: 0.365, tweedeKind: 0.762 },
  { tot: 200681, eersteKind: 0.365, tweedeKind: 0.755 },
  { tot: 204571, eersteKind: 0.365, tweedeKind: 0.745 },
  { tot: 208458, eersteKind: 0.365, tweedeKind: 0.74 },
  { tot: 212353, eersteKind: 0.365, tweedeKind: 0.733 },
  { tot: 216242, eersteKind: 0.365, tweedeKind: 0.725 },
  { tot: 220134, eersteKind: 0.365, tweedeKind: 0.718 },
  { tot: 224026, eersteKind: 0.365, tweedeKind: 0.712 },
  { tot: 227915, eersteKind: 0.365, tweedeKind: 0.704 },
  { tot: 231807, eersteKind: 0.365, tweedeKind: 0.696 },
  { tot: 235697, eersteKind: 0.365, tweedeKind: 0.691 },
  { tot: Infinity, eersteKind: 0.365, tweedeKind: 0.682 },
];

export const MAX_UURPRIJS_2026: Record<OpvangType, number> = {
  dagopvang: 11.23,
  bso: 9.98,
  gastouder: 8.49,
};

/** SZW-begroting 2027, tabel 81. Het Besluit kinderopvangtoeslag 2027 legt ze formeel vast. */
export const MAX_UURPRIJS_2027: Record<OpvangType, number> = {
  dagopvang: 11.6,
  bso: 10.31,
  gastouder: 8.77,
};

/** SZW-begroting 2027, p. 116: tot dit inkomen geldt in 2027 het maximum van 96 procent. */
export const OMSLAGPUNT_96_PROCENT_2027 = 71903;
/** SZW-begroting 2027, p. 116: bovengrens van de band die 5,1 procentpunt extra krijgt. */
export const BOVENGRENS_MIDDENBAND_2027 = 175430;
/** SZW-begroting 2027, p. 116: de extra procentpunten in de middenband, eerste kind. */
export const EXTRA_MIDDENBAND_2027 = 0.051;
/** SZW-begroting 2027, p. 116: de extra procentpunten voor de hoogste inkomens. */
export const EXTRA_HOOGSTE_INKOMENS_2027 = 0.026;
/** Vaste voet 2026, uit de tabel van de Belastingdienst. */
export const VASTE_VOET_2026 = 0.365;
/** Vaste voet 2027: 36,5 plus de 2,6 procentpunt uit de begroting. */
export const VASTE_VOET_2027 = VASTE_VOET_2026 + EXTRA_HOOGSTE_INKOMENS_2027;
export const VASTE_VOET_VERHOGING = VASTE_VOET_2027 - VASTE_VOET_2026;

/** Wat er voor 2027 gereserveerd stond, en wat ervan over is. SZW-begroting 2027, p. 116. */
export const INGROEIPAD_2027 = {
  gereserveerdMiljoen: 715,
  verlaagdMetMiljoen: 350,
  resterendMiljoen: 365,
} as const;

/**
 * Het ontwerpbesluit uit de internetconsultatie, dat door de begroting is
 * ingehaald. Staat hier alleen zodat het artikel het verschil kan benoemen; geen
 * enkele berekening gebruikt deze getallen.
 */
export const ONTWERPBESLUIT_ACHTERHAALD = {
  omslagpunt96Procent: 87767,
  extraMiddenband: 0.125,
  vasteVoet: 0.429,
} as const;

/**
 * De begroting publiceert geen vergoedingspercentage voor het tweede kind in
 * 2027. Zolang dit true is rekent `toeslag2027` het tweede kind met de tabel van
 * 2026 door en hoort dat in de tekst te staan.
 */
export const TWEEDE_KIND_2027_NIET_GEPUBLICEERD = true;

function schijf(inkomen: number): Schijf {
  return KOT_2026_TABEL.find((s) => inkomen <= s.tot) ?? KOT_2026_TABEL[KOT_2026_TABEL.length - 1];
}

/** Vergoedingspercentage eerste kind, tabel 2026, vastgesteld. */
export function percentageEersteKind2026(inkomen: number): number {
  return schijf(inkomen).eersteKind;
}

/** Vergoedingspercentage tweede kind, tabel 2026, vastgesteld. */
export function percentageTweedeKind2026(inkomen: number): number {
  return schijf(inkomen).tweedeKind;
}

/**
 * Vergoedingspercentage eerste kind in 2027, zoals de SZW-begroting het beschrijft:
 * 96 procent tot €71.903, daarboven tot €175.430 het percentage van 2026 plus 5,1
 * procentpunt, en daarboven het percentage van 2026 plus 2,6 procentpunt.
 */
export function percentageEersteKind2027(inkomen: number): number {
  if (inkomen <= OMSLAGPUNT_96_PROCENT_2027) return 0.96;
  if (inkomen <= BOVENGRENS_MIDDENBAND_2027) {
    return Math.min(0.96, percentageEersteKind2026(inkomen) + EXTRA_MIDDENBAND_2027);
  }
  return Math.min(0.96, percentageEersteKind2026(inkomen) + EXTRA_HOOGSTE_INKOMENS_2027);
}

/**
 * Vergoedingspercentage tweede kind in 2027. De begroting noemt er geen, dus dit
 * is het percentage van 2026. Zie `TWEEDE_KIND_2027_NIET_GEPUBLICEERD`.
 */
export function percentageTweedeKind2027(inkomen: number): number {
  return percentageTweedeKind2026(inkomen);
}

export interface OpvangSituatie {
  inkomen: number;
  opvangType: OpvangType;
  urenPerMaand: number;
  /** Het tarief dat de opvangorganisatie werkelijk rekent, per uur. */
  werkelijkUurtarief: number;
  /** 1 of 2. Voor het eerste kind geldt eersteKind-percentage, voor het tweede het tweedeKind-percentage. */
  kindnummer: 1 | 2;
}

export interface ToeslagUitkomst {
  percentage: number;
  /** Uurtarief waarover toeslag wordt berekend: het werkelijke tarief, of de max uurprijs als dat lager is. */
  vergoedTarief: number;
  totaleKostenPerMaand: number;
  toeslagPerMaand: number;
  eigenBijdragePerMaand: number;
}

function berekenToeslag(
  situatie: OpvangSituatie,
  percentage: number,
  maxUurprijs: number,
): ToeslagUitkomst {
  const vergoedTarief = Math.min(situatie.werkelijkUurtarief, maxUurprijs);
  const totaleKostenPerMaand = situatie.werkelijkUurtarief * situatie.urenPerMaand;
  const toeslagPerMaand = Math.round(percentage * vergoedTarief * situatie.urenPerMaand);
  const eigenBijdragePerMaand = Math.round(totaleKostenPerMaand - toeslagPerMaand);
  return {
    percentage: percentage,
    vergoedTarief: vergoedTarief,
    totaleKostenPerMaand: Math.round(totaleKostenPerMaand),
    toeslagPerMaand: toeslagPerMaand,
    eigenBijdragePerMaand: eigenBijdragePerMaand,
  };
}

/** Toeslag 2026, vastgesteld. */
export function toeslag2026(situatie: OpvangSituatie): ToeslagUitkomst {
  const pct =
    situatie.kindnummer === 1
      ? percentageEersteKind2026(situatie.inkomen)
      : percentageTweedeKind2026(situatie.inkomen);
  return berekenToeslag(situatie, pct, MAX_UURPRIJS_2026[situatie.opvangType]);
}

/**
 * Toeslag 2027 op basis van de SZW-begroting 2027. Voor het eerste kind zijn de
 * percentages gepubliceerd; voor het tweede kind rekent dit met de tabel van
 * 2026, zie `TWEEDE_KIND_2027_NIET_GEPUBLICEERD`.
 */
export function toeslag2027(situatie: OpvangSituatie): ToeslagUitkomst {
  const pct =
    situatie.kindnummer === 1
      ? percentageEersteKind2027(situatie.inkomen)
      : percentageTweedeKind2027(situatie.inkomen);
  return berekenToeslag(situatie, pct, MAX_UURPRIJS_2027[situatie.opvangType]);
}

/** De inkomens waarop de tabel in het artikel staat. */
export const TABEL_INKOMENS = [60000, 80000, 100000, 120000, 150000] as const;
