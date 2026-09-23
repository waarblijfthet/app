"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { CATEGORIE_LABEL } from "@/app/analyse/schermen";
import Badge from "@/app/admin/ui/Badge";
import {
  berekenVerloop,
  formatDuur,
  formatMoment,
  ingevuldeAntwoorden,
  pct,
  schermLabel,
  STATUS_LABEL,
  STATUS_VARIANT,
  type ApiData,
  type Periode,
  type Verrijkt,
} from "./analyse-verloop-berekening";

/**
 * Analyse-verloop (23-sep-2026). Per gestarte analyse: tot welk scherm iemand
 * kwam, welke antwoorden er staan en waar hij stopte. Daarboven de trechter
 * van openen tot Geldscan en een afhaaktabel per scherm.
 *
 * Hoe "gezien" werkt: de analyse schrijft een regel weg zodra een scherm in
 * beeld komt (app/analyse/QuizClient.tsx), met de hoogste positie in de
 * schermenlijst van die bezoeker. Welke schermen die bezoeker kreeg, hangt af
 * van zijn antwoorden (geen partner, geen auto, enzovoort). Die lijst rekent
 * deze pagina opnieuw uit met actieveSchermen(), dezelfde functie als de
 * analyse zelf. Afgehaakt op scherm X betekent: X was het verste scherm dat
 * in beeld kwam, en het is niet beantwoord.
 */

