import { useState } from "react";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { aantalVolwassenenVan } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span className="mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-[#1C3A2A] rounded cursor-pointer"
        />
      </span>
      <span>
        <span className="font-body text-sm text-text-soft group-hover:text-primary transition-colors">
          {label}
        </span>
        {hint && <p className="font-body text-xs text-text-muted mt-0.5">{hint}</p>}
      </span>
    </label>
  );
}

function SalarisBlok({
  label,
  hint,
  salarisKey,
  vakantieKey,
  dertiendeKey,
  data,
  onChange,
  showBijtelling,
}: {
  label: string;
  hint?: string;
  salarisKey: "salaris1" | "salaris2";
  vakantieKey: "salaris1InclVakantiegeld" | "salaris2InclVakantiegeld";
  dertiendeKey: "salaris1InclDertiende" | "salaris2InclDertiende";
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  showBijtelling?: boolean;
}) {
  const [verfijnOpen, setVerfijnOpen] = useState(false);
  const s = parseEur(data[salarisKey]);
  const vakantieExtra = data[vakantieKey] ? Math.round(s * 0.08 / 12) : 0;
  const dertiendeExtra = data[dertiendeKey] ? Math.round(s / 12) : 0;
  const effectief = s + vakantieExtra + dertiendeExtra;

  return (
    <div className="mb-6">
      <EuroInput
        label={label}
        id={salarisKey}
        value={data[salarisKey]}
        onChange={(v) => onChange({ [salarisKey]: v } as Partial<QuizData>)}
        placeholder="bijv. 2.800"
        hint={hint ?? "Netto bedrag per maand, na belasting"}
      />
      {s === 0 && (
        <p className="font-body text-xs text-text-muted mt-2">
          Een ronde schatting is prima, je hoeft niets op te zoeken.
        </p>
      )}
      {s > 0 && (
        <div className="mt-3 space-y-2 pl-1">
          <button
            type="button"
            onClick={() => setVerfijnOpen((o) => !o)}
            className="flex items-center gap-2 text-xs font-body font-medium text-text-soft hover:text-primary transition-colors"
          >
            <span className={`transition-transform duration-200 ${verfijnOpen ? "rotate-90" : ""}`}>
              ▶
            </span>
            {verfijnOpen
              ? "Verberg vakantiegeld en 13e maand"
              : "Vakantiegeld of 13e maand? Verfijn (optioneel)"}
          </button>
          {verfijnOpen && (
            <div className="space-y-2 pt-1">
              <Toggle
                checked={data[vakantieKey]}
                onChange={(v) => onChange({ [vakantieKey]: v } as Partial<QuizData>)}
                label="Inclusief vakantiegeld"
                hint={
                  data[vakantieKey]
                    ? `Voegt ${fmtEur(vakantieExtra)}/mnd toe (8%÷12)`
                    : "Verdeelt het jaarlijkse vakantiegeld over 12 maanden"
                }
              />
              <Toggle
                checked={data[dertiendeKey]}
                onChange={(v) => onChange({ [dertiendeKey]: v } as Partial<QuizData>)}
                label="Inclusief 13e maand"
                hint={
                  data[dertiendeKey]
                    ? `Voegt ${fmtEur(dertiendeExtra)}/mnd toe (÷12)`
                    : "Alleen aanvinken als je een 13e maand hebt"
                }
              />
            </div>
          )}
          {showBijtelling && data.auto === "zakelijk" && data.zakelijkBijtellingSalaris && (
            <p className="font-body text-xs text-[#92600A] bg-[#FDF3E3] rounded-lg px-3 py-2">
              Je gaf aan dat de bijtelling nog niet in je salarisstrook zit.
              Vul hier dan het salaris in dat na de bijtelling overblijft,
              anders pakt de vergelijking te rooskleurig uit.
            </p>
          )}
        </div>
      )}
      {effectief > s && (
        <p className="text-xs font-body text-[#2D6A4F] mt-2 font-medium">
          Effectief maandbedrag: {fmtEur(effectief)}
        </p>
      )}
    </div>
  );
}

