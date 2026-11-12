/**
 * Bewaarde voorlopige adviezen uit de uitgavenscan (12-nov-2026, op verzoek van Jarno).
 * Gedeeld door de server-route die opslaat en het admin-scherm dat ze toont. Puur, zonder Supabase.
 * Zie supabase/uitgavenscan_adviezen.sql voor wat er wel en niet in staat.
 */
import type { Samenvatting } from "@/lib/uitgaven/samenvatting";
import type { VoorlopigAdvies } from "@/lib/uitgaven/advies/valideer-advies";

export type BewaardeStatus = "gemaakt" | "te_onvolledig" | "mislukt";

export type AdviesRij = {
  id: string;
  created_at: string;
  sessie_id: string | null;
  eigenaar: boolean | null;
  status: BewaardeStatus | string;
  samenvatting: Samenvatting;
  advies: VoorlopigAdvies | null;
  fouten: string[] | null;
  pogingen: number | null;
  tokens: { invoer: number; uitvoer: number; cache: number } | null;
  duur_ms: number | null;
  model: string | null;
};

export const ADVIES_KOLOMMEN = "id,created_at,sessie_id,eigenaar,status,samenvatting,advies,fouten,pogingen,tokens,duur_ms,model";

/** Sessie-id's komen uit lib/sessie.ts: een UUID of een korte willekeurige string. Al het andere weigeren. */
export function geldigeSessieId(x: unknown): string | null {
  return typeof x === "string" && /^[A-Za-z0-9-]{6,64}$/.test(x) ? x : null;
}
