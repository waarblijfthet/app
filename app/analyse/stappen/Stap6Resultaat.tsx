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
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import ResultaatProgressBar from "./resultaat/ResultaatProgressBar";
import Resultaat1Uitkomst from "./resultaat/Resultaat1Uitkomst";
import Resultaat2Verschil from "./resultaat/Resultaat2Verschil";
import Resultaat3Betekenis from "./resultaat/Resultaat3Betekenis";
import Resultaat4Aanbod, { type BrugVariant } from "./resultaat/Resultaat4Aanbod";
import type { AfwijkingEntry, Brug } from "./resultaat/types";

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

/** Iets bredere leeszone dan de vragenflow, per stap net iets anders (spec sectie 8). */
const BREEDTE_PER_STAP: Record<1 | 2 | 3 | 4, string> = {
  1: "max-w-2xl",
  2: "max-w-3xl",
  3: "max-w-2xl",
  4: "max-w-2xl",
};

/**
 * De brug naar de Geldscan hangt af van de uitkomst, niet van een vast
 * verhaal (28-aug-2026, pass 4). Drie gevallen: er valt iets uit de toon, de
 * bedragen kloppen maar de ruimte blijft achter, of er valt niets uit de toon
 * en er is ook ruimte. In dat laatste geval is "geen lek" het antwoord, en dan
 * hoort daar geen tekst over hogere uitgaven bij.
 */
function bouwBrug(hoogstePost: string | null, ruimteDiff: number): Brug {
  if (hoogstePost) {
    return {
      kop: "Je weet nu wáár het verschil zit.",
      tegen: "Maar cijfers vertellen nog niet of dit een probleem is.",
      uitleg: `Hoge ${hoogstePost} kunnen een probleem zijn. Maar net zo goed het gevolg van bewuste keuzes of een patroon dat verder prima past.`,
      slot:
        "Daarom kijk ik bij de Geldscan persoonlijk naar het waarom, en wat ik als eerste zou onderzoeken.",
      cta: "Laat mij uitzoeken waarom →",
    };
  }
  if (ruimteDiff < -100) {
    return {
      kop: "Je weet nu dat de grote bedragen kloppen.",
      tegen: "Dan zit de verklaring ergens anders.",
      uitleg: `Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} huishoudens die ik doorrekende zat er geen lek in de bedragen, en dat staat ook zo in hun rapport. De krapte was er wel.`,
      slot:
        "Bij de Geldscan kijk ik daar persoonlijk naar, en schrijf ik op wat ik als eerste zou onderzoeken.",
      cta: "Laat mij uitzoeken waar het dan zit →",
    };
  }
  return {
    kop: "Op deze cijfers valt er niets uit de toon.",
    tegen: "Dat is ook een antwoord.",
    uitleg: `Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} huishoudens die ik doorrekende was dat de uitkomst, en dat staat ook zo in hun rapport. Voelt het bij jou toch krap, dan zit dat in iets wat een maandgemiddelde niet laat zien.`,
    slot:
      "Wil je zeker weten dat je niets mist, dan kijk ik bij de Geldscan persoonlijk mee.",
    cta: "Laat mij persoonlijk meekijken →",
  };
}

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
  const tekort = -overDiff;
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
      : `${situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1)} financiële ruimte lijkt vooralsnog goed te passen bij ${situatiePos} huishouden.`;

  const interpretatie =
    tekort > 100
      ? `Dat betekent niet automatisch dat er ${fmtEur(
          tekort
        )} per maand verkeerd gaat. Maar ${situatiePos} situatie wijkt wel duidelijk af.`
      : tekort < -100
      ? "Op dit niveau gaat er waarschijnlijk niets structureels mis."
      : `${situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1)} ruimte ligt dicht bij wat we bij dit huishouden verwachten.`;

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
    .filter((a) => a.jij > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  const opvallend = gesorteerd
    .slice(0, 3)
    .filter((a, i) => i < 2 || Math.abs(a.diff) >= 50);

  const bovenBenchmark = gesorteerd.filter(
    (a) => bepaalRichting(a.jij, a.bench) === "hoger"
  );

  const brug = bouwBrug(
    bovenBenchmark.length > 0 ? bovenBenchmark[0].label.toLowerCase() : null,
    overDiff
  );
  const brugVariant: BrugVariant =
    bovenBenchmark.length > 0 ? "afwijking" : overDiff < -100 ? "tekort" : "niets";

  function zinVoor(a: AfwijkingEntry, i: number): string {
    const richting = bepaalRichting(a.jij, a.bench);
    const post = a.label.toLowerCase();
    if (richting === "hoger") {
      return i === 0
        ? "Hier zit het grootste verschil in."
        : `Ook bij ${post} zit je hoger dan verwacht.`;
    }
    if (richting === "lager") {
      return `Bij ${post} zit je juist onder vergelijkbare huishoudens.`;
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
            interpretatie={interpretatie}
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
        {substap === 3 && (
          <Resultaat3Betekenis
            brug={brug}
            heeftAfwijking={brugVariant === "afwijking"}
            onVerder={() => setSubstap(4)}
          />
        )}
        {substap === 4 && (
          <Resultaat4Aanbod
            variant={brugVariant}
            brug={brug}
            data={data}
            onChange={onChange}
            resultaat={resultaat}
          />
        )}
      </div>
    </div>
  );
}
