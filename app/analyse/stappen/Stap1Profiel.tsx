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
      className={`flex-1 min-w-[calc(50%-0.375rem)] px-4 py-4 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all duration-150 text-left ${
        selected
          ? "bg-green-light border-primary text-primary shadow-card"
          : "bg-card border-[#D6CEBC] text-text-soft hover:border-primary/60"
      }`}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

export default function Stap1Profiel({ data, onChange }: Props) {
  const allFilled = data.woonsituatie !== null && data.kinderen !== null && data.auto !== null;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Eerst even kennismaken
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Drie snelle vragen zodat we je eerlijk kunnen vergelijken.
      </p>

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

        {data.auto === "zakelijk" && (
          <div className="mt-4 bg-[#F0EDE6] rounded-xl p-4">
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

      {/* Live bevestiging */}
      {allFilled && (
        <div className="bg-green-light rounded-xl p-4 lg:hidden">
          <p className="font-body text-sm text-primary font-medium">
            {(() => {
              const k = data.kinderen ?? 0;
              const kindTekst =
                k === 0
                  ? "zonder kinderen"
                  : `met ${k === 3 ? "3 of meer" : k} ${k === 1 ? "kind" : "kinderen"}`;
              return (
                <>
                  Goed, we vergelijken je met een gezin {kindTekst} in een{" "}
                  {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"}.
                </>
              );
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
