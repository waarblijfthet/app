import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function CashStuffingBeginnen() {
  const enveloppen = [
    { naam: "Boodschappen", voorbeeld: "Wekelijks bedrag, op is op tot de volgende week" },
    { naam: "Huishouden en drogist", voorbeeld: "Schoonmaak, verzorging, kleine spullen" },
    { naam: "Vervoer en tanken", voorbeeld: "Brandstof, ov, parkeren" },
    { naam: "Uit eten en uitgaan", voorbeeld: "Je leuke-dingen-budget, bewust begrensd" },
    { naam: "Kleding", voorbeeld: "Een vast maandbedrag dat mag oppotten" },
    { naam: "Cadeaus en feestdagen", voorbeeld: "Elke maand iets, zodat december niet overvalt" },
    { naam: "Onvoorzien", voorbeeld: "Voor de kleine tegenvallers van de maand" },
  ];

  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FDFAF4", border: "1px solid #E8E0D4" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#1C3A2A" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5E4E", fontWeight: 300 }}>
          Met pinnen en tikken voelt geld uitgeven niet als geld uitgeven. Aan het einde van de
          maand weet je niet waar het heen ging. Contant maakt het weer tastbaar.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat cash stuffing is en waarom het werkt",
            "Een startschema met de enveloppen om mee te beginnen",
            "Hoe je het combineert met je vaste lasten en sparen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Cash stuffing is de envelopjesmethode in een modern jasje: je haalt je budget voor variabele
        uitgaven contant op en verdeelt het over enveloppen per categorie. Is een envelop leeg, dan
        is dat budget op tot de volgende maand. Het werkt omdat je het geld ziet slinken, iets wat
        bij pinnen niet gebeurt.
      </p>

      <h2 className="font-display" style={h2}>
        Voor wie het werkt (en voor wie niet)
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Cash stuffing is sterk voor je variabele, dagelijkse uitgaven: boodschappen, uitgaan,
        kleding. Het maakt die zichtbaar en begrensd. Het is niet bedoeld voor je vaste lasten,
        zoals huur, hypotheek en verzekeringen, die laat je gewoon van je rekening afschrijven. Zie
        het dus als aanvulling op je structuur, niet als vervanging.
      </p>

      <h2 className="font-display" style={h2}>
        Startschema: de enveloppen om mee te beginnen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Begin niet met tien enveloppen, dat houd je niet vol. Start met deze, en pas ze aan op jouw
        leven. Schrijf op elke envelop de categorie en het maandbedrag.
      </p>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table
          className="font-body"
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#1C3A2A", color: "#F5F0E8" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Envelop</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Waarvoor</th>
            </tr>
          </thead>
          <tbody>
            {enveloppen.map((e, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FDFAF4" : "#FFFFFF",
                  borderBottom: "1px solid #EFE8DC",
                  color: "#2D4A35",
                }}
              >
                <td style={{ padding: "0.45rem 0.75rem", fontWeight: 500 }}>{e.naam}</td>
                <td style={{ padding: "0.45rem 0.75rem" }}>{e.voorbeeld}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display" style={h2}>
        Eerst weten hoeveel er per envelop kan
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De methode valt of staat bij de bedragen. Vul je de enveloppen te hoog, dan kom je tekort,
        te laag en je grijpt toch naar je pinpas. Daarom begin je met weten hoeveel er na je vaste
        lasten te verdelen is. Reken dat uit met mijn{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        , en bekijk hoe enveloppen passen in een groter systeem bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Werk je liever digitaal? Dan doe je hetzelfde met losse potjes of rekeningen bij je bank. Het
        principe is gelijk: geld krijgt een bestemming voordat je het uitgeeft.
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E8F2EC",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je de juiste bedragen per envelop? De gratis analyse laat zien wat er na je vaste
          lasten te verdelen is, zodat je systeem vanaf dag één klopt.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
