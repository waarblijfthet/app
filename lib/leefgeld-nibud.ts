/**
 * Nibud-richtlijn leefgeld in de schuldhulpverlening, bijgewerkt per juli
 * 2026 (het Nibud werkt hem bij in januari en juli). Overgenomen van
 * NIBUD_LEEFGELD_URL, geopend op 6 november 2026. Bij de update van januari
 * 2027: de tabel opnieuw openen en alle bedragen hieronder vervangen.
 */
export const NIBUD_LEEFGELD_URL =
  "https://www.nibud.nl/onderwerpen/geldproblemen/leefgeld-in-de-schuldhulpverlening/";
export const NIBUD_LEEFGELD_PEILDATUM = "juli 2026";
export const NIBUD_LEEFGELD_GEOPEND = "6 november 2026";

export interface LeefgeldHuishouden {
  huishouden: string;
  perMaand: number;
  perWeek: number;
  voeding: number;
}

export const NIBUD_LEEFGELD: LeefgeldHuishouden[] = [
  { huishouden: "Alleenstaande", perMaand: 394, perWeek: 91, voeding: 273 },
  { huishouden: "Stel zonder kinderen", perMaand: 703, perWeek: 162, voeding: 495 },
  { huishouden: "Eenoudergezin, 1 kind (8 jaar)", perMaand: 568, perWeek: 131, voeding: 381 },
  { huishouden: "Eenoudergezin, 2 kinderen (8 en 13 jaar)", perMaand: 774, perWeek: 178, voeding: 507 },
  { huishouden: "Stel, 1 kind (8 jaar)", perMaand: 807, perWeek: 186, voeding: 534 },
  { huishouden: "Stel, 2 kinderen (8 en 13 jaar)", perMaand: 988, perWeek: 227, voeding: 634 },
  { huishouden: "Stel, 3 kinderen (11, 13 en 15 jaar)", perMaand: 1259, perWeek: 290, voeding: 823 },
];

export function leefgeldVoor(huishouden: string): LeefgeldHuishouden {
  const r = NIBUD_LEEFGELD.find((h) => h.huishouden === huishouden);
  if (!r) throw new Error("Onbekend huishouden: " + huishouden);
  return r;
}
