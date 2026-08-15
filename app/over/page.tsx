import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Over Jarno Koopman | Waar blijft het",
  description:
    "Ik bouw financiële software voor mijn werk en wist tóch niet waar ons geld bleef. Geen schulden, geen luxe, en toch liepen de spaarpotten leeg. Dat is waarom Waar blijft het bestaat.",
  alternates: { canonical: "https://www.waarblijfthet.nl/over" },
  openGraph: {
    title: "Over Jarno Koopman | Waar blijft het",
    description:
      "Ik bouw financiële software voor mijn werk en wist tóch niet waar ons geld bleef. Dat is waarom Waar blijft het bestaat.",
    url: "https://www.waarblijfthet.nl/over",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Over Waar blijft het",
  url: "https://www.waarblijfthet.nl/over",
  mainEntity: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Oprichter",
    url: "https://www.waarblijfthet.nl/over",
    image: "https://www.waarblijfthet.nl/jarno.jpg",
    sameAs: [
      "https://www.linkedin.com/in/jarnokoopman/",
      "https://www.instagram.com/koopmanjarno/",
    ],
    knowsAbout: [
      "Persoonlijke financiën",
      "Huishoudbudget",
      "Grip op geld",
      "Besparen",
      "Sparen",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Waar blijft het",
      url: "https://www.waarblijfthet.nl",
    },
  },
};

// Drie rapporten als bewijs, exact zoals ze ook op /rapporten staan.
// Bedragen en citaten komen letterlijk uit lib/rapporten-data.ts (werkregel 4):
// nooit een cijfer van een echte klant uit het hoofd overtypen.
const BEWIJS_SLUGS = [
  "tweeverdieners-drie-kinderen",
  "stel-zonder-kinderen",
  "alleenstaand-huurwoning",
];

