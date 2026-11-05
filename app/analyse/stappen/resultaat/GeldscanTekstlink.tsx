"use client";

import { useEffect, useRef } from "react";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { logGebeurtenis } from "@/lib/track";
import type { AanbodPlek } from "./inzichtVragen";

interface Props {
  plek: AanbodPlek;
  /** De zin vóór de link, afgestemd op de plek. */
  inleiding: string;
}

/**
 * De Geldscan als tekstlink met prijs, eerder in het resultaat dan stap 4
 * (30-okt-2026). Reden: in de maand tot 30 oktober zagen 3 bezoekers het
 * aanbod op stap 4; 21 van de 43 stopten op de vraagstap ervoor. Logt één keer
 * analyse_aanbod_gezien met de plek, zodat de admin per plek kan tellen hoe
 * vaak het aanbod in beeld kwam en hoe vaak erop geklikt werd (cta_geldscan).
 */
export default function GeldscanTekstlink({ plek, inleiding }: Props) {
  const gelogd = useRef(false);
  useEffect(() => {
    if (gelogd.current) return;
    gelogd.current = true;
    logGebeurtenis("analyse_aanbod_gezien", { pakket: "geldscan", meta: { plek: plek } });
  }, [plek]);

  return (
    <p className="font-body text-sm text-text-soft leading-relaxed">
      {inleiding}{" "}
      <CtaLink
        doel="geldscan"
        href={geldscanHref()}
        locatie={`analyse-${plek}`}
        className="text-[#0B7A6E] font-medium underline underline-offset-2 hover:text-primary"
      >
        Laat mij het nakijken en je potjes uitrekenen, Geldscan €49 →
      </CtaLink>{" "}
      <span className="text-text-muted text-xs">Binnen 2 werkdagen persoonlijk geschreven.</span>
    </p>
  );
}
