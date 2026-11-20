import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import DoelenKiezer from "@/components/artikel/DoelenKiezer";
import { RAPPORTEN } from "@/lib/rapporten-data";
import {
  JAARWISSELING_BRONNEN,
  JAARWISSELING_BRON_DATUM,
  NIBUD_SPAREN_MIN_PCT,
  spaardoelPerRapport,
} from "@/lib/jaarwisseling-bronnen";

/**
 * Nieuw artikel, 20-nov-2026: "financiële doelen stellen" voor 2027.
 *
 * SERP google.nl 20-nov (docs/serp-jaarwisseling-20-nov-2026.md): advertenties
 * van KVK, ING en Wijzer in geldzaken; organisch Finance Freaks (jaarlijks),
 * Nibud, bunq en Scalable (zakelijk of beleggen). GSC: geen eigen URL op
 * "doelen". Scheiding met spaardoelen-maandelijkse-inleg: die rekent één
 * spaardoel uit, deze pagina kiest de doelen voor het jaar en kijkt of ze samen
 * passen in wat er echt overblijft.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof JAARWISSELING_BRONNEN; tekst: string }) {
  return (
    <a href={JAARWISSELING_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function FinancieleDoelenStellen2027() {
  const doelen = spaardoelPerRapport();
  const gezin = doelen.find((d) => d.slug === "tweeverdieners-drie-kinderen");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {JAARWISSELING_BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een financieel doel werkt als het een bedrag, een datum en een maandbedrag heeft, en als al je doelen samen passen
        in wat er echt overblijft. Het Nibud adviseert minimaal {NIBUD_SPAREN_MIN_PCT} procent van je inkomen opzij te
        zetten, eerst voor een buffer. Begin 2027 daarom met een terugblik op 2026, niet met een wensenlijst.
      </p>

      <h2 className="font-display" style={h2}>Hoe stel je financiële doelen op?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Kijk terug op 2026.</strong> Wat kwam er binnen, wat ging eruit, en wat bleef
          er per maand echt over? Niet wat je begroting zegt, maar wat je afschrift laat zien.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Eerst een buffer.</strong> Het Nibud noemt een buffer het eerste en
          belangrijkste doel om geld voor opzij te zetten, voor onverwachte, grotere en noodzakelijke uitgaven (
          <Bron sleutel="nibudSparen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
          ).
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Zet de jaarkosten apart.</strong> Vakantie, december en onderhoud zijn geen
          doel, ze komen gewoon. Hoe je dat uitrekent, staat in{" "}
          <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
            jaarlijkse kosten reserveren
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Kies hooguit drie doelen</strong>, elk met een bedrag en een datum. Reken uit
          wat ze per maand vragen, en tel ze op.
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Zet het automatisch apart</strong>, direct na het ontvangen van je loon, zoals
          Wijzer in geldzaken het ook adviseert (
          <Bron sleutel="wijzerVijfStappen" tekst={`Wijzer in geldzaken, geopend ${JAARWISSELING_BRON_DATUM}`} />
          ). Extra inkomsten zoals vakantiegeld of een dertiende maand zet je volgens het Nibud apart voordat je ze
          uitgeeft.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Passen je doelen samen in je maand?</h2>
      <p className="font-body text-text-soft" style={p}>
        Elk doel apart klinkt haalbaar. Samen kunnen ze meer vragen dan er overblijft. Reken het hier uit.
      </p>
      <DoelenKiezer />

      <h2 className="font-display" style={h2}>Welke financiële doelen kun je stellen? Voorbeelden</h2>
      <ul className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "disc" }}>
        <li style={{ marginBottom: "0.4rem" }}>
          Een buffer op peil brengen. Hoeveel jij nodig hebt, verschilt per huishouden; het Nibud heeft daar een
          BufferBerekenaar voor.
        </li>
        <li style={{ marginBottom: "0.4rem" }}>
          Een vast bedrag per maand sparen in plaats van wat er overblijft. Wat normaal is, staat in{" "}
          <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={link} className="hover:underline">
            hoeveel sparen per maand
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.4rem" }}>
          Een schuld sneller aflossen, of juist niet:{" "}
          <Link href="/inzichten/studieschuld-aflossen-of-sparen" style={link} className="hover:underline">
            studieschuld aflossen of sparen
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.4rem" }}>
          Sparen voor iets concreets, zoals een verbouwing of een auto. Hoe je één spaardoel uitrekent, staat in{" "}
          <Link href="/inzichten/spaardoelen-maandelijkse-inleg" style={link} className="hover:underline">
            spaardoelen en maandelijkse inleg
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.4rem" }}>
          Je pensioen aanvullen:{" "}
          <Link href="/inzichten/pensioen-aanvullen-hoeveel-heb-je-nodig" style={link} className="hover:underline">
            hoeveel heb je nodig
          </Link>
          .
        </li>
        <li>
          Ruimte maken voor een keuze, zoals minder werken:{" "}
          <Link href="/inzichten/wat-kost-een-dag-minder-werken" style={link} className="hover:underline">
            wat kost een dag minder werken
          </Link>
          .
        </li>
      </ul>

      <h2 className="font-display" style={h2}>Waarom haalt een goed inkomen het spaardoel niet vanzelf?</h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat een doel dat uit &ldquo;wat er overblijft&rdquo; moet komen, concurreert met alles wat eerder van je rekening
        gaat. Ieder huishouden van wie ik een geldrapport schreef, had een spaardoel. Zo stond het in hun rapport:
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Spaardoel en wat ervan terechtkwam"]}
        rijen={doelen.map((d) => [
          <Link key={d.slug} href={`/rapporten/${d.slug}`} style={link} className="hover:underline">
            {d.naam}, {d.netto}
          </Link>,
          d.spaardoel,
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, zoals de huishoudens het aanleverden. Geen steekproef van Nederland.`}
      />
      <p className="font-body text-text-soft" style={p}>
        {gezin ? (
          <>
            Het{" "}
            <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
              tweeverdienersgezin met drie kinderen
            </Link>{" "}
            ({gezin.netto}) is een goed voorbeeld: het doel stond, maar er ging regelmatig geld terug van de spaarrekening.
          </>
        ) : null}{" "}
        Het Nibud waarschuwt daar ook voor: met internetbankieren is het makkelijk om spaargeld terug te boeken, dus zet het
        op een rekening waar je moeilijker bij kunt (
        <Bron sleutel="nibudSparen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ). Waarom sparen bij een goed inkomen toch niet lukt, lees je in{" "}
        <Link href="/inzichten/waarom-lukt-sparen-niet" style={link} className="hover:underline">
          waarom kan ik niet sparen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoe maak je zelf een financiële planning voor het jaar?</h2>
      <p className="font-body text-text-soft" style={p}>
        Met een jaarbegroting: een overzicht van alle inkomsten en uitgaven over het hele jaar. Het Nibud raadt aan die elk
        jaar te maken, omdat elke maand anders is, met extra inkomsten zoals vakantiegeld en extra uitgaven zoals de
        gemeentelijke lasten (
        <Bron sleutel="nibudPlannen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ). Zet je doelen erin als vaste uitgave op salarisdag. Een kant-en-klaar sjabloon met een tabblad voor jaaruitgaven
        staat in{" "}
        <Link href="/inzichten/huishoudboekje-voorbeeld" style={link} className="hover:underline">
          het gratis huishoudboekje
        </Link>
        . Hoe je je salaris daarna verdeelt, staat in{" "}
        <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={link} className="hover:underline">
          je salaris indelen in potjes
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Waar het geld nu blijft:{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        . Waar je ruimte vindt voor je doelen:{" "}
        <Link href="/inzichten/meer-geld-overhouden" style={link} className="hover:underline">
          meer geld overhouden
        </Link>
        . Een jaar lang minder kopen als doel:{" "}
        <Link href="/inzichten/no-buy-year" style={link} className="hover:underline">
          no buy year
        </Link>
        . Wat een gezin per post uitgeeft:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        .
      </p>
    </>
  );
}
