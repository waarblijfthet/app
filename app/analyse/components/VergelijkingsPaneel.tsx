import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  berekenOver,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import LiveInzicht from "./LiveInzicht";
import {
  bepaalRichting,
  RICHTING_LABEL,
  RICHTING_PIL,
  RICHTING_BALK,
} from "./vergelijking-labels";

interface Props {
  data: QuizData;
  currentStep: number;
  embedded?: boolean;
}

function CompareBalk({
  label,
  jij,
  benchmark,
}: {
  label: string;
  jij: number;
  benchmark: number;
}) {
  if (!jij && !benchmark) return null;
  const max = Math.max(jij, benchmark, 1);
  const richting = bepaalRichting(jij, benchmark);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="font-body text-xs text-primary font-medium">{label}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-body font-medium whitespace-nowrap ${RICHTING_PIL[richting]}`}
        >
          {RICHTING_LABEL[richting]}
        </span>
      </div>
      <div className="space-y-1">
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Jij</span>
            <span className="font-medium text-text-soft">{fmtEur(jij)}</span>
          </div>
          <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${RICHTING_BALK[richting]}`}
              style={{ width: `${(jij / max) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Vergelijkbare huishoudens</span>
            <span>{fmtEur(benchmark)}</span>
          </div>
          <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#B2CCC6] transition-all duration-300"
              style={{ width: `${(benchmark / max) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** De één of twee posten die tot nu toe het meest boven vergelijkbaar liggen. */
function samenvatContributie(
  posten: Array<{ naam: string; jij: number; bench: number }>
): string {
  const boven = posten
    .filter((p) => p.jij > 0 && bepaalRichting(p.jij, p.bench) === "hoger")
    .sort((a, b) => b.jij - b.bench - (a.jij - a.bench))
    .slice(0, 2)
    .map((p) => p.naam.toLowerCase());

  if (boven.length === 0) return "";
  if (boven.length === 1)
    return `Op dit moment zie ik vooral verschil bij ${boven[0]}.`;
  return `Op dit moment zit het grootste deel van het verschil bij ${boven[0]} en ${boven[1]}.`;
}

export default function VergelijkingsPaneel({ data, currentStep, embedded }: Props) {
  const stickyCls = embedded ? "" : "sticky top-24";
  const scrollCls = embedded ? "" : "max-h-[calc(100vh-8rem)] overflow-y-auto";
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

  const over = berekenOver(data);
  const overDiff = over - benches.vrij_besteedbaar;

  // Stap 1 en 2 zijn kort en de beloning zelf. Die staan in LiveInzicht, zodat
  // er niet twee versies van dezelfde tekst bestaan (28-aug-2026, pass 4).
  if (currentStep <= 2) {
    return (
      <div className={stickyCls}>
        <LiveInzicht data={data} currentStep={currentStep} />
      </div>
    );
  }

  // Stap 3 tot 5, oplopend beeld: "Jouw foto tot nu toe".
  const wonen = berekenWonen(data);
  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);
  const boodschappen = parseEur(data.boodschappen);
  const abonnementen = berekenAbonnementen(data);
  const kinderen = berekenKinderen(data);

  const samenvatting = samenvatContributie([
    { naam: "Wonen", jij: wonen, bench: benches.wonen },
    { naam: "Vervoer", jij: vervoer, bench: benches.vervoer },
    { naam: "Verzekeringen", jij: verzekeringen, bench: benches.verzekeringen },
    { naam: "Boodschappen", jij: boodschappen, bench: benches.boodschappen },
    { naam: "Abonnementen", jij: abonnementen, bench: benches.abonnementen },
    { naam: "Kinderkosten", jij: kinderen, bench: benches.kinderen },
  ]);

  return (
    <div
      className={`bg-card rounded-xl border border-[#E6E9E7] p-5 ${stickyCls} ${scrollCls}`}
    >
      <p className="section-eyebrow mb-1">Jouw foto tot nu toe</p>
      <p className="font-body text-xs text-text-muted mb-4">
        Op basis van wat je tot nu toe invulde.
      </p>

      {inkomen > 0 && (
        <div className="mb-4 pb-4 border-b border-[#E6E9E7]">
          <div className="flex justify-between items-baseline">
            <span className="text-text-muted font-body text-xs">Inkomen</span>
            <span className="font-display font-light text-primary text-xl">
              {fmtEur(inkomen)}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {wonen > 0 && (
          <CompareBalk label="Wonen" jij={wonen} benchmark={benches.wonen} />
        )}
        {vervoer > 0 && (
          <CompareBalk label="Vervoer" jij={vervoer} benchmark={benches.vervoer} />
        )}
        {verzekeringen > 0 && (
          <CompareBalk
            label="Verzekeringen"
            jij={verzekeringen}
            benchmark={benches.verzekeringen}
          />
        )}
        {boodschappen > 0 && (
          <CompareBalk
            label="Boodschappen"
            jij={boodschappen}
            benchmark={benches.boodschappen}
          />
        )}
        {abonnementen > 0 && (
          <CompareBalk
            label="Abonnementen"
            jij={abonnementen}
            benchmark={benches.abonnementen}
          />
        )}
        {kinderen > 0 && (
          <CompareBalk
            label="Kinderkosten"
            jij={kinderen}
            benchmark={benches.kinderen}
          />
        )}
      </div>

      {inkomen > 0 && wonen > 0 && (
        <div className="mt-4 pt-4 border-t border-[#E6E9E7]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-body text-xs text-primary font-medium">
              Tot nu toe geschatte ruimte
            </span>
            <span
              className={`font-display font-light text-xl ${
                over < 0 ? "text-[#C4603A]" : "text-primary"
              }`}
            >
              {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
            </span>
          </div>
          {benches.vrij_besteedbaar > 0 && (
            <p className="text-text-muted font-body text-xs">
              Vergelijkbare huishoudens:{" "}
              <span className="font-medium">{fmtEur(benches.vrij_besteedbaar)}</span>
              {Math.abs(overDiff) >= 10 && (
                <span
                  className={`ml-1.5 font-medium ${
                    overDiff > 0 ? "text-[#0B7A6E]" : "text-[#A15A32]"
                  }`}
                >
                  {`(${overDiff > 0 ? "+" : "-"}${fmtEur(Math.abs(overDiff))})`}
                </span>
              )}
            </p>
          )}
        </div>
      )}

      {samenvatting ? (
        <p className="font-body text-xs text-text-soft mt-4 pt-4 border-t border-[#E6E9E7] leading-relaxed">
          {samenvatting}
        </p>
      ) : (
        <p className="font-body text-xs text-text-muted mt-4 pt-4 border-t border-[#E6E9E7]">
          Nog even doorgaan. Daarna kunnen we je volledige vergelijking laten
          zien.
        </p>
      )}
    </div>
  );
}
