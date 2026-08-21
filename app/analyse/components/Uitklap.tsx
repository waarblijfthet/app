"use client";

import { useState } from "react";

interface Props {
  /** Tekst op de knop als de sectie dicht is. */
  titel: string;
  /** Tekst op de knop als de sectie open is. */
  titelOpen?: string;
  /** Korte regel boven de knop, alleen als de vraag uitleg nodig heeft. */
  intro?: string;
  children: React.ReactNode;
}

/**
 * Optionele informatie pas tonen wanneer die relevant is (21-aug-2026).
 * Standaard dicht, want de meerderheid hoeft hier niet over na te denken.
 */
export default function Uitklap({ titel, titelOpen, intro, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      {intro && (
        <p className="font-body font-medium text-primary text-sm mb-2">{intro}</p>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 text-sm font-body font-medium text-accent hover:text-primary transition-colors"
      >
        <span
          className={`transition-transform duration-200 text-xs ${
            open ? "rotate-90" : ""
          }`}
        >
          &#9654;
        </span>
        {open ? (titelOpen ?? "Verbergen") : titel}
      </button>
      {open && <div className="mt-4 space-y-5">{children}</div>}
    </div>
  );
}
