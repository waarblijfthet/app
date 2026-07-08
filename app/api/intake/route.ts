import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const pakket =
      body?.pakket === "intensief"
        ? "intensief"
        : body?.pakket === "geldscan"
        ? "geldscan"
        : "gesprek";
    const naam = typeof body?.naam === "string" ? body.naam.trim().slice(0, 120) : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const gezinssituatie =
      typeof body?.gezinssituatie === "string" ? body.gezinssituatie.slice(0, 120) : null;
    const inkomenBracket =
      typeof body?.inkomen_bracket === "string" ? body.inkomen_bracket.slice(0, 120) : null;
    const grootsteKnelpunt =
      typeof body?.grootste_knelpunt === "string" ? body.grootste_knelpunt.slice(0, 2000) : null;
    const analyseGedaan =
      typeof body?.analyse_gedaan === "boolean" ? body.analyse_gedaan : null;
    const startVoorkeur =
      typeof body?.start_voorkeur === "string" ? body.start_voorkeur.slice(0, 120) : null;
    let analyseToken =
      typeof body?.analyse_token === "string" && body.analyse_token.trim().length > 0
        ? body.analyse_token.trim().slice(0, 100)
        : null;

    if (!naam || !email || !email.includes("@") || !email.includes(".") || email.length > 200) {
      return NextResponse.json({ error: "Naam of e-mailadres ontbreekt" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Geen token meegekregen? Kijk of dit e-mailadres al eerder de gratis
    // analyse deed, dan koppelen we die (meest recente) automatisch.
    if (!analyseToken) {
      const { data: match } = await supabase
        .from("quiz_resultaten")
        .select("token")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (match?.token) {
        analyseToken = match.token;
      }
    }

    const { error } = await supabase.from("intake_aanvragen").insert({
      pakket,
      gezinssituatie,
      inkomen_bracket: inkomenBracket,
      grootste_knelpunt: grootsteKnelpunt,
      analyse_gedaan: analyseGedaan,
      start_voorkeur: startVoorkeur,
      analyse_token: analyseToken,
      naam,
      email,
      status: "nieuw",
    });

    if (error) {
      console.error("intake: opslaan mislukt", error);
      return NextResponse.json(
        {
          error: "Opslaan mislukt",
          detail: `intake_aanvragen: ${error.code ?? ""} ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("intake: onbekende fout", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Onbekende fout", detail }, { status: 500 });
  }
}
