import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import {
  berekenVuistregel,
  omslagpunt,
  euro,
} from "@/lib/salaris-vuistregel";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";

/**
 * Content voor "niet-rondkomen-met-4000-euro-netto".
 *
 * Onderscheid met is-4000-euro-netto-goed-salaris-nederland (17-aug-2026,
 * docs/artikel-bouwprompts-aug-2026.md, klus 4): dat artikel beantwoordt of
 * €4.000 netto goed is. Dit artikel beantwoordt waarom de som bij een gezin
 * met twee kinderen op precies dat bedrag niet uitkomt. Geen enkele alinea
 * hieronder herhaalt het "is het goed"-oordeel, en de bedragensectie met alle
 * huishoudens van €3.500 tot €4.600 staat bewust alleen op de andere pagina.
 *
 * Alle bedragen komen uit lib/salaris-vuistregel.ts via berekenVuistregel() en
 * omslagpunt(), nooit met de hand getypt, werkregel 2.
 */

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const INKOMEN = 4000;

const gezin = berekenVuistregel({ inkomen: INKOMEN, volwassenen: 2, kinderen: 2, auto: "eigen" });
const samenZonderKinderen = berekenVuistregel({
  inkomen: INKOMEN,
  volwassenen: 2,
  kinderen: 0,
  auto: "eigen",
}).verwachtOver;
const alleenstaandeOuder = berekenVuistregel({
  inkomen: INKOMEN,
  volwassenen: 1,
  kinderen: 2,
  auto: "eigen",
}).verwachtOver;
const omslagGezin = omslagpunt(2, 2);
const tekortGezin = Math.abs(gezin.verwachtOver);
const kostenTweeKinderen = samenZonderKinderen - gezin.verwachtOver;
const verschilOmslag = omslagGezin - INKOMEN;

const CASE_DRIE_KINDEREN = rapportVoorSlug("tweeverdieners-drie-kinderen");
const CASE_ALLEENSTAANDE_OUDER = rapportVoorSlug("alleenstaande-ouder-twee-kinderen");

