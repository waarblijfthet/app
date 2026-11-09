/**
 * Tests voor lib/bankbestand, met verzonnen testbestanden (geen echte transacties).
 * Er is geen testrunner in deze repo. Zo draai je ze, buiten de repo:
 *   mkdir ~/bbtest && cd ~/bbtest && npm install linkedom
 *   npx --prefix <repo> tsc <repo>/lib/bankbestand/index.ts --outDir ~/bbtest/out --module commonjs --target es2020 --lib es2020,dom --strict --skipLibCheck
 *   cp <repo>/scripts/bankbestand-test.cjs ~/bbtest/test.js && node test.js
 */
const assert = require("assert");
const { DOMParser } = require("linkedom");
const bb = require("./out/index.js");
let ok = 0;
const t = (naam, fn) => { fn(); ok++; console.log("ok  " + naam); };

t("naarCenten", () => {
  const c = bb.naarCenten;
  assert.strictEqual(c("+1.234,56"), 123456);
  assert.strictEqual(c("-12,34"), -1234);
  assert.strictEqual(c("1228.30"), 122830);
  assert.strictEqual(c("-122.40"), -12240);
  assert.strictEqual(c("12,5"), 1250);
  assert.strictEqual(c("1,234.56"), 123456);
  assert.strictEqual(c("1.234"), 123400);
  assert.strictEqual(c("12,34-"), -1234);
  assert.strictEqual(c("€ 3,50"), 350);
  assert.strictEqual(c("abc"), null);
  assert.strictEqual(c(""), null);
});
t("naarIsoDatum", () => {
  assert.strictEqual(bb.naarIsoDatum("2026-11-03"), "2026-11-03");
  assert.strictEqual(bb.naarIsoDatum("20261103"), "2026-11-03");
  assert.strictEqual(bb.naarIsoDatum("3-11-2026"), "2026-11-03");
  assert.strictEqual(bb.naarIsoDatum("03/11/2026"), "2026-11-03");
  assert.strictEqual(bb.naarIsoDatum("2026-13-01"), null);
});

const raboKop = '"IBAN/BBAN","Munt","BIC","Volgnr","Datum","Rentedatum","Bedrag","Saldo na trn","Tegenrekening IBAN/BBAN","Naam tegenpartij","Naam uiteindelijke partij","Naam initiërende partij","BIC tegenpartij","Code","Batch ID","Transactiereferentie","Machtigingskenmerk","Incassant ID","Betalingskenmerk","Omschrijving-1","Omschrijving-2","Omschrijving-3","Reden retour","Oorspr bedrag","Oorspr munt","Koers"';
const raboRij = (volg, datum, bedrag, tegen, naam, code, o1, o2) =>
  ['NL00RABO0123456789','EUR','RABONL2U',volg,datum,datum,bedrag,'1.000,00',tegen,naam,'','','',code,'','','','','',o1,o2||'','','','','',''].map(v => '"' + v + '"').join(",");
const rabo1 = [raboKop,
  raboRij("1001","2026-10-01","-1.250,00","NL00INGB0001234567","Hypotheek BV","ei","Hypotheek","oktober"),
  raboRij("1002","2026-10-02","-3,50","","Bakker Jansen","bc","Betaalautomaat"),
  raboRij("1003","2026-10-02","-3,50","","Bakker Jansen","bc","Betaalautomaat"),
  raboRij("1004","2026-10-24","+4.512,33","NL00ABNA0111222333","Werkgever BV","cb","Salaris"),
  raboRij("1005","kapot","-1,00","","X","bc","x"),
].join("\r\n") + "\r\n";
// Oudere exports zijn Windows-1252: ë als enkele byte 0xEB
const naarLatin1 = (s) => Uint8Array.from(Buffer.from(s, "latin1"));

