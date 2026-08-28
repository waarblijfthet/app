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
        {/* Eén gefocuste kolom, geen lange formulierpagina (28-aug-2026, pass 5).
            De vraag zelf is de pagina; de header hierboven is bewust minimaal
            zodat de introductie direct de eerste vraag toont. */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="max-w-[600px] mx-auto px-5 sm:px-6">
            <QuizClient />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
