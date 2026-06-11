// Crawler voor de prospect-zoeker.
// Bezoekt websites beleefd (robots.txt, lage frequentie, kleine limieten),
// zoekt contactpagina's en extraheert e-mailadressen + namen.

import { Doelgroep, GevondenProspect, WachtrijItem } from "./types";
import {
  contextRondEmail,
  extractEmails,
  extractLinks,
  extractNaam,
  extractTitle,
  naarTekst,
} from "./extract";
import { classificeer } from "./classify";

const USER_AGENT =
  "WaarBlijftHetBot/1.0 (+https://www.waarblijfthet.nl; partnerschap-onderzoek)";

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 600_000;
const MAX_PAGINAS_PER_SITE = 4;
const MAX_EMAILS_PER_SITE = 3;

// Domeinen die nooit een praktijkwebsite zijn
const OVERSLAAN_DOMEINEN = [
  "facebook.com", "instagram.com", "linkedin.com", "twitter.com", "x.com",
  "youtube.com", "google.com", "google.nl", "maps.google", "goo.gl",
  "wikipedia.org", "whatsapp.com", "tiktok.com", "pinterest.com",
  "apple.com", "play.google", "vimeo.com", "calendly.com", "spotify.com",
  "duckduckgo.com", "bing.com", "trustpilot.com", "klantenvertellen.nl",
];

const CONTACT_HINTS = /contact|over[\s-]?(ons|mij)?$|over-|team|wie[\s-]?(ben|zijn)|praktijk|about/i;

function hostVan(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// SSRF-bescherming: weiger interne en privé-adressen. De crawler haalt
// publiek geplakte URL's op, dus we mogen nooit interne endpoints raken.
function isPriveHost(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, "");
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "::1" || h === "[::1]" || h.startsWith("fe80:") || h.startsWith("fc") || h.startsWith("fd")) return true;
  // IPv4-literal ranges
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [parseInt(m[1], 10), parseInt(m[2], 10)];
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true; // cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a >= 224) return true; // multicast / gereserveerd
  }
  return false;
}

export function isVeiligeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return !isPriveHost(u.hostname);
  } catch {
    return false;
  }
}

function isOverslaanDomein(url: string): boolean {
  const host = hostVan(url);
  if (!host) return true;
  return OVERSLAAN_DOMEINEN.some((d) => host === d || host.endsWith("." + d));
}

async function fetchMetTimeout(url: string, accept: string): Promise<Response | null> {
  // Redirects handmatig volgen zodat elke hop opnieuw de SSRF-check passeert.
  let huidig = url;
  for (let hop = 0; hop < 5; hop += 1) {
    if (!isVeiligeUrl(huidig)) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(huidig, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: accept,
          "Accept-Language": "nl,en;q=0.7",
        },
        redirect: "manual",
        signal: controller.signal,
      });
      if (res.status >= 300 && res.status < 400) {
        const locatie = res.headers.get("location");
        if (!locatie) return res;
        try {
          huidig = new URL(locatie, huidig).toString();
        } catch {
          return null;
        }
        continue;
      }
      // Definitieve URL meegeven via een property die fetchPagina kan lezen
      return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: new Headers({
          "content-type": res.headers.get("content-type") ?? "",
          "x-final-url": huidig,
        }),
      });
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

/** Haalt een HTML-pagina op, met limieten op grootte en type */
export async function fetchPagina(url: string): Promise<{ html: string; finalUrl: string } | null> {
  const res = await fetchMetTimeout(url, "text/html,application/xhtml+xml");
  if (!res || !res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("html")) return null;
  const finalUrl = res.headers.get("x-final-url") || url;
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) {
    return { html: new TextDecoder().decode(buf.slice(0, MAX_BYTES)), finalUrl };
  }
  return { html: new TextDecoder().decode(buf), finalUrl };
}

const BOT_NAAM = "waarblijfthetbot";

/**
 * Leest robots.txt en geeft de Disallow-regels die voor ons gelden.
 * Groepeert per user-agent-blok en kiest het meest specifieke blok dat op ons
 * van toepassing is (onze botnaam wint van *). Zo blokkeert een `Disallow: /`
 * onder een ANDERE bot ons niet ten onrechte.
 */
