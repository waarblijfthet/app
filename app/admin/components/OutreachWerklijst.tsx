"use client";

import { useCallback, useEffect, useState } from "react";
import Badge from "@/app/admin/ui/Badge";
import {
  DOELGROEP_LABEL,
  DOELGROEP_KLEUR,
  REACTIE_LABEL,
  REACTIE_VARIANT,
  Reactie,
} from "@/lib/outreach/labels";
import { berekenWerkvoorraad } from "@/lib/outreach/werkvoorraad";
import { OutreachContact } from "@/lib/outreach/types";

interface WeekBudget {
  verstuurd: number;
  budget: number;
  resterend: number;
}

interface Props {
  onOpenContact: (id: string) => void;
  onVersturenPreview: (ids: string[], type: "eerste" | "followup") => void;
  onPsZinModus: () => void;
  verversTeller: number;
}

function dagenGeleden(iso: string | null): number {
  if (!iso) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
}

/**
 * Werklijst: standaardweergave van /admin/outreach. Vier stapels in de
 * volgorde waarin ze afgehandeld worden, elk inklapbaar met een aantal.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 5a.
 *
 * Belangrijk: de stapel "Gemarkeerd als gereageerd" werkt op de handmatig
 * gezette status. Er is geen mailintegratie (dat is sectie 9, een latere
 * stap), dus deze werklijst kan geen replies zien, alleen tonen wat Jarno
 * zelf al heeft aangevinkt.
 */
