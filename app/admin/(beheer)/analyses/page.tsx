import { getQuizResultaten } from "@/app/admin/data";
import QuizResultatenTabblad from "@/app/admin/components/QuizResultatenTabblad";

export const metadata = { title: "Analyses | Beheer", robots: "noindex, nofollow" };

export default async function AnalysesPagina() {
  const resultaten = await getQuizResultaten();
  return <QuizResultatenTabblad resultaten={resultaten} />;
}
