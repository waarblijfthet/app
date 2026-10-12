"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { Bedragveld, Tegel, RekenKader, DONKER, ZACHT, type Bedrag } from "./Rekenveld";

/**
 * Waar ging je loonsverhoging heen? (12-okt-2026, lifestyle inflatie.) Vier
 * bedragen: netto inkomen en sparen toen en nu. Uitkomst: welk deel van de
 * stijging op de spaarrekening aankwam en welk deel in de maand verdween.
 * Opstap, geen oordeel, geen Geldscan-link (CLAUDE.md 5).
 */

export default function LoonsverhogingSpoor() {
  const [inkomenToen, setInkomenToen] = useState<Bedrag>(null);
  const [inkomenNu, setInkomenNu] = useState<Bedrag>(null);
  const [sparenToen, setSparenToen] = useState<Bedrag>(null);
  const [sparenNu, setSparenNu] = useState<Bedrag>(null);

  const compleet = inkomenToen !== null && inkomenNu !== null && sparenToen !== null && sparenNu !== null;
  const erbij = compleet ? (inkomenNu ?? 0) - (inkomenToen ?? 0) : null;
  const meerGespaard = compleet ? (sparenNu ?? 0) - (sparenToen ?? 0) : null;
  const opgegaan = erbij !== null && meerGespaard !== null ? erbij - meerGespaard : null;
  const vanHonderd =
    erbij !== null && erbij > 0 && opgegaan !== null ? Math.max(0, Math.min(100, Math.round((opgegaan / erbij) * 100))) : null;

  let zin = "Vul je netto inkomen en wat je per maand opzij zette in, toen en nu. Drie jaar terug is een goed vergelijkingspunt.";
  if (erbij !== null && erbij <= 0) {
    zin = "Je inkomen is in deze periode niet gestegen. Dan gaat het hier niet over lifestyle inflatie.";
  } else if (vanHonderd !== null && opgegaan !== null) {
    zin = `Van elke 100 euro die erbij kwam, ging er ongeveer ${vanHonderd} op aan de maand. In totaal is dat ${new Intl.NumberFormat("nl-NL").format(opgegaan)} euro per maand.`;
  }

  return (
    <RekenKader
      titel="Waar ging je loonsverhoging heen?"
      uitleg="Vergelijk je netto inkomen en je sparen van een paar jaar terug met nu. Het verschil laat zien welk deel van wat erbij kwam in je maand is opgegaan."
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Bedragveld id="lv-inkomen-toen" label="Netto per maand, toen" waarde={inkomenToen} placeholder="bijv. 4500" onChange={setInkomenToen} />
        <Bedragveld id="lv-inkomen-nu" label="Netto per maand, nu" waarde={inkomenNu} placeholder="bijv. 5300" onChange={setInkomenNu} />
        <Bedragveld id="lv-sparen-toen" label="Opzij per maand, toen" waarde={sparenToen} placeholder="bijv. 300" onChange={setSparenToen} />
        <Bedragveld id="lv-sparen-nu" label="Opzij per maand, nu" waarde={sparenNu} placeholder="bijv. 350" onChange={setSparenNu} />
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Tegel label="Erbij gekomen" bedrag={erbij} />
          <Tegel label="Meer gespaard" bedrag={meerGespaard} />
          <Tegel label="In de maand opgegaan" bedrag={opgegaan !== null && erbij !== null && erbij > 0 ? opgegaan : null} nadruk />
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {zin}
        </p>
        <p className="font-body text-xs mb-3" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. In welke posten dat geld nu zit, laat de gratis analyse zien.
        </p>
        <CtaLink doel="analyse" href={analyseHref()} locatie="rekenaar" className="btn-primary text-center">
          {PRIMAIRE_CTA_LABEL} &rarr;
        </CtaLink>
      </div>
    </RekenKader>
  );
}
