import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UitgavenscanClient from "./UitgavenscanClient";

export const metadata: Metadata = {
  title: "Uitgavenscan: zie uit je eigen bankafschrift waar je geld blijft",
  description:
    "Kies een afschrift uit je bankapp en zie per maand wat er binnenkomt, wat vastligt en wat er onderweg verdwijnt. Je afschrift blijft op je eigen apparaat. Gratis, met een kort voorlopig advies.",
  alternates: { canonical: "https://www.waarblijfthet.nl/uitgavenscan" },
  openGraph: {
    title: "Uitgavenscan | Waar blijft het",
    description: "Zie uit je eigen bankafschrift waar je geld blijft. Je afschrift blijft op je eigen apparaat.",
    url: "https://www.waarblijfthet.nl/uitgavenscan",
  },
};

export default function UitgavenscanPagina() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <section className="pt-8 pb-16 md:pt-14 md:pb-20">
          <div className="px-4 sm:px-6">
            <UitgavenscanClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
