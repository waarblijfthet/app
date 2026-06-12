"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isOpAnalyse = pathname.startsWith("/analyse");
  const isOpInzichten = pathname.startsWith("/inzichten");
  const isOpResultaat = pathname.startsWith("/resultaat");

  const ctaConfig =
    isOpAnalyse || isOpInzichten
      ? null
      : isOpResultaat
      ? { label: "Doe analyse opnieuw", href: "/analyse" }
      : { label: "Gratis analyse", href: "/analyse" };

  const navLinks = [
    { href: "/inzichten", label: "Inzichten" },
    { href: "/aanbod", label: "Aanbod" },
    { href: "/over", label: "Over" },
    { href: "/samenwerken", label: "Samenwerken" },
    { href: "/analyse", label: "Analyse" },
  ];

  const linkClass = (href: string) =>
    "text-sm font-medium transition-colors pb-0.5 " +
    (pathname.startsWith(href) && (href !== "/" || pathname === "/")
      ? "text-[#1C3A2A] border-b border-[#1C3A2A]"
      : "text-[#4A5E4E] hover:text-[#1C3A2A]");

  const mobileLinkClass = (href: string) =>
    "text-sm font-medium py-1 transition-colors " +
    (pathname.startsWith(href) && (href !== "/" || pathname === "/")
      ? "text-[#1C3A2A]"
      : "text-[#4A5E4E]");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 bg-[#F5F0E8]/92 backdrop-blur-md border-b border-[rgba(26,46,30,0.08)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Waar blijft het">
          <div className="w-8 h-8 rounded-full bg-[#1C3A2A] flex items-center justify-center shrink-0" aria-hidden="true">
            <span className="text-[#F5F0E8] text-xs font-medium" style={{ fontFamily: "Fraunces, serif" }}>wb</span>
          </div>
          <span className="text-[#1C3A2A] text-base font-medium hidden sm:block" style={{ fontFamily: "Fraunces, serif" }}>
            Waar blijft het
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
          ))}
        </nav>

        {/* Rechts: CTA + hamburger */}
        <div className="flex items-center gap-3">
          {ctaConfig && (
            <Link
              href={ctaConfig.href}
              className="hidden md:inline-flex items-center gap-1.5 bg-[#C4603A] text-[#FDFAF4] px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shrink-0"
            >
              {ctaConfig.label}
              <span aria-hidden="true">&#x2192;</span>
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileOpen}
          >
            <span className={"block w-5 h-0.5 bg-[#1C3A2A] transition-all duration-200" + (mobileOpen ? " rotate-45 translate-y-2" : "")} />
            <span className={"block w-5 h-0.5 bg-[#1C3A2A] transition-all duration-200" + (mobileOpen ? " opacity-0" : "")} />
            <span className={"block w-5 h-0.5 bg-[#1C3A2A] transition-all duration-200" + (mobileOpen ? " -rotate-45 -translate-y-2" : "")} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-[#F5F0E8] border-b border-[rgba(26,46,30,0.08)] px-6 py-4 flex flex-col gap-4" aria-label="Mobiele navigatie">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={mobileLinkClass(href)}>
              {label}
            </Link>
          ))}
          {ctaConfig && (
            <Link
              href={ctaConfig.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#C4603A] text-[#FDFAF4] px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {ctaConfig.label}
              <span aria-hidden="true">&#x2192;</span>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
