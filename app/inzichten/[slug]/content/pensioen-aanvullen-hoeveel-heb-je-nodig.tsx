'use client';
import { useState } from "react";
import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E6E9E7" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#16211F" }}>
        {["", "Voor", "Na"].map((h, i) => (
          <div key={i} className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F7F8F7" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 ? "#FFFFFF" : "white" }}>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#16211F", fontWeight: 500 }}>{r[0]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#B03A2E" }}>{r[1]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#0B7A6E", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

function PensioenGapChecker() {
  const [pen1, setPen1] = useState("");
  const [pen2, setPen2] = useState("");
  const [gewenst, setGewenst] = useState("");

  const p1 = parseInt(pen1.replace(/[^\d]/g, "")) || 0;
  const p2 = parseInt(pen2.replace(/[^\d]/g, "")) || 0;
  const gw = parseInt(gewenst.replace(/[^\d]/g, "")) || 0;
  const aow = 2850; // stel 2026
  const totaalVerwacht = p1 + p2 + aow;
  const gat = Math.max(0, gw - totaalVerwacht);
  const gatOverJaar = gat * 12;
  const gat25Jaar = gat * 12 * 25;
  const heeftResultaat = (p1 > 0 || p2 > 0) && gw > 0;

  const inputStyle = {
    padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D9DEDC",
    fontFamily: "inherit", fontSize: "0.875rem", color: "#16211F",
    backgroundColor: "white", outline: "none", width: "100%",
  } as const;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E6E9E7" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#16211F" }}>Bereken je pensioengat</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8B958F" }}>
          Cijfers vind je op <a href="https://www.mijnpensioenoverzicht.nl" target="_blank" rel="noopener noreferrer" style={{ color: "#0B7A6E", textDecoration: "none" }}>mijnpensioenoverzicht.nl</a> (5 min met DigiD)
        </p>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>
              Verwacht pensioen partner 1/mnd
            </label>
            <input type="text" inputMode="numeric" placeholder="€ 820" value={pen1} onChange={e => setPen1(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>
              Verwacht pensioen partner 2/mnd
            </label>
            <input type="text" inputMode="numeric" placeholder="€ 610" value={pen2} onChange={e => setPen2(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>
              Gewenst netto inkomen/mnd
            </label>
            <input type="text" inputMode="numeric" placeholder="€ 3.500" value={gewenst} onChange={e => setGewenst(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {heeftResultaat && (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: gat > 0 ? "#FCA5A5" : "#9CCFC4" }}>
            <div className="p-4" style={{ backgroundColor: gat > 0 ? "#FEF2F2" : "#E7F1EE" }}>
              <div className="space-y-1.5 text-sm font-body">
                <div className="flex justify-between">
                  <span style={{ color: "#4A5A56" }}>AOW (stel, 2026)</span>
                  <span style={{ color: "#16211F" }}>€{aow.toLocaleString("nl-NL")}/mnd</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#4A5A56" }}>Jullie pensioen samen</span>
                  <span style={{ color: "#16211F" }}>€{(p1+p2).toLocaleString("nl-NL")}/mnd</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1.5" style={{ borderColor: gat > 0 ? "#FCA5A5" : "#9CCFC4" }}>
                  <span style={{ color: "#16211F" }}>Verwacht totaal</span>
                  <span style={{ color: "#16211F" }}>€{totaalVerwacht.toLocaleString("nl-NL")}/mnd</span>
                </div>
              </div>
            </div>
            {gat > 0 ? (
              <div className="p-4 border-t" style={{ borderColor: "#FCA5A5", backgroundColor: "white" }}>
                <p className="font-body font-bold text-base" style={{ color: "#B03A2E" }}>
                  Pensioengat: €{gat.toLocaleString("nl-NL")}/mnd
                </p>
                <p className="font-body text-sm mt-1" style={{ color: "#4A5A56" }}>
                  Over 25 jaar pensioen: €{gat25Jaar.toLocaleString("nl-NL")} totaal te kort.
                </p>
                <p className="font-body text-xs mt-2" style={{ color: "#8B958F" }}>
                  Dit is het moment om te kijken of je werkgever aanvullende opbouw biedt, of een lijfrentespaarrekening zin heeft.
                </p>
              </div>
            ) : (
              <div className="p-4 border-t" style={{ borderColor: "#9CCFC4", backgroundColor: "white" }}>
                <p className="font-body font-bold text-base" style={{ color: "#0B7A6E" }}>
                  Jullie verwacht pensioen dekt jullie doel.
                </p>
                <p className="font-body text-xs mt-1" style={{ color: "#5C6B5F" }}>
                  Controleer dit jaarlijks, elk jaar bijhouden is genoeg.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PensioenAanvullenHoeveel() {
  return (
    <>
      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte case.</strong> Naam en details aangepast voor privacy. Pensioenbedragen zijn indicatief, check je eigen situatie via mijnpensioenoverzicht.nl.
        </p>
      </div>

      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "In welke vier situaties een pensioengat vrijwel zeker is (jobswitch, parttime, zzp, nooit gecheckt)",
            "Hoe Mieke & Bas een gat van €390.000 ontdekten, en voor €175/mnd oplosten",
            "Wat je zelf kunt doen: werkgeversregeling, lijfrentespaarrekening, vrij vermogen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F", fontSize: "1.05rem" }}>
        De meeste mensen die goed verdienen denken: het pensioen regelt zich wel. Dat klopt, totdat je er écht naar kijkt. Dan blijkt er een gat van tienduizenden euro&apos;s te zijn ontstaan, gewoon omdat je een keer van baan wisselde, een paar jaar parttime werkte, of nooit checkte wat er daadwerkelijk opgebouwd werd.
      </p>

      <h2 className="font-display" style={h2}>Hoe pensioenopbouw werkt, en waar het misgaat</h2>
      <p className="font-body text-text-soft" style={p}>
        Je bouwt pensioen op via drie pijlers. De AOW van de overheid levert een stel in 2026 circa €2.850 netto per maand op. Je werkgeverspensioen bouw je op per baan, bij elke overstap blijft het bij het oude fonds staan, maar groeit het niet automatisch mee. En het aanvullende pensioen dat je zelf regelt? Dat laten de meeste mensen links liggen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De vuistregel: voor een comfortabel pensioen heb je ongeveer 70% van je huidige netto inkomen nodig. Bij een gezin dat nu €4.500 per maand uitgeeft, is dat €3.150 per maand, terwijl de AOW voor twee mensen maximaal circa €2.850 dekt. Het gat daartussenin bouw je zelf op.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Jobswitch-effect</p>
        <p className="font-body text-sm" style={{ color: "#0A6A5F" }}>
          Elke keer dat je van baan wisselt, stop je met opbouwen bij het oude fonds en begin je opnieuw bij een nieuwe. Dat is op zich geen probleem, het opgebouwde blijft staan. Maar de pensioengrondslag en het opbouwpercentage kunnen sterk verschillen tussen werkgevers. Drie jobswitches in tien jaar kan makkelijk €50.000 tot €100.000 opbouw schelen.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Wanneer heb jij een pensioengat?</h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn vier situaties die een pensioengat vrijwel zeker maken: je bent ooit van baan gewisseld, je hebt een periode parttime gewerkt, je bent zzp&apos;er (geweest), of je hebt je pensioenoverzicht nooit bekeken. Bij een jobswitch kan het verschil makkelijk €50.000 tot €100.000 zijn. Vijf jaar parttime is twintig procent minder opbouw, permanent.
      </p>

      <h2 className="font-display" style={h2}>Cas: Mieke &amp; Bas, €280.000 gemist zonder het te weten</h2>
      <p className="font-body text-text-soft" style={p}>
        Mieke (37) en Bas (39) verdienen samen €6.200 netto per maand. Bas had in tien jaar drie banen gehad en zijn pensioen telkens &ldquo;laten staan.&rdquo; Mieke werkte drie jaar parttime na de geboorte van hun oudste. Ze hadden nooit mijnpensioenoverzicht.nl bezocht.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Toen ze dat wél deden: Bas&apos; verwachte uitkering €820 per maand. Mieke&apos;s verwachting €610 per maand. Samen met de AOW: circa €3.140 per maand, terwijl ze nu €4.500 uitgeven. Het gat: meer dan €1.300 per maand. Over 25 jaar pensioen is dat €390.000.
      </p>
      <VoorNa rows={[
        ["Verwacht pensioen Bas", "€820/mnd", "€2.100/mnd"],
        ["Verwacht pensioen Mieke", "€610/mnd", "€2.000/mnd"],
        ["Totaal incl. AOW", "€3.140/mnd", "€4.100/mnd"],
        ["Netto extra inleg", "—", "€175/mnd"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Bas ontdekte dat zijn werkgever een netto pensioenregeling aanbood waarvoor hij zich nooit had aangemeld. Nul euro kosten, €4.200 extra opbouw per jaar. Mieke begon via haar werkgever een aanvullende lijfrente te storten van €250 bruto per maand, na belastingvoordeel kostte het haar €175 netto.
      </p>

      <h2 className="font-display" style={h2}>Check jouw eigen situatie</h2>
      <PensioenGapChecker />

      <h2 className="font-display" style={h2}>Hoe je aanvult, drie opties</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 1: Check je bestaande werkgeversregeling.</strong> Veel werkgevers bieden ruimere pensioenregelingen dan werknemers weten. Vrijwillig bijstorten is vaak mogelijk, soms met belastingvoordeel. Kosten om te onderzoeken: nul.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 2: Lijfrenterekening of bankspaarrekening.</strong> Je spaart zelf op een geblokkeerde rekening. Het bedrag dat je jaarlijks mag aftrekken heet de jaarruimte, bij een inkomen van €60.000 bruto is dat al gauw €3.000 tot €5.000 per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Optie 3: Vrij vermogen opbouwen.</strong> Spaargeld, overwaarde of inkomsten naast je werk tellen mee voor je financiële vrijheid op latere leeftijd, ook al heet het officieel geen pensioen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Begin op je <strong>35e</strong> met €200 per maand, dan heb je op je 67e bij 4% groei circa €190.000 opgebouwd. Begin op je <strong>45e</strong> met hetzelfde bedrag: circa €88.000. Tijd is het enige dat hier echt telt.
      </p>

      <h2 className="font-display" style={h2}>Eerst inzicht in je maandbudget</h2>
      <p className="font-body text-text-soft" style={p}>
        Als je nu al het gevoel hebt dat de maand op is voor het salaris er weer is, is pensioen aanvullen pas stap twee. Stap één is begrijpen waar je geld nu naartoe gaat. Lees ook:{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap, hoe kan dat?</Link>{" "}
        en{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoeveel sparen per maand is normaal in Nederland?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoe jouw situatie eruitziet?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
       , dan zie je in 15 minuten of er een gat is en hoe groot. Als je het wil uitwerken met iemand die concreet meekijkt, biedt Jarno een{" "}
        <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>{" "}
        aan, inclusief een eerlijk beeld van je pensioen.
      </p>
    </>
  );
}
