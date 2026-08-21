import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { aantalVolwassenenVan } from "@/lib/benchmarks";
import EuroInput from "../components/EuroInput";
import Uitklap from "../components/Uitklap";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function Vinkje({
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
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-[#0B7A6E] rounded cursor-pointer flex-shrink-0"
      />
      <span>
        <span className="font-body text-sm text-text-soft group-hover:text-primary transition-colors">
          {label}
        </span>
        {hint && <p className="font-body text-xs text-text-muted mt-0.5">{hint}</p>}
      </span>
    </label>
  );
}

export default function Stap2Inkomsten({ data, onChange }: Props) {
  const alleen = aantalVolwassenenVan(data) === 1;

  const s1 = parseEur(data.salaris1);
  const s2 = parseEur(data.salaris2);
  const extra1 =
    (data.salaris1InclVakantiegeld ? Math.round((s1 * 0.08) / 12) : 0) +
    (data.salaris1InclDertiende ? Math.round(s1 / 12) : 0);
  const extra2 =
    (data.salaris2InclVakantiegeld ? Math.round((s2 * 0.08) / 12) : 0) +
    (data.salaris2InclDertiende ? Math.round(s2 / 12) : 0);
  const extraTotaal = extra1 + extra2;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Wat komt er gemiddeld per maand binnen?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-10">
        Vul netto bedragen in. Een realistische schatting is voldoende.
      </p>

      <div className="mb-10">
        <EuroInput
          label={alleen ? "Netto inkomen per maand" : "Jouw netto inkomen per maand"}
          id="salaris1"
          value={data.salaris1}
          onChange={(v) => onChange({ salaris1: v })}
          placeholder="bijv. 2.800"
          hint="Je normale netto bedrag na belasting en inhoudingen."
          hint2="Wisselend inkomen? Neem het gemiddelde van de afgelopen 6 tot 12 maanden."
          plausibelTot={25000}
        />
        {data.auto === "zakelijk" && data.zakelijkBijtellingSalaris && s1 > 0 && (
          <p className="font-body text-xs text-[#92600A] bg-[#FDF3E3] rounded-lg px-3 py-2 mt-2">
            Vul het bedrag in dat na de bijtelling overblijft, anders pakt de
            vergelijking te rooskleurig uit.
          </p>
        )}
      </div>

      {!alleen && (
        <div className="mb-10">
          <EuroInput
            label="Netto inkomen partner per maand"
            id="salaris2"
            value={data.salaris2}
            onChange={(v) => onChange({ salaris2: v })}
            hint="Gebruik het gemiddelde netto bedrag per maand."
            hint2="Weet je het exacte bedrag niet? Een schatting is prima."
            plausibelTot={25000}
          />
        </div>
      )}

      <Uitklap titel="+ Extra inkomen toevoegen" titelOpen="Verberg extra inkomen">
        <Vinkje
          checked={data.salaris1InclVakantiegeld}
          onChange={(v) => onChange({ salaris1InclVakantiegeld: v })}
          label="Ik krijg vakantiegeld"
          hint="Verdeelt 8 procent over twaalf maanden."
        />
        <Vinkje
          checked={data.salaris1InclDertiende}
          onChange={(v) => onChange({ salaris1InclDertiende: v })}
          label="Ik krijg een 13e maand"
        />
        {!alleen && (
          <>
            <Vinkje
              checked={data.salaris2InclVakantiegeld}
              onChange={(v) => onChange({ salaris2InclVakantiegeld: v })}
              label="Mijn partner krijgt vakantiegeld"
            />
            <Vinkje
              checked={data.salaris2InclDertiende}
              onChange={(v) => onChange({ salaris2InclDertiende: v })}
              label="Mijn partner krijgt een 13e maand"
            />
          </>
        )}
        <EuroInput
          label="Andere vaste inkomsten"
          id="toeslagOverig"
          value={data.toeslagOverig}
          onChange={(v) => onChange({ toeslagOverig: v })}
          hint="Bijvoorbeeld alimentatie of verhuur, per maand."
        />
        {extraTotaal > 0 && (
          <p className="font-body text-xs text-accent font-medium">
            Dit telt {fmtEur(extraTotaal)} per maand extra mee.
          </p>
        )}
      </Uitklap>

      {/* Alleen bij een koopwoning, want anders is er niets terug te krijgen. */}
      {data.woonsituatie === "koop" && (
        <div className="mb-10">
          <EuroInput
            label="Krijg je jaarlijks hypotheekrente terug van de Belastingdienst?"
            id="hypotheekRenteAftrek"
            value={data.hypotheekRenteAftrek}
            onChange={(v) => onChange({ hypotheekRenteAftrek: v })}
            periode={{
              waarde: data.hypotheekRenteAftrekPer,
              onChange: (v) => onChange({ hypotheekRenteAftrekPer: v }),
            }}
            hint="Vul het bedrag in dat je ongeveer per jaar terugkrijgt. Weet je het niet? Laat leeg."
          />
        </div>
      )}

      <Uitklap
        intro="Ontvang je toeslagen?"
        titel="+ Toeslagen toevoegen"
        titelOpen="Verberg toeslagen"
      >
        <p className="font-body text-xs text-text-muted">
          Vul het gemiddelde bedrag per maand in.
        </p>
        <EuroInput
          label="Zorgtoeslag"
          id="toeslagZorg"
          value={data.toeslagZorg}
          onChange={(v) => onChange({ toeslagZorg: v })}
        />
        {(data.kinderen ?? 0) > 0 && (
          <>
            <EuroInput
              label="Kinderopvangtoeslag"
              id="toeslagKinderopvang"
              value={data.toeslagKinderopvang}
              onChange={(v) => onChange({ toeslagKinderopvang: v })}
            />
            <EuroInput
              label="Kindgebonden budget"
              id="toeslagKindgebonden"
              value={data.toeslagKindgebonden}
              onChange={(v) => onChange({ toeslagKindgebonden: v })}
            />
            <EuroInput
              label="Kinderbijslag"
              id="toeslagKinderbijslag"
              value={data.toeslagKinderbijslag}
              onChange={(v) => onChange({ toeslagKinderbijslag: v })}
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
      </Uitklap>
    </div>
  );
}
