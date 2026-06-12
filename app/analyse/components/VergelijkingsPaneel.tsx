import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  berekenOver,
  getVergelijkingStatus,
  getPercentiel,
  VergelijkingStatus,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  currentStep: number;
}

const STATUS_PILL: Record<VergelijkingStatus, { cls: string; label: string }> = {
  goed: { cls: "bg-green-light text-[#2D6A4F]", label: "✓ Onder gemiddeld" },
  matig: { cls: "bg-[#FDF3E3] text-[#92600A]", label: "~ Rond gemiddeld" },
  zorgelijk: { cls: "bg-[#FDECEA] text-[#B03A2E]", label: "⚠ Boven gemiddeld" },
};

const STATUS_BAR: Record<VergelijkingStatus, string> = {
  goed: "bg-primary",
  matig: "bg-[#E8A830]",
  zorgelijk: "bg-accent",
};

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
  const status = getVergelijkingStatus(jij, benchmark);
  const pill = STATUS_PILL[status];
  const barColor = STATUS_BAR[status];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-body text-xs text-text-soft font-medium">{label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-body font-medium ${pill.cls}`}>
          {pill.label}
        </span>
      </div>
      <div className="space-y-1">
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Jullie</span>
            <span className="font-medium">{fmtEur(jij)}</span>
          </div>
          <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${(jij / max) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Gemiddeld</span>
            <span>{fmtEur(benchmark)}</span>
          </div>
          <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#B8C9BC] transition-all duration-300"
              style={{ width: `${(benchmark / max) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VergelijkingsPaneel({ data, currentStep }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;

  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const over = berekenOver(data);
  const overDiff = over - benches.vrij_besteedbaar;

  // Step 1, only profile confirmation, no numbers yet
  if (currentStep === 1) {
    if (!data.woonsituatie || data.kinderen === null || !data.auto) return null;
    return (
      <div className="card-base border border-[#E8E0D0] sticky top-24">
        <p className="section-eyebrow mb-4">Jouw vergelijking</p>
        <div className="bg-green-light rounded-xl p-4">
          <p className="font-body text-sm text-primary font-medium">
            {(() => {
              const k = data.kinderen ?? 0;
              const kindTekst =
                k === 0
                  ? "zonder kinderen"
                  : `met ${k === 3 ? "3 of meer" : k} ${k === 1 ? "kind" : "kinderen"}`;
              return (
                <>
                  Goed, we vergelijken je met een huishouden {kindTekst} in een{" "}
                  {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"}.
                </>
              );
            })()}
          </p>
        </div>
      </div>
    );
  }

  // Step 2, income overview
  if (currentStep === 2) {
    if (inkomen === 0) return null;
    const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
    return (
      <div className="card-base border border-[#E8E0D0] sticky top-24">
        <p className="section-eyebrow mb-4">Jullie inkomen</p>
        <p className="font-display font-light text-primary text-4xl mb-1">
          {fmtEur(inkomen)}
        </p>
        <p className="text-text-muted font-body text-xs mb-4">per maand netto</p>
        <div className="bg-[#F0EDE6] rounded-xl p-3 mb-4">
          <p className="font-body text-xs text-text-soft">
            Jullie zitten in de{" "}
            <strong className="text-primary">{percentiel}</strong> van Nederlandse
            huishoudens.
          </p>
        </div>
        <div className="h-3 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{
              width: `${Math.min(
                ((inkomen - 1500) / (8000 - 1500)) * 100,
                100
              )}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted font-body mt-1">
          <span>€1.500</span>
          <span>€8.000+</span>
        </div>
      </div>
    );
  }

  // Steps 3-5, cumulative expense overview
  const wonen = berekenWonen(data);
  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);
  const boodschappen = parseEur(data.boodschappen);
  const abonnementen = berekenAbonnementen(data);
  const kinderen = berekenKinderen(data);

  return (
    <div className="card-base border border-[#E8E0D0] sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="section-eyebrow mb-1">Live vergelijking</p>

      {inkomen > 0 && (
        <div className="mb-4 pb-4 border-b border-[#E8E0D0]">
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

      {inkomen > 0 && (over !== 0 || berekenWonen(data) > 0) && (
        <div className="mt-4 pt-4 border-t border-[#E8E0D0]">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-body text-xs text-text-soft font-medium">
              Resterend
            </span>
            <span
              className={`font-display font-light text-xl ${
                over < 0 ? "text-accent" : "text-primary"
              }`}
            >
              {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
            </span>
          </div>
          {benches.vrij_besteedbaar > 0 && (
            <p className="text-text-muted font-body text-xs">
              Gemiddeld:{" "}
              <span className="font-medium">{fmtEur(benches.vrij_besteedbaar)}</span>
              {overDiff !== 0 && (
                <span
                  className={`ml-1 font-medium ${
                    overDiff > 0 ? "text-[#2D6A4F]" : "text-accent"
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
    </div>
  );
}
