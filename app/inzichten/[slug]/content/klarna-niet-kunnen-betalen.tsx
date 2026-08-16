import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const kaart = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E6E9E7",
  borderRadius: "12px",
  padding: "1.1rem 1.25rem",
} as const;

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
          De betaaltermijn van je Klarna loopt af en het geld is er nu niet. Je vraagt je af wat er
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
            "Wat er stap voor stap gebeurt als een Klarna-betaling niet op tijd lukt",
            "Wat je nu het beste doet, rustig en zonder paniek",
            "Of dit incidenteel is, of dat het de moeite waard is om verder te kijken",
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

      {/* Direct antwoord, max 3 alinea's */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kun je een Klarna-betaling niet op tijd betalen, dan gebeurt er niet meteen iets ergs. Je
        krijgt eerst een gratis herinnering, daarna een aanmaning met kosten. Blijft betaling
        langer uit, dan komen daar de wettelijke incassokosten bovenop, minimaal €40 of 15 procent
        van het bedrag, en wordt de vordering overgedragen aan een incassopartner.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het beste wat je nu kunt doen: open je Klarna-app, kijk precies wat er openstaat en
        wanneer, en betaal het deel dat je nu kunt missen. Lukt het volledige bedrag niet in een
        keer, kijk dan of Klarna een regeling of spreiding aanbiedt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Blijven wachten maakt het alleen duurder: elke stap in het proces voegt kosten toe, en een
        langere achterstand die naar incasso gaat kan uiteindelijk ook je BKR raken. Snel oppakken
        is dus verstandig, wat de reden ook is dat het deze keer niet lukt.
      </p>

      {/* Stappenplan */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4", marginTop: "1.5rem" }}
      >
        <p className="font-body font-semibold text-base mb-4" style={{ color: "#16211F" }}>
          Kun je je Klarna-betaling niet betalen?
        </p>
        <ol className="space-y-3">
          {[
            "Controleer in de app precies wat er openstaat en op welke datum.",
            "Kijk welke betaalmogelijkheden of oplossingen Klarna je biedt, zoals verlengen of spreiden.",
            "Betaal of regel de betaling zo snel mogelijk, ook als het maar een deel is.",
            "Kom je structureel geld tekort? Kijk dan verder dan deze ene betaling.",
          ].map((stap, i) => (
            <li key={i} className="flex gap-3 font-body text-sm" style={{ color: "#16211F" }}>
              <span
                className="flex items-center justify-center shrink-0 rounded-full font-semibold"
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#0B7A6E",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                }}
              >
                {i + 1}
              </span>
              <span style={{ paddingTop: "1px" }}>{stap}</span>
            </li>
          ))}
        </ol>
      </div>

      <h2 className="font-display" style={h2}>
        Een aanmaning is niet meteen een vaststaande schuld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Goed om te weten, want het haalt de scherpste angst weg. De rechtbank Midden-Nederland
        oordeelde in het voorjaar van 2025 in meerdere zaken dat Klarna niet kon aantonen dat rente
        en incassokosten alleen kostendekkend waren, en dus geen onderdeel van het eigen
        verdienmodel. Daardoor golden de regels voor consumentenkrediet, en hoefden klanten in die
        specifieke zaken de gevorderde rente en incassokosten niet te betalen. Daarnaast geldt
        sinds 1 april 2025 een registratieplicht voor incassobureaus, met strengere eisen aan hun
        werkwijze.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat betekent niet dat je een echte betaling kunt negeren, je hebt het product immers
        gekocht. Maar het betekent wel dat je niet meteen hoeft te schrikken van dreigende taal in
        een aanmaning. Betaal wat je verschuldigd bent, maak bezwaar tegen kosten die je onterecht
        lijken, en laat je niet opjagen.
      </p>

      {/* Waarom kun je niet betalen */}
      <h2 className="font-display" style={h2}>
        Maar waarom kun je deze betaling eigenlijk niet doen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dat is de vraag die er echt toe doet, en die vraag is niet moraliserend bedoeld. Er zijn
        grofweg drie situaties, en ze vragen niet allemaal om hetzelfde.
      </p>

      <div className="space-y-3 mb-6">
        <div style={kaart}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
            Incidenteel
          </p>
          <p className="font-body text-sm text-text-soft" style={{ marginBottom: 0 }}>
            Een onverwachte rekening, een kapotte auto, een vakantie of een andere eenmalige
            uitgave zorgt ervoor dat een betaling tijdelijk niet uitkomt.
          </p>
        </div>
        <div style={kaart}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
            Structureel
          </p>
          <p className="font-body text-sm text-text-soft" style={{ marginBottom: 0 }}>
            Je hebt iedere maand net te weinig ruimte, terwijl je inkomen op papier prima lijkt.
          </p>
        </div>
        <div style={kaart}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
            Onverklaard
          </p>
          <p className="font-body text-sm text-text-soft" style={{ marginBottom: 0 }}>
            Je verdient goed, maar toch lijkt het geld iedere maand verdwenen voordat alle
            betalingen binnen zijn.
          </p>
        </div>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Is het incidenteel, dan is er meestal niets aan de hand. Herken je de tweede of derde
        situatie, en dan vooral als dat vaker gebeurt, dan kan het de moeite waard zijn om te
        kijken naar het grotere plaatje.
      </p>

      {/* Zelfdiagnose */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <ul className="space-y-2">
          {[
            "Je schuift regelmatig betalingen door.",
            "Je gebruikt vaker achteraf betalen om een aankoop in deze maand te laten passen.",
            "Je spaargeld wordt regelmatig gebruikt voor gewone uitgaven.",
            "Aan het einde van de maand blijft er minder over dan je verwacht.",
            "Je verdient volgens jezelf goed, maar financiële ruimte voelt toch klein.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, marginTop: "1rem", marginBottom: 0 }}>
          Herken je één punt? Dat hoeft helemaal niets te betekenen. Herken je meerdere punten
          structureel? Dan kan het interessant zijn om te kijken naar het grotere plaatje.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wil je dat eerst zelf op een rij zetten, begin dan met{" "}
        <Link
          href="/inzichten/overzicht-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je openstaande achteraf-betalingen in beeld brengen
        </Link>
        , en lees eventueel over{" "}
        <Link
          href="/inzichten/stoppen-met-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          stoppen met achteraf betalen
        </Link>
        . Twijfel je over de gevolgen op langere termijn, lees dan{" "}
        <Link
          href="/inzichten/achteraf-betalen-bkr-registratie"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          of achteraf betalen op je BKR komt
        </Link>
        . Stapelen de betalingen zich echt op en kom je er zelf niet uit, wacht dan niet. Bij{" "}
        <a
          href="https://geldfit.nl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          Geldfit
        </a>{" "}
        kun je anoniem terecht voor hulp en een eerste stap.
      </p>

      {/* Brug naar Waar blijft het */}
      <h2 className="font-display" style={h2}>
        Wat deze ene betaling je niet vertelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een Klarna-betaling oplossen vertelt je wat je deze maand moet doen. Het vertelt je niet
        waarom je financiële ruimte zo klein voelt. Daarvoor moet je verder kijken dan één
        betaling, en verder dan boodschappen of een andere losse post. De gratis analyse kijkt naar
        je volledige huishouden, niet naar Klarna alleen.
      </p>

      {/* Financieel voorbeeld */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#FDFAF4", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Een rekenvoorbeeld, geen echte klant, ter illustratie
        </p>
        <p className="font-body font-semibold" style={{ color: "#16211F", fontSize: "1.6rem", marginBottom: "0.75rem" }}>
          €5.400 netto per maand
        </p>
        <ul className="space-y-1.5 mb-3">
          {[
            ["Wonen", "€1.750"],
            ["Boodschappen", "€820"],
            ["Vervoer", "€465"],
            ["Verzekeringen", "€390"],
            ["Overige uitgaven", "de rest"],
          ].map(([naam, bedrag], i) => (
            <li key={i} className="flex justify-between font-body text-sm" style={{ color: "#4A5A56" }}>
              <span>{naam}</span>
              <span style={{ color: "#16211F", fontWeight: 500 }}>{bedrag}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, marginBottom: 0 }}>
          Toch blijft er minder over dan je bij dit inkomen zou verwachten. Zonder context kun je
          niet bepalen of deze bedragen voor dit huishouden hoog of laag zijn. Een banktransactie
          vertelt wat je uitgeeft, niet of dat logisch is voor jouw situatie. Dat is precies waar
          de gratis analyse wel naar kijkt.
        </p>
      </div>

      {/* Gratis analyse CTA */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold" style={{ color: "#16211F", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Wil je weten waar het bij jou wringt?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, marginBottom: "0.75rem" }}>
          Met de gratis analyse zie je waar jouw huishouden afwijkt van vergelijkbare huishoudens.
        </p>
        <ul className="space-y-1.5 mb-4">
          {[
            "Waar je relatief veel of weinig uitgeeft.",
            "Welke categorieën echt opvallen.",
            "Waar je financiële ruimte mogelijk blijft hangen.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs" style={{ color: "#4A5A56", fontWeight: 300, marginTop: "0.6rem", marginBottom: 0 }}>
          Gratis, vertrouwelijk, geen verkoopgesprek. Een eerste stap, geen financieel advies.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wil je ook weten waarom je financiële ruimte zo klein voelt, wat dat betekent en wat je
        ermee kunt? Dat is precies waarin de Geldscan verschilt van de gratis analyse: de analyse
        laat zien waar je afwijkt, de Geldscan legt uit waarom.
      </p>
    </>
  );
}
