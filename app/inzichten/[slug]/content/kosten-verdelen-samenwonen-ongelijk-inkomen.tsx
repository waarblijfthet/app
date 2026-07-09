import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KostenVerdelenSamenwonenOngelijkInkomen() {
  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Jullie verdienen niet evenveel, maar betalen alles half om half. De een houdt ruim over,
          de ander komt elke maand net niet rond. En niemand zegt er iets van.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "De drie manieren om samen de kosten te verdelen, en voor wie elke manier past",
            "Hoe je met de verhouding van jullie inkomens een eerlijke bijdrage uitrekent",
            "Waarom een eerlijke verdeling vooral rust in de relatie brengt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Als je samenwoont en allebei ongeveer evenveel verdient, is alles half om half betalen
        prima. Maar zodra de inkomens uit elkaar lopen, gaat 50/50 wringen. De ene partner houdt
        aan het einde van de maand geld over, de andere staat rood, en allebei voelen ze dat er iets
        niet klopt zonder precies te weten wat. Er zijn drie manieren om het te verdelen, en de
        beste hangt af van jullie situatie.
      </p>

      <h2 className="font-display" style={h2}>
        Manier 1: ieder de helft
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij deze manier betaalt iedereen exact de helft van de gezamenlijke kosten. Simpel en
        overzichtelijk, en eerlijk zolang jullie ongeveer evenveel verdienen. Verschillen de
        inkomens flink, dan legt de minstverdienende partner verhoudingsgewijs een veel groter deel
        van zijn inkomen in. Dan voelt gelijk niet meer als eerlijk.
      </p>

      <h2 className="font-display" style={h2}>
        Manier 2: naar rato van inkomen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij naar rato betaalt ieder een deel van de kosten dat past bij zijn aandeel in het
        gezamenlijke inkomen. Wie meer verdient, betaalt meer, maar voor allebei blijft
        verhoudingsgewijs evenveel over. De formule is eenvoudig: je eigen netto-inkomen gedeeld
        door het gezamenlijke netto-inkomen, maal de totale gezamenlijke kosten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een voorbeeld. Stel jij verdient €2.000 netto en je partner €1.500, samen €3.500. De
        gezamenlijke vaste lasten zijn €1.200 per maand. Jouw aandeel is 2.000 gedeeld door 3.500, afgerond 57 procent. Naar rato betaal je €686, je partner de overige €514. Allebei
        houden jullie daarna verhoudingsgewijs evenveel over voor jezelf.
      </p>

      <h2 className="font-display" style={h2}>
        Manier 3: alles samen, met eigen zakgeld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij deze manier gaat al het inkomen op één gezamenlijke rekening en betalen jullie daar
        alles van. Ieder krijgt een vast bedrag aan eigen geld om vrij te besteden. Dit past bij
        stellen die hun financiën helemaal samen voeren en het verschil in inkomen niet als van
        hem of haar zien. Het vraagt wel vertrouwen en goede afspraken over wat gezamenlijk is en
        wat persoonlijk.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Welke vorm je ook kiest, het helpt om een gezamenlijke rekening te combineren met eigen
        rekeningen. De voor- en nadelen daarvan zet ik op een rij in mijn artikel over de{" "}
        <Link
          href="/inzichten/gezamenlijke-rekening-voor-en-nadelen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          gezamenlijke rekening
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Eerlijk verdelen gaat over rust, niet over geld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De reden om hier goed naar te kijken is niet de paar tientjes verschil. Het is de stille
        irritatie die ontstaat als de een wel kan sparen en de ander niet, zonder dat het ooit is
        uitgesproken. Geld is een van de grootste bronnen van spanning tussen partners, en bijna
        altijd gaat het niet over de bedragen maar over het gevoel van oneerlijkheid. Meer hierover
        lees je in mijn stuk over{" "}
        <Link
          href="/inzichten/geld-stress-relatie-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          geldstress in de relatie
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een eerlijke verdeling afspreken haalt dat onderwerp uit de taboesfeer. Je legt het één keer
        goed vast, en daarna hoef je er niet meer over te steggelen. Hoe je het geld daarna handig
        organiseert, lees je in mijn artikel over{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        .
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E7F1EE",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je de verdeling op echte bedragen baseren in plaats van op gevoel? De gratis analyse laat zien wat er bij jullie samen overblijft, zodat je samen een eerlijke afspraak kunt maken.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
