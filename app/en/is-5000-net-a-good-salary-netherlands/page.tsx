import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import HouseholdCalculatorEn from "@/components/artikel/HouseholdCalculatorEn";
import { geldscanHref } from "@/lib/cta";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import { RAPPORTEN, AANTAL_ZONDER_LEK, rapportVoorSlug } from "@/lib/rapporten-data";
import { berekenVuistregel, euro, omslagpunt } from "@/lib/salaris-vuistregel";
import { BRUTO_VOOR_NETTO } from "@/lib/bruto-netto-referentie";

/**
 * N5 uit docs/plan-nieuwe-invalshoeken-06-sep-2026.md. De enige Engelstalige
 * pagina op de site, en een test.
 *
 * Zoekterm en onderbouwing: docs/serp-invalshoeken-06-sep-2026.md. Primaire
 * term "is 5000 net a good salary netherlands", secundair "4000 net salary
 * amsterdam enough". De term "why can't I save money in the netherlands" is
 * geschrapt: die SERP is bespaartips, en CLAUDE.md sectie 4 sluit bespaartips
 * uit.
 *
 * De hoek: vijf van de negen resultaten zijn Reddit of Quora, de vier
 * redactionele geven een bruto-nettovertaling en stoppen daar. Geen enkele
 * geeft een huishoudtabel. Op "4000 net salary amsterdam enough" staat op plek
 * 1 een Reddit-draad van drie maanden oud met de titel "I make 4k net a month
 * in Amsterdam, but I still feel...": dat is woordelijk de these van deze site,
 * in het Engels, en er is geen pagina die hem beantwoordt.
 *
 * MEETPUNT (plan sectie N5): meer dan 100 vertoningen per week binnen 60 dagen,
 * dus voor 5 november 2026. Zo niet, dan blijft het bij deze ene Engelse
 * pagina en komt er geen tweede. GSC-nulmeting op 6 september: 1 vertoning in
 * 90 dagen op alles met "salary" erin.
 *
 * WAT ER NIET IS: de analyse zelf blijft Nederlands. Een Engelse labelset voor
 * app/analyse/stappen (zes stapcomponenten plus de resultaatteksten en de
 * mailketen) past niet in een sessie waarin ook vier andere pagina's gebouwd
 * worden, en half vertalen is erger dan niet vertalen. Dat staat als
 * beslispunt in docs/bouwvolgorde.md.
 *
 * TAAL: de root layout zet <html lang="nl"> en dat kan een geneste route in de
 * App Router niet overschrijven. Vandaar lang="en" op de artikelwrapper
 * hieronder, plus hreflang over en weer in de metadata.
 */

const NL_URL = "https://www.waarblijfthet.nl/inzichten/is-5000-euro-netto-goed-salaris";
const EN_URL = "https://www.waarblijfthet.nl/en/is-5000-net-a-good-salary-netherlands";

const TITEL = "Is €5,000 net a good salary in the Netherlands?";
const OMSCHRIJVING =
  "Yes, well above average: you need roughly €101,300 gross for €5,000 net. But the question is what is left. The household table for a single, a couple and a couple with two children.";

export const metadata: Metadata = {
  title: "Is €5,000 net a good salary in the Netherlands? (2026)",
  description: OMSCHRIJVING,
  alternates: {
    canonical: EN_URL,
    languages: {
      "en-NL": EN_URL,
      "nl-NL": NL_URL,
      "x-default": NL_URL,
    },
  },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    url: EN_URL,
    type: "article",
    locale: "en_NL",
    publishedTime: "2026-09-06",
    modifiedTime: "2026-09-06",
  },
  robots: { index: true, follow: true },
};

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

const NET = 5000;
const BRUTO = BRUTO_VOOR_NETTO[NET];

interface Huishouden {
  label: string;
  volwassenen: 1 | 2;
  kinderen: number;
}

const HUISHOUDENS: Huishouden[] = [
  { label: "Single", volwassenen: 1, kinderen: 0 },
  { label: "Couple, no children", volwassenen: 2, kinderen: 0 },
  { label: "Couple, two children", volwassenen: 2, kinderen: 2 },
];

function bereken(h: Huishouden) {
  return berekenVuistregel({
    inkomen: NET,
    volwassenen: h.volwassenen,
    kinderen: h.kinderen,
    auto: "eigen",
  });
}

