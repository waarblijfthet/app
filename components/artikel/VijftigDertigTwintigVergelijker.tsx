"use client";

import { useState } from "react";
import Link from "next/link";
import {
  berekenVuistregel,
  euro,
  VERVOER,
  AUTO_LABELS,
  type AutoKeuze,
} from "@/lib/salaris-vuistregel";
import { RAPPORTEN } from "@/lib/rapporten-data";

/**
 * Vergelijkt de 50/30/20-regel met mijn eigen vuistregel, per huishouden.
 *
 * Reden (17-aug-2026, klus 5, docs/artikel-bouwprompts-aug-2026.md): het
 * artikel "50-30-20-regel-hoger-inkomen" beargumenteerde tot nu toe alleen in
 * lopende tekst dat de regel bij een hoger inkomen niet meer klopt, zonder
 * enige berekening erbij. Dit component maakt dat concreet: het legt de
 * vaste 50%-norm naast wat berekenVuistregel() voor een gekozen huishouden
 * voorspelt.
 *
 * "Vaste lasten" is hier bewust gedefinieerd zoals de 50/30/20-regel dat zelf
 * doet (wonen, energie, boodschappen, verzekeringen, vervoer), niet zoals
 * "vaste-lasten-overzicht-maken" dat doet (waar boodschappen niet meetellen).
 * Bron voor die definitie: Raisin, "Uitleg: hoe werkt de 50/30/20 regel?",
 * geraadpleegd 17 augustus 2026. Zonder die gelijkschakeling vergelijk je
 * twee verschillende dingen met dezelfde naam.
 *
 * Alle bedragen komen uit berekenVuistregel(), nooit met de hand getypt,
 * werkregel 2. Het enige hardgecodeerde getal is de 50%-norm zelf, en dat is
 * de regel die hier juist getoetst wordt.
 */
