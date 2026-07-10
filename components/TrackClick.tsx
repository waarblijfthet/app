"use client";

import { logGebeurtenis, type Pakket } from "@/lib/track";

/**
 * Dunne client-wrapper die een klik op de kinderen logt zonder de layout
 * te beïnvloeden (display: contents). Gebruikt op de aanbodpagina rond
 * kaarten en CTA-knoppen, zodat de pagina zelf een server-component blijft.
 */
export function TrackClick({
  gebeurtenis,
  pakket,
  children,
}: {
  gebeurtenis: string;
  pakket?: Pakket | string;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{ display: "contents" }}
      onClick={() => logGebeurtenis(gebeurtenis, { pakket })}
    >
      {children}
    </span>
  );
}
