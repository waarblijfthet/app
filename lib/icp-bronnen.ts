import { RAPPORTEN, type Rapport } from "./rapporten-data";

/**
 * Bronnen en eigen cijfers voor de ICP-cluster (12-okt-2026,
 * docs/plan-icp-vinden-12-okt-2026.md): waar-blijft-mijn-geld,
 * waarom-lukt-sparen-niet, huishoudboekje-voorbeeld, lifestyle inflatie,
 * jaarlijkse-kosten-reserveren en meer-geld-overhouden.
 *
 * Elke bron hieronder is op BRON_DATUM in de browser geopend en het citaat of
 * getal staat letterlijk op die pagina (CLAUDE.md 3.3 en
 * feedback_bron-url-zelf-openen). Nibud opende gewoon.
 *
 * Eigen cijfers komen uitsluitend uit lib/rapporten-data.ts. De bedragen voor
 * jaaruitgaven staan daar als tekst ("circa €11.600 per jaar: ..."); de
 * functies hieronder lezen ze uit die tekst, zodat er nergens met de hand een
 * bedrag getypt wordt. n is altijd RAPPORTEN.length, en nooit wordt er een
 * gemiddelde over gerekend (CLAUDE.md 3.2): alleen per huishouden.
 */

export const BRON_DATUM = "12 oktober 2026";

export interface IcpBron {
  label: string;
  url: string;
}

export const ICP_BRONNEN = {
  nibudSparen: {
    label: "Nibud, Sparen",
    url: "https://www.nibud.nl/onderwerpen/sparen/",
  },
  nibudSparenAanpak: {
    label: "Nibud, Sparen: zo pak je het aan",
    url: "https://www.nibud.nl/onderwerpen/sparen/sparen-zo-pak-je-het-aan/",
  },
  nibudBuffer: {
    label: "Nibud, Een financiële buffer",
    url: "https://www.nibud.nl/onderwerpen/sparen/een-financiele-buffer-opbouwen/",
  },
  nibudBudgetadvies: {
    label: "Nibud, Persoonlijk Budgetadvies",
    url: "https://www.nibud.nl/tools/persoonlijk-budgetadvies/",
  },
  nibudGeldzaken2024: {
    label: "Nibud, Geldzaken in de praktijk (2024)",
    url: "https://www.nibud.nl/onderzoeksrapporten/rapport-geldzaken-in-de-praktijk-2024/",
  },
  rijksoverheidVakantiegeld: {
    label: "Rijksoverheid, Hoe hoog is mijn vakantiegeld?",
    url: "https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/vakantiedagen-en-vakantiegeld/hoe-hoog-is-mijn-vakantiegeld",
  },
  wijzerVijfStappen: {
    label: "Wijzer in geldzaken (ministerie van Financiën), 5 stappen om je inkomsten en uitgaven op een rij te zetten",
    url: "https://www.wijzeringeldzaken.nl/geldzaken-op-orde/5-stappen-om-je-inkomsten-en-uitgaven-op-een-rij-te-zetten/",
  },
  wijzerBetaalJezelfEerst: {
    label: "Wijzer in geldzaken, lancering spaarcampagne Betaal jezelf eerst (23 april 2026)",
    url: "https://www.wijzeringeldzaken.nl/in-het-nieuws/44-procent-van-de-huishoudens-financieel-kwetsbaar-koningin-maxima-bij-lancering-nationale-spaarcampagne/",
  },
  cbsCaoLonen: {
    label: "CBS, Cao-lonen in eerste kwartaal 4,5 procent hoger",
    url: "https://www.cbs.nl/nl-nl/nieuws/2026/14/cao-lonen-in-eerste-kwartaal-4-5-procent-hoger",
  },
} satisfies Record<string, IcpBron>;

export type IcpBronSleutel = keyof typeof ICP_BRONNEN;

/** Bronvermelding voor het blok Bronnen onderaan een artikel. */
export function icpBron(sleutel: IcpBronSleutel): { label: string; url: string } {
  const b = ICP_BRONNEN[sleutel];
  return { label: `${b.label} (geopend ${BRON_DATUM})`, url: b.url };
}

/**
 * Letterlijk overgenomen getallen uit die bronnen, met de bron erbij. Alleen
 * hier aanpassen, na het opnieuw openen van de pagina.
 */
