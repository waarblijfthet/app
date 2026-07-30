import { getLeads } from "@/app/admin/data";
import LeadsTabblad from "@/app/admin/components/LeadsTabblad";

export const metadata = { title: "Leads | Beheer", robots: "noindex, nofollow" };

export default async function LeadsPagina() {
  const leads = await getLeads();
  return <LeadsTabblad leads={leads} />;
}
