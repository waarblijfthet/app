import { useState } from "react";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { berekenTotaalInkomen, getPercentiel } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function Toggle({
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
      <span className="mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-[#1C3A2A] rounded cursor-pointer"
        />
      </span>
      <span>
        <span className="font-body text-sm text-text-soft group-hover:text-primary transition-colors">
          {label}
        </span>
        {hint && <p className="font-body text-xs text-text-muted mt-0.5">{hint}</p>}
      </span>
    </label>
  );
}

function SalarisBlok({
  label,
  salarisKey,
  vakantieKey,
  dertiendeKey,
  data,
  onChange,
  showBijtelling,
}: {
  label: string;
  salarisKey: "salaris1" | "salaris2";
  vakantieKey: "salaris1InclVakantiegeld" | "salaris2InclVakantiegeld";
  dertiendeKey: "salaris1InclDertiende" | "salaris2InclDertiende";
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  showBijtelling?: boolean;
}) {
  const s = parseEur(data[salarisKey]);
  const vakantieExtra = data[vakantieKey] ? Math.round(s * 0.08 / 12) : 0;
  const dertiendeExtra = data[dertiendeKey] ? Math.round(s / 12) : 0;
  const effectief = s + vakantieExtra + dertiendeExtra;

  return (
    <div className="mb-6">
      <EuroInput
        label={label}
        id={salarisKey}
        value={data[salarisKey]}
        onChange={(v) => onChange({ [salarisKey]: v } as Partial<QuizData>)}
        placeholder="bijv. 2.800"
        hint="Netto bedrag per maand, na belasting"
      />
      {s > 0 && (
        <div className="mt-3 space-y-2 pl-1">
          <Toggle
            checked={data[vakantieKey]}
            onChange={(v) => onChange({ [vakantieKey]: v } as Partial<QuizData>)}
            label="Inclusief vakantiegeld"
            hint={
              data[vakantieKey]
                ? `Voegt ${fmtEur(vakantieExtra)}/mnd toe (8%÷12)`
                : "Verdeelt het jaarlijkse vakantiegeld over 12 maanden"
            }
          />
          <Toggle
            checked={data[dertiendeKey]}
            onChange={(v) => onChange({ [dertiendeKey]: v } as Partial<QuizData>)}
            label="Inclusief 13e maand"
            hint={
              data[dertiendeKey]
                ? `Voegt ${fmtEur(dertiendeExtra)}/mnd toe (÷12)`
                : "Alleen aanvinken als je een 13e maand hebt"
            }
          />
          {showBijtelling && data.auto === "zakelijk" && data.zakelijkBijtellingSalaris && (
            <Toggle
              checked={false}
              onChange={() => {}}
              label="Zakelijke auto, bijtelling nog niet verrekend"
              hint="Vink aan als de bijtelling het nettosalaris nog vermindert"
            />
          )}
        </div>
      )}
      {effectief > s && (
        <p className="text-xs font-body text-[#2D6A4F] mt-2 font-medium">
          Effectief maandbedrag: {fmtEur(effectief)}
        </p>
      )}
    </div>
  );
}

