/**
 * Rekenlaag voor N1, "je rentevaste periode loopt af".
 *
 * Waarom een eigen bestand en geen hardgetypte bedragen (brief N1 in
 * docs/plan-nieuwe-invalshoeken-06-sep-2026.md): de tabel op die pagina, de
 * rekenaar eronder en de FAQ-antwoorden moeten alle drie hetzelfde getal
 * noemen, ook nadat iemand hier een parameter wijzigt. Dezelfde reden als
 * lib/salaris-vuistregel.ts, werkregel 2 in CLAUDE.md.
 *
 * Wat dit bestand NIET doet, en ook nooit moet gaan doen: rentes vergelijken,
 * rentes voorspellen of aanbieders noemen. CLAUDE.md sectie 8 sluit een
 * hypotheekrekenaar uit. Dit rekent alleen het verschil in bruto maandlast bij
 * een rente die je zelf invult, zodat de pagina daarna over het huishouden kan
 * gaan en niet over de hypotheek.
 *
 * De formule staat zichtbaar op de pagina zelf, zodat een lezer hem kan
 * natrekken. Geen netto-effect, geen aftrek: dat is per huishouden anders en
 * een gemiddelde aftrek zou een precisie suggereren die er niet is.
 */

export interface RenteInvoer {
  /** De oorspronkelijke hoofdsom bij het afsluiten, in hele euro's. */
  hoofdsom: number;
  /** De rente die je nu betaalt, in procenten. Bijvoorbeeld 2 voor 2 procent. */
  huidigeRente: number;
  /** De rente die je verwacht te gaan betalen, in procenten. */
  nieuweRente: number;
  /** Totale looptijd van de hypotheek in jaren. Standaard 30. */
  looptijdJaren?: number;
  /** Hoeveel jaar er al betaald is. Standaard 10, de rentevaste periode die nu afloopt. */
  verstrekenJaren?: number;
}

export interface RenteUitkomst {
  /** Bruto maandlast bij de huidige rente, annuiteit over de volle looptijd. */
  huidigeMaandlast: number;
  /** Wat er na de verstreken jaren nog openstaat. */
  restschuld: number;
  /** Wat er nog aan looptijd over is, in jaren. */
  resterendeJaren: number;
  /** Bruto maandlast op de restschuld bij de nieuwe rente, over de resterende looptijd. */
  nieuweMaandlast: number;
  /** Het verschil per maand. Positief is duurder. */
  verschil: number;
}

/**
 * De annuiteitenformule, letterlijk zoals hij op de pagina staat:
 *
 *   M = P x i / (1 - (1 + i)^-n)
 *
 * met P de hoofdsom, i de maandrente (jaarrente gedeeld door twaalf) en n het
 * aantal maanden. Bij een rente van nul is het gewoon de hoofdsom gedeeld door
 * het aantal maanden.
 */
export function annuiteit(hoofdsom: number, jaarrente: number, jaren: number): number {
  const n = Math.round(jaren * 12);
  if (n <= 0) return 0;
  const i = jaarrente / 100 / 12;
  if (i === 0) return hoofdsom / n;
  return (hoofdsom * i) / (1 - Math.pow(1 + i, -n));
}

/**
 * Wat er na `verstrekenJaren` nog openstaat van een annuiteitenhypotheek:
 *
 *   R = P x ((1 + i)^n - (1 + i)^k) / ((1 + i)^n - 1)
 *
 * met k het aantal verstreken maanden. Dit is de reden dat je bij verlengen
 * niet over je oorspronkelijke bedrag rekent: je betaalt de nieuwe rente over
 * wat er nog staat, en dat is bij een annuiteit na tien jaar merkbaar minder.
 */
export function restschuldNa(
  hoofdsom: number,
  jaarrente: number,
  looptijdJaren: number,
  verstrekenJaren: number
): number {
  const n = Math.round(looptijdJaren * 12);
  const k = Math.round(verstrekenJaren * 12);
  if (k <= 0) return hoofdsom;
  if (k >= n) return 0;
  const i = jaarrente / 100 / 12;
  if (i === 0) return hoofdsom * (1 - k / n);
  const groeiN = Math.pow(1 + i, n);
  const groeiK = Math.pow(1 + i, k);
  return (hoofdsom * (groeiN - groeiK)) / (groeiN - 1);
}

/**
 * Het hele sommetje in een keer: wat betaal je nu, wat staat er nog open, wat
 * ga je betalen en wat is het verschil per maand.
 */
export function berekenRenteVerschil(invoer: RenteInvoer): RenteUitkomst {
  const looptijdJaren = invoer.looptijdJaren ?? 30;
  const verstrekenJaren = invoer.verstrekenJaren ?? 10;
  const resterendeJaren = Math.max(looptijdJaren - verstrekenJaren, 0);

  const huidigeMaandlast = annuiteit(invoer.hoofdsom, invoer.huidigeRente, looptijdJaren);
  const restschuld = restschuldNa(
    invoer.hoofdsom,
    invoer.huidigeRente,
    looptijdJaren,
    verstrekenJaren
  );
  const nieuweMaandlast = annuiteit(restschuld, invoer.nieuweRente, resterendeJaren);

  return {
    huidigeMaandlast: Math.round(huidigeMaandlast),
    restschuld: Math.round(restschuld),
    resterendeJaren: resterendeJaren,
    nieuweMaandlast: Math.round(nieuweMaandlast),
    verschil: Math.round(nieuweMaandlast - huidigeMaandlast),
  };
}

/**
 * De standaardsituatie van deze pagina, geverifieerd op 6 september 2026:
 * wie in 2016 tien jaar rentevast met NHG koos betaalt waarschijnlijk net onder
 * de twee procent en krijgt bij afloop in 2026 een voorstel van rond de vier
 * procent (Van Bruggen, 26 maart 2026). Die twee getallen staan hier zodat de
 * pagina, de tabel en de rekenaar niet uit elkaar kunnen lopen.
 */
export const RENTE_2016 = 2.0;
export const RENTE_2026 = 4.0;
export const LOOPTIJD_JAREN = 30;
export const RENTEVASTE_PERIODE_JAREN = 10;

/** De hypotheekbedragen in de tabel, uit de brief van N1. */
export const HOOFDSOMMEN = [250000, 350000, 450000];

/**
 * De renteverschillen in de kolommen. De eerste drie komen uit de brief; de
 * vierde is er op 6 september bijgekomen omdat de geverifieerde bron laat zien
 * dat het cohort van 2016 in de praktijk ongeveer twee procentpunt omhoog gaat,
 * en een tabel die op anderhalf stopt zou de echte situatie niet tonen.
 */
export const RENTEVERSCHILLEN = [0.5, 1.0, 1.5, 2.0];
