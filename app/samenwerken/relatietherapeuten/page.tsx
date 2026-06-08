import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor relatietherapeuten | Waar blijft het",
  description:
    "Veel koppels in therapie vechten over geld, maar de financiën lost een relatietherapie niet op. Waar blijft het pakt het gelddeel aan, zodat jij je kunt focussen op de relatie.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/relatietherapeuten" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor relatietherapeuten",
    description:
      "Koppels die bij jou komen vechtend over geld. Ik pak de financiën aan, jij pakt de relatie aan.",
    url: "https://www.waarblijfthet.nl/samenwerken/relatietherapeuten",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat doet Waar blijft het precies voor het koppel?",
    antwoord:
      "Ik breng het maandbudget in kaart, benoem de twee of drie plekken waar geld wegvloeit zonder dat ze het doorhebben, en geef concrete stappen. Geen beleggingsadvies, geen schuldhulp, gewoon grip op de maandelijkse cashflow.",
  },
  {
    vraag: "Hoe werkt het verwijzen concreet?",
    antwoord:
      "Je stuurt het koppel door met een korte toelichting. Ze starten zelf met de gratis analyse op de site. Ik neem het financiële deel over, jouw therapiegesprekken kunnen zich daarna richten op de relatie zelf.",
  },
  {
    vraag: "Is er een financiële vergoeding voor de verwijzing?",
    antwoord:
      "Nee. Ik geloof in een eerlijk, onafhankelijk model. Geen affiliate-constructies, wel een betrouwbare schakel in jouw netwerk.",
  },
  {
    vraag: "Ik wil je eerst beter kennen voordat ik doorverwijs. Kan dat?",
    antwoord:
      "Absoluut. Stuur een mail naar hallo@waarblijfthet.nl. Dan plan ik een kennismakingsgesprek van 20 minuten, gewoon om te kijken of het past en hoe de samenwerking er in de praktijk uitziet.",
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
    titel: "Geld is de aanleiding, maar niet het echte probleem",
    tekst:
      "Je ziet het keer op keer: een koppel zit bij je vanwege communicatieproblemen of verwijdering, maar onder het oppervlak zit een financiële spanning die al maanden sluimert. Wie betaalt wat? Waarom holt het geld altijd op? Wie heeft de controle? De emoties zijn echt, maar de trigger is een onopgelost praktisch probleem.",
  },
  {
    titel: "Ze verdienen samen genoeg, maar voelen zich toch krap",
    tekst:
      "Veel koppels in jouw praktijk zijn tweeverdieners met een modaal of bovenmodaal gezinsinkomen. Geen schulden, geen armoede, en toch chronisch krap. Dat onbegrip ('hoe kan dit?') voegt frustratie toe aan de relatiestress. Zolang niemand dat gelddeel aanpakt, circuleer je als therapeut in een lus.",
  },
  {
    titel: "Jij bent er niet voor de financiën, en dat is precies het probleem",
    tekst:
      "Als relatietherapeut of koppelcoach help je met communicatie, patronen en emoties. Maar je bent geen financieel coach. Als het geld de trigger is en niemand dat oplost, staat de relatietherapie altijd onder druk van iets wat buiten jouw expertise valt.",
  },
];

