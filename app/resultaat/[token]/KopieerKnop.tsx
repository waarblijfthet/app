"use client";

import { useState } from "react";

export default function KopieerKnop({ url }: { url: string }) {
  const [gekopieerd, setGekopieerd] = useState(false);

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(url);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2500);
    } catch {
      // Fallback voor browsers zonder clipboard API
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2500);
    }
  }

  return (
    <button
      onClick={kopieer}
      className="w-full px-4 py-2.5 rounded-xl border border-white/30 font-body text-sm font-medium transition-all hover:bg-white/10"
      style={{ color: gekopieerd ? "#A6D8CD" : "rgba(245,240,232,0.8)" }}
    >
      {gekopieerd ? "✓ Link gekopieerd!" : "Kopieer link"}
    </button>
  );
}
