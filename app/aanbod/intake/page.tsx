import type { Metadata } from "next";
import { IntakeForm } from "./IntakeForm";
import { SITUATIE_OPTIES, INKOMEN_OPTIES } from "./opties";

export function generateMetadata(): Metadata {
  return {
    title: "Aanmelding | Waar blijft het",
    robots: { index: false, follow: false },
  };
}

/**
 * Zelfde situatiesleutel als lib/cta.ts (SituatieSleutel) en app/geldscan/page.tsx,
 * want de analyse-resultaatpagina en /geldscan geven hem allebei door aan deze
 * route. "gezin" en "zzp" staan er bewust niet bij: de analyse weet niet of de
 * kinderen jong of ouder zijn, en heeft geen zzp-vraag. Gokken op die twee zou
 * een antwoord voorspiegelen dat niemand heeft gegeven.
 */
const SITUATIE_LABEL_VOOR_SLEUTEL: Record<string, string> = {
  alleenstaand: SITUATIE_OPTIES[0],
  "alleenstaande-ouder": SITUATIE_OPTIES[1],
  stel: SITUATIE_OPTIES[2],
};

function inkomenNaarOptie(bedrag: number): string {
  if (bedrag < 3000) return INKOMEN_OPTIES[0];
  if (bedrag < 4500) return INKOMEN_OPTIES[1];
  if (bedrag < 6000) return INKOMEN_OPTIES[2];
  return INKOMEN_OPTIES[3];
}

export default function IntakePage({
  searchParams,
}: {
  searchParams: {
    pakket?: string;
    token?: string;
    situatie?: string;
    inkomen?: string;
    inkomenWisselt?: string;
  };
}) {
  const pakket =
    searchParams.pakket === "intensief"
      ? "intensief"
      : searchParams.pakket === "geldscan"
      ? "geldscan"
      : "gesprek";

  const initieleSituatie = searchParams.situatie
    ? SITUATIE_LABEL_VOOR_SLEUTEL[searchParams.situatie]
    : undefined;

  const inkomenBedrag = searchParams.inkomen ? Number(searchParams.inkomen) : NaN;
  const initieelInkomen =
    Number.isFinite(inkomenBedrag) && inkomenBedrag > 0
      ? inkomenNaarOptie(inkomenBedrag)
      : undefined;

  return (
    <IntakeForm
      pakket={pakket}
      token={searchParams.token}
      initieleSituatie={initieleSituatie}
      initieelInkomen={initieelInkomen}
      initieelInkomenWisselt={searchParams.inkomenWisselt === "1"}
    />
  );
}
