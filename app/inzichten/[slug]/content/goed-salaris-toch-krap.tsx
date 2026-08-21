import Link from "next/link";
import { RAPPORTEN, rapportVoorSlug } from "@/lib/rapporten-data";
import { VUISTREGEL, euro } from "@/lib/salaris-vuistregel";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GoedsalarisTochKrap() {
  const rapport = rapportVoorSlug("tweeverdieners-drie-kinderen");

  return (
    <>
      {/* Herken je dit? */}
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Herken je dit?</p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Op papier klopt het gewoon: een goed salaris, geen schulden, geen rare aankopen. Maar elke
          maand vraag je je toch af hoe het kan dat er zo weinig blijft staan, zonder dat je één ding
          kunt aanwijzen dat fout gaat.
        </p>
      </div>

      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Goed salaris en toch niet rondkomen: het ligt zelden aan je inkomen, bijna altijd aan de structuur",
            "Drie oorzaken die samen een groot gat slaan: sluipende abonnementen, onderschatte boodschappen, en geen buffer",
            "Hoe dat er in een echt huishouden uitziet, met de bedragen erbij",
            "Meer verdienen lost het zelden op, een systeem meestal wel",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je verdient genoeg. Niet extreem, maar genoeg. Twee inkomens misschien,
        of een solide salaris alleen. Geen grote schulden, geen gekke aankopen. En toch staat er
        aan het einde van de maand bijna niks meer op de rekening.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het is een van de meest gehoorde maar zelden uitgesproken frustraties van
        Nederlandse huishoudens. Want hoe leg je dit uit aan een ander? Je kunt
        moeilijk klagen als je goed verdient. Dus zwijg je, en vraag je je
        &apos;s avonds op de bank af waar het toch naartoe gaat. Gaat het je vooral om dat knagende
        gevoel zelf, lees dan ook mijn artikel over{" "}
        <Link href="/inzichten/goed-salaris-toch-geldstress" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris en toch geldstress</Link>. Hier
        gaat het om waar het geld concreet blijft.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: als je goed verdient maar toch niet rondkomt, ligt het zelden aan
        je inkomen en dus ook niet aan jou. Het komt door drie dingen die
        ongemerkt optellen: sluipende vaste lasten en abonnementen, onderschatte
        boodschappen, en het ontbreken van een buffer. Niet een hoger inkomen lost
        dat op, maar structuur.
      </p>

      <h2 className="font-display" style={h2}>
        Vaste lasten die stiller groeien dan je doorhebt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meeste mensen kennen hun grote vaste lasten: huur of hypotheek,
        verzekeringen, energie. Maar de categorie daaronder is verraderlijk.
        Streamingdiensten, sportabonnementen, apps, telefoonabonnementen, die
        stapelen zich op zonder dat je het bewust doorhebt. In mijn eigen vuistregel
        reken ik met {euro(VUISTREGEL.abonnementen)} per maand aan abonnementen. Dat
        klinkt bescheiden, tot je het over een heel jaar optelt. Zie ook wat{" "}
        <Link href="/inzichten/wat-zijn-normale-vaste-lasten-gezin" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">normale vaste lasten voor een gezin</Link>{" "}zijn.
      </p>

      <h2 className="font-display" style={h2}>
        Boodschappen, de categorie die niemand echt bijhoudt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vraag iemand wat hij maandelijks aan boodschappen uitgeeft en het antwoord
        is bijna altijd te laag. Niet omdat mensen liegen, maar omdat ze het
        gewoon niet precies weten. Voor een gezin met twee kinderen is €700 tot
        €900 per maand geen uitzondering, terwijl de Nibud-norm lager ligt. Wie
        het aan zichzelf vraagt, noemt vaak €500. Meer hierover in het artikel over{" "}
        <Link href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">normale boodschappenkosten</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De buffer die er nooit is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als er geen structurele buffer is, betaal je alles uit je maandelijkse
        inkomen. Ook de onverwachte dingen: een kapotte wasmachine, een hoge
        energierekening, schoolspullen. Die dingen zijn niet echt onverwacht, ze
        komen elke keer terug. Maar ze worden niet meegenomen in het maandbudget,
        en juist daar ontstaat het gat.
      </p>

      <h2 className="font-display" style={h2}>
        Zo zag dit eruit bij een echt gezin
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Geen gemiddelde en geen rekenvoorbeeld, maar een van de {RAPPORTEN.length} volledige
        geldrapporten die ik openbaar op deze site heb staan, met toestemming en zonder namen.
      </p>
      {rapport && (
        <div className="rounded-xl border p-5 my-6" style={{ borderColor: "#E6E9E7", borderLeft: "3px solid #0B7A6E" }}>
          <p className="section-eyebrow mb-2">
            {rapport.chip} · {rapport.kenmerken[rapport.kenmerken.length - 1]}
          </p>
          <p className="font-display font-light text-lg mb-3" style={{ color: "#16211F" }}>
            {rapport.verhaalTitel}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
            Zij dachten vooraf: &ldquo;{rapport.vermoeden}&rdquo; {rapport.vermoedenBedrag}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: "#16211F", fontWeight: 400 }}>
            {rapport.uitkomstKop}. {rapport.uitkomst}
          </p>
          <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
            Hun evaluatie {rapport.doorlooptijd}: &ldquo;{rapport.evaluatie}&rdquo;
          </p>
          <Link
            href={`/rapporten/${rapport.slug}`}
            className="font-body text-sm font-medium hover:underline"
            style={{ color: "#0B7A6E" }}
          >
            Lees het volledige rapport &rarr;
          </Link>
        </div>
      )}
      <p className="font-body text-text-soft" style={p}>
        Geen enkele losse post schreeuwt hier om aandacht. Het is een stapeling van kleinere dingen
        die niemand optelt, tot ze samen een gat slaan. Dit gezin heeft twee inkomens en drie
        kinderen; woon je alleen of met zijn tweeën zonder kinderen, dan zie je vaak dezelfde opbouw
        terug in andere bedragen. De andere{" "}
        <Link href="/rapporten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">volledige rapporten</Link>{" "}
        laten dat per situatie zien.
      </p>

      <h2 className="font-display" style={h2}>
        Het ontbreekt niet aan geld, maar aan structuur
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het inzicht dat voor veel huishoudens het meeste oplevert: het
        probleem is zelden het inkomen, het is de afwezigheid van een systeem.
        Huishoudens die hetzelfde verdienen maar structureel meer overhouden, doen
        een ding anders: ze verdelen hun inkomen direct. Vaste lasten van een
        aparte rekening, spaardoelen in aparte potjes, een vast bedrag voor
        dagelijkse uitgaven. Hoe dat praktisch werkt, lees je in het artikel over de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
        Wil je precies weten via welke vier lekken geld het vaakst wegstroomt, en waarom een hogere
        salarisverhoging dat zelden repareert, lees dan mijn artikel{" "}
        <Link href="/inzichten/waarom-hou-ik-nooit-geld-over" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waarom hou ik nooit geld over</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De eerste stap is inzicht, niet bezuinigen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Kijk eerst wat er werkelijk gebeurt. Pak de afschriften van de afgelopen
        twee maanden en tel drie dingen op: vaste lasten, boodschappen, en alles
        wat overblijft. Vaak zie je dan al waar de ruimte zit, zonder dat je
        zuiniger hoeft te gaan leven.
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
          Wil je weten hoe jouw situatie ervoor staat? In een paar minuten zie je waar jouw huishouden afwijkt van vergelijkbare huishoudens. Je hoeft nog niets te kopen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wil je liever eerst je eigen uitgaven vergelijken? Doe de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>.
        Uit de praktijk: lees{" "}
        <Link href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin zijn boodschappen onder controle kreeg</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/waar-blijft-mijn-geld-einde-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waar je geld aan het einde van de maand blijft</Link> en <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat je vrij besteedbaar overhoudt</Link>.</p>
      <p className="font-body text-text-soft" style={p}>
        Wil je eerst breder checken of je financieel gezond bezig bent, voordat je naar een specifieke
        oorzaak zoekt? Lees{" "}
        <Link href="/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe je weet of je financieel gezond bent</Link>.
      </p>
    </>
  );
}
