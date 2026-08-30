import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";

/**
 * Afsluitende footer met vier duidelijke groepen. Op desktop naast elkaar,
 * op mobiel onder elkaar in dezelfde volgorde, met de primaire actie
 * helemaal onderaan.
 *
 * toonCta staat standaard aan. De homepage zet hem uit: daar staat de
 * analyse al in de header, in de hero en in het slotblok er vlak boven.
 */

const CONTACT_MAILTO = "mailto:hallo@waarblijfthet.nl";

const navigatieLinks = [
  { href: "/analyse", label: "Analyse" },
  { href: "/rapporten", label: "Rapporten" },
  { href: "/aanbod", label: "Aanbod" },
  { href: "/over", label: "Over" },
  { href: "/inzichten", label: "Inzichten" },
  { href: "/samenwerken", label: "Samenwerken" },
];

const informatieLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/woordenlijst", label: "Woordenlijst" },
  { href: "/financieel-coach", label: "Financieel coach" },
];

const linkKlassen =
  "flex items-center min-h-[44px] md:min-h-0 md:py-1.5 text-white/60 hover:text-white transition-colors";

const kopKlassen =
  "font-body text-white/40 uppercase tracking-widest mb-1 md:mb-2";

export default function Footer({ toonCta = true }: { toonCta?: boolean } = {}) {
  return (
    <footer className="bg-dark-block border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 md:gap-8">
          {/* Waar blijft het, met de omschrijving van de dienst */}
          <div>
            <Link
              href="/"
              className="font-display font-light text-white text-lg tracking-tight no-underline"
              style={{ textDecoration: "none" }}
            >
              Waar blijft het
            </Link>
            <p
              className="font-body text-white/60 mt-3 max-w-sm"
              style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
            >
              Je verdient goed maar houdt weinig over. Ik laat zien waar het
              naartoe gaat, vergeleken met gezinnen in jouw situatie. Analyse,
              geen bankadvies.
            </p>
          </div>

          {/* Navigatie */}
          <nav aria-label="Footernavigatie">
            <h2 className={kopKlassen} style={{ fontSize: "0.7rem" }}>
              Navigatie
            </h2>
            <ul className="list-none p-0 m-0 font-body" style={{ fontSize: "0.85rem" }}>
              {navigatieLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkKlassen} style={{ textDecoration: "none" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informatie */}
          <nav aria-label="Informatie">
            <h2 className={kopKlassen} style={{ fontSize: "0.7rem" }}>
              Informatie
            </h2>
            <ul className="list-none p-0 m-0 font-body" style={{ fontSize: "0.85rem" }}>
              {informatieLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkKlassen} style={{ textDecoration: "none" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className={kopKlassen} style={{ fontSize: "0.7rem" }}>
              Contact
            </h2>
            <ul className="list-none p-0 m-0 font-body" style={{ fontSize: "0.85rem" }}>
              <li>
                <a
                  href={CONTACT_MAILTO}
                  className={linkKlassen}
                  style={{ textDecoration: "none" }}
                >
                  hallo@waarblijfthet.nl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Afsluiting: op mobiel staat de primaire actie onder alle groepen,
            op desktop naast het copyright. De gratis analyse is de enige
            commerciële actie in de footer. */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-body text-white/40 m-0" style={{ fontSize: "0.8rem" }}>
            &copy; 2026 waarblijfthet.nl
          </p>

          {toonCta && (
            <CtaLink
              doel="analyse"
              href={ANALYSE_ROUTE}
              locatie="footer"
              className="flex md:inline-flex items-center justify-center gap-1.5 font-body w-full md:w-auto"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#16211F",
                borderRadius: "8px",
                minHeight: "48px",
                padding: "0 1.25rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {PRIMAIRE_CTA_LABEL}
              <span aria-hidden="true">&rarr;</span>
            </CtaLink>
          )}
        </div>
      </div>
    </footer>
  );
}
