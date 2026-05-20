import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artikelen over grip op je geld",
  description:
    "Praktische inzichten voor gezinnen die goed verdienen maar weinig overhouden. Geen bankadvies, geen schuldhulp — gewoon herkenning en concrete stappen.",
  alternates: { canonical: "https://waarblijfthet.nl/blog" },
  openGraph: {
    title: "Blog — Waar blijft het",
    description:
      "Praktische inzichten voor gezinnen die goed verdienen maar weinig overhouden.",
    url: "https://waarblijfthet.nl/blog",
  },
};

const articles = [
  {
    slug: "goed-salaris-toch-krap",
    title: "Goed salaris, toch krap aan het einde van de maand — hoe kan dat?",
    date: "2026-05-19",
    dateFormatted: "19 mei 2026",
    readTime: "5 min",
    excerpt:
      "Je verdient genoeg. Niet extreem, maar genoeg. En toch staat er aan het einde van de maand bijna niks meer op de rekening. Hoe kan dat?",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="bg-background pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Blog</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-xl">
              Artikelen over grip op je geld
            </h1>
          </div>
        </section>

        <section className="bg-background py-12 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article key={article.slug} className="card-base border border-[#E8E0D0] group flex flex-col">
                  {/* Decorative image placeholder */}
                  <div
                    className="w-full h-48 rounded-lg mb-5 bg-green-light flex items-end p-4"
                    aria-hidden="true"
                  >
                    <span className="font-display font-light text-primary/30 text-5xl leading-none italic">
                      &ldquo;
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <time
                      dateTime={article.date}
                      className="text-text-muted font-body text-xs"
                    >
                      {article.dateFormatted}
                    </time>
                    <span className="text-text-muted font-body text-xs">·</span>
                    <span className="text-text-muted font-body text-xs">
                      {article.readTime} leestijd
                    </span>
                  </div>

                  <h2 className="font-display font-light text-primary text-xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    <Link href={`/blog/${article.slug}`} className="stretched-link">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-text-soft font-body font-light text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E8E0D0]">
                    <Link
                      href={`/blog/${article.slug}`}
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
