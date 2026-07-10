import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function AchterafBetalenBkrRegistratie() {
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
          Je gebruikt weleens achteraf betalen en vraagt je af of dat je BKR-registratie raakt,
          bijvoorbeeld als je later een hypotheek wilt. Online lees je daar tegenstrijdige dingen
          over.
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
            "Of achteraf betalen op je BKR komt als je op tijd betaalt",
            "Wanneer er wél een negatieve registratie kan ontstaan",
            "Wat er in 2026 verandert met het toezicht op achteraf betalen",
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
        Kort gezegd: betaal je je achteraf-betalingen gewoon op tijd, dan leidt dat doorgaans niet
        tot een BKR-registratie. Het risico ontstaat pas bij een langere achterstand die wordt
        overgedragen aan een incassopartij. En let op: vanaf eind 2026 verandert het toezicht, en
        komt er een verplichte kredietwaardigheidstoets.
      </p>

      <h2 className="font-display" style={h2}>
        Op tijd betaald: meestal geen registratie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een korte achteraf-betaling die je binnen de termijn voldoet, is klein en kortlopend, en
        wordt nu doorgaans niet bij het BKR geregistreerd. Veel sites die anders beweren, hebben er
        belang bij om je een dienst te verkopen, dus wees voorzichtig met stellige verhalen. Op tijd
        betalen is de simpele regel die je registratie schoon houdt.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer het wél misgaat
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het risico zit in de achterstand. Betaal je langere tijd niet en wordt de vordering
        overgedragen aan een incassobureau, dan kan dat uiteindelijk wel tot een negatieve
        registratie leiden, met gevolgen voor bijvoorbeeld een latere hypotheekaanvraag. Niet de
        achteraf-betaling zelf is dan het probleem, maar het uitblijven van betaling. Reden te meer om een betaling die je niet rond krijgt op tijd op te pakken. Lukt dat niet, zoek dan op tijd hulp, bijvoorbeeld gratis en anoniem bij Geldfit. Wat er precies gebeurt bij een
        achterstand, lees je in{" "}
        <Link
          href="/inzichten/klarna-niet-kunnen-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          Klarna niet kunnen betalen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat er in 2026 verandert
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Achteraf betalen valt nu nog grotendeels buiten het toezicht van de Autoriteit Financiële
        Markten. Dat verandert: door nieuwe Europese regels komen aanbieders zoals Klarna naar
        verwachting vanaf eind 2026 onder dat toezicht te vallen. Daarbij hoort een verplichte
        kredietwaardigheidstoets vooraf, en een verbod op achteraf betalen voor mensen onder de 18.
        Voor jou betekent dat: vaker een controle voordat je achteraf mag betalen, en meer
        bescherming, maar het verandert niets aan de kern dat een openstaande betaling gewoon
        betaald moet worden.
      </p>

      <h2 className="font-display" style={h2}>
        Belangrijker dan je BKR: je eigen overzicht
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een schone BKR-registratie is mooi, maar het echte doel is grip. Zolang je achteraf
        betalingen op tijd voldoet en weet wat er maandelijks vrij is, blijft je registratie vanzelf
        in orde. Begin met je openstaande betalingen in beeld brengen in{" "}
        <Link
          href="/inzichten/overzicht-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je openstaande achteraf-betalingen op een rij krijgen
        </Link>
        , en reken uit{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat je vrij besteedbaar overhoudt
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
