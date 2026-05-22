'use client'
import { useState } from 'react'

const profielen = [
  {
    label: 'Stel, huurwoning',
    posten: [
      { naam: 'Huur + energie + water', min: 1050, max: 1350, gem: 1200 },
      { naam: 'Zorgverzekering (2p)', min: 280, max: 380, gem: 316 },
      { naam: 'Internet + telefoon', min: 80, max: 150, gem: 110 },
      { naam: 'Overige verzekeringen', min: 80, max: 160, gem: 120 },
      { naam: 'Vervoer', min: 100, max: 450, gem: 280 },
      { naam: 'Abonnementen', min: 80, max: 250, gem: 150 },
    ],
  },
  {
    label: 'Gezin 2 kinderen, koopwoning',
    posten: [
      { naam: 'Hypotheek + energie + water', min: 1200, max: 1800, gem: 1500 },
      { naam: 'Zorgverzekering (2p)', min: 280, max: 380, gem: 316 },
      { naam: 'Internet + telefoon', min: 80, max: 150, gem: 110 },
      { naam: 'Overige verzekeringen', min: 150, max: 280, gem: 200 },
      { naam: 'Vervoer (1 auto)', min: 250, max: 600, gem: 400 },
      { naam: 'Abonnementen', min: 100, max: 280, gem: 180 },
    ],
  },
  {
    label: 'Gezin 3 kinderen, koopwoning',
    posten: [
      { naam: 'Hypotheek + energie + water', min: 1200, max: 1800, gem: 1500 },
      { naam: 'Zorgverzekering (2p)', min: 280, max: 380, gem: 316 },
      { naam: 'Internet + telefoon', min: 80, max: 150, gem: 110 },
      { naam: 'Overige verzekeringen', min: 150, max: 300, gem: 220 },
      { naam: 'Vervoer (1-2 auto)', min: 300, max: 700, gem: 480 },
      { naam: 'Abonnementen', min: 120, max: 300, gem: 200 },
    ],
  },
]

export function VasteLastenRadar() {
  const [actief, setActief] = useState(1)
  const profiel = profielen[actief]
  const totaalGem = profiel.posten.reduce((s, p) => s + p.gem, 0)
  const totaalMax = profiel.posten.reduce((s, p) => s + p.max, 0)
  const maxBar = Math.max(...profiel.posten.map((p) => p.max))

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">
            FinBuddy / Nibud 2026
          </p>
          <p className="text-[#F5F0E8] text-sm font-medium">
            Wat zijn normale vaste lasten?
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Gemiddeld totaal</p>
          <p className="text-[#F5F0E8] text-xl font-semibold">
            €{totaalGem.toLocaleString('nl-NL')}/mnd
          </p>
        </div>
      </div>

      <div className="bg-[#F5F0E8] px-5 py-3 flex flex-wrap gap-2">
        {profielen.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActief(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              actief === i
                ? 'bg-[#1C3A2A] text-[#F5F0E8] border-[#1C3A2A]'
                : 'bg-white text-[#4A5E4E] border-[#E8E0D4] hover:border-[#1C3A2A]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FDFAF4] space-y-4">
        {profiel.posten.map((post) => (
          <div key={post.naam}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#4A5E4E] font-medium">{post.naam}</span>
              <div className="flex gap-3">
                <span className="text-[#8A9E8E]">min €{post.min}</span>
                <span className="text-[#1C3A2A] font-semibold">gem €{post.gem}</span>
                <span className="text-[#8A9E8E]">max €{post.max}</span>
              </div>
            </div>
            <div className="relative h-4 bg-[#EDE6D8] rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-[#E8F2EC] rounded-full"
                style={{ width: `${(post.max / maxBar) * 100}%` }}
              />
              <div
                className="absolute h-full bg-[#2D6A4F] rounded-full"
                style={{ width: `${(post.gem / maxBar) * 100}%` }}
              />
              <div
                className="absolute h-full bg-[#1C3A2A] rounded-full"
                style={{ width: `${(post.min / maxBar) * 100}%` }}
              />
            </div>
          </div>
        ))}

        <div className="mt-5 pt-4 border-t border-[#E8E0D4] grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-[#8A9E8E] mb-1">Minimum</p>
            <p className="text-lg font-semibold text-[#4A5E4E]">
              €{profiel.posten.reduce((s, p) => s + p.min, 0).toLocaleString('nl-NL')}
            </p>
          </div>
          <div className="bg-[#E8F2EC] rounded-xl py-2">
            <p className="text-xs text-[#2D6A4F] mb-1">Gemiddeld</p>
            <p className="text-lg font-semibold text-[#1C3A2A]">
              €{totaalGem.toLocaleString('nl-NL')}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#8A9E8E] mb-1">Maximum</p>
            <p className="text-lg font-semibold text-[#C4603A]">
              €{totaalMax.toLocaleString('nl-NL')}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F5F0E8] border-t border-[#E8E0D4]">
        <p className="text-xs text-[#8A9E8E]">
          Bron: FinBuddy vaste lasten overzicht 2026, Nibud 2026, eigen
          berekeningen. Excl. boodschappen en vrije tijd.
        </p>
      </div>
    </div>
  )
}
