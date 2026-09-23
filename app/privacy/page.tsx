import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy | Waar blijft het",
  description: "Welke gegevens ik verzamel, waarvoor, hoe lang ik ze bewaar en wie ze voor mij verwerkt.",
  robots: { index: false, follow: false },
};

/**
 * Herschreven op 23-sep-2026. De vorige versie (mei 2026) stond in de wij-vorm,
 * noemde een wachtlijst die niet meer bestaat, zei dat analyse-antwoorden
 * alleen met toestemming werden bewaard (ze worden altijd anoniem per scherm
 * opgeslagen), beloofde verwijdering na 2 jaar terwijl er niets automatisch
 * verwijdert, en noemde Vercel Analytics, freeipapi.com en Resend niet.
 *
 * Regel voor wie dit aanpast: alleen opschrijven wat de code echt doet. Komt
 * er een nieuwe tabel, dienst of meting bij, dan hoort die hier in dezelfde
 * commit.
 */

const MAIL = "hallo@waarblijfthet.nl";

function Sectie({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display font-light text-primary text-2xl mb-3">{titel}</h2>
      <div className="font-body font-light text-text-soft text-base leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Situatie({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#E6E9E7] bg-white px-5 py-4">
      <p className="font-body font-medium text-primary text-base mb-1">{titel}</p>
      <div className="font-body font-light text-text-soft text-[15px] leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function MailLink() {
  return (
    <a href={`mailto:${MAIL}`} className="text-primary underline underline-offset-2">
      {MAIL}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-5">Privacy</h1>
          <p className="font-body font-light text-text-soft text-lg leading-relaxed mb-12">
            Waar blijft het is van mij, Jarno Koopman, in Tilburg. Hieronder staat welke gegevens ik verzamel,
            waarvoor ik ze gebruik, hoe lang ik ze bewaar en wie ze voor mij verwerkt.
          </p>

          <Sectie titel="Wat ik verzamel, per situatie">
            <div className="space-y-3">
              <Situatie titel="Je bezoekt de site">
                <p>
                  Welke pagina je bekijkt, of je op mobiel of desktop zit, via welke pagina je binnenkwam, je stad of
                  regio en een willekeurige code per bezoek. Geen naam en geen e-mailadres.
                </p>
                <p>
                  Voor de stad of regio stuurt je browser je IP-adres naar freeipapi.com. Dat IP-adres sla ik zelf
                  niet op. Daarnaast telt Vercel Analytics anoniem het aantal bezoekers en meet Vercel hoe snel pagina&apos;s
                  laden.
                </p>
              </Situatie>

              <Situatie titel="Je vult de gratis analyse in">
                <p>
                  Je antwoorden (inkomen, vaste lasten en uitgaven) worden per scherm opgeslagen, zonder naam of
                  e-mailadres, alleen met de willekeurige code van je bezoek. Zo zie ik waar mensen stoppen en kan ik de
                  vergelijking verbeteren. Tijdens het invullen staan je antwoorden ook in je browser, tot je het
                  tabblad sluit.
                </p>
                <p>
                  Zet je het vinkje aan dat je bedragen anoniem mogen meetellen, dan gebruik ik ze ook voor een
                  overzicht van wat huishoudens uitgeven. Alleen in groepen die groot genoeg zijn om niemand
                  herkenbaar te maken.
                </p>
              </Situatie>

              <Situatie titel="Je laat je uitkomst mailen of stelt me een vraag">
                <p>
                  Je e-mailadres, je antwoorden uit de analyse en, als je die stelt, je vraag. Die gebruik ik om je de
                  uitkomst en mijn antwoord te sturen. Je krijgt geen nieuwsbrief, tenzij je daar zelf het vinkje voor
                  aanzet.
                </p>
              </Situatie>

              <Situatie titel="Je vraagt een Geldscan of gesprek aan">
                <p>
                  Je voornaam, je e-mailadres en wat je zelf over je situatie vertelt. Na betaling je antwoorden uit de
                  analyse en, als je die meestuurt, bankafschriften per mail. Streep daarin weg wat ik niet hoef te zien.
                </p>
                <p>
                  Je afschriften verwijder ik na levering zelf. Je rapport komt alleen op de site met jouw schriftelijke
                  toestemming, en dan zonder naam.
                </p>
              </Situatie>

              <Situatie titel="Ik mail je zakelijk">
                <p>
                  Werk je als professional, bijvoorbeeld als coach of boekhouder, dan mail ik je soms over
                  samenwerking. Daarvoor gebruik ik je naam, zakelijke e-mailadres, praktijk en website uit openbare
                  bronnen. Onder elke mail staat een afmeldlink; daarna mail ik je niet meer.
                </p>
              </Situatie>
            </div>
          </Sectie>

          <Sectie titel="Waarom dat mag">
            <p>
              Wat je zelf vraagt (je uitkomst, een antwoord, een Geldscan) kan ik niet leveren zonder die gegevens.
              Bezoekersstatistiek en zakelijke mail doe ik omdat ik er een gerechtvaardigd belang bij heb; je kunt
              daar altijd bezwaar tegen maken. Voor de nieuwsbrief en het anoniem meetellen van je bedragen vraag ik je
              toestemming, met een vinkje dat standaard uit staat.
            </p>
          </Sectie>

          <Sectie titel="Hoe lang ik het bewaar">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Bezoekersstatistiek en anonieme analyse-antwoorden: zonder vaste termijn. Er staat geen naam of e-mailadres in.</li>
              <li>Je e-mailadres, je antwoorden en je vraag: tot je vraagt om ze te verwijderen.</li>
              <li>Bankafschriften: tot je rapport geleverd is.</li>
              <li>Betalingen en facturen: 7 jaar, omdat de Belastingdienst dat verplicht.</li>
            </ul>
            <p>Verwijderen doe ik met de hand. Een mail naar <MailLink /> is genoeg.</p>
          </Sectie>

          <Sectie titel="Wie gegevens voor mij verwerkt">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Vercel: hosting van de site en de anonieme bezoekersstatistiek.</li>
              <li>Supabase: de database.</li>
              <li>Resend: het versturen van e-mail.</li>
              <li>freeipapi.com: stad of regio bij een IP-adres.</li>
            </ul>
            <p>
              Een deel van deze diensten is gevestigd in de Verenigde Staten. Ik verkoop geen gegevens en deel ze met
              niemand anders.
            </p>
          </Sectie>

          <Sectie titel="Cookies">
            <p>
              De site plaatst geen cookies voor statistiek of advertenties. Er is dus ook geen cookiemelding.
            </p>
          </Sectie>

          <Sectie titel="Jouw rechten">
            <p>
              Je mag je gegevens inzien, laten verbeteren of laten verwijderen, en bezwaar maken tegen het gebruik
              ervan. Mail naar <MailLink />; ik reageer binnen 5 werkdagen. Ben je het niet eens met hoe ik ermee omga,
              dan kun je een klacht indienen bij de{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>
          </Sectie>

          <p className="font-body text-text-muted text-sm border-t border-[#E6E9E7] pt-6">
            Laatst bijgewerkt: 23 september 2026. Meer over mij staat op de{" "}
            <Link href="/over" className="underline underline-offset-2">
              over-pagina
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
