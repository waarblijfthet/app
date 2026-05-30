// Genereert public/sitemap.xml, public/sitemap-0.xml en public/robots.txt.
// Dependency-vrij. Draait als onderdeel van `next build` (zie package.json),
// zodat de sitemap bij élke deploy compleet en actueel is.
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
  { loc: "/over", priority: "0.6" },
  { loc: "/woordenlijst", priority: "0.6" },
];

// Artikel-slugs uit de single source of truth
const data = readFileSync(join(ROOT, "lib/inzichten-data.ts"), "utf8");
const slugs = [...data.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniekeSlugs = [...new Set(slugs)];

const urls = [
  ...statisch,
  ...uniekeSlugs.map((slug) => ({ loc: `/inzichten/${slug}`, priority: "0.7" })),
];

const urlset =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `<url><loc>${HOST}${u.loc}</loc><lastmod>${now}</lastmod>` +
        `<changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

const index =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `<sitemap><loc>${HOST}/sitemap-0.xml</loc></sitemap>\n` +
  `</sitemapindex>\n`;

const robots =
  `# *\nUser-agent: *\nAllow: /\n` +
  `Disallow: /admin\nDisallow: /aanbod/intake\nDisallow: /resultaat\n\n` +
  `# Host\nHost: ${HOST}\n\n` +
  `# Sitemaps\nSitemap: ${HOST}/sitemap.xml\n`;

writeFileSync(join(ROOT, "public/sitemap-0.xml"), urlset);
writeFileSync(join(ROOT, "public/sitemap.xml"), index);
writeFileSync(join(ROOT, "public/robots.txt"), robots);

console.log(`sitemap gegenereerd: ${urls.length} URL's (${uniekeSlugs.length} artikelen)`);
