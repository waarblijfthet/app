import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken met Waar blijft het | voor professionals",
  description:
    "Werk je met gezinnen die financieel krap zitten ondanks een goed inkomen? Ik pak het gelddeel aan, als aanvulling op jouw praktijk. Geen concurrentie, geen productverkoop.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken" },
  openGraph: {
    title: "Samenwerken met Waar blijft het | voor professionals",
    description:
      "Voor relatiestherapeuten, budgetcoaches, financieel planners en burnout-coaches. Ik pak het gelddeel aan.",
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
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </svg>
    ),
  },
  {
    href: "/samenwerken/budgetcoaches",
    label: "Budgetcoaches & schuldhulpverleners",
    beschrijving:
      "Cliënten die te veel verdienen voor schuldhulp, maar wel grip nodig hebben. Het middensegment dat overal buiten valt.",
    eyebrow: "Het middensegment",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="17" y="4" width="4" height="17" rx="1" />
      </svg>
    ),
  },
  {
    href: "/samenwerken/financieel-planners",
    label: "Financieel planners & vermogensadviseurs",
    beschrijving:
      "Cliënten die willen beleggen of vermogen opbouwen, maar geen helder beeld hebben van hun maandelijkse vrije ruimte.",
    eyebrow: "Cashflow als fundament",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 17 8 12 13 15 21 7" />
        <polyline points="17 7 21 7 21 11" />
      </svg>
    ),
  },
  {
    href: "/samenwerken/burnout-coaches",
    label: "Burnout-coaches & psychologen",
    beschrijving:
      "Financiële onduidelijkheid is een chronische stressor. Ik neem het gelddeel over, zodat jij kunt werken aan herstel.",
    eyebrow: "Geldstress wegnemen",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12C12 12 8 9 8 6a4 4 0 0 1 8 0c0 3-4 6-4 6z" />
        <path d="M12 12C12 12 16 9.5 18 7" />
        <path d="M12 12C12 12 8 9.5 6 7" />
      </svg>
    ),
  },
];

