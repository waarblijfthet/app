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
import LiveInzicht from "./components/LiveInzicht";
import Stap1Profiel from "./stappen/Stap1Profiel";
import Stap2Inkomsten from "./stappen/Stap2Inkomsten";
import Stap3Wonen from "./stappen/Stap3Wonen";
import Stap4Vervoer from "./stappen/Stap4Vervoer";
import Stap5Dagelijks from "./stappen/Stap5Dagelijks";
import Stap6Resultaat from "./stappen/Stap6Resultaat";

const TOTAL_STEPS = 6; // intern: 5 invulstappen plus het resultaat
const INVUL_STAPPEN = 5; // wat de bezoeker als "van 5" ziet

/** Naam van elke invulstap: het ene heldere voortgangssysteem. */
const STAP_NAMEN: Record<number, string> = {
  1: "Jouw huishouden",
  2: "Wat komt er binnen?",
  3: "Wat kost wonen?",
  4: "Vervoer en vaste lasten",
  5: "Wat geef je daarnaast uit?",
};

/** Knoptekst vertelt waar je naartoe gaat, niet dat er een pagina komt. */
const VOLGENDE_LABELS: Record<number, string> = {
  1: "Verder, naar mijn inkomen →",
  2: "Verder, naar mijn woonkosten →",
  3: "Verder, naar vervoer en vaste lasten →",
  4: "Verder, naar dagelijkse uitgaven →",
  5: "Bekijk mijn volledige vergelijking →",
};

const BEWAAR_SLEUTEL = "wbh-analyse-antwoorden";

