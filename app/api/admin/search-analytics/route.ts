import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE_URL = "sc-domain:waarblijfthet.nl";
const ENDPOINT = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
  SITE_URL
)}/searchAnalytics/query`;
const CALL_TIMEOUT_MS = 15_000;
// Cache blijft een halve dag geldig; GSC-data verandert maar ~1x per dag.
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

type Mode = "site-queries" | "site-pages" | "page-queries";

interface Rij {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

async function fetchMetTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  let mode: Mode = "site-queries";
  let page: string | null = null;
  let days = 28;
  let refresh = false;
  const dataState = "final";
  try {
    const body = (await request.json()) as {
      mode?: Mode;
      page?: string;
      days?: number;
      refresh?: boolean;
    };
    if (body.mode) mode = body.mode;
    if (body.page) page = body.page;
    if (body.days && [7, 28, 90].includes(body.days)) days = body.days;
    if (body.refresh) refresh = true;
  } catch {
    // standaardwaarden
  }

  if (mode === "page-queries" && !page) {
    return NextResponse.json({ error: "Geen pagina opgegeven" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const cacheKey = `${mode}:${page ?? ""}:${days}:${dataState}`;

  // 1) Cache lezen (tenzij refresh)
  if (!refresh) {
    const { data: cached } = await supabase
      .from("gsc_search_analytics_cache")
      .select("rows, totals, range, fetched_at")
      .eq("cache_key", cacheKey)
      .maybeSingle();

    if (cached?.fetched_at) {
      const leeftijd = Date.now() - new Date(cached.fetched_at as string).getTime();
      if (leeftijd < CACHE_TTL_MS) {
        return NextResponse.json({
          rows: cached.rows ?? [],
          totals: cached.totals ?? null,
          range: cached.range ?? null,
          dataState,
          cached: true,
          debug: { siteUrl: SITE_URL, mode, cacheKey },
        });
      }
    }
  }

  // 2) Token ophalen
  let token: string;
  try {
    token = await getGoogleAuthToken();
  } catch (err) {
    return NextResponse.json(
      { error: `Google auth mislukt: ${String(err)}`, debug: { siteUrl: SITE_URL, mode } },
      { status: 500 }
    );
  }

  // 3) Request samenstellen
  const end = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 dagen marge (GSC-vertraging)
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const range = { startDate: ymd(start), endDate: ymd(end), days };

  const dimensions = mode === "site-pages" ? ["page"] : ["query"];
  const reqBody: Record<string, unknown> = {
    startDate: range.startDate,
    endDate: range.endDate,
    dimensions,
    rowLimit: 200,
    dataState,
  };
  if (mode === "page-queries" && page) {
    reqBody.dimensionFilterGroups = [
      { filters: [{ dimension: "page", operator: "equals", expression: page }] },
    ];
  }

  // 4) Aanroepen
  let res: Response;
  try {
    res = await fetchMetTimeout(
      ENDPOINT,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      },
      CALL_TIMEOUT_MS
    );
  } catch (err) {
    const melding =
      err instanceof Error && err.name === "AbortError" ? "time-out na 15s" : String(err);
    return NextResponse.json(
      { error: `Search Console aanroep mislukt: ${melding}`, debug: { siteUrl: SITE_URL, mode } },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const errBody = await res.text();
    let melding = `Search Console gaf ${res.status}`;
    try {
      const parsed = JSON.parse(errBody) as { error?: { message?: string; status?: string } };
      if (parsed.error?.message) melding = parsed.error.message;
      if (parsed.error?.status === "RESOURCE_EXHAUSTED") {
        melding = "Google-quota tijdelijk bereikt, probeer over 15 minuten opnieuw";
      }
    } catch {
      melding = `${melding}: ${errBody.slice(0, 200)}`;
    }
    return NextResponse.json(
      { error: melding, debug: { siteUrl: SITE_URL, mode } },
      { status: res.status }
    );
  }

  const data = (await res.json()) as { rows?: GscRow[] };
  const rows: Rij[] = (data.rows ?? []).map((r) => ({
    key: r.keys?.[0] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));

  // Totalen uit de rijen (let op: Google verbergt zeldzame zoekwoorden, dus dit
  // kan iets lager liggen dan het echte totaal; vermeld in de UI).
  const totClicks = rows.reduce((s, r) => s + r.clicks, 0);
  const totImpr = rows.reduce((s, r) => s + r.impressions, 0);
  const gewogenPos = totImpr > 0 ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / totImpr : 0;
  const totals = {
    clicks: totClicks,
    impressions: totImpr,
    ctr: totImpr > 0 ? totClicks / totImpr : 0,
    position: gewogenPos,
  };

  // 5) Cache wegschrijven (best-effort)
  await supabase
    .from("gsc_search_analytics_cache")
    .upsert(
      {
        cache_key: cacheKey,
        mode,
        page,
        days,
        data_state: dataState,
        rows,
        totals,
        range,
        fetched_at: new Date().toISOString(),
      },
      { onConflict: "cache_key" }
    );

  return NextResponse.json({
    rows,
    totals,
    range,
    dataState,
    cached: false,
    debug: { siteUrl: SITE_URL, mode, cacheKey },
  });
}
