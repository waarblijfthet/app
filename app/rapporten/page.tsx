import type { Metadata } from "next";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RAPPORTEN, AANTAL_ZONDER_LEK, AANTAL_ZONDER_VERVOLG, type Rapport } from "@/lib/rapporten-data";

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

const FEITEN = [
  {
    label: `${RAPPORTEN.length} echte huishoudens`,
    beschrijving:
      "Ieder rapport is gebaseerd op cijfers die zij zelf aanleverden, zoals in een huishoudboekje.",
  },
  {
    label: "Door mij geschreven",
    beschrijving:
      "Ik schrijf bij elk rapport zelf het advies. Er zit geen sjabloon en geen automatisch model tussen.",
  },
  {
    label: "Nameting na drie tot vier maanden",
    beschrijving: "Zij schreven zelf op wat er in hun situatie veranderde. Dat oordeel lees je hieronder terug.",
  },
  {
    label: "Niet elk rapport eindigt met een probleem",
    beschrijving: `Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} huishoudens viel er niets te repareren, en dat staat er ook gewoon bij.`,
  },
  {
    label: "Niet altijd een vervolggesprek",
    beschrijving: `Bij ${AANTAL_ZONDER_VERVOLG} van de ${RAPPORTEN.length} was dat na het rapport niet nodig.`,
  },
] as const;

function hoofdletter(zin: string) {
  return zin.charAt(0).toUpperCase() + zin.slice(1);
}

