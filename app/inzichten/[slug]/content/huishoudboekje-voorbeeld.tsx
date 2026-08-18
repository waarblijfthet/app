import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

/**
 * Content voor "huishoudboekje-voorbeeld" (17-aug-2026, klus 9,
 * docs/artikel-bouwprompts-aug-2026.md).
 *
 * Overlap-afweging vooraf (zie logboek): dit is een NIEUW, kort artikel naast
 * het bestaande "moet-je-een-huishoudboekje-bijhouden", geen uitbreiding
 * daarvan. Reden: de zoekintentie verschilt. "Moet je een huishoudboekje
 * bijhouden" is een ja/nee-vraag en dat artikel beantwoordt hem met "nee,
 * gebruik structuur in plaats van registratie". "Huishoudboekje voorbeeld" en
 * "huishoudboekje maken" zijn uitvoeringsvragen van iemand die al besloten
 * heeft (of gaat) bijhouden en een sjabloon of aanpak zoekt: de hele SERP is
 * daar ook naar (Rabobank, Nibud, Wijzer in geldzaken, allemaal sjablonen).
 * Dat artikel opnieuw optuigen met een sjabloon zou de "nee, doe het niet"-
 * boodschap tegenspreken. Vandaar een eigen, kort artikel dat het sjabloon
 * niet ter discussie stelt, en zelf verwijst naar het bestaande artikel voor
 * wie zich afvraagt of bijhouden op de lange termijn wel de moeite waard is.
 *
 * Geen enkel bedrag hieronder is met de hand getypt: de rekenaar leest
 * lib/salaris-vuistregel.ts uit, de rapportcitaten lezen lib/rapporten-data.ts
 * via HB_STEL/rapportVoorSlug in lib/inzichten-data.ts.
 */

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

export default function HuishoudboekjeVoorbeeld() {
  return (
    <>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort antwoord: een huishoudboekje maken is in vijf minuten geregeld, met een gratis
        sjabloon van Rabobank of Nibud, of met het overzicht van de 30 meest gebruikte huishoudboekjes bij Wijzer in
        geldzaken. Het sjabloon is niet waar het misgaat. Na een paar maanden bijhouden weet je
        precies wat er wegging, en dat is niet hetzelfde als weten of dat veel is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat tweede deel, de vergelijking, levert geen enkel sjabloon standaard mee. Hieronder eerst
        een kort voorbeeld van hoe zo&apos;n boekje eruitziet, en daarna het stuk dat er meestal bij
        ontbreekt.
      </p>

      <h2 className="font-display" style={h2}>
        Een simpel huishoudboekje voorbeeld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meeste huishoudboekjes werken met dezelfde indeling: één kant voor wat er binnenkomt,
        één kant voor wat eruit gaat, verdeeld in een paar vaste categorieën.
      </p>
      <ul className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "disc" }}>
        <li>Inkomsten: salaris, toeslagen, eventuele bijverdiensten</li>
        <li>Wonen: huur of hypotheek, energie, gemeentelijke lasten, internet</li>
        <li>Boodschappen: eten, drinken, drogisterij</li>
        <li>Vervoer: auto, ov, brandstof</li>
        <li>Verzekeringen en abonnementen</li>
        <li>Vrije tijd en sparen</li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Wil je niet zelf een indeling maken, dan werkt een kant-en-klaar sjabloon net zo goed: het
        gratis{" "}
        <a href="https://www.rabobank.nl/particulieren/financieel-gezond/inkomsten-en-uitgaven/huishoudboekje-downloaden" target="_blank" rel="noopener noreferrer" className="hover:underline" style={linkStyle}>
          Excel-huishoudboekje van Rabobank
        </a>
        , het{" "}
        <a href="https://www.nibud.nl/tools/stappenplan-kasboek-maken/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={linkStyle}>
          stappenplan van Nibud
        </a>
        , of het overzicht van de 30 meest gebruikte huishoudboekjes bij{" "}
        <a href="https://www.wijzeringeldzaken.nl/huishoudboekjes/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={linkStyle}>
          Wijzer in geldzaken
        </a>
        . Voor het registreren zelf maakt het weinig uit welke je kiest.
      </p>

      <h2 className="font-display" style={h2}>
        Wat een sjabloon je nooit vertelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Nibud zegt het in het eigen stappenplan zelf ook: pas als je jezelf vergelijkt met andere
        huishoudens, zie je aan welke posten je meer uitgeeft dan gemiddeld. Een kasboek of
        huishoudboekje geeft je die vergelijking niet vanzelf mee, het geeft alleen je eigen
        cijfers terug. Weet je na twee maanden precies wat er aan boodschappen wegging, dan weet je
        nog steeds niet of dat veel is voor jouw huishouden, want daarvoor heb je een tweede getal
        nodig om naast het jouwe te leggen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat tweede getal is precies waar deze site om draait. Vul hieronder je eigen inkomen en
        huishouden in, en wat je huishoudboekje je deze maand als overschot of tekort liet zien,
        dan leg ik dat naast wat ik bij zo&apos;n huishouden zou verwachten.
      </p>

      <SalarisRekenaar
        kop="Vul in wat je huishoudboekje deze maand laat zien"
        intro="Een huishoudboekje vertelt je wat er wegging. Het vertelt niet of dat normaal is voor een huishouden als het jouwe. Zet je eigen inkomen en huishouden hieronder, en wat er volgens je boekje overblijft, dan leg ik dat naast wat ik bij zo&apos;n huishouden zou verwachten."
      />

      <h2 className="font-display" style={h2}>
        De grens van deze vergelijking
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De rekenaar hierboven is een vuistregel op de {RAPPORTEN.length} huishoudens die ik zelf
        heb doorgerekend, geen landelijke norm en geen Nibud-cijfer. Hij weet niets van je regio,
        de leeftijd van je kinderen of hoeveel je al hebt afgelost. Dat is ook precies waarom een
        huishoudboekje alleen soms niet de vraag beantwoordt die je eigenlijk hebt: registreren
        wat er wegging vertelt je niet of het aan je uitgaven ligt of aan iets anders.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij een stel zonder kinderen dat ik doorrekende ging het zo. Zij hielden zelf al bij wat er
        wegging en dachten daardoor structureel iets te missen. Bij het doorrekenen bleek er geen
        lek te zitten, hun uitgaven pasten alleen niet bij het spaardoel dat ze tegelijk nastreefden.
        Dat verschil zie je niet in een huishoudboekje, hoe zorgvuldig je het ook bijhoudt. Niet
        elke vergelijking vindt een lek: bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens
        die ik doorrekende was dat ook zo. Alle {RAPPORTEN.length} rapporten staan open op{" "}
        <Link href="/rapporten" className="hover:underline" style={linkStyle}>
          /rapporten
        </Link>
        , met de volledige cijfers erbij.
      </p>

      <p className="font-body text-text-soft" style={p}>
        Ga je toch liever niet blijvend bonnetjes overtikken? Lees dan waarom{" "}
        <Link href="/inzichten/moet-je-een-huishoudboekje-bijhouden" className="hover:underline" style={linkStyle}>
          een huishoudboekje bijhouden zelden lang standhoudt
        </Link>{" "}
        en wat wel werkt, of hoe je een{" "}
        <Link href="/inzichten/budget-maken-dat-je-volhoudt" className="hover:underline" style={linkStyle}>
          budget maakt dat je wel volhoudt
        </Link>
        .
      </p>
    </>
  );
}
