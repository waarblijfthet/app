'use client'
import { useState } from 'react'

const voorbeeldInkomen = 4000

const potjes = [
  {
    naam: 'Vaste lasten',
    percentage: 65,
    bedrag: Math.round(voorbeeldInkomen * 0.65),
    kleur: '#16211F',
    lichtKleur: '#E7F1EE',
    beschrijving:
      'Hypotheek/huur, energie, verzekeringen, abonnementen. Automatisch van deze rekening.',
    rekening: 'Aparte betaalrekening',
  },
  {
    naam: 'Dagelijks leven',
    percentage: 20,
    bedrag: Math.round(voorbeeldInkomen * 0.2),
    kleur: '#0B7A6E',
    lichtKleur: '#E4F1EE',
    beschrijving:
      'Boodschappen, benzine, kleine aankopen. Contant of via pinpas van deze rekening.',
    rekening: 'Pinpas of cash envelop',
  },
  {
    naam: 'Sparen & buffer',
    percentage: 10,
    bedrag: Math.round(voorbeeldInkomen * 0.1),
    kleur: '#0B7A6E',
    lichtKleur: '#E7F1EE',
    beschrijving:
      'Noodbuffer, vakantie, grote uitgaven. Direct op salarisdag apart zetten.',
    rekening: 'Spaarrekening',
  },
  {
    naam: 'Vrij te besteden',
    percentage: 5,
    bedrag: Math.round(voorbeeldInkomen * 0.05),
    kleur: '#8B958F',
    lichtKleur: '#F0F3F1',
    beschrijving:
      'Zonder schuldgevoel besteden aan wat jij wil. Dit is jouw geld.',
    rekening: 'Eigen rekening per persoon',
  },
]

export function PotjesVisualisatie() {
  const [actief, setActief] = useState<number | null>(null)

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      <div className="bg-[#16211F] px-5 py-4">
        <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">
          Voorbeeld bij €4.000 netto
        </p>
        <p className="text-[#F7F8F7] text-sm font-medium">
          Zo verdeel je je inkomen in potjes
        </p>
      </div>

      <div className="p-5 bg-[#FFFFFF]">
        {/* Visuele verdeling */}
        <div className="flex h-10 rounded-xl overflow-hidden gap-0.5 mb-6">
          {potjes.map((p, i) => (
            <button
              key={p.naam}
              className="h-full transition-all hover:opacity-90 focus:outline-none"
              style={{
                width: `${p.percentage}%`,
                backgroundColor: p.kleur,
                opacity: actief !== null && actief !== i ? 0.4 : 1,
              }}
              onClick={() => setActief(actief === i ? null : i)}
              title={p.naam}
            />
          ))}
        </div>

        {/* Potjes */}
        <div className="grid grid-cols-2 gap-3">
          {potjes.map((p, i) => (
            <button
              key={p.naam}
              onClick={() => setActief(actief === i ? null : i)}
              className={`text-left rounded-xl p-4 transition-all ${
                actief === i ? 'border-2' : 'border border-[#E6E9E7]'
              }`}
              style={{
                backgroundColor: p.lichtKleur,
                borderColor: actief === i ? p.kleur : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: p.kleur }}
                  />
                  <span className="text-xs font-medium text-[#16211F]">
                    {p.naam}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: p.kleur }}
                >
                  {p.percentage}%
                </span>
              </div>
              <p className="text-xl font-semibold text-[#16211F]">
                €{p.bedrag}
              </p>
              <p className="text-xs text-[#8B958F] mt-1">{p.rekening}</p>
            </button>
          ))}
        </div>

        {/* Detail als geselecteerd */}
        {actief !== null && (
          <div
            className="mt-4 rounded-xl p-4 border"
            style={{
              backgroundColor: potjes[actief].lichtKleur,
              borderColor: potjes[actief].kleur + '40',
            }}
          >
            <p className="text-sm font-medium text-[#16211F] mb-1">
              {potjes[actief].naam}
            </p>
            <p className="text-sm text-[#4A5A56] leading-relaxed">
              {potjes[actief].beschrijving}
            </p>
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-[#F7F8F7] border-t border-[#E6E9E7]">
        <p className="text-xs text-[#8B958F]">
          Klik op een potje voor meer uitleg. Percentages zijn een startpunt —
          pas aan op jouw situatie.
        </p>
      </div>
    </div>
  )
}
