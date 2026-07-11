import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SalarisverhoginBoven76000() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Boven €76.000 houd je van elke €100 salarisverhoging maximaal €50 over, door het toptarief van 49,5%",
            "De afbouw van heffingskortingen maakt het effectieve tarief tussen €43K en €76K soms 55 tot 60% per extra euro",
            "Dat je bijna niks voelt van een opslag is geen gevoel, het klopt gewoon, en hier is waarom",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je hebt hard gewerkt, een mooie salarisverhoging gekregen, en dan valt
        je nettoloon amper op. Je verwachtte een verschil te voelen, maar het is
        nauwelijks merkbaar. Wat is er aan de hand?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het antwoord zit in de manier waarop het Nederlandse belastingstelsel
        werkt. En specifiek in wat er gebeurt als je inkomen boven de grens van
        circa 76.000 euro bruto per jaar komt.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe werken de belastingschijven in 2026?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Nederland werkt met een progressief belastingstelsel. Dat betekent dat
        je niet over je hele inkomen hetzelfde percentage betaalt, maar dat het
        tarief stijgt naarmate je meer verdient.
      </p>
      <p className="font-body text-text-soft" style={p}>
        In 2026 zijn er twee schijven in box 1. Over de eerste 38.441 euro
        betaal je 35,82 procent. Over alles daarboven betaal je 49,50 procent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat toptarief van 49,50 procent geldt dus voor elke euro die je boven
        die grens verdient. Van elke 100 euro salarisverhoging houd je netto
        maximaal 50,50 euro over. En dat is nog zonder de effecten van de
        heffingskortingen.
      </p>

      <h2 className="font-display" style={h2}>
        De verborgen belasting: afbouw van heffingskortingen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier wordt het verhaal pas echt ongunstig.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nederland kent een aantal heffingskortingen die je belastingbedrag
        direct verlagen. De twee belangrijkste zijn de algemene heffingskorting
        en de arbeidskorting. Maar beide bouwen af naarmate je meer verdient.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De arbeidskorting bouwt af tussen inkomen van circa 43.000 en 124.000
        euro. In dat traject verlies je bovenop de belasting ook nog eens
        korting, wat je effectieve marginale tarief flink verhoogt. Het
        gecombineerde marginale tarief, belasting plus afbouw arbeidskorting,
        kan in het traject tussen 43.000 en 76.000 euro oplopen tot 55 tot 60
        procent van elke extra verdiende euro.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De algemene heffingskorting bouwt volledig af boven circa 73.000 euro.
        Boven dat inkomen heb je er geen recht meer op.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Al ruim voordat je de formele grens van de tweede schijf
        bereikt, betaal je effectief meer dan 50 procent over elke extra euro.
      </p>

      <h2 className="font-display" style={h2}>
        Een concreet rekenvoorbeeld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Stel je verdient 70.000 euro bruto per jaar en krijgt een verhoging naar
        80.000 euro. Een verschil van 10.000 euro bruto.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Over die 10.000 euro extra betaal je 49,50 procent belasting: dat is
        4.950 euro. Je houdt 5.050 euro bruto-netto verschil over. Maar in dit
        traject bouwt ook je arbeidskorting nog af. Reken je dat mee, dan daalt
        het netto voordeel verder, naar pakweg 4.000 tot 4.500 euro per jaar.
        Per maand is dat 333 tot 375 euro extra netto.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een loonsverhoging van 10.000 euro bruto levert je dus minder dan 400
        euro netto per maand op. Dat is minder dan veel mensen verwachten.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent dit voor jouw financiële planning?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is geen reden om een salarisverhoging te weigeren, meer bruto is
        altijd meer netto, hoe klein ook. Maar het is wel een reden om je
        verwachtingen bij te stellen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als je rekent op een grote sprong in je besteedbaar inkomen na een
        flinke loonsverhoging, dan kan dat tegenvallen. Het gevoel "ik verdien
        nu meer maar het voelt niet zo" is voor veel mensen in dit inkomenstraject
        heel herkenbaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat je er wél uit kunt halen: de arbeidskorting en andere regelingen
        zijn soms te optimaliseren. Pensioenopbouw, lijfrentepremies en andere
        aftrekposten verminderen je belastbaar inkomen. Een gesprek met een
        belastingadviseur kan voor dit inkomensniveau zinvol zijn.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar los van optimalisatie: het probleem dat je met een goed inkomen
        toch weinig voelt overhouden, zit vaak niet alleen in de belasting. Het
        zit in de{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          uitgavenkant
        </Link>
        . Die is makkelijker te beïnvloeden dan het belastingstelsel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Doe de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          analyse
        </Link>{" "}
        en ontdek waar jouw geld werkelijk naartoe gaat, los van wat de
        belasting inhoudt.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/netto-loonsverhoging-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat je netto overhoudt van een loonsverhoging</Link> en <Link href="/inzichten/bonus-13e-maand-netto-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoeveel je overhoudt van je bonus of dertiende maand</Link>.</p>
    </>
  );
}
