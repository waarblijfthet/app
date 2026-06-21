import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaarBlijftMijnGeldEindeMaand() {
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
          Het is de 24e, je kijkt op je rekening en denkt: waar is het gebleven? Je hebt niks geks
          gedaan, en toch is het bijna op.
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
            "De vier plekken waar je geld bijna altijd heen gaat",
            "Hoe je in een paar minuten ziet welke het bij jou is",
            "Wat de eerste stap is om het bij te sturen",
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
        Je geld gaat bijna altijd naar vier plekken: vaste lasten die hoger zijn dan je denkt,
        dagelijkse uitgaven die je niet bijhoudt, onregelmatige kosten zonder eigen potje, en kleine
        gewoontes die optellen. Welke van de vier het bij jou is, zie je pas als je het zwart op wit
        zet.
      </p>

      <h2 className="font-display" style={h2}>
        De vier verdachten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De grootste is meestal je vaste lasten. Een gemiddeld huishouden is ruim de helft van het
        inkomen daaraan kwijt, vaak richting 55 procent, en dat groeit sluipend met elk nieuw
        abonnement. De tweede zijn dagelijkse uitgaven: boodschappen, tanken, lunches, bezorgen.
        Pinnen voelt niet als geld uitgeven, dus je onderschat dit bijna altijd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De derde zijn de onregelmatige kosten: de jaarlijkse premie, de autoreparatie, de tandarts.
        Geen verrassingen, want ze komen elk jaar, maar zonder eigen potje betaal je ze uit je
        lopende maand en dan klopt die maand niet meer. En de vierde zijn de kleine gewoontes die
        ongemerkt optellen tot een fors bedrag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De diepere uitleg per oorzaak lees je in{" "}
        <Link
          href="/inzichten/waarom-hou-ik-nooit-geld-over"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom je nooit geld overhoudt
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          goed salaris en toch krap
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Hoe je ziet welke het bij jou is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Schatten heeft geen zin, want juist in het schatten zit de blinde vlek. Pak de afschriften
        van de afgelopen twee maanden en tel drie dingen op: je vaste lasten, je dagelijkse uitgaven
        en wat er echt overblijft. Of reken het snel uit met mijn{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        . Vaak zit de verrassing in de dagelijkse uitgaven die je niet bijhoudt.
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
          Wil je het antwoord zwart op wit? De gratis analyse laat in een paar minuten zien waar
          jouw geld naartoe gaat, zonder bankkoppeling en met het resultaat direct op je scherm.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
