// Eén bron voor de primaire conversieroute van de hele site.
//
// De gratis analyse is de enige primaire ingang. De Geldscan is altijd een
// vervolgstap, nooit de eerste stap. Wie een CTA bouwt gebruikt hier
// ANALYSE_ROUTE plus analyseHref(), zodat er nooit twee routes ontstaan.

export const ANALYSE_ROUTE = "/analyse";

/** De enige toegestane tekst voor een primaire CTA. */
export const PRIMAIRE_CTA_LABEL = "Doe de gratis analyse";

/** Homepage heeft één compacte formulering; alle links volgen dezelfde analyseroute. */
export const HOMEPAGE_CTA_LABEL = "Start de gratis analyse";

/** De kernboodschap, letterlijk herbruikbaar. */
export const CTA_KERN =
  "Eerst ontdekken wat er bij jou gebeurt. Daarna beslis je of je wilt weten waarom.";

/**
 * De Geldscan-route. Sinds 30-aug-2026 wijst elke knop en tekstlink op de site
 * rechtstreeks naar het aanvraagformulier. De uitlegpagina /geldscan bestaat
 * nog voor zoekverkeer, maar staat niet meer tussen een bezoeker en zijn
 * aanvraag in: die las het verhaal anders twee keer.
 *
 * Typ deze route nooit met de hand over, gebruik geldscanHref().
 */
export const GELDSCAN_ROUTE = "/aanbod/intake?pakket=geldscan";

/** De enige toegestane tekst voor een Geldscan-knop. */
export const GELDSCAN_CTA_LABEL = "Geldscan aanvragen";

/**
 * Bouwt de Geldscan-link. Geef het analysetoken mee als je het hebt, dan
 * koppelt het aanvraagformulier de aanvraag aan die analyse.
 */
export function geldscanHref(opties: { token?: string } = {}): string {
  return opties.token
    ? `${GELDSCAN_ROUTE}&token=${encodeURIComponent(opties.token)}`
    : GELDSCAN_ROUTE;
}

/**
 * Het adviesgesprek. Er is geen agendatool: de bezoeker vult het
 * aanmeldformulier in, daarna neem ik binnen 1 werkdag contact op om te plannen
 * en stuur ik het betaalverzoek. Beloof op geen enkele pagina dat iemand zelf
 * een tijdstip in een agenda prikt, want dat kan niet.
 */
export const GESPREK_ROUTE = "/aanbod/intake?pakket=gesprek";

/** De enige toegestane tekst voor een adviesgesprek-knop. */
export const GESPREK_CTA_LABEL = "Plan mijn adviesgesprek";

export function gesprekHref(): string {
  return GESPREK_ROUTE;
}

export type SituatieSleutel =
  | "gezin"
  | "alleenstaand"
  | "stel"
  | "alleenstaande-ouder"
  | "zzp";

/** Startwaarden voor de analyse per situatie. Dezelfde sleutels als op /geldscan. */
export const SITUATIE_ANALYSE_PARAMS: Record<SituatieSleutel, Record<string, string>> = {
  gezin: { volwassenen: "2" },
  alleenstaand: { volwassenen: "1", kinderen: "0" },
  stel: { volwassenen: "2", kinderen: "0" },
  "alleenstaande-ouder": { volwassenen: "1" },
  zzp: {},
};

export interface AnalyseOpties {
  situatie?: SituatieSleutel;
  inkomen?: number | string;
  boodschappen?: number | string;
  /** Extra queryparameters die de analyse zelf begrijpt. */
  extra?: Record<string, string>;
}

/**
 * Bouwt de primaire CTA-link. Bestaande situatie-, inkomen- en
 * boodschappenparameters gaan mee, zodat de analyse met de juiste
 * startwaarden opent en er onderweg niets verloren gaat.
 */
export function analyseHref(opties: AnalyseOpties = {}): string {
  const params = new URLSearchParams(
    opties.situatie ? SITUATIE_ANALYSE_PARAMS[opties.situatie] : {}
  );
  if (opties.extra) {
    Object.entries(opties.extra).forEach(([k, v]) => params.set(k, v));
  }
  if (opties.inkomen !== undefined && opties.inkomen !== null && opties.inkomen !== "") {
    params.set("inkomen", String(opties.inkomen));
  }
  if (
    opties.boodschappen !== undefined &&
    opties.boodschappen !== null &&
    opties.boodschappen !== ""
  ) {
    params.set("boodschappen", String(opties.boodschappen));
  }
  const query = params.toString();
  return query ? `${ANALYSE_ROUTE}?${query}` : ANALYSE_ROUTE;
}
