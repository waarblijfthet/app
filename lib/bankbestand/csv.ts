/** Kleine CSV-lezer volgens RFC 4180, met raden van het scheidingsteken. */

const KANDIDATEN = [";", ",", "\t"];

function telBuitenAanhalingstekens(regel: string, teken: string): number {
  let binnen = false;
  let n = 0;
  for (let i = 0; i < regel.length; i++) {
    const c = regel[i];
    if (c === '"') binnen = !binnen;
    else if (!binnen && c === teken) n++;
  }
  return n;
}

/** Kiest het teken dat in de eerste regels het vaakst en het meest constant voorkomt. */
export function raadScheidingsteken(tekst: string): string {
  const regels = tekst.split(/\r?\n/).filter((r) => r.trim() !== "").slice(0, 6);
  let beste = ",";
  let besteScore = -1;
  for (const teken of KANDIDATEN) {
    const tellingen = regels.map((r) => telBuitenAanhalingstekens(r, teken));
    if (tellingen.length === 0) continue;
    const min = Math.min(...tellingen);
    const gelijk = tellingen.every((t) => t === tellingen[0]);
    const score = min === 0 ? 0 : gelijk ? min * 10 : min;
    if (score > besteScore) {
      besteScore = score;
      beste = teken;
    }
  }
  return beste;
}

/** Leest CSV-tekst naar rijen. Lege regels vallen weg. */
export function leesCsv(tekst: string, teken: string): string[][] {
  const rijen: string[][] = [];
  let rij: string[] = [];
  let veld = "";
  let binnen = false;
  for (let i = 0; i < tekst.length; i++) {
    const c = tekst[i];
    if (binnen) {
      if (c === '"') {
        if (tekst[i + 1] === '"') {
          veld += '"';
          i++;
        } else {
          binnen = false;
        }
      } else {
        veld += c;
      }
    } else if (c === '"') {
      binnen = true;
    } else if (c === teken) {
      rij.push(veld);
      veld = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && tekst[i + 1] === "\n") i++;
      rij.push(veld);
      veld = "";
      if (rij.some((v) => v.trim() !== "")) rijen.push(rij);
      rij = [];
    } else {
      veld += c;
    }
  }
  rij.push(veld);
  if (rij.some((v) => v.trim() !== "")) rijen.push(rij);
  return rijen;
}
