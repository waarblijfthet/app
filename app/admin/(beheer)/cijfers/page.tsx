import { getLeads, getQuizResultaten } from "@/app/admin/data";
import OverzichtTabblad from "@/app/admin/components/OverzichtTabblad";

export const metadata = { title: "Cijfers | Beheer", robots: "noindex, nofollow" };

export default async function CijfersPagina() {
  const [leads, resultaten] = await Promise.all([getLeads(), getQuizResultaten()]);
  return <OverzichtTabblad leads={leads} resultaten={resultaten} />;
}
