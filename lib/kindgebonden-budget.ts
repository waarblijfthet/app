/**
 * Kindgebonden budget: de afbouw in 2026 en de nieuwe tweede afbouwschijf in 2027.
 *
 * Eén bron voor de tabel en de rekenaar op het artikel over de inkomensgrens,
 * zodat de tabel niet iets anders kan zeggen dan de rekenaar die er tien
 * centimeter boven staat. Zelfde reden als `lib/salaris-vuistregel.ts`.
 *
 * Herkomst van de getallen.
 *
 * VASTGESTELD (2026), opgehaald 6 september 2026
 * - Afbouwpunt €29.736 voor een alleenstaande ouder en €39.141 voor paren:
 *   Belastingdienst, "Wat verandert er in 2026 voor uw toeslagen?".
 * - Afbouwpercentage 7,60 procent: AFAS Help Center, "Kindgebonden budget".
 * - Maximaal €2.580 per jaar per kind jonger dan 12: Consumentenbond,
 *   "Kindgebonden budget: bedragen en inkomensgrens 2026".
 * - Alleenstaande-ouderkop: afgeleid uit Knab Bieb (17 juli 2026), die voor een
 *   alleenstaande ouder met één kind onder de 12 uitkomt op €5.996 maximaal.
 *
 * VASTGESTELD (2027), opgehaald 18 september 2026
 * Bron voor alle 2027-bedragen hieronder: de SZW-begroting 2027, Tweede Kamer,
 * vergaderjaar 2026/2027, 37 020 XV, nr. 2, aangeboden op Prinsjesdag
 * 15 september 2026. Pagina 143 geeft de afbouwpunten en percentages, tabel 107
 * op diezelfde pagina geeft de netto maximumbedragen per jaar.
 * - Afbouwpunt €30.910 (alleenstaande) en €40.560 (aanvrager met toeslagpartner).
 * - Basisafbouw: voor iedere €100 boven dat punt gaat er €8,05 af.
 * - Tweede knikpunt: €61.917, voor alleenstaanden en paren hetzelfde. Daarboven
 *   gaat er €9,95 per €100 af.
 * - Netto maximumbedragen per jaar: €2.653 voor het eerste kind en €2.653 voor
 *   ieder volgend kind, plus €729 extra voor 12- tot 15-jarigen, €976 extra voor
 *   16- en 17-jarigen en €3.505 extra voor een alleenstaande ouder.
 * - Vermogensgrens 2027: €119.122 (alleenstaande) en €158.748 (met toeslagpartner).
 *
 * WAT ER OP PRINSJESDAG IS VERANDERD TEN OPZICHTE VAN DE EERDERE RAMING
 * Drie dingen, en ze maken de maatregel kleiner dan hij tot 15 september leek.
 * 1. Het tweede knikpunt stond in het oorspronkelijke wetsvoorstel op €60.000
 *    prijspeil 2024. Bij Nota van Wijziging van 20 mei 2026 (Kamerstukken II
 *    2025/26, 36923, nr. 5) is dat verlaagd naar €57.950 prijspeil 2024. In
 *    bedragen van 2027 is dat €61.917, niet de €65.560 die we eerder ramden.
 * 2. Het hogere afbouwpercentage wordt in twee stappen ingevoerd. Voor 2027 is
 *    het 9,95 procent in plaats van de eerder voorgenomen 12,35 procent; pas per
 *    2028 wordt het 12,8 procent. De SZW-begroting noemt dat de verzachting van
 *    het tweede knikpunt.
 * 3. De kindbedragen zijn beleidsmatig met €63 verlaagd en daarna geïndexeerd,
 *    als eerste stap naar een nieuwe kindregeling. Netto komt het bedrag per kind
 *    daardoor op €2.653 uit.
 */

export const KGB_2026 = {
  afbouwpuntAlleenstaandeOuder: 29736,
  afbouwpuntPaar: 39141,
  afbouwpercentage: 0.076,
  maxPerKindTot12: 2580,
  alleenstaandeOuderkop: 3416,
} as const;

export const KGB_2027 = {
  /** SZW-begroting 2027, p. 143. */
  afbouwpuntAlleenstaandeOuder: 30910,
  /** SZW-begroting 2027, p. 143. */
  afbouwpuntPaar: 40560,
  /** SZW-begroting 2027, p. 143: €57.950 prijspeil 2024, in bedragen van 2027. */
  tweedeAfbouwpunt: 61917,
  /** SZW-begroting 2027, p. 143: €8,05 per €100 boven het eerste afbouwpunt. */
  afbouwpercentage: 0.0805,
  /** SZW-begroting 2027, p. 143: €9,95 per €100 boven het tweede knikpunt. */
  afbouwpercentageBovenTweedePunt: 0.0995,
  /** SZW-begroting 2027, tabel 107. */
  maxPerKindTot12: 2653,
  /** SZW-begroting 2027, tabel 107. */
  alleenstaandeOuderkop: 3505,
  /** SZW-begroting 2027, tabel 107: extra bedrag per kind van 12 tot en met 15. */
  extra12tot15: 729,
  /** SZW-begroting 2027, tabel 107: extra bedrag per kind van 16 en 17. */
  extra16tot17: 976,
  /** SZW-begroting 2027, p. 143. */
  vermogensgrensAlleenstaande: 119122,
  /** SZW-begroting 2027, p. 143. */
  vermogensgrensPaar: 158748,
} as const;

/**
 * Het afbouwpercentage boven het tweede knikpunt vanaf 2028. Staat hier omdat de
 * stap van 2027 alleen te begrijpen is als je ziet waar hij naartoe loopt.
 * SZW-begroting 2027, p. 140.
 */
