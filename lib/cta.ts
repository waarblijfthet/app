// Eén bron voor de primaire conversieroute van de hele site.
//
// Sinds 9-nov-2026 (besluit Jarno, na nul betaalde conversies uit de analyse):
// de primaire knop overal gaat naar de uitgavenscan op het eigen bankafschrift,
// PRIMAIRE_ROUTE plus PRIMAIRE_CTA_LABEL. De analyse blijft bestaan als uitwijk
// voor wie geen afschrift bij de hand heeft ("snelle schatting"), als tekstlink
// onder de knop, nooit als tweede knop ernaast en niet als keuzescherm vooraf.
// Bouw je een CTA, gebruik dan PrimaireCta en AnalyseUitwijk (components/PrimaireCta.tsx).
//
// Daarvoor, sinds 5-nov-2026 zijn er twee ingangen, via één vraag ("Heb je al een
// overzicht van je uitgaven?", components/SplitsVraag.tsx): nee gaat naar de
// gratis analyse, ja naar de Geldscan met je eigen overzicht. Wie een CTA bouwt gebruikt hier
// ANALYSE_ROUTE plus analyseHref(), zodat er nooit twee routes ontstaan.

import type { KeuzeSleutel } from "./geldmomenten";

export const ANALYSE_ROUTE = "/analyse";

/** De uitgavenscan: het bankafschrift lezen in de browser, daarna een voorlopig advies. */
export const UITGAVENSCAN_ROUTE = "/uitgavenscan";

/** Waar de primaire knop naartoe gaat. Typ de route nooit over. */
export const PRIMAIRE_ROUTE = UITGAVENSCAN_ROUTE;

/** De enige toegestane tekst voor een primaire CTA. */
export const PRIMAIRE_CTA_LABEL = "Bekijk waar je geld blijft";

/** De regel onder de primaire knop: neemt de drempel van het bankbestand weg. */
export const PRIMAIRE_CTA_SUB = "Met je bankafschrift · gratis · je bestand blijft op je eigen apparaat";

/** De uitwijk naar de analyse, als tekstlink onder de primaire knop. */
export const ANALYSE_UITWIJK_VRAAG = "Geen afschrift bij de hand?";
export const ANALYSE_UITWIJK_LABEL = "Doe de snelle schatting";

/** Voor plekken die bewust naar de analyse wijzen, zoals de analysepagina zelf. */
export const ANALYSE_CTA_LABEL = "Doe de gratis analyse";

/** Homepage gebruikt dezelfde tekst als de rest van de site. */
export const HOMEPAGE_CTA_LABEL = PRIMAIRE_CTA_LABEL;

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
 *
 * Sinds 25-sep-2026 kan er ook een keuze mee (lib/geldmomenten.ts). Dan staat
 * het keuzeveld op het formulier al ingevuld. Het blijft dezelfde Geldscan.
 */
export function geldscanHref(
  opties: { token?: string; keuze?: KeuzeSleutel; spoor?: SpoorSleutel } = {}
): string {
  let href = GELDSCAN_ROUTE;
  if (opties.token) href += `&token=${encodeURIComponent(opties.token)}`;
  if (opties.keuze) href += `&keuze=${encodeURIComponent(opties.keuze)}`;
  if (opties.spoor) href += `&spoor=${encodeURIComponent(opties.spoor)}`;
  return href;
}

/**
 * Twee sporen naar dezelfde Geldscan (5-nov-2026, besluit Jarno, zie
 * docs/plan-positionering-aanbod-05-nov-2026.md). Wie nog geen overzicht
 * heeft, begint met de gratis analyse. Wie al een Excel, bankapp-overzicht of
 * budgetapp heeft, stuurt dat in en laat het nakijken. Zelfde product, zelfde
 * prijs, zelfde levertijd.
 *
 * Opslag zonder nieuwe kolom, net als de keuze: "[Spoor: ...]" vóór het
 * bericht in grootste_knelpunt.
 */
export type SpoorSleutel = "overzicht" | "vragenlijst";

export const SPOREN: { sleutel: SpoorSleutel; label: string; voorvoegsel: string }[] = [
  {
    sleutel: "overzicht",
    label: "Mijn eigen overzicht",
    voorvoegsel: "[Spoor: eigen overzicht]",
  },
  {
    sleutel: "vragenlijst",
    label: "Vragenlijst of gratis analyse",
    voorvoegsel: "[Spoor: vragenlijst]",
  },
];

/** Het spoor uit grootste_knelpunt, of null als er geen voorvoegsel staat. */
export function spoorUitKnelpunt(tekst: string | null | undefined): (typeof SPOREN)[number] | null {
  if (!tekst) return null;
  return SPOREN.find((s) => tekst.startsWith(s.voorvoegsel)) ?? null;
}

/** Het bericht zelf, zonder de voorvoegsels [Spoor: ...] en [Keuze: ...]. */
export function berichtZonderVoorvoegsels(tekst: string | null | undefined): string | null {
  if (!tekst) return null;
  const rest = tekst.replace(/^(?:\[(?:Spoor|Keuze): [^\]]+\]\s*)+/, "").trim();
  return rest.length > 0 ? rest : null;
}

export function spoorVoorSleutel(sleutel: string | null | undefined) {
  return SPOREN.find((s) => s.sleutel === sleutel);
}

/** Waar "Ja, ik heb al een overzicht" naartoe gaat: de uitleg op /geldscan. */
export const NAKIJKEN_ROUTE = "/geldscan#nakijken";

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
