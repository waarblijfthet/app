type Variant = "neutraal" | "actie" | "goed" | "waarschuwing" | "fout";

const VARIANT_KLASSEN: Record<Variant, string> = {
  neutraal: "bg-[#F0F3F1] text-text-soft",
  actie: "bg-accent-bg text-accent",
  goed: "bg-success-bg text-success",
  waarschuwing: "bg-warning-bg text-warning",
  fout: "bg-danger-bg text-danger",
};

interface Props {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Eén badge-component voor de hele admin, in plaats van de vier losse
 * implementaties met inline hex-styles die er eerder waren (zie
 * docs/admin-redesign-30-jul-2026.md sectie 3).
 */
export default function Badge({ variant = "neutraal", children, className = "" }: Props) {
  return (
    <span
      className={`font-body text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap inline-block ${VARIANT_KLASSEN[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
