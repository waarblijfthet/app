import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AanbodAccordion } from "./components/AanbodAccordion";

export const metadata: Metadata = {
  title: "Financiële coaching en adviesgesprek, tarieven",
  description:
    "Van gratis inzicht tot persoonlijk traject: kies wat bij jouw situatie past. Geen abonnementen, geen verrassingen. Je betaalt voor wat je nodig hebt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.waarblijfthet.nl/aanbod" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Financiële begeleiding voor gezinnen",
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    url: "https://www.waarblijfthet.nl",
  },
  serviceType: "Financiële coaching",
  areaServed: "NL",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Budgetcoaches en schuldhulp zijn er voor mensen met betalingsproblemen of schulden. Ik richt me op gezinnen en individuen die goed verdienen maar te weinig overhouden. Die willen begrijpen waarom, en hoe dat anders kan.",
      },
    },
    {
      "@type": "Question",
      name: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dat is precies de situatie waar ik voor ben. Geen crisis, maar ook geen rust. Dat is het meest voorkomende financiële patroon bij mensen met een goed inkomen, en het is volledig op te lossen met de juiste structuur.",
      },
    },
    {
      "@type": "Question",
      name: "Geef je advies over beleggen, hypotheken of pensioen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Ik begeleid je bij het dagelijks beheer van je inkomen: waar het naartoe gaat, hoe je structuur aanbrengt en hoe je structureel meer overhoudt. Voor specifieke financiële producten verwijs ik je door naar een gecertificeerd adviseur.",
      },
    },
    {
      "@type": "Question",
      name: "Ben je gecertificeerd financieel adviseur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Ik ben geen gecertificeerd financieel adviseur en val niet onder de AFM-vergunningplicht. Ik adviseer niet over financiële producten. Wat ik doe is gedragscoaching en structuurbegeleiding rondom dagelijks geldbeheer.",
      },
    },
  ],
};

