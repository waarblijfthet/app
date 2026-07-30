interface Props {
  titel: string;
  uitleg?: string;
  actieLabel?: string;
  onActie?: () => void;
  actieHref?: string;
}

/**
 * Lege staat met titel, uitleg en één actie. Nu ontbrak dit overal, waardoor
 * een leeg scherm op een fout leek (zie sectie 3, Gedeelde primitives).
 */
export default function LegeStaat({ titel, uitleg, actieLabel, onActie, actieHref }: Props) {
  return (
    <div className="py-16 text-center">
      <p className="font-body font-medium text-primary text-sm mb-1">{titel}</p>
      {uitleg && (
        <p className="font-body text-text-muted text-sm max-w-md mx-auto">{uitleg}</p>
      )}
      {actieLabel && actieHref && (
        <a href={actieHref} className="btn-outline text-sm py-2 px-4 inline-block mt-4">
          {actieLabel}
        </a>
      )}
      {actieLabel && onActie && !actieHref && (
        <button onClick={onActie} className="btn-outline text-sm py-2 px-4 mt-4">
          {actieLabel}
        </button>
      )}
    </div>
  );
}
