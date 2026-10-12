"use client";

import { logGebeurtenis } from "@/lib/track";

/**
 * Downloadlink die de klik meet (12-okt-2026): gebeurtenis "download" met het
 * bestand in meta, zodat het aantal downloads van het huishoudboekje in
 * paginagebeurtenissen staat (docs/plan-icp-vinden-12-okt-2026.md, meten 3).
 */
export default function DownloadLink({
  href,
  bestand,
  className,
  children,
}: {
  href: string;
  bestand: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      download
      className={className}
      onClick={() => logGebeurtenis("download", { meta: { bestand: bestand } })}
    >
      {children}
    </a>
  );
}