export default function AanbodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section style={{ backgroundColor: "#F5F0E8", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p
              className="font-body font-medium uppercase tracking-widest text-xs mb-4"
              style={{ color: "#C4603A" }}
            >
              Aanbod
            </p>
            <h1
              className="font-display font-light text-[#1C3A2A]"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}
            >
              Goed verdienen en toch te weinig overhouden. Dat lost zich niet vanzelf op.
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: "1.05rem",
                color: "#4A5E4E",
                maxWidth: "600px",
                lineHeight: 1.7,
              }}
            >
              Ik help je begrijpen waar het naartoe gaat en hoe je dat structureel verandert. Geen abonnementen, geen verrassingen. Je betaalt voor wat je nodig hebt.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "#8A9E8E",
                marginTop: "1.25rem",
              }}
            >
              Al meer dan 50 gezinnen en individuen deden de gratis analyse.
            </p>
          </div>
        </section>

        {/* Credibility-regel */}
        <section style={{ backgroundColor: "#1C3A2A", padding: "1rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(245,240,232,0.75)", lineHeight: 1.6 }}
            >
              <span style={{ color: "#8AB89A", fontWeight: 600 }}>Ik ben Jarno.</span>{" "}
              Ik herken dit patroon van binnenuit: goed verdienen en toch elke maand niet weten waar het naartoe gaat. Dit doe ik ernaast, voor iedereen die dat herkent. Geen gecertificeerd adviseur, geen productverkoop.{" "}
              <Link href="/over" style={{ color: "#8AB89A", textDecoration: "underline" }}>
                Meer over mij →
              </Link>
            </p>
          </div>
        </section>

        {/* Drie niveaus */}
        <section style={{ backgroundColor: "#FDFAF4", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h2 className="font-display font-light text-[#1C3A2A] text-2xl sm:text-3xl mb-2">
              Wat past bij jouw situatie?
            </h2>
            <p className="font-body font-light text-[#4A5E4E] text-sm mb-8">
              Begin altijd met de{" "}
              <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">
                gratis analyse
              </Link>{" "}
              (5 minuten, anoniem). Daarna zijn er drie routes, kies wat jij herkent:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                {
                  href: "#geldscan",
                  situatie: "Ik wil snappen waar mijn situatie afwijkt, zonder er met iemand over te praten",
                  naam: "Geldscan",
                  prijs: "€49",
                  regel: "Persoonlijke video met je drie grootste lekken, binnen 2 werkdagen",
                },
                {
                  href: "#adviesgesprek",
                  situatie: "Ik weet dat er iets moet veranderen en wil daar één goed gesprek over",
                  naam: "Adviesgesprek",
                  prijs: "€125",
                  regel: "45 minuten samen naar je cijfers, 2 à 3 concrete doelen",
                },
                {
                  href: "#traject",
                  situatie: "Ik wil het echt anders gaan doen, met begeleiding tot het staat",
                  naam: "Traject",
                  prijs: "€497",
                  regel: "3 maanden begeleiding tot je systeem vanzelf loopt",
                },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="block rounded-2xl border border-[#E8E0D0] bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  style={{ textDecoration: "none" }}
                >
                  <p className="font-body font-light text-[#4A5E4E] text-sm leading-relaxed mb-4">
                    &ldquo;{s.situatie}&rdquo;
                  </p>
                  <p className="font-display font-light text-[#1C3A2A] text-2xl mb-1">
                    {s.naam} · {s.prijs}
                  </p>
                  <p className="font-body font-light text-[#8A9E8E] text-xs mb-3">{s.regel}</p>
                  <span className="font-body text-sm" style={{ color: "#C4603A" }}>
                    Bekijk wat je krijgt ↓
                  </span>
                </a>
              ))}
            </div>
            <p className="font-body font-light text-[#8A9E8E] text-xs">
              Alle prijzen eenmalig. De €49 van de geldscan wordt verrekend als je daarna een gesprek of traject wilt.
            </p>
          </div>
        </section>

        {/* Detail: geldscan */}
        <section id="geldscan" style={{ backgroundColor: "#F5F0E8", padding: "3.5rem 1.5rem", scrollMarginTop: "90px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p className="section-eyebrow mb-2">Zonder gesprek · €49 eenmalig</p>
            <h2 className="font-display font-light text-[#1C3A2A] text-2xl sm:text-3xl mb-3">Geldscan: persoonlijk videoadvies</h2>
            <p className="font-body font-light text-[#4A5E4E] leading-relaxed mb-5" style={{ maxWidth: "620px" }}>
              Je doet de gratis analyse, ik kijk er persoonlijk naar en je krijgt
              binnen twee werkdagen een video van 10 minuten met je drie
              grootste lekken en wat ik eraan zou doen. Geen gesprek, geen
              agenda, geen oordeel. Vind ik geen drie serieuze verbeterpunten,
              dan krijg je je €49 terug.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Persoonlijke video van ±10 minuten plus samenvatting op schrift",
                "Binnen 2 werkdagen, terugkijken wanneer jij wilt",
                "Bankafschriften optioneel, standaard binnen 30 dagen verwijderd",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span style={{ color: "#2D6A4F", fontWeight: 600 }}>✓</span>
                  <span className="font-body font-light text-sm text-[#4A5E4E]">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/aanbod/intake?pakket=geldscan" className="btn-primary">Vraag de geldscan aan →</Link>
              <Link href="/geldscan" className="font-body text-sm hover:underline" style={{ color: "#C4603A", textDecoration: "none" }}>
                Alles over de geldscan →
              </Link>
            </div>
          </div>
        </section>

        {/* Detail: adviesgesprek */}
        <section id="adviesgesprek" style={{ backgroundColor: "#FDFAF4", padding: "3.5rem 1.5rem", scrollMarginTop: "90px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p className="section-eyebrow mb-2">Meest gevraagd · €125 eenmalig</p>
            <h2 className="font-display font-light text-[#1C3A2A] text-2xl sm:text-3xl mb-3">Eenmalig adviesgesprek</h2>
            <p className="font-body font-light text-[#4A5E4E] leading-relaxed mb-5" style={{ maxWidth: "620px" }}>
              In 45 minuten kijk ik samen met jou eerlijk naar jouw cijfers.
              Geen verkooppraat, geen traject. Eén gericht gesprek waar je
              meteen mee verder kunt; één concrete beslissing verdient de €125
              makkelijk terug.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Videogesprek van 45 minuten, eerlijk en gericht",
                "Samen 2 à 3 concrete doelen en actiepunten bepalen",
                "Korte schriftelijke samenvatting achteraf om terug te lezen",
                "Daarna zelf verder, of een traject als je dat wilt",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span style={{ color: "#2D6A4F", fontWeight: 600 }}>✓</span>
                  <span className="font-body font-light text-sm text-[#4A5E4E]">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/aanbod/intake?pakket=gesprek" className="btn-primary">Ja, dit wil ik →</Link>
              <Link href="/adviesgesprek" className="font-body text-sm hover:underline" style={{ color: "#C4603A", textDecoration: "none" }}>
                Wat kun je verwachten? →
              </Link>
            </div>
          </div>
        </section>

        {/* Detail: traject */}
        <section id="traject" style={{ backgroundColor: "#F5F0E8", padding: "3.5rem 1.5rem", scrollMarginTop: "90px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p className="section-eyebrow mb-2">Beperkte beschikbaarheid · €497 eenmalig</p>
            <h2 className="font-display font-light text-[#1C3A2A] text-2xl sm:text-3xl mb-3">Persoonlijk traject, 3 maanden</h2>
            <p className="font-body font-light text-[#4A5E4E] leading-relaxed mb-5" style={{ maxWidth: "620px" }}>
              Na 3 maanden heb je een systeem dat werkt zonder dat je er continu
              over na hoeft te denken. Niet alleen een plan, maar een gewoonte
              die blijft. Maximaal 3 trajecten tegelijk.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Intakegesprek (45 min, video) en volledig financieel plan",
                "Maandelijkse videocall (3x) om bij te sturen",
                "WhatsApp bereikbaar voor vragen, 3 maanden lang",
                "Tussenevaluatie na 6 weken en eindrapport met aanbevelingen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span style={{ color: "#2D6A4F", fontWeight: 600 }}>✓</span>
                  <span className="font-body font-light text-sm text-[#4A5E4E]">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/aanbod/intake?pakket=intensief" className="btn-primary">Ja, dit wil ik →</Link>
              <Link href="/aanbod/intake?pakket=intensief" className="font-body text-sm hover:underline" style={{ color: "#C4603A", textDecoration: "none" }}>
                Vraag beschikbaarheid op →
              </Link>
            </div>
          </div>
        </section>

        {/* Sociale proof */}
        <section style={{ backgroundColor: "#FDFAF4", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p
              className="font-body font-medium uppercase tracking-widest text-xs mb-6 text-center"
              style={{ color: "#C4603A" }}
            >
              Wat het andere gezinnen opleverde
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  resultaat: "Geen verrassingen meer in de piekmaanden",
                  quote:
                    "Periodieke kosten uitgerekend en opgesplitst in maandpotjes. De kerstpot staat er nu gewoon.",
                  naam: "Daan & Roos",
                },
                {
                  resultaat: "Boodschappen eindelijk onder controle",
                  quote:
                    "Samen een weekbudget en een korte check-in na elke keer boodschappen. Dat hield ons scherp.",
                  naam: "Bram & Eva",
                },
                {
                  resultaat: "Twee dagen minder BSO, rust én geld over",
                  quote:
                    "Meegedacht over flexibeler werken in plaats van alleen bezuinigen. Thuis is het rustiger.",
                  naam: "Karim & Noor",
                },
              ].map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl p-6 border border-[#E8E0D4]"
                  style={{ backgroundColor: "white" }}
                >
                  <p className="font-body font-medium text-[#2D6A4F] text-sm mb-2">
                    {t.resultaat}
                  </p>
                  <p className="font-body font-light text-[#1C3A2A] text-sm leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-body text-[#8A9E8E] text-xs">{t.naam}</p>
                </div>
              ))}
            </div>
            <p
              className="font-body text-xs mt-6 text-center"
              style={{ color: "#8A9E8E" }}
            >
              Echte ervaringen van de eerste gezinnen die ik hielp. Namen aangepast voor hun privacy.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ backgroundColor: "white", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h2
              className="font-display font-light text-[#1C3A2A]"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Veelgestelde vragen
            </h2>
            <AanbodAccordion />
          </div>
        </section>

        {/* Finale CTA */}
        <section
          style={{
            backgroundColor: "#1C3A2A",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              className="font-display font-light"
              style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}
            >
              Niet zeker welke past bij jou?
            </h2>
            <p
              className="font-body"
              style={{
                color: "rgba(245,240,232,0.65)",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Begin met de gratis analyse. Die duurt vijf minuten en geeft je al een eerlijk beeld van jouw situatie. Daarna zie je vanzelf of je meer wil.
            </p>
            <Link
              href="/analyse"
              className="inline-block font-body font-medium text-sm py-3 px-8 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#C4603A",
                color: "#FDFAF4",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Start de gratis analyse →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
