// Crawler voor de prospect-zoeker.
// Bezoekt websites beleefd (robots.txt, lage frequentie, kleine limieten),
// zoekt contactpagina's en extraheert e-mailadressen + namen.

import { Doelgroep, GevondenProspect, WachtrijItem } from "./types";
import {
  contextRondEmail,
  decodeEntities,
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

export function hostVan(url: string): string {
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

export function isOverslaanDomein(url: string): boolean {
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

const MAILPROVIDERS = [
  "gmail.com", "hotmail.com", "hotmail.nl", "outlook.com", "live.nl", "live.com",
  "ziggo.nl", "kpnmail.nl", "icloud.com", "me.com", "yahoo.com", "yahoo.nl",
  "planet.nl", "home.nl", "telfort.nl", "casema.nl", "xs4all.nl", "online.nl",
];

/** Is dit het e-mailadres van de directory zelf (bijv. info@eft.nl)? Dat negeren we. */
function isDirectoryEmail(email: string, negeerDomein?: string): boolean {
  if (!negeerDomein) return false;
  const domein = (email.split("@")[1] ?? "").toLowerCase();
  return domein === negeerDomein || domein.endsWith("." + negeerDomein);
}

/** Pad-diepte van een URL: aantal niet-lege segmenten */
function padDiepte(url: string): number {
  try {
    return new URL(url).pathname.split("/").filter(Boolean).length;
  } catch {
    return 0;
  }
}

/**
 * Kiest uit een lijst URL's de waarschijnlijke detail/profielpagina's: de
 * grootste groep same-host URL's met dezelfde pad-diepte (>= 2). Op een
 * overzichts- of sitemappagina zijn dat de honderden gelijkvormige
 * persoonspagina's, terwijl losse navigatiepagina's (diepte 1) afvallen.
 */
function kiesDetailCluster(urls: string[], host: string, max: number): string[] {
  const perDiepte = new Map<number, string[]>();
  const gezien = new Set<string>();
  for (const url of urls) {
    if (hostVan(url) !== host) continue;
    if (gezien.has(url)) continue;
    gezien.add(url);
    const diepte = padDiepte(url);
    if (diepte < 2) continue;
    if (!perDiepte.has(diepte)) perDiepte.set(diepte, []);
    perDiepte.get(diepte)!.push(url);
  }
  let beste: string[] = [];
  for (const groep of Array.from(perDiepte.values())) {
    if (groep.length > beste.length) beste = groep;
  }
  return beste.slice(0, max);
}

/** Haalt URL's uit een sitemap.xml (volgt één niveau sitemap-index). */
async function leesSitemapUrls(origin: string, max: number): Promise<string[]> {
  const kandidaten = [origin + "/sitemap.xml", origin + "/sitemap_index.xml"];
  for (const sitemapUrl of kandidaten) {
    const res = await fetchMetTimeout(sitemapUrl, "application/xml,text/xml");
    if (!res || !res.ok) continue;
    let xml: string;
    try {
      xml = await res.text();
    } catch {
      continue;
    }
    const locs = Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)).map((m) =>
      decodeEntities(m[1].trim())
    );
    if (locs.length === 0) continue;

    // Sitemap-index? Volg de eerste paar sub-sitemaps.
    if (/<sitemapindex/i.test(xml)) {
      const verzameld: string[] = [];
      for (const sub of locs.slice(0, 5)) {
        if (!isVeiligeUrl(sub)) continue;
        const subRes = await fetchMetTimeout(sub, "application/xml,text/xml");
        if (!subRes || !subRes.ok) continue;
        try {
          const subXml = await subRes.text();
          for (const m of Array.from(subXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi))) {
            verzameld.push(decodeEntities(m[1].trim()));
          }
        } catch {
          // sub-sitemap overslaan
        }
        if (verzameld.length >= max * 4) break;
      }
      return verzameld;
    }
    return locs;
  }
  return [];
}


/** Beste externe "eigen website"-link op een pagina (geen social, geen directory). */
function vindEigenWebsite(html: string, basisUrl: string, startHost: string, negeerDomein?: string): string | null {
  const tellingen = new Map<string, number>();
  const eersteUrl = new Map<string, string>();
  for (const link of extractLinks(html, basisUrl)) {
    const host = hostVan(link.url);
    if (!host || host === startHost || host === negeerDomein) continue;
    if (isOverslaanDomein(link.url) || !isVeiligeUrl(link.url)) continue;
    tellingen.set(host, (tellingen.get(host) ?? 0) + 1);
    if (!eersteUrl.has(host)) eersteUrl.set(host, link.url);
  }
  let besteHost: string | null = null;
  let besteAantal = 0;
  for (const [host, aantal] of Array.from(tellingen.entries())) {
    if (aantal > besteAantal) {
      besteAantal = aantal;
      besteHost = host;
    }
  }
  if (!besteHost) return null;
  try {
    return new URL(eersteUrl.get(besteHost)!).origin + "/";
  } catch {
    return null;
  }
}

