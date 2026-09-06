/**
 * Kindgebonden budget: de afbouw in 2026 en de nieuwe tweede afbouwschijf in 2027.
 *
 * Eén bron voor de tabel en de rekenaar op het artikel over de inkomensgrens,
 * zodat de tabel niet iets anders kan zeggen dan de rekenaar die er tien
 * centimeter boven staat. Zelfde reden als `lib/salaris-vuistregel.ts`.
 *
 * Herkomst van de getallen, opgehaald 6 september 2026:
 *
 * VASTGESTELD (2026)
 * - Afbouwpunt €29.736 voor een alleenstaande ouder en €39.141 voor paren:
 *   Belastingdienst, "Wat verandert er in 2026 voor uw toeslagen?".
 * - Afbouwpercentage 7,60 procent: AFAS Help Center, "Kindgebonden budget".
 * - Maximaal €2.580 per jaar per kind jonger dan 12: Consumentenbond,
 *   "Kindgebonden budget: bedragen en inkomensgrens 2026".
 * - Alleenstaande-ouderkop: afgeleid uit Knab Bieb (17 juli 2026), die voor een
 *   alleenstaande ouder met één kind onder de 12 uitkomt op €5.996 maximaal.
 *
 * WETSVOORSTEL (2027), aangenomen maar de bedragen nog niet definitief
 * - Tweede afbouwpunt bij een toetsingsinkomen van €60.000, prijspeil 2024:
 *   wetgevingskalender.overheid.nl, wijziging Wet op het kindgebonden budget,
 *   en Staatscourant 2026 nr. 14099 van 14 april 2026.
 * - Afbouwpercentage boven dat punt 12,35 procent in 2027 en 12,80 procent in
 *   2028, een verhoging van 4,30 procentpunt: Nederlands Juristenblad en
 *   Kamerstuk 36923 nr. 5 van 21 mei 2026.
 * - Daaruit volgt het basispercentage voor 2027: 12,35 min 4,30 is 8,05.
 *
 * RAMING (2027), duidelijk als zodanig gemarkeerd in `GERAAMD`
 * Het tweede afbouwpunt staat in prijspeil 2024 en wordt geïndexeerd. De
 * bedragen hieronder zijn de bedragen van 2026 opgehoogd met 3 procent per
 * jaar, in lijn met de inflatieraming van het CPB in de cMEV 2027 (circa 3
 * procent in 2026 en 2027). Zodra Prinsjesdag de definitieve bedragen geeft,
 * vervangen we deze vier getallen en verdwijnt de raming-vlag.
 */

export const KGB_2026 = {
  afbouwpuntAlleenstaandeOuder: 29736,
  afbouwpuntPaar: 39141,
  afbouwpercentage: 0.076,
  maxPerKindTot12: 2580,
  alleenstaandeOuderkop: 3416,
} as const;

export const KGB_2027 = {
  /** Geraamd: 2026-bedrag plus 3 procent. */
  afbouwpuntAlleenstaandeOuder: 30630,
  /** Geraamd: 2026-bedrag plus 3 procent. */
  afbouwpuntPaar: 40320,
  /** Geraamd: €60.000 prijspeil 2024, plus drie jaar indexatie van 3 procent. */
  tweedeAfbouwpunt: 65560,
  /** Vast: 12,35 min de verhoging van 4,30 procentpunt. */
  afbouwpercentage: 0.0805,
  /** Vast: wetsvoorstel. */
  afbouwpercentageBovenTweedePunt: 0.1235,
  /** Geraamd: 2026-bedrag plus 3 procent. */
  maxPerKindTot12: 2657,
  /** Geraamd: 2026-bedrag plus 3 procent. */
  alleenstaandeOuderkop: 3518,
} as const;

/** De verhoging zelf, in procentpunt. Dit is het enige harde beleidsgetal. */
export const VERHOGING_PROCENTPUNT =
  KGB_2027.afbouwpercentageBovenTweedePunt - KGB_2027.afbouwpercentage;

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
