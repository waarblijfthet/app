"use client";

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
      className={`flex-1 min-w-[150px] min-h-[52px] px-4 py-3.5 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all duration-150 text-left ${
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
        Hoe ziet vervoer er bij jullie uit?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-8">
        Dit verschilt sterk per huishouden. Kies wat het beste bij jullie
        situatie past, een schatting per maand is genoeg.
      </p>

      {/* Autosituatie bepaalt welke vraag hieronder verschijnt. */}
      <fieldset className="mb-8">
        <legend className="font-body font-medium text-primary text-sm mb-3">
          Hebben jullie een auto?
        </legend>
        <div className="flex flex-wrap gap-3">
          {(
            [
              { label: "Geen auto", value: "geen" },
              { label: "Eén of meer eigen auto's", value: "eigen" },
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
                    : { auto: opt.value }
                )
              }
            >
              {opt.label}
            </OptionBtn>
          ))}
        </div>
      </fieldset>

      {/* Alleen de vraag die bij de gekozen autosituatie hoort. */}
      {data.auto === "geen" && (
        <div className="mb-10">
          <EuroInput
            label="Reiskosten per maand"
            id="ovAbonnement"
            value={data.ovAbonnement}
            onChange={(v) => onChange({ ovAbonnement: v })}
            hint="Ov, fiets of deelvervoer. Een schatting is voldoende."
            plausibelTot={1500}
          />
          {vervoer > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
            </div>
          )}
        </div>
      )}

      {data.auto === "eigen" && (
        <div className="mb-10">
          <EuroInput
            label="Wat kost jullie auto ongeveer per maand?"
            id="brandstof"
            value={data.brandstof}
            onChange={(v) => onChange({ brandstof: v })}
            hint="Brandstof of laden, verzekering, onderhoud en belasting samen."
            hint2="Weet je alleen ongeveer wat je aan brandstof betaalt? Vul dat in, dat is prima."
            plausibelTot={3000}
          />
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
              {"'"}s dan hierboven bij elkaar op.
            </span>
          </label>
          {vervoer > 0 && (
            <div className="mt-3">
              <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
            </div>
          )}
        </div>
      )}

      {data.auto === "lease_privé" && (
        <div className="mb-10">
          <EuroInput
            label="Leasebedrag per maand"
            id="leaseBedrag"
            value={data.leaseBedrag}
            onChange={(v) => onChange({ leaseBedrag: v })}
            hint="Het all-in bedrag dat je maandelijks betaalt."
            plausibelTot={3000}
          />
          {vervoer > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
            </div>
          )}
        </div>
      )}

      {data.auto === "zakelijk" && (
        <div className="mb-10">
          <EuroInput
            label="Wat betaal je zelf gemiddeld voor de auto?"
            id="zakelijkEigenBijdrage"
            value={data.zakelijkEigenBijdrage}
            onChange={(v) => onChange({ zakelijkEigenBijdrage: v })}
            hint="Eigen bijdrage of andere kosten die je privé betaalt. Betaal je niets, laat leeg."
            plausibelTot={2000}
          />
          {vervoer > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
            </div>
          )}
        </div>
      )}

      {/* Vaste verzekeringen. */}
      <div className="mb-8">
        <p className="font-body font-medium text-primary text-sm mb-4">
          Vaste verzekeringen
        </p>
        <div className="mb-8">
          <EuroInput
            label="Zorgverzekering, totaal huishouden"
            id="zorgPerPersoon"
            value={data.zorgPerPersoon}
            onChange={(v) => onChange({ zorgPerPersoon: v })}
            hint="Wat jullie samen daadwerkelijk per maand betalen."
            plausibelTot={1200}
          />
        </div>
        <EuroInput
          label="Overige verzekeringen"
          id="verzekeringOverig"
          value={data.verzekeringOverig}
          onChange={(v) => onChange({ verzekeringOverig: v })}
          hint="Aansprakelijkheid, inboedel, auto, rechtsbijstand en overlijdensrisico. Een schatting is genoeg."
          plausibelTot={3000}
        />
        {verzekeringen > 0 && (
          <div className="mt-3">
            <MiniVergelijking jij={verzekeringen} benchmark={benches.verzekeringen} />
          </div>
        )}
      </div>
    </div>
  );
}
