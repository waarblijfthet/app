const winkels = [
  {
    naam: "DM",
    type: "Drogisterij",
    kleur: "#E8F2EC",
    tekstKleur: "#2D6A4F",
    beschrijving:
      "De absolute must voor verzorgingsproducten. Tandpasta, shampoo, wasmiddel, babyspullen — hier is het verschil met Nederland het grootst. Tot 50% goedkoper dan Kruidvat.",
    bestVoor: ["Drogisterij", "Babyspullen", "Wasmiddel", "Huismerk producten"],
    tip: "Download de DM-app voor extra coupons",
  },
  {
    naam: "Kaufland",
    type: "Hypermarkt",
    kleur: "#FAF0EB",
    tekstKleur: "#92600A",
    beschrijving:
      "Alles onder één dak. Goed voor A-merken, vlees, en bulkinkopen. De statiegeldautomaten accepteren alle verpakkingen — handig voor je Pfand.",
    bestVoor: ["A-merken", "Vers vlees", "Bulkinkoop", "Non-food"],
    tip: "Lever hier statiegeld in — automaat accepteert alles",
  },
  {
    naam: "Aldi & Lidl",
    type: "Discounter",
    kleur: "#E8F2EC",
    tekstKleur: "#2D6A4F",
    beschrijving:
      "De goedkoopste huismerken van Duitsland. Frisdrank, pasta, sauzen, diepvries — structureel lager dan in Nederland. Dezelfde ketens als hier, maar goedkoper.",
    bestVoor: ["Frisdrank", "Huismerk", "Diepvries", "Snacks"],
    tip: "Combineer met DM voor de beste trip",
  },
  {
    naam: "Rossmann",
    type: "Drogisterij",
    kleur: "#FAF0EB",
    tekstKleur: "#92600A",
    beschrijving:
      "DM's concurrent — soms zelfs goedkoper op A-merken. Goed voor parfum, gezichtsverzorging en schoonmaakmiddelen. Check beide apps voor de beste deal.",
    bestVoor: [
      "Parfum",
      "Gezichtsverzorging",
      "A-merk drogisterij",
      "Schoonmaak",
    ],
    tip: "Vergelijk met DM-app voor de laagste prijs",
  },
];

export function WinkelGids() {
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {winkels.map((w) => (
        <div
          key={w.naam}
          className="rounded-xl border border-[#E8E0D4] bg-[#FDFAF4] overflow-hidden"
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: w.kleur }}
          >
            <div>
              <p className="font-semibold text-[#1C3A2A]">{w.naam}</p>
              <p className="text-xs" style={{ color: w.tekstKleur }}>
                {w.type}
              </p>
            </div>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-[#4A5E4E] leading-relaxed mb-3">
              {w.beschrijving}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {w.bestVoor.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F5F0E8] text-[#4A5E4E] px-2 py-0.5 rounded-full border border-[#E8E0D4]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-start gap-2 bg-[#F5F0E8] rounded-lg px-3 py-2">
              <span className="text-[#C4603A] text-xs mt-0.5">→</span>
              <p className="text-xs text-[#4A5E4E]">{w.tip}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