export default function Stap2Inkomsten({ data, onChange }: Props) {
  const [overigOpen, setOverigOpen] = useState(false);
  const [toeslagenOpen, setToeslagenOpen] = useState(false);
  const alleen = aantalVolwassenenVan(data) === 1;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-2">
        Wat komt er binnen?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vul het netto bedrag in, dus na belasting en inhoudingen.
      </p>

      <SalarisBlok
        label={alleen ? "Jouw netto inkomen per maand" : "Jouw netto salaris"}
        hint="In loondienst: je nettosalaris na belasting. Zzp'er of wisselend inkomen? Vul het gemiddelde van de afgelopen 6 tot 12 maanden in, na belastingreservering."
        salarisKey="salaris1"
        vakantieKey="salaris1InclVakantiegeld"
        dertiendeKey="salaris1InclDertiende"
        data={data}
        onChange={onChange}
        showBijtelling
      />

      {!alleen && (
        <SalarisBlok
          label="Netto salaris van je partner"
          hint="Voor een kloppend totaalplaatje telt het inkomen van je partner mee. Weet je het niet of houden jullie alles gescheiden? Laat het leeg en vul dan ook alleen jouw deel van de kosten in."
          salarisKey="salaris2"
          vakantieKey="salaris2InclVakantiegeld"
          dertiendeKey="salaris2InclDertiende"
          data={data}
          onChange={onChange}
        />
      )}

      {/* Hypotheekrenteaftrek, inkomen, alleen bij koopwoning */}
      {data.woonsituatie === "koop" && (
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            {(["maand", "jaar"] as const).map((per) => (
              <button
                key={per}
                type="button"
                onClick={() => onChange({ hypotheekRenteAftrekPer: per })}
                className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                  data.hypotheekRenteAftrekPer === per
                    ? "bg-primary text-white"
                    : "bg-[#E8E0D0] text-text-soft"
                }`}
              >
                Per {per}
              </button>
            ))}
          </div>
          <EuroInput
            label={`Hypotheekrenteaftrek / teruggave, per ${data.hypotheekRenteAftrekPer}`}
            id="hypotheekRenteAftrek"
            value={data.hypotheekRenteAftrek}
            onChange={(v) => onChange({ hypotheekRenteAftrek: v })}
            hint="Krijg je belasting terug vanwege je hypotheek, vaak via de voorlopige aanslag? Vul dat hier in, meestal als jaarbedrag. Weet je het niet? Laat leeg, dan rekent de analyse gewoon zonder."
          />
        </div>
      )}

      {/* Toeslagen */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setToeslagenOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors mb-4"
        >
          <span className={`transition-transform duration-200 ${toeslagenOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
          {toeslagenOpen ? "Verberg toeslagen" : "+ Toeslagen toevoegen (optioneel)"}
        </button>
        {toeslagenOpen && (
        <div className="space-y-4">
          <EuroInput
            label="Zorgtoeslag"
            id="toeslagZorg"
            value={data.toeslagZorg}
            onChange={(v) => onChange({ toeslagZorg: v })}
            hint="In 2026 maximaal €238/mnd voor een stel, ongeveer de helft voor een alleenstaande"
          />

          {(data.kinderen ?? 0) > 0 && (
            <>
              <EuroInput
                label="Kindgebonden budget"
                id="toeslagKindgebonden"
                value={data.toeslagKindgebonden}
                onChange={(v) => onChange({ toeslagKindgebonden: v })}
                hint="Max €300/mnd per kind"
              />
              <EuroInput
                label="Kinderopvangtoeslag"
                id="toeslagKinderopvang"
                value={data.toeslagKinderopvang}
                onChange={(v) => onChange({ toeslagKinderopvang: v })}
                hint="Hoeveel ontvang je na verrekening?"
              />
              <EuroInput
                label="Kinderbijslag"
                id="toeslagKinderbijslag"
                value={data.toeslagKinderbijslag}
                onChange={(v) => onChange({ toeslagKinderbijslag: v })}
                hint="Gemiddeld €93/mnd per kind (€278/kwartaal)"
              />
            </>
          )}

          {data.woonsituatie === "huur" && (
            <EuroInput
              label="Huurtoeslag"
              id="toeslagHuur"
              value={data.toeslagHuur}
              onChange={(v) => onChange({ toeslagHuur: v })}
            />
          )}
        </div>
        )}
      </div>

      {/* Overig inkomen */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setOverigOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-body font-medium text-text-soft hover:text-primary transition-colors"
        >
          <span
            className={`transition-transform duration-200 ${overigOpen ? "rotate-90" : ""}`}
          >
            ▶
          </span>
          {overigOpen ? "Verberg overig inkomen" : "+ Overig inkomen toevoegen"}
        </button>
        {overigOpen && (
          <div className="mt-4 space-y-4">
            <EuroInput
              label="Overig inkomen (alimentatie, verhuur, etc.)"
              id="toeslagOverig"
              value={data.toeslagOverig}
              onChange={(v) => onChange({ toeslagOverig: v })}
            />
          </div>
        )}
      </div>

      {/* Mobiele live feedback komt nu uit het ingesloten vergelijkingspaneel
          onder de vragen (QuizClient), zodat het niet dubbel staat. */}
    </div>
  );
}
