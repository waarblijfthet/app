/** Eén afwijkende uitgavenpost: het bedrag van de bezoeker naast de benchmark. */
export interface AfwijkingEntry {
  label: string;
  jij: number;
  bench: number;
  diff: number;
}

/**
 * De brug naar de Geldscan, drie varianten afhankelijk van de uitkomst (zie
 * bouwBrug in Stap6Resultaat.tsx). Ongewijzigd overgenomen uit de vorige
 * versie van deze pagina: welke tekst waar en waarom klopt, hangt af van of er
 * een post boven de benchmark zit, en zo niet, of dat bij twee van de vijf
 * geleverde rapporten ook al zo was. Nooit hardcoden, altijd via deze functie.
 */
export interface Brug {
  kop: string;
  tegen: string;
  uitleg: string;
  slot: string;
  cta: string;
}
