import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizClient from "@/components/QuizClient";

export const metadata: Metadata = {
  title: "Gratis financiële analyse — hoe doe jij het ten opzichte van vergelijkbare gezinnen?",
  description:
    "Vul in wat jullie verdienen en uitgeven. Zie direct hoe jullie het doen ten opzichte van vergelijkbare Nederlandse gezinnen. Gratis, anoniem, geen producten.",
  alternates: { canonical: "https://waarblijfthet.nl/analyse" },
  openGraph: {
    title: "Gratis financiële analyse — vergelijk jezelf met vergelijkbare gezinnen",
    description:
      "Vul in wat jullie verdienen en uitgeven. Zie direct hoe jullie het doen ten opzichte van vergelijkbare Nederlandse gezinnen. Gratis, anoniem, geen producten.",
    url: "https://waarblijfthet.nl/analyse",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gratis financiële analyse — Waar blijft het",
  url: "https://waarblijfthet.nl/analyse",
  applicationCategory: "FinanceApplication",
  description:
    "Interactieve analyse die jouw financiële situatie vergelijkt met vergelijkbare Nederlandse gezinnen.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  inLanguage: "nl",
};

export default function AnalysePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Page header */}
        <section className="bg-background pt-16 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Gratis analyse</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-2xl mb-4">
              Gratis financiële analyse — hoe doe jij het ten opzichte van
              vergelijkbare gezinnen?
            </h1>
            <p className="text-text-soft font-body font-light text-lg max-w-xl">
              Vul in wat jullie verdienen en uitgeven. Zie direct hoe jullie
              het doen. Anoniem, geen producten, geen bankadvies.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="bg-background pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <QuizClient />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
