import { getAllUrlsMetDatum } from "./sitemap-urls";
import type { createServiceClient } from "./supabase-service";

/**
 * Eén bron voor het indienen van URL's bij IndexNow.
 *
 * Reden (6-sep-2026): de sleutel, de host en het dagbudget stonden los in
 * `app/api/cron/indexing/route.ts` en nog een keer in
 * `app/api/admin/indexing/submit/route.ts`, met allebei hun eigen kopie van de
 * selectie- en bijwerklogica. Twee kopieën van een cijfer dat maar op één
 * plek mag staan.
 *
 * IndexNow bereikt Bing en Yandex. ChatGPT-zoeken leunt op Bing, dus dit is de
 * enige route waarlangs nieuwe pagina's daar snel terechtkomen. De sleutel
 * staat publiek op https://www.waarblijfthet.nl/<sleutel>.txt en is geen
 * geheim: dat is precies hoe het protocol werkt.
 */

export const INDEXNOW_KEY = "4ace44fac0c44918a2929428e9b757c5";
export const HOST = "www.waarblijfthet.nl";

/** Zelf opgelegd plafond per dag. IndexNow zelf staat 10.000 per call toe. */
export const DAGELIJKS_LIMIET = 200;

/**
 * Een URL die vandaag al is ingediend dienen we niet nog een keer in, ook niet
 * als de inhoud daarna veranderde. Anders levert één deploy met tien
 * herschreven artikelen tien indieningen per artikel op zodra de job vaker
 * draait.
 */
const COOLDOWN_UREN = 20;

/**
 * Een URL die Google als niet-geïndexeerd markeert krijgt na deze periode nog
 * een poging. Zonder deze grens zou zo'n URL elke dag opnieuw worden
 * ingediend en het dagbudget opeten voordat een nieuw artikel aan de beurt is.
 */
const HERKANS_DAGEN = 14;

type Supabase = ReturnType<typeof createServiceClient>;

export interface IndexingRij {
  url: string;
  status: string;
  last_submitted_at: string | null;
  submit_count: number | null;
}

export type Reden = "nieuw" | "gewijzigd" | "herkansing" | "fout";

export interface Kandidaat {
  url: string;
  reden: Reden;
}

/** Volgorde waarin het dagbudget verdeeld wordt. Nieuw gaat altijd voor. */
const REDEN_VOLGORDE: Record<Reden, number> = {
  nieuw: 0,
  gewijzigd: 1,
  fout: 2,
  herkansing: 3,
};

/**
 * Bepaalt welke URL's ingediend moeten worden, en waarom.
 *
 * Losse pure functie zodat de regels te lezen en te testen zijn zonder
 * database. `nu` is een parameter en niet `new Date()` binnenin, om dezelfde
 * reden.
 */
export function kiesTeIndienen(
  rijen: IndexingRij[],
  lastmodPerUrl: Map<string, string | null>,
  nu: Date
): Kandidaat[] {
  const cooldownGrens = nu.getTime() - COOLDOWN_UREN * 3600_000;
  const herkansGrens = nu.getTime() - HERKANS_DAGEN * 24 * 3600_000;

  const kandidaten: Kandidaat[] = [];

  for (const rij of rijen) {
    const ingediendOp = rij.last_submitted_at ? Date.parse(rij.last_submitted_at) : null;

    // Nooit ingediend: altijd de eerste in de rij.
    if (ingediendOp === null) {
      kandidaten.push({ url: rij.url, reden: "nieuw" });
      continue;
    }

    // Vandaag al ingediend, dan verder niets.
    if (ingediendOp > cooldownGrens) continue;

    const lastmod = lastmodPerUrl.get(rij.url) ?? null;
    const gewijzigdNaIndiening =
      lastmod !== null && Date.parse(`${lastmod}T23:59:59Z`) > ingediendOp;

    if (gewijzigdNaIndiening) {
      kandidaten.push({ url: rij.url, reden: "gewijzigd" });
      continue;
    }

    if (rij.status === "error") {
      kandidaten.push({ url: rij.url, reden: "fout" });
      continue;
    }

    if (rij.status === "not_indexed" && ingediendOp < herkansGrens) {
      kandidaten.push({ url: rij.url, reden: "herkansing" });
    }
  }

  kandidaten.sort((a, b) => REDEN_VOLGORDE[a.reden] - REDEN_VOLGORDE[b.reden]);
  return kandidaten;
}

export interface IndienResultaat {
  ingediend: number;
  overgeslagen: number;
  perReden: Record<string, number>;
  fout: string | null;
  /** Regels voor het logboek in de admin en in de cron-uitvoer. */
  log: string[];
}

/**
 * Zet alle URL's uit `getAllUrlsMetDatum()` in de tabel. Bestaande rijen blijft
 * dit ongemoeid laten, dus een URL die al `indexed` is verliest zijn status
 * niet.
 */
export async function synchroniseer(supabase: Supabase): Promise<number> {
  const urls = getAllUrlsMetDatum();
  const rows = urls.map((u) => ({ url: u.url, status: "pending" }));
  await supabase
    .from("google_indexing")
    .upsert(rows, { onConflict: "url", ignoreDuplicates: true });
  return urls.length;
}

