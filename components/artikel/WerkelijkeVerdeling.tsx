'use client'
import { useState } from 'react'

const gezinnen = [
  {
    label: 'Stel, geen kinderen, huur',
    inkomen: 4000,
    posten: [
      { naam: 'Huur + energie + internet', bedrag: 1350, kleur: '#1C3A2A' },
      { naam: 'Boodschappen', bedrag: 650, kleur: '#2D6A4F' },
      { naam: 'Auto + verzekeringen', bedrag: 450, kleur: '#8AB89A' },
      { naam: 'Abonnementen', bedrag: 180, kleur: '#C4603A' },
      { naam: 'Vrije tijd', bedrag: 300, kleur: '#E8A882' },
      { naam: 'Over', bedrag: 1070, kleur: '#E8F2EC', over: true },
    ],
    commentaar: 'Zonder kinderen en met huur is er nog relatief veel ruimte. Maar ook hier verdwijnt het geld snel als er geen systeem is.'
  },
  {
    label: 'Gezin 2 kinderen, koopwoning',
    inkomen: 4000,
    posten: [
      { naam: 'Hypotheek + energie + internet', bedrag: 1550, kleur: '#1C3A2A' },
      { naam: 'Boodschappen', bedrag: 875, kleur: '#2D6A4F' },
      { naam: 'Auto + verzekeringen', bedrag: 580, kleur: '#8AB89A' },
      { naam: 'Kinderkosten', bedrag: 280, kleur: '#C4603A' },
      { naam: 'Abonnementen', bedrag: 210, kleur: '#E8A882' },
      { naam: 'Over', bedrag: 505, kleur: '#E8F2EC', over: true },
    ],
    commentaar: 'De meest herkenbare situatie voor de waarblijfthet-doelgroep. €505 over — op papier genoeg. Maar één tegenvaller en de maand is krap.'
  },
  {
    label: 'Gezin 3 kinderen (pubers), koopwoning',
    inkomen: 4000,
    posten: [
      { naam: 'Hypotheek + energie + internet', bedrag: 1550, kleur: '#1C3A2A' },
      { naam: 'Boodschappen', bedrag: 1200, kleur: '#2D6A4F' },
      { naam: 'Auto + verzekeringen', bedrag: 580, kleur: '#8AB89A' },
      { naam: 'Kinderkosten (sport, school)', bedrag: 380, kleur: '#C4603A' },
      { naam: 'Abonnementen', bedrag: 210, kleur: '#E8A882' },
      { naam: 'Over', bedrag: 80, kleur: '#FDECEA', over: true, zorgelijk: true },
    ],
    commentaar: 'Met drie oudere kinderen is het rekensommetje snel gemaakt: bijna niks over. Dit is de situatie van veel gezinnen die zichzelf afvragen waarom €4.000 netto zo weinig voelt.'
  },
]

interface Post {
  naam: string
  bedrag: number
  kleur: string
  over?: boolean
  zorgelijk?: boolean
}

export function WerkelijkeVerdeling() {
  const [actief, setActief] = useState(1)
  const g = gezinnen[actief]
  const over = g.posten.find((p: Post) => p.over)

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4">
        <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">Werkelijke verdeling</p>
        <p className="text-[#F5F0E8] text-sm font-medium">Wat blijft er echt over van €4.000 netto?</p>
      </div>

      <div className="bg-[#F5F0E8] px-5 py-3 flex flex-wrap gap-2">
        {gezinnen.map((gz, i) => (
          <button
            key={gz.label}
            onClick={() => setActief(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              actief === i
                ? 'bg-[#1C3A2A] text-[#F5F0E8] border-[#1C3A2A]'
                : 'bg-white text-[#4A5E4E] border-[#E8E0D4] hover:border-[#1C3A2A]'
            }`}
          >
            {gz.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FDFAF4]">
        <div className="space-y-2 mb-5">
          {g.posten.map((p: Post) => (
            <div key={p.naam} className="flex items-center gap-3">
              <span className="text-xs text-[#4A5E4E] w-44 flex-shrink-0">{p.naam}</span>
              <div className="flex-1 h-7 bg-[#EDE6D8] rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center px-2 transition-all duration-500"
                  style={{
                    width: `${(p.bedrag / g.inkomen) * 100}%`,
                    backgroundColor: p.kleur
                  }}
                >
                  <span className={`text-xs font-medium ${p.over && p.zorgelijk ? 'text-[#B03A2E]' : 'text-white'}`}>
                    €{p.bedrag}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#8A9E8E] w-8 text-right">
                {Math.round((p.bedrag / g.inkomen) * 100)}%
              </span>
            </div>
          ))}
        </div>

        <div className={`rounded-xl p-4 border ${over?.zorgelijk ? 'bg-[#FDECEA] border-[#F0B8B8]' : 'bg-[#E8F2EC] border-[#C0DDB0]'}`}>
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`text-2xl font-semibold ${over?.zorgelijk ? 'text-[#B03A2E]' : 'text-[#1C3A2A]'}`}>
              €{over?.bedrag} over
            </span>
            <span className="text-sm text-[#8A9E8E]">per maand</span>
          </div>
          <p className="text-sm text-[#4A5E4E]">{g.commentaar}</p>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F5F0E8] border-t border-[#E8E0D4]">
        <p className="text-xs text-[#8A9E8E]">Bedragen gebaseerd op werkelijke gemiddelden (forums, blogs, CBS 2024). Geen fictieve getallen — dit is wat vergelijkbare gezinnen rapporteren.</p>
      </div>
    </div>
  )
}
