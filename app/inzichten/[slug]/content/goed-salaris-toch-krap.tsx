import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GoedsalarisTochKrap() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Goed salaris en toch krap: het ligt zelden aan je inkomen, bijna altijd aan de structuur",
            "Drie oorzaken die samen een groot gat slaan: sluipende abonnementen, onderschatte boodschappen, en geen buffer",
            "Meer verdienen lost het niet op, een systeem wel",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je verdient genoeg. Niet extreem, maar genoeg. Twee inkomens misschien,
        of één solide. Geen grote schulden, geen gekke aankopen. En toch staat
        er aan het einde van de maand bijna niks meer op de rekening.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het is een van de meest gehoorde, maar zelden uitgesproken —
        frustraties van Nederlandse gezinnen. Want hoe leg je dit uit aan een
        ander? Je kunt moeilijk klagen als je goed verdient. Dus zwijg je. En
        vraag je je &lsquo;s avonds op de bank af waar het toch naartoe gaat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het antwoord is bijna nooit één grote oorzaak. Het is een combinatie
        van kleine dingen die samen een groot gat slaan.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: als je goed verdient maar toch krap zit, ligt het zelden aan
        je inkomen. Het komt door drie dingen die ongemerkt optellen, sluipende
        vaste lasten en abonnementen, onderschatte boodschappen, en het ontbreken
        van een buffer. Niet méér verdienen lost dat op, maar meer structuur.
      </p>

      <h2 className="font-display" style={h2}>
        Vaste lasten die stiller groeien dan je doorhebt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meeste mensen kennen hun grote vaste lasten: huur of hypotheek,
        verzekeringen, energie. Maar de categorie daaronder is verraderlijk.
        Streamingdiensten, sportabonnementen, apps, telefoonabonnementen, die
        stapelen zich op zonder dat je het bewust doorhebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een gemiddeld Nederlands gezin betaalt inmiddels meer dan €200 per
        maand aan abonnementen. Tien jaar geleden was dat een fractie daarvan.
        De meesten schatten het op de helft. Zie ook wat{" "}
        <Link href="/inzichten/wat-zijn-normale-vaste-lasten-gezin" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">normale vaste lasten voor een gezin</Link>{" "}zijn.
      </p>

      <h2 className="font-display" style={h2}>
        Boodschappen, de categorie die niemand echt bijhoudt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vraag iemand wat hij maandelijks uitgeeft aan boodschappen. Het antwoord
        is bijna altijd te laag. Niet omdat mensen liegen, maar omdat ze het
        gewoon niet precies weten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee kinderen is €700 tot €900 per maand geen
        uitzondering, terwijl de Nibud-norm op €627 ligt. Wie dat aan zichzelf
        vraagt, noemt vaak €500. Meer hierover in ons artikel over{" "}
        <Link href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">normale boodschappenkosten</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De buffer die er nooit is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als er geen structurele buffer is, betaal je alles uit je maandelijkse
        inkomen. Ook de onverwachte dingen: een kapotte wasmachine, een hoge
        energierekening, schoolspullen. Die dingen zijn niet onverwacht, ze
        komen elke keer. Maar ze worden niet meegenomen in het maandbudget.
      </p>

      <h2 className="font-display" style={h2}>
        Het ontbreekt niet aan geld, maar aan structuur
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het inzicht dat voor veel gezinnen het meeste oplevert: het
        probleem is zelden het inkomen. Het is de afwezigheid van een systeem.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gezinnen die hetzelfde verdienen maar structureel meer overhouden, doen
        één ding anders: ze verdelen hun inkomen direct. Vaste lasten van een
        aparte rekening, spaardoelen in aparte potjes, een vast bedrag voor
        dagelijkse uitgaven. Hoe dat praktisch werkt, lees je in ons artikel over de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De eerste stap is inzicht, niet bezuinigen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Kijk eerst wat er werkelijk gebeurt. Pak de afschriften van de
        afgelopen twee maanden en tel drie dingen op: vaste lasten, boodschappen,
        en alles wat overblijft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Meer leren over hoe dit werkt?{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          Lees ook ons artikel over spaardoelen en maandelijkse inleg
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Kom je er samen niet helemaal uit? Kijk dan{" "}<Link href="/aanbod" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoe we je verder kunnen helpen</Link>{" "}— van de gratis analyse tot persoonlijke begeleiding.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoe een gezin zijn boodschappen onder controle kreeg</a>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/waar-blijft-mijn-geld-einde-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">waar je geld aan het einde van de maand blijft</Link> en <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">wat je vrij besteedbaar overhoudt</Link>.</p>
    </>
  );
}
