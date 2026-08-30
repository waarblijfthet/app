"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logGebeurtenis } from "@/lib/track";

/**
 * Eén CTA-link met kliktracking. Punt 28 van de CRO-opdracht: analyse-kliks en
 * Geldscan-kliks moeten apart te tellen zijn, met de pagina waar de klik viel,
 * de plek op die pagina en de vervolgpagina. Zo is per contenttype te zien waar
 * analyse-intentie ontstaat, bijvoorbeeld Klarna, analyse-CTA, /analyse.
 *
 * doel bepaalt de gebeurtenisnaam:
 *   analyse  -> cta_analysis
 *   geldscan -> cta_geldscan
 *   gesprek  -> cta_gesprek
 *
 * De kolom gebeurtenis in paginagebeurtenissen is vrije tekst, dus een nieuw
 * doel toevoegen kost geen migratie.
 *
 * De styling komt van buiten, zodat de visuele hiërarchie uit punt 24 per plek
 * bepaald wordt en dit component niets aan het ontwerp verandert.
 */
export type CtaDoel = "analyse" | "geldscan" | "gesprek";

const GEBEURTENIS_VOOR_DOEL: Record<CtaDoel, string> = {
  analyse: "cta_analysis",
  geldscan: "cta_geldscan",
  gesprek: "cta_gesprek",
};

interface Props {
  doel: CtaDoel;
  href: string;
  /** Waar op de pagina de CTA staat, bijvoorbeeld header, midden, slot, rekenaar. */
  locatie: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}

export default function CtaLink({
  doel,
  href,
  locatie,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        logGebeurtenis(GEBEURTENIS_VOOR_DOEL[doel], {
          pakket: doel === "analyse" ? null : doel,
          meta: { pagina: pathname, locatie: locatie, vervolgpagina: href },
        });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
