"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import DataTabel, { DataTabelKolom } from "@/app/admin/ui/DataTabel";
import Badge from "@/app/admin/ui/Badge";
import ContactenDetailpaneel from "./ContactenDetailpaneel";
import {
  SOORTEN,
  SOORT_LABEL,
  SOORT_KLEUR,
  faseOpties,
  isVerlopen,
} from "@/lib/contacten/labels";
import { Contact } from "@/lib/contacten/types";

type ChipFilter = "alle" | "verwijzer" | "klant" | "lead" | "actie";

const CHIPS: { value: ChipFilter; label: string }[] = [
  { value: "alle", label: "Alles" },
  { value: "verwijzer", label: "Verwijzers" },
  { value: "klant", label: "Klanten" },
  { value: "lead", label: "Leads" },
  { value: "actie", label: "Actie nodig" },
];

function datumKort(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function dagenGeleden(iso: string | null): number | null {
  if (!iso) return null;
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
}

function relatieveTijd(iso: string | null): string {
  const dagen = dagenGeleden(iso);
  if (dagen === null) return "Nog geen contact";
  if (dagen === 0) return "Vandaag";
  if (dagen === 1) return "Gisteren";
  return `${dagen} dagen geleden`;
}

export default function ContactenTabblad() {
  const [contacten, setContacten] = useState<Contact[]>([]);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);

  const [chip, setChip] = useState<ChipFilter>("alle");
  const [zoekInvoer, setZoekInvoer] = useState("");
  const [zoekterm, setZoekterm] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setZoekterm(zoekInvoer.trim()), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [zoekInvoer]);

  const [detailId, setDetailId] = useState<string | null>(null);

  // Vanuit outreach, aanvragen of leads komt "doorzetten naar contacten"
  // hier terecht als /admin/contacten?open=<id>, om het detailpaneel direct
  // te openen (sectie 7). window.location.search in plaats van
  // useSearchParams, zodat deze client-only pagina niet de hele route
  // dwingt tot een Suspense-boundary voor één eenmalige leesactie.
  useEffect(() => {
    const open = new URLSearchParams(window.location.search).get("open");
    if (open) setDetailId(open);
  }, []);

  // Vanuit het Vandaag-dashboard komt "volgende actie rijp" hier terecht als
  // /admin/contacten?chip=actie, zelfde window.location.search-patroon als
  // hierboven.
  useEffect(() => {
    const chipParam = new URLSearchParams(window.location.search).get("chip");
    if (chipParam && CHIPS.some((c) => c.value === chipParam)) {
      setChip(chipParam as ChipFilter);
    }
  }, []);

  const [toonToevoegen, setToonToevoegen] = useState(false);
  const [nieuw, setNieuw] = useState({
    naam: "", email: "", telefoon: "", praktijk: "", website: "", plaats: "",
    soort: "lead", fase: "", doelgroep: "",
    volgende_actie: "", volgende_actie_op: "",
  });
  const [toevoegen, setToevoegen] = useState(false);

  const [migreren, setMigreren] = useState(false);

  const laadContacten = useCallback(async () => {
    setLaden(true);
    try {
      const sp = new URLSearchParams();
      if (chip !== "alle" && chip !== "actie") sp.set("soort", chip);
      if (chip === "actie") sp.set("actie", "1");
      if (zoekterm) sp.set("zoekterm", zoekterm);
      const res = await fetch(`/api/admin/contacten?${sp.toString()}`);
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Kon contacten niet laden."); return; }
      setContacten(Array.isArray(data) ? data : []);
    } catch {
      setFout("Kon contacten niet laden (netwerkfout).");
    } finally {
      setLaden(false);
    }
  }, [chip, zoekterm]);

  useEffect(() => { laadContacten(); }, [laadContacten]);

  function toonMelding(tekst: string) {
    setMelding(tekst);
    setTimeout(() => setMelding(null), 5000);
  }

  async function voegToe(e: React.FormEvent) {
    e.preventDefault();
    setToevoegen(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/contacten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nieuw,
          fase: nieuw.fase || undefined,
          doelgroep: nieuw.soort === "verwijzer" ? nieuw.doelgroep : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.bestaandContactId) {
          setFout(data.error);
          setDetailId(data.bestaandContactId);
        } else {
          setFout(data.error ?? "Toevoegen is mislukt.");
        }
        return;
      }
      setNieuw({ naam: "", email: "", telefoon: "", praktijk: "", website: "", plaats: "", soort: "lead", fase: "", doelgroep: "", volgende_actie: "", volgende_actie_op: "" });
      setToonToevoegen(false);
      await laadContacten();
      toonMelding(`${data.naam} toegevoegd.`);
    } finally {
      setToevoegen(false);
    }
  }

  async function doeMigratie() {
    setMigreren(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/contacten/migreren", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Migratie is mislukt."); return; }
      toonMelding(`${data.aangemaakt} contact${data.aangemaakt === 1 ? "" : "en"} aangemaakt, ${data.overgeslagen} overgeslagen (al bestonden).`);
      await laadContacten();
    } catch {
      setFout("Migratie is mislukt (netwerkfout).");
    } finally {
      setMigreren(false);
    }
  }

  const kolommen: DataTabelKolom<Contact>[] = [
    {
      key: "contact",
      header: "Contact",
      sorteerWaarde: (c) => c.naam,
      render: (c) => (
        <div>
          <p className="font-medium text-primary">{c.naam}</p>
          <p className="text-text-muted text-xs">{c.praktijk ?? c.email}</p>
        </div>
      ),
    },
    {
      key: "soort",
      header: "Soort",
      sorteerWaarde: (c) => SOORT_LABEL[c.soort] ?? c.soort,
      render: (c) => <Badge kleurOverride={SOORT_KLEUR[c.soort]}>{SOORT_LABEL[c.soort] ?? c.soort}</Badge>,
    },
    {
      key: "fase",
      header: "Fase",
      sorteerWaarde: (c) => c.fase,
      render: (c) => <Badge>{c.fase}</Badge>,
    },
    {
      key: "plaats",
      header: "Plaats",
      sorteerWaarde: (c) => c.plaats ?? "\uffff",
      render: (c) => <span className="text-text-soft text-sm">{c.plaats ?? "\u2014"}</span>,
    },
    {
      key: "volgende_actie",
      header: "Volgende actie",
      sorteerWaarde: (c) => c.volgende_actie_op ?? "\uffff",
      render: (c) => {
        if (!c.volgende_actie && !c.volgende_actie_op) {
          return <span className="text-text-muted text-sm">Geen</span>;
        }
        const verlopen = isVerlopen(c);
        return (
          <div>
            {c.volgende_actie && <p className={`text-sm ${verlopen ? "text-danger font-medium" : "text-text-soft"}`}>{c.volgende_actie}</p>}
            {c.volgende_actie_op && (
              <p className={`text-xs ${verlopen ? "text-danger" : "text-text-muted"}`}>{datumKort(c.volgende_actie_op)}</p>
            )}
          </div>
        );
      },
    },
    {
      key: "laatste_contact",
      header: "Laatste contact",
      sorteerWaarde: (c) => c.laatste_contact_at ?? "",
      render: (c) => <span className="text-text-muted text-xs">{relatieveTijd(c.laatste_contact_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-primary">Contacten</h2>
          <p className="text-text-muted text-xs mt-1">
            Eén rij per persoon, ongeacht of het een verwijzer, klant of lead is.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={doeMigratie}
            disabled={migreren}
            className="text-sm px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            {migreren ? "Migreren..." : "Klanten migreren vanuit aanvragen"}
          </button>
          <button onClick={() => setToonToevoegen((v) => !v)} className="btn-primary text-sm px-4 py-2">
            + Contact toevoegen
          </button>
        </div>
      </div>

      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}
      {melding && <div className="bg-success-bg text-success text-sm rounded-md px-4 py-3">{melding}</div>}

      {toonToevoegen && (
        <form onSubmit={voegToe} className="card-base p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-text-muted mb-1">Naam</label>
            <input type="text" required value={nieuw.naam} onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">E-mailadres</label>
            <input type="email" required value={nieuw.email} onChange={(e) => setNieuw({ ...nieuw, email: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Telefoon</label>
            <input type="text" value={nieuw.telefoon} onChange={(e) => setNieuw({ ...nieuw, telefoon: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Praktijk</label>
            <input type="text" value={nieuw.praktijk} onChange={(e) => setNieuw({ ...nieuw, praktijk: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Website</label>
            <input type="text" value={nieuw.website} onChange={(e) => setNieuw({ ...nieuw, website: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Plaats</label>
            <input type="text" value={nieuw.plaats} onChange={(e) => setNieuw({ ...nieuw, plaats: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Soort</label>
            <select value={nieuw.soort} onChange={(e) => setNieuw({ ...nieuw, soort: e.target.value, fase: "" })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white">
              {SOORTEN.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Fase</label>
            <select value={nieuw.fase} onChange={(e) => setNieuw({ ...nieuw, fase: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white">
              <option value="">Standaard</option>
              {faseOpties(nieuw.soort).map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          {nieuw.soort === "verwijzer" && (
            <div>
              <label className="block text-xs text-text-muted mb-1">Doelgroep</label>
              <input type="text" value={nieuw.doelgroep} onChange={(e) => setNieuw({ ...nieuw, doelgroep: e.target.value })}
                placeholder="relatietherapeuten"
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
            </div>
          )}
          <div>
            <label className="block text-xs text-text-muted mb-1">Volgende actie</label>
            <input type="text" value={nieuw.volgende_actie} onChange={(e) => setNieuw({ ...nieuw, volgende_actie: e.target.value })}
              placeholder="Bellen over verwijsafspraak"
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">Op datum</label>
            <input type="date" value={nieuw.volgende_actie_op} onChange={(e) => setNieuw({ ...nieuw, volgende_actie_op: e.target.value })}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setToonToevoegen(false)} className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft">
              Annuleren
            </button>
            <button type="submit" disabled={toevoegen} className="btn-primary text-sm px-4 py-2 disabled:opacity-50">
              {toevoegen ? "Toevoegen..." : "Toevoegen"}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {CHIPS.map((c) => (
          <button
            key={c.value}
            onClick={() => setChip(c.value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              chip === c.value ? "bg-primary text-white border-primary" : "bg-white text-text-soft border-[#E6E9E7] hover:border-primary"
            }`}
          >
            {c.label}
          </button>
        ))}
        <input
          type="text"
          value={zoekInvoer}
          onChange={(e) => setZoekInvoer(e.target.value)}
          placeholder="Zoek naam, e-mail, praktijk of plaats"
          className="text-xs px-3 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft w-64"
        />
      </div>

      <DataTabel
        data={contacten}
        kolommen={kolommen}
        rijSleutel={(c) => c.id}
        laden={laden}
        legeStaatTitel="Geen contacten gevonden"
        legeStaatUitleg="Pas de filters aan of voeg een nieuw contact toe."
        onRijKlik={(c) => setDetailId(c.id)}
      />

      <ContactenDetailpaneel
        contactId={detailId}
        onClose={() => setDetailId(null)}
        onWijziging={laadContacten}
      />
    </div>
  );
}