export default function VijftigDertigTwintigVergelijker() {
  const [inkomen, setInkomen] = useState(5500);
  const [volwassenen, setVolwassenen] = useState<1 | 2>(2);
  const [kinderen, setKinderen] = useState(2);
  const [auto, setAuto] = useState<AutoKeuze>("eigen");

  const { wonen, boodschappen, verzekeringen, vervoer, abonnementen, kinderkosten, vrijetijd, verwachtOver } =
    berekenVuistregel({ inkomen, volwassenen, kinderen, auto });

  const vasteLastenVuistregel = wonen + boodschappen + verzekeringen + vervoer;
  const pctVuistregel = Math.round((vasteLastenVuistregel / inkomen) * 100);
  const overVuistregel = inkomen - vasteLastenVuistregel;
  const overVuistregelPct = 100 - pctVuistregel;

  const vasteLasten5030 = Math.round(inkomen * 0.5);
  const over5030 = inkomen - vasteLasten5030;

  const alleen = volwassenen === 1;
  const geldscanSituatie = alleen
    ? kinderen > 0
      ? "alleenstaande-ouder"
      : "alleenstaand"
    : kinderen > 0
    ? "gezin"
    : "stel";
  const geldscanHref = `/geldscan?situatie=${geldscanSituatie}&inkomen=${inkomen}&boodschappen=${Math.round(boodschappen)}`;

  const verschil = pctVuistregel - 50;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 my-8"
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E6E9E7" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Zet de 50/30/20-regel naast mijn eigen vuistregel
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        Kies een huishouden en een inkomen. Links wat de 50/30/20-regel altijd voorspelt, rechts wat ik
        bij zo&apos;n huishouden zou verwachten op basis van de {RAPPORTEN.length} huishoudens die ik zelf
        heb doorgerekend.
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Netto per maand, samen
        </label>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-display" style={{ fontSize: "1.7rem", fontWeight: 300, color: "#16211F" }}>
            {euro(inkomen)}
          </span>
        </div>
        <input
          type="range"
          min={3000}
          max={10000}
          step={50}
          value={inkomen}
          onChange={(e) => setInkomen(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Netto huishoudinkomen per maand"
        />
        <div className="mt-4 space-y-3">
          <Rij label="Volwassenen">
            {([1, 2] as const).map((v) => (
              <Chip key={v} actief={volwassenen === v} onClick={() => setVolwassenen(v)}>
                {v === 1 ? "Alleen" : "Samen"}
              </Chip>
            ))}
          </Rij>
          <Rij label="Kinderen thuis">
            {[0, 1, 2, 3].map((k) => (
              <Chip key={k} actief={kinderen === k} onClick={() => setKinderen(k)}>
                {k === 3 ? "3 of meer" : k}
              </Chip>
            ))}
          </Rij>
          <Rij label="Vervoer">
            {(Object.keys(VERVOER) as AutoKeuze[]).map((a) => (
              <Chip key={a} actief={auto === a} onClick={() => setAuto(a)}>
                {AUTO_LABELS[a]}
              </Chip>
            ))}
          </Rij>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#F0F3F1" }}>
          <p className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: "#8B958F" }}>
            50/30/20-regel
          </p>
          <p className="font-display" style={{ fontSize: "1.6rem", fontWeight: 400, color: "#4A5A56" }}>
            {euro(vasteLasten5030)}
          </p>
          <p className="font-body text-xs" style={{ color: "#8B958F" }}>
            naar vaste lasten, altijd 50% van je inkomen
          </p>
          <p className="font-body text-sm mt-2" style={{ color: "#16211F" }}>
            Blijft over: {euro(over5030)} (50%)
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#E7F1EE", border: "1px solid #9CCFC4" }}>
          <p className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: "#0B7A6E" }}>
            Mijn vuistregel, dit huishouden
          </p>
          <p className="font-display" style={{ fontSize: "1.6rem", fontWeight: 400, color: "#16211F" }}>
            {euro(vasteLastenVuistregel)}
          </p>
          <p className="font-body text-xs" style={{ color: "#5A6B66" }}>
            wonen, boodschappen, verzekeringen en vervoer samen ({pctVuistregel}%)
          </p>
          <p className="font-body text-sm mt-2" style={{ color: "#16211F" }}>
            Blijft over: {euro(overVuistregel)} ({overVuistregelPct}%)
          </p>
        </div>
      </div>

      <p className="font-body text-sm mt-4" style={{ color: "#4A5A56" }}>
        {verschil > 0
          ? `Bij dit huishouden gaat er volgens mijn vuistregel ${verschil} procentpunt méér naar wonen, boodschappen, verzekeringen en vervoer dan de 50/30/20-regel toestaat. Dat betekent niet automatisch dat er iets misgaat, het betekent dat de 50%-norm hier krapper is dan de regel doet voorkomen.`
          : verschil < 0
          ? `Bij dit huishouden zit mijn vuistregel ${Math.abs(verschil)} procentpunt onder de 50%-norm. Dat is ruimte die de regel niet voorspelt, en die dus ook niet vanzelf naar sparen gaat als je er niet zelf voor kiest.`
          : "Bij dit huishouden komen de 50/30/20-regel en mijn eigen vuistregel toevallig op hetzelfde percentage uit."}
      </p>

      <div className="rounded-lg p-3 mt-3" style={{ backgroundColor: "#F7F8F7" }}>
        <p className="font-body text-xs mb-2" style={{ color: "#8B958F" }}>
          Waar dat {euro(overVuistregel)} volgens mijn vuistregel naartoe gaat:
        </p>
        <div className="grid grid-cols-2 gap-y-1 text-xs font-body" style={{ color: "#4A5A56" }}>
          <span>Abonnementen</span>
          <span className="text-right tabular-nums">{euro(abonnementen)}</span>
          {kinderen > 0 && (
            <>
              <span>Opvang, school en sport</span>
              <span className="text-right tabular-nums">{euro(kinderkosten)}</span>
            </>
          )}
          <span>Vrije tijd</span>
          <span className="text-right tabular-nums">{euro(vrijetijd)}</span>
          <span style={{ fontWeight: 500, color: "#16211F" }}>Blijft over om te sparen</span>
          <span
            className="text-right tabular-nums"
            style={{ fontWeight: 500, color: verwachtOver < 0 ? "#B03A2E" : "#0B7A6E" }}
          >
            {verwachtOver < 0 ? "-" + euro(Math.abs(verwachtOver)) : euro(verwachtOver)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <Link href={geldscanHref} className="btn-primary text-center">
          Reken mijn eigen situatie na &rarr; €49
        </Link>
        <Link
          href="/rapporten"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: "#16211F", border: "1.5px solid #16211F", borderRadius: "4px", padding: "0.75rem 1.25rem", textDecoration: "none" }}
        >
          Bekijk de {RAPPORTEN.length} huishoudens achter dit getal &rarr;
        </Link>
      </div>

      <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
        Bron 50/30/20-regel: Raisin, &ldquo;Uitleg: hoe werkt de 50/30/20 regel?&rdquo;, geraadpleegd 17
        augustus 2026. Mijn eigen vuistregel is gebaseerd op de {RAPPORTEN.length} huishoudens die ik zelf
        heb doorgerekend, geen landelijke steekproef. Zie hieronder de grens van die vuistregel.
      </p>
    </div>
  );
}

function Rij({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ actief, onClick, children }: { actief: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actief}
      className="rounded-full font-body text-sm transition-colors"
      style={{
        padding: "0.4rem 0.85rem",
        backgroundColor: actief ? "#16211F" : "#FFFFFF",
        color: actief ? "#FFFFFF" : "#4A5A56",
        border: `1px solid ${actief ? "#16211F" : "#E6E9E7"}`,
      }}
    >
      {children}
    </button>
  );
}
