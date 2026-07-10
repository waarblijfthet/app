import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SpaardoelenMaandelijkseInleg() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Een spaardoel maakt sparen concreet: je weet wat je wil, wanneer je het nodig hebt, en wat je maandelijks opzij zet",
            "Drie categorieën die voor elk gezin relevant zijn: noodbuffer, grote terugkerende uitgaven en vakantie/feestdagen",
            "15.000 euro in drie jaar is 417 euro per maand, klinkt als veel, maar is gewoon eerlijk rekenen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Sparen zonder doel is een beetje zoals afvallen zonder te weten hoeveel
        je wilt afvallen. Je begint eraan, maar je weet niet wanneer je klaar
        bent. En dus stop je eerder dan je zou willen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het probleem is niet dat mensen niet willen sparen. Het probleem is dat
        sparen abstract voelt. Een spaardoel geeft het concreet. Je weet wat je
        wil, je weet wanneer je het nodig hebt, en je weet wat je maandelijks
        opzij moet zetten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Klinkt logisch. En toch doet meer dan een kwart van de Nederlandse
        huishoudens het niet, blijkt uit onderzoek van Deloitte uit 2024.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is een spaardoel precies?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een spaardoel is simpel: een bedrag dat je wil hebben, op een moment
        dat je het nodig hebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het kan groot zijn, een verbouwing van 15.000 euro over drie jaar, of
        klein: een buffer van 2.000 euro voor onverwachte kosten. Beide zijn
        spaardoelen. Het enige verschil is het bedrag en de tijdslijn.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat een spaardoel doet, is je dwingen om te rekenen. En als je rekent,
        kom je erachter dat het meevalt. 15.000 euro over drie jaar is 417 euro
        per maand. Dat klinkt als veel. Maar 2.000 euro noodbuffer in tien
        maanden is 200 euro per maand. Dat is één avondje uit dat je bewust
        niet doet.
      </p>

      <h2 className="font-display" style={h2}>
        Welke spaardoelen heeft een gemiddeld gezin?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn drie categorieën die voor bijna elk gezin relevant zijn.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De eerste is de noodbuffer. Financieel adviseurs adviseren drie tot zes
        maanden netto gezinsinkomen. Bij een inkomen van 4.500 euro netto is
        dat 13.500 tot 27.000 euro. Dat klinkt als een berg geld. Begin klein:
        een buffer van 2.000 euro is al genoeg om de meeste vervelende
        verrassingen op te vangen zonder in de stress te schieten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De tweede categorie zijn terugkerende grote uitgaven die mensen niet
        meenemen in hun maandbudget. Denk aan de auto die ooit APK nodig heeft
        of kapot gaat, een nieuwe wasmachine, een vakantie. Die zijn helemaal
        niet onverwacht, ze komen altijd. Toch betaalt bijna iedereen ze uit
        het maandsalaris als ze zich aandienen, waarna de maand plots veel
        krapper is dan normaal.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De derde categorie zijn echt grote doelen op langere termijn.
        Verbouwing, studie van de kinderen, eerder stoppen met werken.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe bereken je je maandelijkse inleg?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De formule is simpel: doelbedrag gedeeld door het aantal maanden dat je
        hebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je over twee jaar op vakantie voor 3.000 euro? Dat is 3.000 gedeeld
        door 24 maanden, ofwel 125 euro per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het slimste wat je kunt doen is meerdere spaardoelen tegelijk runnen in
        aparte potjes. Niet alles op één spaarrekening gooien, maar echt per
        doel een rekening of subrekening. Veel banken bieden dit aan. Als je
        ziet dat het vakantiegeld groeit, houd je het makkelijker vast.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Automatiseer de inleg. Stel een automatische overschrijving in op de
        dag dat je salaris binnenkomt, niet aan het einde van de maand met wat
        er dan toevallig over is. Sparen wat overblijft werkt zelden. Sparen
        wat je van tevoren apart zet, werkt altijd beter.
      </p>

      <h2 className="font-display" style={h2}>
        Wat als je te weinig ruimte hebt om te sparen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is de vraag die de meeste mensen tegenhouden. Ze denken: ik heb
        niks over, dus ik kan niet sparen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar dat klopt bijna nooit letterlijk. Het klopt dat er weinig overblijft
        na alle uitgaven. Maar de vraag is of alle uitgaven werkelijk noodzakelijk
        zijn, of dat er een aantal automatisch zijn gaan lopen die je nooit
        bewust hebt goedgekeurd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een abonnement dat je niet meer gebruikt, een verzekering die je dubbel
        hebt, een telefoonabonnement dat je al twee jaar te duur betaalt. Zelfs
        50 euro per maand vrijmaken om te beginnen is al iets. Het gaat niet om
        het bedrag. Het gaat om het patroon.
      </p>
      <p className="font-body text-text-soft" style={p}>
        In de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          analyse
        </Link>{" "}
        zie je direct{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          waar jouw ruimte zit
        </Link>{" "}
        om maandelijks meer opzij te zetten.
      </p>

      <h2 className="font-display" style={h2}>
        Het verschil dat een jaar maakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Stel je zet 150 euro per maand apart voor je noodbuffer. Na een jaar
        heb je 1.800 euro. Na twee jaar 3.600 euro. Dat is een auto-reparatie,
        een kapotte wasmachine, en een tand bij de tandarts zonder dat je
        rekening rood gaat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is niet sexy. Maar het is het verschil tussen een tegenslag die je
        opvangt en een tegenslag die je maandlang stress bezorgt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Herken je het gevoel van goed verdienen maar toch weinig overhouden?{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          Lees ook: goed salaris, toch krap
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je een stok achter de deur? Onze{" "}<Link href="/aanbod" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">begeleiding</Link>{" "}houdt je zes weken lang scherp.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> Het gezin dat ik hielp met de feestmaanden zette pas écht door toen het doel concreet werd: een kerstpot van een vast bedrag, klaar in december. Een spaardoel zonder bedrag en zonder datum blijft een wens, met allebei wordt het ineens iets wat je gewoon doet.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin spaarde voor de feestmaanden</a>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/53-weken-spaaruitdaging-schema-2026" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">de 53-weken spaaruitdaging</Link>.</p>
    </>
  );
}
