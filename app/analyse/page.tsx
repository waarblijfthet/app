import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title:
    "Gratis financiële analyse — hoe doe jij het ten opzichte van vergelijkbare gezinnen?",
  description:
    "Vul in wat jullie verdienen en uitgeven. Zie direct hoe jullie het doen ten opzichte van vergelijkbare Nederlandse gezinnen. Gratis, anoniem, geen producten.",
  alternates: { canonical: "https://www.waarblijfthet.nl/analyse" },
  openGraph: {
    title:
      "Gratis financiële analyse — Waar blijft het",
    description:
      "Vul in wat jullie verdienen en uitgeven. Zie direct hoe jullie het doen ten opzichte van vergelijkbare Nederlandse gezinnen. Gratis, anoniem, geen producten.",
    url: "https://www.waarblijfthet.nl/analyse",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Financiële analyse — Waar blijft het",
  url: "https://www.waarblijfthet.nl/analyse",
  applicationCategory: "FinanceApplication",
  description:
    "Interactieve quiz die jullie financiële situatie vergelijkt met vergelijkbare Nederlandse gezinnen",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
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

      <main className="pt-16 min-h-screen bg-background overflow-x-hidden">
        <section className="pt-10 pb-6 md:pt-16 md:pb-8">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <p className="section-eyebrow mb-3">Gratis analyse</p>
            <h1 className="font-display font-light text-primary text-2xl sm:text-4xl md:text-5xl max-w-2xl mb-2 leading-snug">
              Hoe doe jij het ten opzichte van vergelijkbare gezinnen?
            </h1>
            <p className="text-text-soft font-body font-light text-base max-w-xl mb-0">
              Anoniem, geen producten, geen bankadvies.
            </p>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <QuizClient />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
