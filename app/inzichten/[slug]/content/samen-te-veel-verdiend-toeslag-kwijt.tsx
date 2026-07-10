import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SamenTeVeelVerdiendToeslagKwijt() {
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
          Apart kreeg je allebei nog toeslag. Samen valt alles weg, terwijl jullie maandlasten juist
          omhoog gingen. Het voelt alsof samenwonen je geld kost.
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
            "Vanaf welk gezamenlijk inkomen je zorgtoeslag en kindgebonden budget kwijtraakt in 2026",
            "Waarom twee goede inkomens net in de knel kunnen komen",
            "Wat je eraan doet, want toeslag is maar één deel van het plaatje",
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
        Zodra jullie gaan samenwonen tellen jullie inkomens samen voor de toeslagen. Voor de
        zorgtoeslag ligt de grens in 2026 op ongeveer €51.142 gezamenlijk inkomen, en voor een
        alleenstaande op €40.857. Het kindgebonden budget begint voor paren af te bouwen vanaf
        ongeveer €39.141. Twee redelijke inkomens zitten daar samen al snel boven, en dan valt de
        toeslag weg terwijl je het misschien net gewend was.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom twee goede inkomens in de knel komen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De toeslagen zijn bedoeld om lagere inkomens te steunen, dus boven een bepaalde grens
        stoppen ze. Het vervelende is de overgang: kom je er net boven, dan ben je een vast bedrag
        per maand kwijt zonder dat je netto evenveel meer verdient. Bij de zorgtoeslag kan dat voor een paar oplopen tot ruim honderd euro per maand minder, precies op het moment dat je twee huishoudens samenvoegt en de lasten juist verschuiven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het kindgebonden budget bouwt geleidelijk af, met 7,6 procent van het inkomen boven de grens.
        Voor alleenstaande ouders ligt het afbouwpunt lager, vanaf ongeveer €29.736, met daarbovenop
        de alleenstaande-ouderkop. Hoe dat voor een alleenstaande ouder uitpakt, lees je in mijn
        artikel over de{" "}
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          kosten van levensonderhoud voor een alleenstaande ouder
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Toeslag is maar één lek
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het verlies van een toeslag voelt als onrecht, maar het is zelden de echte oorzaak van een
        krappe maand. Het is één post in een groter plaatje. Belangrijker is wat er na al jullie
        vaste lasten samen overblijft, en of jullie de gezamenlijke kosten eerlijk verdelen. Begroot
        nooit op een toeslag waarvan je niet zeker weet of je hem houdt, want dan kom je voor
        verrassingen te staan.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praktischer is het om jullie nieuwe gezamenlijke situatie door te rekenen. Hoe je de kosten
        eerlijk verdeelt lees je in{" "}
        <Link
          href="/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          kosten eerlijk verdelen bij een ongelijk inkomen
        </Link>
        , en wat er verandert bij samenwonen zet ik op een rij naast je{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vaste lasten
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat je wel kunt doen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Check eerst bij de Belastingdienst of jullie nog ergens recht op hebben, want sommige
        regelingen lopen geleidelijk af in plaats van plots. Schat jullie gezamenlijke jaarinkomen
        daarbij eerlijk in, zodat je niet achteraf hoeft terug te betalen. En richt daarna jullie
        huishouden zo in dat je niet afhankelijk bent van die toeslag, met een buffer en een
        duidelijke verdeling.
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
          Benieuwd wat er bij jullie samen overblijft, los van toeslagen? De gratis analyse laat het
          hele plaatje zien, zodat je weet waar je op kunt sturen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
