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
 * Alles hieronder is bijgewerkt op 18 september 2026, drie dagen na Prinsjesdag.
 * Er staat geen uitgelekt en geen geraamd cijfer meer in. De vorige versie van
 * dit bestand rekende met de cijfers die de NOS op 11 september had ingezien en
 * met een eigen indexatieraming; beide zijn vervangen.
 *
 * HERKOMST
 *
 * Belastingdienst, "Tabel inkomensafhankelijke combinatiekorting 2026"
 * (opgehaald 13 september 2026)
 * - IACK 2026: geen korting tot en met €6.239, daarboven 11,450 procent van
 *   (arbeidsinkomen min €6.239), met een maximum van €3.032 vanaf €32.711.
 *
 * Ministerie van Financiën, "Fiscale sleuteltabel 2027", bijlage bij het pakket
 * Belastingplan 2027, 15 september 2026 (opgehaald 18 september 2026)
 * - Niveau 2027 van de inkomensafhankelijke combinatiekorting: €2.918.
 * - Opbouwpercentage 2027: 11,45 procent, gelijk aan 2026.
 *
 * Wetsvoorstel Belastingplan 2027, artikel LI, 15 september 2026
 * (opgehaald 18 september 2026)
 * - De bedragen in de inkomstenbelasting worden per 1 januari 2027 niet met de
 *   tabelcorrectiefactor vermenigvuldigd maar met 1,01248. Dat is de beperkte
 *   inflatiecorrectie die de SZW-begroting de vrijheidsbijdrage voor burgers
 *   noemt. Hij geldt ook voor de drempel van de combinatiekorting.
 *
 * SZW-begroting 2027, Tweede Kamer 2026/2027, 37 020 XV, nr. 2, 15 september
 * 2026 (opgehaald 18 september 2026)
 * - "Verlaging van de inkomensafhankelijke combinatiekorting (IACK) met €153."
 *   Dat is wat de maatregel kost, los van de indexatie, p. 175.
 * - Eigen risico van €385 in 2026 naar €400 in 2027, en de gemiddelde nominale
 *   zorgpremie van €1.879 naar €2.029 per jaar, p. 175.
 * - Koopkracht 2027, p. 177: mediaan alle huishoudens min 0,1 procent, laagste
 *   inkomensgroep plus 0,2 procent, hoogste twee inkomensgroepen min 0,2
 *   procent, gepensioneerden plus 0,3 procent. Het 25e en 75e percentiel liggen
 *   op min 0,4 en plus 0,3 procent.
 * - Tabel 134, p. 179: koopkracht van voorbeeldhuishoudens.
 *
 * Ministerie van VWS, nieuwsbericht "Kabinet zet in op gezondheid en op zorg die
 * klaar is voor de toekomst", 15 september 2026 (opgehaald 18 september 2026)
 * - VWS verwacht een stijging van de zorgpremie met €12,50 per maand, naar een
 *   gemiddelde van €169 per maand. De verzekeraars stellen hun premie zelf vast
 *   en maken die uiterlijk 12 november bekend.
 *
 * CPB, Macro Economische Verkenning 2027, kerngegevens, 15 september 2026
 * (opgehaald 18 september 2026)
 * - Inflatie cpi 2027 2,7 procent, cao-loon bedrijven 3,8 procent, koopkracht
 *   statisch mediaan min 0,1 procent (2026: plus 0,6), bruto modaal inkomen
 *   €50.000 (2026: €48.000).
 *
 * CBS, "Inkomen en belastingdruk van een- en tweeverdieners", 9 september 2026
 * - Mediaan bruto huishoudinkomen van tweeverdieners in 2024 €128.100, en in de
 *   hoogste twintig procent van de inkomens is 87 procent van de werkzame
 *   huishoudens tweeverdiener, vanaf €126.700.
 *
 * NOG NIET DEFINITIEF
 * Eén ding in dit bestand staat nog niet vast: de zorgpremie. €2.029 per jaar is
 * de raming van VWS. De verzekeraars bepalen hun premie zelf en maken die
 * uiterlijk 12 november bekend. Dat staat als zodanig in de tekst van het
 * artikel en het moet daar blijven staan tot half november.
 */

import { kostenVanDeMaatregel, type Huishouden } from "./kindgebonden-budget";

// ── Inflatiecorrectie ────────────────────────────────────────────────────────

