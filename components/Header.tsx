"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import CtaLink from "@/components/CtaLink";

/* ─────────────────────────────────────────────────────────────────────────
   Volledig zelfstandige, opaque header. Geen transparantie, geen backdrop-
   filter, geen afhankelijkheid van de achtergrondkleur van de pagina eronder.
   Zelfde component op elke pagina, inclusief de homepage met zijn wijnrode
   hero: de header staat er los boven, niet overlappend.

   De navigatie is bewust kort: vier links plus één primaire actie. Die
   primaire actie is altijd de gratis analyse, want dat is de enige primaire
   conversie-ingang van de site. Route en label komen uit lib/cta.ts. Contact
   staat niet in de hoofdnavigatie, wel in het mobiele menu en in de footer.
   ────────────────────────────────────────────────────────────────────────── */

const C = {
  white: "#FFFFFF",
  dark: "#202020",
  wine: "#7B2D3E",
  // Dezelfde groen als .btn-primary in globals.css, zodat de knop in de
  // header niet als een tweede knopstijl naast de rest van de site staat.
  green: "#0B7A6E",
  greenHover: "#0A6A5F",
  gold: "#C9952A",
  border: "#E8E5E1",
};

const CONTACT_MAILTO = "mailto:hallo@waarblijfthet.nl";

const navLinks = [
  { href: "/analyse", label: "Analyse" },
  { href: "/rapporten", label: "Rapporten" },
  { href: "/aanbod", label: "Aanbod" },
  { href: "/over", label: "Over" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const knopRef = useRef<HTMLButtonElement>(null);
  const paneelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sluitEnFocusKnop = useCallback(() => {
    setMobileOpen(false);
    knopRef.current?.focus();
  }, []);

  // Menu dicht bij navigatie, zodat er nooit een open paneel achterblijft.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape sluit, Tab blijft binnen het paneel, pagina eronder scrollt niet.
  useEffect(() => {
    if (!mobileOpen) return;

    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        sluitEnFocusKnop();
        return;
      }
      if (e.key !== "Tab") return;

      const paneel = paneelRef.current;
      if (!paneel) return;
      const focusbaar = Array.from(
        paneel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      if (focusbaar.length === 0) return;
      const eerste = focusbaar[0];
      const laatste = focusbaar[focusbaar.length - 1];
      const actief = document.activeElement;

      if (e.shiftKey && (actief === eerste || actief === knopRef.current)) {
        e.preventDefault();
        laatste.focus();
      } else if (!e.shiftKey && actief === laatste) {
        e.preventDefault();
        knopRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [mobileOpen, sluitEnFocusKnop]);

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
     naar een nieuwe ronde. */
  const ctaConfig = isOpAnalyse
    ? null
    : isOpResultaat
    ? { label: "Doe analyse opnieuw", href: ANALYSE_ROUTE }
    : { label: PRIMAIRE_CTA_LABEL, href: ANALYSE_ROUTE };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: C.white,
        borderBottom: "1px solid " + C.border,
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div className="flex items-center justify-between h-16 md:h-[76px] max-w-[1200px] mx-auto px-5 md:px-10">
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

        {/* Desktop: vier navigatielinks en daarnaast één primaire actie */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Hoofdnavigatie">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="pb-1 border-b-2 transition-colors duration-150"
                  style={{
                    fontSize: "15px",
                    fontWeight: active ? 600 : 500,
                    color: active ? C.wine : C.dark,
                    borderBottomColor: active ? C.gold : "transparent",
                    textDecoration: "none",
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

          {ctaConfig && (
            <CtaLink
              doel="analyse"
              href={ctaConfig.href}
              locatie="header"
              className="inline-flex items-center gap-1.5 shrink-0 transition-colors duration-150"
              style={{
                backgroundColor: C.green,
                color: C.white,
                height: "44px",
                padding: "0 20px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.greenHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.green)}
            >
              {ctaConfig.label}
              <span aria-hidden="true">&rarr;</span>
            </CtaLink>
          )}
        </div>

        {/* Mobiel: alleen een menuknop. Klikgebied 44 bij 44, met een
            hamburger van drie horizontale lijnen als het menu dicht is en
            een kruis als het open staat. */}
        <button
          ref={knopRef}
          type="button"
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-lg"
          onClick={() => (mobileOpen ? sluitEnFocusKnop() : setMobileOpen(true))}
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={mobileOpen}
          aria-controls="mobiel-menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke={C.dark} strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6H21M3 12H21M3 18H21" stroke={C.dark} strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobiel menu: volledig wit, geen transparantie, verdwijnt helemaal
          zodra het dicht is. */}
      {mobileOpen && (
        <div
          id="mobiel-menu"
          ref={paneelRef}
          className="md:hidden px-5 pt-2 pb-7"
          style={{ backgroundColor: C.white, borderTop: "1px solid " + C.border }}
        >
          <nav className="flex flex-col" aria-label="Mobiele navigatie">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center min-h-[52px]"
                  style={{
                    fontSize: "17px",
                    fontWeight: active ? 600 : 500,
                    color: active ? C.wine : C.dark,
                    borderBottom: "1px solid " + C.border,
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <a
              href={CONTACT_MAILTO}
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[52px]"
              style={{
                fontSize: "17px",
                fontWeight: 500,
                color: C.dark,
                borderBottom: "1px solid " + C.border,
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </nav>

          {ctaConfig && (
            <CtaLink
              doel="analyse"
              href={ctaConfig.href}
              locatie="header-mobiel"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full mt-6"
              style={{
                backgroundColor: C.green,
                color: C.white,
                minHeight: "52px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {ctaConfig.label}
              <span aria-hidden="true">&rarr;</span>
            </CtaLink>
          )}
        </div>
      )}
    </header>
  );
}
