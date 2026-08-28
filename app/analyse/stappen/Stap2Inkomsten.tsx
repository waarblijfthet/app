"use client";

import { useState } from "react";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { aantalVolwassenenVan } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import Uitklap from "../components/Uitklap";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function Vinkje({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-[#0B7A6E] rounded cursor-pointer flex-shrink-0"
      />
      <span>
        <span className="font-body text-sm text-text-soft group-hover:text-primary transition-colors">
          {label}
        </span>
        {hint && <p className="font-body text-xs text-text-muted mt-0.5">{hint}</p>}
      </span>
    </label>
  );
}

export default function Stap2Inkomsten({ data, onChange }: Props) {
  const alleen = aantalVolwassenenVan(data) === 1;

  // Hypotheekrenteaftrek is voor veel mensen een bedrag dat ze niet uit hun
  // hoofd weten. Daarom compact en optioneel, nooit een blokkade.
  const [aftrekKeuze, setAftrekKeuze] = useState<"none" | "invullen" | "over">(
    parseEur(data.hypotheekRenteAftrek) > 0 ? "invullen" : "none"
  );

  const s1 = parseEur(data.salaris1);
  const s2 = parseEur(data.salaris2);
  const extra1 =
    (data.salaris1InclVakantiegeld ? Math.round((s1 * 0.08) / 12) : 0) +
    (data.salaris1InclDertiende ? Math.round(s1 / 12) : 0);
  const extra2 =
    (data.salaris2InclVakantiegeld ? Math.round((s2 * 0.08) / 12) : 0) +
    (data.salaris2InclDertiende ? Math.round(s2 / 12) : 0);
  const extraTotaal = extra1 + extra2;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Wat komt er gemiddeld binnen?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Een realistische schatting is genoeg. We kijken naar wat er netto
        beschikbaar is voor {alleen ? "je huishouden" : "jullie huishouden"}.
      </p>

      <div className="mb-10">
        <EuroInput
          label={
            alleen
              ? "Wat komt er gemiddeld netto op je rekening binnen?"
              : "Jouw netto inkomen per maand"
          }
          id="salaris1"
          value={data.salaris1}
          onChange={(v) => onChange({ salaris1: v })}
          placeholder="bijv. 2.800"
          hint="Je normale netto bedrag na belasting en inhoudingen."
          hint2="Wisselend inkomen? Neem het gemiddelde van de afgelopen 6 tot 12 maanden."
          plausibelTot={25000}
        />
      </div>

      {!alleen && (
        <div className="mb-10">
          <EuroInput
            label="Netto inkomen partner per maand"
            id="salaris2"
            value={data.salaris2}
            onChange={(v) => onChange({ salaris2: v })}
            hint="Gebruik het gemiddelde netto bedrag per maand."
            hint2="Weet je het exacte bedrag niet? Een schatting is prima."
            plausibelTot={25000}
          />
        </div>
      )}

      <Uitklap titel="+ Nog een inkomen toevoegen" titelOpen="Verberg extra inkomen">
        <p className="font-body text-xs text-text-muted">
          Bijvoorbeeld zzp-inkomen, alimentatie, een uitkering of een structureel
          neveninkomen. Alleen invullen als het bij jullie speelt.
        </p>
        <Vinkje
          checked={data.salaris1InclVakantiegeld}
          onChange={(v) => onChange({ salaris1InclVakantiegeld: v })}
          label="Ik krijg vakantiegeld"
          hint="Verdeelt 8 procent over twaalf maanden."
        />
        <Vinkje
          checked={data.salaris1InclDertiende}
          onChange={(v) => onChange({ salaris1InclDertiende: v })}
          label="Ik krijg een 13e maand"
        />
        {!alleen && (
          <>
            <Vinkje
              checked={data.salaris2InclVakantiegeld}
              onChange={(v) => onChange({ salaris2InclVakantiegeld: v })}
              label="Mijn partner krijgt vakantiegeld"
            />
            <Vinkje
              checked={data.salaris2InclDertiende}
              onChange={(v) => onChange({ salaris2InclDertiende: v })}
              label="Mijn partner krijgt een 13e maand"
            />
          </>
        )}
        <EuroInput
          label="Andere vaste inkomsten per maand"
          id="toeslagOverig"
          value={data.toeslagOverig}
          onChange={(v) => onChange({ toeslagOverig: v })}
          hint="Bijvoorbeeld alimentatie, een uitkering of verhuur."
        />
        {extraTotaal > 0 && (
          <p className="font-body text-xs text-accent font-medium">
            Dit telt {fmtEur(extraTotaal)} per maand extra mee.
          </p>
        )}
      </Uitklap>

      {/* Hypotheekrenteaftrek: compact en optioneel, nooit een blokkade. */}
      {data.woonsituatie === "koop" && (
        <div className="mb-10">
          <p className="font-body font-medium text-primary text-sm mb-3">
            Ontvang je jaarlijks hypotheekrenteaftrek?
          </p>
          {aftrekKeuze !== "invullen" ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setAftrekKeuze("invullen")}
                className="min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] border-[#D9DEDC] bg-card font-body font-medium text-sm text-text-soft hover:border-accent/60 transition-all"
              >
                Ik weet ongeveer hoeveel
              </button>
              <button
                type="button"
                onClick={() => {
                  setAftrekKeuze("over");
                  onChange({ hypotheekRenteAftrek: "" });
                }}
                className={`min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all ${
                  aftrekKeuze === "over"
                    ? "bg-green-light border-accent text-primary"
                    : "border-[#D9DEDC] bg-card text-text-soft hover:border-accent/60"
                }`}
              >
                Overslaan
              </button>
            </div>
          ) : (
            <>
              <EuroInput
                id="hypotheekRenteAftrek"
                value={data.hypotheekRenteAftrek}
                onChange={(v) => onChange({ hypotheekRenteAftrek: v })}
                periode={{
                  waarde: data.hypotheekRenteAftrekPer,
                  onChange: (v) => onChange({ hypotheekRenteAftrekPer: v }),
                }}
                hint="Ongeveer hoeveel je per jaar terugkrijgt van de Belastingdienst."
              />
              <button
                type="button"
                onClick={() => {
                  setAftrekKeuze("over");
                  onChange({ hypotheekRenteAftrek: "" });
                }}
                className="mt-2 text-xs font-body font-medium text-accent hover:text-primary transition-colors"
              >
                Toch overslaan
              </button>
            </>
          )}
          <p className="font-body text-xs text-text-muted mt-2">
            Geen idee? Sla dit gerust over, je vergelijking werkt ook zonder.
          </p>
        </div>
      )}

      <Uitklap
        intro="Ontvang je toeslagen?"
        titel="+ Toeslagen toevoegen"
        titelOpen="Verberg toeslagen"
      >
        <p className="font-body text-xs text-text-muted">
          Vul het gemiddelde bedrag per maand in.
        </p>
        <EuroInput
          label="Zorgtoeslag"
          id="toeslagZorg"
          value={data.toeslagZorg}
          onChange={(v) => onChange({ toeslagZorg: v })}
        />
        {(data.kinderen ?? 0) > 0 && (
          <>
            <EuroInput
              label="Kinderopvangtoeslag"
              id="toeslagKinderopvang"
              value={data.toeslagKinderopvang}
              onChange={(v) => onChange({ toeslagKinderopvang: v })}
            />
            <EuroInput
              label="Kindgebonden budget"
              id="toeslagKindgebonden"
              value={data.toeslagKindgebonden}
              onChange={(v) => onChange({ toeslagKindgebonden: v })}
            />
            <EuroInput
              label="Kinderbijslag"
              id="toeslagKinderbijslag"
              value={data.toeslagKinderbijslag}
              onChange={(v) => onChange({ toeslagKinderbijslag: v })}
            />
          </>
        )}
        {data.woonsituatie === "huur" && (
          <EuroInput
            label="Huurtoeslag"
            id="toeslagHuur"
            value={data.toeslagHuur}
            onChange={(v) => onChange({ toeslagHuur: v })}
          />
        )}
      </Uitklap>
    </div>
  );
}
