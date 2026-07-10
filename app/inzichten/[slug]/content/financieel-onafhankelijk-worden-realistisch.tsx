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

function VrijheidsCalculator() {
  const [uitgaven, setUitgaven] = useState("");
  const [spaargeld, setSpaargeld] = useState("");

  const u = parseInt(uitgaven.replace(/[^\d]/g, "")) || 0;
  const s = parseInt(spaargeld.replace(/[^\d]/g, "")) || 0;

  const fireDoelJaar = u * 12 * 25;
  const niveau3Doel = Math.max(u * 60, 300000); // ~5x jaarsalaris / of 300k minimum
  const buffer = u * 6;

  let niveau = 0;
  let niveauLabel = "Nog geen buffer";
  let niveauKleur = "#B03A2E";
  if (s >= fireDoelJaar) { niveau = 4; niveauLabel = "Niveau 4, Volledig onafhankelijk"; niveauKleur = "#0B7A6E"; }
  else if (s >= niveau3Doel) { niveau = 3; niveauLabel = "Niveau 3, Vrijheid (meer keuze in werk)"; niveauKleur = "#0B7A6E"; }
  else if (s >= buffer * 2) { niveau = 2; niveauLabel = "Niveau 2, Veiligheid (maanden overbruggen)"; niveauKleur = "#0B7A6E"; }
  else if (s >= buffer) { niveau = 1; niveauLabel = "Niveau 1, Stabiliteit (6-maands buffer)"; niveauKleur = "#0B7A6E"; }

  const heeftResultaat = u > 0;

  const inputStyle = {
    padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D9DEDC",
    fontFamily: "inherit", fontSize: "0.875rem", color: "#16211F",
    backgroundColor: "white", outline: "none", width: "100%",
  } as const;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E6E9E7" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#16211F" }}>Op welk vrijheidsniveau zit jij?</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8B958F" }}>En hoeveel heb je nodig voor elk volgend niveau</p>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>
              Jullie maanduitgaven (netto)
            </label>
            <input type="text" inputMode="numeric" placeholder="€ 4.500" value={uitgaven} onChange={e => setUitgaven(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5A56" }}>
              Huidig vrij vermogen (spaargeld e.d.)
            </label>
            <input type="text" inputMode="numeric" placeholder="€ 50.000" value={spaargeld} onChange={e => setSpaargeld(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {heeftResultaat && (
          <div className="space-y-2">
            {s > 0 && (
              <div className="rounded-xl p-3" style={{ backgroundColor: niveauKleur === "#0B7A6E" ? "#E7F1EE" : "#FEF9EC", border: `1.5px solid ${niveauKleur}33` }}>
                <p className="font-body font-semibold text-sm" style={{ color: niveauKleur }}>
                  Jij zit nu op: {niveauLabel}
                </p>
              </div>
            )}
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#E6E9E7" }}>
              {[
                { lvl: 1, label: "Niveau 1, Stabiliteit", bedrag: buffer, uitleg: "6 maanden netto inkomen als buffer" },
                { lvl: 2, label: "Niveau 2, Veiligheid", bedrag: buffer * 2, uitleg: "Vaste lasten gedekt bij ontslag" },
                { lvl: 3, label: "Niveau 3, Vrijheid", bedrag: niveau3Doel, uitleg: "Werk is een keuze, niet een verplichting" },
                { lvl: 4, label: "Niveau 4, FIRE", bedrag: fireDoelJaar, uitleg: "25× jaaruitgaven, volledig onafhankelijk" },
              ].map(({ lvl, label, bedrag, uitleg }, i) => (
                <div key={lvl} className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3 font-body text-sm"
                  style={{ backgroundColor: s >= bedrag ? "#E7F1EE" : i % 2 ? "#FFFFFF" : "white" }}>
                  <div>
                    <p className="font-semibold" style={{ color: s >= bedrag ? "#0B7A6E" : "#16211F" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#8B958F" }}>{uitleg}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold" style={{ color: s >= bedrag ? "#0B7A6E" : "#16211F" }}>
                      €{bedrag.toLocaleString("nl-NL")}
                    </p>
                    {s < bedrag && (
                      <p className="text-xs" style={{ color: "#8B958F" }}>
                        nog €{(bedrag - s).toLocaleString("nl-NL")}
                      </p>
                    )}
                    {s >= bedrag && <p className="text-xs" style={{ color: "#0B7A6E" }}>✓ bereikt</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FinancieelOnafhankelijkWordenRealistisch() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom FIRE voor de meeste gezinnen niet werkt, en wat een realistischer doel is",
            "De vier vrijheidsniveaus: waar jij nu staat en wat het volgende niveau kost",
            "Hoe Thomas & Inge hun onhaalbare FIRE-doel omzetten naar een plan dat wél werkte",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F", fontSize: "1.05rem" }}>
        Thomas wilde op zijn 53e stoppen met werken. Niet omdat hij het werk haatte, hij wilde gewoon <em>kunnen</em> stoppen. De berekening: €1.740.000 nodig. Dat werd de dag dat hij zijn doel herdefinieerde. Niet stoppen, maar <strong>meer keuze</strong>. En dat plan werkte wél.
      </p>

      <h2 className="font-display" style={h2}>Financieel onafhankelijk is niet hetzelfde als stoppen</h2>
      <p className="font-body text-text-soft" style={p}>
        Voor de meeste mensen die goed verdienen betekent financiële onafhankelijkheid iets haalbaarders dan vroeg pensioen: <strong>niet meer elke maand afhankelijk zijn van dat ene salaris om de eindjes aan elkaar te knopen.</strong> Dat is al een enorm verschil met waar veel gezinnen nu staan.
      </p>

      <h2 className="font-display" style={h2}>De FIRE-mythe: waarom het voor gezinnen niet werkt</h2>
      <p className="font-body text-text-soft" style={p}>
        FIRE (Financial Independence, Retire Early) is populair. De kern: spaar 25 keer je jaaruitgaven op en leef van 4% per jaar. Wie €60.000 per jaar uitgeeft, heeft €1.500.000 nodig.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Box 3 belasting</p>
        <p className="font-body text-sm" style={{ color: "#0A6A5F" }}>
          Vermogen boven €57.000 (2026) wordt in box 3 belast tegen een effectief tarief van ruim 2% per jaar, ongeacht het werkelijke rendement. Bij €500.000 belegd vermogen betaal je €4.000 tot €6.000 per jaar aan vermogensbelasting. Dat knabbelt direct aan je 4%-onttrekking. FIRE-berekeningen zijn doorgaans Amerikaans en houden hier geen rekening mee.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Maar er is een bruikbaarder doel: <strong>niveau 3-vrijheid</strong>. Niet alles stoppen, maar genoeg opbouwen dat werk een keuze is in plaats van een verplichting.
      </p>

      <h2 className="font-display" style={h2}>De vier niveaus van financiële vrijheid</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 1, Stabiliteit:</strong> een buffer van drie tot zes maanden netto inkomen. Verrassend veel mensen met een goed inkomen hebben dit niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 2, Veiligheid:</strong> je vaste lasten worden gedekt door opgebouwd vermogen, ook zonder werk. Geen paniek bij ontslag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 3, Vrijheid:</strong> je kunt kiezen hoeveel en wat je werkt. Minder uren, ander werk, iets opbouwen naast je baan. Dit is het zinvolste doel voor de meeste gezinnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 4, Volledige onafhankelijkheid:</strong> het klassieke FIRE-eindpunt. Haalbaar voor weinigen, noodzakelijk voor vrijwel niemand.
      </p>

      <h2 className="font-display" style={h2}>Op welk niveau zit jij?</h2>
      <VrijheidsCalculator />

      <h2 className="font-display" style={h2}>Cas: Thomas &amp; Inge, FIRE-droom omgezet naar haalbaar plan</h2>
      <p className="font-body text-text-soft" style={p}>
        Thomas (43) en Inge (41) verdienen samen €7.500 netto per maand. Twee kinderen, koopwoning met €180.000 resterende hypotheek, overwaarde circa €280.000. Thomas wilde &ldquo;over tien jaar stoppen.&rdquo; Dat hadden ze nooit echt doorgerekend.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De berekening: ze gaven €5.800 per maand uit. FIRE-doel: 25 × €69.600 = <strong>€1.740.000</strong>. Ze hadden €148.000 spaargeld. In tien jaar haalbaar? Nee. Maar dat hoefde ook niet.
      </p>
      <VoorNa rows={[
        ["Doel", "Stoppen op 53", "Meer vrijheid op 53"],
        ["Benodigde som", "€1.740.000", "€500.000 vrij vermogen"],
        ["Maandelijkse inleg", "€600", "€1.200"],
        ["Verwacht vrij vermogen op 55", "€88.000", "€210.000+"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Ze herdefinieerden het doel: niet stoppen, maar <em>meer keuze</em>. Als ze op hun 55e €500.000 vrij vermogen hebben, bovenop pensioen en overwaarde, kan Thomas terugschroeven naar drie dagen. De maandelijkse inleg ging van €600 naar €1.200, wat bleek te kunnen na een analyse van hun uitgavenpatroon. Meer over dat patroon in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie: meer verdienen en toch krap</Link>.
      </p>

      <h2 className="font-display" style={h2}>Het enige getal dat ertoe doet</h2>
      <p className="font-body text-text-soft" style={p}>
        Het getal dat alles bepaalt is niet je inkomen, en niet je spaarsaldo. Het is je <strong>maandelijkse vrije cashflow</strong>, wat er overblijft na vaste lasten, levensonderhoud en pensioenopbouw. Als dat getal nul of negatief is, begin dan met begrijpen waar het geld naartoe gaat. Lees:{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap, hoe kan dat?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als er wél vrije cashflow is, zelfs €200 per maand, heb je een startpunt. Drie stappen: bereken je werkelijke cashflow via drie maanden bankafschriften, bepaal je doelniveau (vrijheid of volledige onafhankelijkheid), en maak de inleg automatisch op salarisdag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook:{" "}
        <Link href="/inzichten/spaardoelen-maandelijkse-inleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">spaardoelen en maandelijkse inleg: hoe pak je dat aan?</Link>{" "}
        en{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">de potjesmethode voor gezinnen</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoeveel ruimte je nu hebt?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
       , in 15 minuten zie je je vrije cashflow en of er meer mogelijk is dan je denkt. Als je dit wil uitwerken met iemand die concreet meekijkt, biedt Jarno een{" "}
        <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>{" "}
        aan.
      </p>
    </>
  );
}
