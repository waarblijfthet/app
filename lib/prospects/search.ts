// Webzoeken voor de zoekwoorden-modus van de prospect-zoeker.
// Gebruikt de Brave Search API als er een sleutel is (betrouwbaar vanaf Vercel),
// en valt anders terug op DuckDuckGo's HTML-endpoint (gratis, maar vaak
// geblokkeerd vanaf datacenter-IP's).

import { WachtrijItem } from "./types";
import { hostVan, isOverslaanDomein, isVeiligeUrl } from "./crawler";

const ZOEK_TIMEOUT_MS = 9000;
const USER_AGENT =
  "WaarBlijftHetBot/1.0 (+https://www.waarblijfthet.nl; partnerschap-onderzoek)";

export type ZoekBron = "brave" | "duckduckgo" | "geen";

export interface ZoekResultaat {
  wachtrij: WachtrijItem[];
  bron: ZoekBron;
}

async function fetchMetTimeout(
  url: string,
  init: RequestInit
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ZOEK_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Maakt van een lijst gevonden URL's een wachtrij van één homepage per domein. */
function naarWachtrij(urls: string[], bron: string, max: number): WachtrijItem[] {
  const perDomein = new Map<string, string>();
  for (const ruwe of urls) {
    if (!ruwe || isOverslaanDomein(ruwe) || !isVeiligeUrl(ruwe)) continue;
    const host = hostVan(ruwe);
    if (!host || perDomein.has(host)) continue;
    try {
      perDomein.set(host, new URL(ruwe).origin + "/");
    } catch {
      // ongeldige URL overslaan
    }
    if (perDomein.size >= max) break;
  }
  return Array.from(perDomein.values()).map((url) => ({ url, bron }));
}

/** Zoekt via de Brave Search API. Geeft [] als er geen sleutel is of het faalt. */
async function zoekViaBrave(zoekwoorden: string, max: number): Promise<string[]> {
  const sleutel = process.env.BRAVE_SEARCH_API_KEY;
  if (!sleutel) return [];
  const url =
    "https://api.search.brave.com/res/v1/web/search?" +
    new URLSearchParams({
      q: zoekwoorden,
      country: "nl",
      search_lang: "nl",
      count: String(Math.min(max, 20)),
    }).toString();

  const res = await fetchMetTimeout(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": sleutel,
    },
  });
  if (!res || !res.ok) return [];
  try {
    const data = (await res.json()) as {
      web?: { results?: { url?: string }[] };
    };
    return (data.web?.results ?? [])
      .map((r) => r.url ?? "")
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Fallback: DuckDuckGo HTML via POST (zoals een browser het formulier verstuurt). */
async function zoekViaDuckDuckGo(zoekwoorden: string, max: number): Promise<string[]> {
  const res = await fetchMetTimeout("https://html.duckduckgo.com/html/", {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html",
      "Accept-Language": "nl,en;q=0.7",
      Referer: "https://duckduckgo.com/",
    },
    body: new URLSearchParams({ q: zoekwoorden, kl: "nl-nl" }).toString(),
  });
  if (!res || !res.ok) return [];
  let html: string;
  try {
    html = await res.text();
  } catch {
    return [];
  }

  const urls: string[] = [];
  for (const m of Array.from(
    html.matchAll(/<a[^>]+class=["'][^"']*result__a[^"']*["'][^>]+href=["']([^"']+)["']/gi)
  )) {
    let doel = m[1];
    const uddg = doel.match(/[?&]uddg=([^&]+)/);
    if (uddg) doel = decodeURIComponent(uddg[1]);
    if (doel.startsWith("//")) doel = "https:" + doel;
    urls.push(doel);
  }
  return urls.slice(0, max * 2);
}

/**
 * Zoekt websites voor één zoekopdracht. Probeert eerst Brave (als er een
 * sleutel is), dan DuckDuckGo. Geeft de bron terug zodat de UI kan uitleggen
 * waarom er niets gevonden is.
 */
export async function zoekWebsites(zoekwoorden: string, max: number): Promise<ZoekResultaat> {
  const braveSleutel = !!process.env.BRAVE_SEARCH_API_KEY;

  const braveUrls = await zoekViaBrave(zoekwoorden, max);
  if (braveUrls.length > 0) {
    return { wachtrij: naarWachtrij(braveUrls, `zoekopdracht: ${zoekwoorden}`, max), bron: "brave" };
  }

  const ddgUrls = await zoekViaDuckDuckGo(zoekwoorden, max);
  if (ddgUrls.length > 0) {
    return { wachtrij: naarWachtrij(ddgUrls, `zoekopdracht: ${zoekwoorden}`, max), bron: "duckduckgo" };
  }

  return { wachtrij: [], bron: braveSleutel ? "brave" : "geen" };
}
