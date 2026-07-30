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
  "id,lead_id,token,email,created_at,woonsituatie,aantal_kinderen,auto_situatie,totaal_inkomen_berekend,totaal_uitgaven_berekend,maandelijks_over_berekend,benchmark_over_verwacht,verschil_met_benchmark,grootste_afwijking,verdict,wonen_huur_hypotheek,wonen_energie,wonen_internet_tv,boodschappen,verzekering_zorg_per_persoon,verzekering_overig";
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