/**
 * Startwaarden uit de URL, zodat de rekenaar op het salarisartikel de analyse
 * kan openen met de vier antwoorden al ingevuld (30-jul-2026). Bewust tolerant:
 * een onbekende of onzinnige waarde wordt genegeerd.
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

  const inkomen = Number(q.get("inkomen"));
  if (inkomen >= 500 && inkomen <= 20000 && data.volwassenen === 1) {
    data.salaris1 = String(inkomen);
  }

  const boodschappen = Number(q.get("boodschappen"));
  if (boodschappen >= 50 && boodschappen <= 3000) {
    data.boodschappen = String(boodschappen);
  }

  return data;
}

/**
 * Antwoorden bewaren binnen de browsersessie (21-aug-2026). Bewust
 * sessionStorage: het zijn financiële gegevens die niet langer dan het bezoek
 * op het apparaat hoeven te staan. Toestemmingen en e-mailadres bewaren we niet.
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
    // Kinderkosten zijn sinds 28-aug-2026 één bedrag met een uitsplitsing
    // eronder. Wie in dezelfde browsersessie nog de drie losse velden had
    // ingevuld, houdt die dus zichtbaar in plaats van dat het bedrag stil op nul
    // valt.
    const losseKinderkosten =
      !parsed.kinderenTotaal &&
      !!(
        parsed.kinderopvangEigenBijdrage ||
        parsed.schoolActiviteiten ||
        parsed.sportHobbyKinderen
      );
    if (losseKinderkosten) parsed.kinderenExpanded = true;
    return parsed;
  } catch {
    return {};
  }
}

export default function QuizClient() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(DEFAULT_QUIZ_DATA);
  const [paneelOpen, setPaneelOpen] = useState(false); // mobiel, het detailvenster
  const voorgevuldRef = useRef(false);

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
  const eventsRef = useRef<string[]>([]);

  useEffect(() => {
    dataRef.current = data;
  });

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

  /** Achtergrond niet mee laten scrollen zolang het detailvenster open staat. */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (paneelOpen) {
      const vorige = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = vorige;
      };
    }
  }, [paneelOpen]);

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
              antwoorden: { ...antwoorden, _events: eventsRef.current },
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

  const markeer = useCallback(
    (event: string) => {
      if (eventsRef.current.includes(event)) return;
      eventsRef.current = [...eventsRef.current, event];
      logVoortgang(step, dataRef.current, gestartRef.current);
    },
    [logVoortgang, step]
  );

  useEffect(() => {
    logVoortgang(step, dataRef.current, gestartRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    markeer("analysis_landing_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback(
    (changes: Partial<QuizData>) => {
      setData((prev) => ({ ...prev, ...changes }));
      if (!gestartRef.current) {
        gestartRef.current = true;
        eventsRef.current = [...eventsRef.current, "analysis_started"];
        const merged = { ...dataRef.current, ...changes };
        logVoortgang(1, merged, true);
      }
    },
    [logVoortgang]
  );

  const uitkomstRef = useRef<HTMLDivElement | null>(null);

  const next = () => {
    if (step === 1) markeer("analysis_household_completed");
    if (step === 2) markeer("analysis_income_completed");
    if (step === 5) markeer("analysis_result_viewed");
    setPaneelOpen(false);
    const volgende = Math.min(step + 1, TOTAL_STEPS);
    setStep(volgende);
    // De uitkomst scrollt naar zichzelf, zie het effect hieronder.
    if (typeof window !== "undefined" && volgende !== TOTAL_STEPS) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Op de uitkomst niet naar de top van de pagina, want daar staat de introtekst
   * van de analyse die de bezoeker net heeft doorlopen. De conclusie moet het
   * eerste zijn wat hij ziet. Als effect, dus na de render waarin de uitkomst
   * daadwerkelijk in de DOM staat.
   */
  useEffect(() => {
    if (step !== TOTAL_STEPS) return;
    uitkomstRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);
  const prev = () => {
    setPaneelOpen(false);
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

  const canGo = canProceed(step, data);

  const inkomenLive = berekenTotaalInkomen(data);
  const uitgavenLive = berekenTotaalUitgaven(data);
  const overLive = inkomenLive - uitgavenLive;
  const toonLiveBalk = step >= 3 && step <= 5 && inkomenLive > 0 && uitgavenLive > 0;

  const eersteFeedbackZichtbaar =
    (step === 1 &&
      data.volwassenen !== null &&
      data.woonsituatie !== null &&
      data.kinderen !== null) ||
    (step === 2 && inkomenLive > 0);
  useEffect(() => {
    if (eersteFeedbackZichtbaar) markeer("analysis_first_feedback_shown");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eersteFeedbackZichtbaar]);

  // Het resultaat krijgt de volle, smalle kolom. Geen voortgangsbalk meer en
  // geen vergelijkingspaneel ernaast: hier is de uitkomst zelf de inhoud.
  if (step === TOTAL_STEPS) {
    return (
      <div ref={uitkomstRef} className="overflow-x-hidden scroll-mt-24">
        {stepComponents[6]}
      </div>
    );
  }

  const navigatie = (
    <>
      <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3">
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
            className="shrink-0 px-5 py-3.5 min-h-[52px] rounded-xl border-[1.5px] border-[#D9DEDC] font-body font-medium text-sm text-text-soft hover:border-primary hover:text-primary transition-all"
          >
            &larr; Vorige
          </button>
        )}
      </div>

      {step === 1 && canGo && (
        <p className="text-xs text-text-muted mt-3">
          Je kunt bedragen straks gewoon schatten.
        </p>
      )}
      {!canGo && step === 1 && (
        <p className="text-xs text-text-muted mt-3">
          Maak eerst een keuze bij de vragen hierboven.
        </p>
      )}
      {!canGo && step > 1 && (
        <p className="text-xs text-text-muted mt-3">
          Vul het eerste bedrag in, dan kun je verder. Een schatting mag.
        </p>
      )}
    </>
  );

  return (
    <div className={"overflow-x-hidden" + (toonLiveBalk ? " pb-20 lg:pb-0" : "")}>
      {/* Eén Vorige-knop, en die staat naast de hoofdknop onderaan. Hij stond
          eerder ook in de voortgangsbalk, wat twee terugwegen op één scherm gaf. */}
      <ProgressBar
        currentStep={step}
        totalSteps={INVUL_STAPPEN}
        stapNaam={STAP_NAMEN[step]}
      />

      {/* Vanaf lg staat de vergelijking ernaast in plaats van eronder, zodat de
          knop direct onder de laatste vraag blijft staan. Daaronder is het
          precies omgekeerd: daar is de compacte beloning de brug naar de knop en
          zit het volledige beeld achter de balk onderin. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:items-start">
        <div className="min-w-0">
          {stepComponents[step]}

          <div className="lg:hidden mt-7">
            <LiveInzicht data={data} currentStep={step} />
          </div>

          {navigatie}

          {/* Rustige geruststelling, onder de eerste vraag in plaats van als muur
              ervoor (28-aug-2026). */}
          {step === 1 && (
            <div className="mt-8 pt-5 border-t border-[#E6E9E7]">
              <p className="font-body text-xs text-text-muted mb-2">
                Geen account &middot; geen bankkoppeling &middot; geen
                verkoopgesprek.{" "}
                <Link href="/privacy" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                  Hoe ik met je gegevens omga →
                </Link>
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src="/jarno.jpg"
                  alt="Jarno Koopman"
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
                <p className="font-body text-xs text-text-muted">
                  Gemaakt door Jarno Koopman, financieel coach.{" "}
                  <Link href="/over" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                    Wie ik ben →
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <VergelijkingsPaneel data={data} currentStep={step} />
        </aside>
      </div>

      {/* Mobiel: de vaste balk onderin is de doorlopende beloning. Tikken opent
          het volledige beeld, zodat de kaart niet bij elke stap tussen de laatste
          vraag en de knop hoeft te staan. */}
      {toonLiveBalk && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E6E9E7]"
          style={{ backgroundColor: "rgba(253,250,244,0.97)", backdropFilter: "blur(6px)" }}
        >
          <button
            type="button"
            onClick={() => setPaneelOpen(true)}
            aria-expanded={paneelOpen}
            className="w-full px-5 py-2.5 text-left"
          >
            <div className="flex items-center justify-between gap-3 max-w-lg mx-auto font-body text-xs">
              <span className="text-text-soft">
                Binnen <strong className="text-primary">{fmtEur(inkomenLive)}</strong>
              </span>
              <span className="text-text-soft">
                Ruimte tot nu toe{" "}
                <strong className={overLive < 0 ? "text-[#C4603A]" : "text-[#0B7A6E]"}>
                  {overLive < 0 ? `-${fmtEur(Math.abs(overLive))}` : fmtEur(overLive)}
                </strong>
              </span>
              <span className="shrink-0 font-medium text-accent">Details</span>
            </div>
          </button>
        </div>
      )}

      {paneelOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-end"
          role="dialog"
          aria-modal="true"
          aria-label="Jouw vergelijking tot nu toe"
        >
          <button
            type="button"
            aria-label="Sluiten"
            onClick={() => setPaneelOpen(false)}
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(22,33,31,0.45)" }}
          />
          <div className="relative w-full max-h-[82vh] overflow-y-auto rounded-t-2xl bg-background px-5 pt-4 pb-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-body font-medium text-sm text-primary">
                Jouw vergelijking tot nu toe
              </p>
              <button
                type="button"
                onClick={() => setPaneelOpen(false)}
                className="shrink-0 font-body font-medium text-xs text-text-soft hover:text-primary transition-colors px-3 py-2"
              >
                Sluiten
              </button>
            </div>
            <VergelijkingsPaneel data={data} currentStep={step} embedded />
          </div>
        </div>
      )}
    </div>
  );
}
