import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";

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
const BATCH_SIZE = 50;

export async function GET(request: NextRequest) {
  // Vercel stuurt automatisch Authorization: Bearer <CRON_SECRET>
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  const supabase = createServiceClient();

  // Haal URLs op die gecheckt moeten worden
  const { data: urlRows } = await supabase
    .from("google_indexing")
    .select("url")
    .in("status", ["submitted", "not_indexed", "pending"])
    .order("last_inspected_at", { ascending: true, nullsFirst: true })
    .limit(BATCH_SIZE);

  const urls = (urlRows ?? []).map((r: { url: string }) => r.url);

  if (urls.length === 0) {
    await logRun(supabase, "ok", { inspected: 0, indexed: 0, not_indexed: 0, errors: 0 }, Date.now() - start);
    return NextResponse.json({ inspected: 0 });
  }

  let token: string;
  try {
    token = await getGoogleAuthToken();
  } catch (err) {
    await logRun(supabase, "error", { error: String(err) }, Date.now() - start);
    return NextResponse.json({ error: `Auth mislukt: ${String(err)}` }, { status: 500 });
  }

  let inspected = 0;
  let indexed = 0;
  let not_indexed = 0;
  let errors = 0;

  for (const url of urls) {
    try {
      const res = await fetch(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
        }
      );

      if (!res.ok) {
        const errBody = await res.text();
        await supabase
          .from("google_indexing")
          .update({
            error_message: `inspect ${res.status}: ${errBody}`.slice(0, 500),
            last_inspected_at: new Date().toISOString(),
          })
          .eq("url", url);
        errors++;
        continue;
      }

      const data = await res.json() as InspectResult;
      const result = data.inspectionResult?.indexStatusResult;
      const verdict = result?.verdict ?? null;
      const coverageState = result?.coverageState ?? null;
      const lastCrawlTime = result?.lastCrawlTime ?? null;

      let status: string;
      if (verdict === "PASS") {
        status = "indexed";
        indexed++;
      } else if (verdict === "FAIL") {
        status = "not_indexed";
        not_indexed++;
      } else {
        status = "submitted";
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
      errors++;
      await supabase
        .from("google_indexing")
        .update({
          error_message: String(err).slice(0, 500),
          last_inspected_at: new Date().toISOString(),
        })
        .eq("url", url);
    }
  }

  const result = { inspected, indexed, not_indexed, errors };
  await logRun(supabase, errors > 0 && inspected === 0 ? "error" : "ok", result, Date.now() - start);

  return NextResponse.json(result);
}

async function logRun(
  supabase: ReturnType<typeof import("@/lib/supabase-service").createServiceClient>,
  status: string,
  result: Record<string, unknown>,
  durationMs: number
) {
  await supabase.from("cron_runs").insert({
    job: "indexing-inspect",
    status,
    result,
    duration_ms: durationMs,
  });
}
