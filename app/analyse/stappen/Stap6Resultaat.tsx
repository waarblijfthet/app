"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
    title: "Jullie doen het goed.",
    text: "Er is ruimte — de vraag is of dat geld doelbewust wordt ingezet.",
    textColor: "text-[#2D6A4F]",
  },
  matig: {
    bg: "bg-[#FDF3E3]",
    border: "border-[#F0D07A]",
    title: "Jullie zitten dicht bij het gemiddelde.",
    text: "Maar er is weinig buffer. Een kleine tegenvaller en het klopt niet meer.",
    textColor: "text-[#92600A]",
  },
  zorgelijk: {
    bg: "bg-[#FDECEA]",
    border: "border-[#F0A09A]",
    title: "Jullie houden structureel minder over.",
    text: "Dit is precies het patroon dat we kennen — en dat we kunnen helpen ombuigen.",
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
        <span>Jullie: {fmtEur(jij)}</span>
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

  // Berekeningen op component-niveau (toegankelijk in handleSubmit via closure)
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
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

  // Categorie totalen (ook gebruikt in DB insert)
  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaal = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);

  // Top-2 afwijkingen voor weergave
  type AfwijkingEntry = { label: string; jij: number; bench: number; diff: number };
  const allAfwijkingen: AfwijkingEntry[] = [
    { label: "Boodschappen", jij: parseEur(data.boodschappen), bench: benches.boodschappen, diff: parseEur(data.boodschappen) - benches.boodschappen },
    { label: "Abonnementen", jij: abonnementenTotaal, bench: benches.abonnementen, diff: abonnementenTotaal - benches.abonnementen },
    { label: "Wonen", jij: wonenTotaal, bench: benches.wonen, diff: wonenTotaal - benches.wonen },
    { label: "Verzekeringen", jij: verzekeringTotaal, bench: benches.verzekeringen, diff: verzekeringTotaal - benches.verzekeringen },
    { label: "Vervoer", jij: vervoerTotaal, bench: benches.vervoer, diff: vervoerTotaal - benches.vervoer },
  ]
    .filter((a) => a.jij > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0, 2);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email || !data.toestemmingOpslaan) return;
    setSending(true);
    setError("");

    const token = crypto.randomUUID();

    try {
      // 1. Lead aanmaken / updaten
      const { data: lead, error: leadErr } = await supabase
        .from("leads")
        .upsert(
          {
            email: data.email,
            naam: data.naam || null,
            bron: "quiz",
            toestemming_marketing: data.toestemmingMarketing,
            quiz_voltooid: true,
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (leadErr) throw leadErr;

      // 2. Quiz resultaten opslaan
      let savedToken: string | null = null;

      if (lead) {
        const { error: resultaatErr } = await supabase
          .from("quiz_resultaten")
          .insert({
            lead_id: lead.id,
            token,
            email: data.email,
            woonsituatie: data.woonsituatie,
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
            // Berekende categorie-totalen
            wonen_totaal: wonenTotaal,
            vervoer_totaal: vervoerTotaal,
            verzekering_totaal: verzekeringTotaal,
            abonnementen_totaal: abonnementenTotaal,
            kinderen_totaal: kinderenTotaal,
            // Financiële samenvatting
            totaal_inkomen_berekend: inkomen,
            totaal_uitgaven_berekend: inkomen - over,
            maandelijks_over_berekend: over,
            benchmark_over_verwacht: benches.vrij_besteedbaar,
            verschil_met_benchmark: overDiff,
            grootste_afwijking: grootsteAfwijking,
            verdict,
          });

        if (resultaatErr) throw resultaatErr;
        savedToken = token;
      }

      // 3. Email sturen (fire-and-forget, blokkeert de redirect niet)
      if (savedToken && data.email) {
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
      }

      // 4. Doorsturen naar resultaatpagina of fallback
      if (savedToken) {
        router.push(`/resultaat/${savedToken}`);
      } else {
        setSent(true);
        setSending(false);
      }
    } catch (err) {
      console.error(err);
      setError("Er ging iets mis. Probeer het opnieuw.");
      setSending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-10">
        Jullie financiële plaatje
      </h2>

      {/* Het grote getal */}
      <div className="card-base border border-[#E8E0D0] mb-6 text-center">
        <p className="section-eyebrow mb-4">Jullie houden elke maand over</p>
        <p
          className={`font-display font-light text-6xl mb-2 ${
            over < 0 ? "text-accent" : "text-primary"
          }`}
        >
          {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
        </p>
        <p className="text-text-muted font-body text-sm mb-2">
          Vergelijkbare gezinnen houden gemiddeld{" "}
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

      {/* Lead capture */}
      {!sent ? (
        <div className="card-base border border-[#E8E0D0]">
          <p className="font-display font-light text-primary text-2xl mb-2">
            Wil je de volledige analyse ontvangen?
          </p>
          <p className="text-text-soft font-body font-light text-sm mb-6">
            We sturen je een persoonlijk overzicht met een link om terug te
            kunnen kijken — en sturen je een seintje als we live gaan.
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
              {sending ? "Even geduld…" : "Bekijk mijn volledige analyse →"}
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
          href="/blog/goed-salaris-toch-krap"
          className="text-text-soft font-body text-sm hover:text-primary transition-colors"
        >
          Meer leren? Lees ons artikel →
        </Link>
      </div>
    </div>
  );
}
