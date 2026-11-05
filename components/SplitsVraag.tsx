"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { logGebeurtenis } from "@/lib/track";
import { ANALYSE_ROUTE, NAKIJKEN_ROUTE } from "@/lib/cta";
import { PAKKET_INFO } from "@/lib/aanbod-content";

/**
 * De deur naar het aanbod (5-nov-2026, docs/plan-positionering-aanbod-05-nov-2026.md).
 *
 * In plaats van één knop naar de analyse, of twee knoppen naast elkaar, één
 * vraag: "Heb je al een overzicht van je uitgaven?". Nee gaat naar de gratis
 * analyse, ja naar de uitleg van de Geldscan voor wie zijn eigen overzicht
 * instuurt. Dezelfde vorm als het introscherm, waar een vraag als start het
 * aantal starters per bezoeker in een week van 34 naar 68 procent bracht.
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

  function kies(keuze: "nee" | "ja", vervolgpagina: string) {
    logGebeurtenis("cta_splitsing", {
      pakket: keuze === "ja" ? "geldscan" : null,
      meta: { plek: plek, keuze: keuze, pagina: pathname, vervolgpagina: vervolgpagina },
    });
  }

  const donker = thema === "donker";
  const vraagKleur = donker ? "#FFFFFF" : "#16211F";
  const subKleur = donker ? "rgba(255,255,255,0.75)" : "#4A5A56";

  const knopBasis: React.CSSProperties = {
    display: "block",
    borderRadius: "12px",
    padding: "0.85rem 1.1rem",
    textDecoration: "none",
    textAlign: "left",
    minHeight: "48px",
  };

  return (
    <div ref={ref}>
      <p
        className="font-body font-medium"
        style={{ color: vraagKleur, fontSize: "1.02rem", marginBottom: "0.75rem" }}
      >
        Heb je al een overzicht van je uitgaven?
      </p>
      <p className="font-body" style={{ color: subKleur, fontSize: "0.85rem", marginTop: "-0.5rem", marginBottom: "0.75rem" }}>
        Een Excel, het overzicht in je bankapp of een budgetapp telt ook.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={analyseHref}
          onClick={() => kies("nee", analyseHref)}
          className="font-body hover:opacity-90"
          style={{ ...knopBasis, backgroundColor: donker ? "#FFFFFF" : "#16211F" }}
        >
          <span
            className="block font-medium"
            style={{ color: donker ? "#16211F" : "#FFFFFF", fontSize: "0.98rem" }}
          >
            Nee, help me op weg →
          </span>
          <span
            className="block"
            style={{ color: donker ? "#4A5A56" : "rgba(255,255,255,0.8)", fontSize: "0.82rem", marginTop: "0.15rem" }}
          >
            Gratis en anoniem, ongeveer 3 minuten
          </span>
        </Link>
        <Link
          href={nakijkenHref}
          onClick={() => kies("ja", nakijkenHref)}
          className="font-body hover:opacity-90"
          style={{
            ...knopBasis,
            backgroundColor: "transparent",
            border: `1.5px solid ${donker ? "rgba(255,255,255,0.7)" : "#16211F"}`,
          }}
        >
          <span className="block font-medium" style={{ color: vraagKleur, fontSize: "0.98rem" }}>
            Ja, laat het nakijken →
          </span>
          <span className="block" style={{ color: subKleur, fontSize: "0.82rem", marginTop: "0.15rem" }}>
            Ik kijk het na en reken je potjes uit, {PAKKET_INFO.geldscan.prijs}
          </span>
        </Link>
      </div>
    </div>
  );
}
