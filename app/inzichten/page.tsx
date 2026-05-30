import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artikelen } from "@/lib/inzichten-data";
import { InzichtenGrid } from "./InzichtenGrid";

export const metadata: Metadata = {
  title: "Inzichten over grip op je geld",
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
        {/* ── Header sectie ── */}
        <section
          className="pt-16 pb-10"
          style={{ backgroundColor: "#F5F0E8" }}
        >
          <div className="max-w-[1160px] mx-auto px-6">
            <p
              className="font-body text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "#C4603A" }}
            >
              Inzichten
            </p>
            <h1 className="font-display font-light text-[#1C3A2A] text-4xl sm:text-5xl max-w-xl mb-4">
              Artikelen over grip op je geld
            </h1>
            <p className="font-body text-[#4A5E4E] text-base max-w-2xl leading-relaxed">
              Eerlijke informatie over wat Nederlandse gezinnen werkelijk
              uitgeven, verdienen en sparen — gebaseerd op echte cijfers, niet
              alleen op normen.
            </p>
          </div>
        </section>

        {/* ── Artikelgrid ── */}
        <section className="py-12 pb-8" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-[1160px] mx-auto px-6 pb-16 md:pb-24">
            <InzichtenGrid artikelen={artikelen} />
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="bg-[#1C3A2A] py-10">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="font-display font-light text-[#F5F0E8] text-2xl mb-1">
                  Wil je weten hoe jouw situatie eruitziet?
                </p>
                <p className="font-body text-[#8AB89A] text-sm">
                  Vergelijk jullie uitgaven met gezinnen in dezelfde situatie.
                  Gratis, in vijf minuten.
                </p>
              </div>
              <Link
                href="/analyse"
                className="btn-primary whitespace-nowrap md:flex-shrink-0 text-center"
                style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
              >
                Start de gratis analyse →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
