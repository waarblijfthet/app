"use client";

/**
 * De introductie is zelf ook een scherm, geen formulierpagina (28-aug-2026,
 * pass 5). Extreem kort: één kop, één zin, drie geruststellingen, één knop.
 * Na klikken begint direct de eerste vraag, zonder tussenpagina.
 */
export default function IntroScherm({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <h1 className="font-display font-light text-primary text-3xl sm:text-4xl leading-snug mb-3">
        In 2 minuten zie je hoe jouw huishouden ervoor staat.
      </h1>
      <p className="text-text-soft font-body font-light text-base mb-6">
        Je hoeft niets op te zoeken. Kies wat ongeveer bij jullie past, een
        schatting is genoeg.
      </p>
      <ul className="space-y-2 mb-8">
        {[
          "Geen bankgegevens",
          "Anoniem starten",
          "Je ziet direct wat opvalt",
        ].map((zin) => (
          <li
            key={zin}
            className="flex items-center gap-2.5 font-body text-sm text-text-soft"
          >
            <span className="text-accent">✓</span>
            {zin}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onStart} className="btn-primary">
        Start mijn analyse →
      </button>
    </div>
  );
}
