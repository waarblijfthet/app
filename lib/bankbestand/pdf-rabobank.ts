/**
 * Rabobank-pdf met transacties ("Rekeningafschrift", te downloaden in de Rabo App en in Rabo Online Bankieren;
 * in de app is pdf de enige keuze, gecontroleerd door Jarno op 9 nov 2026).
 * Leest tekst met posities, niet de opmaak: kolommen worden per pagina bepaald uit de kopteksten,
 * zodat een kleine verschuiving in de opmaak niets breekt.
 *
 * Getest op 9 nov 2026 tegen de CSV van dezelfde periode (145 pagina's, twee rekeningen):
 * 1.303 van 1.303 boekingen met dezelfde datum, hetzelfde bedrag en dezelfde rekening, som per rekening gelijk,
 * code en tegen-IBAN 100 procent gelijk. Naam tegenpartij 97 procent gelijk; de rest is een naam die in de pdf
 * over twee regels loopt (de pdf geeft dan alleen de eerste regel) of een kasboeking (kh). De omschrijving
 * in de pdf bevat die van de CSV plus extra regels (machtiging, kenmerk).
 */
import type { RuweTransactie } from "./profielen";
import { naarCenten, naarIsoDatum, normaliseerIban, schoon } from "./waarden";

/** Eén stuk tekst op een pdf-pagina; y gemeten vanaf de bovenkant. */
export type PdfTekst = { s: string; x: number; y: number };
export type PdfPagina = { items: PdfTekst[] };

const BEDRAG = /^\d{1,3}(\.\d{3})*,\d{2}$/;
const DAGMAAND = /^\d{2}-\d{2}$/;
const LEGENDA = /^\S{1,3} = /;

type Kolommen = { kopY: number; type: number; tegen: number; omschrijving: number; af: number; bij: number };

function zoek(items: PdfTekst[], tekst: string): PdfTekst | undefined {
  return items.find((i) => i.s.trim() === tekst);
}

function kolommen(items: PdfTekst[]): Kolommen | null {
  const type = zoek(items, "Type");
  const tegen = zoek(items, "Tegenrekening");
  const oms = zoek(items, "Naam/omschrijving");
  const af = zoek(items, "Bedrag af (debet)");
  const bij = zoek(items, "Bedrag bij (credit)");
  if (!type || !tegen || !oms || !af || !bij) return null;
  return { kopY: oms.y, type: type.x, tegen: tegen.x, omschrijving: oms.x, af: af.x, bij: bij.x };
}

export function isRabobankPdf(paginas: PdfPagina[]): boolean {
  const eerste = paginas[0];
  if (!eerste) return false;
  const tekst = eerste.items.map((i) => i.s).join(" ");
  return kolommen(eerste.items) !== null && /RABO/.test(tekst) && /Rabo/.test(tekst);
}

/** IBAN van de rekening uit de kop van de pagina (regel onder "IBAN / Rekeningnummer"). */
function rekeningVan(items: PdfTekst[], k: Kolommen): string | null {
  const label = zoek(items, "IBAN / Rekeningnummer");
  if (!label) return null;
  const regel = items
    .filter((i) => i.y > label.y + 2 && i.y < label.y + 20 && i.x < k.tegen + 150)
    .sort((a, b) => a.x - b.x)
    .map((i) => i.s)
    .join(" ")
    .replace(/\bEUR\b/, "");
  const m = /[A-Z]{2}\d{2}[A-Z0-9 ]{10,32}/.exec(regel);
  return m ? normaliseerIban(m[0]) : null;
}

function regels(items: PdfTekst[]): PdfTekst[][] {
  const gesorteerd = items.slice().sort((a, b) => a.y - b.y || a.x - b.x);
  const uit: PdfTekst[][] = [];
  let huidigY = -100;
  gesorteerd.forEach((i) => {
    if (Math.abs(i.y - huidigY) <= 2.5 && uit.length > 0) {
      uit[uit.length - 1].push(i);
    } else {
      uit.push([i]);
      huidigY = i.y;
    }
  });
  return uit.map((r) => r.sort((a, b) => a.x - b.x));
}

type InWording = {
  rentedatum: string;
  verwerkingsdatum: string | null;
  code: string;
  tegen: string;
  bedragCent: number | null;
  tekstregels: string[];
  eigenIban: string | null;
};

export function leesRabobankPdf(paginas: PdfPagina[]): RuweTransactie[] {
  const klaar: InWording[] = [];
  let huidig: InWording | null = null;
  let jaar = "";

  paginas.forEach((pagina) => {
    const k = kolommen(pagina.items);
    if (!k) return;
    const iban = rekeningVan(pagina.items, k);
    const vanaf = pagina.items.find((i) => /^\d{2}-\d{2}-\d{4}$/.test(i.s.trim()));
    if (vanaf && !jaar) jaar = vanaf.s.trim().slice(6);
    const bedragGrens = (k.af + k.bij) / 2 + 10;
    const data = pagina.items.filter((i) => i.y > k.kopY + 8 && i.s.trim() !== "" && !LEGENDA.test(i.s.trim()));

    regels(data).forEach((regel) => {
      const eerste = regel[0];
      const isStart = eerste.x < k.type - 5 && DAGMAAND.test(eerste.s.trim());
      if (isStart) {
        if (huidig) klaar.push(huidig);
        huidig = {
          rentedatum: eerste.s.trim(),
          verwerkingsdatum: null,
          code: "",
          tegen: "",
          bedragCent: null,
          tekstregels: [],
          eigenIban: iban,
        };
      }
      // Regels boven de eerste boeking van een pagina horen bij de laatste boeking van de vorige pagina.
      if (!huidig) return;
      const tx: InWording = huidig;
      const tekst: string[] = [];
      regel.forEach((i, n) => {
        const s = i.s.trim();
        if (isStart && n === 0) return;
        if (i.x > k.af - 40 && BEDRAG.test(s)) {
          const c = naarCenten(s);
          if (c !== null) tx.bedragCent = i.x >= bedragGrens ? c : -c;
        } else if (i.x < k.tegen - 5) {
          if (isStart && i.x >= k.type - 5) tx.code = s;
        } else if (i.x < k.omschrijving - 5) {
          tx.tegen = schoon(tx.tegen + " " + s);
        } else {
          tekst.push(s);
        }
      });
      const zin = schoon(tekst.join(" "));
      const vd = /^Verwerkingsdatum:\s*(\d{2}-\d{2}-\d{4})/.exec(zin);
      if (vd) tx.verwerkingsdatum = vd[1];
      else if (zin) tx.tekstregels.push(zin);
    });
  });
  if (huidig) klaar.push(huidig);

  const uit: RuweTransactie[] = [];
  klaar.forEach((t) => {
    const datum =
      naarIsoDatum(t.verwerkingsdatum || "") || (jaar ? naarIsoDatum(t.rentedatum + "-" + jaar) : null);
    if (!datum || t.bedragCent === null) return;
    uit.push({
      datum: datum,
      bedragCent: t.bedragCent,
      eigenIban: t.eigenIban,
      tegenIban: normaliseerIban(t.tegen),
      tegenpartij: t.tekstregels[0] || "",
      omschrijving: schoon(t.tekstregels.slice(1).join(" ")),
      code: t.code || null,
    });
  });
  return uit;
}