const stappen = [
  {
    nr: "01",
    titel: "Jij noemt het",
    tekst:
      'Je signaleert dat geld een rol speelt en noemt Waar blijft het: "Er is een gratis analyse die snel inzicht geeft." Meer hoef je niet te doen.',
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
        {/* Hero */}
        <section className="bg-background pt-12 pb-10 md:pt-16 md:pb-12 border-b border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3 md:mb-4">Voor professionals</p>
              <h1 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 md:mb-5">
                Je cliënt verdient goed<br />
                en zit toch krap. Dat<br />
                blokkeert jouw werk.
              </h1>
              <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed mb-6">
                Als therapeut, coach of adviseur signaleer je het regelmatig: een gezin of koppel
                dat krap zit ondanks een goed inkomen. Het gelddeel is niet jouw specialisme,
                maar blokkeert wel de voortgang. Ik neem dat over.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="btn-primary"
                  style={{ backgroundColor: "#C4603A" }}
                >
                  Neem contact op &rarr;
                </a>
                <a
                  href="#voorbeeld"
                  className="btn-outline"
                >
                  Bekijk een ingevuld voorbeeld
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Credibility-balk */}
        <section style={{ backgroundColor: "#1C3A2A", padding: "1rem 1.5rem" }}>
          <div className="max-w-6xl mx-auto">
            <p className="font-body text-sm" style={{ color: "rgba(245,240,232,0.75)", lineHeight: 1.6 }}>
              <span style={{ color: "#8AB89A", fontWeight: 600 }}>Ik ben Jarno.</span>{" "}
              Ik herken de cliënten die jij regelmatig ziet: goed inkomen, weinig grip, en dat financiële deel blokkeert jouw werk.
              Dat stuk pak ik aan, zodat jij je kunt richten op wat jij het beste doet.{" "}
              <Link href="/over" style={{ color: "#8AB89A", textDecoration: "underline" }}>
                Meer over mij &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* Voor wie */}
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
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "#C4603A", opacity: 0.8 }}
                    >
                      {p.icon}
                    </span>
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

        {/* Hoe werkt doorverwijzen */}
        <section className="py-12 md:py-16 border-t border-[#E8E0D0]" style={{ backgroundColor: "#F5F0E8" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 md:mb-10">
              <p className="section-eyebrow mb-3">Hoe werkt het</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight">
                Doorverwijzen in drie stappen.
              </h2>
              <p className="font-body font-light text-text-soft text-base mt-3 max-w-xl">
                Geen gedoe. Je hoeft niets te regelen, geen formulieren in te vullen
                en geen bijdrage te betalen. Je wijst door en jouw cliënt neemt het van
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

        {/* Visueel voorbeeld */}
        <section id="voorbeeld" className="py-12 md:py-16 border-t border-[#E8E0D0]" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 md:mb-10">
              <p className="section-eyebrow mb-3">Zo werkt het in de praktijk</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight">
                Van doorverwijzing tot concreet resultaat.
              </h2>
              <p className="font-body font-light text-text-soft text-base mt-3 max-w-xl">
                Illustratief voorbeeld op basis van een doorverwijzing via een relatiethereapeut.
                Namen en bedragen zijn fictief maar realistisch.
              </p>
            </div>

            {/* Stap 1: De situatie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E8E0D4",
                  borderRadius: "16px",
                  padding: "1.5rem",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}
                  >
                    01
                  </span>
                  <p className="font-body font-semibold text-primary text-sm">De doorverwijzing</p>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5E4E" }}>
                  Relatiethereapeut Marian ziet Martijn & Lisa (38 en 35, Utrecht) al drie sessies.
                  Geld is een terugkerend thema maar niet haar specialisme. Ze zegt:
                </p>
                <blockquote
                  className="font-body text-sm leading-relaxed mt-3"
                  style={{
                    color: "#1C3A2A",
                    fontStyle: "italic",
                    borderLeft: "3px solid #C4603A",
                    paddingLeft: "0.75rem",
                    marginLeft: 0,
                  }}
                >
                  &ldquo;Er is een gratis analyse van 5 minuten die jullie snel inzicht geeft in waar het
                  naartoe gaat. Dat heb ik zelf bekeken en het is concreet en zonder verplichtingen.&rdquo;
                </blockquote>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E8E0D4",
                  borderRadius: "16px",
                  padding: "1.5rem",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}
                  >
                    02
                  </span>
                  <p className="font-body font-semibold text-primary text-sm">Wat ze invullen (5 minuten)</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["Situatie", "Stel met 2 kinderen"],
                    ["Netto inkomen", "€ 5.700 / mnd"],
                    ["Huur / hypotheek", "€ 1.550 / mnd"],
                    ["Vervoer (2 auto's)", "€ 620 / mnd"],
                    ["Boodschappen", "€ 680 / mnd"],
                    ["Vaste abonnementen", "€ 245 / mnd"],
                    ["Overig dagelijks", "€ 390 / mnd"],
                  ].map(([label, waarde]) => (
                    <div key={label} className="flex justify-between items-center py-1" style={{ borderBottom: "1px solid #F0EAE0" }}>
                      <span className="font-body text-xs" style={{ color: "#8A9E8E" }}>{label}</span>
                      <span className="font-body text-sm font-medium" style={{ color: "#1C3A2A" }}>{waarde}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stap 3+4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                style={{
                  backgroundColor: "#1C3A2A",
                  border: "1px solid #2D6A4F",
                  borderRadius: "16px",
                  padding: "1.5rem",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.25rem", color: "#8AB89A", opacity: 0.7 }}
                  >
                    03
                  </span>
                  <p className="font-body font-semibold text-sm" style={{ color: "white" }}>Wat de analyse direct toont</p>
                </div>
                <div className="space-y-3">
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderRadius: "10px",
                      padding: "0.875rem",
                    }}
                  >
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>
                      Afwijking 1: Vervoer
                    </p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      Vervoerskosten liggen <strong style={{ color: "white" }}>€ 195 boven</strong> het gemiddelde van vergelijkbare gezinnen. Twee auto&apos;s plus brandstof is het grootste knelpunt.
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderRadius: "10px",
                      padding: "0.875rem",
                    }}
                  >
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>
                      Afwijking 2: Abonnementen
                    </p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      <strong style={{ color: "white" }}>€ 245 per maand</strong> aan vaste abonnementen. Op basis van vergelijkbare profielen is gemiddeld 30 tot 40% hiervan niet actief gebruikt.
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E8E0D4",
                  borderRadius: "16px",
                  padding: "1.5rem",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}
                  >
                    04
                  </span>
                  <p className="font-body font-semibold text-primary text-sm">Wat het gesprek (45 min) oplevert</p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      actie: "Abonnementen doorgelicht",
                      resultaat: "€ 80 per maand vrijgemaakt door 4 vergeten abonnementen op te zeggen.",
                    },
                    {
                      actie: "Vervoer herberekend",
                      resultaat: "Één auto + deelauto bleek €140/mnd goedkoper. Concrete berekening meegenomen.",
                    },
                    {
                      actie: "Budgetsplit opgezet",
                      resultaat: "Vaste lasten en vrij te besteden geld gesplitst in twee rekeningen. Geen verrassingen meer.",
                    },
                  ].map((item) => (
                    <div key={item.actie} className="flex gap-3 items-start">
                      <span style={{ color: "#2D6A4F", fontWeight: 700, flexShrink: 0, fontSize: "0.9rem" }}>✓</span>
                      <div>
                        <p className="font-body text-xs font-semibold" style={{ color: "#1C3A2A" }}>{item.actie}</p>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "#4A5E4E" }}>{item.resultaat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wat de professional eraan had */}
            <div
              style={{
                backgroundColor: "#F5F0E8",
                border: "1px solid #E0D8CC",
                borderRadius: "16px",
                padding: "1.5rem",
              }}
            >
              <p className="font-body font-medium text-xs uppercase tracking-widest mb-4" style={{ color: "#C4603A" }}>
                Wat Marian er als relatiethereapeut aan had
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    kop: "Betere sessies",
                    tekst: "De volgende drie sessies gingen over de relatie, niet over wie wat uitgeeft. Het gelddeel was opgelost.",
                  },
                  {
                    kop: "Minder gestresste cliënten",
                    tekst: "Martijn & Lisa kwamen rustiger terug. De onderstroom van financiële spanning was weg.",
                  },
                  {
                    kop: "Betrouwbare doorverwijzing",
                    tekst: "Marian heeft nu een vaste schakel voor het gelddeel. Ze kan het in één zin uitleggen aan elk nieuw koppel.",
                  },
                ].map((item) => (
                  <div key={item.kop}>
                    <p className="font-body font-semibold text-primary text-sm mb-1">{item.kop}</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{item.tekst}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Over Jarno */}
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
                  individuen met een modaal tot bovenmodaal inkomen die structureel krap zitten
                  zonder dat ze begrijpen waarom. Geen schuldhulp, geen beleggingsadvies. Eerlijk
                  inzicht in het maandbudget en concrete stappen om dat te veranderen.
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
                  Wat samenwerken eenvoudig maakt
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

        {/* CTA */}
        <section className="bg-dark-block py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-lg">
                <h2 className="font-display font-light text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-2">
                  Wil je kennismaken?
                </h2>
                <p className="font-body text-white/60 text-sm md:text-base leading-relaxed">
                  Stuur een korte mail. Dan plan ik een gesprek van 20 minuten met je om te kijken
                  of het past en hoe doorverwijzen er in jouw praktijk uitziet.
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
                <a
                  href="#voorbeeld"
                  className="font-body text-sm font-medium py-3.5 px-6 rounded-xl border border-white/20 text-white/70 text-center hover:border-white/40 transition-colors"
                >
                  Bekijk het voorbeeld opnieuw
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
