import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#1C3A2A" }}>
        {["", "Voor", "Na"].map((h, i) => (
          <div key={i} className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F5F0E8" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 ? "#FDFAF4" : "white" }}>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#1C3A2A", fontWeight: 500 }}>{r[0]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#B03A2E" }}>{r[1]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#2D6A4F", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

export default function GezamenlijkeRekeningVoorEnNadelen() {
  return (
    <>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Een gezamenlijke rekening klinkt logisch als je samenwoont. Maar het werkt lang niet voor iedereen — en als het niet werkt, zorgt het voor meer ruzie dan rust. Er is geen universeel juist systeem. Wat telt is dat jullie allebei achter de keuze staan.
      </p>

      <h2 className="font-display" style={h2}>De drie modellen die stellen gebruiken</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Volledig gezamenlijk:</strong> alles op één rekening. Werkt het best als jullie vergelijkbaar verdienen en dezelfde prioriteiten hebben.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Volledig gescheiden:</strong> elk een eigen rekening, vaste lasten verdeeld. Werkt als het inkomensverschil groot is of als jullie expliciet financiële zelfstandigheid willen bewaren.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Hybride:</strong> allebei een eigen rekening én een gezamenlijke rekening voor vaste lasten. Op salarisdag gaat een vast bedrag naar gezamenlijk — de rest is persoonlijk. Dit werkt voor de meeste stellen het beste.
      </p>

      <h2 className="font-display" style={h2}>Cas: Nadia &amp; Joris — van eindeloze discussies naar rust</h2>
      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte situatie.</strong> Naam en details aangepast voor privacy.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Nadia (29) verdient €2.400 netto, Joris (31) €3.100 netto. Ze woonden zes maanden samen en splitsten alles 50/50. Elke maand dezelfde discussies: wie betaalt de streamingdienst? Telt het cadeau voor zijn moeder als gezamenlijk? De supermarktboodschappen klopten nooit precies.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nadia voelde zich schuldig als ze iets voor zichzelf kocht — ze droeg immers minder bij. Joris voelde zich ongemakkelijk bij duurkere aankopen. De stress zat in de onduidelijkheid, niet in het geld zelf.
      </p>
      <VoorNa rows={[
        ["Systeem", "50/50, eigen rekening", "Hybride naar inkomen"],
        ["Gezamenlijke pot/mnd", "Onduidelijk", "€2.100 (vaste lasten)"],
        ["Bijdrage Joris", "50%", "56% (naar inkomen)"],
        ["Bijdrage Nadia", "50%", "44% (naar inkomen)"],
        ["Discussies over geld", "Wekelijks", "Vrijwel geen"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Ze stapten over op het hybride model: gezamenlijke vaste lasten (huur, energie, verzekeringen, boodschappen, uitjes) = €2.100 per maand, verdeeld naar inkomen. Joris draagt 56% bij (€1.176), Nadia 44% (€924). Wat daarna overblijft is vrij te besteden — zonder verantwoording.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De discussies stopten vrijwel direct. Joris kocht een spelconsole van zijn eigen geld — prima. Nadia boekte een weekend met een vriendin — ook prima. En voor het eerst begonnen ze ook te praten over gezamenlijke spaardoelen, iets wat daarvoor nooit van de grond kwam.
      </p>

      <h2 className="font-display" style={h2}>De voordelen van een gezamenlijke rekening</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Transparantie:</strong> je ziet allebei precies wat er binnenkomt en uitgaat. <strong>Minder administratie:</strong> één rekening, één overzicht. <strong>Makkelijker sparen voor gezamenlijke doelen:</strong> vakantie, verbouwing, auto — het geld staat op één plek. En voor sommige stellen voelt het gewoon als een bewuste keuze: we zijn een team.
      </p>

      <h2 className="font-display" style={h2}>De nadelen en valkuilen</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Verlies van autonomie:</strong> elke persoonlijke aankoop kan aanleiding zijn voor een gesprek. <strong>Ongelijk inkomen werkt wrijving op</strong> als de verdeling niet klopt. En een gezamenlijke rekening lost onderliggende gelddiscussies niet op — het is een systeem, geen remedie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Meer over geld en relatiestress:{" "}
        <Link href="/inzichten/geld-stress-relatie-nederland" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">geld en relatiestress — wat het doet en hoe je erover praat</Link>.
      </p>

      <h2 className="font-display" style={h2}>Hoe je het systeem concreet inricht</h2>
      <p className="font-body text-text-soft" style={p}>
        Bereken jullie gezamenlijke vaste lasten (huur/hypotheek, energie, verzekeringen, boodschappen, abonnementen). Voeg 10-15% toe als buffer voor onverwachte kosten. Bepaal de verdeelsleutel: 50/50 of naar inkomen. Automatiseer op salarisdag. Evalueer elk kwartaal.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat zijn normale vaste lasten om te verwachten? Lees:{" "}
        <Link href="/inzichten/wat-zijn-normale-vaste-lasten-gezin" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">normale vaste lasten voor een gezin in 2026</Link>{" "}
        en{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">seizoenskosten per maand: wat komt er wanneer aan?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je samen jullie financiële basis doorlichten?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        — samen, in 15 minuten. Of bespreek jullie situatie in een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>.
      </p>
    </>
  );
}
