import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const STATUS_VOLGORDE: Record<string, number> = {
  not_indexed: 0,
  error: 1,
  pending: 2,
  submitted: 3,
  indexed: 4,
};

interface IndexingRow {
  id: string;
  url: string;
  status: string;
  verdict: string | null;
  coverage_state: string | null;
  last_submitted_at: string | null;
  last_inspected_at: string | null;
  last_crawled_at: string | null;
  submit_count: number;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

interface CronRun {
  ran_at: string;
  status: string;
  duration_ms: number | null;
  result: Record<string, unknown> | null;
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("google_indexing")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as IndexingRow[];

  rows.sort((a, b) => {
    const oa = STATUS_VOLGORDE[a.status] ?? 99;
    const ob = STATUS_VOLGORDE[b.status] ?? 99;
    return oa - ob;
  });

  const summary = {
    total: rows.length,
    pending: rows.filter((r) => r.status === "pending").length,
    submitted: rows.filter((r) => r.status === "submitted").length,
    indexed: rows.filter((r) => r.status === "indexed").length,
    not_indexed: rows.filter((r) => r.status === "not_indexed").length,
    error: rows.filter((r) => r.status === "error").length,
  };

  // Laatste cron run ophalen
  const { data: cronData } = await supabase
    .from("cron_runs")
    .select("ran_at, status, result, duration_ms")
    .eq("job", "indexing-inspect")
    .order("ran_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ rows, summary, lastCronRun: (cronData ?? null) as CronRun | null });
}
