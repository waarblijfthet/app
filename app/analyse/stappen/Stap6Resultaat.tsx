"use client";

import { useEffect, useRef, useState } from "react";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  vindGrootsteAfwijking,
  bepaalVerdict,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur, RESULTAAT_STAP_SLEUTEL } from "@/lib/quiz-types";
import { bepaalRichting } from "../components/vergelijking-labels";
import ResultaatProgressBar from "./resultaat/ResultaatProgressBar";
import Resultaat1Uitkomst from "./resultaat/Resultaat1Uitkomst";
import Resultaat2Verschil from "./resultaat/Resultaat2Verschil";
import Resultaat3Betekenis from "./resultaat/Resultaat3Betekenis";
import Resultaat4Aanbod from "./resultaat/Resultaat4Aanbod";
import type { AfwijkingEntry } from "./resultaat/types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  /** Terug van uitkomst 1 naar de laatste beantwoorde vraag. */
  onTerugNaarVragen: () => void;
}

const TITEL_PER_STAP: Record<1 | 2 | 3 | 4, (meerdere: boolean) => string> = {
  1: (meerdere) => (meerdere ? "Jullie financiële ruimte" : "Jouw financiële ruimte"),
  2: () => "Waar zit het verschil?",
  3: () => "Wat betekent dit?",
  4: () => "De volgende stap",
};

/** Iets bredere leeszone dan de vragenflow, per stap net iets anders. */
const BREEDTE_PER_STAP: Record<1 | 2 | 3 | 4, string> = {
  1: "max-w-2xl",
  2: "max-w-3xl",
  3: "max-w-2xl",
  4: "max-w-2xl",
};

