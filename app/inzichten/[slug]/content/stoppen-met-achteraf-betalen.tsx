import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function StoppenMetAchterafBetalen() {
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
          Je wilde het eigenlijk niet meer doen, en toch klikte je bij de volgende bestelling weer
          op achteraf betalen. Het is makkelijk, en juist daarom moeilijk om los te laten.
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
            "Waarom achteraf betalen een uitstel-spiraal voedt",
            "De stappen om ermee te stoppen, zonder jezelf af te kraken",
            "Hoe je voorkomt dat je het over een maand toch weer doet",
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
        Stoppen met achteraf betalen lukt het beste in deze volgorde: maak eerst je openstaande
        betalingen af, zet daarna de optie uit waar je kunt, en bouw een kleine buffer op zodat je
        niet meer hoeft uit te stellen. Het ligt niet aan een gebrek aan wilskracht, het ligt aan
        een systeem dat is ontworpen om makkelijk te zijn.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom het een spiraal wordt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Achteraf betalen schuift een uitgave naar de toekomst. Dat voelt fijn op het moment zelf,
        maar volgende maand komt die betaling terug bovenop je gewone lasten. Is het dan weer krap,
        dan stel je de volgende aankoop opnieuw uit, en zo stapelt het zich op. Het is geen
        karakterfout, het is precies hoe het bedoeld is om te werken: drempelloos, zodat je vaker
        en meer koopt.
      </p>

      <h2 className="font-display" style={h2}>
        Zo kom je eruit, stap voor stap
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Begin met overzicht. Zet al je openstaande achteraf-betalingen op een rij, zodat je weet wat
        er nog moet. Hoe je dat doet, lees je in{" "}
        <Link
          href="/inzichten/overzicht-achteraf-betalen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je openstaande achteraf-betalingen op een rij krijgen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maak daarna af wat openstaat, te beginnen bij de betaling met de dichtstbijzijnde datum,
        zodat je geen aanmaningskosten oploopt. Pas als alles is afbetaald, zet je achteraf betalen uit waar dat kan, of verwijder je de betaalmethode. Een dichte deur is makkelijker dan elke keer
        nee zeggen bij de kassa.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Spreek voor jezelf een eenvoudige regel af: koop je iets, dan betaal je het meteen of je
        koopt het niet. Werkt een vaste wachttijd voor je beter, leg dan een aankoop een dag opzij
        voordat je beslist. Veel impulsaankopen verdwijnen vanzelf als je er een nacht over slaapt.
      </p>

      <h2 className="font-display" style={h2}>
        De echte oplossing: niet meer hoeven uitstellen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je grijpt naar achteraf betalen omdat het op dat moment krap is. De duurzame oplossing is
        dus niet alleen wilskracht, maar een kleine buffer en grip op je maand. Met een buffer voor
        onverwachte uitgaven hoef je niet meer uit te stellen, en met overzicht weet je wat er
        werkelijk te besteden is. Begin met uitrekenen{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat je vrij besteedbaar overhoudt
        </Link>{" "}
        en lees hoe je een buffer opbouwt bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lukt het je niet om de openstaande betalingen af te lossen, of stapelen de schulden zich op,
        zoek dan op tijd hulp. Bij{" "}
        <a
          href="https://geldfit.nl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          Geldfit
        </a>{" "}
        kun je gratis en anoniem terecht. Dat is geen zwaktebod, dat is verstandig.
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
