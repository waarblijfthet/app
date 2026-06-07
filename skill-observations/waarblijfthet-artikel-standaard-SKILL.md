# Waar blijft het — Artikel Standaard (Interne Skill)

**Type:** Intern
**Doel:** Elke nieuw artikel voor waarblijfthet.nl voldoet direct aan de UX-, ICP- en SEO-standaard die in sessie juni 2026 is vastgesteld. Gebruik deze skill bij het schrijven of reviewen van artikelen.

---

## Wie het leest (ICP)

**Kern-ICP:** Stellen/gezinnen met €4.000–€8.000 netto, goed opgeleid, druk leven. Ze verdienen goed maar houden weinig over, weten niet goed waarom, voelen een vaag schuldgevoel over geld. Lezen op telefoon, vaak onderweg of 's avonds. Scannen eerst, lezen pas als het hen raakt.

**Wat ze zoeken:** Eerlijkheid, herkenning, concrete getallen. Geen moraliserend advies. Geen producten. Ze willen begrijpen, niet worden opgeleid.

**Wat ze vermijden:** Lange lappen tekst zonder structuur, abstracte tips, banktaal, schuldgevoel-inducerende toon.

---

## Structuur van elk artikel

### 1. Disclaimer (indien van toepassing)
Amber box bovenaan als het een echte case betreft:
```tsx
<div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
  <p className="font-body text-sm" style={{ color: "#92600A" }}>
    <strong>Echte case.</strong> Naam en details aangepast voor privacy. [Relevante caveat voor dit artikel].
  </p>
</div>
```

### 2. ScanBox (altijd aanwezig)
Groen blok met 3 concrete takeaways. Staat vóór de openingsparagraaf (of direct na disclaimer). Mobielvriendelijk voor scanners.
```tsx
<div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
  <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
  <ul className="space-y-1.5">
    {["Takeaway 1 — concreet en specifiek", "Takeaway 2", "Takeaway 3"].map((item, i) => (
      <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
        <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>
```

**Regels voor de takeaways:**
- Concreet: noem bedragen, percentages of namen als die er zijn
- Niet "wat financiële onafhankelijkheid is" maar "waarom FIRE voor gezinnen niet werkt — en wat wel"
- Derde takeaway = altijd de case: "Hoe [naam] [concreet resultaat] bereikte"

### 3. Openingsparagraaf (de haak)
**Opties (in volgorde van effectiviteit):**

A. Begin bij de case-persoon: "Thomas wilde op zijn 53e stoppen met werken. De berekening: €1.740.000 nodig. Dat werd de dag dat hij zijn doel herdefinieerde."

B. Begin bij het pijnpunt + verrassing: "Je werkt vier dagen, verdient een fatsoenlijk salaris, en toch loopt het geld op. Hoe? Omdat een groot deel van je tweede inkomen direct opgaat aan kosten die dat inkomen met zich meebrengt."

C. Begin bij de tegenstelling: "De meeste mensen die goed verdienen denken: het pensioen regelt zich wel. Dat klopt — totdat je er écht naar kijkt."

**Nooit beginnen met:** "Een gezamenlijke rekening klinkt logisch als je samenwoont." (te passief) | "Financieel onafhankelijk worden betekent niet..." (defensief, begint negatief) | Algemene stelling zonder haak.

Stijl: `fontWeight: 400, fontSize: "1.05rem", color: "#1C3A2A"` (donkerder dan bodytekst, als lead-in)

### 4. Uitlegblokken (h2 secties)
- Korte inleidende paragraaf
- Daarna concrete details, bedragen, percentages
- Gebruik bold voor sleutelgetallen: `<strong>2,56%</strong>`
- Vermijd: "simpelweg", "eigenlijk", "uiteindelijk", "vrijwel direct" (AI-taalmarkers)
- Vermijd passieve constructies: niet "wordt er veel over gesproken" maar "mensen praten er veel over"

### 5. InzichtCallout (1–2 per artikel)
Amber callout voor een kernfeit dat mensen anders missen. Niet voor disclaimers — die zijn oranje. Dit is geel, voor inzicht.
```tsx
<div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
  <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>
    [Kort label, bijv. "Jobswitch-effect" of "Box 3 belasting"]
  </p>
  <p className="font-body text-sm" style={{ color: "#5C3D1E" }}>
    [1–3 zinnen. Concreet, verrassend of onbekend bij de lezer.]
  </p>
</div>
```

