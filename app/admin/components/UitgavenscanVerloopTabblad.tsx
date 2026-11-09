"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { berekenVerloop, type Groep, type VoortgangRij } from "@/lib/uitgavenscan/verloop";

/**
 * Uitgavenscan-verloop (9-nov-2026). Op verzoek van Jarno: net als bij de analyse per stap zien of
 * mensen starten en waar ze afhaken. Gevoed door /api/admin/uitgavenscan-verloop; de berekening staat
 * in lib/uitgavenscan/verloop.ts, met dezelfde schermenlijst als de wizard.
 */

type Periode = "vandaag" | "week" | "maand" | "alles";

const BANK_LABEL: Record<string, string> = {
  rabobank: "Rabobank", ing: "ING", abn_amro: "ABN AMRO", sns: "SNS", asn: "ASN Bank", regiobank: "RegioBank",
  triodos: "Triodos", bunq: "bunq", knab: "Knab", anders: "Andere bank", onbekend: "Nog geen bank gekozen",
};
const PLEK_LABEL: Record<string, string> = { app: "Bankapp", computer: "Computer", weet_niet: "Weet ik niet", onbekend: "Niet gekozen" };
const APPARAAT_LABEL: Record<string, string> = { mobiel: "Mobiel", desktop: "Desktop", onbekend: "Onbekend" };
const LEESFOUT_LABEL: Record<string, string> = {
  onbekend_formaat: "Bestand niet herkend", geen_transacties: "Geen boekingen gevonden", te_kort: "Minder dan een volledige maand",
  te_groot: "Bestand te groot", wachtwoord: "Pdf met wachtwoord", kapot: "Bestand beschadigd", anders: "Anders",
};
const ADVIES_LABEL: Record<string, string> = {
  gemaakt: "Gemaakt", te_onvolledig: "Te veel onbekend, eerst meer vragen", mislukt: "Mislukt", te_druk: "Te druk (limiet)",
};

function pct(deel: number, geheel: number): string {
  return geheel > 0 ? Math.round((100 * deel) / geheel) + "%" : "";
}

