// Labels, fasen en kleine helpers voor de contacten-CRM (fase 3). Zie
// docs/admin-redesign-30-jul-2026.md sectie 4 en 7.
//
// Doelgroep (alleen relevant bij soort verwijzer) hergebruikt de bestaande
// lijst uit de outreach-CRM in plaats van een tweede lijst te onderhouden.

import { DOELGROEPEN, DOELGROEP_LABEL, DOELGROEP_KLEUR } from "@/lib/outreach/labels";
import { Contact, ContactSoort } from "@/lib/contacten/types";

export { DOELGROEPEN, DOELGROEP_LABEL, DOELGROEP_KLEUR };

export interface SoortOptie {
  value: ContactSoort;
  label: string;
}

export const SOORTEN: SoortOptie[] = [
  { value: "verwijzer", label: "Verwijzer" },
  { value: "klant", label: "Klant" },
  { value: "lead", label: "Lead" },
  { value: "overig", label: "Overig" },
];

export const SOORT_LABEL: Record<string, string> = Object.fromEntries(
  SOORTEN.map((s) => [s.value, s.label])
);

export const SOORT_KLEUR: Record<string, string> = {
  verwijzer: "bg-purple-50 text-purple-700",
  klant: "bg-success-bg text-success",
  lead: "bg-accent-bg text-accent",
  overig: "bg-[#F0F3F1] text-text-soft",
};

// Fasen per soort, in code omdat ze per soort verschillen en nog kunnen
// schuiven (sectie 4). "overig" heeft geen vaste lijst, dus die krijgt
// alleen zijn huidige waarde als optie.
export const FASEN_PER_SOORT: Record<string, string[]> = {
  verwijzer: ["gereageerd", "gesprek gepland", "gesprek gehad", "verwijst actief", "stil", "afgehaakt"],
  klant: ["aangemeld", "betaald", "gegevens binnen", "rapport verstuurd", "geleverd", "vervolg"],
  lead: ["nieuw", "analyse gedaan", "warm", "koud"],
  overig: [],
};

export function faseOpties(soort: string, huidigeFase?: string): string[] {
  const basis = FASEN_PER_SOORT[soort] ?? [];
  if (huidigeFase && !basis.includes(huidigeFase)) return [huidigeFase, ...basis];
  return basis;
}

const BRON_LABEL: Record<string, string> = {
  outreach: "Outreach",
  analyse: "Analyse",
  intake: "Intake",
  netwerk: "Netwerk",
  handmatig: "Handmatig",
};

export function bronLabel(bron: string | null): string {
  if (!bron) return "Onbekend";
  return BRON_LABEL[bron] ?? bron;
}

/**
 * Vandaag of eerder, en niet gearchiveerd: dit is precies de chip "Actie
 * nodig" en de rode markering in de tabel en het detailpaneel.
 */
export function isVerlopen(contact: Pick<Contact, "volgende_actie_op" | "archived_at">): boolean {
  if (!contact.volgende_actie_op || contact.archived_at) return false;
  const vandaag = new Date().toISOString().slice(0, 10);
  return contact.volgende_actie_op <= vandaag;
}

/**
 * Rangorde van soort, laag naar hoog. Gebruikt bij het doorzetten naar
 * contacten (sectie 7, "Doorzetten in een klik"): een bestaand contact mag
 * alleen omhoog schuiven (lead wordt verwijzer wordt klant), nooit terug.
 * Dat is de enige manier om "gevulde velden niet overschrijven" te
 * verzoenen met "blijft één persoon met één tijdlijn".
 */
export const SOORT_PRIORITEIT: Record<string, number> = {
  overig: 0,
  lead: 1,
  verwijzer: 2,
  klant: 3,
};

/**
 * Telt `aantal` werkdagen op bij vandaag (weekenden overgeslagen), voor de
 * standaard volgende actie na het doorzetten vanuit outreach.
 */
export function volgendeWerkdag(aantal: number): Date {
  const datum = new Date();
  let over = aantal;
  while (over > 0) {
    datum.setDate(datum.getDate() + 1);
    const dag = datum.getDay(); // 0 = zondag, 6 = zaterdag
    if (dag !== 0 && dag !== 6) over -= 1;
  }
  return datum;
}
