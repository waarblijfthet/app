"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CTA: op homepage scrollen naar formulier, elders naar /analyse
  const ctaHref = pathname === "/" ? "#aanmelden" : "/analyse";
  const ctaLabel = pathname === "/" ? "Meld je aan" : "Start analyse";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_12px_rgba(28,58,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-medium text-sm flex-shrink-0">
            wb
          </span>
          <span className="font-display font-light text-primary text-lg tracking-tight">
            Waar blijft het
          </span>
        </Link>

        {/* Desktop navigatie — verborgen op mobiel */}
        <nav className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/inzichten"
              className="font-body text-sm font-medium transition-colors no-underline"
              style={{
                color: pathname.startsWith("/inzichten") ? "#1C3A2A" : "#4A5E4E",
                borderBottom: pathname.startsWith("/inzichten")
                  ? "1px solid #1C3A2A"
                  : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              Inzichten
            </Link>
            <Link
              href="/analyse"
              className="font-body text-sm font-medium transition-colors no-underline"
              style={{
                color:
                  pathname === "/analyse" || pathname.startsWith("/analyse/")
                    ? "#1C3A2A"
                    : "#4A5E4E",
                borderBottom:
                  pathname === "/analyse" || pathname.startsWith("/analyse/")
                    ? "1px solid #1C3A2A"
                    : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              Analyse
            </Link>
          </div>

          {/* CTA — altijd zichtbaar */}
          <Link href={ctaHref} className="btn-primary text-sm py-2 px-5">
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
