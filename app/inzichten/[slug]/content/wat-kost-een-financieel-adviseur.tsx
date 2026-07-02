'use client';
import { useState } from "react";
import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function KostenVergelijker() {
  const [uren, setUren] = useState("");
  const [tarief, setTarief] = useState("200");

  const urenNum = parseFloat(uren) || 0;
  const tariefNum = parseFloat(tarief) || 0;
  const traditioneel = urenNum * tariefNum;
  const besparing = traditioneel - 125;
  const heeftResultaat = urenNum > 0 && tariefNum > 0;

  const inputStyle = {
    padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D6CEBC",
    fontFamily: "inherit", fontSize: "0.875rem", color: "#1C3A2A",
    backgroundColor: "white", outline: "none", width: "100%",
  } as const;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FDFAF4", borderColor: "#E8E0D4" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E8E0D4" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#1C3A2A" }}>Wat betaal je bij een traditionele adviseur?</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8A9E8E" }}>Vergelijk het met een eenmalig gesprek van €125</p>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs font-medium block mb-1.5" style={{ color: "#4A5E4E" }}>Aantal uur advies</label>
            <input
              type="text" inputMode="numeric" value={uren}
              onChange={e => setUren(e.target.value)}
              placeholder="bijv. 3"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium block mb-1.5" style={{ color: "#4A5E4E" }}>Uurtarief adviseur (€)</label>
            <select
              value={tarief} onChange={e => setTarief(e.target.value)}
              style={inputStyle}
            >
              <option value="150">€150/uur (laag)</option>
              <option value="200">€200/uur (gemiddeld)</option>
              <option value="250">€250/uur (hoog)</option>
              <option value="300">€300/uur (vermogensbeheer)</option>
            </select>
          </div>
        </div>

        {heeftResultaat && (
          <div className="rounded-xl p-4 mt-2 space-y-3" style={{ backgroundColor: "#F5F0E8", border: "1px solid #E8E0D4" }}>
            <div className="flex justify-between items-center">
              <span className="font-body text-sm" style={{ color: "#4A5E4E" }}>Traditionele adviseur ({urenNum}u × €{tariefNum})</span>
              <span className="font-body text-sm font-semibold" style={{ color: "#B03A2E" }}>€{traditioneel.toLocaleString("nl-NL")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body text-sm" style={{ color: "#4A5E4E" }}>Eenmalig adviesgesprek Waar blijft het</span>
              <span className="font-body text-sm font-semibold" style={{ color: "#2D6A4F" }}>€125</span>
            </div>
            <div className="border-t pt-3" style={{ borderColor: "#D6CEBC" }}>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm font-semibold" style={{ color: "#1C3A2A" }}>Verschil</span>
                <span className="font-body text-base font-bold" style={{ color: besparing > 0 ? "#2D6A4F" : "#1C3A2A" }}>
                  {besparing > 0 ? `€${besparing.toLocaleString("nl-NL")} goedkoper` : "vergelijkbaar"}
                </span>
              </div>
              {besparing > 0 && (
                <p className="font-body text-xs mt-1" style={{ color: "#8A9E8E" }}>
                  Dat is {Math.round(besparing / 125 * 10) / 10}× de prijs van één gesprek bij Waar blijft het.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#1C3A2A" }}>
        {["", "Traditioneel", "Waar blijft het"].map((h, i) => (
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

export default function WatKostEenFinancieelAdviseur() {
  return (
    <div className="font-body text-text-soft" style={{ lineHeight: 1.75 }}>

      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat een traditionele financieel adviseur kost, en waarom dat voor de meeste gezinnen te duur is",
            "Wanneer je een dure adviseur echt nodig hebt, en wanneer niet",
            "Hoe Lisanne en Thijs voor €125 meer inzicht kregen dan na drie jaar bij hun bank",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hook */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Lisanne zocht op "financieel adviseur" en klikte op het eerste resultaat. Onderaan de pagina stond een tarief: €220 per uur, minimaal twee uur voor een intakegesprek. Ze sloot het tabblad.
      </p>
      <p style={p}>
        Ze is niet de enige. Veel mensen die weten dat ze hulp nodig hebben bij hun financiën, haken af zodra ze de kosten zien. En dat terwijl er grote prijsverschillen zijn, afhankelijk van wat je nodig hebt, hoe ingewikkeld je situatie is, en of je eigenlijk wel een Wft-gecertificeerd adviseur nodig hebt.
      </p>

      <h2 className="font-display" style={h2}>Wat kost een financieel adviseur per uur?</h2>
      <p style={p}>
        De meeste onafhankelijke financieel adviseurs rekenen een uurtarief tussen de <strong>€150 en €300</strong>. Banken en grootschalige kantoren zitten aan de bovenkant; zzp-adviseurs soms iets lager. Wat je ervoor krijgt:
      </p>
      <ul className="space-y-2 mb-5" style={{ paddingLeft: "1.25rem" }}>
        {[
          "Een inventarisatie van je situatie (1–2 uur, dus €150–€600 alleen al voor het intakegesprek)",
          "Een financieel plan op maat, inclusief pensioen, vermogen en risico (2–5 uur)",
          "Jaarlijkse herziening, opnieuw betaald",
        ].map((item, i) => (
          <li key={i} className="font-body text-sm" style={{ color: "#4A5E4E", listStyleType: "disc" }}>{item}</li>
        ))}
      </ul>
      <p style={p}>
        Tel je dat op, dan kom je voor een volledig adviestraject snel op <strong>€800 tot €2.000</strong>, éénmalig. En dat is exclusief de jaarlijkse kosten als je doorlopend begeleid wilt worden.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Verborgen kosten</p>
        <p className="font-body text-sm" style={{ color: "#5C3D1E" }}>
          Niet alle adviseurs werken op uurbasis. Sommige rekenen een percentage van je vermogen (0,5–1,5% per jaar) of krijgen provisie van producten die ze adviseren. Bij €200.000 vermogen is 1% per jaar €2.000, elk jaar opnieuw. Vraag altijd expliciet hoe een adviseur wordt betaald voordat je een gesprek inplant.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Wanneer heb je écht een dure adviseur nodig?</h2>
      <p style={p}>
        Een geregistreerd financieel adviseur (Wft-gecertificeerd) is verplicht voor specifieke producten: hypotheken, beleggingsverzekeringen, en pensioenoverdrachten. Heb je een hypotheek nodig, of wil je vermogen beleggen? Dan is een gecertificeerde adviseur de juiste keuze, ook al kost het meer.
      </p>
      <p style={p}>
        Maar de meeste mensen die zoeken op "financieel adviseur" hebben daar helemaal geen behoefte aan. Ze willen weten waarom er aan het einde van de maand niets overblijft. Ze willen inzicht in hun uitgaven. Ze willen grip, niet een beleggingsplan.
      </p>

      <h2 className="font-display" style={h2}>Lisanne en Thijs, drie jaar bij de bank, nul inzicht</h2>
      <p style={p}>
        Lisanne (38) en Thijs (40) hadden een gezinsinkomen van €6.200 netto. Ze hadden jaren geleden een "financieel check-up" gedaan bij hun bank. De adviseur had ze een pensioenplan laten zien en aangeraden om maandelijks €150 extra in te leggen. Ze deden dat braaf.
      </p>
      <p style={p}>
        Maar elke maand was er nog steeds te weinig over. Ze wisten niet waarheen het geld ging. De bankadviseur had nooit naar hun maandbudget gekeken, alleen naar hun vermogen en pensioen. Dat is precies het verschil.
      </p>

      <VoorNa rows={[
        ["Focus", "Pensioen en vermogen", "Maandbudget en uitkomst"],
        ["Tarief", "€220/uur × 3u = €660", "€125 eenmalig"],
        ["Resultaat", "Pensioenplan, geen dagelijks inzicht", "Concreet: €380/mnd bespaard"],
        ["Verplichting", "Doorlopend advies aangeboden", "Geen, eenmalig compleet"],
      ]} />

      <p style={p}>
        Na een analyse en een gesprek van 45 minuten wisten Lisanne en Thijs wat ze misten: abonnementen die ze waren vergeten (€89/mnd), een flexibel budget voor boodschappen dat geen maximum had, en een gezamenlijke rekening zonder afspraken. Drie aanpassingen, €380 per maand meer ruimte.
      </p>

      <KostenVergelijker />

      <h2 className="font-display" style={h2}>Wat bepaalt de prijs?</h2>
      <p style={p}>
        Naast het uurtarief zijn er vier factoren die de totale kosten bepalen:
      </p>
      <p style={p}>
        <strong>Complexiteit.</strong> Een stel met twee inkomens, een hypotheek, kinderen en een eigen bedrijf heeft een complexere situatie dan iemand met een vast salaris. Meer complexiteit = meer uren.
      </p>
      <p style={p}>
        <strong>Wft-certificering.</strong> Adviseurs die gecertificeerd zijn voor hypotheek- of beleggingsadvies hebben hogere operationele kosten. Dat zie je terug in hun tarief.
      </p>
      <p style={p}>
        <strong>Locatie.</strong> Adviseurs in Amsterdam of Utrecht rekenen doorgaans meer dan in kleine steden.
      </p>
      <p style={p}>
        <strong>Doorlopend of eenmalig.</strong> Een eenmalig gesprek kost altijd minder dan een begeleidingstraject, maar een traject geeft ook meer structuur en aansturing.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Gratis advies bestaat niet echt</p>
        <p className="font-body text-sm" style={{ color: "#5C3D1E" }}>
          "Gratis financieel advies" via de bank of een verzekeraar is niet gratis, de adviseur verdient provisie op de producten die je afsluit. Dat is op zich niet fout, maar je belangen hoeven dan niet parallel te lopen. Een onafhankelijk adviseur die je vooraf een uurtarief noemt is transparanter.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Voor wie is welk type advies?</h2>
      <p style={p}>
        Hypotheek, vermogensbeheer, pensioenoverdracht, beleggingsverzekering → gecertificeerde Wft-adviseur nodig. Reken op €150–€300/uur, minimaal twee uur.
      </p>
      <p style={p}>
        Maandbudget inzichtelijk maken, uitgavenpatroon begrijpen, grip op vaste lasten, concrete doelen stellen → geen Wft-adviseur nodig. Een eenmalig{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">financieel adviesgesprek van €125</Link>{" "}
        is voldoende voor de meeste gezinnen.
      </p>
      <p style={p}>
        Ben je er niet zeker van wat je nodig hebt? Begin dan met de{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>{" "}
       , die geeft je direct inzicht in je situatie, zonder kosten en zonder verplichting. Op basis daarvan weet je of een eenmalig gesprek voldoende is of dat je meer nodig hebt.
      </p>

      <p style={p}>
        Wil je weten of een eenmalig gesprek voor jouw situatie genoeg is?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
       , dan zie je in 5 minuten wat de grootste afwijking in jullie budget is. Of bespreek het direct in een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig financieel adviesgesprek van €125</Link>. Benieuwd wat coaching in de markt kost? Lees{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">wat kost een financieel coach</Link>.
      </p>
    </div>
  );
}
