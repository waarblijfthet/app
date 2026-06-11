// Extractie van e-mailadressen, namen en links uit HTML

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}/g;

// Domeinen en patronen die nooit een echt contactadres zijn
const JUNK_DOMAINS = [
  "example.com", "example.org", "domain.com", "email.com", "yourdomain",
  "sentry.io", "wixpress.com", "sentry-next.wixpress.com", "schema.org",
  "w3.org", "googlemail.example", "jouwdomein", "mijndomein.voorbeeld",
];

const JUNK_PREFIXES = ["noreply", "no-reply", "no_reply", "donotreply", "mailer-daemon"];

const BESTAND_EXTENSIES = /\.(png|jpe?g|gif|svg|webp|css|js|pdf|woff2?)$/i;

// Woorden die duiden op een bedrijfsnaam in plaats van een persoonsnaam
const BEDRIJFSWOORDEN = [
  "praktijk", "coaching", "coach", "therapie", "therapeut", "psycholoog",
  "psychologie", "planner", "planning", "advies", "adviseur", "bureau",
  "groep", "instituut", "centrum", "kantoor", "b.v.", "bv", "vof",
  "counseling", "consultancy", "training", "academie", "studio", "huis",
  "zorg", "welzijn", "balans", "financieel", "hypotheek",
];

const TUSSENVOEGSELS = ["van", "de", "der", "den", "ten", "ter", "te", "het", "in", "op", "'t"];

export function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

/** HTML naar platte tekst (grof maar afdoende voor extractie) */
export function naarTekst(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  ).replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}

/** Maakt licht versluierde adressen weer leesbaar: info [at] praktijk [dot] nl */
function ontsluier(tekst: string): string {
  return tekst
    .replace(/\s*[\[(]\s*(at|apenstaartje)\s*[\])]\s*/gi, "@")
    .replace(/\s*[\[(]\s*(dot|punt)\s*[\])]\s*/gi, ".")
    .replace(/([a-zA-Z0-9._%+-])\s+@\s+([a-zA-Z0-9-])/g, "$1@$2");
}

export function isJunkEmail(email: string): boolean {
  const lower = email.toLowerCase();
  if (BESTAND_EXTENSIES.test(lower)) return true;
  if (JUNK_DOMAINS.some((d) => lower.endsWith("@" + d) || lower.includes(d))) return true;
  const lokaal = lower.split("@")[0];
  if (JUNK_PREFIXES.some((p) => lokaal.startsWith(p))) return true;
  if (lower.length > 60) return true;
  return false;
}

/** Alle plausibele e-mailadressen uit HTML, mailto eerst (hoogste kwaliteit) */
export function extractEmails(html: string): string[] {
  const gevonden: string[] = [];
  const zien = new Set<string>();
  const voegToe = (raw: string) => {
    const email = raw.toLowerCase().replace(/^mailto:/, "").split("?")[0].trim().replace(/\.+$/, "");
    if (!email || zien.has(email) || isJunkEmail(email)) return;
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,12}$/.test(email)) return;
    zien.add(email);
    gevonden.push(email);
  };

  for (const m of Array.from(html.matchAll(/href=["']mailto:([^"']+)["']/gi))) voegToe(m[1]);
  const tekst = ontsluier(naarTekst(html));
  for (const m of Array.from(tekst.matchAll(EMAIL_REGEX))) voegToe(m[0]);
  return gevonden;
}

/** Korte tekstsnippet rond het e-mailadres, als context voor de review */
export function contextRondEmail(html: string, email: string): string | null {
  const tekst = ontsluier(naarTekst(html));
  const idx = tekst.toLowerCase().indexOf(email);
  if (idx !== -1) {
    const start = Math.max(0, idx - 90);
    const eind = Math.min(tekst.length, idx + email.length + 90);
    return tekst.slice(start, eind).replace(/\s+/g, " ").trim();
  }
  // E-mail staat alleen in een mailto-link: context uit de omliggende HTML halen
  const rawIdx = html.toLowerCase().indexOf(email);
  if (rawIdx === -1) return null;
  const stuk = naarTekst(html.slice(Math.max(0, rawIdx - 350), rawIdx + 350));
  const schoon = stuk.replace(/\s+/g, " ").trim();
  return schoon ? schoon.slice(0, 180) : null;
}

