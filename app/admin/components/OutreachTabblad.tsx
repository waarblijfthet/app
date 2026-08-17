"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import DataTabel, { DataTabelKolom } from "@/app/admin/ui/DataTabel";
import Badge from "@/app/admin/ui/Badge";
import SelectieBalk from "@/app/admin/ui/SelectieBalk";
import OutreachDetailpaneel from "./OutreachDetailpaneel";
import OutreachWerklijst from "./OutreachWerklijst";
import OutreachPsZinModus from "./OutreachPsZinModus";
import OutreachBulkModal, { BulkModalType } from "./OutreachBulkModal";
import {
  DOELGROEPEN,
  DOELGROEP_LABEL,
  DOELGROEP_KLEUR,
  statusWeergave,
  followupGeschikt,
} from "@/lib/outreach/labels";
import { OutreachContact, OutreachMail } from "@/lib/outreach/types";

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
  naamBetrouwbaar: boolean;
}

interface DagBudget {
  verstuurd: number;
  budget: number;
  resterend: number;
}

type Weergave = "werklijst" | "tabel" | "pszin";

const PAGINAGROOTTE = 50;

const STATUSWEERGAVE_OPTIES = [
  { value: "alle", label: "Alle statussen" },
  { value: "nieuw", label: "Nieuw" },
  { value: "verstuurd", label: "Verstuurd" },
  { value: "gereageerd_positief", label: "Gereageerd positief" },
  { value: "gereageerd_neutraal", label: "Gereageerd neutraal" },
  { value: "gereageerd_negatief", label: "Gereageerd negatief" },
  { value: "gestopt", label: "Gestopt" },
  { value: "bounced", label: "Bounced" },
];

const VOORTGANG_OPTIES = [
  { value: "alle", label: "Alle voortgang" },
  { value: "wacht-m2", label: "Wacht op mail 2" },
  { value: "wacht-m3", label: "Wacht op mail 3" },
  { value: "compleet", label: "Alle mails verstuurd" },
];

function datumKort(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" });
}

function voortgangStaat(mails: OutreachMail[] | undefined): "wacht-m2" | "wacht-m3" | "compleet" | "geen" {
  const aantal = mails?.length ?? 0;
  if (aantal >= 3) return "compleet";
  if (aantal === 2) return "wacht-m3";
  if (aantal === 1) return "wacht-m2";
  return "geen";
}

function Voortgang({ mails }: { mails: OutreachMail[] | undefined }) {
  const titelDelen: string[] = [];
  const bolletjes = [1, 2, 3].map((nummer) => {
    const m = mails?.find((x) => x.nummer === nummer);
    const verstuurd = Boolean(m?.verstuurd_at);
    const geopend = Boolean(m?.geopend_at);
    if (m) {
      let regel = `Mail ${nummer}: verstuurd ${datumKort(m.verstuurd_at)}`;
      if (m.geklikt_at) regel += `, geklikt ${datumKort(m.geklikt_at)}`;
      else if (m.geopend_at) regel += `, geopend ${datumKort(m.geopend_at)}`;
      titelDelen.push(regel);
    } else {
      titelDelen.push(`Mail ${nummer}: nog niet verstuurd`);
    }
    return (
      <span
        key={nummer}
        className={`inline-block w-2.5 h-2.5 rounded-full ${
          verstuurd
            ? geopend
              ? "bg-accent ring-2 ring-accent/30"
              : "bg-accent"
            : "border border-[#D8DDDA] bg-white"
        }`}
      />
    );
  });
  return (
    <div className="flex items-center gap-1" title={titelDelen.join("\n")}>
      {bolletjes}
    </div>
  );
}

