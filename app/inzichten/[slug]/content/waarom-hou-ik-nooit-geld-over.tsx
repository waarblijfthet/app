import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaaromHouIkNooitGeldOver() {
  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Je verdient prima. Je doet niks geks. En toch is het de 25e en staat er bijna niks meer
          op je rekening. Je weet niet eens precies waaraan het op is gegaan.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Waarom een goed inkomen geen garantie is dat je geld overhoudt",
            "De vier manieren waarop je geld ongemerkt verdwijnt voordat je er grip op hebt",
            "Waarom méér verdienen het probleem zelden oplost, en wat wel werkt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Als je goed verdient en tóch nooit iets overhoudt, voelt dat als falen. Je hoort jezelf
        denken: ik verdien meer dan genoeg, dus dit zou niet moeten kunnen. Maar het kan wel, en
        het overkomt veel meer mensen dan je denkt. Het ligt zelden aan je inkomen. Het ligt aan
        de structuur eromheen.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: geld verdwijnt vooral als het onzichtbaar is. Vaste lasten en abonnementen
        die stilletjes groeien, uitgaven die je niet bijhoudt, en een inkomen dat zonder plan
        meteen weer opgaat. Een hoger salaris repareert dat niet, een vast systeem wel.
      </p>

      <h2 className="font-display" style={h2}>
        Een goed inkomen voelt nooit zo goed als het klinkt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wie netto €3.500 of €4.000 binnenkrijgt, hoort van de buitenwereld dat dat veel is. En op
        papier is het ook veel. Maar van je brutoloon blijft minder over dan je verwacht, en van
        je netto verdwijnt het grootste deel aan vaste lasten voordat je een euro bewust uitgeeft.
        Hoe dat precies werkt, lees je in mijn uitleg over{" "}
        <Link
          href="/inzichten/bruto-naar-netto-loonstrook-uitleg"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waar je salaris naartoe gaat op je loonstrook
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt een sociaal mechanisme bij. Klagen over geld terwijl je goed verdient voelt
        ongepast, dus zwijg je erover. Het gevolg is dat veel mensen met een prima inkomen in
        stilte hetzelfde knagende gevoel hebben: er klopt iets niet, maar ik kan er met niemand
        over praten.
      </p>

      <h2 className="font-display" style={h2}>
        Vier manieren waarop je geld onzichtbaar verdwijnt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het verdwijnt bijna nooit via één grote uitgave. Het zijn vier kleinere lekken die samen
        een groot gat slaan.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het eerste lek zijn de vaste lasten die sluipend groeien. Een gemiddeld huishouden is meer
        dan de helft van het inkomen kwijt aan vaste lasten, terwijl het Nibud rond de 50 procent
        als gezond beschouwt. Abonnementen tellen daarbij hard op: een gemiddeld gezin betaalt
        inmiddels meer dan €200 per maand aan streaming, sport, apps en telecom samen. Veel mensen schatten dat op ongeveer de helft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het tweede lek is alles wat je niet bijhoudt. Pinnen en tikken voelt niet als geld
        uitgeven. Boodschappen, lunches, een terrasje, bezorgmaaltijden: stuk voor stuk klein,
        bij elkaar honderden euro&apos;s per maand waar geen budget op staat. Vraag iemand wat hij
        aan boodschappen uitgeeft en het antwoord is bijna altijd te laag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het derde lek is de buffer die er niet is. Een kapotte wasmachine, de jaarlijkse
        verzekeringspremie, de tandarts: dat zijn geen verrassingen, ze komen elk jaar. Maar zonder
        apart potje betaal je ze uit je lopende maand, en dan klopt die maand niet meer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het vierde lek is levensstijlinflatie. Elke keer dat je meer ging verdienen, ging je net
        iets ruimer leven: een duurdere auto, een grotere woning, vaker uit eten. Niet verkeerd,
        maar het verklaart waarom je met twee keer het inkomen van tien jaar geleden alsnog niks
        overhoudt. Meer hierover lees je in mijn artikel over{" "}
        <Link
          href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          levensstijlinflatie
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Waarom meer verdienen het niet oplost
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De reflex is logisch: hou ik niks over, dan moet er meer bij. Maar in Nederland levert een
        bruto stijging vaak verrassend weinig netto op. Door de belastingschijven en de afbouw van de algemene heffingskorting en de arbeidskorting loopt het effectieve tarief op een groot deel van je inkomen op tot ver boven het schijftarief. En boven €78.426 betaal je over elke extra euro het toptarief van 49,5 procent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bovendien beweegt je uitgavenpatroon mee omhoog. Zolang het lek in de structuur zit, loopt
        een hoger inkomen er gewoon doorheen. Daarom voelt een opslag vaak na een paar maanden
        alweer als niks. Dat is geen gevoel, dat klopt. Ik leg het uit in mijn stuk over waarom{" "}
        <Link
          href="/inzichten/salarisverhoging-boven-76000-weinig-netto"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          een salarisverhoging zo weinig netto oplevert
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat wel werkt: eerst inzicht, dan structuur
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Mensen die hetzelfde verdienen maar wél overhouden, doen één ding anders. Ze laten hun
        inkomen niet op één hoop staan. Ze verdelen het meteen: vaste lasten van een aparte
        rekening, een vast bedrag voor dagelijkse uitgaven, en spaardoelen die automatisch worden
        afgeroomd op de dag dat het salaris binnenkomt. Wat overblijft is van hen, zonder
        schuldgevoel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar voordat je gaat verdelen, moet je weten wat er nu gebeurt. Niet schatten, maar zien.
        Pak de afschriften van de afgelopen twee maanden en tel drie dingen op: je vaste lasten,
        je dagelijkse uitgaven, en wat er werkelijk overblijft. Negen van de tien keer zit de
        verrassing in de middelste categorie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je dieper op de oorzaken in, lees dan ook{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          goed salaris en toch krap
        </Link>{" "}
        en, als je samen een huishouden voert,{" "}
        <Link
          href="/inzichten/tweeverdieners-toch-krap"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom tweeverdieners toch krap zitten
        </Link>
        .
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
          Wil je eindelijk zien waar het bij jou naartoe gaat? De gratis analyse legt het in een
          paar minuten bloot, zonder bankkoppeling en met het resultaat direct op je scherm.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
