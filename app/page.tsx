import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeConcept from "@/components/HomeConcept";

export const metadata: Metadata = {
  title: "Waar blijft het, Goed salaris, toch altijd krap?",
  description:
    "Je hebt geen schulden en je verdient genoeg, maar aan het einde van de maand is het weg. Zie in 5 minuten waar je geld structureel naartoe gaat.",
  alternates: { canonical: "https://www.waarblijfthet.nl" },
  openGraph: {
    title: "Waar blijft het, Goed salaris, toch altijd krap?",
    description:
      "Je hebt geen schulden en je verdient genoeg, maar aan het einde van de maand is het weg.",
    url: "https://www.waarblijfthet.nl",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Waar blijft het",
  url: "https://www.waarblijfthet.nl",
  description:
    "Financiële analyse voor Nederlandse huishoudens met een modaal of boven-modaal inkomen.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.waarblijfthet.nl/inzichten?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main>
        <HomeConcept />
      </main>
      <Footer />
    </>
  );
}
