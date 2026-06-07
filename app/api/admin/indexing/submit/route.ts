import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthToken } from "@/lib/google-auth";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

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
    // geen body of lege body — pak pending URLs
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

  let token: string;
  try {
    token = await getGoogleAuthToken();
  } catch (err) {
    return NextResponse.json(
      { error: `Google auth mislukt: ${String(err)}`, submitted: 0, skipped: 0, errors: [] },
      { status: 500 }
    );
  }

  let submitted = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const url of urls) {
    try {
      const res = await fetch(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, type: "URL_UPDATED" }),
        }
      );

      if (res.ok) {
        // Haal huidige submit_count op en hoog hem op
        const { data: bestaand } = await supabase
          .from("google_indexing")
          .select("submit_count")
          .eq("url", url)
          .single();

        await supabase
          .from("google_indexing")
          .update({
            status: "submitted",
            last_submitted_at: new Date().toISOString(),
            error_message: null,
            submit_count: ((bestaand?.submit_count as number) ?? 0) + 1,
          })
          .eq("url", url);

        submitted++;
      } else {
        const errBody = await res.text();
        errors.push(`${url}: ${res.status} ${errBody}`);

        await supabase
          .from("google_indexing")
          .update({
            status: "error",
            error_message: `${res.status}: ${errBody.slice(0, 300)}`,
          })
          .eq("url", url);

        skipped++;
      }
    } catch (err) {
      errors.push(`${url}: ${String(err)}`);
      await supabase
        .from("google_indexing")
        .update({ status: "error", error_message: String(err).slice(0, 300) })
        .eq("url", url);
      skipped++;
    }
  }

  return NextResponse.json({ submitted, skipped, errors });
}
