/**
 * Rekenbron voor "salaris eerder in december, en dan de lange januari"
 * (20-nov-2026, docs/serp-jaarwisseling-20-nov-2026.md, pagina 1).
 *
 * Elke bron hieronder is op BRON_DATUM_DECEMBERSALARIS in de browser geopend
 * en het getal of de regel staat letterlijk op die pagina (CLAUDE.md 3.3).
 * Alle data en dagen in het artikel en in de situatiekiezer komen uit de
 * functies in dit bestand, nooit met de hand getypt.
 */

import { RAPPORTEN } from "./rapporten-data";

export const BRON_DATUM_DECEMBERSALARIS = "20 november 2026";

export const DECEMBERSALARIS_BRONNEN = {
  bw7623: {
    label: "Burgerlijk Wetboek Boek 7, artikel 623 (wetten.overheid.nl)",
    url: "https://wetten.overheid.nl/BWBR0005290/2026-01-01#Boek7_Titeldeel10_Afdeling2_Artikel623",
  },
  rijksoverheidLoon: {
    label: "Rijksoverheid, Wanneer betaalt mijn werkgever mijn loon?",
    url: "https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/arbeidsovereenkomst-en-cao/wanneer-betaalt-mijn-werkgever-mijn-loon",
  },
  pdirektBetaaldata: {
    label: "O&P Rijk P-Direkt, Betaaldata",
    url: "https://www.p-direkt.nl/informatie-rijkspersoneel-2020/financien/salaris/betaaldata",
  },
} as const;

export type DecembersalarisBronSleutel = keyof typeof DECEMBERSALARIS_BRONNEN;

/** Voor het blok Bronnen onderaan het artikel. */
export function decembersalarisBron(sleutel: DecembersalarisBronSleutel): { label: string; url: string } {
  const b = DECEMBERSALARIS_BRONNEN[sleutel];
  return { label: `${b.label} (geopend ${BRON_DATUM_DECEMBERSALARIS})`, url: b.url };
}

/** Het jaar waarover dit artikel gaat: decembersalaris 2026, januarisalaris 2027. */
export const DECEMBER_JAAR = 2026;
export const JANUARI_JAAR = DECEMBER_JAAR + 1;

/**
 * P-Direkt: "De 24e van elke maand maken wij je maandinkomen over. Is de 24e een
 * zaterdag, zondag of een nationale feestdag? Dan is de betaling eerder."
 * In de lijst 2026 staat december op "dinsdag 22 december".
 */
export const RIJK_VASTE_DAG = 24;
export const RIJK_DECEMBER_DAG = 22;

/** Een kalenderdatum zonder tijdzone-gedoe (UTC, middernacht). */
export function datum(jaar: number, maand: number, dag: number): Date {
  return new Date(Date.UTC(jaar, maand - 1, dag));
}

const WEEKDAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
const MAANDEN = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

export function weekdag(d: Date): string {
  return WEEKDAGEN[d.getUTCDay()];
}

/** "dinsdag 22 december" */
export function datumTekst(d: Date, metWeekdag: boolean = true): string {
  const kaal = `${d.getUTCDate()} ${MAANDEN[d.getUTCMonth()]}`;
  return metWeekdag ? `${weekdag(d)} ${kaal}` : kaal;
}

/** Aantal dagen van de ene betaling tot de volgende. */
export function dagenTussen(van: Date, tot: Date): number {
  return Math.round((tot.getTime() - van.getTime()) / 86400000);
}

/**
 * Een gewone maand tussen twee salarissen, van de zoveelste december tot
 * dezelfde dag in januari. December heeft 31 dagen, dus dat is altijd 31.
 */
export const GEWONE_DECEMBERMAAND_DAGEN = dagenTussen(datum(DECEMBER_JAAR, 12, 25), datum(JANUARI_JAAR, 1, 25));

/** Hoeveel dagen langer dan een gewone maand (0 als het niet langer is). */
export function extraDagen(dagen: number): number {
  return Math.max(0, dagen - GEWONE_DECEMBERMAAND_DAGEN);
}

/** "1 dag" of "7 dagen". */
export function dagenTekst(n: number): string {
  return n === 1 ? "1 dag" : `${n} dagen`;
}

