/**
 * Wat er in 2027 verandert voor een tweeverdienershuishouden, in één bron.
 *
 * Dezelfde reden als `lib/kindgebonden-budget.ts` en `lib/salaris-vuistregel.ts`:
 * de tabel, de rekenaar en de FAQ-antwoorden op het artikel moeten uit dezelfde
 * functie komen, anders zeggen ze na de eerste wijziging iets anders.
 *
 * Het kindgebonden budget zit hier bewust NIET in. Dat staat al in
 * `lib/kindgebonden-budget.ts` en wordt van daaruit geïmporteerd, zodat er geen
 * tweede waarheid over dezelfde regeling ontstaat.
 *
 * Herkomst van de getallen, alle opgehaald op 13 september 2026.
 *
 * VASTGESTELD
 * - IACK 2026: geen korting tot en met €6.239, daarboven 11,450 procent van
 *   (arbeidsinkomen min €6.239), met een maximum van €3.032 vanaf €32.711.
 *   Belastingdienst, "Tabel inkomensafhankelijke combinatiekorting 2026".
 * - De IACK wordt vanaf 2027 in 9 jaarlijkse stappen afgebouwd naar nihil, voor
 *   alle ouders die er recht op hebben. Rijksoverheid, "Wat is een
 *   heffingskorting en welke heffingskortingen zijn er?".
 * - Inflatie (cpi) 2027 2,8 procent en koopkracht, statisch, mediaan alle
 *   huishoudens 2027 min 0,3 procent: CPB, kerngegevens cMEV 2027.
 * - Bruto modaal inkomen 2027 €50.000 (2026: €48.000): CPB, kerngegevens
 *   cMEV 2027. Dit is het enige gesourcete modaalcijfer voor 2027 dat er is.
 * - Mediaan bruto huishoudinkomen van tweeverdieners in 2024 €128.100, en in de
 *   hoogste twintig procent van de inkomens is 87 procent van de werkzame
 *   huishoudens tweeverdiener, vanaf €126.700: CBS, "Inkomen en belastingdruk
 *   van een- en tweeverdieners", 9 september 2026.
 *
 * UITGELEKT, NOG NIET DEFINITIEF
 * Op vrijdag 11 september 2026 meldde de NOS op basis van ingeziene
 * Prinsjesdagstukken: koopkracht alle huishoudens min 0,1 procent, lage
 * inkomens plus 0,2, gepensioneerden plus 0,3, middeninkomens min 0,1, hoge
 * inkomens min 0,2 en werkenden min 0,2 procent. Eigen risico van €385 naar
 * €400. Zorgpremie ongeveer €10 per maand hoger, naar circa €197, al bepalen de
 * verzekeraars dat zelf en zijn de premies pas half november bekend.
 * Dat zijn geen vastgestelde cijfers. Ze staan hieronder apart, in
 * `UITGELEKT`, en gaan er na Prinsjesdag op 15 september uit.
 *
 * RAMING
 * De indexatie van de IACK voor 2027 is hier de cpi-raming van het CPB voor
 * 2027 (2,8 procent). De werkelijke indexatie volgt de tabelcorrectiefactor en
 * kan daarvan afwijken. Zodra het Belastingplan 2027 er is, vervangen we
 * `IACK_2027_INDEXATIE` door het definitieve maximumbedrag en verdwijnt deze
 * regel.
 */

import { kostenVanDeMaatregel, type Huishouden } from "./kindgebonden-budget";

// ── Vastgestelde cijfers ─────────────────────────────────────────────────────

/** Belastingdienst, tabel IACK 2026. */
export const IACK_2026 = {
  /** Tot en met dit arbeidsinkomen is er geen korting. */
  drempel: 6239,
  /** Opbouwpercentage over het arbeidsinkomen boven de drempel. */
  opbouwpercentage: 0.1145,
  /** Vanaf dit arbeidsinkomen geldt het maximum. */
  maximumVanaf: 32711,
  maximum: 3032,
} as const;

/** Rijksoverheid: afbouw naar nihil in negen jaarlijkse stappen vanaf 2027. */
export const IACK_AFBOUWSTAPPEN = 9;

/** CPB cMEV 2027: cpi-raming 2027. Gebruikt als indexatie, zie kop. */
export const IACK_2027_INDEXATIE = 0.028;

/** CPB cMEV 2027, kerngegevens. */
export const CPB_2027 = {
  koopkrachtMediaanPct: -0.3,
  koopkrachtMediaan2026Pct: 0.6,
  inflatieCpiPct: 2.8,
  caoLoonPct: 3.8,
  brutoModaal: 50000,
  brutoModaal2026: 48000,
} as const;

/** CBS, 9 september 2026. */
export const CBS_TWEEVERDIENERS = {
  medianeBrutoInkomen2024: 128100,
  /** Aandeel tweeverdieners onder de werkzame huishoudens in de hoogste 20 procent. */
  aandeelHoogste20Pct: 87,
  /** De inkomensgrens waarboven die hoogste twintig procent begint. */
  grensHoogste20Pct: 126700,
  medianeHoofdkostwinner2024: 80800,
  medianePartner2024: 39000,
} as const;

