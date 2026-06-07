import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken met Waar blijft het, voor professionals",
  description:
    "Werk je met gezinnen die financieel krap zitten ondanks een goed inkomen? Waar blijft het pakt het gelddeel aan, als aanvulling op jouw praktijk.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken" },
  openGraph: {
    title: "Samenwerken met Waar blijft het, voor professionals",
    description:
      "Voor relatiestherapeuten, budgetcoaches, financieel planners en burnout coaches. Wij pakken het gelddeel aan.",
    url: "https://www.waarblijfthet.nl/samenwerken",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const partners = [
  {
    href: "/samenwerken/relatiestherapeuten",
    label: "Relatiestherapeuten & koppelcoaches",
    beschrijving:
      "Koppels die bij jou komen over communicatie of verwijdering, terwijl het eigenlijke probleem een onopgelost maandbudget is.",
    eyebrow: "Geld als relatiestressor",
    icon: "💬",
  },
  {
    href: "/samenwerken/budgetcoaches",
    label: "Budgetcoaches & schuldhulpverleners",
    beschrijving:
      "Cliënten die te veel verdienen voor schuldhulp, maar wel grip nodig hebben. Het middensegment dat overal buiten valt.",
    eyebrow: "Het middensegment",
    icon: "📊",
  },
  {
    href: "/samenwerken/financieel-planners",
    label: "Financieel planners & vermogensadviseurs",
    beschrijving:
      "Cliënten die willen beleggen of vermogen opbouwen, maar geen helder beeld hebben van hun maandelijkse vrije ruimte.",
    eyebrow: "Cashflow als fundament",
    icon: "📈",
  },
  {
    href: "/samenwerken/burnout-coaches",
    label: "Burnout coaches & psychologen",
    beschrijving:
      "Financiële onduidelijkheid is een chronische stressor. Wij nemen het gelddeel over, zodat jij kunt werken aan herstel.",
    eyebrow: "Geldstress wegnemen",
    icon: "🌿",
  },
];

const stappen = [
  {
    nr: "01",
    titel: "Jij noemt het",
    tekst:
      'Je signaleert dat geld een rol speelt en noemt Waar blijft het: "Er is een gratis analyse die jullie snel inzicht geeft." Meer hoef je niet te doen.',
  },
  {
    nr: "02",
    titel: "Jouw cliënt start",
    tekst:
      "Ze doen de gratis analyse in 5 minuten, anoniem. Geen account, geen verplichtingen. Ze zien direct wat er speelt.",
  },
  {
    nr: "03",
    titel: "Verdieping als dat past",
    tekst:
      "Is er aanleiding voor meer? Dan is er een eenmalig adviesgesprek of een persoonlijk traject. Jij bepaalt hoe actief je betrokken wilt zijn.",
  },
];

export default function SamenwerkenPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* ── Hero ── */}
        <section className="bg-background pt-12 pb-10 md:pt-16 md:pb-12 border-b border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3 md:mb-4">Voor professionals</p>
              <h1 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 md:mb-5">
                Jij ziet dat geld speelt.<br />
                Wij lossen het op.
              </h1>
              <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed mb-6">
                Als therapeut, coach of adviseur signaleer je het regelmatig: een gezin of koppel
                dat krap zit ondanks een goed inkomen. Het gelddeel is niet jouw specialisme
                maar blokkeert wel de voortgang. Waar blijft het neemt dat over.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="btn-primary"
                  style={{ backgroundColor: "#C4603A" }}
                >
                  Neem contact op &rarr;
                </a>
                <Link
                  href="/analyse"
                  className="btn-outline"
                >
                  Bekijk de analyse voor cliënten
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Voor wie ── */}
        <section className="bg-background py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <p className="section-eyebrow mb-3">Voor welke professionals</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight">
                Herken jij dit bij jouw cliënten?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block card-base border border-[#E8E0D0] hover:border-[#C4603A] transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5 shrink-0">{p.icon}</span>
                    <div>
                      <p className="font-body text-xs font-medium mb-1" style={{ color: "#C4603A" }}>
                        {p.eyebrow}
                      </p>
                      <p className="font-body font-medium text-primary text-base mb-2 group-hover:underline">
                        {p.label} &rarr;
                      </p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                        {p.beschrijving}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hoe werkt doorverwijzen ── */}
        <section className="py-12 md:py-16 border-t border-[#E8E0D0]" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 md:mb-10">
              <p className="section-eyebrow mb-3">Hoe werkt het</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight">
                Doorverwijzen in drie stappen.
              </h2>
              <p className="font-body font-light text-text-soft text-base mt-3 max-w-xl">
                Geen gedoe. Je hoeft niets te regelen, geen formulieren in te vullen
                en geen bijdrage te betalen. Je wijst door en je cliënt neemt het van
                daar over.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stappen.map((s) => (
                <div key={s.nr} className="flex flex-col">
                  <span
                    className="font-display font-light mb-3"
                    style={{ fontSize: "2rem", color: "#C4603A", opacity: 0.4, lineHeight: 1 }}
                  >
                    {s.nr}
                  </span>
                  <h3 className="font-body font-semibold text-primary text-base mb-2">
                    {s.titel}
                  </h3>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    {s.tekst}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Over Jarno ── */}
        <section className="bg-card py-12 md:py-16 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="section-eyebrow mb-3">Over Jarno</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-5">
                  Wie ben ik en waarom past dit?
                </h2>
                <p className="font-body font-light text-text-soft text-sm md:text-base leading-relaxed mb-4">
                  Ik ben Jarno Koopman, oprichter van Waar blijft het. Ik help gezinnen en
                  koppels met een modaal tot bovenmodaal inkomen die structureel krap zitten
                  zonder dat ze begrijpen waarom. Geen schuldhulp, geen beleggingsadvies. Gewoon
                  eerlijk inzicht in het maandbudget en concrete stappen om dat te veranderen.
                </p>
                <p className="font-body font-light text-text-soft text-sm md:text-base leading-relaxed mb-5">
                  Ik werk onafhankelijk. Ik verkoop geen financiële producten en heb geen
                  provisie-belangen. Dat maakt samenwerking eenvoudig: jij doet wat jij goed
                  kunt, ik pak het gelddeel aan.
                </p>
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="font-body text-sm font-medium"
                  style={{ color: "#C4603A", textDecoration: "none" }}
                >
                  hallo@waarblijfthet.nl &rarr;
                </a>
              </div>

              <div>
                <p className="font-body font-medium text-primary text-sm mb-4 uppercase tracking-wide">
                  Wat maakt samenwerken eenvoudig
                </p>
                <div className="space-y-4">
                  {[
                    {
                      kop: "Geen concurrentie",
                      tekst:
                        "Ik doe niets wat jij doet. Ik pak uitsluitend het financiële inzicht aan, niet de relatie, het herstel of het vermogen.",
                    },
                    {
                      kop: "Geen productverkoop",
                      tekst:
                        "Geen hypotheken, verzekeringen of beleggingsproducten. Puur inzicht en begeleiding, niets meer.",
                    },
                    {
                      kop: "Privacy-bewust",
                      tekst:
                        "De gratis analyse is anoniem. Er wordt geen financiële data opgeslagen die terugleidt naar jouw cliënt.",
                    },
                    {
                      kop: "Laagdrempelig instappen",
                      tekst:
                        "Jouw cliënt kan starten met een gratis analyse, helemaal vrijblijvend. Geen gedwongen vervolgstap.",
                    },
                  ].map((item) => (
                    <div key={item.kop} className="flex gap-3">
                      <div
                        className="mt-1.5 w-1 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: "#C4603A", opacity: 0.6 }}
                      />
                      <div>
                        <p className="font-body font-semibold text-primary text-sm mb-0.5">{item.kop}</p>
                        <p className="font-body font-light text-text-soft text-sm leading-relaxed">{item.tekst}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-dark-block py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-lg">
                <h2 className="font-display font-light text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-2">
                  Wil je kennismaken?
                </h2>
                <p className="font-body text-white/60 text-sm md:text-base leading-relaxed">
                  Stuur een korte mail. Dan plannen we een gesprek van 20 minuten om te kijken
                  of we passen en hoe doorverwijzen er in jouw praktijk uitziet.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="btn-primary md:w-auto"
                  style={{ backgroundColor: "#C4603A" }}
                >
                  Mail Jarno &rarr;
                </a>
                <Link
                  href="/analyse"
                  className="font-body text-sm font-medium py-3.5 px-6 rounded-xl border border-white/20 text-white/70 text-center hover:border-white/40 transition-colors"
                >
                  Bekijk de gratis analyse voor cliënten
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
