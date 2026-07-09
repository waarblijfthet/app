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
      className={`flex-1 min-w-[120px] px-4 py-4 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all duration-150 text-left ${
        selected
          ? "bg-green-light border-primary text-primary shadow-card"
          : "bg-card border-[#D9DEDC] text-text-soft hover:border-primary/60"
      }`}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

export default function Stap1Profiel({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Eerst even kennismaken
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vier snelle vragen zodat de vergelijking eerlijk is.
      </p>

      {/* Huishouden */}
      <fieldset className="mb-8">
        <legend className="font-body font-medium text-text-soft text-sm mb-3">
          Hoe woon je?
        </legend>
        <div className="flex flex-wrap gap-3">
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
            🧍 Alleen
          </OptionBtn>
          <OptionBtn
            selected={data.volwassenen === 2}
            onClick={() => onChange({ volwassenen: 2 })}
          >
            🧑‍🤝‍🧑 Samen met partner
          </OptionBtn>
        </div>
        <p className="font-body text-xs text-text-muted mt-2">
          Zo word je vergeleken met huishoudens in dezelfde situatie, niet met
          een standaardgezin.
        </p>
      </fieldset>

      {/* Woonsituatie */}
      <fieldset className="mb-8">
        <legend className="font-body font-medium text-text-soft text-sm mb-3">
          Woonsituatie
        </legend>
        <div className="flex flex-wrap gap-3">
          <OptionBtn
            selected={data.woonsituatie === "koop"}
            onClick={() => onChange({ woonsituatie: "koop" })}
          >
            🏠 Koopwoning
          </OptionBtn>
          <OptionBtn
            selected={data.woonsituatie === "huur"}
            onClick={() => onChange({ woonsituatie: "huur" })}
          >
            🏢 Huurwoning
          </OptionBtn>
        </div>
      </fieldset>

      {/* Kinderen */}
      <fieldset className="mb-8">
        <legend className="font-body font-medium text-text-soft text-sm mb-3">
          Kinderen thuis
        </legend>
        <div className="flex flex-wrap gap-3">
          {(
            [
              { label: "Geen kinderen", value: 0 },
              { label: "1 kind", value: 1 },
              { label: "2 kinderen", value: 2 },
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
        </div>
      </fieldset>

      {/* Auto */}
      <fieldset className="mb-8">
        <legend className="font-body font-medium text-text-soft text-sm mb-3">
          Auto-situatie
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
              onClick={() => onChange({ auto: opt.value })}
            >
              {opt.label}
            </OptionBtn>
          ))}
        </div>
        <p className="font-body text-xs text-text-muted mt-2">
          Meer dan één auto? Kies de situatie van de privéauto en tel de kosten
          van de tweede auto er straks bij op. Een zakelijke auto ernaast telt
          alleen mee als je er een eigen bijdrage voor betaalt.
        </p>

        {data.auto === "zakelijk" && (
          <div className="mt-4 bg-[#F0F3F1] rounded-xl p-4">
            <p className="font-body text-sm text-text-soft mb-1">
              Staat de bijtelling op je salarisstrook?
            </p>
            <p className="font-body text-xs text-text-muted mb-3">
              Bij de meeste zakelijke auto{"'"}s wel. Twijfel je? Kies {"'"}Ja{"'"}.
            </p>
            <div className="flex gap-3">
              <OptionBtn
                selected={!data.zakelijkBijtellingSalaris}
                onClick={() => onChange({ zakelijkBijtellingSalaris: false })}
              >
                Ja, staat erin
              </OptionBtn>
              <OptionBtn
                selected={data.zakelijkBijtellingSalaris}
                onClick={() => onChange({ zakelijkBijtellingSalaris: true })}
              >
                Nee, staat er niet in
              </OptionBtn>
            </div>
          </div>
        )}
      </fieldset>

      {/* Mobiele bevestiging komt nu uit het ingesloten vergelijkingspaneel
          onder de vragen (QuizClient), zodat het niet dubbel staat. */}
    </div>
  );
}
