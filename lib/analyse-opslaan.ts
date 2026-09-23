import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Een afgeronde analyse opslaan met een e-mailadres: een lead plus een rij in
 * quiz_resultaten met een token, zodat /resultaat/[token] hem kan tonen.
 *
 * Letterlijk verhuisd uit /api/quiz-lead (23-sep-2026), omdat de vraagstap
 * (/api/analyse-vraag) precies hetzelfde moet doen. Gedrag ongewijzigd,
 * inclusief de terugval bij een ontbrekende kolom, zodat de lead nooit
 * verloren gaat.
 */

// Velden die vanuit het quizresultaat in quiz_resultaten mogen landen.
export const TOEGESTANE_VELDEN = [
  "woonsituatie",
  "aantal_volwassenen",
  "aantal_kinderen",
  "auto_situatie",
  "salaris_1",
  "salaris_2",
  "wonen_huur_hypotheek",
  "wonen_energie",
  "wonen_internet_tv",
  "boodschappen",
  "verzekering_zorg_per_persoon",
  "verzekering_overig",
  "wonen_totaal",
  "vervoer_totaal",
  "verzekering_totaal",
  "abonnementen_totaal",
  "kinderen_totaal",
  "totaal_inkomen_berekend",
  "totaal_uitgaven_berekend",
  "maandelijks_over_berekend",
  "benchmark_over_verwacht",
  "verschil_met_benchmark",
  "grootste_afwijking",
  "verdict",
] as const;

export type OpslaanUitkomst =
  | { ok: true; token: string; leadId: string }
  | { ok: false; detail: string };

export async function slaAnalyseOp(
  supabase: SupabaseClient,
  invoer: {
    email: string;
    naam: string | null;
    /** Weglaten laat een bestaande toestemming ongemoeid (de vraagstap vraagt er niet naar). */
    toestemmingMarketing?: boolean;
    resultaat: Record<string, unknown>;
    bron: string;
  }
): Promise<OpslaanUitkomst> {
  const token = crypto.randomUUID();

  const leadRij: Record<string, unknown> = {
    email: invoer.email,
    naam: invoer.naam || null,
    bron: invoer.bron,
    quiz_voltooid: true,
  };
  if (invoer.toestemmingMarketing !== undefined) {
    leadRij.toestemming_marketing = invoer.toestemmingMarketing;
  } else {
    // Niet gevraagd: een bestaande keuze blijft staan, een nieuwe lead krijgt
    // nee. Expliciet meegeven, want het schema van leads staat niet in de repo
    // en de kolom kan verplicht zijn zonder standaardwaarde.
    const { data: bestaand } = await supabase
      .from("leads")
      .select("toestemming_marketing")
      .eq("email", invoer.email)
      .maybeSingle();
    leadRij.toestemming_marketing = bestaand?.toestemming_marketing === true;
  }

  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .upsert(leadRij, { onConflict: "email" })
    .select()
    .single();

  if (leadErr || !lead) {
    console.error("analyse opslaan: lead opslaan mislukt", leadErr);
    return {
      ok: false,
      detail: leadErr ? `leads: ${leadErr.code ?? ""} ${leadErr.message}` : "leads: geen rij terug",
    };
  }

  const payload: Record<string, unknown> = {
    lead_id: lead.id,
    token: token,
    email: invoer.email,
  };
  for (const veld of TOEGESTANE_VELDEN) {
    if (veld in invoer.resultaat) payload[veld] = invoer.resultaat[veld];
  }

  let { error: resultaatErr } = await supabase.from("quiz_resultaten").insert(payload);

  // Schema-drift fallback: als een kolom (nog) niet bestaat in de database,
  // laat die dan weg en probeer opnieuw, zodat de lead nooit verloren gaat.
  let pogingen = 0;
  while (resultaatErr && resultaatErr.code === "PGRST204" && pogingen < TOEGESTANE_VELDEN.length) {
    const match = resultaatErr.message?.match(/the '([^']+)' column/);
    const kolom = match?.[1];
    if (!kolom || !(kolom in payload) || kolom === "token" || kolom === "email") {
      break;
    }
    console.warn(
      `analyse opslaan: kolom ${kolom} ontbreekt in quiz_resultaten, opgeslagen zonder. Draai supabase/quiz_resultaten_kolommen.sql.`
    );
    delete payload[kolom];
    pogingen += 1;
    ({ error: resultaatErr } = await supabase.from("quiz_resultaten").insert(payload));
  }

  if (resultaatErr) {
    console.error("analyse opslaan: resultaat opslaan mislukt", resultaatErr);
    return { ok: false, detail: `quiz_resultaten: ${resultaatErr.code ?? ""} ${resultaatErr.message}` };
  }

  return { ok: true, token: token, leadId: lead.id as string };
}
