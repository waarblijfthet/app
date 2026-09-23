"use client";

import { useEffect } from "react";
import { DEFAULT_QUIZ_DATA, fmtEur, parseEur, type QuizData } from "@/lib/quiz-types";
import {
  berekenTotaalInkomen,
  berekenJaarlijks,
} from "@/lib/benchmarks";
import { CATEGORIE_LABEL } from "@/app/analyse/schermen";
import { berekenResultaat, zinVoorAfwijking } from "@/app/analyse/stappen/resultaat/berekenResultaat";
import { CategorieVergelijking } from "@/app/analyse/stappen/resultaat/Resultaat2Verschil";
import Badge from "@/app/admin/ui/Badge";
import {
  formatDuur,
  formatMoment,
  schermLabel,
  STATUS_LABEL,
  STATUS_VARIANT,
  type Verrijkt,
} from "./analyse-verloop-berekening";

/**
 * Eén ingevulde analyse, getoond zoals de bezoeker zijn resultaat zag
 * (23-sep-2026, op verzoek van Jarno: de lijst met ruwe veldnamen was
 * onleesbaar). De uitkomst komt uit berekenResultaat, dezelfde functie als het
 * resultaatscherm van de analyse, en de balken zijn hetzelfde component. Wat
 * je hier ziet is dus wat de bezoeker zag, niet een eigen interpretatie.
 */

type Soort = "eur" | "keuze" | "ja";
type Veld = { sleutel: keyof QuizData; label: string; soort: Soort; per?: keyof QuizData; bench?: number };

const KEUZE: Record<string, Record<string, string>> = {
  volwassenen: { "1": "Alleen", "2": "Met partner" },
  woonsituatie: { huur: "Huur", koop: "Koop" },
  auto: { geen: "Geen auto", eigen: "Eigen auto", "lease_privé": "Private lease", zakelijk: "Zakelijke auto" },
  kinderen: { "0": "Geen", "1": "1", "2": "2", "3": "3 of meer" },
  zorgToggle: { totaal: "Totaalbedrag", per_persoon: "Per persoon" },
};

function waarde(data: QuizData, v: Veld): string | null {
  const ruw = data[v.sleutel] as unknown;
  if (v.soort === "ja") return ruw === true ? "Ja" : null;
  if (v.soort === "keuze") {
    if (ruw === null || ruw === undefined || ruw === "") return null;
    // Een keuze die nog op de beginwaarde staat (bv. zorg "totaalbedrag") is
    // niet door de bezoeker gekozen; alleen tonen als hij afwijkt.
    const standaard = (DEFAULT_QUIZ_DATA as unknown as Record<string, unknown>)[v.sleutel as string];
    if (standaard !== null && standaard !== undefined && standaard === ruw) return null;
    return KEUZE[v.sleutel as string]?.[String(ruw)] ?? String(ruw);
  }
  const bedrag = parseEur(String(ruw ?? ""));
  if (!ruw || String(ruw).trim() === "") return null;
  const per = v.per ? (data[v.per] as unknown) : null;
  return `${fmtEur(bedrag)}${per === "jaar" ? " per jaar" : ""}`;
}

