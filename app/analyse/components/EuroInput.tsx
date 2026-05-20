interface EuroInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  label?: string;
  id?: string;
  className?: string;
}

export default function EuroInput({
  value,
  onChange,
  placeholder = "0",
  hint,
  label,
  id,
  className = "",
}: EuroInputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block font-body font-medium text-text-soft text-sm mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-body text-base select-none pointer-events-none">
          €
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            // allow only digits
            const clean = e.target.value.replace(/[^\d]/g, "");
            onChange(clean);
          }}
          placeholder={placeholder}
          className="w-full bg-white border border-[rgba(26,70,42,0.18)] rounded-[10px] pl-8 pr-4 py-3 text-base text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-text-muted font-body text-xs mt-1.5">
          {hint}
        </p>
      )}
    </div>
  );
}
