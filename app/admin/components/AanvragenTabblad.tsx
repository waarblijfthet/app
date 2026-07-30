"use client";

import { useState } from "react";
import { IntakeAanvraag } from "../page";
import DataTabel, { DataTabelKolom } from "../ui/DataTabel";
import Badge from "../ui/Badge";

interface Props {
  aanvragen: IntakeAanvraag[];
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
  if (!tekst) return <span className="text-text-muted">—</span>;
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

export default function AanvragenTabblad({ aanvragen: initAanvragen }: Props) {
  const [aanvragen, setAanvragen] = useState<IntakeAanvraag[]>(initAanvragen);
  const [bezig, setBezig] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);

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
      render: (a) => <span className="text-primary font-medium whitespace-nowrap">{a.naam ?? "—"}</span>,
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
          "—"
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
      render: (a) => <span className="text-text-soft whitespace-nowrap">{a.inkomen_bracket ?? "—"}</span>,
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
          <span className="text-text-muted">—</span>
        ) : a.analyse_gedaan ? (
          <span className="text-success">✓ Ja</span>
        ) : (
          <span className="text-text-muted">Nee</span>
        ),
    },
    {
      key: "start",
      header: "Start",
      render: (a) => <span className="text-text-soft whitespace-nowrap">{a.start_voorkeur ?? "—"}</span>,
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

      {fout && <p className="font-body text-sm mb-3 text-danger">{fout}</p>}

      <DataTabel
        data={aanvragen}
        kolommen={kolommen}
        rijSleutel={(a) => a.id}
        legeStaatTitel="Nog geen aanvragen ontvangen"
        mobieleKaart={(a) => (
          <div className="rounded-xl border border-[#E6E9E7] bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-body font-medium text-primary text-sm">{a.naam ?? "—"}</p>
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
          </div>
        )}
      />
    </div>
  );
}
