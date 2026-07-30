// Gedeelde front-end types voor de outreach-CRM (tabel + detailpaneel).

export interface OutreachContact {
  id: string;
  naam: string;
  email: string;
  doelgroep: string;
  plaats: string | null;
  praktijk: string | null;
  website: string | null;
  bron_url: string | null;
  context: string | null;
  created_at: string;
  verstuurd_at: string | null;
  geopend_at: string | null;
  geklikt_at: string | null;
  bounced_at: string | null;
  gereageerd_at: string | null;
  laatste_followup_at: string | null;
  followups: number;
  ps_zin: string | null;
  status: "nieuw" | "verstuurd" | "geopend" | "geklikt" | "bounced" | "gereageerd";
  reactie: "positief" | "neutraal" | "negatief" | null;
  gestopt: boolean;
  gestopt_at: string | null;
  gestopt_reden: string | null;
  archived_at: string | null;
  /**
   * Alleen aanwezig in de respons van GET /api/admin/outreach/[id] (geen
   * databasekolom, afgeleid van contacten.outreach_contact_id): het
   * gekoppelde contact, als dit outreach-contact al is doorgezet.
   */
  contact_id?: string | null;
}

export interface OutreachMail {
  id: string;
  contact_id: string;
  nummer: number;
  verstuurd_at: string;
  resend_id: string | null;
  geopend_at: string | null;
  geklikt_at: string | null;
  bounced_at: string | null;
}

export interface ContactNotitie {
  id: string;
  contact_id: string | null;
  outreach_contact_id: string | null;
  tekst: string;
  soort: "notitie" | "gesprek" | "mail" | "systeem";
  created_at: string;
}
