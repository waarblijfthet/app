import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function OverzichtAchterafBetalen() {
  const aanbieders = [
    "Klarna",
    "Riverty (voorheen AfterPay)",
    "In3",
    "Billink",
    "Achteraf betalen via je webshop of creditcard",
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
          Je hebt op een paar plekken achteraf betaald, en je weet niet meer precies hoeveel er nog
          openstaat en wanneer het afgeschreven wordt. Het verdwijnt uit beeld, en daar zit het
          gevaar.
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
            "Waarom achteraf betalen je overzicht zo snel laat verdwijnen",
            "Hoe je in vier stappen al je openstaande betalingen op een rij zet",
            "Hoe je voorkomt dat het volgende maand weer onoverzichtelijk wordt",
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
        Het grootste risico van achteraf betalen is niet één betaling, maar dat je het overzicht
        kwijtraakt. Je koopt op verschillende momenten bij verschillende winkels, en de betalingen
        komen verspreid terug. Voor je het weet staan er meerdere bedragen open zonder dat je het
        totaal nog kent. De oplossing is simpel maar oncomfortabel: alles zichtbaar maken.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom het overzicht zo snel verdwijnt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Achteraf betalen is ontworpen om drempelloos te zijn. Je rekent af zonder dat er meteen geld
        van je rekening gaat, dus het voelt niet als uitgeven. Doe je dat bij meerdere winkels en
        via meerdere aanbieders, dan lopen de betaaldata door elkaar. Uit onderzoek van het Nibud (2025) blijkt dat juist jongere gebruikers hierdoor hun financiële overzicht verliezen, en dat ruim de helft van de jongvolwassenen achteraf betalen inmiddels normaal vindt.
      </p>

      <h2 className="font-display" style={h2}>
        In vier stappen je openstaande betalingen op een rij
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Stap één: open de apps en accounts van alle aanbieders waar je weleens achteraf betaalt. De
        meest voorkomende zijn:
      </p>

      <ul className="mb-5 space-y-1.5">
        {aanbieders.map((a, i) => (
          <li key={i} className="flex gap-2 font-body" style={{ color: "#16211F" }}>
            <span className="mt-1 shrink-0" style={{ color: "#0B7A6E" }}>
              •
            </span>
            <span>{a}</span>
          </li>
        ))}
      </ul>

      <p className="font-body text-text-soft" style={p}>
        Stap twee: noteer per openstaande betaling het bedrag en de datum waarop het wordt
        afgeschreven. Zet ze onder elkaar, op papier of in een notitie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap drie: tel het totaal op. Dit is vaak het oncomfortabele moment, want het bedrag valt meestal hoger uit dan je dacht. Maar dat getal is precies wat je nodig hebt. Schrik je ervan, dan is dat geen falen maar het begin van grip, en kom je er niet uit dan kun je anoniem terecht bij Geldfit.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap vier: zet de afschrijfdata in je agenda, zodat geen enkele betaling je nog verrast en
        je geen aanmaningskosten oploopt. Loop ook even je{" "}
        <Link
          href="/inzichten/vergeten-abonnementen-opzeggen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vergeten abonnementen
        </Link>{" "}
        na, want dat is hetzelfde soort onzichtbare uitgave.
      </p>

      <h2 className="font-display" style={h2}>
        Voorkom dat het opnieuw misgaat
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een overzicht maken helpt maar één keer als je daarna weer op de oude voet verdergaat. De
        echte oplossing is dat je weet wat er maandelijks vrij is, zodat je niet meer hoeft uit te
        stellen. Reken dat uit met mijn{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        , en lees hoe je je geld een bestemming geeft bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        . Wil je er helemaal mee stoppen, lees dan{" "}
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
          Wil je weten waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken. In gewone taal, geen gesprek nodig.
        </p>
        <Link href="/geldscan" className="btn-primary">
          Laat mij je cijfers nakijken (€49) &rarr;
        </Link>
      </div>
    </>
  );
}
