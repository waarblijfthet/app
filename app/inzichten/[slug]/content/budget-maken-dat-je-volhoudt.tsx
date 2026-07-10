import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function BudgetMakenDatJeVolhoudt() {
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
          Je hebt al een paar keer een budget gemaakt. De eerste week ging het goed, en daarna
          zakte het weg. Niet omdat je niet wilde, maar omdat het te veel werk werd.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "De drie redenen waarom de meeste budgetten sneuvelen",
            "Hoe je een budget maakt dat je niet dagelijks hoeft bij te houden",
            "Waarom een budget dat je volhoudt belangrijker is dan een perfect budget",
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

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        De meeste budgetten mislukken niet omdat je discipline mist, maar omdat ze dagelijks
        bijhouden vereisen en te strak zijn. Een budget dat je wél volhoudt, werkt andersom: je verdeelt je geld vooraf over een paar rekeningen en laat de rest los, zodat je niet elke uitgave hoeft te registreren. Ik heb zelf budgetten gemaakt die ik na twee weken liet vallen, tot ik het zo aanpakte.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom je budget steeds sneuvelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn drie redenen die bijna altijd terugkomen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ten eerste: het vereist bijhouden. Een budget waarbij je elke bon en pinbetaling moet
        invoeren, kost te veel energie. Na twee drukke weken laat je het vallen, en dan voelt het
        als falen, terwijl het gewoon te veel werk was.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ten tweede: het is te strak. Een budget zonder ruimte voor iets leuks of voor een
        tegenvaller is een keurslijf. De eerste keer dat je ervan afwijkt, voelt het mislukt, en
        dan stop je. Een budget moet juist een potje voor onverwachte en voor leuke dingen hebben.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ten derde: het klopt niet met de werkelijkheid. Veel mensen begroten te laag op
        boodschappen en vergeten de jaarlijkse posten, zoals verzekeringen en de gemeentelijke
        aanslag. Dan loopt het budget binnen een maand vast op kosten die je had kunnen zien
        aankomen. Begin daarom met een eerlijk{" "}
        <Link
          href="/inzichten/vaste-lasten-overzicht-maken"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          overzicht van je vaste lasten
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Een budget dat je niet hoeft bij te houden
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het geheim is dat je het werk vooraf doet, één keer, in plaats van elke dag. Je verdeelt je
        inkomen op de dag dat het binnenkomt over een paar rekeningen: vaste lasten, dagelijks geld,
        sparen, en een potje voor onregelmatige uitgaven. Daarna hoef je niets meer te turven. Het
        bedrag op je dagelijkse rekening ís je budget. Is het op, dan weet je dat zonder een app te
        openen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hoe je die verdeling opzet, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        . Een handige startverhouding is de{" "}
        <Link
          href="/inzichten/50-30-20-regel-hoger-inkomen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          50/30/20-regel
        </Link>
        : ongeveer de helft naar vaste lasten, dertig procent vrij besteedbaar en twintig procent
        sparen. Klopt die verhouding niet met jouw vaste lasten, pas hem dan gewoon aan, want een
        budget moet bij jouw situatie passen, niet andersom.
      </p>

      <h2 className="font-display" style={h2}>
        Begin met de grootste posten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een budget dat werkt, stuurt op de grote lijn, niet op de cappuccino. Je grootste winst zit
        in je vaste lasten, want daar sleutel je één keer aan met blijvend effect. Loop ze door op
        dubbele verzekeringen en op{" "}
        <Link
          href="/inzichten/vergeten-abonnementen-opzeggen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vergeten abonnementen
        </Link>
        , dat levert vaak meer op dan maandenlang op de kleine dingen letten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een budget dat je een jaar volhoudt en dat tachtig procent klopt, is oneindig veel meer
        waard dan een perfect budget dat na twee weken in de la verdwijnt.
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
          Een budget begint met weten waar je geld nu heen gaat. De gratis analyse laat dat in een paar minuten zien en geeft je een realistische verdeling, die je daarna alleen nog hoeft in te stellen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