function Kaart({
  titel,
  totaal,
  bench,
  velden,
  data,
  bereikt,
}: {
  titel: string;
  totaal?: number;
  bench?: number;
  velden: Veld[];
  data: QuizData;
  bereikt: boolean;
}) {
  const rijen = velden
    .map((v) => ({ v: v, tekst: waarde(data, v) }))
    .filter((r) => r.tekst !== null);
  return (
    <div className="rounded-xl border border-[#E6E9E7] bg-white p-4">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p className="section-eyebrow">{titel}</p>
        {totaal !== undefined && totaal > 0 && (
          <p className="font-body text-sm font-medium text-primary">{fmtEur(totaal)}</p>
        )}
      </div>
      {!bereikt ? (
        <p className="font-body text-xs text-text-muted">Niet aan toegekomen.</p>
      ) : rijen.length === 0 ? (
        <p className="font-body text-xs text-text-muted">Niets ingevuld.</p>
      ) : (
        <dl className="space-y-1">
          {rijen.map(({ v, tekst }) => (
            <div key={v.sleutel as string} className="flex justify-between gap-3 text-sm">
              <dt className="font-body text-text-soft">{v.label}</dt>
              <dd className="font-body text-primary text-right">
                {tekst}
                {v.bench !== undefined && v.bench > 0 && (
                  <span className="block text-xs text-text-muted">verwacht {fmtEur(v.bench)}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {bereikt && bench !== undefined && bench > 0 && totaal !== undefined && totaal > 0 && (
        <p className="font-body text-xs text-text-muted mt-3 pt-2 border-t border-[#F0F3F1]">
          Vergelijkbaar huishouden: {fmtEur(bench)}
        </p>
      )}
    </div>
  );
}

function Stap({ label, status }: { label: string; status: "ja" | "nee" | "onbekend" }) {
  const kleur =
    status === "ja"
      ? "bg-success-bg text-success border-transparent"
      : status === "nee"
      ? "bg-white text-text-muted border-[#E6E9E7]"
      : "bg-white text-text-muted border-dashed border-[#D9DEDC]";
  const teken = status === "ja" ? "✓" : status === "nee" ? "–" : "?";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-body ${kleur}`}>
      <span aria-hidden>{teken}</span>
      {label}
    </span>
  );
}

export default function AnalyseResultaatPopup({
  sessie,
  onSluit,
}: {
  sessie: Verrijkt;
  onSluit: () => void;
}) {
  useEffect(() => {
    const opToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSluit();
    };
    window.addEventListener("keydown", opToets);
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", opToets);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [onSluit]);

  const data = { ...DEFAULT_QUIZ_DATA, ...(sessie.antwoorden as Partial<QuizData>) } as QuizData;
  const inkomen = berekenTotaalInkomen(data);

  // Alleen voor afgeronde analyses: bij een afhaker tellen de nog lege
  // bedragen als nul, en dan zou hier een uitkomst staan die de bezoeker nooit
  // zag en die niet klopt.
  let r: ReturnType<typeof berekenResultaat> | null = null;
  try {
    r = sessie.voltooid && inkomen > 0 ? berekenResultaat(data) : null;
  } catch {
    r = null;
  }

  const bereiktCategorie = (cat: number) =>
    sessie.voltooid || sessie.schermen.some((s) => s.categorie === cat && s.gezien);
  const gezien = sessie.voltooid ? sessie.totaal : sessie.verstIndex + 1;
  const n = sessie.nazorg;
  const nazorg = (ja: boolean): "ja" | "nee" | "onbekend" => (ja ? "ja" : n.gemeten ? "nee" : "onbekend");
  const b = r?.benches;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto"
      onClick={onSluit}
      role="dialog"
      aria-modal="true"
      aria-label="Ingevulde analyse"
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#F7F8F7] shadow-xl my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kop */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-[#E6E9E7] bg-white px-5 py-4">
          <div>
            <p className="font-display text-xl text-primary">Analyse van {formatMoment(sessie.created_at)}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-text-soft font-body">
              <Badge variant={STATUS_VARIANT[sessie.status]}>{STATUS_LABEL[sessie.status]}</Badge>
              <span>{sessie.apparaat ?? "onbekend apparaat"}</span>
              <span>·</span>
              <span>{formatDuur(sessie.created_at, sessie.updated_at)}</span>
              <span>·</span>
              <span className="truncate max-w-[220px]" title={sessie.herkomst}>via {sessie.herkomst}</span>
              {sessie.eigenTest && <span className="text-text-muted">(eigen test)</span>}
            </div>
          </div>
          <button
            type="button"
            onClick={onSluit}
            className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center text-text-soft hover:bg-[#F0F3F1]"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Verloop */}
          <section>
            <p className="section-eyebrow mb-2">Verloop</p>
            <div className="flex flex-wrap gap-2">
              <Stap label="Gestart" status="ja" />
              <Stap
                label={sessie.status === "oude-meting" ? "Vragen" : `Vragen ${gezien} van ${sessie.totaal}`}
                status={sessie.voltooid ? "ja" : "nee"}
              />
              <Stap label="Resultaat gezien" status={sessie.voltooid ? "ja" : "nee"} />
              <Stap label="Aanbodscherm" status={nazorg(n.resultaatStap >= 4)} />
              <Stap label="Geldscan-knop" status={nazorg(n.geldscanKlik)} />
              <Stap label="Bewaarformulier geopend" status={nazorg(n.bewarenGeopend)} />
              <Stap label="E-mail achtergelaten" status={nazorg(n.emailAchtergelaten)} />
              {(n.aanvraagGestart || n.aanvraagVerstuurd) && (
                <Stap label={n.aanvraagVerstuurd ? "Aanvraag verstuurd" : "Aanvraag begonnen"} status="ja" />
              )}
            </div>
            {!n.gemeten && (
              <p className="mt-2 text-xs text-text-muted font-body">
                Wat er na het resultaat gebeurde, wordt gemeten vanaf 23 september. Een vraagteken is onbekend,
                niet nee.
              </p>
            )}
            {!sessie.voltooid && sessie.status !== "oude-meting" && (
              <p className="mt-2 text-sm text-primary font-body">
                Gestopt op <strong>{schermLabel(sessie.verstId)}</strong>
                {sessie.verstId && sessie.schermen.find((s) => s.id === sessie.verstId)
                  ? `, in het onderdeel ${CATEGORIE_LABEL[
                      sessie.schermen.find((s) => s.id === sessie.verstId)!.categorie as 1 | 2 | 3 | 4 | 5
                    ].toLowerCase()}`
                  : ""}
                .
              </p>
            )}
          </section>

          {/* Uitkomst zoals de bezoeker hem zag */}
          {r && (
            <section className="rounded-2xl border border-[#E6E9E7] bg-white p-5 sm:p-6">
              <p className="section-eyebrow mb-3">Zo zag het resultaat eruit</p>
              <h3 className="font-display font-light text-primary text-xl sm:text-2xl leading-snug mb-5">
                {r.conclusieKop}
              </h3>
              <div className="text-center">
                <p className="section-eyebrow mb-1">Geschatte financiële ruimte</p>
                <p
                  className={`font-display font-light text-5xl ${r.over < 0 ? "text-[#C4603A]" : "text-primary"}`}
                >
                  {r.over < 0 ? `-${fmtEur(Math.abs(r.over))}` : fmtEur(r.over)}
                </p>
                <p className="text-text-muted font-body text-sm">per maand</p>
                <p className="text-text-soft font-body text-sm mt-3">
                  Voor een vergelijkbaar huishouden verwachten we ongeveer{" "}
                  <strong className="text-primary font-medium">{fmtEur(r.benches.vrij_besteedbaar)}</strong>.
                </p>
                <p className="text-primary font-body text-sm mt-2">{r.contextZin}</p>
              </div>
            </section>
          )}

          {r && sessie.voltooid && r.opvallend.length > 0 && (
            <section className="rounded-2xl border border-[#E6E9E7] bg-white px-5 sm:px-6">
              <p className="section-eyebrow pt-5">Grootste verschillen die de bezoeker zag</p>
              {r.opvallend.map((a, i) => (
                <CategorieVergelijking
                  key={a.label}
                  label={a.label}
                  jij={a.jij}
                  benchmark={a.bench}
                  interpretatie={zinVoorAfwijking(a, i)}
                />
              ))}
            </section>
          )}

          {/* Wat er is ingevuld */}
          <section>
            <p className="section-eyebrow mb-2">Wat er is ingevuld</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Kaart
                titel="Huishouden"
                data={data}
                bereikt={true}
                velden={[
                  { sleutel: "volwassenen", label: "Volwassenen", soort: "keuze" },
                  { sleutel: "kinderen", label: "Kinderen", soort: "keuze" },
                  { sleutel: "woonsituatie", label: "Woonsituatie", soort: "keuze" },
                  { sleutel: "auto", label: "Vervoer", soort: "keuze" },
                  { sleutel: "tweedeAuto", label: "Tweede auto", soort: "ja" },
                ]}
              />
              <Kaart
                titel="Inkomen per maand"
                totaal={inkomen}
                data={data}
                bereikt={bereiktCategorie(2)}
                velden={[
                  { sleutel: "salaris1", label: "Netto salaris", soort: "eur" },
                  { sleutel: "salaris2", label: "Netto salaris partner", soort: "eur" },
                  { sleutel: "inkomenWisselend", label: "Inkomen wisselt", soort: "ja" },
                  { sleutel: "salaris1InclVakantiegeld", label: "Incl. vakantiegeld", soort: "ja" },
                  { sleutel: "salaris1InclDertiende", label: "Incl. dertiende maand", soort: "ja" },
                  { sleutel: "salaris2InclVakantiegeld", label: "Partner incl. vakantiegeld", soort: "ja" },
                  { sleutel: "salaris2InclDertiende", label: "Partner incl. dertiende maand", soort: "ja" },
                  { sleutel: "toeslagZorg", label: "Zorgtoeslag", soort: "eur" },
                  { sleutel: "toeslagKindgebonden", label: "Kindgebonden budget", soort: "eur" },
                  { sleutel: "toeslagKinderopvang", label: "Kinderopvangtoeslag", soort: "eur" },
                  { sleutel: "toeslagKinderbijslag", label: "Kinderbijslag", soort: "eur" },
                  { sleutel: "toeslagHuur", label: "Huurtoeslag", soort: "eur" },
                  { sleutel: "toeslagOverig", label: "Overig inkomen", soort: "eur" },
                  { sleutel: "hypotheekRenteAftrek", label: "Hypotheekrenteaftrek", soort: "eur", per: "hypotheekRenteAftrekPer" },
                ]}
              />
              <Kaart
                titel="Wonen per maand"
                totaal={r?.wonenTotaal}
                bench={b?.wonen}
                data={data}
                bereikt={bereiktCategorie(3)}
                velden={[
                  { sleutel: "huurHypotheek", label: data.woonsituatie === "koop" ? "Hypotheek" : "Huur", soort: "eur" },
                  { sleutel: "energie", label: "Energie", soort: "eur", bench: b?.energie },
                  { sleutel: "internet", label: "Internet en tv", soort: "eur", bench: b?.internet },
                  { sleutel: "servicekosten", label: "Servicekosten", soort: "eur" },
                  { sleutel: "gemeenteBelastingen", label: "Gemeentelijke lasten", soort: "eur", per: "gemeenteBelastingenPer" },
                ]}
              />
              <Kaart
                titel="Vervoer per maand"
                totaal={r?.vervoerTotaal}
                bench={b?.vervoer}
                data={data}
                bereikt={bereiktCategorie(4)}
                velden={[
                  { sleutel: "brandstof", label: "Brandstof", soort: "eur" },
                  { sleutel: "autoVerzWB", label: "Verzekering en wegenbelasting", soort: "eur" },
                  { sleutel: "leaseBedrag", label: "Leasebedrag", soort: "eur" },
                  { sleutel: "zakelijkEigenBijdrage", label: "Eigen bijdrage zakelijke auto", soort: "eur" },
                  { sleutel: "ovAbonnement", label: "OV", soort: "eur" },
                ]}
              />
              <Kaart
                titel="Verzekeringen per maand"
                totaal={r?.verzekeringTotaal}
                bench={b?.verzekeringen}
                data={data}
                bereikt={bereiktCategorie(4)}
                velden={[
                  { sleutel: "zorgPerPersoon", label: "Zorgverzekering", soort: "eur" },
                  { sleutel: "zorgToggle", label: "Ingevuld als", soort: "keuze" },
                  { sleutel: "verzekeringOverig", label: "Overige verzekeringen", soort: "eur" },
                ]}
              />
              <Kaart
                titel="Overige uitgaven per maand"
                data={data}
                bereikt={bereiktCategorie(5)}
                velden={[
                  { sleutel: "boodschappen", label: "Boodschappen", soort: "eur", bench: b?.boodschappen },
                  { sleutel: "abonnementenTotaal", label: "Abonnementen", soort: "eur", bench: b?.abonnementen },
                  { sleutel: "streamingBedrag", label: "Streaming", soort: "eur" },
                  { sleutel: "telefoonBedrag", label: "Telefoon", soort: "eur" },
                  { sleutel: "abonnementenOverigBedrag", label: "Overige abonnementen", soort: "eur" },
                  { sleutel: "kinderenTotaal", label: "Kinderkosten", soort: "eur", bench: b?.kinderen },
                  { sleutel: "kinderopvangEigenBijdrage", label: "Kinderopvang eigen bijdrage", soort: "eur" },
                  { sleutel: "schoolActiviteiten", label: "School en activiteiten", soort: "eur" },
                  { sleutel: "sportHobbyKinderen", label: "Sport en hobby kinderen", soort: "eur" },
                  { sleutel: "vrijetijd", label: "Vrije uitgaven", soort: "eur", bench: b?.vrijetijd },
                  { sleutel: "jaarlijkseKosten", label: "Jaarlijkse kosten", soort: "eur", per: "jaarlijkseKostenPer" },
                  { sleutel: "spaardoel", label: "Spaardoel", soort: "eur" },
                ]}
              />
            </div>
            {bereiktCategorie(5) && berekenJaarlijks(data) > 0 && (
              <p className="mt-2 text-xs text-text-muted font-body">
                Jaarlijkse kosten tellen in de uitkomst mee als {fmtEur(berekenJaarlijks(data))} per maand.
              </p>
            )}
          </section>

          <p className="text-xs text-text-muted font-body break-all">Sessie: {sessie.sessie_id}</p>
        </div>
      </div>
    </div>
  );
}
