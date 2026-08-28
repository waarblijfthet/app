"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { QuizData, DEFAULT_QUIZ_DATA } from "@/lib/quiz-types";
import { createClient } from "@/lib/supabase-browser";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  bepaalVerdict,
  vindGrootsteAfwijking,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import {
  ALLE_SCHERMEN,
  actieveSchermen,
  volgendeSchermId,
  vorigeSchermId,
} from "./schermen";
import IntroScherm from "./IntroScherm";
import ProgressBar from "./components/ProgressBar";
import Stap6Resultaat from "./stappen/Stap6Resultaat";

type Fase = "intro" | "vraag" | "resultaat";

const BEWAAR_SLEUTEL = "wbh-analyse-v2";
const NAV_SLEUTEL = "wbh-analyse-v2-nav";

/**
 * Startwaarden uit de URL, zodat een rekenaar op een artikel de analyse kan
 * openen met een deel van de antwoorden al ingevuld. Bewust tolerant: een
 * onbekende of onzinnige waarde wordt genegeerd.
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
 * Antwoorden bewaren binnen de browsersessie. Bewust sessionStorage: het zijn
 * financiële gegevens die niet langer dan het bezoek op het apparaat hoeven te
 * staan. Toestemmingen en e-mailadres bewaren we niet. Eigen sleutel voor deze
 * versie, want de vorige flow vroeg dezelfde velden in een andere volgorde en
 * groepering, en een half ingevulde oude sessie past niet op de nieuwe schermen.
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
  const [fase, setFase] = useState<Fase>("intro");
  const [data, setData] = useState<QuizData>(DEFAULT_QUIZ_DATA);
  const [currentId, setCurrentId] = useState<string>(ALLE_SCHERMEN[0].id);
  const voorgevuldRef = useRef(false);
  const dataRef = useRef<QuizData>(data);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dataRef.current = data;
  });

  useEffect(() => {
    if (voorgevuldRef.current) return;
    voorgevuldRef.current = true;
    const start = { ...DEFAULT_QUIZ_DATA, ...bewaardeData(), ...startDataUitUrl() };
    setData(start);

    // Een herlaadbeurt mag niet terug naar de introductie sturen als er al
    // antwoorden staan: dat zou de bezoeker dwingen elk al beantwoord scherm
    // opnieuw aan te klikken (28-aug-2026, pass 5). We hervatten alleen op een
    // scherm dat voor DEZE herstelde data nog steeds geldig is.
    try {
      const navRaw = window.sessionStorage.getItem(NAV_SLEUTEL);
      if (navRaw === "resultaat") {
        setFase("resultaat");
      } else if (navRaw) {
        const geldig = ALLE_SCHERMEN.find(
          (s) => s.id === navRaw && (!s.condition || s.condition(start))
        );
        if (geldig) {
          setCurrentId(geldig.id);
          setFase("vraag");
        }
      }
    } catch {
      // stil falen, dan begint de bezoeker gewoon opnieuw bij de introductie
    }
  }, []);

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

  useEffect(() => {
    if (fase === "intro") return;
    try {
      window.sessionStorage.setItem(
        NAV_SLEUTEL,
        fase === "resultaat" ? "resultaat" : currentId
      );
    } catch {
      // stil falen
    }
  }, [fase, currentId]);

  // ── Analytics: dezelfde tabel en velden als voorheen, nu gelogd per
  //    categorie in plaats van per scherm, zodat het schrijfvolume niet
  //    oploopt met het aantal atomaire vragen. ──
  const sessieIdRef = useRef<string>("");
  const apparaatRef = useRef<string>("");
  const maxCategorieRef = useRef<number>(1);
  const gestartRef = useRef<boolean>(false);
  const geloggeCategorieRef = useRef<number>(0);
  const eventsRef = useRef<string[]>([]);

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
    (categorieArg: number, dataArg: QuizData, voltooid: boolean) => {
      ensureSessie();
      maxCategorieRef.current = Math.max(maxCategorieRef.current, categorieArg);

      let inkomen = 0;
      let over = 0;
      let verdict: string | null = null;
      let grootste: string | null = null;
      try {
        inkomen = berekenTotaalInkomen(dataArg);
        if (voltooid) {
          const benches = getBenchmarks({
            woonsituatie: dataArg.woonsituatie,
            kinderen: dataArg.kinderen,
            inkomen,
            auto: dataArg.auto,
            tweedeAuto: dataArg.tweedeAuto,
            aantalVolwassenen: aantalVolwassenenVan(dataArg),
          });
          over = berekenOver(dataArg);
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
              huidige_stap: categorieArg,
              max_stap: maxCategorieRef.current,
              voltooid,
              apparaat: apparaatRef.current || null,
              eerste_interactie: gestartRef.current,
              woonsituatie: dataArg.woonsituatie,
              aantal_kinderen: dataArg.kinderen,
              auto_situatie: dataArg.auto,
              totaal_inkomen: inkomen || null,
              totaal_uitgaven: voltooid ? inkomen - over : null,
              maandelijks_over: voltooid ? over : null,
              verdict,
              grootste_afwijking: grootste,
              antwoorden: { ...antwoorden, _events: eventsRef.current },
              updated_at: new Date().toISOString(),
            },
            { onConflict: "sessie_id" }
          )
          .then(
            () => {},
            () => {}
          );
      } catch {
        // stil falen
      }
    },
    [ensureSessie]
  );

  const markeer = useCallback((event: string) => {
    if (eventsRef.current.includes(event)) return;
    eventsRef.current = [...eventsRef.current, event];
  }, []);

  useEffect(() => {
    markeer("analysis_landing_view");
  }, [markeer]);

  const patch = useCallback(
    (p: Partial<QuizData>) => {
      setData((prev) => ({ ...prev, ...p }));
      if (!gestartRef.current) {
        gestartRef.current = true;
        markeer("analysis_started");
      }
    },
    [markeer]
  );

  const advance = useCallback(() => {
    const next = volgendeSchermId(currentId, dataRef.current);
    if (next === null) {
      setFase("resultaat");
    } else {
      setCurrentId(next);
    }
  }, [currentId]);

  /**
   * Eén plek voor het scrollgedrag, in plaats van alleen binnen advance()
   * (28-aug-2026, pass 5, bugfix). De overgang van de introductie naar de
   * eerste vraag riep advance() niet aan, dus daar bleef de bladwijzer op de
   * oude positie staan en dook de voortgangsbalk deels onder de sticky header.
   * Dit effect vangt elke overgang, inclusief die eerste.
   */
  useEffect(() => {
    if (fase === "intro") return;
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [fase, currentId]);

  const kiesEnGa = useCallback(
    (p: Partial<QuizData>, ms = 450) => {
      patch(p);
      setTimeout(advance, ms);
    },
    [patch, advance]
  );

  const vorige = useCallback(() => {
    const prev = vorigeSchermId(currentId, dataRef.current);
    if (prev !== null) setCurrentId(prev);
  }, [currentId]);

  useEffect(() => {
    if (fase === "intro") return;
    const categorie =
      fase === "resultaat"
        ? 6
        : ALLE_SCHERMEN.find((s) => s.id === currentId)?.categorie ?? 1;
    if (categorie !== geloggeCategorieRef.current) {
      geloggeCategorieRef.current = categorie;
      logVoortgang(categorie, dataRef.current, fase === "resultaat");
      if (fase === "resultaat") markeer("analysis_result_viewed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase, currentId]);

  const huidig = ALLE_SCHERMEN.find((s) => s.id === currentId) ?? ALLE_SCHERMEN[0];
  const actief = actieveSchermen(data);
  const positie = Math.max(actief.findIndex((s) => s.id === currentId), 0);
  const toonVorige = vorigeSchermId(currentId, data) !== null;

  return (
    <div ref={containerRef} className="overflow-x-hidden scroll-mt-24">
      {fase === "intro" && (
        <IntroScherm onStart={() => setFase("vraag")} />
      )}

      {fase === "vraag" && (
        <div>
          <ProgressBar
            categorie={huidig.categorie}
            positie={positie}
            totaal={actief.length}
            toonVorige={toonVorige}
            onVorige={vorige}
          />
          <huidig.Component
            key={currentId}
            data={data}
            patch={patch}
            kiesEnGa={kiesEnGa}
            ga={advance}
          />
        </div>
      )}

      {fase === "resultaat" && <Stap6Resultaat data={data} onChange={patch} />}
    </div>
  );
}
