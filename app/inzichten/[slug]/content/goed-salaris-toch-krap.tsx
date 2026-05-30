import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GoedsalarisTochKrap() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Je verdient genoeg. Niet extreem, maar genoeg. Twee inkomens misschien,
        of één solide. Geen grote schulden, geen gekke aankopen. En toch staat
        er aan het einde van de maand bijna niks meer op de rekening.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het is een van de meest gehoorde — maar zelden uitgesproken —
        frustraties van Nederlandse gezinnen. Want hoe leg je dit uit aan een
        ander? Je kunt moeilijk klagen als je goed verdient. Dus zwijg je. En
        vraag je je &lsquo;s avonds op de bank af waar het toch naartoe gaat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het antwoord is bijna nooit één grote oorzaak. Het is een combinatie
        van kleine dingen die samen een groot gat slaan.
      </p>

      <h2 className="font-display" style={h2}>
        Vaste lasten die stiller groeien dan je doorhebt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meeste mensen kennen hun grote vaste lasten: huur of hypotheek,
        verzekeringen, energie. Maar de categorie daaronder is verraderlijk.
        Streamingdiensten, sportabonnementen, apps, telefoonabonnementen — die
        stapelen zich op zonder dat je het bewust doorhebt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een gemiddeld Nederlands gezin betaalt inmiddels meer dan €200 per
        maand aan abonnementen. Tien jaar geleden was dat een fractie daarvan.
        De meesten schatten het op de helft.
      </p>

      <h2 className="font-display" style={h2}>
        Boodschappen — de categorie die niemand echt bijhoudt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vraag iemand wat hij maandelijks uitgeeft aan boodschappen. Het antwoord
        is bijna altijd te laag. Niet omdat mensen liegen, maar omdat ze het
        gewoon niet precies weten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee kinderen is €700 tot €900 per maand geen
        uitzondering. Wie dat aan zichzelf vraagt, noemt vaak €500.
      </p>

      <h2 className="font-display" style={h2}>
        De buffer die er nooit is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als er geen structurele buffer is, betaal je alles uit je maandelijkse
        inkomen. Ook de onverwachte dingen: een kapotte wasmachine, een hoge
        energierekening, schoolspullen. Die dingen zijn niet onverwacht — ze
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
        dagelijkse uitgaven.
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
    </>
  );
}
