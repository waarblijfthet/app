"use client";

import { useEffect, useState, useCallback } from "react";

interface Contact {
  id: string;
  naam: string;
  email: string;
  doelgroep: string;
  plaats: string | null;
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

interface PreviewItem {
  id: string;
  naam: string;
  email: string;
  doelgroep: string;
  plaats: string | null;
  mailNummer: number;
  subject: string;
  text: string;
  heeftPsZin: boolean;
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
  geklikt:   "bg-[#FFF0EB] text-[#0B7A6E]",
  bounced:   "bg-red-100 text-red-700",
  gereageerd: "bg-[#16211F] text-white",
};

const STATUS_VOLGORDE: Record<Contact["status"], number> = {
  nieuw: 0, verstuurd: 1, geopend: 2, geklikt: 3, gereageerd: 4, bounced: 5,
};

function datumKort(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" });
}

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
  const [preview, setPreview] = useState<{ type: "eerste" | "followup"; items: PreviewItem[]; overgeslagen: { naam: string; reden: string }[] } | null>(null);
  const [previewLaden, setPreviewLaden] = useState(false);
  const [previewGeselecteerd, setPreviewGeselecteerd] = useState(0);
  const [previewVerzenden, setPreviewVerzenden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);
  const [filterDoelgroep, setFilterDoelgroep] = useState<string>("alle");
  const [filterPlaats, setFilterPlaats] = useState<string>("alle");
  const [sortering, setSortering] = useState<"nieuwste" | "plaats" | "status">("nieuwste");

  // Selectie + inline bewerken
  const [selectie, setSelectie] = useState<Set<string>>(new Set());
  const [naamEdits, setNaamEdits] = useState<Record<string, string>>({});
  const [emailEdits, setEmailEdits] = useState<Record<string, string>>({});
  const [psEdits, setPsEdits] = useState<Record<string, string>>({});
  const [plaatsEdits, setPlaatsEdits] = useState<Record<string, string>>({});

