"use client";

import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Lead, QuizResultaat } from "../page";

interface Props {
  leads: Lead[];
  resultaten: QuizResultaat[];
}

function avg(nums: number[]) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function fmtEur(n: number) {
  return `€${Math.round(n).toLocaleString("nl-NL")}`;
}

function StatKaart({ label, waarde }: { label: string; waarde: string }) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-[#E6E9E7] p-5">
      <p className="font-display font-light text-primary text-4xl mb-1">{waarde}</p>
      <p className="text-text-muted font-body text-xs">{label}</p>
    </div>
  );
}

export default function OverzichtTabblad({ leads, resultaten }: Props) {
  const stats = useMemo(() => {
    const quizIngevuld = leads.filter((l) => l.quiz_voltooid).length;
    const quizPct = leads.length > 0 ? Math.round((quizIngevuld / leads.length) * 100) : 0;
    const overs = resultaten
      .map((r) => r.maandelijks_over_berekend)
      .filter((v): v is number => v != null);
    const gemOver = Math.round(avg(overs));

    const afwijkingen: Record<string, number> = {};
    resultaten.forEach((r) => {
      if (r.grootste_afwijking) {
        afwijkingen[r.grootste_afwijking] = (afwijkingen[r.grootste_afwijking] || 0) + 1;
      }
    });
    const meestVoorkomend = Object.entries(afwijkingen).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

    return { quizIngevuld, quizPct, gemOver, meestVoorkomend };
  }, [leads, resultaten]);

  // Aanmeldingen per week
  const weekData = useMemo(() => {
    const weeks: Record<string, number> = {};
    leads.forEach((l) => {
      const d = new Date(l.created_at);
      d.setDate(d.getDate() - d.getDay()); // maandag
      const key = d.toISOString().slice(0, 10);
      weeks[key] = (weeks[key] || 0) + 1;
    });
    return Object.entries(weeks)
      .map(([week, count]) => ({
        week: new Date(week).toLocaleDateString("nl-NL", { day: "numeric", month: "short" }),
        count,
      }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-12);
  }, [leads]);

  // Verdicts taart
  const verdictData = useMemo(() => [
    { name: "Goed", value: resultaten.filter((r) => r.verdict === "goed").length, color: "#2D6A4F" },
    { name: "Matig", value: resultaten.filter((r) => r.verdict === "matig").length, color: "#92600A" },
    { name: "Zorgelijk", value: resultaten.filter((r) => r.verdict === "zorgelijk").length, color: "#B03A2E" },
  ].filter((d) => d.value > 0), [resultaten]);

  // Inkomen vs Over staaf
  const inkomens = resultaten.map((r) => r.totaal_inkomen_berekend).filter((v): v is number => v != null);
  const overs = resultaten.map((r) => r.maandelijks_over_berekend).filter((v): v is number => v != null);
  const barData = [
    { name: "Gem. inkomen", waarde: Math.round(avg(inkomens)), fill: "#16211F" },
    { name: "Gem. over", waarde: Math.round(avg(overs)), fill: "#0B7A6E" },
  ];

  return (
    <div className="space-y-8">
      {/* Stat kaarten */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatKaart label="Totaal leads" waarde={String(leads.length)} />
        <StatKaart label="Quiz ingevuld" waarde={`${stats.quizIngevuld} (${stats.quizPct}%)`} />
        <StatKaart label="Gem. maandelijks over" waarde={fmtEur(stats.gemOver)} />
        <StatKaart label="Meest voorkomende afwijking" waarde={stats.meestVoorkomend} />
      </div>

      {/* Grafieken */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lijn: aanmeldingen per week */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-[#E6E9E7] p-5">
          <p className="font-body font-medium text-text-soft text-sm mb-4">Aanmeldingen per week</p>
          {weekData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weekData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E9E7" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#8B958F" }} />
                <YAxis tick={{ fontSize: 11, fill: "#8B958F" }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#FFFFFF", border: "1px solid #E6E9E7", borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="count" stroke="#16211F" strokeWidth={2} dot={{ fill: "#16211F", r: 3 }} name="Aanmeldingen" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-text-muted font-body text-sm">
              Nog geen data
            </div>
          )}
        </div>

        {/* Taart: verdicts */}
        <div className="bg-card rounded-xl shadow-card border border-[#E6E9E7] p-5">
          <p className="font-body font-medium text-text-soft text-sm mb-4">Verdeling verdicts</p>
          {verdictData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={verdictData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {verdictData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#FFFFFF", border: "1px solid #E6E9E7", borderRadius: 8, fontSize: 12 }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-text-muted font-body text-sm">
              Nog geen data
            </div>
          )}
        </div>
      </div>

      {/* Staaf: inkomen vs over */}
      <div className="bg-card rounded-xl shadow-card border border-[#E6E9E7] p-5 max-w-sm">
        <p className="font-body font-medium text-text-soft text-sm mb-4">Gemiddeld inkomen vs over</p>
        {inkomens.length > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9E7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8B958F" }} />
              <YAxis tick={{ fontSize: 11, fill: "#8B958F" }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => fmtEur(Number(v ?? 0))}
                contentStyle={{ background: "#FFFFFF", border: "1px solid #E6E9E7", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="waarde" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={`bar-${i}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[180px] flex items-center justify-center text-text-muted font-body text-sm">
            Nog geen data
          </div>
        )}
      </div>
    </div>
  );
}
