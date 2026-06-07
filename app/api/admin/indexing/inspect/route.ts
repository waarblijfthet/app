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
    return NextResponse.json({ inspected: 0, indexed: 0, not_indexed: 0, errors: [] });
  }

  let token: string;
  try {
    token = await getGoogleAuthToken();
  } catch (err) {
    return NextResponse.json(
      { error: `Google auth mislukt: ${String(err)}`, inspected: 0, indexed: 0, not_indexed: 0, errors: [] },
      { status: 500 }
    );
  }

  let inspected = 0;
  let indexed = 0;
  let not_indexed = 0;
  const errors: string[] = [];

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
          body: JSON.stringify({
            inspectionUrl: url,
            // Moet exact overeenkomen met de Search Console property.
            // URL prefix property:  https://www.waarblijfthet.nl/
            // Domain property:      sc-domain:waarblijfthet.nl
            siteUrl: process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ?? "sc-domain:waarblijfthet.nl",
          }),
        }
      );

      if (!res.ok) {
        const errBody = await res.text();
        errors.push(`${url}: ${res.status} ${errBody}`);
        await supabase
          .from("google_indexing")
          .update({
            error_message: `inspect ${res.status}: ${errBody.slice(0, 300)}`,
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
      errors.push(`${url}: ${String(err)}`);
    }
  }

  return NextResponse.json({ inspected, indexed, not_indexed, errors });
}
