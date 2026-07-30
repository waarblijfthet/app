export const metadata = { title: "Vandaag | Beheer", robots: "noindex, nofollow" };

/**
 * Placeholder. Het echte Vandaag-dashboard (te-doen-lijst, weekbudget,
 * week-op-week, replies per doelgroep, mini-trechter, activiteit) komt in
 * fase 4, zie docs/admin-redesign-30-jul-2026.md sectie 6.
 */
export default function VandaagPagina() {
  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-2">Vandaag</h1>
      <p className="font-body text-text-muted text-sm">
        Het dashboard komt in de volgende bouwfase. Gebruik tot die tijd
        Outreach, Aanvragen en Prospects rechtstreeks.
      </p>
    </div>
  );
}
