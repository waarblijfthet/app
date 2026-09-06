import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { dienIn, synchroniseer, logRun, DAGELIJKS_LIMIET } from "@/lib/indexnow";

/**
 * De knop "indienen" in het indexeringstabblad.
 *
 * Gebruikt sinds 6-sep-2026 exact dezelfde selectie en dezelfde bijwerkroute
 * als de dagelijkse cron (`lib/indexnow.ts`). Daarvoor stonden de sleutel, de
 * host, het dagbudget en de hele lus hier nog een tweede keer.
 *
 * Zonder body: synchroniseert eerst de URL-lijst en dient daarna in wat aan de
 * beurt is. Met een `urls`-body: dient precies die URL's in, voor als Jarno
 * één nieuwe pagina meteen kwijt wil.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();

  let alleenDeze: string[] | undefined;
  try {
    const body = (await request.json()) as { urls?: string[] };
    if (body.urls && body.urls.length > 0) alleenDeze = body.urls;
  } catch {
    // geen body, dan de normale selectie
  }

  if (!alleenDeze) {
    try {
      await synchroniseer(supabase);
    } catch (err) {
      return NextResponse.json(
        { error: `Sync mislukt: ${String(err)}`, submitted: 0, skipped: 0, errors: [] },
        { status: 500 }
      );
    }
  }

  const resultaat = await dienIn(supabase, { alleenDeze: alleenDeze });

  await logRun(
    supabase,
    "indexing-submit",
    resultaat.fout ? "error" : "ok",
    {
      handmatig: true,
      submitted: resultaat.ingediend,
      skipped: resultaat.overgeslagen,
      perReden: resultaat.perReden,
      error: resultaat.fout ?? undefined,
    },
    Date.now() - start
  );

  if (resultaat.fout && resultaat.ingediend === 0) {
    const status = resultaat.log[0]?.startsWith("Dagbudget") ? 429 : 500;
    return NextResponse.json(
      { error: resultaat.fout, submitted: 0, skipped: resultaat.overgeslagen, errors: [resultaat.fout] },
      { status: status }
    );
  }

  if (resultaat.ingediend === 0 && resultaat.log[0]?.startsWith("Dagbudget")) {
    return NextResponse.json(
      {
        error: `Dagelijks limiet van ${DAGELIJKS_LIMIET} bereikt`,
        submitted: 0,
        skipped: 0,
        errors: [],
      },
      { status: 429 }
    );
  }

  return NextResponse.json({
    submitted: resultaat.ingediend,
    skipped: resultaat.overgeslagen,
    errors: resultaat.fout ? [resultaat.fout] : [],
    log: resultaat.log,
    perReden: resultaat.perReden,
  });
}
