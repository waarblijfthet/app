"use client";

import { useEffect, useState } from "react";
import { parseEur } from "@/lib/quiz-types";

interface EuroInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  /** Tweede regel, alleen op de eerste plek waar schatten uitleg nodig heeft. */
  hint2?: string;
  label?: string;
  id?: string;
  className?: string;
  /** Boven dit bedrag stelt de analyse rustig de vraag of het klopt. */
  plausibelTot?: number;
  /** Optionele keuze tussen maand en jaar, boven het veld. */
  periode?: {
    waarde: "maand" | "jaar";
    onChange: (v: "maand" | "jaar") => void;
  };
  /** Korte regel onder het veld, bijvoorbeeld het omgerekende maandbedrag. */
  onderschrift?: string;
}

export default function EuroInput({
  value,
  onChange,
  placeholder = "0",
  hint,
  hint2,
  label,
  id,
  className = "",
  plausibelTot,
  periode,
  onderschrift,
}: EuroInputProps) {
  // Inline validatie, maar pas nadat iemand klaar is met typen of het veld
  // verlaat. Tijdens het typen is 17 nog even 1700000 onderweg.
  const [rustig, setRustig] = useState(true);
  const bedrag = parseEur(value);

  useEffect(() => {
    if (!value) return;
    setRustig(false);
    const t = setTimeout(() => setRustig(true), 900);
    return () => clearTimeout(t);
  }, [value]);

  const twijfel =
    !!plausibelTot && rustig && bedrag > plausibelTot;

  return (
    <div className={className}>
      {periode && (
        <div className="flex gap-2 mb-2">
          {(["maand", "jaar"] as const).map((per) => (
            <button
              key={per}
              type="button"
              onClick={() => periode.onChange(per)}
              className={`text-xs px-3 py-1.5 rounded-lg font-body font-medium transition-all ${
                periode.waarde === per
                  ? "bg-primary text-white"
                  : "bg-[#E6E9E7] text-text-soft"
              }`}
            >
              Per {per}
            </button>
          ))}
        </div>
      )}

      {label && (
        <label
          htmlFor={id}
          className="block font-body font-medium text-primary text-sm mb-2 text-left"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-body text-base select-none pointer-events-none">
          &euro;
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onBlur={() => setRustig(true)}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
          placeholder={placeholder}
          className={`w-full min-h-[52px] bg-white border rounded-[10px] pl-8 pr-4 py-3.5 text-base text-primary font-body placeholder:text-text-muted focus:outline-none transition-colors ${
            twijfel
              ? "border-[#E8A830] focus:border-[#E8A830]"
              : "border-[rgba(26,70,42,0.18)] focus:border-accent"
          }`}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>

      {hint && (
        <p id={`${id}-hint`} className="text-text-muted font-body text-xs mt-2">
          {hint}
        </p>
      )}
      {hint2 && (
        <p className="text-text-muted font-body text-xs mt-1">{hint2}</p>
      )}
      {onderschrift && (
        <p className="font-body text-xs text-accent font-medium mt-1.5">
          {onderschrift}
        </p>
      )}
      {twijfel && (
        <p className="font-body text-xs text-[#92600A] mt-2">
          Klopt dit bedrag? Je kunt gewoon doorgaan, ik reken met wat je invult.
        </p>
      )}
    </div>
  );
}
