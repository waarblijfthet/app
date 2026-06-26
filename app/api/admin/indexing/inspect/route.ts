import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface InspectResult {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      lastCrawlTime?: string;
    };
  };
}

const SITE_URL = "sc-domain:waarblijfthet.nl";

// Per aanroep verwerken we URLs tot dit tijdsbudget op is. De admin-UI roept
// dit endpoint daarna opnieuw aan tot alles gecheckt is (done = true). Zo
// blijven we ruim binnen de Vercel-functielimiet (maxDuration 60s) en kan de
// functie nooit hard timen op een platform-foutpagina (die geen JSON is).
const TIJDSBUDGET_MS = 45_000;
// Harde bovengrens aan URLs die we uit de wachtrij trekken per aanroep.
const MAX_PER_STAP = 25;
// Timeout per losse Google-call, zodat een hangende call het budget niet opeet.
const CALL_TIMEOUT_MS = 12_000;

async function fetchMetTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();

  // Expliciet meegegeven URLs hebben voorrang; anders trekken we uit de wachtrij.
  // runStartedAt = cutoff van deze lus-sessie. URLs die al na dat moment gecheckt
  // zijn, slaan we over. Zo eindigt de client-lus gegarandeerd (done = remaining 0).
  let urls: string[] = [];
  let uitWachtrij = false;
  let runStartedAt = new Date().toISOString();
  try {
    const body = (await request.json()) as { urls?: string[]; runStartedAt?: string };
    if (body.runStartedAt) runStartedAt = body.runStartedAt;
    if (body.urls && body.urls.length > 0) {
      urls = body.urls.slice(0, MAX_PER_STAP);
    }
  } catch {
    // geen body
  }

  // Filter op de wachtrij: open status én nog niet in deze lus-sessie gecheckt.
  const OPEN_STATUS = ["submitted", "not_indexed", "pending"];
  const NOG_NIET_GECHECKT = `last_inspected_at.is.null,last_inspected_at.lt.${runStartedAt}`;

  if (urls.length === 0) {
    uitWachtrij = true;
    const { data } = await supabase
      .from("google_indexing")
      .select("url")
      .in("status", OPEN_STATUS)
      .or(NOG_NIET_GECHECKT)
      .order("last_inspected_at", { ascending: true, nullsFirst: true })
      .limit(MAX_PER_STAP);

    urls = (data ?? []).map((r: { url: string }) => r.url);
  }

  if (urls.length === 0) {
    return NextResponse.json({
      inspected: 0,
      indexed: 0,
      not_indexed: 0,
      errors: [],
      urlResults: {},
      done: true,
      remaining: 0,
      runStartedAt,
      debug: { siteUrl: SITE_URL },
    });
  }

  // Token ophalen + controleren welk account erachter zit.
  let token: string;
  let tokenAccount = "onbekend";
  try {
    token = await getGoogleAuthToken();
    try {
      const infoRes = await fetchMetTimeout(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
        {},
        8_000
      );
      if (infoRes.ok) {
        const info = (await infoRes.json()) as { email?: string };
        tokenAccount = info.email ?? "onbekend";
      }
    } catch {
      // token-info niet kritisch
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Google auth mislukt: ${String(err)}`,
        inspected: 0,
        indexed: 0,
        not_indexed: 0,
        errors: [],
        done: true,
        remaining: 0,
        runStartedAt,
        debug: { siteUrl: SITE_URL, tokenAccount: "auth mislukt" },
      },
      { status: 500 }
    );
  }

  let inspected = 0;
  let indexed = 0;
  let not_indexed = 0;
  const errors: string[] = [];
  const urlResults: Record<string, string> = {};
  let budgetOp = false;

  for (const url of urls) {
    // Stop netjes voordat we het tijdsbudget overschrijden.
    if (Date.now() - start > TIJDSBUDGET_MS) {
      budgetOp = true;
      break;
    }

    try {
      const res = await fetchMetTimeout(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
        },
        CALL_TIMEOUT_MS
      );

      if (!res.ok) {
        const errBody = await res.text();
        const errMsg = `inspect ${res.status}: ${errBody}`;
        errors.push(`${url}: ${errMsg}`);
        urlResults[url] = `❌ ${res.status}`;
        await supabase
          .from("google_indexing")
          .update({
            error_message: errMsg.slice(0, 500),
            last_inspected_at: new Date().toISOString(),
          })
          .eq("url", url);
        continue;
      }

      const data = (await res.json()) as InspectResult;
      const result = data.inspectionResult?.indexStatusResult;

      const verdict = result?.verdict ?? null;
      const coverageState = result?.coverageState ?? null;
      const lastCrawlTime = result?.lastCrawlTime ?? null;

      let status: string;
      if (verdict === "PASS") {
        status = "indexed";
        indexed++;
        urlResults[url] = "✓ indexed";
      } else if (verdict === "FAIL") {
        status = "not_indexed";
        not_indexed++;
        urlResults[url] = `✗ not_indexed (${coverageState ?? "?"})`;
      } else {
        status = "submitted";
        urlResults[url] = `? verdict: ${verdict ?? "null"}`;
      }

      await supabase
        .from("google_indexing")
        .update({
          status,
          verdict,
          coverage_state: coverageState,
          last_inspected_at: new Date().toISOString(),
          last_crawled_at: lastCrawlTime ?? null,
          error_message: null,
        })
        .eq("url", url);

      inspected++;
    } catch (err) {
      const melding =
        err instanceof Error && err.name === "AbortError"
          ? "time-out na 12s"
          : String(err);
      errors.push(`${url}: ${melding}`);
      urlResults[url] = `❌ ${melding}`;
      await supabase
        .from("google_indexing")
        .update({
          error_message: melding.slice(0, 500),
          last_inspected_at: new Date().toISOString(),
        })
        .eq("url", url);
    }
  }

  // Hoeveel queue-URLs zijn er nog niet in deze lus-sessie gecheckt?
  let remaining = 0;
  if (uitWachtrij) {
    const { count } = await supabase
      .from("google_indexing")
      .select("*", { count: "exact", head: true })
      .in("status", OPEN_STATUS)
      .or(NOG_NIET_GECHECKT);
    remaining = count ?? 0;
  }

  const done = !uitWachtrij ? true : remaining === 0;

  return NextResponse.json({
    inspected,
    indexed,
    not_indexed,
    errors,
    urlResults,
    done,
    remaining,
    runStartedAt,
    debug: {
      siteUrl: SITE_URL,
      tokenAccount,
      urlsChecked: urls.length,
      budgetOp,
    },
  });
}
