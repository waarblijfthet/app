import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { slaAnalyseOp } from "@/lib/analyse-opslaan";

/**
 * Bewaarformulier op het resultaatscherm: lead plus quiz_resultaten met token.
 * De opslag zelf staat sinds 23-sep-2026 in lib/analyse-opslaan.ts, omdat de
 * vraagstap (/api/analyse-vraag) hetzelfde doet. Gedrag ongewijzigd.
 */
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
    const uitkomst = await slaAnalyseOp(supabase, {
      email: emailRaw,
      naam: naam,
      toestemmingMarketing: toestemmingMarketing,
      resultaat: resultaat as Record<string, unknown>,
      bron: "quiz",
    });

    if (!uitkomst.ok) {
      return NextResponse.json({ error: "Opslaan mislukt", detail: uitkomst.detail }, { status: 500 });
    }
    return NextResponse.json({ token: uitkomst.token });
  } catch (err) {
    console.error("quiz-lead: onbekende fout", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Onbekende fout", detail }, { status: 500 });
  }
}
