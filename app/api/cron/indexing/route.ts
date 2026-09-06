import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { synchroniseer, dienIn, logRun } from "@/lib/indexnow";

/**
 * Dagelijkse IndexNow-indiening.
 *
 * Reden dat dit bestand op 6-sep-2026 is herschreven: deze job heeft sinds
 * 7 juni 2026 niet meer gedraaid. In commit 6f56f9d is in `vercel.json` het pad
 * `/api/cron/indexing` VERVANGEN door `/api/cron/indexing-inspect` in plaats
 * van dat er een tweede regel bij kwam. De inspectiejob controleert alleen of
 * Google een URL kent; hij dient niets in. Gevolg: geen enkele URL die na
 * 17 juni is gepubliceerd is ooit bij IndexNow aangeboden, en de sync die de
 * nieuwe URL's in de tabel zet draaide ook niet, dus ze stonden er niet eens in.
 *
 * Drie dingen daarom veranderd:
 *   1. Het pad staat weer in `vercel.json`, náást de inspectiejob.
 *   2. De job schrijft zijn uitkomst in `cron_runs`, zodat het indexeringstabblad
 *      laat zien wanneer hij voor het laatst liep. Een job die stil stopt is
 *      hetzelfde als een job die er niet is.
 *   3. De selectie- en indieningslogica staat in `lib/indexnow.ts`, gedeeld met
 *      de knop in de admin, zodat de twee niet meer uit elkaar kunnen lopen.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const JOB = "indexing-submit";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();
  const log: string[] = [];

  let aantalUrls = 0;
  try {
    aantalUrls = await synchroniseer(supabase);
    log.push(`Sync: ${aantalUrls} URL's uit de site.`);
  } catch (err) {
    const melding = `Sync mislukt: ${String(err)}`;
    await logRun(supabase, JOB, "error", { error: melding }, Date.now() - start);
    return NextResponse.json({ ok: false, log: [melding] }, { status: 500 });
  }

  const resultaat = await dienIn(supabase);
  log.push(...resultaat.log);

  await logRun(
    supabase,
    JOB,
    resultaat.fout ? "error" : "ok",
    {
      urls: aantalUrls,
      submitted: resultaat.ingediend,
      skipped: resultaat.overgeslagen,
      perReden: resultaat.perReden,
      error: resultaat.fout ?? undefined,
    },
    Date.now() - start
  );

  return NextResponse.json({ ok: !resultaat.fout, log: log });
}
