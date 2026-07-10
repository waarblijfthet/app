'use client'

const stats = [
  {
    getal: '50%',
    label: 'van de Nederlandse stellen heeft ooit ruzie gemaakt over geld',
    bron: 'bunq onderzoek, Linda.nl 2025',
    kleur: '#FDECEA',
    tekstKleur: '#B03A2E',
  },
  {
    getal: '23%',
    label: 'wil vaker over geld praten met de partner — maar doet het niet',
    bron: 'bunq onderzoek 2025',
    kleur: '#E4F1EE',
    tekstKleur: '#92600A',
  },
  {
    getal: '60%',
    label: 'van stellen zegt dat hun partner anders met geld omgaat',
    bron: 'bunq onderzoek 2025',
    kleur: '#F0F3F1',
    tekstKleur: '#4A5A56',
  },
  {
    getal: '3%',
    label: 'van Nederlanders praat openlijk over geldzorgen',
    bron: 'Deloitte 2024',
    kleur: '#E7F1EE',
    tekstKleur: '#0B7A6E',
  },
]

const signalen = [
  'Je vermijdt het gesprek over geld',
  'Je weet niet precies wat de ander verdient of uitgeeft',
  'Er is irritatie als de ander iets koopt',
  'Je maakt financiële beslissingen bewust niet samen',
  'Geldstress zit op de achtergrond bij andere ruzies',
]

export function GeldRelatieStats() {
  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl overflow-hidden border border-[#E6E9E7]">
        <div className="bg-[#16211F] px-5 py-4">
          <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">
            Onderzoek 2024–2025
          </p>
          <p className="text-[#F7F8F7] text-sm font-medium">
            Geld en relaties in Nederland
          </p>
        </div>
        <div className="p-5 bg-[#FFFFFF] grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.getal}
              className="rounded-xl p-4 border border-[#E6E9E7]"
              style={{ backgroundColor: s.kleur }}
            >
              <p
                className="text-2xl font-semibold mb-1"
                style={{ color: s.tekstKleur }}
              >
                {s.getal}
              </p>
              <p className="text-xs text-[#4A5A56] leading-relaxed mb-2">
                {s.label}
              </p>
              <p className="text-[10px] text-[#8B958F]">{s.bron}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[#E6E9E7]">
        <div className="bg-[#F7F8F7] px-5 py-3 border-b border-[#E6E9E7]">
          <p className="text-xs font-medium text-[#4A5A56]">
            Herken jij dit in jullie relatie?
          </p>
        </div>
        <div className="bg-[#FFFFFF] p-5 space-y-2">
          {signalen.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-2 border-b border-[#F7F8F7] last:border-0"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#E6E9E7] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#4A5A56]">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