/**
 * De uitgelekte Prinsjesdagcijfers. Alles hier is van NOS, 11 september 2026,
 * en is op 13 september niet officieel bevestigd. Gebruik geen enkel getal uit
 * dit blok zonder het in de tekst als uitgelekt te benoemen.
 */
export const UITGELEKT = {
  koopkrachtAlleHuishoudensPct: -0.1,
  koopkrachtWerkendenPct: -0.2,
  koopkrachtHogeInkomensPct: -0.2,
  koopkrachtMiddeninkomensPct: -0.1,
  eigenRisico2026: 385,
  eigenRisico2027: 400,
  zorgpremiePerMaand2027: 197,
  zorgpremieStijgingPerMaand: 10,
} as const;

// ── IACK ─────────────────────────────────────────────────────────────────────

/**
 * De inkomensafhankelijke combinatiekorting bij een arbeidsinkomen.
 *
 * Bij een paar telt alleen het arbeidsinkomen van de minstverdienende partner.
 * Dat is de reden dat twee huishoudens met hetzelfde gezamenlijke inkomen een
 * verschillend bedrag kwijtraken: het gaat om de verdeling, niet om de som.
 *
 * `jaar` 2027 rekent met het geïndexeerde maximum minus één afbouwstap.
 */
export function berekenIack(jaar: 2026 | 2027, arbeidsinkomenMinstverdienende: number): number {
  if (arbeidsinkomenMinstverdienende <= IACK_2026.drempel) return 0;

  const maximum =
    jaar === 2026
      ? IACK_2026.maximum
      : Math.round(
          IACK_2026.maximum *
            (1 + IACK_2027_INDEXATIE) *
            ((IACK_AFBOUWSTAPPEN - 1) / IACK_AFBOUWSTAPPEN),
        );

  const opbouw = (arbeidsinkomenMinstverdienende - IACK_2026.drempel) * IACK_2026.opbouwpercentage;
  return Math.round(Math.min(maximum, opbouw));
}

/**
 * Wat de afbouwstap van 2027 dit huishouden kost, los van de indexatie.
 * Zelfde methode als `kostenVanDeMaatregel` in lib/kindgebonden-budget.ts:
 * 2027 mét de maatregel naast 2027 zónder de maatregel.
 */
export function iackVerlies(arbeidsinkomenMinstverdienende: number): number {
  if (arbeidsinkomenMinstverdienende <= IACK_2026.drempel) return 0;

  const geindexeerdMaximum = IACK_2026.maximum * (1 + IACK_2027_INDEXATIE);
  const opbouw = (arbeidsinkomenMinstverdienende - IACK_2026.drempel) * IACK_2026.opbouwpercentage;

  const zonder = Math.min(geindexeerdMaximum, opbouw);
  const met = Math.min(
    geindexeerdMaximum * ((IACK_AFBOUWSTAPPEN - 1) / IACK_AFBOUWSTAPPEN),
    opbouw,
  );
  return Math.max(0, Math.round(zonder - met));
}

/**
 * Het arbeidsinkomen van de minstverdienende partner waarboven de afbouwstap
 * van 2027 pas geld kost. Daaronder ligt de opbouw al onder het verlaagde
 * maximum en verandert er niets. Afgerond op honderdtallen, want de precisie
 * die het getal suggereert is er niet: de indexatie is een raming.
 */
export const IACK_KANTELPUNT =
  Math.round(
    (IACK_2026.drempel +
      (IACK_2026.maximum *
        (1 + IACK_2027_INDEXATIE) *
        ((IACK_AFBOUWSTAPPEN - 1) / IACK_AFBOUWSTAPPEN)) /
        IACK_2026.opbouwpercentage) /
      100,
  ) * 100;

// ── Zorg ─────────────────────────────────────────────────────────────────────

/**
 * De zorgkosten die er per volwassene bij komen, per jaar. Twee volwassenen
 * betekent twee keer het eigen risico en twee keer de premie.
 *
 * Het eigen risico telt alleen mee als je het ook opmaakt. Daarom staat het
 * hier apart van de premie: op het artikel wordt dat onderscheid gemaakt.
 */
export function zorgPerJaar(volwassenen: number): { premie: number; eigenRisico: number } {
  return {
    premie: Math.round(UITGELEKT.zorgpremieStijgingPerMaand * 12 * volwassenen),
    eigenRisico: (UITGELEKT.eigenRisico2027 - UITGELEKT.eigenRisico2026) * volwassenen,
  };
}

// ── De voorbeeldhuishoudens ──────────────────────────────────────────────────

