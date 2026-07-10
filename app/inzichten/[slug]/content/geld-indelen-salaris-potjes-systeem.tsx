import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GeldIndelenSalarisPotjesSysteem() {
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
          Je salaris komt binnen op één rekening, en daar betaal je alles van. Aan het einde van de maand kijk je wat er nog staat, en dat valt elke keer tegen.
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
            "Waarom je salaris op één rekening laten staan bijna altijd misgaat",
            "Hoe je met een paar rekeningen en potjes je geld op de dag van je salaris al verdeelt",
            "Hoeveel je idealiter opzij zet en hoe je sparen automatisch maakt in plaats van een keuze",
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
        De meeste mensen krijgen hun salaris op één rekening, en betalen daar alles van: vaste
        lasten, boodschappen, leuke dingen en wat er toevallig nog langskomt. Wat overblijft, blijft
        over. En meestal blijft er weinig over, want zolang alles op één hoop staat, voelt elke euro
        beschikbaar. Een potjessysteem draait dat om: je verdeelt je geld vóórdat je het uitgeeft.
      </p>

      <h2 className="font-display" style={h2}>
        Jezelf eerst betalen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het principe heet jezelf eerst betalen. Niet sparen wat er aan het einde van de maand
        overblijft, maar aan het begin een vast bedrag wegzetten en de rest verdelen over je
        uitgaven. Dat klinkt als een klein verschil, maar het draait de logica volledig om. Sparen
        wordt geen restpost meer, maar de eerste betaling die je doet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud adviseert om ongeveer 10 procent van je netto-inkomen te sparen. In werkelijkheid
        komt de gemiddelde Nederlander niet verder dan zo&apos;n 6,5 procent, juist omdat het van
        de restpost moet komen. Wie het vaste bedrag vooraf afroomt, haalt die 10 procent veel
        makkelijker.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel rekeningen heb je nodig?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je hebt geen ingewikkeld systeem nodig. Voor de meeste huishoudens werkt een opzet met drie
        of vier rekeningen het beste.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een vaste-lastenrekening waar al je vaste lasten van afschrijven, en waar je salaris als
        eerste binnenkomt. Een huishoudrekening of aparte pas voor dagelijkse uitgaven zoals
        boodschappen en tanken, waar je per week of per maand een vast bedrag op zet. Een
        spaarrekening voor je buffer en spaardoelen. En eventueel een aparte rekening of potje voor
        de jaarlijkse en onregelmatige uitgaven, zodat de verzekeringspremie of de gemeentelijke
        aanslag je nooit meer verrast.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Veel banken laten je binnen één rekening losse potjes aanmaken. Of je nu losse rekeningen
        of potjes gebruikt maakt niet uit, het effect is hetzelfde: geld krijgt een bestemming
        voordat je het ziet als vrij besteedbaar.
      </p>

      <h2 className="font-display" style={h2}>
        Automatiseren op de dag van je salaris
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De kern van het systeem is dat je het niet elke maand opnieuw hoeft te beslissen. Zet
        automatische overboekingen klaar op of net na de dag dat je salaris binnenkomt. Op die ene
        dag verhuist het geld naar je dagelijkse rekening, je spaarrekening en je potje voor
        onregelmatige uitgaven. Wat dan nog op je hoofdrekening staat, is wat je vrij kunt besteden, en dat mag op. Heb je een wisselend inkomen als zzp&apos;er? Verdeel dan op een vaste dag per maand vanuit je buffer, in plaats van op de dag dat een factuur toevallig betaald wordt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit is hetzelfde principe als de potjesmethode die veel gezinnen gebruiken. Hoe dat er voor
        een gezin uitziet, lees je in mijn artikel over de{" "}
        <Link
          href="/inzichten/potjesmethode-gezin-hoe-werkt-het"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          potjesmethode voor een gezin
        </Link>
        . Wil je weten hoe je je inkomen verdeelt over vaste lasten, vrij besteedbaar en sparen, dan
        helpt de{" "}
        <Link
          href="/inzichten/50-30-20-regel-hoger-inkomen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          50/30/20-regel
        </Link>{" "}
        je op weg.
      </p>

      <h2 className="font-display" style={h2}>
        Eerst de buffer, dan de doelen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voordat je voor leuke doelen gaat sparen, bouw je een buffer op. Het Nibud houdt drie tot
        zes maanden vaste lasten aan als gezonde reserve. Die buffer vangt de kapotte wasmachine en
        de tegenvaller op, zodat je niet elke keer je maandbudget hoeft te plunderen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Staat de buffer, dan komen de doelen. Geef elk doel een eigen potje met een naam en een
        bedrag per maand. Een doel met een naam wordt veel vaker gehaald dan een vaag voornemen om
        te sparen. Hoeveel je per maand opzij moet zetten voor een concreet doel, reken je na in
        mijn artikel over{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          spaardoelen en maandelijkse inleg
        </Link>
        . En of je genoeg opzij zet, zie je in{" "}
        <Link
          href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel sparen per maand normaal is
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
          Voordat je gaat verdelen, wil je weten met welke bedragen je werkt. De gratis analyse
          laat zien wat er na je vaste lasten overblijft, zodat je weet hoeveel er per potje kan.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