function CaseKaart({ r, nummer }: { r: Rapport; nummer: number }) {
  const volgnummer = String(nummer).padStart(2, "0");

  return (
    <article
      id={r.slug}
      className="card-base border border-[#E6E9E7] relative overflow-hidden"
      style={{ scrollMarginTop: "100px" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-4 right-5 sm:top-6 sm:right-7 font-display font-light"
        style={{ fontSize: "3.5rem", lineHeight: 1, color: "#E3E8E6" }}
      >
        {volgnummer}
      </div>

      <div className="relative">
        <p className="section-eyebrow mb-2">{volgnummer} &middot; Echt rapport</p>
        <p
          className="font-body font-semibold text-xs uppercase mb-4"
          style={{ color: "#0B7A6E", letterSpacing: "0.08em" }}
        >
          {r.chip}
        </p>
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5 leading-tight max-w-[82%] sm:max-w-xl">
          {r.verhaalTitel}
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {r.kenmerken.map((k) => (
            <span
              key={k}
              className="font-body text-xs text-text-soft rounded-full"
              style={{ border: "1px solid #E6E9E7", backgroundColor: "#FFFFFF", padding: "0.3rem 0.75rem" }}
            >
              {k}
            </span>
          ))}
        </div>

        {/* Ze dachten -> wat eruit kwam: het sterkste contrast op de pagina */}
        <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid #E6E9E7" }}>
          <div className="p-6 sm:p-7" style={{ backgroundColor: "#FBFBFA" }}>
            <p className="section-eyebrow mb-3">Ze dachten</p>
            <p className="font-body font-light italic text-text-soft text-base sm:text-lg leading-relaxed mb-3">
              &ldquo;{r.vermoeden}&rdquo;
            </p>
            <p className="font-body font-light text-text-muted text-xs leading-relaxed">{r.vermoedenBedrag}</p>
          </div>

          <div className="flex justify-center" style={{ backgroundColor: "#FBFBFA" }}>
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-full flex items-center justify-center font-body text-sm"
              style={{ border: "1px solid #0B7A6E", color: "#0B7A6E", backgroundColor: "#FFFFFF", margin: "0 0 -1.05rem 0" }}
            >
              &darr;
            </div>
          </div>

          <div className="pt-8 p-6 sm:pt-9 sm:p-7" style={{ backgroundColor: "#E4F1EE" }}>
            <p className="section-eyebrow mb-3" style={{ color: "#0B7A6E" }}>
              Wat eruit kwam
            </p>
            <p className="font-display font-normal text-primary text-xl sm:text-2xl mb-3 leading-snug">
              {r.uitkomstKop}
            </p>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed">{r.uitkomst}</p>
          </div>
        </div>

        {/* Na de evaluatieperiode */}
        <div className="pt-6 mb-6" style={{ borderTop: "1px solid #E6E9E7" }}>
          <p className="section-eyebrow mb-3">{hoofdletter(r.doorlooptijd)}</p>
          <p className="font-body font-medium text-primary text-sm mb-2">Wat veranderde er?</p>
          <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-3">
            &ldquo;{r.evaluatie}&rdquo;
          </p>
          <p className="font-body text-text-muted text-xs">
            Vervolggesprek: {r.vervolggesprek ? "ja" : "nee"}
          </p>
        </div>

        <div className="flex justify-end pt-2" style={{ borderTop: "1px solid #E6E9E7" }}>
          <Link
            href={`/rapporten/${r.slug}`}
            className="font-body text-sm font-medium hover:underline mt-4"
            style={{ color: "#0B7A6E" }}
          >
            Lees het hele rapport &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function RapportenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">
              {RAPPORTEN.length} echte rapporten, met toestemming gepubliceerd
            </p>
            <h1 className="font-display font-light text-primary text-3xl sm:text-5xl mb-6 leading-tight">
              Wat ze zelf dachten, en wat er werkelijk uit kwam
            </h1>
            <p className="font-body font-light text-text-soft leading-relaxed mb-6 max-w-2xl">
              {RAPPORTEN.length} huishoudens vulden hun cijfers in zoals in een huishoudboekje: wat er
              binnenkwam, wat wegging en wat er overbleef. Hieronder lees je per huishouden wat zij zelf
              vermoedden, wat ik erin zag en wat er drie tot vier maanden later veranderde.
            </p>

            <div style={{ borderTop: "1px solid #E6E9E7" }}>
              {FEITEN.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6 py-3.5"
                  style={{ borderBottom: "1px solid #E6E9E7" }}
                >
                  <p className="font-body font-medium text-primary text-sm sm:w-64 shrink-0 mb-0.5 sm:mb-0">
                    {f.label}
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    {f.beschrijving}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-body font-light text-text-muted text-sm leading-relaxed mt-6">
              Namen zijn weggelaten en herkenbare details zijn aangepast. Alle bedragen staan er precies zoals
              zij ze aanleverden, want een geldrapport is een optelsom: verander je er één, dan klopt de rest
              niet meer.
            </p>
          </div>
        </section>

        {/* Situatiekiezer */}
        <section className="bg-background pt-2 pb-10 sm:pb-14">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Kies de situatie die op jou lijkt</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {RAPPORTEN.map((r, i) => (
                <a
                  key={r.slug}
                  href={`#${r.slug}`}
                  className="group block rounded-xl transition-colors hover:border-[#0B7A6E]"
                  style={{ border: "1px solid #E6E9E7", backgroundColor: "#FFFFFF", padding: "1rem" }}
                >
                  <p className="section-eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-body font-semibold text-primary text-sm uppercase mb-1" style={{ letterSpacing: "0.02em" }}>
                    {r.chip}
                  </p>
                  <p className="font-body font-light text-text-muted text-xs leading-relaxed mb-3">
                    {r.kenmerken.slice(0, 2).join(" · ")}
                  </p>
                  <span
                    className="font-body text-xs font-medium inline-flex items-center gap-1"
                    style={{ color: "#0B7A6E" }}
                  >
                    Bekijk rapport <span aria-hidden="true">&darr;</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* De vijf rapporten, als losse case studies */}
        <section className="bg-card py-4 sm:py-6">
          <div className="max-w-3xl mx-auto px-6 space-y-16 sm:space-y-20">
            {RAPPORTEN.map((r, i) => (
              <CaseKaart key={r.slug} r={r} nummer={i + 1} />
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

            {/* Desktop en tablet: tabel */}
            <div className="hidden md:block overflow-x-auto">
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
                        <a href={`#${r.slug}`} className="hover:underline">
                          {r.chip}
                        </a>
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

            {/* Mobiel: gestapelde kaarten in plaats van een tabel */}
            <div className="md:hidden space-y-3">
              {RAPPORTEN.map((r) => (
                <div key={r.slug} className="rounded-xl p-4" style={{ border: "1px solid #E6E9E7", backgroundColor: "#FFFFFF" }}>
                  <a href={`#${r.slug}`} className="font-body font-medium text-primary text-sm mb-3 block hover:underline">
                    {r.chip}
                  </a>
                  <div className="space-y-2.5">
                    <div>
                      <p className="section-eyebrow mb-0.5">Eigen vermoeden</p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">{r.vermoedenBedrag}</p>
                    </div>
                    <div>
                      <p className="section-eyebrow mb-0.5">Wat eruit kwam</p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">{r.uitkomstKop}</p>
                    </div>
                    <div>
                      <p className="section-eyebrow mb-0.5">Vervolg</p>
                      <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                        {r.vervolggesprek ? "gesprek" : "geen"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methode: waar mijn vergelijkingscijfers vandaan komen */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Deze vijf zijn ook mijn maatstaf
            </h2>

            <h3 className="font-body font-semibold text-primary text-base mb-3">Geen openbare gemiddelden</h3>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              De gratis analyse op deze site vergelijkt jouw bedragen met iets. Dat iets zijn geen openbare
              gemiddelden, maar de huishoudens die ik zelf heb doorgerekend. Dat zijn er nu vijf, en die staan
              hierboven van begin tot eind, dus je kunt narekenen waar mijn cijfers vandaan komen.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-8">
              Nibud-referentiebudgetten gebruik ik daar bewust niet voor. Dat zijn grotendeels
              minimumbudgetten: ze beschrijven wat een huishouden nodig heeft om rond te komen, niet wat een
              huishouden met een goed inkomen werkelijk uitgeeft. Vergelijk je iemand met 6.000 euro netto met
              een minimumbudget, dan valt elke post uit de toon en is de uitkomst waardeloos.
            </p>

            <h3 className="font-body font-semibold text-primary text-base mb-3">Wat ik van deze vijf heb geleerd</h3>
            <p className="font-body font-light text-text-soft leading-relaxed mb-8">
              Toen ik mijn eigen vergelijking naast deze vijf legde, klopte hij op drie punten niet. Mijn
              boodschappenbedrag lag bij alle vijf 175 tot 260 euro te laag. Mijn kinderkosten vergeleken de
              opvang, school en sport van jouw kinderen met de totale kosten van een kind inclusief eten en
              woonruimte, waardoor elke ouder ver onder het gemiddelde leek te zitten. En mijn woonlast was een
              vast percentage van het inkomen, terwijl één inkomen aantoonbaar een groter deel aan wonen
              betaalt: een huur van 1.285 euro op 3.650 netto is 35 procent en niet 30. Dat is alle drie
              aangepast. De gemiddelde afwijking van mijn vergelijking ging daarmee van 218 naar 54 euro per
              post.
            </p>

            <h3 className="font-body font-semibold text-primary text-base mb-3">
              Wat deze vergelijking wel en niet kan
            </h3>
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

        {/* Slotconversie, één hoofdroute */}
        <section className="bg-card py-14">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="section-eyebrow mb-4">Herken je jouw situatie?</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Benieuwd wat er bij jou werkelijk opvalt?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-7">
              Deze vijf huishoudens hadden allemaal een andere verklaring. Eerst vergelijk ik jouw situatie
              gratis. Daarna bepaal je zelf of je wilt weten waarom.
            </p>
            <CtaLink doel="analyse" href="/analyse" locatie="rapporten-slot" className="btn-primary">
              Start met de gratis analyse &rarr;
            </CtaLink>
            <p className="font-body font-light text-text-muted text-sm mt-4">
              Gratis · vertrouwelijk · geen verkoopgesprek
            </p>
            <p className="font-body font-light text-text-muted text-sm mt-5">
              <CtaLink doel="geldscan" href="/geldscan" locatie="rapporten-slot" className="hover:underline">
                Wil je dat ik daarna zelf naar je hele situatie kijk? Dan kies je voor een persoonlijke Geldscan
                van €49 &rarr;
              </CtaLink>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
