/** Bedragen en datums uit Nederlandse bankbestanden omzetten. */

/**
 * Zet een bedrag om naar centen. Werkt met "+1.234,56", "-12,34", "1228.30", "12,5", "1,234.56" en "12,34-".
 * Eén scheidingsteken met precies drie cijfers erna ("1.234") geldt als duizendtal.
 */
export function naarCenten(ruw: string): number | null {
  let s = (ruw || "").trim().replace(/\s/g, "").replace(/€|EUR/gi, "");
  if (!s) return null;
  let teken = 1;
  if (s.startsWith("-")) {
    teken = -1;
    s = s.slice(1);
  } else if (s.startsWith("+")) {
    s = s.slice(1);
  }
  if (s.endsWith("-")) {
    teken = -1;
    s = s.slice(0, -1);
  }
  const komma = s.lastIndexOf(",");
  const punt = s.lastIndexOf(".");
  const sep = Math.max(komma, punt);
  let geheel = s;
  let deel = "";
  if (sep !== -1) {
    const naSep = s.slice(sep + 1);
    const beide = komma !== -1 && punt !== -1;
    const eenmalig = s.indexOf(s[sep]) === sep;
    if (!beide && eenmalig && naSep.length === 3) {
      geheel = s.replace(/[.,]/g, "");
    } else {
      geheel = s.slice(0, sep).replace(/[.,]/g, "");
      deel = naSep;
    }
  }
  if (geheel === "") geheel = "0";
  if (!/^\d+$/.test(geheel) || !/^\d{0,2}$/.test(deel)) return null;
  const centen = parseInt(geheel, 10) * 100 + parseInt((deel + "00").slice(0, 2), 10);
  return centen === 0 ? 0 : teken * centen;
}

function tweeCijfers(n: string): string {
  return n.length === 1 ? "0" + n : n;
}

function geldig(j: string, m: string, d: string): string | null {
  const mi = parseInt(m, 10);
  const di = parseInt(d, 10);
  if (mi < 1 || mi > 12 || di < 1 || di > 31) return null;
  return j + "-" + tweeCijfers(m) + "-" + tweeCijfers(d);
}

/** Zet "2026-11-03", "20261103", "03-11-2026" of "3/11/2026" om naar JJJJ-MM-DD. */
export function naarIsoDatum(ruw: string): string | null {
  const s = (ruw || "").trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return geldig(m[1], m[2], m[3]);
  m = /^(\d{4})(\d{2})(\d{2})$/.exec(s);
  if (m) return geldig(m[1], m[2], m[3]);
  m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(s);
  if (m) return geldig(m[3], m[2], m[1]);
  return null;
}

/** IBAN zonder spaties in hoofdletters, of null als het veld leeg is. */
export function normaliseerIban(ruw: string | null | undefined): string | null {
  const s = (ruw || "").replace(/\s/g, "").toUpperCase();
  return s ? s : null;
}

/** Witruimte samenvoegen; banken breken omschrijvingen op vaste lengtes af. */
export function schoon(ruw: string | null | undefined): string {
  return (ruw || "").replace(/\s+/g, " ").trim();
}