/**
 * De beperkte inflatiecorrectie voor 2027 uit artikel LI van het Belastingplan
 * 2027: 1,01248 in plaats van de gewone tabelcorrectiefactor. De SZW-begroting
 * noemt dit de vrijheidsbijdrage voor burgers en rekent het tot de maatregelen
 * die de koopkracht in 2027 drukken.
 */
export const INFLATIECORRECTIE_2027 = 1.01248;

// ── IACK ─────────────────────────────────────────────────────────────────────

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

/**
 * IACK 2027. Het maximum en het opbouwpercentage staan in de Fiscale
 * sleuteltabel 2027. De drempel staat daar niet in; die volgt uit de drempel van
 * 2026 maal de beperkte inflatiecorrectie van artikel LI. Dat is een afleiding
 * en geen gepubliceerd bedrag, en daarom staat het er hier bij.
 */
export const IACK_2027 = {
  /** Afgeleid: €6.239 maal 1,01248. */
  drempel: Math.round(IACK_2026.drempel * INFLATIECORRECTIE_2027),
  /** Fiscale sleuteltabel 2027: gelijk gebleven aan 2026. */
  opbouwpercentage: 0.1145,
  /** Fiscale sleuteltabel 2027, niveau 2027. */
  maximum: 2918,
} as const;

/** Rijksoverheid: afbouw naar nihil in negen jaarlijkse stappen vanaf 2027. */
export const IACK_AFBOUWSTAPPEN = 9;

/**
 * Wat de afbouwstap van 2027 kost bij een partner die het maximum haalt, volgens
 * de SZW-begroting 2027. Staat hier als controlegetal naast `iackVerlies`: die
 * functie rekent het zelf uit en moet hier binnen een paar euro op uitkomen.
 */
export const IACK_VERLAGING_2027_VOLGENS_SZW = 153;

/**
 * Het maximum dat in 2027 zou hebben gegolden als er geen afbouwstap was: het
 * maximum van 2026 maal de beperkte inflatiecorrectie. Dit is het ijkpunt voor
 * de prijs van de maatregel, net als `zonderMaatregel` bij het kindgebonden
 * budget.
 */
export const IACK_2027_ZONDER_MAATREGEL = IACK_2026.maximum * INFLATIECORRECTIE_2027;

// ── Kerncijfers ──────────────────────────────────────────────────────────────

/** CPB, Macro Economische Verkenning 2027, kerngegevens, 15 september 2026. */
export const CPB_2027 = {
  koopkrachtMediaanPct: -0.1,
  koopkrachtMediaan2026Pct: 0.6,
  inflatieCpiPct: 2.7,
  caoLoonPct: 3.8,
  brutoModaal: 50000,
  brutoModaal2026: 48000,
} as const;

/**
 * Koopkracht 2027 per groep, SZW-begroting 2027, p. 177. Dit zijn medianen per
 * groep, geen bedragen en geen individuele uitkomsten.
 */
export const KOOPKRACHT_2027 = {
  alleHuishoudensPct: -0.1,
  laagsteInkomensgroepPct: 0.2,
  hoogsteTweeInkomensgroepenPct: -0.2,
  gepensioneerdenPct: 0.3,
  percentiel25Pct: -0.4,
  percentiel75Pct: 0.3,
} as const;

/**
 * Koopkracht 2027 van vier voorbeeldhuishoudens met twee inkomens, SZW-begroting
 * 2027, tabel 134. Versimpelde voorbeelden, gerekend met twee kinderen van 6 tot
 * 11 jaar, zonder kinderopvangtoeslag en zonder hypotheekrenteaftrek.
 */
export const KOOPKRACHT_TWEEVERDIENERS_2027 = [
  { omschrijving: "modaal plus een halve modaal, met kinderen", pct: -0.1 },
  { omschrijving: "twee keer modaal plus een halve modaal, met kinderen", pct: 0.1 },
  { omschrijving: "twee en een halve keer modaal plus modaal, met kinderen", pct: -0.2 },
  { omschrijving: "modaal plus modaal, zonder kinderen", pct: -0.1 },
  { omschrijving: "twee keer modaal plus modaal, zonder kinderen", pct: -0.3 },
] as const;

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
 * Zorg 2027. Het eigen risico staat vast in de VWS-begroting. De premie is een
 * raming van VWS: verzekeraars stellen hun eigen premie vast en maken die
 * uiterlijk 12 november bekend. Noem dat onderscheid in elke tekst die deze
 * getallen gebruikt.
 */
