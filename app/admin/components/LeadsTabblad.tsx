"use client";

import { useState, useMemo } from "react";
import { Lead } from "../page";
import DataTabel, { DataTabelKolom } from "../ui/DataTabel";
import Badge from "../ui/Badge";

interface Props {
  leads: Lead[];
  /** id van het gekoppelde contact per lead-id, zie getContactKoppelingen in app/admin/data.ts */
  contactPerLeadId: Record<string, string>;
}

function exporteerCSV(leads: Lead[]) {
  const headers = [
    "Email",
    "Naam",
    "Bron",
    "Datum",
    "Quiz voltooid",
    "Marketing toestemming",
  ];
  const rijen = leads.map((l) => [
    l.email,
    l.naam || "",
    l.bron,
    new Date(l.created_at).toLocaleDateString("nl-NL"),
    l.quiz_voltooid ? "Ja" : "Nee",
    l.toestemming_marketing ? "Ja" : "Nee",
  ]);
  const csv = [headers, ...rijen].map((r) => r.join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDatum(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LeadsTabblad({ leads, contactPerLeadId }: Props) {
  const [zoek, setZoek] = useState("");
  const [gekoppeld, setGekoppeld] = useState<Record<string, string>>(contactPerLeadId);
  const [doorzettenBezigId, setDoorzettenBezigId] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);

  async function doorzetten(leadId: string) {
    setDoorzettenBezigId(leadId);
    setFout(null);
    try {
      const res = await fetch("/api/admin/contacten/doorzetten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bron: "lead", lead_id: leadId }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Doorzetten is mislukt."); return; }
      setGekoppeld((prev) => ({ ...prev, [leadId]: data.contact.id }));
    } catch {
      setFout("Doorzetten is mislukt (netwerkfout).");
    } finally {
      setDoorzettenBezigId(null);
    }
  }

  const gefilterd = useMemo(
    () =>
      leads.filter(
        (l) =>
          l.email.toLowerCase().includes(zoek.toLowerCase()) ||
          (l.naam && l.naam.toLowerCase().includes(zoek.toLowerCase()))
      ),
    [leads, zoek]
  );

  const kolommen: DataTabelKolom<Lead>[] = [
    {
      key: "email",
      header: "Email",
      render: (l) => <span className="text-primary font-medium">{l.email}</span>,
      sorteerWaarde: (l) => l.email,
    },
    {
      key: "naam",
      header: "Naam",
      render: (l) => l.naam || <span className="text-text-muted">geen</span>,
      sorteerWaarde: (l) => l.naam ?? "",
    },
    {
      key: "bron",
      header: "Bron",
      render: (l) => <Badge>{l.bron}</Badge>,
      sorteerWaarde: (l) => l.bron,
    },
    {
      key: "datum",
      header: "Datum",
      render: (l) => <span className="text-text-muted">{formatDatum(l.created_at)}</span>,
      sorteerWaarde: (l) => l.created_at,
    },
    {
      key: "quiz",
      header: "Quiz",
      render: (l) =>
        l.quiz_voltooid ? (
          <span className="text-success">✓</span>
        ) : (
          <span className="text-text-muted">geen</span>
        ),
    },
    {
      key: "marketing",
      header: "Marketing",
      render: (l) =>
        l.toestemming_marketing ? (
          <span className="text-success">✓</span>
        ) : (
          <span className="text-text-muted">geen</span>
        ),
    },
    {
      key: "contact",
      header: "",
      render: (l) =>
        gekoppeld[l.id] ? (
          <a href={`/admin/contacten?open=${gekoppeld[l.id]}`} className="text-xs text-accent whitespace-nowrap">
            Bekijk contact →
          </a>
        ) : (
          <button
            onClick={() => doorzetten(l.id)}
            disabled={doorzettenBezigId === l.id}
            className="text-xs border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {doorzettenBezigId === l.id ? "Doorzetten..." : "Doorzetten naar contacten"}
          </button>
        ),
    },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-text-muted">
            <strong className="text-primary">{gefilterd.length}</strong> leads
          </span>
          <input
            type="search"
            value={zoek}
            onChange={(e) => setZoek(e.target.value)}
            placeholder="Zoek op email of naam…"
            className="input-base w-64 text-sm py-2"
            aria-label="Zoek leads"
          />
        </div>
        <button
          onClick={() => exporteerCSV(gefilterd)}
          className="btn-outline text-sm py-2 px-4"
        >
          ↓ Exporteer CSV
        </button>
      </div>

      {fout && <p className="font-body text-sm mb-3 text-danger">{fout}</p>}

      <DataTabel
        data={gefilterd}
        kolommen={kolommen}
        rijSleutel={(l) => l.id}
        legeStaatTitel="Geen leads gevonden"
        mobieleKaart={(l) => (
          <div className="rounded-xl border border-[#E6E9E7] bg-card p-4">
            <p className="font-body font-medium text-primary text-sm">{l.email}</p>
            {l.naam && <p className="font-body text-text-soft text-sm">{l.naam}</p>}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge>{l.bron}</Badge>
              <span className="font-body text-text-muted text-xs">
                {formatDatum(l.created_at)}
              </span>
              {l.quiz_voltooid && <Badge variant="goed">Quiz voltooid</Badge>}
              {l.toestemming_marketing && <Badge variant="actie">Marketing ok</Badge>}
            </div>
            <div className="mt-2">
              {gekoppeld[l.id] ? (
                <a href={`/admin/contacten?open=${gekoppeld[l.id]}`} className="text-xs text-accent">
                  Bekijk contact →
                </a>
              ) : (
                <button
                  onClick={() => doorzetten(l.id)}
                  disabled={doorzettenBezigId === l.id}
                  className="text-xs border border-primary text-primary px-3 py-1 rounded disabled:opacity-50"
                >
                  {doorzettenBezigId === l.id ? "Doorzetten..." : "Doorzetten naar contacten"}
                </button>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
