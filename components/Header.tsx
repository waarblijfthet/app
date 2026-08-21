"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import CtaLink from "@/components/CtaLink";

/* ─────────────────────────────────────────────────────────────────────────
   Volledig zelfstandige, opaque header. Geen transparantie, geen backdrop-
   filter, geen afhankelijkheid van de achtergrondkleur van de pagina eronder.
   Zelfde component op elke pagina, inclusief de homepage met zijn wijnrode
   hero: de header staat er los boven, niet overlappend.
   ────────────────────────────────────────────────────────────────────────── */

const C = {
  white: "#FFFFFF",
  dark: "#202020",
  wine: "#7B2D3E",
  wineHover: "#642433",
  gold: "#C9952A",
  border: "#E8E5E1",
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isOpAnalyse = pathname.startsWith("/analyse");
  const isOpResultaat = pathname.startsWith("/resultaat");

  /* De gratis analyse is de enige primaire conversie-ingang van de site.
     Vanaf elke pagina moet die met één klik bereikbaar zijn, dus staat de
     CTA overal in de header, behalve op de analyse zelf. Op de
     resultaatpagina heeft iemand de analyse net gedaan, daar wijst hij
     naar een nieuwe ronde. Route en label komen uit lib/cta.ts, zodat er
     nergens een tweede variant ontstaat. */
  const ctaConfig = isOpAnalyse
    ? null
    : isOpResultaat
    ? { label: "Doe analyse opnieuw", href: ANALYSE_ROUTE }
    : { label: PRIMAIRE_CTA_LABEL, href: ANALYSE_ROUTE };

  const navLinks = [
    { href: "/rapporten", label: "Rapporten" },
    { href: "/inzichten", label: "Inzichten" },
    { href: "/aanbod", label: "Tarieven" },
    { href: "/over", label: "Over" },
    { href: "/samenwerken", label: "Samenwerken" },
    { href: "/analyse", label: "Analyse" },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: C.white,
        borderBottom: `1px solid ${C.border}`,
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div
        className="relative flex items-center justify-between h-16 md:h-[76px] max-w-[1200px] mx-auto px-5 md:px-10"
      >
        {/* Logo, links uitgelijnd */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Waar blijft het">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: C.dark }}
            aria-hidden="true"
          >
            <span style={{ color: C.white, fontSize: "12px", fontWeight: 600 }}>wb</span>
          </div>
          <span
            className="hidden sm:block"
            style={{ color: C.dark, fontSize: "16px", fontWeight: 600, fontFamily: "Fraunces, serif" }}
          >
            Waar blijft het
          </span>
        </Link>

        {/* Desktop nav, horizontaal gecentreerd t.o.v. de headerbreedte */}
        <nav
          className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          aria-label="Hoofdnavigatie"
        >
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="pb-1 border-b-2 transition-colors duration-150"
                style={{
                  fontSize: "15px",
                  fontWeight: active ? 600 : 500,
                  color: active ? C.wine : C.dark,
                  borderBottomColor: active ? C.gold : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = C.wine;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = C.dark;
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA, rechts uitgelijnd, alleen desktop */}
        <div className="hidden md:flex items-center shrink-0">
          {ctaConfig && (
            <CtaLink
              doel="analyse"
              href={ctaConfig.href}
              locatie="header"
              className="inline-flex items-center gap-1.5 transition-colors duration-150"
              style={{
                backgroundColor: C.wine,
                color: C.white,
                height: "44px",
                padding: "0 20px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.wineHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.wine)}
            >
              {ctaConfig.label}
              <span aria-hidden="true">&rarr;</span>
            </CtaLink>
          )}
        </div>

        {/* Hamburger, alleen mobiel */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={mobileOpen}
        >
          <span
            className={"block w-5 h-0.5 transition-all duration-200" + (mobileOpen ? " rotate-45 translate-y-2" : "")}
            style={{ backgroundColor: C.dark }}
          />
          <span
            className={"block w-5 h-0.5 transition-all duration-200" + (mobileOpen ? " opacity-0" : "")}
            style={{ backgroundColor: C.dark }}
          />
          <span
            className={"block w-5 h-0.5 transition-all duration-200" + (mobileOpen ? " -rotate-45 -translate-y-2" : "")}
            style={{ backgroundColor: C.dark }}
          />
        </button>
      </div>

      {/* Mobiel menu: volledig wit, geen transparantie */}
      {mobileOpen && (
        <nav
          className="md:hidden flex flex-col px-5 py-2"
          style={{ backgroundColor: C.white, borderTop: `1px solid ${C.border}` }}
          aria-label="Mobiele navigatie"
        >
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-3"
                style={{
                  fontSize: "16px",
                  fontWeight: active ? 600 : 500,
                  color: active ? C.wine : C.dark,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {label}
              </Link>
            );
          })}
          {ctaConfig && (
            <CtaLink
              doel="analyse"
              href={ctaConfig.href}
              locatie="header-mobiel"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full my-4"
              style={{
                backgroundColor: C.wine,
                color: C.white,
                minHeight: "52px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {ctaConfig.label}
              <span aria-hidden="true">&rarr;</span>
            </CtaLink>
          )}
        </nav>
      )}
    </header>
  );
}
