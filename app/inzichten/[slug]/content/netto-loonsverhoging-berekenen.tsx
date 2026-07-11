import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function NettoLoonsverhogingBerekenen() {
  const zones = [
    { zone: "tot €38.883", houd: "ongeveer €64" },
    { zone: "€38.883 tot €78.426", houd: "ongeveer €44 tot €62" },
    { zone: "boven €78.426", houd: "ongeveer €50" },
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
          Je kreeg een mooie loonsverhoging, maar op je rekening merk je er bijna niks van. Je
          verwachtte meer ruimte, en die kwam niet.
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
            "Hoeveel je netto ongeveer overhoudt van een loonsverhoging in 2026",
            "Waarom er soms maar de helft van overblijft, of nog minder",
            "Waarom een hoger inkomen je krappe gevoel zelden oplost",
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
        Van elke €100 bruto loonsverhoging houd je netto meestal tussen de €50 en €64 over,
        afhankelijk van je inkomen. In het middensegment kan dat zelfs lager uitvallen, doordat je
        boven op de belasting ook een deel van je heffingskortingen verliest. Dat je weinig voelt
        van een opslag is dus geen gevoel, het klopt.
      </p>

      <h2 className="font-display" style={h2}>
        Wat je ongeveer overhoudt per €100 bruto
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit zijn richtbedragen voor 2026. Ze gelden voor je bruto jaarinkomen, dus reken een
        maandelijkse verhoging om naar twaalf maanden om te zien in welke zone je valt.
      </p>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table
          className="font-body"
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#16211F", color: "#F7F8F7" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Jaarinkomen</th>
              <th style={{ textAlign: "right", padding: "0.5rem 0.75rem" }}>Van €100 bruto erbij houd je netto</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FFFFFF",
                  borderBottom: "1px solid #F0F3F1",
                  color: "#16211F",
                }}
              >
                <td style={{ padding: "0.45rem 0.75rem" }}>{z.zone}</td>
                <td style={{ padding: "0.45rem 0.75rem", textAlign: "right", fontWeight: 500 }}>
                  {z.houd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een voorbeeld: krijg je er €200 bruto per maand bij en zit je rond een modaal inkomen, dan
        houd je daar netto vaak zo&apos;n €100 tot €120 van over. De rest gaat naar belasting en de afbouw van je heffingskortingen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom er soms zo weinig overblijft
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Nederland kent een progressief belastingstelsel: over je extra inkomen betaal je het tarief
        van de schijf waarin dat extra deel valt. Maar er speelt meer. Tussen ongeveer €38.000 en
        €78.000 bouwen de algemene heffingskorting en de arbeidskorting af naarmate je meer
        verdient. Dat verlies komt boven op de belasting, waardoor je van elke extra euro in dat
        segment soms maar de helft of minder overhoudt. De volledige uitleg staat in mijn artikel
        over{" "}
        <Link
          href="/inzichten/salarisverhoging-boven-76000-weinig-netto"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom een salarisverhoging zo weinig netto oplevert
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Meer verdienen lost het krappe gevoel niet op
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zelfs het deel dat wél overblijft, lost zelden je krappe gevoel op. Want zolang het lek in
        je structuur zit, loopt een hoger inkomen er gewoon doorheen, en je uitgavenpatroon beweegt
        ongemerkt mee omhoog. Daarom voelt een opslag na een paar maanden alweer als niks. Hoe dat
        werkt, lees je in{" "}
        <Link
          href="/inzichten/waarom-hou-ik-nooit-geld-over"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom je nooit geld overhoudt
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          levensstijlinflatie
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
          Benieuwd hoe jouw uitgaven zich verhouden tot vergelijkbare huishoudens? Doe de gratis analyse en zie het meteen. Wil je daarna dat ik persoonlijk naar je cijfers kijk en je drie grootste lekken op een rij zet, dan kan dat met de geldscan (€49).
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-sm" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <Link href="/geldscan" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Of laat mij je cijfers persoonlijk nakijken (€49)</Link>
        </p>
      </div>
    </>
  );
}
