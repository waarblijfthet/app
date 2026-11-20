"use client";

import { useState } from "react";
import PrimaireCta, { PrimaireCtaSub, AnalyseUitwijk } from "@/components/PrimaireCta";
import { Bedragveld, RekenKader, DONKER, ZACHT, GRIJS, euroKort, type Bedrag } from "./Rekenveld";

/**
 * No buy lijst (20-nov-2026, no-buy-year). De bezoeker zet per categorie
 * zijn regel (mag, alleen vervangen, niet) en kan invullen wat hij er vorig
 * jaar ongeveer per maand aan uitgaf. Uitkomst: wat de categorieën op "niet"
 * samen per jaar waren. Dat is wat het jaar hooguit oplevert, geen belofte
 * (CLAUDE.md 3.5). Geen startbedragen. Werkt ook als invullijst om te
 * printen. Opstap: geen Geldscan-link, daaronder de uitgavenscan.
 */

type Regel = "mag" | "vervangen" | "niet";

const CATEGORIEEN = [
  { id: "kleding", label: "Kleding en schoenen" },
  { id: "wonen", label: "Woonaccessoires en decoratie" },
  { id: "elektronica", label: "Elektronica en gadgets" },
  { id: "verzorging", label: "Make-up en verzorging (extra's)" },
  { id: "hobby", label: "Hobby, boeken en spellen" },
  { id: "kinderen", label: "Speelgoed en spullen voor de kinderen" },
  { id: "bezorgen", label: "Eten bestellen en afhalen" },
] as const;

type CatId = (typeof CATEGORIEEN)[number]["id"];

const REGELS: { waarde: Regel; label: string }[] = [
  { waarde: "mag", label: "Mag" },
  { waarde: "vervangen", label: "Alleen vervangen" },
  { waarde: "niet", label: "Niet kopen" },
];

export default function NoBuyLijst() {
  const [regels, setRegels] = useState<Record<CatId, Regel>>({
    kleding: "vervangen",
    wonen: "niet",
    elektronica: "vervangen",
    verzorging: "vervangen",
    hobby: "mag",
    kinderen: "mag",
    bezorgen: "mag",
  });
  const [bedragen, setBedragen] = useState<Record<CatId, Bedrag>>({
    kleding: null,
    wonen: null,
    elektronica: null,
    verzorging: null,
    hobby: null,
    kinderen: null,
    bezorgen: null,
  });

  const niet = CATEGORIEEN.filter((c) => regels[c.id] === "niet");
  const ingevuld = niet.some((c) => bedragen[c.id] !== null);
  const perJaar = niet.reduce((som, c) => som + (bedragen[c.id] ?? 0) * 12, 0);

  return (
    <RekenKader
      titel="Jouw no buy lijst"
      uitleg="Kies per categorie je regel. Vul bij wat je schrapt in wat je er vorig jaar ongeveer per maand aan uitgaf; dat staat in je bankapp of afschrift."
    >
      <div className="flex flex-col gap-3 mb-4">
        {CATEGORIEEN.map((c) => (
          <fieldset key={c.id} className="rounded-lg p-3" style={{ border: "1px solid #D6E5E0", margin: 0 }}>
            <legend className="font-body text-sm px-1" style={{ color: DONKER }}>
              {c.label}
            </legend>
            <div className="flex flex-wrap gap-2 mb-2" role="radiogroup" aria-label={c.label}>
              {REGELS.map((r) => {
                const actief = regels[c.id] === r.waarde;
                return (
                  <button
                    key={r.waarde}
                    type="button"
                    role="radio"
                    aria-checked={actief}
                    onClick={() => setRegels((oud) => ({ ...oud, [c.id]: r.waarde }))}
                    className="font-body text-sm rounded-full"
                    style={{
                      minHeight: "40px",
                      padding: "0.4rem 0.9rem",
                      border: actief ? "1px solid #0B7A6E" : "1px solid #D6E5E0",
                      backgroundColor: actief ? "#E7F1EE" : "#FFFFFF",
                      color: actief ? "#0B7A6E" : ZACHT,
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
            {regels[c.id] === "niet" && (
              <Bedragveld
                id={`nobuy-${c.id}`}
                label="Vorig jaar ongeveer per maand"
                waarde={bedragen[c.id]}
                placeholder="bijv. 50"
                onChange={(w) => setBedragen((oud) => ({ ...oud, [c.id]: w }))}
              />
            )}
          </fieldset>
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: ingevuld ? "#FDF1EC" : "#F2F7F5" }}>
          <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
            Wat je schrapt, was vorig jaar samen
          </p>
          <p className="font-body tabular-nums" style={{ color: ingevuld ? "#C4603A" : DONKER, fontWeight: 500, fontSize: "1.15rem", margin: 0 }}>
            {ingevuld ? `${euroKort(perJaar)} per jaar` : "nog niet"}
          </p>
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {niet.length === 0
            ? "Je hebt nog niets op niet kopen gezet. Dan is het een low buy jaar: alles mag, maar alleen ter vervanging."
            : ingevuld
            ? `Dit is wat het jaar hooguit oplevert, als het geld niet naar iets anders gaat. Zet het bedrag elke maand meteen apart op een spaarrekening, anders merk je het nergens.`
            : "Vul bij de categorieën op niet kopen in wat ze vorig jaar per maand kostten."}
        </p>
        <p className="font-body text-xs mb-4" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Of je die bedragen goed inschat, zie je pas in je afschrift: daar
          staat wat je echt uitgaf.
        </p>
        <div className="flex flex-col gap-2">
          <PrimaireCta locatie="nobuy-lijst" className="btn-primary text-center" />
          <PrimaireCtaSub />
          <AnalyseUitwijk locatie="nobuy-lijst" />
        </div>
      </div>
    </RekenKader>
  );
}
