import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";

export default function Footer() {
  return (
    <footer className="bg-dark-block border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Links: merknaam */}
        <Link
          href="/"
          className="font-display font-light text-white text-base tracking-tight"
        >
          Waar blijft het
        </Link>

        {/* Midden: navigatielinks */}
        <nav
          className="flex flex-wrap items-center justify-center gap-y-1 font-body"
          style={{ fontSize: "0.8rem" }}
        >
          <Link
            href="/over"
            className="text-white/50 hover:text-white/80 transition-colors no-underline"
            style={{ textDecoration: "none" }}
          >
            Over
          </Link>
          <span className="text-white/20 mx-2">·</span>
          <Link
            href="/privacy"
            className="text-white/50 hover:text-white/80 transition-colors no-underline"
            style={{ textDecoration: "none" }}
          >
            Privacy
          </Link>
          <span className="text-white/20 mx-2">·</span>
          <Link
            href="/woordenlijst"
            className="text-white/50 hover:text-white/80 transition-colors no-underline"
            style={{ textDecoration: "none" }}
          >
            Woordenlijst
          </Link>
          <span className="text-white/20 mx-2">·</span>
          <Link
            href="/financieel-coach"
            className="text-white/50 hover:text-white/80 transition-colors no-underline"
            style={{ textDecoration: "none" }}
          >
            Financieel coach
          </Link>
          <span className="text-white/20 mx-2">·</span>
          <a
            href="mailto:hallo@waarblijfthet.nl"
            className="text-white/50 hover:text-white/80 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Contact
          </a>
        </nav>

        {/* De enige commerciële CTA in de footer is de gratis analyse. */}
        <CtaLink
          doel="analyse"
          href={ANALYSE_ROUTE}
          locatie="footer"
          className="inline-flex items-center gap-1.5 font-body"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#16211F",
            borderRadius: "8px",
            padding: "0.7rem 1.1rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {PRIMAIRE_CTA_LABEL}
          <span aria-hidden="true">&rarr;</span>
        </CtaLink>

        {/* Rechts: copyright */}
        <p
          className="font-body text-white/50"
          style={{ fontSize: "0.8rem" }}
        >
          &copy; 2026 waarblijfthet.nl
        </p>
      </div>
    </footer>
  );
}
