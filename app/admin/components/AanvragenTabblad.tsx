"use client";

import { useEffect, useMemo, useState } from "react";
import { IntakeAanvraag } from "../page";
import DataTabel, { DataTabelKolom } from "../ui/DataTabel";
import Badge from "../ui/Badge";

interface Props {
  aanvragen: IntakeAanvraag[];
  /** id van het gekoppelde contact per aanvraag-id, zie getContactKoppelingen in app/admin/data.ts */
  contactPerIntakeId: Record<string, string>;
}

type Status = "nieuw" | "contact_opgenomen" | "betaald" | "gestart";

const STATUS_CONFIG: Record<Status, { label: string; variant: "waarschuwing" | "actie" | "goed" }> = {
  nieuw: { label: "Nieuw", variant: "waarschuwing" },
  contact_opgenomen: { label: "Contact opgenomen", variant: "actie" },
  betaald: { label: "Betaald", variant: "goed" },
  gestart: { label: "Gestart", variant: "goed" },
};

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as Status];
  if (!cfg) return <Badge>{status}</Badge>;
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

function KnelpuntCell({ tekst }: { tekst: string | null }) {
  const [tooltip, setTooltip] = useState(false);
  if (!tekst) return <span className="text-text-muted">geen</span>;
  const kort = tekst.length > 60 ? tekst.slice(0, 60) + "…" : tekst;
  return (
    <span
      className="relative cursor-help"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {kort}
      {tooltip && tekst.length > 60 && (
        <span
          className="font-body absolute z-50 left-0 top-6 bg-primary text-white text-xs rounded-lg px-3 py-2 shadow-card-hover"
          style={{ maxWidth: "320px", minWidth: "200px", lineHeight: 1.6, whiteSpace: "normal" }}
        >
          {tekst}
        </span>
      )}
    </span>
  );
}

function StatusSelect({
  huidig,
  onChange,
}: {
  huidig: string;
  onChange: (nieuw: Status) => void;
}) {
  return (
    <select
      value={huidig}
      onChange={(e) => onChange(e.target.value as Status)}
      onClick={(e) => e.stopPropagation()}
      className="font-body text-xs rounded-lg border border-[#E6E9E7] bg-white px-2 py-1 cursor-pointer text-primary"
    >
      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
        <option key={key} value={key}>
          {cfg.label}
        </option>
      ))}
    </select>
  );
}

