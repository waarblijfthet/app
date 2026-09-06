import { artikelen, laatstGewijzigd } from "./inzichten-data";

const BASE = "https://www.waarblijfthet.nl";

const STATISCHE_URLS = [
  `${BASE}/`,
  `${BASE}/analyse`,
  `${BASE}/adviesgesprek`,
  `${BASE}/aanbod`,
  `${BASE}/inzichten`,
  `${BASE}/over`,
  `${BASE}/woordenlijst`,
  `${BASE}/privacy`,
  `${BASE}/samenwerken`,
  `${BASE}/samenwerken/budgetcoaches`,
  `${BASE}/samenwerken/burnout-coaches`,
  `${BASE}/samenwerken/financieel-planners`,
  `${BASE}/samenwerken/relatietherapeuten`,
  `${BASE}/samenwerken/boekhouders`,
  `${BASE}/samenwerken/accountants-ondernemers`,
  // De enige Engelstalige pagina (6-sep-2026, N5). Staat bewust in de
  // statische lijst en niet in inzichten-data: hij hoort niet in /inzichten en
  // heeft zijn eigen route, metadata en schema.
  `${BASE}/en/is-5000-net-a-good-salary-netherlands`,
];

export interface UrlMetDatum {
  url: string;
  /** De `datum` uit inzichten-data, of null voor een statische pagina. */
  lastmod: string | null;
}

/**
 * Dezelfde lijst, met de laatste wijzigdatum per artikel erbij.
 *
 * Reden (6-sep-2026): IndexNow moet een URL opnieuw kunnen indienen zodra de
 * inhoud verandert. Zonder datum weet de indieningsjob alleen of een URL ooit
 * is ingediend, en dan blijft een herschreven pagina (CTR-ronde, 2027-sweep)
 * eeuwig op `submitted` staan zonder dat Bing hem opnieuw ophaalt.
 *
 * Statische pagina's hebben geen datumveld en krijgen null: die worden alleen
 * ingediend als ze nog nooit zijn ingediend.
 */
export function getAllUrlsMetDatum(): UrlMetDatum[] {
  return [
    ...STATISCHE_URLS.map((url) => ({ url: url, lastmod: null })),
    ...artikelen.map((a) => ({
      url: `${BASE}/inzichten/${a.slug}`,
      lastmod: laatstGewijzigd(a),
    })),
  ];
}

export function getAllUrls(): string[] {
  const artikelUrls = artikelen.map(
    (a) => `${BASE}/inzichten/${a.slug}`
  );
  return [...STATISCHE_URLS, ...artikelUrls];
}
