import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatKostDecemberFeestdagenGezin() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        December voelt elk jaar weer als een maand die zichzelf niet helemaal
        uitlegt op je rekening. Sinterklaas, kerst, oud en nieuw, een vol
        sociaal programma — het stapelt op. En in januari schrik je van het
        saldo.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: een gemiddeld huishouden geeft in december zo&apos;n €500
        extra uit aan de feestdagen samen. Niet door één grote aankoop, maar
        door tientallen kleine: cadeaus, extra boodschappen, versiering en
        uitjes die allemaal in dezelfde vier weken vallen.
      </p>

      <h2 className="font-display" style={h2}>
        Sinterklaas: kleiner dan je denkt, vaker dan je denkt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per persoon geven Nederlanders gemiddeld rond de €113 uit aan
        Sinterklaascadeaus, al geeft ongeveer de helft minder dan €50 per
        cadeau. Het venijn zit in het aantal: cadeaus voor de kinderen, maar ook
        voor neefjes, nichtjes, collega&apos;s en het surprise-gedoe met
        knutselspullen erbij.
      </p>

      <h2 className="font-display" style={h2}>
        Kerst: cadeaus én een dure boodschappenweek
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Met kerst geven mensen vaak iets duurdere cadeaus dan met Sinterklaas —
        gemiddeld al snel een paar honderd euro aan cadeaus samen. Daar bovenop
        komt het gourmet- of dinerweekend: de boodschappen rond kerst lopen
        gemiddeld zo&apos;n €100 hoger op dan een normale week. En dan is er nog
        de versiering, de boom en de kleine dingen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom december je budget sloopt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het probleem is niet één post, maar de timing: alles valt in dezelfde
        maand, bovenop je gewone vaste lasten en boodschappen. Wie geen apart
        potje heeft, betaalt het uit het lopende inkomen — precies het patroon
        dat we beschrijven bij{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Zo houd je december in de hand
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De eenvoudigste oplossing is de feestdagen het hele jaar uitsmeren. Zet
        elke maand een vast bedrag opzij in een apart potje — €40 per maand is
        bijna €500 in december, precies genoeg. Zo werkt de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>: je voelt december niet meer als een klap, maar als iets waar je al voor gespaard hebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd of jullie ruimte hebben voor zo&apos;n feestpotje?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}en zie waar jullie geld nu naartoe gaat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoe een gezin een kerst- en verjaardagspot bouwde</a>.
      </p>
    </>
  );
}
