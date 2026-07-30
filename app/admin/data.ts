import { createServiceClient } from "@/lib/supabase-service";
import {
  Lead,
  QuizResultaat,
  IntakeAanvraag,
  LEAD_KOLOMMEN,
  QUIZ_KOLOMMEN,
  AANVRAAG_KOLOMMEN,
  MAX_RIJEN,
} from "./page";

/**
 * Server-side ophaalfuncties voor de admin-routes. Vervangt de gezamenlijke
 * Promise.all die eerder in app/admin/page.tsx stond: elke route haalt nu
 * alleen op wat hij nodig heeft, via de service client (bypasst RLS, zie
 * CLAUDE.md "Technische lessen" punt 2).
 */

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
