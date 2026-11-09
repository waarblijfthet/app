import UitgavenscanVerloopTabblad from "@/app/admin/components/UitgavenscanVerloopTabblad";

export const metadata = { title: "Uitgavenscan | Beheer", robots: "noindex, nofollow" };

/**
 * Op verzoek van Jarno (9-nov-2026): per stap van de uitgavenscan zien of mensen starten en waar ze
 * afhaken, per bank en per apparaat. Gevoed door /api/admin/uitgavenscan-verloop.
 */
export default function UitgavenscanVerloopPagina() {
  return (
    <div>
      <h1 className="font-display text-2xl text-primary mb-1">Uitgavenscan</h1>
      <p className="font-body text-sm text-text-soft mb-5">
        Iedereen die de uitgavenscan opende: of ze een bank kozen, of hun bestand gelezen werd, tot welk scherm ze kwamen en of ze de Geldscan
        aanvroegen. Zonder bedragen of namen.
      </p>
      <UitgavenscanVerloopTabblad />
    </div>
  );
}