export default function OutreachTabblad() {
  // Standaard "Alle contacten" (Jarno, 17-aug): dat is de tab die hij het
  // vaakst als eerste wil zien bij het openen van Outreach.
  const [weergave, setWeergave] = useState<Weergave>("tabel");
  const [werklijstVersie, setWerklijstVersie] = useState(0);

  const [contacten, setContacten] = useState<OutreachContact[]>([]);
  const [mailsPerContact, setMailsPerContact] = useState<Record<string, OutreachMail[]>>({});
  const [totaal, setTotaal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [laden, setLaden] = useState(true);

  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);

  // Per-kolom filters (Jarno, 30-jul: "ik wil ook op kolommen kunnen zoeken,
  // voor elke kolom"). Contact en Plaats gaan server-side (queryparameters op
  // GET /api/admin/outreach), Doelgroep en Status ook. Voortgang filtert
  // alleen binnen de geladen pagina, zie toelichting onderaan het scherm.
  const [filterContactInvoer, setFilterContactInvoer] = useState("");
  const [filterContact, setFilterContact] = useState("");
  const [filterPlaatsInvoer, setFilterPlaatsInvoer] = useState("");
  const [filterPlaats, setFilterPlaats] = useState("");
  const [filterDoelgroep, setFilterDoelgroep] = useState("alle");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [filterVoortgang, setFilterVoortgang] = useState("alle");

  // Debounce voor de twee tekstvelden, 400ms.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilterContact(filterContactInvoer.trim());
      setFilterPlaats(filterPlaatsInvoer.trim());
      setPagina(0);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [filterContactInvoer, filterPlaatsInvoer]);

  const [selectie, setSelectie] = useState<Set<string>>(new Set());
  const [detailId, setDetailId] = useState<string | null>(null);

  const [preview, setPreview] = useState<{ type: "eerste" | "followup"; items: PreviewItem[]; overgeslagen: { naam: string; reden: string }[] } | null>(null);
  const [previewLaden, setPreviewLaden] = useState(false);
  const [previewGeselecteerd, setPreviewGeselecteerd] = useState(0);
  const [previewVerzenden, setPreviewVerzenden] = useState(false);

  // Dagbudget: los van de geselecteerde weergave, want de preview-modal
  // (gedeeld door werklijst en tabel) moet altijd kunnen waarschuwen.
  const [budget, setBudget] = useState<DagBudget | null>(null);

  // Bulkacties: doelgroep/plaats-wijzigen en verwijderen hebben invoer nodig,
  // vandaar het gedeelde modal. Stop mails en archiveren gaan direct.
  const [bulkModal, setBulkModal] = useState<{ type: BulkModalType; ids: string[] } | null>(null);
  const [bulkBezig, setBulkBezig] = useState(false);

  // Nieuw contact form
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [doelgroep, setDoelgroep] = useState("relatietherapeuten");
  const [nieuwePlaats, setNieuwePlaats] = useState("");
  const [toevoegen, setToevoegen] = useState(false);

  const laadContacten = useCallback(async () => {
    setLaden(true);
    try {
      const sp = new URLSearchParams();
      sp.set("limiet", String(PAGINAGROOTTE));
      sp.set("offset", String(pagina * PAGINAGROOTTE));
      if (filterContact) sp.set("zoekterm", filterContact);
      if (filterPlaats) sp.set("plaats", filterPlaats);
      if (filterDoelgroep !== "alle") sp.set("doelgroep", filterDoelgroep);
      if (filterStatus !== "alle") sp.set("statusweergave", filterStatus);

      const res = await fetch(`/api/admin/outreach?${sp.toString()}`);
      const data = await res.json();
      setContacten(Array.isArray(data) ? data : data.data ?? []);
      setMailsPerContact(Array.isArray(data) ? {} : data.mails ?? {});
      setTotaal(Array.isArray(data) ? (data as unknown[]).length : data.total ?? 0);
    } catch {
      setFout("Kon contacten niet laden.");
    } finally {
      setLaden(false);
    }
  }, [pagina, filterContact, filterPlaats, filterDoelgroep, filterStatus]);

  useEffect(() => { if (weergave === "tabel") laadContacten(); }, [weergave, laadContacten]);

  const laadBudget = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/outreach/dagbudget");
      const data = await res.json();
      if (res.ok) setBudget(data);
    } catch {
      // Stil falen: het dagbudget is een richtgetal, geen blokkade.
    }
  }, []);

  useEffect(() => { laadBudget(); }, [laadBudget]);

  // Automatisch mail 1/2/3 versturen (drie losse toggles, sleutel
  // "automatisering" in outreach_instellingen). Staat los van het budget
  // hierboven: de crons (app/api/cron/outreach-eerste-mail en
  // app/api/cron/outreach-followups) checken deze toggles zelf nog een keer
  // voor ze iets versturen, dit is puur de admin-bediening ervan.
  const [autoEersteMail, setAutoEersteMail] = useState<boolean | null>(null);
  const [autoTweedeMail, setAutoTweedeMail] = useState<boolean | null>(null);
  const [autoDerdeMail, setAutoDerdeMail] = useState<boolean | null>(null);
  const [autoBezig, setAutoBezig] = useState<"eerste" | "tweede" | "derde" | null>(null);

  const laadAutomatisering = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/outreach/automatisering");
      const data = await res.json();
      if (res.ok) {
        setAutoEersteMail(Boolean(data.eersteMailAutomatisch));
        setAutoTweedeMail(Boolean(data.tweedeMailAutomatisch));
        setAutoDerdeMail(Boolean(data.derdeMailAutomatisch));
      }
    } catch {
      // Stil falen: de toggles blijven dan gewoon op hun laatst bekende stand.
    }
  }, []);

  useEffect(() => { laadAutomatisering(); }, [laadAutomatisering]);

  async function zetAutomatisering(
    mail: "eerste" | "tweede" | "derde",
    aan: boolean
  ) {
    const config = {
      eerste: { veld: "eersteMailAutomatisch", waarde: autoEersteMail, set: setAutoEersteMail },
      tweede: { veld: "tweedeMailAutomatisch", waarde: autoTweedeMail, set: setAutoTweedeMail },
      derde: { veld: "derdeMailAutomatisch", waarde: autoDerdeMail, set: setAutoDerdeMail },
    }[mail];

    setAutoBezig(mail);
    const vorige = config.waarde;
    config.set(aan);
    try {
      const res = await fetch("/api/admin/outreach/automatisering", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [config.veld]: aan }),
      });
      if (!res.ok) throw new Error("opslaan mislukt");
    } catch {
      config.set(vorige);
      toonMelding("Kon de instelling niet opslaan, probeer het nog eens.");
    } finally {
      setAutoBezig(null);
    }
  }

  function toonMelding(tekst: string) {
    setMelding(tekst);
    setTimeout(() => setMelding(null), 4000);
  }

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
      setNaam(""); setEmail(""); setNieuwePlaats("");
      await laadContacten();
      toonMelding(`${naam} toegevoegd als ${DOELGROEP_LABEL[doelgroep]}.`);
    } finally {
      setToevoegen(false);
    }
  }

  async function openPreview(ids: string[], type: "eerste" | "followup") {
    if (ids.length === 0) {
      setFout(type === "followup" ? "Geen contacten die nu een follow-up kunnen krijgen." : "Geen nieuwe contacten om te versturen.");
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
      toonMelding(`${geslaagd} van ${ids.length} verstuurd.`);
      setSelectie(new Set());
      setPreview(null);
      setWerklijstVersie((v) => v + 1);
      await Promise.all([laadContacten(), laadBudget()]);
    } finally {
      setPreviewVerzenden(false);
    }
  }

  function stuurFollowups(ids: string[]) {
    openPreview(ids, "followup");
  }

  // ── Bulkacties: doelgroep, plaats, stop mails, archiveren, verwijderen ────
  async function bulkPatch(ids: string[], velden: Record<string, unknown>, meldingTekst: string) {
    setBulkBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, ...velden }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setFout(data.error ?? "Bijwerken is mislukt."); return; }
      setSelectie(new Set());
      setBulkModal(null);
      toonMelding(meldingTekst);
      setWerklijstVersie((v) => v + 1);
      await laadContacten();
    } catch {
      setFout("Bijwerken is mislukt (netwerkfout).");
    } finally {
      setBulkBezig(false);
    }
  }

  async function bulkVerwijderen(ids: string[], blocklist: boolean) {
    setBulkBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, blocklist }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setFout(data.error ?? "Verwijderen is mislukt."); return; }
      setSelectie(new Set());
      if (detailId && ids.includes(detailId)) setDetailId(null);
      setBulkModal(null);
      toonMelding(`${ids.length} contact${ids.length === 1 ? "" : "en"} verwijderd.`);
      setWerklijstVersie((v) => v + 1);
      await laadContacten();
    } catch {
      setFout("Verwijderen is mislukt (netwerkfout).");
    } finally {
      setBulkBezig(false);
    }
  }

  // Client-side voortgangsfilter, alleen binnen de geladen pagina (zie
  // toelichting onder de tabel).
  const zichtbareContacten = filterVoortgang === "alle"
    ? contacten
    : contacten.filter((c) => voortgangStaat(mailsPerContact[c.id]) === filterVoortgang);

  const nieuweCount = zichtbareContacten.filter((c) => c.status === "nieuw").length;

  const kolommen: DataTabelKolom<OutreachContact>[] = [
    {
      key: "contact",
      header: "Contact",
      sorteerWaarde: (c) => c.naam,
      filterWaarde: (c) => `${c.naam} ${c.email}`,
      render: (c) => (
        <div>
          <p className="font-medium text-primary">{c.naam}</p>
          <p className="text-text-muted text-xs">{c.email}</p>
        </div>
      ),
    },
    {
      key: "doelgroep",
      header: "Doelgroep",
      sorteerWaarde: (c) => DOELGROEP_LABEL[c.doelgroep] ?? c.doelgroep,
      filterWaarde: (c) => DOELGROEP_LABEL[c.doelgroep] ?? c.doelgroep,
      render: (c) => (
        <Badge kleurOverride={DOELGROEP_KLEUR[c.doelgroep]}>
          {DOELGROEP_LABEL[c.doelgroep] ?? c.doelgroep}
        </Badge>
      ),
    },
    {
      key: "plaats",
      header: "Plaats",
      sorteerWaarde: (c) => c.plaats ?? "￿",
      filterWaarde: (c) => c.plaats ?? "",
      render: (c) => <span className="text-text-soft text-sm">{c.plaats ?? "geen"}</span>,
    },
    {
      key: "voortgang",
      header: "Voortgang",
      filterWaarde: (c) => voortgangStaat(mailsPerContact[c.id]),
      render: (c) => <Voortgang mails={mailsPerContact[c.id]} />,
    },
    {
      key: "status",
      header: "Status",
      sorteerWaarde: (c) => statusWeergave(c).label,
      filterWaarde: (c) => statusWeergave(c).label,
      render: (c) => {
        const sw = statusWeergave(c);
        return (
          <div>
            <Badge variant={sw.variant}>{sw.label}</Badge>
            <p className="text-text-muted text-[11px] mt-0.5">
              {datumKort(c.gereageerd_at ?? c.laatste_followup_at ?? c.verstuurd_at ?? c.created_at)}
            </p>
          </div>
        );
      },
    },
    {
      key: "acties",
      header: "",
      render: (c) => (
        <div className="flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
          {c.status === "nieuw" && !c.gestopt && (
            <button
              onClick={() => openPreview([c.id], "eerste")}
              disabled={previewLaden}
              className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 disabled:opacity-50 whitespace-nowrap"
            >
              Versturen
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
          <button
            onClick={() => setBulkModal({ type: "verwijderen", ids: [c.id] })}
            className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
          >
            Verwijder
          </button>
        </div>
      ),
    },
  ];

  const selectieArray = Array.from(selectie);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-primary">Outreach</h2>
          <p className="text-text-muted text-xs mt-1">
            Mail 2 en 3 gaan altijd automatisch (dag 3-4 en dag 8-9, elke ochtend via de cron). Mail 1
            optioneel automatisch, zie de schakelaar hieronder. Handmatig kan bij alle drie altijd eerder.
          </p>
        </div>
        <div className="flex gap-1 bg-[#F0F3F1] rounded-lg p-1">
          {([
            { key: "werklijst", label: "Werklijst" },
            { key: "tabel", label: "Alle contacten" },
          ] as { key: Weergave; label: string }[]).map((o) => (
            <button
              key={o.key}
              onClick={() => setWeergave(o.key)}
              className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                weergave === o.key || (weergave === "pszin" && o.key === "werklijst")
                  ? "bg-white text-primary shadow-sm"
                  : "text-text-soft hover:text-primary"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 bg-white border border-[#E6E9E7] rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-medium text-primary">Eerste mail automatisch versturen</p>
          <p className="text-xs text-text-muted mt-0.5">
            Staat dit aan, dan verstuurt de dagelijkse cron (07:20 UTC) zelf de eerste mail aan nieuwe
            contacten, tot het dagbudget hierboven op is. Staat het uit, dan blijft dit een bewuste klik
            in de werklijst, zoals nu.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoEersteMail === true}
          disabled={autoEersteMail === null || autoBezig === "eerste"}
          onClick={() => zetAutomatisering("eerste", !autoEersteMail)}
          className={`shrink-0 w-12 h-7 rounded-full transition-colors relative disabled:opacity-50 ${
            autoEersteMail ? "bg-[#0B7A6E]" : "bg-[#D9DEDC]"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              autoEersteMail ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 bg-white border border-[#E6E9E7] rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-medium text-primary">Mail 2 (follow-up 1) automatisch versturen</p>
          <p className="text-xs text-text-muted mt-0.5">
            Staat dit aan, dan verstuurt de dagelijkse cron zelf follow-up 1 zodra een contact daar
            (3-4 dagen na de eerste mail) aan toe is. Staat het uit, dan blijft dit een bewuste klik.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoTweedeMail === true}
          disabled={autoTweedeMail === null || autoBezig === "tweede"}
          onClick={() => zetAutomatisering("tweede", !autoTweedeMail)}
          className={`shrink-0 w-12 h-7 rounded-full transition-colors relative disabled:opacity-50 ${
            autoTweedeMail ? "bg-[#0B7A6E]" : "bg-[#D9DEDC]"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              autoTweedeMail ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 bg-white border border-[#E6E9E7] rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-medium text-primary">Mail 3 (follow-up 2) automatisch versturen</p>
          <p className="text-xs text-text-muted mt-0.5">
            Staat dit aan, dan verstuurt de dagelijkse cron zelf follow-up 2 zodra een contact daar
            (5-9 dagen na follow-up 1) aan toe is. Staat het uit, dan blijft dit een bewuste klik.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoDerdeMail === true}
          disabled={autoDerdeMail === null || autoBezig === "derde"}
          onClick={() => zetAutomatisering("derde", !autoDerdeMail)}
          className={`shrink-0 w-12 h-7 rounded-full transition-colors relative disabled:opacity-50 ${
            autoDerdeMail ? "bg-[#0B7A6E]" : "bg-[#D9DEDC]"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              autoDerdeMail ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}
      {melding && <div className="bg-success-bg text-success text-sm rounded-md px-4 py-3">{melding}</div>}

      {weergave === "werklijst" && (
        <OutreachWerklijst
          onOpenContact={(id) => setDetailId(id)}
          onVersturenPreview={openPreview}
          onPsZinModus={() => setWeergave("pszin")}
          verversTeller={werklijstVersie}
        />
      )}

      {weergave === "pszin" && (
        <OutreachPsZinModus onSluiten={() => setWeergave("werklijst")} />
      )}

      {weergave === "tabel" && (
        <>
          {/* Per-kolom filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              value={filterContactInvoer}
              onChange={(e) => setFilterContactInvoer(e.target.value)}
              placeholder="Zoek naam of e-mail"
              className="text-xs px-3 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft w-48"
            />
            {[{ value: "alle", label: "Alle doelgroepen" }, ...DOELGROEPEN].map((d) => (
              <button
                key={d.value}
                onClick={() => { setFilterDoelgroep(d.value); setPagina(0); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filterDoelgroep === d.value ? "bg-primary text-white border-primary" : "bg-white text-text-soft border-[#E6E9E7] hover:border-primary"
                }`}
              >
                {d.label}
              </button>
            ))}
            <input
              type="text"
              value={filterPlaatsInvoer}
              onChange={(e) => setFilterPlaatsInvoer(e.target.value)}
              placeholder="Plaats"
              className="text-xs px-3 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft w-32"
            />
            <select
              value={filterVoortgang}
              onChange={(e) => setFilterVoortgang(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft"
            >
              {VOORTGANG_OPTIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPagina(0); }}
              className="text-xs px-2 py-1.5 rounded-full border border-[#E6E9E7] bg-white text-text-soft"
            >
              {STATUSWEERGAVE_OPTIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <p className="text-[11px] text-text-muted -mt-4">
            {totaal} contacten &middot; {nieuweCount} op deze pagina nog niet verstuurd. Naam/e-mail, plaats, doelgroep
            en status filteren over alle contacten. Voortgang filtert alleen binnen de geladen pagina.
          </p>

          {/* Nieuw contact toevoegen */}
          <form onSubmit={voegToe} className="card-base p-4 flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs text-text-muted mb-1">Naam</label>
              <input type="text" value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Sofie de Visser" required
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-text-muted mb-1">E-mailadres</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sofie@praktijk.nl" required
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="w-full sm:w-36">
              <label className="block text-xs text-text-muted mb-1">Plaats (optioneel)</label>
              <input type="text" value={nieuwePlaats} onChange={(e) => setNieuwePlaats(e.target.value)} placeholder="Zwolle"
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="w-full sm:w-48">
              <label className="block text-xs text-text-muted mb-1">Categorie</label>
              <select value={doelgroep} onChange={(e) => setDoelgroep(e.target.value)}
                className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                {DOELGROEPEN.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <button type="submit" disabled={toevoegen} className="btn-primary text-sm px-4 py-2 whitespace-nowrap disabled:opacity-50">
              {toevoegen ? "Toevoegen..." : "+ Toevoegen"}
            </button>
          </form>

          <DataTabel
            data={zichtbareContacten}
            kolommen={kolommen}
            rijSleutel={(c) => c.id}
            selecteerbaar
            geselecteerd={selectie}
            onSelectieChange={setSelectie}
            laden={laden}
            legeStaatTitel="Geen contacten gevonden"
            legeStaatUitleg="Pas de filters aan of voeg een nieuw contact toe."
            onRijKlik={(c) => setDetailId(c.id)}
          />

          {/* Paginering */}
          <div className="flex items-center justify-between text-sm text-text-muted">
            <button
              onClick={() => setPagina((p) => Math.max(0, p - 1))}
              disabled={pagina === 0}
              className="px-3 py-1.5 rounded-md border border-[#E6E9E7] disabled:opacity-40"
            >
              Vorige
            </button>
            <span>
              {totaal === 0 ? "0 van 0" : `${pagina * PAGINAGROOTTE + 1} tot ${Math.min(totaal, (pagina + 1) * PAGINAGROOTTE)} van ${totaal}`}
            </span>
            <button
              onClick={() => setPagina((p) => ((p + 1) * PAGINAGROOTTE < totaal ? p + 1 : p))}
              disabled={(pagina + 1) * PAGINAGROOTTE >= totaal}
              className="px-3 py-1.5 rounded-md border border-[#E6E9E7] disabled:opacity-40"
            >
              Volgende
            </button>
          </div>

          <SelectieBalk
            aantal={selectie.size}
            onWissen={() => setSelectie(new Set())}
            acties={[
              { label: "Mail 1 versturen", onClick: () => openPreview(selectieArray, "eerste") },
              { label: "Follow-up versturen", onClick: () => stuurFollowups(selectieArray) },
              { label: "Doelgroep wijzigen", onClick: () => setBulkModal({ type: "doelgroep", ids: selectieArray }) },
              { label: "Plaats wijzigen", onClick: () => setBulkModal({ type: "plaats", ids: selectieArray }) },
              { label: "Stop mails", onClick: () => bulkPatch(selectieArray, { gestopt: true }, `${selectieArray.length} contact${selectieArray.length === 1 ? "" : "en"} gestopt.`) },
              { label: "Archiveren", onClick: () => bulkPatch(selectieArray, { archiveren: true }, `${selectieArray.length} contact${selectieArray.length === 1 ? "" : "en"} gearchiveerd.`) },
              { label: "Verwijderen", onClick: () => setBulkModal({ type: "verwijderen", ids: selectieArray }), variant: "gevaarlijk" },
            ]}
          />
        </>
      )}

      <OutreachDetailpaneel
        contactId={detailId}
        onClose={() => setDetailId(null)}
        onWijziging={() => { laadContacten(); setWerklijstVersie((v) => v + 1); }}
        onFollowupVersturen={(id) => stuurFollowups([id])}
      />

      <OutreachBulkModal
        type={bulkModal?.type ?? null}
        aantal={bulkModal?.ids.length ?? 0}
        bezig={bulkBezig}
        onSluiten={() => setBulkModal(null)}
        onDoelgroep={(doelgroepWaarde) => bulkModal && bulkPatch(bulkModal.ids, { doelgroep: doelgroepWaarde }, `Doelgroep gewijzigd voor ${bulkModal.ids.length} contact${bulkModal.ids.length === 1 ? "" : "en"}.`)}
        onPlaats={(plaatsWaarde) => bulkModal && bulkPatch(bulkModal.ids, { plaats: plaatsWaarde }, `Plaats gewijzigd voor ${bulkModal.ids.length} contact${bulkModal.ids.length === 1 ? "" : "en"}.`)}
        onVerwijderen={(blocklist) => bulkModal && bulkVerwijderen(bulkModal.ids, blocklist)}
      />

      {/* Verzend-preview: wie krijgt wat, inclusief volledige mailtekst */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => { if (!previewVerzenden) setPreview(null); }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-[#F0F3F1] flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-primary">
                  {preview.type === "followup" ? "Follow-ups versturen" : "Eerste mails versturen"}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {preview.items.length} ontvanger{preview.items.length === 1 ? "" : "s"} &middot; klik een naam om de mail te lezen
                </p>
              </div>
              <button onClick={() => setPreview(null)} className="text-text-muted hover:text-primary text-2xl leading-none px-2" aria-label="Sluiten">
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
                      {item.plaats ? ` · ${item.plaats}` : ""}
                      {` · ${DOELGROEP_LABEL[item.doelgroep] ?? item.doelgroep}`}
                    </p>
                    {item.mailNummer === 1 && !item.heeftPsZin && (
                      <p className="text-[11px] text-amber-600 mt-0.5">zonder persoonlijke zin</p>
                    )}
                    {!item.naamBetrouwbaar && (
                      <p className="text-[11px] text-amber-600 mt-0.5">onbetrouwbare naam, gaat naamloos</p>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {preview.items[previewGeselecteerd] && (
                  <>
                    <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Onderwerp</p>
                    <p className="text-sm font-medium text-primary mb-4">{preview.items[previewGeselecteerd].subject}</p>
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
                  <span className="text-amber-600">Let op: {preview.items.filter((i) => !i.heeftPsZin).length} zonder persoonlijke zin. </span>
                )}
                {preview.items.some((i) => !i.naamBetrouwbaar) && (
                  <span className="text-amber-600">Let op: {preview.items.filter((i) => !i.naamBetrouwbaar).length} met een onbetrouwbare naam (mail wordt naamloos verstuurd, "Goedendag,"). </span>
                )}
                {preview.type === "eerste" && budget && preview.items.length > budget.resterend && (
                  <span className="text-amber-600">
                    Let op: dit is meer dan het dagbudget (nog {budget.resterend} van {budget.budget} vandaag, {budget.verstuurd} al verstuurd). Je kunt dit overrulen.{" "}
                  </span>
                )}
                {preview.overgeslagen.length > 0 && (
                  <span>Overgeslagen: {preview.overgeslagen.map((o) => `${o.naam} (${o.reden})`).join(", ")}</span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setPreview(null)} disabled={previewVerzenden} className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft hover:border-primary disabled:opacity-50">
                  Annuleer
                </button>
                <button onClick={() => doeVerzenden(preview.items.map((i) => i.id), preview.type === "followup")} disabled={previewVerzenden} className="btn-primary text-sm px-5 py-2 disabled:opacity-50">
                  {previewVerzenden ? "Versturen..." : `Verstuur ${preview.items.length} mail${preview.items.length === 1 ? "" : "s"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
