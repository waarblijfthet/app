"use client";

import { useState } from "react";
import { QuizData, KinderenAantal, AutoSituatie } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function OptionBtn({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-[130px] min-h-[52px] px-4 py-3.5 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all duration-150 text-left ${
        selected
          ? "bg-green-light border-accent text-primary shadow-card"
          : "bg-card border-[#D9DEDC] text-text-soft hover:border-accent/60"
      }`}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

function Vraag({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <fieldset className="mb-10">
      <legend className="font-body font-medium text-primary text-sm mb-2">
        {label}
      </legend>
      {hint && (
        <p className="font-body text-xs text-text-muted mb-3 -mt-1">{hint}</p>
      )}
      <div className="flex flex-wrap gap-3">{children}</div>
    </fieldset>
  );
}

export default function Stap1Profiel({ data, onChange }: Props) {
  // De bijtellingsvraag start zonder voorgeselecteerd antwoord. Anders staat er
  // een "Nee" dat de bezoeker nooit zelf heeft gegeven.
  const [bijtellingGekozen, setBijtellingGekozen] = useState(false);

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Even kennismaken met jouw huishouden
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Deze vier keuzes bepalen met welk type huishouden je wordt vergeleken.
      </p>

      <Vraag label="Hoe woon je?">
        <OptionBtn
          selected={data.volwassenen === 1}
          onClick={() =>
            onChange({
              volwassenen: 1,
              salaris2: "",
              salaris2InclVakantiegeld: false,
              salaris2InclDertiende: false,
            })
          }
        >
          Alleen
        </OptionBtn>
        <OptionBtn
          selected={data.volwassenen === 2}
          onClick={() => onChange({ volwassenen: 2 })}
        >
          Samen met partner
        </OptionBtn>
      </Vraag>

      <Vraag label="Woonsituatie">
        <OptionBtn
          selected={data.woonsituatie === "koop"}
          onClick={() => onChange({ woonsituatie: "koop" })}
        >
          Koopwoning
        </OptionBtn>
        <OptionBtn
          selected={data.woonsituatie === "huur"}
          onClick={() => onChange({ woonsituatie: "huur" })}
        >
          Huurwoning
        </OptionBtn>
      </Vraag>

      <Vraag label="Kinderen thuis">
        {(
          [
            { label: "Geen", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3 of meer", value: 3 },
          ] as { label: string; value: KinderenAantal }[]
        ).map((opt) => (
          <OptionBtn
            key={opt.value}
            selected={data.kinderen === opt.value}
            onClick={() => onChange({ kinderen: opt.value })}
          >
            {opt.label}
          </OptionBtn>
        ))}
      </Vraag>

      <Vraag label="Welke autosituatie past bij jou?">
        {(
          [
            { label: "Geen auto", value: "geen" },
            { label: "Eigen auto", value: "eigen" },
            { label: "Private lease", value: "lease_privé" },
            { label: "Zakelijke auto", value: "zakelijk" },
          ] as { label: string; value: AutoSituatie }[]
        ).map((opt) => (
          <OptionBtn
            key={opt.value}
            selected={data.auto === opt.value}
            onClick={() =>
              onChange(
                opt.value === "zakelijk"
                  ? { auto: opt.value, tweedeAuto: false }
                  : { auto: opt.value, zakelijkBijtellingSalaris: false }
              )
            }
          >
            {opt.label}
          </OptionBtn>
        ))}
      </Vraag>

      {/* Alles hieronder is conditioneel: het verschijnt alleen als het bij je
          gekozen autosituatie hoort. */}
      {data.auto === "zakelijk" && (
        <div className="mb-10 -mt-4">
          <p className="font-body text-xs text-text-muted mb-4">
            Vul alleen je eigen bijdrage voor privégebruik in.
          </p>
          <p className="font-body font-medium text-primary text-sm mb-3">
            Heb je een zakelijke auto met bijtelling?
          </p>
          <div className="flex flex-wrap gap-3">
            <OptionBtn
              selected={bijtellingGekozen && data.zakelijkBijtellingSalaris}
              onClick={() => {
                setBijtellingGekozen(true);
                onChange({ zakelijkBijtellingSalaris: true });
              }}
            >
              Ja
            </OptionBtn>
            <OptionBtn
              selected={bijtellingGekozen && !data.zakelijkBijtellingSalaris}
              onClick={() => {
                setBijtellingGekozen(true);
                onChange({ zakelijkBijtellingSalaris: false });
              }}
            >
              Nee
            </OptionBtn>
          </div>
          {data.zakelijkBijtellingSalaris && (
            <p className="font-body text-xs text-text-muted mt-3">
              Vul bij je inkomen straks het nettobedrag in dat na de bijtelling
              overblijft. Weet je het niet precies? Een schatting is voldoende.
            </p>
          )}
        </div>
      )}

      {(data.auto === "eigen" || data.auto === "lease_privé") && (
        <label
          className="font-body flex items-start gap-2.5 mb-10 -mt-4 cursor-pointer"
          style={{ fontSize: "0.85rem", color: "#4A5A56", lineHeight: 1.5 }}
        >
          <input
            type="checkbox"
            checked={data.tweedeAuto}
            onChange={(e) => onChange({ tweedeAuto: e.target.checked })}
            style={{
              marginTop: "0.2rem",
              accentColor: "#0B7A6E",
              width: "1.1rem",
              height: "1.1rem",
              flexShrink: 0,
            }}
          />
          <span>
            Er staat een tweede auto op de oprit. Tel de kosten van beide auto
            {"'"}s straks bij elkaar op.
          </span>
        </label>
      )}
    </div>
  );
}
