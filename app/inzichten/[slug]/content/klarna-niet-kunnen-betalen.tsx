import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KlarnaNietKunnenBetalen() {
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
          De betaaltermijn van je Klarna loopt af en het geld is er niet. Je vraagt je af wat er nu
          gebeurt, en of het erger wordt als je het laat lopen.
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
            "Wat er stap voor stap gebeurt als je een Klarna-betaling niet op tijd betaalt",
            "Wat de kosten ongeveer zijn, en waarom een aanmaning niet automatisch een vaststaande schuld is",
            "Wat je het beste meteen kunt doen, rustig en zonder paniek",
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
        Kun je een Klarna-betaling niet betalen, dan gebeurt er niet meteen iets ergs. Je krijgt
        eerst een gratis herinnering, daarna een aanmaning met kosten, en pas bij langer uitblijven
        wordt het overgedragen aan een incassopartij. Hoe eerder je het oppakt, hoe lager de kosten.
        Paniek is niet nodig, maar wegkijken maakt het wel duurder. Een gemiste betaling die je snel oppakt levert je bovendien nog geen BKR-registratie op.
      </p>

      <h2 className="font-display" style={h2}>
        Wat er stap voor stap gebeurt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Eerst krijg je een betaalherinnering, die is gratis. Betaal je daarna nog niet, dan volgt
        een aanmaning met kosten. Die aanmaningskosten lagen in 2025 en 2026 rond de €13,50, en bij
        kleine bestellingen onder €20 lager, rond €7,50. Blijft betaling daarna uit, dan kan het
        bedrag oplopen, tot zo&apos;n 15 procent van het openstaande bedrag met een minimum van €40, en
        wordt de vordering overgedragen aan een incassopartner. Dit zijn indicatieve bedragen,
        Klarna kan de tarieven aanpassen, dus check je eigen Klarna-overzicht voor de actuele
        situatie.
      </p>

      <h2 className="font-display" style={h2}>
        Een aanmaning is niet automatisch een vaststaande schuld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Goed om te weten, want het haalt de scherpste angst weg: in 2025 oordeelden rechters dat de
        incassokosten onderdeel zijn van het verdienmodel van Klarna, en dat zo&apos;n betaling
        feitelijk consumentenkrediet is. In meerdere zaken werden vorderingen van Klarna&apos;s
        incassopartner afgewezen omdat het dossier niet op orde was. Daarnaast gelden sinds april 2025 strengere regels voor incassobureaus die voor anderen vorderingen innen, dus of een aanmaning aan al die eisen voldoet is niet altijd vanzelfsprekend.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat betekent niet dat je een echte betaling kunt negeren, je hebt het product immers
        gekocht. Maar het betekent wel dat je niet hoeft te schrikken van dreigende taal in een
        aanmaning. Betaal wat je verschuldigd bent, maak bezwaar tegen onterechte kosten, en laat je
        niet opjagen.
      </p>

      <h2 className="font-display" style={h2}>
        Wat je het beste meteen doet
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Open je Klarna-app en bekijk wat er precies openstaat en wanneer. Betaal het deel dat je nu
        kunt betalen, zodat de kosten niet verder oplopen. Lukt het hele bedrag niet in een keer,
        kijk dan of je de betaling kunt verlengen of spreiden, maar wees je ervan bewust dat
        uitstel het probleem naar volgende maand verschuift in plaats van oplost.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Heb je meerdere achteraf-betalingen lopen en ben je het overzicht kwijt, begin dan met alles
        op een rij zetten. Hoe je dat doet, lees je in{" "}
        <Link
          href="/inzichten/overzicht-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je openstaande achteraf-betalingen op een rij krijgen
        </Link>
        . En wil je er helemaal mee stoppen, lees dan{" "}
        <Link
          href="/inzichten/stoppen-met-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          stoppen met achteraf betalen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Kom je er echt niet uit en stapelen de betalingen zich op, wacht dan niet. Bij{" "}
        <a
          href="https://geldfit.nl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          Geldfit
        </a>{" "}
        kun je gratis en anoniem terecht voor hulp en een eerste stap.
      </p>

      <p className="font-body text-text-soft" style={p}>Twijfel je over de gevolgen op langere termijn, lees dan <Link href="/inzichten/achteraf-betalen-bkr-registratie" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">of achteraf betalen op je BKR komt</Link>.</p>

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
          Achteraf betalen verbergt vaak wat er echt uitgaat. De gratis analyse laat zien waar je
          geld naartoe gaat, zodat je niet meer op de volgende maand hoeft te leunen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