/**
 * Kiest de URL's, dient ze in één call in bij IndexNow en werkt de tabel bij.
 *
 * `alleenDeze` is voor de knop in de admin waarmee Jarno losse URL's kan
 * indienen; dan slaan we de selectie over maar houden we het dagbudget wel aan.
 */
export async function dienIn(
  supabase: Supabase,
  opties: { alleenDeze?: string[]; nu?: Date } = {}
): Promise<IndienResultaat> {
  const nu = opties.nu ?? new Date();
  const log: string[] = [];
  const perReden: Record<string, number> = {};

  const dagstart = new Date(nu);
  dagstart.setHours(0, 0, 0, 0);

  const { count: vandaagIngediend } = await supabase
    .from("google_indexing")
    .select("*", { count: "exact", head: true })
    .gte("last_submitted_at", dagstart.toISOString());

  const resterend = DAGELIJKS_LIMIET - (vandaagIngediend ?? 0);
  if (resterend <= 0) {
    log.push(`Dagbudget van ${DAGELIJKS_LIMIET} bereikt, niets ingediend.`);
    return { ingediend: 0, overgeslagen: 0, perReden: perReden, fout: null, log: log };
  }

  let urls: string[];

  if (opties.alleenDeze && opties.alleenDeze.length > 0) {
    urls = opties.alleenDeze.slice(0, resterend);
    perReden.handmatig = urls.length;
  } else {
    const { data, error } = await supabase
      .from("google_indexing")
      .select("url, status, last_submitted_at, submit_count");

    if (error) {
      return {
        ingediend: 0,
        overgeslagen: 0,
        perReden: perReden,
        fout: `Ophalen mislukt: ${error.message}`,
        log: [`Ophalen mislukt: ${error.message}`],
      };
    }

    const lastmodPerUrl = new Map(
      getAllUrlsMetDatum().map((u) => [u.url, u.lastmod] as [string, string | null])
    );
    const kandidaten = kiesTeIndienen((data ?? []) as IndexingRij[], lastmodPerUrl, nu);

    for (const k of kandidaten) {
      perReden[k.reden] = (perReden[k.reden] ?? 0) + 1;
    }
    urls = kandidaten.slice(0, resterend).map((k) => k.url);
  }

  if (urls.length === 0) {
    log.push("Niets te indienen.");
    return { ingediend: 0, overgeslagen: 0, perReden: perReden, fout: null, log: log };
  }

  let res: Response;
  try {
    res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
  } catch (err) {
    const melding = `Netwerkfout naar IndexNow: ${String(err)}`;
    await markeerFout(supabase, urls, melding);
    return {
      ingediend: 0,
      overgeslagen: urls.length,
      perReden: perReden,
      fout: melding,
      log: [melding],
    };
  }

  if (!(res.ok || res.status === 202)) {
    const body = await res.text();
    const melding = `IndexNow gaf ${res.status}: ${body.slice(0, 300)}`;
    await markeerFout(supabase, urls, melding);
    return {
      ingediend: 0,
      overgeslagen: urls.length,
      perReden: perReden,
      fout: melding,
      log: [melding],
    };
  }

  // Bijwerken in één schrijfactie in plaats van twee query's per URL. Dat was
  // bij 200 URL's 400 heen-en-weertjes naar Supabase binnen het tijdslimiet van
  // de functie, en dat past niet.
  const { data: bestaand } = await supabase
    .from("google_indexing")
    .select("url, submit_count")
    .in("url", urls);

  const telling = new Map(
    ((bestaand ?? []) as { url: string; submit_count: number | null }[]).map(
      (r) => [r.url, r.submit_count ?? 0] as [string, number]
    )
  );

  const tijdstip = nu.toISOString();
  const { error: schrijfFout } = await supabase.from("google_indexing").upsert(
    urls.map((url) => ({
      url: url,
      status: "submitted",
      last_submitted_at: tijdstip,
      error_message: null,
      submit_count: (telling.get(url) ?? 0) + 1,
    })),
    { onConflict: "url" }
  );

  if (schrijfFout) {
    const melding = `Ingediend bij IndexNow, maar bijwerken mislukte: ${schrijfFout.message}`;
    log.push(melding);
    return {
      ingediend: urls.length,
      overgeslagen: 0,
      perReden: perReden,
      fout: melding,
      log: log,
    };
  }

  const uitsplitsing = Object.entries(perReden)
    .map(([reden, aantal]) => `${aantal} ${reden}`)
    .join(", ");
  log.push(`${urls.length} URL's ingediend bij IndexNow${uitsplitsing ? ` (${uitsplitsing})` : ""}.`);

  return { ingediend: urls.length, overgeslagen: 0, perReden: perReden, fout: null, log: log };
}

async function markeerFout(supabase: Supabase, urls: string[], melding: string) {
  await supabase
    .from("google_indexing")
    .update({ status: "error", error_message: melding.slice(0, 500) })
    .in("url", urls);
}

/** Eén regel in `cron_runs`, zodat een stille mislukking zichtbaar wordt. */
export async function logRun(
  supabase: Supabase,
  job: string,
  status: string,
  result: Record<string, unknown>,
  durationMs: number
) {
  await supabase.from("cron_runs").insert({
    job: job,
    status: status,
    result: result,
    duration_ms: durationMs,
  });
}
