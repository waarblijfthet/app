import Link from "next/link";
import { BoodschappenKloof } from "@/components/artikel/BoodschappenKloof";
import BoodschappenSlider from "@/components/artikel/BoodschappenSlider";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatIsNormaalBedragBoodschappen() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Een gezin van vijf, kinderen van 12, 10 en 8 jaar. Elke week naar Albert
        Heijn, af en toe naar de bakker en de slager. Geen avontuurlijke keukens,
        geen biologisch vlees, geen dure kaasjes. Gewoon normaal eten. En toch:
        €1.400 per maand aan boodschappen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat klinkt als veel. Maar is het dat? Het Nibud zegt voor dit gezin iets
        van €700 minimaal. De werkelijkheid van dit specifieke gezin — en van veel
        meer gezinnen in Nederland — ligt op het dubbele. Niet door verspilling of
        luxe, maar gewoon doordat drie opgroeiende kinderen eten, en eten kost
        geld.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel legt uit wat de kloof is tussen de officiële norm en wat
        gezinnen in de praktijk uitgeven — en welke drie oorzaken vrijwel niemand
        benoemt.
      </p>

      <BoodschappenKloof />

      <BoodschappenSlider />

      <h2 className="font-display" style={h2}>
        Waarom klopt de Nibud-norm niet met jouw kassabon?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud-bedrag is een minimum voor voeding — letterlijk berekend op
        basis van calorieën en voedingsstoffen. Het is niet wat een gemiddeld
        gezin uitgeeft. Het is wat een gezin minimaal nodig heeft om gezond te
        eten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is een wezenlijk verschil. En het verklaart meteen waarom bijna
        iedereen boven de norm uitkomt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat Nibud niet meerekent: brood van de bakker, vlees van de slager,
        drogisterijproducten, schoollunches, tussendoortjes voor sport, koekjes
        voor een verjaardag. Die kosten zijn reëel en onvermijdelijk voor de
        meeste gezinnen — maar ze zitten niet in de basistabel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als je Nibud-voeding uitbreidt met persoonlijke verzorging, was- en
        schoonmaakmiddelen en huishoudelijke artikelen, kom je volgens KekMama al
        op €875 per maand voor een gezin van vier. Dat is ruim €240 boven de
        Nibud-voedingsnorm van €627.
      </p>

      <h2 className="font-display" style={h2}>
        Wat zeggen échte gezinnen dat ze uitgeven?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Op het forum Zeg maar Yes stemden 51 gezinnen over hun maandelijkse
        boodschappenkosten. De uitkomst: 25 procent van de gezinnen zit op
        €700-800 per maand, 10 procent geeft meer dan €1.000 uit. Slechts een
        handvol mensen zit onder de €400.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een mamablogger met een gezin van vier schreef in december 2024 dat ze dat
        jaar €8.830 bij Albert Heijn alleen al had uitgegeven — €737 per maand.
        Haar conclusie: &ldquo;Niet eens zo heel erg gek voor een gezin van
        vier.&rdquo;
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een andere blogger met vijf personen berekende haar Nibud-minimum op €613
        per maand, maar budgetteerde zelf €400 en haalde dat ook. Het verschil?
        Actief plannen, weekmenu&apos;s maken en bewust winkelen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is het eerlijke beeld: de Nibud-norm is haalbaar als je er hard voor
        werkt. Maar de gemiddelde Nederlandse ouder die na een drukke werkdag
        boodschappen doet, zit structureel €200-400 hoger.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom zijn pubers zo duur?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het punt dat bijna niemand je vertelt. Nibud rekent per
        leeftijdsgroep — een kind van 8 jaar kost minder dan een kind van 13.
        Maar de sprong tussen 10 en 14 jaar is enorm, en in de Nibud-tabellen zit
        die niet zo prominent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een kind van 12 eet in de praktijk bijna evenveel als een volwassene. Een
        gezin met drie kinderen van 8, 10 en 12 jaar heeft geen
        &ldquo;kinderkosten&rdquo; meer in de traditionele zin — het zijn drie
        bijna-volwassenen qua eetgedrag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel daarbij op: eigen schoollunch meenemen, tussendoor eten na sport,
        grotere verpakkingen omdat ze meer eten. Dat alles verklaart waarom een
        gezin van vijf met oudere kinderen makkelijk op €1.200-1.400 per maand
        uitkomt, zonder dat er iets &ldquo;geks&rdquo; aan de hand is.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kun je er realistisch aan doen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De eerste stap is stoppen met schamen dat je boven de Nibud-norm zit.
        Bijna iedereen met kinderen van 10 jaar of ouder doet dat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De tweede stap is uitzoeken waar jouw bedrag vandaan komt. Niet met het
        doel om drastisch te bezuinigen, maar om bewuste keuzes te maken. Is het
        de slager drie keer per week? De bakker naast de supermarkt? De
        tussendoor-aankopen die optellen?
      </p>
      <p className="font-body text-text-soft" style={p}>
        De derde stap is één structurele aanpassing kiezen. Weekmenu&apos;s
        opstellen heeft bij veel gezinnen direct effect — niet omdat je goedkoper
        inkoopt, maar omdat je minder weggooit en minder improvisatie-aankopen
        doet. Wil je ook kijken of je sommige producten goedkoper kunt halen?{" "}
        <Link
          href="/inzichten/vergelijken-boodschappen-nederland-duitsland"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          Boodschappen goedkoper in Duitsland
        </Link>{" "}
        legt uit wat waar loont.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een realistisch doel: 10-15 procent besparen op je huidige bedrag. Voor
        een gezin dat €1.000 uitgeeft is dat €100-150 per maand — €1.200-1.800
        per jaar. Zonder dat je kwaliteit inlevert.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoe jullie boodschappenuitgaven zich verhouden tot
        vergelijkbare gezinnen — met dezelfde gezinsgrootte en hetzelfde
        inkomensniveau? Doe de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          gratis analyse
        </Link>{" "}
        en zie het direct.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
          <strong>Uit de praktijk.</strong> In de gesprekken die ik voer schatten gezinnen hun boodschappen bijna altijd €100 tot €200 te laag in — niet omdat ze liegen, maar omdat de tussendoor-momenten, de drogist en de bakker er niet in zitten. Pas als ze een maand écht alles bij elkaar optellen, zien ze het echte bedrag.
        </p>
      </div>
    </>
  );
}
