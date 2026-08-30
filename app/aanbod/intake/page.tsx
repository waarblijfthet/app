import type { Metadata } from "next";
import { IntakeForm } from "./IntakeForm";
import { GeldscanAanvraag } from "./GeldscanAanvraag";
import { GesprekAanvraag } from "./GesprekAanvraag";
import { SITUATIE_OPTIES, INKOMEN_OPTIES } from "./opties";

export function generateMetadata(): Metadata {
  return {
    title: "Aanmelding | Waar blijft het",
    robots: { index: false, follow: false },
  };
}

/**
 * Zelfde situatiesleutel als lib/cta.ts (SituatieSleutel) en app/geldscan/page.tsx.
 * "gezin" en "zzp" staan er bewust niet bij: de analyse weet niet of de kinderen
 * jong of ouder zijn, en heeft geen zzp-vraag. Gokken op die twee zou een
 * antwoord voorspiegelen dat niemand heeft gegeven.
 *
 * Alleen het traject gebruikt deze voorinvulling nog. De Geldscan en het
 * adviesgesprek vragen voor de betaling alleen naam en e-mailadres, dus die
 * twee slaan hem over. De parameters mogen wel in de URL blijven staan,
 * /geldscan en de analyse zetten ze er nog op.
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
  // De Geldscan is een aanvraag, geen intake: korte aanvraag, daarna met de
  // hand een betaalverzoek, en pas na betaling vraag ik de gegevens op.
  if (searchParams.pakket === "geldscan") {
    return <GeldscanAanvraag token={searchParams.token} />;
  }

  // Het adviesgesprek werkt sinds 30-aug-2026 net zo: alleen naam, e-mailadres
  // en de vraag of iemand al een Geldscan heeft. Cijfers horen in het gesprek,
  // niet in een formulier voor iets wat nog niet gekocht is.
  if (searchParams.pakket !== "intensief") {
    return <GesprekAanvraag token={searchParams.token} />;
  }

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
      pakket="intensief"
      token={searchParams.token}
      initieleSituatie={initieleSituatie}
      initieelInkomen={initieelInkomen}
      initieelInkomenWisselt={searchParams.inkomenWisselt === "1"}
    />
  );
}
