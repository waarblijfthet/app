import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import {
  berekenTotaalInkomen,
  berekenAbonnementen,
  berekenKinderen,
  berekenJaarlijks,
  getBenchmarks,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import MiniVergelijking from "../components/MiniVergelijking";
import Uitklap from "../components/Uitklap";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap5Dagelijks({ data, onChange }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenenVan(data),
  });

  const boodschappenWaarde = parseEur(data.boodschappen);
  const abonnementenWaarde = berekenAbonnementen(data);
  const kinderenWaarde = berekenKinderen(data);
  const vrijetijdWaarde = parseEur(data.vrijetijd);
  const jaarlijksWaarde = berekenJaarlijks(data);
  const heeftKinderen = (data.kinderen ?? 0) > 0;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Waar gaat je geld dagelijks naartoe?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Schat je gemiddelde maandbedragen. Precies weten hoeft niet.
      </p>

      <div className="mb-10">
        <EuroInput
          label="Boodschappen per maand"
          id="boodschappen"
          value={data.boodschappen}
          onChange={(v) => onChange({ boodschappen: v })}
          hint="Weet je het niet precies? Schat wat je gemiddeld uitgeeft."
          plausibelTot={4000}
        />
        {boodschappenWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking
              jij={boodschappenWaarde}
              benchmark={benches.boodschappen}
            />
          </div>
        )}
      </div>

      {/* Abonnementen, standaard één totaal. Uitsplitsen mag, maar hoeft niet. */}
      <div className="mb-10">
        {!data.abonnementenExpanded ? (
          <>
            <EuroInput
              label="Totale abonnementen per maand"
              id="abonnementenTotaal"
              value={data.abonnementenTotaal}
              onChange={(v) => onChange({ abonnementenTotaal: v })}
              hint="Streaming, telefoon, sport, apps, alles bij elkaar."
              plausibelTot={2000}
            />
            <button
              type="button"
              onClick={() => onChange({ abonnementenExpanded: true })}
              className="mt-2 text-xs font-body font-medium text-accent hover:text-primary transition-colors"
            >
              Wil je ze uitsplitsen?
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="font-body font-medium text-primary text-sm">
                Abonnementen per maand
              </p>
              <button
                type="button"
                onClick={() => onChange({ abonnementenExpanded: false })}
                className="text-xs font-body font-medium text-accent hover:text-primary transition-colors"
              >
                Weer samenvoegen
              </button>
            </div>
            <div className="space-y-6 pl-3 border-l-2 border-[#E6E9E7]">
              <EuroInput
                label="Streaming"
                id="streaming"
                value={data.streamingBedrag}
                onChange={(v) => onChange({ streamingBedrag: v })}
              />
              <EuroInput
                label="Telefoon"
                id="telefoon"
                value={data.telefoonBedrag}
                onChange={(v) => onChange({ telefoonBedrag: v })}
                hint="Alle telefoons in het huishouden samen."
              />
              <EuroInput
                label="Sport, apps en overige abonnementen"
                id="abonOverig"
                value={data.abonnementenOverigBedrag}
                onChange={(v) => onChange({ abonnementenOverigBedrag: v })}
              />
            </div>
          </>
        )}
        {abonnementenWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking
              jij={abonnementenWaarde}
              benchmark={benches.abonnementen}
            />
          </div>
        )}
      </div>

      {/* Kinderkosten alleen als er kinderen thuis zijn. */}
      {heeftKinderen && (
        <div className="mb-10">
          <p className="font-body font-medium text-primary text-sm mb-4">
            Kosten voor de kinderen
          </p>
          <div className="space-y-8">
            <EuroInput
              label="Opvang per maand"
              id="kinderopvang"
              value={data.kinderopvangEigenBijdrage}
              onChange={(v) => onChange({ kinderopvangEigenBijdrage: v })}
              hint="Je eigen bijdrage, dus na de toeslag."
              plausibelTot={4000}
            />
            <EuroInput
              label="School en activiteiten"
              id="school"
              value={data.schoolActiviteiten}
              onChange={(v) => onChange({ schoolActiviteiten: v })}
              plausibelTot={3000}
            />
            <EuroInput
              label="Sport en hobby's"
              id="sport"
              value={data.sportHobbyKinderen}
              onChange={(v) => onChange({ sportHobbyKinderen: v })}
              plausibelTot={3000}
            />
          </div>
          {kinderenWaarde > 0 && benches.kinderen > 0 && (
            <div className="mt-2">
              <MiniVergelijking jij={kinderenWaarde} benchmark={benches.kinderen} />
            </div>
          )}
        </div>
      )}

      <div className="mb-10">
        <EuroInput
          label="Vrije bestedingen per maand"
          id="vrijetijd"
          value={data.vrijetijd}
          onChange={(v) => onChange({ vrijetijd: v })}
          hint="Denk aan horeca, kleding, cadeaus, uitjes en vakantie."
          hint2="Een schatting is voldoende."
          plausibelTot={6000}
        />
        {vrijetijdWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={vrijetijdWaarde} benchmark={benches.vrijetijd} />
          </div>
        )}
      </div>

      <div className="mb-10">
        <EuroInput
          label="Jaarlijkse kosten die je makkelijk vergeet"
          id="jaarlijkseKosten"
          value={data.jaarlijkseKosten}
          onChange={(v) => onChange({ jaarlijkseKosten: v })}
          periode={{
            waarde: data.jaarlijkseKostenPer,
            onChange: (v) => onChange({ jaarlijkseKostenPer: v }),
          }}
          hint="Denk aan onderhoud, reparaties, tandarts, brillen, eigen risico en cadeaus."
          hint2="Weet je het niet? Maak een ruwe schatting."
          plausibelTot={60000}
          onderschrift={
            jaarlijksWaarde > 0
              ? `Ik reken hiermee ${fmtEur(jaarlijksWaarde)} per maand.`
              : undefined
          }
        />
      </div>

      <Uitklap
        titel="+ Optioneel: wil je je spaardoel meenemen?"
        titelOpen="Verberg spaardoel"
      >
        <EuroInput
          label="Wat wil je maandelijks sparen?"
          id="spaardoel"
          value={data.spaardoel}
          onChange={(v) => onChange({ spaardoel: v })}
          hint="Wat je structureel opzij wilt zetten."
          plausibelTot={10000}
        />
      </Uitklap>
    </div>
  );
}
