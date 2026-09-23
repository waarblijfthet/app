"use client";

import { useEffect, useRef, useState } from "react";
import { QuizData, RESULTAAT_STAP_SLEUTEL } from "@/lib/quiz-types";
import { logGebeurtenis } from "@/lib/track";
import ResultaatProgressBar from "./resultaat/ResultaatProgressBar";
import Resultaat1Uitkomst from "./resultaat/Resultaat1Uitkomst";
import Resultaat2Verschil from "./resultaat/Resultaat2Verschil";
import Resultaat3Betekenis from "./resultaat/Resultaat3Betekenis";
import Resultaat4Aanbod from "./resultaat/Resultaat4Aanbod";
import { berekenResultaat, zinVoorAfwijking } from "./resultaat/berekenResultaat";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  /** Terug van uitkomst 1 naar de laatste beantwoorde vraag. */
  onTerugNaarVragen: () => void;
  /** Stopt de analyse en gaat terug naar de introductie (7-sep-2026). */
  onAfbreken: () => void;
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

export default function Stap6Resultaat({ data, onChange, onTerugNaarVragen, onAfbreken }: Props) {
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
    // Welke resultaatstap in beeld kwam (23-sep-2026). De e-mail en de
    // Geldscan staan alleen op stap 4; zonder deze meting was niet te zien of
    // mensen die stap ooit bereiken. Zelfde sessie-id als quiz_voortgang, dus
    // /admin/analyse-verloop koppelt het per bezoeker.
    logGebeurtenis("analyse_resultaat_stap", { meta: { stap: substap } });
  }, [substap]);

  // Rekenlaag verhuisd naar resultaat/berekenResultaat.ts (23-sep-2026), zodat
  // de admin dezelfde uitkomst kan tonen. Berekening en teksten ongewijzigd.
  const {
    meerdere,
    benches,
    over,
    conclusieKop,
    contextZin,
    spaardoelWaarde,
    opvallend,
    resultaat,
  } = berekenResultaat(data);
  const zinVoor = zinVoorAfwijking;

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
        onAfbreken={onAfbreken}
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
