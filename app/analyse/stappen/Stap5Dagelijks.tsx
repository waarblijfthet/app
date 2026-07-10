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

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

export default function Stap5Dagelijks({ data, onChange }: Props) {
  const [spaardoelOpen, setSpaardoelOpen] = useState(false);

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const boodschappenWaarde = parseEur(data.boodschappen);
  const abonnementenWaarde = berekenAbonnementen(data);
  const kinderenWaarde = berekenKinderen(data);
  const vrijetijdWaarde = parseEur(data.vrijetijd);
  const jaarlijksWaarde = berekenJaarlijks(data);

  const boodschappenDiff = boodschappenWaarde - benches.boodschappen;
  const abonnementenDiff = abonnementenWaarde - benches.abonnementen;
  const grootsteAfwijking =
    boodschappenDiff > abonnementenDiff ? "boodschappen" : "abonnementen";

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Wat gaat er dagelijks uit?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        De categorieën die het meeste variëren tussen huishoudens.
      </p>

      {/* Boodschappen */}
      <div className="mb-6">
        <EuroInput
          label="Boodschappen per maand"
          id="boodschappen"
          value={data.boodschappen}
          onChange={(v) => onChange({ boodschappen: v })}
          hint={`Gemiddeld ${fmtEur(benches.boodschappen)}/mnd voor een huishouden als het jouwe`}
        />
        {boodschappenWaarde > 0 && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <MiniVergelijking
              jij={boodschappenWaarde}
              benchmark={benches.boodschappen}
            />
            {boodschappenDiff > 50 && (
              <span className="text-xs font-body text-accent font-medium">
                {grootsteAfwijking === "boodschappen" && "⚠"}{" "}
                {fmtEur(boodschappenDiff)} boven gemiddeld
              </span>
            )}
          </div>
        )}
      </div>

      {/* Abonnementen */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-body font-medium text-text-soft text-sm">
            Abonnementen (totaal)
          </label>
          <button
            type="button"
            onClick={() =>
              onChange({ abonnementenExpanded: !data.abonnementenExpanded })
            }
            className="text-xs font-body text-text-muted underline hover:text-primary"
          >
            {data.abonnementenExpanded ? "Samenvoegen" : "Uitsplitsen"}
          </button>
        </div>

        {!data.abonnementenExpanded ? (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-body text-base select-none pointer-events-none">
              €
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={data.abonnementenTotaal}
              onChange={(e) =>
                onChange({ abonnementenTotaal: e.target.value.replace(/[^\d]/g, "") })
              }
              placeholder="0"
              className="w-full bg-white border border-[rgba(26,70,42,0.18)] rounded-[10px] pl-8 pr-4 py-3 text-base text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <p className="text-text-muted font-body text-xs mt-1.5">
              Gemiddeld €180/mnd: streaming, telefoon, gym, apps
            </p>
          </div>
        ) : (
          <div className="space-y-3 pl-3 border-l-2 border-[#E6E9E7]">
            <EuroInput
              label="Streaming (Netflix, Disney+, etc.)"
              id="streaming"
              value={data.streamingBedrag}
              onChange={(v) => onChange({ streamingBedrag: v })}
              hint="Gemiddeld €25/mnd"
            />
            <EuroInput
              label="Telefoonabonnementen (totaal huishouden)"
              id="telefoon"
              value={data.telefoonBedrag}
              onChange={(v) => onChange({ telefoonBedrag: v })}
              hint="Gemiddeld €25/mnd per persoon"
            />
            <EuroInput
              label="Overig (gym, kranten, apps, etc.)"
              id="abonOverig"
              value={data.abonnementenOverigBedrag}
              onChange={(v) => onChange({ abonnementenOverigBedrag: v })}
            />
          </div>
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

      {/* Kinderkosten */}
      {(data.kinderen ?? 0) > 0 && (
        <div className="mb-6">
          <p className="font-body font-medium text-text-soft text-sm mb-4">
            Kinderkosten
          </p>
          <div className="space-y-4">
            <EuroInput
              label="Kinderopvang eigen bijdrage (na toeslag)"
              id="kinderopvang"
              value={data.kinderopvangEigenBijdrage}
              onChange={(v) => onChange({ kinderopvangEigenBijdrage: v })}
            />
            <EuroInput
              label="School en activiteiten"
              id="school"
              value={data.schoolActiviteiten}
              onChange={(v) => onChange({ schoolActiviteiten: v })}
            />
            <EuroInput
              label="Sport en hobby&apos;s kinderen"
              id="sport"
              value={data.sportHobbyKinderen}
              onChange={(v) => onChange({ sportHobbyKinderen: v })}
            />
          </div>
          {kinderenWaarde > 0 && benches.kinderen > 0 && (
            <div className="mt-3">
              <MiniVergelijking jij={kinderenWaarde} benchmark={benches.kinderen} />
            </div>
          )}
        </div>
      )}

      {/* Vrije bestedingen */}
      <div className="mb-6">
        <EuroInput
          label="Vrije bestedingen"
          id="vrijetijd"
          value={data.vrijetijd}
          onChange={(v) => onChange({ vrijetijd: v })}
          hint={`Restaurants, bezorgd, kleding, cadeautjes, uitjes en vakanties. Gemiddeld ${fmtEur(benches.vrijetijd)}/mnd`}
        />
        {vrijetijdWaarde > 0 && (
          <div className="mt-2">
            <MiniVergelijking jij={vrijetijdWaarde} benchmark={benches.vrijetijd} />
          </div>
        )}
        {vrijetijdWaarde > 0 && vrijetijdWaarde < benches.vrijetijd * 0.5 && (
          <div className="mt-2 bg-[#FDF3E3] rounded-lg px-3 py-2">
            <p className="font-body text-xs text-[#92600A]">
              Zitten restaurants, kleding en cadeautjes erin? Die worden vaak vergeten, gemiddeld is dat zo'n {fmtEur(Math.round(benches.vrijetijd * 0.4))}/mnd.
            </p>
          </div>
        )}
      </div>

      {/* Jaarlijkse kosten */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          {(["maand", "jaar"] as const).map((per) => (
            <button
              key={per}
              type="button"
              onClick={() => onChange({ jaarlijkseKostenPer: per })}
              className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                data.jaarlijkseKostenPer === per
                  ? "bg-primary text-white"
                  : "bg-[#E6E9E7] text-text-soft"
              }`}
            >
              Per {per}
            </button>
          ))}
        </div>
        <EuroInput
          label={`Onverwachte kosten, per ${data.jaarlijkseKostenPer}`}
          id="jaarlijkseKosten"
          value={data.jaarlijkseKosten}
          onChange={(v) => onChange({ jaarlijkseKosten: v })}
          hint={
            data.woonsituatie === "koop"
              ? "Huisonderhoud, autoreparaties, tandarts, brillen. Gemiddeld €3.600/jaar voor een huishouden met koopwoning"
              : "Autoreparaties, tandarts, brillen, kleding, gemiddeld €1.800/jaar"
          }
        />
        {jaarlijksWaarde > 0 && (
          <p className="font-body text-xs text-[#0B7A6E] mt-1.5 font-medium">
            = {fmtEur(jaarlijksWaarde)}/mnd, wordt meegenomen in je totaal
          </p>
        )}
      </div>

      {/* Spaardoel, optioneel, achter een toggle */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setSpaardoelOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors"
        >
          <span className={`transition-transform duration-200 ${spaardoelOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
          {spaardoelOpen ? "Verberg spaardoel" : "+ Maandelijks spaardoel toevoegen (optioneel)"}
        </button>
        {spaardoelOpen && (
          <div className="mt-4">
            <EuroInput
              label="Wat wil je maandelijks sparen?"
              id="spaardoel"
              value={data.spaardoel}
              onChange={(v) => onChange({ spaardoel: v })}
              hint="Buffer, pensioen (zeker belangrijk als zzp'er of 50-plusser), verbouwing. Wat je structureel opzij wilt zetten."
            />
          </div>
        )}
      </div>

      {/* Mobile highlight */}
      {boodschappenWaarde > 0 &&
        abonnementenWaarde > 0 &&
        Math.max(boodschappenDiff, abonnementenDiff) > 50 && (
        <div className="lg:hidden bg-[#FDF3E3] rounded-xl p-4">
          <p className="text-xs font-body text-[#92600A] font-medium mb-1">
            Hier valt het meeste op
          </p>
          <p className="font-body text-sm text-[#92600A]">
            {grootsteAfwijking === "boodschappen"
              ? `Boodschappen: ${fmtEur(boodschappenWaarde)} vs gemiddeld ${fmtEur(benches.boodschappen)}`
              : `Abonnementen: ${fmtEur(abonnementenWaarde)} vs gemiddeld ${fmtEur(benches.abonnementen)}`}
          </p>
          <p className="font-body text-xs text-[#92600A] mt-1 opacity-80">
            Geen oordeel, wel een aanknopingspunt. Dit is precies wat de
            analyse zichtbaar moet maken.
          </p>
        </div>
      )}
    </div>
  );
}
