import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArtikel, artikelen } from "@/lib/inzichten-data";
import ArticleBody from "./ArticleBody";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artikel = getArtikel(params.slug);
  if (!artikel) return {};

  return {
    title: artikel.metaTitel,
    description: artikel.metaDescription,
    alternates: {
      canonical: `https://www.waarblijfthet.nl/inzichten/${artikel.slug}`,
    },
    openGraph: {
      title: artikel.metaTitel,
      description: artikel.metaDescription,
      url: `https://www.waarblijfthet.nl/inzichten/${artikel.slug}`,
      type: "article",
      publishedTime: artikel.datum,
      modifiedTime: artikel.datum,
    },
    robots: { index: true, follow: true },
  };
}

export default function ArtikelPage({ params }: Props) {
  const artikel = getArtikel(params.slug);
  if (!artikel) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.titel,
    description: artikel.metaDescription,
    datePublished: artikel.datum,
    dateModified: artikel.datum,
    author: {
      "@type": "Person",
      name: "Jarno Koopman",
      jobTitle: "Oprichter",
      url: "https://www.waarblijfthet.nl/over",
      sameAs: [
        "https://www.linkedin.com/in/jarnokoopman/",
        "https://www.instagram.com/koopmanjarno/",
      ],
      knowsAbout: [
        "Persoonlijke financiën",
        "Huishoudbudget",
        "Grip op geld",
        "Besparen",
        "Sparen",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Waar blijft het",
      url: "https://www.waarblijfthet.nl",
      sameAs: [
        "https://www.linkedin.com/in/jarnokoopman/",
        "https://www.instagram.com/koopmanjarno/",
      ],
      logo: {
        "@type": "ImageObject",
        url: "https://www.waarblijfthet.nl/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.waarblijfthet.nl/inzichten/${artikel.slug}`,
    },
    inLanguage: "nl",
  };

  const faqSchema =
    artikel.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: artikel.faq.map((item) => ({
            "@type": "Question",
            name: item.vraag,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.antwoord,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />

      <main className="pt-16">
        <article>
          {/* Article header */}
          <header className="bg-background pt-16 pb-12">
            <div className="max-w-[720px] mx-auto px-6">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Broodkruimel">
                <ol className="flex items-center gap-2 text-text-muted font-body text-xs">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/inzichten"
                      className="hover:text-primary transition-colors"
                    >
                      Inzichten
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-text-soft truncate max-w-[200px]">
                    {artikel.titel.length > 40
                      ? artikel.titel.substring(0, 40) + "…"
                      : artikel.titel}
                  </li>
                </ol>
              </nav>

              {/* Meta: categorie · datum · leestijd */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-body uppercase tracking-wider text-text-muted">
                  {artikel.categorie}
                </span>
                <span className="text-text-muted font-body text-xs">·</span>
                <time
                  dateTime={artikel.datum}
                  className="text-text-muted font-body text-sm"
                >
                  {artikel.datumFormatted}
                </time>
                <span className="text-text-muted font-body text-sm">·</span>
                <span className="text-text-muted font-body text-sm">
                  {artikel.leestijd} minuten leestijd
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-display font-light text-primary text-4xl sm:text-5xl leading-tight mb-6">
                {artikel.titel}
              </h1>

              {/* Author bar */}
              <div
                className="flex items-center gap-3 py-4 border-t border-b border-[#E8E0D0]"
                style={{ marginTop: "0.5rem" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-medium text-white text-base"
                  style={{ backgroundColor: "#1C3A2A" }}
                >
                  J
                </div>
                <div>
                  <p className="font-body font-medium text-[#1C3A2A] text-sm leading-snug">
                    Jarno Koopman
                  </p>
                  <p className="font-body text-[#8A9E8E] text-xs">
                    Oprichter Waar blijft het · {artikel.datumFormatted}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Article body */}
          <div className="bg-background py-12 pb-24">
            <div
              className="max-w-[720px] mx-auto px-6"
              style={{ fontSize: "17px", lineHeight: "1.85" }}
            >
              {/* Dynamic content per artikel */}
              <ArticleBody slug={artikel.slug} />

              {/* Internal CTA block */}
              <div
                style={{
                  backgroundColor: "#E8F2EC",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  marginTop: "2.5rem",
                  marginBottom: "2.5rem",
                }}
              >
                <p
                  className="font-body font-light text-text-soft"
                  style={{ marginBottom: "1rem" }}
                >
                  Benieuwd hoe jouw situatie eruitziet? Doe de gratis analyse
                  en zie direct waar jouw geld naartoe gaat.
                </p>
                <Link href="/analyse" className="btn-primary">
                  Start de gratis analyse →
                </Link>
              </div>

              {/* FAQ sectie */}
              {artikel.faq.length > 0 && (
                <section aria-labelledby="faq-heading">
                  <h2
                    id="faq-heading"
                    className="font-display font-light text-primary"
                    style={{
                      fontSize: "1.6rem",
                      marginTop: "2.5rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Veelgestelde vragen
                  </h2>
                  {artikel.faq.map((item, i) => (
                    <div key={i} style={{ marginBottom: "1.75rem" }}>
                      <h3
                        className="font-body font-medium text-primary"
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {item.vraag}
                      </h3>
                      <p
                        className="font-body font-light text-text-soft"
                        style={{ marginBottom: "0" }}
                      >
                        {item.antwoord}
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Externe bronnen */}
              {artikel.externLinks && artikel.externLinks.length > 0 && (
                <section
                  style={{
                    marginTop: "2.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #E8E0D0",
                  }}
                >
                  <p
                    className="font-body font-medium text-text-soft"
                    style={{ fontSize: "0.85rem", marginBottom: "0.75rem" }}
                  >
                    Bronnen
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {artikel.externLinks.map((link, i) => (
                      <li key={i} style={{ marginBottom: "0.4rem" }}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body hover:underline"
                          style={{
                            color: "#C4603A",
                            fontSize: "0.9rem",
                            textDecoration: "none",
                          }}
                        >
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Auteur-bio, zichtbare first-hand expertise (E-E-A-T) */}
              <section
                className="flex items-start gap-4"
                style={{
                  marginTop: "2.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #E8E0D0",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-medium text-white text-lg"
                  style={{ backgroundColor: "#1C3A2A" }}
                >
                  J
                </div>
                <div>
                  <p className="font-body font-medium text-[#1C3A2A] text-sm mb-1">
                    Geschreven door Jarno Koopman
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    Keihard werken en tóch niets overhouden. Dat gevoel ken ik.
                    Goed salaris, niks geks gedaan, en toch liepen de spaarpotten
                    leeg. Nu kijk ik mee met mensen in dezelfde situatie.{" "}
                    <Link
                      href="/over"
                      style={{ color: "#C4603A", textDecoration: "none" }}
                      className="hover:underline"
                    >
                      Meer over mij →
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Lees ook */}
          {(() => {
            const rest = artikelen.filter((a) => a.slug !== artikel.slug);
            const zelfdeCategorie = rest.filter((a) => a.categorie === artikel.categorie);
            const overig = rest.filter((a) => a.categorie !== artikel.categorie);
            const gerelateerd = [...zelfdeCategorie, ...overig].slice(0, 3);
            if (gerelateerd.length === 0) return null;
            return (
              <div
                className="py-12"
                style={{ backgroundColor: "#F5F0E8", borderTop: "1px solid #E8E0D0" }}
              >
                <div className="max-w-[720px] mx-auto px-6">
                  <h2
                    className="font-display font-light text-[#1C3A2A] mb-6"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Lees ook
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gerelateerd.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/inzichten/${a.slug}`}
                        className="group block bg-[#FDFAF4] rounded-xl p-5 border border-[#E8E0D4] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <span
                          className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full mb-3 inline-block"
                          style={{
                            backgroundColor:
                              a.categorie === "Besparen"
                                ? "#E8F2EC"
                                : a.categorie === "Inkomen"
                                ? "#FAF0EB"
                                : a.categorie === "Sparen"
                                ? "#EDE6D8"
                                : "#E8F2FA",
                            color:
                              a.categorie === "Besparen"
                                ? "#2D6A4F"
                                : a.categorie === "Inkomen"
                                ? "#92600A"
                                : a.categorie === "Sparen"
                                ? "#4A5E4E"
                                : "#1B5E8A",
                          }}
                        >
                          {a.categorie}
                        </span>
                        <p className="font-display font-light text-[#1C3A2A] text-base leading-snug group-hover:text-[#C4603A] transition-colors">
                          {a.titel}
                        </p>
                        <p className="font-body text-[#8A9E8E] text-xs mt-2">
                          {a.leestijd} min leestijd
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </article>
      </main>

      <Footer />
    </>
  );
}
