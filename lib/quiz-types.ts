export type Woonsituatie = "huur" | "koop";
export type AutoSituatie = "geen" | "eigen" | "lease_privé" | "zakelijk";
export type KinderenAantal = 0 | 1 | 2 | 3;
export type ZorgToggle = "per_persoon" | "totaal";

export interface QuizData {
  // Stap 1, Profiel
  volwassenen: 1 | 2 | null;
  woonsituatie: Woonsituatie | null;
  kinderen: KinderenAantal | null;
  auto: AutoSituatie | null;
  zakelijkBijtellingSalaris: boolean; // er is een zakelijke auto met bijtelling, dus het nettobedrag moet erna zijn genomen
  tweedeAuto: boolean; // tweede privéauto naast de gekozen autosituatie

  // Stap 2, Inkomsten
  salaris1: string;
  /**
   * Het inkomen wisselt per maand (zzp, wisselende uren, provisie). Verandert
   * alleen de begeleiding en het voorbehoud in het resultaat, niet de rekensom.
   */
  inkomenWisselend: boolean;
  salaris1InclVakantiegeld: boolean;
  salaris1InclDertiende: boolean;
  salaris2: string;
  salaris2InclVakantiegeld: boolean;
  salaris2InclDertiende: boolean;
  toeslagZorg: string;
  toeslagKindgebonden: string;
  toeslagKinderopvang: string;
  toeslagKinderbijslag: string;
  toeslagHuur: string;
  toeslagOverig: string;
  hypotheekRenteAftrek: string; // teruggave = inkomen (alleen koop)
  hypotheekRenteAftrekPer: "maand" | "jaar";

  // Stap 3, Wonen
  huurHypotheek: string;
  energie: string;
  internet: string;
  servicekosten: string;
  gemeenteBelastingen: string;
  gemeenteBelastingenPer: "maand" | "jaar";

  // Stap 4, Vervoer & Verzekeringen
  ovAbonnement: string;
  brandstof: string;
  autoVerzWB: string;
  leaseBedrag: string;
  zakelijkEigenBijdrage: string;
  zorgPerPersoon: string;
  zorgToggle: ZorgToggle;
  verzekeringOverig: string;

  // Stap 5, Dagelijks
  boodschappen: string;
  abonnementenTotaal: string;
  streamingBedrag: string;
  telefoonBedrag: string;
  abonnementenOverigBedrag: string;
  abonnementenExpanded: boolean;
  /** Kinderkosten in één bedrag. De drie velden hieronder zijn de uitsplitsing. */
  kinderenTotaal: string;
  kinderenExpanded: boolean;
  kinderopvangEigenBijdrage: string;
  schoolActiviteiten: string;
  sportHobbyKinderen: string;
  vrijetijd: string;
  jaarlijkseKosten: string;
  jaarlijkseKostenPer: "maand" | "jaar";
  spaardoel: string;

  // Stap 6, Lead
  naam: string;
  email: string;
  toestemmingOpslaan: boolean;
  toestemmingMarketing: boolean;
}

export const DEFAULT_QUIZ_DATA: QuizData = {
  volwassenen: null,
  woonsituatie: null,
  kinderen: null,
  auto: null,
  zakelijkBijtellingSalaris: false,
  tweedeAuto: false,
  salaris1: "",
  inkomenWisselend: false,
  salaris1InclVakantiegeld: false,
  salaris1InclDertiende: false,
  salaris2: "",
  salaris2InclVakantiegeld: false,
  salaris2InclDertiende: false,
  toeslagZorg: "",
  toeslagKindgebonden: "",
  toeslagKinderopvang: "",
  toeslagKinderbijslag: "",
  toeslagHuur: "",
  toeslagOverig: "",
  hypotheekRenteAftrek: "",
  hypotheekRenteAftrekPer: "jaar",
  huurHypotheek: "",
  energie: "",
  internet: "",
  servicekosten: "",
  gemeenteBelastingen: "",
  gemeenteBelastingenPer: "jaar",
  ovAbonnement: "",
  brandstof: "",
  autoVerzWB: "",
  leaseBedrag: "",
  zakelijkEigenBijdrage: "",
  zorgPerPersoon: "",
  zorgToggle: "totaal",
  verzekeringOverig: "",
  boodschappen: "",
  abonnementenTotaal: "",
  streamingBedrag: "",
  telefoonBedrag: "",
  abonnementenOverigBedrag: "",
  abonnementenExpanded: false,
  kinderenTotaal: "",
  kinderenExpanded: false,
  kinderopvangEigenBijdrage: "",
  schoolActiviteiten: "",
  sportHobbyKinderen: "",
  vrijetijd: "",
  jaarlijkseKosten: "",
  jaarlijkseKostenPer: "jaar",
  spaardoel: "",
  naam: "",
  email: "",
  toestemmingOpslaan: false,
  toestemmingMarketing: false,
};

/**
 * Sessionstorage-sleutel voor de actieve resultaatstap (1 t/m 4) binnen de
 * begeleide resultatenflow. Gedeeld tussen QuizClient (die 'm wist bij een
 * verse voltooiing) en Stap6Resultaat (die 'm leest en bijwerkt), zodat een
 * refresh op de resultatenpagina op dezelfde stap blijft staan.
 */
export const RESULTAAT_STAP_SLEUTEL = "wbh-analyse-v2-resultaatstap";

export function parseEur(s: string): number {
  if (!s) return 0;
  return parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
}

export function fmtEur(n: number): string {
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}
