/**
 * Twee vragen met één tik op het resultaat (30-okt-2026), zie
 * docs/diagnose-conversie-30-okt-2026.md sectie 8. Niet verplicht, geen
 * e-mailadres. Ze meten wat de bezoeker wil en waarom hij de Geldscan laat
 * liggen. De sleutels zijn vast, zodat de admin kan tellen terwijl de tekst
 * per bezoeker verschilt (jij of jullie).
 */

export type InzichtOptie = { sleutel: string; tekst: string };

/** Stap 1: "Wat zou je nu het meest helpen?" Gebeurtenis analyse_behoefte. */
export function behoefteOpties(meerdere: boolean): InzichtOptie[] {
  return [
    { sleutel: "cijfers", tekst: "Iemand die mijn cijfers bekijkt en zegt waar het zit" },
    { sleutel: "zelf-opzet", tekst: "Een opzet om jaarkosten en buffer zelf te regelen" },
    {
      sleutel: "normaal",
      tekst: meerdere ? "Weten of dit normaal is voor een huishouden als het onze" : "Weten of dit normaal is voor iemand in mijn situatie",
    },
    { sleutel: "keuze", tekst: "Een keuze laten doorrekenen, zoals een ander huis, minder werken of een kind" },
    { sleutel: "niks", tekst: "Niks, ik weet genoeg" },
  ];
}

/** Stap 4: "Wat houdt je tegen?" Gebeurtenis analyse_aanbod_bezwaar. */
export const BEZWAAR_OPTIES: InzichtOptie[] = [
  { sleutel: "te-duur", tekst: "Te duur" },
  { sleutel: "weet-niet", tekst: "Ik weet niet wat ik krijg" },
  { sleutel: "zelf", tekst: "Ik doe het liever zelf" },
  { sleutel: "genoeg", tekst: "Ik had genoeg aan de uitkomst" },
  { sleutel: "geen-tijd", tekst: "Nu geen tijd" },
];

/** Korte labels voor de admin. */
export const BEHOEFTE_LABEL: Record<string, string> = {
  cijfers: "Iemand kijkt mee",
  "zelf-opzet": "Zelf regelen",
  normaal: "Is dit normaal",
  keuze: "Keuze doorrekenen",
  niks: "Niks",
};

export const BEZWAAR_LABEL: Record<string, string> = {
  "te-duur": "Te duur",
  "weet-niet": "Weet niet wat ik krijg",
  zelf: "Liever zelf",
  genoeg: "Genoeg aan de uitkomst",
  "geen-tijd": "Nu geen tijd",
};

/** Waar de Geldscan in beeld kwam. Gebeurtenis analyse_aanbod_gezien, meta.plek. */
export type AanbodPlek = "stap1" | "vraagstap" | "stap4";
