import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Weken53SpaaruitdagingSchema2026() {
  const weken = Array.from({ length: 53 }, (_, idx) => {
    const week = idx + 1;
    const cumulatief = (week * (week + 1)) / 2;
    return { week, inleg: week, cumulatief };
  });

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
          Sparen lukt je niet in één keer met een groot bedrag, maar een klein beetje per week voelt
          wel te doen. Daar is de spaaruitdaging voor gemaakt.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>
          In dit artikel:
        </p>
        <ul className="space-y-1.5">
          {[
            "Het volledige 53-wekenschema voor 2026 (oplopend), met wat je in totaal spaart",
            "De omgekeerde variant, voor wie het einde van het jaar wil ontzien",
            "Hoe je de uitdaging volhoudt in plaats van halverwege af te haken",
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
        Bij de spaaruitdaging zet je elke week het bedrag van dat weeknummer opzij: week 1 is €1,
        week 2 is €2, tot en met de laatste week. 2026 heeft 53 weken, dus je spaart in totaal
        €1.431. Hieronder staat het volledige schema dat je kunt aftikken.
      </p>

      <h2 className="font-display" style={h2}>
        Het volledige 53-wekenschema voor 2026
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Streep elke week af zodra je het bedrag hebt overgemaakt naar je spaarrekening. De laatste
        kolom laat zien hoeveel je dan in totaal hebt gespaard.
      </p>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table
          className="font-body"
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#1C3A2A", color: "#F5F0E8" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Week</th>
              <th style={{ textAlign: "right", padding: "0.5rem 0.75rem" }}>Inleg</th>
              <th style={{ textAlign: "right", padding: "0.5rem 0.75rem" }}>Totaal gespaard</th>
            </tr>
          </thead>
          <tbody>
            {weken.map((w) => (
              <tr
                key={w.week}
                style={{
                  backgroundColor: w.week % 2 === 0 ? "#FDFAF4" : "#FFFFFF",
                  borderBottom: "1px solid #EFE8DC",
                  color: "#2D4A35",
                }}
              >
                <td style={{ padding: "0.4rem 0.75rem" }}>Week {w.week}</td>
                <td style={{ padding: "0.4rem 0.75rem", textAlign: "right" }}>€{w.inleg}</td>
                <td style={{ padding: "0.4rem 0.75rem", textAlign: "right", fontWeight: 500 }}>
                  €{w.cumulatief.toLocaleString("nl-NL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display" style={h2}>
        Liever de omgekeerde variant
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Veel mensen lopen vast in december, want juist dan komen de hoogste weekbedragen samen met
        de feestdagen. De omgekeerde variant draait het schema om: je begint in week 1 met €53 en
        eindigt in de laatste week met €1. Je spaart precies hetzelfde totaal, maar de zware weken
        liggen aan het begin van het jaar, als je goede voornemens nog vers zijn en december je niet
        in de weg zit.
      </p>

      <h2 className="font-display" style={h2}>
        Zo houd je het vol
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zet de overboeking elke week automatisch klaar, of doe een vaste dag in de week waarop je het
        met de hand doet en aftikt in dit schema. Gebruik een aparte spaarrekening, zodat het geld
        uit het zicht is. En het allerbelangrijkste: een uitdaging werkt pas echt als je weet dat er
        ook ruimte voor is. Begin je met sparen terwijl je elke maand al krap zit, dan stopt het
        vanzelf.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarom is de eerste stap niet de uitdaging zelf, maar weten wat er bij jou maandelijks vrij
        is. Reken het na met mijn{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        , en lees waarom sparen vaak misgaat in{" "}
        <Link
          href="/inzichten/waarom-lukt-sparen-niet"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom sparen niet lukt
        </Link>
        .
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
          Wil je deze uitdaging dit keer wél volhouden? Doe eerst de gratis analyse, dan weet je
          hoeveel je elke week realistisch opzij kunt zetten zonder dat het knelt.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
