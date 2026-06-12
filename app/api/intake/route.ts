import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const pakket = body?.pakket === "intensief" ? "intensief" : "gesprek";
    const naam = typeof body?.naam === "string" ? body.naam.trim().slice(0, 120) : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const gezinssituatie =
      typeof body?.gezinssituatie === "string" ? body.gezinssituatie.slice(0, 120) : null;
    const inkomenBracket =
      typeof body?.inkomen_bracket === "string" ? body.inkomen_bracket.slice(0, 120) : null;
    const grootsteKnelpunt =
      typeof body?.grootste_knelpunt === "string" ? body.grootste_knelpunt.slice(0, 2000) : null;
    const analyseGedaan = body?.analyse_gedaan === true;
    const startVoorkeur =
      typeof body?.start_voorkeur === "string" ? body.start_voorkeur.slice(0, 120) : null;

    if (!naam || !email || !email.includes("@") || !email.includes(".") || email.length > 200) {
      return NextResponse.json({ error: "Naam of e-mailadres ontbreekt" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("intake_aanvragen").insert({
      pakket,
      gezinssituatie,
      inkomen_bracket: inkomenBracket,
      grootste_knelpunt: grootsteKnelpunt,
      analyse_gedaan: analyseGedaan,
      start_voorkeur: startVoorkeur,
      naam,
      email,
      status: "nieuw",
    });

    if (error) {
      console.error("intake: opslaan mislukt", error);
      return NextResponse.json({ error: "Opslaan mislukt" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("intake: onbekende fout", err);
    return NextResponse.json({ error: "Onbekende fout" }, { status: 500 });
  }
}
