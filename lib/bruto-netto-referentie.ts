/**
 * Vaste ijkpunten voor bruto tegenover netto, belastingjaar 2026.
 *
 * Waarom dit bestaat (18-aug-2026): het getal "voor €4.000 netto heb je
 * ongeveer €65.000 bruto nodig" stond met de hand getypt op vijf plekken, was
 * te laag, en had nergens een bron. Dat is dezelfde soort fout als de
 * abonnementen van €200 en de "72 artikelen": een getal dat in proza leeft in
 * plaats van in code. Vandaar één bestand, en artikelen importeren hieruit.
 *
 * Dit bestand rekent bewust niet. Het zijn vastgelegde uitkomsten, zodat er
 * geen belastinglogica in de app draait die stil fout kan gaan. De uitkomsten
 * zijn afgeleid met `scripts/bruto-netto-ijkpunten.mjs`, dat in de repo staat.
 * Wijzigt er een tarief, dan draai je dat script opnieuw en werk je de
 * constanten hier bij.
 *
 * GESOURCEERDE PARAMETERS (Belastingdienst, tarieven en heffingskortingen
 * 2026, geraadpleegd 18 augustus 2026):
 *   schijf 1  35,75% tot € 38.883
 *   schijf 2  37,56% tot € 78.426
 *   schijf 3  49,50% daarboven
 *   algemene heffingskorting  max € 3.115, afbouw 6,398% vanaf € 29.736
 *   arbeidskorting            max € 5.685, afbouw 6,510% vanaf € 45.592
 *
 * AANNAMES, expliciet omdat ze de uitkomst sterk bepalen:
 *   - Loondienst, één inkomen, geen pensioenpremie, geen auto van de zaak,
 *     geen aftrekposten, loonheffingskorting toegepast, jonger dan AOW.
 *   - Vakantiegeld is 8% en wordt los in mei uitbetaald, belast tegen het
 *     bijzonder tarief. De netto maandbedragen hieronder zijn dus wat er
 *     twaalf keer per jaar binnenkomt, met het vakantiegeld daar bovenop.
 *     Dat is dezelfde betekenis van "inkomen" als in lib/salaris-vuistregel.ts.
 *
 * CONTROLE: het script komt voor € 72.000 bruto uit op € 4.169,78 netto per
 * maand als je het vakantiegeld wél meerekent. Rekenmachinepro publiceert voor
 * hetzelfde bruto ongeveer € 4.170. De methode klopt dus op een extern ijkpunt.
 *
 * NIET GEPUBLICEERD: de bedragen in BRUTO_VOOR_NETTO zijn een eigen afleiding,
 * geen tabel van de Belastingdienst. Noem ze in artikelen als berekening, niet
 * als officieel cijfer.
 */

/** Bovengrens van de tweede schijf. Boven dit bedrag geldt schijf 3. */
export const SCHIJFGRENS_2 = 78426;

/** Tarief van de derde schijf. */
export const TARIEF_SCHIJF_3 = 0.495;

/**
 * Werkelijk marginaal tarief net boven de tweede schijfgrens: het schijftarief
 * van 49,50% plus de afbouw van de arbeidskorting van 6,510%. De algemene
 * heffingskorting is op € 78.423 al tot nul afgebouwd en telt daar dus niet meer
 * mee. Je houdt van elke extra bruto euro ongeveer 44 cent over, niet 50.
 */
export const MARGINAAL_BOVEN_SCHIJFGRENS_2 = 0.5601;

/**
 * Bruto jaarinkomen dat hoort bij een netto maandbedrag, afgerond op honderden.
 * Netto is exclusief vakantiegeld, zie de aannames boven.
 */
export const BRUTO_VOOR_NETTO: Record<number, number> = {
  2500: 36000,
  4000: 73300,
  5000: 101300,
};

/**
 * Bruto jaarinkomen dat twee partners samen nodig hebben voor een netto
 * maandbedrag samen, als ze het gelijk verdelen. Ieder gebruikt dan zijn eigen
 * heffingskortingen en lagere schijven, dus dit ligt flink lager dan het
 * bedrag voor één verdiener met hetzelfde nettobedrag.
 */
export const BRUTO_VOOR_NETTO_SAMEN: Record<number, number> = {
  5000: 72000,
};

/** Eén bron voor de zin "dit kost een eenverdiener extra". */
export const EENVERDIENER_MEERKOSTEN_5000 =
  BRUTO_VOOR_NETTO[5000] - BRUTO_VOOR_NETTO_SAMEN[5000];
