import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KostenLevensonderhoudZZPAlleenstaande2026() {
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
          In een goed kwartaal gaat het prima. In een rustig kwartaal loop je op je buffer in.
          En er is niemand die tijdelijk bijspringt als jij dat niet kunt.
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
            "Waarom je als ZZP-alleenstaande structureel meer inkomen nodig hebt dan een werknemer in dezelfde situatie",
            "Hoeveel je minimaal aan buffer moet aanhouden en waarom de meeste ZZP'ers te weinig opzijzetten",
            "Wat de verborgen kostenposten zijn die een ZZP'er anders aanpakt dan een loondienst-medewerker",
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

      <p className="font-body text-text-soft" style={p}>
        Als ZZP&apos;er en alleenstaande heb je te maken met een dubbele onzekerheid. Je inkomen
        wisselt. En er is geen tweede inkomen dat de vaste lasten draagt als jij een rustige
        periode hebt, ziek bent of een opdracht later betaalt dan gepland.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat vraagt niet alleen een andere manier van begroten, maar ook structureel meer buffer
        dan de meeste financiële modellen voor werknemers voorschrijven.
      </p>

      <h2 className="font-display" style={h2}>
        Wat zijn de extra kosten ten opzichte van een werknemer?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een ZZP&apos;er heeft dezelfde vaste lasten als een werknemer, plus een aantal posten die
        een werkgever normaal gesproken regelt of meebetaalt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Arbeidsongeschiktheidsverzekering (AOV) is de grootste. Als je als ZZP&apos;er niet meer
        kunt werken door ziekte of een ongeluk, is er geen werkgever die doorbetaalt en geen WW.
        Een AOV kost afhankelijk van inkomen, leeftijd en dekking gemiddeld €200-500 per maand.
        Niet verzekerd zijn is een keuze die bij een tegenvaller hard aankomt, zeker als je alleen
        bent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Pensioen bouw je als ZZP&apos;er zelf op. Er is geen werkgever die 10-15% bijdraagt. Nibud
        adviseert ZZP&apos;ers minimaal 17% van de jaarwinst opzij te zetten voor pensioen. Bij
        een gemiddelde maandomzet van €4.000 bruto is dat ca. €680 per maand die je niet kunt
        besteden aan je vaste lasten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Inkomstenbelasting en Zorgverzekeringswet-bijdrage (Zvw) reserveer je zelf. Reken op
        minimaal 25-30% van de winst voor belasting en premies, afhankelijk van je inkomen en
        aftrekposten. Wie dit niet maandelijks reserveert, komt in de problemen bij de
        belastingaangifte.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zorgtoeslag: ZZP&apos;ers met een wisselend inkomen hebben soms recht op zorgtoeslag,
        maar het kan ook wegvallen bij een goed jaar. Begroten op toeslag en het later moeten
        terugbetalen is een van de meest voorkomende financiële verrassingen voor
        ZZP&apos;ers.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel heb je bruto nodig als ZZP-alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een eenvoudige rekensom maakt het duidelijk. Neem een alleenstaande ZZP&apos;er in een
        middelgrote stad met vaste lasten van €2.200 per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Boven die €2.200 aan persoonlijke lasten heeft deze persoon nog nodig: AOV ca. €280 per
        maand, pensioenreservering €500, belasting en Zvw-reservering €800-1.000 bij een omzet
        van €4.000. Totaal reserveren: ca. €1.600 per maand. Dat betekent dat een omzet van
        €4.000 per maand brutonomzet oplevert van €2.400 netto beschikbaar, waarvan vaste lasten
        €2.200 zijn. Er is dan nauwelijks ruimte voor tegenvallers.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Comfortabel als ZZP-alleenstaande in een middelgrote stad betekent in de praktijk een
        structurele omzet van minimaal €4.500-€5.000 per maand. In de Randstad is dat
        €5.000-€6.000.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel buffer heb je nodig?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als werknemer adviseert Nibud een buffer van drie tot zes maanden nettosalaris. Als
        ZZP-alleenstaande is het advies hoger: zes maanden volledige vaste lasten inclusief
        reserveringen. Bij vaste lasten van €2.200 en reserveringen van €1.600 is dat een buffer
        van minimaal €23.000.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat klinkt veel. En het is ook veel. Maar het is de buffer die je beschermt als een grote
        opdrachtgever wegvalt, als je zes weken ziek bent terwijl je AOV pas na een maand
        uitkeert, of als de belastingaanslag hoger uitvalt dan verwacht. Als alleenstaande is er
        niemand anders om op terug te vallen.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit ruimte in het budget?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zakelijke kosten verlagen je belastbare winst. Denk aan telefoon, laptop, abonnementen
        die zakelijk zijn, reiskosten en een thuiswerkkamer als je die strikt zakelijk gebruikt.
        Een goede boekhouder of ZZP-boekhoudpakket verdient zichzelf terug.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De zelfstandigenaftrek en MKB-winstvrijstelling verlagen de belastingdruk verder als je
        aan het urencriterium voldoet (minimaal 1.225 uur per jaar). Controleer elk jaar of je er
        nog recht op hebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vraag een voorlopige aanslag aan bij de Belastingdienst als je weet dat je een goed jaar
        gaat hebben. Zo betaal je belasting in termijnen in plaats van één keer achteraf. Dat
        voorkomt dat je aan het einde van het jaar een groot bedrag moet ophoesten dat je eigenlijk
        al had uitgegeven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Variabele kosten meebewegen met inkomen: in een goed kwartaal wat extra reserveren voor
        pensioen of buffer, in een rustig kwartaal terugschroeven op niet-vaste uitgaven. Dat
        vraagt discipline maar is voor ZZP&apos;ers de meest logische manier van begroten.
      </p>

      {/* Uit de praktijk */}
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm font-medium mb-2" style={{ color: "#16211F" }}>
          Uit de praktijk: Daan, 36, freelance UX-designer, Amsterdam
        </p>
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          Gemiddelde maandomzet €4.800, maar sterk wisselend: €2.000 in januari, €7.000 in
          november. Huur €1.400, zorgverzekering €185, AOV €280, pensioenreservering €500, plus
          belastingreservering €900. Totaal reserveren en vaste lasten samen: €3.900 per maand.
          In goede maanden loopt er buffer op. In januarissen eet hij zijn buffer aan. Zonder die
          buffer, geen ZZP-bestaan. Maar die buffer opbouwen terwijl je alleen bent en in Amsterdam
          huurt, duurt lang.
        </p>
      </div>

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
          Wil je weten waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken. In gewone taal, geen gesprek nodig.
        </p>
        <Link href="/geldscan" className="btn-primary">
          Laat mij je cijfers nakijken (€49) &rarr;
        </Link>
      </div>

      {/* Terug naar overzicht */}
      <p className="font-body text-sm" style={{ color: "#8B958F", marginTop: "1rem" }}>
        Onderdeel van het overzicht{" "}
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          kosten levensonderhoud alleenstaande 2026
        </Link>
        .
      </p>
    </>
  );
}
