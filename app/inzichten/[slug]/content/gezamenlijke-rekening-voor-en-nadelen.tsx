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

function BijdrageCalculator() {
  const [ink1, setInk1] = useState("");
  const [ink2, setInk2] = useState("");
  const [lasten, setLasten] = useState("");

  const i1 = parseFloat(ink1.replace(/[^\d]/g, "")) || 0;
  const i2 = parseFloat(ink2.replace(/[^\d]/g, "")) || 0;
  const l = parseFloat(lasten.replace(/[^\d]/g, "")) || 0;
  const totaal = i1 + i2;
  const pct1 = totaal > 0 ? Math.round((i1 / totaal) * 100) : 0;
  const pct2 = totaal > 0 ? Math.round((i2 / totaal) * 100) : 0;
  const bijdrage1 = totaal > 0 ? Math.round(l * (i1 / totaal)) : 0;
  const bijdrage2 = totaal > 0 ? Math.round(l * (i2 / totaal)) : 0;
  const vrij1 = i1 - bijdrage1;
  const vrij2 = i2 - bijdrage2;
  const heeftResultaat = i1 > 0 && i2 > 0 && l > 0;

  const inputStyle = {
    padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D9DEDC",
    fontFamily: "inherit", fontSize: "0.875rem", color: "#16211F",
    backgroundColor: "white", outline: "none", width: "100%",
  } as const;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E6E9E7" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#16211F" }}>Bereken jullie bijdrage naar inkomen</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8B958F" }}>Elk draagt bij naar aandeel, geen ruzie over wie meer betaalt</p>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>Inkomen partner 1 (netto/mnd)</label>
            <input type="text" inputMode="numeric" placeholder="€ 2.400" value={ink1} onChange={e => setInk1(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>Inkomen partner 2 (netto/mnd)</label>
            <input type="text" inputMode="numeric" placeholder="€ 3.100" value={ink2} onChange={e => setInk2(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>Gezamenlijke vaste lasten/mnd</label>
            <input type="text" inputMode="numeric" placeholder="€ 2.100" value={lasten} onChange={e => setLasten(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {heeftResultaat && (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E6E9E7" }}>
            <div className="grid grid-cols-3 text-xs font-body font-medium" style={{ backgroundColor: "#16211F", color: "#F7F8F7" }}>
              <div className="px-4 py-2"></div>
              <div className="px-4 py-2">Partner 1</div>
              <div className="px-4 py-2">Partner 2</div>
            </div>
            {[
              ["Inkomen", `€${i1.toLocaleString("nl-NL")}`, `€${i2.toLocaleString("nl-NL")}`],
              ["Aandeel", `${pct1}%`, `${pct2}%`],
              ["Bijdrage gezamenlijk", `€${bijdrage1.toLocaleString("nl-NL")}`, `€${bijdrage2.toLocaleString("nl-NL")}`],
              ["Vrij besteedbaar", `€${vrij1.toLocaleString("nl-NL")}`, `€${vrij2.toLocaleString("nl-NL")}`],
            ].map(([label, v1, v2], i) => (
              <div key={i} className="grid grid-cols-3 font-body text-sm" style={{ backgroundColor: i % 2 ? "#FFFFFF" : "white" }}>
                <div className="px-4 py-2.5 font-medium" style={{ color: "#16211F" }}>{label}</div>
                <div className="px-4 py-2.5" style={{ color: "#16211F" }}>{v1}</div>
                <div className="px-4 py-2.5" style={{ color: "#16211F" }}>{v2}</div>
              </div>
            ))}
            <div className="px-4 py-3" style={{ backgroundColor: "#E7F1EE" }}>
              <p className="font-body text-xs" style={{ color: "#16211F" }}>
                Beiden houden procentueel evenveel over van hun inkomen. Geen discussie meer over wie meer draagt.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GezamenlijkeRekeningVoorEnNadelen() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Welk systeem (volledig gezamenlijk, gescheiden, hybride) het beste bij jullie past",
            "Hoe Nadia & Joris van wekelijkse geldruzie naar vrijwel geen discussies gingen",
            "Hoeveel jullie elk zouden bijdragen bij een eerlijke verdeling naar inkomen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F", fontSize: "1.05rem" }}>
        Nadia en Joris hadden wekelijks ruzie over geld. Niet omdat ze slecht verdienden, samen €5.500 netto, maar omdat er geen systeem was. Wie betaalt de streamingdienst? Telt het cadeau voor zijn moeder als gezamenlijk? Ze hadden nooit expliciet afgesproken hoe het geld verdeeld werd. Dat veranderde met één beslissing.
      </p>

      <h2 className="font-display" style={h2}>De drie systemen die stellen gebruiken</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Volledig gezamenlijk:</strong> alles op één rekening. Werkt het best als jullie vergelijkbaar verdienen en dezelfde prioriteiten hebben.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Volledig gescheiden:</strong> elk een eigen rekening, vaste lasten verdeeld. Werkt als het inkomensverschil groot is of als jullie financiële zelfstandigheid willen bewaren.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Hybride:</strong> allebei een eigen rekening én een gezamenlijke rekening voor vaste lasten. Op salarisdag gaat een vast bedrag naar gezamenlijk, de rest is persoonlijk. Dit werkt voor de meeste stellen het beste.
      </p>

      <h2 className="font-display" style={h2}>Cas: Nadia &amp; Joris, van eindeloze discussies naar rust</h2>
      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte situatie.</strong> Naam en details aangepast voor privacy.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Nadia (29) verdient €2.400 netto, Joris (31) €3.100 netto. Ze woonden zes maanden samen en splitsten alles 50/50. Elke maand dezelfde discussies: wie betaalt de streamingdienst? Telt het cadeau voor zijn moeder als gezamenlijk? De supermarktboodschappen klopten nooit precies.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nadia voelde zich schuldig als ze iets voor zichzelf kocht, ze droeg immers minder bij. Joris voelde zich ongemakkelijk bij duurdere aankopen. De stress zat in de onduidelijkheid, niet in het geld zelf.
      </p>
      <VoorNa rows={[
        ["Systeem", "50/50, eigen rekening", "Hybride naar inkomen"],
        ["Gezamenlijke pot/mnd", "Onduidelijk", "€2.100 (vaste lasten)"],
        ["Bijdrage Joris", "50%", "56% (naar inkomen)"],
        ["Bijdrage Nadia", "50%", "44% (naar inkomen)"],
        ["Discussies over geld", "Wekelijks", "Vrijwel geen"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Ze stapten over op het hybride model: gezamenlijke vaste lasten €2.100 per maand, verdeeld naar inkomen. Joris draagt 56% bij (€1.176), Nadia 44% (€924). Wat daarna overblijft is vrij te besteden, zonder verantwoording.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De discussies stopten. Joris kocht een spelconsole van zijn eigen geld. Nadia boekte een weekend met een vriendin. En voor het eerst begonnen ze te praten over gezamenlijke spaardoelen, iets wat daarvoor nooit van de grond kwam.
      </p>

      <h2 className="font-display" style={h2}>Bereken jullie eigen verdeling</h2>
      <BijdrageCalculator />

      <h2 className="font-display" style={h2}>De voordelen van een gezamenlijke rekening</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Transparantie:</strong> je ziet allebei precies wat er binnenkomt en uitgaat. <strong>Minder administratie:</strong> één rekening, één overzicht. <strong>Makkelijker sparen voor gezamenlijke doelen:</strong> vakantie, verbouwing, auto, het geld staat op één plek. En voor sommige stellen voelt het als een bewuste keuze: we zijn een team.
      </p>

      <h2 className="font-display" style={h2}>De nadelen en valkuilen</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Verlies van autonomie:</strong> elke persoonlijke aankoop kan aanleiding zijn voor een gesprek. <strong>Ongelijk inkomen werkt wrijving op</strong> als de verdeling niet klopt. En een gezamenlijke rekening lost onderliggende gelddiscussies niet op, het is een systeem, geen remedie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Meer over geld en relatiestress:{" "}
        <Link href="/inzichten/geld-stress-relatie-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">geld en relatiestress, wat het doet en hoe je erover praat</Link>.
      </p>

      <h2 className="font-display" style={h2}>Hoe je het systeem concreet inricht</h2>
      <p className="font-body text-text-soft" style={p}>
        Bereken jullie gezamenlijke vaste lasten (huur/hypotheek, energie, verzekeringen, boodschappen, abonnementen). Voeg 10-15% toe als buffer voor onverwachte kosten. Bepaal de verdeelsleutel: 50/50 of naar inkomen. Automatiseer op salarisdag. Evalueer elk kwartaal, inkomens en lasten veranderen, een systeem dat nu werkt kan over een jaar niet meer kloppen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat zijn normale vaste lasten? Lees:{" "}
        <Link href="/inzichten/wat-zijn-normale-vaste-lasten-gezin" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">normale vaste lasten voor een gezin in 2026</Link>{" "}
        en{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">seizoenskosten per maand: wat komt er wanneer aan?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je samen jullie financiële basis doorlichten?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>{" "}
       , samen, in 15 minuten. Of bespreek jullie situatie in een{" "}
        <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/samen-te-veel-verdiend-toeslag-kwijt" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">samen net te veel verdiend en je toeslag kwijt</Link> en <Link href="/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">kosten eerlijk verdelen bij een ongelijk inkomen</Link>.</p>
    </>
  );
}
