import { createServiceClient } from "@/lib/supabase-service";
import { Lead, QuizResultaat, IntakeAanvraag } from "./page";

/**
 * Server-side ophaalfuncties voor de admin-routes. Vervangt de gezamenlijke
 * Promise.all die eerder in app/admin/page.tsx stond: elke route haalt nu
 * alleen op wat hij nodig heeft, via de service client (bypasst RLS, zie
 * CLAUDE.md "Technische lessen" punt 2).
 *
 * De kolomconstanten stonden eerst in page.tsx, maar Next.js staat op een
 * page.tsx alleen een beperkte set exports toe. Runtime-constanten horen
 * daar niet bij (de build brak hierop), dus die staan nu hier.
 */
const LEAD_KOLOMMEN =
  "id,email,naam,bron,created_at,toestemming_marketing,quiz_voltooid";
const QUIZ_KOLOMMEN =
  "id,lead_id,token,email,created_at,woonsituatie,aantal_volwassenen,aantal_kinderen,auto_situatie,salaris_1,salaris_2,totaal_inkomen_berekend,totaal_uitgaven_berekend,maandelijks_over_berekend,benchmark_over_verwacht,verschil_met_benchmark,grootste_afwijking,verdict,wonen_huur_hypotheek,wonen_energie,wonen_internet_tv,wonen_totaal,vervoer_totaal,verzekering_zorg_per_persoon,verzekering_overig,verzekering_totaal,abonnementen_totaal,kinderen_totaal,boodschappen";
const AANVRAAG_KOLOMMEN =
  "id,created_at,pakket,gezinssituatie,inkomen_bracket,grootste_knelpunt,analyse_gedaan,start_voorkeur,analyse_token,naam,email,status";
const MAX_RIJEN = 1000;

export async function getLeads(): Promise<Lead[]> {
  const service = createServiceClient();
  const { data } = await service
    .from("leads")
    .select(LEAD_KOLOMMEN)
    .order("created_at", { ascending: false })
    .limit(MAX_RIJEN);
  return (data as unknown as Lead[]) ?? [];
}

export async function getQuizResultaten(): Promise<QuizResultaat[]> {
  const service = createServiceClient();
  const { data } = await service
    .from("quiz_resultaten")
    .select(QUIZ_KOLOMMEN)
    .order("created_at", { ascending: false })
    .limit(MAX_RIJEN);
  return (data as unknown as QuizResultaat[]) ?? [];
}

export async function getAanvragen(): Promise<IntakeAanvraag[]> {
  const service = createServiceClient();
  const { data } = await service
    .from("intake_aanvragen")
    .select(AANVRAAG_KOLOMMEN)
    .order("created_at", { ascending: false })
    .limit(MAX_RIJEN);
  return (data as unknown as IntakeAanvraag[]) ?? [];
}

/**
 * Welke aanvragen/leads al zijn doorgezet naar contacten (sectie 7,
 * "Doorzetten in een klik"). Alleen id's, voor de knop-versus-link-keuze in
 * AanvragenTabblad/LeadsTabblad: staat er al een contact aan gekoppeld, dan
 * wordt de knop een link en mag er niet nogmaals doorgezet worden.
 */
export async function getContactKoppelingen(): Promise<{
  perIntakeId: Record<string, string>;
  perLeadId: Record<string, string>;
}> {
  const service = createServiceClient();
  const { data } = await service
    .from("contacten")
    .select("id, intake_id, lead_id")
    .or("intake_id.not.is.null,lead_id.not.is.null");

  const perIntakeId: Record<string, string> = {};
  const perLeadId: Record<string, string> = {};
  for (const rij of data ?? []) {
    if (rij.intake_id) perIntakeId[rij.intake_id as string] = rij.id as string;
    if (rij.lead_id) perLeadId[rij.lead_id as string] = rij.id as string;
  }
  return { perIntakeId, perLeadId };
}

/**
 * Lichte tellingen voor de badges in het zijmenu. Gebruikt count-only
 * queries (head: true) zodat de layout niet de volledige datasets ophaalt
 * die de routes zelf al apart laden.
 */
export async function getBadgeTellingen(): Promise<{
  leads: number;
  quiz: number;
  aanvragenNieuw: number;
}> {
  const service = createServiceClient();
  const [leads, quiz, aanvragenNieuw] = await Promise.all([
    service.from("leads").select("id", { count: "exact", head: true }),
    service.from("quiz_resultaten").select("id", { count: "exact", head: true }),
    service
      .from("intake_aanvragen")
      .select("id", { count: "exact", head: true })
      .eq("status", "nieuw"),
  ]);
  return {
    leads: leads.count ?? 0,
    quiz: quiz.count ?? 0,
    aanvragenNieuw: aanvragenNieuw.count ?? 0,
  };
}
