import { getAanvragen, getContactKoppelingen } from "@/app/admin/data";
import AanvragenTabblad from "@/app/admin/components/AanvragenTabblad";

export const metadata = { title: "Aanvragen | Beheer", robots: "noindex, nofollow" };

export default async function AanvragenPagina() {
  const [aanvragen, koppelingen] = await Promise.all([getAanvragen(), getContactKoppelingen()]);
  return <AanvragenTabblad aanvragen={aanvragen} contactPerIntakeId={koppelingen.perIntakeId} />;
}
