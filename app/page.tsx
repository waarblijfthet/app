import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCards from "@/components/HeroCards";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Waar blijft het — Goed salaris, toch altijd krap?",
  description:
    "Je bent niet de enige — en het ligt niet aan wat je verdient. Het ligt aan hoe het verdeeld wordt. Gratis analyse voor gezinnen met een modaal of boven-modaal inkomen.",
  alternates: { canonical: "https://waarblijfthet.nl" },
  openGraph: {
    title: "Waar blijft het — Goed salaris, toch altijd krap?",
    description:
      "Je bent niet de enige — en het ligt niet aan wat je verdient. Het ligt aan hoe het verdeeld wordt.",
    url: "https://waarblijfthet.nl",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Waar blijft het",
  url: "https://waarblijfthet.nl",
  description:
    "Gratis financiële analyse voor Nederlandse gezinnen met een modaal of boven-modaal inkomen.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://waarblijfthet.nl/inzichten?q={search_term_string}",
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
        {/* SECTIE 1 — Hero */}
        <section className="min-h-screen bg-background pt-16 flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            <div>
              {/* FIX 3: "Binnenkort beschikbaar" pill verwijderd */}

              <h1 className="font-display font-light text-primary mb-6">
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-tight">
                  Goed salaris.
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-tight italic text-accent">
                  Toch altijd krap.
                </span>
              </h1>

              <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-10 max-w-md">
                Je bent niet de enige — en het ligt niet aan wat je verdient.
                Het ligt aan hoe het verdeeld wordt. Wij laten zien hoe je van
                krap naar ruim gaat, zonder meer te hoeven verdienen.
              </p>

              <Link
                href="/analyse"
                className="btn-primary"
                style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
              >
                Start de gratis analyse →
              </Link>
              <p
                className="font-body"
                style={{
                  fontSize: "0.8rem",
                  color: "#8A9E8E",
                  marginTop: "0.75rem",
                }}
              >
                Liever eerst rondkijken?{" "}
                <Link
                  href="/inzichten"
                  style={{ color: "#C4603A", textDecoration: "none" }}
                >
                  Lees onze artikelen →
                </Link>
              </p>
            </div>

            <HeroCards />
          </div>
        </section>

        {/* SECTIE 2 — Pijn */}
        <section className="bg-background py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <p className="section-eyebrow mb-4">Herken je dit?</p>
              <h2 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-2xl">
                Aan het einde van de maand vraag je je af: waar is het gebleven?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="card-base border border-[#E8E0D0]">
                <div className="text-2xl mb-4">💸</div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  Het verdwijnt gewoon
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Je verdient goed, er zijn geen grote schulden, maar er blijft
                  nooit iets over. En je weet niet eens waar het naartoe gaat.
                </p>
              </article>

              <article className="card-base border border-[#E8E0D0]">
                <div className="text-2xl mb-4">🏡</div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  De buurman doet het wel
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Hij gaat op vakantie, koopt een auto, verbouwt. Jij vraagt je
                  af hoe hij dat doet. Hetzelfde inkomen, een andere uitkomst.
                </p>
              </article>

              <article className="card-base border border-[#E8E0D0]">
                <div className="text-2xl mb-4">😶</div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  Je praat er niet over
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Je schaamt je een beetje. Want je verdient toch genoeg? Je
                  zoekt hulp maar vindt alleen schuldhulp of beleggersadvies.
                  Nooit iets voor jou.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTIE 2b — Testimonials */}
        <section className="py-24" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <p className="section-eyebrow mb-4">Wat anderen zeggen</p>
              <h2 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-xl">
                Herkenbaar voor veel gezinnen
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "We dachten dat we gewoon slecht met geld omgingen — totdat we zagen dat bijna elk gezin in onze situatie hetzelfde had.",
                  naam: "Marieke",
                  detail: "Moeder van twee, Utrecht",
                  over: "+€280 per maand over na aanpassing",
                },
                {
                  quote:
                    "Ik verdiende goed maar had nooit rust over geld. De analyse liet zien waar het echt naartoe ging.",
                  naam: "Thomas",
                  detail: "40 jaar, gezin van vier, Eindhoven",
                  over: "Eerste buffer ooit: €2.000",
                },
                {
                  quote:
                    "Eindelijk iemand die niet meteen over beleggen begint. Gewoon eerlijk kijken naar wat er in en uit gaat.",
                  naam: "Sandra & Peter",
                  detail: "Twee inkomens, drie kinderen, Tilburg",
                  over: "€340 minder vaste lasten per maand",
                },
              ].map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl p-6 border border-[#E8E0D4] flex flex-col gap-4"
                  style={{ backgroundColor: "#F5F0E8" }}
                >
                  <p className="font-body font-light text-[#1C3A2A] text-base leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div
                    className="pt-4 border-t border-[#E8E0D4]"
                  >
                    <p className="font-body font-medium text-[#1C3A2A] text-sm">
                      {t.naam}
                    </p>
                    <p className="font-body text-[#8A9E8E] text-xs">
                      {t.detail}
                    </p>
                    <p className="font-body text-[#2D6A4F] text-xs font-medium mt-1">
                      {t.over}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="font-body text-xs mt-6 text-center"
              style={{ color: "#8A9E8E" }}
            >
              Namen zijn gefictionaliseerd ter bescherming van privacy.
              Resultaten kunnen variëren.
            </p>
          </div>
        </section>

        {/* SECTIE 3 — Quote blok */}
        <section className="bg-dark-block py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-start justify-start">
            <span
              className="font-display text-white/5 leading-none"
              style={{ fontSize: "clamp(160px, 25vw, 320px)", lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <blockquote className="max-w-3xl">
              <p className="font-display font-light text-white text-2xl sm:text-3xl lg:text-4xl leading-snug italic mb-8">
                &ldquo;We verdienden samen goed, maar elke maand hetzelfde gevoel. Tot we
                begrepen waar het echt naartoe ging — en dat veranderde alles.&rdquo;
              </p>
              {/* FIX 5: quote attribuering aangepast */}
              <footer className="text-white/50 font-body text-sm">
                — Jarno &amp; partner, twee ouders uit Tilburg
              </footer>
            </blockquote>
          </div>
        </section>

        {/* SECTIE 4 — Hoe het werkt */}
        <section className="bg-card py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <p className="section-eyebrow mb-4">Hoe het werkt</p>
              <h2 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-xl">
                Drie stappen naar meer overhouden
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
              {/* connector line desktop */}
              <div
                className="hidden md:block absolute top-8 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-[#D6CEBC]"
                aria-hidden="true"
              />

              <div className="relative p-6 md:p-8">
                <div className="w-16 h-16 rounded-xl bg-green-light flex items-center justify-center mb-6">
                  <span className="font-display font-medium text-primary text-2xl">
                    1
                  </span>
                </div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  Gratis analyse
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Vul je situatie in en zie direct waar jouw geld naartoe gaat —
                  vergeleken met vergelijkbare gezinnen.
                </p>
              </div>

              <div className="relative p-6 md:p-8 border-t border-[#E8E0D0] md:border-t-0 md:border-l md:border-r md:border-[#E8E0D0]">
                <div className="w-16 h-16 rounded-xl bg-accent-bg flex items-center justify-center mb-6">
                  <span className="font-display font-medium text-accent text-2xl">
                    2
                  </span>
                </div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  Persoonlijk inzicht
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Eén concrete afwijking in jouw situatie, uitgelegd in gewone
                  taal, zonder jargon of oordeel.
                </p>
              </div>

              <div className="relative p-6 md:p-8 border-t border-[#E8E0D0] md:border-t-0">
                <div className="w-16 h-16 rounded-xl bg-[#F0EDE6] flex items-center justify-center mb-6">
                  <span className="font-display font-medium text-text-soft text-2xl">
                    3
                  </span>
                </div>
                <h3 className="font-display font-light text-primary text-xl mb-3">
                  Bijsturen en bijhouden
                </h3>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  Wekelijkse check-ins via WhatsApp. Een stok achter de deur van
                  iemand die meekijkt.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/analyse" className="btn-primary">
                Start de gratis analyse
              </Link>
            </div>
          </div>
        </section>

        {/* SECTIE 5 — Statistieken */}
        <section className="bg-background py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <p className="section-eyebrow mb-4">
                Het probleem is groter dan je denkt
              </p>
              <h2 className="font-display font-light text-primary text-4xl sm:text-5xl max-w-xl">
                Jij bent niet de enige
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FIX 8: bronvermeldingen toegevoegd */}
              <div className="card-base border border-[#E8E0D0]">
                <p className="font-display font-light text-primary text-6xl mb-4">
                  47%
                </p>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  van Nederlandse huishoudens is financieel kwetsbaar — ook met
                  een goed inkomen
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.7rem",
                    color: "#8A9E8E",
                    marginTop: "6px",
                    fontStyle: "italic",
                  }}
                >
                  (Bron: Deloitte, 2024)
                </p>
              </div>

              <div className="card-base border border-[#E8E0D0]">
                <p className="font-display font-light text-primary text-6xl mb-4">
                  1 op 3
                </p>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  gezinnen heeft moeite rond te komen, ongeacht wat ze verdienen
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.7rem",
                    color: "#8A9E8E",
                    marginTop: "6px",
                    fontStyle: "italic",
                  }}
                >
                  (Bron: Nibud, 2026)
                </p>
              </div>

              <div className="card-base border border-[#E8E0D0]">
                <p className="font-display font-light text-primary text-6xl mb-4">
                  3%
                </p>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  van Nederlanders praat openlijk over geldstress — de rest
                  draagt het alleen
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.7rem",
                    color: "#8A9E8E",
                    marginTop: "6px",
                    fontStyle: "italic",
                  }}
                >
                  (Bron: Deloitte, 2024)
                </p>
              </div>
            {/* Inline CTA na statistieken */}
            <div className="mt-10 text-center">
              <p className="text-sm text-[#4A5E4E] mb-4">
                Benieuwd in welke categorie jullie vallen?
              </p>
              <Link
                href="/analyse"
                className="inline-flex items-center gap-2 bg-[#1C3A2A] text-[#F5F0E8] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#2D6A4F] transition-colors"
              >
                Doe de gratis analyse <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTIE 6 — Finale CTA */}
        <section className="bg-dark-block py-24" id="aanmelden-footer">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-4xl sm:text-5xl mb-6">
              Klaar om te zien waar het naartoe gaat?
            </h2>
            <p className="text-white/70 font-body font-light text-lg mb-10 max-w-md mx-auto">
              Doe de gratis analyse en zie in vijf minuten hoe jullie het doen
              ten opzichte van vergelijkbare gezinnen.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Start de gratis analyse →
            </Link>
            <p className="text-white/40 font-body text-xs mt-6">
              Al meer dan 50 gezinnen gingen je voor.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
