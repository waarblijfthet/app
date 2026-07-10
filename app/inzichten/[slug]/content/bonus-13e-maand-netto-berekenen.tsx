import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Bonus13eMaandNettoBerekenen() {
  const tabel = [
    { zone: "€29.737 tot €38.883", tarief: "40,20%" },
    { zone: "€38.884 tot €45.592", tarief: "42,01%" },
    { zone: "€45.593 tot €78.426", tarief: "50,47%" },
    { zone: "€78.427 tot €143.554", tarief: "56,01%" },
    { zone: "€143.555 en hoger", tarief: "49,50%" },
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
          Je krijgt een bonus of een dertiende maand, en als het op je rekening staat schrik je: er
          ging bijna de helft vanaf. Betaal je echt extra belasting op je bonus?
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
            "Hoe je bonus en dertiende maand worden belast via het bijzonder tarief",
            "Welk percentage ongeveer bij jouw jaarinkomen hoort in 2026",
            "Waarom het hoog voelt, en wat je het beste met het netto-bedrag doet",
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
        Een bonus of dertiende maand wordt belast tegen het bijzonder tarief, een percentage dat
        afhangt van je jaarinkomen. Het voelt als extra belasting, maar dat is het niet: het is een
        voorheffing, net als bij je vakantiegeld. Bij een middeninkomen kan het tarief oplopen tot
        ruim 50 procent, waardoor het lijkt alsof de helft verdwijnt.
      </p>

      <h2 className="font-display" style={h2}>
        Het bijzonder tarief 2026
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Eenmalige beloningen zoals een bonus, dertiende maand, vakantiegeld of overwerk worden apart
        belast tegen het bijzonder tarief. Dit zijn de richtpercentages voor 2026, met loonheffingskorting. Je werkgever rekent met de officiële tabel, dus jouw percentage kan iets afwijken.
      </p>

      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table
          className="font-body"
          style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#16211F", color: "#F7F8F7" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem" }}>Jaarinkomen</th>
              <th style={{ textAlign: "right", padding: "0.5rem 0.75rem" }}>Bijzonder tarief</th>
            </tr>
          </thead>
          <tbody>
            {tabel.map((r, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FFFFFF",
                  borderBottom: "1px solid #F0F3F1",
                  color: "#16211F",
                }}
              >
                <td style={{ padding: "0.45rem 0.75rem" }}>{r.zone}</td>
                <td style={{ padding: "0.45rem 0.75rem", textAlign: "right", fontWeight: 500 }}>
                  {r.tarief}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een voorbeeld: krijg je €2.000 bruto bonus en verdien je rond de €50.000 per jaar, dan geldt
        ongeveer 50,47 procent. Je houdt dan netto zo&apos;n €990 over. Bij een jaarinkomen rond
        €35.000 is het ongeveer 40 procent, en houd je van diezelfde €2.000 ongeveer €1.200 over.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom het zo hoog voelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Twee dingen maken het bijzonder tarief hoog. Over je gewone maandloon krijg je
        heffingskortingen die je belasting drukken, maar die zijn daar al verrekend en komen niet
        nog een keer over je bonus. En precies in het inkomenssegment tussen ongeveer €45.000 en
        €78.000 loopt de arbeidskorting af, waardoor het tarief daar piekt boven de 50 procent. Het
        is geen straf op je bonus, het is hetzelfde mechanisme dat speelt bij je{" "}
        <Link
          href="/inzichten/vakantiegeld-netto-hoeveel-hou-je-over-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vakantiegeld
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat doe je met wat overblijft?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het netto-bedrag is nog steeds een mooi bedrag, maar het verdwijnt vaak binnen een paar
        weken omdat het los binnenkomt en geen bestemming heeft. Geef het vooraf een doel: een deel
        naar je buffer, een deel naar een concreet spaardoel, en een afgesproken deel om echt leuk
        uit te geven. Hoe je geld een bestemming geeft, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
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
          Wil je voorkomen dat je bonus net zo ongemerkt verdwijnt als je gewone salaris? De gratis
          analyse laat zien waar je geld naartoe gaat, zodat je je bonus bewust inzet.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
