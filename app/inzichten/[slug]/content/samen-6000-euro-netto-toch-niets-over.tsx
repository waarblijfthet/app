import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Samen6000EuroNettoTochNietsOver() {
  return (
    <>
      <SalarisRekenaar
        startInkomen={6000}
        startVolwassenen={2}
        startKinderen={2}
        kop="Kort antwoord: bij €6.000 netto samen ligt het bijna nooit aan één grote post."
        intro="Bij twee inkomens en dit bedrag zijn de vaste lasten zelden het probleem. Wat er meestal wél speelt: de jaaruitgaven waar niemand voor reserveert, en het feit dat jullie twee verschillende verhalen hebben over waar het blijft. Zet je eigen situatie hieronder."
      />

      <p className="font-body text-text-soft" style={p}>
        Twee inkomens, samen ergens tussen de €5.000 en €7.500 netto, geen schulden, alle rekeningen op
        tijd. En toch staat er aan het einde van de maand minder dan je zou verwachten, en groeit het
        spaargeld niet zoals het volgens jullie zou moeten. Dit artikel gaat over precies dat huishouden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ik heb vijf huishoudens compleet doorgerekend en er rapporten over geschreven. Twee ervan zitten
        exact op dit niveau. Bij beide was mijn conclusie dat er geen lek was. Dat is geen ontwijkend
        antwoord, dat is de uitkomst, en het verandert wat je eraan moet doen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom twee inkomens fiscaal gunstig zijn en het toch niet zo voelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Begin met het goede nieuws, want dat wordt zelden verteld. €6.000 netto uit twee inkomens kost
        aanzienlijk minder bruto dan €6.000 netto uit één inkomen. Ieder van jullie gebruikt zijn eigen
        heffingskortingen en zijn eigen lagere belastingschijven. Een eenverdiener die hetzelfde bedrag
        binnenhaalt, zit met een flink deel van zijn salaris in de tweede schijf en levert daar bijna de
        helft van elke extra euro in.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Fiscaal doen jullie het dus goed. Waarom voelt het dan niet zo? Omdat er tegenover dat voordeel
        drie dingen staan die met twee inkomens juist ongunstiger zijn.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>Toeslagen zijn weg, en ze verdwenen precies
        toen jullie het samen goed gingen doen.</strong> Apart had ieder van jullie er misschien nog recht
        op, samen valt alles weg, terwijl de maandlasten juist omhoog gingen. Dat mechanisme staat
        uitgewerkt in{" "}
        <Link href="/inzichten/samen-te-veel-verdiend-toeslag-kwijt" className="hover:underline" style={{ color: "#0B7A6E" }}>
          samen net te veel verdiend
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>Twee inkomens gaven een hogere maximale
        hypotheek, en die ruimte is gebruikt.</strong> Bij vrijwel elk huishouden op dit niveau is de
        woonlast op twee inkomens gebaseerd. Dat is geen fout, maar het betekent dat het tweede inkomen niet
        vrij besteedbaar is: het zit al vast in de stenen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>Het tweede inkomen brengt eigen kosten
        mee.</strong> Opvang, een tweede auto of extra reiskosten, en de gemaksuitgaven van twee mensen die
        allebei weinig tijd hebben. Wat er netto van dat tweede inkomen overblijft is soms verrassend
        weinig, en dat rekenen we bijna nooit door. Zie{" "}
        <Link href="/inzichten/tweede-inkomen-loont-niet-tweeverdieners" className="hover:underline" style={{ color: "#0B7A6E" }}>
          tweede inkomen loont niet
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Bij dit inkomen is er meestal geen lek. Dat is de belangrijkste bevinding.
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is wat ik bij de twee huishoudens op dit niveau werkelijk vond, en het was in beide gevallen
        niet wat zij verwachtten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het stel zonder kinderen, samen €6.990 netto, dacht dat ze te makkelijk geld uitgaven en miste 700
        tot 900 euro per maand. Er was niets mis. Hun uitgaven pasten alleen niet bij het spaardoel dat ze
        er tegelijk naast hielden: €40.000 eigen geld binnen drie jaar vraagt €1.110 per maand, en dat past
        niet naast de reizen die ze niet wilden schrappen. De conclusie was dus geen bezuiniging maar een
        keuze. Na drie maanden schreven ze: &ldquo;De belangrijkste verandering was dat we zijn gestopt met
        zoeken naar iets dat financieel mis zou zijn.&rdquo;
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het gezin met drie kinderen, samen €7.880 netto, had ook geen enkele buitensporige vaste last. Daar
        zat het in de combinatie van veel vrij besteedbare uitgaven en bijna €1.000 per maand aan
        voorspelbare jaaruitgaven waarvoor niet werd gereserveerd, terwijl er wel €1.000 per maand naar de
        spaarrekening ging die er halverwege de maand weer afging.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Twee huishoudens, twee keer geen lek, twee keer een ander antwoord. Bij het ene botste de
        levensstijl met het doel, bij het andere waren de jaaruitgaven onzichtbaar. Dat is waarom
        bezuinigingslijstjes op dit niveau niet werken: ze lossen een probleem op dat er niet is.
      </p>

      <h2 className="font-display" style={h2}>
        De jaaruitgaven: de post die in geen enkele maandbegroting staat
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Reken het eens uit voor jullie eigen jaar. Vakantie, korte trips, december en verjaardagen,
        onderhoud aan het huis, de auto die op moet, een bruiloft, meubels, een fiets voor de oudste. Bij de
        huishoudens die ik doorrekende kwam dat uit tussen de €8.900 en €11.600 per jaar, en dat is €740 tot
        €970 per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat bedrag verschijnt nergens in je maandoverzicht. Het wordt betaald van de spaarrekening, precies
        op het moment dat het zich voordoet. Daardoor lijkt het alsof sparen niet lukt, terwijl er wel
        gespaard wordt: het geld wordt alleen weer opgehaald. Dat is het patroon waar je in vastzit als je
        elke maand geld wegzet en het spaargeld aan het einde van het jaar niet hoger staat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De oplossing is niet minder uitgeven. De oplossing is de volgorde omdraaien: eerst de bekende
        jaaruitgaven naar een aparte rekening, en wat daarna overblijft is pas echt spaargeld. Bij twee van
        de vijf huishoudens was dat de hele ingreep. Meer daarover in{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" className="hover:underline" style={{ color: "#0B7A6E" }}>
          de potjesmethode
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Jullie hebben allebei een ander verhaal over waar het geld blijft
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het onderdeel dat je nergens anders leest en dat bij twee inkomens bijna altijd meespeelt.
        Vraag het elkaar eens los van elkaar: waar denk jij dat het geld blijft? De kans is groot dat jullie
        twee verschillende antwoorden geven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij het gezin met drie kinderen schreef de een: boodschappen en de kinderen. De ander: alle losse
        uitgaven, bestellen, uit eten, kleding, spullen voor huis en kinderen, weekendjes. Na drie maanden
        meten schreven ze: &ldquo;Vooral mijn partner bleek gelijk te hebben: er was niet één groot lek,
        maar veel losse bedragen.&rdquo;
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat verschil is geen ruzie, het is informatie. Degene die de boodschappen doet ziet dat bedrag en
        overschat het daardoor. Degene die de losse dingen koopt ziet elk bedrag apart en onderschat de
        optelsom. Beide beelden zijn incompleet, en zolang jullie er niet één beeld van maken, praten jullie
        langs elkaar heen over een probleem dat geen van beiden helemaal ziet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praktisch: schrijf ieder apart op wat je denkt dat er per maand naar boodschappen, naar losse
        aankopen en naar vrije tijd gaat. Kijk dan samen naar drie maanden afschriften. Het verschil tussen
        jullie twee schattingen is vaak informatiever dan het verschil met een gemiddelde. Hoe je dat
        gesprek voert zonder dat het over verwijten gaat, staat in{" "}
        <Link href="/inzichten/praten-over-geld-met-je-partner" className="hover:underline" style={{ color: "#0B7A6E" }}>
          praten over geld met je partner
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat wil je dat er overblijft, en waarom?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zonder antwoord op die vraag is €500 over per maand zowel prima als veel te weinig. Heb je een
        buffer, bouw je pensioen op en leef je zoals je wilt, dan is er misschien niets aan de hand. Wil je
        over drie jaar €50.000 eigen geld hebben om groter te wonen, dan heb je een probleem dat niets met
        je uitgavenpatroon te maken heeft: dan vraagt je doel €1.390 per maand en moet je kiezen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is precies wat het stel zonder kinderen te horen kreeg, en het was de nuttigste uitkomst van
        hun rapport. Niet een lijst met dingen die ze fout deden, maar een som die duidelijk maakte welke
        keuze eronder lag. Zet dus eerst het doel neer met een bedrag en een termijn, en reken dan terug
        naar wat dat per maand vraagt. Daarna weet je of je een uitgavenprobleem hebt of een
        verwachtingsprobleem, en dat zijn twee verschillende dingen.
      </p>

      {/* Echte rapporten */}
      <div className="rounded-xl border p-5 my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          De twee rapporten waar dit artikel op gebaseerd is
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Compleet te lezen: hun ingevulde cijfers, wat ze vooraf zelf dachten, wat ik erop schreef en wat
          er drie maanden later werkelijk was veranderd. Gepubliceerd met toestemming, namen weggelaten,
          bedragen onveranderd.
        </p>
        <div className="space-y-3">
          <Link
            href="/rapporten/stel-zonder-kinderen"
            className="block rounded-lg px-4 py-3 transition-colors hover:border-[#0B7A6E]"
            style={{ border: "1px solid #E6E9E7", textDecoration: "none" }}
          >
            <p className="font-body font-medium text-sm" style={{ color: "#16211F" }}>
              Stel eind 30, geen kinderen, samen €6.990 netto &rarr;
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
              Uitkomst: geen lek. De levensstijl botste met het spaardoel. Geen vervolggesprek nodig.
            </p>
          </Link>
          <Link
            href="/rapporten/tweeverdieners-drie-kinderen"
            className="block rounded-lg px-4 py-3 transition-colors hover:border-[#0B7A6E]"
            style={{ border: "1px solid #E6E9E7", textDecoration: "none" }}
          >
            <p className="font-body font-medium text-sm" style={{ color: "#16211F" }}>
              Gezin met drie kinderen van 9, 12 en 14, samen €7.880 netto &rarr;
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
              Uitkomst: geen buitensporige vaste last. Na drie maanden bleef ongeveer €850 per maand echt
              staan.
            </p>
          </Link>
        </div>
      </div>

      <h2 className="font-display" style={h2}>
        Wat je vanavond kunt doen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie dingen, in deze volgorde, en de eerste twee kosten samen een half uur.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zet in de rekenaar bovenaan jullie eigen huishoudinkomen en huishouden, en vul in wat er werkelijk
        overblijft. Tel daarna jullie jaaruitgaven voor dit jaar bij elkaar op en deel door twaalf. Bij de
        meeste huishoudens op dit niveau is dat bedrag groter dan wat er per maand vrij overblijft, en
        daarmee is het raadsel meestal opgelost.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En schrijf ieder apart op waar je denkt dat het geld blijft. Vergelijk die twee antwoorden voordat
        je naar de afschriften kijkt. Als jullie het eens zijn, weet je waar je moet beginnen. Als jullie
        het oneens zijn, heb je net iets belangrijkers ontdekt dan een bedrag.
      </p>
    </>
  );
}
