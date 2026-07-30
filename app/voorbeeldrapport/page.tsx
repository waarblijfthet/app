import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Voorbeeldrapport: zo ziet een geldrapport eruit",
  description:
    "Je koopt hier iets wat je niet kunt zien voordat je betaalt, en dat vind ik een slechte deal. Daarom staan hieronder twee complete rapporten in de vorm waarin ik ze schrijf: twee huishoudens, de drie plekken waar het weglekt, per plek wat ik zou doen en per plek wat het niet oplost.",
  alternates: { canonical: "https://www.waarblijfthet.nl/voorbeeldrapport" },
  openGraph: {
    title: "Voorbeeldrapport: zo ziet een geldrapport eruit",
    description:
      "Twee complete, fictieve voorbeeldrapporten: de drie plekken waar het weglekt, per plek wat ik zou doen en wat het niet oplost.",
    url: "https://www.waarblijfthet.nl/voorbeeldrapport",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Zo ziet een geldrapport eruit",
  description:
    "Twee complete, fictieve voorbeeldrapporten: de drie plekken waar het weglekt, per plek wat ik zou doen en wat het niet oplost.",
  url: "https://www.waarblijfthet.nl/voorbeeldrapport",
};

const p = { marginBottom: "1.1rem", fontWeight: 300, lineHeight: 1.7 } as const;
const h3 = {
  fontSize: "1.25rem",
  color: "#16211F",
  marginTop: "2.25rem",
  marginBottom: "0.9rem",
  fontWeight: 400,
} as const;

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border-2 p-5 mb-8"
      style={{ borderColor: "#F0D07A", backgroundColor: "#FDF3E3" }}
    >
      <p
        className="font-body text-xs font-medium uppercase tracking-widest mb-2"
        style={{ color: "#92600A" }}
      >
        Fictief voorbeeld
      </p>
      <p className="font-body text-sm leading-relaxed" style={{ color: "#6B4A0A", fontWeight: 300 }}>
        {children}
      </p>
    </div>
  );
}

interface Post {
  label: string;
  bedrag: string;
  percent: string;
}

function Maandoverzicht({
  posts,
  samen,
  vrij,
}: {
  posts: Post[];
  samen: Post;
  vrij: Post;
}) {
  return (
    <div className="mb-6">
      {posts.map((post) => (
        <div key={post.label} className="py-3 border-b border-[#E6E9E7]">
          <p className="font-body text-sm text-text-soft leading-relaxed mb-1.5">
            {post.label}
          </p>
          <div className="flex justify-between items-baseline font-body text-sm">
            <span className="font-medium text-primary">{post.bedrag} per maand</span>
            <span className="text-text-muted text-xs">{post.percent}</span>
          </div>
        </div>
      ))}
      <div className="py-3 border-b border-[#E6E9E7]">
        <div className="flex justify-between items-baseline font-body text-sm">
          <span className="font-medium text-primary">Samen</span>
          <span className="font-medium text-primary">{samen.percent}</span>
        </div>
        <p className="font-body text-sm text-text-soft">{samen.bedrag} per maand</p>
      </div>
      <div className="py-3">
        <div className="flex justify-between items-baseline font-body text-sm">
          <span className="font-medium" style={{ color: "#0B7A6E" }}>
            Wat er per maand vrij overblijft
          </span>
          <span className="font-medium" style={{ color: "#0B7A6E" }}>
            {vrij.percent}
          </span>
        </div>
        <p className="font-body text-sm" style={{ color: "#0B7A6E" }}>{vrij.bedrag} per maand</p>
      </div>
    </div>
  );
}

const reportOnePosts: Post[] = [
  {
    label:
      "Wonen: hypotheek 1.750, energie 245, water 25, gemeente en waterschap 78, opstal en inboedel 32",
    bedrag: "2.130 euro",
    percent: "34,9 procent",
  },
  {
    label: "Dagelijks: boodschappen 1.010, bezorgen en buiten de deur 260",
    bedrag: "1.270 euro",
    percent: "20,8 procent",
  },
  {
    label: "Vervoer: private lease 385, tweede auto 240, brandstof samen 290, ov 25",
    bedrag: "940 euro",
    percent: "15,4 procent",
  },
  {
    label:
      "Overige vaste lasten: zorgverzekering 296, telefoon en internet 115, streaming en abonnementen 68, sportschool 32, kleding volwassenen 110, cadeaus 70, huisdier 55, goede doelen 15",
    bedrag: "761 euro",
    percent: "12,5 procent",
  },
  {
    label: "Kinderen: opvang 420, sport en muziek 95, kleding 90",
    bedrag: "605 euro",
    percent: "9,9 procent",
  },
];
const reportOneSamen: Post = { label: "Samen", bedrag: "5.706 euro", percent: "93,5 procent" };
const reportOneVrij: Post = { label: "Vrij", bedrag: "394 euro", percent: "6,5 procent" };

