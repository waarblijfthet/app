import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RAPPORTEN, AANTAL_ZONDER_LEK, AANTAL_ZONDER_VERVOLG } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: `${RAPPORTEN.length} echte gezinsbudgetten: cijfers, oordeel en nameting`,
  description:
    `${RAPPORTEN.length} huishoudens leverden hun cijfers aan zoals in een huishoudboekje, plus mijn oordeel en de nameting na drie tot vier maanden. Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} ging er niets mis.`,
  alternates: { canonical: "https://www.waarblijfthet.nl/rapporten" },
  openGraph: {
    title: `${RAPPORTEN.length} echte gezinsbudgetten: cijfers, oordeel en nameting`,
    description:
      `Wat ${RAPPORTEN.length} huishoudens zelf dachten, wat ik vond en wat er daarna veranderde. Met hun eigen cijfers.`,
    url: "https://www.waarblijfthet.nl/rapporten",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RapportenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Echte rapporten, met toestemming gepubliceerd</p>
            <h1 className="font-display font-light text-primary text-3xl sm:text-5xl mb-6 leading-tight">
              Wat ze zelf dachten, en wat er werkelijk uit kwam
            </h1>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              {RAPPORTEN.length} huishoudens leverden hun cijfers aan zoals in een huishoudboekje: wat er
              binnenkwam, wat wegging en wat er overbleef. Ik schreef er het rapport bij, zij gingen ermee aan
              de slag, en drie tot vier maanden later hebben ze opgeschreven wat er veranderde. Je leest
              hieronder hun ingevulde vragenlijst, mijn advies en hun eigen evaluatie.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Bij een huishoudboekje-rubriek lees je wat er binnenkwam en wegging. Hier staat dat ook, plus mijn
              oordeel over wat ik zag en wat er drie tot vier maanden later in dat huishouden veranderde. Dat
              oordeel en die nameting staan bij elk van de {RAPPORTEN.length} rapporten hierboven, ook de
              {AANTAL_ZONDER_LEK} keer dat mijn conclusie was dat er niets te repareren viel.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Bij {AANTAL_ZONDER_VERVOLG} van de {RAPPORTEN.length} was een vervolggesprek daarna niet nodig.
              Dat staat er ook.
            </p>
            <p className="font-body font-light text-text-muted text-sm leading-relaxed">
              Namen zijn weggelaten en herkenbare details zijn aangepast. Alle bedragen staan er precies zoals
              zij ze aanleverden, want een geldrapport is een optelsom: verander je er één, dan klopt de rest
              niet meer.
            </p>
          </div>
        </section>

        {/* Situatiekiezer */}
        <section className="bg-background pt-2 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            <p className="font-body font-medium text-primary text-sm mb-3">Kies de situatie die op jou lijkt</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
              {RAPPORTEN.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rapporten/${r.slug}`}
                  className="font-body text-sm font-medium whitespace-nowrap transition-colors hover:border-[#0B7A6E] shrink-0"
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    border: "1px solid #E6E9E7",
                    color: "#16211F",
                    textDecoration: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {r.chip} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* De vijf kaarten */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            {RAPPORTEN.map((r) => (
              <article
                key={r.slug}
                className="card-base border border-[#E6E9E7]"
                style={{ borderLeft: "3px solid #0B7A6E" }}
              >
                <p className="section-eyebrow mb-2">{r.chip}</p>
                <h2 className="font-display font-light text-primary text-xl sm:text-2xl mb-2 leading-snug">
                  {r.verhaalTitel}
                </h2>
                <p className="font-body font-light text-text-muted text-sm mb-5 leading-relaxed">
                  {r.kenmerken.join(" · ")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <p className="section-eyebrow mb-2">Wat ze zelf dachten</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-2">
                      &ldquo;{r.vermoeden}&rdquo;
                    </p>
                    <p className="font-body font-light text-text-muted text-xs leading-relaxed">
                      {r.vermoedenBedrag}
                    </p>
                  </div>
                  <div
                    className="sm:pl-6"
                    style={{ borderTop: "1px solid #E6E9E7", paddingTop: "1.25rem" }}
                  >
                    <p className="section-eyebrow mb-2">Wat eruit kwam</p>
                    <p className="font-body font-medium text-primary text-sm mb-2 leading-snug">
                      {r.uitkomstKop}
                    </p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{r.uitkomst}</p>
                  </div>
                </div>

                <div
                  className="mt-5 pt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
                  style={{ borderTop: "1px solid #E6E9E7" }}
                >
                  <span className="font-body text-xs text-text-muted">
                    Evaluatie {r.doorlooptijd}
                  </span>
                  <span className="font-body text-xs text-text-muted">
                    Vervolggesprek: {r.vervolggesprek ? "ja" : "nee"}
                  </span>
                  <Link
                    href={`/rapporten/${r.slug}`}
                    className="font-body text-sm font-medium hover:underline ml-auto"
                    style={{ color: "#0B7A6E" }}
                  >
                    Lees het hele rapport &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Overzichtstabel */}
        <section className="bg-background py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Vijf keer dezelfde methode, vijf verschillende antwoorden
            </h2>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-6">
              Dit is waarom ik geen sjabloon gebruik. Twee keer was de uitkomst dat er niets te repareren viel,
              twee keer zat het in de jaaruitgaven die niemand had gereserveerd, en één keer was het inkomen zelf
              het probleem, niet de uitgaven. Vijf keer dezelfde vijf vragen, vijf verschillende antwoorden.
            </p>
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <table className="w-full font-body text-sm" style={{ minWidth: "44rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #16211F" }}>
                    {["Situatie", "Eigen vermoeden", "Wat eruit kwam", "Vervolg"].map((h) => (
                      <th
                        key={h}
                        className="font-body font-medium text-primary text-xs uppercase"
                        style={{ textAlign: "left", padding: "0.6rem 0.75rem 0.6rem 0", letterSpacing: "0.08em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RAPPORTEN.map((r) => (
                    <tr key={r.slug} style={{ borderBottom: "1px solid #E6E9E7" }}>
                      <td className="text-primary font-medium" style={{ padding: "0.85rem 0.75rem 0.85rem 0", verticalAlign: "top" }}>
                        <Link href={`/rapporten/${r.slug}`} className="hover:underline">
                          {r.chip}
                        </Link>
                      </td>
                      <td className="text-text-soft font-light" style={{ padding: "0.85rem 0.75rem 0.85rem 0", verticalAlign: "top" }}>
                        {r.vermoedenBedrag}
                      </td>
                      <td className="text-text-soft font-light" style={{ padding: "0.85rem 0.75rem 0.85rem 0", verticalAlign: "top" }}>
                        {r.uitkomstKop}
                      </td>
                      <td className="text-text-soft font-light" style={{ padding: "0.85rem 0 0.85rem 0", verticalAlign: "top" }}>
                        {r.vervolggesprek ? "gesprek" : "geen"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Methode: waar mijn vergelijkingscijfers vandaan komen */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Deze vijf zijn ook mijn maatstaf
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              De gratis analyse op deze site vergelijkt jouw bedragen met iets. Dat iets zijn geen openbare
              gemiddelden, maar de huishoudens die ik zelf heb doorgerekend. Dat zijn er nu vijf, en die staan
              hierboven van begin tot eind, dus je kunt narekenen waar mijn cijfers vandaan komen.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Nibud-referentiebudgetten gebruik ik daar bewust niet voor. Dat zijn grotendeels
              minimumbudgetten: ze beschrijven wat een huishouden nodig heeft om rond te komen, niet wat een
              huishouden met een goed inkomen werkelijk uitgeeft. Vergelijk je iemand met 6.000 euro netto met
              een minimumbudget, dan valt elke post uit de toon en is de uitkomst waardeloos.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Toen ik mijn eigen vergelijking naast deze vijf legde, klopte hij op drie punten niet. Mijn
              boodschappenbedrag lag bij alle vijf 175 tot 260 euro te laag. Mijn kinderkosten vergeleken de
              opvang, school en sport van jouw kinderen met de totale kosten van een kind inclusief eten en
              woonruimte, waardoor elke ouder ver onder het gemiddelde leek te zitten. En mijn woonlast was een
              vast percentage van het inkomen, terwijl één inkomen aantoonbaar een groter deel aan wonen
              betaalt: een huur van 1.285 euro op 3.650 netto is 35 procent en niet 30. Dat is alle drie
              aangepast. De gemiddelde afwijking van mijn vergelijking ging daarmee van 218 naar 54 euro per
              post.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Wat dat niet is: een wetenschappelijke norm. Vijf huishoudens zijn vijf huishoudens. Bij sommige
              bedragen heb ik er twee gezien, bij één maar één, en dat staat er in de code letterlijk bij. Ik
              stel ze bij na elke scan die ik lever, en de dag dat een getal iets anders zegt dan mijn eigen
              klanten, verandert het getal en niet de klant.
            </p>
            <p className="font-body font-light text-text-muted text-sm leading-relaxed">
              Eén getal komt hier niet uit: hoeveel er bij jou zou moeten overblijven. Dat kan ook niet, want
              deze vijf leverden wat er werkelijk overbleef en niet wat er zou moeten overblijven. Dat is mijn
              eigen vuistregel en zo staat het ook in de analyse. Wel heb ik gecontroleerd of hij de goede kant
              op wijst: bij alle vijf kwam mijn vuistregel uit op dezelfde conclusie als het rapport dat ik met
              de hand schreef, en bij drie van de vijf lag de omvang van het gat binnen wat de klant zelf vooraf
              schatte.
            </p>
          </div>
        </section>

        {/* CTA, eenmalig en onderaan */}
        <section className="bg-card py-14">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wil je weten of het bij jou klopt?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-7">
              Begin met de gratis analyse. In een paar minuten zie je waar jouw huishouden afwijkt van
              vergelijkbare huishoudens. Daarna bepaal je zelf of je verder wilt.
            </p>
            <Link href="/analyse" className="btn-primary">
              Doe de gratis analyse &rarr;
            </Link>
            <p className="font-body font-light text-text-muted text-sm mt-5">
              <Link href="/geldscan" className="hover:underline">
                Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan &rarr;
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
