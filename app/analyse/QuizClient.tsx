"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { QuizData, DEFAULT_QUIZ_DATA, RESULTAAT_STAP_SLEUTEL } from "@/lib/quiz-types";
import { getSessieId, getApparaat } from "@/lib/sessie";
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
  const maxSchermIndexRef = useRef<number>(0);
  const gestartRef = useRef<boolean>(false);
  const gelogdSchermRef = useRef<string>("");
  const eventsRef = useRef<string[]>([]);

  const ensureSessie = useCallback(() => {
    // Dezelfde sessie-id als PageTracker en lib/track.ts, zodat paginabezoeken,
    // CTA-kliks en analysevoortgang op sessie_id aan elkaar te rekenen zijn.
    // Tot 6-sep-2026 had de analyse een eigen UUID en brak de trechter precies
    // op die join.
    if (!sessieIdRef.current) {
      sessieIdRef.current = getSessieId();
    }
    if (!apparaatRef.current) {
      apparaatRef.current = getApparaat();
    }
  }, []);

  const logVoortgang = useCallback(
    (
      categorieArg: number,
      dataArg: QuizData,
      voltooid: boolean,
      schermArg: string,
      schermIndexArg: number
    ) => {
      ensureSessie();
      if (!sessieIdRef.current) return;
      maxCategorieRef.current = Math.max(maxCategorieRef.current, categorieArg);
      maxSchermIndexRef.current = Math.max(maxSchermIndexRef.current, schermIndexArg);

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
            // Bewust uitgeschreven, geen verkorte notatie: de minifier van
            // Next 14.2 hernoemt dan niet alle verwijzingen. Zie
            // docs en feedback_minifier_verkorte_objectnotatie.
            inkomen: inkomen,
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

      // Schrijven gaat via de server-route met de service key. De browser
      // heeft sinds quiz_voortgang_v3.sql geen schrijfrecht meer op deze tabel.
      // keepalive, zodat een laatste schrijfactie ook vertrekt als de bezoeker
      // meteen daarna wegklikt.
      try {
        const payload = JSON.stringify({
          sessie_id: sessieIdRef.current,
          huidige_stap: categorieArg,
          max_stap: maxCategorieRef.current,
          huidig_scherm: schermArg,
          max_scherm_index: maxSchermIndexRef.current,
          voltooid: voltooid,
          apparaat: apparaatRef.current || null,
          eerste_interactie: gestartRef.current,
          woonsituatie: dataArg.woonsituatie,
          aantal_kinderen: dataArg.kinderen,
          auto_situatie: dataArg.auto,
          totaal_inkomen: inkomen || null,
          totaal_uitgaven: voltooid ? inkomen - over : null,
          maandelijks_over: voltooid ? over : null,
          verdict: verdict,
          grootste_afwijking: grootste,
          antwoorden: { ...antwoorden, _events: eventsRef.current },
        });
        void fetch("/api/analyse-voortgang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
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
      // Een verse voltooiing begint altijd bij uitkomst 1, ook als een
      // eerdere sessie in dit tabblad ergens anders in de resultatenflow
      // stond (28-aug-2026, resultatenherbouw).
      try {
        window.sessionStorage.removeItem(RESULTAAT_STAP_SLEUTEL);
      } catch {
        // stil falen
      }
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

  /** Van uitkomst 1 terug naar de laatste vraag die voor deze antwoorden geldt. */
  const terugNaarVragen = useCallback(() => {
    const actueel = actieveSchermen(dataRef.current);
    const laatste = actueel[actueel.length - 1];
    if (laatste) {
      setCurrentId(laatste.id);
      setFase("vraag");
    }
  }, []);

  /**
   * Stopt de analyse en gaat terug naar de introductie (7-sep-2026). Vóór
   * deze knop was er geen weg terug: sessionStorage onthoudt de voortgang
   * bewust over een herlaadbeurt heen (28-aug-2026, pass 5, zie de
   * voorgevuldRef-hersteleffect hierboven), dus ook een refresh bracht een
   * bezoeker niet meer bij de introductie. Wist daarom alle drie de
   * sessionStorage-sleutels van deze flow en zet de state terug naar de
   * beginwaarden, zodat een volgende start (of refresh) weer bij de
   * introductie begint in plaats van een halve invulling te hervatten.
   */
  const stopAnalyse = useCallback(() => {
    if (typeof window !== "undefined") {
      const bevestigd = window.confirm(
        "Wil je de analyse afbreken? Je antwoorden tot nu toe gaan dan verloren."
      );
      if (!bevestigd) return;
    }
    try {
      window.sessionStorage.removeItem(BEWAAR_SLEUTEL);
      window.sessionStorage.removeItem(NAV_SLEUTEL);
      window.sessionStorage.removeItem(RESULTAAT_STAP_SLEUTEL);
    } catch {
      // stil falen, dan blijft de oude sessie staan maar gaat de bezoeker
      // wel terug naar de introductie
    }
    setData(DEFAULT_QUIZ_DATA);
    setCurrentId(ALLE_SCHERMEN[0].id);
    setFase("intro");
  }, []);

  // Meten per scherm in plaats van per categorie (6-sep-2026). De flow heeft
  // 29 schermen in 5 categorieen, dus op categorieniveau was "afgehaakt in
  // vervoer en vaste lasten" het fijnste dat je kon zien, en dat zijn negen
  // schermen. Per sessie zijn dit hooguit 29 upserts in plaats van 6, wat bij
  // dit volume niets voorstelt.
  useEffect(() => {
    if (fase === "intro") return;
    const scherm = fase === "resultaat" ? "resultaat" : currentId;
    if (scherm === gelogdSchermRef.current) return;
    gelogdSchermRef.current = scherm;

    const categorie =
      fase === "resultaat"
        ? 6
        : ALLE_SCHERMEN.find((s) => s.id === currentId)?.categorie ?? 1;
    const actieveLijst = actieveSchermen(dataRef.current);
    const index =
      fase === "resultaat"
        ? actieveLijst.length
        : Math.max(
            actieveLijst.findIndex((s) => s.id === currentId),
            0
          );

    logVoortgang(categorie, dataRef.current, fase === "resultaat", scherm, index);
    if (fase === "resultaat") markeer("analysis_result_viewed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase, currentId]);

  const huidig = ALLE_SCHERMEN.find((s) => s.id === currentId) ?? ALLE_SCHERMEN[0];
  const actief = actieveSchermen(data);
  const positie = Math.max(actief.findIndex((s) => s.id === currentId), 0);
  const toonVorige = vorigeSchermId(currentId, data) !== null;

  return (
    <div ref={containerRef} className="overflow-x-hidden scroll-mt-24">
      {/* De introductie is sinds 7-sep-2026 een volwaardige landingpage en
          bepaalt daarom haar eigen (bredere) breedte, los van de smalle
          vragenflow hieronder. De vragenflow blijft een smalle kolom, een
          Typeform-gevoel; de resultatenflow bepaalt zijn eigen, bredere
          breedte per stap (spec sectie 8) en staat hieronder al buiten elke
          wrapper. */}
      {fase === "intro" && <IntroScherm onStart={() => setFase("vraag")} />}

      {fase === "vraag" && (
        <div className="max-w-[600px] mx-auto">
          <ProgressBar
            categorie={huidig.categorie}
            positie={positie}
            totaal={actief.length}
            toonVorige={toonVorige}
            onVorige={vorige}
            onAfbreken={stopAnalyse}
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

      {fase === "resultaat" && (
        <Stap6Resultaat
          data={data}
          onChange={patch}
          onTerugNaarVragen={terugNaarVragen}
          onAfbreken={stopAnalyse}
        />
      )}
    </div>
  );
}
