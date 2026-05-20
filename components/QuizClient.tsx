"use client";

import { useState, useMemo } from "react";

type Kids = 0 | 1 | 2 | 3;

interface QuizState {
  inkomen: number;
  vasteLasten: number;
  boodschappen: number;
  kinderen: Kids;
  restant: number;
}

function Bar({
  label,
  yours,
  average,
  yoursPct,
  averagePct,
  yoursLabel,
  averageLabel,
}: {
  label: string;
  yours: number;
  average: number;
  yoursPct: number;
  averagePct: number;
  yoursLabel: string;
  averageLabel: string;
}) {
  const maxPct = Math.max(yoursPct, averagePct, 1);
  const yoursWidth = Math.min((yoursPct / maxPct) * 100, 100);
  const avgWidth = Math.min((averagePct / maxPct) * 100, 100);
  const isHigh = yoursPct > averagePct + 2;

  return (
    <div className="mb-5">
      <p className="text-text-soft font-body font-medium text-sm mb-2">{label}</p>
      <div className="space-y-1.5">
        <div>
          <div className="flex justify-between text-xs font-body text-text-muted mb-1">
            <span>Jullie — {yoursLabel}</span>
            <span className={`font-medium ${isHigh ? "text-accent" : "text-primary"}`}>
              {yoursPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2.5 bg-[#E8E0D0] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isHigh ? "bg-accent" : "bg-primary"}`}
              style={{ width: `${yoursWidth}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-body text-text-muted mb-1">
            <span>Gemiddeld — {averageLabel}</span>
            <span className="font-medium text-text-muted">{averagePct.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 bg-[#E8E0D0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#B8C9BC] transition-all duration-500"
              style={{ width: `${avgWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function formatEur(n: number) {
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}

export default function QuizClient() {
  const [state, setState] = useState<QuizState>({
    inkomen: 4500,
    vasteLasten: 1800,
    boodschappen: 600,
    kinderen: 0,
    restant: 200,
  });
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const analysis = useMemo(() => {
    const { inkomen, vasteLasten, boodschappen, kinderen, restant } = state;

    const benchVasteLastenPct = 38;
    const benchBoodschappenPct = 14 + kinderen * 2;
    const benchRestantPct = 12;

    const yourVasteLastenPct = (vasteLasten / inkomen) * 100;
    const yourBoodschappenPct = (boodschappen / inkomen) * 100;
    const yourRestantPct = (restant / inkomen) * 100;

    const benchRestant = (benchRestantPct / 100) * inkomen;
    const diff = restant - benchRestant;

    let verdict: "green" | "orange" | "red";
    let verdictText: string;
    if (diff > 200) {
      verdict = "green";
      verdictText = "Jullie houden meer over dan vergelijkbare gezinnen.";
    } else if (diff >= -200) {
      verdict = "orange";
      verdictText = "Jullie zitten dicht bij het gemiddelde maar er is weinig buffer.";
    } else {
      verdict = "red";
      verdictText = "Jullie houden structureel minder over. Dit is precies het patroon dat we kennen.";
    }

    return {
      benchVasteLastenPct,
      benchBoodschappenPct,
      benchRestantPct,
      yourVasteLastenPct,
      yourBoodschappenPct,
      yourRestantPct,
      benchRestant,
      diff,
      verdict,
      verdictText,
    };
  }, [state]);

  const verdictColors = {
    green: "bg-green-light text-primary",
    orange: "bg-[#FEF3E2] text-[#92600A]",
    red: "bg-[#FDE8E0] text-accent",
  };

  const kidOptions: { label: string; value: Kids }[] = [
    { label: "Geen", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3+", value: 3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left: Questions */}
      <div className="space-y-10">
        {/* Q1 */}
        <div>
          <label className="block font-display font-light text-primary text-xl mb-1">
            Wat is jullie netto gezinsinkomen per maand?
          </label>
          <p className="text-text-muted font-body text-xs mb-4">
            Schuif naar het bedrag dat het best bij jullie past
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={2000}
              max={8000}
              step={100}
              value={state.inkomen}
              onChange={(e) =>
                setState((s) => ({ ...s, inkomen: +e.target.value }))
              }
              className="flex-1 accent-primary"
              aria-label="Netto gezinsinkomen per maand"
            />
            <span className="font-display font-light text-primary text-2xl w-28 text-right">
              {formatEur(state.inkomen)}
            </span>
          </div>
        </div>

        {/* Q2 */}
        <div>
          <label className="block font-display font-light text-primary text-xl mb-1">
            Wat zijn jullie vaste lasten?
          </label>
          <p className="text-text-muted font-body text-xs mb-4">
            Huur/hypotheek, verzekeringen, abonnementen, energie
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={500}
              max={4000}
              step={50}
              value={state.vasteLasten}
              onChange={(e) =>
                setState((s) => ({ ...s, vasteLasten: +e.target.value }))
              }
              className="flex-1 accent-primary"
              aria-label="Vaste lasten per maand"
            />
            <span className="font-display font-light text-primary text-2xl w-28 text-right">
              {formatEur(state.vasteLasten)}
            </span>
          </div>
        </div>

        {/* Q3 */}
        <div>
          <label className="block font-display font-light text-primary text-xl mb-1">
            Wat geven jullie aan boodschappen?
          </label>
          <p className="text-text-muted font-body text-xs mb-4">
            Supermarkt, dagelijkse boodschappen
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={200}
              max={1200}
              step={25}
              value={state.boodschappen}
              onChange={(e) =>
                setState((s) => ({ ...s, boodschappen: +e.target.value }))
              }
              className="flex-1 accent-primary"
              aria-label="Maandelijks boodschappenbudget"
            />
            <span className="font-display font-light text-primary text-2xl w-28 text-right">
              {formatEur(state.boodschappen)}
            </span>
          </div>
        </div>

        {/* Q4 */}
        <div>
          <p className="font-display font-light text-primary text-xl mb-4">
            Hoeveel kinderen wonen er thuis?
          </p>
          <div className="flex gap-3 flex-wrap">
            {kidOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setState((s) => ({ ...s, kinderen: opt.value }))
                }
                className={`px-6 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-150 ${
                  state.kinderen === opt.value
                    ? "bg-primary text-white shadow-card"
                    : "bg-card border border-[#D6CEBC] text-text-soft hover:border-primary"
                }`}
                aria-pressed={state.kinderen === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q5 */}
        <div>
          <label className="block font-display font-light text-primary text-xl mb-1">
            Hoeveel houden jullie over aan het einde van de maand?
          </label>
          <p className="text-text-muted font-body text-xs mb-4">
            Schatting is prima
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={-500}
              max={2000}
              step={25}
              value={state.restant}
              onChange={(e) =>
                setState((s) => ({ ...s, restant: +e.target.value }))
              }
              className="flex-1 accent-primary"
              aria-label="Maandelijks restant"
            />
            <span
              className={`font-display font-light text-2xl w-28 text-right ${
                state.restant < 0 ? "text-accent" : "text-primary"
              }`}
            >
              {state.restant < 0
                ? `-€${Math.abs(state.restant).toLocaleString("nl-NL")}`
                : formatEur(state.restant)}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Live comparison panel */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="card-base border border-[#E8E0D0]">
          <p className="section-eyebrow mb-6">Jouw vergelijking</p>

          <Bar
            label="Vaste lasten"
            yours={state.vasteLasten}
            average={(analysis.benchVasteLastenPct / 100) * state.inkomen}
            yoursPct={analysis.yourVasteLastenPct}
            averagePct={analysis.benchVasteLastenPct}
            yoursLabel={formatEur(state.vasteLasten)}
            averageLabel={formatEur(
              (analysis.benchVasteLastenPct / 100) * state.inkomen
            )}
          />

          <Bar
            label="Boodschappen"
            yours={state.boodschappen}
            average={(analysis.benchBoodschappenPct / 100) * state.inkomen}
            yoursPct={analysis.yourBoodschappenPct}
            averagePct={analysis.benchBoodschappenPct}
            yoursLabel={formatEur(state.boodschappen)}
            averageLabel={formatEur(
              (analysis.benchBoodschappenPct / 100) * state.inkomen
            )}
          />

          <Bar
            label="Wat jullie overhouden"
            yours={state.restant}
            average={analysis.benchRestant}
            yoursPct={Math.max(analysis.yourRestantPct, 0)}
            averagePct={analysis.benchRestantPct}
            yoursLabel={
              state.restant < 0
                ? `-€${Math.abs(state.restant)}`
                : formatEur(state.restant)
            }
            averageLabel={formatEur(analysis.benchRestant)}
          />

          <div
            className={`rounded-xl p-4 mb-6 ${verdictColors[analysis.verdict]}`}
          >
            <p className="font-body font-medium text-sm">{analysis.verdictText}</p>
            {analysis.diff !== 0 && (
              <p className="font-body text-xs mt-1 opacity-70">
                {analysis.diff > 0
                  ? `${formatEur(Math.abs(analysis.diff))} meer dan vergelijkbaar gezin`
                  : `${formatEur(Math.abs(analysis.diff))} minder dan vergelijkbaar gezin`}
              </p>
            )}
          </div>

          {!emailSent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Analyse aangevraagd voor:", email);
                setEmailSent(true);
              }}
              className="space-y-3"
            >
              <p className="font-display font-light text-primary text-lg">
                Ontvang mijn persoonlijke analyse
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                required
                className="input-base"
                aria-label="E-mailadres voor analyse"
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Stuur mijn analyse
              </button>
            </form>
          ) : (
            <div className="bg-green-light rounded-xl p-4 text-center">
              <p className="font-display font-light text-primary text-lg mb-1">
                Gelukt!
              </p>
              <p className="text-text-soft font-body text-sm">
                We sturen je persoonlijke analyse zodra we live gaan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
