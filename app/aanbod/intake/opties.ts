/**
 * Losgetrokken uit IntakeForm.tsx (dat "use client" is), want page.tsx is een
 * server component en kan geen losse waarde-exports uit een client-module
 * importeren: de RSC-bundler probeert er dan een clientreferentie van te
 * maken en struikelt, want dit zijn geen componenten.
 */

export const SITUATIE_OPTIES = [
  "Alleenstaand, geen kinderen",
  "Alleenstaande ouder",
  "Stel zonder kinderen",
  "Gezin met jonge kinderen (0 tot 8)",
  "Gezin met oudere kinderen (8+)",
];

export const INKOMEN_OPTIES = [
  "Minder dan €3.000",
  "€3.000 tot €4.500",
  "€4.500 tot €6.000",
  "Meer dan €6.000",
];