/** Alle absolute links uit een pagina */
export function extractLinks(html: string, basisUrl: string): { url: string; tekst: string }[] {
  const links: { url: string; tekst: string }[] = [];
  for (const m of Array.from(html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi))) {
    try {
      const url = new URL(decodeEntities(m[1]), basisUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") continue;
      url.hash = "";
      links.push({ url: url.toString(), tekst: naarTekst(m[2]).slice(0, 80) });
    } catch {
      // ongeldige href overslaan
    }
  }
  return links;
}

/** Eerste <h1> als platte tekst (vaak de persoonsnaam op een profielpagina) */
export function extractH1(html: string): string | null {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  const tekst = naarTekst(m[1]).trim();
  return tekst || null;
}

export function extractTitle(html: string): string | null {
  const og = html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:site_name["']/i);
  if (og) return decodeEntities(og[1]).trim();
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!t) return null;
  const schoon = decodeEntities(t[1]).split(/\s*[|·»-]\s*|\s+[–—]\s+/)[0].trim();
  return schoon || null;
}

function isBedrijfsnaam(s: string): boolean {
  const lower = s.toLowerCase();
  return BEDRIJFSWOORDEN.some((w) => lower.includes(w));
}

/** Lijkt deze string op een Nederlandse persoonsnaam? */
export function lijktPersoonsnaam(s: string): boolean {
  const schoon = s.trim();
  if (schoon.length < 4 || schoon.length > 40) return false;
  if (isBedrijfsnaam(schoon)) return false;
  const woorden = schoon.split(/\s+/);
  if (woorden.length < 2 || woorden.length > 4) return false;
  return woorden.every((w, i) => {
    if (TUSSENVOEGSELS.includes(w.toLowerCase())) return i > 0;
    return /^[A-ZÀ-Ž][a-zà-žëïöü]+([-'][A-ZÀ-Ž][a-zà-žëïöü]+)?\.?$/.test(w);
  });
}

/** Namen uit JSON-LD blokken (Person, founder, employee, author) */
export function extractJsonLdNamen(html: string): string[] {
  const namen: string[] = [];
  for (const m of Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi))) {
    try {
      const data = JSON.parse(m[1]);
      const stapel = [data];
      while (stapel.length) {
        const item = stapel.pop();
        if (Array.isArray(item)) { stapel.push(...item); continue; }
        if (!item || typeof item !== "object") continue;
        const obj = item as Record<string, unknown>;
        if (obj["@type"] === "Person" && typeof obj.name === "string") namen.push(obj.name);
        for (const sleutel of ["founder", "employee", "author", "@graph", "member"]) {
          if (obj[sleutel]) stapel.push(obj[sleutel]);
        }
      }
    } catch {
      // kapot JSON-LD overslaan
    }
  }
  return namen.filter(lijktPersoonsnaam);
}

/**
 * Beste gok voor de persoonsnaam achter een site.
 * Volgorde: JSON-LD Person, meta author, "ik ben ..."-patronen, titel.
 */
export function extractNaam(html: string, titel: string | null): { naam: string | null; praktijk: string | null } {
  const praktijk = titel && isBedrijfsnaam(titel) ? titel : null;

  const jsonLd = extractJsonLdNamen(html);
  if (jsonLd.length > 0) return { naam: jsonLd[0], praktijk: praktijk ?? titel };

  const h1 = extractH1(html);
  if (h1 && lijktPersoonsnaam(h1)) return { naam: h1, praktijk: praktijk ?? titel };

  const author = html.match(/<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']author["']/i);
  if (author && lijktPersoonsnaam(decodeEntities(author[1]))) {
    return { naam: decodeEntities(author[1]).trim(), praktijk: praktijk ?? titel };
  }

  const tekst = naarTekst(html);
  const patronen = [
    /(?:ik ben|mijn naam is|je spreekt met|u spreekt met)\s+([A-ZÀ-Ž][^,.!?<\n]{2,38})/,
    /(?:^|\n)\s*(?:drs\.|dr\.|mr\.|ing\.)\s+([A-ZÀ-Ž][^,.!?<\n]{2,38})/m,
  ];
  for (const patroon of patronen) {
    const m = tekst.match(patroon);
    if (m) {
      const kandidaat = m[1].trim().split(/\s{2,}/)[0];
      if (lijktPersoonsnaam(kandidaat)) return { naam: kandidaat, praktijk: praktijk ?? titel };
    }
  }

  if (titel && lijktPersoonsnaam(titel)) return { naam: titel, praktijk: null };
  return { naam: null, praktijk: praktijk ?? titel };
}