async function leesRobotsDisallow(origin: string): Promise<string[]> {
  const res = await fetchMetTimeout(origin + "/robots.txt", "text/plain");
  if (!res || !res.ok) return [];
  let tekst: string;
  try {
    tekst = await res.text();
  } catch {
    return [];
  }

  const blokken: { agents: string[]; disallow: string[] }[] = [];
  let huidig: { agents: string[]; disallow: string[] } | null = null;
  let vorigeWasAgent = false;

  for (const regel of tekst.split("\n")) {
    const schoon = regel.split("#")[0].trim();
    if (!schoon) continue;
    const dubbele = schoon.indexOf(":");
    if (dubbele === -1) continue;
    const sleutel = schoon.slice(0, dubbele).trim().toLowerCase();
    const waarde = schoon.slice(dubbele + 1).trim();

    if (sleutel === "user-agent") {
      if (!huidig || !vorigeWasAgent) {
        huidig = { agents: [], disallow: [] };
        blokken.push(huidig);
      }
      huidig.agents.push(waarde.toLowerCase());
      vorigeWasAgent = true;
    } else if (sleutel === "disallow" && huidig) {
      if (waarde) huidig.disallow.push(waarde);
      vorigeWasAgent = false;
    } else {
      vorigeWasAgent = false;
    }
  }

  const eigen = blokken.find((b) => b.agents.includes(BOT_NAAM));
  if (eigen) return eigen.disallow;
  const ster = blokken.find((b) => b.agents.includes("*"));
  return ster ? ster.disallow : [];
}

/** Simpele robots.txt check: respecteert Disallow voor onze user-agent */
export async function magCrawlen(
  url: string,
  cache: Map<string, string[]>
): Promise<boolean> {
  let origin: string;
  let pad: string;
  try {
    const u = new URL(url);
    origin = u.origin;
    pad = u.pathname;
  } catch {
    return false;
  }

  if (!cache.has(origin)) {
    cache.set(origin, await leesRobotsDisallow(origin));
  }

  const disallow = cache.get(origin) ?? [];
  return !disallow.some((regelPad) => pad.startsWith(regelPad));
}

