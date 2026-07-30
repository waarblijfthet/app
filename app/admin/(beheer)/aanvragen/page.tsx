import { getAanvragen } from "@/app/admin/data";
import AanvragenTabblad from "@/app/admin/components/AanvragenTabblad";

export const metadata = { title: "Aanvragen | Beheer", robots: "noindex, nofollow" };

export default async function AanvragenPagina() {
  const aanvragen = await getAanvragen();
  return <AanvragenTabblad aanvragen={aanvragen} />;
}
