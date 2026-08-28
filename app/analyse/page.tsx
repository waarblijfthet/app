import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title:
    "Financiële analyse: hoe doe jij het ten opzichte van vergelijkbare huishoudens?",
  description:
    "Vul in wat je verdient en uitgeeft. Zie direct hoe je het doet ten opzichte van vergelijkbare Nederlandse huishoudens. Anoniem, geen producten, geen bankkoppeling.",
  alternates: { canonical: "https://www.waarblijfthet.nl/analyse" },
  openGraph: {
    title: "Financiële analyse | Waar blijft het",
    description:
      "Vul in wat je verdient en uitgeeft. Zie direct hoe je het doet ten opzichte van vergelijkbare Nederlandse huishoudens. Anoniem, geen producten, geen bankkoppeling.",
    url: "https://www.waarblijfthet.nl/analyse",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Financiële analyse | Waar blijft het",
  url: "https://www.waarblijfthet.nl/analyse",
  applicationCategory: "FinanceApplication",
  description:
    "Interactieve quiz die je financiële situatie vergelijkt met vergelijkbare Nederlandse huishoudens",
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

      <main className="min-h-screen bg-background overflow-x-hidden">
        {/* Bewust kort (28-aug-2026). De kop mag niet het hele scherm vullen; de
            eerste vraag moet zonder scrollen in beeld komen, ook op mobiel. */}
        <section className="pt-7 pb-5 md:pt-10 md:pb-6">
          <div className="max-w-[720px] mx-auto px-5 sm:px-6">
            <p className="section-eyebrow mb-2">Analyse</p>
            <h1 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl mb-2 leading-snug">
              Hoe doe jij het financieel?
            </h1>
            <p className="text-text-soft font-body font-light text-base">
              Met een paar realistische schattingen zie je hoe jouw huishouden
              ervoor staat ten opzichte van vergelijkbare huishoudens.
            </p>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="max-w-[720px] mx-auto px-5 sm:px-6">
            <QuizClient />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
