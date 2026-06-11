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
  /** Website (homepage of diepere pagina) die nog gecrawld moet worden */
  url: string;
  /** Waar deze site vandaan komt (overzichtspagina of zoekopdracht) */
  bron: string;
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
