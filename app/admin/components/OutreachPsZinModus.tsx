"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DOELGROEP_LABEL } from "@/lib/outreach/labels";
import { OutreachContact } from "@/lib/outreach/types";

interface Props {
  onSluiten: () => void;
}

function heeftPsZin(c: OutreachContact): boolean {
  return Boolean(c.ps_zin && c.ps_zin.trim());
}

/**
 * Ps-zin-modus: aparte weergave om tien contacten achter elkaar van een
 * persoonlijke zin te voorzien, zonder terug te hoeven naar de tabel.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 5a, "ps-zinnen schrijven is
 * een eigen modus".
 */
export default function OutreachPsZinModus({ onSluiten }: Props) {
  const [contacten, setContacten] = useState<OutreachContact[]>([]);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [tekst, setTekst] = useState("");
  const [opslaan, setOpslaan] = useState(false);

  const laad = useCallback(async () => {
    setLaden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Kon contacten niet laden.");
      const nieuw: OutreachContact[] = (Array.isArray(data) ? data : []).filter(
        (c: OutreachContact) => c.status === "nieuw" && !c.archived_at && !c.gestopt
      );
      setContacten(nieuw);
      const eersteZonder = nieuw.findIndex((c) => !heeftPsZin(c));
      setIndex(eersteZonder === -1 ? 0 : eersteZonder);
    } catch (e) {
      setFout(e instanceof Error ? e.message : "Kon contacten niet laden.");
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => { laad(); }, [laad]);

  const huidige = contacten[index] ?? null;

  useEffect(() => {
    setTekst(huidige?.ps_zin ?? "");
  }, [huidige?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const resterendZonderPsZin = useMemo(
    () => contacten.filter((c) => !heeftPsZin(c)).length,
    [contacten]
  );

  function volgendeZonderPsZin(vanaf: number): number | null {
    for (let i = vanaf + 1; i < contacten.length; i++) {
      if (!heeftPsZin(contacten[i])) return i;
    }
    for (let i = 0; i <= vanaf; i++) {
      if (!heeftPsZin(contacten[i])) return i;
    }
    return null;
  }

  async function opslaanEnVolgende() {
    if (!huidige) return;
    setOpslaan(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: huidige.id, ps_zin: tekst }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Opslaan is mislukt.");
      setContacten((prev) => prev.map((c) => (c.id === huidige.id ? { ...c, ps_zin: tekst || null } : c)));
      const volgende = volgendeZonderPsZin(index);
      if (volgende !== null) setIndex(volgende);
    } catch (e) {
      setFout(e instanceof Error ? e.message : "Opslaan is mislukt.");
    } finally {
      setOpslaan(false);
    }
  }

  function overslaan() {
    const volgende = volgendeZonderPsZin(index);
    if (volgende !== null) setIndex(volgende);
  }

  if (laden) return <p className="text-text-muted text-sm">Laden...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">Ps-zinnen schrijven</h3>
          <p className="text-text-muted text-sm mt-0.5">
            {contacten.length === 0
              ? "Geen nieuwe contacten."
              : `${index + 1} van ${contacten.length} · ${resterendZonderPsZin} nog zonder ps-zin`}
          </p>
        </div>
        <button
          onClick={onSluiten}
          className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft hover:border-primary"
        >
          Terug naar werklijst
        </button>
      </div>

      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}

      {!huidige && contacten.length === 0 && (
        <p className="text-sm text-text-muted">Niets om ps-zinnen voor te schrijven.</p>
      )}

      {huidige && (
        <div className="card-base p-5 grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-primary">{huidige.naam}</p>
              <p className="text-xs text-text-muted">
                {DOELGROEP_LABEL[huidige.doelgroep] ?? huidige.doelgroep}
                {huidige.plaats && ` · ${huidige.plaats}`}
              </p>
            </div>
            {huidige.website && (
              <div>
                <label className="block text-xs text-text-muted mb-1">Website</label>
                <a href={huidige.website} target="_blank" rel="noreferrer" className="text-sm text-accent underline break-all">
                  {huidige.website}
                </a>
              </div>
            )}
            {huidige.context ? (
              <details open className="text-xs text-text-muted">
                <summary className="cursor-pointer font-medium text-text-soft">Gevonden context</summary>
                <p className="mt-1 whitespace-pre-wrap">{huidige.context}</p>
              </details>
            ) : (
              <p className="text-xs text-text-muted">Geen context gevonden voor dit contact.</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-xs text-text-muted mb-1">Persoonlijke zin</label>
            <textarea
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
              rows={8}
              placeholder="Bijv. iets concreets van hun site"
              className="flex-1 w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm resize-none"
            />
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={overslaan}
                disabled={opslaan}
                className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft hover:border-primary disabled:opacity-50"
              >
                Volgende zonder ps-zin
              </button>
              <button
                onClick={opslaanEnVolgende}
                disabled={opslaan}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
              >
                {opslaan ? "Opslaan..." : "Opslaan en volgende"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