/** Weken, op één decimaal, als tekst met komma. */
export function wekenTekst(dagen: number): string {
  return (Math.round((dagen / 7) * 10) / 10).toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

/**
 * De betaaldag van de Rijksoverheid volgens hun eigen regel: de 24e, en valt
 * die in het weekend, dan de vrijdag ervoor. Feestdagen laat deze functie weg.
 * Alleen gebruiken voor een maand die nog niet in de lijst van P-Direkt staat,
 * en dan zo in de tekst benoemen.
 */
export function rijkBetaaldagVolgensRegel(jaar: number, maand: number): Date {
  let d = datum(jaar, maand, RIJK_VASTE_DAG);
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) {
    d = datum(jaar, maand, d.getUTCDate() - 1);
  }
  return d;
}

export const RIJK_DECEMBER = datum(DECEMBER_JAAR, 12, RIJK_DECEMBER_DAG);
export const RIJK_JANUARI_AFGELEID = rijkBetaaldagVolgensRegel(JANUARI_JAAR, 1);
export const RIJK_DAGEN = dagenTussen(RIJK_DECEMBER, RIJK_JANUARI_AFGELEID);

/** Voorbeeldtabel: wie op de 25e betaald krijgt, en in december eerder. */
export const VOORBEELD_JANUARI = datum(JANUARI_JAAR, 1, 25);
export const VOORBEELD_DECEMBERDAGEN = [18, 21, 22, 23, 24] as const;

export interface VoorbeeldRij {
  december: Date;
  januari: Date;
  dagen: number;
  extra: number;
}

export function voorbeeldRijen(): VoorbeeldRij[] {
  return VOORBEELD_DECEMBERDAGEN.map((dag) => {
    const december = datum(DECEMBER_JAAR, 12, dag);
    const dagen = dagenTussen(december, VOORBEELD_JANUARI);
    return { december: december, januari: VOORBEELD_JANUARI, dagen: dagen, extra: extraDagen(dagen) };
  });
}

/** Wat je aan dagelijkse uitgaven nodig hebt tot het volgende salaris, afgerond op tientallen. */
export function dagelijksTotVolgende(weekbedrag: number, dagen: number): number {
  return Math.round((weekbedrag * dagen) / 7 / 10) * 10;
}

// ── Eigen cijfers uit de rapporten ─────────────────────────────────────────

/** Leest het bedrag na het woord "feestdagen" uit een tekst als "feestdagen €2.000". */
function bedragNa(tekst: string, woord: string): number | null {
  const m = tekst.match(new RegExp(woord + "\\s*€\\s?([\\d.]+)", "i"));
  if (!m) return null;
  const n = parseInt(m[1].replace(/\./g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

function eersteBedrag(tekst: string): number | null {
  const m = tekst.match(/€\s?([\d.]+)/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/\./g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

export interface DecemberRapport {
  slug: string;
  naam: string;
  netto: string;
  feestdagenPerJaar: number;
  /** True als het rapport feestdagen en verjaardagen als één post noemt. */
  metVerjaardagen: boolean;
  boodschappenPerMaand: number;
}

/**
 * Per rapport wat de feestdagen per jaar kostten en wat de boodschappen per
 * maand waren, zoals de huishoudens het aanleverden. Alleen per huishouden,
 * nooit een gemiddelde (CLAUDE.md 3.2).
 */
export function decemberPerRapport(): DecemberRapport[] {
  const uit: DecemberRapport[] = [];
  for (const r of RAPPORTEN) {
    const jaar = r.dagelijks.find((x) => x.label === "Jaarlijkse kosten");
    const boodschappen = r.dagelijks.find((x) => x.label === "Boodschappen");
    if (!jaar || !boodschappen) continue;
    const feest = bedragNa(jaar.waarde, "feestdagen");
    const bood = eersteBedrag(boodschappen.waarde);
    if (feest === null || bood === null) continue;
    uit.push({
      slug: r.slug,
      naam: r.kenmerken[0],
      netto: r.kenmerken[r.kenmerken.length - 1],
      feestdagenPerJaar: feest,
      metVerjaardagen: /verjaardagen\s+en\s+feestdagen/i.test(jaar.waarde),
      boodschappenPerMaand: bood,
    });
  }
  return uit;
}

export function bereikFeestdagen(): { laagste: number; hoogste: number } {
  const lijst = decemberPerRapport().map((r) => r.feestdagenPerJaar);
  return { laagste: Math.min(...lijst), hoogste: Math.max(...lijst) };
}
