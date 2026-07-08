import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Geldscan: persoonlijk videoadvies zonder gesprek, €49",
  description:
    "Persoonlijke geldscan: je doet de gratis analyse, ik neem een video van 10 minuten voor je op met je drie grootste lekken en wat je eraan doet. Geen gesprek nodig. €49.",
  alternates: { canonical: "https://www.waarblijfthet.nl/geldscan" },
  openGraph: {
    title: "Geldscan: persoonlijk videoadvies zonder gesprek, €49",
    description:
      "Je doet de gratis analyse, ik neem een persoonlijke video van 10 minuten op met je drie grootste lekken. Geen gesprek, geen agenda. €49.",
    url: "https://www.waarblijfthet.nl/geldscan",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat is de geldscan precies?",
    antwoord:
      "Je doet de gratis analyse en stuurt die naar mij, optioneel met een paar recente bankafschriften. Binnen twee werkdagen krijg je een persoonlijke video van ongeveer 10 minuten waarin ik jouw drie grootste lekken laat zien en per lek vertel wat ik zou doen. Plus een korte samenvatting op schrift.",
  },
  {
    vraag: "Moet ik hiervoor met iemand praten of bellen?",
    antwoord:
      "Nee, en dat is precies het punt. Geen videogesprek, geen telefoontje, geen agenda-afstemming. Jij levert je cijfers aan wanneer het jou uitkomt, ik neem de video op, jij kijkt hem wanneer je wilt. Vragen achteraf kunnen gewoon per e-mail.",
  },
  {
    vraag: "Wat kost de geldscan?",
    antwoord:
      "€49, eenmalig, en je krijgt er gewoon een bon van. Na je aanmelding ontvang je een iDEAL-betaalverzoek, altijd verstuurd vanaf hallo@waarblijfthet.nl en op naam van Jarno Koopman. Ik vraag nooit om inlogcodes of andere gegevens. Betaal je liever niet via een link? Vraag dan om een factuur met IBAN en maak het zelf over. Vind ik geen drie serieuze verbeterpunten in jouw situatie, dan krijg je je €49 terug. En wil je daarna alsnog een gesprek of traject, dan trek ik de €49 af van de prijs daarvan.",
  },
  {
    vraag: "Wat als er bij mij niets uit de scan komt?",
    antwoord:
      "Dan betaal je niets. Vind ik geen drie serieuze verbeterpunten, dan krijg je je €49 terug. Eerlijk gezegd verwacht ik dat zelden te hoeven doen: ook bij huishoudens die alles netjes op orde hebben, vind ik vrijwel altijd structurele lekken tussen vaste lasten, verzekeringen en dagelijkse patronen.",
  },
  {
    vraag: "Is dit hetzelfde als het adviesgesprek?",
    antwoord:
      "Nee. Het adviesgesprek (€125) is een gesprek van 45 minuten waarin we samen doelen stellen en jij vragen kunt stellen. De geldscan is eenrichtingsverkeer: ik kijk naar jouw cijfers en vertel je wat ik zie. Minder diepgang, wel een persoonlijke en eerlijke blik, voor een lagere prijs en zonder gesprek.",
  },
  {
    vraag: "Moet ik bankafschriften delen?",
    antwoord:
      "Nee, dat is optioneel. De gratis analyse alleen is genoeg voor een goede scan. Wil je ze wel meesturen, dan beantwoord je simpelweg de bevestigingsmail met de bijlagen erbij, dan kan ik preciezer zijn over waar het weglekt. Alles blijft vertrouwelijk: je video staat op een privelink die alleen jij krijgt, en je afschriften en analyse verwijder ik standaard binnen 30 dagen na de scan. Je hoeft daar niet om te vragen.",
  },
  {
    vraag: "Is dit financieel advies in de zin van de Wft?",
    antwoord:
      "Nee. Ik geef geen advies over hypotheken, beleggingen of pensioenproducten en ben geen schuldhulp. De geldscan is een praktische, persoonlijke blik op je maandbudget: waar gaat het naartoe en waar kun je bijsturen.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Persoonlijke geldscan",
  name: "Geldscan, Waar blijft het",
  description:
    "Persoonlijk videoadvies over je maandbudget zonder gesprek: drie grootste lekken plus concrete stappen, binnen twee werkdagen. €49 eenmalig.",
  url: "https://www.waarblijfthet.nl/geldscan",
  areaServed: { "@type": "Country", name: "Nederland" },
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Financieel coach",
    url: "https://www.waarblijfthet.nl/over",
  },
  offers: {
    "@type": "Offer",
    name: "Geldscan met persoonlijke video",
    price: "49",
    priceCurrency: "EUR",
    url: "https://www.waarblijfthet.nl/geldscan",
  },
};

