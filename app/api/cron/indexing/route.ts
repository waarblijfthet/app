import { NextRequest, NextResponse } from "next/server";
import { getAllUrls } from "@/lib/sitemap-urls";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";

const DAGELIJKS_LIMIET = 200;

export async function GET(request: NextRequest) {
  // Beveiligd met CRON_SECRET header (Vercel Cron stuurt deze automatisch)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const log: string[] = [];

  // ── 1. Sync ──
  const urls = getAllUrls();
  const rows = urls.map((url) => ({ url, status: "pending" }));
  await supabase
    .from("google_indexing")
    .upsert(rows, { onConflict: "url", ignoreDuplicates: true });
  log.push(`Sync: ${urls.length} URLs`);

  // ── 2. Submit ──
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  const { count: vandaagIngediend } = await supabase
    .from("google_indexing")
    .select("*", { count: "exact", head: true })
    .gte("last_submitted_at", vandaag.toISOString());

  const resterend = DAGELIJKS_LIMIET - (vandaagIngediend ?? 0);

  if (resterend > 0) {
    const { data: toSubmit } = await supabase
      .from("google_indexing")
      .select("url")
      .in("status", ["pending", "not_indexed", "error"])
      .order("created_at", { ascending: true })
      .limit(resterend);

    const submitUrls = (toSubmit ?? []).map((r: { url: string }) => r.url);

    if (submitUrls.length > 0) {
      let token: string;
      try {
        token = await getGoogleAuthToken();
      } catch (err) {
        log.push(`Submit mislukt (auth): ${String(err)}`);
        return NextResponse.json({ ok: true, log });
      }

      let submitted = 0;
      for (const url of submitUrls) {
        try {
          const res = await fetch(
            "https://indexing.googleapis.com/v3/urlNotifications:publish",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
              body: JSON.stringify({ url, type: "URL_UPDATED" }),
            }
          );
          if (res.ok) {
            await supabase
              .from("google_indexing")
              .update({ status: "submitted", last_submitted_at: new Date().toISOString(), error_message: null })
              .eq("url", url);
            submitted++;
          } else {
            const err = await res.text();
            await supabase
              .from("google_indexing")
              .update({ status: "error", error_message: `${res.status}: ${err.slice(0, 300)}` })
              .eq("url", url);
          }
        } catch (err) {
          await supabase
            .from("google_indexing")
            .update({ status: "error", error_message: String(err).slice(0, 300) })
            .eq("url", url);
        }
      }
      log.push(`Submit: ${submitted}/${submitUrls.length} ingediend`);
    } else {
      log.push("Submit: niets te indienen");
    }
  } else {
    log.push("Submit: dagelijks limiet bereikt");
  }

  // ── 3. Inspect (eerste 50 submitted) ──
  const { data: toInspect } = await supabase
    .from("google_indexing")
    .select("url")
    .in("status", ["submitted", "not_indexed"])
    .order("last_submitted_at", { ascending: true })
    .limit(50);

  const inspectUrls = (toInspect ?? []).map((r: { url: string }) => r.url);

  if (inspectUrls.length > 0) {
    let token: string;
    try {
      token = await getGoogleAuthToken();
    } catch (err) {
      log.push(`Inspect mislukt (auth): ${String(err)}`);
      return NextResponse.json({ ok: true, log });
    }

    let inspected = 0;
    for (const url of inspectUrls) {
      try {
        const res = await fetch(
          "https://searchconsole.googleapis.com/v1/urlInspectionResult:inspect",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: "https://www.waarblijfthet.nl/" }),
          }
        );
        if (res.ok) {
          const data = await res.json() as { inspectionResult?: { indexStatusResult?: { verdict?: string; coverageState?: string; lastCrawlTime?: string } } };
          const result = data.inspectionResult?.indexStatusResult;
          const verdict = result?.verdict ?? null;
          let status = "submitted";
          if (verdict === "PASS") status = "indexed";
          else if (verdict === "FAIL") status = "not_indexed";
          await supabase
            .from("google_indexing")
            .update({ status, verdict, coverage_state: result?.coverageState ?? null, last_inspected_at: new Date().toISOString(), last_crawled_at: result?.lastCrawlTime ?? null })
            .eq("url", url);
          inspected++;
        }
      } catch {
        // stil falen per URL
      }
    }
    log.push(`Inspect: ${inspected}/${inspectUrls.length} gecheckt`);
  } else {
    log.push("Inspect: niets te inspecteren");
  }

  return NextResponse.json({ ok: true, log });
}
