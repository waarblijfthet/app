import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatKostAchterafBetalen() {
  const ladder = [
    { stap: "Op tijd betaald", kost: "Geen rente, geen kosten" },
    { stap: "Eerste herinnering", kost: "Gratis" },
    { stap: "Aanmaning na de herinnering", kost: "Rond €13,50 (ca. €7,50 bij bestelling onder €20)" },
    { stap: "Verder uitblijven, incasso", kost: "Kan oplopen tot 15% van het bedrag, minimaal €40" },
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
          Overal lees je dat achteraf betalen gratis is. En toch hoor je ook verhalen over oplopende
          kosten en aanmaningen. Wat is het nou?
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
            "Wat achteraf betalen kost als je op tijd betaalt, en wat als je te laat bent",
            "Waarom 'gratis' niet het hele verhaal is",
            "Het verschil tussen de aanbieders in hoe ze geld verdienen",
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
        Achteraf betalen is gratis zolang je op tijd betaalt. De kosten zitten in te laat betalen,
        en in iets wat je niet op een rekening terugziet: het verlies van overzicht. Dat tweede is
        voor de meeste mensen de duurdere kant.
      </p>

      <h2 className="font-display" style={h2}>
        De kostenladder
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zo lopen de kosten op naarmate je later betaalt. Dit zijn indicatieve bedragen voor 2025 en
        2026, aanbieders kunnen de tarieven aanpassen, dus controleer altijd je eigen overzicht.
      </p>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table
          className="font-body"
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#16211F", color: "#F7F8F7" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Situatie</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Wat het kost</th>
            </tr>
          </thead>
          <tbody>
            {ladder.map((r, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FFFFFF",
                  borderBottom: "1px solid #F0F3F1",
                  color: "#16211F",
                }}
              >
                <td style={{ padding: "0.45rem 0.75rem", fontWeight: 500 }}>{r.stap}</td>
                <td style={{ padding: "0.45rem 0.75rem" }}>{r.kost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display" style={h2}>
        Waarom gratis niet het hele verhaal is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Veel pagina&apos;s die achteraf betalen aanprijzen, verdienen aan jouw aankopen, dus de
        gratis-boodschap komt zelden van een onafhankelijke bron. Twee dingen blijven daarbij
        onderbelicht. Ten eerste: in 2025 oordeelden rechters dat de incassokosten onderdeel zijn
        van het verdienmodel van Klarna. De kosten bij te laat betalen zijn dus geen ongelukje aan
        de rand, ze horen bij het model. Ten tweede, en belangrijker voor de meeste mensen: omdat
        het zo drempelloos is, koop je sneller en raak je het overzicht kwijt. Die onzichtbaarheid
        kost je vaak meer dan welke aanmaning ook.
      </p>

      <h2 className="font-display" style={h2}>
        Niet elke aanbieder verdient hetzelfde
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er is wel verschil. In rechtszaken in 2025 kwam naar voren dat het verdienmodel van Klarna anders is dan dat van bijvoorbeeld Riverty, In3 en Billink, die naar verluidt niet aan te laat betalen verdienen. Dat maakt achteraf betalen niet automatisch verstandig, maar het
        is goed om te weten dat de aanbieders niet allemaal hetzelfde in elkaar zitten. Wil je
        bewust kiezen of juist stoppen, dan helpt het om te weten met wie je te maken hebt.
      </p>

      <h2 className="font-display" style={h2}>
        De goedkoopste keuze: weten wat je kunt missen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De manier om nooit aanmaningskosten te betalen is simpel: koop alleen wat je nu al kunt
        betalen. Daarvoor moet je weten wat er maandelijks vrij is. Reken dat uit met mijn{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        , en als je merkt dat je structureel op achteraf betalen leunt, lees dan{" "}
        <Link
          href="/inzichten/stoppen-met-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          stoppen met achteraf betalen
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
          De echte kost van achteraf betalen is het verloren overzicht. De gratis analyse brengt het
          terug en laat zien waar je geld naartoe gaat.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