const reportTwoPosts: Post[] = [
  {
    label: "Wonen: huur 1.395, energie 135, water 12, gemeente en waterschap 44, inboedel 14",
    bedrag: "1.600 euro",
    percent: "41,6 procent",
  },
  {
    label: "Dagelijks: boodschappen 420, lunch op het werk, bezorgen, uit eten en borrels 540",
    bedrag: "960 euro",
    percent: "24,9 procent",
  },
  {
    label:
      "Overige vaste lasten: zorgverzekering 152, telefoon 38, internet 45, streaming 61, sportschool 39, klimhal en padel 34, software en games 27, kleding 130, verzorging 45",
    bedrag: "571 euro",
    percent: "14,8 procent",
  },
  {
    label: "Vervoer: auto vast 185, brandstof 120",
    bedrag: "305 euro",
    percent: "7,9 procent",
  },
];
const reportTwoSamen: Post = { label: "Samen", bedrag: "3.436 euro", percent: "89,2 procent" };
const reportTwoVrij: Post = { label: "Vrij", bedrag: "414 euro", percent: "10,8 procent" };

export default function VoorbeeldrapportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Pagina-inleiding */}
        <section className="bg-background pt-14 pb-4">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Voorbeeld · fictief</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Zo ziet een geldrapport eruit
            </h1>
            <p style={p} className="text-text-soft">
              Je koopt hier iets wat je niet kunt zien voordat je betaalt, en
              dat vind ik een slechte deal. Daarom staan hieronder twee
              complete rapporten in de vorm waarin ik ze schrijf: twee
              huishoudens, de drie plekken waar het weglekt, per plek wat ik
              zou doen en per plek wat het niet oplost.
            </p>
            <p style={p} className="text-text-soft">
              Belangrijk: <strong className="text-primary">deze twee huishoudens bestaan niet.</strong>{" "}
              Ik heb ze zelf bedacht, inclusief alle bedragen, omdat ik geen
              cijfers van een klant publiceer zonder toestemming. Zodra een
              klant me toestemming geeft, komt daar een geanonimiseerd
              rapport van een echt huishouden bij te staan. Tot die tijd laat
              dit alleen zien hoe ik reken en schrijf, en dat is minder dan
              bewijs dat het werkt. Dat zeg ik er liever zelf bij.
            </p>
            <p style={p} className="text-text-soft">
              Wat er in beide rapporten opvalt: het zijn geen
              bezuinigingslijstjes. Bij het ene huishouden is de uitkomst dat
              er 64 euro per maand ontbreekt, bij het andere 118. In beide
              gevallen is dat een kleiner getal dan het gevoel dat eraan
              vooraf ging, en dat is meestal de eigenlijke opbrengst.
            </p>
          </div>
        </section>

        {/* Voorbeeldrapport 1: Sandra en Tom */}
        <section className="bg-background pt-8 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <Disclaimer>
              <strong>
                Dit is een samengesteld, fictief voorbeeld op basis van
                veelvoorkomende situaties, geen echte klant.
              </strong>{" "}
              De namen, de bedragen en de omstandigheden heb ik zelf bedacht
              om te laten zien hoe een geldrapport eruitziet en hoe ik reken.
              Er staat geen enkel bedrag in dat van een bestaand huishouden
              komt. Dit voorbeeld hoort niet bij de klantverhalen elders op
              deze site: die zijn van echte klanten en staan er met hun
              toestemming.
            </Disclaimer>

            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-1">
              Geldrapport voor Sandra en Tom (fictief)
            </h2>
            <p className="font-body text-text-muted text-sm mb-8">
              Opgesteld door Jarno Koopman · Waar blijft het
            </p>

            <h3 style={h3}>Wat je me stuurde</h3>
            <p style={p} className="text-text-soft">
              Twee inkomens, samen 6.100 euro netto per maand op de rekening.
              Koopwoning, twee kinderen van 7 en 10, twee auto&apos;s, twee
              dagen buitenschoolse opvang. Kinderbijslag komt per kwartaal en
              die heb ik apart gehouden, dus die zit niet in de 6.100.
            </p>
            <p style={p} className="text-text-soft">
              Wat je erbij schreef: er gaat elke maand 250 euro automatisch
              naar de spaarrekening en toch staat er aan het einde van het
              jaar niet meer op dan aan het begin. En dat jullie geen idee
              hebben hoe dat kan, omdat er niets geks gebeurt.
            </p>

            <h3 style={h3}>Wat ik zie, in één alinea</h3>
            <p style={p} className="text-text-soft">
              Er is niets geks aan de hand en jullie geven ook niet te veel
              uit aan één post. Wat er mis is, is de volgorde. Jullie zetten
              eerst geld weg voor later en betalen daarna de kosten die zeker
              komen, en die kosten zijn samen groter dan wat er na de
              maandlasten overblijft. Daardoor is de spaarrekening in de
              praktijk de rekening waarvan de vakantie, december en de
              dakgoot betaald worden. Dat is de reden dat het voelt alsof
              jullie niet sparen: jullie sparen wel, alleen wordt het er
              meteen weer afgehaald. Het gat is 64 euro per maand. Dat is een
              kleiner probleem dan het voelt, en het is een ander probleem
              dan jullie dachten.
            </p>

            <h3 style={h3}>Je maand, zoals ik hem heb opgeteld</h3>
            <Maandoverzicht posts={reportOnePosts} samen={reportOneSamen} vrij={reportOneVrij} />

            <h3 style={h3}>Lek 1: er is geen rekening voor de kosten die zeker komen</h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Jullie
              hebben per jaar 5.500 euro aan kosten die niet in de
              maandtabel staan en waarvan jullie nu al weten dat ze komen:
              vakantie 2.400, december en feestdagen 700, auto-onderhoud en
              onvoorziene reparaties 900, onderhoud aan het huis 1.200, en
              school, kamp en uitjes 300. Gedeeld door twaalf is dat 458
              euro per maand.
            </p>
            <p style={p} className="text-text-soft">
              Er is 394 euro per maand vrij. Er is 458 nodig. Het verschil
              is 64 euro per maand, 768 euro per jaar.
            </p>
            <p style={p} className="text-text-soft">
              En dan de 250 die naar de spaarrekening gaat. Die gaat er als
              eerste af, dus wat er echt vrij is voor de kosten hierboven is
              144 euro per maand, 1.728 per jaar. De resterende 3.772 euro
              komt van de spaarrekening. Jullie storten 3.000 per jaar en
              halen er 3.772 af, dus gemiddeld 314 euro per maand. Netto
              daalt jullie spaargeld met ongeveer 770 euro per jaar. Dat is
              precies wat jullie zien en niet konden verklaren.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong>{" "}
              Draai de volgorde om. Open een tweede rekening, noem hem wat
              jullie willen, en zet daar op de 25e 458 euro op. Zet de
              automatische spaaropdracht van 250 op nul totdat die rekening
              een heel jaar heeft rondgedraaid. Betaal de vakantie,
              december, de auto en het huis daarvandaan. Wat er na een jaar
              op die rekening overblijft, is jullie spaargeld. Sparen wordt
              dan wat overblijft, niet wat je vooruit belooft.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Geen euro. Dit verplaatst geld, het maakt geen geld. De 64
              euro die tekortkomt, komt hier niet vandaan; daarvoor zijn lek
              2 en lek 3. De winst is dat jullie stoppen met een
              spaarrekening die geen spaarrekening is, en dat jullie voor
              het eerst kunnen zien of het klopt of niet.
            </p>

            <h3 style={h3}>Lek 2: de tweede auto kost 2.880 euro per jaar en ik weet niet waarvoor</h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Vervoer
              is 940 euro per maand, 15,4 procent van jullie netto inkomen.
              Het grootste deel daarvan is helder: de private lease staat
              vast en de brandstof hoort bij de kilometers die jullie
              rijden. De post die ik niet kan plaatsen, is de tweede auto:
              240 euro per maand aan verzekering, wegenbelasting en
              onderhoudsreserve, dus 2.880 euro per jaar, en dat is geld dat
              weggaat of jullie hem gebruiken of niet.
            </p>
            <p style={p} className="text-text-soft">
              Je schreef dat die auto er is voor als jullie hem allebei
              nodig hebben. Dat is een echte reden. Alleen weet ik niet hoe
              vaak dat is, en dat is het enige dat hier telt. Als het acht
              keer per maand is, kost elke rit ongeveer 30 euro voordat er
              benzine in gaat.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong>{" "}
              Vier weken turven, letterlijk met een streepje op een
              papiertje op de koelkast: elke keer dat auto twee de oprit af
              gaat. Niets veranderen, alleen tellen. Bij meer dan vijftien
              keer per maand is die auto zijn geld waard en dan haal ik hem
              van deze lijst af. Blijft de teller onder de acht, dan is
              2.880 euro per jaar veel geld voor acht ritten, en dan is
              wegdoen een reële keuze die 240 euro per maand vrijmaakt. Dat
              is genoeg voor het gat uit lek 1 met 176 euro over om echt te
              sparen.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Als jullie hem houden, is dat prima en dan is dit geen lek
              maar een keuze. Maar dan moet het gat van 64 euro uit lek 3
              komen, want ergens moet het vandaan.
            </p>

            <h3 style={h3}>Lek 3: twee avonden per week zonder plan kosten 3.120 euro per jaar</h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Aan eten
              gaat 1.270 euro per maand, 20,8 procent van jullie netto
              inkomen. Boodschappen zijn 1.010 en daar zeg ik niets over:
              dat is een gezin van vier met twee kinderen die groeien, en ik
              ga jullie niet uitleggen dat het goedkoper kan. De post die
              eruit springt is de 260 euro aan bezorgen en buiten de deur.
              Op acht à negen keer per maand is dat ongeveer 30 euro per
              keer.
            </p>
            <p style={p} className="text-text-soft">
              Wat me opvalt aan het patroon dat je beschreef: het gebeurt op
              de twee opvangdagen. Dat is geen kwestie van discipline, dat
              is logistiek. Op de dagen dat jullie om kwart voor zes
              binnenkomen met twee kinderen die honger hebben, is bezorgen
              de enige optie die er nog is. Het lek zit dus niet in de avond
              zelf, het zit in de zondag waarop niemand die avond heeft
              ingepland.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong>{" "}
              Kook op zondag twee keer dubbel en zet die twee porties in de
              vriezer, gelabeld met de dag waarop ze bedoeld zijn. Niet vier
              keer, twee keer, want anders houdt het geen maand. Als dat
              lukt, gaat deze post ongeveer naar de helft: 130 euro per
              maand, 1.560 euro per jaar. Dat is meer dan het gat van 64
              euro uit lek 1, en dan hoeft de tweede auto er niet aan.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Dit is de post waar ik het minst hard over durf te zijn. 260
              euro per maand voor twee avonden rust in een week met twee
              werkende ouders kan een verstandige aankoop zijn, en als
              jullie dat vinden, dan vind ik het ook. Maar dan is het een
              gekozen post en geen onbedoelde, en dan moet het gat uit lek 2
              komen.
            </p>

            <h3 style={h3}>Wat ik niet als lek reken</h3>
            <p style={p} className="text-text-soft">
              De hypotheek van 1.750 euro. Dat is 28,7 procent van jullie
              netto inkomen en dat is de prijs van het huis waarin jullie
              wonen. Daar is niets aan te repareren zonder verhuizen, en
              verhuizen is geen budgetmaatregel.
            </p>
            <p style={p} className="text-text-soft">
              De opvang van 420 euro voor twee dagen. Dat is de prijs van
              twee banen, en die twee banen zijn samen 6.100 euro netto. Dit
              is de best renderende post in jullie hele overzicht.
            </p>
            <p style={p} className="text-text-soft">
              De zorgverzekering, het huisdier en de sportschool. Bij elkaar
              383 euro. Ik kan daar allemaal iets van afknabbelen en jullie
              zouden er niets van merken behalve dat het minder leuk wordt.
              Dat is niet waarvoor jullie mij vroegen.
            </p>

            <h3 style={h3}>Wat ik niet weet, en waar ik naast kan zitten</h3>
            <p style={p} className="text-text-soft">
              Ik heb gerekend met wat jullie hebben ingevuld, niet met wat
              er echt van de rekening ging. Als de boodschappen in
              werkelijkheid 1.150 zijn in plaats van 1.010, dan verandert
              het gat van 64 euro in 204 en is dit rapport te optimistisch.
              Dat is de meest waarschijnlijke fout in dit stuk. Ik weet ook
              niet of er posten zijn die jullie niet hebben genoemd, en ik
              weet niets over jullie hypotheek, verzekeringen of pensioen,
              want daar ga ik niet over.
            </p>
            <p style={p} className="text-text-soft">
              Ik beloof niet dat er geld te vinden is. In dit geval is er
              wel iets te vinden, maar de belangrijkste uitkomst is niet een
              bedrag: het is dat de reden waarom jullie spaargeld niet
              groeit, 64 euro per maand is en geen karakterfout.
            </p>

            <h3 style={h3}>De eerste week</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li style={p} className="text-text-soft">
                Tweede rekening openen en er 458 euro per maand op zetten.
                Spaaropdracht van 250 op nul.
              </li>
              <li style={p} className="text-text-soft">
                Papiertje op de koelkast voor auto twee. Vier weken tellen.
              </li>
              <li style={p} className="text-text-soft">
                Zondag twee porties koken en labelen met dinsdag en
                donderdag.
              </li>
            </ol>
            <p style={p} className="text-text-soft">
              Dat is alles. Als jullie na vier weken willen weten wat de
              teller zegt, mail dan gewoon.
            </p>
          </div>
        </section>

        {/* Voorbeeldrapport 2: Niels */}
        <section className="bg-card pt-10 pb-14">
          <div className="max-w-3xl mx-auto px-6">
            <Disclaimer>
              <strong>
                Dit is een samengesteld, fictief voorbeeld op basis van
                veelvoorkomende situaties, geen echte klant.
              </strong>{" "}
              De naam, de bedragen en de omstandigheden heb ik zelf bedacht
              om te laten zien hoe een geldrapport eruitziet en hoe ik reken.
              Er staat geen enkel bedrag in dat van een bestaand huishouden
              komt. Dit voorbeeld hoort niet bij de klantverhalen elders op
              deze site: die zijn van echte klanten en staan er met hun
              toestemming.
            </Disclaimer>

            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-1">
              Geldrapport voor Niels (fictief voorbeeld)
            </h2>
            <p className="font-body text-text-muted text-sm mb-8">
              Opgesteld door Jarno Koopman · Waar blijft het
            </p>

            <h3 style={h3}>Wat je me stuurde</h3>
            <p style={p} className="text-text-soft">
              38 jaar, alleenstaand, geen kinderen, vast contract. 3.850
              euro netto per maand. Huurwoning in de vrije sector, eigen
              auto die afbetaald is. Vakantiegeld komt in mei en dat heb ik
              apart gehouden.
            </p>
            <p style={p} className="text-text-soft">
              Wat je erbij schreef, en ik neem het letterlijk over omdat het
              de kern is: er is geen excuus. Geen scheiding, geen gezin,
              geen tegenslag, en toch staat er na acht jaar werken minder op
              de rekening dan je zou verwachten. En dat je daarom aanneemt
              dat het aan jou ligt.
            </p>

            <h3 style={h3}>Wat ik zie, in één alinea</h3>
            <p style={p} className="text-text-soft">
              Het ligt niet aan jou en ik kan dat met jouw eigen cijfers
              laten zien. Je zet elke maand 400 euro naar de spaarrekening,
              dat is 4.800 euro per jaar, en er gaat er 6.217 vanaf. Netto
              daalt je spaargeld met ongeveer 1.400 euro per jaar. Dat is
              geen gevoel en geen slordigheid, dat is een rekensom die niet
              uitkomt: de kosten die je één of twee keer per jaar hebt, zijn
              118 euro per maand groter dan wat er na je maandlasten over
              is. Zolang die 118 euro niet zichtbaar is, ziet elke poging om
              te sparen eruit als een mislukking.
            </p>

            <h3 style={h3}>Je maand, zoals ik hem heb opgeteld</h3>
            <Maandoverzicht posts={reportTwoPosts} samen={reportTwoSamen} vrij={reportTwoVrij} />

            <h3 style={h3}>Lek 1: je spaarrekening is de betaalrekening van je jaar</h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Naast je
              maandlasten heb je per jaar 6.385 euro aan kosten die er wel
              elk jaar zijn maar niet elke maand: twee vakanties 3.200,
              festivals en weekenden weg 900, cadeaus 400, het eigen risico
              van je zorgverzekering 385, fysio en tandarts boven de dekking
              200, onvoorziene autokosten 600, en een telefoon of laptop die
              het begeeft 700. Gedeeld door twaalf is dat 532 euro per
              maand.
            </p>
            <p style={p} className="text-text-soft">
              Er is 414 euro per maand vrij. Er is 532 nodig. Het gat is 118
              euro per maand, 1.416 euro per jaar.
            </p>
            <p style={p} className="text-text-soft">
              Omdat de automatische spaaropdracht van 400 euro er als eerste
              af gaat, is er van die 414 euro maar 14 euro over voor die
              jaarposten. De rest, 6.217 euro, komt van de spaarrekening. Je
              stort 4.800 en haalt er 6.217 af. Dat is de 1.400 euro per
              jaar die je kwijtraakt terwijl je het gevoel hebt dat je
              spaart.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong> Zet
              de spaaropdracht van 400 op nul. Open een tweede rekening en
              zet daar op de 25e 532 euro op. Dat gaat niet lukken, want er
              is maar 414. En dat is precies de bedoeling: dan zie je in de
              eerste maand dat er 118 euro ontbreekt, in plaats van dat je
              het elf maanden later terugvindt als een lager spaarsaldo. 118
              euro per maand is een probleem dat je kunt oplossen.
              &ldquo;Ik kan niet sparen&rdquo; is dat niet.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Nul euro. Dit maakt het gat zichtbaar, het dicht het niet. Lek
              2 en lek 3 gaan daarover, en die zijn samen ruim genoeg.
            </p>

            <h3 style={h3}>
              Lek 2: eten is na je huur je grootste post, en de goedkoopste
              helft is het duurst
            </h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Aan eten
              gaat 960 euro per maand, 24,9 procent van je netto inkomen.
              Dat is meer dan je auto, je energie en je zorgverzekering bij
              elkaar, en die zijn samen 592 euro.
            </p>
            <p style={p} className="text-text-soft">
              Binnen die 960 zit 420 aan boodschappen en 540 aan alles wat
              buiten de deur gebeurt. Dat is niet één post, dat zijn twee
              heel verschillende dingen. Uit wat je invulde haal ik dat er
              ongeveer 198 euro per maand naar lunch op het werk gaat,
              ruwweg 22 werkdagen maal 9 euro. De rest, ongeveer 340 euro,
              is uit eten, borrels en bezorgen in het weekend.
            </p>
            <p style={p} className="text-text-soft">
              Dat verschil is het hele punt. Van die 340 euro haal je iets:
              dat zijn je vrijdagavonden en je etentjes, en dat is waar een
              salaris voor is. Van de 198 euro haal je niets. Je staat in
              een rij, je eet iets in twintig minuten en je denkt er nooit
              meer aan.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong>{" "}
              Snijd in de post die geen uitje is en laat de post die dat wel
              is met rust. Als de lunch van 198 euro naar ongeveer 60 euro
              gaat, komt er 138 euro per maand vrij, en dat is meer dan het
              gat van 118 uit lek 1. Verder niets. Geen bezorgverbod, geen
              weekendbudget.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Dit vraagt vier keer per week een handeling van vijf minuten en
              het is de saaiste aanbeveling in dit rapport. Als je weet dat
              je dat niet gaat volhouden, zeg dat dan tegen jezelf en pak
              lek 3, want dat is een eenmalige klus.
            </p>

            <h3 style={h3}>
              Lek 3: 161 euro per maand aan abonnementen, en ik denk dat je
              er de helft niet gebruikt
            </h3>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zie.</strong> Vijf
              streamingdiensten 61 euro, sportschool 39, klimhal en padel
              34, software en games 27. Samen 161 euro per maand, 1.932
              euro per jaar. Je gaf zelf al aan dat je drie van de vijf
              streamingdiensten eigenlijk niet meer opent, en dat je sinds
              je bent gaan klimmen bijna niet meer in de sportschool komt.
            </p>
            <p style={p} className="text-text-soft">
              Dit is het enige lek in dit rapport dat je in één avond kunt
              oplossen en dat daarna nooit meer aandacht vraagt.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat ik zou doen.</strong> Eén
              A4, één regel per abonnement, en achter elke regel de datum
              waarop je hem voor het laatst gebruikt hebt. Alles wat langer
              dan zes weken stilstaat, deze week opzeggen. Op basis van wat
              je hebt ingevuld, verwacht ik dat daar 55 tot 70 euro per
              maand uit komt. Dat is mijn schatting op jouw eigen antwoorden
              en geen belofte: het kan ook 30 zijn als je die diensten meer
              gebruikt dan je dacht.
            </p>
            <p style={p} className="text-text-soft">
              <strong className="text-primary">Wat dit niet oplost.</strong>{" "}
              Het is een eenmalige winst en daarna zit je op het nieuwe
              niveau. Over een jaar staan er weer nieuwe abonnementen. Zet
              er daarom nu een herinnering in je agenda voor over twaalf
              maanden, dan hoef je dit niet nog eens te ontdekken.
            </p>

            <h3 style={h3}>Wat ik niet als lek reken</h3>
            <p style={p} className="text-text-soft">
              De huur van 1.395 euro, 36,2 procent van je netto inkomen. Dat
              is hoog, en dat is niet omdat je iets verkeerd doet. Dat is de
              prijs van alleen wonen: dezelfde woning, dezelfde
              energierekening, dezelfde gemeentelijke lasten, en één
              inkomen om het van te betalen. Je hebt geen tweede salaris om
              de vaste lasten mee te delen en dat kun je niet oplossen met
              beter opletten. Dit is het antwoord op je vraag waarom het
              niet klopt terwijl je genoeg verdient, en het is een
              structurele reden en geen persoonlijke.
            </p>
            <p style={p} className="text-text-soft">
              De auto van 305 euro. Voor 7,9 procent van je inkomen heb je
              vrijheid, en het is een van de kleinste posten in je
              overzicht. Ik zou er niet aan beginnen.
            </p>
            <p style={p} className="text-text-soft">
              Je vakanties van 3.200 euro per jaar. Ik ga je niet vertellen
              dat je minder op reis moet. Ik ga je vertellen dat je die
              3.200 euro per maand moet reserveren in plaats van in mei te
              ontdekken dat het geld er niet is.
            </p>

            <h3 style={h3}>Wat ik niet weet, en waar ik naast kan zitten</h3>
            <p style={p} className="text-text-soft">
              De verdeling binnen die 540 euro buiten de deur heb ik geschat
              op basis van wat je hebt opgeschreven, en dat is de zwakste
              plek in dit rapport. Als de lunch in werkelijkheid 90 euro is
              en de weekenden 450, dan werkt mijn aanbeveling voor lek 2
              niet en moet het uit lek 3 en uit een derde plek komen. Kijk
              dat na op je eigen afschriften voordat je iets verandert. Ik
              weet ook niet wat er in mei met je vakantiegeld gebeurt, en
              dat is potentieel een vierde lek dat ik nu niet kan zien.
            </p>
            <p style={p} className="text-text-soft">
              Wat ik wel met zekerheid kan zeggen, omdat het rekenkunde is
              en geen inschatting: er ontbreekt 118 euro per maand en je
              spaargeld daalt daardoor met ongeveer 1.400 euro per jaar. Dat
              is geen karakter, dat is een tekort van 3 procent van je
              inkomen.
            </p>

            <h3 style={h3}>De eerste week</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li style={p} className="text-text-soft">
                Spaaropdracht van 400 op nul. Tweede rekening openen, 532
                euro per maand erop, en accepteren dat de eerste maand 118
                euro roodstaat op die rekening. Dat getal is je opdracht.
              </li>
              <li style={p} className="text-text-soft">
                Eén avond, één A4, alle abonnementen met de laatste
                gebruiksdatum erachter. Opzeggen wat stilstaat.
              </li>
              <li style={p} className="text-text-soft">
                Vier keer brood mee. Niet vijf, dan houdt het geen maand.
              </li>
            </ol>
            <p style={p} className="text-text-soft">
              Als je na vier weken wilt weten of het gat gedicht is, mail
              dan gewoon.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
