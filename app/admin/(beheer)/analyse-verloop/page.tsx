import AnalyseVerloopTabblad from "@/app/admin/components/AnalyseVerloopTabblad";

export const metadata = { title: "Ingevulde analyses | Beheer", robots: "noindex, nofollow" };

/**
 * Op verzoek van Jarno (23-sep-2026): zien hoeveel analyses er gestart zijn,
 * welke schermen iemand heeft ingevuld en waar mensen afhaken. Gevoed door
 * /api/admin/analyse-verloop. Vervangt het afhaakblok uit FunnelTabblad.tsx,
 * dat sinds de zijmenu-shell van 30-jul-2026 door geen route meer werd geladen.
 */
export default function AnalyseVerloopPagina() {
  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-1">Ingevulde analyses</h1>
      <p className="font-body text-sm text-text-soft mb-5">
        Iedereen die de analyse startte, ook wie afhaakte: tot waar ze kwamen, wat ze invulden en wat ze daarna deden.
      </p>
      <AnalyseVerloopTabblad />
    </div>
  );
}