export default function AnalyseVerloopTabblad() {
  const [periode, setPeriode] = useState<Periode>("maand");
  const [data, setData] = useState<ApiData | null>(null);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);
  const [eigenTonen, setEigenTonen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [aantalZichtbaar, setAantalZichtbaar] = useState(50);

  useEffect(() => {
    let actief = true;
    setLaden(true);
    fetch(`/api/admin/analyse-verloop?periode=${periode}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Kon het analyse-verloop niet laden.");
        if (actief) {
          setData(json as ApiData);
          setFout(null);
        }
      })
      .catch((e) => {
        if (actief) setFout(e instanceof Error ? e.message : "Kon het analyse-verloop niet laden.");
      })
      .finally(() => {
        if (actief) setLaden(false);
      });
    return () => {
      actief = false;
    };
  }, [periode]);

  const berekend = useMemo(() => (data ? berekenVerloop(data, eigenTonen) : null), [data, eigenTonen]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["vandaag", "week", "maand", "alles"] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriode(p);
                setAantalZichtbaar(50);
              }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-body ${
                periode === p
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-soft border-[#E6E9E7] hover:border-primary"
              }`}
            >
              {p === "week" ? "7 dagen" : p === "maand" ? "30 dagen" : p}
            </button>
          ))}
        </div>
        {berekend && berekend.aantalEigen > 0 && (
          <label className="flex items-center gap-2 text-xs text-text-soft font-body">
            <input type="checkbox" checked={eigenTonen} onChange={(e) => setEigenTonen(e.target.checked)} />
            Eigen testrondes meetellen ({berekend.aantalEigen})
          </label>
        )}
      </div>

      {fout && <div className="bg-danger-bg text-danger text-sm rounded-md px-4 py-3">{fout}</div>}
      {laden && !data && <p className="text-text-muted text-sm">Laden...</p>}

      {berekend && (
        <>
          {/* Trechter */}
          <section className="card-base overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F3F1]">
              <h2 className="font-body font-semibold text-primary text-sm">Van openen tot Geldscan</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-[#F0F3F1]">
              {berekend.trechter.map((stap, i) => {
                const vorige = i > 0 ? berekend.trechter[i - 1].aantal : 0;
                return (
                  <div key={stap.label} className="px-4 py-3">
                    <p className="font-body text-xs text-text-muted mb-1">{stap.label}</p>
                    <p className="font-display font-light text-primary" style={{ fontSize: "1.8rem", lineHeight: 1.1 }}>
                      {stap.aantal.toLocaleString("nl-NL")}
                    </p>
                    <p className="font-body text-xs text-text-soft mt-0.5">
                      {i > 0 && vorige > 0 ? `${pct(stap.aantal, vorige)} van vorige stap` : stap.uitleg}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="px-4 py-3 border-t border-[#F0F3F1] text-xs text-text-muted font-body">
              Geopend komt uit de paginabezoeken, zonder jouw eigen bezoeken als het eigenaarsfilter aanstaat.
              E-mail en Geldscan zijn niet aan een sessie gekoppeld en tellen dus per periode, niet per
              bezoeker.{berekend.toestemming > 0 ? ` Toestemming voor de data-asset: ${berekend.toestemming}.` : ""}
            </p>
          </section>

          {/* Afhaken per scherm */}
          <section className="card-base overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F3F1]">
              <h2 className="font-body font-semibold text-primary text-sm">Waar de analyse afhaakt, per scherm</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Gezien: het scherm kwam in beeld. Afgehaakt: dit was het verste scherm en het is niet beantwoord.
                {berekend.oudeMeting > 0 &&
                  ` ${berekend.oudeMeting} analyse${berekend.oudeMeting === 1 ? "" : "s"} van vóór 6 september tel${
                    berekend.oudeMeting === 1 ? "t" : "len"
                  } hier niet mee.`}
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="w-full text-sm" style={{ minWidth: 520 }}>
                <thead>
                  <tr className="text-left text-text-muted text-xs">
                    <th className="px-4 py-2 font-medium">Scherm</th>
                    <th className="px-4 py-2 font-medium text-right">Gezien</th>
                    <th className="px-4 py-2 font-medium text-right">Afgehaakt</th>
                    <th className="px-4 py-2 font-medium">Afhaak van wie het zag</th>
                  </tr>
                </thead>
                <tbody>
                  {berekend.tabel.map((r, i) => {
                    const nieuweCategorie = i === 0 || berekend.tabel[i - 1].categorie !== r.categorie;
                    const piek = r.afgehaakt > 0 && r.afgehaakt === berekend.maxAfhaak;
                    return (
                      <Fragment key={r.id}>
                        {nieuweCategorie && (
                          <tr>
                            <td colSpan={4} className="px-4 pt-3 pb-1 text-xs uppercase tracking-wide text-text-muted">
                              {CATEGORIE_LABEL[r.categorie]}
                            </td>
                          </tr>
                        )}
                        <tr className={piek ? "bg-warning-bg" : ""}>
                          <td className="px-4 py-1.5 text-primary">{schermLabel(r.id)}</td>
                          <td className="px-4 py-1.5 text-right text-text-soft">{r.gezien}</td>
                          <td className="px-4 py-1.5 text-right text-primary font-medium">{r.afgehaakt || ""}</td>
                          <td className="px-4 py-1.5">
                            {r.gezien > 0 && r.afgehaakt > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-24 bg-[#F0F3F1] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-warning rounded-full"
                                    style={{ width: `${Math.round((r.afgehaakt / r.gezien) * 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-text-soft">{pct(r.afgehaakt, r.gezien)}</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Herkomst */}
          {berekend.herkomst.length > 0 && (
            <section className="card-base overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F0F3F1]">
                <h2 className="font-body font-semibold text-primary text-sm">Waar kwamen ze vandaan</h2>
                <p className="text-xs text-text-muted mt-0.5">De pagina of site vóór het eerste bezoek aan /analyse.</p>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full text-sm" style={{ minWidth: 480 }}>
                  <thead>
                    <tr className="text-left text-text-muted text-xs">
                      <th className="px-4 py-2 font-medium">Herkomst</th>
                      <th className="px-4 py-2 font-medium text-right">Geopend</th>
                      <th className="px-4 py-2 font-medium text-right">Gestart</th>
                      <th className="px-4 py-2 font-medium text-right">Resultaat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F3F1]">
                    {berekend.herkomst.map((h) => (
                      <tr key={h.bron}>
                        <td className="px-4 py-1.5 text-primary max-w-[320px] truncate" title={h.bron}>
                          {h.bron}
                        </td>
                        <td className="px-4 py-1.5 text-right text-text-soft">{h.geopend}</td>
                        <td className="px-4 py-1.5 text-right text-text-soft">
                          {h.gestart} <span className="text-text-muted text-xs">{pct(h.gestart, h.geopend)}</span>
                        </td>
                        <td className="px-4 py-1.5 text-right text-text-soft">{h.resultaat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Per sessie */}
          <section className="card-base overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F3F1]">
              <h2 className="font-body font-semibold text-primary text-sm">
                Alle gestarte analyses ({berekend.sessies.length})
              </h2>
              <p className="text-xs text-text-muted mt-0.5">Klik op een regel voor de schermen en de antwoorden.</p>
            </div>
            {berekend.sessies.length === 0 ? (
              <p className="px-4 py-6 text-sm text-text-muted">Nog geen analyse gestart in deze periode.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="w-full text-sm" style={{ minWidth: 760 }}>
                  <thead>
                    <tr className="text-left text-text-muted text-xs">
                      <th className="px-4 py-2 font-medium">Gestart</th>
                      <th className="px-4 py-2 font-medium">Status</th>
                      <th className="px-4 py-2 font-medium">Voortgang</th>
                      <th className="px-4 py-2 font-medium">Verste scherm</th>
                      <th className="px-4 py-2 font-medium">Duur</th>
                      <th className="px-4 py-2 font-medium">Apparaat</th>
                      <th className="px-4 py-2 font-medium">Herkomst</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F3F1]">
                    {berekend.sessies.slice(0, aantalZichtbaar).map((s) => {
                      const gezien = s.voltooid ? s.totaal : s.verstIndex + 1;
                      const isOpen = open === s.id;
                      return (
                        <Fragment key={s.id}>
                          <tr
                            className="cursor-pointer hover:bg-[#F7F8F7]"
                            onClick={() => setOpen(isOpen ? null : s.id)}
                          >
                            <td className="px-4 py-2 text-text-soft whitespace-nowrap">
                              {formatMoment(s.created_at)}
                              {s.eigenTest && <span className="ml-1 text-xs text-text-muted">(eigen)</span>}
                            </td>
                            <td className="px-4 py-2">
                              <Badge variant={STATUS_VARIANT[s.status]}>{STATUS_LABEL[s.status]}</Badge>
                            </td>
                            <td className="px-4 py-2">
                              {s.status === "oude-meting" ? (
                                <span className="text-xs text-text-muted">onbekend</span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-20 bg-[#F0F3F1] rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${s.voltooid ? "bg-success" : "bg-warning"}`}
                                      style={{ width: `${Math.round((gezien / Math.max(s.totaal, 1)) * 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-text-soft whitespace-nowrap">
                                    {gezien} van {s.totaal}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-2 text-primary">
                              {s.status === "oude-meting" ? "" : schermLabel(s.verstId)}
                            </td>
                            <td className="px-4 py-2 text-text-soft whitespace-nowrap">
                              {formatDuur(s.created_at, s.updated_at)}
                            </td>
                            <td className="px-4 py-2 text-text-soft">{s.apparaat ?? ""}</td>
                            <td className="px-4 py-2 text-text-soft max-w-[220px] truncate" title={s.herkomst}>
                              {s.herkomst}
                            </td>
                          </tr>
                          {isOpen && (
                            <tr className="bg-[#F7F8F7]">
                              <td colSpan={7} className="px-4 py-4">
                                <SessieDetail sessie={s} />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {berekend.sessies.length > aantalZichtbaar && (
              <div className="px-4 py-3 border-t border-[#F0F3F1]">
                <button
                  onClick={() => setAantalZichtbaar((n) => n + 50)}
                  className="text-xs text-accent hover:underline font-body"
                >
                  Toon er 50 meer
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function SessieDetail({ sessie }: { sessie: Verrijkt }) {
  const antwoorden = ingevuldeAntwoorden(sessie.antwoorden);
  const categorieen = Array.from(new Set(sessie.schermen.map((s) => s.categorie)));
  // Ging iemand terug, dan staat het laatst getoonde scherm vóór het verste.
  const huidigAnders =
    !sessie.voltooid &&
    sessie.huidig_scherm &&
    sessie.huidig_scherm !== "resultaat" &&
    sessie.huidig_scherm !== sessie.verstId
      ? sessie.huidig_scherm
      : null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-wide text-text-muted mb-2">Schermen voor deze bezoeker</p>
        {huidigAnders && (
          <p className="text-xs text-text-soft mb-2">
            Ging terug en stond als laatste op: {schermLabel(huidigAnders)}.
          </p>
        )}
        <div className="space-y-2">
          {categorieen.map((cat) => (
            <div key={cat}>
              <p className="text-xs font-medium text-primary">
                {CATEGORIE_LABEL[cat as 1 | 2 | 3 | 4 | 5]}
              </p>
              <ul className="mt-0.5">
                {sessie.schermen
                  .filter((s) => s.categorie === cat)
                  .map((s) => {
                    const isVerst = !sessie.voltooid && s.id === sessie.verstId;
                    return (
                      <li key={s.id} className="text-xs flex items-center gap-1.5">
                        <span className={s.gezien ? (isVerst ? "text-warning" : "text-success") : "text-text-muted"}>
                          {s.gezien ? (isVerst ? "■" : "✓") : "·"}
                        </span>
                        <span className={s.gezien ? "text-primary" : "text-text-muted"}>
                          {schermLabel(s.id)}
                          {isVerst ? ", hier gestopt" : ""}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
          <p className="text-xs flex items-center gap-1.5">
            <span className={sessie.voltooid ? "text-success" : "text-text-muted"}>{sessie.voltooid ? "✓" : "·"}</span>
            <span className={sessie.voltooid ? "text-primary" : "text-text-muted"}>Resultaat</span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-text-muted mb-2">Ingevulde antwoorden</p>
        {antwoorden.length === 0 ? (
          <p className="text-xs text-text-muted">Nog niets ingevuld.</p>
        ) : (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-xs">
            {antwoorden.map(([k, v]) => (
              <Fragment key={k}>
                <dt className="text-text-muted">{k}</dt>
                <dd className="text-primary">{v}</dd>
              </Fragment>
            ))}
          </dl>
        )}
        <p className="text-xs text-text-muted mt-3 break-all">Sessie: {sessie.sessie_id}</p>
      </div>
    </div>
  );
}
