'use client'
import { useState } from 'react'

interface Post {
  naam: string
  bedrag: number
  kleur: string
  over?: boolean
  zorgelijk?: boolean
}

interface Gezin {
  label: string
  inkomen: number
  posten: Post[]
  commentaar: string
}

const gezinnen: Gezin[] = [
  {
    label: 'Stel, geen kinderen, huur',
    inkomen: 4000,
    posten: [
      { naam: 'Huur + energie + internet', bedrag: 1350, kleur: '#16211F' },
      { naam: 'Boodschappen', bedrag: 650, kleur: '#0B7A6E' },
      { naam: 'Auto + verzekeringen', bedrag: 450, kleur: '#86BCAF' },
      { naam: 'Abonnementen', bedrag: 180, kleur: '#0B7A6E' },
      { naam: 'Vrije tijd', bedrag: 300, kleur: '#A6D8CD' },
      { naam: 'Over', bedrag: 1070, kleur: '#E7F1EE', over: true },
    ],
    commentaar: 'Zonder kinderen en met huur is er nog relatief veel ruimte. Maar ook hier verdwijnt het geld snel als er geen systeem is.'
  },
  {
    label: 'Gezin 2 kinderen, koopwoning',
    inkomen: 4000,
    posten: [
      { naam: 'Hypotheek + energie + internet', bedrag: 1550, kleur: '#16211F' },
      { naam: 'Boodschappen', bedrag: 875, kleur: '#0B7A6E' },
      { naam: 'Auto + verzekeringen', bedrag: 580, kleur: '#86BCAF' },
      { naam: 'Kinderkosten', bedrag: 280, kleur: '#0B7A6E' },
      { naam: 'Abonnementen', bedrag: 210, kleur: '#A6D8CD' },
      { naam: 'Over', bedrag: 505, kleur: '#E7F1EE', over: true },
    ],
    commentaar: 'De meest herkenbare situatie voor de waarblijfthet-doelgroep. €505 over — op papier genoeg. Maar één tegenvaller en de maand is krap.'
  },
  {
    label: 'Gezin 3 kinderen (pubers), koopwoning',
    inkomen: 4000,
    posten: [
      { naam: 'Hypotheek + energie + internet', bedrag: 1550, kleur: '#16211F' },
      { naam: 'Boodschappen', bedrag: 1200, kleur: '#0B7A6E' },
      { naam: 'Auto + verzekeringen', bedrag: 580, kleur: '#86BCAF' },
      { naam: 'Kinderkosten (sport, school)', bedrag: 380, kleur: '#0B7A6E' },
      { naam: 'Abonnementen', bedrag: 210, kleur: '#A6D8CD' },
      { naam: 'Over', bedrag: 80, kleur: '#FDECEA', over: true, zorgelijk: true },
    ],
    commentaar: 'Met drie oudere kinderen is het rekensommetje snel gemaakt: bijna niks over. Dit is de situatie van veel gezinnen die zichzelf afvragen waarom €4.000 netto zo weinig voelt.'
  },
]

export function WerkelijkeVerdeling() {
  const [actief, setActief] = useState(1)
  const g = gezinnen[actief]
  const over = g.posten.find((p) => p.over)

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      <div className="bg-[#16211F] px-5 py-4">
        <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">Werkelijke verdeling</p>
        <p className="text-[#F7F8F7] text-sm font-medium">Wat blijft er echt over van €4.000 netto?</p>
      </div>

      <div className="bg-[#F7F8F7] px-5 py-3 flex flex-wrap gap-2">
        {gezinnen.map((gz, i) => (
          <button
            key={gz.label}
            onClick={() => setActief(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              actief === i
                ? 'bg-[#16211F] text-[#F7F8F7] border-[#16211F]'
                : 'bg-white text-[#4A5A56] border-[#E6E9E7] hover:border-[#16211F]'
            }`}
          >
            {gz.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FFFFFF]">
        <div className="space-y-2 mb-5">
          {g.posten.map((p) => (
            <div key={p.naam} className="flex items-center gap-3">
              <span className="text-xs text-[#4A5A56] w-44 flex-shrink-0">{p.naam}</span>
              <div className="flex-1 h-7 bg-[#F0F3F1] rounded-lg overflow-hidden">
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
              <span className="text-xs text-[#8B958F] w-8 text-right">
                {Math.round((p.bedrag / g.inkomen) * 100)}%
              </span>
            </div>
          ))}
        </div>

        <div className={`rounded-xl p-4 border ${over?.zorgelijk ? 'bg-[#FDECEA] border-[#F0B8B8]' : 'bg-[#E7F1EE] border-[#B9DDD3]'}`}>
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`text-2xl font-semibold ${over?.zorgelijk ? 'text-[#B03A2E]' : 'text-[#16211F]'}`}>
              €{over?.bedrag} over
            </span>
            <span className="text-sm text-[#8B958F]">per maand</span>
          </div>
          <p className="text-sm text-[#4A5A56]">{g.commentaar}</p>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F7F8F7] border-t border-[#E6E9E7]">
        <p className="text-xs text-[#8B958F]">Bedragen gebaseerd op werkelijke gemiddelden (forums, blogs, CBS 2024). Geen fictieve getallen — dit is wat vergelijkbare gezinnen rapporteren.</p>
      </div>
    </div>
  )
}
