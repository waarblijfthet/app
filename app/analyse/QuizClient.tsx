"use client";

import { useState, useCallback } from "react";
import { QuizData, DEFAULT_QUIZ_DATA, canProceed } from "@/lib/quiz-types";
import ProgressBar from "./components/ProgressBar";
import VergelijkingsPaneel from "./components/VergelijkingsPaneel";
import Stap1Profiel from "./stappen/Stap1Profiel";
import Stap2Inkomsten from "./stappen/Stap2Inkomsten";
import Stap3Wonen from "./stappen/Stap3Wonen";
import Stap4Vervoer from "./stappen/Stap4Vervoer";
import Stap5Dagelijks from "./stappen/Stap5Dagelijks";
import Stap6Resultaat from "./stappen/Stap6Resultaat";

const TOTAL_STEPS = 6;

export default function QuizClient() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(DEFAULT_QUIZ_DATA);

  const update = useCallback((changes: Partial<QuizData>) => {
    setData((prev) => ({ ...prev, ...changes }));
  }, []);

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

  const isLastStep = step === TOTAL_STEPS;
  const showPanel = step >= 1 && step <= 5;

  return (
    <div>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

      {step < TOTAL_STEPS ? (
        /* Two-column layout for steps 1-5 */
        <div className="grid grid-cols-1 lg:grid-cols-[55%_42%] gap-8 lg:gap-12 items-start">
          {/* Left — questions */}
          <div className="pb-24 lg:pb-0">
            {stepComponents[step]}

            {/* Navigation */}
            <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto bg-background/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none border-t border-[#E8E0D0] lg:border-0 px-6 py-4 lg:px-0 lg:py-0 lg:mt-10 flex gap-3 z-40">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="flex-1 lg:flex-none px-6 py-3 rounded-xl border-[1.5px] border-[#D6CEBC] font-body font-medium text-sm text-text-soft hover:border-primary hover:text-primary transition-all"
                >
                  ← Vorige
                </button>
              )}
              <button
                type="button"
                onClick={next}
                disabled={!canProceed(step, data)}
                className="flex-1 lg:flex-none btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 5 ? "Bekijk resultaat →" : "Volgende →"}
              </button>
            </div>
          </div>

          {/* Right — sticky comparison panel */}
          {showPanel && (
            <div className="hidden lg:block">
              <VergelijkingsPaneel data={data} currentStep={step} />
            </div>
          )}
        </div>
      ) : (
        /* Full-width result page */
        <div>{stepComponents[6]}</div>
      )}
    </div>
  );
}
