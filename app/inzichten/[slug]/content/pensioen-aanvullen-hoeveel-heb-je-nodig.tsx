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

export default function PensioenAanvullenHoeveel() {
  return (
    <>
      <div className="rounded-xl border p-4 mb-8" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte case.</strong> Naam en details aangepast voor privacy. Pensioenbedragen zijn indicatief — check je eigen situatie via mijnpensioenoverzicht.nl.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        De meeste mensen die goed verdienen denken: het pensioen regelt zich wel. Dat klopt — totdat je er écht naar kijkt. Dan blijkt er een gat van tienduizenden euro&apos;s te zijn ontstaan, gewoon omdat je een keer van baan wisselde, een paar jaar parttime werkte, of nooit checkte wat er daadwerkelijk opgebouwd werd.
      </p>

      <h2 className="font-display" style={h2}>Hoe pensioenopbouw werkt — en waar het misgaat</h2>
      <p className="font-body text-text-soft" style={p}>
        Je bouwt pensioen op via drie pijlers. De AOW van de overheid levert een alleenstaande in 2026 circa €1.400 netto per maand op. Je werkgeverspensioen bouw je op per baan — bij elke overstap blijft het bij het oude fonds staan, maar groeit het niet automatisch mee. En het aanvullende pensioen dat je zelf regelt? Dat laten de meeste mensen links liggen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De vuistregel: voor een comfortabel pensioen heb je ongeveer 70% van je huidige netto inkomen nodig. Bij een gezin dat nu €4.500 per maand uitgeeft, is dat €3.150 per maand — terwijl de AOW voor twee mensen maximaal circa €2.850 dekt. Het gat daartussenin bouw je zelf op.
      </p>

      <h2 className="font-display" style={h2}>Wanneer heb jij een pensioengat?</h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn vier situaties die een pensioengat vrijwel zeker maken: je bent ooit van baan gewisseld, je hebt een periode parttime gewerkt, je bent zzp&apos;er (geweest), of je hebt je pensioenoverzicht nooit bekeken. Bij een jobswitch kan het verschil makkelijk €50.000 tot €100.000 zijn. Vijf jaar parttime is twintig procent minder opbouw — permanent.
      </p>

      <h2 className="font-display" style={h2}>Cas: Mieke &amp; Bas — €280.000 gemist zonder het te weten</h2>
      <p className="font-body text-text-soft" style={p}>
        Mieke (37) en Bas (39) verdienen samen €6.200 netto per maand. Bas had in tien jaar drie banen gehad en zijn pensioen telkens &ldquo;laten staan.&rdquo; Mieke werkte drie jaar parttime na de geboorte van hun oudste. Ze hadden nooit mijnpensioenoverzicht.nl bezocht.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Toen ze dat wél deden: Bas&apos; verwachte uitkering €820 per maand. Mieke&apos;s verwachting €610 per maand. Samen met de AOW: circa €3.140 per maand — terwijl ze nu €4.500 uitgeven. Het gat: meer dan €1.300 per maand. Over 25 jaar pensioen is dat €390.000.
      </p>
      <VoorNa rows={[
        ["Verwacht pensioen Bas", "€820/mnd", "€2.100/mnd"],
        ["Verwacht pensioen Mieke", "€610/mnd", "€2.000/mnd"],
        ["Totaal incl. AOW", "€3.140/mnd", "€4.100/mnd"],
        ["Netto extra inleg", "—", "€175/mnd"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Bas ontdekte dat zijn werkgever een netto pensioenregeling aanbood waarvoor hij zich nooit had aangemeld. Nul euro kosten, €4.200 extra opbouw per jaar. Mieke begon via haar werkgever een aanvullende lijfrente te storten van €250 bruto per maand — na belastingvoordeel kostte het haar €175 netto.
      </p>

      <h2 className="font-display" style={h2}>Hoe je aanvult — drie opties</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 1: Check je bestaande werkgeversregeling.</strong> Veel werkgevers bieden ruimere pensioenregelingen dan werknemers weten. Vrijwillig bijstorten is vaak mogelijk, soms met belastingvoordeel. Kosten om te onderzoeken: nul.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 2: Lijfrenterekening of bankspaarrekening.</strong> Je spaart zelf op een geblokkeerde rekening. Het bedrag dat je jaarlijks mag aftrekken heet de jaarruimte — bij een inkomen van €60.000 bruto is dat al gauw €3.000 tot €5.000 per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 3: Vrij vermogen opbouwen.</strong> Spaargeld, overwaarde of inkomsten naast je werk tellen mee voor je financiële vrijheid op latere leeftijd — ook al heet het officieel geen pensioen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Begin op je <strong>35e</strong> met €200 per maand, dan heb je op je 67e bij 4% groei circa €190.000 opgebouwd. Begin op je <strong>45e</strong> met hetzelfde bedrag: circa €88.000. Tijd is het enige dat hier echt telt.
      </p>

      <h2 className="font-display" style={h2}>Eerst inzicht in je maandbudget</h2>
      <p className="font-body text-text-soft" style={p}>
        Als je nu al het gevoel hebt dat de maand op is voor het salaris er weer is, is pensioen aanvullen pas stap twee. Stap één is begrijpen waar je geld nu naartoe gaat. Lees ook:{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap — hoe kan dat?</Link>{" "}
        en{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoeveel sparen per maand is normaal in Nederland?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoe jouw situatie eruitziet?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        — dan zie je in 15 minuten of er een gat is en hoe groot. Als je het wil uitwerken met iemand die concreet meekijkt, biedt Jarno een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>{" "}
        aan — inclusief een eerlijk beeld van je pensioen.
      </p>
    </>
  );
}
