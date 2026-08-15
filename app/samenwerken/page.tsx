import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Samenwerken met Waar blijft het | voor professionals",
  description:
    "Herken je een cliënt bij wie geld onderdeel wordt van het probleem, maar buiten jouw expertise valt? Je hoeft het niet zelf op te lossen. Verwijs door naar de gratis analyse.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken" },
  openGraph: {
    title: "Samenwerken met Waar blijft het | voor professionals",
    description:
      "Voor relatietherapeuten, budgetcoaches, financieel planners en burnout-coaches: herken het moment waarop geld meespeelt, en verwijs door.",
    url: "https://www.waarblijfthet.nl/samenwerken",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const partners = [
  {
    href: "/samenwerken/relatietherapeuten",
    label: "Relatietherapeuten & koppelcoaches",
    eyebrow: "Geld als relatiestressor",
    wanneer:
      "Een koppel botst steeds opnieuw over geld, terwijl de ruzie niet meer over het bedrag zelf lijkt te gaan.",
    zin: "Er is een korte, onafhankelijke analyse die precies laat zien waar het in jullie budget wringt. Dat hoeven we hier niet uit te pluizen.",
    onderscheid:
      "Ik werk niet aan de relatie. Ik kijk alleen naar het geld, zodat jullie sessies daarover kunnen gaan.",
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
    eyebrow: "Het middensegment",
    wanneer:
      "Een cliënt heeft geen schulden en komt daarom niet in aanmerking voor een regulier traject, maar mist wel grip op de maand.",
    zin: "Je past niet in een schuldhulptraject, maar je hebt wel overzicht nodig. Daar is een aparte, onafhankelijke analyse voor.",
    onderscheid:
      "Ik vervang jouw traject niet. Ik ben er voor de cliënten die er net naast vallen.",
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
    eyebrow: "Cashflow als fundament",
    wanneer:
      "Een cliënt wil beginnen met beleggen of vermogen opbouwen, maar kan niet hardmaken hoeveel er structureel vrij is.",
    zin: "Voordat we een plan maken, moeten we eerst weten wat er echt vrij is. Daar is een aparte analyse voor.",
    onderscheid:
      "Ik geef geen beleggingsadvies. Ik lever de cashflow-basis waar jouw plan op rust.",
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
    eyebrow: "Geldstress wegnemen",
    wanneer:
      "Geld komt terug in bijna elk gesprek, ook als het onderwerp eigenlijk iets anders is.",
    zin: "Er is iemand die vrijblijvend met je meekijkt naar het geld, zodat we ons hier op je herstel kunnen richten.",
    onderscheid:
      "Ik werk niet aan energie of herstel. Ik neem alleen het financiële stuk over.",
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

const funnelStappen = [
  {
    nr: "01",
    wie: "Jij",
    titel: "Signaleert",
    tekst: "Geld speelt mee in het probleem waar je nu aan werkt.",
  },
  {
    nr: "02",
    wie: "Jij",
    titel: "Verwijst",
    tekst: "Je noemt Waar blijft het en wijst naar de gratis analyse.",
  },
  {
    nr: "03",
    wie: "Cliënt",
    titel: "Ziet de afwijking",
    tekst: "Vijf minuten, anoniem. De cliënt ziet zelf waar de situatie afwijkt.",
  },
  {
    nr: "04",
    wie: "Cliënt",
    titel: "Kiest zelf",
    tekst: "Alleen als de cliënt dat wil: de Geldscan (€49) voor het waarom en de vervolgstappen.",
  },
  {
    nr: "05",
    wie: "Eventueel",
    titel: "Een vervolg",
    tekst: "Een adviesgesprek of traject, buiten jouw praktijk om.",
  },
];

const caseRapport = rapportVoorSlug("stel-zonder-kinderen")!;

export default function SamenwerkenPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-12 pb-10 md:pt-16 md:pb-12 border-b border-[#E6E9E7]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-3 md:mb-4">Voor professionals</p>
              <h1 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 md:mb-5">
                Je cliënt loopt vast op geld.<br />
                Dat hoef jij niet uit te zoeken.
              </h1>
              <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed mb-6">
                Bij veel cliënten wordt geld op een gegeven moment onderdeel van het
                probleem waar jij mee bezig bent: een relatie die vastloopt op wie wat
                betaalt, een traject dat niet opschiet omdat het maandbudget niet klopt,
                iemand die ondanks een goed inkomen structureel krap zit. Dat financiële
                stuk hoef je niet zelf op te lossen. Je hoeft het alleen te herkennen,
                en door te verwijzen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="btn-primary"
                  style={{ backgroundColor: "#0B7A6E" }}
                >
                  Bespreek een cliënt &rarr;
                </a>
                <a href="#verwijzen" className="btn-outline">
                  Zo werkt doorverwijzen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Credibility-balk */}
        <section style={{ backgroundColor: "#16211F", padding: "1rem 1.5rem" }}>
          <div className="max-w-6xl mx-auto">
            <p className="font-body text-sm" style={{ color: "rgba(245,240,232,0.75)", lineHeight: 1.6 }}>
              <span style={{ color: "#86BCAF", fontWeight: 600 }}>Ik ben Jarno.</span>{" "}
              Ik pak precies het financiële stuk op dat in veel praktijken naar voren
              komt, maar buiten het eigen vakgebied valt. Onafhankelijk, zonder
              producten of provisie.{" "}
              <Link href="/over" style={{ color: "#86BCAF", textDecoration: "underline" }}>
                Meer over mij &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* Rolverdeling: gratis analyse vs. geldscan */}
        <section className="bg-background py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 max-w-2xl">
              <p className="section-eyebrow mb-3">De rolverdeling</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
                Jij herkent het. Ik zoek het uit.
              </h2>
              <p className="font-body font-light text-text-soft text-base leading-relaxed">
                Je hoeft geen financieel gesprek te voeren en geen budget te
                beoordelen. Je hoeft alleen te herkennen wanneer geld meespeelt, en te
                weten waar je naartoe verwijst.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "#0B7A6E" }}>
                  Stap 1 &middot; gratis
                </p>
                <h3 className="font-body font-semibold text-primary text-lg mb-1">De analyse</h3>
                <p className="font-body text-sm italic mb-3" style={{ color: "#4A5A56" }}>
                  Waar wijkt de cliënt af?
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Vijf minuten, anoniem, geen account nodig. Laat zien op welke punten
                  het huishouden afwijkt van vergelijkbare huishoudens. Dit is de stap
                  waar jij naar verwijst.
                </p>
              </div>
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "#0B7A6E" }}>
                  Stap 2 &middot; optioneel, &euro;49
                </p>
                <h3 className="font-body font-semibold text-primary text-lg mb-1">De Geldscan</h3>
                <p className="font-body text-sm italic mb-3" style={{ color: "#4A5A56" }}>
                  Waarom wijkt het af, wat betekent dat, en wat zijn de vervolgstappen?
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Een persoonlijk geldrapport, eventueel gevolgd door een gesprek. De
                  cliënt kiest dit zelf, ná de gratis analyse. Hier speel jij geen rol
                  meer in.
                </p>
              </div>
            </div>
            <p className="font-body font-light text-text-soft text-sm mt-4">
              Beide stappen zijn voor de cliënt. Jouw rol stopt bij de verwijzing.
            </p>
          </div>
        </section>

        {/* Funnel */}
        <section id="verwijzen" className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 md:mb-10">
              <p className="section-eyebrow mb-3">Hoe de verwijzing werkt</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight">
                Vijf stappen, en jij doet er één van.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {funnelStappen.map((s) => (
                <div key={s.nr} className="flex flex-col">
                  <p className="font-body font-medium text-xs uppercase tracking-widest mb-2" style={{ color: "#0B7A6E", opacity: 0.8 }}>
                    {s.wie}
                  </p>
                  <span
                    className="font-display font-light mb-2"
                    style={{ fontSize: "1.5rem", color: "#0B7A6E", opacity: 0.35, lineHeight: 1 }}
                  >
                    {s.nr}
                  </span>
                  <h3 className="font-body font-semibold text-primary text-sm mb-1">
                    {s.titel}
                  </h3>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">
                    {s.tekst}
                  </p>
                </div>
              ))}
            </div>
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
                  className="block card-base border border-[#E6E9E7] hover:border-[#0B7A6E] transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E", opacity: 0.8 }}>
                      {p.icon}
                    </span>
                    <div>
                      <p className="font-body text-xs font-medium mb-1" style={{ color: "#0B7A6E" }}>
                        {p.eyebrow}
                      </p>
                      <p className="font-body font-medium text-primary text-base group-hover:underline">
                        {p.label} &rarr;
                      </p>
                    </div>
                  </div>

                  <div className="pl-0 sm:pl-10 space-y-3">
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "#8B958F" }}>
                        Wanneer relevant
                      </p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                        {p.wanneer}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "#8B958F" }}>
                        In één zin aan je cliënt
                      </p>
                      <p className="font-body text-sm italic leading-relaxed" style={{ color: "#16211F" }}>
                        &ldquo;{p.zin}&rdquo;
                      </p>
                    </div>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "#0B7A6E" }}>
                      {p.onderscheid}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Voorbeeld: een echte, niet-fictieve case */}
        <section id="voorbeeld" className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8 md:mb-10 max-w-2xl">
              <p className="section-eyebrow mb-3">Zo werkt een analyse in de praktijk</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
                Niet elke analyse vindt een lek.
              </h2>
              <p className="font-body font-light text-text-soft text-base leading-relaxed">
                Een goede analyse concludeert soms dat er niets geks is aan de
                uitgaven, en dat de financiële ruimte simpelweg kleiner is dan het
                inkomen doet vermoeden. Dat is geen tegenvaller. Dat is precies waar
                vertrouwen begint. {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} echte
                geldrapporten op deze site eindigden zonder dat er een vast lek werd
                gevonden. Onderstaand voorbeeld is er een van &mdash; anoniem, namen
                weggelaten, bedragen ongewijzigd.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <p className="font-body font-semibold text-primary text-sm mb-2">De situatie</p>
                <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#4A5A56" }}>
                  {caseRapport.profiel}
                </p>
                <blockquote
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "#16211F", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem" }}
                >
                  &ldquo;{caseRapport.vermoeden}&rdquo;
                </blockquote>
                <p className="font-body text-xs mt-2" style={{ color: "#8B958F" }}>
                  {caseRapport.vermoedenBedrag}
                </p>
              </div>

              <div style={{ backgroundColor: "#16211F", border: "1px solid #0B7A6E", borderRadius: "16px", padding: "1.5rem" }}>
                <p className="font-body font-semibold text-sm mb-2" style={{ color: "#86BCAF" }}>
                  Wat de analyse liet zien
                </p>
                <p className="font-display font-light text-lg mb-2" style={{ color: "white" }}>
                  &ldquo;{caseRapport.uitkomstKop}&rdquo;
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                  {caseRapport.uitkomst}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border p-5" style={{ borderColor: "#E6E9E7", backgroundColor: "#F7F8F7" }}>
                <p className="font-body font-medium text-xs uppercase tracking-widest mb-2" style={{ color: "#8B958F" }}>
                  Mocht blijven &mdash; geen probleem
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Reizen, horeca en vrije tijd. Bewuste keuzes, geen buitensporige
                  uitgave voor dit inkomen.
                </p>
              </div>
              <div className="rounded-xl border p-5" style={{ borderColor: "#0B7A6E", backgroundColor: "#F7F8F7" }}>
                <p className="font-body font-medium text-xs uppercase tracking-widest mb-2" style={{ color: "#0B7A6E" }}>
                  Wél relevant
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  De optelsom van die keuzes botste met hun eigen spaardoel: €40.000
                  eigen geld binnen drie jaar.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
              <p className="font-body font-medium text-xs uppercase tracking-widest mb-3" style={{ color: "#0B7A6E" }}>
                De vervolgstap
              </p>
              <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "#16211F" }}>
                {caseRapport.plan[0]} {caseRapport.plan[1]}
              </p>
              <blockquote
                className="font-body text-sm leading-relaxed mb-4"
                style={{ color: "#4A5A56", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem" }}
              >
                &ldquo;{caseRapport.evaluatie}&rdquo;
              </blockquote>
              <Link
                href={`/rapporten/${caseRapport.slug}`}
                className="font-body text-sm font-medium"
                style={{ color: "#0B7A6E" }}
              >
                Lees het volledige rapport &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Over Jarno */}
        <section className="bg-card py-12 md:py-16 border-t border-[#E6E9E7]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="section-eyebrow mb-3">Over Jarno</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-5">
                  Onafhankelijk, en dat is precies de kracht
                </h2>
                <p className="font-body font-light text-text-soft text-sm md:text-base leading-relaxed mb-4">
                  Ik ben Jarno Koopman, oprichter van Waar blijft het. Ik ben geen
                  budgetcoach, schuldhulpverlener, financieel planner,
                  hypotheekadviseur, beleggingsadviseur of productverkoper. Ik lever
                  een onafhankelijke analyse van het volledige huishouden, zonder
                  provisie of productbelang.
                </p>
                <p className="font-body font-light text-text-soft text-sm md:text-base leading-relaxed mb-5">
                  Dat kan uitkomen op concrete stappen. Het kan ook uitkomen op: er is
                  eigenlijk niets geks aan jullie uitgaven, de financiële ruimte is
                  simpelweg kleiner dan het inkomen doet vermoeden. Beide antwoorden
                  zijn evenveel waard, en ik verkoop geen van beide harder dan de
                  ander.
                </p>
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="font-body text-sm font-medium"
                  style={{ color: "#0B7A6E", textDecoration: "none" }}
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
                        "Ik doe niets wat jij doet. Ik kijk uitsluitend naar het geld, niet naar de relatie, het herstel of het vermogen.",
                    },
                    {
                      kop: "Geen productverkoop",
                      tekst:
                        "Geen hypotheken, verzekeringen of beleggingsproducten. Analyse en begeleiding, niets meer.",
                    },
                    {
                      kop: "Privacy-bewust",
                      tekst:
                        "De analyse is anoniem. Er wordt geen financiële data opgeslagen die terugleidt naar jouw cliënt.",
                    },
                  ].map((item) => (
                    <div key={item.kop} className="flex gap-3">
                      <div
                        className="mt-1.5 w-1 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: "#0B7A6E", opacity: 0.6 }}
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
                  Heb je een cliënt in gedachten?
                </h2>
                <p className="font-body text-white/60 text-sm md:text-base leading-relaxed">
                  Als geld bij een cliënt steeds onderdeel blijkt van het probleem, is
                  een kort gesprek genoeg om te bepalen of dit kan helpen. Geen
                  verkooppraatje, vijftien minuten.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
                  className="btn-primary md:w-auto"
                  style={{ backgroundColor: "#0B7A6E" }}
                >
                  Mail Jarno &rarr;
                </a>
                <a
                  href="#voorbeeld"
                  className="font-body text-sm font-medium py-3.5 px-6 rounded-xl border border-white/20 text-white/70 text-center hover:border-white/40 transition-colors"
                >
                  Bekijk het voorbeeld nog eens
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
