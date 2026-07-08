import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCards from "@/components/HeroCards";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Waar blijft het, Goed salaris, toch altijd krap?",
  description:
    "Je hebt geen schulden en je verdient genoeg, maar aan het einde van de maand is het weg. Gratis analyse: zie in 5 minuten waar je geld structureel naartoe gaat.",
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
    "Gratis financiële analyse voor Nederlandse huishoudens met een modaal of boven-modaal inkomen.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.waarblijfthet.nl/inzichten?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const testimonials = [
  {
    quote:
      "Elk jaar werden we overvallen door verjaardagen, de vakantie en december. We hebben die kosten uitgerekend en opgesplitst in kleine potjes per maand. Nu staat de kerstpot er gewoon. Geen stress meer in de dure maanden.",
    naam: "Daan & Roos",
    initialen: "DR",
    detail: "Twee kinderen, koopwoning",
    resultaat: "Geen verrassingen in de piekmaanden",
  },
  {
    quote:
      "Onze boodschappen waren een zwart gat: impulsaankopen, nooit een plan. Samen een weekbudget gezet en na elke boodschappenronde een korte check-in. Dat hield ons scherp, juist op de momenten dat het misging.",
    naam: "Bram & Eva",
    initialen: "BE",
    detail: "Gezin van vier, twee inkomens",
    resultaat: "Boodschappen eindelijk onder controle",
  },
  {
    quote:
      "De BSO-kosten liepen de pan uit. In plaats van alleen bezuinigen dachten we samen na over flexibeler werken. Twee dagen minder opvang scheelt fors, en het is rustiger thuis.",
    naam: "Karim & Noor",
    initialen: "KN",
    detail: "Twee jonge kinderen",
    resultaat: "Twee dagen minder BSO, rust en geld over",
  },
];

