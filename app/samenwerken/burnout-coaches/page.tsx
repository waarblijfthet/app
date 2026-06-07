import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor burnout coaches & psychologen | Waar blijft het",
  description:
    "Financiële stress is een van de grootste obstakels bij burnoutherstel. Waar blijft het pakt de geldzorgen aan, zodat jij kunt werken aan energie en herstel.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/burnout-coaches" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor burnout coaches",
    description:
      "Financiële chaos verlengt een burnout. Ik breng de rust in het geld, jij brengt de rust in de mens.",
    url: "https://www.waarblijfthet.nl/samenwerken/burnout-coaches",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Hoe helpt financieel inzicht bij burnoutherstel?",
    antwoord:
      "Financiële onduidelijkheid is een chronische stressor. Als iemand niet weet waar het geld naartoe gaat, staat die stressbron altijd aan, ook tijdens herstel. Inzicht en structuur maken een van de grootste drukpunten hanteerbaar, zodat energie vrijkomt voor herstel.",
  },
  {
    vraag: "Op welk moment in het hersteltraject past dit?",
    antwoord:
      "Dat verschilt per persoon. Soms is het slim om eerst de acute fase door te komen. Zodra er ruimte is voor praktische stappen, is een analyse van het maandbudget een logische volgende stap: concreet, overzichtelijk en niet overweldigend.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als financiële stress een rol speelt. Ze starten zelf met de gratis analyse, geen verplichtingen, geen intensieve onboarding. Dat past bij de behoefte van mensen in herstel.",
  },
  {
    vraag: "Is er een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. Ik werk onafhankelijk, geen commerciële verwijzingsconstructies.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.vraag,
    acceptedAnswer: { "@type": "Answer", text: f.antwoord },
  })),
};

const pijnpunten = [
  {
    titel: "Ze zijn al uitgeput, en dan is er ook nog het geld",
    tekst:
      "Mensen in burnoutherstel dragen vaak een extra last mee: financiële onduidelijkheid. Ze werken minder of niet, de inkomsten dalen, maar de vaste lasten lopen door. Of ze werken nog wel, maar zijn zo moe dat de financiële administratie al maanden onaangeroerd ligt. Die financiële chaos verlengt de stress en daarmee het herstel.",
  },
  {
    titel: "Geldstress is een concrete stressbron, en die staat altijd aan",
    tekst:
      "Als burnout coach of psycholoog werk je aan energieherstel, grenzen en gedragspatronen. Maar als iemand thuis zit met een onduidelijk maandbudget, rekeningen die stapelen of het gevoel dat het geld niet klopt, is er een chronische stressor actief die jij niet oplost in de sessie. Financiële duidelijkheid is een stressor minder.",
  },
  {
    titel: "Ze verdienen eigenlijk genoeg, maar het voelt niet zo",
    tekst:
      "Veel mensen met een burnout komen uit sectoren met een goed inkomen: onderwijs, zorg, commercie, management. Ze hebben geen structurele geldzorgen in de klassieke zin, maar ze hebben ook nooit goed nagedacht over de financiën. Het gevoel van controleverlies over geld versterkt het gevoel van controleverlies in het algemeen.",
  },
];