### 6. Case-sectie
- Altijd een echte situatie (geanonimiseerd)
- Formaat: [Naam] ([leeftijd]), [inkomensschets]. [Wat ze dachten/deden]. [Wat ze ontdekten]. [Wat ze veranderden].
- Altijd gevolgd door VoorNa-tabel (zie hieronder)
- De case staat NIET aan het begin van het artikel — eerst de context, dan de case

### 7. VoorNa-tabel
```tsx
function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#1C3A2A" }}>
        {["", "Voor", "Na"].map((h, i) => (
          <div key={i} className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F5F0E8" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 ? "#FDFAF4" : "white" }}>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#1C3A2A", fontWeight: 500 }}>{r[0]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#B03A2E" }}>{r[1]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#2D6A4F", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}
```

### 8. Interactief element (altijd aanwezig)
Elk artikel heeft minimaal één interactief element. Dit maakt de site onderscheidend en verhoogt tijd-op-pagina.

**Vormen (kies de meest relevante):**
- **Rekentool**: invoer van eigen getallen → direct resultaat (bijv. rente-vergelijker, netto-opbrengst calculator)
- **Scenario-checker**: slider of dropdowns die een scenario doorrekenen
- **Zelf-check**: visueel overzicht van niveaus/situaties op basis van invoer

**Technisch:** 
- Altijd `'use client';` bovenaan het bestand
- `import { useState } from "react";`
- Invoervelden: `type="text" inputMode="numeric"` (niet `type="number"` — geeft betere UX op mobiel)
- Formaat bedragen: `.toLocaleString("nl-NL")` voor Nederlandse notatie
- Resultaat tonen: alleen als invoer compleet is (`heeftResultaat` boolean)
- Kleur resultaat: groen (#2D6A4F / #E8F2EC) = goed/positief, rood (#B03A2E / #FEF2F2) = aandacht nodig

**Stijl rekentool container:**
```tsx
<div className="rounded-xl border my-8" style={{ backgroundColor: "#FDFAF4", borderColor: "#E8E0D4" }}>
  <div className="px-5 py-4 border-b" style={{ borderColor: "#E8E0D4" }}>
    <p className="font-body font-semibold text-sm" style={{ color: "#1C3A2A" }}>Titel tool</p>
    <p className="font-body text-xs mt-0.5" style={{ color: "#8A9E8E" }}>Subtitel / instructie</p>
  </div>
  <div className="p-5 space-y-4">
    {/* inputs */}
    {heeftResultaat && (/* resultaat */)}
  </div>
</div>
```

**Input stijl:**
```tsx
const inputStyle = {
  padding: "9px 13px", borderRadius: "10px", border: "1.5px solid #D6CEBC",
  fontFamily: "inherit", fontSize: "0.875rem", color: "#1C3A2A",
  backgroundColor: "white", outline: "none", width: "100%",
} as const;
```

**Grid invoervelden:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* of sm:grid-cols-3 voor 3 velden */}
</div>
```

### 9. Interne links
Elke artikel linkt naar 2–4 andere artikelen op waarblijfthet.nl. Linkstijl:
```tsx
<Link href="/inzichten/[slug]" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">
  [beschrijvende ankertekst]
</Link>
```

Plaatsing: in de lopende tekst, niet als losse lijst onderaan.

### 10. CTA-afsluiting (altijd twee opties)
```tsx
<p className="font-body text-text-soft" style={p}>
  Wil je weten [specifiek wat dit artikel beloofde]?{" "}
  <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">
    Doe de gratis analyse
  </Link>{" "}
  — [specifieke belofte, bijv. "dan zie je in 15 minuten hoeveel het tweede inkomen jou netto oplevert"]. Of [actie] in een{" "}
  <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">
    eenmalig adviesgesprek van €125
  </Link>.
