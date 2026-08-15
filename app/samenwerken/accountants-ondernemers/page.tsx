import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rapportVoorSlug } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Samenwerken · voor accountants van ZZP'ers en MKB | Waar blijft het",
  description:
    "Financiële begeleiding ondernemer: jij kent de onderneming, ik breng het huishouden erachter in kaart. Accountant doorverwijzen klant zonder fiscaal of juridisch advies te geven.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/accountants-ondernemers" },
  openGraph: {
    title: "Voor accountants: je kent het bedrijf, maar wie kijkt naar het huishouden?",
    description:
      "Een gezonde onderneming betekent niet automatisch een ruim huishouden. Financiële analyse ondernemer, voor ZZP en MKB, als aanvulling op wat jij al doet.",
    url: "https://www.waarblijfthet.nl/samenwerken/accountants-ondernemers",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Echt geldrapport als bewijs (werkregel 4). Deze zzp'er met een sterk
// wisselend inkomen dacht dat hij structureel te veel spaarde te weinig; de
// analyse liet zien dat het geen privélek was maar een cashflowvraagstuk. Dat
// is precies het onderscheid tussen het werk van een accountant (de zakelijke
// cijfers kloppen) en het werk hier (wat betekent dat voor het huishouden).
const BEWIJS_SLUG = "zzp-wisselend-inkomen";

const situaties = [
  "“Mijn klant verdient €100.000, maar vraagt zich af waarom hij nauwelijks vermogen opbouwt.”",
  "“Een zzp'er heeft een goed jaar gehad, maar heeft geen idee hoeveel hij structureel privé kan uitgeven.”",
  "“Een ondernemer wil minder gaan werken, maar weet niet hoeveel financiële ruimte hij daadwerkelijk heeft.”",
  "“Een klant wil meer geld uit zijn onderneming halen, maar het probleem lijkt niet aan de zakelijke kant te zitten.”",
];

const zakelijk = ["Omzet", "Winst", "Belasting", "Cashflow van de onderneming", "Salaris of privé-opname"];
const prive = ["Woonlasten", "Gezin", "Auto's", "Vakanties", "Boodschappen", "Verzekeringen", "Sparen", "Vermogen", "Vrij besteedbaar geld"];

const jouwRol = [
  "De onderneming",
  "De administratie",
  "De fiscaliteit",
  "Zakelijke beslissingen",
  "De ondernemingsstructuur",
  "Financiële bedrijfsinformatie",
];
const onzeRol = [
  "Het volledige huishouden",
  "Het uitgavenpatroon",
  "De financiële ruimte",
  "Vergelijking met vergelijkbare huishoudens",
  "Verklaring van afwijkingen",
  "Persoonlijke prioriteiten",
];

const triggers = [
  "Hogere winst",
  "Salaris verhogen",
  "Dividend",
  "Minder gaan werken",
  "Grote privé-uitgaven",
  "Aankoop woning",
  "Gezinsuitbreiding",
  "Financiële stress",
  "Vermogensopbouw",
  "Verkoop van het bedrijf",
  "Overgang van ZZP naar bv",
];

const faq = [
  {
    vraag: "Geef je fiscaal of juridisch advies over deze momenten?",
    antwoord:
      "Nee. Ik herken alleen het moment waarop huishoudelijk financieel inzicht relevant wordt, bijvoorbeeld bij een salarisverhoging of de overgang van zzp naar bv. Voor de fiscale of juridische kant van die beslissing blijf jij, of de fiscalist die je zelf inschakelt, leidend.",
  },
  {
    vraag: "Is dit een concurrent van mijn rol als vertrouwenspersoon van de ondernemer?",
    antwoord:
      "Nee. Jij bent voor veel ondernemers al het financiële eerste aanspreekpunt, en dat verandert niet. Ik voeg alleen een specialist toe voor het huishoudelijke stuk: wat betekenen de zakelijke cijfers voor het financiële leven van deze persoon. Waar overlap ontstaat, bijvoorbeeld bij een privé-opname, stem ik desgewenst met jou af.",
  },
  {
    vraag: "Hoe verwijs ik een ondernemer door?",
    antwoord:
      "Je hoeft niets te verkopen. Je noemt Waar blijft het op het moment dat een vraag verschuift van de onderneming naar het huishouden erachter. De ondernemer start zelf, vrijblijvend, met de gratis analyse.",
  },
  {
    vraag: "Wat gebeurt er met de zakelijke cijfers of afschriften?",
    antwoord:
      "Die vraag ik niet op. De analyse werkt met wat een ondernemer zelf over zijn privésituatie aanlevert: netto beschikbaar inkomen, vaste lasten, gezinssituatie. Zakelijke rekeningen of de boekhouding komen er niet aan te pas, en dat hoeft ook niet.",
  },
  {
    vraag: "Betaal ik iets voor een doorverwijzing, of ontvang ik iets?",
    antwoord:
      "Geen van beide. Er is geen commissie in of uit. Dat versterkt juist de onafhankelijkheid van de analyse, en dat is precies waarom een ondernemer de uitkomst kan vertrouwen.",
  },
  {
    vraag: "Past dit ook bij een zzp'er met een sterk wisselend inkomen?",
    antwoord:
      "Juist bij een wisselend inkomen is het onderscheid tussen zakelijk en privé lastig te maken. De analyse en de Geldscan kijken naar wat er gemiddeld en structureel privé beschikbaar is, los van hoe grillig een individuele maand is.",
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

export default function AccountantsOndernemersPage() {
  const bewijs = rapportVoorSlug(BEWIJS_SLUG);

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
            <p className="section-eyebrow mb-4">Voor accountants, AA's &amp; boekhouders van ondernemers</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Je kent het bedrijf van je klant.<br />
              Maar wie kijkt naar zijn huishouden?
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl mb-8">
              Waar blijft het helpt ondernemers begrijpen wat er privé werkelijk
              overblijft van het geld dat ze met hun bedrijf verdienen. Geen fiscaal of
              juridisch advies, geen bemoeienis met de onderneming: alleen het
              huishouden dat aan de andere kant van de cijfers staat.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20accountant"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E" }}
            >
              Ontdek hoe het werkt
            </a>
          </div>
        </section>

        {/* Het centrale probleem */}
        <section className="bg-background pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Een gezonde onderneming betekent niet automatisch een ruim huishouden
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
              Jij ziet de zakelijke kant helder: omzet, winst, belasting, cashflow, en
              hoeveel er als salaris of privé-opname naar buiten gaat. Wat daarna in het
              huishouden gebeurt, ligt op een ander vlak.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-6" style={{ borderColor: "#E6E9E7", backgroundColor: "#F7F8F7" }}>
                <p className="font-body font-medium text-primary text-sm mb-3 uppercase tracking-wide">Zakelijk, jouw terrein</p>
                <ul className="space-y-1.5 font-body font-light text-text-soft text-sm">
                  {zakelijk.map((z) => (
                    <li key={z}>{z}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border p-6" style={{ borderColor: "#A6D8CD", backgroundColor: "#EFF7F5" }}>
                <p className="font-body font-medium text-primary text-sm mb-3 uppercase tracking-wide">Privé, mijn terrein</p>
                <ul className="space-y-1.5 font-body font-light text-text-soft text-sm">
                  {prive.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Herkenbare situaties */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Herken je dit bij jouw ondernemers?
            </h2>
            <div className="card-base border border-[#E6E9E7]">
              <ul className="space-y-3 font-body font-light text-text-soft text-sm leading-relaxed">
                {situaties.map((s) => (
                  <li key={s} className="flex gap-3 items-start">
                    <span style={{ color: "#0B7A6E", flexShrink: 0 }}>&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Positionering: aanvulling op de trusted-advisorrol, geen inperking */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Je bent al meer dan de boekhouding
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-4">
              Voor veel ondernemers ben jij, als accountant of administratiekantoor,
              allang het financiële eerste aanspreekpunt. Niet alleen voor de aangifte,
              maar voor de vraag of een keuze wel verstandig is. Dat verandert hier niet.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed">
              Waar blijft het voegt daar een specialist aan toe voor het stuk dat
              buiten de onderneming valt: het huishoudelijke deel. Niet in plaats van
              jou, en niet als correctie op wat je al doet. Aanvullend, voor een vraag
              die bij jou vaak wel binnenkomt maar niet bij je kernopdracht hoort.
            </p>
          </div>
        </section>

        {/* Geen concurrent */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Waar houdt jouw rol op, en begint die van Waar blijft het?
            </h2>
            <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-6">
              Er kan overlap bestaan, bijvoorbeeld rond een privé-opname. De rollen zijn
              dan complementair, niet concurrerend.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body font-semibold text-primary text-sm mb-3">Jij</p>
                <ul className="space-y-2 font-body font-light text-text-soft text-sm">
                  {jouwRol.map((r) => (
                    <li key={r} className="flex gap-2 items-start">
                      <span style={{ color: "#8B958F", flexShrink: 0 }}>&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-base border border-[#A6D8CD] bg-green-light">
                <p className="font-body font-semibold text-primary text-sm mb-3">Waar blijft het</p>
                <ul className="space-y-2 font-body font-light text-text-soft text-sm">
                  {onzeRol.map((r) => (
                    <li key={r} className="flex gap-2 items-start">
                      <span style={{ color: "#0B7A6E", flexShrink: 0 }}>&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ondernemerscase: een echt rapport, geen verzonnen besparingsverhaal */}
        {bewijs && (
          <section className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-8">
                <p className="section-eyebrow mb-3">Een echt voorbeeld, geen verzonnen besparingsverhaal</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-tight mb-3">
                  Hij verdiende genoeg. Het probleem was wanneer het binnenkwam.
                </h2>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Deze ondernemer had een zzp-inkomen dat per maand sterk verschilt, met
                  een partner in loondienst. Namen zijn weggelaten, de bedragen staan er
                  precies zoals aangeleverd.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>01</span>
                    <p className="font-body font-semibold text-primary text-sm">De situatie</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#4A5A56" }}>
                    {bewijs.profiel}
                  </p>
                  <blockquote className="font-body text-xs leading-relaxed" style={{ color: "#16211F", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem", marginLeft: 0 }}>
                    &ldquo;{bewijs.vermoeden}&rdquo;
                  </blockquote>
                  <p className="font-body text-xs mt-2" style={{ color: "#8B958F" }}>{bewijs.vermoedenBedrag}</p>
                </div>

                <div style={{ backgroundColor: "#16211F", border: "1px solid #0B7A6E", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#86BCAF", opacity: 0.7 }}>02</span>
                    <p className="font-body font-semibold text-sm" style={{ color: "white" }}>Wat de analyse toont</p>
                  </div>
                  <p className="font-body text-xs font-medium mb-2" style={{ color: "#86BCAF" }}>{bewijs.uitkomstKop}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                    {bewijs.uitkomst}
                  </p>
                </div>

                <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>03</span>
                    <p className="font-body font-semibold text-primary text-sm">Wat de Geldscan toevoegt</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5A56" }}>
                    {bewijs.adviesInleiding}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem" }}>
                <p className="font-body font-medium text-xs uppercase tracking-widest mb-3" style={{ color: "#0B7A6E" }}>
                  Wat de vergelijking niet automatisch deed
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Niet automatisch zoeken naar een lek. Bepalen wat normaal is bij een
                  wisselend inkomen, waar hij afwijkt, welke afwijkingen relevant zijn,
                  welke uitgaven helemaal niet problematisch zijn, en welke structurele
                  ruimte werkelijk bestaat.
                </p>
              </div>

              <div style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <p className="font-body font-medium text-xs uppercase tracking-widest mb-3" style={{ color: "#0B7A6E" }}>
                  Vier maanden later, in zijn eigen woorden
                </p>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "#16211F" }}>
                  &ldquo;{bewijs.evaluatie}&rdquo;
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Voor fiscale keuzes bleef bij deze klant de accountant leidend. Waar
                  blijft het loste alleen de vraag op die daarnaast lag: hoe je een
                  grillig inkomen in het huishouden hanteert.
                </p>
                <Link
                  href={`/rapporten/${bewijs.slug}`}
                  className="inline-block mt-4 font-body text-sm font-medium hover:underline"
                  style={{ color: "#0B7A6E" }}
                >
                  Lees het volledige rapport &rarr;
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Extra waarde voor de accountant */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Een betrouwbare specialist voor het moment dat er wel is, maar niet bij je kernopdracht hoort
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
              Tijdens klantgesprekken ontstaan geregeld vragen die niet fiscaal of
              juridisch zijn, maar wel om huishoudelijk financieel inzicht vragen. Dit
              zijn de momenten waarop dat vaakst gebeurt.
            </p>
            <div className="flex flex-wrap gap-2">
              {triggers.map((t) => (
                <span
                  key={t}
                  className="font-body text-sm px-4 py-2 rounded-full"
                  style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", color: "#16211F" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-6">
              Let op: dit is uitdrukkelijk geen fiscaal of juridisch advies. Het gaat
              uitsluitend om het herkennen van het moment waarop huishoudelijk
              financieel inzicht relevant wordt. De beslissing zelf, en de fiscale of
              juridische kant ervan, blijft bij jou.
            </p>
          </div>
        </section>

        {/* Doorverwijzen */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Je hoeft niets te verkopen
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-4">
              De ondernemer start zelf, met de gratis analyse. Pas daarna, en alleen als
              hij dat zelf wil, kiest hij voor de Geldscan van €49: een persoonlijk
              geldrapport met wat er structureel overblijft en waarom.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed">
              Je ontvangt geen commissie, en dat is bewust. Geen vergoeding voor een
              doorverwijzing versterkt juist de onafhankelijkheid van de uitkomst, en
              dat is precies waarom een ondernemer die uitkomst kan vertrouwen.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl mb-5">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.vraag} className="card-base border border-[#E6E9E7]">
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
              Een klant met een goedlopend bedrijf, maar weinig grip op privé?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Bespreek vrijblijvend of Waar blijft het aanvullend kan helpen. Geen
              verkooppraat, gewoon even kijken of het past.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20accountant" className="btn-primary" style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}>
              Mail Jarno &rarr;
            </a>
            <div className="mt-10 pt-8 border-t border-white/10 max-w-md mx-auto">
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,240,232,0.5)" }}>
                Andere doelgroep?
              </p>
              <p className="font-body text-sm mb-1">
                <Link href="/samenwerken/boekhouders" style={{ color: "#86BCAF", textDecoration: "underline" }}>
                  Werk je met particulieren? &rarr; Boekhouders
                </Link>
              </p>
            </div>
            <p className="mt-6">
              <Link href="/samenwerken" className="font-body text-sm" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                &larr; Terug naar samenwerken overzicht
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