t("Rabobank CSV in Windows-1252", () => {
  const r = bb.leesBankbestand("rabo.csv", naarLatin1(rabo1));
  assert.strictEqual(r.status, "gelezen");
  assert.strictEqual(r.bank, "rabobank");
  assert.strictEqual(r.transacties.length, 4);
  assert.strictEqual(r.waarschuwingen.length, 1);
  const [h, b1, b2, s] = r.transacties;
  assert.strictEqual(h.bedragCent, -125000);
  assert.strictEqual(h.omschrijving, "Hypotheek oktober");
  assert.strictEqual(h.tegenIban, "NL00INGB0001234567");
  assert.strictEqual(s.bedragCent, 451233);
  assert.notStrictEqual(b1.sleutel, b2.sleutel); // twee keer dezelfde bakker blijft twee keer
});

t("Rabobank CSV in UTF-8 met BOM", () => {
  const r = bb.leesBankbestand("rabo.csv", new TextEncoder().encode("﻿" + rabo1));
  assert.strictEqual(r.status, "gelezen");
  assert.strictEqual(r.transacties.length, 4);
});

const ing = [
  '"Datum";"Naam / Omschrijving";"Rekening";"Tegenrekening";"Code";"Af Bij";"Bedrag (EUR)";"Mutatiesoort";"Mededelingen";"Saldo na mutatie";"Tag"',
  '"20261003";"Albert Heijn 1234";"NL00INGB0009876543";"";"BA";"Af";"87,45";"Betaalautomaat";"Pasvolgnr: 001 03-10-2026 18:12";"1.234,56";""',
  '"20261025";"Werkgever BV";"NL00INGB0009876543";"NL00ABNA0111222333";"OV";"Bij";"3.100,00";"Overschrijving";"Salaris oktober";"4.334,56";""',
].join("\n");
t("ING CSV met puntkomma en Af/Bij", () => {
  const r = bb.leesBankbestand("ing.csv", ing);
  assert.strictEqual(r.status, "gelezen");
  assert.strictEqual(r.bank, "ing");
  assert.deepStrictEqual(r.transacties.map(x => x.bedragCent), [-8745, 310000]);
  assert.strictEqual(r.transacties[0].datum, "2026-10-03");
  assert.strictEqual(r.transacties[0].tegenpartij, "Albert Heijn 1234");
});

const camt = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.08"><BkToCstmrStmt><GrpHdr><MsgId>1</MsgId></GrpHdr>
<Stmt><Id>1</Id><Acct><Id><IBAN>NL00ABNA0123456789</IBAN></Id></Acct>
<Ntry><Amt Ccy="EUR">45.00</Amt><CdtDbtInd>DBIT</CdtDbtInd><BookgDt><Dt>2026-10-05</Dt></BookgDt>
 <AddtlNtryInf>/TRTP/SEPA Incasso algemeen doorlopend/CSID/X/NAME/Ziggo Services BV TV en Internet/MARF/1/REMI/Factuur oktober/IBAN/NL00INGB0005555555</AddtlNtryInf>
 <NtryDtls><TxDtls><RltdPties><Cdtr><Pty><Nm>ZIGGO SERVICES BV TV EN</Nm></Pty></Cdtr><CdtrAcct><Id><IBAN>NL00INGB0005555555</IBAN></Id></CdtrAcct></RltdPties>
 <RmtInf><Ustrd>Factuur oktober</Ustrd></RmtInf></TxDtls></NtryDtls></Ntry>
<Ntry><Amt Ccy="EUR">100.00</Amt><CdtDbtInd>DBIT</CdtDbtInd><BookgDt><DtTm>2026-10-06T10:00:00</DtTm></BookgDt>
 <NtryDtls><TxDtls><Amt Ccy="EUR">60.00</Amt><RltdPties><Cdtr><Nm>Gemeente</Nm></Cdtr></RltdPties></TxDtls>
 <TxDtls><Amt Ccy="EUR">40.00</Amt><RltdPties><Cdtr><Nm>Waterschap</Nm></Cdtr></RltdPties></TxDtls></NtryDtls></Ntry>
