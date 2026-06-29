"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { QuizData, DEFAULT_QUIZ_DATA, canProceed, fmtEur } from "@/lib/quiz-types";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  bepaalVerdict,
  vindGrootsteAfwijking,
  berekenTotaalUitgaven,
  aantalVolwassenenVan,
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

  const sessieIdRef = useRef<string>("");
  const apparaatRef = useRef<string>("");
  const maxStapRef = useRef<number>(1);
  const gestartRef = useRef<boolean>(false);
  const dataRef = useRef<QuizData>(data);

  useEffect(() => {
    dataRef.current = data;
  });

  const ensureSessie = useCallback(() => {
    if (!sessieIdRef.current) {
      sessieIdRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
    }
    if (!apparaatRef.current && typeof window !== "undefined") {
      apparaatRef.current = window.innerWidth < 1024 ? "mobiel" : "desktop";
    }
  }, []);

  const logVoortgang = useCallback(
    (stapArg: number, dataArg: QuizData, gestartArg: boolean) => {
      ensureSessie();
      maxStapRef.current = Math.max(maxStapRef.current, stapArg);
      const voltooid = stapArg === 6;

      let inkomen = 0;
      let over = 0;
      let uitgaven = 0;
      let verdict: string | null = null;
      let grootste: string | null = null;
      try {
        inkomen = berekenTotaalInkomen(dataArg);
        if (voltooid) {
          const aantalVolwassenen = aantalVolwassenenVan(dataArg);
          const benches = getBenchmarks({
            woonsituatie: dataArg.woonsituatie,
            kinderen: dataArg.kinderen,
            inkomen,
            auto: dataArg.auto,
            aantalVolwassenen,
          });
          over = berekenOver(dataArg);
          uitgaven = inkomen - over;
          verdict = bepaalVerdict(dataArg, benches);
          grootste = vindGrootsteAfwijking(dataArg, benches);
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
      } = dataArg;

      try {
        const supabase = createClient();
        supabase
          .from("quiz_voortgang")
          .upsert(
            {
              sessie_id: sessieIdRef.current,
              huidige_stap: stapArg,
              max_stap: maxStapRef.current,
              voltooid,
              apparaat: apparaatRef.current || null,
              eerste_interactie: gestartArg,
              woonsituatie: dataArg.woonsituatie,
              aantal_kinderen: dataArg.kinderen,
              auto_situatie: dataArg.auto,
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
    },
    [ensureSessie]
  );

  // Log bij elke stapwissel (en bij mount: pagina geladen = stap 1).
  useEffect(() => {
    logVoortgang(step, dataRef.current, gestartRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const update = useCallback(
    (changes: Partial<QuizData>) => {
      setData((prev) => ({ ...prev, ...changes }));
      // Eerste echte interactie apart loggen, zodat "geladen maar niet
      // begonnen" te onderscheiden is van "begon in te vullen".
      if (!gestartRef.current) {
        gestartRef.current = true;
        const merged = { ...dataRef.current, ...changes };
        logVoortgang(1, merged, true);
      }
    },
    [logVoortgang]
  );

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

  const inkomenLive = berekenTotaalInkomen(data);
  const uitgavenLive = berekenTotaalUitgaven(data);
  const overLive = inkomenLive - uitgavenLive;
  const toonLiveBalk = step >= 2 && step <= 5 && inkomenLive > 0;

  return (
    <div className={"overflow-x-hidden" + (toonLiveBalk ? " pb-16 lg:pb-0" : "")}>
      {step === 1 && (
        <div className="text-center mb-8 max-w-lg mx-auto px-2">
          <div className="inline-flex items-center gap-2 bg-[#E8F2EC] text-[#2D6A4F] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span>⏱</span>
            <span>2 minuten · Anoniem · Geen producten</span>
          </div>
          <p className="text-[#4A5E4E] text-sm leading-relaxed">
            Vul een paar dingen in en zie meteen hoe je het doet ten opzichte
            van vergelijkbare huishoudens. Na stap 2 zie je al je eerste
            vergelijking. Dieper invullen kan, maar hoeft niet.
          </p>

          {/* Mini-voorbeeld van het resultaat, zodat je vooraf ziet wat je krijgt */}
          <div className="mt-5 bg-card border border-[#E8E0D0] rounded-xl p-4 text-left">
            <p className="text-[11px] uppercase tracking-wider text-[#8A9E8E] font-medium mb-2">
              Voorbeeld van wat je ziet
            </p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#4A5E4E] font-medium">Boodschappen</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FDECEA] text-[#B03A2E] font-medium">
                ⚠ Boven gemiddeld
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#8A9E8E] mb-0.5">
                <span>Jij</span>
                <span className="font-medium">€640</span>
              </div>
              <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-accent" style={{ width: "100%" }} />
              </div>
              <div className="flex justify-between text-xs text-[#8A9E8E] mb-0.5">
                <span>Gemiddeld</span>
                <span>€585</span>
              </div>
              <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#B8C9BC]" style={{ width: "91%" }} />
              </div>
            </div>
            <p className="text-[11px] text-[#8A9E8E] mt-2">
              Zo zie je per post hoe jij het doet, en wat je per maand overhoudt.
            </p>
          </div>

          <p className="text-[#8A9E8E] text-xs mt-4">
            Je antwoorden blijven anoniem. Pas als je aan het eind zelf je
            e-mail invult, worden ze aan jou gekoppeld.{" "}
            <Link href="/privacy" style={{ color: "#C4603A", textDecoration: "none" }}>
              Privacy &rarr;
            </Link>
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
          {/* Left, vragen + navigatieknoppen inline */}
          <div>
            {stepComponents[step]}

            {/* Navigatie, altijd inline, geen fixed bar */}
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
                Maak eerst een keuze bij alle vier de vragen hierboven.
              </p>
            )}

            {/* Mobiel, live vergelijking onder de vragen (desktop heeft het paneel rechts) */}
            {showPanel && (
              <div className="lg:hidden mt-8">
                <VergelijkingsPaneel data={data} currentStep={step} embedded />
              </div>
            )}
          </div>

          {/* Right, vergelijkingspaneel alleen op desktop */}
          {showPanel && (
            <div className="hidden lg:block">
              <VergelijkingsPaneel data={data} currentStep={step} />
            </div>
          )}
        </div>
      ) : (
        <div>{stepComponents[6]}</div>
      )}

      {toonLiveBalk && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E0D0] px-4 py-2.5"
          style={{ backgroundColor: "rgba(253,250,244,0.96)", backdropFilter: "blur(6px)" }}
        >
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto font-body text-xs">
            <span className="text-text-soft">
              In <strong className="text-primary">{fmtEur(inkomenLive)}</strong>
            </span>
            {uitgavenLive > 0 && (
              <span className="text-text-soft">
                Uit <strong className="text-primary">{fmtEur(uitgavenLive)}</strong>
              </span>
            )}
            {uitgavenLive > 0 && (
              <span className="text-text-soft">
                Over{" "}
                <strong className={overLive < 0 ? "text-accent" : "text-[#2D6A4F]"}>
                  {overLive < 0 ? `-${fmtEur(Math.abs(overLive))}` : fmtEur(overLive)}
                </strong>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
