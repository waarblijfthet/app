import type { ArticlePreviewData } from "@/lib/inzichten-data";

type Props = {
  preview: ArticlePreviewData;
  className?: string;
};

export function ArticlePreview({ preview, className = "" }: Props) {
  const base = `w-full h-full flex flex-col justify-between p-4 ${className}`;

  // ── Vergelijking ────────────────────────────────────────────────────────────
  if (preview.type === "vergelijking") {
    const max = Math.max(...preview.items.map((i) => i.bedrag));
    return (
      <div className={base}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-3">
          {preview.label}
        </p>
        <div className="space-y-2 flex-1 flex flex-col justify-center">
          {preview.items.map((item) => (
            <div key={item.naam}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#4A5E4E]">{item.naam}</span>
                <span className="font-semibold" style={{ color: item.kleur }}>
                  €{item.bedrag}
                </span>
              </div>
              <div className="h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.bedrag / max) * 100}%`,
                    backgroundColor: item.kleur,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {preview.noot && (
          <p className="text-[10px] text-[#8A9E8E] mt-3">{preview.noot}</p>
        )}
      </div>
    );
  }

  // ── Verdeling ───────────────────────────────────────────────────────────────
  if (preview.type === "verdeling") {
    return (
      <div className={base}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-3">
          {preview.label}
        </p>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex h-8 rounded-lg overflow-hidden gap-0.5 mb-3">
            {preview.posten.map((p) => (
              <div
                key={p.naam}
                style={{ width: `${p.pct}%`, backgroundColor: p.kleur }}
                className="h-full"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1">
            {preview.posten.map((p) => (
              <div key={p.naam} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: p.kleur }}
                />
                <span className="text-[10px] text-[#4A5E4E]">
                  {p.naam} {p.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className="text-lg font-semibold text-[#1C3A2A]">
            {preview.uitkomst}
          </span>
        </div>
      </div>
    );
  }

  // ── Statistiek ──────────────────────────────────────────────────────────────
  if (preview.type === "statistiek") {
    return (
      <div className={base}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-3">
          {preview.label}
        </p>
        <div className="flex-1 flex flex-col justify-center space-y-1.5">
          {preview.segmenten.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between rounded-lg px-3 py-1.5"
              style={{ backgroundColor: s.kleur }}
            >
              <span className="text-xs" style={{ color: s.tekstKleur }}>
                {s.label}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: s.tekstKleur }}
              >
                {s.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Tarief ──────────────────────────────────────────────────────────────────
  if (preview.type === "tarief") {
    const totaal = preview.netto + preview.belasting + preview.kortingsafbouw;
    return (
      <div className={base}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-3">
          {preview.label}
        </p>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex h-10 rounded-xl overflow-hidden gap-0.5 mb-3">
            <div
              className="bg-[#FDECEA] h-full flex items-center justify-center"
              style={{ width: `${(preview.belasting / totaal) * 100}%` }}
            >
              <span className="text-[9px] text-[#B03A2E] font-medium px-1">
                Belasting
              </span>
            </div>
            <div
              className="bg-[#FAF0EB] h-full flex items-center justify-center"
              style={{ width: `${(preview.kortingsafbouw / totaal) * 100}%` }}
            >
              <span className="text-[9px] text-[#92600A] font-medium px-1">
                Afbouw
              </span>
            </div>
            <div
              className="bg-[#E8F2EC] h-full flex items-center justify-center"
              style={{ width: `${(preview.netto / totaal) * 100}%` }}
            >
              <span className="text-[9px] text-[#2D6A4F] font-medium px-1">
                Netto
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#1C3A2A]">
              €{preview.netto}
              <span className="text-sm font-normal text-[#8A9E8E]">/mnd</span>
            </p>
            <p className="text-xs text-[#8A9E8E]">
              netto over van €10k bruto meer
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Pijn ────────────────────────────────────────────────────────────────────
  if (preview.type === "pijn") {
    return (
      <div className={`${base} items-center justify-center`}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-4">
          {preview.label}
        </p>
        <div className="space-y-2 w-full">
          {preview.items.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-[#F5F0E8] rounded-lg px-3 py-2"
            >
              <div className="w-5 h-5 rounded-full bg-[#1C3A2A] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-white font-medium">
                  {i + 1}
                </span>
              </div>
              <span className="text-sm text-[#1C3A2A] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Doelen ──────────────────────────────────────────────────────────────────
  if (preview.type === "doelen") {
    const minMaanden = Math.min(...preview.stappen.map((s) => s.maanden));
    const barKleuren = ["#B03A2E", "#C4603A", "#2D6A4F"];
    return (
      <div className={base}>
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#8A9E8E] mb-3">
          {preview.label}
        </p>
        <div className="flex-1 flex flex-col justify-center space-y-2">
          {preview.stappen.map((s, i) => (
            <div key={s.bedrag} className="flex items-center gap-3">
              <span className="text-xs text-[#4A5E4E] w-14 flex-shrink-0">
                €{s.bedrag}/mnd
              </span>
              <div className="flex-1 h-5 bg-[#EDE6D8] rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${Math.round((minMaanden / s.maanden) * 100)}%`,
                    backgroundColor: barKleuren[i] ?? "#8AB89A",
                  }}
                />
              </div>
              <span className="text-xs font-medium text-[#1C3A2A] w-14 text-right">
                {s.maanden} mnd
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Fallback ────────────────────────────────────────────────────────────────
  return (
    <div className={`${base} items-center justify-center`}>
      <div className="w-8 h-8 rounded-full bg-[#E8F2EC] flex items-center justify-center">
        <span className="text-[#2D6A4F] text-lg">→</span>
      </div>
    </div>
  );
}
