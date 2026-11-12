import { NextRequest, NextResponse } from "next/server";
import { voorlopigAdviesOpServer } from "@/lib/uitgaven/advies/server";
import { MODEL_VOORLOPIG } from "@/lib/uitgaven/advies/prompt";
import { valideerSamenvatting } from "@/lib/uitgaven";
import { binnenLimiet, leesJson } from "@/lib/uitgavenscan/limiet";
import { geldigeSessieId } from "@/lib/uitgavenscan/adviezen";
import { bewaarAdvies } from "@/lib/uitgavenscan/adviezen-opslaan";

/**
 * POST /api/uitgavenscan/advies (9-nov-2026): het gratis voorlopig advies.
 * De browser stuurt alleen de samenvatting (geen namen, geen rekeningnummers, maandtotalen op tientjes).
 * Die wordt hier opnieuw streng gecontroleerd voordat hij naar de AI gaat. De sleutel blijft op de server.
 * Antwoord: { ok: true, advies } of { ok: false, status } met status te_onvolledig, mislukt of te_druk.
 *
 * 12-nov-2026, op verzoek van Jarno: elke uitkomst (gemaakt, te_onvolledig, mislukt) wordt met de
 * samenvatting bewaard in uitgavenscan_adviezen, zodat hij in /admin/uitgavenscan-verloop ziet wat de
 * AI adviseerde. Optioneel sessie_id in de body koppelt het aan de voortgang. te_druk wordt niet
 * bewaard: dan is er geen AI-aanroep geweest.
 */
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await leesJson(request, 60000);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, status: "mislukt" }, { status: 400 });
  const b = body as Record<string, unknown>;
  const v = valideerSamenvatting(b.samenvatting);
  if (!v.ok) return NextResponse.json({ ok: false, status: "mislukt" }, { status: 400 });
  if (!(await binnenLimiet(request, "advies"))) return NextResponse.json({ ok: false, status: "te_druk" }, { status: 429 });

  const basis = {
    sessieId: geldigeSessieId(b.sessie_id),
    eigenaar: request.cookies.get("wb_eigenaar")?.value === "true",
    samenvatting: v.samenvatting,
    model: MODEL_VOORLOPIG,
  };
  const start = Date.now();
  try {
    const r = await voorlopigAdviesOpServer(v.samenvatting);
    const duurMs = Date.now() - start;
    if (r.ok) {
      await bewaarAdvies({ ...basis, status: "gemaakt", advies: r.advies, fouten: null, pogingen: r.pogingen, tokens: r.tokens, duurMs: duurMs });
      return NextResponse.json({ ok: true, advies: r.advies });
    }
    const status = r.reden === "te veel onbekend" ? "te_onvolledig" : "mislukt";
    await bewaarAdvies({ ...basis, status: status, advies: null, fouten: [r.reden, ...r.fouten].slice(0, 20), pogingen: r.pogingen, tokens: null, duurMs: duurMs });
    if (status === "te_onvolledig") return NextResponse.json({ ok: false, status: "te_onvolledig" });
    console.error("uitgavenscan advies: niet gelukt", r.reden, r.fouten.slice(0, 5));
    return NextResponse.json({ ok: false, status: "mislukt" });
  } catch (e) {
    const melding = e instanceof Error ? e.message.replace(/sk-ant-[A-Za-z0-9_-]+/g, "[sleutel]") : String(e);
    console.error("uitgavenscan advies: fout", melding);
    await bewaarAdvies({ ...basis, status: "mislukt", advies: null, fouten: ["fout: " + melding.slice(0, 300)], pogingen: null, tokens: null, duurMs: Date.now() - start });
    return NextResponse.json({ ok: false, status: "mislukt" });
  }
}