<Ntry><Amt Ccy="EUR">2500.00</Amt><CdtDbtInd>CRDT</CdtDbtInd><BookgDt><Dt>2026-10-24</Dt></BookgDt>
 <NtryDtls><TxDtls><RltdPties><Dbtr><Pty><Nm>Werkgever BV</Nm></Pty></Dbtr><DbtrAcct><Id><IBAN>NL00RABO0999999999</IBAN></Id></DbtrAcct></RltdPties>
 <RmtInf><Ustrd>Salaris</Ustrd><Ustrd>oktober</Ustrd></RmtInf></TxDtls></NtryDtls></Ntry>
</Stmt></BkToCstmrStmt></Document>`;
t("CAMT.053 met namespace, batch en afgekapte naam", () => {
  const r = bb.leesBankbestand("afschrift.xml", camt, { xmlParser: new DOMParser() });
  assert.strictEqual(r.status, "gelezen", JSON.stringify(r));
  assert.strictEqual(r.bank, "abnamro");
  assert.deepStrictEqual(r.transacties.map(x => x.bedragCent), [-4500, -6000, -4000, 250000]);
  const z = r.transacties[0];
  assert.strictEqual(z.tegenpartij, "Ziggo Services BV TV en Internet");
  assert.strictEqual(z.tegenIban, "NL00INGB0005555555");
  assert.strictEqual(z.omschrijving, "Factuur oktober");
  assert.strictEqual(r.transacties[1].datum, "2026-10-06");
  assert.strictEqual(r.transacties[3].omschrijving, "Salaris oktober");
  assert.strictEqual(r.transacties[3].eigenIban, "NL00ABNA0123456789");
});

t("Onbekende CSV zonder kopregel (ABN TXT) via kolomkeuze", () => {
  const txt = "123456789\tEUR\t20261001\t1000,00\t955,00\t20261001\t-45,00\tZIGGO SERVICES BV\n123456789\tEUR\t20261002\t955,00\t905,00\t20261002\t-50,00\tJUMBO 123\n";
  const r = bb.leesBankbestand("TXT261101.TAB", txt);
  assert.strictEqual(r.status, "kolommen-kiezen");
  assert.strictEqual(r.heeftKopregel, false);
  assert.strictEqual(r.koppen.length, 8);
  const r2 = bb.leesCsvMetKeuze("TXT261101.TAB", txt, { datum: 2, bedrag: 6, omschrijving: 7 }, false);
  assert.deepStrictEqual(r2.transacties.map(x => x.bedragCent), [-4500, -5000]);
});

t("Onbekende CSV met kopregel krijgt een voorstel", () => {
  const r = bb.leesBankbestand("x.csv", "Datum,Omschrijving,Bedrag\n01-10-2026,Huur,-950.00\n");
  assert.strictEqual(r.status, "kolommen-kiezen");
  assert.deepStrictEqual(r.voorstel, { datum: 0, bedrag: 2, omschrijving: 1 });
});

t("MT940 netjes geweigerd", () => {
  const r = bb.leesBankbestand("a.940", ":20:ABN\n:25:NL00ABNA0123456789\n:61:2610051005D45,00N\n");
  assert.strictEqual(r.status, "niet-ondersteund");
  assert.strictEqual(r.formaat, "mt940");
});

t("Samenvoegen zonder dubbele boekingen", () => {
  const a = bb.leesBankbestand("okt.csv", rabo1).transacties;
  const ook = bb.leesBankbestand("okt-nogmaals.csv", rabo1).transacties;
  const nov = bb.leesBankbestand("nov.csv", [raboKop,
    raboRij("1004","2026-10-24","+4.512,33","NL00ABNA0111222333","Werkgever BV","cb","Salaris"),
    raboRij("1006","2026-11-01","-1.250,00","NL00INGB0001234567","Hypotheek BV","ei","Hypotheek","november")].join("\n")).transacties;
  const alles = bb.voegSamen([a, ook, nov]);
  assert.strictEqual(alles.length, 5);
  assert.strictEqual(alles[alles.length - 1].datum, "2026-11-01");
});
t("Rabobank-pdf: opmaak met kolommen, twee pagina's, legenda", () => {
  const kop = (extra) => [
    { s: "Rabo Standaard", x: 34, y: 84 },
    { s: "Datum vanaf", x: 405, y: 168 }, { s: "01-07-2026", x: 395, y: 180 },
    { s: "IBAN / Rekeningnummer", x: 37, y: 229 },
    { s: "NL00", x: 37, y: 241 }, { s: "RABO 0123 4567 89 EUR", x: 62, y: 241 },
    { s: "Rente", x: 37, y: 259 }, { s: "Type", x: 69, y: 259 }, { s: "Tegenrekening", x: 89, y: 259 },
    { s: "Naam/omschrijving", x: 206, y: 259 }, { s: "Bedrag af (debet)", x: 420, y: 259 },
    { s: "Bedrag bij (credit)", x: 509, y: 259 }, { s: "datum", x: 37, y: 265 },
  ].concat(extra);
  const p1 = { items: kop([
    { s: "01-07", x: 37, y: 291 }, { s: "tb", x: 69, y: 291 }, { s: "NL00 INGB 0001 2345 67", x: 89, y: 291 },
    { s: "2.500,00", x: 530, y: 291 }, { s: "Werkgever BV", x: 206, y: 292 },
    { s: "Salaris juli", x: 206, y: 301 },
    { s: "Verwerkingsdatum:", x: 206, y: 311 }, { s: "01-07-2026", x: 297, y: 311 },
    { s: "02-07", x: 37, y: 328 }, { s: "bc", x: 69, y: 328 }, { s: "Bakker Jansen", x: 206, y: 328 }, { s: "3,50", x: 454, y: 328 },
    { s: "TILBURG, NLD,", x: 206, y: 338 },
  ]) };
  const p2 = { items: kop([
    { s: "Pas: 4xxxx1234", x: 206, y: 291 },
    { s: "Verwerkingsdatum:", x: 206, y: 301 }, { s: "02-07-2026", x: 297, y: 301 },
    { s: "03-07", x: 37, y: 320 }, { s: "ei", x: 69, y: 320 }, { s: "NL00 INGB 0005 5555 55", x: 89, y: 320 },
    { s: "Energie BV", x: 206, y: 320 }, { s: "1.045,00", x: 440, y: 320 },
    { s: "Verwerkingsdatum:", x: 206, y: 330 }, { s: "04-07-2026", x: 297, y: 330 },
    { s: "bc = Betaalautomaat", x: 34, y: 450 }, { s: "ei = Euro-incasso", x: 162, y: 450 },
  ]) };
  const r = bb.leesPdfPaginas("afschrift.pdf", [p1, p2]);
  assert.strictEqual(r.status, "gelezen", JSON.stringify(r));
  assert.strictEqual(r.formaat, "pdf");
  const t = r.transacties;
  assert.deepStrictEqual(t.map(x => x.bedragCent), [250000, -350, -104500]);
  assert.deepStrictEqual(t.map(x => x.datum), ["2026-07-01", "2026-07-02", "2026-07-04"]);
  assert.deepStrictEqual(t.map(x => x.code), ["tb", "bc", "ei"]);
  assert.strictEqual(t[0].eigenIban, "NL00RABO0123456789");
  assert.strictEqual(t[0].tegenIban, "NL00INGB0001234567");
  assert.strictEqual(t[0].tegenpartij, "Werkgever BV");
  assert.strictEqual(t[0].omschrijving, "Salaris juli");
  assert.strictEqual(t[1].tegenIban, null);
  assert.strictEqual(t[1].omschrijving, "TILBURG, NLD, Pas: 4xxxx1234");
});

t("Pdf van een andere bank netjes geweigerd", () => {
  const r = bb.leesPdfPaginas("x.pdf", [{ items: [{ s: "Rekeningoverzicht", x: 30, y: 50 }] }]);
  assert.strictEqual(r.status, "niet-ondersteund");
  assert.strictEqual(r.formaat, "pdf");
});
console.log(ok + " tests geslaagd");