export default function Stap2Inkomsten({ data, onChange }: Props) {
  const [overigOpen, setOverigOpen] = useState(false);
  const [toeslagenOpen, setToeslagenOpen] = useState(false);
  const totaalInkomen = berekenTotaalInkomen(data);
  const percentiel = totaalInkomen > 0 ? getPercentiel(totaalInkomen, data.kinderen ?? 0) : null;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Wat komt er binnen?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vul het netto bedrag in, dus na belasting en inhoudingen.
      </p>

      <SalarisBlok
        label="Salaris persoon 1"
        salarisKey="salaris1"
        vakantieKey="salaris1InclVakantiegeld"
        dertiendeKey="salaris1InclDertiende"
        data={data}
        onChange={onChange}
        showBijtelling
      />

      <SalarisBlok
        label="Salaris persoon 2 (optioneel)"
        salarisKey="salaris2"
        vakantieKey="salaris2InclVakantiegeld"
        dertiendeKey="salaris2InclDertiende"
        data={data}
        onChange={onChange}
      />

      {/* Hypotheekrenteaftrek, inkomen, alleen bij koopwoning */}
      {data.woonsituatie === "koop" && (
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            {(["maand", "jaar"] as const).map((per) => (
              <button
                key={per}
                type="button"
                onClick={() => onChange({ hypotheekRenteAftrekPer: per })}
                className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                  data.hypotheekRenteAftrekPer === per
                    ? "bg-primary text-white"
                    : "bg-[#E8E0D0] text-text-soft"
                }`}
              >
                Per {per}
              </button>
            ))}
          </div>
          <EuroInput
            label={`Hypotheekrenteaftrek / teruggave, per ${data.hypotheekRenteAftrekPer}`}
            id="hypotheekRenteAftrek"
            value={data.hypotheekRenteAftrek}
            onChange={(v) => onChange({ hypotheekRenteAftrek: v })}
            hint="Je belastingteruggave op de hypotheekrente. Vaak weet je het jaarbedrag, kies dan 'per jaar'. Weet je het niet? Laat leeg."
          />
        </div>
      )}

      {/* Toeslagen */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setToeslagenOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors mb-4"
        >
          <span className={`transition-transform duration-200 ${toeslagenOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
          {toeslagenOpen ? "Verberg toeslagen" : "+ Toeslagen toevoegen (optioneel)"}
        </button>
        {toeslagenOpen && (
        <div className="space-y-4">
          <EuroInput
            label="Zorgtoeslag"
            id="toeslagZorg"
            value={data.toeslagZorg}
            onChange={(v) => onChange({ toeslagZorg: v })}
            hint="Max €238/mnd voor stellen in 2026"
          />

          {(data.kinderen ?? 0) > 0 && (
            <>
              <EuroInput
                label="Kindgebonden budget"
                id="toeslagKindgebonden"
                value={data.toeslagKindgebonden}
                onChange={(v) => onChange({ toeslagKindgebonden: v })}
                hint="Max €300/mnd per kind"
              />
              <EuroInput
                label="Kinderopvangtoeslag"
                id="toeslagKinderopvang"
                value={data.toeslagKinderopvang}
                onChange={(v) => onChange({ toeslagKinderopvang: v })}
                hint="Hoeveel ontvang je na verrekening?"
              />
              <EuroInput
                label="Kinderbijslag"
                id="toeslagKinderbijslag"
                value={data.toeslagKinderbijslag}
                onChange={(v) => onChange({ toeslagKinderbijslag: v })}
                hint="Gemiddeld €93/mnd per kind (€278/kwartaal)"
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
        </div>
        )}
      </div>

      {/* Overig inkomen */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setOverigOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors"
        >
          <span
            className={`transition-transform duration-200 ${overigOpen ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          {overigOpen ? "Verberg overig inkomen" : "+ Overig inkomen toevoegen"}
        </button>
        {overigOpen && (
          <div className="mt-4 space-y-4">
            <EuroInput
              label="Overig inkomen (alimentatie, verhuur, etc.)"
              id="toeslagOverig"
              value={data.toeslagOverig}
              onChange={(v) => onChange({ toeslagOverig: v })}
            />
          </div>
        )}
      </div>

      {/* Mobile: live feedback */}
      {totaalInkomen > 0 && (
        <div className="lg:hidden bg-[#F0EDE6] rounded-xl p-4">
          <p className="font-display font-light text-primary text-2xl mb-1">
            {fmtEur(totaalInkomen)}
          </p>
          <p className="text-text-muted font-body text-xs mb-2">totaal netto per maand</p>
          {percentiel && (
            <p className="text-text-soft font-body text-xs">
              Jullie zitten in de <strong>{percentiel}</strong> van Nederlandse
              huishoudens.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
