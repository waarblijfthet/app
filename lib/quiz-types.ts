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
  zorgToggle: "per_persoon",
  verzekeringOverig: "",
  boodschappen: "",
  abonnementenTotaal: "",
  streamingBedrag: "",
  telefoonBedrag: "",
  abonnementenOverigBedrag: "",
  abonnementenExpanded: false,
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

export function canProceed(step: number, data: QuizData): boolean {
  switch (step) {
    case 1:
      // Autosituatie is naar stap 4 verplaatst (28-aug-2026), dus hier niet meer
      // verplicht. Het eerste scherm vraagt alleen de huishoudsamenstelling.
      return (
        data.volwassenen !== null &&
        data.woonsituatie !== null &&
        data.kinderen !== null
      );
    case 2:
      return parseEur(data.salaris1) > 0;
    case 3:
      return parseEur(data.huurHypotheek) > 0;
    case 4:
      // Bewust niet verplicht (21-aug-2026). Zo min mogelijk verplichte velden,
      // en wie vervoer en verzekeringen overslaat ziet in het paneel dat het
      // beeld nog niet compleet is.
      return true;
    case 5:
      return parseEur(data.boodschappen) > 0;
    case 6:
      return false; // handled by Stap6 itself
    default:
      return true;
  }
}

export function parseEur(s: string): number {
  if (!s) return 0;
  return parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
}

export function fmtEur(n: number): string {
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}
