import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { ENERGIE_BENCH } from "@/lib/benchmarks";
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

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Wat kost jullie woning elke maand?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-7">
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

      <div className="mb-7">
        <EuroInput
          label="Gas, stroom en water samen"
          id="energie"
          value={data.energie}
          onChange={(v) => onChange({ energie: v })}
          hint="Weet je het niet precies? Gebruik je gemiddelde maandbedrag."
          plausibelTot={1500}
        />
        {parseEur(data.energie) > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={parseEur(data.energie)} benchmark={ENERGIE_BENCH} />
          </div>
        )}
      </div>

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
