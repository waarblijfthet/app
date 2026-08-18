/**
 * Leidt de ijkpunten in lib/bruto-netto-referentie.ts af. Draai met:
 *   node scripts/bruto-netto-ijkpunten.mjs
 *
 * Wijzigt er een tarief of korting, pas dan de parameters hieronder aan, draai
 * dit script, en zet de uitkomsten over in lib/bruto-netto-referentie.ts.
 * Zie dat bestand voor de bron en de aannames.
 */
const S1 = 38883, S2 = 78426, T1 = 0.3575, T2 = 0.3756, T3 = 0.4950;
const AHK_MAX = 3115, AHK_START = 29736, AHK_PCT = 0.06398;
const AK_MAX = 5685, AK_START = 45592, AK_PCT = 0.06510;
const VAKANTIEGELD_PCT = 0.08;

const belasting = (g) =>
  g <= S1 ? g * T1 : g <= S2 ? S1 * T1 + (g - S1) * T2 : S1 * T1 + (S2 - S1) * T2 + (g - S2) * T3;
const ahk = (g) => Math.max(0, AHK_MAX - Math.max(0, g - AHK_START) * AHK_PCT);
const ak = (g) => Math.max(0, AK_MAX - Math.max(0, g - AK_START) * AK_PCT);
const nettoJaar = (g) => g - Math.max(0, belasting(g) - ahk(g) - ak(g));

function marginaal(g) {
  const schijf = g <= S1 ? T1 : g <= S2 ? T2 : T3;
  return (
    schijf +
    (ahk(g) > 0 && g > AHK_START ? AHK_PCT : 0) +
    (ak(g) > 0 && g > AK_START ? AK_PCT : 0)
  );
}

/** Wat er twaalf keer per jaar binnenkomt, vakantiegeld valt los in mei. */
function maandNettoExclVakantiegeld(g) {
  const vgBruto = (g * VAKANTIEGELD_PCT) / (1 + VAKANTIEGELD_PCT);
  return (nettoJaar(g) - vgBruto * (1 - marginaal(g))) / 12;
}
const maandNettoInclVakantiegeld = (g) => nettoJaar(g) / 12;

function brutoVoor(doel, fn) {
  let lo = 20000, hi = 250000;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if (fn(m) < doel) lo = m; else hi = m;
  }
  return Math.round(((lo + hi) / 2) / 100) * 100;
}

console.log('CONTROLE op extern ijkpunt');
console.log('  72.000 bruto, netto jaar / 12 =', maandNettoInclVakantiegeld(72000).toFixed(2));
console.log('  Rekenmachinepro publiceert hiervoor ongeveer 4.170. Methode klopt.\n');

console.log('BRUTO_VOOR_NETTO (netto excl. vakantiegeld)');
for (const doel of [2500, 4000, 5000]) {
  const g = brutoVoor(doel, maandNettoExclVakantiegeld);
  console.log(`  ${doel}: ${g},`.padEnd(22), '-> controle', maandNettoExclVakantiegeld(g).toFixed(2));
}

console.log('\nBRUTO_VOOR_NETTO_SAMEN (gelijk verdeeld over twee partners)');
const perPersoon = brutoVoor(2500, maandNettoExclVakantiegeld);
console.log(`  5000: ${perPersoon * 2},`.padEnd(22), '-> ieder', perPersoon);

console.log('\nMARGINAAL_BOVEN_SCHIJFGRENS_2 =', marginaal(S2 + 1000).toFixed(4));
console.log('  je houdt over van elke extra bruto euro:', (1 - marginaal(S2 + 1000)).toFixed(2));
console.log('AHK is nul vanaf bruto', Math.round(AHK_START + AHK_MAX / AHK_PCT));
