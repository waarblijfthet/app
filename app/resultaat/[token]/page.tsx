import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createServiceClient } from "@/lib/supabase-service";
import { getBenchmarks } from "@/lib/benchmarks";
import { fmtEur, KinderenAantal } from "@/lib/quiz-types";
import KopieerKnop from "./KopieerKnop";
import EmailReminderForm from "./EmailReminderForm";

export const metadata: Metadata = {
  title: "Jouw financiële analyse | Waar blijft het",
  description: "Bekijk jouw persoonlijke financiële analyse op basis van de quiz.",
  robots: { index: false, follow: false },
};

interface Props {
  params: { token: string };
}

type Verdict = "goed" | "matig" | "zorgelijk";

const VERDICT_CONFIG: Record<
  Verdict,
  { bg: string; border: string; textColor: string; titel: string; tekst: string }
> = {
  goed: {
    bg: "#E8F2EC",
    border: "#A8D5B5",
    textColor: "#2D6A4F",
    titel: "Je doet het goed",
    tekst: "Er is ruimte. De vraag is of dat geld doelbewust wordt ingezet.",
  },
  matig: {
    bg: "#FDF3E3",
    border: "#F0D07A",
    textColor: "#92600A",
    titel: "Er is ruimte voor verbetering",
    tekst:
      "Je zit dicht bij het gemiddelde maar de buffer is klein. Een tegenvaller en het klopt niet meer.",
  },
  zorgelijk: {
    bg: "#FDECEA",
    border: "#F0A09A",
    textColor: "#B03A2E",
    titel: "Dit patroon is om te buigen",
    tekst:
      "Je houdt structureel minder over dan vergelijkbare huishoudens. Dit is precies waar ik bij help, en het ligt niet aan jou.",
  },
};

