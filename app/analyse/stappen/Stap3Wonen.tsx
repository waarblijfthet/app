import { useState } from "react";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { berekenTotaalInkomen, berekenWonen, getBenchmarks, getVergelijkingStatus } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap3Wonen({ data, onChange }: Props) {
  const [overigOpen, setOverigOpen] = useState(false);

  const inkomen = berekenTotaalInkomen(data);
  const wonen = berekenWonen(data);
  const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const wonenPct = inkomen > 0 ? (wonen / inkomen) * 100 : 0;
  const benchPct = data.woonsituatie === "koop" ? 28 : 30;
  const status = wonen > 0 ? getVergelijkingStatus(wonen, benches.wonen) : null;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Jullie woonlasten
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vul de maandelijkse kosten in voor je woning.
      </p>

      <div className="space-y-5 mb-8">
        <div>
          <EuroInput
            label={
              data.woonsituatie === "huur"
                ? "Maandelijkse huur"
                : "Hypotheek per maand (bruto)"
            }
            id="huurHypotheek"
            value={data.huurHypotheek}
            onChange={(v) => onChange({ huurHypotheek: v })}
            hint={
              data.woonsituatie === "koop"
                ? "Het bedrag dat je maandelijks aan de bank overmaakt. De hypotheekrenteaftrek vul je apart in als inkomen (stap 2)."
                : undefined
            }
          />
        </div>

        <div>
          <EuroInput
            label="Energie (gas + stroom + water)"
            id="energie"
            value={data.energie}
            onChange={(v) => onChange({ energie: v })}
            hint="Gemiddeld €216/mnd voor een tussenwoning"
          />
          {parseEur(data.energie) > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={parseEur(data.energie)} benchmark={216} />
            </div>
          )}
        </div>

        <div>
          <EuroInput
            label="Internet, TV en vaste telefoon"
            id="internet"
            value={data.internet}
            onChange={(v) => onChange({ internet: v })}
            hint="Gemiddeld €55/mnd"
          />
          {parseEur(data.internet) > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={parseEur(data.internet)} benchmark={55} />
            </div>
          )}
        </div>
      </div>

      {/* Overige woonkosten */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => setOverigOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors"
        >
          <span className={`transition-transform duration-200 ${overigOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
          {overigOpen ? "Verberg overige woonkosten" : "+ Overige woonkosten toevoegen"}
        </button>
        {overigOpen && (
          <div className="mt-4 space-y-4">
            <EuroInput
              label="Servicekosten / VvE"
              id="servicekosten"
              value={data.servicekosten}
              onChange={(v) => onChange({ servicekosten: v })}
            />
            <div>
              <div className="flex gap-2 mb-2">
                {(["maand", "jaar"] as const).map((per) => (
                  <button
                    key={per}
                    type="button"
                    onClick={() => onChange({ gemeenteBelastingenPer: per })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                      data.gemeenteBelastingenPer === per
                        ? "bg-primary text-white"
                        : "bg-[#E8E0D0] text-text-soft"
                    }`}
                  >
                    Per {per}
                  </button>
                ))}
              </div>
              <EuroInput
                label={`Gemeentelijke belastingen (OZB e.d.), per ${data.gemeenteBelastingenPer}`}
                id="gemeenteBelastingen"
                value={data.gemeenteBelastingen}
                onChange={(v) => onChange({ gemeenteBelastingen: v })}
                hint="Vaak een jaaraanslag, kies dan 'per jaar'."
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile feedback */}
      {wonen > 0 && inkomen > 0 && (
        <div
          className={`lg:hidden rounded-xl p-4 ${
            status === "goed"
              ? "bg-green-light"
              : status === "matig"
              ? "bg-[#FDF3E3]"
              : "bg-[#FDECEA]"
          }`}
        >
          <p
            className={`font-body font-medium text-sm ${
              status === "goed"
                ? "text-[#2D6A4F]"
                : status === "matig"
                ? "text-[#92600A]"
                : "text-[#B03A2E]"
            }`}
          >
            Jullie besteden{" "}
            <strong>{wonenPct.toFixed(0)}%</strong> aan wonen. Normaal voor een{" "}
            {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"} is{" "}
            <strong>{benchPct}%</strong>.
          </p>
          <p className="text-xs mt-1 opacity-70 font-body">
            {fmtEur(wonen)} vs gemiddeld {fmtEur(benches.wonen)}
          </p>
        </div>
      )}
    </div>
  );
}
