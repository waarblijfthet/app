import { QuizData, parseEur } from "@/lib/quiz-types";
import { berekenTotaalInkomen, berekenVervoer, berekenVerzekeringen, getBenchmarks } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap4Vervoer({ data, onChange }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const vervoer = berekenVervoer(data);
  const verzekeringen = berekenVerzekeringen(data);

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Vervoer en verzekeringen
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vaste maandelijkse kosten voor transport en dekking.
      </p>

      {/* Vervoer — contextual */}
      <div className="mb-8">
        <p className="font-body font-medium text-text-soft text-sm mb-4">Vervoer</p>

        {data.auto === "geen" && (
          <EuroInput
            label="OV abonnement (maandelijks)"
            id="ovAbonnement"
            value={data.ovAbonnement}
            onChange={(v) => onChange({ ovAbonnement: v })}
            hint="Gemiddeld €80/mnd (OV + fiets)"
          />
        )}

        {data.auto === "eigen" && (
          <div className="space-y-4">
            <EuroInput
              label="Brandstof per maand"
              id="brandstof"
              value={data.brandstof}
              onChange={(v) => onChange({ brandstof: v })}
              hint="Gemiddeld €180/mnd"
            />
            <EuroInput
              label="Autoverzekering + wegenbelasting (samen)"
              id="autoVerzWB"
              value={data.autoVerzWB}
              onChange={(v) => onChange({ autoVerzWB: v })}
              hint="Gemiddeld €170/mnd samen"
            />
          </div>
        )}

        {data.auto === "lease_privé" && (
          <EuroInput
            label="Maandelijks leasebedrag (all-in)"
            id="leaseBedrag"
            value={data.leaseBedrag}
            onChange={(v) => onChange({ leaseBedrag: v })}
            hint="Gemiddeld €450/mnd voor private lease"
          />
        )}

        {data.auto === "zakelijk" && (
          <div>
            <div className="bg-[#F0EDE6] rounded-xl p-4 mb-4">
              <p className="font-body text-sm text-text-soft">
                De kosten van je zakelijke auto zitten in je arbeidsvoorwaarden.
                Vul alleen een eigen bijdrage in als je die betaalt.
              </p>
            </div>
            <EuroInput
              label="Eigen bijdrage privégebruik (optioneel)"
              id="zakelijkEigenBijdrage"
              value={data.zakelijkEigenBijdrage}
              onChange={(v) => onChange({ zakelijkEigenBijdrage: v })}
            />
          </div>
        )}

        {vervoer > 0 && (
          <div className="mt-3">
            <MiniVergelijking jij={vervoer} benchmark={benches.vervoer} />
          </div>
        )}
      </div>

      {/* Verzekeringen */}
      <div className="mb-8">
        <p className="font-body font-medium text-text-soft text-sm mb-4">Verzekeringen</p>

        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => onChange({ zorgToggle: "per_persoon" })}
              className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                data.zorgToggle === "per_persoon"
                  ? "bg-primary text-white"
                  : "bg-[#E8E0D0] text-text-soft"
              }`}
            >
              Per persoon
            </button>
            <button
              type="button"
              onClick={() => onChange({ zorgToggle: "totaal" })}
              className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                data.zorgToggle === "totaal"
                  ? "bg-primary text-white"
                  : "bg-[#E8E0D0] text-text-soft"
              }`}
            >
              Totaal gezin
            </button>
          </div>
          <EuroInput
            label={
              data.zorgToggle === "per_persoon"
                ? "Zorgverzekering per persoon"
                : "Zorgverzekering totaal gezin"
            }
            id="zorgPerPersoon"
            value={data.zorgPerPersoon}
            onChange={(v) => onChange({ zorgPerPersoon: v })}
            hint={
              data.zorgToggle === "per_persoon"
                ? "Gemiddeld €148/mnd per persoon in 2026. Vul bedrag IN na aftrek van zorgtoeslag."
                : "Vul het totale bedrag in voor jullie gezin, na aftrek van zorgtoeslag."
            }
          />
        </div>

        <EuroInput
          label="Overige verzekeringen (alles samen)"
          id="verzekeringOverig"
          value={data.verzekeringOverig}
          onChange={(v) => onChange({ verzekeringOverig: v })}
          hint="Inboedel, opstal, rechtsbijstand, leven — gemiddeld €120/mnd"
        />

        {verzekeringen > 0 && (
          <div className="mt-3">
            <MiniVergelijking jij={verzekeringen} benchmark={benches.verzekeringen} />
          </div>
        )}
      </div>

      {/* Mobile: beide balken */}
      {(vervoer > 0 || verzekeringen > 0) && (
        <div className="lg:hidden space-y-3">
          {vervoer > 0 && (
            <div className="bg-[#F0EDE6] rounded-xl p-3">
              <p className="text-xs font-body text-text-soft">
                <strong>Vervoer:</strong> jullie €{vervoer} vs gemiddeld €
                {benches.vervoer}
              </p>
            </div>
          )}
          {verzekeringen > 0 && (
            <div className="bg-[#F0EDE6] rounded-xl p-3">
              <p className="text-xs font-body text-text-soft">
                <strong>Verzekeringen:</strong> jullie €{verzekeringen} vs gemiddeld €
                {benches.verzekeringen}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
