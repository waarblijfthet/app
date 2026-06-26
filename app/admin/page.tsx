import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminNav from "./components/AdminNav";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin | Waar blijft het",
  robots: "noindex, nofollow",
};

export interface IntakeAanvraag {
  id: string;
  created_at: string;
  pakket: string;
  gezinssituatie: string | null;
  inkomen_bracket: string | null;
  grootste_knelpunt: string | null;
  analyse_gedaan: boolean | null;
  start_voorkeur: string | null;
  naam: string | null;
  email: string | null;
  status: string;
}

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

// Kolommen die de tabbladen daadwerkelijk gebruiken (zie interfaces hierboven).
// Expliciet projecteren i.p.v. select("*") scheelt data over de lijn.
const LEAD_KOLOMMEN = "id,email,naam,bron,created_at,toestemming_marketing,quiz_voltooid";
const QUIZ_KOLOMMEN =
  "id,lead_id,created_at,woonsituatie,aantal_kinderen,auto_situatie,totaal_inkomen_berekend,totaal_uitgaven_berekend,maandelijks_over_berekend,benchmark_over_verwacht,verschil_met_benchmark,grootste_afwijking,verdict,wonen_huur_hypotheek,wonen_energie,wonen_internet_tv,boodschappen,verzekering_zorg_per_persoon,verzekering_overig";
const AANVRAAG_KOLOMMEN =
  "id,created_at,pakket,gezinssituatie,inkomen_bracket,grootste_knelpunt,analyse_gedaan,start_voorkeur,naam,email,status";
const MAX_RIJEN = 1000;

export default async function AdminPage() {
  const supabase = await createClient();

  // Middleware (matcher /admin/:path*) heeft de auth al gevalideerd met getUser().
  // Hier lezen we de sessie lokaal uit de cookie (geen extra netwerk-rondje) puur
  // voor het e-mailadres in de balk; de redirect blijft als vangnet.
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) redirect("/admin/login");

  const [{ data: leads }, { data: quizResultaten }, { data: aanvragen }] =
    await Promise.all([
      supabase
        .from("leads")
        .select(LEAD_KOLOMMEN)
        .order("created_at", { ascending: false })
        .limit(MAX_RIJEN),
      supabase
        .from("quiz_resultaten")
        .select(QUIZ_KOLOMMEN)
        .order("created_at", { ascending: false })
        .limit(MAX_RIJEN),
      supabase
        .from("intake_aanvragen")
        .select(AANVRAAG_KOLOMMEN)
        .order("created_at", { ascending: false })
        .limit(MAX_RIJEN),
    ]);

  return (
    <div className="min-h-screen bg-background">
      <AdminNav email={user.email ?? ""} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdminClient
          leads={(leads as Lead[]) ?? []}
          quizResultaten={(quizResultaten as QuizResultaat[]) ?? []}
          aanvragen={(aanvragen as IntakeAanvraag[]) ?? []}
        />
      </main>
    </div>
  );
}
