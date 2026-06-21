import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Is3000NettoGenoegGezin() {
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
          €3.000 netto klinkt als genoeg voor een gezin. En toch komen jullie elke maand net niet
          uit. Ligt dat aan jullie, of is het gewoon krap?
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
            "Of €3.000 netto genoeg is voor een gezin, en waar het op aankomt",
            "Wat kinderen en vaste lasten gemiddeld van je inkomen opslokken",
            "Waarom je woonlasten bepalen of het krap is of niet",
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
        Het eerlijke antwoord: €3.000 netto kan genoeg zijn voor een gezin, maar het is krap, en of
        het lukt hangt vooral af van je woonlasten. Met een betaalbare hypotheek uit het verleden
        red je het prima. Met een huidige huur of hypotheek in een dure regio wordt het elke maand
        passen en meten, zonder dat je iets verkeerd doet.
      </p>

      <h2 className="font-display" style={h2}>
        Wat slokt het inkomen op?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Twee grote brokken bepalen het beeld. Je vaste lasten zijn als gemiddeld huishouden al ruim
        de helft van je inkomen, vaak richting 55 procent. En kinderen kosten geld: het Nibud rekent
        gemiddeld zo&apos;n 15 procent van het besteedbaar inkomen voor één kind, en ongeveer 25
        procent voor twee kinderen samen. Een tweede kind kost dus niet nog eens 15 procent, maar
        tilt het totaal naar een kwart van je inkomen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel je dat bij elkaar op, dan zie je hoe snel €3.000 opgaat. Wat een kind precies kost per
        maand lees je in{" "}
        <Link
          href="/inzichten/wat-kost-een-kind-per-maand"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          wat kost een kind per maand
        </Link>
        , en wat normale vaste lasten zijn in{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          wat zijn normale vaste lasten voor een gezin
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Je woonlasten zijn de doorslag
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De grootste variabele is wonen. Een gezin met €3.000 netto en €900 woonlasten houdt een
        heel ander leven over dan hetzelfde gezin met €1.500 woonlasten. Dat verschil van €600 is
        precies het verschil tussen ademruimte en elke maand net niet uitkomen. Daarom zegt het
        kale inkomen zo weinig: het gaat om wat er na je woonlasten en vaste lasten overblijft.
      </p>

      <h2 className="font-display" style={h2}>
        Het ligt zelden aan jullie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als het krap is met €3.000 netto en kinderen, dan is dat meestal geen kwestie van slecht
        omgaan met geld. Het is de optelsom van gestegen vaste lasten en de kosten van een gezin op een inkomen dat voor een gezin niet royaal is. Dat erkennen helpt, want het verplaatst de
        vraag van wat doe ik fout naar waar kan ik bijsturen. Reken uit wat er bij jullie overblijft
        in{" "}
        <Link
          href="/inzichten/hoeveel-geld-overhouden-einde-maand"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel je hoort over te houden
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
          Benieuwd of het bij jullie krap is door je inkomen of door je vaste lasten? De gratis
          analyse laat zien waar je geld naartoe gaat en waar de ruimte zit.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
