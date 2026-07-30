"use client";

import { useEffect, useState, useCallback } from "react";
import Zijpaneel from "@/app/admin/ui/Zijpaneel";
import Badge from "@/app/admin/ui/Badge";
import {
  DOELGROEPEN,
  REACTIE_LABEL,
  REACTIE_VARIANT,
  Reactie,
  rijpeDatum,
} from "@/lib/outreach/labels";
import { MAX_FOLLOWUPS } from "@/lib/outreach/mails";
import { OutreachContact, OutreachMail, ContactNotitie } from "@/lib/outreach/types";

interface Props {
  contactId: string | null;
  onClose: () => void;
  onWijziging: () => void;
  onFollowupVersturen: (id: string) => void;
}

interface Detail {
  contact: OutreachContact;
  mails: OutreachMail[];
  notities: ContactNotitie[];
}

function datumTijd(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function datumKort(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
}



/**
 * Detail- en bewerkpaneel voor een outreach-contact, op de gedeelde
 * Zijpaneel-primitive. Vier blokken: gegevens, mails, reactie, notities.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 5c.
 *
 * Bugfix t.o.v. de oude inline-tabelcellen: bij een mislukte opslag springt
 * het bewerkveld direct terug naar de laatst opgeslagen waarde (niet pas na
 * een volgende herlaadronde, zie sectie 1 van het ontwerpdocument).
 */
export default function OutreachDetailpaneel({ contactId, onClose, onWijziging, onFollowupVersturen }: Props) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [laden, setLaden] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [opslaan, setOpslaan] = useState(false);

  // Bewerkstate voor het gegevens-blok, apart van `detail.contact` zodat een
  // mislukte opslag het veld terug kan zetten zonder een herlaadronde nodig
  // te hebben.
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [plaats, setPlaats] = useState("");
  const [doelgroep, setDoelgroep] = useState("relatietherapeuten");
  const [psZin, setPsZin] = useState("");

  const [notitieTekst, setNotitieTekst] = useState("");
  const [notitieVersturen, setNotitieVersturen] = useState(false);

  function zetBewerkstateTerug(contact: OutreachContact) {
    setNaam(contact.naam);
    setEmail(contact.email);
    setPlaats(contact.plaats ?? "");
    setDoelgroep(contact.doelgroep);
    setPsZin(contact.ps_zin ?? "");
  }

  const laadDetail = useCallback(async (id: string) => {
    setLaden(true);
    setFout(null);
    try {
      const res = await fetch(`/api/admin/outreach/${id}`);
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Kon contact niet laden."); return; }
      setDetail(data);
      zetBewerkstateTerug(data.contact);
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

  async function opslaanGegevens() {
    if (!detail) return;
    setOpslaan(true);
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: detail.contact.id, naam, email, plaats, doelgroep, ps_zin: psZin,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFout(data.error ?? "Opslaan is mislukt.");
        zetBewerkstateTerug(detail.contact); // terug naar laatst opgeslagen waarde, geen stille desync
        return;
      }
      setDetail({ ...detail, contact: data });
      zetBewerkstateTerug(data);
      onWijziging();
    } catch {
      setFout("Opslaan is mislukt (netwerkfout).");
      zetBewerkstateTerug(detail.contact);
    } finally {
      setOpslaan(false);
    }
  }

  function annulerenGegevens() {
    if (detail) zetBewerkstateTerug(detail.contact);
  }

  async function actie(velden: Record<string, unknown>) {
    if (!detail) return;
    setFout(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: detail.contact.id, ...velden }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Bijwerken is mislukt."); return; }
      setDetail({ ...detail, contact: data });
      onWijziging();
    } catch {
      setFout("Bijwerken is mislukt (netwerkfout).");
    }
  }

  async function notitieToevoegen() {
    if (!detail || !notitieTekst.trim()) return;
    setNotitieVersturen(true);
    try {
      const res = await fetch(`/api/admin/outreach/${detail.contact.id}/notities`, {
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

  const volgendeMailNummer = c ? (c.followups ?? 0) + 2 : null;
  const followupMogelijk =
    c && !c.gestopt && !c.archived_at &&
    ["verstuurd", "geopend", "geklikt"].includes(c.status) &&
    (c.followups ?? 0) < MAX_FOLLOWUPS;

  return (
    <Zijpaneel
      open={open}
      onClose={onClose}
      titel={c?.naam ?? "Contact"}
      subtitel={c?.email}
    >
      {laden && <p className="text-text-muted text-sm">Laden...</p>}
      {fout && (
        <div className="bg-danger-bg text-danger text-sm rounded-md px-3 py-2 mb-4">{fout}</div>
      )}

      {detail && c && (
        <div className="space-y-6">
          {/* Gegevens */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Gegevens</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-muted mb-1">Naam</label>
                <input
                  type="text" value={naam} onChange={(e) => setNaam(e.target.value)}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">E-mail</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
                />
              </div>
              {c.praktijk && (
                <div>
                  <label className="block text-xs text-text-muted mb-1">Praktijk</label>
                  <p className="text-sm text-text-soft">{c.praktijk}</p>
                </div>
              )}
              {c.website && (
                <div>
                  <label className="block text-xs text-text-muted mb-1">Website</label>
                  <a href={c.website} target="_blank" rel="noreferrer" className="text-sm text-accent underline break-all">
                    {c.website}
                  </a>
                </div>
              )}
              <div>
                <label className="block text-xs text-text-muted mb-1">Plaats</label>
                <input
                  type="text" value={plaats} onChange={(e) => setPlaats(e.target.value)}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Doelgroep</label>
                <select
                  value={doelgroep} onChange={(e) => setDoelgroep(e.target.value)}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white"
                >
                  {DOELGROEPEN.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Persoonlijke zin</label>
                <textarea
                  value={psZin} onChange={(e) => setPsZin(e.target.value)} rows={3}
                  placeholder="Bijv. iets concreets van hun site"
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
                />
              </div>
              {c.context && (
                <details className="text-xs text-text-muted">
                  <summary className="cursor-pointer">Gevonden context uit prospects</summary>
                  <p className="mt-1 whitespace-pre-wrap">{c.context}</p>
                </details>
              )}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={annulerenGegevens}
                  disabled={opslaan}
                  className="text-sm px-3 py-1.5 rounded-md border border-[#E6E9E7] text-text-soft disabled:opacity-50"
                >
                  Annuleren
                </button>
                <button
                  onClick={opslaanGegevens}
                  disabled={opslaan}
                  className="btn-primary text-sm px-4 py-1.5 disabled:opacity-50"
                >
                  {opslaan ? "Opslaan..." : "Opslaan"}
                </button>
              </div>
            </div>
          </section>

          {/* Mails */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Mails</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((nummer) => {
                const m = detail.mails.find((x) => x.nummer === nummer);
                if (m) {
                  return (
                    <div key={nummer} className="text-sm text-text-soft">
                      Mail {nummer}{"  "}
                      <span className="text-text-muted">{datumKort(m.verstuurd_at)}</span>
                      {m.geklikt_at && <span className="text-accent"> · geklikt</span>}
                      {!m.geklikt_at && m.geopend_at && <span className="text-accent"> · geopend</span>}
                      {m.bounced_at && <span className="text-danger"> · bounced</span>}
                    </div>
                  );
                }
                if (nummer === volgendeMailNummer) {
                  const rijpDatum = rijpeDatum(c);
                  const rijp = rijpDatum ? datumKort(rijpDatum.toISOString()) : null;
                  return (
                    <div key={nummer} className="text-sm text-text-muted">
                      Mail {nummer}{"  "}
                      {c.gestopt ? "gestopt" : rijp ? `nog niet verstuurd, rijp op ${rijp}` : "nog niet verstuurd"}
                    </div>
                  );
                }
                return (
                  <div key={nummer} className="text-sm text-text-muted">Mail {nummer}{"  "}nog niet verstuurd</div>
                );
              })}
              {followupMogelijk && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onFollowupVersturen(c.id)}
                    className="text-sm px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Follow-up versturen
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Reactie */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Reactie</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(["positief", "neutraal", "negatief"] as Reactie[]).map((r) => (
                <button
                  key={r}
                  onClick={() => actie({ gereageerd: true, reactie: r })}
                  className={c.reactie === r ? "" : "opacity-60 hover:opacity-100"}
                >
                  <Badge variant={c.reactie === r ? REACTIE_VARIANT[r] : "neutraal"}>{REACTIE_LABEL[r]}</Badge>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted">
                Mails gestopt: {c.gestopt ? "ja" : "nee"}
                {c.gestopt_reden && ` (${c.gestopt_reden})`}
              </p>
              {["verstuurd", "geopend", "geklikt"].includes(c.status) && (
                <button
                  onClick={() => actie({ gestopt: !c.gestopt })}
                  className="text-xs px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {c.gestopt ? "Hervat mails" : "Stop mails"}
                </button>
              )}
            </div>
          </section>

          {/* Notities */}
          <section>
            <h3 className="font-body font-semibold text-primary text-sm mb-3">Notities</h3>
            <div className="space-y-2 mb-3">
              {detail.notities.length === 0 && (
                <p className="text-xs text-text-muted">Nog geen notities.</p>
              )}
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
              <button
                onClick={notitieToevoegen}
                disabled={notitieVersturen || !notitieTekst.trim()}
                className="btn-primary text-sm px-3 py-1.5 self-end disabled:opacity-50"
              >
                Toevoegen
              </button>
            </div>
          </section>
        </div>
      )}
    </Zijpaneel>
  );
}
