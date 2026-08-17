import Link from "next/link";
import VijftigDertigTwintigVergelijker from "@/components/artikel/VijftigDertigTwintigVergelijker";
import { berekenVuistregel, euro } from "@/lib/salaris-vuistregel";
import { RAPPORTEN } from "@/lib/rapporten-data";

/**
 * Content voor "50-30-20-regel-hoger-inkomen".
 *
 * Uitgebreid op 17-aug-2026 (klus 5, docs/artikel-bouwprompts-aug-2026.md).
 * Overlap-conclusie: geen nieuw artikel voor "hoeveel moet je overhouden na
 * vaste lasten" / "wat houden jullie over na je vaste lasten", want die
 * zoekvragen liggen inhoudelijk boven op dit artikel, op
 * hoeveel-geld-overhouden-einde-maand en op vrij-besteedbaar-inkomen-berekenen.
 * Dit artikel is waar de 50/30/20-regel zelf ter discussie staat, dus hier
 * hoort de berekende vergelijking (nieuw) thuis, niet op een vierde pagina.
 *
 * Eerder was dit artikel alleen betoog: het beweerde dat de regel bij een
 * hoger inkomen niet meer klopt, zonder een enkele berekening erbij. De
 * toevoeging hieronder maakt dat concreet met VijftigDertigTwintigVergelijker.
 *
 * Bezwaarronde 17-aug-2026 draaide de aanpak om: het eerste doorgerekende
 * voorbeeld (gezin, twee kinderen, €5.500) komt uit op een hóger percentage
 * vaste lasten dan de 50%-norm, niet lager. Dat leek de eigen stelling van dit
 * artikel tegen te spreken, tot bleek dat het aan het huishouden ligt, niet
 * aan het inkomen alleen: kinderen kosten geld dat niet verdwijnt bij een
 * hoger inkomen. VDT2 hieronder (stel zonder kinderen, hoger inkomen) laat de
 * andere kant zien. Zelfde cijfers als lib/inzichten-data.ts FAQ, lokaal
 * herberekend met dezelfde invoer, werkregel 2.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const VDT_INKOMEN = 5500;
const VDT = berekenVuistregel({ inkomen: VDT_INKOMEN, volwassenen: 2, kinderen: 2, auto: "eigen" });
const VDT_VASTE_LASTEN = VDT.wonen + VDT.boodschappen + VDT.verzekeringen + VDT.vervoer;
const VDT_PCT = Math.round((VDT_VASTE_LASTEN / VDT_INKOMEN) * 100);

const VDT2_INKOMEN = 9000;
const VDT2 = berekenVuistregel({ inkomen: VDT2_INKOMEN, volwassenen: 2, kinderen: 0, auto: "eigen" });
const VDT2_VASTE_LASTEN = VDT2.wonen + VDT2.boodschappen + VDT2.verzekeringen + VDT2.vervoer;
const VDT2_PCT = Math.round((VDT2_VASTE_LASTEN / VDT2_INKOMEN) * 100);

export default function VijftigDertigTwintigRegelHogerInkomen() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoeveel je volgens de 50/30/20-regel over hoort te houden na je vaste lasten",
            "Wat mijn eigen vuistregel, op echte huishoudens, daar per huishouden tegenover zet",
            "Waarom dat percentage niet altijd dezelfde kant op afwijkt: bij kinderen soms hoger dan 50%, bij een kinderloos stel op een hoger inkomen soms lager",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Volgens de 50/30/20-regel houd je na je vaste lasten altijd 50 procent van je netto-inkomen
        over, om te verdelen over vrij besteedbaar (30 procent) en sparen (20 procent). Dat cijfer komt
        uit het Amerikaanse boek &ldquo;All Your Worth&rdquo; van Elizabeth Warren en Amelia Warren Tyagi
        (Raisin, &ldquo;Uitleg: hoe werkt de 50/30/20 regel?&rdquo;, geraadpleegd 17 augustus 2026), niet
        uit onderzoek onder Nederlandse huishoudens. Het bekendste budgetadvies dat er is, met andere
        woorden, maar niet per se het advies dat bij jouw inkomen en jouw huishouden past.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: de 50/30/20-regel is een prima startpunt, maar het is één vast percentage voor elk
        huishouden, en dat percentage klopt lang niet altijd. Bij een kinderloos stel met een hoger
        inkomen groeien de behoeften niet automatisch mee tot de helft van het inkomen. Bij een gezin met
        kinderen op een minder hoog inkomen is diezelfde 50 procent juist aan de krappe kant. Verderop op
        deze pagina zet ik de regel naast mijn eigen vuistregel, gebaseerd op de {RAPPORTEN.length}{" "}
        huishoudens die ik zelf heb doorgerekend, met allebei die uitkomsten erbij.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe de 50/30/20-regel werkt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je verdeelt je netto-inkomen in drie delen. 50 procent gaat naar behoeften: huur of hypotheek,
        energie, verzekeringen, boodschappen, vervoer. 30 procent naar wensen: uit eten, hobby&apos;s,
        vakanties, abonnementen. En 20 procent naar sparen en aflossen. De kracht zit in de eenvoud, je
        hoeft geen spreadsheet bij te houden.
      </p>

      <h2 className="font-display" style={h2}>
        Waar het schuurt bij een hoger inkomen zonder kinderen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De regel gaat ervan uit dat je behoeften meegroeien met je inkomen. Voor een kinderloos stel of
        een alleenstaande met een hoger inkomen is dat precies de valkuil. Boodschappen, energie en een
        fatsoenlijk dak boven je hoofd kosten niet automatisch meer als jij meer verdient. Wie €4.500
        netto binnenkrijgt heeft geen €2.250 aan échte behoeften, tenzij hij bewust groter is gaan wonen
        en rijden omdat het kon.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tegelijk is 20 procent sparen bij zo&apos;n inkomen aan de lage kant. Blijven de vaste lasten
        relatief laag, dan kun je makkelijk meer opzijzetten, en dat is precies wat het verschil maakt
        tussen krap en ruim. Dit is de kern van{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>: de uitgaven groeien mee, het sparen niet.
      </p>

      <h2 className="font-display" style={h2}>
        50/30/20 tegenover mijn eigen vuistregel
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In plaats van dit alleen te beweren, reken ik het door. De 50/30/20-regel voorspelt voor élk
        huishouden hetzelfde: 50 procent van je inkomen naar vaste lasten, ongeacht of je alleen woont,
        samen bent of kinderen hebt. Mijn eigen vuistregel houdt daar wel rekening mee, want die is
        opgebouwd uit huishoudens met een verschillende samenstelling. Kies hieronder een huishouden en
        een inkomen, dan zie je beide voorspellingen naast elkaar. Let op: net als de 50/30/20-regel zelf
        (Raisin, geraadpleegd 17 augustus 2026) tel ik boodschappen hier mee als vaste last. In mijn
        artikel over{" "}
        <Link href="/inzichten/vaste-lasten-overzicht-maken" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">een overzicht van je vaste lasten maken</Link>{" "}
        staan boodschappen apart, als dagelijkse uitgave. Voor déze vergelijking gebruik ik bewust de
        definitie van de regel zelf, anders vergelijk je twee verschillende dingen met dezelfde naam.
      </p>

      <VijftigDertigTwintigVergelijker />

      <p className="font-body text-text-soft" style={p}>
        Twee voorbeelden maken meteen duidelijk waarom een vast percentage hier niet volstaat. Bij een
        gezin met twee kinderen op €{VDT_INKOMEN.toLocaleString("nl-NL")} netto komt mijn vuistregel op{" "}
        {VDT_PCT}% vaste lasten uit ({euro(VDT_VASTE_LASTEN)}), boven de 50%-norm: kinderen kosten geld
        dat niet verdwijnt zodra je meer verdient. Bij een stel zonder kinderen op €
        {VDT2_INKOMEN.toLocaleString("nl-NL")} netto ligt dat percentage op {VDT2_PCT}% ({euro(
          VDT2_VASTE_LASTEN
        )}), ruim onder de norm. Zelfde regel, hetzelfde vaste percentage voor iedereen, en toch twee
        tegenovergestelde uitkomsten. Dát is waarom ik &ldquo;de 50/30/20-regel klopt niet&rdquo; liever
        vervang door &ldquo;één percentage voor elk huishouden klopt niet&rdquo;: rond je eigen huishouden
        en inkomen hierboven om te zien welke kant jij op valt.
      </p>

      <h2 className="font-display" style={h2}>
        De grens van deze vuistregel
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is geen landelijke steekproef, en ik verstop dat liever niet in kleine letters onderaan. Mijn
        vuistregel is gebaseerd op {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend en die
        volledig openbaar op{" "}
        <Link href="/rapporten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">rapporten</Link>{" "}
        staan. Sommige onderdelen leunen zwaarder op die kleine n dan andere: het bedrag per kind voor
        opvang, school en sport komt uit maar twee van die huishoudens, en de woonlast als percentage van
        het inkomen uit twee (alleenstaanden) of drie (samenwonend). Vrije tijd, geschat op 10 procent van
        het inkomen, is de minst betrouwbare post: bij de vijf huishoudens liep het uiteen van 7,5 tot 15
        procent, en het is een percentage van het inkomen, geen gemeten bedrag. Dat maakt mijn vuistregel
        niet nauwkeuriger dan de 50/30/20-regel, wel beter toegesneden op wat een huishouden als het jouwe
        werkelijk kwijt is, en met de herkomst van elk getal erbij in plaats van alleen een rond
        percentage.
      </p>

      <h2 className="font-display" style={h2}>
        Een betere verdeling als je goed verdient
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Draai de logica om. In plaats van &ldquo;wat overblijft, spaar ik&rdquo;, bepaal je eerst hoeveel
        je opzij wilt zetten en leeft de rest daarvan. Houd je behoeften bewust onder de 50 procent en
        laat het verschil naar sparen vloeien, denk eerder aan 50/20/30 met sparen naar 30 procent, of
        meer, naarmate je inkomen stijgt. Ligt jouw percentage volgens de rekenaar hierboven juist bóven
        de 50 procent, dan is dat advies andersom: eerst kijken of die vaste lasten kunnen zakken, voordat
        je een hoger spaarpercentage afdwingt dat er domweg niet in past.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat een realistisch spaarpercentage is en hoeveel Nederlanders werkelijk sparen, lees je in het
        artikel over{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoeveel sparen normaal is</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Maak het concreet met aparte potjes
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een percentage op papier verandert niks zolang alles op één rekening staat. Zet je verdeling om
        in aparte potjes: één voor vaste lasten, één voor dagelijkse uitgaven, één voor sparen. Zo werkt
        de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>, en dat is een stuk concreter dan een regel onthouden.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat je vrij besteedbaar overhoudt</Link> en <Link href="/inzichten/budget-maken-dat-je-volhoudt" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">een budget dat je volhoudt</Link>.</p>
    </>
  );
}
