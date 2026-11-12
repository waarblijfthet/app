import "server-only";
import { createServiceClient } from "@/lib/supabase-service";
import type { Samenvatting } from "@/lib/uitgaven/samenvatting";
import type { VoorlopigAdvies } from "@/lib/uitgaven/advies/valideer-advies";
import type { BewaardeStatus } from "./adviezen";

/**
 * Slaat een voorlopig advies op in uitgavenscan_adviezen (12-nov-2026). Wordt ge-await in de route:
 * een Supabase-query zonder await wordt nooit verstuurd (zie feedback over logGebeurtenis, sep-2026).
 * Gooit nooit: opslaan mag het advies voor de bezoeker niet breken. Mislukt het, dan staat dat in de
 * Vercel-log, en ziet Jarno in de admin dat er minder adviezen bewaard zijn dan de trechter telt.
 */
export async function bewaarAdvies(rij: {
  sessieId: string | null;
  eigenaar: boolean;
  status: BewaardeStatus;
  samenvatting: Samenvatting;
  advies: VoorlopigAdvies | null;
  fouten: string[] | null;
  pogingen: number | null;
  tokens: { invoer: number; uitvoer: number; cache: number } | null;
  duurMs: number;
  model: string;
}): Promise<void> {
  try {
    const { error } = await createServiceClient()
      .from("uitgavenscan_adviezen")
      .insert({
        sessie_id: rij.sessieId,
        eigenaar: rij.eigenaar,
        status: rij.status,
        samenvatting: rij.samenvatting,
        advies: rij.advies,
        fouten: rij.fouten,
        pogingen: rij.pogingen,
        tokens: rij.tokens,
        duur_ms: rij.duurMs,
        model: rij.model,
      });
    if (error) console.error("uitgavenscan advies: opslaan mislukt (draai supabase/uitgavenscan_adviezen.sql?)", error.message);
  } catch (e) {
    console.error("uitgavenscan advies: opslaan mislukt", e instanceof Error ? e.message : e);
  }
}
