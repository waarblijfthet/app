"use client";

import { useState } from "react";
import Link from "next/link";
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
  berekenJaarlijks,
  vindGrootsteAfwijking,
  bepaalVerdict,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
}

type Verdict = "goed" | "matig" | "zorgelijk";

const VERDICT_CONFIG: Record<
  Verdict,
  { bg: string; border: string; title: string; text: string; textColor: string }
> = {
  goed: {
    bg: "bg-green-light",
    border: "border-[#A8D5B5]",
    title: "Je doet het goed.",
    text: "Er is ruimte, de vraag is of dat geld doelbewust wordt ingezet.",
    textColor: "text-[#2D6A4F]",
  },
  matig: {
    bg: "bg-[#FDF3E3]",
    border: "border-[#F0D07A]",
    title: "Je zit dicht bij het gemiddelde.",
    text: "Maar er is weinig buffer. Een kleine tegenvaller en het klopt niet meer.",
    textColor: "text-[#92600A]",
  },
  zorgelijk: {
    bg: "bg-[#FDECEA]",
    border: "border-[#F0A09A]",
    title: "Je houdt structureel minder over.",
    text: "Dit is precies het patroon waarvoor deze analyse bestaat. Het ligt niet aan jou, en het is om te buigen.",
    textColor: "text-[#B03A2E]",
  },
};

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
    <div className="py-4 border-b border-[#E8E0D0] last:border-0">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body font-medium text-sm text-text-soft">{label}</span>
        <span
          className={`text-sm font-body font-medium ${verschil > 0 ? "text-accent" : "text-[#2D6A4F]"}`}
        >
          {verschil > 0 ? "+" : ""}
          {fmtEur(verschil)}
        </span>
      </div>
      <div className="flex gap-4 text-xs text-text-muted font-body mb-2">
        <span>Jij: {fmtEur(jij)}</span>
        <span>Gemiddeld: {fmtEur(benchmark)}</span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${verschil > 100 ? "bg-accent" : "bg-primary"}`}
            style={{ width: `${(jij / max) * 100}%` }}
          />
        </div>
        <div className="h-1.5 bg-[#EDE6D8] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#B8C9BC]"
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
    inkomen,
    auto: data.auto,
    aantalVolwassenen,
  });

  const over = berekenOver(data);
  const overDiff = over - benches.vrij_besteedbaar;
  const verdict = bepaalVerdict(data, benches);
  const grootsteAfwijking = vindGrootsteAfwijking(data, benches);
  const verdictCfg = VERDICT_CONFIG[verdict];

  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaalWaarde = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);
  const jaarlijksTotaal = berekenJaarlijks(data);
  const spaardoelWaarde = parseEur(data.spaardoel);

  type AfwijkingEntry = { label: string; jij: number; bench: number; diff: number };
  const allAfwijkingen: AfwijkingEntry[] = [
    { label: "Boodschappen", jij: parseEur(data.boodschappen), bench: benches.boodschappen, diff: parseEur(data.boodschappen) - benches.boodschappen },
    { label: "Abonnementen", jij: abonnementenTotaalWaarde, bench: benches.abonnementen, diff: abonnementenTotaalWaarde - benches.abonnementen },
    { label: "Wonen", jij: wonenTotaal, bench: benches.wonen, diff: wonenTotaal - benches.wonen },
    { label: "Verzekeringen", jij: verzekeringTotaal, bench: benches.verzekeringen, diff: verzekeringTotaal - benches.verzekeringen },
    { label: "Vervoer", jij: vervoerTotaal, bench: benches.vervoer, diff: vervoerTotaal - benches.vervoer },
  ]
    .filter((a) => a.jij > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0, 2);

  // Dynamische CTA-tekst op basis van de grootste afwijking
  const ctaKop =
    verdict === "goed" && grootsteAfwijking === "geen"
      ? "Haal meer uit de ruimte die je hebt"
      : grootsteAfwijking === "Boodschappen"
      ? `Je boodschappen liggen ${fmtEur(parseEur(data.boodschappen) - benches.boodschappen)}/mnd boven gemiddeld`
      : grootsteAfwijking === "Abonnementen"
      ? `Je abonnementen zijn ${fmtEur(abonnementenTotaalWaarde - benches.abonnementen)}/mnd hoger dan gemiddeld`
      : grootsteAfwijking === "Wonen"
      ? "Je woonlasten drukken zwaarder dan gemiddeld"
      : grootsteAfwijking === "Vervoer"
      ? "Je vervoerskosten liggen boven het gemiddelde"
      : verdict === "goed"
      ? "Haal meer uit de ruimte die je hebt"
      : "Dit patroon kun je ombuigen";

  const ctaTekst =
    grootsteAfwijking === "Boodschappen"
      ? "In een gesprek zoeken we uit waar dat zit: welke gewoontes, welke winkels, welke momenten. En hoe je dat ombuigt zonder alles op de schop te gooien."
      : grootsteAfwijking === "Abonnementen"
      ? "Daar zit vaak onbewust verlies dat makkelijk terug te winnen is. In een gesprek lopen we ze samen door."
      : grootsteAfwijking === "Wonen"
      ? "In een gesprek kijken we of en hoe dat te verlichten is, en wat dat in de rest van het budget betekent."
      : grootsteAfwijking === "Vervoer"
      ? "In een gesprek kijken we of er slim iets te veranderen is aan je vervoerssituatie."
      : verdict === "goed"
      ? "Je doet het goed. In een gesprek kijken we hoe je de ruimte die er is doelgericht inzet: sparen, aflossen of meer van het leven genieten."
      : "Je ziet nu wáár het zit. In een gesprek kijken we samen naar je cijfers en stellen we 2 à 3 concrete doelen.";

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
        throw new Error(json?.error || "Opslaan mislukt");
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
      setError(
        "Er ging iets mis bij het opslaan. Probeer het opnieuw of mail naar hallo@waarblijfthet.nl."
      );
      setSending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-10">
        Jouw financiële plaatje
      </h2>

      {/* Het grote getal */}
      <div className="card-base border border-[#E8E0D0] mb-6 text-center">
        <p className="section-eyebrow mb-4">Dit houd je elke maand over</p>
        <p
          className={`font-display font-light text-6xl mb-2 ${
            over < 0 ? "text-accent" : "text-primary"
          }`}
        >
          {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
        </p>
        <p className="text-text-muted font-body text-sm mb-2">
          Vergelijkbare huishoudens houden gemiddeld{" "}
          <strong className="text-text-soft">{fmtEur(benches.vrij_besteedbaar)}</strong>{" "}
          over
        </p>
        {overDiff !== 0 && (
          <span
            className={`inline-block text-sm font-body font-medium px-3 py-1 rounded-full ${
              overDiff > 0
                ? "bg-green-light text-[#2D6A4F]"
                : "bg-[#FDECEA] text-[#B03A2E]"
            }`}
          >
            {overDiff > 0 ? "+" : ""}
            {fmtEur(overDiff)} dan gemiddeld
          </span>
        )}
      </div>

      {/* Spaardoel vs werkelijkheid, alleen als ingevuld */}
      {spaardoelWaarde > 0 && (
        <div className="card-base border border-[#E8E0D0] mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="section-eyebrow mb-1">Jouw spaardoel</p>
              <p className="font-body font-medium text-primary text-sm">
                Je wilt {fmtEur(spaardoelWaarde)}/mnd opzij zetten
              </p>
              <p className="font-body font-light text-text-soft text-xs mt-1 leading-relaxed">
                {over >= spaardoelWaarde
                  ? `Na dat spaardoel houd je nog ${fmtEur(over - spaardoelWaarde)}/mnd over.`
                  : `Je houdt ${fmtEur(over)}/mnd over, ${fmtEur(spaardoelWaarde - over)} te weinig om dit spaardoel te halen.`}
              </p>
            </div>
            <span
              className={`text-xl font-body font-semibold shrink-0 ${
                over >= spaardoelWaarde ? "text-[#2D6A4F]" : "text-accent"
              }`}
            >
              {over >= spaardoelWaarde ? "✓" : "!"}
            </span>
          </div>
        </div>
      )}

      {/* Top-2 afwijkingen */}
      {allAfwijkingen.length > 0 && (
        <div className="card-base border border-[#E8E0D0] mb-6">
          <p className="section-eyebrow mb-4">Waar zit de afwijking?</p>
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

      {/* Verdict */}
      <div
        className={`rounded-xl border p-5 mb-8 ${verdictCfg.bg} ${verdictCfg.border}`}
      >
        <p className={`font-display font-light text-xl mb-2 ${verdictCfg.textColor}`}>
          {verdictCfg.title}
        </p>
        <p className={`font-body font-light text-sm ${verdictCfg.textColor}`}>
          {verdictCfg.text}
        </p>
      </div>

      {/* Dynamische CTA naar betaald aanbod */}
      <div
        className="rounded-xl border border-[#E8E0D0] p-6 mb-8"
        style={{ backgroundColor: "#FDFAF4" }}
      >
        <p className="section-eyebrow mb-3">En nu?</p>
        <p className="font-display font-light text-primary text-xl sm:text-2xl mb-2 leading-snug">
          {ctaKop}
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          {ctaTekst}{" "}
          <span className="font-medium text-primary">
            Eenmalig adviesgesprek van 45 minuten, €125. Geen traject.
          </span>
        </p>
        <Link href="/adviesgesprek" className="btn-primary">
          Bekijk hoe dat werkt &rarr;
        </Link>
      </div>

      {/* Lead capture */}
      {!sent ? (
        <div className="card-base border border-[#E8E0D0]">
          <p className="font-display font-light text-primary text-2xl mb-2">
            Ontvang je volledige analyse
          </p>
          <p className="text-text-soft font-body font-light text-sm mb-6">
            Per e-mail ontvang je een gedetailleerde breakdown van je situatie,
            met concrete eerste stappen voor de categorie die het meest afwijkt.
            Je resultaat hierboven blijft ook zonder e-mail gewoon zichtbaar.
            Geen mails daarna, tenzij je het tweede vakje aanvinkt.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={data.naam}
              onChange={(e) => onChange({ naam: e.target.value })}
              placeholder="Naam (optioneel)"
              className="input-base"
              aria-label="Naam"
            />
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="jouw@email.nl"
              required
              className="input-base"
              aria-label="E-mailadres"
            />
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.toestemmingOpslaan}
                onChange={(e) => onChange({ toestemmingOpslaan: e.target.checked })}
                required
                className="mt-0.5 w-4 h-4 accent-[#1C3A2A] flex-shrink-0"
              />
              <span className="font-body text-sm text-text-soft">
                Ik ga akkoord met het opslaan van mijn antwoorden voor analyse{" "}
                <span className="text-accent">*</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.toestemmingMarketing}
                onChange={(e) =>
                  onChange({ toestemmingMarketing: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 accent-[#1C3A2A] flex-shrink-0"
              />
              <span className="font-body text-sm text-text-soft">
                Ik wil updates ontvangen van Waar blijft het
              </span>
            </label>
            {error && (
              <p className="text-accent font-body text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={sending || !data.email || !data.toestemmingOpslaan}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Even geduld…" : "Stuur mij de analyse →"}
            </button>
          </form>
        </div>
      ) : (
        <div className="card-base border border-[#A8D5B5] bg-green-light text-center">
          <p className="font-display font-light text-primary text-2xl mb-2">Gelukt!</p>
          <p className="text-text-soft font-body text-sm">
            Je analyse is onderweg naar{" "}
            <strong>{data.email}</strong>. Check ook je spamfolder.
          </p>
        </div>
      )}

      {/* Blog CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          className="text-text-soft font-body text-sm hover:text-primary transition-colors"
        >
          Meer leren? Lees het artikel &rarr;
        </Link>
      </div>
    </div>
  );
}
