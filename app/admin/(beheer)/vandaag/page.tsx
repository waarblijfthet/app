import VandaagDashboard from "@/app/admin/components/VandaagDashboard";

export const metadata = { title: "Vandaag | Beheer", robots: "noindex, nofollow" };

/**
 * Vervangt Funnel als startpagina van de admin (fase 4). Zes blokken, alle
 * gevoed door één route (/api/admin/vandaag). Zie
 * docs/admin-redesign-30-jul-2026.md sectie 6.
 */
export default function VandaagPagina() {
  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-4">Vandaag</h1>
      <VandaagDashboard />
    </div>
  );
}
