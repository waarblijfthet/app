interface Actie {
  label: string;
  onClick: () => void;
  variant?: "normaal" | "gevaarlijk";
}

interface Props {
  aantal: number;
  acties: Actie[];
  onWissen: () => void;
}

/**
 * Verschijnt zodra er rijen geselecteerd zijn in een DataTabel. Blijft
 * onderaan hangen zodat hij niet met de tabelkop meescrolt weg.
 */
export default function SelectieBalk({ aantal, acties, onWissen }: Props) {
  if (aantal === 0) return null;

  return (
    <div className="sticky bottom-4 z-30 mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-primary text-white px-4 py-3 shadow-card-hover font-body text-sm">
      <span className="font-medium">{aantal} geselecteerd</span>
      <div className="flex flex-wrap gap-2">
        {acties.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              a.variant === "gevaarlijk"
                ? "bg-danger text-white hover:opacity-90"
                : "bg-white/15 hover:bg-white/25"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <button
        onClick={onWissen}
        className="ml-auto text-xs text-white/60 hover:text-white"
      >
        Wissen
      </button>
    </div>
  );
}
