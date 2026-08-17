"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DOELGROEPEN, DOELGROEP_KLEUR } from "@/lib/outreach/labels";

interface Prospect {
  id: string;
  naam: string;
  praktijk: string | null;
  email: string;
  website: string | null;
  doelgroep: string | null;
  doelgroep_score: number;
  context: string | null;
  plaats: string | null;
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

interface RijOverride {
  naam?: string;
  doelgroep?: string;
  plaats?: string;
}

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
  // Ids die op dit moment een goedkeuren/afwijzen-request onderweg hebben.
  // Per rij, in plaats van één globale "reviewBezig", zodat de rest van de
  // tabel bruikbaar blijft (CLAUDE.md-opdracht "prospect-zoeker
  // verbeterronde", deel 1.4).
  const [bezigIds, setBezigIds] = useState<Set<string>>(new Set());
  // Foutmelding per rij, na een mislukte optimistische actie (deel 1.2).
  const [rowFouten, setRowFouten] = useState<Record<string, string>>({});
  // Lokale, nog niet opgeslagen naamcorrecties (id -> naam)
  const [naamEdits, setNaamEdits] = useState<Record<string, string>>({});
  const [plaatsEdits, setPlaatsEdits] = useState<Record<string, string>>({});
  // Eén filterveld per kolom (Jarno, 17-aug: "voor elke column een filter"),
  // in plaats van één zoekveld boven de tabel dat over alle kolommen tegelijk
  // zocht. "categorie" is "alle" als er niet op gefilterd wordt, de rest is
  // leeg. Client-side, geen extra serververzoek (zelfde aanpak als DataTabel).
  const LEGE_FILTERS = {
    naam: "", email: "", website: "", categorie: "alle", plaats: "", gevonden: "", context: "",
  };
  const [kolomFilters, setKolomFilters] = useState<Record<string, string>>(LEGE_FILTERS);
  function zetFilter(kolom: string, waarde: string) {
    setKolomFilters((f) => ({ ...f, [kolom]: waarde }));
  }

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

  // Optimistisch: de rij(en) verdwijnen onmiddellijk, het verzoek gaat pas
  // daarna. Mislukt een rij, dan komt hij terug met een foutmelding erbij.
  // Geen await laad() meer na elke actie (deel 1.2 en 1.3): de review-route
  // geeft de verwerkte ids terug en daarmee werken we alleen de lokale
  // state bij.
  async function review(
    ids: string[],
    actie: "goedkeuren" | "afwijzen",
    overrides?: Record<string, RijOverride>
  ) {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const verwijderdeRijen = prospects.filter((p) => idSet.has(p.id));
    if (verwijderdeRijen.length === 0) return;

    setProspects((lijst) => lijst.filter((p) => !idSet.has(p.id)));
    setSelectie((s) => {
      const nieuw = new Set(s);
      ids.forEach((id) => nieuw.delete(id));
      return nieuw;
    });
    setRowFouten((f) => {
      const nieuw = { ...f };
      ids.forEach((id) => delete nieuw[id]);
      return nieuw;
    });
    setBezigIds((s) => new Set([...Array.from(s), ...ids]));
    setFout(null);

    try {
      const res = await fetch("/api/admin/prospects/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, actie, overrides }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Hele actie mislukt (bijvoorbeeld verbinding of serverfout): alles terug.
        setProspects((lijst) => [...verwijderdeRijen, ...lijst]);
        setFout(data.error ?? "Actie mislukt.");
        return;
      }

      if (actie === "afwijzen") {
        const geslaagd = new Set<string>(data.ids ?? []);
        const mislukt = verwijderdeRijen.filter((p) => !geslaagd.has(p.id));
        if (mislukt.length > 0) {
          setProspects((lijst) => [...mislukt, ...lijst]);
          setRowFouten((f) => {
            const nieuw = { ...f };
            mislukt.forEach((p) => { nieuw[p.id] = "Kon niet worden afgewezen."; });
            return nieuw;
          });
        }
        toonMelding(`${geslaagd.size} prospect(s) afgewezen.`);
      } else {
        const resultaten: { id: string; naam: string; ok: boolean; fout?: string }[] =
          data.resultaten ?? [];
        const geslaagd = resultaten.filter((r) => r.ok).length;
        const mislukteResultaten = resultaten.filter((r) => !r.ok);
        if (mislukteResultaten.length > 0) {
          const teruggezet = verwijderdeRijen.filter((p) =>
            mislukteResultaten.some((r) => r.id === p.id)
          );
          setProspects((lijst) => [...teruggezet, ...lijst]);
          setRowFouten((f) => {
            const nieuw = { ...f };
            mislukteResultaten.forEach((r) => { nieuw[r.id] = r.fout ?? "Onbekende fout"; });
            return nieuw;
          });
        }
        toonMelding(`${geslaagd} contact(en) toegevoegd aan Outreach.`);
      }
    } catch {
      setProspects((lijst) => [...verwijderdeRijen, ...lijst]);
      setFout("Verbinding onderbroken tijdens het opslaan.");
    } finally {
      setBezigIds((s) => {
        const nieuw = new Set(s);
        ids.forEach((id) => nieuw.delete(id));
        return nieuw;
      });
    }
  }

