"use client";

import { useState } from "react";
import type { AdviesRij } from "@/lib/uitgavenscan/adviezen";
import type { VoortgangRij } from "@/lib/uitgavenscan/verloop";
import { SCHERMEN } from "@/lib/uitgavenscan/meting";

/**
 * Bewaarde voorlopige adviezen (12-nov-2026). Op verzoek van Jarno: per bezoeker zien wat de AI
 * adviseerde en op welke samenvatting, voor de kwaliteit en om te snappen waarom iemand niet doorging.
 * Geen transacties, namen of rekeningnummers: die komen nooit op de server (lib/uitgaven/samenvatting.ts).
 * Gekoppeld aan de voortgang via sessie_id, voor bank, apparaat en tot waar iemand kwam.
 */

const BANK_LABEL: Record<string, string> = {
  rabobank: "Rabobank", ing: "ING", abn_amro: "ABN AMRO", sns: "SNS", asn: "ASN Bank", regiobank: "RegioBank",
  triodos: "Triodos", bunq: "bunq", knab: "Knab", anders: "Andere bank",
};
const STATUS: Record<string, { label: string; klasse: string }> = {
  gemaakt: { label: "Gemaakt", klasse: "bg-[#E4F1EE] text-[#0B7A6E]" },
  te_onvolledig: { label: "Te veel onbekend", klasse: "bg-warning-bg text-warning" },
  mislukt: { label: "Mislukt", klasse: "bg-danger-bg text-danger" },
};
const MAAND = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const BAK: Record<string, string> = { vast: "vast", nietMaandelijks: "niet maandelijks", dagelijks: "dagelijks" };

function euro(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "";
  return (n < 0 ? "\u2212 " : "") + "\u20AC " + Math.abs(Math.round(n)).toLocaleString("nl-NL");
}

function maand(m: string): string {
  const [j, mm] = m.split("-");
  const i = parseInt(mm, 10) - 1;
  return (MAAND[i] ?? mm) + " " + (j ?? "").slice(2);
}

