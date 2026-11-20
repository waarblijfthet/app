import { RAPPORTEN } from "./rapporten-data";

/**
 * Bronnen en eigen cijfers voor de jaarwisselingartikelen 2 en 3
 * (20-nov-2026, docs/serp-jaarwisseling-20-nov-2026.md):
 * financiele-doelen-stellen-2027 en no-buy-year.
 *
 * Elke bron hieronder is op JAARWISSELING_BRON_DATUM in de browser geopend en
 * het citaat of getal staat letterlijk op die pagina (CLAUDE.md 3.3). Eigen
 * cijfers komen uitsluitend uit lib/rapporten-data.ts, per huishouden, nooit
 * gemiddeld (CLAUDE.md 3.2).
 */

export const JAARWISSELING_BRON_DATUM = "20 november 2026";

export const JAARWISSELING_BRONNEN = {
  nibudPlannen: {
    label: "Nibud, Plannen en begroten",
    url: "https://www.nibud.nl/onderwerpen/rondkomen/plannen-en-begroten/",
  },
  nibudSparen: {
    label: "Nibud, Sparen: zo pak je het aan",
    url: "https://www.nibud.nl/onderwerpen/sparen/sparen-zo-pak-je-het-aan/",
  },
  wijzerVijfStappen: {
    label: "Wijzer in geldzaken, 5 stappen om je inkomsten en uitgaven op een rij te zetten",
    url: "https://www.wijzeringeldzaken.nl/geldzaken-op-orde/5-stappen-om-je-inkomsten-en-uitgaven-op-een-rij-te-zetten/",
  },
  nibudBesparen: {
    label: "Nibud, Geld besparen",
    url: "https://www.nibud.nl/onderwerpen/uitgaven/geld-besparen/",
  },
  milieuCentraalConsuminderen: {
    label: "Milieu Centraal, Spullen en kleding consuminderen",
    url: "https://www.milieucentraal.nl/spullen-en-kleding/minder-spullen-en-kleding-consuminderen/",
  },
} as const;

export type JaarwisselingBronSleutel = keyof typeof JAARWISSELING_BRONNEN;

export function jaarwisselingBron(sleutel: JaarwisselingBronSleutel): { label: string; url: string } {
  const b = JAARWISSELING_BRONNEN[sleutel];
  return { label: `${b.label} (geopend ${JAARWISSELING_BRON_DATUM})`, url: b.url };
}

/** Letterlijk overgenomen getallen. Alleen hier aanpassen, na het opnieuw openen van de pagina. */
export const NIBUD_SPAREN_MIN_PCT = 10; // nibudSparen: "minimaal tien procent van het maandelijkse inkomen opzij te zetten"
export const MC_KLEDINGSTUKKEN_PER_JAAR = 60; // milieuCentraalConsuminderen: "Nederlanders kopen gemiddeld 60 kledingstukken per jaar"
export const MC_CO2_SPULLEN_PCT = 12; // milieuCentraalConsuminderen: "Zo'n 12 % van de CO2 die een huishouden uitstoot, komt door nieuwe spullen en kleding"

// ── Eigen cijfers uit de rapporten ─────────────────────────────────────────

function eersteBedrag(tekst: string): number | null {
  const m = tekst.match(/€\s?([\d.]+)/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/\./g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

export interface SpaardoelRapport {
  slug: string;
  naam: string;
  netto: string;
  /** De tekst zoals die in het rapport staat. */
  spaardoel: string;
}

/** Per rapport het spaardoel en wat ervan terechtkwam, letterlijk uit het rapport. */
export function spaardoelPerRapport(): SpaardoelRapport[] {
  const uit: SpaardoelRapport[] = [];
  for (const r of RAPPORTEN) {
    const post = r.dagelijks.find((x) => x.label === "Spaardoel");
    if (!post) continue;
    uit.push({ slug: r.slug, naam: r.kenmerken[0], netto: r.kenmerken[r.kenmerken.length - 1], spaardoel: post.waarde });
  }
  return uit;
}

export interface VrijeUitgavenRapport {
  slug: string;
  naam: string;
  netto: string;
  vrijeTijd: number;
  abonnementen: number;
}

/** Per rapport vrije tijd en abonnementen per maand, zoals de huishoudens het aanleverden. */
export function vrijeUitgavenPerRapport(): VrijeUitgavenRapport[] {
  const uit: VrijeUitgavenRapport[] = [];
  for (const r of RAPPORTEN) {
    const vrij = r.dagelijks.find((x) => x.label === "Vrije tijd");
    const abo = r.dagelijks.find((x) => x.label === "Abonnementen");
    if (!vrij || !abo) continue;
    const v = eersteBedrag(vrij.waarde);
    const a = eersteBedrag(abo.waarde);
    if (v === null || a === null) continue;
    uit.push({ slug: r.slug, naam: r.kenmerken[0], netto: r.kenmerken[r.kenmerken.length - 1], vrijeTijd: v, abonnementen: a });
  }
  return uit;
}

/** Wat een doel per maand vraagt, afgerond op hele euro's naar boven. */
export function perMaandVoorDoel(bedrag: number, maanden: number): number {
  if (maanden <= 0) return 0;
  return Math.ceil(bedrag / maanden);
}
