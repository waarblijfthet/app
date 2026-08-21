"use client";

import { useState } from "react";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { useRouter } from "next/navigation";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  vindGrootsteAfwijking,
  bepaalVerdict,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function AfwijkingRij({
  label,
  jij,
  benchmark,
}: {
  label: string;
  jij: number;
  benchmark: number;
}) {
  const verschil = jij - benchmark;
  const max = Math.max(jij, benchmark, 1);
  return (
    <div className="py-4 border-b border-[#E6E9E7] last:border-0">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body font-medium text-sm text-primary">{label}</span>
        <span
          className={`text-sm font-body font-medium ${
            verschil > 0 ? "text-[#A15A32]" : "text-[#0B7A6E]"
          }`}
        >
          {verschil > 0 ? "+" : "-"}
          {fmtEur(Math.abs(verschil))}
        </span>
      </div>
      <div className="flex gap-4 text-xs text-text-muted font-body mb-2">
        <span>Jij: {fmtEur(jij)}</span>
        <span>Vergelijkbare huishoudens: {fmtEur(benchmark)}</span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              verschil > 100 ? "bg-[#C4603A]" : "bg-primary"
            }`}
            style={{ width: `${(jij / max) * 100}%` }}
          />
        </div>
        <div className="h-1.5 bg-[#F0F3F1] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#B2CCC6]"
            style={{ width: `${(benchmark / max) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Stap6Resultaat({ data, onChange }: Props) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenen,
  });

  const over = berekenOver(data);
  const overDiff = over - benches.vrij_besteedbaar;
  // Positief tekort betekent: er blijft minder over dan de vuistregel verwacht.
  const tekort = -overDiff;
  const verdict = bepaalVerdict(data, benches);
  const grootsteAfwijking = vindGrootsteAfwijking(data, benches);

  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaalWaarde = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);
  const spaardoelWaarde = parseEur(data.spaardoel);

  // Eén conclusie in mensentaal. Geen diagnose, alleen de richting.
  const conclusie =
    overDiff > 100
      ? "Je zit ruim boven de gemiddelde financiële ruimte van vergelijkbare huishoudens."
      : overDiff < -100
      ? "Je houdt minder ruimte over dan vergelijkbare huishoudens."
      : "Je financiële ruimte ligt ongeveer rond het gemiddelde.";

  type AfwijkingEntry = { label: string; jij: number; bench: number; diff: number };
  const gesorteerd: AfwijkingEntry[] = [
    {
      label: "Boodschappen",
      jij: parseEur(data.boodschappen),
      bench: benches.boodschappen,
      diff: parseEur(data.boodschappen) - benches.boodschappen,
    },
    {
      label: "Abonnementen",
      jij: abonnementenTotaalWaarde,
      bench: benches.abonnementen,
      diff: abonnementenTotaalWaarde - benches.abonnementen,
    },
    {
      label: "Wonen",
      jij: wonenTotaal,
      bench: benches.wonen,
      diff: wonenTotaal - benches.wonen,
    },
    {
      label: "Verzekeringen",
      jij: verzekeringTotaal,
      bench: benches.verzekeringen,
      diff: verzekeringTotaal - benches.verzekeringen,
    },
    {
      label: "Vervoer",
      jij: vervoerTotaal,
      bench: benches.vervoer,
      diff: vervoerTotaal - benches.vervoer,
    },
  ]
    .filter((a) => a.jij > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  // Twee posten die het meest opvallen, en alleen een derde als die ook echt
  // nog iets toevoegt. Niet alle cijfers opnieuw opsommen.
  const allAfwijkingen = gesorteerd
    .slice(0, 3)
    .filter((a, i) => i < 2 || Math.abs(a.diff) >= 50);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email || !data.toestemmingOpslaan) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: data.naam || null,
          email: data.email,
          toestemmingMarketing: data.toestemmingMarketing,
          resultaat: {
            woonsituatie: data.woonsituatie,
            aantal_volwassenen: aantalVolwassenen,
            aantal_kinderen: data.kinderen,
            auto_situatie: data.auto,
            salaris_1: parseEur(data.salaris1),
            salaris_2: parseEur(data.salaris2),
            wonen_huur_hypotheek: parseEur(data.huurHypotheek),
            wonen_energie: parseEur(data.energie),
            wonen_internet_tv: parseEur(data.internet),
            boodschappen: parseEur(data.boodschappen),
            verzekering_zorg_per_persoon: parseEur(data.zorgPerPersoon),
            verzekering_overig: parseEur(data.verzekeringOverig),
            wonen_totaal: wonenTotaal,
            vervoer_totaal: vervoerTotaal,
            verzekering_totaal: verzekeringTotaal,
            abonnementen_totaal: abonnementenTotaalWaarde,
            kinderen_totaal: kinderenTotaal,
            totaal_inkomen_berekend: inkomen,
            totaal_uitgaven_berekend: inkomen - over,
            maandelijks_over_berekend: over,
            benchmark_over_verwacht: benches.vrij_besteedbaar,
            verschil_met_benchmark: overDiff,
            grootste_afwijking: grootsteAfwijking,
            verdict,
          },
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.token) {
        throw new Error(
          json?.detail || json?.error || `Opslaan mislukt (status ${res.status})`
        );
      }
      const savedToken: string = json.token;

      fetch("/api/send-resultaat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          token: savedToken,
          verdict,
          maandelijksOver: over,
          benchmarkOver: benches.vrij_besteedbaar,
        }),
      }).catch(console.error);

      router.push(`/resultaat/${savedToken}`);
    } catch (err) {
      console.error(err);
      const detail = err instanceof Error ? err.message : "";
      setError(
        `Er ging iets mis bij het opslaan${
          detail ? ` (${detail})` : ""
        }. Probeer het opnieuw of mail naar hallo@waarblijfthet.nl.`
      );
      setSending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="section-eyebrow mb-2">Jouw vergelijking</p>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8">
        Dit is hoe jouw huishouden ervoor staat
      </h2>

      {/* Het grote getal: wat ik zou verwachten tegenover wat er overblijft */}
      <div className="card-base border border-[#E6E9E7] mb-6">
        <p className="section-eyebrow mb-4 text-center">
          {tekort > 50 ? "Het gat" : "Jouw ruimte"}
        </p>
        <p
          className={`font-display font-light text-5xl sm:text-6xl mb-3 text-center ${
            tekort > 50 || over < 0 ? "text-[#C4603A]" : "text-primary"
          }`}
        >
          {tekort > 50
            ? fmtEur(tekort)
            : over < 0
            ? `-${fmtEur(Math.abs(over))}`
            : fmtEur(over)}
        </p>
        <p className="text-text-soft font-body font-light text-sm text-center mb-6 leading-relaxed">
          {tekort > 50
            ? "per maand minder over dan ik bij jouw situatie zou verwachten. Dat is het bedrag om te onderzoeken, en het is meestal kleiner dan het gevoel dat eraan voorafgaat."
            : tekort < -50
            ? "per maand over, meer dan ik bij jouw situatie zou verwachten. Op dit niveau gaat er waarschijnlijk niets mis."
            : "per maand over, en dat is ongeveer wat ik bij jouw situatie zou verwachten."}
        </p>
        <div className="grid grid-cols-2 gap-4 border-t border-[#E6E9E7] pt-5">
          <div>
            <p className="section-eyebrow mb-1">Zou ik verwachten</p>
            <p className="font-body font-medium text-primary text-lg">
              {fmtEur(benches.vrij_besteedbaar)}
            </p>
          </div>
          <div>
            <p className="section-eyebrow mb-1">Blijft er over</p>
            <p
              className={`font-body font-medium text-lg ${
                over < 0 ? "text-[#C4603A]" : "text-primary"
              }`}
            >
              {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
            </p>
          </div>
        </div>
        <p className="font-body font-light text-text-muted text-xs mt-5 leading-relaxed">
          Die verwachting is mijn eigen vuistregel op basis van vier dingen: je
          inkomen, het aantal volwassenen, het aantal kinderen en je
          autosituatie. Geen norm en geen oordeel. De vergelijking weet niets
          over de leeftijd van je kinderen, je regio, alimentatie of hoeveel je
          op je huis hebt afgelost, en die kunnen flink meewegen.
        </p>
      </div>

      {/* Spaardoel tegenover de werkelijkheid, alleen als het is ingevuld */}
      {spaardoelWaarde > 0 && (
        <div className="card-base border border-[#E6E9E7] mb-6">
          <p className="section-eyebrow mb-1">Jouw spaardoel</p>
          <p className="font-body font-medium text-primary text-sm">
            Je wilt {fmtEur(spaardoelWaarde)} per maand opzij zetten
          </p>
          <p className="font-body font-light text-text-soft text-xs mt-1 leading-relaxed">
            {over >= spaardoelWaarde
              ? `Na dat spaardoel houd je nog ${fmtEur(
                  over - spaardoelWaarde
                )} per maand over.`
              : `Je houdt ${fmtEur(over)} per maand over, ${fmtEur(
                  spaardoelWaarde - over
                )} te weinig om dit spaardoel te halen.`}
          </p>
        </div>
      )}

      {/* De posten die het meest opvallen */}
      {allAfwijkingen.length > 0 && (
        <div className="card-base border border-[#E6E9E7] mb-6">
          <p className="section-eyebrow mb-1">Waar zit de afwijking?</p>
          <p className="font-body text-xs text-text-muted mb-3">
            De posten die het meest opvallen. Niet al je cijfers opnieuw.
          </p>
          {allAfwijkingen.map((a) => (
            <AfwijkingRij
              key={a.label}
              label={a.label}
              jij={a.jij}
              benchmark={a.bench}
            />
          ))}
        </div>
      )}

      {/* Eén conclusie */}
      <div className="rounded-xl border border-[#E6E9E7] bg-[#F0F3F1] p-5 mb-8">
        <p className="font-display font-light text-primary text-xl mb-2 leading-snug">
          {conclusie}
        </p>
        <p className="font-body font-light text-sm text-text-soft">
          De analyse laat zien dát er een verschil is. Niet waarom dat zo is.
        </p>
      </div>

      {/* Eén volgende stap */}
      <div className="rounded-xl border border-[#E6E9E7] bg-card p-6 mb-8">
        <p className="font-display font-light text-primary text-xl sm:text-2xl mb-1 leading-snug">
          Je weet nu waar je afwijkt.
        </p>
        <p className="font-display font-light text-[#A15A32] text-xl sm:text-2xl mb-3 leading-snug">
          Maar nog niet waarom.
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          De gratis analyse laat zien waar jouw situatie afwijkt. In de Geldscan kijk ik persoonlijk
          naar het waarom, wat het betekent en wat ik als eerste zou aanpakken.
        </p>
        {/* Direct naar het aanmeldformulier, niet eerst naar /geldscan (21-aug-2026).
            Wie hier staat heeft zijn eigen vergelijking al gezien en raakt de draad
            kwijt als hij eerst nog een uitlegpagina doorleest. */}
        <CtaLink
          doel="geldscan"
          href="/aanbod/intake?pakket=geldscan"
          locatie="analyse-resultaat"
          className="btn-primary"
        >
          Laat mij uitzoeken waarom &rarr;
        </CtaLink>
        <p className="font-body text-text-muted text-xs mt-3">
          Geldscan &euro;49 &middot; eenmalig &middot; persoonlijk geschreven &middot;
          binnen 2 werkdagen
        </p>
      </div>

      {/* Bewaren, secundair aan het resultaat */}
      {!sent ? (
        <div className="card-base border border-[#E6E9E7]">
          <p className="font-display font-light text-primary text-xl mb-2">
            Wil je je vergelijking bewaren?
          </p>
          <p className="text-text-soft font-body font-light text-sm mb-6">
            Laat je e-mailadres achter en ontvang je volledige analyse per mail.
            Je resultaat hierboven blijft ook zonder e-mail zichtbaar.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={data.naam}
              onChange={(e) => onChange({ naam: e.target.value })}
              placeholder="Naam (optioneel)"
              className="input-base min-h-[52px]"
              aria-label="Naam"
            />
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="jouw@email.nl"
              required
              className="input-base min-h-[52px]"
              aria-label="E-mailadres"
            />
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.toestemmingOpslaan}
                onChange={(e) => onChange({ toestemmingOpslaan: e.target.checked })}
                required
                className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
              />
              <span className="font-body text-sm text-text-soft">
                Ik ga akkoord met het opslaan van mijn antwoorden voor analyse{" "}
                <span className="text-[#C4603A]">*</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.toestemmingMarketing}
                onChange={(e) => onChange({ toestemmingMarketing: e.target.checked })}
                className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
              />
              <span className="font-body text-sm text-text-soft">
                Ik wil updates ontvangen van Waar blijft het
              </span>
            </label>
            {error && <p className="text-[#C4603A] font-body text-sm">{error}</p>}
            <button
              type="submit"
              disabled={sending || !data.email || !data.toestemmingOpslaan}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Even geduld" : "Bewaar mijn vergelijking →"}
            </button>
            <p className="font-body text-xs text-text-muted">
              Je antwoorden zijn anoniem zolang je geen e-mailadres invult.{" "}
              <Link
                href="/privacy"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                Privacy &rarr;
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <div className="card-base border border-[#A6D8CD] bg-green-light text-center">
          <p className="font-display font-light text-primary text-2xl mb-2">
            Gelukt
          </p>
          <p className="text-text-soft font-body text-sm">
            Je analyse is onderweg naar <strong>{data.email}</strong>. Check ook
            je spamfolder.
          </p>
        </div>
      )}
    </div>
  );
}
