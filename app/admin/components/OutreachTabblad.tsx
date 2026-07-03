"use client";

import { useEffect, useState, useCallback } from "react";

interface Contact {
  id: string;
  naam: string;
  email: string;
  doelgroep: string;
  created_at: string;
  verstuurd_at: string | null;
  geopend_at: string | null;
  geklikt_at: string | null;
  bounced_at: string | null;
  gereageerd_at: string | null;
  laatste_followup_at: string | null;
  followups: number;
  ps_zin: string | null;
  status: "nieuw" | "verstuurd" | "geopend" | "geklikt" | "bounced" | "gereageerd";
}

const MAX_FOLLOWUPS = 2;
const FOLLOWUP_WACHTDAGEN = 3;

// Komt een contact in aanmerking voor een follow-up?
function followupGeschikt(c: Contact): boolean {
  if (!["verstuurd", "geopend", "geklikt"].includes(c.status)) return false;
  if ((c.followups ?? 0) >= MAX_FOLLOWUPS) return false;
  const laatste = c.laatste_followup_at ?? c.verstuurd_at;
  if (!laatste) return false;
  return (Date.now() - new Date(laatste).getTime()) / 86400000 >= FOLLOWUP_WACHTDAGEN;
}

const DOELGROEPEN: { value: string; label: string }[] = [
  { value: "relatietherapeuten", label: "Relatietherapie" },
  { value: "budgetcoaches",      label: "Budgetcoach" },
  { value: "financieel-planners", label: "Financieel planner" },
  { value: "burnout-coaches",    label: "Burnout-coach" },
];

const DOELGROEP_LABEL: Record<string, string> = Object.fromEntries(
  DOELGROEPEN.map((d) => [d.value, d.label])
);

const DOELGROEP_STYLE: Record<string, string> = {
  "relatietherapeuten":  "bg-purple-50 text-purple-700",
  "budgetcoaches":       "bg-blue-50 text-blue-700",
  "financieel-planners": "bg-amber-50 text-amber-700",
  "burnout-coaches":     "bg-orange-50 text-orange-700",
};

const STATUS_LABEL: Record<Contact["status"], string> = {
  nieuw:     "Nieuw",
  verstuurd: "Verstuurd",
  geopend:   "Geopend",
  geklikt:   "Geklikt",
  bounced:   "Bounced",
  gereageerd: "Gereageerd",
};

const STATUS_STYLE: Record<Contact["status"], string> = {
  nieuw:     "bg-gray-100 text-gray-600",
  verstuurd: "bg-blue-100 text-blue-700",
  geopend:   "bg-green-100 text-green-700",
  geklikt:   "bg-[#FFF0EB] text-[#C4603A]",
  bounced:   "bg-red-100 text-red-700",
  gereageerd: "bg-[#1C3A2A] text-white",
};

