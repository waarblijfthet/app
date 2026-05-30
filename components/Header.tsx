"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isOpAnalyse = pathname.startsWith("/analyse");
  const isOpInzichten = pathname.startsWith("/inzichten");
  const isOpResultaat = pathname.startsWith("/resultaat");

  // CTA knop: verborgen op analyse- en inzichten-pagina's
  const ctaConfig =
    isOpAnalyse || isOpInzichten
      ? null
      : isOpResultaat
      ? { label: "Doe analyse opnieuw", href: "/analyse" }
      : { label: "Start analyse", href: "/analyse" };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="
          flex items-center justify-between
          px-6 py-4
          bg-[#F5F0E8]/92 backdrop-blur-md
          border-b border-[rgba(26,46,30,0.08)]
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Waar blijft het — terug naar home"
        >
          <div
            className="
              w-8 h-8 rounded-full bg-[#1C3A2A]
              flex items-center justify-center
              shrink-0
            "
            aria-hidden="true"
          >
            <span
              className="text-[#F5F0E8] text-xs font-medium"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              wb
            </span>
          </div>
          <span
            className="text-[#1C3A2A] text-base font-medium hidden sm:block"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Waar blijft het
          </span>
        </Link>

        {/* Desktop nav links: Inzichten | Aanbod | Analyse */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hoofdnavigatie"
        >
          <Link
            href="/inzichten"
            className={`
              text-sm font-medium transition-colors pb-0.5
              ${
                isActive("/inzichten")
                  ? "text-[#1C3A2A] border-b border-[#1C3A2A]"
                  : "text-[#4A5E4E] hover:text-[#1C3A2A]"
              }
            `}
          >
            Inzichten
          </Link>
          <Link
            href="/aanbod"
            className={`
              text-sm font-medium transition-colors pb-0.5
              ${
                isActive("/aanbod")
                  ? "text-[#1C3A2A] border-b border-[#1C3A2A]"
                  : "text-[#4A5E4E] hover:text-[#1C3A2A]"
              }
            `}
          >
            Aanbod
          </Link>
          <Link
            href="/over"
            className={`
              text-sm font-medium transition-colors pb-0.5
              ${
                isActive("/over")
                  ? "text-[#1C3A2A] border-b border-[#1C3A2A]"
                  : "text-[#4A5E4E] hover:text-[#1C3A2A]"
              }
            `}
          >
            Over
          </Link>
          <Link
            href="/analyse"
            className={`
              text-sm font-medium transition-colors pb-0.5
              ${
                isActive("/analyse")
                  ? "text-[#1C3A2A] border-b border-[#1C3A2A]"
                  : "text-[#4A5E4E] hover:text-[#1C3A2A]"
              }
            `}
          >
            Analyse
          </Link>
        </nav>

        {/* CTA knop rechts — alleen desktop, verborgen op /analyse en /inzichten */}
        {ctaConfig && (
          <Link
            href={ctaConfig.href}
            className="
              hidden md:inline-flex items-center gap-1.5
              bg-[#C4603A] text-[#FDFAF4]
              px-5 py-2 rounded-full
              text-sm font-medium
              hover:opacity-90 transition-opacity
              shrink-0
            "
          >
            {ctaConfig.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </header>
  );
}
