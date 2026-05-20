import Link from "next/link";

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
          className="flex items-center font-body"
          style={{ fontSize: "0.8rem" }}
        >
          <Link
            href="/privacy"
            className="text-white/50 hover:text-white/80 transition-colors no-underline"
            style={{ textDecoration: "none" }}
          >
            Privacy
          </Link>
          <span className="text-white/20 mx-2">·</span>
          <a
            href="mailto:hallo@waarblijfthet.nl"
            className="text-white/50 hover:text-white/80 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Contact
          </a>
          <span className="text-white/20 mx-2">·</span>
          <Link
            href="/analyse"
            className="text-white/50 hover:text-white/80 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Start de analyse
          </Link>
        </nav>

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