export default function BurnoutCoachesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Voor burnout coaches &amp; psychologen</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Financiële chaos verlengt een burnout.<br />
              Ik breng de rust in het geld.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Als burnout coach of psycholoog werk je aan energie, grenzen en herstel. Maar
              geldstress is een stressor die altijd aanstaat, ook als de rest beter gaat.
              Ik neem het financiële stuk over, zodat jij kunt focussen op de mens.
            </p>
          </div>
        </section>

        {/* Pijnpunten */}
        <section className="bg-background pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Herken je dit bij jouw cliënten?
            </h2>
            <div className="space-y-5">
              {pijnpunten.map((p) => (
                <div key={p.titel} className="card-base border border-[#E8E0D0]">
                  <h3 className="font-body font-medium text-primary text-base mb-2">{p.titel}</h3>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">{p.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oplossing */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wat ik doe: één stressbron minder
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het helpt gezinnen en individuen die goed verdienen maar toch krap
              zitten, of het gevoel hebben dat het geld hen overkomt. Ik breng de
              maandelijkse cashflow helder in kaart en geef concrete stappen om structuur
              te krijgen. Geen overweldigende analyse, geen schuldhulp, gewoon een helder
              overzicht dat rust geeft.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Voor iemand in herstel is een laagdrempelige eerste stap belangrijk. Daarom
              begint alles met een gratis analyse van vijf minuten, geen verplichtingen,
              geen intensieve onboarding. Rustig tempo, duidelijk inzicht.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                ["Laagdrempelig", "Gratis analyse van 5 minuten. Geen verplichtingen."],
                ["Concreet", "Twee of drie duidelijke stappen, niet overweldigend."],
                ["Complementair", "Ik doe het geld. Jij doet de mens. Geen overlap."],
              ].map(([t, d]) => (
                <div key={t} className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F5F0E8" }}>
                  <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hoe werkt het */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Zo werkt de samenwerking
            </h2>
            <div className="space-y-4">
              {[
                ["1", "Noem het als geld een rol speelt", "Zodra financiële stress ter sprake komt, kun je Waar blijft het noemen. Geen grote introductie nodig."],
                ["2", "Ze starten op hun eigen tempo", "De gratis analyse op de site duurt vijf minuten en is volledig op hun eigen moment te doen. Geen drempel."],
                ["3", "Ik pak het financiële deel op", "Een adviesgesprek of traject, volledig gericht op het maandbudget. Jij blijft hun coach, ik ben de financiële schakel."],
              ].map(([n, t, d]) => (
                <div key={n} className="card-base border border-[#E8E0D0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                    <span className="font-display font-medium text-primary">{n}</span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zo werkt het in de praktijk */}
        <section className="py-12 md:py-16 border-t border-[#E8E0D0]" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
              <p className="section-eyebrow mb-3">Zo werkt het in de praktijk</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-tight">
                Financiële onzekerheid als rem op het herstel.
              </h2>
              <p className="font-body font-light text-text-soft text-sm mt-3">
                Illustratief voorbeeld op basis van een doorverwijzing via een burnout coach. Namen fictief.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div style={{ backgroundColor: "white", border: "1px solid #E8E0D4", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}>01</span>
                  <p className="font-body font-semibold text-primary text-sm">De situatie</p>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5E4E" }}>
                  Michiel (46) is teammanager bij een zorginstelling in Rotterdam. Hij zit al vier maanden thuis met een burnout en ontvangt 70% van zijn salaris via de ziektewet: €2.890 netto per maand. De vaste lasten lopen gewoon door. Zijn burnout coach Sandra merkt dat Michiel steeds terugkomt op geldzorgen, ook als het gesprek ergens anders over gaat.
                </p>
                <blockquote className="font-body text-sm leading-relaxed mt-3" style={{ color: "#1C3A2A", fontStyle: "italic", borderLeft: "3px solid #C4603A", paddingLeft: "0.75rem", marginLeft: 0 }}>
                  &ldquo;Je hebt er nu even geen energie voor om dat zelf uit te zoeken. Er is iemand die dat voor je in kaart brengt, gewoon concreet en zonder gedoe. Misschien helpt dat de onrust een beetje weg te halen.&rdquo;
                </blockquote>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E8E0D4", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}>02</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat hij invult (5 minuten)</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["Situatie", "Alleenstaand"],
                    ["Netto inkomen (ZW)", "€ 2.890 / mnd"],
                    ["Hypotheek", "€ 1.050 / mnd"],
                    ["Lease auto", "€ 380 / mnd"],
                    ["Boodschappen", "€ 380 / mnd"],
                    ["Abonnementen", "€ 195 / mnd"],
                    ["Overig variabel", "€ 490 / mnd"],
                  ].map(([label, waarde]) => (
                    <div key={label} className="flex justify-between items-center py-1" style={{ borderBottom: "1px solid #F0EAE0" }}>
                      <span className="font-body text-xs" style={{ color: "#8A9E8E" }}>{label}</span>
                      <span className="font-body text-sm font-medium" style={{ color: "#1C3A2A" }}>{waarde}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div style={{ backgroundColor: "#1C3A2A", border: "1px solid #2D6A4F", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#8AB89A", opacity: 0.7 }}>03</span>
                  <p className="font-body font-semibold text-sm" style={{ color: "white" }}>Wat de analyse toont</p>
                </div>
                <div className="space-y-3">
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>Afwijking 1: Abonnementen die hij nauwelijks gebruikt</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      €195 aan maandelijkse abonnementen: sportschool (€49, al maanden niet geweest), streamingdiensten (3 stuks, €68), krant en nieuwsbrieven (€38), en twee andere diensten die hij vergeten was. Samen <strong style={{ color: "white" }}>€155 per maand te besparen</strong>.
                    </p>
                  </div>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>Afwijking 2: Leaseauto relatief hoog</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      €380 per maand voor een auto die hij bijna niet gebruikt. Contract loopt nog 8 maanden. Na afloop vrijkomt er structureel ruimte. In de tussentijd: eigen risico al vol, €150 verwacht voordeel de rest van het jaar.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E8E0D4", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}>04</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat het gesprek (45 min) oplevert</p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      actie: "Abonnementen opgeschoond",
                      resultaat: "Sportschool gepauzeerd, 2 streamingdiensten opgezegd, nieuwsbrief gecanceld. Direct -€155 per maand.",
                    },
                    {
                      actie: "Maandbudget klopt binnen ziektewet-inkomen",
                      resultaat: "Na de aanpassingen past alles binnen €2.890. Michiel weet nu concreet dat het geld het redt. Dat gevoel van onzekerheid is weg.",
                    },
                    {
                      actie: "Plan voor na het lease-contract",
                      resultaat: "Zodra het contract afloopt, vrijkomt er €380 per maand. Dat wordt meteen gespaard als buffer. Eerste keer dat hij daar actief over nadenkt.",
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

            <div style={{ backgroundColor: "#F5F0E8", border: "1px solid #E0D8CC", borderRadius: "16px", padding: "1.5rem" }}>
              <p className="font-body font-medium text-xs uppercase tracking-widest mb-4" style={{ color: "#C4603A" }}>
                Wat Sandra als burnout coach eraan had
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { kop: "Financiële stressbron verdwenen", tekst: "Michiel bracht geld niet meer steeds terug in de sessies. Die mentale belasting was opgelost, en er ontstond ruimte voor het echte herstelwerk." },
                  { kop: "Concrete actie in een stagnerende fase", tekst: "Voor mensen in herstel voelt vooruitgang boeken moeilijk. Een klein, overzichtelijk resultaat zoals €155 minder per maand geeft houvast en controle." },
                  { kop: "Laagdrempelige doorverwijzing", tekst: "Sandra hoefde geen energie te steken in het financiële stuk. Één verwijzing was genoeg, Michiel kon het zelf op zijn eigen tempo afhandelen." },
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

        {/* FAQ */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl mb-5">
              Veelgestelde vragen
            </h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.vraag} className="card-base border border-[#E8E0D0]">
                  <p className="font-body font-medium text-primary text-sm mb-2">{f.vraag}</p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">{f.antwoord}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Laten we kennismaken
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Wil je zien of ik pas als aanvulling op jouw praktijk? Een mail is genoeg,
              dan plan ik een gesprek van 20 minuten.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20burnout%20coach"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Mail Jarno →
            </a>
            <p className="mt-6">
              <Link
                href="/samenwerken"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                ← Terug naar samenwerken overzicht
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
