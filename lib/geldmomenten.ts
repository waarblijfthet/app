/**
 * De vijf geldmomenten, en de enige bron voor het keuzeveld (25-sep-2026).
 *
 * Besluit van Jarno op 25 september 2026: de Geldscan blijft hetzelfde product
 * (zelfde prijs, zelfde levertijd, zelfde kernanalyse). Er komt alleen een
 * tweede ingang, "doorrekening vóór een keuze". Het aanvraagformulier krijgt
 * één optionele vraag en het rapport een blok "Nu tegenover na je keuze", dat
 * Jarno zelf schrijft. Zie docs/bouwvolgorde.md sectie 35.
 *
 * Wie hier een keuze toevoegt of hernoemt: het label komt letterlijk als
 * "[Keuze: <label>]" vóór het bericht in intake_aanvragen.grootste_knelpunt te
 * staan, en de admin telt daarop. Een hernoemd label telt dus als een nieuwe
 * keuze. Verander een label alleen als je dat accepteert.
 */

export type KeuzeSleutel =
  | "minder-werken"
  | "huis"
  | "scheiding"
  | "kind"
  | "kind-18"
  | "anders";

export interface Keuze {
  sleutel: KeuzeSleutel;
  label: string;
  /** Het artikel dat bij deze keuze hoort, als dat er is. */
  artikelSlug?: string;
  /**
   * De zin boven de Geldscan-link in het slotblok van een artikel met deze
   * keuze. Moet duidelijk maken dat het om dezelfde Geldscan gaat, en belooft
   * niets extra's: alleen het blok "nu tegenover na je keuze".
   */
  slotzin: string;
}

export const KEUZES: Keuze[] = [
  {
    sleutel: "minder-werken",
    label: "Minder gaan werken",
    artikelSlug: "wat-kost-een-dag-minder-werken",
    slotzin:
      "Denken jullie erover minder te gaan werken? In dezelfde Geldscan zet ik jullie maand nu naast de maand met minder uren, met jullie eigen bedragen, binnen twee werkdagen.",
  },
  {
    sleutel: "huis",
    label: "Een ander of groter huis",
    artikelSlug: "hogere-hypotheek-wat-kost-het-per-maand",
    slotzin:
      "Staat er een ander huis op tafel? In dezelfde Geldscan zet ik jullie maand nu naast de maand met de nieuwe woonlast, met jullie eigen bedragen. Over de hypotheek zelf adviseer ik niet.",
  },
  {
    sleutel: "scheiding",
    label: "Uit elkaar gaan",
    artikelSlug: "scheiden-goed-inkomen-toch-niks-over",
    slotzin:
      "Ga je uit elkaar? In dezelfde Geldscan zet ik jouw maand nu naast jouw maand straks in je eentje, met je eigen bedragen. Alimentatie en de verdeling laat ik bij je mediator of advocaat.",
  },
  {
    sleutel: "kind",
    label: "Een (tweede) kind",
    artikelSlug: "wat-kost-een-kind-per-maand",
    slotzin:
      "Denken jullie aan een (tweede) kind? In dezelfde Geldscan zet ik jullie maand nu naast de maand met een kind erbij, met jullie eigen bedragen, binnen twee werkdagen.",
  },
  {
    sleutel: "kind-18",
    label: "Ons kind wordt 18 of gaat studeren",
    artikelSlug: "kind-wordt-18-wat-verandert-er-financieel",
    slotzin:
      "Wordt jullie kind binnenkort 18? In dezelfde Geldscan zet ik jullie maand nu naast de maand daarna, met jullie eigen bedragen, binnen twee werkdagen.",
  },
  {
    sleutel: "anders",
    label: "Iets anders",
    slotzin:
      "Staat er een andere keuze aan te komen? Noem hem in je aanvraag. In dezelfde Geldscan zet ik je maand nu naast de maand daarna.",
  },
];

/** Geeft de keuze bij een sleutel uit de URL of het formulier. Onbekend of leeg: undefined. */
export function keuzeVoorSleutel(s: string | null | undefined): Keuze | undefined {
  if (!s) return undefined;
  return KEUZES.find((k) => k.sleutel === s);
}

/** Het voorvoegsel voor intake_aanvragen.grootste_knelpunt. De admin telt hierop. */
export function keuzeVoorvoegsel(keuze: Keuze): string {
  return `[Keuze: ${keuze.label}]`;
}

/**
 * Leest de keuze terug uit een opgeslagen grootste_knelpunt. Geeft het label
 * zoals het is opgeslagen, ook als het label intussen hernoemd is.
 */
export function keuzeUitKnelpunt(tekst: string | null | undefined): string | null {
  if (!tekst) return null;
  const m = tekst.match(/^\[Keuze: ([^\]]+)\]/);
  return m ? m[1] : null;
}
