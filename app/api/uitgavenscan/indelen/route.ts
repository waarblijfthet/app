import { NextRequest, NextResponse } from "next/server";
import { deelNamenInOpServer } from "@/lib/uitgaven/advies/server";
import { valideerNamen } from "@/lib/uitgaven/advies/indelen-ai";
import { binnenLimiet, leesJson } from "@/lib/uitgavenscan/limiet";

/**
 * POST /api/uitgavenscan/indelen (9-nov-2026): onbekende bedrijfsnamen laten indelen.
 * Alleen opgeschoonde bedrijfsnamen (schoonBedrijfsnaam in de browser én hier opnieuw gecontroleerd),
 * zonder bedragen. Nooit namen van overboekingen naar personen: die stuurt de browser niet mee.
 */
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await leesJson(request, 20000);
  const namen = body && typeof body === "object" ? valideerNamen((body as Record<string, unknown>).namen) : null;
  if (!namen) return NextResponse.json({ ok: false }, { status: 400 });
  if (!(await binnenLimiet(request, "indelen"))) return NextResponse.json({ ok: false, status: "te_druk" }, { status: 429 });
  try {
    const r = await deelNamenInOpServer(namen);
    if (r.ok) return NextResponse.json({ ok: true, categorieen: r.categorieen });
    console.error("uitgavenscan indelen: niet gelukt", r.reden);
    return NextResponse.json({ ok: false });
  } catch (e) {
    console.error("uitgavenscan indelen: fout", e instanceof Error ? e.message.replace(/sk-ant-[A-Za-z0-9_-]+/g, "[sleutel]") : e);
    return NextResponse.json({ ok: false });
  }
}
