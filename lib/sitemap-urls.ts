import { artikelen } from "./inzichten-data";

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
];

export function getAllUrls(): string[] {
  const artikelUrls = artikelen.map(
    (a) => `${BASE}/inzichten/${a.slug}`
  );
  return [...STATISCHE_URLS, ...artikelUrls];
}
