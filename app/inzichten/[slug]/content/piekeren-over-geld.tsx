import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function PiekerenOverGeld() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom je wakker kunt liggen van geld terwijl het op papier goed gaat",
            "Waarom piekeren de onrust niet wegneemt en overzicht wel",
            "Een eerste stap om het uit je hoofd te krijgen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Het is niet zo dat je rekeningen niet kunt betalen. Op papier gaat het
        prima. En toch lig je er soms wakker van, of schiet het door je hoofd op
        een moment dat je eigenlijk zou willen ontspannen. Geld als een zeurende
        onrust op de achtergrond.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: piekeren over geld terwijl het goed gaat komt zelden door een
        tekort, en bijna altijd door onzekerheid en een gebrek aan overzicht. Je
        gevoel heeft geen cijfers om op te leunen, dus het vult de leegte met
        zorgen. Overzicht neemt die onrust weg, piekeren niet.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom je wakker ligt terwijl het eigenlijk goed gaat
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Onrust ontstaat niet door hoeveel je hebt, maar door hoeveel je weet. Als
        je niet precies overziet wat er binnenkomt, wat eruit gaat en wat er
        overblijft, vult je hoofd dat gat met een vaag gevoel dat het misschien
        niet klopt. Dat gevoel staat los van je werkelijke situatie. Daarom kun je
        objectief prima zitten en je toch voortdurend zorgen maken. Dit vertekende
        beeld heeft een naam, lees{" "}
        <Link href="/inzichten/money-dysmorphia-uitleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">money dysmorphia uitgelegd</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Piekeren lost niets op, overzicht wel
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Piekeren voelt alsof je met het probleem bezig bent, maar het verandert
        niets aan je situatie. Het draait in kringetjes, meestal op momenten dat
        je er niets aan kunt doen. Overzicht doorbreekt dat: zodra je zwart op wit
        ziet hoe je ervoor staat, heeft je hoofd iets concreets om op te rusten en
        stopt het met invullen. De onrust maakt plaats voor een feit.
      </p>

      <h2 className="font-display" style={h2}>
        Zet het uit je hoofd en op papier
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De eerste stap is klein en concreet: pak de afschriften van de laatste
        twee maanden en zet drie dingen op een rij, je vaste lasten, je dagelijkse
        uitgaven en wat er overblijft. Alleen al het opschrijven haalt de zorg uit
        de vage sfeer en maakt er iets van dat je kunt bekijken en bijsturen. Vaak
        valt het mee, en waar het niet meevalt weet je tenminste waar je staat.
        Meer hierover in{" "}
        <Link href="/inzichten/grip-op-je-geld-krijgen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">grip op je geld krijgen</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer het meer is dan geld alleen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Soms staat geld niet op zichzelf, maar hoort het bij een bredere periode
        van stress of piekeren die je slaap en je rust raakt. Merk je dat de
        onrust dieper zit dan de cijfers, praat er dan over met iemand die je
        vertrouwt of met je huisarts. Overzicht in je geld kan helpen, maar het is
        geen vervanging voor die steun als je hoofd om meer vraagt.
      </p>

      <h2 className="font-display" style={h2}>
        De eerste stap is inzicht
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wil je van het vage gevoel af en gewoon zien hoe je ervoor staat? Doe de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>{" "}en vergelijk je uitgaven met vergelijkbare huishoudens. Vaak is de opluchting dat het beter zit dan het voelde.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook{" "}
        <Link href="/inzichten/goed-salaris-toch-geldstress" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch geldstress</Link>.
      </p>
    </>
  );
}
