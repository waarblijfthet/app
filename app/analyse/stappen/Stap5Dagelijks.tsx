"use client";

import { useState } from "react";
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
    inkomen: inkomen,
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

  const [jaarlijksKeuze, setJaarlijksKeuze] = useState<"none" | "invullen" | "over">(
    parseEur(data.jaarlijkseKosten) > 0 ? "invullen" : "none"
  );

  const boodschappenValtOp =
    boodschappenWaarde > 0 &&
    benches.boodschappen > 0 &&
    boodschappenWaarde - benches.boodschappen > 100;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Waar gaat daarnaast ongeveer geld naartoe?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Je hoeft niets terug te zoeken. Een gemiddelde maand is genoeg.
      </p>

      <div className="mb-10">
        <EuroInput
          label="Boodschappen per maand"
          id="boodschappen"
          value={data.boodschappen}
          onChange={(v) => onChange({ boodschappen: v })}
          hint="Supermarkt en dagelijkse boodschappen samen."
          plausibelTot={4000}
        />
        {boodschappenWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking
              jij={boodschappenWaarde}
              benchmark={benches.boodschappen}
            />
            {boodschappenValtOp && (
              <p className="font-body text-xs text-text-muted mt-1.5">
                Dat zegt nog niet dat dit een probleem is. We kijken eerst naar
                het totaal.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Abonnementen, standaard één totaal. Uitsplitsen mag, maar hoeft niet. */}
      <div className="mb-10">
        {!data.abonnementenExpanded ? (
          <>
            <EuroInput
              label="Abonnementen en memberships"
              id="abonnementenTotaal"
              value={data.abonnementenTotaal}
              onChange={(v) => onChange({ abonnementenTotaal: v })}
              hint="Streaming, telefoon, sport, apps en andere terugkerende kosten."
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
          label="Uitgaan, kleding en andere vrije uitgaven"
          id="vrijetijd"
          value={data.vrijetijd}
          onChange={(v) => onChange({ vrijetijd: v })}
          hint="Horeca, kleding, cadeaus, leuke dingen en uitgaven die niet iedere maand gelijk zijn."
          hint2="Een schatting is voldoende."
          plausibelTot={6000}
        />
        {vrijetijdWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={vrijetijdWaarde} benchmark={benches.vrijetijd} />
          </div>
        )}
      </div>

      {/* Grote, niet-maandelijkse kosten. Neutraal en optioneel: nooit de
          suggestie dat de bezoeker iets verkeerd doet. */}
      <div className="mb-10">
        <p className="font-body font-medium text-primary text-sm mb-2">
          Zijn er grote kosten die niet elke maand terugkomen?
        </p>
        <p className="font-body text-xs text-text-muted mb-3">
          Denk aan vakantie, onderhoud, reparaties, tandarts, cadeaus of
          gemeentelijke belastingen.
        </p>
        {jaarlijksKeuze !== "invullen" ? (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setJaarlijksKeuze("invullen")}
              className="min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] border-[#D9DEDC] bg-card font-body font-medium text-sm text-text-soft hover:border-accent/60 transition-all"
            >
              Ja, ik schat het
            </button>
            <button
              type="button"
              onClick={() => {
                setJaarlijksKeuze("over");
                onChange({ jaarlijkseKosten: "" });
              }}
              className={`min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] font-body font-medium text-sm transition-all ${
                jaarlijksKeuze === "over"
                  ? "bg-green-light border-accent text-primary"
                  : "border-[#D9DEDC] bg-card text-text-soft hover:border-accent/60"
              }`}
            >
              Geen idee, sla over
            </button>
          </div>
        ) : (
          <>
            <EuroInput
              id="jaarlijkseKosten"
              value={data.jaarlijkseKosten}
              onChange={(v) => onChange({ jaarlijkseKosten: v })}
              periode={{
                waarde: data.jaarlijkseKostenPer,
                onChange: (v) => onChange({ jaarlijkseKostenPer: v }),
              }}
              hint="Een ruwe schatting is genoeg."
              onderschrift={
                jaarlijksWaarde > 0
                  ? `Ik reken hiermee ${fmtEur(jaarlijksWaarde)} per maand.`
                  : undefined
              }
            />
            <button
              type="button"
              onClick={() => {
                setJaarlijksKeuze("over");
                onChange({ jaarlijkseKosten: "" });
              }}
              className="mt-2 text-xs font-body font-medium text-accent hover:text-primary transition-colors"
            >
              Toch overslaan
            </button>
          </>
        )}
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
