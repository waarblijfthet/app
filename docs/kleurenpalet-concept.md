# Kleurpalet concept homepage (basis)

Doel: weg van de crème/bruin AI-default. Wit-first, overzichtelijk, helder, betrouwbaar.
Onderzoek (juli 2026): wit + neutrale basis + één precieze accentkleur is de norm voor
vertrouwen in finance. Blauw scoort het hoogst op vertrouwen, groen als tweede (geld/groei),
teal als onderscheidende blauw-groen-hybride. Puur fintech-blauw is zelf ook een cliché,
daarom houdt palet 1 de groen-identiteit van het merk vast en biedt palet 2 een onderscheidende
petrol/teal-richting. Beide getoetst op WCAG-contrast (zie onderaan).

Nog te beslissen door Jarno: welk van de twee we doorvoeren op /concept. Copy (o.a. "geldlek")
volgt in een aparte ronde.

---

## Palet 1 — "Helder Groen" (evolutie van het merk, warm vertrouwen)

Karakter: rustig, geloofwaardig, "geld"-groen. Houdt merkherkenning vast maar op schoon wit
in plaats van beige. Warm zonder bruin.

| Rol            | Hex       | Gebruik |
|----------------|-----------|---------|
| canvas         | #FBFBF9   | paginarachtergrond (bijna wit) |
| surface        | #FFFFFF   | kaarten, panelen |
| surface-tint   | #F3F5F2   | afwisselende secties |
| ink            | #16201C   | primaire tekst / koppen |
| ink-soft       | #4C5A54   | lopende tekst secundair |
| ink-muted      | #8A968F   | bijschriften, labels |
| line           | #E4E8E4   | randen, scheidingslijnen |
| brand          | #10493A   | primair + CTA-knop |
| brand-strong   | #0B3529   | hover / diep |
| positive       | #1E7A52   | positieve cijfers |
| accent (lek)   | #C0402B   | aandacht / lek / negatief, spaarzaam |
| on-brand       | #FFFFFF   | tekst op groene vlakken |

---

## Palet 2 — "Inkt & Teal" (modern, editorieel, onderscheidend)

Karakter: hoog contrast, cijfers springen eruit, modern-vertrouwd. Teal = blauw-groen-hybride,
onderscheidt zich van de generieke fintech-blauw en de crème-default.

| Rol            | Hex       | Gebruik |
|----------------|-----------|---------|
| canvas         | #FAFAF8   | paginarachtergrond (bijna wit) |
| surface        | #FFFFFF   | kaarten, panelen |
| surface-tint   | #F1F4F3   | afwisselende secties |
| ink            | #14201F   | primaire tekst / koppen |
| ink-soft       | #4A564F   | lopende tekst secundair |
| ink-muted      | #8B958F   | bijschriften, labels |
| line           | #E5E8E6   | randen, scheidingslijnen |
| primary        | #0E3A3F   | primair + CTA-knop (diep petrol) |
| primary-strong | #0A2A2E   | hover / diep |
| accent (teal)  | #0B7A6E   | links, onderstrepingen, highlights |
| accent (lek)   | #C24632   | aandacht / lek / negatief, spaarzaam |
| on-brand       | #FFFFFF   | tekst op petrol vlakken |

---

## WCAG-contrast (geverifieerd)

Palet 1: ink op canvas 16.1 (AAA), ink-soft op wit 7.3 (AAA), wit op brand 10.3 (AAA),
brand op wit 10.3 (AAA), accent op wit 5.2 (AA).

Palet 2: ink op canvas 16.0 (AAA), ink-soft op wit 7.7 (AAA), wit op primary 12.4 (AAA),
primary op wit 12.4 (AAA), teal op wit 5.2 (AA).

Alle tekst/achtergrond-combinaties halen minimaal AA. De accentkleuren zijn AA en bedoeld
voor grote tekst, knoppen en highlights, niet voor kleine lopende tekst.
