import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VergetenAftrekpostenBelastingaangifte() {
  const checklist = [
    {
      titel: "Hypotheekrente",
      uitleg:
        "De rente over je hypotheek voor je eigen woning is aftrekbaar. Voor hogere inkomens telt de aftrek nog mee tegen ongeveer 37 procent in plaats van het toptarief.",
    },
    {
      titel: "Giften aan goede doelen (ANBI)",
      uitleg:
        "Periodieke giften die je voor minstens vijf jaar vastlegt zijn volledig aftrekbaar zonder drempel. Gewone giften kennen een drempel en een maximum.",
    },
    {
      titel: "Specifieke zorgkosten",
      uitleg:
        "Niet-vergoede kosten zoals bepaalde medicijnen, hulpmiddelen, diëten op voorschrift en extra reiskosten voor zorg, boven een inkomensafhankelijke drempel.",
    },
    {
      titel: "Lijfrente en jaarruimte",
      uitleg:
        "Heb je een pensioentekort, dan zijn premies voor een lijfrente of banksparen aftrekbaar binnen je jaarruimte. Vooral relevant voor zzp'ers en mensen zonder volledige pensioenopbouw.",
    },
    {
      titel: "Betaalde partneralimentatie",
      uitleg:
        "Alimentatie die je aan je ex-partner betaalt is aftrekbaar. De ontvanger betaalt er belasting over. Kinderalimentatie is niet aftrekbaar.",
    },
    {
      titel: "Reisaftrek openbaar vervoer",
      uitleg:
        "Reis je met het OV naar je werk en vergoedt je werkgever dat niet of nauwelijks, dan kun je een vast bedrag aftrekken, in 2026 tot maximaal €2.649.",
    },
    {
      titel: "Weekenduitgaven voor gehandicapten",
      uitleg:
        "Zorg je in het weekend of de vakantie thuis voor een gehandicapt familielid van 21 jaar of ouder, dan mag je een vast bedrag per dag plus reiskosten aftrekken.",
    },
  ];

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
          Je doet je aangifte zo snel mogelijk en klikt op akkoord, met het knagende gevoel dat je
          ergens geld laat liggen. Vaak klopt dat gevoel.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          In dit artikel:
        </p>
        <ul className="space-y-1.5">
          {[
            "De checklist van aftrekposten die particulieren het vaakst vergeten",
            "Wat er de laatste jaren is afgeschaft, zodat je niet op verouderde tips rekent",
            "Waarom een eenmalige teruggave fijn is, maar structurele grip meer oplevert",
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
        Veel mensen laten geld liggen bij de aangifte, simpelweg omdat ze niet weten welke kosten
        aftrekbaar zijn. Het goede nieuws: je mag tot vijf jaar terug een aangifte corrigeren. Loop
        deze checklist een voor een na voordat je akkoord geeft.
      </p>

      <h2 className="font-display" style={h2}>
        De checklist: aftrekposten die mensen vergeten
      </h2>

      <div className="space-y-3 mb-6">
        {checklist.map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
          >
            <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
              <span style={{ color: "#0B7A6E" }}>✓</span> {item.titel}
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
              {item.uitleg}
            </p>
          </div>
        ))}
      </div>

      <h2 className="font-display" style={h2}>
        Reken niet op deze (afgeschaft of beperkt)
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Let op dat een paar oude tips niet meer kloppen. De aftrek van studiekosten is sinds 2022
        afgeschaft, dus die kun je niet meer opvoeren. En voor hogere inkomens leveren de meeste
        aftrekposten nog maar ongeveer 37 procent op in plaats van het toptarief van 49,5 procent.
        Goed om te weten, zodat je je teruggave niet te hoog inschat.
      </p>

      <h2 className="font-display" style={h2}>
        Een teruggave is fijn, grip is beter
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een teruggave voelt als gevonden geld, maar het is eenmalig. Wat je het hele jaar door merkt,
        is of je structuur klopt: of er na je vaste lasten genoeg overblijft en of dat ook echt naar
        sparen gaat. Reken eerst uit{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat je vrij besteedbaar overhoudt
        </Link>
        , en loop je vaste lasten na op{" "}
        <Link
          href="/inzichten/vergeten-abonnementen-opzeggen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vergeten abonnementen
        </Link>
        . Dat levert vaak elk jaar opnieuw iets op.
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
          Geld terug van de Belastingdienst is mooi meegenomen. Wil je weten waar je het hele jaar
          door op kunt bijsturen? De gratis analyse laat zien waar je geld naartoe gaat.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
