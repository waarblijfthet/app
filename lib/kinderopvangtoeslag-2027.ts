/**
 * Kinderopvangtoeslag: de tabel 2026 en de derde stap op het ingroeipad voor 2027.
 *
 * Zelfde reden als `lib/kindgebonden-budget.ts` en `lib/prinsjesdag-2027.ts`: de
 * tabel, de rekenaar en de FAQ-antwoorden op het artikel moeten uit dezelfde
 * functie komen, anders zeggen ze na de eerste wijziging iets anders.
 *
 * Herkomst van de getallen.
 *
 * VASTGESTELD (2026)
 * - De volledige tabel toetsingsinkomen naar vergoedingspercentage voor het
 *   eerste en tweede kind: Belastingdienst / Rijksoverheid, "Bedragen
 *   kinderopvangtoeslag 2026", opgehaald 13 september 2026. Twee onafhankelijke
 *   herpublicaties van dezelfde tabel gecontroleerd en gelijk bevonden.
 * - Maximum uurprijzen 2026: dagopvang €11,23, buitenschoolse opvang €9,98,
 *   gastouderopvang €8,49. Belastingdienst, "Maximaal uurtarief voor de
 *   kinderopvang", opgehaald 13 september 2026. Diezelfde pagina bevestigt dat
 *   er nog geen 2027-bedragen gepubliceerd zijn.
 *
 * ONTWERP (2027), internetconsultatie gesloten, nog niet definitief
 * - Overheid.nl, internetconsultatie "Wijziging Besluit kinderopvangtoeslag",
 *   opgehaald 13 september 2026: dit is de derde stap op het ingroeipad naar
 *   het nieuwe stelsel, na de eerste stap in 2025 en de tweede in 2026. De
 *   consultatie liep tot en met 27 februari 2026 en is gesloten. Het besluit
 *   valt bij de voorjaarsbesluitvorming 2026; de indexatiepercentages voor de
 *   maximum uurprijzen en toetsingsinkomens komen pas vast te staan na
 *   publicatie van het Centraal Economisch Plan (CEP) van het CPB.
 * - De concept Nota van Toelichting (via Kinderopvang-Wijzer, die de officiële
 *   tekst reproduceert, opgehaald 13 september 2026) noemt drie concrete
 *   wijzigingen voor het eerste kind:
 *   1. De vaste voet (het percentage waar iedereen ten minste recht op heeft,
 *      ongeacht inkomen) gaat van 36,5 naar 42,9 procent, een verhoging van
 *      6,4 procentpunt.
 *   2. Toetsingsinkomens tussen ongeveer €56.000 en €172.000 krijgen een
 *      vergoedingspercentage dat 12,5 procentpunt hoger ligt dan in 2026.
 *   3. Alle werkende ouders met een toetsingsinkomen tot en met €87.767
 *      krijgen recht op het maximale percentage van 96 voor het eerste kind.
 *   Voor het tweede kind gaat het percentage voor iedereen die nog niet op 96
 *   procent zit met circa 3,6 procentpunt omhoog.
 * - Deze drie regels staan vast in het ontwerp; de exacte euro-inkomensgrenzen
 *   voor 2027 verschuiven nog met de indexatie die pas na het CEP bekend is.
 *   Reken daarom met de 2026-grenzen als basis, zoals het ontwerp dat zelf ook
 *   doet ("ten opzichte van 2026").
 *
 * Nog geen bron: het eerder genoemde indicatieve ingroeipadbedrag van
 * ongeveer €83.800 komt uit een eerdere, niet meer teruggevonden raming en
 * wordt hier niet gebruikt. Het geverifieerde omslagpunt naar 96 procent in
 * het 2027-ontwerp is €87.767.
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

/**
 * Geraamd: dezelfde 2026-bedragen plus een indicatieve indexatie van 5
 * procent, in lijn met de eerste CPB-geraamde loon- en prijsontwikkeling voor
 * 2027. Dit is GEEN vastgesteld bedrag: het Besluit kinderopvangtoeslag 2027
 * stelt de echte indexatie pas vast na het Centraal Economisch Plan. Gebruik
 * deze constante alleen met de raming zichtbaar erbij.
 */
export const MAX_UURPRIJS_2027_GERAAMD: Record<OpvangType, number> = {
  dagopvang: Math.round(MAX_UURPRIJS_2026.dagopvang * 1.05 * 100) / 100,
  bso: Math.round(MAX_UURPRIJS_2026.bso * 1.05 * 100) / 100,
  gastouder: Math.round(MAX_UURPRIJS_2026.gastouder * 1.05 * 100) / 100,
};

/** Vast in het ontwerp: het omslagpunt waaronder iedereen in 2027 96 procent krijgt. */
export const OMSLAGPUNT_96_PROCENT_2027 = 87767;
/** Vast in het ontwerp: bovengrens van de band die 12,5 procentpunt extra krijgt. */
export const BOVENGRENS_MIDDENBAND_2027 = 172000;
/** Vast in het ontwerp: de extra procentpunten in de middenband. */
export const EXTRA_MIDDENBAND_2027 = 0.125;
/** Vast in het ontwerp: vaste voet 2026 en 2027, en het verschil. */
export const VASTE_VOET_2026 = 0.365;
export const VASTE_VOET_2027 = 0.429;
export const VASTE_VOET_VERHOGING = VASTE_VOET_2027 - VASTE_VOET_2026;
/** Vast in het ontwerp: extra procentpunten voor het tweede kind. */
export const EXTRA_TWEEDE_KIND_2027 = 0.036;

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
 * Vergoedingspercentage eerste kind zoals het ontwerpbesluit 2027 het regelt,
 * toegepast op het 2026-toetsingsinkomen (de definitieve geïndexeerde grenzen
 * voor 2027 zijn er nog niet, zie de toelichting bovenaan dit bestand).
 */
export function percentageEersteKind2027(inkomen: number): number {
  if (inkomen <= OMSLAGPUNT_96_PROCENT_2027) return 0.96;
  if (inkomen <= BOVENGRENS_MIDDENBAND_2027) {
    return Math.min(0.96, percentageEersteKind2026(inkomen) + EXTRA_MIDDENBAND_2027);
  }
  return VASTE_VOET_2027;
}

/** Vergoedingspercentage tweede kind, 2027-ontwerp: 2026-percentage plus 3,6 procentpunt, tot 96 procent. */
export function percentageTweedeKind2027(inkomen: number): number {
  return Math.min(0.96, percentageTweedeKind2026(inkomen) + EXTRA_TWEEDE_KIND_2027);
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
 * Toeslag 2027 op basis van het ontwerpbesluit, met de geraamde (niet
 * vastgestelde) geïndexeerde maximum uurprijs. Altijd tonen als raming.
 */
export function toeslag2027Geraamd(situatie: OpvangSituatie): ToeslagUitkomst {
  const pct =
    situatie.kindnummer === 1
      ? percentageEersteKind2027(situatie.inkomen)
      : percentageTweedeKind2027(situatie.inkomen);
  return berekenToeslag(situatie, pct, MAX_UURPRIJS_2027_GERAAMD[situatie.opvangType]);
}

/** De inkomens waarop de tabel in het artikel staat. */
export const TABEL_INKOMENS = [60000, 80000, 100000, 120000, 150000] as const;