/** Crawlt een pagina + maximaal enkele contact-achtige same-host pagina's. */
async function crawlPaginas(
  startUrl: string,
  robotsCache: Map<string, string[]>
): Promise<{ html: string; url: string }[]> {
  if (!isVeiligeUrl(startUrl) || isOverslaanDomein(startUrl)) return [];
  if (!(await magCrawlen(startUrl, robotsCache))) return [];
  const start = await fetchPagina(startUrl);
  if (!start) return [];

  const paginas = [{ html: start.html, url: start.finalUrl }];
  const startHost = hostVan(start.finalUrl);
  const kandidaten = extractLinks(start.html, start.finalUrl)
    .filter((l) => hostVan(l.url) === startHost)
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
  return paginas;
}

function bouwProspects(
  paginas: { html: string; url: string }[],
  emailBron: Map<string, { url: string; html: string }>,
  website: string | null,
  vasteDoelgroep: Doelgroep | null,
  fallbackHost: string
): GevondenProspect[] {
  const titel = extractTitle(paginas[0]?.html ?? "");
  let naamInfo = extractNaam(paginas[0]?.html ?? "", titel);
  for (const p of paginas.slice(1)) {
    if (naamInfo.naam) break;
    naamInfo = { ...extractNaam(p.html, titel), praktijk: naamInfo.praktijk ?? titel };
  }
  const alleTekst = paginas.map((p) => naarTekst(p.html)).join("\n").slice(0, 40_000);
  const { doelgroep, score } = classificeer(alleTekst, vasteDoelgroep);

  const prospects: GevondenProspect[] = [];
  for (const [email, bron] of Array.from(emailBron.entries())) {
    prospects.push({
      naam: naamInfo.naam ?? naamInfo.praktijk ?? titel ?? fallbackHost,
      praktijk: naamInfo.praktijk ?? (naamInfo.naam ? titel : null),
      email,
      website,
      bronUrl: bron.url,
      doelgroep,
      doelgroepScore: score,
      context: contextRondEmail(bron.html, email),
    });
  }
  return prospects;
}

/**
 * Verwerkt één wachtrij-pagina: een profiel/detailpagina (zoals een therapeut
 * op een verwijsgids) of een losse praktijksite. Haalt e-mail + naam van de
 * pagina zelf; staat er geen bruikbaar adres op, dan volgt het de eigen-website-
 * link van de persoon één hop. E-mailadressen van de directory zelf (negeerDomein,
 * bijvoorbeeld info@eft.nl) worden genegeerd.
 */
export async function verzamelSiteProspects(
  pageUrl: string,
  vasteDoelgroep: Doelgroep | null,
  robotsCache: Map<string, string[]>,
  negeerDomein?: string
): Promise<GevondenProspect[]> {
  const paginas = await crawlPaginas(pageUrl, robotsCache);
  if (paginas.length === 0) return [];
  const startHost = hostVan(paginas[0].url);

  // Bruikbare e-mails op de pagina zelf (directory-eigen adres negeren)
  const emailBron = new Map<string, { url: string; html: string }>();
  for (const p of paginas) {
    for (const email of extractEmails(p.html)) {
      if (isDirectoryEmail(email, negeerDomein)) continue;
      if (!emailBron.has(email)) emailBron.set(email, { url: p.url, html: p.html });
      if (emailBron.size >= MAX_EMAILS_PER_SITE) break;
    }
    if (emailBron.size >= MAX_EMAILS_PER_SITE) break;
  }

  // Eigen website van de persoon (link naar ander domein)
  const eigenWebsite = vindEigenWebsite(paginas[0].html, paginas[0].url, startHost, negeerDomein);

  if (emailBron.size > 0) {
    // E-mail stond op de detailpagina; website = eigen site als die er is
    return bouwProspects(paginas, emailBron, eigenWebsite ?? paginas[0].url, vasteDoelgroep, startHost);
  }

  // Geen e-mail op de detailpagina: volg de eigen website één hop
  if (eigenWebsite) {
    await wacht(300);
    const sitePaginas = await crawlPaginas(eigenWebsite, robotsCache);
    if (sitePaginas.length > 0) {
      const siteHost = hostVan(sitePaginas[0].url);
      const siteEmails = new Map<string, { url: string; html: string }>();
      for (const p of sitePaginas) {
        for (const email of extractEmails(p.html)) {
          if (isDirectoryEmail(email, negeerDomein)) continue;
          if (!siteEmails.has(email)) siteEmails.set(email, { url: p.url, html: p.html });
          if (siteEmails.size >= MAX_EMAILS_PER_SITE) break;
        }
        if (siteEmails.size >= MAX_EMAILS_PER_SITE) break;
      }
      if (siteEmails.size > 0) {
        // Naam komt het best van de detailpagina, e-mail/website van de eigen site
        const naamPagina = [{ html: paginas[0].html, url: paginas[0].url }, ...sitePaginas];
        return bouwProspects(naamPagina, siteEmails, sitePaginas[0].url, vasteDoelgroep, siteHost);
      }
    }
  }

  return [];
}

