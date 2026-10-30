"use client";

import { useState } from "react";
import { logGebeurtenis } from "@/lib/track";
import type { InzichtOptie } from "./inzichtVragen";

interface Props {
  vraag: string;
  opties: InzichtOptie[];
  /** Naam in paginagebeurtenissen, bijvoorbeeld analyse_behoefte. */
  gebeurtenis: string;
  /** Extra context in meta, naast de gekozen sleutel. */
  meta?: Record<string, unknown>;
  dankTekst?: string;
}

/**
 * Een vraag met één tik (30-okt-2026). Niet verplicht, geen e-mailadres, en
 * na de tik alleen een bedankregel. De keuze gaat als gebeurtenis naar
 * paginagebeurtenissen; /admin/analyse-verloop telt hem per bezoeker.
 */
export default function EenTikVraag({ vraag, opties, gebeurtenis, meta, dankTekst }: Props) {
  const [gekozen, setGekozen] = useState<string | null>(null);

  function kies(sleutel: string) {
    if (gekozen) return;
    setGekozen(sleutel);
    logGebeurtenis(gebeurtenis, { meta: { ...(meta ?? {}), keuze: sleutel } });
  }

  if (gekozen) {
    return (
      <p className="font-body text-sm text-text-soft leading-relaxed">
        {dankTekst ?? "Dank je. Dat helpt me bepalen wat ik hier beter kan maken."}
      </p>
    );
  }

  return (
    <div>
      <p className="font-body text-sm font-medium text-primary mb-1">{vraag}</p>
      <p className="font-body text-xs text-text-muted mb-3">Eén tik, mag ook overslaan.</p>
      <div className="space-y-2">
        {opties.map((o) => (
          <button
            key={o.sleutel}
            type="button"
            onClick={() => kies(o.sleutel)}
            className="w-full min-h-[44px] text-left rounded-xl border border-[#D9DEDC] bg-white px-4 py-2.5 font-body text-sm text-primary transition-colors hover:border-accent"
          >
            {o.tekst}
          </button>
        ))}
      </div>
    </div>
  );
}