function GroepTabel({ titel, groepen, labels }: { titel: string; groepen: Groep[]; labels: Record<string, string> }) {
  return (
    <section className="card-base overflow-hidden">
      <div className="px-4 py-3 border-b border-[#F0F3F1]">
        <h2 className="font-body font-semibold text-primary text-sm">{titel}</h2>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full text-sm" style={{ minWidth: 520 }}>
          <thead>
            <tr className="text-left text-text-muted text-xs">
              <th className="px-4 py-2 font-medium"></th>
              <th className="px-4 py-2 font-medium text-right">Geopend</th>
              <th className="px-4 py-2 font-medium text-right">Gestart</th>
              <th className="px-4 py-2 font-medium text-right">Gelezen</th>
              <th className="px-4 py-2 font-medium text-right">Advies</th>
              <th className="px-4 py-2 font-medium text-right">Aanvraag</th>
            </tr>
          </thead>
          <tbody>
            {groepen.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-text-muted text-xs">Nog niets gemeten.</td>
              </tr>
            )}
            {groepen.map((g) => (
              <tr key={g.sleutel} className="border-t border-[#F0F3F1]">
                <td className="px-4 py-1.5 text-primary">{labels[g.sleutel] ?? g.sleutel}</td>
                <td className="px-4 py-1.5 text-right text-text-soft">{g.geopend}</td>
                <td className="px-4 py-1.5 text-right text-text-soft">{g.gestart}</td>
                <td className="px-4 py-1.5 text-right">
                  {g.gelezen} <span className="text-xs text-text-muted">{pct(g.gelezen, g.gestart)}</span>
                </td>
                <td className="px-4 py-1.5 text-right">
                  {g.advies} <span className="text-xs text-text-muted">{pct(g.advies, g.gestart)}</span>
                </td>
                <td className="px-4 py-1.5 text-right text-primary font-medium">{g.aanvraag || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function UitgavenscanVerloopTabblad() {
  const [periode, setPeriode] = useState<Periode>("maand");
  const [rijen, setRijen] = useState<VoortgangRij[] | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [eigenTonen, setEigenTonen] = useState(false);

  useEffect(() => {
    let weg = false;
    setFout(null);
    fetch("/api/admin/uitgavenscan-verloop?periode=" + periode, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (weg) return;
        if (d.error) setFout(d.error);
        else setRijen(d.rijen as VoortgangRij[]);
      })
      .catch(() => !weg && setFout("Kon het verloop niet laden."));
    return () => {
      weg = true;
    };
  }, [periode]);

  const v = useMemo(() => (rijen ? berekenVerloop(rijen, { eigenTonen: eigenTonen }) : null), [rijen, eigenTonen]);
  const maxAfhaak = v ? Math.max(0, ...v.schermen.map((s) => s.afgehaakt)) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["vandaag", "week", "maand", "alles"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriode(p)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-body ${
                periode === p ? "bg-primary text-white border-primary" : "bg-white text-text-soft border-[#DCE2DF] hover:border-primary"
              }`}
            >
              {p === "vandaag" ? "Vandaag" : p === "week" ? "7 dagen" : p === "maand" ? "30 dagen" : "Alles"}
            </button>
          ))}
        </div>
        {v && v.aantalEigen > 0 && (
          <label className="flex items-center gap-2 text-xs text-text-soft font-body">
            <input type="checkbox" checked={eigenTonen} onChange={(e) => setEigenTonen(e.target.checked)} />
            Eigen testrondes meetellen ({v.aantalEigen})
          </label>
        )}
      </div>

      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}
      {!v && !fout && <p className="text-text-muted text-sm">Laden...</p>}

      {v && (
        <>
          <section className="card-base overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F3F1]">
              <h2 className="font-body font-semibold text-primary text-sm">Trechter</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Gestart: een bank gekozen. Percentages van geopend en van de stap ervoor.
                {v.nogBezig > 0 && ` ${v.nogBezig} sessie${v.nogBezig === 1 ? " is" : "s zijn"} nog bezig (laatste half uur) en tel${v.nogBezig === 1 ? "t" : "len"} niet als afgehaakt.`}
                {v.mediaanMinutenTotAdvies !== null && ` Mediaan van bank kiezen tot advies: ${v.mediaanMinutenTotAdvies} minuten.`}
              </p>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {v.trechter.map((t, i) => (
                  <tr key={t.stap} className="border-t border-[#F0F3F1]">
                    <td className="px-4 py-1.5 text-primary">{t.stap}</td>
                    <td className="px-4 py-1.5 text-right font-medium text-primary">{t.aantal}</td>
                    <td className="px-4 py-1.5 text-right text-xs text-text-muted">{i > 0 ? pct(t.aantal, v.trechter[0].aantal) : ""}</td>
                    <td className="px-4 py-1.5 text-right text-xs text-text-muted">{i > 0 ? pct(t.aantal, v.trechter[i - 1].aantal) + " van vorige" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card-base overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F3F1]">
              <h2 className="font-body font-semibold text-primary text-sm">Waar mensen afhaken, per scherm</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Gezien: het scherm kwam in beeld. Afgehaakt: dit was het verste scherm en er gebeurde daarna niets meer. Schermen met
                &quot;soms&quot; krijgt niet iedereen.
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="w-full text-sm" style={{ minWidth: 520 }}>
                <thead>
                  <tr className="text-left text-text-muted text-xs">
                    <th className="px-4 py-2 font-medium">Scherm</th>
                    <th className="px-4 py-2 font-medium text-right">Gezien</th>
                    <th className="px-4 py-2 font-medium text-right">Van gestart</th>
                    <th className="px-4 py-2 font-medium text-right">Afgehaakt</th>
                  </tr>
                </thead>
                <tbody>
                  {v.schermen.map((s, i) => (
                    <Fragment key={s.id}>
                      {(i === 0 || v.schermen[i - 1].fase !== s.fase) && (
                        <tr>
                          <td colSpan={4} className="px-4 pt-3 pb-1 text-xs uppercase tracking-wide text-text-muted">{s.fase}</td>
                        </tr>
                      )}
                      <tr className={s.afgehaakt > 0 && s.afgehaakt === maxAfhaak ? "bg-warning-bg" : ""}>
                        <td className="px-4 py-1.5 text-primary">
                          {s.label}
                          {s.soms && <span className="ml-2 text-xs text-text-muted">soms</span>}
                        </td>
                        <td className="px-4 py-1.5 text-right text-text-soft">{s.gezien}</td>
                        <td className="px-4 py-1.5 text-right text-xs text-text-muted">{s.deelVanGestart ? s.deelVanGestart + "%" : ""}</td>
                        <td className="px-4 py-1.5 text-right text-primary font-medium">{s.afgehaakt || ""}</td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <GroepTabel titel="Per bank" groepen={v.perBank} labels={BANK_LABEL} />
          <GroepTabel titel="Per apparaat" groepen={v.perApparaat} labels={APPARAAT_LABEL} />
          <GroepTabel titel="Waar ze het afschrift downloaden" groepen={v.perDownloadPlek} labels={PLEK_LABEL} />

          <div className="grid gap-6 md:grid-cols-2">
            <section className="card-base overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F0F3F1]">
                <h2 className="font-body font-semibold text-primary text-sm">Bestand niet gelezen</h2>
              </div>
              <ul className="px-4 py-2 text-sm">
                {v.leesfouten.length === 0 && <li className="text-text-muted text-xs py-1">Geen leesfouten.</li>}
                {v.leesfouten.map((f) => (
                  <li key={f.fout} className="flex justify-between py-1">
                    <span className="text-primary">{LEESFOUT_LABEL[f.fout] ?? f.fout}</span>
                    <span className="font-medium">{f.aantal}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="card-base overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F0F3F1]">
                <h2 className="font-body font-semibold text-primary text-sm">Voorlopig advies</h2>
              </div>
              <ul className="px-4 py-2 text-sm">
                {v.adviesStatus.length === 0 && <li className="text-text-muted text-xs py-1">Nog geen adviezen.</li>}
                {v.adviesStatus.map((a) => (
                  <li key={a.status} className="flex justify-between py-1">
                    <span className="text-primary">{ADVIES_LABEL[a.status] ?? a.status}</span>
                    <span className="font-medium">{a.aantal}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
