// Gedeelde labels en kleuren voor de outreach-CRM: doelgroep, reactie en de
// samengestelde statusweergave. Eerst alleen in OutreachTabblad.tsx, nu
// gedeeld met OutreachDetailpaneel.tsx zodat kleur en label op een plek
// staan (zie docs/admin-redesign-30-jul-2026.md sectie 3, "eenmaal bouwen").

export interface DoelgroepOptie {
  value: string;
  label: string;
}

export const DOELGROEPEN: DoelgroepOptie[] = [
  { value: "relatietherapeuten", label: "Relatietherapie" },
  { value: "budgetcoaches", label: "Budgetcoach" },
  { value: "financieel-planners", label: "Financieel planner" },
  { value: "burnout-coaches", label: "Burnout-coach" },
  { value: "boekhouders", label: "Boekhouder" },
];

export const DOELGROEP_LABEL: Record<string, string> = Object.fromEntries(
  DOELGROEPEN.map((d) => [d.value, d.label])
);

// Behouden kleur per doelgroep (Jarno: "ik vond het wel duidelijker dat elke
// doelgroep een kleur had"), via Badge's kleurOverride in plaats van een
// eigen span-styling.
export const DOELGROEP_KLEUR: Record<string, string> = {
  "relatietherapeuten": "bg-purple-50 text-purple-700",
  "budgetcoaches": "bg-blue-50 text-blue-700",
  "financieel-planners": "bg-amber-50 text-amber-700",
  "burnout-coaches": "bg-orange-50 text-orange-700",
  "boekhouders": "bg-teal-50 text-teal-700",
};

export type Reactie = "positief" | "neutraal" | "negatief";

export const REACTIE_LABEL: Record<Reactie, string> = {
  positief: "Positief",
  neutraal: "Neutraal",
  negatief: "Negatief",
};

export const REACTIE_VARIANT: Record<Reactie, "goed" | "neutraal" | "fout"> = {
  positief: "goed",
  neutraal: "neutraal",
  negatief: "fout",
};

export interface OutreachStatusVelden {
  status: string;
  reactie: Reactie | null;
  gestopt: boolean;
}

export interface StatusWeergave {
  label: string;
  variant: "neutraal" | "actie" | "goed" | "waarschuwing" | "fout";
}

/**
 * Combineert status, reactie en gestopt tot één badge (5b in het
 * ontwerpdocument vervangt de losse Status- en Reactie-kolom door één
 * kolom). Voorrangsvolgorde, van hoog naar laag: bounced, gereageerd
 * (met classificatie), gestopt, verstuurd, nieuw. Bounced en "gereageerd
 * negatief" delen dezelfde rode kleur; ze zijn alleen aan het label te
 * onderscheiden, niet aan de kleur (Badge heeft geen zesde variant).
 */
export function statusWeergave(c: OutreachStatusVelden): StatusWeergave {
  if (c.status === "bounced") return { label: "Bounced", variant: "fout" };
  if (c.status === "gereageerd") {
    if (c.reactie === "positief") return { label: "Gereageerd positief", variant: "goed" };
    if (c.reactie === "negatief") return { label: "Gereageerd negatief", variant: "fout" };
    return { label: "Gereageerd", variant: "neutraal" };
  }
  if (c.gestopt) return { label: "Gestopt", variant: "waarschuwing" };
  if (["verstuurd", "geopend", "geklikt"].includes(c.status)) {
    return { label: "Verstuurd", variant: "actie" };
  }
  return { label: "Nieuw", variant: "neutraal" };
}
