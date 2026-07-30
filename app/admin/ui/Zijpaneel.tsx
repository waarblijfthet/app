"use client";

import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  titel: string;
  subtitel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Detail- en bewerkpaneel. Op desktop schuift het rechts in (480px vast),
 * op mobiel is het een bladzijde van onder die het hele scherm vult.
 * Sluit op Escape en op de achtergrond klikken.
 */
export default function Zijpaneel({ open, onClose, titel, subtitel, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-primary/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full sm:w-[480px] h-full bg-card shadow-card-hover flex flex-col overflow-hidden">
        <div className="flex items-start justify-between px-5 py-4 border-b border-[#E6E9E7]">
          <div>
            <h2 className="font-body font-semibold text-primary text-base">{titel}</h2>
            {subtitel && (
              <p className="font-body text-text-muted text-sm mt-0.5">{subtitel}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="text-text-muted hover:text-primary text-lg leading-none px-1"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <div className="px-5 py-3 border-t border-[#E6E9E7] flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