  // Nieuw contact form
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [doelgroep, setDoelgroep] = useState("relatietherapeuten");
  const [nieuwePlaats, setNieuwePlaats] = useState("");
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
        body: JSON.stringify({ naam: naam.trim(), email: email.trim(), doelgroep, plaats: nieuwePlaats.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      setNaam("");
      setEmail("");
      setNieuwePlaats("");
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

  // Preview-flow: eerst zien wie wat krijgt, dan pas versturen.
  async function openPreview(ids: string[], type: "eerste" | "followup") {
    if (ids.length === 0) {
      setFout(type === "followup"
        ? "Geen contacten die nu een follow-up kunnen krijgen."
        : "Geen nieuwe contacten om te versturen.");
      return;
    }
    setPreviewLaden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(type === "followup" ? { ids, type: "followup" } : { ids }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      if (!data.items || data.items.length === 0) {
        setFout("Niets om te versturen." + (data.overgeslagen?.length ? ` Overgeslagen: ${data.overgeslagen.map((o: { naam: string; reden: string }) => `${o.naam} (${o.reden})`).join(", ")}` : ""));
        return;
      }
      setPreview({ type, items: data.items, overgeslagen: data.overgeslagen ?? [] });
      setPreviewGeselecteerd(0);
    } catch {
      setFout("Kon de preview niet laden.");
    } finally {
      setPreviewLaden(false);
    }
  }

  async function doeVerzenden(ids: string[], isFollowup: boolean) {
    setPreviewVerzenden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isFollowup ? { ids, type: "followup" } : { ids }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      setMelding(`${geslaagd} van ${ids.length} verstuurd.`);
      setSelectie(new Set());
      setPreview(null);
      await laadContacten();
    } finally {
      setPreviewVerzenden(false);
      setTimeout(() => setMelding(null), 5000);
    }
  }

  function stuurEnkele(id: string) {
    openPreview([id], "eerste");
  }

  function stuurAlle() {
    openPreview(zichtbareContacten.filter((c) => c.status === "nieuw").map((c) => c.id), "eerste");
  }

  async function werkBij(id: string, velden: { naam?: string; email?: string; doelgroep?: string; ps_zin?: string; plaats?: string; gereageerd?: boolean }) {
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

  function stuurGeselecteerde() {
    openPreview(
      zichtbareContacten.filter((c) => selectie.has(c.id) && c.status === "nieuw").map((c) => c.id),
      "eerste"
    );
  }

  async function markeerGereageerd(c: Contact) {
    if (!confirm(`${c.naam} heeft gereageerd? Dit stopt verdere follow-ups.`)) return;
    await werkBij(c.id, { gereageerd: true });
    setMelding(`${c.naam} gemarkeerd als gereageerd.`);
    setTimeout(() => setMelding(null), 3000);
  }

  function stuurFollowups(ids: string[]) {
    openPreview(ids, "followup");
  }

  const plaatsen = Array.from(
    new Set(contacten.map((c) => (c.plaats ?? "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, "nl"));

  let zichtbareContacten = filterDoelgroep === "alle"
    ? contacten
    : contacten.filter((c) => c.doelgroep === filterDoelgroep);
  if (filterPlaats !== "alle") {
    zichtbareContacten = zichtbareContacten.filter((c) => (c.plaats ?? "").trim() === filterPlaats);
  }
  zichtbareContacten = [...zichtbareContacten].sort((a, b) => {
    const nieuwsteEerst = +new Date(b.created_at) - +new Date(a.created_at);
    if (sortering === "plaats") {
      return ((a.plaats ?? "\uffff").localeCompare(b.plaats ?? "\uffff", "nl")) || nieuwsteEerst;
    }
    if (sortering === "status") {
      return (STATUS_VOLGORDE[a.status] - STATUS_VOLGORDE[b.status]) || nieuwsteEerst;
    }
    return nieuwsteEerst;
  });

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
          <p className="text-text-muted text-xs mt-1">
            Mail 2 en 3 gaan vanzelf (dag 3-4 en dag 8-9, elke ochtend via de cron). Handmatig kan altijd eerder.
          </p>
        </div>
        <div className="flex gap-2">
          {geselecteerdeNieuw > 0 && (
            <button
              onClick={stuurGeselecteerde}
              disabled={previewLaden}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {previewLaden ? "Laden..." : `Verstuur geselecteerde (${geselecteerdeNieuw})`}
            </button>
          )}
          {nieuweCount > 0 && geselecteerdeNieuw === 0 && (
            <button
              onClick={stuurAlle}
              disabled={previewLaden}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {previewLaden ? "Laden..." : `Verstuur nieuwe (${nieuweCount})`}
            </button>
          )}
          {followupKandidaten.length > 0 && (
            <button
              onClick={() =>
                stuurFollowups(
                  (geselecteerdeFollowups.length > 0 ? geselecteerdeFollowups : followupKandidaten).map((c) => c.id)
                )
              }
              disabled={previewLaden}
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
                : "bg-white text-text-soft border-[#E6E9E7] hover:border-primary"
            }`}
          >
            {d.label}
          </button>
        ))}
        {plaatsen.length > 0 && (
          <select
            value={filterPlaats}
            onChange={(e) => setFilterPlaats(e.target.value)}
            className="text-xs px-2 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft"
          >
            <option value="alle">Alle plaatsen</option>
            {plaatsen.map((pl) => (
              <option key={pl} value={pl}>{pl}</option>
            ))}
          </select>
        )}
        <span className="text-xs text-text-muted ml-2">Sorteer:</span>
        <select
          value={sortering}
          onChange={(e) => setSortering(e.target.value as "nieuwste" | "plaats" | "status")}
          className="text-xs px-2 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft"
        >
          <option value="nieuwste">Nieuwste eerst</option>
          <option value="plaats">Plaats</option>
          <option value="status">Status</option>
        </select>
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
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="w-full sm:w-36">
          <label className="block text-xs text-text-muted mb-1">Plaats (optioneel)</label>
          <input
            type="text"
            value={nieuwePlaats}
            onChange={(e) => setNieuwePlaats(e.target.value)}
            placeholder="Zwolle"
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-xs text-text-muted mb-1">Categorie</label>
          <select
            value={doelgroep}
            onChange={(e) => setDoelgroep(e.target.value)}
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
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
        <div className="overflow-x-auto rounded-lg border border-[#E6E9E7]">
          <table className="w-full min-w-[1250px] text-sm">
            <thead className="bg-[#F7F8F7] text-text-muted text-xs uppercase tracking-wide">
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
                <th className="text-left px-4 py-3">Plaats</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Mails</th>
                <th className="text-left px-4 py-3">Toegevoegd</th>
                <th className="text-left px-4 py-3">Persoonlijke zin</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F1]">
              {zichtbareContacten.map((c) => (
                <tr key={c.id} className="bg-white hover:bg-[#FFFFFF] transition-colors align-top">
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
                      className="w-full min-w-[150px] font-medium text-primary bg-[#FFFFFF] border border-[#E6E9E7] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
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
                      className="w-full min-w-[190px] text-text-muted bg-[#FFFFFF] border border-[#E6E9E7] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
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
                    <input
                      type="text"
                      value={plaatsEdits[c.id] ?? c.plaats ?? ""}
                      onChange={(e) => setPlaatsEdits((m) => ({ ...m, [c.id]: e.target.value }))}
                      onBlur={(e) => {
                        const nieuw = e.target.value.trim();
                        if (nieuw !== (c.plaats ?? "")) werkBij(c.id, { plaats: nieuw });
                      }}
                      placeholder="&#8212;"
                      className="w-28 min-w-[7rem] text-text-soft bg-[#FFFFFF] border border-[#E6E9E7] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5 text-xs">
                      <span className={c.verstuurd_at ? "text-[#0B7A6E]" : "text-text-muted"}>
                        M1 {c.verstuurd_at ? `\u2713 ${datumKort(c.verstuurd_at)}` : "\u2014"}
                      </span>
                      <span className={c.followups >= 1 ? "text-[#0B7A6E]" : "text-text-muted"}>
                        M2 {c.followups >= 1 ? `\u2713${c.followups === 1 ? " " + datumKort(c.laatste_followup_at) : ""}` : "\u2014"}
                      </span>
                      <span className={c.followups >= 2 ? "text-[#0B7A6E]" : "text-text-muted"}>
                        M3 {c.followups >= 2 ? `\u2713 ${datumKort(c.laatste_followup_at)}` : "\u2014"}
                      </span>
                      {c.geopend_at && (
                        <span className="text-green-600">geopend {datumKort(c.geopend_at)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs whitespace-nowrap" title={datumTijd(c.created_at)}>
                    {datumKort(c.created_at)}
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
                        className="w-full text-text-soft bg-[#FFFFFF] border border-[#E6E9E7] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                      />
                    ) : (
                      <span className="text-text-muted text-xs">{c.ps_zin ?? ""}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2 justify-end">
                      {c.status === "nieuw" && (
                        <button
                          onClick={() => stuurEnkele(c.id)}
                          disabled={previewLaden}
                          className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
                        >
                          Verstuur
                        </button>
                      )}
                      {followupGeschikt(c) && (
                        <button
                          onClick={() => stuurFollowups([c.id])}
                          disabled={previewLaden}
                          className="text-xs border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          Follow-up {(c.followups ?? 0) + 1}
                        </button>
                      )}
                      {!["nieuw", "gereageerd"].includes(c.status) && (
                        <button
                          onClick={() => markeerGereageerd(c)}
                          className="text-xs text-[#16211F] underline decoration-dotted px-2 py-1 whitespace-nowrap"
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

      {/* Verzend-preview: wie krijgt wat, inclusief volledige mailtekst */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => { if (!previewVerzenden) setPreview(null); }}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#F0F3F1] flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-primary">
                  {preview.type === "followup" ? "Follow-ups versturen" : "Eerste mails versturen"}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {preview.items.length} ontvanger{preview.items.length === 1 ? "" : "s"} &middot; klik een naam om de mail te lezen
                </p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="text-text-muted hover:text-primary text-2xl leading-none px-2"
                aria-label="Sluiten"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-1 min-h-0">
              <div className="w-72 shrink-0 border-r border-[#F0F3F1] overflow-y-auto">
                {preview.items.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setPreviewGeselecteerd(i)}
                    className={`w-full text-left px-4 py-2.5 border-b border-[#F7F8F7] transition-colors ${
                      i === previewGeselecteerd ? "bg-[#F5F0E8]" : "hover:bg-[#FAFAF8]"
                    }`}
                  >
                    <p className="text-sm font-medium text-primary truncate">{item.naam}</p>
                    <p className="text-xs text-text-muted truncate">{item.email}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Mail {item.mailNummer}
                      {item.plaats ? ` \u00b7 ${item.plaats}` : ""}
                      {` \u00b7 ${DOELGROEP_LABEL[item.doelgroep] ?? item.doelgroep}`}
                    </p>
                    {item.mailNummer === 1 && !item.heeftPsZin && (
                      <p className="text-[11px] text-amber-600 mt-0.5">zonder persoonlijke zin</p>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {preview.items[previewGeselecteerd] && (
                  <>
                    <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Onderwerp</p>
                    <p className="text-sm font-medium text-primary mb-4">
                      {preview.items[previewGeselecteerd].subject}
                    </p>
                    <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Bericht</p>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#16211F] bg-[#FAFAF8] border border-[#F0F3F1] rounded-lg p-4">
                      {preview.items[previewGeselecteerd].text}
                    </pre>
                  </>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#F0F3F1] flex items-center justify-between gap-4">
              <div className="text-xs text-text-muted">
                {preview.type === "eerste" && preview.items.some((i) => !i.heeftPsZin) && (
                  <span className="text-amber-600">
                    Let op: {preview.items.filter((i) => !i.heeftPsZin).length} zonder persoonlijke zin.{" "}
                  </span>
                )}
                {preview.overgeslagen.length > 0 && (
                  <span>Overgeslagen: {preview.overgeslagen.map((o) => `${o.naam} (${o.reden})`).join(", ")}</span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setPreview(null)}
                  disabled={previewVerzenden}
                  className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft hover:border-primary disabled:opacity-50"
                >
                  Annuleer
                </button>
                <button
                  onClick={() => doeVerzenden(preview.items.map((i) => i.id), preview.type === "followup")}
                  disabled={previewVerzenden}
                  className="btn-primary text-sm px-5 py-2 disabled:opacity-50"
                >
                  {previewVerzenden
                    ? "Versturen..."
                    : `Verstuur ${preview.items.length} mail${preview.items.length === 1 ? "" : "s"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