export const KGB_2028_AFBOUWPERCENTAGE_BOVEN_TWEEDE_PUNT = 0.128;

/**
 * De verhoging in 2027 zelf, in procentpunt: 9,95 min 8,05. Dit is wat de
 * maatregel dit jaar doet, niet waar hij eindigt. Structureel wordt het 4,3
 * procentpunt, maar dat is pas vanaf 2028.
 */
export const VERHOGING_PROCENTPUNT =
  KGB_2027.afbouwpercentageBovenTweedePunt - KGB_2027.afbouwpercentage;

/** De structurele verhoging vanaf 2028, in procentpunt. */
export const VERHOGING_PROCENTPUNT_2028 =
  KGB_2028_AFBOUWPERCENTAGE_BOVEN_TWEEDE_PUNT - KGB_2027.afbouwpercentage;

/**
 * Het percentage dat boven het tweede knikpunt in 2026 gold, oftewel: er was geen
 * tweede knikpunt en er gold gewoon de basisafbouw. De SZW-begroting zet de
 * maatregel zo neer: boven circa €61.900 stijgt de afbouw van 7,60 procent in
 * 2026 naar 9,95 procent in 2027, in plaats van naar 12,35 procent.
 */
export const EERDER_VOORGENOMEN_AFBOUWPERCENTAGE_2027 = 0.1235;

export type Huishouden = "paar" | "alleenstaande_ouder";

export interface KgbUitkomst {
  /** Kindgebonden budget per jaar. */
  perJaar: number;
  /** Afgerond op hele euro's per maand. */
  perMaand: number;
}

function maximaal(jaar: 2026 | 2027, huishouden: Huishouden, kinderen: number): number {
  const t = jaar === 2026 ? KGB_2026 : KGB_2027;
  const kop = huishouden === "alleenstaande_ouder" ? t.alleenstaandeOuderkop : 0;
  return t.maxPerKindTot12 * kinderen + kop;
}

function afbouwpunt(jaar: 2026 | 2027, huishouden: Huishouden): number {
  const t = jaar === 2026 ? KGB_2026 : KGB_2027;
  return huishouden === "alleenstaande_ouder"
    ? t.afbouwpuntAlleenstaandeOuder
    : t.afbouwpuntPaar;
}

/**
 * Kindgebonden budget bij een gezamenlijk toetsingsinkomen, voor kinderen
 * jonger dan 12. Voor kinderen van 12 en ouder komen er vaste bedragen bij die
 * de afbouw niet veranderen, dus het verschil tussen 2026 en 2027 blijft gelijk.
 *
 * `zonderMaatregel` rekent 2027 door alsof de tweede afbouwschijf er niet was.
 * Dat is de zuivere prijs van de maatregel, los van indexatie.
 */
export function berekenKgb(
  jaar: 2026 | 2027,
  huishouden: Huishouden,
  kinderen: number,
  toetsingsinkomen: number,
  zonderMaatregel = false,
): KgbUitkomst {
  const max = maximaal(jaar, huishouden, kinderen);
  const start = afbouwpunt(jaar, huishouden);
  const boven = Math.max(0, toetsingsinkomen - start);

  let afbouw: number;
  if (jaar === 2026 || zonderMaatregel) {
    const pct = jaar === 2026 ? KGB_2026.afbouwpercentage : KGB_2027.afbouwpercentage;
    afbouw = boven * pct;
  } else {
    const tweede = KGB_2027.tweedeAfbouwpunt;
    const eersteSchijf = Math.max(0, Math.min(toetsingsinkomen, tweede) - start);
    const tweedeSchijf = Math.max(0, toetsingsinkomen - Math.max(tweede, start));
    afbouw =
      eersteSchijf * KGB_2027.afbouwpercentage +
      tweedeSchijf * KGB_2027.afbouwpercentageBovenTweedePunt;
  }

  const perJaar = Math.max(0, Math.round(max - afbouw));
  return { perJaar, perMaand: Math.round(perJaar / 12) };
}

/** Wat de maatregel dit huishouden kost in 2027, per jaar en per maand. */
export function kostenVanDeMaatregel(
  huishouden: Huishouden,
  kinderen: number,
  toetsingsinkomen: number,
): KgbUitkomst {
  const met = berekenKgb(2027, huishouden, kinderen, toetsingsinkomen);
  const zonder = berekenKgb(2027, huishouden, kinderen, toetsingsinkomen, true);
  const perJaar = Math.max(0, zonder.perJaar - met.perJaar);
  return { perJaar, perMaand: Math.round(perJaar / 12) };
}

/** Het inkomen waarbij het kindgebonden budget op nul uitkomt. */
export function nulpunt(
  huishouden: Huishouden,
  kinderen: number,
  zonderMaatregel = false,
): number {
  const max = maximaal(2027, huishouden, kinderen);
  const start = afbouwpunt(2027, huishouden);
  const tweede = KGB_2027.tweedeAfbouwpunt;

  if (zonderMaatregel) {
    return Math.round(start + max / KGB_2027.afbouwpercentage);
  }
  const opTweedePunt = max - (tweede - start) * KGB_2027.afbouwpercentage;
  if (opTweedePunt <= 0) {
    return Math.round(start + max / KGB_2027.afbouwpercentage);
  }
  return Math.round(tweede + opTweedePunt / KGB_2027.afbouwpercentageBovenTweedePunt);
}

/** De inkomens waarop de tabel in het artikel staat. */
export const TABEL_INKOMENS = [60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000] as const;
