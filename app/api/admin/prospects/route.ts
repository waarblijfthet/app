import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { bouwWachtrijVanUrl } from "@/lib/prospects/crawler";
import { zoekWebsites, ZoekBron } from "@/lib/prospects/search";
import { Doelgroep, DOELGROEPEN, GevondenProspect, WachtrijItem } from "@/lib/prospects/types";
import { slaProspectsOp } from "@/lib/prospects/opslag";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const MAX_SITES = 60;

function ongeldigeDoelgroep(d: string): boolean {
  return d !== "auto" && !DOELGROEPEN.includes(d as Doelgroep);
}

// GET /api/admin/prospects — jobs + te reviewen prospects
// GET /api/admin/prospects?jobId=xxx — één job met bijbehorende prospects
export async function GET(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = await createClient();
  const jobId = req.nextUrl.searchParams.get("jobId");

  if (jobId) {
    const { data: job, error } = await supabase
      .from("prospect_jobs").select("*").eq("id", jobId).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    const { data: prospects } = await supabase
      .from("prospects").select("*").eq("job_id", jobId)
      .order("created_at", { ascending: false });
    return NextResponse.json({ job, prospects: prospects ?? [] });
  }

  const { data: jobs, error: jobsError } = await supabase
    .from("prospect_jobs").select("*")
    .order("created_at", { ascending: false }).limit(10);
  if (jobsError) {
    return NextResponse.json(
      { error: "Tabellen ontbreken. Draai eerst supabase/prospect_zoeker.sql in de Supabase SQL-editor." },
      { status: 500 }
    );
  }
  const { data: prospects } = await supabase
    .from("prospects").select("*").eq("status", "gevonden")
    .order("created_at", { ascending: false }).limit(200);
  return NextResponse.json({ jobs: jobs ?? [], prospects: prospects ?? [] });
}

// POST /api/admin/prospects — nieuwe zoekopdracht starten
// Body: { type: "url" | "zoekwoorden", invoer: string, doelgroep: string }
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = await createClient();
  const { type, invoer, doelgroep } = await req.json();

  if (type !== "url" && type !== "zoekwoorden") {
    return NextResponse.json({ error: "type moet 'url' of 'zoekwoorden' zijn" }, { status: 400 });
  }
  if (!invoer || typeof invoer !== "string" || !invoer.trim()) {
    return NextResponse.json({ error: "invoer ontbreekt" }, { status: 400 });
  }
  if (typeof doelgroep !== "string" || ongeldigeDoelgroep(doelgroep)) {
    return NextResponse.json({ error: "ongeldige doelgroep" }, { status: 400 });
  }

  const vasteDoelgroep = doelgroep === "auto" ? null : (doelgroep as Doelgroep);
  const robotsCache = new Map<string, string[]>();
  let wachtrij: WachtrijItem[] = [];
  let directeProspects: GevondenProspect[] = [];
  let jsGerenderd = false;

  if (type === "url") {
    const urls = invoer.split("\n").map((r: string) => r.trim()).filter(Boolean).slice(0, 3);
    for (const ruwe of urls) {
      const url = ruwe.startsWith("http") ? ruwe : "https://" + ruwe;
      try {
        new URL(url);
      } catch {
        return NextResponse.json({ error: `Ongeldige URL: ${ruwe}` }, { status: 400 });
      }
      const resultaat = await bouwWachtrijVanUrl(url, vasteDoelgroep, robotsCache, MAX_SITES);
      wachtrij.push(...resultaat.wachtrij);
      directeProspects.push(...resultaat.directeProspects);
      if (resultaat.jsGerenderd) jsGerenderd = true;
    }
    wachtrij = wachtrij.slice(0, MAX_SITES);
  } else {
    // Elke regel is een aparte zoekopdracht, bijvoorbeeld "relatietherapeut Utrecht".
    const zoekregels = invoer.split("\n").map((r: string) => r.trim()).filter(Boolean).slice(0, 10);
    const gezien = new Set<string>();
    let laatsteBron: ZoekBron = "geen";
    for (const regel of zoekregels) {
      if (wachtrij.length >= MAX_SITES) break;
      const resultaat = await zoekWebsites(regel, MAX_SITES);
      laatsteBron = resultaat.bron;
      for (const item of resultaat.wachtrij) {
        if (gezien.has(item.url)) continue;
        gezien.add(item.url);
        wachtrij.push(item);
        if (wachtrij.length >= MAX_SITES) break;
      }
    }
    if (wachtrij.length === 0) {
      const uitleg =
        laatsteBron === "geen"
          ? " Er is nog geen zoeksleutel ingesteld. Voeg BRAVE_SEARCH_API_KEY toe aan de Vercel-omgevingsvariabelen voor betrouwbaar zoeken, of plak een overzichtspagina-URL."
          : " De zoekmachine gaf geen bruikbare resultaten terug (datacenter-IP's worden vaak geblokkeerd). Met BRAVE_SEARCH_API_KEY in Vercel werkt dit betrouwbaar.";
      return NextResponse.json(
        { error: "Zoeken leverde niets op." + uitleg },
        { status: 422 }
      );
    }
  }

  if (wachtrij.length === 0 && directeProspects.length === 0) {
    const extra = jsGerenderd
      ? " Deze lijst lijkt met JavaScript geladen en heeft geen bruikbare sitemap, dus de namen zijn niet uit de broncode te halen."
      : "";
    return NextResponse.json(
      { error: "Geen profielen of e-mailadressen gevonden op deze pagina. Controleer of de URL klopt en publiek toegankelijk is." + extra },
      { status: 422 }
    );
  }

  const { data: job, error } = await supabase
    .from("prospect_jobs")
    .insert({
      type,
      invoer: invoer.trim(),
      doelgroep,
      status: wachtrij.length > 0 ? "wachtrij" : "klaar",
      wachtrij,
      totaal: wachtrij.length,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Opslaan mislukt. Draai eerst supabase/prospect_zoeker.sql in de Supabase SQL-editor. (" + error.message + ")" },
      { status: 500 }
    );
  }

  const direct = await slaProspectsOp(supabase, job.id, directeProspects);
  if (direct > 0) {
    await supabase.from("prospect_jobs")
      .update({ gevonden: direct, updated_at: new Date().toISOString() })
      .eq("id", job.id);
  }

  return NextResponse.json({ job: { ...job, gevonden: direct }, jsGerenderd }, { status: 201 });
}

// DELETE /api/admin/prospects?id=xxx — job en niet-goedgekeurde prospects opruimen
export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = await createClient();
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id ontbreekt" }, { status: 400 });

  const { error } = await supabase.from("prospect_jobs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