export default function Stap6Resultaat({ data, onChange, onTerugNaarVragen }: Props) {
  const [substap, setSubstap] = useState<1 | 2 | 3 | 4>(1);
  const hersteldRef = useRef(false);

  // Op een refresh midden in de resultatenflow blijft de bezoeker op dezelfde
  // stap staan. QuizClient wist deze sleutel bij een verse voltooiing, dus
  // hier is een bewaarde waarde altijd een hervatting, nooit een nieuwe start.
  useEffect(() => {
    if (hersteldRef.current) return;
    hersteldRef.current = true;
    try {
      const bewaard = Number(window.sessionStorage.getItem(RESULTAAT_STAP_SLEUTEL));
      if (bewaard === 1 || bewaard === 2 || bewaard === 3 || bewaard === 4) {
        setSubstap(bewaard);
      }
    } catch {
      // stil falen, dan begint de bezoeker gewoon bij uitkomst 1
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(RESULTAAT_STAP_SLEUTEL, String(substap));
    } catch {
      // stil falen
    }
  }, [substap]);

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const meerdere = aantalVolwassenen === 2;
  const onderw = meerdere ? "jullie" : "jou";
  const situatiePos = meerdere ? "jullie" : "jouw";
  const situatiePosHoofdletter =
    situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1);

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
  const verdict = bepaalVerdict(data, benches);
  const grootsteAfwijking = vindGrootsteAfwijking(data, benches);

  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaalWaarde = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);
  const spaardoelWaarde = parseEur(data.spaardoel);

  const conclusieKop =
    overDiff > 100
      ? `Bij ${onderw} blijft waarschijnlijk meer over dan je zelf zou verwachten.`
      : overDiff < -100
      ? `Bij ${onderw} blijft waarschijnlijk minder over dan logisch is voor ${situatiePos} situatie.`
      : `${situatiePosHoofdletter} financiële ruimte lijkt vooralsnog goed te passen bij ${situatiePos} huishouden.`;

  // De context onder het hoofdbedrag, zodat "financiële ruimte" niet als
  // oordeel wordt gelezen: het verschil met de vergelijking is geen conclusie
  // op zich, alleen een constatering.
  const contextZin =
    Math.abs(overDiff) < 100
      ? `${situatiePosHoofdletter} ruimte ligt dicht bij wat we bij dit huishouden verwachten.`
      : `Dat betekent niet automatisch dat er ${fmtEur(
          Math.abs(overDiff)
        )} misgaat. Het laat alleen zien dat ${situatiePos} financiële situatie anders uitpakt dan we bij een vergelijkbaar huishouden zouden verwachten.`;

  // Alleen posten met een echte benchmark: bij een zakelijke auto is de
  // vervoerbenchmark 0 (geen vergelijkingsdata voor eigen bijdrage), en €0 als
  // "vergelijkbaar huishouden" tonen zou ongeloofwaardig zijn. Zo'n post hoort
  // niet thuis in de vergelijking, niet als "geen verschil".
  const gesorteerd: AfwijkingEntry[] = [
    {
      label: "Boodschappen",
      jij: parseEur(data.boodschappen),
      bench: benches.boodschappen,
      diff: parseEur(data.boodschappen) - benches.boodschappen,
    },
    {
      label: "Abonnementen",
      jij: abonnementenTotaalWaarde,
      bench: benches.abonnementen,
      diff: abonnementenTotaalWaarde - benches.abonnementen,
    },
    {
      label: "Wonen",
      jij: wonenTotaal,
      bench: benches.wonen,
      diff: wonenTotaal - benches.wonen,
    },
    {
      label: "Verzekeringen",
      jij: verzekeringTotaal,
      bench: benches.verzekeringen,
      diff: verzekeringTotaal - benches.verzekeringen,
    },
    {
      label: "Vervoer",
      jij: vervoerTotaal,
      bench: benches.vervoer,
      diff: vervoerTotaal - benches.vervoer,
    },
  ]
    .filter((a) => a.jij > 0 && a.bench > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  const opvallend = gesorteerd
    .slice(0, 3)
    .filter((a, i) => i < 2 || Math.abs(a.diff) >= 50);

  function zinVoor(a: AfwijkingEntry, i: number): string {
    const richting = bepaalRichting(a.jij, a.bench);
    const post = a.label.toLowerCase();
    if (richting === "hoger") {
      return i === 0
        ? "Dit is jullie grootste verschil. Dat kan een bewuste keuze zijn, maar de afwijking is groot genoeg om verder te onderzoeken."
        : "Ook hier geven jullie meer uit dan vergelijkbare huishoudens. Op basis van deze vergelijking is nog niet te zeggen of dat logisch, bewust of onnodig is.";
    }
    if (richting === "lager") {
      return i === 0
        ? "Dit is jullie grootste verschil. Jullie geven hier minder uit dan vergelijkbare huishoudens."
        : `Bij ${post} geven jullie minder uit dan vergelijkbare huishoudens.`;
    }
    return `Bij ${post} zit je dicht bij vergelijkbare huishoudens.`;
  }

  const resultaat: Record<string, unknown> = {
    woonsituatie: data.woonsituatie,
    aantal_volwassenen: aantalVolwassenen,
    aantal_kinderen: data.kinderen,
    auto_situatie: data.auto,
    salaris_1: parseEur(data.salaris1),
    salaris_2: parseEur(data.salaris2),
    wonen_huur_hypotheek: parseEur(data.huurHypotheek),
    wonen_energie: parseEur(data.energie),
    wonen_internet_tv: parseEur(data.internet),
    boodschappen: parseEur(data.boodschappen),
    verzekering_zorg_per_persoon: parseEur(data.zorgPerPersoon),
    verzekering_overig: parseEur(data.verzekeringOverig),
    wonen_totaal: wonenTotaal,
    vervoer_totaal: vervoerTotaal,
    verzekering_totaal: verzekeringTotaal,
    abonnementen_totaal: abonnementenTotaalWaarde,
    kinderen_totaal: kinderenTotaal,
    totaal_inkomen_berekend: inkomen,
    totaal_uitgaven_berekend: inkomen - over,
    maandelijks_over_berekend: over,
    benchmark_over_verwacht: benches.vrij_besteedbaar,
    verschil_met_benchmark: overDiff,
    grootste_afwijking: grootsteAfwijking,
    verdict,
  };

  function vorigeStap() {
    if (substap === 1) {
      onTerugNaarVragen();
    } else {
      setSubstap((s) => (s - 1) as 1 | 2 | 3 | 4);
    }
  }

  return (
    <div className={`${BREEDTE_PER_STAP[substap]} mx-auto transition-[max-width] duration-300`}>
      <ResultaatProgressBar
        stap={substap}
        titel={TITEL_PER_STAP[substap](meerdere)}
        onVorige={vorigeStap}
      />

      <div key={substap} className="animate-resultaat-in">
        {substap === 1 && (
          <Resultaat1Uitkomst
            conclusieKop={conclusieKop}
            over={over}
            benchmarkOver={benches.vrij_besteedbaar}
            contextZin={contextZin}
            inkomenWisselend={data.inkomenWisselend}
            spaardoelWaarde={spaardoelWaarde}
            onVerder={() => setSubstap(2)}
          />
        )}
        {substap === 2 && (
          <Resultaat2Verschil
            opvallend={opvallend}
            zinVoor={zinVoor}
            onVerder={() => setSubstap(3)}
          />
        )}
        {substap === 3 && <Resultaat3Betekenis onVerder={() => setSubstap(4)} />}
        {substap === 4 && (
          <Resultaat4Aanbod data={data} onChange={onChange} resultaat={resultaat} />
        )}
      </div>
    </div>
  );
}
