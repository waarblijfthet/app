"use client";

import { useState } from "react";
import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function parse(v: string): number {
  const n = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return isNaN(n) ? 0 : n;
}

function euro(n: number): string {
  return "€" + Math.round(n).toLocaleString("nl-NL");
}

function Calculator() {
  const [inkomen, setInkomen] = useState("");
  const [vasteLasten, setVasteLasten] = useState("");
  const [dagelijks, setDagelijks] = useState("");

  const i = parse(inkomen);
  const v = parse(vasteLasten);
  const d = parse(dagelijks);
  const over = i - v - d;
  const ingevuld = inkomen !== "" && vasteLasten !== "" && dagelijks !== "";
  const pct = i > 0 ? Math.round((over / i) * 100) : 0;

  const veld = {
    width: "100%",
    padding: "0.6rem 0.75rem",
    borderRadius: "10px",
    border: "1.5px solid #D8CFC0",
    fontSize: "1rem",
    backgroundColor: "#FFFFFF",
    color: "#16211F",
  } as const;
  const label = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#16211F",
    marginBottom: "0.35rem",
  } as const;

  return (
    <div
      className="rounded-2xl p-5 my-6"
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E6E9E7" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label style={label}>Netto per maand</label>
          <input
            type="text"
            inputMode="numeric"
            value={inkomen}
            onChange={(e) => setInkomen(e.target.value)}
            placeholder="3.500"
            style={veld}
          />
        </div>
        <div>
          <label style={label}>Vaste lasten</label>
          <input
            type="text"
            inputMode="numeric"
            value={vasteLasten}
            onChange={(e) => setVasteLasten(e.target.value)}
            placeholder="1.900"
            style={veld}
          />
        </div>
        <div>
          <label style={label}>Dagelijkse uitgaven</label>
          <input
            type="text"
            inputMode="numeric"
            value={dagelijks}
            onChange={(e) => setDagelijks(e.target.value)}
            placeholder="900"
            style={veld}
          />
        </div>
      </div>

      {ingevuld ? (
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: over >= 0 ? "#E7F1EE" : "#FAEBE7",
            border: `1.5px solid ${over >= 0 ? "#A8C5B4" : "#E0B6AA"}`,
          }}
        >
          <p className="font-body text-sm" style={{ color: "#4A5A56", marginBottom: "0.25rem" }}>
            Zo houd je per maand vrij over:
          </p>
          <p
            className="font-display"
            style={{ fontSize: "2rem", fontWeight: 400, color: over >= 0 ? "#2D6A4F" : "#B03A2E" }}
          >
            {euro(over)}
            {i > 0 && (
              <span className="font-body" style={{ fontSize: "0.95rem", color: "#8B958F" }}>
                {"  "}({pct}% van je inkomen)
              </span>
            )}
          </p>
          <p className="font-body text-sm" style={{ color: "#4A5A56", marginTop: "0.5rem" }}>
            {over < 0
              ? "Je geeft meer uit dan er binnenkomt. Dat verklaart het krappe gevoel, en het is om te buigen."
              : pct < 10
              ? "Dat is krap: er blijft weinig over om van te sparen. Daar valt aan te sturen."
              : "Een gezonde marge. De vraag is dan vooral: gaat dat ook echt naar sparen?"}
          </p>
        </div>
      ) : (
        <p className="font-body text-sm" style={{ color: "#8B958F" }}>
          Vul je netto-inkomen, je vaste lasten en je dagelijkse uitgaven in. Schattingen zijn goed genoeg.
        </p>
      )}
    </div>
  );
}

export default function VrijBesteedbaarInkomenBerekenen() {
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
          Je weet wat er binnenkomt, maar niet wat er aan het einde van de maand echt vrij overblijft.
          Met deze rekenhulp zie je het in een paar seconden.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je vrij besteedbaar inkomen is wat er overblijft als je van je netto-inkomen je vaste lasten
        en je noodzakelijke dagelijkse uitgaven afhaalt. Dat is het bedrag waarover je echt iets te
        zeggen hebt: sparen, leuke dingen, of een buffer opbouwen. Vul je cijfers in, schattingen
        zijn goed genoeg.
      </p>

      <Calculator />

      <h2 className="font-display" style={h2}>
        Hoe je het zelf uitrekent
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De som is simpel: je netto-inkomen per maand, min je vaste lasten, min je dagelijkse
        uitgaven. Wat overblijft is je vrij besteedbaar inkomen. Voor je vaste lasten reken je met
        het gemiddelde per maand, dus reken jaarlijkse posten zoals verzekeringen en de gemeentelijke
        aanslag om naar een maandbedrag. Hoe je dat compleet maakt, lees je in mijn{" "}
        <Link
          href="/inzichten/vaste-lasten-overzicht-maken"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          overzicht van je vaste lasten maken
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat is een gezonde uitkomst?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als richtlijn houd je het liefst 10 tot 20 procent over om te sparen. Komt daar bij jou veel
        minder uit, dan ligt dat meestal niet aan slordigheid maar aan hoge vaste lasten. Wat
        normaal is, lees je in{" "}
        <Link
          href="/inzichten/hoeveel-geld-overhouden-einde-maand"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel je hoort over te houden
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Belangrijk: vrij besteedbaar is niet hetzelfde als wat je daarna ook echt overhoudt. Want
        van dat vrije bedrag gaat in de praktijk een deel ongemerkt op aan dingen die je niet
        bijhoudt. Daarover lees je meer in{" "}
        <Link
          href="/inzichten/waarom-hou-ik-nooit-geld-over"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom je nooit geld overhoudt
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
          Deze rekenhulp geeft de grote lijn. De gratis analyse gaat een stap verder: die laat per
          categorie zien waar je geld naartoe gaat en waar je kunt bijsturen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
