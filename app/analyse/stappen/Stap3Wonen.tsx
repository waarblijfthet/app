import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import {
  ENERGIE_BENCH,
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";
import Uitklap from "../components/Uitklap";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap3Wonen({ data, onChange }: Props) {
  const gemeenteMaand =
    data.gemeenteBelastingenPer === "jaar"
      ? Math.round(parseEur(data.gemeenteBelastingen) / 12)
      : parseEur(data.gemeenteBelastingen);

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenen,
  });
  const wonenTotaal = berekenWonen(data);
  const wonenVerschil = wonenTotaal - benches.wonen;

  // "Dit valt nu op" (28-aug-2026, pass 3): de gebruiker moet na deze stap iets
  // leren over het totaal, niet alleen een losse pil per post zien. Neutraal bij
  // een lager bedrag, geen waarschuwing bij een hoger bedrag.
  let wonenZin = "";
  if (wonenTotaal > 0 && benches.wonen > 0) {
    if (wonenVerschil > 100) {
      wonenZin =
        "Hogere woonkosten verklaren nu al een deel van het verschil met vergelijkbare huishoudens.";
    } else if (wonenVerschil < -100) {
      wonenZin = "Je woonkosten liggen lager dan bij vergelijkbare huishoudens.";
    } else {
      wonenZin =
        "Je woonkosten lijken vooralsnog goed te passen bij vergelijkbare huishoudens.";
    }
  }

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Wat kost jullie woning elke maand?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Voor veel huishoudens zit hier een groot verschil. Vul alleen de
        bedragen in die je ongeveer weet.
      </p>

      <div className="mb-6">
        {/* Alleen het veld dat bij je woonsituatie hoort. */}
        <EuroInput
          label={
            data.woonsituatie === "huur" ? "Huur per maand" : "Wat maak je maandelijks over voor je hypotheek?"
          }
          id="huurHypotheek"
          value={data.huurHypotheek}
          onChange={(v) => onChange({ huurHypotheek: v })}
          hint={
            data.woonsituatie === "koop"
              ? "Het bedrag dat je maandelijks aan de bank overmaakt."
              : "Het bedrag dat je maandelijks aan de verhuurder betaalt."
          }
          plausibelTot={8000}
        />
      </div>

      <div className="mb-10">
        <EuroInput
          label="Gas, stroom en water samen"
          id="energie"
          value={data.energie}
          onChange={(v) => onChange({ energie: v })}
          hint="Gas, stroom en water."
          hint2="Weet je het niet precies? Gebruik je gemiddelde maandbedrag."
          plausibelTot={1500}
        />
        {parseEur(data.energie) > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={parseEur(data.energie)} benchmark={ENERGIE_BENCH} />
          </div>
        )}
      </div>

      {/* Totaal wonen tegen vergelijkbare huishoudens, los van de losse
          energie-vergelijking hierboven die per post blijft. */}
      {wonenZin && (
        <div className="mb-10 rounded-xl border border-[#E6E9E7] bg-[#F7F5F0] p-4">
          <p className="section-eyebrow mb-2">Dit valt nu op</p>
          <MiniVergelijking jij={wonenTotaal} benchmark={benches.wonen} />
          <p className="font-body text-xs text-text-soft mt-2 leading-relaxed">
            {wonenZin}
          </p>
        </div>
      )}

      <Uitklap titel="+ Nog een woonkost toevoegen" titelOpen="Verberg extra woonkosten">
        <EuroInput
          label="Internet, tv en vaste telefoon"
          id="internet"
          value={data.internet}
          onChange={(v) => onChange({ internet: v })}
          hint="Vul het bedrag in dat je maandelijks betaalt."
          plausibelTot={500}
        />
        <EuroInput
          label="Servicekosten of VvE"
          id="servicekosten"
          value={data.servicekosten}
          onChange={(v) => onChange({ servicekosten: v })}
          hint="Per maand."
        />
        <EuroInput
          label="Gemeentelijke belastingen"
          id="gemeenteBelastingen"
          value={data.gemeenteBelastingen}
          onChange={(v) => onChange({ gemeenteBelastingen: v })}
          periode={{
            waarde: data.gemeenteBelastingenPer,
            onChange: (v) => onChange({ gemeenteBelastingenPer: v }),
          }}
          hint="Vaak een jaaraanslag, dus staat 'per jaar' voorgeselecteerd."
          onderschrift={
            data.gemeenteBelastingenPer === "jaar" && gemeenteMaand > 0
              ? `Ik reken hiermee ${fmtEur(gemeenteMaand)} per maand.`
              : undefined
          }
        />
      </Uitklap>

    </div>
  );
}
