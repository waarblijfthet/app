// Opslaan van gevonden prospects, met ontdubbeling tegen bestaande
// outreach-contacten en eerder gevonden prospects.

import type { SupabaseClient } from "@supabase/supabase-js";
import { GevondenProspect } from "./types";

export async function slaProspectsOp(
  supabase: SupabaseClient,
  jobId: string,
  prospects: GevondenProspect[]
): Promise<number> {
  if (prospects.length === 0) return 0;

  const emails = prospects.map((p) => p.email);
  const { data: bestaandOutreach } = await supabase
    .from("outreach_contacts").select("email").in("email", emails);
  const { data: bestaandProspect } = await supabase
    .from("prospects").select("email").in("email", emails);
  const bekend = new Set([
    ...(bestaandOutreach ?? []).map((r: { email: string }) => r.email),
    ...(bestaandProspect ?? []).map((r: { email: string }) => r.email),
  ]);

  let opgeslagen = 0;
  for (const p of prospects) {
    if (bekend.has(p.email)) continue;
    bekend.add(p.email);
    const { error } = await supabase.from("prospects").insert({
      job_id: jobId,
      naam: p.naam,
      praktijk: p.praktijk,
      email: p.email,
      website: p.website,
      bron_url: p.bronUrl,
      doelgroep: p.doelgroep,
      doelgroep_score: p.doelgroepScore,
      context: p.context,
      plaats: p.plaats,
    });
    if (!error) opgeslagen += 1;
  }
  return opgeslagen;
}
