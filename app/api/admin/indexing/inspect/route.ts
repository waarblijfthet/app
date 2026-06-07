import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

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

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const supabase = createServiceClient();

  let urls: string[] = [];
  try {
    const body = await request.json() as { urls?: string[] };
    if (body.urls && body.urls.length > 0) {
      urls = body.urls.slice(0, 50);
    }
  } catch {
    // geen body
  }

  if (urls.length === 0) {
    const { data } = await supabase
      .from("google_indexing")
      .select("url")
      .in("status", ["submitted", "not_indexed"])
      .order("last_submitted_at", { ascending: true })
      .limit(50);

    urls = (data ?? []).map((r: { url: string }) => r.url);
  }

  if (urls.length === 0) {
    return NextResponse.json({ inspected: 0, indexed: 0, not_indexed: 0, errors: [], debug: { siteUrl: SITE_URL } });
  }

  // Haal token op + controleer welk account er achter zit
  let token: string;
  let tokenAccount = "onbekend";
  try {
    token = await getGoogleAuthToken();

    // Controleer welk Google-account dit token toebehoort
    try {
      const infoRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
      );
      if (infoRes.ok) {
        const info = await infoRes.json() as { email?: string; scope?: string };
        tokenAccount = info.email ?? "onbekend";
      }
    } catch {
      // token-info niet kritisch
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Google auth mislukt: ${String(err)}`,
        inspected: 0, indexed: 0, not_indexed: 0, errors: [],
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

  for (const url of urls) {
    try {
      const reqBody = { inspectionUrl: url, siteUrl: SITE_URL };

      const res = await fetch(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!res.ok) {
        const errBody = await res.text();
        // Volledige foutmelding opslaan (niet afkappen)
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

      const data = await res.json() as InspectResult;
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
      errors.push(`${url}: ${String(err)}`);
      urlResults[url] = `❌ ${String(err)}`;
    }
  }

  return NextResponse.json({
    inspected,
    indexed,
    not_indexed,
    errors,
    urlResults,
    debug: {
      siteUrl: SITE_URL,
      tokenAccount,
      urlsChecked: urls.length,
    },
  });
}
