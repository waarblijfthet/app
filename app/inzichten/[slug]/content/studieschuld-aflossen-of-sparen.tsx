'use client';
import { useState } from "react";
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

function RenteVergelijkerFixed() {
  const [extra, setExtra] = useState("280");
  const [spaarRente, setSpaarRente] = useState("2.90");

  const extraNum = parseFloat(extra.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const sp = parseFloat(spaarRente.replace(",", ".")) || 2.9;
  const sr = 2.56; // vast 2026

  const rendementAflossen = extraNum * (sr / 100);
  const rendementSparen = extraNum * (sp / 100);
  const verschilJaar = rendementSparen - rendementAflossen;
  const bufferNaJaar = Math.round(extraNum * 12);
  const sparenWint = sp >= sr;

  const fmt = (n: number) => n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputStyle = {
    padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D6CEBC",
    fontFamily: "inherit", fontSize: "0.875rem", color: "#1C3A2A",
    backgroundColor: "white", outline: "none", width: "100%",
  } as const;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FDFAF4", borderColor: "#E8E0D4" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E8E0D4" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#1C3A2A" }}>Reken het door voor jouw situatie</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8A9E8E" }}>Studierente 2026 is vastgesteld op 2,56%</p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5E4E" }}>
              Extra aflossing per maand
            </label>
            <input
              type="text" inputMode="decimal" value={extra}
              onChange={e => setExtra(e.target.value)} style={inputStyle} placeholder="€ 280"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium mb-1.5 block" style={{ color: "#4A5E4E" }}>
              Spaarrente bij jouw bank (%)
            </label>
            <input
              type="text" inputMode="decimal" value={spaarRente}
              onChange={e => setSpaarRente(e.target.value)} style={inputStyle} placeholder="2.90"
            />
          </div>
        </div>
        {extraNum > 0 && (
          <div className="rounded-xl border p-4" style={{ backgroundColor: "white", borderColor: "#E8E0D4" }}>
            <div className="space-y-2 text-sm font-body mb-3">
              <div className="flex justify-between">
                <span style={{ color: "#4A5E4E" }}>Rentevoordeel aflossen / jaar</span>
                <span className="font-semibold" style={{ color: "#1C3A2A" }}>€{fmt(rendementAflossen)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#4A5E4E" }}>Rente-opbrengst sparen / jaar</span>
                <span className="font-semibold" style={{ color: "#1C3A2A" }}>€{fmt(rendementSparen)}</span>
              </div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: "#E8E0D4" }}>
                <span className="font-semibold" style={{ color: "#1C3A2A" }}>
                  {sparenWint ? "Sparen levert meer op" : "Aflossen levert meer op"}
                </span>
                <span className="font-bold" style={{ color: sparenWint ? "#2D6A4F" : "#B03A2E" }}>
                  +€{fmt(Math.abs(verschilJaar))}/jaar
                </span>
              </div>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: sparenWint ? "#E8F2EC" : "#FEF2F2" }}>
              <p className="font-body text-sm font-semibold" style={{ color: "#1C3A2A" }}>
                Spaarbuffer na 12 maanden: <span style={{ color: "#2D6A4F" }}>€{bufferNaJaar.toLocaleString("nl-NL")}</span>
              </p>
              <p className="font-body text-xs mt-1" style={{ color: "#5C6B5F" }}>
                {sparenWint
                  ? "Sparen levert meer rente op én je houdt het geld beschikbaar voor onverwachte kosten."
                  : "Aflossen levert rentetechnisch iets meer op. Overweeg wel of je buffer groot genoeg is."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudieschuldAflossenOfSparen() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Of de rente op jouw studieschuld hoger of lager is dan je spaarrente",
            "Wanneer extra aflossen wél of juist niet slim is",
            "Wat Lotte won door te stoppen met overaflossen: €280 per maand meer ruimte",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Voor de meeste mensen met een studieschuld is maximaal aflossen zelden de slimste keuze. De rente is laag, en het geld dat je erin stopt groeit niet mee. In 2026 is de studielening-rente <strong>2,56%</strong> — en de spaarrente bij veel banken <strong>2,9% of hoger</strong>. Elke euro die je extra aflost op je studieschuld levert je minder op dan diezelfde euro op een spaarrekening.
      </p>

      <h2 className="font-display" style={h2}>Hoe je studieschuld werkt in 2026</h2>
      <p className="font-body text-text-soft" style={p}>
        Schuld van vóór 2015 (oud stelsel): rente 2,56%, looptijd 15 jaar, restant wordt na de looptijd kwijtgescholden. Schuld van 2015 t/m 2023 (sociaal leenstelsel): rente 2,56%, looptijd 35 jaar, zelfde kwijtschelding. Je maandlast wordt berekend naar inkomen — verdien je te weinig, dan betaal je tijdelijk niets.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Hypotheek-effect</p>
        <p className="font-body text-sm" style={{ color: "#5C3D1E" }}>
          Een studieschuld van €30.000 telt bij een hypotheekaanvraag mee voor circa <strong>€150 per maand</strong> aan hypotheeklastcapaciteit die je verliest. Dat is niet hetzelfde als €30.000 minder mogen lenen — het effect is genuanceerder. Reken het altijd door met een hypotheekadviseur voor je een beslissing neemt.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Cas: Lotte &amp; Pieter — €280 per maand teruggewonnen</h2>
      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte case.</strong> Naam en details aangepast voor privacy. Rentes en toeslagen kunnen wijzigen — check je eigen situatie via duo.nl en belastingdienst.nl.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Lotte (32) en Pieter (34) verdienen samen €4.800 netto. Lotte heeft een studieschuld van €32.000. Ze loste naast haar verplichte termijn van €145 per maand ook nog €280 extra af — haar schuld voelde als een steen op haar nek.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ze hadden geen spaarbuffer. Bij een kapotte auto of onverwachte tandartskostenrekening moesten ze roodstaan.
      </p>
      <VoorNa rows={[
        ["Extra aflossing/mnd", "€280", "€0"],
        ["Buffer", "€0", "€8.700 (18 mnd later)"],
        ["Pensioenopbouw Lotte", "Minimaal", "+ €90/mnd verwacht"],
        ["Netto ruimte/mnd", "Krap", "+ €280 vrij"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        De analyse was simpel: rente studieschuld 2,56%, spaarrente 2,9%. Elke euro extra aflossen leverde haar minder op dan sparen. Ze stopten met extra aflossen. De €280 ging naar een buffer (doel: €10.000) en een lijfrentespaarrekening voor Lotte&apos;s pensioen. Na 18 maanden: buffer van €8.700 en een merkbaar rustiger gevoel.
      </p>

      <RenteVergelijkerFixed />

      <h2 className="font-display" style={h2}>Wanneer is extra aflossen wél slim?</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Je wil op korte termijn een huis kopen</strong> en de schuld staat je hypotheekruimte in de weg. Reken het dan eerst goed door met een hypotheekadviseur — soms is het verschil kleiner dan je denkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Aflossing maakt de schuld definitief nul</strong> en je zet daarna de vrijgekomen ruimte direct naar sparen om. Voor sommige mensen is de psychologische reset meer waard dan het renteverschil.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>De rente op je studieschuld stijgt boven je spaarrente.</strong> Als de Euribor verder oploopt, kan dat kantelen. Houd het in de gaten.
      </p>

      <h2 className="font-display" style={h2}>Drie betere bestemmingen voor dat geld</h2>
      <p className="font-body text-text-soft" style={p}>
        Heb je minder dan drie maanden netto inkomen aan direct beschikbaar spaargeld? Dan heeft de buffer prioriteit boven alles. Meer in{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoeveel sparen per maand is normaal in Nederland?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Heb je een pensioengat door parttime werk of een jobswitch? Lees dan:{" "}
        <Link href="/inzichten/pensioen-aanvullen-hoeveel-heb-je-nodig" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">pensioen aanvullen: hoeveel heb je nodig?</Link>{" "}
        En voor de derde optie — vrij sparen voor toekomstige doelen — bekijk{" "}
        <Link href="/inzichten/spaardoelen-maandelijkse-inleg" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">spaardoelen en maandelijkse inleg</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten wat voor jouw situatie het slimst is?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        voor een eerlijk beeld van je cashflow en ruimte. Of boek een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>{" "}
        — Jarno rekent dan concreet door wat voor jou de slimste keuze is.
      </p>
    </>
  );
}