  // Keurt één rij goed; stuurt een eventueel gecorrigeerde naam mee in
  // dezelfde request, in plaats van eerst een losse PATCH en dan pas de
  // POST (deel 1.5: dat was twee sequentiële requests voor één actie).
  async function keurRijGoed(p: Prospect) {
    const bewerkteNaam = (naamEdits[p.id] ?? p.naam).trim();
    const overrides =
      bewerkteNaam && bewerkteNaam !== p.naam
        ? { [p.id]: { naam: bewerkteNaam } }
        : undefined;
    await review([p.id], "goedkeuren", overrides);
  }

  async function werkBij(id: string, velden: { naam?: string; doelgroep?: string; plaats?: string }) {
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
      s.size === gefilterd.length ? new Set() : new Set(gefilterd.map((p) => p.id))
    );
  }

  // Client-side filteren, per kolom; geen serververzoek (deel 2, nu per
  // kolom in plaats van één zoekveld over alles). GET haalt tot 500 rijen op,
  // dus filteren gaat over de hele voorraad die in de admin-sessie geladen is.
  const actieveFilters = useMemo(
    () =>
      Object.entries(kolomFilters).filter(
        ([kolom, waarde]) => waarde.trim() !== "" && !(kolom === "categorie" && waarde === "alle")
      ),
    [kolomFilters]
  );

  const gefilterd = useMemo(() => {
    if (actieveFilters.length === 0) return prospects;
    const bevat = (waarde: string | null | undefined, zoek: string) =>
      (waarde ?? "").toLowerCase().includes(zoek.trim().toLowerCase());
    return prospects.filter((p) => {
      if (kolomFilters.naam.trim() && !bevat(`${p.naam} ${p.praktijk ?? ""}`, kolomFilters.naam)) return false;
      if (kolomFilters.email.trim() && !bevat(p.email, kolomFilters.email)) return false;
      if (kolomFilters.website.trim() && !bevat(p.website, kolomFilters.website)) return false;
      if (kolomFilters.categorie !== "alle") {
        if (kolomFilters.categorie === "onherkend") {
          if (p.doelgroep) return false;
        } else if (p.doelgroep !== kolomFilters.categorie) {
          return false;
        }
      }
      if (kolomFilters.plaats.trim() && !bevat(p.plaats, kolomFilters.plaats)) return false;
      if (kolomFilters.gevonden.trim()) {
        const datumWeergave = new Date(p.created_at).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" });
        if (!bevat(datumWeergave, kolomFilters.gevonden)) return false;
      }
      if (kolomFilters.context.trim() && !bevat(p.context, kolomFilters.context)) return false;
      return true;
    });
  }, [prospects, kolomFilters, actieveFilters.length]);

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
                  : "bg-white text-text-soft border-[#E6E9E7] hover:border-primary"
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
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            ) : (
              <textarea
                value={invoer}
                onChange={(e) => setInvoer(e.target.value)}
                placeholder={"relatietherapeut Utrecht\nrelatietherapeut Amersfoort\nbudgetcoach Amsterdam"}
                required
                rows={3}
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
          </div>
          <div className="w-full sm:w-52">
            <label className="block text-xs text-text-muted mb-1">Categorie</label>
            <select
              value={doelgroep}
              onChange={(e) => setDoelgroep(e.target.value)}
              className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
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
          <div className="w-full bg-[#F0F3F1] rounded-full h-2">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-primary">
            Te beoordelen ({actieveFilters.length > 0 ? `${gefilterd.length} van ${prospects.length}` : prospects.length})
          </h3>
          {actieveFilters.length > 0 && (
            <button
              type="button"
              onClick={() => setKolomFilters(LEGE_FILTERS)}
              className="text-xs text-accent hover:underline"
            >
              Filters wissen
            </button>
          )}
        </div>
        {selectie.size > 0 && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => review(Array.from(selectie), "goedkeuren")}
              className="btn-primary text-sm px-4 py-2"
            >
              Keur {selectie.size} goed
            </button>
            <button
              onClick={() => review(Array.from(selectie), "afwijzen")}
              className="text-sm px-4 py-2 border border-red-200 text-red-500 rounded-md hover:bg-red-50"
            >
              Wijs af
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-text-muted -mt-3">
        Elke kolom heeft een eigen filter in de tabelkop hieronder; ze werken samen (en-en).
      </p>

      {laden ? (
        <p className="text-text-muted text-sm">Laden...</p>
      ) : prospects.length === 0 ? (
        <p className="text-text-muted text-sm">
          Nog niets te beoordelen. Start hierboven een zoekopdracht.
        </p>
      ) : gefilterd.length === 0 ? (
        <p className="text-text-muted text-sm">
          Niets gevonden voor deze filters.{" "}
          <button type="button" onClick={() => setKolomFilters(LEGE_FILTERS)} className="text-accent hover:underline">
            Filters wissen
          </button>
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E6E9E7]">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col className="w-9" />
              <col className="w-24" />
              <col className="w-24" />
              <col className="w-40" />
              <col className="w-48" />
              <col className="w-44" />
              <col className="w-36" />
              <col className="w-28" />
              <col className="w-20" />
              <col />
            </colgroup>
            <thead className="bg-[#F7F8F7] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectie.size === gefilterd.length && gefilterd.length > 0}
                    onChange={selecteerAlles}
                  />
                </th>
                <th className="text-left px-3 py-3">Goedkeuren</th>
                <th className="text-left px-3 py-3">Afwijzen</th>
                <th className="text-left px-4 py-3">Naam</th>
                <th className="text-left px-4 py-3">E-mail</th>
                <th className="text-left px-4 py-3">Website</th>
                <th className="text-left px-4 py-3">Categorie</th>
                <th className="text-left px-4 py-3">Plaats</th>
                <th className="text-left px-4 py-3">Gevonden</th>
                <th className="text-left px-4 py-3">Context</th>
              </tr>
              {/* Filterrij per kolom (Jarno, 17-aug). Werkt naast elkaar (en-en),
                  client-side, dus geen extra serververzoek. */}
              <tr className="bg-white border-t border-[#F0F3F1] normal-case tracking-normal">
                <th className="px-3 py-2" />
                <th className="px-3 py-2" />
                <th className="px-3 py-2" />
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.naam}
                    onChange={(e) => zetFilter("naam", e.target.value)}
                    placeholder="Filter"
                    aria-label="Filter op naam"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.email}
                    onChange={(e) => zetFilter("email", e.target.value)}
                    placeholder="Filter"
                    aria-label="Filter op e-mail"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.website}
                    onChange={(e) => zetFilter("website", e.target.value)}
                    placeholder="Filter"
                    aria-label="Filter op website"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                <th className="px-4 py-2">
                  <select
                    value={kolomFilters.categorie}
                    onChange={(e) => zetFilter("categorie", e.target.value)}
                    aria-label="Filter op categorie"
                    className="w-full border border-[#E6E9E7] rounded px-1.5 py-1 text-xs font-normal bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="alle">Alle</option>
                    <option value="onherkend">Niet herkend</option>
                    {DOELGROEPEN.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.plaats}
                    onChange={(e) => zetFilter("plaats", e.target.value)}
                    placeholder="Filter"
                    aria-label="Filter op plaats"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.gevonden}
                    onChange={(e) => zetFilter("gevonden", e.target.value)}
                    placeholder="dd-mm"
                    aria-label="Filter op gevonden datum"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
                <th className="px-4 py-2">
                  <input
                    type="text"
                    value={kolomFilters.context}
                    onChange={(e) => zetFilter("context", e.target.value)}
                    placeholder="Filter"
                    aria-label="Filter op context"
                    className="w-full border border-[#E6E9E7] rounded px-2 py-1 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F1]">
              {gefilterd.map((p) => {
                const bezig = bezigIds.has(p.id);
                const naamWeergave = naamEdits[p.id] ?? p.naam;
                const naamOntbreekt = !naamWeergave.trim();
                const doelgroepOntbreekt = !p.doelgroep;
                return (
                  <tr key={p.id} className="bg-white hover:bg-[#FFFFFF] transition-colors align-top">
                    <td className="px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectie.has(p.id)}
                        onChange={() => wisselSelectie(p.id)}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => keurRijGoed(p)}
                        disabled={bezig || doelgroepOntbreekt}
                        title={doelgroepOntbreekt ? "Kies eerst een doelgroep" : undefined}
                        className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
                      >
                        {bezig ? "Bezig…" : "Goedkeuren"}
                      </button>
                      {rowFouten[p.id] && (
                        <p className="text-[10px] text-red-600 mt-1 max-w-[140px]">{rowFouten[p.id]}</p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => review([p.id], "afwijzen")}
                        disabled={bezig}
                        className="text-xs px-3 py-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 whitespace-nowrap"
                      >
                        {bezig ? "Bezig…" : "Afwijzen"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={naamWeergave}
                        onChange={(e) => setNaamEdits((m) => ({ ...m, [p.id]: e.target.value }))}
                        onBlur={(e) => {
                          const nieuw = e.target.value.trim();
                          if (nieuw && nieuw !== p.naam) werkBij(p.id, { naam: nieuw });
                        }}
                        placeholder="Naam ontbreekt"
                        title="Klik om de naam te corrigeren"
                        className={`w-full font-medium bg-[#FFFFFF] border rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                          naamOntbreekt ? "border-amber-300 text-amber-700 placeholder:text-amber-500" : "border-[#E6E9E7] text-primary"
                        }`}
                      />
                      {p.praktijk && (
                        <p className="text-xs text-text-muted mt-0.5 truncate">{p.praktijk}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-muted break-all">{p.email}</td>
                    <td className="px-4 py-3">
                      {p.website && (
                        <a
                          href={p.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0B7A6E] hover:underline text-xs break-all"
                        >
                          {p.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {/* Zelfde vorm/kleur als Badge.tsx (font-body text-xs font-medium
                          px-2 py-0.5 rounded-full), maar dan als <select> zodat een
                          fout herkende categorie in dezelfde klik te corrigeren blijft.
                          appearance-none is nodig: sommige browsers (o.a. Firefox op
                          Windows) negeren anders de achtergrondkleur van een <select>
                          en tonen 'm effectief kleurloos, wat leek op "boekhouder
                          heeft geen badge" terwijl de kleur (teal) er al wel was. */}
                      <select
                        value={p.doelgroep ?? ""}
                        onChange={(e) => werkBij(p.id, { doelgroep: e.target.value })}
                        title="Klik om de categorie te corrigeren"
                        className={`appearance-none font-body text-xs font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                          p.doelgroep ? (DOELGROEP_KLEUR[p.doelgroep] ?? "bg-slate-100 text-slate-600") : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {!p.doelgroep && <option value="">Niet herkend, kies zelf</option>}
                        {DOELGROEPEN.map((d) => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                      {doelgroepOntbreekt && (
                        <p className="text-[10px] text-amber-600 mt-1">Niet herkend, kies zelf</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={plaatsEdits[p.id] ?? p.plaats ?? ""}
                        onChange={(e) => setPlaatsEdits((m) => ({ ...m, [p.id]: e.target.value }))}
                        onBlur={(e) => {
                          const nieuw = e.target.value.trim();
                          if (nieuw !== (p.plaats ?? "")) werkBij(p.id, { plaats: nieuw });
                        }}
                        placeholder="&#8212;"
                        title="Vestigingsplaats; komt in de mail als regio-zin"
                        className="w-full text-text-soft bg-[#FFFFFF] border border-[#E6E9E7] rounded px-2 py-1 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                      />
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                      {new Date(p.created_at).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" })}
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted">
                      <span className="line-clamp-2">{p.context ?? ""}</span>
                    </td>
                  </tr>
                );
              })}
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
              <div key={j.id} className="flex items-center justify-between text-xs text-text-muted py-1.5 border-b border-[#F0F3F1]">
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
