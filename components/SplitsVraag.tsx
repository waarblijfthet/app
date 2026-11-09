"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { logGebeurtenis } from "@/lib/track";
import {
  ANALYSE_ROUTE,
  ANALYSE_UITWIJK_LABEL,
  ANALYSE_UITWIJK_VRAAG,
  NAKIJKEN_ROUTE,
  PRIMAIRE_CTA_LABEL,
  PRIMAIRE_CTA_SUB,
  PRIMAIRE_ROUTE,
} from "@/lib/cta";

/**
 * De deur naar het aanbod (5-nov-2026, docs/plan-positionering-aanbod-05-nov-2026.md).
 *
 * In plaats van één knop naar de analyse, of twee knoppen naast elkaar, één
 * vraag: "Heb je al een overzicht van je uitgaven?". Nee gaat naar de gratis
 * analyse, ja naar de uitleg van de Geldscan voor wie zijn eigen overzicht
 * instuurt. Dezelfde vorm als het introscherm, waar een vraag als start het
 * aantal starters per bezoeker in een week van 34 naar 68 procent bracht.
 *
 * 9-nov-2026 (besluit Jarno): één knop naar de uitgavenscan, met daaronder twee
 * tekstlinks: de snelle schatting (analyse) voor wie geen afschrift bij de hand
 * heeft, en nakijken voor wie al een eigen overzicht heeft. Geen vraag vooraf
 * meer: de bezoeker weet op dat moment het verschil nog niet. keuze is nu
 * "scan", "nee" (snelle schatting) of "ja" (nakijken).
 *
 * Meting, geen migratie: splitsing_gezien (één keer, zodra het blok voor de
 * helft in beeld is) en cta_splitsing met meta.plek en meta.keuze (nee of ja).
 */
interface Props {
  /** Waar het blok staat, bijvoorbeeld artikel-slot of rapport-slot. */
  plek: string;
  /** Link voor "nee", met situatieparameters als de pagina die heeft. */
  analyseHref?: string;
  /** Link voor "ja"; standaard de uitleg op /geldscan. */
  nakijkenHref?: string;
  /** Licht op een gekleurd vlak, donker op een donkere achtergrond. */
  thema?: "licht" | "donker";
}

export default function SplitsVraag({
  plek,
  analyseHref = ANALYSE_ROUTE,
  nakijkenHref = NAKIJKEN_ROUTE,
  thema = "licht",
}: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const gelogd = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const waarnemer = new IntersectionObserver(
      (items) => {
        if (gelogd.current) return;
        if (items.some((i) => i.isIntersecting)) {
          gelogd.current = true;
          logGebeurtenis("splitsing_gezien", { meta: { plek: plek, pagina: pathname } });
          waarnemer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    waarnemer.observe(el);
    return () => waarnemer.disconnect();
  }, [plek, pathname]);

  function kies(keuze: "scan" | "nee" | "ja", vervolgpagina: string) {
    logGebeurtenis("cta_splitsing", {
      pakket: keuze === "ja" ? "geldscan" : null,
      meta: { plek: plek, keuze: keuze, pagina: pathname, vervolgpagina: vervolgpagina },
    });
  }

  const donker = thema === "donker";
  const subKleur = donker ? "rgba(255,255,255,0.75)" : "#4A5A56";
  const linkKleur = donker ? "#FFFFFF" : "#0B7A6E";
  const link: React.CSSProperties = { color: linkKleur, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "2px" };

  return (
    <div ref={ref}>
      <Link
        href={PRIMAIRE_ROUTE}
        onClick={() => kies("scan", PRIMAIRE_ROUTE)}
        className="font-body hover:opacity-90"
        style={{
          display: "block",
          borderRadius: "12px",
          padding: "0.9rem 1.15rem",
          textDecoration: "none",
          textAlign: "left",
          minHeight: "48px",
          backgroundColor: donker ? "#FFFFFF" : "#16211F",
        }}
      >
        <span className="block font-medium" style={{ color: donker ? "#16211F" : "#FFFFFF", fontSize: "1rem" }}>
          {PRIMAIRE_CTA_LABEL} →
        </span>
        <span className="block" style={{ color: donker ? "#4A5A56" : "rgba(255,255,255,0.8)", fontSize: "0.82rem", marginTop: "0.15rem" }}>
          {PRIMAIRE_CTA_SUB}
        </span>
      </Link>
      <p className="font-body" style={{ color: subKleur, fontSize: "0.85rem", lineHeight: 1.6, marginTop: "0.8rem", marginBottom: 0 }}>
        {ANALYSE_UITWIJK_VRAAG}{" "}
        <Link href={analyseHref} onClick={() => kies("nee", analyseHref)} style={link}>
          {ANALYSE_UITWIJK_LABEL}
        </Link>
        . Al een eigen overzicht, zoals een Excel of budgetapp?{" "}
        <Link href={nakijkenHref} onClick={() => kies("ja", nakijkenHref)} style={link}>
          Laat het nakijken
        </Link>
        .
      </p>
    </div>
  );
}
