import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  berekenOver,
  getPercentiel,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
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
    .filter((p) => p.jij > 0 && p.jij - p.bench > 50)
    .sort((a, b) => b.jij - b.bench - (a.jij - a.bench))
    .slice(0, 2)
    .map((p) => p.naam.toLowerCase());

  if (boven.length === 0) return "";
  if (boven.length === 1)
    return `Op dit moment valt vooral ${boven[0]} op in je vergelijking.`;
  return `Op dit moment verklaren ${boven[0]} en ${boven[1]} het grootste deel van het verschil.`;
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

  // Stap 1, alleen bevestigen met wie je wordt vergeleken. Nog geen cijfers.
  if (currentStep === 1) {
    if (
      data.volwassenen === null ||
      !data.woonsituatie ||
      data.kinderen === null
    )
      return null;
    const k = data.kinderen ?? 0;
    const kindTekst =
      k === 0
        ? "zonder kinderen"
        : `met ${k === 3 ? "3 of meer" : k} ${k === 1 ? "kind" : "kinderen"}`;
    const volwTekst = data.volwassenen === 1 ? "één volwassene" : "twee volwassenen";
    return (
      <div className={`card-base border border-[#E6E9E7] ${stickyCls}`}>
        <p className="section-eyebrow mb-4">Jouw vergelijking</p>
        <div className="bg-green-light rounded-xl p-4">
          <p className="font-body text-sm text-primary font-medium">
            Een huishouden van {volwTekst} {kindTekst} in een{" "}
            {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"}.
          </p>
        </div>
        <p className="font-body text-xs text-text-muted mt-3">
          Vanaf nu bouwen we jouw persoonlijke vergelijking op.
        </p>
      </div>
    );
  }

  // Stap 2, inkomen. "Dit zien we nu al."
  if (currentStep === 2) {
    if (inkomen === 0) return null;
    const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
    const hoog = percentiel.startsWith("top");
    const midden = percentiel === "middengroep";
    const inkomenZin = hoog
      ? "Je inkomen ligt hoger dan bij veel vergelijkbare huishoudens."
      : midden
      ? "Je inkomen zit rond het midden van vergelijkbare huishoudens."
      : "Je inkomen ligt wat lager dan bij veel vergelijkbare huishoudens.";
    return (
      <div className={`card-base border border-[#E6E9E7] ${stickyCls}`}>
        <p className="section-eyebrow mb-3">Dit zien we nu al</p>
        <p className="text-text-muted font-body text-xs mb-1">
          Geschat netto huishoudinkomen
        </p>
        <p className="font-display font-light text-primary text-4xl mb-3">
          {fmtEur(inkomen)}
          <span className="text-base text-text-muted font-body"> p/m</span>
        </p>
        <div className="bg-[#F0F3F1] rounded-xl p-3 mb-3">
          <p className="font-body text-xs text-text-soft leading-relaxed">
            {inkomenZin} Je zit in de{" "}
            <strong className="text-primary">{percentiel}</strong> van Nederlandse
            huishoudens.
          </p>
        </div>
        <p className="font-body text-xs text-text-muted">
          Nu kijken we hoeveel daarvan al opgaat aan wonen.
        </p>
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
    <div className={`card-base border border-[#E6E9E7] ${stickyCls} ${scrollCls}`}>
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
                  className={`ml-1 font-medium ${
                    overDiff > 0 ? "text-[#0B7A6E]" : "text-[#A15A32]"
                  }`}
                >
                  ({overDiff > 0 ? "+" : ""}
                  {fmtEur(overDiff)})
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