function AfwijkingKaart({
  label,
  jij,
  bench,
}: {
  label: string;
  jij: number;
  bench: number;
}) {
  const verschil = jij - bench;
  const max = Math.max(jij, bench, 1);
  const isHoog = verschil > 0;

  return (
    <div className="bg-card rounded-2xl border border-[#E8E0D0] p-5">
      <p className="font-body font-medium text-text-soft text-sm mb-3">{label}</p>
      <div className="flex gap-6 text-sm font-body mb-3">
        <div>
          <p className="text-text-muted text-xs mb-0.5">Jij</p>
          <p
            className="font-medium"
            style={{ color: isHoog ? "#B03A2E" : "#1C3A2A" }}
          >
            {fmtEur(jij)}/mnd
          </p>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-0.5">Gemiddeld</p>
          <p className="font-medium text-text-soft">{fmtEur(bench)}/mnd</p>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Jij</span>
            <span className="font-medium" style={{ color: isHoog ? "#B03A2E" : "#2D6A4F" }}>
              {fmtEur(jij)}
            </span>
          </div>
          <div className="h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(jij / max) * 100}%`,
                background: isHoog ? "#C4603A" : "#1C3A2A",
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-text-muted font-body mb-0.5">
            <span>Gemiddeld</span>
            <span>{fmtEur(bench)}</span>
          </div>
          <div className="h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#B8C9BC] transition-all"
              style={{ width: `${(bench / max) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <span
        className="inline-block text-xs font-body font-medium px-3 py-1 rounded-full"
        style={{
          background: isHoog ? "#FDECEA" : "#E8F2EC",
          color: isHoog ? "#B03A2E" : "#2D6A4F",
        }}
      >
        {isHoog ? "+" : ""}
        {fmtEur(verschil)} vs gemiddeld
      </span>
    </div>
  );
}

export default async function ResultaatPage({ params }: Props) {
  const supabase = createServiceClient();

  const { data: r, error } = await supabase
    .from("quiz_resultaten")
    .select("*")
    .eq("token", params.token)
    .single();

  if (error || !r) {
    return (
      <>
        <Header />
        <main
          className="pt-16 min-h-screen flex items-center justify-center"
          style={{ background: "#F5F0E8" }}
        >
          <div className="text-center max-w-md px-6 py-20">
            <p className="text-6xl mb-6">🔍</p>
            <h1 className="font-display font-light text-primary text-3xl mb-4">
              Deze analyse is niet gevonden.
            </h1>
            <p className="text-text-soft font-body font-light text-base mb-8">
              De link is mogelijk verlopen of onjuist. Doe de gratis analyse
              opnieuw, het kost maar 5 minuten.
            </p>
            <Link href="/analyse" className="btn-primary">
              Doe de analyse opnieuw
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Bereken benchmarks opnieuw op basis van opgeslagen profiel
  const aantalVolwassenen =
    r.aantal_volwassenen ?? ((r.salaris_2 ?? 0) > 0 ? 2 : 1);
  const benches = getBenchmarks({
    woonsituatie: r.woonsituatie as "huur" | "koop" | null,
    kinderen: r.aantal_kinderen as KinderenAantal | null,
    inkomen: r.totaal_inkomen_berekend ?? 0,
    auto: r.auto_situatie as "geen" | "eigen" | "lease_privé" | "zakelijk" | null,
    aantalVolwassenen,
  });

  // Top-2 afwijkingen
  const alleCategorieen = [
    { label: "Wonen", jij: r.wonen_totaal ?? 0, bench: benches.wonen },
    { label: "Boodschappen", jij: r.boodschappen ?? 0, bench: benches.boodschappen },
    { label: "Verzekeringen", jij: r.verzekering_totaal ?? 0, bench: benches.verzekeringen },
    { label: "Vervoer", jij: r.vervoer_totaal ?? 0, bench: benches.vervoer },
    { label: "Abonnementen", jij: r.abonnementen_totaal ?? 0, bench: benches.abonnementen },
    { label: "Kinderkosten", jij: r.kinderen_totaal ?? 0, bench: benches.kinderen },
  ]
    .filter((a) => a.jij > 0)
    .sort((a, b) => Math.abs(b.jij - b.bench) - Math.abs(a.jij - a.bench))
    .slice(0, 2);

  const over = r.maandelijks_over_berekend ?? 0;
  const benchmarkOver = r.benchmark_over_verwacht ?? benches.vrij_besteedbaar;
  const verschil = over - benchmarkOver;
  const verdict = (r.verdict ?? "matig") as Verdict;
  const verdictCfg = VERDICT_CONFIG[verdict];
  const resultaatUrl = `https://www.waarblijfthet.nl/resultaat/${params.token}`;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen" style={{ background: "#F5F0E8" }}>
        <div
          style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
        >
          {/* ── SECTIE 1: Het grote getal ── */}
          <div
            style={{
              background: "#FDFAF4",
              borderRadius: "20px",
              padding: "2.5rem",
              marginBottom: "2rem",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
              {/* Links, het getal */}
              <div>
                <p
                  className="font-body text-xs font-medium mb-3"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#8A9E8E",
                  }}
                >
                  Dit houd je elke maand over
                </p>
                <p
                  className="font-display font-light mb-2"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5rem)",
                    lineHeight: 1,
                    color: over < 0 ? "#B03A2E" : "#1C3A2A",
                  }}
                >
                  {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
                </p>
                <p className="text-text-soft font-body text-sm mb-4">
                  Vergelijkbare huishoudens houden gemiddeld{" "}
                  <strong className="text-text-soft">{fmtEur(benchmarkOver)}</strong>{" "}
                  over
                </p>

                {/* Verschilpill */}
                <span
                  className="inline-block text-sm font-body font-medium px-4 py-1.5 rounded-full"
                  style={{
                    background: verschil >= 0 ? "#E8F2EC" : "#FDECEA",
                    color: verschil >= 0 ? "#2D6A4F" : "#B03A2E",
                  }}
                >
                  {verschil >= 0 ? "+" : ""}
                  {fmtEur(verschil)}{" "}
                  {verschil >= 0 ? "meer" : "minder"} dan gemiddeld
                </span>
              </div>

              {/* Rechts, verdict */}
              <div
                className="rounded-2xl border p-5"
                style={{
                  background: verdictCfg.bg,
                  borderColor: verdictCfg.border,
                }}
              >
                <p
                  className="font-display font-light text-xl mb-2"
                  style={{ color: verdictCfg.textColor }}
                >
                  {verdictCfg.titel}
                </p>
                <p
                  className="font-body font-light text-sm leading-relaxed"
                  style={{ color: verdictCfg.textColor }}
                >
                  {verdictCfg.tekst}
                </p>
              </div>
            </div>
          </div>

          {/* ── SECTIE 2: Afwijkingen ── */}
          {alleCategorieen.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="font-display font-light text-primary text-3xl mb-6">
                Hier zit de grootste afwijking
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alleCategorieen.map((cat) => (
                  <AfwijkingKaart
                    key={cat.label}
                    label={cat.label}
                    jij={cat.jij}
                    bench={cat.bench}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── SECTIE 3: Wat nu? ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#1C3A2A", marginBottom: "2rem" }}
          >
            <div style={{ padding: "2rem 2rem 0.5rem" }}>
              <p
                className="font-body text-xs font-medium mb-2"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(245,240,232,0.5)",
                }}
              >
                Wat nu?
              </p>
              <h2
                className="font-display font-light text-3xl mb-6"
                style={{ color: "#F5F0E8" }}
              >
                Drie manieren om verder te gaan
              </h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-0"
              style={{ borderTop: "1px solid rgba(245,240,232,0.1)" }}
            >
              {/* Kaartje 1, Deel */}
              <div
                style={{
                  padding: "1.5rem 2rem 2rem",
                  borderRight: "1px solid rgba(245,240,232,0.1)",
                }}
              >
                <p className="text-3xl mb-3">📊</p>
                <h3
                  className="font-body font-medium text-base mb-2"
                  style={{ color: "#F5F0E8" }}
                >
                  Deel deze analyse
                </h3>
                <p
                  className="font-body font-light text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  Stuur de link naar je partner of sla hem op voor later.
                </p>
                <KopieerKnop url={resultaatUrl} />
              </div>

              {/* Kaartje 2, Betaald (hoofdoptie) */}
              <div
                style={{
                  padding: "1.5rem 2rem 2rem",
                  background: "rgba(245,240,232,0.05)",
                  borderRight: "1px solid rgba(245,240,232,0.1)",
                }}
              >
                <p className="text-3xl mb-3">💬</p>
                <h3
                  className="font-body font-medium text-base mb-2"
                  style={{ color: "#F5F0E8" }}
                >
                  Een eerlijk adviesgesprek
                </h3>
                <p
                  className="font-body font-light text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  In 45 minuten samen eerlijk naar je cijfers kijken en 2 à 3
                  concrete doelen stellen. Eenmalig €125, geen traject.
                </p>
                <a
                  href="/aanbod"
                  className="block w-full text-center px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: "#C4603A",
                    color: "#FDFAF4",
                    textDecoration: "none",
                  }}
                >
                  Bekijk het adviesgesprek →
                </a>
              </div>

              {/* Kaartje 3, Blog */}
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <p className="text-3xl mb-3">📄</p>
                <h3
                  className="font-body font-medium text-base mb-2"
                  style={{ color: "#F5F0E8" }}
                >
                  Liever geen gesprek? De geldscan
                </h3>
                <p
                  className="font-body font-light text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  Ik kijk persoonlijk naar jouw cijfers en stuur je binnen 2
                  werkdagen na betaling een persoonlijk geldrapport met je
                  drie grootste lekken. Zonder gesprek. €49.
                </p>
                <Link
                  href="/geldscan"
                  className="block w-full text-center px-4 py-2.5 rounded-xl border font-body text-sm font-medium transition-all hover:bg-white/10"
                  style={{
                    borderColor: "rgba(245,240,232,0.3)",
                    color: "rgba(245,240,232,0.8)",
                    textDecoration: "none",
                  }}
                >
                  Bekijk de geldscan →
                </Link>
              </div>
            </div>
          </div>

          {/* ── SECTIE 4: Email reminder, alleen als er nog geen e-mail
              gekoppeld is. De link is deelbaar, dus nooit een e-mailadres
              of andere persoonsverwijzing tonen. ── */}
          {!r.email && (
            <div
              className="rounded-2xl border border-[#E8E0D0] p-6"
              style={{ background: "#F5F0E8" }}
            >
              <p className="font-body font-medium text-text-soft text-sm mb-1">
                Analyse bewaren?
              </p>
              <p className="text-text-muted font-body text-sm mb-4">
                Je krijgt de link naar deze analyse toegestuurd, zodat je hem
                altijd terug kunt vinden.
              </p>
              <EmailReminderForm
                token={params.token}
                verdict={verdict}
                maandelijksOver={over}
                benchmarkOver={benchmarkOver}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
