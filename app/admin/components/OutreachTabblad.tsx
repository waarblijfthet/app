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
  status: "nieuw" | "verstuurd" | "geopend" | "geklikt" | "bounced";
}

const STATUS_LABEL: Record<Contact["status"], string> = {
  nieuw: "Nieuw",
  verstuurd: "Verstuurd",
  geopend: "Geopend",
  geklikt: "Geklikt",
  bounced: "Bounced",
};

const STATUS_STYLE: Record<Contact["status"], string> = {
  nieuw:     "bg-gray-100 text-gray-600",
  verstuurd: "bg-blue-100 text-blue-700",
  geopend:   "bg-green-100 text-green-700",
  geklikt:   "bg-[#FFF0EB] text-[#C4603A]",
  bounced:   "bg-red-100 text-red-700",
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

  // Nieuw contact form
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ naam: naam.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      setNaam("");
      setEmail("");
      await laadContacten();
      setMelding(`${naam} toegevoegd.`);
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
    const nieuweIds = contacten.filter((c) => c.status === "nieuw").map((c) => c.id);
    if (nieuweIds.length === 0) { setFout("Geen nieuwe contacten om te versturen."); return; }
    if (!confirm(`${nieuweIds.length} e-mail(s) versturen?`)) return;
    setAllesVerzenden(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: nieuweIds }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error); return; }
      const geslaagd = data.resultaten?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      setMelding(`${geslaagd} van ${nieuweIds.length} verstuurd.`);
      await laadContacten();
    } finally {
      setAllesVerzenden(false);
      setTimeout(() => setMelding(null), 5000);
    }
  }

  const nieuweCount = contacten.filter((c) => c.status === "nieuw").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-primary">Outreach</h2>
          <p className="text-text-muted text-sm mt-0.5">
            {contacten.length} contacten &middot; {nieuweCount} nog niet verstuurd
          </p>
        </div>
        {nieuweCount > 0 && (
          <button
            onClick={stuurAlle}
            disabled={allesVerzenden}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
          >
            {allesVerzenden ? "Versturen..." : `Verstuur alle nieuwe (${nieuweCount})`}
          </button>
        )}
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
      ) : contacten.length === 0 ? (
        <p className="text-text-muted text-sm">Nog geen contacten. Voeg er een toe.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E8E0D0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Naam</th>
                <th className="text-left px-4 py-3">E-mail</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Verstuurd</th>
                <th className="text-left px-4 py-3">Geopend</th>
                <th className="text-left px-4 py-3">Geklikt</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE0]">
              {contacten.map((c) => (
                <tr key={c.id} className="bg-white hover:bg-[#FDFAF4] transition-colors">
                  <td className="px-4 py-3 font-medium text-primary">{c.naam}</td>
                  <td className="px-4 py-3 text-text-muted">{c.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{datumTijd(c.verstuurd_at)}</td>
                  <td className="px-4 py-3">
                    {c.geopend_at
                      ? <span className="text-green-600 text-xs">{datumTijd(c.geopend_at)}</span>
                      : <span className="text-text-muted text-xs">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    {c.geklikt_at
                      ? <span className="text-[#C4603A] text-xs">{datumTijd(c.geklikt_at)}</span>
                      : <span className="text-text-muted text-xs">—</span>
                    }
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
