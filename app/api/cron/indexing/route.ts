import { NextRequest, NextResponse } from "next/server";
import { getAllUrls } from "@/lib/sitemap-urls";
import { createServiceClient } from "@/lib/supabase-service";

const INDEXNOW_KEY = "4ace44fac0c44918a2929428e9b757c5";
const HOST = "www.waarblijfthet.nl";
const DAGELIJKS_LIMIET = 200;

export async function GET(request: NextRequest) {
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

  // ── 2. Submit via IndexNow ──
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
      try {
        const res = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: submitUrls,
          }),
        });

        const nu = new Date().toISOString();
        if (res.ok || res.status === 202) {
          for (const url of submitUrls) {
            const { data: bestaand } = await supabase
              .from("google_indexing")
              .select("submit_count")
              .eq("url", url)
              .single();
            await supabase
              .from("google_indexing")
              .update({
                status: "submitted",
                last_submitted_at: nu,
                error_message: null,
                submit_count: ((bestaand?.submit_count as number) ?? 0) + 1,
              })
              .eq("url", url);
          }
          log.push(`Submit: ${submitUrls.length} URLs via IndexNow`);
        } else {
          const errBody = await res.text();
          log.push(`Submit mislukt: IndexNow ${res.status} ${errBody.slice(0, 200)}`);
        }
      } catch (err) {
        log.push(`Submit mislukt: ${String(err)}`);
      }
    } else {
      log.push("Submit: niets te indienen");
    }
  } else {
    log.push("Submit: dagelijks limiet bereikt");
  }

  return NextResponse.json({ ok: true, log });
}
