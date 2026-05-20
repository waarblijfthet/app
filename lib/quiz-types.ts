export type Woonsituatie = "huur" | "koop";
export type AutoSituatie = "geen" | "eigen" | "lease_privé" | "zakelijk";
export type KinderenAantal = 0 | 1 | 2 | 3;
export type ZorgToggle = "per_persoon" | "totaal";

export interface QuizData {
  // Stap 1 — Profiel
  woonsituatie: Woonsituatie | null;
  kinderen: KinderenAantal;
  auto: AutoSituatie | null;
  zakelijkBijtellingSalaris: boolean; // bijtelling NOG NIET in salaris verrekend

  // Stap 2 — Inkomsten
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

  // Stap 3 — Wonen
  huurHypotheek: string;
  energie: string;
  internet: string;
  servicekosten: string;
  gemeenteBelastingen: string;

  // Stap 4 — Vervoer & Verzekeringen
  ovAbonnement: string;
  brandstof: string;
  autoVerzWB: string;
  leaseBedrag: string;
  zakelijkEigenBijdrage: string;
  zorgPerPersoon: string;
  zorgToggle: ZorgToggle;
  verzekeringOverig: string;

  // Stap 5 — Dagelijks
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

  // Stap 6 — Lead
  naam: string;
  email: string;
  toestemmingOpslaan: boolean;
  toestemmingMarketing: boolean;
}

export const DEFAULT_QUIZ_DATA: QuizData = {
  woonsituatie: null,
  kinderen: 0,
  auto: null,
  zakelijkBijtellingSalaris: false,
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
  huurHypotheek: "",
  energie: "",
  internet: "",
  servicekosten: "",
  gemeenteBelastingen: "",
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
  naam: "",
  email: "",
  toestemmingOpslaan: false,
  toestemmingMarketing: false,
};

export function canProceed(step: number, data: QuizData): boolean {
  switch (step) {
    case 1:
      return data.woonsituatie !== null && data.auto !== null;
    case 2:
      return parseEur(data.salaris1) > 0;
    case 3:
      return parseEur(data.huurHypotheek) > 0;
    case 4:
      return parseEur(data.zorgPerPersoon) > 0;
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
