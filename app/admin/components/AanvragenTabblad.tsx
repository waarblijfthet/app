"use client";

import { useState } from "react";
import { IntakeAanvraag } from "../page";

interface Props {
  aanvragen: IntakeAanvraag[];
}

type Status = "nieuw" | "contact_opgenomen" | "betaald" | "gestart";

const STATUS_CONFIG: Record<
  Status,
  { label: string; bg: string; color: string }
> = {
  nieuw: { label: "Nieuw", bg: "#FEF3C7", color: "#92400E" },
  contact_opgenomen: { label: "Contact opgenomen", bg: "#DBEAFE", color: "#1E40AF" },
  betaald: { label: "Betaald", bg: "#D1FAE5", color: "#065F46" },
  gestart: { label: "Gestart", bg: "#D1FAE5", color: "#065F46" },
};

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as Status] ?? {
    label: status,
    bg: "#E8E0D0",
    color: "#4A5E4E",
  };
  return (
    <span
      className="font-body text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function KnelpuntCell({ tekst }: { tekst: string | null }) {
  const [tooltip, setTooltip] = useState(false);
  if (!tekst) return <span className="text-[#8A9E8E]">—</span>;
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
          className="font-body absolute z-50 left-0 top-6 bg-[#1C3A2A] text-white text-xs rounded-lg px-3 py-2 shadow-lg"
          style={{ maxWidth: "320px", minWidth: "200px", lineHeight: 1.6, whiteSpace: "normal" }}
        >
          {tekst}
        </span>
      )}
    </span>
  );
}

function StatusSelect({
  id,
  huidig,
  onChange,
}: {
  id: string;
  huidig: string;
  onChange: (nieuw: Status) => void;
}) {
  return (
    <select
      value={huidig}
      onChange={(e) => onChange(e.target.value as Status)}
      className="font-body text-xs rounded-lg border border-[#E8E0D4] bg-white px-2 py-1 cursor-pointer"
      style={{ color: "#1C3A2A" }}
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
  const d = new Date(iso);
  return d.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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
      setAanvragen((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } else {
      setFout("Status bijwerken mislukt. Probeer het opnieuw.");
    }
    setBezig(null);
  }

  if (aanvragen.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-[#8A9E8E] text-sm">
          Nog geen aanvragen ontvangen.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-body font-semibold text-[#1C3A2A] text-base">
          Intake aanvragen
        </h2>
        <span className="font-body text-sm text-[#8A9E8E]">
          {aanvragen.length} totaal ·{" "}
          {aanvragen.filter((a) => a.status === "nieuw").length} nieuw
        </span>
      </div>

      {fout && (
        <p className="font-body text-sm mb-3" style={{ color: "#B03A2E" }}>
          {fout}
        </p>
      )}

      <div style={{ overflowX: "auto" }}>
        <table
          className="font-body w-full text-sm"
          style={{ borderCollapse: "collapse", minWidth: "900px" }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #E8E0D0" }}>
              {[
                "Datum",
                "Naam",
                "Email",
                "Pakket",
                "Inkomen",
                "Knelpunt",
                "Analyse",
                "Start",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left pb-3 pr-4"
                  style={{ color: "#8A9E8E", fontWeight: 500, fontSize: "0.78rem", whiteSpace: "nowrap" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aanvragen.map((a) => (
              <tr
                key={a.id}
                style={{
                  borderBottom: "1px solid #F0EBE3",
                  opacity: bezig === a.id ? 0.6 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                <td className="py-3 pr-4" style={{ whiteSpace: "nowrap", color: "#4A5E4E", fontSize: "0.82rem" }}>
                  {formatDatum(a.created_at)}
                </td>
                <td className="py-3 pr-4" style={{ color: "#1C3A2A", fontWeight: 500, whiteSpace: "nowrap" }}>
                  {a.naam ?? "—"}
                </td>
                <td className="py-3 pr-4" style={{ color: "#4A5E4E", whiteSpace: "nowrap" }}>
                  {a.email ? (
                    <a
                      href={`mailto:${a.email}`}
                      style={{ color: "#C4603A", textDecoration: "none" }}
                    >
                      {a.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-3 pr-4" style={{ whiteSpace: "nowrap" }}>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        a.pakket === "intensief" ? "#F3E8FF" : "#E8F2EC",
                      color: a.pakket === "intensief" ? "#6B21A8" : "#065F46",
                      fontWeight: 500,
                    }}
                  >
                    {a.pakket === "intensief" ? "Intensief" : "Adviesgesprek"}
                  </span>
                </td>
                <td className="py-3 pr-4" style={{ color: "#4A5E4E", whiteSpace: "nowrap", fontSize: "0.82rem" }}>
                  {a.inkomen_bracket ?? "—"}
                </td>
                <td className="py-3 pr-4" style={{ color: "#4A5E4E", fontSize: "0.82rem", maxWidth: "200px" }}>
                  <KnelpuntCell tekst={a.grootste_knelpunt} />
                </td>
                <td className="py-3 pr-4" style={{ whiteSpace: "nowrap" }}>
                  {a.analyse_gedaan === null ? (
                    <span style={{ color: "#8A9E8E" }}>—</span>
                  ) : a.analyse_gedaan ? (
                    <span style={{ color: "#2D6A4F" }}>✓ Ja</span>
                  ) : (
                    <span style={{ color: "#8A9E8E" }}>Nee</span>
                  )}
                </td>
                <td className="py-3 pr-4" style={{ color: "#4A5E4E", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                  {a.start_voorkeur ?? "—"}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusPill status={a.status} />
                    <StatusSelect
                      id={a.id}
                      huidig={a.status}
                      onChange={(s) => updateStatus(a.id, s)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