export default function Is5000NetAGoodSalaryNetherlands() {
  const kolommen = HUISHOUDENS.map((h) => ({ h: h, v: bereken(h) }));
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const omslagGezin = omslagpunt(2, 2, "eigen");

  const faq = [
    {
      vraag: "Is €4,000 net a good salary in the Netherlands?",
      antwoord:
        "Yes. Modal gross income in the Netherlands is around €48,000 a year in 2026 (CPB), so €4,000 net per month is comfortably above that. Whether it feels good depends entirely on the household: for a single person on €4,000 net there is real room, for a couple with two children and a car the same amount leaves very little. The calculator on this page shows both.",
    },
    {
      vraag: "What gross salary do you need for €5,000 net per month?",
      antwoord:
        "Roughly €101,300 gross a year, based on the 2026 tax brackets and credits, for an employee with no pension contribution and no deductions, with holiday allowance paid out separately in May. That is my own calculation from the published rates, not an official table, so treat it as an order of magnitude. The jump is steep because above €78,426 you pay 49.5% and the labour credit is still being phased out.",
    },
    {
      vraag: "How much rent can I afford on €5,000 net?",
      antwoord:
        "As a rule of thumb I use about a quarter of net income on housing for a couple and about a third for a single person, including energy, internet and local taxes. On €5,000 net that is roughly €1,250 for a couple and €1,650 for a single person, all in. That is not a rule anyone enforces, it is what the five households I worked through actually paid, so it is a small sample and a direction rather than a limit.",
    },
    {
      vraag: "Is €5,000 net enough for a family in the Netherlands?",
      antwoord:
        "It works, but with less margin than the number suggests. For a couple with two children at home and one car this rule of thumb only balances from around " +
        euro(omslagGezin) +
        " net per month, and at €5,000 there is a few hundred euro left at the end of the month before anything annual is set aside. Holidays, December and home maintenance are the items that then quietly eat the rest.",
    },
    {
      vraag: "Why can't I save on a good Dutch salary?",
      antwoord:
        "Usually not because of one large item. Of the five households I worked through in detail, " +
        AANTAL_ZONDER_LEK +
        " had nothing to fix at all: their spending simply did not match the savings target they had set at the same time. The other three had annual costs that were never set aside monthly. Neither of those shows up in a monthly overview, which is why people who earn well keep looking at groceries and keep finding nothing.",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITEL,
    description: OMSCHRIJVING,
    datePublished: "2026-09-06",
    dateModified: "2026-09-06",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Jarno Koopman",
      url: "https://www.waarblijfthet.nl/over",
    },
    publisher: {
      "@type": "Organization",
      name: "Waar blijft het",
      url: "https://www.waarblijfthet.nl",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": EN_URL },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.waarblijfthet.nl/" },
      { "@type": "ListItem", position: 2, name: TITEL, item: EN_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main className="px-6 py-12" style={{ backgroundColor: "#FDFAF4" }}>
        <article lang="en" className="mx-auto" style={{ maxWidth: "720px" }}>
          <p className="font-body text-sm mb-3" style={{ color: "#8B958F" }}>
            In het Nederlands:{" "}
            <Link href="/inzichten/is-5000-euro-netto-goed-salaris" style={link} className="hover:underline" hrefLang="nl">
              is €5.000 netto een goed salaris?
            </Link>
          </p>

          <h1 className="font-display mb-4" style={{ fontSize: "2.4rem", fontWeight: 300, color: "#16211F", lineHeight: 1.15 }}>
            {TITEL}
          </h1>

          <p className="font-body mb-2" style={{ fontWeight: 400, color: "#16211F" }}>
            Yes, by national standards it is a high salary: you need roughly {euro(BRUTO)} gross a
            year to end up with {euro(NET)} net a month, while modal gross income in the Netherlands
            is around {euro(48000)} in 2026. But that is not really what you are asking. What you
            want to know is what is left, and on {euro(NET)} net that ranges from about{" "}
            {euro(kolommen[0].v.verwachtOver)} for a single person to about{" "}
            {euro(kolommen[2].v.verwachtOver)} for a couple with two children.
          </p>

          <p className="font-body text-sm mb-6" style={{ color: "#4A5A56" }}>
            Figures updated on 6 September 2026. The household amounts come from the{" "}
            {RAPPORTEN.length} Dutch households I worked through myself, published in full on{" "}
            <Link href="/rapporten" style={link} className="hover:underline">
              /rapporten
            </Link>
            , not from a national sample. Small n, so read it as a direction. The analysis and this
            site are in Dutch; the written report is available in English.
          </p>

          <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
            <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
              What this page answers:
            </p>
            <ul className="space-y-1.5">
              {[
                "What gross salary €5,000 net corresponds to, and how that compares to modal",
                "What is left per household type, item by item",
                "Why the same amount feels tight in Amsterdam and roomy in Tilburg",
                "Where high earners in the Netherlands actually lose money",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
                  <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="font-display" style={h2}>
            What is left on €5,000 net, per household type?
          </h2>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            Same net income, three households, one car in each. Only the items the underlying model
            actually carries; there is no invented Amsterdam rent in here, because I have no sourced
            figure for that.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
                  <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                    Item
                  </th>
                  {kolommen.map((k) => (
                    <th
                      key={k.h.label}
                      className="text-right py-2 px-3"
                      style={{ color: "#16211F", fontWeight: 600 }}
                    >
                      {k.h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Housing, energy, local taxes", (x: ReturnType<typeof bereken>) => x.wonen],
                    ["Groceries", (x: ReturnType<typeof bereken>) => x.boodschappen],
                    ["Transport, one car", (x: ReturnType<typeof bereken>) => x.vervoer],
                    ["Insurance", (x: ReturnType<typeof bereken>) => x.verzekeringen],
                    ["Subscriptions", (x: ReturnType<typeof bereken>) => x.abonnementen],
                    ["Childcare, school, sports", (x: ReturnType<typeof bereken>) => x.kinderkosten],
                    ["Leisure", (x: ReturnType<typeof bereken>) => x.vrijetijd],
                  ] as [string, (x: ReturnType<typeof bereken>) => number][]
                ).map(([label, waarde]) => (
                  <tr key={label} style={{ borderBottom: "1px solid #E6E9E7" }}>
                    <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                      {label}
                    </td>
                    {kolommen.map((k) => (
                      <td
                        key={k.h.label}
                        className="text-right py-2 px-3 tabular-nums"
                        style={{ color: "#4A5A56", whiteSpace: "nowrap" }}
                      >
                        {waarde(k.v) === 0 ? "–" : euro(waarde(k.v))}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                    Left at the end of the month
                  </td>
                  {kolommen.map((k) => (
                    <td
                      key={k.h.label}
                      className="text-right py-2 px-3 tabular-nums"
                      style={{
                        color: k.v.verwachtOver < 0 ? "#B03A2E" : "#16211F",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {k.v.verwachtOver < 0
                        ? "-" + euro(Math.abs(k.v.verwachtOver))
                        : euro(k.v.verwachtOver)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
            What is compared here: item and household composition. What is not: age, region, type of
            housing, or whether you rent or own. Annual costs such as holidays, December and home
            maintenance are not in this table at all, and at these households they ran to several
            hundred euro a month once spread out.
          </p>

          <HouseholdCalculatorEn startNet={NET} />

          <h2 className="font-display" style={h2}>
            Why €5,000 net feels tight in Amsterdam but not in Tilburg
          </h2>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            Because housing is the only item in the table that moves with where you live, and it is
            the largest one. Everything else, groceries, insurance, subscriptions, the car, costs
            roughly the same anywhere in the country. So the whole regional difference lands on a
            single line, and it lands there permanently, because the decision was made when you
            signed.
          </p>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            I am not going to give you an Amsterdam rent figure, because I do not have a sourced one
            and a made-up number is worse than none. What I can tell you is the direction of travel:
            rents in the Netherlands were 4.4 percent higher in July 2026 than a year earlier, and
            of the four large cities Amsterdam actually rose the least, at 4.3 percent, against 4.7
            percent in Rotterdam (CBS, 4 September 2026). The gap between the cities is therefore
            not widening quickly; it is the level that differs, not the trend.
          </p>

          <h2 className="font-display" style={h2}>
            What the 30% ruling changes, and when it ends
          </h2>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            If your employer applies the expat scheme, which the Dutch tax authority now calls the
            expatregeling and most people still call the 30% ruling, part of your salary is paid as
            a tax-free allowance for extraterritorial costs. It requires a formal decision
            (beschikking) from the Belastingdienst and there are conditions on employment, specific
            expertise and your background before arrival.
          </p>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            Two things matter for this page and I will not go further than that, because I am not a
            tax adviser and I have no licence to advise. First: the percentage and the duration have
            been changed by legislation more than once in recent years, so check your own beschikking
            and the current rules rather than an article. Second, and this is the part people get
            caught by: your net income drops on the day it ends, while nothing about your household
            changes. Everything in the table above stays exactly the same. If your plan only works
            with the ruling, it is worth running the numbers now for the month after it stops.
          </p>

          <h2 className="font-display" style={h2}>
            Where high earners in the Netherlands actually lose money
          </h2>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            Not where they think. Every household I have worked through pointed at groceries first,
            and at none of them was that the answer. The pattern in the {RAPPORTEN.length} reports
            is annual costs that never got a monthly reservation: holidays, December, home
            maintenance, the school year. Those do not appear in any monthly overview, so people
            look at their month, see nothing wrong, and conclude that money simply disappears.
          </p>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            One example, a couple in their late thirties with no children and no car, on{" "}
            {euro(6990)} net together. They were certain there was a leak. There was not: their
            annual costs ran to roughly {euro(10200)} a year and their spending simply did not match
            the €40,000 they wanted to save in three years. In {AANTAL_ZONDER_LEK} of the{" "}
            {RAPPORTEN.length} reports the conclusion was that there was nothing to fix, and both are
            published in full along with the ones where there was. Their report is on{" "}
            <Link href={`/rapporten/${stel.slug}`} style={link} className="hover:underline">
              /rapporten
            </Link>
            , in Dutch, with all the amounts.
          </p>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            The family with three children on {euro(7880)} net had the same shape: no single
            excessive fixed cost, and close to {euro(1000)} a month of predictable annual expenses
            that nobody had set aside for. Their report is{" "}
            <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
              here
            </Link>
            .
          </p>

          <h2 className="font-display" style={h2}>
            How Dutch households compare
          </h2>
          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            Modal gross income is around {euro(48000)} a year in 2026 and is projected at{" "}
            {euro(50000)} for 2027 (CPB, concept Macro Economic Outlook 2027). Median purchasing
            power is projected at plus 0.6 percent in 2026 and minus 0.3 percent in 2027, against
            inflation of around 3 percent. In practice that means an income like yours stands still
            in real terms while housing and energy keep moving, and that is a slower squeeze than
            the salary number suggests.
          </p>

          <h2 className="font-display" style={h2}>
            Questions people ask
          </h2>
          <div className="mb-8">
            {faq.map((item) => (
              <div key={item.vraag} className="mb-5">
                <p className="font-body font-semibold mb-1" style={{ color: "#16211F" }}>
                  {item.vraag}
                </p>
                <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
                  {item.antwoord}
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-display" style={h2}>
            Sources
          </h2>
          <ul className="mb-8 space-y-2">
            {[
              {
                label:
                  "CBS: residential rents rose 4.4 percent in July 2026, Amsterdam 4.3 percent, Rotterdam 4.7 percent (retrieved 6 September 2026)",
                url: "https://www.cbs.nl/nl-nl/nieuws/2026/36/woninghuur-stijgt-gemiddeld-met-4-4-procent",
              },
              {
                label:
                  "CPB: concept Macro Economic Outlook 2027, modal gross income and purchasing power (retrieved 6 September 2026)",
                url: "https://www.cpb.nl/raming/concept-macro-economische-verkenning-cmev-2027",
              },
              {
                label:
                  "Belastingdienst: conditions for the expat scheme, the 30% ruling (retrieved 6 September 2026)",
                url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/internationaal/personeel/u_bent_niet_in_nederland_gevestigd_loonheffingen_inhouden/als_u_loonheffingen_gaat_inhouden/extraterritoriale_kosten_en_de_30procentregeling/voorwaarden_voor_de_30procentregeling1/voorwaarden_voor_de_30procentregeling",
              },
              {
                label:
                  "The five Dutch households behind every amount on this page, published in full with their own figures",
                url: "https://www.waarblijfthet.nl/rapporten",
              },
            ].map((bron) => (
              <li key={bron.url} className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
                <a href={bron.url} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
                  {bron.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-body" style={{ ...p, color: "#4A5A56" }}>
            If the comparison shows you are off on several items and you cannot tell which one is
            the cause and which is the consequence, that is the point where a table stops helping.
            That is what I do in the{" "}
            <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
              Geldscan, {PAKKET_INFO.geldscan.prijs}
            </CtaLink>
            : I read your figures myself and write the report by hand within two working days, in
            English if you prefer. If there is nothing to fix, that is what it says.
          </p>

          <p className="font-body text-sm" style={{ color: "#8B958F" }}>
            Dutch version of this page:{" "}
            <Link href="/inzichten/is-5000-euro-netto-goed-salaris" style={link} className="hover:underline" hrefLang="nl">
              is €5.000 netto een goed salaris?
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
