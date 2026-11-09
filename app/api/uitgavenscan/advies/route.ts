import { NextRequest, NextResponse } from "next/server";
import { voorlopigAdviesOpServer } from "@/lib/uitgaven/advies/server";
import { valideerSamenvatting } from "@/lib/uitgaven";
import { binnenLimiet, leesJson } from "@/lib/uitgavenscan/limiet";

/**
 * POST /api/uitgavenscan/advies (9-nov-2026): het gratis voorlopig advies.
 * De browser stuurt alleen de samenvatting (geen namen, geen rekeningnummers, maandtotalen op tientjes).
 * Die wordt hier opnieuw streng gecontroleerd voordat hij naar de AI gaat. De sleutel blijft op de server.
 * Antwoord: { ok: true, advies } of { ok: false, status } met status te_onvolledig, mislukt of te_druk.
 */
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await leesJson(request, 60000);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, status: "mislukt" }, { status: 400 });
  const v = valideerSamenvatting((body as Record<string, unknown>).samenvatting);
  if (!v.ok) return NextResponse.json({ ok: false, status: "mislukt" }, { status: 400 });
  if (!(await binnenLimiet(request, "advies"))) return NextResponse.json({ ok: false, status: "te_druk" }, { status: 429 });
  try {
    const r = await voorlopigAdviesOpServer(v.samenvatting);
    if (r.ok) return NextResponse.json({ ok: true, advies: r.advies });
    if (r.reden === "te veel onbekend") return NextResponse.json({ ok: false, status: "te_onvolledig" });
    console.error("uitgavenscan advies: niet gelukt", r.reden, r.fouten.slice(0, 5));
    return NextResponse.json({ ok: false, status: "mislukt" });
  } catch (e) {
    console.error("uitgavenscan advies: fout", e instanceof Error ? e.message.replace(/sk-ant-[A-Za-z0-9_-]+/g, "[sleutel]") : e);
    return NextResponse.json({ ok: false, status: "mislukt" });
  }
}
