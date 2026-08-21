import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Over Jarno Koopman | Waar blijft het",
  description:
    "Ik verdiende goed en wist toch niet waar ons geld bleef. Geen schulden, geen luxe, en toch bleef er minder over dan verwacht. Dat is waarom Waar blijft het bestaat.",
  alternates: { canonical: "https://www.waarblijfthet.nl/over" },
  openGraph: {
    title: "Over Jarno Koopman | Waar blijft het",
    description:
      "Ik verdiende goed en wist toch niet waar ons geld bleef. Dat is waarom Waar blijft het bestaat.",
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
// stel-zonder-kinderen staat er bewust bij, dat is de scan zonder lek.
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

      <main>

        {/* 1. Hero: waarom dit bestaat, niet wat ik voor werk doe */}
        <section className="bg-background pt-14 pb-12 sm:pt-16 sm:pb-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="section-eyebrow mb-4">Over mij</p>
                <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-5">
                  Ik verdiende goed. Toch wist ik niet waar ons geld bleef.
                </h1>
                <p className="font-body font-normal text-primary text-lg leading-relaxed mb-5">
                  Dat was uiteindelijk de reden om Waar blijft het? te beginnen.
                </p>
                <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-[52ch]">
                  Ik wilde weten of er echt iets mis was met onze financiën, of
                  dat ik gewoon niet goed begreep wat er iedere maand gebeurde.
                </p>
              </div>

              <div className="lg:justify-self-end w-full max-w-[400px] mx-auto lg:mx-0">
                <div className="rounded-xl overflow-hidden shadow-card bg-card">
                  <Image
                    src="/jarno.jpg"
                    alt="Jarno Koopman"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <p className="font-body text-text-muted text-sm mt-3">
                  Jarno Koopman, ik lees je cijfers en schrijf je rapport zelf.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Persoonlijk verhaal */}
        <section className="bg-card py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14">
              <div>
                <p className="section-eyebrow mb-4">Hoe het begon</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl">
                  Er was niets aan de hand, en toch klopte het niet
                </h2>
              </div>
              <div className="space-y-4 text-text-soft font-body font-light text-base leading-relaxed max-w-[62ch]">
                <p>
                  Ik verdien goed. Geen schulden, geen buitensporige uitgaven,
                  geen dure hobby&apos;s. Twee inkomens, drie kinderen, een heel
                  normaal leven.
                </p>
                <p>
                  Toch bleef er elke maand minder over dan ik verwachtte. Na een
                  verhuizing met een hogere hypotheek liepen de spaarpotjes
                  langzaam leeg, en ik kon niet uitleggen waardoor. Voor de
                  buitenwereld hadden we het prima voor elkaar. Zelf vroeg ik me
                  af of ik iets over het hoofd zag.
                </p>
                <p>
                  Ik ging zoeken naar hulp. Schuldhulp was niet voor ons bedoeld.
                  Een financieel adviseur wilde praten over hypotheken en
                  beleggen. Een cursus of een spreadsheet hield ik nooit vol.
                </p>
                <p>
                  Toen ik onze cijfers eindelijk naast elkaar legde, bleek het
                  probleem niet één uitgavencategorie te zijn. Het ontbrak vooral
                  aan context. Ik zag wat we uitgaven, maar niet of dat voor een
                  huishouden als het onze veel of weinig was.
                </p>
                <p className="font-body font-normal text-primary">
                  Daaruit is Waar blijft het? ontstaan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Professionele achtergrond, als bewijs van deskundigheid */}
        <section className="bg-background py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14">
              <div>
                <p className="section-eyebrow mb-4">Mijn achtergrond</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl">
                  Ik werk dagelijks met financiële cijfers
                </h2>
              </div>
              <div className="space-y-4 text-text-soft font-body font-light text-base leading-relaxed max-w-[62ch]">
                <p>
                  Voor mijn werk houd ik me dagelijks bezig met financiële
                  software, cijfers en processen. Dat maakte het extra opvallend
                  dat ik thuis zelf niet goed kon verklaren waarom we minder
                  overhielden dan ik verwachtte.
                </p>
                <p>
                  Ik ontdekte dat cijfers alleen niet genoeg zijn. Je moet ze in
                  de context van een huishouden kunnen plaatsen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Positionering: waarom Waar blijft het bestaat */}
        <section className="bg-card py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14">
              <div>
                <p className="section-eyebrow mb-4">De aanleiding</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl">
                  Daarom bestaat Waar blijft het?
                </h2>
              </div>
              <div className="max-w-[62ch]">
                <div className="space-y-4 text-text-soft font-body font-light text-base leading-relaxed">
                  <p>
                    Ik merkte dat veel financiële hulpmiddelen je vooral vertellen
                    wat je uitgeeft. Maar niet of dat voor jouw situatie eigenlijk
                    veel of weinig is.
                  </p>
                  <p>
                    Waar blijft het? kijkt daarom naar het volledige huishouden.
                    Niet alleen naar losse categorieën, maar naar inkomen, wonen,
                    kinderen, vervoer, dagelijkse uitgaven en de financiële ruimte
                    die daar uiteindelijk uit overblijft.
                  </p>
                </div>

                <div
                  className="mt-7 card-base border border-[#A6D8CD] bg-green-light"
                  style={{ borderLeft: "3px solid #0B7A6E" }}
                >
                  <p className="font-display font-light text-primary text-xl sm:text-2xl leading-snug">
                    En soms is de conclusie simpelweg dat er financieel weinig
                    geks aan de hand is. Ook dat is een waardevolle uitkomst.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Wat ik wel en niet doe */}
        <section className="bg-background py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <p className="section-eyebrow mb-4">Mijn rol</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8">
              Wat ik wel en niet doe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-base border border-[#A6D8CD] bg-green-light">
                <p className="font-display font-light text-primary text-xl mb-4">
                  Wel
                </p>
                <ul className="space-y-3 font-body font-light text-sm text-text-soft">
                  <li>Ik analyseer financiële situaties van huishoudens.</li>
                  <li>Ik vergelijk cijfers met vergelijkbare huishoudens.</li>
                  <li>Ik geef mijn persoonlijke oordeel over wat opvalt.</li>
                </ul>
              </div>

              <div className="card-base border border-[#E6E9E7]">
                <p className="font-display font-light text-primary text-xl mb-4">
                  Niet
                </p>
                <ul className="space-y-3 font-body font-light text-sm text-text-soft">
                  <li>Ik verkoop geen financiële producten.</li>
                  <li>Ik ontvang geen provisie.</li>
                  <li>Ik ben geen hypotheek- of beleggingsadviseur.</li>
                </ul>
              </div>

              <div
                className="card-base border border-[#E6E9E7]"
                style={{ borderLeft: "3px solid #16211F" }}
              >
                <p className="font-display font-light text-primary text-xl mb-4">
                  Belangrijk
                </p>
                <ul className="space-y-3 font-body font-light text-sm text-text-soft">
                  <li>Ik zoek niet automatisch naar besparingen.</li>
                  <li>
                    Als er financieel weinig geks aan de hand is, zeg ik dat ook.
                  </li>
                </ul>
              </div>
            </div>

            <p className="font-body font-light text-text-muted text-sm leading-relaxed mt-6 max-w-[70ch]">
              Ik geef geen financieel advies in de juridische zin. Ik vergelijk
              met openbare cijfers van bronnen als het Nibud, het CBS en de
              Belastingdienst, en met de huishoudens die ik zelf heb
              doorgerekend. Heb je schulden of een complexe situatie, dan ben je
              beter op je plek bij een gecertificeerde budgetcoach of bij{" "}
              <a
                href="https://geldfit.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Geldfit
              </a>
              .
            </p>
          </div>
        </section>

        {/* 6. Bewijs: echte rapporten */}
        <section className="bg-card py-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-[62ch] mb-8">
              <p className="section-eyebrow mb-4">Bewijs, geen belofte</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
                Inmiddels heb ik dit voor meerdere huishoudens gedaan
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed">
                Ik deel deze rapporten zodat je kunt zien hoe ik werk voordat je
                zelf iets deelt. Namen zijn weggelaten, de bedragen staan er
                precies zoals ze zijn aangeleverd. Niet iedere analyse eindigt
                met een lijst besparingen. Bij {AANTAL_ZONDER_LEK} van de{" "}
                {RAPPORTEN.length} bleek er uiteindelijk niets te repareren, en
                ook dat lees je terug.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

        {/* 7. Geen automatisch rapport */}
        <section className="bg-background py-12">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div
              className="card-base border border-[#E6E9E7] max-w-[70ch]"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="section-eyebrow mb-3">Geen automatisch rapport</p>
              <p className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug">
                Ik kijk zelf naar de cijfers en schrijf zelf de conclusie.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Contact, bewust ondergeschikt aan de analyse-CTA */}
        <section className="bg-background pb-14">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-[70ch] border-t border-[#E6E9E7] pt-8">
              <p className="font-body font-medium text-primary text-base mb-2">
                Een vraag?
              </p>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-3">
                Niet zeker of Waar blijft het? bij jouw situatie past? Mail me
                gerust. Ik lees zelf alle berichten.
              </p>
              <a
                href="mailto:hallo@waarblijfthet.nl"
                className="font-body text-sm font-medium hover:underline"
                style={{ color: "#0B7A6E" }}
              >
                Mail Jarno &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* 9. Primaire CTA: gratis analyse, geen Geldscan */}
        <section className="bg-dark-block py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5 max-w-2xl mx-auto">
              Benieuwd hoe jouw financiële situatie ervoor staat?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-lg mx-auto">
              Begin met de gratis analyse. In een paar minuten zie je waar jouw
              huishouden afwijkt van vergelijkbare huishoudens.
            </p>
            <CtaLink
              doel="analyse"
              href={analyseHref()}
              locatie="over-slot"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}
            >
              {PRIMAIRE_CTA_LABEL} &rarr;
            </CtaLink>
            <p className="font-body font-light text-white/50 text-sm mt-5">
              Gratis &bull; vertrouwelijk &bull; geen verkoopgesprek
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