function datumTijd(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit", month: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function OutreachTabblad() {
  const [contacten, setContacten] = useState<Contact[]>([]);
  const [laden, setLaden] = useState(true);
  const [verzenden, setVerzenden] = useState<Record<string, boolean>>({});
  const [allesVerzenden, setAllesVerzenden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);
  const [filterDoelgroep, setFilterDoelgroep] = useState<string>("alle");

  // Selectie + inline bewerken
  const [selectie, setSelectie] = useState<Set<string>>(new Set());
  const [naamEdits, setNaamEdits] = useState<Record<string, string>>({});
  const [emailEdits, setEmailEdits] = useState<Record<string, string>>({});
  const [psEdits, setPsEdits] = useState<Record<string, string>>({});

  // Nieuw contact form
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [doelgroep, setDoelgroep] = useState("relatietherapeuten");
  const [toevoegen, setToevoegen] = useState(false);

  const laadContacten = useCallback(async () => {
    setLaden(true);
    try {
      const res = await fetch("/api/admin/outreach");
      const data = await res.json();
      setContacten(Array.isArray(data) ? data : []);
    } catch {
      setFout("Kon contacten niet laden.");
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => { laadContacten(); }, [laadContacten]);

  async function voegToe(e: React.FormEvent) {
    e.preventDefault();
    setToevoegen(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam.trim(), email: email.trim(), doelgroep }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      setNaam("");
      setEmail("");
      await laadContacten();
      setMelding(`${naam} toegevoegd als ${DOELGROEP_LABEL[doelgroep]}.`);
      setTimeout(() => setMelding(null), 3000);
    } finally {
      setToevoegen(false);
    }
  }

  async function verwijder(id: string, naam: string) {
    if (!confirm(`${naam} verwijderen?`)) return;
    await fetch(`/api/admin/outreach?id=${id}`, { method: "DELETE" });
    await laadContacten();
  }

  async function stuurEnkele(id: string) {
    setVerzenden((v) => ({ ...v, [id]: true }));
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const r = data.resultaten?.[0];
      if (r?.ok) {
        setMelding(`Mail verstuurd naar ${r.naam}.`);
      } else {
        setFout(`Versturen mislukt: ${r?.fout}`);
      }
      await laadContacten();
    } finally {
      setVerzenden((v) => ({ ...v, [id]: false }));
      setTimeout(() => setMelding(null), 4000);
    }
  }

  async function stuurAlle() {
    const gefilterd = zichtbareContacten.filter((c) => c.status === "nieuw");
    if (gefilterd.length === 0) { setFout("Geen nieuwe contacten om te versturen."); return; }
    const label = filterDoelgroep === "alle" ? "alle categorieën" : DOELGROEP_LABEL[filterDoelgroep];
    if (!confirm(`${gefilterd.length} e-mail(s) versturen naar ${label}?`)) return;
    setAllesVerzenden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: gefilterd.map((c) => c.id) }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      setMelding(`${geslaagd} van ${gefilterd.length} verstuurd.`);
      await laadContacten();
    } finally {
      setAllesVerzenden(false);
      setTimeout(() => setMelding(null), 5000);
    }
  }

  async function werkBij(id: string, velden: { naam?: string; email?: string; doelgroep?: string; ps_zin?: string; gereageerd?: boolean }) {
    const res = await fetch("/api/admin/outreach", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...velden }),
    });
    const data = await res.json();
    if (!res.ok) {
      setFout(data.error);
      await laadContacten(); // veld terugzetten naar opgeslagen waarde
      return;
    }
    setContacten((lijst) => lijst.map((c) => (c.id === id ? data : c)));
  }

  function wisselSelectie(id: string) {
    setSelectie((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }

  function selecteerAlles() {
    setSelectie((s) =>
      s.size === zichtbareContacten.length ? new Set() : new Set(zichtbareContacten.map((c) => c.id))
    );
  }

  async function stuurGeselecteerde() {
    const ids = zichtbareContacten
      .filter((c) => selectie.has(c.id) && c.status === "nieuw")
      .map((c) => c.id);
    if (ids.length === 0) { setFout("Geen geselecteerde nieuwe contacten om te versturen."); return; }
    if (!confirm(`${ids.length} e-mail(s) versturen?`)) return;
    setAllesVerzenden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      setMelding(`${geslaagd} van ${ids.length} verstuurd.`);
      setSelectie(new Set());
      await laadContacten();
    } finally {
      setAllesVerzenden(false);
      setTimeout(() => setMelding(null), 5000);
    }
  }

  async function markeerGereageerd(c: Contact) {
    if (!confirm(`${c.naam} heeft gereageerd? Dit stopt verdere follow-ups.`)) return;
    await werkBij(c.id, { gereageerd: true });
    setMelding(`${c.naam} gemarkeerd als gereageerd.`);
    setTimeout(() => setMelding(null), 3000);
  }

  async function stuurFollowups(ids: string[]) {
    if (ids.length === 0) { setFout("Geen contacten die nu een follow-up kunnen krijgen."); return; }
    if (!confirm(`${ids.length} follow-up(s) versturen?`)) return;
    setAllesVerzenden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, type: "followup" }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      setMelding(`${geslaagd} van ${ids.length} follow-up(s) verstuurd.`);
      setSelectie(new Set());
      await laadContacten();
    } finally {
      setAllesVerzenden(false);
      setTimeout(() => setMelding(null), 5000);
    }
  }

  const zichtbareContacten = filterDoelgroep === "alle"
    ? contacten
    : contacten.filter((c) => c.doelgroep === filterDoelgroep);

  const nieuweCount = zichtbareContacten.filter((c) => c.status === "nieuw").length;
  const geselecteerdeNieuw = zichtbareContacten.filter((c) => selectie.has(c.id) && c.status === "nieuw").length;
  const followupKandidaten = zichtbareContacten.filter(followupGeschikt);
  const geselecteerdeFollowups = followupKandidaten.filter((c) => selectie.has(c.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-primary">Outreach</h2>
          <p className="text-text-muted text-sm mt-0.5">
            {contacten.length} contacten &middot; {nieuweCount} nog niet verstuurd
            {filterDoelgroep !== "alle" && ` (${DOELGROEP_LABEL[filterDoelgroep]})`}
          </p>
        </div>
        <div className="flex gap-2">
          {geselecteerdeNieuw > 0 && (
            <button
              onClick={stuurGeselecteerde}
              disabled={allesVerzenden}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {allesVerzenden ? "Versturen..." : `Verstuur geselecteerde (${geselecteerdeNieuw})`}
            </button>
          )}
          {nieuweCount > 0 && geselecteerdeNieuw === 0 && (
            <button
              onClick={stuurAlle}
              disabled={allesVerzenden}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {allesVerzenden ? "Versturen..." : `Verstuur nieuwe (${nieuweCount})`}
            </button>
          )}
          {followupKandidaten.length > 0 && (
            <button
              onClick={() =>
                stuurFollowups(
                  (geselecteerdeFollowups.length > 0 ? geselecteerdeFollowups : followupKandidaten).map((c) => c.id)
                )
              }
              disabled={allesVerzenden}
              className="text-sm px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
            >
              {geselecteerdeFollowups.length > 0
                ? `Follow-up geselecteerde (${geselecteerdeFollowups.length})`
                : `Verstuur follow-ups (${followupKandidaten.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Filter + nieuw contact */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-text-muted">Filter:</span>
        {[{ value: "alle", label: "Alle" }, ...DOELGROEPEN].map((d) => (
          <button
            key={d.value}
            onClick={() => setFilterDoelgroep(d.value)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              filterDoelgroep === d.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-soft border-[#E8E0D4] hover:border-primary"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Nieuw contact toevoegen */}
      <form
        onSubmit={voegToe}
        className="card-base p-4 flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="flex-1">
          <label className="block text-xs text-text-muted mb-1">Naam</label>
          <input
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="Sofie de Visser"
            required
            className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-text-muted mb-1">E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sofie@praktijk.nl"
            required
            className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-xs text-text-muted mb-1">Categorie</label>
          <select
            value={doelgroep}
            onChange={(e) => setDoelgroep(e.target.value)}
            className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          >
            {DOELGROEPEN.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={toevoegen}
          className="btn-primary text-sm px-4 py-2 whitespace-nowrap disabled:opacity-50"
        >
          {toevoegen ? "Toevoegen..." : "+ Toevoegen"}
        </button>
      </form>

      {fout && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
          {fout}
        </div>
      )}
      {melding && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-4 py-3">
          {melding}
        </div>
      )}

      {/* Contactentabel */}
      {laden ? (
        <p className="text-text-muted text-sm">Laden...</p>
      ) : zichtbareContacten.length === 0 ? (
        <p className="text-text-muted text-sm">Geen contacten gevonden.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E8E0D0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectie.size === zichtbareContacten.length && zichtbareContacten.length > 0}
                    onChange={selecteerAlles}
                  />
                </th>
                <th className="text-left px-4 py-3">Naam</th>
                <th className="text-left px-4 py-3">E-mail</th>
                <th className="text-left px-4 py-3">Categorie</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Verstuurd</th>
                <th className="text-left px-4 py-3">Geopend</th>
                <th className="text-left px-4 py-3">Follow-up</th>
                <th className="text-left px-4 py-3">Persoonlijke zin</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE0]">
              {zichtbareContacten.map((c) => (
                <tr key={c.id} className="bg-white hover:bg-[#FDFAF4] transition-colors align-top">
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectie.has(c.id)}
                      onChange={() => wisselSelectie(c.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={naamEdits[c.id] ?? c.naam}
                      onChange={(e) => setNaamEdits((m) => ({ ...m, [c.id]: e.target.value }))}
                      onBlur={(e) => {
                        const nieuw = e.target.value.trim();
                        if (nieuw && nieuw !== c.naam) werkBij(c.id, { naam: nieuw });
                      }}
                      className="w-full font-medium text-primary bg-[#FDFAF4] border border-[#E8E0D0] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="email"
                      value={emailEdits[c.id] ?? c.email}
                      onChange={(e) => setEmailEdits((m) => ({ ...m, [c.id]: e.target.value }))}
                      onBlur={(e) => {
                        const nieuw = e.target.value.trim();
                        if (nieuw && nieuw !== c.email) werkBij(c.id, { email: nieuw });
                      }}
                      className="w-full text-text-muted bg-[#FDFAF4] border border-[#E8E0D0] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.doelgroep}
                      onChange={(e) => werkBij(c.id, { doelgroep: e.target.value })}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${DOELGROEP_STYLE[c.doelgroep] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {DOELGROEPEN.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{datumTijd(c.verstuurd_at)}</td>
                  <td className="px-4 py-3">
                    {c.geopend_at
                      ? <span className="text-green-600 text-xs">{datumTijd(c.geopend_at)}</span>
                      : <span className="text-text-muted text-xs">&#8212;</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    {c.followups > 0
                      ? <span className="text-text-soft text-xs">{c.followups}/{MAX_FOLLOWUPS} &middot; {datumTijd(c.laatste_followup_at)}</span>
                      : <span className="text-text-muted text-xs">&#8212;</span>
                    }
                  </td>
                  <td className="px-4 py-3 min-w-[220px]">
                    {c.status === "nieuw" ? (
                      <input
                        type="text"
                        value={psEdits[c.id] ?? c.ps_zin ?? ""}
                        onChange={(e) => setPsEdits((m) => ({ ...m, [c.id]: e.target.value }))}
                        onBlur={(e) => {
                          const nieuw = e.target.value.trim();
                          if (nieuw !== (c.ps_zin ?? "")) werkBij(c.id, { ps_zin: nieuw });
                        }}
                        placeholder="Optioneel: 1 zin, bijv. iets van hun site"
                        className="w-full text-text-soft bg-[#FDFAF4] border border-[#E8E0D0] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                      />
                    ) : (
                      <span className="text-text-muted text-xs">{c.ps_zin ?? ""}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      {c.status === "nieuw" && (
                        <button
                          onClick={() => stuurEnkele(c.id)}
                          disabled={verzenden[c.id]}
                          className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
                        >
                          {verzenden[c.id] ? "..." : "Verstuur"}
                        </button>
                      )}
                      {followupGeschikt(c) && (
                        <button
                          onClick={() => stuurFollowups([c.id])}
                          disabled={allesVerzenden}
                          className="text-xs border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          Follow-up {(c.followups ?? 0) + 1}
                        </button>
                      )}
                      {!["nieuw", "gereageerd"].includes(c.status) && (
                        <button
                          onClick={() => markeerGereageerd(c)}
                          className="text-xs text-[#1C3A2A] underline decoration-dotted px-2 py-1 whitespace-nowrap"
                          title="Markeer als gereageerd, stopt follow-ups"
                        >
                          Gereageerd
                        </button>
                      )}
                      <button
                        onClick={() => verwijder(c.id, c.naam)}
                        className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                      >
                        Verwijder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
