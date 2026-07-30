// Gedeelde labels, kleuren en werklijst-logica voor de outreach-CRM:
// doelgroep, reactie, de samengestelde statusweergave en de indeling in de
// vier werklijst-stapels (fase 2b, sectie 5a). Eerst alleen in
// OutreachTabblad.tsx, nu gedeeld met OutreachDetailpaneel.tsx en
// OutreachWerklijst.tsx zodat kleur, label en "is dit rijp voor een
// follow-up" op een plek staan (zie docs/admin-redesign-30-jul-2026.md
// sectie 3, "eenmaal bouwen").

import { FOLLOWUP_WACHTDAGEN, MAX_FOLLOWUPS } from "@/lib/outreach/mails";
import { OutreachContact } from "@/lib/outreach/types";

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


// ── Follow-up-geschiktheid en werklijst-stapels (fase 2b) ──────────────────
// Zelfde regel als de send-route en de cron; hier alleen om knoppen te
// tonen/verbergen en de werklijst in te delen, de server controleert dit
// bij het versturen opnieuw.
export function followupGeschikt(c: OutreachContact): boolean {
  if (c.gestopt || c.archived_at) return false;
  if (!["verstuurd", "geopend", "geklikt"].includes(c.status)) return false;
  if ((c.followups ?? 0) >= MAX_FOLLOWUPS) return false;
  const laatste = c.laatste_followup_at ?? c.verstuurd_at;
  if (!laatste) return false;
  return (Date.now() - new Date(laatste).getTime()) / 86400000 >= FOLLOWUP_WACHTDAGEN;
}

// Datum waarop een contact rijp wordt voor de volgende follow-up (null als
// er nog geen eerste mail is verstuurd, dan is er niets om op te wachten).
export function rijpeDatum(c: OutreachContact): Date | null {
  const basis = (c.followups ?? 0) === 0 ? c.verstuurd_at : c.laatste_followup_at;
  if (!basis) return null;
  const d = new Date(basis);
  d.setDate(d.getDate() + FOLLOWUP_WACHTDAGEN);
  return d;
}

export interface WerklijstStapels {
  gereageerd: OutreachContact[];
  followupRijp: OutreachContact[];
  klaarOmTeVersturen: OutreachContact[];
  wachten: OutreachContact[];
}

/**
 * Verdeelt actieve (niet gearchiveerd, niet gestopt, niet bounced) contacten
 * in de vier werklijst-stapels uit sectie 5a, in de volgorde waarin ze
 * afgehandeld worden. "Gereageerd" is expliciet de handmatig gezette status
 * (er is geen mailintegratie): status 'gereageerd' zonder reactie-classificatie
 * is nog niet afgehandeld, zodra er een classificatie staat verdwijnt het
 * contact uit deze stapel (blijft wel zichtbaar in Alle contacten).
 */
export function verdeelInStapels(contacten: OutreachContact[]): WerklijstStapels {
  const actief = contacten.filter((c) => !c.archived_at && !c.gestopt && c.status !== "bounced");

  const gereageerd = actief.filter((c) => c.status === "gereageerd" && !c.reactie);
  const followupRijp = actief.filter(followupGeschikt);
  const klaarOmTeVersturen = actief.filter((c) => c.status === "nieuw");

  const uitgesloten = new Set([
    ...gereageerd.map((c) => c.id),
    ...followupRijp.map((c) => c.id),
    ...klaarOmTeVersturen.map((c) => c.id),
  ]);
  const wachten = actief.filter(
    (c) => !uitgesloten.has(c.id) && ["verstuurd", "geopend", "geklikt"].includes(c.status)
  );

  return { gereageerd, followupRijp, klaarOmTeVersturen, wachten };
}
