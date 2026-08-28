"use client";

import { useEffect, useState } from "react";
import { QuizData, KinderenAantal } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

type Samenstelling = "alleen" | "stel" | "partner_kids" | "alleen_kids";

/** Leidt de gekozen kaart af uit de opgeslagen data (voor terugkeer en voorvullen). */
function afleiden(d: QuizData): Samenstelling | null {
  if (d.volwassenen == null || d.kinderen == null) return null;
  const kids = (d.kinderen ?? 0) > 0;
  if (d.volwassenen === 1) return kids ? "alleen_kids" : "alleen";
  return kids ? "partner_kids" : "stel";
}

function KaartBtn({
  selected,
  onClick,
  children,
  groot,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  groot?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex-1 min-w-[140px] px-4 rounded-xl border-[1.5px] font-body font-medium transition-all duration-150 text-left ${
        groot ? "min-h-[60px] py-4 text-base" : "min-h-[52px] py-3.5 text-sm"
      } ${
        selected
          ? "bg-green-light border-accent text-primary shadow-card"
          : "bg-card border-[#D9DEDC] text-text-soft hover:border-accent/60"
      }`}
    >
      {children}
    </button>
  );
}

export default function Stap1Profiel({ data, onChange }: Props) {
  const [samenstelling, setSamenstelling] = useState<Samenstelling | null>(() =>
    afleiden(data)
  );

  // Voorgevulde waarden komen na mount binnen (URL of bewaarde sessie). Zolang
  // er lokaal nog niets gekozen is, de kaart daaruit overnemen.
  useEffect(() => {
    if (samenstelling === null) {
      const a = afleiden(data);
      if (a) setSamenstelling(a);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.volwassenen, data.kinderen]);

  const kiesAlleen = () => {
    setSamenstelling("alleen");
    onChange({
      volwassenen: 1,
      kinderen: 0,
      salaris2: "",
      salaris2InclVakantiegeld: false,
      salaris2InclDertiende: false,
    });
  };
  const kiesStel = () => {
    setSamenstelling("stel");
    onChange({ volwassenen: 2, kinderen: 0 });
  };
  const kiesPartnerKids = () => {
    setSamenstelling("partner_kids");
    onChange({
      volwassenen: 2,
      kinderen: (data.kinderen ?? 0) > 0 ? data.kinderen : null,
    });
  };
  const kiesAlleenKids = () => {
    setSamenstelling("alleen_kids");
    onChange({
      volwassenen: 1,
      kinderen: (data.kinderen ?? 0) > 0 ? data.kinderen : null,
      salaris2: "",
      salaris2InclVakantiegeld: false,
      salaris2InclDertiende: false,
    });
  };

  const toonKinderaantal =
    samenstelling === "partner_kids" || samenstelling === "alleen_kids";

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
        Met wie vergelijk je jouw huishouden?
      </h2>
      <p className="text-text-soft font-body font-light text-base mb-8">
        We vergelijken je met huishoudens die zoveel mogelijk op het jouwe
        lijken.
      </p>

      <fieldset className="mb-8">
        <legend className="font-body font-medium text-primary text-sm mb-3">
          Met wie woon je?
        </legend>
        <div className="flex flex-wrap gap-3">
          <KaartBtn groot selected={samenstelling === "alleen"} onClick={kiesAlleen}>
            Alleen
          </KaartBtn>
          <KaartBtn groot selected={samenstelling === "stel"} onClick={kiesStel}>
            Met mijn partner
          </KaartBtn>
          <KaartBtn
            groot
            selected={samenstelling === "partner_kids"}
            onClick={kiesPartnerKids}
          >
            Met partner en kind(eren)
          </KaartBtn>
          <KaartBtn
            groot
            selected={samenstelling === "alleen_kids"}
            onClick={kiesAlleenKids}
          >
            Alleen met kind(eren)
          </KaartBtn>
        </div>
      </fieldset>

      {toonKinderaantal && (
        <fieldset className="mb-8">
          <legend className="font-body font-medium text-primary text-sm mb-3">
            Hoeveel kinderen wonen thuis?
          </legend>
          <div className="flex flex-wrap gap-3">
            {(
              [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3 of meer", value: 3 },
              ] as { label: string; value: KinderenAantal }[]
            ).map((opt) => (
              <KaartBtn
                key={opt.value}
                selected={data.kinderen === opt.value}
                onClick={() => onChange({ kinderen: opt.value })}
              >
                {opt.label}
              </KaartBtn>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="mb-2">
        <legend className="font-body font-medium text-primary text-sm mb-3">
          Woon je in een koop- of huurwoning?
        </legend>
        <div className="flex flex-wrap gap-3">
          <KaartBtn
            selected={data.woonsituatie === "koop"}
            onClick={() => onChange({ woonsituatie: "koop" })}
          >
            Koopwoning
          </KaartBtn>
          <KaartBtn
            selected={data.woonsituatie === "huur"}
            onClick={() => onChange({ woonsituatie: "huur" })}
          >
            Huurwoning
          </KaartBtn>
        </div>
      </fieldset>
    </div>
  );
}
