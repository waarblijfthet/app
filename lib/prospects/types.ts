// Gedeelde types voor de prospect-zoeker

import { DOELGROEPEN as OUTREACH_DOELGROEPEN } from "@/lib/outreach/labels";

// Het TS-uniontype blijft hier hardgecodeerd (net als in lib/outreach/mails.ts,
// puur voor compile-time-volledigheid in Record<Doelgroep, ...> op andere
// plekken). De WAARDEN, labels en kleuren komen voortaan uit één bron,
// lib/outreach/labels.ts, zodat de prospect- en outreach-kant niet meer
// los van elkaar kunnen raken (zie CLAUDE.md-opdracht "prospect-zoeker
// verbeterronde", deel 3).
export type Doelgroep =
  | "relatietherapeuten"
  | "budgetcoaches"
  | "financieel-planners"
  | "burnout-coaches"
  | "boekhouders";

export const DOELGROEPEN: Doelgroep[] = OUTREACH_DOELGROEPEN.map(
  (d) => d.value as Doelgroep
);

export interface WachtrijItem {
  /** Pagina die nog verwerkt moet worden: een profiel/detailpagina of een site-homepage */
  url: string;
  /** Waar deze pagina vandaan komt (overzichtspagina of zoekopdracht) */
  bron: string;
  /**
   * Host van de overzichtspagina, bijvoorbeeld "eft.nl". E-mailadressen op dit
   * domein (zoals info@eft.nl) zijn van de directory zelf en worden genegeerd.
   */
  negeerDomein?: string;
}

export interface GevondenProspect {
  /** Leeg als er geen betrouwbare naam gevonden is (geen hostnaam/titel/e-mailprefix-noodgreep meer) */
  naam: string;
  praktijk: string | null;
  email: string;
  website: string | null;
  bronUrl: string;
  /** Null als de classificatie geen duidelijke winnaar had (score 0 of gelijkspel) */
  doelgroep: Doelgroep | null;
  doelgroepScore: number;
  context: string | null;
  /** Vestigingsplaats, alleen gevuld bij hoge zekerheid (JSON-LD adres of postcode+plaats) */
  plaats: string | null;
}

export interface ProspectJob {
  id: string;
  type: "url" | "zoekwoorden";
  invoer: string;
  doelgroep: string;
  status: "wachtrij" | "bezig" | "klaar" | "fout" | "gestopt";
  wachtrij: WachtrijItem[];
  totaal: number;
  verwerkt: number;
  gevonden: number;
  foutmelding: string | null;
  created_at: string;
  updated_at: string;
}