export default function OutreachWerklijst({
  onOpenContact,
  onVersturenPreview,
  onPsZinModus,
  verversTeller,
}: Props) {
  const [contacten, setContacten] = useState<OutreachContact[]>([]);
  const [budget, setBudget] = useState<WeekBudget | null>(null);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [bezig, setBezig] = useState<string | null>(null);

  const [open, setOpen] = useState({
    gereageerd: true,
    followupRijp: true,
    klaar: true,
    wachten: false,
  });

  const laadData = useCallback(async () => {
    setLaden(true);
    setFout(null);
    try {
      const [contactenRes, budgetRes] = await Promise.all([
        fetch("/api/admin/outreach"),
        fetch("/api/admin/outreach/weekbudget"),
      ]);
      const contactenData = await contactenRes.json();
      if (!contactenRes.ok) throw new Error(contactenData?.error ?? "Kon contacten niet laden.");
      const budgetData = await budgetRes.json();
      if (!budgetRes.ok) throw new Error(budgetData?.error ?? "Kon weekbudget niet laden.");
      setContacten(Array.isArray(contactenData) ? contactenData : []);
      setBudget(budgetData);
    } catch (e) {
      setFout(e instanceof Error ? e.message : "Kon de werklijst niet laden.");
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => { laadData(); }, [laadData, verversTeller]);

  async function zetReactie(id: string, reactie: Reactie) {
    setBezig(id);
    try {
      await fetch("/api/admin/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, reactie }),
      });
      await laadData();
    } finally {
      setBezig(null);
    }
  }

  // Zelfde berekening als /api/admin/vandaag gebruikt voor blok 1 en 2, zie
  // lib/outreach/werkvoorraad.ts (docs/admin-redesign-30-jul-2026.md sectie 6).
  const { stapels, wachtMail2, wachtMail3, zonderPsZin, vroegsteWachtDagen } =
    berekenWerkvoorraad(contacten);

  if (laden) {
    return <p className="text-text-muted text-sm">Werklijst laden...</p>;
  }

  return (
    <div className="space-y-4">
      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}

      {budget && (
        <div className="flex items-center justify-between text-sm text-text-soft bg-[#F5F0E8] rounded-lg px-4 py-2.5">
          <span>
            Deze week: <span className="font-medium text-primary">{budget.verstuurd} van {budget.budget}</span> verstuurd
          </span>
          <span className="text-text-muted text-xs">{budget.resterend} nog te versturen deze week</span>
        </div>
      )}

      {/* Stapel 1: gemarkeerd als gereageerd */}
      <section className="card-base overflow-hidden">
        <button
          onClick={() => setOpen((o) => ({ ...o, gereageerd: !o.gereageerd }))}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-body font-semibold text-primary text-sm">
            Gemarkeerd als gereageerd, nog niet afgehandeld
          </span>
          <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">{stapels.gereageerd.length}</span>
        </button>
        {open.gereageerd && (
          <div className="border-t border-[#F0F3F1] divide-y divide-[#F0F3F1]">
            {stapels.gereageerd.length === 0 && (
              <p className="px-4 py-3 text-sm text-text-muted">Niets gemarkeerd als gereageerd.</p>
            )}
            {stapels.gereageerd.map((c) => (
              <div key={c.id} className="px-4 py-3 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[180px]">
                  <p className="text-sm font-medium text-primary">{c.naam}</p>
                  <p className="text-xs text-text-muted">
                    <Badge kleurOverride={DOELGROEP_KLEUR[c.doelgroep]} className="mr-1.5">
                      {DOELGROEP_LABEL[c.doelgroep] ?? c.doelgroep}
                    </Badge>
                    {c.plaats && `${c.plaats} · `}
                    mail {(c.followups ?? 0) + 1}, {dagenGeleden(c.gereageerd_at ?? c.verstuurd_at)} dagen geleden
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(["positief", "neutraal", "negatief"] as Reactie[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => zetReactie(c.id, r)}
                      disabled={bezig === c.id}
                      className={c.reactie === r ? "" : "opacity-50 hover:opacity-100"}
                    >
                      <Badge variant={c.reactie === r ? REACTIE_VARIANT[r] : "neutraal"}>{REACTIE_LABEL[r]}</Badge>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onOpenContact(c.id)}
                  className="text-xs border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                >
                  Openen
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Stapel 2: follow-up rijp */}
      <section className="card-base overflow-hidden">
        <button
          onClick={() => setOpen((o) => ({ ...o, followupRijp: !o.followupRijp }))}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-body font-semibold text-primary text-sm">Follow-up rijp</span>
          <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">{stapels.followupRijp.length}</span>
        </button>
        {open.followupRijp && (
          <div className="border-t border-[#F0F3F1] px-4 py-3">
            {stapels.followupRijp.length === 0 ? (
              <p className="text-sm text-text-muted">Niemand rijp voor een follow-up.</p>
            ) : (
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-text-soft">
                  {wachtMail2} contact{wachtMail2 === 1 ? "" : "en"} wachten op mail 2, {wachtMail3} op mail 3
                </p>
                <button
                  onClick={() => onVersturenPreview(stapels.followupRijp.map((c) => c.id), "followup")}
                  className="text-xs border border-primary text-primary px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                >
                  Bekijken en versturen
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Stapel 3: klaar om te versturen */}
      <section className="card-base overflow-hidden">
        <button
          onClick={() => setOpen((o) => ({ ...o, klaar: !o.klaar }))}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-body font-semibold text-primary text-sm">
            Klaar om te versturen{budget ? `, nog ${budget.resterend} deze week` : ""}
          </span>
          <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">{stapels.klaarOmTeVersturen.length}</span>
        </button>
        {open.klaar && (
          <div className="border-t border-[#F0F3F1] px-4 py-3">
            {stapels.klaarOmTeVersturen.length === 0 ? (
              <p className="text-sm text-text-muted">Geen nieuwe contacten klaar om te versturen.</p>
            ) : (
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm text-text-soft">
                  {stapels.klaarOmTeVersturen.length} nieuwe contact{stapels.klaarOmTeVersturen.length === 1 ? "" : "en"}
                  {zonderPsZin > 0 && `, waarvan ${zonderPsZin} zonder ps-zin`}
                </p>
                <div className="flex gap-2">
                  {zonderPsZin > 0 && (
                    <button
                      onClick={onPsZinModus}
                      className="text-xs border border-[#E6E9E7] text-text-soft px-3 py-1.5 rounded hover:border-primary transition-colors whitespace-nowrap"
                    >
                      Ps-zinnen schrijven
                    </button>
                  )}
                  <button
                    onClick={() => onVersturenPreview(stapels.klaarOmTeVersturen.map((c) => c.id), "eerste")}
                    className="text-xs border border-primary text-primary px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                  >
                    Selecteren en versturen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Stapel 4: wachten, standaard ingeklapt */}
      <section className="card-base overflow-hidden">
        <button
          onClick={() => setOpen((o) => ({ ...o, wachten: !o.wachten }))}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-body font-semibold text-primary text-sm">Wachten</span>
          <span className="text-xs bg-[#F0F3F1] text-text-soft rounded-full px-2 py-0.5">{stapels.wachten.length}</span>
        </button>
        {open.wachten && (
          <div className="border-t border-[#F0F3F1] px-4 py-3">
            <p className="text-sm text-text-muted">
              {stapels.wachten.length} contact{stapels.wachten.length === 1 ? "" : "en"}, follow-up nog niet rijp.
              {vroegsteWachtDagen !== null && ` Vroegste over ${vroegsteWachtDagen} dag${vroegsteWachtDagen === 1 ? "" : "en"}.`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
