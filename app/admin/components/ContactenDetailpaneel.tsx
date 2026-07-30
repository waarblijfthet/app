"use client";

import { useEffect, useState, useCallback } from "react";
import Zijpaneel from "@/app/admin/ui/Zijpaneel";
import { SOORTEN, faseOpties, bronLabel } from "@/lib/contacten/labels";
import { Contact, ContactNotitie } from "@/lib/contacten/types";

interface Props {
  contactId: string | null;
  onClose: () => void;
  onWijziging: () => void;
}

interface Detail {
  contact: Contact;
  notities: ContactNotitie[];
}

function datumTijd(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/**
 * Detail- en bewerkpaneel voor een contact, op de gedeelde Zijpaneel-
 * primitive. Blokken: gegevens (met volgende actie erbij, één opslaan- en
 * annuleerknop), herkomst, notitietijdlijn. Zie
 * docs/admin-redesign-30-jul-2026.md sectie 7.
 *
 * Zelfde bugfix als OutreachDetailpaneel: bij een mislukte opslag springt
 * het bewerkveld terug naar de laatst opgeslagen waarde, niet pas na een
 * volgende herlaadronde.
 */
export default function ContactenDetailpaneel({ contactId, onClose, onWijziging }: Props) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [laden, setLaden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [opslaan, setOpslaan] = useState(false);

  const [veld, setVeld] = useState({
    naam: "", email: "", telefoon: "", praktijk: "", website: "", plaats: "",
    soort: "lead", fase: "", doelgroep: "",
    volgende_actie: "", volgende_actie_op: "",
  });

  const [notitieTekst, setNotitieTekst] = useState("");
  const [notitieVersturen, setNotitieVersturen] = useState(false);

  function zetTerug(contact: Contact) {
    setVeld({
      naam: contact.naam,
      email: contact.email,
      telefoon: contact.telefoon ?? "",
      praktijk: contact.praktijk ?? "",
      website: contact.website ?? "",
      plaats: contact.plaats ?? "",
      soort: contact.soort,
      fase: contact.fase,
      doelgroep: contact.doelgroep ?? "",
      volgende_actie: contact.volgende_actie ?? "",
      volgende_actie_op: contact.volgende_actie_op ?? "",
    });
  }

  const laadDetail = useCallback(async (id: string) => {
    setLaden(true);
    setFout(null);
    try {
      const res = await fetch(`/api/admin/contacten/${id}`);
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Kon contact niet laden."); return; }
      setDetail(data);
      zetTerug(data.contact);
    } catch {
      setFout("Kon contact niet laden (netwerkfout).");
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => {
    if (contactId) laadDetail(contactId);
    else setDetail(null);
  }, [contactId, laadDetail]);

  async function opslaan_() {
    if (!detail) return;
    setOpslaan(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/contacten", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: detail.contact.id,
          naam: veld.naam,
          email: veld.email,
          telefoon: veld.telefoon,
          praktijk: veld.praktijk,
          website: veld.website,
          plaats: veld.plaats,
          soort: veld.soort,
          fase: veld.fase,
          doelgroep: veld.soort === "verwijzer" ? veld.doelgroep : null,
          volgende_actie: veld.volgende_actie,
          volgende_actie_op: veld.volgende_actie_op,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFout(data.error ?? "Opslaan is mislukt.");
        zetTerug(detail.contact);
        return;
      }
      setDetail({ ...detail, contact: data });
      zetTerug(data);
      onWijziging();
    } catch {
      setFout("Opslaan is mislukt (netwerkfout).");
      zetTerug(detail.contact);
    } finally {
      setOpslaan(false);
    }
  }

  function annuleren() {
    if (detail) zetTerug(detail.contact);
  }

  async function notitieToevoegen() {
    if (!detail || !notitieTekst.trim()) return;
    setNotitieVersturen(true);
    try {
      const res = await fetch(`/api/admin/contacten/${detail.contact.id}/notities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst: notitieTekst.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Notitie toevoegen is mislukt."); return; }
      setDetail({ ...detail, notities: [data, ...detail.notities] });
      setNotitieTekst("");
    } catch {
      setFout("Notitie toevoegen is mislukt (netwerkfout).");
    } finally {
      setNotitieVersturen(false);
    }
  }

  const open = Boolean(contactId);
  const c = detail?.contact;

  return (
    <Zijpaneel open={open} onClose={onClose} titel={c?.naam ?? "Contact"} subtitel={c?.email}>
      {laden && <p className="text-text-muted text-sm">Laden...</p>}
      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-3 py-2 mb-4">{fout}</div>}

      {detail && c && (
        <div className="space-y-6">
          {/* Gegevens + volgende actie */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Gegevens</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-muted mb-1">Naam</label>
                <input type="text" value={veld.naam} onChange={(e) => setVeld({ ...veld, naam: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">E-mail</label>
                <input type="email" value={veld.email} onChange={(e) => setVeld({ ...veld, email: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Telefoon</label>
                <input type="text" value={veld.telefoon} onChange={(e) => setVeld({ ...veld, telefoon: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Praktijk</label>
                <input type="text" value={veld.praktijk} onChange={(e) => setVeld({ ...veld, praktijk: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Website</label>
                <input type="text" value={veld.website} onChange={(e) => setVeld({ ...veld, website: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Plaats</label>
                <input type="text" value={veld.plaats} onChange={(e) => setVeld({ ...veld, plaats: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Soort</label>
                <select value={veld.soort} onChange={(e) => setVeld({ ...veld, soort: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white">
                  {SOORTEN.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Fase</label>
                <select value={veld.fase} onChange={(e) => setVeld({ ...veld, fase: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white">
                  {faseOpties(veld.soort, veld.fase).map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              {veld.soort === "verwijzer" && (
                <div>
                  <label className="block text-xs text-text-muted mb-1">Doelgroep</label>
                  <input type="text" value={veld.doelgroep} onChange={(e) => setVeld({ ...veld, doelgroep: e.target.value })}
                    className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
                </div>
              )}
              <div>
                <label className="block text-xs text-text-muted mb-1">Volgende actie</label>
                <input type="text" value={veld.volgende_actie} onChange={(e) => setVeld({ ...veld, volgende_actie: e.target.value })}
                  placeholder="Bellen over verwijsafspraak"
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Op datum</label>
                <input type="date" value={veld.volgende_actie_op} onChange={(e) => setVeld({ ...veld, volgende_actie_op: e.target.value })}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button onClick={annuleren} disabled={opslaan} className="text-sm px-3 py-1.5 rounded-md border border-[#E6E9E7] text-text-soft disabled:opacity-50">
                  Annuleren
                </button>
                <button onClick={opslaan_} disabled={opslaan} className="btn-primary text-sm px-4 py-1.5 disabled:opacity-50">
                  {opslaan ? "Opslaan..." : "Opslaan"}
                </button>
              </div>
            </div>
          </section>

          {/* Herkomst */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Herkomst</h3>
            <div className="space-y-1.5 text-sm">
              <p className="text-text-soft">Bron: {bronLabel(c.bron)}</p>
              {c.outreach_contact_id && (
                <p>
                  <a href="/admin/outreach" className="text-accent underline">Bekijk in outreach</a>
                  <span className="text-text-muted"> (zoek op {c.email})</span>
                </p>
              )}
              {c.analyse_token && (
                <p>
                  <a href={`/resultaat/${c.analyse_token}`} target="_blank" rel="noreferrer" className="text-accent underline">
                    Bekijk analyse
                  </a>
                </p>
              )}
              {c.intake_id && (
                <p>
                  <a href="/admin/aanvragen" className="text-accent underline">Bekijk aanvraag</a>
                  <span className="text-text-muted"> (zoek op {c.email})</span>
                </p>
              )}
              {!c.outreach_contact_id && !c.analyse_token && !c.intake_id && (
                <p className="text-text-muted">Geen gekoppelde bron.</p>
              )}
            </div>
          </section>

          {/* Notities */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Notities</h3>
            <div className="space-y-2 mb-3">
              {detail.notities.length === 0 && <p className="text-xs text-text-muted">Nog geen notities.</p>}
              {detail.notities.map((n) => (
                <div key={n.id} className={`text-sm ${n.soort === "systeem" ? "text-text-muted italic" : "text-text-soft"}`}>
                  <span className="text-xs text-text-muted mr-2">{datumTijd(n.created_at)}</span>
                  {n.tekst}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                value={notitieTekst} onChange={(e) => setNotitieTekst(e.target.value)} rows={2}
                placeholder="Nieuwe notitie"
                className="flex-1 border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
              />
              <button onClick={notitieToevoegen} disabled={notitieVersturen || !notitieTekst.trim()}
                className="btn-primary text-sm px-3 py-1.5 self-end disabled:opacity-50">
                Toevoegen
              </button>
            </div>
          </section>
        </div>
      )}
    </Zijpaneel>
  );
}
