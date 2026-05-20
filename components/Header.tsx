"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_12px_rgba(28,58,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-medium text-sm flex-shrink-0">
            wb
          </span>
          <span className="font-display font-light text-primary text-lg tracking-tight">
            Waar blijft het
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-text-soft font-body text-sm font-medium hover:text-primary transition-colors hidden sm:block"
          >
            Blog
          </Link>
          <Link
            href="/analyse"
            className="text-text-soft font-body text-sm font-medium hover:text-primary transition-colors hidden sm:block"
          >
            Analyse
          </Link>
          <a
            href="#aanmelden"
            className="btn-primary text-sm py-2 px-5"
          >
            Meld je aan
          </a>
        </nav>
      </div>
    </header>
  );
}
