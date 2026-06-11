import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { verzamelSiteProspects } from "@/lib/prospects/crawler";
import { slaProspectsOp } from "@/lib/prospects/opslag";
import { Doelgroep, WachtrijItem } from "@/lib/prospects/types";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Per aanroep maximaal dit aantal sites, binnen dit tijdsbudget.
// De admin-UI roept dit endpoint in een lus aan tot de wachtrij leeg is.
const MAX_SITES_PER_STAP = 3;
const TIJDSBUDGET_MS = 20_000;

// POST /api/admin/prospects/step
// Body: { jobId: string, stop?: boolean }
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = await createClient();
  const { jobId, stop } = await req.json();
  if (!jobId) return NextResponse.json({ error: "jobId ontbreekt" }, { status: 400 });

  const { data: job, error } = await supabase
    .from("prospect_jobs").select("*").eq("id", jobId).single();
  if (error || !job) return NextResponse.json({ error: "Job niet gevonden" }, { status: 404 });

  if (stop) {
    await supabase.from("prospect_jobs")
      .update({ status: "gestopt", updated_at: new Date().toISOString() })
      .eq("id", jobId)
      .in("status", ["wachtrij", "bezig"]);
    return NextResponse.json({ job: { ...job, status: "gestopt" }, klaar: true });
  }

  if (job.status !== "wachtrij" && job.status !== "bezig") {
    return NextResponse.json({ job, klaar: true });
  }

  const wachtrij: WachtrijItem[] = Array.isArray(job.wachtrij) ? job.wachtrij : [];
  const vasteDoelgroep: Doelgroep | null =
    job.doelgroep === "auto" ? null : (job.doelgroep as Doelgroep);

  const robotsCache = new Map<string, string[]>();
  const deadline = Date.now() + TIJDSBUDGET_MS;
  let verwerkt = job.verwerkt as number;
  let gevonden = job.gevonden as number;
  let dezeStap = 0;

  while (wachtrij.length > 0 && dezeStap < MAX_SITES_PER_STAP && Date.now() < deadline) {
    const item = wachtrij.shift();
    if (!item) break;
    try {
      const prospects = await verzamelSiteProspects(item.url, vasteDoelgroep, robotsCache, item.negeerDomein);
      gevonden += await slaProspectsOp(supabase, jobId, prospects);
    } catch {
      // één kapotte site mag de job niet stoppen
    }
    verwerkt += 1;
    dezeStap += 1;
  }

  const nieuweStatus = wachtrij.length === 0 ? "klaar" : "bezig";
  // Optimistic lock: alleen schrijven als de job sinds het inlezen niet door
  // een andere step-call is gewijzigd. Voorkomt dubbele crawls en het
  // overschrijven van een tussentijdse "stop".
  const { data: bijgewerkt, error: updateError } = await supabase
    .from("prospect_jobs")
    .update({
      wachtrij,
      verwerkt,
      gevonden,
      status: nieuweStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId)
    .eq("updated_at", job.updated_at)
    .in("status", ["wachtrij", "bezig"])
    .select()
    .single();

  if (updateError || !bijgewerkt) {
    // Geen rij bijgewerkt: een andere step was ons voor, of de job is gestopt.
    // De client moet stoppen om dubbel werk te vermijden.
    return NextResponse.json(
      { job, klaar: true, overgeslagen: true },
      { status: 200 }
    );
  }

  return NextResponse.json({
    job: bijgewerkt,
    klaar: nieuweStatus === "klaar",
  });
}
