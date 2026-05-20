import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminNav from "./components/AdminNav";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin — Waar blijft het",
  robots: "noindex, nofollow",
};

export interface Lead {
  id: string;
  email: string;
  naam: string | null;
  bron: string;
  created_at: string;
  toestemming_marketing: boolean;
  quiz_voltooid: boolean;
}

export interface QuizResultaat {
  id: string;
  lead_id: string | null;
  created_at: string;
  woonsituatie: string | null;
  aantal_kinderen: number;
  auto_situatie: string | null;
  totaal_inkomen_berekend: number | null;
  totaal_uitgaven_berekend: number | null;
  maandelijks_over_berekend: number | null;
  benchmark_over_verwacht: number | null;
  verschil_met_benchmark: number | null;
  grootste_afwijking: string | null;
  verdict: string | null;
  wonen_huur_hypotheek: number | null;
  wonen_energie: number | null;
  wonen_internet_tv: number | null;
  boodschappen: number | null;
  verzekering_zorg_per_persoon: number | null;
  verzekering_overig: number | null;
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [{ data: leads }, { data: quizResultaten }] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("quiz_resultaten")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <AdminNav email={user.email ?? ""} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdminClient
          leads={(leads as Lead[]) ?? []}
          quizResultaten={(quizResultaten as QuizResultaat[]) ?? []}
        />
      </main>
    </div>
  );
}