export default function OverPage() {
  const bewijsRapporten = BEWIJS_SLUGS.map((slug) => rapportVoorSlug(slug)).filter(
    (r): r is NonNullable<typeof r> => Boolean(r)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />

      <main className="pt-16">

        {/* Intro */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Over mij</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Ik bouw financiële software voor mijn werk. Tóch wisten wij niet
              waar ons geld bleef.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed">
              Geen schulden. Geen gek grote uitgaven. Twee inkomens, drie
              kinderen. Elke maand hetzelfde gevoel: de spaarpotten lopen leeg
              en we snappen niet waarom. Voor de buitenwereld hadden we het
              prima voor elkaar. Van binnen vroegen we ons af wat we fout deden.
            </p>
          </div>
        </section>

        {/* Wie: foto en korte introductie */}
        <section className="bg-background pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="card-base border border-[#E6E9E7]">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-16 h-16 rounded-full bg-[#16211F] flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src="/jarno.jpg"
                    alt="Jarno Koopman"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display font-light text-primary text-xl">
                    Jarno Koopman
                  </p>
                  <p className="font-body text-text-muted text-sm">
                    Oprichter, schrijft de artikelen en kijkt met je mee
                  </p>
                </div>
              </div>
              <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                Ik werk in de financiële software. Mijn vrouw is
                doktersassistente. We verdienen samen niet slecht, maar na een
                verhuizing met hogere hypotheek, duurdere boodschappen en drie
                kinderen die steeds meer nodig hadden, kwamen we echt in de
                knel. Niet door luxe. Niet door domme keuzes. De kosten
                stapelden, de spaarpotten liepen langzaam leeg, en we hadden
                geen systeem om het te zien.
              </p>
            </div>
          </div>
        </section>

        {/* Het verhaal: ontdekking, wat ik toen nodig had, en de concrete uitkomst */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Hoe het begon</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Toen we kritisch gingen kijken, schrokken we.
            </h2>
            <div className="space-y-4 text-text-soft font-body font-light text-base leading-relaxed">
              <p>
                De boodschappen bleken fors hoger dan gemiddeld. Verse dingen
                die in de vuilnis belandden. Impulsief eten bestellen terwijl de
                koelkast vol lag. Een weekend weg met de kinderen dat zomaar
                honderden euro meer kostte dan gedacht. En verjaardagen,
                feestdagen? Altijd een verrassing, want we hadden één grote
                spaarpot zonder enig patroon.
              </p>
              <p>
                Niet omdat we het niet konden. Maar omdat we het nooit echt
                hadden bekeken.
              </p>

              <p className="font-body font-medium text-primary pt-2">
                Wat ik toen nodig had
              </p>
              <p>
                We zochten hulp. Schuldhulpverlening was niet voor ons. Een
                financieel adviseur wilde praten over beleggen en hypotheken.
                Een cursus of spreadsheet beginnen we toch nooit aan. Er was
                niemand die gewoon met ons meeliep, die vroeg: wat komt er
                binnen, wat gaat er uit, en wat zegt dat over júllie situatie?
              </p>
              <p>
                Daarom doe ik nu voor anderen wat ik toen zelf nodig had:
                iemand die naast de cijfers ook naar het hele huishouden kijkt
                en zegt wat hem opvalt.
              </p>
              <p>
                Ik weet hoe het voelt. Keihard werken, normaal leven, en toch
                elke maand dat knagend gevoel. Zien hoe anderen op het terras
                zitten, met het vliegtuig weggaan, en je stilletjes afvragen:
                doen wij iets fout? Verdienen we te weinig? Je kunt het er
                eigenlijk niet over hebben, want het is taboe. Met vrienden
                niet, met een bank kom je nergens.
              </p>
              <p>
                Wij zijn er niet in één keer uitgekomen. We hielden niet
                ineens duizenden euro&apos;s meer over. We stopten vooral met
                steeds opnieuw geld uit onze spaarpot te halen voor kosten die
                we eigenlijk hadden kunnen voorspellen: een weekend weg, de
                winterjassen, de decembermaand. In plaats daarvan kreeg ieder
                kind een eigen jaardoel, kwamen er vaste potjes met een naam
                erop, en keken we er wekelijks samen naar. Niet spannend, niet
                in één keer klaar. Maar daardoor zagen we voor het eerst wat
                we werkelijk konden sparen.
              </p>
              <p className="font-body font-normal text-primary">
                Waar blijft het bestaat omdat ik die persoon wil zijn die er
                voor ons nooit was.
              </p>
            </div>
          </div>
        </section>

        {/* Waarom ik denk dat ik dit kan */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Mijn achtergrond</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Waarom ik denk dat ik dit kan zien
            </h2>
            <div className="space-y-4 text-text-soft font-body font-light text-base leading-relaxed">
              <p>
                Ik ben geen financieel adviseur. Mijn kracht zit in het
                analyseren en begrijpelijk maken van huishoudfinanciën, en dat
                doe ik dagelijks in mijn werk: ik bouw software waarmee
                complexe financiële cijfers vertaald worden naar iets wat
                iemand zonder financiële achtergrond kan lezen en gebruiken.
              </p>
              <p>
                Die vaardigheid combineer ik met iets wat geen enkele
                adviseur erbij kan leveren: ik heb zelf in een huishouden
                gezeten waar de cijfers niet klopten, terwijl er niets
                buitensporigs werd uitgegeven. Ik weet niet alleen hoe je een
                huishoudboekje uitleest, ik weet ook hoe het voelt om er
                middenin te zitten.
              </p>
              <p>
                En misschien wel het belangrijkste: ik verkoop geen enkel
                financieel product. Geen verzekering, geen hypotheek, geen
                beleggingsfonds. Ik heb geen belang bij wat je met mijn
                analyse doet, dus ook geen reden om je iets aan te praten.
              </p>
            </div>
          </div>
        </section>

        {/* Bewijs: echte rapporten */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Bewijs, geen belofte</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Dit heb ik inmiddels voor andere huishoudens uitgezocht
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-8">
              Ik deel deze rapporten niet als succesverhaal, maar zodat je
              kunt zien hoe ik werk voordat je zelf iets deelt. Namen zijn
              weggelaten, de bedragen staan er precies zoals ze zijn
              aangeleverd. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length}{" "}
              bleek er uiteindelijk niets te repareren, en ook dat lees je
              terug.
            </p>

            <div className="space-y-4">
              {bewijsRapporten.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rapporten/${r.slug}`}
                  className="card-base border border-[#E6E9E7] block hover:border-[#0B7A6E] transition-colors"
                  style={{ borderLeft: "3px solid #0B7A6E", textDecoration: "none" }}
                >
                  <p className="section-eyebrow mb-2">{r.chip}</p>
                  <p className="font-display font-light text-primary text-lg sm:text-xl mb-3 leading-snug">
                    {r.uitkomstKop}
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    Zij dachten vooraf: &ldquo;{r.vermoeden}&rdquo;
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href="/rapporten"
                className="font-body text-sm font-medium hover:underline"
                style={{ color: "#0B7A6E" }}
              >
                Bekijk alle rapporten &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Wat ik wel en niet doe */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base border border-[#A6D8CD] bg-green-light">
              <p className="font-display font-light text-primary text-xl mb-4">
                Wat ik wél doe
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                <li>Jullie huishoudfinanciën analyseren, in gewone taal</li>
                <li>Vergelijken met huishoudens in een vergelijkbare situatie</li>
                <li>Patronen zichtbaar maken die je zelf niet meer ziet</li>
                <li>Onderscheid maken tussen een écht probleem en een bewuste keuze</li>
                <li>Helpen een concreet plan te maken, geen abstract advies</li>
              </ul>
            </div>
            <div className="card-base border border-[#E6E9E7]">
              <p className="font-display font-light text-primary text-xl mb-4">
                Wat ik niet doe
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                <li>Geen boekhouder, financieel planner, hypotheekadviseur of beleggingsadviseur</li>
                <li>Geen schuldhulpverlening</li>
                <li>Geen producten verkopen of doorverwijzen voor commissie</li>
                <li>Geen spreadsheets of cursussen waar je toch niet aan begint</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transparantie / grenzen */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Eerlijk is eerlijk</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Wat je van mij wel en niet mag verwachten
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-4">
              Ik ben geen AFM-geregistreerde financieel adviseur en geef geen
              financieel advies in de juridische zin. Wat ik bied is inzicht,
              herkenning en een eerlijke blik van buitenaf, gebaseerd op
              openbare cijfers van bronnen als het Nibud, CBS en de
              Belastingdienst. Bij elk artikel vermeld ik waar de cijfers
              vandaan komen, en ik maak onderscheid tussen harde data en
              indicaties uit de praktijk.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed">
              Heb je schulden of een complexe situatie? Dan ben je bij een
              gecertificeerde budgetcoach of bij{" "}
              <a
                href="https://geldfit.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Geldfit
              </a>{" "}
              beter op je plek. Dat zeg ik gewoon.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Herken je dit verhaal?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Begin dan eens met vijf minuten kijken naar je eigen situatie.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}
            >
              Doe de gratis analyse &rarr;
            </Link>
            <p className="font-body font-light text-white/50 text-sm mt-5">
              <Link href="/geldscan" className="hover:underline text-white/50">
                Wil je dat ik gelijk met je meekijk? Dat kan ook, via de Geldscan &rarr;
              </Link>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