const stappen = [
  {
    nr: "1",
    kleur: "bg-green-light",
    nrKleur: "text-primary",
    titel: "Gratis analyse · 5 minuten",
    tekst:
      "Vijf korte stappen: woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven. Schattingen zijn goed genoeg, je hoeft niets op te zoeken en geen bank te koppelen. Geen account, geen creditcard.",
  },
  {
    nr: "2",
    kleur: "bg-accent-bg",
    nrKleur: "text-accent",
    titel: "Direct inzicht, concreet en eerlijk",
    tekst:
      "Het resultaat staat direct op je scherm: in welke categorie je valt en de twee of drie plekken waar het bij jou structureel fout gaat, uitgelegd in gewone taal. Een e-mailadres is niet verplicht en niemand belt of mailt je na, tenzij je daar zelf om vraagt. Gewoon: dit is wat er speelt.",
  },
  {
    nr: "3",
    kleur: "bg-[#F0EDE6]",
    nrKleur: "text-text-soft",
    titel: "Jij kiest het vervolg, of niet",
    tekst:
      "Zelf verder met je resultaat kan prima. Wil je meer? Kies de geldscan (€49): ik kijk persoonlijk naar je cijfers en stuur je een persoonlijk geldrapport met je drie grootste lekken, zonder gesprek. Of plan een adviesgesprek van 45 minuten (€125). Geen abonnement, alleen als jij dat wilt.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="min-h-screen bg-background pt-16 flex items-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
              opacity: 0.035,
            }}
          />

          <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full relative z-10">
            <div>
              <p className="section-eyebrow mb-4 sm:mb-5 animate-hero-1">
                Financiële coaching · Nederland
              </p>

              <h1 className="font-display font-light text-primary mb-2 animate-hero-2">
                <span className="block text-[2.25rem] sm:text-5xl lg:text-7xl leading-tight">
                  Goed salaris.
                </span>
                <span className="block text-[2.25rem] sm:text-5xl lg:text-7xl leading-tight italic text-accent">
                  Toch altijd krap.
                </span>
              </h1>

              <div
                className="animate-hero-2 mb-6 sm:mb-7"
                aria-hidden="true"
                style={{
                  width: "3rem",
                  height: "2px",
                  backgroundColor: "#C4603A",
                  opacity: 0.5,
                  marginTop: "1rem",
                }}
              />

              <p className="text-text-soft font-body font-light text-base sm:text-lg leading-relaxed mb-8 animate-hero-3">
                Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde
                van elke maand is het gewoon weg. Je weet niet precies waarheen.
                Dat ligt niet aan jou, het is een structuurprobleem. Ik laat zien
                waar het naartoe gaat, zodat je het kunt bijsturen.
              </p>

              <div className="animate-hero-4 mb-5">
                <Link
                  href="/analyse"
                  className="btn-primary"
                  style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
                >
                  Start de gratis analyse &rarr;
                </Link>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.8rem",
                    color: "#8A9E8E",
                    marginTop: "0.6rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  Gratis &middot; 5 minuten &middot; Geen account of bankkoppeling &middot; Resultaat direct op je scherm
                </p>
              </div>

              <p
                className="font-body animate-hero-5"
                style={{ fontSize: "0.85rem", color: "#8A9E8E" }}
              >
                Voor gezinnen, stellen én alleenstaanden. Na de gratis analyse
                bepaal jij het vervolg: zelf verder met het resultaat,
                een persoonlijk geldrapport voor €49 of een gesprek van €125.{" "}
                <Link href="/aanbod" style={{ color: "#C4603A", textDecoration: "none" }}>
                  Bekijk het aanbod &rarr;
                </Link>
              </p>
            </div>

            <HeroCards />
          </div>
        </section>

        {/* ── PIJN ─────────────────────────────────────────────── */}
        <section className="bg-background py-16 md:py-24 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 md:mb-14">
              <p className="section-eyebrow mb-3 md:mb-4">Dit klinkt waarschijnlijk bekend</p>
              <h2 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
                Je doet het goed, en toch klopt het niet.
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-[#E8E0D0]">
              {[
                {
                  nr: "01",
                  titel: "Er blijft nooit iets over, terwijl je het je niet kunt verklaren",
                  tekst:
                    "Je hebt een goed inkomen. Geen grote schulden, geen gekke gewoontes. Maar elke maand is het weg voor je goed en wel beseft hebt wat er is uitgegeven. Je weet dat het ergens naartoe gaat, maar niet waar precies.",
                },
                {
                  nr: "02",
                  titel: "Je hebt het al geprobeerd. En het werkt gewoon niet.",
                  tekst:
                    "Apps geprobeerd. Spreadsheets gemaakt. Goede voornemens in januari. Het helpt een paar weken, daarna glijd je terug in hetzelfde patroon. Niet omdat je het niet wilt, maar omdat je de juiste structuur mist.",
                },
                {
                  nr: "03",
                  titel: "Je praat er niet over, want je verdient toch genoeg?",
                  tekst:
                    "Schuldhulp is voor anderen. Beleggingsadvies is voor later. Maar structureel krap terwijl je goed verdient: daar is eigenlijk geen plek voor. Dus houd je het bij jezelf, terwijl het elke maand knaagt.",
                },
              ].map((p) => (
                <div
                  key={p.nr}
                  className="py-6 md:py-8 grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 md:gap-10 items-start"
                >
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.75rem", color: "#C4603A", opacity: 0.35, lineHeight: 1, paddingTop: "2px" }}
                    aria-hidden="true"
                  >
                    {p.nr}
                  </span>
                  <div>
                    <h3 className="font-body font-medium text-primary text-base mb-2">{p.titel}</h3>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{p.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 md:mb-12">
              <p className="section-eyebrow mb-3 md:mb-4">Echte verhalen</p>
              <h2 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl max-w-xl leading-tight">
                Wat het anderen opleverde
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl p-5 md:p-6 flex flex-col gap-4"
                  style={{ backgroundColor: "#F5F0E8", borderLeft: "3px solid #C4603A" }}
                >
                  <p className="font-body font-light text-[#1C3A2A] text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-[#E8E0D4]">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#1C3A2A" }}
                        aria-hidden="true"
                      >
                        <span
                          className="font-body font-medium text-[#F5F0E8]"
                          style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
                        >
                          {t.initialen}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-medium text-[#1C3A2A] text-sm">{t.naam}</p>
                        <p className="font-body text-[#8A9E8E] text-xs">{t.detail}</p>
                      </div>
                    </div>
                    <span
                      className="inline-block font-body text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#D4EDE0", color: "#1C3A2A" }}
                    >
                      {t.resultaat}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-body text-xs mt-5 md:mt-6 text-center" style={{ color: "#8A9E8E" }}>
              Namen zijn aangepast voor privacy. Ervaringen van echte gezinnen. Alleenstaand? De analyse vergelijkt jou met huishoudens in jouw situatie, niet met een gezin.
            </p>
          </div>
        </section>

        {/* ── WIE IS JARNO ─────────────────────────────────────── */}
        <section className="bg-card py-16 md:py-24 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              <div>
                <p className="section-eyebrow mb-5 md:mb-6">Wie staat hier achter?</p>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#1C3A2A" }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-display font-light text-[#F5F0E8]"
                      style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}
                    >
                      J
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-primary text-base">Jarno Koopman</p>
                    <p className="font-body text-text-muted text-sm">Oprichter, Waar blijft het</p>
                  </div>
                </div>
                <blockquote className="mb-5 md:mb-6">
                  <p
                    className="font-display font-light text-primary leading-snug italic"
                    style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}
                  >
                    &ldquo;We verdienden samen goed, maar elke maand hetzelfde gevoel. Totdat we
                    begrepen waar het naartoe ging. Dat veranderde alles.&rdquo;
                  </p>
                </blockquote>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-3 md:mb-4">
                  Ik help mensen die goed verdienen maar structureel krap zitten. Gezinnen,
                  stellen en alleenstaanden. Ik verdien zelf goed en heb jarenlang niet
                  begrepen waarom het nooit klopte. Daarom weet ik waar je moet kijken. Geen schuldhulpverlening, geen
                  beleggingsadvies. Gewoon eerlijk inzicht in wat er speelt en concrete
                  stappen die werken.
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Ik werk onafhankelijk. Ik verkoop geen financiële producten en krijg geen
                  provisie, dus het enige dat ik lever is inzicht. Geen abonnementen,
                  geen doorlopende trajecten. Je betaalt alleen voor wat je nodig hebt.
                </p>
                <div className="mt-6 md:mt-8 flex flex-wrap gap-6">
                  <Link
                    href="/over"
                    className="font-body text-sm font-medium"
                    style={{ color: "#C4603A", textDecoration: "none" }}
                  >
                    Meer over Jarno &rarr;
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/jarnokoopman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-medium"
                    style={{ color: "#C4603A", textDecoration: "none" }}
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              </div>

              <div className="space-y-3 md:space-y-5">
                <h3 className="font-display font-light text-primary text-2xl mb-1 md:mb-2">
                  Wat maakt dit anders?
                </h3>
                {[
                  ["Geen schuldhulp", "Dit is voor mensen die genoeg verdienen maar grip missen, niet voor mensen in financiële nood."],
                  ["Geen abonnement", "Geldscan voor €49 of een gesprek voor €125, allebei eenmalig. Klaar. Geen maandelijkse kosten, geen doorlopend traject."],
                  ["Geen oordeel", "Je verdient goed. De structuur klopt gewoon niet. Ik kijk naar wat er weglekt, niet naar wat jij fout zou doen."],
                  ["Concrete uitkomst", "Na de gratis analyse weet je direct in welke categorie je valt en wat de grootste afwijking is."],
                  ["Ook met wisselend inkomen", "Zzp'er of wisselende maanden? Vul je gemiddelde maandinkomen in. Juist dan geeft zicht op je vaste structuur rust."],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-3 md:gap-4 p-4 rounded-xl" style={{ backgroundColor: "#F5F0E8" }}>
                    <div
                      className="w-1.5 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: "#C4603A", height: "1.1rem" }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-body font-medium text-primary text-sm mb-0.5">{t}</p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOE HET WERKT ────────────────────────────────────── */}
        <section className="bg-background py-16 md:py-24 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 md:mb-12">
              <p className="section-eyebrow mb-3 md:mb-4">Hoe het werkt</p>
              <h2 className="font-display font-light text-primary text-3xl md:text-4xl leading-tight">
                Drie stappen. Geen verplichtingen.
              </h2>
            </div>

            {/* Desktop: nummers op één rij met verbindingslijn, dan tekst */}
            <div className="hidden md:flex items-center mb-8" aria-hidden="true">
              {stappen.map((s, i) => (
                <div key={s.nr} className="flex items-center" style={{ flex: i < stappen.length - 1 ? "1" : "0" }}>
                  <div className={`w-14 h-14 rounded-xl ${s.kleur} flex items-center justify-center shrink-0`}>
                    <span className={`font-display font-medium ${s.nrKleur} text-2xl`}>{s.nr}</span>
                  </div>
                  {i < stappen.length - 1 && <div className="flex-1 h-px bg-[#D6CEBC] mx-2" />}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {stappen.map((s, i) => (
                <div
                  key={s.nr}
                  className={i < 2 ? "pb-8 md:pb-0 border-b md:border-b-0 border-[#E8E0D0]" : ""}
                >
                  {/* Mobiel: nummercirkel per stap */}
                  <div className={`md:hidden w-12 h-12 rounded-xl ${s.kleur} flex items-center justify-center mb-4`}>
                    <span className={`font-display font-medium ${s.nrKleur} text-xl`}>{s.nr}</span>
                  </div>
                  <h3 className="font-body font-medium text-primary text-base mb-2">{s.titel}</h3>
                  <p className="text-text-soft font-body font-light text-sm leading-relaxed">{s.tekst}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-12">
              <Link
                href="/analyse"
                className="btn-primary"
                style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
              >
                Start de gratis analyse &rarr;
              </Link>
              <p className="font-body mt-3" style={{ fontSize: "0.8rem", color: "#8A9E8E" }}>
                Stap 1 is altijd gratis. Geen verplichting tot stap 2 of 3. Je gegevens
                worden alleen bewaard als je daar zelf toestemming voor geeft en worden
                nooit gedeeld of verkocht.{" "}
                <Link href="/privacy" style={{ color: "#C4603A", textDecoration: "none" }}>
                  Lees hoe ik met je gegevens omga &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── STATISTIEKEN ─────────────────────────────────────── */}
        <section className="py-16 md:py-24 border-t border-[#E8E0D0]" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 md:mb-14">
              <p className="section-eyebrow mb-3 md:mb-4">Het probleem is groter dan je denkt</p>
              <h2 className="font-display font-light text-primary text-3xl sm:text-4xl md:text-5xl max-w-xl leading-tight">
                Jij bent niet de enige
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E0D0]">
              {[
                {
                  stat: "47%",
                  tekst: "van Nederlandse huishoudens is financieel kwetsbaar, ook met een goed inkomen",
                  bron: "Deloitte, 2024",
                  href: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html",
                },
                {
                  stat: "1 op 3",
                  tekst: "huishoudens heeft moeite rond te komen, ongeacht het inkomensniveau",
                  bron: "Nibud, 2026",
                  href: "https://www.nibud.nl/onderwerpen/rondkomen/moeite-met-rondkomen/",
                },
                {
                  stat: "€460",
                  tekst: "gemiddeld meer per maand bij de huishoudens die ik tot nu toe begeleid heb. Geen belofte, jouw uitkomst hangt af van je situatie",
                  bron: "Eigen klantresultaten",
                  href: null,
                },
              ].map((s) => (
                <div key={s.stat} className="py-6 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
                  <p
                    className="font-display font-light text-primary mb-2 md:mb-3"
                    style={{ fontSize: "clamp(2.5rem, 8vw, 3.5rem)", lineHeight: 1 }}
                  >
                    {s.stat}
                  </p>
                  <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-2">{s.tekst}</p>
                  <p className="font-body italic" style={{ fontSize: "0.7rem", color: "#8A9E8E" }}>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "#8A9E8E" }}>
                        Bron: {s.bron}
                      </a>
                    ) : (
                      <span>Bron: {s.bron}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-14 text-center">
              <p className="font-body text-sm text-text-soft mb-4">
                Benieuwd hoe jij het doet vergeleken met vergelijkbare huishoudens?
              </p>
              <Link
                href="/analyse"
                className="btn-primary"
                style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
              >
                Doe de gratis analyse &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINALE CTA ───────────────────────────────────────── */}
        {/* ── VOOR WIE ─────────────────────────────────────── */}
        <section className="bg-background py-16 md:py-20 border-t border-[#E8E0D0]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-eyebrow mb-3 md:mb-4">Voor wie is dit?</p>
            <h2 className="font-display font-light text-primary text-3xl sm:text-4xl max-w-2xl leading-tight mb-5">
              Gezinnen, alleenstaanden, zzp&apos;ers en 50-plussers
            </h2>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed max-w-2xl mb-7">
              Het patroon is overal hetzelfde: goed inkomen, toch krap. De cijfers
              verschillen per situatie. Daarom kijkt de analyse naar jouw woonsituatie,
              kinderen en inkomen, niet naar een standaardgezin. Lees wat het leven
              kost in jouw situatie:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { titel: "Alleenstaand", href: "/inzichten/kosten-levensonderhoud-alleenstaande-2026" },
                { titel: "Alleenstaande ouder", href: "/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" },
                { titel: "Zzp'er", href: "/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" },
                { titel: "50-plus", href: "/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026" },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="font-body text-sm font-medium px-4 py-2 rounded-full border transition-colors hover:border-primary"
                  style={{ borderColor: "#D6CEBC", color: "#1C3A2A", textDecoration: "none" }}
                >
                  {d.titel} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark-block py-20 lg:py-28 relative overflow-hidden" id="aanmelden-footer">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(196,96,58,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,96,58,0.08) 0%, transparent 40%)",
            }}
          />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <p className="section-eyebrow mb-5 md:mb-6" style={{ color: "rgba(245,240,232,0.5)" }}>
              Klaar voor antwoord?
            </p>
            <h2
              className="font-display font-light text-white mb-5 md:mb-6 leading-tight"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              Vijf minuten.<br />
              <span className="italic" style={{ color: "#C4603A" }}>Gewoon antwoord.</span>
            </h2>
            <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 md:mb-10 max-w-sm mx-auto leading-relaxed">
              Start de gratis analyse en zie direct hoe je het doet, en wat er anders kan.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Start de gratis analyse &rarr;
            </Link>
            <p className="text-white/30 font-body text-xs mt-5 md:mt-6">
              Voor huishoudens in heel Nederland &middot; Geen account of bankkoppeling &middot; Je gegevens worden nooit gedeeld of verkocht
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
