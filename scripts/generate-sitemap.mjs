// Genereert public/sitemap.xml, public/sitemap-0.xml, public/robots.txt en public/llms.txt.
// Dependency-vrij. Draait als onderdeel van `next build` (zie package.json),
// zodat alles bij elke deploy compleet en actueel is.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "https://www.waarblijfthet.nl";
const now = new Date().toISOString();

// Statische, indexeerbare pagina's (geen noindex: privacy/admin/intake/resultaat uitgesloten)
const statisch = [
  { loc: "/", priority: "1.0" },
  { loc: "/analyse", priority: "0.9" },
  { loc: "/inzichten", priority: "0.8" },
  { loc: "/aanbod", priority: "0.8" },
  { loc: "/adviesgesprek", priority: "0.8" },
  { loc: "/financieel-coach", priority: "0.9" },
  { loc: "/geldscan", priority: "0.8" },
  { loc: "/over", priority: "0.6" },
  { loc: "/woordenlijst", priority: "0.6" },
  { loc: "/samenwerken", priority: "0.6" },
  { loc: "/samenwerken/relatietherapeuten", priority: "0.6" },
  { loc: "/samenwerken/budgetcoaches", priority: "0.6" },
  { loc: "/samenwerken/burnout-coaches", priority: "0.6" },
  { loc: "/samenwerken/financieel-planners", priority: "0.6" },
];

// Artikel-slugs uit de single source of truth
const data = readFileSync(join(ROOT, "lib/inzichten-data.ts"), "utf8");
const slugs = [...data.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniekeSlugs = [...new Set(slugs)];

// Echte laatste-wijzigdatum per artikel (veld `datum: "YYYY-MM-DD"`), zodat de
// sitemap-lastmod klopt. Google leunt sinds het wegvallen van de sitemap-ping
// zwaarder op lastmod voor hercrawl-planning; een correcte datum betekent dat
// echt gewijzigde artikelen sneller opnieuw worden opgehaald.
const datumMap = new Map(
  [...data.matchAll(/slug:\s*"([^"]+)"[\s\S]*?\n\s*datum:\s*"(\d{4}-\d{2}-\d{2})"/g)].map(
    (m) => [m[1], m[2]]
  )
);
const datums = [...datumMap.values()].sort();
const laatsteDatum = datums.length > 0 ? `${datums[datums.length - 1]}T00:00:00.000Z` : now;

function lastmodVoor(slug) {
  const d = datumMap.get(slug);
  return d ? `${d}T00:00:00.000Z` : laatsteDatum;
}

const urls = [
  ...statisch.map((u) => ({ ...u, lastmod: laatsteDatum })),
  ...uniekeSlugs.map((slug) => ({
    loc: `/inzichten/${slug}`,
    priority: "0.7",
    lastmod: lastmodVoor(slug),
  })),
];

const urlset =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `<url><loc>${HOST}${u.loc}</loc><lastmod>${u.lastmod}</lastmod>` +
        `<changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

const index =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `<sitemap><loc>${HOST}/sitemap-0.xml</loc></sitemap>\n` +
  `</sitemapindex>\n`;

const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"];
const robots =
  `# *\nUser-agent: *\nAllow: /\n` +
  `Disallow: /admin\nDisallow: /aanbod/intake\nDisallow: /resultaat\n\n` +
  `# AI-crawlers zijn welkom (vindbaarheid in AI-antwoorden)\n` +
  aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n") +
  `\n\n# Host\nHost: ${HOST}\n\n` +
  `# Sitemaps\nSitemap: ${HOST}/sitemap.xml\n`;

// llms.txt — vat de site samen voor LLM's / AI-zoekmachines
const titelMap = new Map(
  [...data.matchAll(/slug:\s*"([^"]+)"[\s\S]*?\n\s*titel:\s*\n?\s*"([^"]+)"/g)].map(
    (m) => [m[1], m[2]]
  )
);
const artikelLijst = uniekeSlugs
  .map((slug) => `- [${titelMap.get(slug) ?? slug}](${HOST}/inzichten/${slug})`)
  .join("\n");

const llms =
  `# Waar blijft het\n\n` +
  `> Gratis financiele analyse en eerlijk inzicht voor Nederlandse gezinnen die goed verdienen maar toch weinig overhouden. Geen schuldhulp, geen beleggingsadvies - alleen grip op het maandbudget.\n\n` +
  `Waar blijft het helpt mensen met een modaal of bovenmodaal inkomen die zich afvragen waar hun geld blijft. Via een gratis analyse vergelijken ze hun uitgaven met vergelijkbare gezinnen; daarnaast is er een eenmalig adviesgesprek en persoonlijke begeleiding. Auteur en oprichter: Jarno Koopman.\n\n` +
  `## Belangrijkste pagina's\n` +
  `- [Gratis analyse](${HOST}/analyse): vergelijk in 5 minuten je uitgaven met vergelijkbare gezinnen\n` +
  `- [Aanbod](${HOST}/aanbod): gratis analyse, eenmalig adviesgesprek en traject\n` +
  `- [Financieel coach](${HOST}/financieel-coach): financiele coaching voor wie goed verdient en toch weinig overhoudt\n` +
  `- [Geldscan](${HOST}/geldscan): persoonlijk geldrapport over je maandbudget zonder gesprek, 49 euro\n` +
  `- [Inzichten](${HOST}/inzichten): artikelen over grip op je geld\n` +
  `- [Over ons](${HOST}/over): wie en waarom\n` +
  `- [Woordenlijst](${HOST}/woordenlijst): geldbegrippen in gewone taal\n\n` +
  `## Artikelen\n${artikelLijst}\n`;

writeFileSync(join(ROOT, "public/sitemap-0.xml"), urlset);
writeFileSync(join(ROOT, "public/sitemap.xml"), index);
writeFileSync(join(ROOT, "public/robots.txt"), robots);
writeFileSync(join(ROOT, "public/llms.txt"), llms);

console.log(
  `gegenereerd: ${urls.length} URL's, ${uniekeSlugs.length} artikelen, llms.txt (${titelMap.size} titels)`
);

// WebSub (PubSubHubbub) ping: duwt de RSS-feed naar Google's Feedfetcher en
// andere abonnees zodra een nieuwe build live gaat. WebSub werkt nog wel voor
// feeds (alleen voor sitemaps is het afgeschaft). Best-effort en niet-fataal;
// alleen op Vercel-builds, zodat lokale builds geen ping versturen.
if (process.env.VERCEL === "1") {
  const FEED_URL = `${HOST}/feed.xml`;
  const HUB = "https://pubsubhubbub.appspot.com/";
  try {
    const res = await fetch(HUB, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "hub.mode": "publish", "hub.url": FEED_URL }).toString(),
    });
    console.log(`WebSub ping ${res.status} voor ${FEED_URL}`);
  } catch (err) {
    console.log(`WebSub ping mislukt (niet fataal): ${String(err)}`);
  }
}
