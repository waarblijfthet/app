import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artikelen } from "@/lib/inzichten-data";
import { InzichtenGrid } from "./InzichtenGrid";

export const metadata: Metadata = {
  title: "Inzichten over grip op je geld — Waar blijft het",
  description:
    "Praktische artikelen voor gezinnen die goed verdienen maar weinig overhouden. Herkenning, eerlijke cijfers en concrete stappen.",
  alternates: { canonical: "https://www.waarblijfthet.nl/inzichten" },
  openGraph: {
    title: "Inzichten — Waar blijft het",
    description:
      "Praktische artikelen voor gezinnen die goed verdienen maar weinig overhouden.",
    url: "https://www.waarblijfthet.nl/inzichten",
  },
};

export default function InzichtenPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* ── Hero ── */}
        <section className="bg-background pt-12 pb-10 md:pt-16 md:pb-12 border-b border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3 md:mb-4">Inzichten</p>
              <h1 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 md:mb-5">
                Grip op je geld begint met begrijpen waar het naartoe gaat.
              </h1>
              <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed">
                Geen spaartrucjes die je al kent. Geen generiek bankadvies. Artikelen
                die laten zien hoe het er in Nederlandse gezinnen écht uitziet, wat
                er structureel fout gaat en hoe je dat kunt veranderen.
              </p>
            </div>

            {/* Onderwerpen */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-8">
              {["Besparen", "Inzicht", "Sparen", "Inkomen"].map((cat) => (
                <span
                  key={cat}
                  className="font-body text-xs px-3 py-1.5 rounded-full text-text-muted"
                  style={{ backgroundColor: "#EDE8DF" }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Artikelgrid ── */}
        <section className="py-10 md:py-14" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6 pb-8 md:pb-16">
            <InzichtenGrid artikelen={artikelen} />
          </div>
        </section>

        {/* ── Tussentekst voor CTA ── */}
        <section className="bg-background py-12 md:py-16 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-xl">
              <p className="section-eyebrow mb-3">Van lezen naar inzicht</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
                Benieuwd hoe het er bij jullie specifiek uitziet?
              </h2>
              <p className="font-body font-light text-text-soft text-sm md:text-base leading-relaxed mb-6">
                Artikelen geven algemene inzichten. De gratis analyse laat zien wat er
                bij jullie thuis speelt: in welke categorie jullie vallen, waar jullie
                afwijken en wat je concreet kunt veranderen.
              </p>
              <Link
                href="/analyse"
                className="btn-primary"
                style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
              >
                Start de gratis analyse &rarr;
              </Link>
              <p className="font-body text-xs mt-3" style={{ color: "#8A9E8E" }}>
                Gratis &middot; 5 minuten &middot; Geen account nodig
              </p>
            </div>
          </div>
        </section>

        {/* ── Donkere CTA ── */}
        <section className="bg-dark-block py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-lg">
                <p className="font-display font-light text-white text-xl md:text-2xl mb-1 leading-snug">
                  Meer lezen over jullie situatie?
                </p>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  Bekijk ook het aanbod of lees hoe de gratis analyse werkt.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/analyse"
                  className="btn-primary md:w-auto"
                  style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
                >
                  Start de analyse &rarr;
                </Link>
                <Link
                  href="/aanbod"
                  className="font-body text-sm font-medium py-3.5 px-6 rounded-xl border border-white/20 text-white/70 text-center hover:border-white/40 transition-colors"
                >
                  Bekijk het aanbod
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
