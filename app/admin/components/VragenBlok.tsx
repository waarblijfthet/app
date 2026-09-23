"use client";

import { useState } from "react";

export interface OpenVraag {
  contactId: string;
  email: string;
  token: string | null;
  uiterlijk: string | null;
  vraag: string;
  gesteld: string;
  telaat: boolean;
}

export interface VragenData {
  status: { aan: boolean; reden: "aan" | "handmatig-uit" | "vol"; dezeWeek: number; max: number };
  beantwoordAfgelopenWeek: number;
  open: OpenVraag[];
}

function datumKort(iso: string | null): string {
  if (!iso) return "geen datum";
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function geleden(iso: string): string {
  const uren = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
  if (uren < 1) return "net binnen";
  if (uren < 24) return `${uren} uur geleden`;
  const dagen = Math.floor(uren / 24);
  return `${dagen} dag${dagen === 1 ? "" : "en"} geleden`;
}

/**
 * Vragen via de analyse (23-sep-2026), bovenaan het Vandaag-dashboard. Hier
 * ziet Jarno in één oogopslag welke vragen open staan, wanneer ze uiterlijk
 * beantwoord moeten zijn, of de stap aan staat en hoe vol de week is.
 * Beantwoorden gebeurt in de eigen mailbox; "Beantwoord" legt alleen vast
 * dat het gedaan is (POST /api/admin/vragen/beantwoord).
 */
export default function VragenBlok({ vragen }: { vragen: VragenData }) {
  const [open, setOpen] = useState<OpenVraag[]>(vragen.open);
  const [beantwoord, setBeantwoord] = useState(vragen.beantwoordAfgelopenWeek);
  const [bezig, setBezig] = useState<string | null>(null);
  const [fout, setFout] = useState("");

  async function markeer(contactId: string) {
    setBezig(contactId);
    setFout("");
    try {
      const res = await fetch("/api/admin/vragen/beantwoord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: contactId }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error ?? "Markeren mislukt");
      setOpen((lijst) => lijst.filter((v) => v.contactId !== contactId));
      setBeantwoord((n) => n + 1);
    } catch (e) {
      setFout(e instanceof Error ? e.message : "Markeren mislukt");
    }
    setBezig(null);
  }

  const { status } = vragen;
  const statusTekst = status.aan
    ? `Vraagstap staat aan · ${status.dezeWeek} van ${status.max} in de afgelopen 7 dagen`
    : status.reden === "vol"
    ? `Vraagstap staat tijdelijk uit: ${status.dezeWeek} van ${status.max} in 7 dagen bereikt`
    : "Vraagstap staat uit (VRAAGSTAP_UIT=1 in Vercel)";
  const teLaat = open.filter((v) => v.telaat).length;

  return (
    <section className={`card-base overflow-hidden ${open.length ? "border border-accent/30" : ""}`}>
      <div className="px-4 py-3 border-b border-[#F0F3F1] flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-body font-semibold text-primary text-sm">
          Vragen via de analyse
          {open.length > 0 && (
            <span className="ml-2 rounded-full bg-accent text-white text-xs px-2 py-0.5">{open.length} open</span>
          )}
          {teLaat > 0 && (
            <span className="ml-2 rounded-full bg-danger-bg text-danger text-xs px-2 py-0.5">{teLaat} te laat</span>
          )}
        </h2>
        <p className={`text-xs ${status.aan ? "text-text-muted" : "text-warning font-medium"}`}>{statusTekst}</p>
      </div>

      {open.length === 0 ? (
        <p className="px-4 py-3 text-sm text-text-muted">
          Geen open vragen. {beantwoord > 0 ? `${beantwoord} beantwoord in de afgelopen 7 dagen.` : ""}
        </p>
      ) : (
        <ul className="divide-y divide-[#F0F3F1]">
          {open.map((v) => (
            <li key={v.contactId} className="px-4 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-primary font-medium">{v.vraag}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {v.email} · {geleden(v.gesteld)} ·{" "}
                    <span className={v.telaat ? "text-danger font-medium" : ""}>
                      uiterlijk {datumKort(v.uiterlijk)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0">
                  {v.token && (
                    <a href={`/resultaat/${v.token}`} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                      Analyse
                    </a>
                  )}
                  <a href={`/admin/contacten?open=${v.contactId}`} className="text-accent hover:underline">
                    Contact
                  </a>
                  <button
                    type="button"
                    onClick={() => markeer(v.contactId)}
                    disabled={bezig === v.contactId}
                    className="rounded-lg border border-accent px-3 py-1.5 font-medium text-accent hover:bg-accent hover:text-white disabled:opacity-50"
                  >
                    {bezig === v.contactId ? "Even…" : "Beantwoord ✓"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {open.length > 0 && (
        <p className="px-4 py-2 border-t border-[#F0F3F1] text-xs text-text-muted">
          Antwoord in je mailbox (de mail "Vraag over analyse" heeft de bezoeker als antwoordadres), klik daarna op
          Beantwoord. {beantwoord > 0 ? `${beantwoord} beantwoord in de afgelopen 7 dagen.` : ""}
        </p>
      )}
      {fout && <p className="px-4 py-2 text-xs text-danger">{fout}</p>}
    </section>
  );
}
