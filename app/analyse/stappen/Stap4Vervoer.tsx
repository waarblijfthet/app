import { QuizData } from "@/lib/quiz-types";
import {
  berekenTotaalInkomen,
  berekenVervoer,
  berekenVerzekeringen,
  getBenchmarks,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap4Vervoer({ data, onChange }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen,
  });

  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Vervoer en verzekeringen
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Wat betaal je hier gemiddeld per maand aan?
      </p>

      {/* Vervoer, alleen de velden die bij je autosituatie horen. */}
      <div className="mb-10">
        {data.auto === "geen" && (
          <EuroInput
            label="Openbaar vervoer en fiets"
            id="ovAbonnement"
            value={data.ovAbonnement}
            onChange={(v) => onChange({ ovAbonnement: v })}
            hint="Per maand. Een schatting is voldoende."
            plausibelTot={1500}
          />
        )}

        {data.auto === "eigen" && (
          <div className="space-y-8">
            <EuroInput
              label="Brandstof of laden per maand"
              id="brandstof"
              value={data.brandstof}
              onChange={(v) => onChange({ brandstof: v })}
              hint="Een schatting is voldoende."
              plausibelTot={2000}
            />
            <EuroInput
              label="Autoverzekering en wegenbelasting"
              id="autoVerzWB"
              value={data.autoVerzWB}
              onChange={(v) => onChange({ autoVerzWB: v })}
              hint="Samen, per maand."
              plausibelTot={2000}
            />
          </div>
        )}

        {data.auto === "lease_privé" && (
          <EuroInput
            label="Leasebedrag per maand"
            id="leaseBedrag"
            value={data.leaseBedrag}
            onChange={(v) => onChange({ leaseBedrag: v })}
            hint="Het all-in bedrag dat je maandelijks betaalt."
            plausibelTot={3000}
          />
        )}

        {data.auto === "zakelijk" && (
          <EuroInput
            label="Eigen bijdrage privégebruik"
            id="zakelijkEigenBijdrage"
            value={data.zakelijkEigenBijdrage}
            onChange={(v) => onChange({ zakelijkEigenBijdrage: v })}
            hint="Betaal je niets? Laat leeg."
            plausibelTot={2000}
          />
        )}

        {vervoer > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
          </div>
        )}
      </div>

      <div className="mb-10">
        {aantalVolwassenen === 2 && (
          <div className="flex gap-2 mb-2">
            {(
              [
                { v: "per_persoon", label: "Per persoon" },
                { v: "totaal", label: "Totaal huishouden" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => onChange({ zorgToggle: opt.v })}
                className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                  data.zorgToggle === opt.v
                    ? "bg-primary text-white"
                    : "bg-[#E6E9E7] text-text-soft"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
        <EuroInput
          label={
            aantalVolwassenen === 1
              ? "Zorgverzekering per maand"
              : data.zorgToggle === "per_persoon"
              ? "Zorgverzekering per persoon"
              : "Zorgverzekering totaal huishouden"
          }
          id="zorgPerPersoon"
          value={data.zorgPerPersoon}
          onChange={(v) => onChange({ zorgPerPersoon: v })}
          hint="Gebruik het bedrag dat je daadwerkelijk per maand betaalt."
          plausibelTot={1200}
        />
      </div>

      <div className="mb-10">
        <EuroInput
          label="Overige verzekeringen"
          id="verzekeringOverig"
          value={data.verzekeringOverig}
          onChange={(v) => onChange({ verzekeringOverig: v })}
          hint="Denk aan inboedel, aansprakelijkheid, auto, rechtsbijstand, leven en eventueel arbeidsongeschiktheid."
          hint2="Een realistische schatting is voldoende."
          plausibelTot={3000}
        />
        {verzekeringen > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={verzekeringen} benchmark={benches.verzekeringen} />
          </div>
        )}
      </div>
    </div>
  );
}
