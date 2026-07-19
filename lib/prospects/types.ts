// Gedeelde types voor de prospect-zoeker

export type Doelgroep =
  | "relatietherapeuten"
  | "budgetcoaches"
  | "financieel-planners"
  | "burnout-coaches";

export const DOELGROEPEN: Doelgroep[] = [
  "relatietherapeuten",
  "budgetcoaches",
  "financieel-planners",
  "burnout-coaches",
];

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
  naam: string;
  praktijk: string | null;
  email: string;
  website: string | null;
  bronUrl: string;
  doelgroep: Doelgroep;
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
