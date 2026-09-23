import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { isEmailAllowed } from "@/lib/admin-auth";
import { getBadgeTellingen } from "@/app/admin/data";
import AdminShell from "@/app/admin/AdminShell";

/**
 * Gedeelde shell voor alle beveiligde /admin routes. Zit in een route-groep
 * "(beheer)" zodat /admin/login (buiten deze groep) niet door deze
 * auth-check heen hoeft: anders zou een uitgelogde bezoeker op /admin/login
 * in een oneindige redirect-lus terechtkomen (layout stuurt terug naar
 * /admin/login, dat opnieuw door dezelfde layout loopt).
 * Vervangt de tab-state in het oude AdminClient.tsx.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 3.
 */
export default async function BeheerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inlogcheck en badgetellingen tegelijk (23-sep-2026). Ze hangen niet van
  // elkaar af, en achter elkaar kostte dit bij elke adminpagina twee
  // rondjes naar Supabase in plaats van één. De tellingen worden pas getoond
  // als de check slaagt, dus er lekt niets naar een niet-ingelogde bezoeker.
  const supabase = await createClient();
  const [
    {
      data: { user },
    },
    tellingen,
  ] = await Promise.all([supabase.auth.getUser(), getBadgeTellingen()]);

  if (!user) redirect("/admin/login");
  if (!isEmailAllowed(user.email)) redirect("/admin/login");

  return (
    <AdminShell email={user.email ?? ""} tellingen={tellingen}>
      {children}
    </AdminShell>
  );
}