export const ZORG_2027 = {
  eigenRisico2026: 385,
  eigenRisico2027: 400,
  /** SZW-begroting 2027, p. 175: gemiddelde nominale premie per jaar. */
  nominalePremiePerJaar2026: 1879,
  nominalePremiePerJaar2027: 2029,
  /** VWS, 15 september 2026. */
  premieStijgingPerMaand: 12.5,
  premiePerMaand2027: 169,
  /** VWS: de maximale zorgtoeslag voor alleenstaanden stijgt naar verwachting hiernaartoe. */
  maxZorgtoeslagAlleenstaandePerMaand2027: 140,
  /** VWS: maximale eigen bijdrage geneesmiddelen, ongewijzigd. */
  eigenBijdrageGeneesmiddelen: 250,
} as const;

/**
 * Het koopkrachtpakket uit het Belastingplan 2027, voor zover het een bedrag
 * noemt. Rijksoverheid, nieuwsbericht Belastingplan 2027, 15 september 2026.
 */
export const KOOPKRACHTPAKKET_2027 = {
  /** Verhoging van het maximum van de arbeidskorting, per persoon per jaar. */
  arbeidskortingVerhoging: 173,
  /** Verlaging van het tarief in de eerste en de tweede schijf, in procentpunt. */
  tariefVerlagingProcentpunt: 0.06,
  omvangMiljard: 1.5,
} as const;

/**
 * De inkomensafhankelijke combinatiekorting bij een arbeidsinkomen.
 *
 * Bij een paar telt alleen het arbeidsinkomen van de minstverdienende partner.
 * Dat is de reden dat twee huishoudens met hetzelfde gezamenlijke inkomen een
 * verschillend bedrag kwijtraken: het gaat om de verdeling, niet om de som.
 */
export function berekenIack(jaar: 2026 | 2027, arbeidsinkomenMinstverdienende: number): number {
  const tabel = jaar === 2026 ? IACK_2026 : IACK_2027;
  if (arbeidsinkomenMinstverdienende <= tabel.drempel) return 0;
  const opbouw = (arbeidsinkomenMinstverdienende - tabel.drempel) * tabel.opbouwpercentage;
  return Math.round(Math.min(tabel.maximum, opbouw));
}

/**
 * Wat de afbouwstap van 2027 dit huishouden kost, los van de indexatie.
 * Zelfde methode als `kostenVanDeMaatregel` in lib/kindgebonden-budget.ts:
 * 2027 mét de maatregel naast 2027 zónder de maatregel. Bij een partner die het
 * maximum haalt komt dit uit op het bedrag dat de SZW-begroting noemt.
 */
export function iackVerlies(arbeidsinkomenMinstverdienende: number): number {
  if (arbeidsinkomenMinstverdienende <= IACK_2027.drempel) return 0;

  const opbouw = (arbeidsinkomenMinstverdienende - IACK_2027.drempel) * IACK_2027.opbouwpercentage;
  const zonder = Math.min(IACK_2027_ZONDER_MAATREGEL, opbouw);
  const met = Math.min(IACK_2027.maximum, opbouw);
  return Math.max(0, Math.round(zonder - met));
}

/**
 * Het arbeidsinkomen van de minstverdienende partner waarboven de afbouwstap
 * van 2027 pas geld kost. Daaronder ligt de opbouw al onder het verlaagde
 * maximum en verandert er niets. Afgerond op honderdtallen, want de precisie die
 * het getal suggereert is er niet: de drempel voor 2027 is afgeleid.
 */
export const IACK_KANTELPUNT =
  Math.round((IACK_2027.drempel + IACK_2027.maximum / IACK_2027.opbouwpercentage) / 100) * 100;

// ── Zorg ─────────────────────────────────────────────────────────────────────

/**
 * De zorgkosten die er per volwassene bij komen, per jaar. Twee volwassenen
 * betekent twee keer het eigen risico en twee keer de premie.
 *
 * Het eigen risico telt alleen mee als je het ook opmaakt. Daarom staat het
 * hier apart van de premie: op het artikel wordt dat onderscheid gemaakt.
 */
export function zorgPerJaar(volwassenen: number): { premie: number; eigenRisico: number } {
  const premiePerPersoon =
    ZORG_2027.nominalePremiePerJaar2027 - ZORG_2027.nominalePremiePerJaar2026;
  return {
    premie: Math.round(premiePerPersoon * volwassenen),
    eigenRisico: (ZORG_2027.eigenRisico2027 - ZORG_2027.eigenRisico2026) * volwassenen,
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
 * €50.000 bruto (CPB, Macro Economische Verkenning 2027), dus twee keer modaal
 * is €100.000. De mediane
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
