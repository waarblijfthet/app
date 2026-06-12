import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

// Velden die vanuit het quizresultaat in quiz_resultaten mogen landen.
const TOEGESTANE_VELDEN = [
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const naam = typeof body?.naam === "string" ? body.naam.trim().slice(0, 120) : null;
    const emailRaw = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const toestemmingMarketing = body?.toestemmingMarketing === true;
    const resultaat = body?.resultaat;

    if (!emailRaw || !emailRaw.includes("@") || !emailRaw.includes(".") || emailRaw.length > 200) {
      return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
    }
    if (!resultaat || typeof resultaat !== "object") {
      return NextResponse.json({ error: "Resultaat ontbreekt" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const token = crypto.randomUUID();

    const { data: lead, error: leadErr } = await supabase
      .from("leads")
      .upsert(
        {
          email: emailRaw,
          naam: naam || null,
          bron: "quiz",
          toestemming_marketing: toestemmingMarketing,
          quiz_voltooid: true,
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (leadErr || !lead) {
      console.error("quiz-lead: lead opslaan mislukt", leadErr);
      return NextResponse.json(
        {
          error: "Opslaan mislukt",
          detail: leadErr ? `leads: ${leadErr.code ?? ""} ${leadErr.message}` : "leads: geen rij terug",
        },
        { status: 500 }
      );
    }

    const payload: Record<string, unknown> = {
      lead_id: lead.id,
      token,
      email: emailRaw,
    };
    for (const veld of TOEGESTANE_VELDEN) {
      if (veld in resultaat) payload[veld] = resultaat[veld];
    }

    let { error: resultaatErr } = await supabase
      .from("quiz_resultaten")
      .insert(payload);

    // Schema-drift fallback: als een kolom (nog) niet bestaat in de database,
    // laat die dan weg en probeer opnieuw, zodat de lead nooit verloren gaat.
    let pogingen = 0;
    while (
      resultaatErr &&
      resultaatErr.code === "PGRST204" &&
      pogingen < TOEGESTANE_VELDEN.length
    ) {
      const match = resultaatErr.message?.match(/the '([^']+)' column/);
      const kolom = match?.[1];
      if (!kolom || !(kolom in payload) || kolom === "token" || kolom === "email") {
        break;
      }
      console.warn(
        `quiz-lead: kolom ${kolom} ontbreekt in quiz_resultaten, opgeslagen zonder. Draai supabase/quiz_resultaten_kolommen.sql.`
      );
      delete payload[kolom];
      pogingen += 1;
      ({ error: resultaatErr } = await supabase
        .from("quiz_resultaten")
        .insert(payload));
    }

    if (resultaatErr) {
      console.error("quiz-lead: resultaat opslaan mislukt", resultaatErr);
      return NextResponse.json(
        {
          error: "Opslaan mislukt",
          detail: `quiz_resultaten: ${resultaatErr.code ?? ""} ${resultaatErr.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ token });
  } catch (err) {
    console.error("quiz-lead: onbekende fout", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Onbekende fout", detail }, { status: 500 });
  }
}
