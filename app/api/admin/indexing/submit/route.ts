import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const INDEXNOW_KEY = "4ace44fac0c44918a2929428e9b757c5";
const HOST = "www.waarblijfthet.nl";
const DAGELIJKS_LIMIET = 200;

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Tel hoeveel er vandaag al ingediend zijn
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  const { count: vandaagIngediend } = await supabase
    .from("google_indexing")
    .select("*", { count: "exact", head: true })
    .gte("last_submitted_at", vandaag.toISOString());

  const resterend = DAGELIJKS_LIMIET - (vandaagIngediend ?? 0);

  if (resterend <= 0) {
    return NextResponse.json(
      { error: `Dagelijks limiet van ${DAGELIJKS_LIMIET} bereikt`, submitted: 0, skipped: 0, errors: [] },
      { status: 429 }
    );
  }

  // URLs ophalen
  let urls: string[] = [];
  try {
    const body = await request.json() as { urls?: string[] };
    if (body.urls && body.urls.length > 0) {
      urls = body.urls.slice(0, resterend);
    }
  } catch {
    // geen body
  }

  if (urls.length === 0) {
    const { data } = await supabase
      .from("google_indexing")
      .select("url")
      .in("status", ["pending", "not_indexed", "error"])
      .order("created_at", { ascending: true })
      .limit(resterend);

    urls = (data ?? []).map((r: { url: string }) => r.url);
  }

  if (urls.length === 0) {
    return NextResponse.json({ submitted: 0, skipped: 0, errors: [] });
  }

  const errors: string[] = [];

  // IndexNow — batch submit (max 10.000 per call, wij doen alles in één keer)
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (res.ok || res.status === 202) {
      // Alles succesvol ingediend — update Supabase
      const nu = new Date().toISOString();
      for (const url of urls) {
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

      return NextResponse.json({ submitted: urls.length, skipped: 0, errors: [] });
    } else {
      const errBody = await res.text();
      const errMsg = `IndexNow ${res.status}: ${errBody.slice(0, 300)}`;
      errors.push(errMsg);

      // Zet alle URLs op error
      for (const url of urls) {
        await supabase
          .from("google_indexing")
          .update({ status: "error", error_message: errMsg })
          .eq("url", url);
      }

      return NextResponse.json({ submitted: 0, skipped: urls.length, errors });
    }
  } catch (err) {
    const errMsg = `Netwerkfout: ${String(err)}`;
    errors.push(errMsg);
    for (const url of urls) {
      await supabase
        .from("google_indexing")
        .update({ status: "error", error_message: errMsg })
        .eq("url", url);
    }
    return NextResponse.json({ submitted: 0, skipped: urls.length, errors });
  }
}
