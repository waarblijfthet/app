"use client";

import { useState } from "react";
import { QuizData, AutoSituatie } from "@/lib/quiz-types";
import {
  berekenTotaalInkomen,
  berekenVervoer,
  berekenVerzekeringen,
  getBenchmarks,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";

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
      aria-pressed={selected}
      className={`flex-1 min-w-[130px] min-h-[52px] px-4 py-3.5 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all duration-150 text-left ${
        selected
          ? "bg-green-light border-accent text-primary shadow-card"
          : "bg-card border-[#D9DEDC] text-text-soft hover:border-accent/60"
      }`}
    >
      {children}
    </button>
  );
}

export default function Stap4Vervoer({ data, onChange }: Props) {
  // De bijtellingsvraag start zonder voorgeselecteerd antwoord, anders staat er
  // een "Nee" dat de bezoeker nooit zelf gaf.
  const [bijtellingGekozen, setBijtellingGekozen] = useState(
    data.auto === "zakelijk"
  );

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenen,
  });

  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Vervoer en verzekeringen
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-8">
        Vervoer verschilt sterk per huishouden, dus dit scherpt je vergelijking
        aan. Een schatting per maand is voldoende.
      </p>

      {/* Autosituatie (28-aug-2026 hierheen verplaatst vanuit stap 1, zodat het
          eerste scherm licht bleef). Bepaalt welke velden hieronder verschijnen. */}
      <fieldset className="mb-10">
        <legend className="font-body font-medium text-primary text-sm mb-3">
          Welke autosituatie past bij jou?
        </legend>
        <div className="flex flex-wrap gap-3">
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
              onClick={() => {
                setBijtellingGekozen(opt.value === "zakelijk" ? false : true);
                onChange(
                  opt.value === "zakelijk"
                    ? { auto: opt.value, tweedeAuto: false }
                    : { auto: opt.value, zakelijkBijtellingSalaris: false }
                );
              }}
            >
              {opt.label}
            </OptionBtn>
          ))}
        </div>

        {data.auto === "zakelijk" && (
          <div className="mt-5">
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
          </div>
        )}

        {(data.auto === "eigen" || data.auto === "lease_privé") && (
          <label
            className="font-body flex items-start gap-2.5 mt-4 cursor-pointer"
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
      </fieldset>

      {/* Vervoerskosten, alleen de velden die bij je autosituatie horen. */}
      {data.auto && (
        <div className="mb-10">
          {data.auto === "geen" && (
            <EuroInput
              label="Openbaar vervoer en fiets"
              id="ovAbonnement"
              value={data.ovAbonnement}
              onChange={(v) => onChange({ ovAbonnement: v })}
              hint="Per maand. Een schatting is voldoende."
              plausibelTot={1500}
            />
          )}

          {data.auto === "eigen" && (
            <div className="space-y-8">
              <EuroInput
                label="Brandstof of laden per maand"
                id="brandstof"
                value={data.brandstof}
                onChange={(v) => onChange({ brandstof: v })}
                hint="Een schatting is voldoende."
                plausibelTot={2000}
              />
              <EuroInput
                label="Autoverzekering en wegenbelasting"
                id="autoVerzWB"
                value={data.autoVerzWB}
                onChange={(v) => onChange({ autoVerzWB: v })}
                hint="Samen, per maand."
                plausibelTot={2000}
              />
            </div>
          )}

          {data.auto === "lease_privé" && (
            <EuroInput
              label="Leasebedrag per maand"
              id="leaseBedrag"
              value={data.leaseBedrag}
              onChange={(v) => onChange({ leaseBedrag: v })}
              hint="Het all-in bedrag dat je maandelijks betaalt."
              plausibelTot={3000}
            />
          )}

          {data.auto === "zakelijk" && (
            <EuroInput
              label="Eigen bijdrage privégebruik"
              id="zakelijkEigenBijdrage"
              value={data.zakelijkEigenBijdrage}
              onChange={(v) => onChange({ zakelijkEigenBijdrage: v })}
              hint="Betaal je niets? Laat leeg."
              plausibelTot={2000}
            />
          )}

          {vervoer > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
            </div>
          )}
        </div>
      )}

      <div className="mb-10">
        {aantalVolwassenen === 2 && (
          <div className="flex gap-2 mb-2">
            {(
              [
                { v: "per_persoon", label: "Per persoon" },
                { v: "totaal", label: "Totaal huishouden" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => onChange({ zorgToggle: opt.v })}
                className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                  data.zorgToggle === opt.v
                    ? "bg-primary text-white"
                    : "bg-[#E6E9E7] text-text-soft"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
        <EuroInput
          label={
            aantalVolwassenen === 1
              ? "Zorgverzekering per maand"
              : data.zorgToggle === "per_persoon"
              ? "Zorgverzekering per persoon"
              : "Zorgverzekering totaal huishouden"
          }
          id="zorgPerPersoon"
          value={data.zorgPerPersoon}
          onChange={(v) => onChange({ zorgPerPersoon: v })}
          hint="Gebruik het bedrag dat je daadwerkelijk per maand betaalt."
          plausibelTot={1200}
        />
      </div>

      <div className="mb-10">
        <EuroInput
          label="Overige verzekeringen"
          id="verzekeringOverig"
          value={data.verzekeringOverig}
          onChange={(v) => onChange({ verzekeringOverig: v })}
          hint="Denk aan inboedel, aansprakelijkheid, auto, rechtsbijstand, leven en eventueel arbeidsongeschiktheid."
          hint2="Een realistische schatting is voldoende."
          plausibelTot={3000}
        />
        {verzekeringen > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={verzekeringen} benchmark={benches.verzekeringen} />
          </div>
        )}
      </div>
    </div>
  );
}
