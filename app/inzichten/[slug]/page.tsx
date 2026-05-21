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
      url: "https://www.waarblijfthet.nl",
    },
    publisher: {
      "@type": "Organization",
      name: "Waar blijft het",
      url: "https://www.waarblijfthet.nl",
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
                  Benieuwd hoe jullie situatie eruitziet? Doe de gratis analyse
                  en zie direct waar jullie geld naartoe gaat.
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
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