export default function RelatietherapeutenPage() {
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
            <p className="section-eyebrow mb-4">Voor relatietherapeuten &amp; koppelcoaches</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Je koppel vecht over geld.<br />
              Ik los het gelddeel op.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Veel koppels die bij jou komen hebben een onopgelost financieel probleem als
              onderliggende trigger. Jij werkt aan de relatie, ik pak de maandbudgetten
              aan, zodat jouw therapiegesprekken over de relatie kunnen gaan in plaats van
              over wie de rekeningen betaalt.
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
              Wat ik doe, en wat dat voor jou oplevert
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het is financiële coaching voor gezinnen en stellen die goed
              verdienen maar toch krap zitten. Ik breng het maandbudget helder in kaart,
              zonder oordeel en zonder jargon, en geef concrete stappen. Geen grote
              besparingen op boodschappen, maar inzicht in waar het geld structureel naartoe
              gaat.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Als jouw cliënten dit stuk oplossen, verandert de sfeer in de therapiesessie.
              Ze komen niet meer met een concrete financiële griep, ze komen voor de relatie.
              Dat is waar jij goed in bent.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                ["Gratis analyse", "Ze starten laagdrempelig. Geen verplichting voor hen of jou."],
                ["Eenmalig gesprek", "€125 voor 45 minuten, concreet en behapbaar."],
                ["Geen schuldhulp", "Voor stellen die genoeg verdienen maar grip missen."],
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
                ["1", "Vertel je cliënten over mij", "Je noemt Waar blijft het als het financiële stuk ter sprake komt. Meer hoeft het niet te zijn."],
                ["2", "Ze doen de gratis analyse", "Op waarblijfthet.nl. Vijf minuten. Ze zien direct wat er speelt, dat is vaak al een eye-opener."],
                ["3", "Ik neem het over", "Eventueel volgt een adviesgesprek of traject. Jij blijft gewoon hun therapeut, ik ben complementair, niet concurrerend."],
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
                Van geldruzie in de sessie naar grip thuis.
              </h2>
              <p className="font-body font-light text-text-soft text-sm mt-3">
                Illustratief voorbeeld op basis van een doorverwijzing via een relatietherapeut. Namen fictief.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div style={{ backgroundColor: "white", border: "1px solid #E8E0D4", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}>01</span>
                  <p className="font-body font-semibold text-primary text-sm">De doorverwijzing</p>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5E4E" }}>
                  Emma (34) en Tom (37) wonen in Amsterdam. Gecombineerd netto inkomen €6.400. Geen kinderen. Ze zijn al vier sessies bij relatietherapeut Inge vanwege oplopende spanningen. Steeds vaker over geld: wie geeft te veel uit, wie spaart te weinig. Inge signaleert dat het financiële stuk haar werk blokkeert.
                </p>
                <blockquote className="font-body text-sm leading-relaxed mt-3" style={{ color: "#1C3A2A", fontStyle: "italic", borderLeft: "3px solid #C4603A", paddingLeft: "0.75rem", marginLeft: 0 }}>
                  &ldquo;Er is een gratis analyse van vijf minuten die jullie inzicht geeft in waar het naartoe gaat. Ik stel voor dat jullie dat samen invullen, voor onze volgende sessie.&rdquo;
                </blockquote>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E8E0D4", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#C4603A", opacity: 0.5 }}>02</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat ze invullen (5 minuten)</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["Situatie", "Stel zonder kinderen"],
                    ["Netto inkomen", "€ 6.400 / mnd"],
                    ["Huur (Amsterdam)", "€ 1.850 / mnd"],
                    ["Vervoer (1 auto + OV)", "€ 480 / mnd"],
                    ["Boodschappen", "€ 640 / mnd"],
                    ["Vaste abonnementen", "€ 285 / mnd"],
                    ["Overig / pin", "€ 720 / mnd"],
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
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>Afwijking 1: Abonnementen</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      <strong style={{ color: "white" }}>€ 285 per maand</strong> aan vaste abonnementen. Vergelijkbaar stel gemiddeld €135. Het verschil zit in overlap: drie streamingdiensten, twee sportabonnementen, twee nieuwsabonnementen.
                    </p>
                  </div>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#8AB89A" }}>Afwijking 2: Vrij besteedbaar ongestructureerd</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      <strong style={{ color: "white" }}>€ 720 per maand</strong> &apos;overig&apos; zonder gezamenlijk overzicht. Beiden voelen controleverlies, maar de oorzaak is geen verkwisting, het ontbreekt aan structuur.
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
                      actie: "Gezamenlijke rekening opgezet",
                      resultaat: "Vaste lasten gaan van een gezamenlijke rekening, beiden storten maandelijks hun aandeel. Geen discussie meer over wie wat betaalt.",
                    },
                    {
                      actie: "Pinpot per persoon: €175",
                      resultaat: "Beiden hebben €175 vrij besteedbaar zonder verantwoording. Tom koopt wat hij wil, Emma ook. Einde van de controle-discussie.",
                    },
                    {
                      actie: "Abonnementen teruggebracht",
                      resultaat: "Van €285 naar €160 per maand. €125 vrijgemaakt door overlappende diensten op te zeggen.",
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
                Wat Inge als relatietherapeut eraan had
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { kop: "Sessies over de relatie", tekst: "De volgende sessies gingen niet meer over wie te veel uitgeeft. Het praktische probleem was opgelost, de diepere patronen konden aan bod komen." },
                  { kop: "Minder geladen gesprekken", tekst: "Emma en Tom kwamen minder defensief. De financiële spanning was weg als onderstroom, wat ruimte gaf voor echte openheid." },
                  { kop: "Bruikbare doorverwijzing", tekst: "Inge heeft nu een concrete schakel voor het gelddeel. Ze kan het in één zin uitleggen aan elk koppel waarbij geld een rol speelt." },
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
            <h2 className="font-display font-light text-primary text-2xl mb-5">Veelgestelde vragen</h2>
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
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">Laten we kennismaken</h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Wil je weten of ik pas als schakel in jouw praktijk? Stuur een korte mail, dan plan ik een kennismakingsgesprek van 20 minuten.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20relatietherapeut" className="btn-primary" style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}>
              Mail Jarno →
            </a>
            <p className="mt-6">
              <Link href="/samenwerken" className="font-body text-sm" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
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
