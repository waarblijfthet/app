'use client'
import { useState } from 'react'

const data = [
  {
    label: 'Alleenstaand',
    nibud: 230,
    werkelijk: 310,
    forum: '€250-400 in de praktijk',
    noot: 'Nibud rekent minimale voeding. Drogisterij, bakker en tussendoor telt niet mee.'
  },
  {
    label: 'Stel, geen kinderen',
    nibud: 490,
    werkelijk: 650,
    forum: '€600-800 in de praktijk',
    noot: 'Forums: "Wij zijn met z\'n tweeën en zitten op €700, zonder iets geks."'
  },
  {
    label: 'Gezin + 1 kind',
    nibud: 580,
    werkelijk: 750,
    forum: '€650-850 in de praktijk',
    noot: 'Kinderopvang, schoollunch en tussendoortjes zitten niet in de Nibud-tabel.'
  },
  {
    label: 'Gezin + 2 kinderen',
    nibud: 655,
    werkelijk: 875,
    forum: '€700-1.000 in de praktijk',
    noot: 'Mamablogger gezin van 4: €737/mnd bij AH alleen al. "Niet eens zo gek."'
  },
  {
    label: 'Gezin + 3 kinderen (pubers)',
    nibud: 700,
    werkelijk: 1150,
    forum: '€900-1.400 in de praktijk',
    noot: 'Pubers eten bijna net zoveel als volwassenen. Nibud onderschat dit structureel.'
  },
]

export function BoodschappenKloof() {
  const [actief, setActief] = useState(3)
  const d = data[actief]
  const kloof = d.werkelijk - d.nibud
  const kloefPct = Math.round((kloof / d.nibud) * 100)
  const maxBar = Math.max(...data.map(x => x.werkelijk)) * 1.1

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">Nibud norm vs. werkelijkheid</p>
          <p className="text-[#F5F0E8] text-sm font-medium">De kloof die niemand je vertelt</p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Gemiddelde kloof</p>
          <p className="text-[#C4603A] text-xl font-semibold">+{kloefPct}%</p>
        </div>
      </div>

      <div className="bg-[#F5F0E8] px-5 py-3 flex flex-wrap gap-2">
        {data.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActief(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              actief === i
                ? 'bg-[#1C3A2A] text-[#F5F0E8] border-[#1C3A2A]'
                : 'bg-white text-[#4A5E4E] border-[#E8E0D4] hover:border-[#1C3A2A]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FDFAF4]">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#EDE6D8] rounded-xl p-4">
            <p className="text-xs text-[#8A9E8E] mb-1">Nibud minimum</p>
            <p className="text-2xl font-semibold text-[#4A5E4E]">€{d.nibud}</p>
            <p className="text-xs text-[#8A9E8E] mt-1">Officieel advies /mnd</p>
          </div>
          <div className="bg-[#FAF0EB] rounded-xl p-4 border border-[#F0D8C8]">
            <p className="text-xs text-[#C4603A] mb-1">Werkelijk gemiddelde</p>
            <p className="text-2xl font-semibold text-[#1C3A2A]">€{d.werkelijk}</p>
            <p className="text-xs text-[#8A9E8E] mt-1">Uit forums en blogs /mnd</p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <div className="flex justify-between text-xs text-[#4A5E4E] mb-1">
              <span>Nibud norm</span>
              <span className="font-medium">€{d.nibud}/mnd</span>
            </div>
            <div className="h-5 bg-[#EDE6D8] rounded-lg overflow-hidden">
              <div
                className="h-full bg-[#2D6A4F] rounded-lg flex items-center px-2 transition-all duration-500"
                style={{ width: `${(d.nibud / maxBar) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">Norm</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#4A5E4E] mb-1">
              <span>Werkelijk gemiddelde</span>
              <span className="font-medium text-[#C4603A]">€{d.werkelijk}/mnd</span>
            </div>
            <div className="h-5 bg-[#EDE6D8] rounded-lg overflow-hidden">
              <div
                className="h-full bg-[#C4603A] rounded-lg flex items-center px-2 transition-all duration-500"
                style={{ width: `${(d.werkelijk / maxBar) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">+€{kloof}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F0E8] rounded-xl p-4 border border-[#E8E0D4]">
          <p className="text-xs font-medium text-[#1C3A2A] mb-1">Wat mensen zelf zeggen</p>
          <p className="text-sm text-[#4A5E4E] italic">&ldquo;{d.forum}&rdquo;</p>
          <p className="text-xs text-[#8A9E8E] mt-2">{d.noot}</p>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F5F0E8] border-t border-[#E8E0D4]">
        <p className="text-xs text-[#8A9E8E]">Nibud: berekeningen januari 2026. Werkelijke bedragen: samengesteld uit forum-polls (Zeg maar Yes, n=51), mamablogs en eigen meldingen van gezinnen. Exclusief drogisterij tenzij vermeld.</p>
      </div>
    </div>
  )
}