function formatDatum(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const PAKKET_LABEL: Record<string, string> = {
  intensief: "Intensief",
  geldscan: "Geldscan",
};

export default function AanvragenTabblad({ aanvragen: initAanvragen, contactPerIntakeId }: Props) {
  const [aanvragen, setAanvragen] = useState<IntakeAanvraag[]>(initAanvragen);
  const [bezig, setBezig] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [gekoppeld, setGekoppeld] = useState<Record<string, string>>(contactPerIntakeId);
  const [doorzettenBezigId, setDoorzettenBezigId] = useState<string | null>(null);

  // Vanuit het Vandaag-dashboard komt "aanvragen zonder rapport" hier terecht
  // als /admin/aanvragen?filter=zonder-rapport. window.location.search in
  // plaats van useSearchParams, zelfde patroon als de "open"-link in
  // ContactenTabblad.tsx.
  const [zonderRapportFilter, setZonderRapportFilter] = useState(false);
  useEffect(() => {
    const filter = new URLSearchParams(window.location.search).get("filter");
    if (filter === "zonder-rapport") setZonderRapportFilter(true);
  }, []);

  const zichtbareAanvragen = useMemo(() => {
    if (!zonderRapportFilter) return aanvragen;
    return aanvragen.filter((a) => a.pakket === "geldscan" && a.status !== "gestart");
  }, [aanvragen, zonderRapportFilter]);

  async function doorzetten(intakeId: string) {
    setDoorzettenBezigId(intakeId);
    setFout(null);
    try {
      const res = await fetch("/api/admin/contacten/doorzetten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bron: "aanvraag", intake_id: intakeId }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Doorzetten is mislukt."); return; }
      setGekoppeld((prev) => ({ ...prev, [intakeId]: data.contact.id }));
    } catch {
      setFout("Doorzetten is mislukt (netwerkfout).");
    } finally {
      setDoorzettenBezigId(null);
    }
  }

  async function updateStatus(id: string, status: Status) {
    setBezig(id);
    setFout(null);
    const res = await fetch("/api/admin/aanvragen", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => null);

    if (res?.ok) {
      setAanvragen((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } else {
      setFout("Status bijwerken mislukt. Probeer het opnieuw.");
    }
    setBezig(null);
  }

  const kolommen: DataTabelKolom<IntakeAanvraag>[] = [
    {
      key: "datum",
      header: "Datum",
      render: (a) => <span className="text-text-soft whitespace-nowrap">{formatDatum(a.created_at)}</span>,
      sorteerWaarde: (a) => a.created_at,
    },
    {
      key: "naam",
      header: "Naam",
      render: (a) => <span className="text-primary font-medium whitespace-nowrap">{a.naam ?? "geen"}</span>,
      sorteerWaarde: (a) => a.naam ?? "",
    },
    {
      key: "email",
      header: "Email",
      render: (a) =>
        a.email ? (
          <a href={`mailto:${a.email}`} className="text-accent whitespace-nowrap">
            {a.email}
          </a>
        ) : (
          "geen"
        ),
    },
    {
      key: "pakket",
      header: "Pakket",
      render: (a) => <Badge variant="actie">{PAKKET_LABEL[a.pakket] ?? "Adviesgesprek"}</Badge>,
      sorteerWaarde: (a) => a.pakket,
    },
    {
      key: "inkomen",
      header: "Inkomen",
      render: (a) => <span className="text-text-soft whitespace-nowrap">{a.inkomen_bracket ?? "geen"}</span>,
    },
    {
      key: "knelpunt",
      header: "Knelpunt",
      render: (a) => <KnelpuntCell tekst={a.grootste_knelpunt} />,
      className: "max-w-[220px]",
    },
    {
      key: "analyse",
      header: "Analyse",
      render: (a) =>
        a.analyse_token ? (
          <a
            href={`/resultaat/${a.analyse_token}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-accent font-medium whitespace-nowrap"
          >
            Bekijk analyse →
          </a>
        ) : a.analyse_gedaan === null ? (
          <span className="text-text-muted">geen</span>
        ) : a.analyse_gedaan ? (
          <span className="text-success">✓ Ja</span>
        ) : (
          <span className="text-text-muted">Nee</span>
        ),
    },
    {
      key: "start",
      header: "Start",
      render: (a) => <span className="text-text-soft whitespace-nowrap">{a.start_voorkeur ?? "geen"}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (a) => (
        <div className="flex items-center gap-2 flex-wrap" style={{ opacity: bezig === a.id ? 0.6 : 1 }}>
          <StatusPill status={a.status} />
          <StatusSelect huidig={a.status} onChange={(s) => updateStatus(a.id, s)} />
        </div>
      ),
    },
    {
      key: "contact",
      header: "",
      render: (a) =>
        gekoppeld[a.id] ? (
          <a
            href={`/admin/contacten?open=${gekoppeld[a.id]}`}
            className="text-xs text-accent whitespace-nowrap"
          >
            Bekijk contact →
          </a>
        ) : (
          <button
            onClick={() => doorzetten(a.id)}
            disabled={doorzettenBezigId === a.id}
            className="text-xs border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {doorzettenBezigId === a.id ? "Doorzetten..." : "Doorzetten naar contacten"}
          </button>
        ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-body font-semibold text-primary text-base">Intake aanvragen</h2>
        <span className="font-body text-sm text-text-muted">
          {aanvragen.length} totaal ·{" "}
          {aanvragen.filter((a) => a.status === "nieuw").length} nieuw
        </span>
      </div>

      {zonderRapportFilter && (
        <div className="flex items-center justify-between text-sm bg-[#F5F0E8] rounded-lg px-4 py-2.5 mb-4">
          <span className="text-text-soft">
            Gefilterd: geldscans zonder rapport ({zichtbareAanvragen.length})
          </span>
          <button
            onClick={() => setZonderRapportFilter(false)}
            className="text-xs text-accent hover:underline"
          >
            Wis filter
          </button>
        </div>
      )}

      {fout && <p className="font-body text-sm mb-3 text-danger">{fout}</p>}

      <DataTabel
        data={zichtbareAanvragen}
        kolommen={kolommen}
        rijSleutel={(a) => a.id}
        legeStaatTitel="Nog geen aanvragen ontvangen"
        mobieleKaart={(a) => (
          <div className="rounded-xl border border-[#E6E9E7] bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-body font-medium text-primary text-sm">{a.naam ?? "geen"}</p>
              <StatusPill status={a.status} />
            </div>
            {a.email && (
              <a href={`mailto:${a.email}`} className="font-body text-accent text-sm block">
                {a.email}
              </a>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="actie">{PAKKET_LABEL[a.pakket] ?? "Adviesgesprek"}</Badge>
              <span className="font-body text-text-muted text-xs">{formatDatum(a.created_at)}</span>
            </div>
            <div className="mt-2">
              <StatusSelect huidig={a.status} onChange={(s) => updateStatus(a.id, s)} />
            </div>
            <div className="mt-2">
              {gekoppeld[a.id] ? (
                <a href={`/admin/contacten?open=${gekoppeld[a.id]}`} className="text-xs text-accent">
                  Bekijk contact →
                </a>
              ) : (
                <button
                  onClick={() => doorzetten(a.id)}
                  disabled={doorzettenBezigId === a.id}
                  className="text-xs border border-primary text-primary px-3 py-1 rounded disabled:opacity-50"
                >
                  {doorzettenBezigId === a.id ? "Doorzetten..." : "Doorzetten naar contacten"}
                </button>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
