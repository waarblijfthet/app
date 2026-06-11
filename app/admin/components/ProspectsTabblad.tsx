"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Prospect {
  id: string;
  job_id: string | null;
  naam: string;
  praktijk: string | null;
  email: string;
  website: string | null;
  bron_url: string | null;
  doelgroep: string;
  doelgroep_score: number;
  context: string | null;
  status: "gevonden" | "goedgekeurd" | "afgewezen";
  created_at: string;
}

interface Job {
  id: string;
  type: "url" | "zoekwoorden";
  invoer: string;
  doelgroep: string;
  status: "wachtrij" | "bezig" | "klaar" | "fout" | "gestopt";
  totaal: number;
  verwerkt: number;
  gevonden: number;
  created_at: string;
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

const JOB_STATUS_LABEL: Record<Job["status"], string> = {
  wachtrij: "In wachtrij",
  bezig:    "Bezig",
  klaar:    "Klaar",
  fout:     "Fout",
  gestopt:  "Gestopt",
};

export default function ProspectsTabblad() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);

  // Zoekformulier
  const [bronType, setBronType] = useState<"url" | "zoekwoorden">("url");
  const [invoer, setInvoer] = useState("");
  const [doelgroep, setDoelgroep] = useState("auto");
  const [starten, setStarten] = useState(false);

  // Lopende job
  const [actieveJob, setActieveJob] = useState<Job | null>(null);
  const stopRef = useRef(false);
  const bezigRef = useRef(false); // synchrone lock tegen dubbele starts

  // Review-selectie
  const [selectie, setSelectie] = useState<Set<string>>(new Set());
  const [reviewBezig, setReviewBezig] = useState(false);

  const laad = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/prospects");
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      setJobs(data.jobs ?? []);
      setProspects(data.prospects ?? []);
      setFout(null);
    } catch {
      setFout("Kon prospects niet laden.");
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => { laad(); }, [laad]);

  function toonMelding(tekst: string) {
    setMelding(tekst);
    setTimeout(() => setMelding(null), 5000);
  }

  async function verwerkJob(job: Job) {
    if (bezigRef.current) return;
    bezigRef.current = true;
    setActieveJob(job);
    stopRef.current = false;
    let huidig = job;

    while (huidig.status === "wachtrij" || huidig.status === "bezig") {
      if (stopRef.current) {
        const res = await fetch("/api/admin/prospects/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: job.id, stop: true }),
        });
        const data = await res.json();
        huidig = data.job ?? huidig;
        break;
      }
      try {
        const res = await fetch("/api/admin/prospects/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: job.id }),
        });
        const data = await res.json();
        if (!res.ok) { setFout(data.error); break; }
        huidig = data.job;
        setActieveJob(huidig);
        await laad();
        if (data.klaar) break;
      } catch {
        setFout("Verbinding onderbroken tijdens het zoeken. De job staat nog in de lijst en kan opnieuw gestart worden.");
        break;
      }
    }

    bezigRef.current = false;
    setActieveJob(null);
    await laad();
    if (huidig.status === "klaar") {
      toonMelding(`Zoeken klaar: ${huidig.verwerkt} sites bezocht, ${huidig.gevonden} adressen gevonden.`);
    }
  }

  async function startZoeken(e: React.FormEvent) {
    e.preventDefault();
    setStarten(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: bronType, invoer: invoer.trim(), doelgroep }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      setInvoer("");
      await laad();
      if (!data.job) { setFout("Onverwacht antwoord van de server."); return; }
      if (data.jsGerenderd) {
        toonMelding(`Deze lijst wordt met JavaScript geladen. Ik val terug op de sitemap en open ${data.job.totaal} profielen.`);
      }
      if (data.job.status === "klaar") {
        toonMelding(`${data.job.gevonden ?? 0} adressen direct op de pagina gevonden.`);
      } else {
        verwerkJob(data.job);
      }
    } finally {
      setStarten(false);
    }
  }

  async function hervatJob(job: Job) {
    if (bezigRef.current) return;
    verwerkJob(job);
  }

  async function verwijderJob(job: Job) {
    if (!confirm("Deze zoekopdracht en de bijbehorende open prospects verwijderen?")) return;
    await fetch(`/api/admin/prospects?id=${job.id}`, { method: "DELETE" });
    await laad();
  }

  async function review(ids: string[], actie: "goedkeuren" | "afwijzen") {
    if (ids.length === 0) return;
    setReviewBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/prospects/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, actie }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      if (actie === "goedkeuren") {
        const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
        toonMelding(`${geslaagd} contact(en) toegevoegd aan Outreach.`);
      } else {
        toonMelding(`${ids.length} prospect(s) afgewezen.`);
      }
      setSelectie(new Set());
      await laad();
    } finally {
      setReviewBezig(false);
    }
  }

  async function werkBij(id: string, velden: { naam?: string; doelgroep?: string }) {
    const res = await fetch("/api/admin/prospects/review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...velden }),
    });
    if (res.ok) {
      const bijgewerkt = await res.json();
      setProspects((lijst) => lijst.map((p) => (p.id === id ? bijgewerkt : p)));
    }
  }

  function wisselSelectie(id: string) {
    setSelectie((s) => {
      const nieuw = new Set(s);
      if (nieuw.has(id)) nieuw.delete(id); else nieuw.add(id);
      return nieuw;
    });
  }

  function selecteerAlles() {
    setSelectie((s) =>
      s.size === prospects.length ? new Set() : new Set(prospects.map((p) => p.id))
    );
  }

  const openJobs = jobs.filter(
    (j) => (j.status === "wachtrij" || j.status === "bezig") && j.id !== actieveJob?.id
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-primary">Prospect-zoeker</h2>
        <p className="text-text-muted text-sm mt-0.5">
          Zoekt zelfstandig namen en e-mailadressen van potentiële samenwerkingspartners.
          Gevonden adressen keur je hieronder goed, daarna staan ze in het Outreach-tabblad.
        </p>
      </div>

      {/* Zoekformulier */}
      <form onSubmit={startZoeken} className="card-base p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {([
            { value: "url", label: "Overzichtspagina (URL)" },
            { value: "zoekwoorden", label: "Zoekwoorden" },
          ] as const).map((optie) => (
            <button
              key={optie.value}
              type="button"
              onClick={() => setBronType(optie.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                bronType === optie.value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-soft border-[#E8E0D4] hover:border-primary"
              }`}
            >
              {optie.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs text-text-muted mb-1">
              {bronType === "url"
                ? "URL van een overzichtspagina (ledenlijst, verwijsgids), één per regel"
                : "Zoekopdrachten, één per regel (doelgroep + stad)"}
            </label>
            {bronType === "url" ? (
              <textarea
                value={invoer}
                onChange={(e) => setInvoer(e.target.value)}
                placeholder={"https://www.voorbeeldvereniging.nl/leden"}
                required
                rows={2}
                className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            ) : (
              <textarea
                value={invoer}
                onChange={(e) => setInvoer(e.target.value)}
                placeholder={"relatietherapeut Utrecht\nrelatietherapeut Amersfoort\nbudgetcoach Amsterdam"}
                required
                rows={3}
                className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
          </div>
          <div className="w-full sm:w-52">
            <label className="block text-xs text-text-muted mb-1">Categorie</label>
            <select
              value={doelgroep}
              onChange={(e) => setDoelgroep(e.target.value)}
              className="w-full border border-[#E8E0D0] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            >
              <option value="auto">Automatisch herkennen</option>
              {DOELGROEPEN.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={starten || !!actieveJob}
            className="btn-primary text-sm px-4 py-2 whitespace-nowrap disabled:opacity-50"
          >
            {starten ? "Starten..." : "Start zoeken"}
          </button>
        </div>
        <p className="text-xs text-text-muted">
          {bronType === "url" ? (
            <>
              Bij een overzichtspagina opent de zoeker elk profiel apart en haalt daar het
              e-mailadres op. Staat er geen mail op het profiel, dan volgt hij de eigen website
              van die persoon. Werkt de lijst met JavaScript (zoals eft.nl), dan valt de zoeker
              terug op de sitemap. Het adres van de overzichtssite zelf wordt overgeslagen.
            </>
          ) : (
            <>
              Per regel zoek ik op het web (doelgroep + stad), bezoek ik de gevonden
              praktijksites en pluk ik daar de naam en het e-mailadres. Betrouwbaar zoeken
              vraagt de omgevingsvariabele BRAVE_SEARCH_API_KEY in Vercel; zonder sleutel
              probeer ik DuckDuckGo, maar dat wordt vanaf de server vaak geblokkeerd.
            </>
          )}
        </p>
      </form>

      {/* Voortgang lopende job */}
      {actieveJob && (
        <div className="card-base p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">
              Bezig met zoeken: {actieveJob.verwerkt} van {actieveJob.totaal} sites bezocht,{" "}
              {actieveJob.gevonden} adressen gevonden
            </p>
            <button
              onClick={() => { stopRef.current = true; }}
              className="text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-3 py-1"
            >
              Stop
            </button>
          </div>
          <div className="w-full bg-[#F0EAE0] rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: actieveJob.totaal > 0
                  ? `${Math.round((actieveJob.verwerkt / actieveJob.totaal) * 100)}%`
                  : "0%",
              }}
            />
          </div>
        </div>
      )}

      {/* Hervatbare jobs (bijvoorbeeld na sluiten van de browser) */}
      {openJobs.length > 0 && !actieveJob && (
        <div className="card-base p-4 space-y-2">
          <p className="text-sm font-medium text-primary">Onafgemaakte zoekopdrachten</p>
          {openJobs.map((j) => (
            <div key={j.id} className="flex items-center justify-between text-sm">
              <span className="text-text-muted truncate max-w-md">
                {j.invoer} ({j.verwerkt}/{j.totaal} gedaan, {j.gevonden} gevonden)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => hervatJob(j)}
                  className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
                >
                  Hervat
                </button>
                <button
                  onClick={() => verwijderJob(j)}
                  className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                >
                  Verwijder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

      {/* Review-wachtrij */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-primary">
          Te beoordelen ({prospects.length})
        </h3>
        {selectie.size > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => review(Array.from(selectie), "goedkeuren")}
              disabled={reviewBezig}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {reviewBezig ? "Bezig..." : `Keur ${selectie.size} goed`}
            </button>
            <button
              onClick={() => review(Array.from(selectie), "afwijzen")}
              disabled={reviewBezig}
              className="text-sm px-4 py-2 border border-red-200 text-red-500 rounded-md hover:bg-red-50 disabled:opacity-50"
            >
              Wijs af
            </button>
          </div>
        )}
      </div>

      {laden ? (
        <p className="text-text-muted text-sm">Laden...</p>
      ) : prospects.length === 0 ? (
        <p className="text-text-muted text-sm">
          Nog niets te beoordelen. Start hierboven een zoekopdracht.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E8E0D0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectie.size === prospects.length && prospects.length > 0}
                    onChange={selecteerAlles}
                  />
                </th>
                <th className="text-left px-4 py-3">Naam</th>
                <th className="text-left px-4 py-3">E-mail</th>
                <th className="text-left px-4 py-3">Website</th>
                <th className="text-left px-4 py-3">Categorie</th>
                <th className="text-left px-4 py-3">Context</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE0]">
              {prospects.map((p) => (
                <tr key={p.id} className="bg-white hover:bg-[#FDFAF4] transition-colors align-top">
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectie.has(p.id)}
                      onChange={() => wisselSelectie(p.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      defaultValue={p.naam}
                      onBlur={(e) => {
                        const nieuw = e.target.value.trim();
                        if (nieuw && nieuw !== p.naam) werkBij(p.id, { naam: nieuw });
                      }}
                      className="w-40 font-medium text-primary bg-transparent border-b border-transparent hover:border-[#E8E0D0] focus:border-primary focus:outline-none text-sm"
                    />
                    {p.praktijk && (
                      <p className="text-xs text-text-muted mt-0.5 truncate max-w-[160px]">{p.praktijk}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{p.email}</td>
                  <td className="px-4 py-3">
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C4603A] hover:underline text-xs"
                      >
                        {p.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={p.doelgroep}
                      onChange={(e) => werkBij(p.id, { doelgroep: e.target.value })}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${DOELGROEP_STYLE[p.doelgroep] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {DOELGROEPEN.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    {p.doelgroep_score === 0 && (
                      <p className="text-[10px] text-amber-600 mt-1">Niet herkend, controleer</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted max-w-[220px]">
                    <span className="line-clamp-2">{p.context ?? ""}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => review([p.id], "goedkeuren")}
                        disabled={reviewBezig}
                        className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
                      >
                        Goedkeuren
                      </button>
                      <button
                        onClick={() => review([p.id], "afwijzen")}
                        disabled={reviewBezig}
                        className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                      >
                        Afwijzen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recente zoekopdrachten */}
      {jobs.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer text-text-muted hover:text-text-soft">
            Recente zoekopdrachten ({jobs.length})
          </summary>
          <div className="mt-3 space-y-1">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between text-xs text-text-muted py-1.5 border-b border-[#F0EAE0]">
                <span className="truncate max-w-md">
                  {j.type === "url" ? "URL" : "Zoekwoorden"}: {j.invoer}
                </span>
                <span className="whitespace-nowrap ml-3">
                  {JOB_STATUS_LABEL[j.status]} · {j.verwerkt}/{j.totaal} sites · {j.gevonden} gevonden
                  <button
                    onClick={() => verwijderJob(j)}
                    className="ml-3 text-red-400 hover:text-red-600"
                  >
                    Verwijder
                  </button>
                </span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
