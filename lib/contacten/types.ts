// Typen voor de contacten-CRM (fase 3). Zie
// docs/admin-redesign-30-jul-2026.md sectie 4 en 7.

export type ContactSoort = "verwijzer" | "klant" | "lead" | "overig";

export interface Contact {
  id: string;
  naam: string;
  email: string;
  telefoon: string | null;
  praktijk: string | null;
  website: string | null;
  plaats: string | null;

  soort: string;
  fase: string;
  bron: string | null;
  doelgroep: string | null;

  outreach_contact_id: string | null;
  lead_id: string | null;
  analyse_token: string | null;
  intake_id: string | null;

  laatste_contact_at: string | null;
  volgende_actie: string | null;
  volgende_actie_op: string | null;

  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactNotitie {
  id: string;
  contact_id: string;
  tekst: string;
  soort: "notitie" | "gesprek" | "mail" | "systeem";
  created_at: string;
}