export const NIBUD_SPAARADVIES_PCT = 10; // nibudSparenAanpak: "minimaal tien procent van het maandelijkse inkomen"
export const NIBUD_SPAART_NIET_ELKE_MAAND_PCT = 20; // nibudGeldzaken2024: "20 procent niet consequent iedere maand"
export const NIBUD_SPAART_MINDER_DAN_10_PCT = 41; // nibudGeldzaken2024: "zo'n 41 procent minder dan 10 procent van het inkomen"
export const NIBUD_GELDZAKEN_N = "1.563"; // nibudGeldzaken2024: ondervraagden, februari 2024
export const NIBUD_BUDGETADVIES_PER_JAAR = "160.000"; // nibudBudgetadvies: "keer per jaar wordt het Persoonlijk Budgetadvies geraadpleegd"
export const VAKANTIEGELD_MIN_PCT = 8; // rijksoverheidVakantiegeld: "minimaal 8% van uw brutojaarsalaris"
export const CBS_CAO_LONEN_Q1_2026 = "4,5"; // cbsCaoLonen
export const CBS_CAO_LONEN_Q1_2026_REEEL = "2,0"; // cbsCaoLonen: "Gecorrigeerd voor inflatie ... 2,0 procent hoger"

// ── Eigen cijfers uit de rapporten ─────────────────────────────────────────

/** Leest het eerste bedrag in euro's uit een tekst als "circa €11.600 per jaar: ...". */
function eersteBedrag(tekst: string): number | null {
  const m = tekst.match(/€\s?([\d.]+)/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/\./g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

export interface JaarkostenRapport {
  slug: string;
  korteNaam: string;
  netto: string;
  perJaar: number;
  perMaand: number;
  /** De uitsplitsing zoals die in het rapport staat, na de dubbele punt. */
  uitsplitsing: string;
  spaardoel: string;
}

/** Een korte naam per rapport, afgeleid van de eerste kenmerken. */
function korteNaam(r: Rapport): string {
  return r.kenmerken[0];
}

/**
 * Per rapport de jaaruitgaven, per jaar en omgerekend per maand (afgerond op
 * hele euro's). Alleen rapporten waarin een post "Jaarlijkse kosten" met een
 * bedrag staat.
 */
export function jaarkostenPerRapport(): JaarkostenRapport[] {
  const uit: JaarkostenRapport[] = [];
  for (const r of RAPPORTEN) {
    const post = r.dagelijks.find((p) => p.label === "Jaarlijkse kosten");
    if (!post) continue;
    const perJaar = eersteBedrag(post.waarde);
    if (perJaar === null) continue;
    const dubbelepunt = post.waarde.indexOf(":");
    const spaar = r.dagelijks.find((p) => p.label === "Spaardoel");
    uit.push({
      slug: r.slug,
      korteNaam: korteNaam(r),
      netto: r.kenmerken[r.kenmerken.length - 1],
      perJaar: perJaar,
      perMaand: Math.round(perJaar / 12),
      uitsplitsing: dubbelepunt >= 0 ? post.waarde.slice(dubbelepunt + 1).trim() : "",
      spaardoel: spaar ? spaar.waarde : "",
    });
  }
  return uit;
}

/** Aantal rapporten met een opgegeven bedrag aan jaaruitgaven. */
export function aantalMetJaarkosten(): number {
  return jaarkostenPerRapport().length;
}

/** Laagste en hoogste jaaruitgaven per maand over de rapporten, voor een bereik in de tekst. */
export function bereikJaarkostenPerMaand(): { laagste: number; hoogste: number } {
  const lijst = jaarkostenPerRapport().map((j) => j.perMaand);
  return { laagste: Math.min(...lijst), hoogste: Math.max(...lijst) };
}

export interface PostRapport {
  slug: string;
  korteNaam: string;
  netto: string;
  waarde: string;
  bedrag: number | null;
}

/**
 * Een post uit "dagelijks" per rapport, met het eerste bedrag eruit gelezen.
 * Voor tabellen per huishouden; nooit middelen (CLAUDE.md 3.2).
 */
export function postPerRapport(label: string): PostRapport[] {
  return RAPPORTEN.flatMap((r) => {
    const post = r.dagelijks.find((p) => p.label === label);
    if (!post) return [];
    return [
      {
        slug: r.slug,
        korteNaam: korteNaam(r),
        netto: r.kenmerken[r.kenmerken.length - 1],
        waarde: post.waarde,
        bedrag: eersteBedrag(post.waarde),
      },
    ];
  });
}

/** Laagste en hoogste bedrag van een post over de rapporten. */
export function bereikPost(label: string): { laagste: number; hoogste: number; n: number } {
  const lijst = postPerRapport(label)
    .map((p) => p.bedrag)
    .filter((b): b is number => b !== null);
  return { laagste: Math.min(...lijst), hoogste: Math.max(...lijst), n: lijst.length };
}
