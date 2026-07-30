import { getLeads, getContactKoppelingen } from "@/app/admin/data";
import LeadsTabblad from "@/app/admin/components/LeadsTabblad";

export const metadata = { title: "Leads | Beheer", robots: "noindex, nofollow" };

export default async function LeadsPagina() {
  const [leads, koppelingen] = await Promise.all([getLeads(), getContactKoppelingen()]);
  return <LeadsTabblad leads={leads} contactPerLeadId={koppelingen.perLeadId} />;
}