export default function NietRondkomenMet4000EuroNetto() {
  return (
    <>
      <SalarisRekenaar
        startInkomen={INKOMEN}
        startVolwassenen={2}
        startKinderen={2}
        startAuto="eigen"
        kop={`Bij een gezin met twee kinderen komt €${INKOMEN.toLocaleString(
          "nl-NL"
        )} netto volgens mijn vuistregel ongeveer ${euro(tekortGezin)} per maand tekort.`}
        intro="Dat is waarschijnlijk niet de vraag waarmee je hier kwam. Je weet al dat €4.000 netto een goed salaris is, dat is je verteld. De vraag die overblijft is waarom het bij jou dan niet zo voelt. Zet je eigen huishouden hieronder, dan zie je meteen of jouw rekensom dezelfde kant op wijst."
      />

      <p className="font-body text-text-soft" style={p}>
        Dat €4.000 netto ruim boven modaal ligt staat al vast (Raisin, CPB-kerncijfers modaal inkomen 2026,
        geraadpleegd 17 augustus 2026). Dit artikel gaat niet over of €4.000 netto een goed salaris is. Dat
        lees je in{" "}
        <Link
          href="/inzichten/is-4000-euro-netto-goed-salaris-nederland"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          is €4.000 netto een goed salaris
        </Link>
        , met een tabel per bedrag en per huishouden. Dit artikel gaat over de vraag die overblijft nadat
        je dat antwoord al kent: waarom komt de som bij een gezin met twee kinderen op precies dit bedrag
        niet uit, en is dat een schuld die bij jou ligt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het antwoord is nee. Het is geen karakterfout en geen kwestie van te makkelijk uitgeven. Het is
        rekenwerk, en dat rekenwerk heeft niemand je ooit voorgelegd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De rekenaar hierboven staat standaard op een gezin met twee kinderen, want dat huishouden staat in
        dit artikel centraal. Ben je alleenstaand, alleenstaande ouder of woon je samen zonder kinderen,
        dan werkt dezelfde rekenaar net zo goed voor jou: verderop in dit artikel staat ook een voorbeeld
        van een alleenstaande ouder met twee kinderen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom €4.000 netto met twee kinderen niet uitkomt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Volgens mijn vuistregel, afgeleid uit de huishoudens die ik zelf heb doorgerekend, ziet de optelsom
        er bij €4.000 netto voor een gezin met twee kinderen zo uit: wonen inclusief energie en lokale
        lasten rond {euro(gezin.wonen)}, boodschappen {euro(gezin.boodschappen)}, opvang, school en sport{" "}
        {euro(gezin.kinderkosten)}, verzekeringen {euro(gezin.verzekeringen)}, vervoer met één eigen auto{" "}
        {euro(gezin.vervoer)}, abonnementen {euro(gezin.abonnementen)} en vrije tijd {euro(gezin.vrijetijd)}.
        Bij elkaar opgeteld komt dat {euro(tekortGezin)} per maand hoger uit dan er binnenkomt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Geen van die posten is op zichzelf overdreven. Er zit geen dure hobby of een tweede auto tussen. Het
        is de optelsom die niet past, en dat is precies waarom &ldquo;gewoon minder uitgeven&rdquo; hier
        niet werkt: er is geen enkele post die duidelijk te groot is om op te schrappen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zet er hetzelfde huishouden zonder kinderen naast, en er blijft bij €4.000 netto ongeveer{" "}
        {euro(samenZonderKinderen)} per maand over. Twee kinderen erbij kosten in deze vuistregel dus samen
        ongeveer {euro(kostenTweeKinderen)} per maand, verdeeld over boodschappen, opvang, school en sport.
        Dat is lager dan je op basis van de kosten van kinderen alleen zou verwachten, en dat komt doordat
        wonen en vervoer in mijn vuistregel niet apart meegroeien met het aantal kinderen. Volgens
        CBS-cijfers die het Nibud aanhaalt, kosten twee kinderen in een tweeoudergezin gemiddeld 25 procent
        van het besteedbaar inkomen (Nibud, &ldquo;Wat kost een kind?&rdquo;, geraadpleegd 17 augustus
        2026). Besteedbaar inkomen is iets anders dan het netto bedrag waarmee ik hier reken, want daar
        zitten kinderbijslag en toeslagen al in, dus de twee percentages zijn niet één op één te vergelijken.
        Wat wel hetzelfde is: in beide berekeningen kosten kinderen een aanzienlijk deel van het inkomen,
        ook zonder dat er iets misgaat.
      </p>

      <h2 className="font-display" style={h2}>
        Het omslagpunt: vanaf {euro(omslagGezin)} komt de som net wél uit
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Reken hetzelfde huishouden door bij een hoger inkomen, en ergens kantelt de uitkomst van een tekort
        naar een klein overschot. Bij mijn vuistregel ligt dat omslagpunt voor een gezin met twee kinderen
        rond {euro(omslagGezin)}. Onder dat bedrag staat de som in de min, erboven komt er langzaam iets
        bij, al blijft de ruimte de eerste honderden euro&rsquo;s klein.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het verschil tussen €4.000 en {euro(omslagGezin)} is maar {euro(verschilOmslag)}. Dat het toch als
        een compleet ander gevoel aanvoelt, komt doordat de uitkomst precies op de grens ligt waar het
        teken wisselt. Zo&rsquo;n klein bedrag aan salaris maakt op papier het verschil tussen &ldquo;het
        komt nooit uit&rdquo; en &ldquo;het komt nét uit&rdquo;, en dat is een wiskundig toeval, geen
        prestatie of falen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit is een afgeronde vuistregel op een klein aantal huishoudens, geen exacte grens voor jouw
        situatie. Jouw huur, je regio, de leeftijd van je kinderen en of je aflost op een hypotheek
        verschuiven dit bedrag in beide richtingen. Vul daarom je eigen cijfers in bij de rekenaar bovenaan
        in plaats van dit bedrag als norm te lezen.
      </p>

      <h2 className="font-display" style={h2}>
        Dit is geen karakterfout, dit is rekenwerk
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Landelijk ziet het Nibud hetzelfde patroon terug bij huishoudens die aangeven moeilijk rond te
        komen: zij lopen het vaakst vast op de kosten van kinderen, vervoer en boodschappen, juist omdat die
        posten van maand tot maand verschillen en niet vastliggen zoals huur of hypotheek (NOS over het
        Nibud-rapport Geldzaken in de praktijk 2026, geraadpleegd 17 augustus 2026). Dat onderzoek gaat over
        huishoudens in het algemeen en niet specifiek over €4.000 netto, maar het bevestigt wel welke
        posten de rekensom het meest laten schommelen, en dat zijn dezelfde posten die in mijn eigen
        vuistregel het hardst oplopen zodra er kinderen bijkomen.
      </p>
      {CASE_DRIE_KINDEREN && (
        <div
          className="rounded-xl border p-5 my-8"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}
        >
          <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
            {CASE_DRIE_KINDEREN.kenmerken[0]}, {CASE_DRIE_KINDEREN.kenmerken[1]}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
            &ldquo;{CASE_DRIE_KINDEREN.vermoeden}&rdquo; dacht dit gezin vooraf zelf. Hun inkomen lag ver
            boven €4.000, en toch groeide de spaarrekening niet. Mijn conclusie:{" "}
            &ldquo;{CASE_DRIE_KINDEREN.uitkomstKop}.&rdquo; Het zat niet in boodschappen of kinderen, maar
            in de optelsom van vrij besteedbare uitgaven en jaarlijkse kosten waarvoor niets was
            gereserveerd.
          </p>
          <Link
            href={`/rapporten/${CASE_DRIE_KINDEREN.slug}`}
            className="font-body text-sm hover:underline"
            style={{ color: "#0B7A6E" }}
          >
            Lees hun volledige rapport →
          </Link>
        </div>
      )}
      {CASE_ALLEENSTAANDE_OUDER && (
        <div
          className="rounded-xl border p-5 my-8"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}
        >
          <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
            {CASE_ALLEENSTAANDE_OUDER.kenmerken[0]}, {CASE_ALLEENSTAANDE_OUDER.kenmerken[1]}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
            Bij haar lag het inkomen ook boven €4.000, met twee kinderen en een koopwoning op één salaris.
            Mijn conclusie na het doorrekenen: &ldquo;{CASE_ALLEENSTAANDE_OUDER.uitkomstKop}.&rdquo; Niet
            omdat ze te veel uitgaf, maar omdat de structuur nooit was aangepast aan wat ze in haar eentje
            droeg.
          </p>
          <Link
            href={`/rapporten/${CASE_ALLEENSTAANDE_OUDER.slug}`}
            className="font-body text-sm hover:underline"
            style={{ color: "#0B7A6E" }}
          >
            Lees haar volledige rapport →
          </Link>
        </div>
      )}
      <p className="font-body text-text-soft" style={p}>
        Twee verschillende huishoudens, allebei boven €4.000 netto, en bij geen van beiden bleef er vanzelf
        iets over voordat er een structuur onder lag. Dat is niet omdat zij het slecht deden. Bij deze twee
        verschoof een hoger inkomen de rekensom, zonder die vanzelf op te lossen.
      </p>

      <h2 className="font-display" style={h2}>
        Wat als je huishouden er anders uitziet
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij hetzelfde inkomen van €4.000 netto komt een stel zonder kinderen op ongeveer{" "}
        {euro(samenZonderKinderen)} per maand over volgens mijn vuistregel, en een alleenstaande ouder met
        twee kinderen op ongeveer {euro(alleenstaandeOuder)}: precies rond nul, net als het gezin met twee
        kinderen hierboven, maar via een heel andere optelsom omdat één inkomen de volledige woonlast
        draagt. Alle bedragen tussen €3.500 en €4.600, per huishouden uitgesplitst, staan in de tabel op{" "}
        <Link
          href="/inzichten/is-4000-euro-netto-goed-salaris-nederland#per-bedrag"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          is €4.000 netto een goed salaris
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Heeft je huishouden drie kinderen, twee auto&rsquo;s of een wisselend inkomen, gebruik dan de
        rekenaar bovenaan met je eigen situatie. De {RAPPORTEN.length} huishoudens waarop deze vuistregel
        is gebaseerd staan volledig openbaar op{" "}
        <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
          rapporten
        </Link>
        , inclusief wat er drie tot vier maanden later veranderde.
      </p>
    </>
  );
}