const stappen = [
  {
    n: "1",
    titel: "Jij levert aan, wanneer het jou uitkomt",
    tekst:
      "De gratis analyse (5 minuten) is meteen je aanlevering, je hoeft niets extra's te maken. Wil je het scherpst mogelijke beeld, stuur dan een paar recente bankafschriften mee: dan kijk ik naar wat er echt gebeurt in plaats van naar schattingen.",
  },
  {
    n: "2",
    titel: "Ik kijk persoonlijk naar jouw cijfers",
    tekst:
      "Geen automatisch rapport. Ik zet jouw cijfers naast huishoudens in jouw situatie en zoek de drie plekken waar het bij jou structureel weglekt.",
  },
  {
    n: "3",
    titel: "Binnen 2 werkdagen: jouw video",
    tekst:
      "Je krijgt een persoonlijke video van ongeveer 10 minuten plus een korte samenvatting op schrift. Geen lijstje met wat je fout doet, wel de drie plekken waar jij het meeste terughaalt. Terugkijken kan zo vaak je wilt, vragen kunnen per e-mail.",
  },
];

export default function GeldscanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Geldscan · persoonlijke video · €49</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Persoonlijk advies over jouw geld, zonder dat je met iemand hoeft te praten
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-4">
              Wel een eerlijke, persoonlijke blik op waar jouw geld blijft.
              Geen gesprek, geen camera aan jouw kant, geen agenda. Jij stuurt
              je cijfers, ik stuur binnen twee werkdagen een video van 10
              minuten met je drie grootste lekken en wat ik eraan zou doen.
            </p>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-8">
              Voor iedereen die wil weten wat er speelt, maar (nog) geen
              gesprek wil. Dat begrijp ik beter dan je denkt.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/aanbod/intake?pakket=geldscan" className="btn-primary">
                Vraag de geldscan aan (€49) →
              </Link>
              <Link
                href="/analyse"
                className="font-body text-sm hover:underline"
                style={{ color: "#C4603A", textDecoration: "none" }}
              >
                Eerst de gratis analyse doen →
              </Link>
            </div>
            <p className="font-body font-light text-text-muted text-xs mt-4">
              Binnen 2 werkdagen · Vind ik geen drie serieuze verbeterpunten, dan krijg je je €49 terug · €49 wordt verrekend als je later een gesprek of traject wilt
            </p>
          </div>
        </section>

        {/* Stappen */}
        <section className="bg-background pb-8">
          <div className="max-w-3xl mx-auto px-6 space-y-5">
            {stappen.map((s) => (
              <div key={s.n} className="card-base border border-[#E8E0D0]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                    <span className="font-display font-medium text-primary text-xl">{s.n}</span>
                  </div>
                  <div>
                    <h2 className="font-display font-light text-primary text-xl mb-2">{s.titel}</h2>
                    <p className="font-body font-light text-sm text-text-soft leading-relaxed">{s.tekst}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geruststelling */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                ["Geen gesprek", "Jij hoeft niets uit te leggen of te verdedigen. Ik kijk, jij luistert wanneer je wilt."],
                ["Geen oordeel", "Ik benoem wat ik zie en wat werkt. Schaamte is nergens voor nodig, dit patroon zie ik overal."],
                ["Geen verplichting", "Eén scan, klaar. Wil je daarna meer, dan verreken ik de €49."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voorbeeld van wat je krijgt */}
        <section className="bg-background pt-14 pb-2">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Wat zit er in zo&apos;n video? Zo ziet dat eruit
            </h2>
            <div className="card-base border border-[#E8E0D0]">
              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-3">
                Een voorbeeld ter illustratie, opgebouwd uit de lekken die ik
                in de praktijk het vaakst tegenkom bij tweeverdieners met
                kinderen (samen rond €5.000 netto):
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  "Dubbel verzekerd: aansprakelijkheid en reisverzekering zaten ook in het pakket van de bank, €31 per maand",
                  "Boodschappen €180 boven vergelijkbare gezinnen, vooral door losse ritjes, met twee concrete aanpassingen",
                  "Drie vergeten abonnementen en een stilzwijgend verlengd energiecontract, €54 per maand",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span style={{ color: "#2D6A4F", fontWeight: 600 }}>✓</span>
                    <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                Samen ruim €260 per maand aan aanknopingspunten. Jouw lekken
                zijn andere, maar dit is het soort antwoord dat je krijgt:
                concreet, met bedragen, zonder oordeel. Ter referentie: bij de
                huishoudens die ik tot nu toe begeleidde was het gemiddelde
                resultaat €460 per maand meer over (eigen klantresultaten,
                geen belofte).
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: "#1C3A2A" }}>
                <Image src="/jarno.jpg" alt="Jarno Koopman" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <p className="font-body font-light text-sm text-text-soft">
                Elke scan doe ik zelf, er kijkt geen algoritme of team mee.{" "}
                <Link href="/over" className="hover:underline" style={{ color: "#C4603A" }}>
                  Wie ik ben →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Echte ervaringen uit de begeleiding */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Wat een eerlijke blik van buitenaf anderen opleverde
            </h2>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-6">
              De geldscan is de lichtste vorm van mijn begeleiding: dezelfde
              blik, zonder gesprek. Deze ervaringen komen van huishoudens die
              ik persoonlijk begeleidde.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  quote:
                    "We werden elk jaar overvallen door de dure maanden. Eén keer alles uitgerekend en opgesplitst in maandpotjes: de kerstpot staat er nu gewoon.",
                  naam: "Daan & Roos",
                  situatie: "Twee kinderen, koopwoning",
                },
                {
                  quote:
                    "Onze boodschappen waren een zwart gat. Een weekbudget en een korte check-in na elke boodschappenronde hielden ons scherp, juist op de momenten dat het misging.",
                  naam: "Bram & Eva",
                  situatie: "Gezin van vier, twee inkomens",
                },
                {
                  quote:
                    "Er werd meegedacht over flexibeler werken in plaats van alleen bezuinigen. Twee dagen minder opvang scheelt fors, en thuis is het rustiger.",
                  naam: "Karim & Noor",
                  situatie: "Twee jonge kinderen",
                },
              ].map((t) => (
                <div key={t.naam} className="card-base border border-[#E8E0D0]">
                  <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-body font-medium text-primary text-sm">{t.naam}</p>
                  <p className="font-body font-light text-text-muted text-xs">{t.situatie}</p>
                </div>
              ))}
            </div>
            <p className="font-body font-light text-text-muted text-xs mt-4">
              Namen aangepast voor privacy. Echte ervaringen uit mijn
              begeleiding; resultaten verschillen per situatie.
            </p>
          </div>
        </section>

        {/* Voor wie */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Voor wie is de geldscan?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Voor mensen die goed verdienen maar structureel te weinig
              overhouden, en die wel een eerlijk antwoord willen maar geen
              gesprek. Ook met wisselend zzp-inkomen: juist dan laat de scan
              zien welke vaste structuur eronder ligt. Omdat het ongemakkelijk voelt om over geld te praten,
              omdat je agenda vol zit, of omdat je eerst wilt weten of dit
              iets voor je is voordat je €125 uitgeeft aan een{" "}
              <Link href="/adviesgesprek" className="hover:underline" style={{ color: "#C4603A" }}>
                adviesgesprek
              </Link>
              .
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed">
              Heb je schulden of betalingsachterstanden? Dan is gratis hulp
              via je gemeente of Geldfit passender, en dat zeg ik liever
              eerlijk vooraf. Meer over hoe ik werk lees je op de pagina{" "}
              <Link href="/financieel-coach" className="hover:underline" style={{ color: "#C4603A" }}>
                financieel coach
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
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
              Weten waar het bij jou weglekt?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              €49, binnen twee werkdagen een persoonlijke video. Zonder
              gesprek, zonder oordeel.
            </p>
            <Link
              href="/aanbod/intake?pakket=geldscan"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Vraag de geldscan aan →
            </Link>
            <p className="mt-5">
              <Link
                href="/analyse"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Liever eerst de gratis analyse? →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