function moment(iso: string): string {
  return new Date(iso).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function verste(v: VoortgangRij | undefined): string {
  if (!v || v.max_scherm_index === null || v.max_scherm_index === undefined) return "";
  return SCHERMEN[v.max_scherm_index]?.label ?? "";
}

function Regel({ label, waarde, sterk }: { label: string; waarde: string; sterk?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1 border-t border-[#F0F3F1] first:border-t-0">
      <span className="text-text-soft">{label}</span>
      <span className={sterk ? "font-semibold text-primary" : "text-primary"}>{waarde}</span>
    </div>
  );
}

function Blok({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="m-0 mb-1.5 text-xs uppercase tracking-wide text-text-muted">{titel}</p>
      {children}
    </div>
  );
}

export function AdviesDetail({ a }: { a: AdviesRij }) {
  const [ruw, setRuw] = useState(false);
  const s = a.samenvatting;
  const g = s.gemiddeldPerMaand;
  const categorieen = (s.categorieen ?? []).slice().sort((x, y) => y.perMaand - x.perMaand);
  return (
    <div className="px-4 pb-5 pt-1 space-y-5 text-sm">
      {a.advies ? (
        <div className="rounded-xl border border-[#DCE2DF] bg-white p-4 space-y-3">
          <p className="m-0 font-display text-lg leading-snug text-primary">{a.advies.kern}</p>
          <p className="m-0 text-text-soft">
            <span className="text-[#0B7A6E] font-semibold">Gaat goed: </span>
            {a.advies.watGoedGaat}
          </p>
          <ul className="m-0 p-0 list-none space-y-2">
            {a.advies.opvallend.map((o, i) => (
              <li key={i} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <span className="font-display text-base text-primary whitespace-nowrap">
                  {o.getal}
                  {o.bij && <span className="block text-xs text-text-muted font-body">{o.bij}</span>}
                </span>
                <span>
                  <span className="font-semibold text-primary">{o.titel}</span>
                  <span className="block text-text-soft">{o.uitleg}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="m-0 text-text-soft">
            <span className="font-semibold text-primary">Vanavond al te doen: </span>
            {a.advies.eersteStap}
          </p>
          <div>
            <p className="m-0 font-semibold text-primary">Wat het plan regelt</p>
            <ul className="m-0 pl-5 list-disc text-text-soft">
              {a.advies.inHetPlan.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-danger-bg text-danger p-3 text-xs">
          Geen advies getoond. {(a.fouten ?? []).join(" · ")}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Blok titel={"Gemiddeld per maand (" + s.maanden.length + " maanden)"}>
          <Regel label="Inkomen" waarde={euro(g.inkomen)} />
          {g.overigeOntvangsten !== 0 && <Regel label="Overige ontvangsten" waarde={euro(g.overigeOntvangsten)} />}
          <Regel label="Vaste lasten" waarde={euro(g.vast)} />
          <Regel label="Niet maandelijks" waarde={euro(g.nietMaandelijks)} />
          <Regel label="Dagelijks" waarde={euro(g.dagelijks)} />
          {g.extraAflossing !== 0 && <Regel label="Extra aflossing" waarde={euro(g.extraAflossing)} />}
          <Regel label="Over" waarde={euro(g.over)} sterk />
          <Regel label="Over in een gewone maand" waarde={euro(g.overGewoneMaand)} />
          <Regel label="Netto naar potjes" waarde={euro(s.sparen?.nettoPerMaand)} />
          <Regel label="Nog niet ingedeeld" waarde={s.kwaliteit.aandeelOnbekend + "%"} />
          <Regel label="Overboekingen" waarde={s.kwaliteit.aandeelOverboekingen + "%"} />
          <Regel label="Rekeningen in het bestand" waarde={String(s.kenmerken.aantalRekeningen)} />
        </Blok>
        <Blok titel="Per maand">
          <div style={{ overflowX: "auto" }}>
            <table className="w-full text-xs" style={{ minWidth: 360 }}>
              <thead>
                <tr className="text-text-muted text-left">
                  <th className="py-1 font-medium"></th>
                  <th className="py-1 font-medium text-right">Inkomen</th>
                  <th className="py-1 font-medium text-right">Vast</th>
                  <th className="py-1 font-medium text-right">Niet mnd.</th>
                  <th className="py-1 font-medium text-right">Dagelijks</th>
                  <th className="py-1 font-medium text-right">Over</th>
                </tr>
              </thead>
              <tbody>
                {s.perMaand.map((m) => (
                  <tr key={m.maand} className="border-t border-[#F0F3F1]">
                    <td className="py-1 text-primary">{maand(m.maand)}</td>
                    <td className="py-1 text-right">{euro(m.inkomen)}</td>
                    <td className="py-1 text-right">{euro(m.vast)}</td>
                    <td className="py-1 text-right">{euro(m.nietMaandelijks)}</td>
                    <td className="py-1 text-right">{euro(m.dagelijks)}</td>
                    <td className="py-1 text-right font-medium text-primary">{euro(m.over)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Blok>
        <Blok titel="Categorieën per maand">
          {categorieen.map((c) => (
            <Regel key={c.naam + c.bak} label={c.naam + " (" + (BAK[c.bak] ?? c.bak) + ", " + c.aantalPerMaand + "x)"} waarde={euro(c.perMaand)} />
          ))}
        </Blok>
        <div className="space-y-5">
          <Blok titel={"Vaste lasten (" + s.vasteLasten.length + ")"}>
            {s.vasteLasten.slice(0, 25).map((v, i) => (
              <Regel key={i} label={v.naam + " \u00B7 " + v.categorie} waarde={euro(v.perMaand)} />
            ))}
          </Blok>
          {s.nietMaandelijks.length > 0 && (
            <Blok titel="Niet maandelijks">
              {s.nietMaandelijks.slice(0, 25).map((n, i) => (
                <Regel key={i} label={n.naam + " \u00B7 " + maand(n.maand) + (n.aard !== "onbekend" ? " \u00B7 " + n.aard : "")} waarde={euro(n.bedrag)} />
              ))}
            </Blok>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
        {a.model && <span>{a.model}</span>}
        {a.pogingen !== null && <span>{a.pogingen} {a.pogingen === 1 ? "poging" : "pogingen"}</span>}
        {a.duur_ms !== null && <span>{Math.round(a.duur_ms / 1000)} s</span>}
        {a.tokens && <span>{a.tokens.invoer.toLocaleString("nl-NL")} in, {a.tokens.uitvoer.toLocaleString("nl-NL")} uit, {a.tokens.cache.toLocaleString("nl-NL")} uit cache</span>}
        {a.advies && a.fouten && a.fouten.length > 0 && <span>{a.fouten.join(" · ")}</span>}
        <button onClick={() => setRuw(!ruw)} className="underline text-text-soft">
          {ruw ? "Verberg ruwe samenvatting" : "Ruwe samenvatting"}
        </button>
      </div>
      {ruw && <pre className="m-0 max-h-[360px] overflow-auto bg-white rounded-xl p-3 text-xs leading-relaxed border border-[#DCE2DF]">{JSON.stringify(s, null, 2)}</pre>}
    </div>
  );
}

export default function UitgavenscanAdviezen({
  adviezen,
  fout,
  voortgang,
  eigenTonen,
}: {
  adviezen: AdviesRij[] | null;
  fout: string | null;
  voortgang: VoortgangRij[];
  eigenTonen: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const perSessie = new Map<string, VoortgangRij>();
  voortgang.forEach((v) => perSessie.set(v.sessie_id, v));
  const lijst = (adviezen ?? []).filter((a) => eigenTonen || a.eigenaar !== true);
  const aantalEigen = (adviezen ?? []).filter((a) => a.eigenaar === true).length;

  return (
    <section className="card-base overflow-hidden">
      <div className="px-4 py-3 border-b border-[#F0F3F1]">
        <h2 className="font-body font-semibold text-primary text-sm">Wat de AI adviseerde</h2>
        <p className="text-xs text-text-muted mt-0.5">
          Elk voorlopig advies met de samenvatting waarop het gebaseerd is. Geen boekingen, namen of rekeningnummers; die blijven op het
          apparaat van de bezoeker. Bewaard sinds 12 november 2026.
          {!eigenTonen && aantalEigen > 0 && " " + aantalEigen + " eigen testronde" + (aantalEigen === 1 ? "" : "s") + " verborgen."}
        </p>
      </div>
      {fout && (
        <div className="bg-warning-bg text-warning text-sm px-4 py-3">
          Adviezen konden niet geladen worden ({fout}). Is <code>supabase/uitgavenscan_adviezen.sql</code> al gedraaid?
        </div>
      )}
      {!fout && lijst.length === 0 && <p className="px-4 py-3 text-text-muted text-xs m-0">Nog geen bewaarde adviezen in deze periode.</p>}
      <ul className="m-0 p-0 list-none">
        {lijst.map((a) => {
          const v = a.sessie_id ? perSessie.get(a.sessie_id) : undefined;
          const st = STATUS[a.status] ?? { label: a.status, klasse: "bg-[#F0F3F1] text-text-soft" };
          const aanvraag = !!v?.tijden?.aanvraag_verzonden;
          const isOpen = open === a.id;
          return (
            <li key={a.id} className="border-t border-[#F0F3F1] first:border-t-0">
              <button onClick={() => setOpen(isOpen ? null : a.id)} className="w-full text-left px-4 py-3 hover:bg-[#FAFBFA] flex flex-col gap-1">
                <span className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  <span className="text-primary font-medium">{moment(a.created_at)}</span>
                  <span className={"px-2 py-0.5 rounded-full " + st.klasse}>{st.label}</span>
                  {v?.kenmerken?.bank && <span>{BANK_LABEL[v.kenmerken.bank] ?? v.kenmerken.bank}</span>}
                  {v?.apparaat && <span>{v.apparaat}</span>}
                  <span>{a.samenvatting.maanden.length} mnd</span>
                  <span>inkomen {euro(a.samenvatting.gemiddeldPerMaand.inkomen)}</span>
                  <span>over {euro(a.samenvatting.gemiddeldPerMaand.over)}</span>
                  {aanvraag ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-white">Geldscan aangevraagd</span>
                  ) : (
                    v && <span>verst: {verste(v)}</span>
                  )}
                  {a.eigenaar && <span className="italic">eigen test</span>}
                </span>
                <span className="text-sm text-primary">{a.advies ? a.advies.kern : (a.fouten ?? [])[0] ?? ""}</span>
              </button>
              {isOpen && <AdviesDetail a={a} />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