export interface Profiel {
  sleutel: string;
  naam: string;
  omschrijving: string;
  /** Bruto jaarinkomen van de hoogstverdienende partner. */
  hoogste: number;
  /** Bruto jaarinkomen van de minstverdienende partner. */
  laagste: number;
  kinderen: number;
  /** Aantal kinderen jonger dan 12. Alleen die tellen voor de IACK. */
  kinderenOnder12: number;
}

/**
 * Drie indicatieve profielen, geen persoonlijke belastingberekeningen.
 *
 * De bedragen zijn gekozen op CPB en CBS, niet op gevoel: modaal is in 2027
 * €50.000 bruto (CPB cMEV 2027), dus twee keer modaal is €100.000. De mediane
 * tweeverdiener zat in 2024 op €128.100 bruto per huishouden (CBS), dus
 * €140.000 is geen uitschieter maar iets boven het midden.
 */
export const PROFIELEN: Profiel[] = [
  {
    sleutel: "a",
    naam: "Stel A",
    omschrijving: "samen €70.000, één volledige baan en één van drie dagen",
    hoogste: 45000,
    laagste: 25000,
    kinderen: 2,
    kinderenOnder12: 1,
  },
  {
    sleutel: "b",
    naam: "Stel B",
    omschrijving: "samen €100.000, twee keer modaal",
    hoogste: 50000,
    laagste: 50000,
    kinderen: 2,
    kinderenOnder12: 2,
  },
  {
    sleutel: "c",
    naam: "Stel C",
    omschrijving: "samen €140.000, iets boven de mediane tweeverdiener",
    hoogste: 85000,
    laagste: 55000,
    kinderen: 2,
    kinderenOnder12: 2,
  },
];

export interface ProfielUitkomst {
  profiel: Profiel;
  samen: number;
  /** Kindgebonden budget dat de tweede afbouwschijf kost, per jaar. */
  kgbPerJaar: number;
  /** De IACK-afbouwstap van 2027, per jaar. */
  iackPerJaar: number;
  /** Hogere zorgpremie voor twee volwassenen, per jaar. Uitgelekt cijfer. */
  zorgpremiePerJaar: number;
  /** Hoger eigen risico voor twee volwassenen, per jaar. Uitgelekt cijfer. */
  eigenRisicoPerJaar: number;
  /** Alles bij elkaar, per jaar en per maand. */
  totaalPerJaar: number;
  totaalPerMaand: number;
}

/**
 * Reken één profiel door. `huishouden` staat vast op "paar": dit artikel gaat
 * over tweeverdieners. De alleenstaande ouder staat in het kindgebonden
 * budget-artikel en heeft een eigen rekenaar.
 *
 * Het gezamenlijke bruto-inkomen wordt hier als toetsingsinkomen gebruikt.
 * Dat is een vereenvoudiging: het toetsingsinkomen is het verzamelinkomen, dat
 * bij een koopwoning met hypotheekrenteaftrek lager uitvalt. Op het artikel
 * staat die aanname met zoveel woorden.
 */
export function rekenProfiel(profiel: Profiel): ProfielUitkomst {
  const samen = profiel.hoogste + profiel.laagste;
  const huishouden: Huishouden = "paar";

  const kgbPerJaar = kostenVanDeMaatregel(huishouden, profiel.kinderen, samen).perJaar;
  const iackPerJaar = profiel.kinderenOnder12 > 0 ? iackVerlies(profiel.laagste) : 0;
  const zorg = zorgPerJaar(2);

  const totaalPerJaar = kgbPerJaar + iackPerJaar + zorg.premie + zorg.eigenRisico;

  // Alle velden expliciet uitgeschreven, ook waar de verkorte notatie zou
  // kunnen. De minifier van Next 14.2 hernoemt bij het invouwen van een
  // hulpfunctie niet alle verwijzingen naar een parameter, zie
  // projectmemory `minifier-verkorte-objectnotatie` en CLAUDE.md sectie 10.2.
  return {
    profiel: profiel,
    samen: samen,
    kgbPerJaar: kgbPerJaar,
    iackPerJaar: iackPerJaar,
    zorgpremiePerJaar: zorg.premie,
    eigenRisicoPerJaar: zorg.eigenRisico,
    totaalPerJaar: totaalPerJaar,
    totaalPerMaand: Math.round(totaalPerJaar / 12),
  };
}

export function alleProfielen(): ProfielUitkomst[] {
  return PROFIELEN.map(rekenProfiel);
}

/**
 * Het verschil tussen een koopkrachtpercentage en een bedrag op de rekening.
 * Min 0,1 procent koopkracht is geen 0,1 procent minder salaris: het is het
 * saldo van loon, prijzen, belasting en regelingen. Deze functie zet zo'n
 * percentage om in euro's per maand bij een netto maandinkomen, puur om te
 * laten zien hoe klein zo'n percentage is naast één concrete maatregel.
 */
export function koopkrachtInEuro(nettoPerMaand: number, procent: number): number {
  return Math.round((nettoPerMaand * procent) / 100);
}
