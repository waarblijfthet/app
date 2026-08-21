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

/**
 * Knoptekst vertelt wat je hierna te zien krijgt, niet dat er een volgende
 * pagina komt (21-aug-2026).
 */
const VOLGENDE_LABELS: Record<number, string> = {
  1: "Naar je inkomen →",
  2: "Naar je woonlasten →",
  3: "Naar vervoer →",
  4: "Naar je dagelijkse uitgaven →",
  5: "Bekijk mijn vergelijking →",
};

const BEWAAR_SLEUTEL = "wbh-analyse-antwoorden";

/**
 * Startwaarden uit de URL, zodat de rekenaar op het salarisartikel de analyse
 * kan openen met de vier antwoorden al ingevuld (30-jul-2026). Alleen de vier
 * profielvelden plus het inkomen; alle bedragen vult de bezoeker zelf in.
 * Bewust tolerant: een onbekende of onzinnige waarde wordt genegeerd in plaats
 * van dat de flow stukloopt.
 */
function startDataUitUrl(): Partial<QuizData> {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const data: Partial<QuizData> = {};

  const volw = Number(q.get("volwassenen"));
  if (volw === 1 || volw === 2) data.volwassenen = volw;

  const kind = Number(q.get("kinderen"));
  if ([0, 1, 2, 3].includes(kind)) data.kinderen = kind as QuizData["kinderen"];

  const auto = q.get("auto");
  if (auto && ["geen", "eigen", "lease_privé", "zakelijk"].includes(auto)) {
    data.auto = auto as QuizData["auto"];
  }
  if (q.get("tweedeauto") === "1") data.tweedeAuto = true;

  const woon = q.get("woonsituatie");
  if (woon === "huur" || woon === "koop") data.woonsituatie = woon;

  // Eén inkomen invullen bij één volwassene, anders verdelen we niet: de
  // bezoeker moet zelf twee salarissen opgeven, want een gok van 50/50 zou de
  // uitkomst verkeerd beïnvloeden zonder dat hij dat ziet.
  const inkomen = Number(q.get("inkomen"));
  if (inkomen >= 500 && inkomen <= 20000 && data.volwassenen === 1) {
    data.salaris1 = String(inkomen);
  }

  // Boodschappenbedrag (15-aug-2026). Wie via het boodschappenartikel of via
  // /geldscan binnenkomt heeft dit getal al een keer ingevuld; opnieuw vragen
  // is de goedkoopste manier om iemand te laten afhaken. Marge bewust ruim,
  // buiten die marge negeren we het en vult de bezoeker het zelf in.
  const boodschappen = Number(q.get("boodschappen"));
  if (boodschappen >= 50 && boodschappen <= 3000) {
    data.boodschappen = String(boodschappen);
  }

  return data;
}

/**
 * Antwoorden bewaren binnen de browsersessie (21-aug-2026). Wie terugklikt,
 * verspringt of per ongeluk verversts mag nooit opnieuw beginnen. Bewust
 * sessionStorage en niet localStorage: het zijn financiële gegevens die niet
 * langer dan het bezoek op het apparaat hoeven te staan. Toestemmingen en
 * e-mailadres bewaren we niet.
 */
function bewaardeData(): Partial<QuizData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(BEWAAR_SLEUTEL);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<QuizData>;
    delete parsed.email;
    delete parsed.naam;
    delete parsed.toestemmingOpslaan;
    delete parsed.toestemmingMarketing;
    return parsed;
  } catch {
    return {};
  }
}

