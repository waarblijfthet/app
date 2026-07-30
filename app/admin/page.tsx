import { redirect } from "next/navigation";

/**
 * /admin heeft geen eigen inhoud meer sinds de zijmenu-shell (30-jul-2026).
 * Dit bestand blijft bestaan omdat de tabblad-componenten hun gedeelde
 * interfaces hiervandaan importeren ("from ../page"). Next.js staat op een
 * page.tsx alleen een beperkte set exports toe (default, metadata, e.d.);
 * runtime-constanten zoals de kolomselecties horen daar niet bij en zijn
 * daarom naar app/admin/data.ts verhuisd (build brak hierop, "LEAD_KOLOMMEN
 * is not a valid Page export field"). Interfaces zijn geen runtime-export
 * (ze compileren weg) en mogen wel blijven staan.
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
  aantal_volwassenen: number | null;
  aantal_kinderen: number;
  auto_situatie: string | null;
  salaris_1: number | null;
  salaris_2: number | null;
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
  wonen_totaal: number | null;
  vervoer_totaal: number | null;
  boodschappen: number | null;
  verzekering_zorg_per_persoon: number | null;
  verzekering_overig: number | null;
  verzekering_totaal: number | null;
  abonnementen_totaal: number | null;
  kinderen_totaal: number | null;
}

export default function AdminPage() {
  redirect("/admin/vandaag");
}
