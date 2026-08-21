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

function PaneelKop({ ondertitel }: { ondertitel: string }) {
  return (
    <div className="mb-4">
      <p className="section-eyebrow">Voorlopige vergelijking</p>
      <p className="font-body text-xs text-text-muted mt-1">{ondertitel}</p>
    </div>
  );
}

function PaneelVoet() {
  return (
    <p className="font-body text-xs text-text-muted mt-4 pt-4 border-t border-[#E6E9E7]">
      Nog niet je volledige financiële beeld.
    </p>
  );
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
      data.kinderen === null ||
      !data.auto
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
        <p className="section-eyebrow mb-4">Wie word jij vergeleken</p>
        <div className="bg-green-light rounded-xl p-4">
          <p className="font-body text-sm text-primary font-medium">
            Een huishouden van {volwTekst} {kindTekst} in een{" "}
            {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"}.
          </p>
        </div>
        <p className="font-body text-xs text-text-muted mt-3">
          Vanaf de volgende stap zie je hier je eerste vergelijking.
        </p>
      </div>
    );
  }

  // Stap 2, inkomen.
  if (currentStep === 2) {
    if (inkomen === 0) return null;
    const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
    return (
      <div className={`card-base border border-[#E6E9E7] ${stickyCls}`}>
        <PaneelKop ondertitel="Op basis van wat je tot nu toe hebt ingevuld." />
        <p className="font-display font-light text-primary text-4xl mb-1">
          {fmtEur(inkomen)}
        </p>
        <p className="text-text-muted font-body text-xs mb-4">
          netto per maand binnen
        </p>
        <div className="bg-[#F0F3F1] rounded-xl p-3 mb-4">
          <p className="font-body text-xs text-text-soft">
            Je zit in de{" "}
            <strong className="text-primary">{percentiel}</strong> van Nederlandse
            huishoudens.
          </p>
        </div>
        <div className="h-3 bg-[#F0F3F1] rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{
              width: `${Math.min(((inkomen - 1500) / (8000 - 1500)) * 100, 100)}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted font-body mt-1">
          <span>&euro;1.500</span>
          <span>&euro;8.000+</span>
        </div>
        <PaneelVoet />
      </div>
    );
  }

  // Stap 3 tot 5, oplopend beeld van de uitgaven.
  const wonen = berekenWonen(data);
  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);
  const boodschappen = parseEur(data.boodschappen);
  const abonnementen = berekenAbonnementen(data);
  const kinderen = berekenKinderen(data);

  return (
    <div className={`card-base border border-[#E6E9E7] ${stickyCls} ${scrollCls}`}>
      <PaneelKop ondertitel="Op basis van wat je tot nu toe hebt ingevuld." />

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
              Tot nu toe over
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

      <PaneelVoet />
    </div>
  );
}