export default function QuizClient() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(DEFAULT_QUIZ_DATA);
  const voorgevuldRef = useRef(false);

  // Na mount, want window bestaat niet bij server-rendering. De URL wint van
  // de bewaarde sessie: wie via een artikel binnenkomt bedoelt die waarden.
  useEffect(() => {
    if (voorgevuldRef.current) return;
    voorgevuldRef.current = true;
    const start = { ...DEFAULT_QUIZ_DATA, ...bewaardeData(), ...startDataUitUrl() };
    setData(start);
  }, []);

  const sessieIdRef = useRef<string>("");
  const apparaatRef = useRef<string>("");
  const maxStapRef = useRef<number>(1);
  const gestartRef = useRef<boolean>(false);
  const dataRef = useRef<QuizData>(data);

  useEffect(() => {
    dataRef.current = data;
  });

  // Bewaren bij elke wijziging, stil falend. Nooit de tool laten breken op een
  // volle of geblokkeerde storage.
  useEffect(() => {
    if (!voorgevuldRef.current) return;
    try {
      const {
        email: _e,
        naam: _n,
        toestemmingOpslaan: _t,
        toestemmingMarketing: _m,
        ...rest
      } = data;
      window.sessionStorage.setItem(BEWAAR_SLEUTEL, JSON.stringify(rest));
    } catch {
      // stil falen
    }
  }, [data]);

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
            inkomen: inkomen,
            auto: dataArg.auto,
            tweedeAuto: dataArg.tweedeAuto,
            aantalVolwassenen: aantalVolwassenen,
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

  const next = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setStep((s) => Math.max(s - 1, 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
  const toonLiveBalk = step >= 3 && step <= 5 && inkomenLive > 0 && uitgavenLive > 0;

  return (
    <div className={"overflow-x-hidden" + (toonLiveBalk ? " pb-16 lg:pb-0" : "")}>
      {step === 1 && (
        <div className="mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-[#E7F1EE] text-[#0B7A6E] text-xs font-medium px-3 py-1.5 rounded-full mb-3">
            <span>&#8987;</span>
            <span>&plusmn; 2 minuten voor de eerste vergelijking</span>
          </div>
          <p className="text-text-soft font-body text-sm leading-relaxed mb-2">
            Je hoeft niet alles exact te weten. Een goede schatting is prima.
          </p>
          <p className="text-text-muted font-body text-xs">
            Anoniem &middot; geen account &middot; geen bankkoppeling &middot;
            geen financiële producten
          </p>

          {/* Vooraf laten zien wat je krijgt, zodat niemand blind begint */}
          <div className="mt-5 bg-card border border-[#E6E9E7] rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-wider text-[#8B958F] font-medium mb-2">
              Voorbeeld van wat je straks ziet
            </p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-primary font-medium">Boodschappen</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F6EEE8] text-[#A15A32] font-medium">
                Hoger dan gemiddeld
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#8B958F] mb-0.5">
                <span>Jij</span>
                <span className="font-medium">&euro;640</span>
              </div>
              <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#C4603A]" style={{ width: "100%" }} />
              </div>
              <div className="flex justify-between text-xs text-[#8B958F] mb-0.5">
                <span>Vergelijkbare huishoudens</span>
                <span>&euro;585</span>
              </div>
              <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#B2CCC6]" style={{ width: "91%" }} />
              </div>
            </div>
          </div>

          <p className="text-text-muted text-xs mt-4">
            Je antwoorden zijn anoniem zolang je geen e-mailadres invult.{" "}
            <Link href="/privacy" style={{ color: "#0B7A6E", textDecoration: "none" }}>
              Privacy &rarr;
            </Link>
          </p>

          <div className="flex items-center gap-2.5 mt-3">
            <img
              src="/jarno.jpg"
              alt="Jarno Koopman"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <p className="text-text-muted text-xs">
              Gemaakt door Jarno Koopman, financieel coach.{" "}
              <Link href="/over" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                Wie ik ben &rarr;
              </Link>
            </p>
          </div>
        </div>
      )}

      <ProgressBar
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        labels={STAP_LABELS}
        onStepClick={(s) => {
          if (s < step) setStep(s);
        }}
      />

      {step < TOTAL_STEPS ? (
        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Links: de vragen. Bewust niet breder dan 560px. */}
          <div className="w-full lg:max-w-[560px] lg:flex-1">
            {stepComponents[step]}

            {/* Mobiel eerst de vergelijking, dan de knop: eerst zien wat je
                antwoord doet, dan doorgaan. */}
            {showPanel && (
              <div className="lg:hidden mt-8">
                <VergelijkingsPaneel data={data} currentStep={step} embedded />
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={next}
                disabled={!canGo}
                className="btn-primary sm:flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {VOLGENDE_LABELS[step]}
              </button>
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="shrink-0 px-5 py-3.5 min-h-[52px] rounded-xl border-[1.5px] border-[#D9DEDC] font-body font-medium text-sm text-text-soft hover:border-primary hover:text-primary transition-all order-first sm:order-none"
                >
                  &larr; Vorige
                </button>
              )}
            </div>

            {!canGo && step === 1 && (
              <p className="text-xs text-text-muted mt-3">
                Maak eerst een keuze bij alle vier de vragen hierboven.
              </p>
            )}
            {!canGo && step > 1 && (
              <p className="text-xs text-text-muted mt-3">
                Vul het eerste bedrag in, dan kun je verder. Een schatting mag.
              </p>
            )}
          </div>

          {/* Rechts: de vergelijking, meeschuivend zodat je niet hoeft te scrollen */}
          {showPanel && (
            <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0">
              <VergelijkingsPaneel data={data} currentStep={step} />
            </div>
          )}
        </div>
      ) : (
        <div>{stepComponents[6]}</div>
      )}

      {toonLiveBalk && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E6E9E7] px-5 py-2.5"
          style={{ backgroundColor: "rgba(253,250,244,0.96)", backdropFilter: "blur(6px)" }}
        >
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto font-body text-xs">
            <span className="text-text-soft">
              Binnen <strong className="text-primary">{fmtEur(inkomenLive)}</strong>
            </span>
            <span className="text-text-soft">
              Tot nu toe over{" "}
              <strong className={overLive < 0 ? "text-[#C4603A]" : "text-[#0B7A6E]"}>
                {overLive < 0 ? `-${fmtEur(Math.abs(overLive))}` : fmtEur(overLive)}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
