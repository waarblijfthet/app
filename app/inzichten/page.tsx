import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { artikelen } from "@/lib/inzichten-data";

export const metadata: Metadata = {
  title: "Inzichten over grip op je geld | Waar blijft het",
  description:
    "Praktische inzichten voor gezinnen die goed verdienen maar weinig overhouden. Geen bankadvies, geen schuldhulp — gewoon herkenning en concrete stappen.",
  alternates: { canonical: "https://www.waarblijfthet.nl/inzichten" },
  openGraph: {
    title: "Inzichten — Waar blijft het",
    description:
      "Praktische inzichten voor gezinnen die goed verdienen maar weinig overhouden.",
    url: "https://www.waarblijfthet.nl/inzichten",
  },
};

export default function InzichtenPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="bg-background pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Inzichten</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-xl">
              Artikelen over grip op je geld
            </h1>
          </div>
        </section>

        <section className="bg-background py-12 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {artikelen.map((artikel) => (
                <article
                  key={artikel.slug}
                  className="card-base border border-[#E8E0D0] group flex flex-col min-h-[120px]"
                >
                  {/* Decorative header — kleiner op mobiel */}
                  <div
                    className="w-full h-28 md:h-48 rounded-lg mb-4 md:mb-5 bg-green-light flex items-end p-4"
                    aria-hidden="true"
                  >
                    <span className="font-display font-light text-primary/30 text-5xl leading-none italic">
                      &ldquo;
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-text-muted font-body text-xs uppercase tracking-wider">
                      {artikel.categorie}
                    </span>
                    <span className="text-text-muted font-body text-xs">·</span>
                    <time
                      dateTime={artikel.datum}
                      className="text-text-muted font-body text-xs"
                    >
                      {artikel.datumFormatted}
                    </time>
                    <span className="text-text-muted font-body text-xs">·</span>
                    <span className="text-text-muted font-body text-xs">
                      {artikel.leestijd} min
                    </span>
                  </div>

                  <h2 className="font-display font-light text-primary text-xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    <Link
                      href={`/inzichten/${artikel.slug}`}
                      className="stretched-link"
                    >
                      {artikel.titel}
                    </Link>
                  </h2>

                  <p className="text-text-soft font-body font-light text-sm leading-relaxed flex-1">
                    {artikel.excerpt}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E8E0D0]">
                    <Link
                      href={`/inzichten/${artikel.slug}`}
                      className="text-accent font-body font-medium text-sm hover:underline"
                    >
                      Lees verder →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
