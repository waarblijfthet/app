'use client'
import { useState } from 'react'

const categorieen = [
  {
    label: 'Spaart niets',
    pct: 27,
    kleur: '#FDECEA',
    tekstKleur: '#B03A2E',
    beschrijving: 'Meer dan een kwart van de Nederlandse huishoudens spaart structureel niks. Niet omdat ze lui zijn, maar omdat er aan het einde van de maand niets meer over is.',
  },
  {
    label: 'Spaart minder dan 5%',
    pct: 31,
    kleur: '#E4F1EE',
    tekstKleur: '#92600A',
    beschrijving: 'De grootste groep. Zet elke maand iets opzij, maar te weinig om een echte buffer op te bouwen. Nibud-advies van 10% is buiten bereik.',
  },
  {
    label: 'Spaart 5-10%',
    pct: 24,
    kleur: '#F0F3F1',
    tekstKleur: '#4A5A56',
    beschrijving: 'Dichter bij de norm. Bouwt langzaam een buffer op. Voor een modaal gezin met kinderen is dit al een prestatie.',
  },
  {
    label: 'Spaart 10%+ (Nibud-norm)',
    pct: 18,
    kleur: '#E7F1EE',
    tekstKleur: '#0B7A6E',
    beschrijving: 'De minderheid. Haalt de officiële Nibud-norm. Bijna altijd met een actief systeem: automatische overschrijving op salarisdag, aparte spaarrekeningen per doel.',
  },
]

const bufferDoelen = [
  { doel: 'Begin (€1.000)', maanden: [20, 13, 8, 5], kleur: '#86BCAF' },
  { doel: 'Noodbuffer 3 mnd (€9.300)', maanden: [186, 120, 77, 47], kleur: '#0B7A6E' },
  { doel: 'Vakantie €3.000', maanden: [60, 39, 25, 15], kleur: '#0B7A6E' },
]

const inkomens = ['€50/mnd', '€100/mnd', '€200/mnd (6,5%)', '€310/mnd (10%)']

export function SpaarRealiteit() {
  const [tab, setTab] = useState<'verdeling' | 'doelen'>('verdeling')

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      <div className="bg-[#16211F] px-5 py-4">
        <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">Spaargedrag Nederlanders</p>
        <p className="text-[#F7F8F7] text-sm font-medium">Hoe de werkelijkheid eruitziet</p>
      </div>

      <div className="flex border-b border-[#E6E9E7] bg-[#F7F8F7]">
        {([['verdeling', 'Wie spaart wat?'], ['doelen', 'Hoe lang duurt het?']] as [string, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as 'verdeling' | 'doelen')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === key
                ? 'text-[#16211F] border-b-2 border-[#16211F] bg-white'
                : 'text-[#8B958F]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FFFFFF]">
        {tab === 'verdeling' ? (
          <div className="space-y-3">
            {categorieen.map(c => (
              <div
                key={c.label}
                className="rounded-xl p-4 border border-[#E6E9E7]"
                style={{ backgroundColor: c.kleur }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: c.tekstKleur }}>{c.label}</span>
                  <span className="text-2xl font-semibold" style={{ color: c.tekstKleur }}>{c.pct}%</span>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${c.pct}%`, backgroundColor: c.tekstKleur }}
                  />
                </div>
                <p className="text-xs text-[#4A5A56]">{c.beschrijving}</p>
              </div>
            ))}
            <p className="text-xs text-[#8B958F] mt-2">Bron: CBS vermogensstatistieken 2024, FinBuddy spaaronderzoek 2026.</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[#4A5A56] mb-4">Hoeveel maanden duurt het om een spaardoel te bereiken bij modaal inkomen (€3.100 netto)?</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead>
                  <tr className="border-b border-[#E6E9E7]">
                    <th className="text-left py-2 text-xs text-[#8B958F] font-medium">Spaardoel</th>
                    {inkomens.map(inc => (
                      <th key={inc} className="text-right py-2 text-xs text-[#8B958F] font-medium">{inc}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bufferDoelen.map(b => (
                    <tr key={b.doel} className="border-b border-[#E6E9E7]">
                      <td className="py-3 text-[#4A5A56]">{b.doel}</td>
                      {b.maanden.map((m, i) => (
                        <td key={i} className="text-right py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              m > 100 ? 'bg-[#FDECEA] text-[#B03A2E]' :
                              m > 30 ? 'bg-[#E4F1EE] text-[#92600A]' :
                              'bg-[#E7F1EE] text-[#0B7A6E]'
                            }`}
                          >
                            {m} mnd
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#8B958F] mt-3">Zonder rente. Met rente (2%) gaat het iets sneller. Maar het patroon is helder: wie meer spaart bereikt doelen veel eerder.</p>
          </div>
        )}
      </div>
    </div>
  )
}
