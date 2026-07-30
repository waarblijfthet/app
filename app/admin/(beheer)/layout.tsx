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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  if (!isEmailAllowed(user.email)) redirect("/admin/login");

  const tellingen = await getBadgeTellingen();

  return (
    <AdminShell email={user.email ?? ""} tellingen={tellingen}>
      {children}
    </AdminShell>
  );
}
