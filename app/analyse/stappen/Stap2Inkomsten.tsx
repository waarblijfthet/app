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
      <p className="text-text-soft font-body font-light text-base mb-7">
        Een realistische schatting is genoeg. We kijken naar wat er netto
        beschikbaar is voor {alleen ? "je huishouden" : "jullie huishouden"}.
      </p>

      <div className="mb-6">
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
          hint={
            data.inkomenWisselend
              ? "Neem het gemiddelde van de afgelopen 6 tot 12 maanden. Bij zzp het bedrag dat je overhoudt na belasting en reserveringen."
              : "Je normale netto bedrag na belasting en inhoudingen."
          }
          plausibelTot={25000}
        />
        <div className="mt-3">
          <Vinkje
            checked={data.inkomenWisselend}
            onChange={(v) => onChange({ inkomenWisselend: v })}
            label="Mijn inkomen wisselt per maand"
            hint="Zzp, wisselende uren, provisie of bonussen. Dan reken ik met je gemiddelde en houd ik daar in je uitkomst rekening mee."
          />
        </div>
      </div>

      {!alleen && (
        <div className="mb-6">
          <EuroInput
            label="Netto inkomen partner per maand"
            id="salaris2"
            value={data.salaris2}
            onChange={(v) => onChange({ salaris2: v })}
            hint="Het gemiddelde netto bedrag per maand. Een schatting is prima."
            plausibelTot={25000}
          />
        </div>
      )}

      {/* Twee losse uitklappers in plaats van één (28-aug-2026, pass 4). Onder
          "nog een inkomen toevoegen" stonden eerst de vinkjes voor vakantiegeld,
          en dat is geen extra inkomen maar een verdeling van hetzelfde salaris. */}
      <Uitklap
        titel="+ Vakantiegeld of 13e maand meerekenen"
        titelOpen="Verberg vakantiegeld en 13e maand"
      >
        <p className="font-body text-xs text-text-muted">
          Dit verdeelt het bedrag over twaalf maanden. Alleen aanvinken als je het
          krijgt bovenop het bedrag dat je hierboven invulde.
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
        {extraTotaal > 0 && (
          <p className="font-body text-xs text-accent font-medium">
            Dit telt {fmtEur(extraTotaal)} per maand extra mee.
          </p>
        )}
      </Uitklap>

      <Uitklap titel="+ Nog een inkomen toevoegen" titelOpen="Verberg extra inkomen">
        <EuroInput
          label="Andere vaste inkomsten per maand"
          id="toeslagOverig"
          value={data.toeslagOverig}
          onChange={(v) => onChange({ toeslagOverig: v })}
          hint="Bijvoorbeeld zzp-inkomen naast je baan, alimentatie, een uitkering of verhuur."
        />
      </Uitklap>

      {/* Hypotheekrenteaftrek: compact en optioneel, nooit een blokkade. */}
      {data.woonsituatie === "koop" && (
        <div className="mb-7">
          <p className="font-body font-medium text-primary text-sm mb-1">
            Ontvang je jaarlijks hypotheekrenteaftrek?
          </p>
          <p className="font-body text-xs text-text-muted mb-3">
            Geen idee? Sla dit gerust over, je vergelijking werkt ook zonder.
          </p>
          {aftrekKeuze !== "invullen" ? (
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
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
        </div>
      )}

      <Uitklap
        intro="Ontvang je toeslagen?"
        titel="+ Toeslagen toevoegen"
        titelOpen="Verberg toeslagen"
      >
        <p className="font-body text-xs text-text-muted">
          Vul het gemiddelde bedrag per maand in. Wat je niet weet, mag je leeg
          laten.
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