function wacht(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Crawlt één praktijkwebsite: homepage plus maximaal drie contact-achtige
 * pagina's. Geeft gevonden prospects terug (één per e-mailadres).
 */
export async function verzamelSiteProspects(
  siteUrl: string,
  vasteDoelgroep: Doelgroep | null,
  robotsCache: Map<string, string[]>
): Promise<GevondenProspect[]> {
  if (!isVeiligeUrl(siteUrl) || isOverslaanDomein(siteUrl)) return [];
  if (!(await magCrawlen(siteUrl, robotsCache))) return [];

  const home = await fetchPagina(siteUrl);
  if (!home) return [];

  const paginas: { html: string; url: string }[] = [{ html: home.html, url: home.finalUrl }];
  const homeHost = hostVan(home.finalUrl);

  // Contact-achtige interne links zoeken
  const kandidaten = extractLinks(home.html, home.finalUrl)
    .filter((l) => hostVan(l.url) === homeHost)
    .filter((l) => CONTACT_HINTS.test(l.url) || CONTACT_HINTS.test(l.tekst));
  const uniek = Array.from(new Map(kandidaten.map((l) => [l.url, l])).values())
    .slice(0, MAX_PAGINAS_PER_SITE - 1);

  for (const link of uniek) {
    if (paginas.length >= MAX_PAGINAS_PER_SITE) break;
    if (!(await magCrawlen(link.url, robotsCache))) continue;
    await wacht(300);
    const pagina = await fetchPagina(link.url);
    if (pagina) paginas.push({ html: pagina.html, url: pagina.finalUrl });
  }

  // E-mails verzamelen over alle pagina's, met bronpagina erbij
  const emailBron = new Map<string, { url: string; html: string }>();
  for (const p of paginas) {
    for (const email of extractEmails(p.html)) {
      if (!emailBron.has(email)) emailBron.set(email, { url: p.url, html: p.html });
      if (emailBron.size >= MAX_EMAILS_PER_SITE) break;
    }
    if (emailBron.size >= MAX_EMAILS_PER_SITE) break;
  }
  if (emailBron.size === 0) return [];

  // Naam, praktijk en doelgroep bepalen op basis van alle opgehaalde tekst
  const titel = extractTitle(home.html);
  let naamInfo = extractNaam(home.html, titel);
  for (const p of paginas.slice(1)) {
    if (naamInfo.naam) break;
    naamInfo = { ...extractNaam(p.html, titel), praktijk: naamInfo.praktijk ?? titel };
  }

  const alleTekst = paginas.map((p) => naarTekst(p.html)).join("\n").slice(0, 40_000);
  const { doelgroep, score } = classificeer(alleTekst, vasteDoelgroep);

  const prospects: GevondenProspect[] = [];
  for (const [email, bron] of Array.from(emailBron.entries())) {
    prospects.push({
      naam: naamInfo.naam ?? naamInfo.praktijk ?? titel ?? hostVan(siteUrl),
      praktijk: naamInfo.praktijk ?? (naamInfo.naam ? titel : null),
      email,
      website: home.finalUrl,
      bronUrl: bron.url,
      doelgroep,
      doelgroepScore: score,
      context: contextRondEmail(bron.html, email),
    });
  }
  return prospects;
}

/**
 * Bouwt een wachtrij van praktijkwebsites op basis van een overzichtspagina
 * (bijvoorbeeld een ledenlijst of verwijsgids). Externe links worden
 * kandidaat-sites; e-mails die al op de overzichtspagina staan komen direct
 * terug als prospects.
 */
export async function bouwWachtrijVanUrl(
  listingUrl: string,
  vasteDoelgroep: Doelgroep | null,
  robotsCache: Map<string, string[]>,
  maxSites: number
): Promise<{ wachtrij: WachtrijItem[]; directeProspects: GevondenProspect[] }> {
  if (!isVeiligeUrl(listingUrl)) return { wachtrij: [], directeProspects: [] };
  const pagina = await fetchPagina(listingUrl);
  if (!pagina) return { wachtrij: [], directeProspects: [] };

  const eigenHost = hostVan(pagina.finalUrl);
  const perDomein = new Map<string, string>();
  for (const link of extractLinks(pagina.html, pagina.finalUrl)) {
    const host = hostVan(link.url);
    if (!host || host === eigenHost || isOverslaanDomein(link.url)) continue;
    if (!perDomein.has(host)) {
      // Naar de homepage van het domein, daar begint de site-crawl
      try {
        perDomein.set(host, new URL(link.url).origin + "/");
      } catch {
        // ongeldige URL overslaan
      }
    }
    if (perDomein.size >= maxSites) break;
  }

  const wachtrij: WachtrijItem[] = Array.from(perDomein.values()).map((url) => ({
    url,
    bron: listingUrl,
  }));

  // E-mails die direct op de overzichtspagina staan
  const directeProspects: GevondenProspect[] = [];
  const tekst = naarTekst(pagina.html);
  const { doelgroep, score } = classificeer(tekst, vasteDoelgroep);
  const MAILPROVIDERS = [
    "gmail.com", "hotmail.com", "outlook.com", "live.nl", "live.com",
    "ziggo.nl", "kpnmail.nl", "icloud.com", "me.com", "yahoo.com",
    "planet.nl", "home.nl", "telfort.nl", "casema.nl", "xs4all.nl",
  ];
  for (const email of extractEmails(pagina.html).slice(0, 25)) {
    const emailDomein = email.split("@")[1];
    const naamDeel = email.split("@")[0].replace(/[._-]/g, " ");
    directeProspects.push({
      // Lokaal deel als ruwe naam; de admin corrigeert dit in de review
      naam: naamDeel.replace(/\b\w/g, (c) => c.toUpperCase()),
      praktijk: null,
      email,
      // Bij vrije mailproviders is het domein geen praktijkwebsite
      website: MAILPROVIDERS.includes(emailDomein) ? null : "https://" + emailDomein,
      bronUrl: pagina.finalUrl,
      doelgroep,
      doelgroepScore: score,
      context: contextRondEmail(pagina.html, email),
    });
  }

  return { wachtrij, directeProspects };
}

/**
 * Zoekt praktijkwebsites via DuckDuckGo (HTML-versie, geen API-sleutel nodig).
 * Best effort: als DuckDuckGo blokkeert, komt er een lege lijst terug.
 */
export async function zoekViaDuckDuckGo(
  zoekwoorden: string,
  maxSites: number
): Promise<WachtrijItem[]> {
  const query = encodeURIComponent(zoekwoorden);
  const res = await fetchMetTimeout(
    `https://html.duckduckgo.com/html/?q=${query}&kl=nl-nl`,
    "text/html"
  );
  if (!res || !res.ok) return [];
  const html = await res.text();

  const perDomein = new Map<string, string>();
  for (const m of Array.from(html.matchAll(/<a[^>]+class=["'][^"']*result__a[^"']*["'][^>]+href=["']([^"']+)["']/gi))) {
    let doel = m[1];
    // DuckDuckGo wikkelt links in een redirect met uddg-parameter
    const uddg = doel.match(/[?&]uddg=([^&]+)/);
    if (uddg) doel = decodeURIComponent(uddg[1]);
    if (doel.startsWith("//")) doel = "https:" + doel;
    if (isOverslaanDomein(doel)) continue;
    const host = hostVan(doel);
    if (!host || perDomein.has(host)) continue;
    try {
      perDomein.set(host, new URL(doel).origin + "/");
    } catch {
      // ongeldige URL overslaan
    }
    if (perDomein.size >= maxSites) break;
  }

  return Array.from(perDomein.values()).map((url) => ({
    url,
    bron: `zoekopdracht: ${zoekwoorden}`,
  }));
}
