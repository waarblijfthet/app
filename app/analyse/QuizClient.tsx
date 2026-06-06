"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { QuizData, DEFAULT_QUIZ_DATA, canProceed, parseEur } from "@/lib/quiz-types";
import { createClient } from "@/lib/supabase-browser";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  bepaalVerdict,
  vindGrootsteAfwijking,
} from "@/lib/benchmarks";
import ProgressBar from "./components/ProgressBar";
import VergelijkingsPaneel from "./components/VergelijkingsPaneel";
import Stap1Profiel from "./stappen/Stap1Profiel";
import Stap2Inkomsten from "./stappen/Stap2Inkomsten";
import Stap3Wonen from "./stappen/Stap3Wonen";
import Stap4Vervoer from "./stappen/Stap4Vervoer";
import Stap5Dagelijks from "./stappen/Stap5Dagelijks";
import Stap6Resultaat from "./stappen/Stap6Resultaat";

const TOTAL_STEPS = 6;
const STAP_LABELS = ["Profiel", "Inkomen", "Wonen", "Vervoer", "Dagelijks", "Resultaat"];

export default function QuizClient() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(DEFAULT_QUIZ_DATA);

  const update = useCallback((changes: Partial<QuizData>) => {
    setData((prev) => ({ ...prev, ...changes }));
  }, []);

  const sessieIdRef = useRef<string>("");
  const maxStapRef = useRef<number>(1);

  useEffect(() => {
    if (!sessieIdRef.current) {
      sessieIdRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
    }
    maxStapRef.current = Math.max(maxStapRef.current, step);
    const voltooid = step === 6;

    let inkomen = 0;
    let over = 0;
    let uitgaven = 0;
    let verdict: string | null = null;
    let grootste: string | null = null;
    try {
      inkomen = berekenTotaalInkomen(data);
      if (voltooid) {
        const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
        const benches = getBenchmarks({
          woonsituatie: data.woonsituatie,
          kinderen: data.kinderen,
          inkomen,
          auto: data.auto,
          aantalVolwassenen,
        });
        over = berekenOver(data);
        uitgaven = inkomen - over;
        verdict = bepaalVerdict(data, benches);
        grootste = vindGrootsteAfwijking(data, benches);
      }
    } catch {
      // rekenfout mag nooit de tool breken
    }

    const {
      email: _e,
      naam: _n,
      toestemmingOpslaan: _t,
      toestemmingMarketing: _m,
      ...antwoorden
    } = data;

    try {
      const supabase = createClient();
      supabase
        .from("quiz_voortgang")
        .upsert(
          {
            sessie_id: sessieIdRef.current,
            huidige_stap: step,
            max_stap: maxStapRef.current,
            voltooid,
            woonsituatie: data.woonsituatie,
            aantal_kinderen: data.kinderen,
            auto_situatie: data.auto,
            totaal_inkomen: inkomen || null,
            totaal_uitgaven: voltooid ? uitgaven : null,
            maandelijks_over: voltooid ? over : null,
            verdict,
            grootste_afwijking: grootste,
            antwoorden,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "sessie_id" }
        )
        .then(() => {}, () => {});
    } catch {
      // stil falen
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const stepProps = { data, onChange: update };

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Stap1Profiel {...stepProps} />,
    2: <Stap2Inkomsten {...stepProps} />,
    3: <Stap3Wonen {...stepProps} />,
    4: <Stap4Vervoer {...stepProps} />,
    5: <Stap5Dagelijks {...stepProps} />,
    6: <Stap6Resultaat {...stepProps} />,
  };

  const showPanel = step >= 1 && step <= 5;
  const canGo = canProceed(step, data);

  return (
    <div className="overflow-x-hidden">
      {step === 1 && (
        <div className="text-center mb-8 max-w-lg mx-auto px-2">
          <div className="inline-flex items-center gap-2 bg-[#E8F2EC] text-[#2D6A4F] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span>⏱</span>
            <span>5 minuten · Anoniem · Geen producten</span>
          </div>
          <p className="text-[#4A5E4E] text-sm leading-relaxed">
            Vul je situatie in en zie direct hoe jullie het doen ten opzichte
            van vergelijkbare gezinnen. Na stap 2 zie je al de eerste vergelijking.
          </p>
        </div>
      )}

      <ProgressBar
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={STAP_LABELS}
        onStepClick={(s) => { if (s < step) setStep(s); }}
      />

      {step < TOTAL_STEPS ? (
        <div className="grid grid-cols-1 lg:grid-cols-[55%_42%] gap-8 lg:gap-12 items-start">
          {/* Left — vragen + navigatieknoppen inline */}
          <div>
            {stepComponents[step]}

            {/* Navigatie — altijd inline, geen fixed bar */}
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="shrink-0 px-5 py-3.5 rounded-xl border-[1.5px] border-[#D6CEBC] font-body font-medium text-sm text-text-soft hover:border-primary hover:text-primary transition-all"
                >
                  ← Vorige
                </button>
              )}
              <button
                type="button"
                onClick={next}
                disabled={!canGo}
                className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 5
                  ? "Bekijk resultaat →"
                  : `Volgende: ${STAP_LABELS[step]} →`}
              </button>
            </div>

            {/* Hint onder de knop als hij nog uitgeschakeld is */}
            {!canGo && step === 1 && (
              <p className="text-center text-xs text-text-muted mt-3">
                Maak eerst een keuze bij alle drie de vragen hierboven.
              </p>
            )}
          </div>

          {/* Right — vergelijkingspaneel alleen op desktop */}
          {showPanel && (
            <div className="hidden lg:block">
              <VergelijkingsPaneel data={data} currentStep={step} />
            </div>
          )}
        </div>
      ) : (
        <div>{stepComponents[6]}</div>
      )}
    </div>
  );
}
