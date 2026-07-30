import { redirect } from "next/navigation";

/**
 * /admin heeft geen eigen inhoud meer sinds de zijmenu-shell (30-jul-2026).
 * Dit bestand blijft bestaan omdat de tabblad-componenten hun gedeelde
 * interfaces en kolomconstanten hiervandaan importeren ("from ../page").
 * De data-fetching zelf staat in app/admin/data.ts, dat deze types hergebruikt.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 3, punt 3 voor de afweging.
 */

export interface IntakeAanvraag {
  id: string;
  created_at: string;
  pakket: string;
  gezinssituatie: string | null;
  inkomen_bracket: string | null;
  grootste_knelpunt: string | null;
  analyse_gedaan: boolean | null;
  start_voorkeur: string | null;
  analyse_token: string | null;
  naam: string | null;
  email: string | null;
  status: string;
}

export interface Lead {
  id: string;
  email: string;
  naam: string | null;
  bron: string;
  created_at: string;
  toestemming_marketing: boolean;
  quiz_voltooid: boolean;
}

export interface QuizResultaat {
  id: string;
  lead_id: string | null;
  token: string | null;
  email: string | null;
  created_at: string;
  woonsituatie: string | null;
  aantal_kinderen: number;
  auto_situatie: string | null;
  totaal_inkomen_berekend: number | null;
  totaal_uitgaven_berekend: number | null;
  maandelijks_over_berekend: number | null;
  benchmark_over_verwacht: number | null;
  verschil_met_benchmark: number | null;
  grootste_afwijking: string | null;
  verdict: string | null;
  wonen_huur_hypotheek: number | null;
  wonen_energie: number | null;
  wonen_internet_tv: number | null;
  boodschappen: number | null;
  verzekering_zorg_per_persoon: number | null;
  verzekering_overig: number | null;
}

// Kolommen die de tabbladen daadwerkelijk gebruiken (zie interfaces hierboven).
export const LEAD_KOLOMMEN =
  "id,email,naam,bron,created_at,toestemming_marketing,quiz_voltooid";
export const QUIZ_KOLOMMEN =
  "id,lead_id,token,email,created_at,woonsituatie,aantal_kinderen,auto_situatie,totaal_inkomen_berekend,totaal_uitgaven_berekend,maandelijks_over_berekend,benchmark_over_verwacht,verschil_met_benchmark,grootste_afwijking,verdict,wonen_huur_hypotheek,wonen_energie,wonen_internet_tv,boodschappen,verzekering_zorg_per_persoon,verzekering_overig";
export const AANVRAAG_KOLOMMEN =
  "id,created_at,pakket,gezinssituatie,inkomen_bracket,grootste_knelpunt,analyse_gedaan,start_voorkeur,analyse_token,naam,email,status";
export const MAX_RIJEN = 1000;

export default function AdminPage() {
  redirect("/admin/vandaag");
}
