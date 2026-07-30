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
  /**
   * Vervangt de kleur van `variant` volledig door eigen Tailwind-classes
   * (bijv. "bg-purple-50 text-purple-700"). Nodig voor categorale kleuren
   * (zoals doelgroep) die geen van de vijf semantische varianten dekken.
   * De vorm (padding, radius, tekstgrootte) blijft van deze component komen,
   * dus dit is geen eigen badge-implementatie, alleen een kleur-override.
   */
  kleurOverride?: string;
}

/**
 * Eén badge-component voor de hele admin, in plaats van de vier losse
 * implementaties met inline hex-styles die er eerder waren (zie
 * docs/admin-redesign-30-jul-2026.md sectie 3).
 */
export default function Badge({ variant = "neutraal", children, className = "", kleurOverride }: Props) {
  return (
    <span
      className={`font-body text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap inline-block ${kleurOverride ?? VARIANT_KLASSEN[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
