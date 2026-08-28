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
import { bepaalRichting } from "../components/vergelijking-labels";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import EuroInput from "../components/EuroInput";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

function AfwijkingRij({
  label,
  jij,
  benchmark,
  zin,
}: {
  label: string;
  jij: number;
  benchmark: number;
  zin: string;
}) {
  const verschil = jij - benchmark;
  const max = Math.max(jij, benchmark, 1);
  return (
    <div className="py-4 border-b border-[#E6E9E7] last:border-0">
      <div className="flex justify-between items-center mb-1">
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
      <p className="font-body text-xs text-text-soft mb-2">{zin}</p>
      <div className="flex gap-4 text-xs text-text-muted font-body mb-2">
        <span>Jij: {fmtEur(jij)}</span>
        <span>Vergelijkbaar: {fmtEur(benchmark)}</span>
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
  // Sparen wordt pas hier gevraagd (28-aug-2026, pass 4). In stap 5 was het een
  // veld tussen de uitgaven; hier is het een vraag met een antwoord eronder.
  const [spaardoelOpen, setSpaardoelOpen] = useState(
    parseEur(data.spaardoel) > 0
  );

  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const meerdere = aantalVolwassenen === 2;
  const onderw = meerdere ? "jullie" : "jou"; // "Bij {onderw} blijft..."
  const situatiePos = meerdere ? "jullie" : "jouw"; // "{situatiePos} situatie"

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
  const tekort = -overDiff;
  const verdict = bepaalVerdict(data, benches);
  const grootsteAfwijking = vindGrootsteAfwijking(data, benches);

  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaalWaarde = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);
  const spaardoelWaarde = parseEur(data.spaardoel);

  // De conclusie in één zin, dynamisch op de uitkomst.
  const conclusieKop =
    overDiff > 100
      ? `Bij ${onderw} blijft waarschijnlijk meer over dan je zelf zou verwachten.`
      : overDiff < -100
      ? `Bij ${onderw} blijft waarschijnlijk minder over dan logisch is voor ${situatiePos} situatie.`
      : `${situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1)} financiële ruimte lijkt vooralsnog goed te passen bij ${situatiePos} huishouden.`;

  // Menselijke interpretatie onder het grote getal.
  const interpretatie =
    tekort > 100
      ? `Dat betekent niet automatisch dat er ${fmtEur(
          tekort
        )} per maand verkeerd gaat. Maar ${situatiePos} situatie wijkt wel duidelijk af.`
      : tekort < -100
      ? "Op dit niveau gaat er waarschijnlijk niets structureels mis."
      : `${situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1)} ruimte ligt dicht bij wat we bij dit huishouden verwachten.`;

  /**
   * De brug naar de Geldscan hangt af van de uitkomst, niet van een vast
   * verhaal (28-aug-2026, pass 4). Drie gevallen: er valt iets uit de toon, de
   * bedragen kloppen maar de ruimte blijft achter, of er valt niets uit de toon
   * en er is ook ruimte. In dat laatste geval is "geen lek" het antwoord, en dan
   * hoort daar geen tekst over hogere uitgaven bij.
   */
  interface Brug {
    kop: string;
    tegen: string;
    uitleg: string;
    slot: string;
    /** Knoptekst, want "uitzoeken waarom" past niet als er niets uit de toon valt. */
    cta: string;
  }

  function bouwBrug(hoogstePost: string | null, ruimteDiff: number): Brug {
    if (hoogstePost) {
      return {
        kop: "Je weet nu wáár het verschil zit.",
        tegen: "Maar cijfers vertellen nog niet of dit een probleem is.",
        uitleg: `Hoge ${hoogstePost} kunnen een probleem zijn. Maar net zo goed het gevolg van bewuste keuzes of een patroon dat verder prima past.`,
        slot:
          "Daarom kijk ik bij de Geldscan persoonlijk naar het waarom, en wat ik als eerste zou onderzoeken.",
        cta: "Laat mij uitzoeken waarom →",
      };
    }
    if (ruimteDiff < -100) {
      return {
        kop: "Je weet nu dat de grote bedragen kloppen.",
        tegen: "Dan zit de verklaring ergens anders.",
        uitleg: `Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} huishoudens die ik doorrekende zat er geen lek in de bedragen, en dat staat ook zo in hun rapport. De krapte was er wel.`,
        slot:
          "Bij de Geldscan kijk ik daar persoonlijk naar, en schrijf ik op wat ik als eerste zou onderzoeken.",
        cta: "Laat mij uitzoeken waar het dan zit →",
      };
    }
    return {
      kop: "Op deze cijfers valt er niets uit de toon.",
      tegen: "Dat is ook een antwoord.",
      uitleg: `Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} huishoudens die ik doorrekende was dat de uitkomst, en dat staat ook zo in hun rapport. Voelt het bij jou toch krap, dan zit dat in iets wat een maandgemiddelde niet laat zien.`,
      slot:
        "Wil je zeker weten dat je niets mist, dan kijk ik bij de Geldscan persoonlijk mee.",
      cta: "Laat mij persoonlijk meekijken →",
    };
  }

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

  const opvallend = gesorteerd
    .slice(0, 3)
    .filter((a, i) => i < 2 || Math.abs(a.diff) >= 50);

  const bovenBenchmark = gesorteerd.filter(
    (a) => bepaalRichting(a.jij, a.bench) === "hoger"
  );

  const brug = bouwBrug(
    bovenBenchmark.length > 0 ? bovenBenchmark[0].label.toLowerCase() : null,
    overDiff
  );

  function zinVoor(a: AfwijkingEntry, i: number): string {
    const richting = bepaalRichting(a.jij, a.bench);
    const post = a.label.toLowerCase();
    if (richting === "hoger") {
      return i === 0
        ? "Hier zit het grootste verschil in."
        : `Ook bij ${post} zit je hoger dan verwacht.`;
    }
    if (richting === "lager") {
      return `Bij ${post} zit je juist onder vergelijkbare huishoudens.`;
    }
    return `Bij ${post} zit je dicht bij vergelijkbare huishoudens.`;
  }

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
      {/* 1. De conclusie eerst. */}
      <p className="section-eyebrow mb-2">Jouw uitkomst</p>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8 leading-snug">
        {conclusieKop}
      </h2>

      {/* 2. Het getal met de verwachting ernaast. */}
      <div className="card-base border border-[#E6E9E7] mb-6">
        <p className="section-eyebrow mb-2 text-center">Geschatte financiële ruimte</p>
        <p
          className={`font-display font-light text-5xl sm:text-6xl mb-2 text-center ${
            over < 0 ? "text-[#C4603A]" : "text-primary"
          }`}
        >
          {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
        </p>
        <p className="text-text-muted font-body text-sm text-center mb-6">
          per maand
        </p>
        <div className="border-t border-[#E6E9E7] pt-5">
          <p className="text-text-soft font-body font-light text-sm text-center leading-relaxed">
            Voor een vergelijkbaar huishouden verwachten we ongeveer{" "}
            <strong className="text-primary font-medium">
              {fmtEur(benches.vrij_besteedbaar)}
            </strong>{" "}
            per maand.
          </p>
          <p className="text-text-soft font-body font-light text-sm text-center mt-3 leading-relaxed">
            {interpretatie}
          </p>
        </div>
        <p className="font-body font-light text-text-muted text-xs mt-5 leading-relaxed">
          Die verwachting is mijn eigen vuistregel op basis van vier dingen: je
          inkomen, het aantal volwassenen, het aantal kinderen en je
          autosituatie. Geen norm en geen oordeel. De vergelijking weet niets
          over de leeftijd van je kinderen, je regio, alimentatie of hoeveel je
          op je huis hebt afgelost, en die kunnen flink meewegen.
        </p>
        {data.inkomenWisselend && (
          <p className="font-body font-light text-text-muted text-xs mt-3 leading-relaxed">
            Je gaf aan dat je inkomen wisselt. Deze uitkomst rekent met het
            gemiddelde dat je invulde, dus in een magere maand is de ruimte
            kleiner en in een goede maand groter.
          </p>
        )}
      </div>

      {/* 3. Wat valt het meest op. */}
      {opvallend.length > 0 && (
        <div className="card-base border border-[#E6E9E7] mb-6">
          <p className="section-eyebrow mb-3">Wat valt het meest op?</p>
          {opvallend.map((a, i) => (
            <AfwijkingRij
              key={a.label}
              label={a.label}
              jij={a.jij}
              benchmark={a.bench}
              zin={zinVoor(a, i)}
            />
          ))}
        </div>
      )}

      {/* Sparen: hier pas gevraagd, want hier betekent het bedrag iets. Dicht
          standaard, zodat het niet met de knop hieronder concurreert. */}
      <div className="card-base border border-[#E6E9E7] mb-6">
        <p className="section-eyebrow mb-2">Sparen</p>
        {!spaardoelOpen ? (
          <>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed">
              Wilde je maandelijks een bedrag opzij zetten? Dan leg ik dat naast
              de ruimte die we hier zien.
            </p>
            <button
              type="button"
              onClick={() => setSpaardoelOpen(true)}
              className="mt-3 font-body font-medium text-sm text-accent hover:text-primary transition-colors"
            >
              Ja, ik had een bedrag in gedachten
            </button>
          </>
        ) : (
          <>
            <EuroInput
              label="Wat wil je maandelijks sparen?"
              id="spaardoel"
              value={data.spaardoel}
              onChange={(v) => onChange({ spaardoel: v })}
              hint="Wat je structureel opzij wilt zetten. Een schatting is genoeg."
              plausibelTot={10000}
            />
            {spaardoelWaarde > 0 && (
              <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-3">
                {over >= spaardoelWaarde
                  ? `Dat past binnen de ruimte die we zien, er blijft dan nog ${fmtEur(
                      over - spaardoelWaarde
                    )} over.`
                  : `Op basis van deze cijfers is dat ${fmtEur(
                      spaardoelWaarde - over
                    )} meer dan de ruimte die we nu zien. Dat hoeft geen lek te zijn: het kan ook betekenen dat het doel en de huidige uitgaven niet naast elkaar passen.`}
              </p>
            )}
          </>
        )}
      </div>

      {/* 4. Wat betekent dit. De brug naar de vraag "waarom". */}
      <div className="rounded-xl border border-[#E6E9E7] bg-[#F0F3F1] p-5 mb-8">
        <p className="section-eyebrow mb-2">Wat betekent dit?</p>
        <p className="font-body font-light text-primary text-base leading-relaxed">
          {bovenBenchmark.length > 0
            ? `Hogere uitgaven betekenen niet automatisch dat er iets misgaat. De volgende vraag is waarom deze bedragen hoger liggen, en of ze passen bij wat er voor ${situatiePos} huishouden belangrijk is.`
            : `Je uitgaven passen tot nu toe goed bij vergelijkbare huishoudens. Een grote verklaring voor een tekort is er op basis van deze cijfers niet, en dat is op zichzelf al een nuttig antwoord.`}
        </p>
      </div>

      {/* 5. De Geldscan als de logische volgende vraag: waarom. */}
      <div className="rounded-xl border border-[#E6E9E7] bg-card p-6 mb-8">
        <p className="font-display font-light text-primary text-xl sm:text-2xl mb-1 leading-snug">
          {brug.kop}
        </p>
        <p className="font-display font-light text-[#A15A32] text-xl sm:text-2xl mb-4 leading-snug">
          {brug.tegen}
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-3 leading-relaxed">
          {brug.uitleg}
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          {brug.slot}
        </p>
        <CtaLink
          doel="geldscan"
          href="/aanbod/intake?pakket=geldscan"
          locatie="analyse-resultaat"
          className="btn-primary"
        >
          {brug.cta}
        </CtaLink>
        <p className="font-body text-text-muted text-xs mt-3">
          €49 eenmalig &middot; persoonlijk bekeken &middot; binnen 2 werkdagen
        </p>
        <p className="font-body text-text-muted text-xs mt-1">
          Geen abonnement. Geen verkoopgesprek.
        </p>
      </div>

      {/* 6. Resultaat bewaren, duidelijk secundair. */}
      {!sent ? (
        <div className="rounded-xl border border-[#E6E9E7] p-6">
          <p className="font-body font-medium text-primary text-base mb-1">
            Wil je deze uitkomst later terugzien?
          </p>
          <p className="text-text-muted font-body font-light text-sm mb-5">
            Dan stuur ik hem naar je e-mail. Je resultaat blijft ook zonder
            e-mailadres hierboven staan.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
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
                Bewaar mijn antwoorden, zodat ik deze uitkomst kan mailen en je
                hem later kunt terugzien.
              </span>
            </label>
            {error && <p className="text-[#C4603A] font-body text-sm">{error}</p>}
            <button
              type="submit"
              disabled={sending || !data.email || !data.toestemmingOpslaan}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Even geduld" : "Stuur mijn vergelijking →"}
            </button>
            <div className="pt-3 mt-1 border-t border-[#E6E9E7]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.toestemmingMarketing}
                  onChange={(e) =>
                    onChange({ toestemmingMarketing: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
                />
                <span className="font-body text-xs text-text-muted">
                  Los hiervan: stuur me af en toe iets nuttigs van Waar blijft
                  het. Je vergelijking krijg je ook zonder dit vinkje.
                </span>
              </label>
            </div>
            <p className="font-body text-xs text-text-muted">
              Je antwoorden zijn anoniem zolang je geen e-mailadres invult.{" "}
              <Link
                href="/privacy"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                Privacy →
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <div className="card-base border border-[#A6D8CD] bg-green-light text-center">
          <p className="font-display font-light text-primary text-2xl mb-2">Gelukt</p>
          <p className="text-text-soft font-body text-sm">
            Je vergelijking is onderweg naar <strong>{data.email}</strong>. Check
            ook je spamfolder.
          </p>
        </div>
      )}
    </div>
  );
}
