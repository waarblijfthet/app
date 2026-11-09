/**
 * CAMT.053 (ISO 20022 rekeningafschrift, XML). Werkt voor elke versie (.001.02 t/m .001.08 en verder),
 * omdat elementen op hun lokale naam gezocht worden en niet op namespace.
 */
import type { RuweTransactie } from "./profielen";
import { naarCenten, naarIsoDatum, normaliseerIban, schoon } from "./waarden";

export type XmlParser = { parseFromString(tekst: string, type: string): Document };

function naam(el: Element): string {
  return (el.localName || el.nodeName).replace(/^.*:/, "");
}

function kinderen(el: Element | null, n: string): Element[] {
  if (!el) return [];
  const uit: Element[] = [];
  for (let i = 0; i < el.children.length; i++) {
    const c = el.children[i];
    if (naam(c) === n) uit.push(c);
  }
  return uit;
}

function kind(el: Element | null, ...pad: string[]): Element | null {
  let huidig: Element | null = el;
  for (const n of pad) {
    if (!huidig) return null;
    huidig = kinderen(huidig, n)[0] || null;
  }
  return huidig;
}

function tekst(el: Element | null): string {
  return el && el.textContent ? el.textContent.trim() : "";
}

function alleOnder(el: Element, n: string): Element[] {
  const uit: Element[] = [];
  const zoek = (e: Element) => {
    for (let i = 0; i < e.children.length; i++) {
      const c = e.children[i];
      if (naam(c) === n) uit.push(c);
      else zoek(c);
    }
  };
  zoek(el);
  return uit;
}

/** ABN AMRO kapt <Nm> af op 24 tekens; de volledige naam staat in AddtlNtryInf als /NAME/.../ */
function naamUitExtraInfo(info: string): string {
  const m = /\/NAME\/([^/]+)/.exec(info);
  return m ? schoon(m[1]) : "";
}

function partij(tx: Element | null, isAf: boolean): { naam: string; iban: string | null } {
  const rol = isAf ? "Cdtr" : "Dbtr";
  const partijen = kind(tx, "RltdPties");
  const p = kind(partijen, rol);
  const nm = tekst(kind(p, "Nm")) || tekst(kind(p, "Pty", "Nm"));
  const iban = normaliseerIban(tekst(kind(partijen, rol + "Acct", "Id", "IBAN")));
  return { naam: schoon(nm), iban: iban };
}

function omschrijvingVan(tx: Element | null): string {
  const rmt = kind(tx, "RmtInf");
  const ongestructureerd = kinderen(rmt, "Ustrd").map(tekst).join(" ");
  const kenmerk = tekst(kind(rmt, "Strd", "CdtrRefInf", "Ref"));
  return schoon(ongestructureerd || kenmerk);
}

function bedragVanTx(tx: Element): number | null {
  const amt = kind(tx, "Amt") || kind(tx, "AmtDtls", "TxAmt", "Amt");
  return amt ? naarCenten(tekst(amt)) : null;
}

export function leesCamt053(xml: string, parser: XmlParser): { iban: string | null; transacties: RuweTransactie[] }[] {
  const doc = parser.parseFromString(xml, "application/xml");
  const wortel = doc.documentElement;
  if (!wortel || alleOnder(wortel, "parsererror").length > 0 || naam(wortel) === "parsererror") {
    throw new Error("Het XML-bestand is niet leesbaar.");
  }
  const afschriften = alleOnder(wortel, "Stmt");
  return afschriften.map((stmt) => {
    const iban = normaliseerIban(tekst(kind(stmt, "Acct", "Id", "IBAN")));
    const transacties: RuweTransactie[] = [];
    kinderen(stmt, "Ntry").forEach((ntry) => {
      const isAf = tekst(kind(ntry, "CdtDbtInd")) === "DBIT";
      const datum =
        naarIsoDatum(tekst(kind(ntry, "BookgDt", "Dt"))) ||
        naarIsoDatum(tekst(kind(ntry, "BookgDt", "DtTm")).slice(0, 10)) ||
        naarIsoDatum(tekst(kind(ntry, "ValDt", "Dt")));
      const totaal = naarCenten(tekst(kind(ntry, "Amt")));
      if (!datum || totaal === null) return;
      const info = tekst(kind(ntry, "AddtlNtryInf"));
      const code = tekst(kind(ntry, "BkTxCd", "Prtry", "Cd")) || null;
      const details = kinderen(ntry, "NtryDtls").flatMap((d) => kinderen(d, "TxDtls"));
      const teken = isAf ? -1 : 1;

      const maak = (tx: Element | null, centen: number): RuweTransactie => {
        const p = partij(tx, isAf);
        const lang = naamUitExtraInfo(info);
        const naamDef = lang.length > p.naam.length ? lang : p.naam;
        return {
          datum: datum,
          bedragCent: teken * Math.abs(centen),
          eigenIban: iban,
          tegenIban: p.iban,
          tegenpartij: naamDef,
          omschrijving: omschrijvingVan(tx) || schoon(info),
          code: code,
        };
      };

      const bedragen = details.map(bedragVanTx);
      if (details.length > 1 && bedragen.every((b) => b !== null)) {
        details.forEach((tx, i) => transacties.push(maak(tx, bedragen[i] as number)));
      } else {
        transacties.push(maak(details[0] || null, totaal));
      }
    });
    return { iban: iban, transacties: transacties };
  });
}
