import { NextResponse } from "next/server";
import { getAllUrls } from "@/lib/sitemap-urls";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const urls = getAllUrls();

  const rows = urls.map((url) => ({ url, status: "pending" }));

  const { error } = await supabase
    .from("google_indexing")
    .upsert(rows, { onConflict: "url", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { count } = await supabase
    .from("google_indexing")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ added: urls.length, total: count ?? 0 });
}