/**
 * Bouwt een wachtrij van detail/profielpagina's op basis van een overzichtspagina
 * (ledenlijst, verwijsgids). Volgt drie sporen, in volgorde:
 *   1. same-host profielpagina's die als cluster op de overzichtspagina staan
 *   2. externe links naar eigen praktijksites
 *   3. als de lijst leeg lijkt (JavaScript-gerenderd), de sitemap van de site
 * E-mails die rechtstreeks op de overzichtspagina staan komen alleen terug als
 * losse prospect wanneer ze NIET van de directory zelf zijn.
 */
export async function bouwWachtrijVanUrl(
  listingUrl: string,
  vasteDoelgroep: Doelgroep | null,
  robotsCache: Map<string, string[]>,
  maxSites: number
): Promise<{ wachtrij: WachtrijItem[]; directeProspects: GevondenProspect[]; jsGerenderd: boolean }> {
  if (!isVeiligeUrl(listingUrl)) return { wachtrij: [], directeProspects: [], jsGerenderd: false };
  const pagina = await fetchPagina(listingUrl);
  if (!pagina) return { wachtrij: [], directeProspects: [], jsGerenderd: false };

  const eigenHost = hostVan(pagina.finalUrl);
  const origin = new URL(pagina.finalUrl).origin;
  const links = extractLinks(pagina.html, pagina.finalUrl);

  // Spoor 1: cluster van same-host profielpagina's op de overzichtspagina
  const sameHostUrls = links.map((l) => l.url).filter((u) => u !== pagina.finalUrl);
  const profielen = kiesDetailCluster(sameHostUrls, eigenHost, maxSites);

  // Spoor 2: externe praktijksites (één per domein)
  const perDomein = new Map<string, string>();
  for (const link of links) {
    const host = hostVan(link.url);
    if (!host || host === eigenHost || isOverslaanDomein(link.url) || !isVeiligeUrl(link.url)) continue;
    if (!perDomein.has(host)) {
      try {
        perDomein.set(host, new URL(link.url).origin + "/");
      } catch {
        // ongeldige URL overslaan
      }
    }
    if (perDomein.size >= maxSites) break;
  }
  const externeSites = Array.from(perDomein.values());

  let kandidaten = [...profielen, ...externeSites].slice(0, maxSites);
  let jsGerenderd = false;

  // Spoor 3: weinig kandidaten = waarschijnlijk JavaScript-gerenderde lijst.
  // Val terug op de sitemap en zoek daar het profiel-cluster.
  if (kandidaten.length < 5) {
    jsGerenderd = true;
    const sitemapUrls = await leesSitemapUrls(origin, maxSites);
    const sitemapProfielen = kiesDetailCluster(sitemapUrls, eigenHost, maxSites);
    if (sitemapProfielen.length > 0) {
      kandidaten = sitemapProfielen.slice(0, maxSites);
    }
  }

  const wachtrij: WachtrijItem[] = kandidaten.map((url) => ({
    url,
    bron: listingUrl,
    negeerDomein: eigenHost,
  }));

  // Losse e-mails op de overzichtspagina zelf, maar nooit het directory-adres
  const directeProspects: GevondenProspect[] = [];
  const tekst = naarTekst(pagina.html);
  const { doelgroep, score } = classificeer(tekst, vasteDoelgroep);
  for (const email of extractEmails(pagina.html).slice(0, 25)) {
    if (isDirectoryEmail(email, eigenHost)) continue;
    const emailDomein = email.split("@")[1];
    const naamDeel = email.split("@")[0].replace(/[._-]/g, " ");
    directeProspects.push({
      naam: naamDeel.replace(/\b\w/g, (c) => c.toUpperCase()),
      praktijk: null,
      email,
      website: MAILPROVIDERS.includes(emailDomein) ? null : "https://" + emailDomein,
      bronUrl: pagina.finalUrl,
      doelgroep,
      doelgroepScore: score,
      context: contextRondEmail(pagina.html, email),
    });
  }

  return { wachtrij, directeProspects, jsGerenderd };
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
