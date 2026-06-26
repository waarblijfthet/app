import { artikelen } from "@/lib/inzichten-data";

export const dynamic = "force-static";

const HOST = "https://www.waarblijfthet.nl";
const HUB = "https://pubsubhubbub.appspot.com/";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(datum: string): string {
  // datum is "YYYY-MM-DD"; vaste tijd zodat de pubDate stabiel is.
  return new Date(`${datum}T09:00:00Z`).toUTCString();
}

export async function GET() {
  const items = [...artikelen]
    .sort((a, b) => (a.datum < b.datum ? 1 : a.datum > b.datum ? -1 : 0))
    .map((a) => {
      const url = `${HOST}/inzichten/${a.slug}`;
      const beschrijving = a.excerpt || a.metaDescription || "";
      return (
        `    <item>\n` +
        `      <title>${escapeXml(a.titel)}</title>\n` +
        `      <link>${url}</link>\n` +
        `      <guid isPermaLink="true">${url}</guid>\n` +
        `      <pubDate>${rfc822(a.datum)}</pubDate>\n` +
        `      <category>${escapeXml(a.categorie)}</category>\n` +
        `      <description><![CDATA[${beschrijving}]]></description>\n` +
        `    </item>`
      );
    })
    .join("\n");

  const laatste = [...artikelen].map((a) => a.datum).sort();
  const lastBuild =
    laatste.length > 0 ? rfc822(laatste[laatste.length - 1]) : new Date().toUTCString();

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Waar blijft het</title>\n` +
    `    <link>${HOST}</link>\n` +
    `    <description>Eerlijk inzicht en grip op je maandbudget. Nieuwe artikelen over waar je geld blijft.</description>\n` +
    `    <language>nl-NL</language>\n` +
    `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
    `    <atom:link href="${HOST}/feed.xml" rel="self" type="application/rss+xml" />\n` +
    `    <atom:link href="${HUB}" rel="hub" />\n` +
    `${items}\n` +
    `  </channel>\n` +
    `</rss>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