</p>
```

**Regels:**
- "gratis analyse" altijd eerste optie
- "eenmalig adviesgesprek van €125" altijd tweede optie
- Nooit "Tikkie", nooit "btw" vermelden (KOR)
- De zin na "gratis analyse" is specifiek voor dit artikel — niet generiek

---

## SEO-regels

### metaTitel
- Max 60 tekens (inclusief " | Waar blijft het" suffix = max ~43 tekens voor de eigenlijke titel)
- Bevat het primaire zoekwoord aan het begin
- Stelling of vraag: "Studieschuld aflossen of sparen: wat is slimmer?" werkt beter dan "Over studieschuld en sparen"

### metaDescription
- Max 155 tekens
- Bevat: pijnpunt + concrete belofte + (optioneel) casenaam met bedrag
- Voorbeeldstructuur: "[Pijnpunt of vraag]? [Wat je leert] — [case met concreet resultaat]."

### Interne link-structuur
- Link naar gerelateerde artikelen op basis van lezersreis: wie dit leest, leest daarna waarschijnlijk ook...
- Gebruik beschrijvende ankertekst (niet "klik hier" of "lees meer")

---

## Verbodslijst (taalgebruik)

Nooit gebruiken:
- "simpelweg" → weglaten of "gewoon"
- "eigenlijk" als stopwoord → weglaten
- "vrijwel direct" (2× in zelfde artikel = te veel) → "al snel" of herformuleren
- "uiteindelijk" als filler → weglaten
- Passieve openingszin → begin actief of bij een persoon
- "In dit artikel leggen we uit..." → direct beginnen
- Em-dashes (—) in bodytekst → gebruik komma, punt of dubbele punt

---

## Technische structuur

### Bestandslocatie
`app/inzichten/[slug]/content/[slug].tsx`

### Verplichte imports voor interactief artikel
```tsx
'use client';
import { useState } from "react";
import Link from "next/link";
```

### Style constanten (altijd bovenaan)
```tsx
const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
```

### Openingsparagraaf stijl
```tsx
<p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
```

### VoorNa hoort bij de case, niet bovenaan

### Mobiel-first controlelijst
Vóór opslaan, check:
- [ ] VoorNa-tabel: 3 kolommen op 360px — zijn de labels kort genoeg?
- [ ] Rekentool: `grid-cols-1 sm:grid-cols-2` — nooit alleen `grid-cols-2`
- [ ] Invoervelden: `width: "100%"` in inputStyle
- [ ] Resultaatblok: geen horizontale overflow (geen vaste breedte zonder `max-w`)
- [ ] `'use client'` aanwezig als useState gebruikt wordt

---

## Checklist voor elk nieuw artikel

Vóór opslaan:

- [ ] `'use client'` aanwezig (als er useState in zit)
- [ ] Disclaimer-box aanwezig (als echte case)
- [ ] ScanBox aanwezig met 3 concrete takeaways
- [ ] Openingsparagraaf begint actief (niet passief/defensief)
- [ ] VoorNa-tabel aanwezig bij elke case
- [ ] InzichtCallout aanwezig (min. 1)
- [ ] Interactief element aanwezig
- [ ] Geen AI-taalmarkers (simpelweg, eigenlijk, vrijwel direct als herhaling)
- [ ] CTA-afsluiting: gratis analyse + adviesgesprek €125
- [ ] metaTitel ≤ 60 tekens
- [ ] metaDescription ≤ 155 tekens met concreet bedrag of resultaat
- [ ] Interne links: 2–4, in de tekst verweven
- [ ] Mobiel getest (ScanBox, rekentool, VoorNa)

---

## Kleurpalet (ter referentie)

| Naam | Hex | Gebruik |
|------|-----|---------|
| primary | #1C3A2A | Koppen, borders, achtergrond header |
| accent | #C4603A | Links, CTA, checkmarks |
| background | #F5F0E8 | Paginaachtergrond |
| card | #FDFAF4 | Kaarten, rekentool achtergrond |
| green-light | #E8F2EC | ScanBox, positief resultaat |
| green-dark | #2D6A4F | Positief getal, "Na" kolom |
| red | #B03A2E | Negatief getal, "Voor" kolom |
| amber-bg | #FEF9EC | InzichtCallout achtergrond |
| amber-border | #E8C870 | InzichtCallout border |
| text-soft | #4A5E4E | Bodytekst |
| text-muted | #8A9E8E | Subtitels, labels, hints |
