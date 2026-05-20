import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { berekenTotaalInkomen, berekenAbonnementen, berekenKinderen, getBenchmarks } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

const BOODSCHAPPEN_HINTS: Record<number, string> = {
  0: "Gemiddeld €485/mnd voor een stel",
  1: "Gemiddeld €620/mnd voor jullie gezin",
  2: "Gemiddeld €755/mnd voor jullie gezin",
  3: "Gemiddeld €890/mnd voor jullie gezin",
};

export default function Stap5Dagelijks({ data, onChange }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const boodschappenWaarde = parseEur(data.boodschappen);
  const abonnementenWaarde = berekenAbonnementen(data);
  const kinderenWaarde = berekenKinderen(data);

  const boodschappenDiff = boodschappenWaarde - benches.boodschappen;
  const abonnementenDiff = abonnementenWaarde - benches.abonnementen;
  const grootsteAfwijking =
    boodschappenDiff > abonnementenDiff ? "boodschappen" : "abonnementen";

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Wat gaat er dagelijks uit?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        De categorieën die het meeste variëren tussen gezinnen.
      </p>

      {/* Boodschappen */}
      <div className="mb-6">
        <EuroInput
          label="Boodschappen per maand"
          id="boodschappen"
          value={data.boodschappen}
          onChange={(v) => onChange({ boodschappen: v })}
          hint={BOODSCHAPPEN_HINTS[data.kinderen ?? 0]}
        />
        {boodschappenWaarde > 0 && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <MiniVergelijking
              jij={boodschappenWaarde}
              benchmark={benches.boodschappen}
            />
            {boodschappenDiff > 50 && (
              <span className="text-xs font-body text-accent font-medium">
                {grootsteAfwijking === "boodschappen" && "⚠"}{" "}
                {fmtEur(boodschappenDiff)} boven gemiddeld
              </span>
            )}
          </div>
        )}
      </div>

      {/* Abonnementen */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-body font-medium text-text-soft text-sm">
            Abonnementen (totaal)
          </label>
          <button
            type="button"
            onClick={() =>
              onChange({ abonnementenExpanded: !data.abonnementenExpanded })
            }
            className="text-xs font-body text-text-muted underline hover:text-primary"
          >
            {data.abonnementenExpanded ? "Samenvoegen" : "Uitsplitsen"}
          </button>
        </div>

        {!data.abonnementenExpanded ? (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-body text-base select-none pointer-events-none">
              €
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={data.abonnementenTotaal}
              onChange={(e) =>
                onChange({ abonnementenTotaal: e.target.value.replace(/[^\d]/g, "") })
              }
              placeholder="0"
              className="w-full bg-white border border-[rgba(26,70,42,0.18)] rounded-[10px] pl-8 pr-4 py-3 text-base text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <p className="text-text-muted font-body text-xs mt-1.5">
              Gemiddeld besteedt een gezin €150–250/mnd aan abonnementen
            </p>
          </div>
        ) : (
          <div className="space-y-3 pl-3 border-l-2 border-[#E8E0D0]">
            <EuroInput
              label="Streaming (Netflix, Disney+, etc.)"
              id="streaming"
              value={data.streamingBedrag}
              onChange={(v) => onChange({ streamingBedrag: v })}
              hint="Gemiddeld €25/mnd"
            />
            <EuroInput
              label="Telefoonabonnementen (totaal gezin)"
              id="telefoon"
              value={data.telefoonBedrag}
              onChange={(v) => onChange({ telefoonBedrag: v })}
              hint="Gemiddeld €25/mnd per persoon"
            />
            <EuroInput
              label="Overig (gym, kranten, apps, etc.)"
              id="abonOverig"
              value={data.abonnementenOverigBedrag}
              onChange={(v) => onChange({ abonnementenOverigBedrag: v })}
            />
          </div>
        )}

        {abonnementenWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking
              jij={abonnementenWaarde}
              benchmark={benches.abonnementen}
            />
          </div>
        )}
      </div>

      {/* Kinderkosten */}
      {(data.kinderen ?? 0) > 0 && (
        <div className="mb-6">
          <p className="font-body font-medium text-text-soft text-sm mb-4">
            Kinderkosten
          </p>
          <div className="space-y-4">
            <EuroInput
              label="Kinderopvang eigen bijdrage (na toeslag)"
              id="kinderopvang"
              value={data.kinderopvangEigenBijdrage}
              onChange={(v) => onChange({ kinderopvangEigenBijdrage: v })}
            />
            <EuroInput
              label="School en activiteiten"
              id="school"
              value={data.schoolActiviteiten}
              onChange={(v) => onChange({ schoolActiviteiten: v })}
            />
            <EuroInput
              label="Sport en hobby's kinderen"
              id="sport"
              value={data.sportHobbyKinderen}
              onChange={(v) => onChange({ sportHobbyKinderen: v })}
            />
          </div>
          {kinderenWaarde > 0 && benches.kinderen > 0 && (
            <div className="mt-3">
              <MiniVergelijking jij={kinderenWaarde} benchmark={benches.kinderen} />
            </div>
          )}
        </div>
      )}

      {/* Vrije tijd */}
      <div className="mb-6">
        <EuroInput
          label="Vrije tijd (uit eten, vakanties, hobby's)"
          id="vrijetijd"
          value={data.vrijetijd}
          onChange={(v) => onChange({ vrijetijd: v })}
          hint="Bereken je vakantiekosten terug naar een maandbedrag"
        />
      </div>

      {/* Mobile biggest afwijking highlight */}
      {boodschappenWaarde > 0 && abonnementenWaarde > 0 && (
        <div className="lg:hidden bg-[#FDECEA] rounded-xl p-4">
          <p className="text-xs font-body text-[#B03A2E] font-medium mb-1">
            ⚠ Grootste afwijking
          </p>
          <p className="font-body text-sm text-[#B03A2E]">
            {grootsteAfwijking === "boodschappen"
              ? `Boodschappen: ${fmtEur(boodschappenWaarde)} vs gemiddeld ${fmtEur(benches.boodschappen)}`
              : `Abonnementen: ${fmtEur(abonnementenWaarde)} vs gemiddeld ${fmtEur(benches.abonnementen)}`}
          </p>
        </div>
      )}
    </div>
  );
}
