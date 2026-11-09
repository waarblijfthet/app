/**
 * Proef met echte antwoorden in plaats van aannames. Twee rondes, alles lokaal in _proef/ (gitignored):
 *   1. node scripts/proef-keuzes.cjs _proef/<jouw-export>.csv
 *      Maakt _proef/keuzes.json met de vragen uit de wizard: eigen rekeningen, inkomen, onbekende posten.
 *   2. Vul keuzes.json in (true/false bij eigen en inkomen, een categorie bij onbekend), draai opnieuw.
 *      Dan wordt _proef/samenvatting.json gemaakt. Nieuwe onbekende posten worden aan keuzes.json toegevoegd.
 *   Daarna: node scripts/proef-voorlopig-advies.cjs
 * Met --ai als tweede argument laat het script onbekende bedrijfsnamen (alleen pin, iDEAL, incasso)
 * eerst door Claude indelen (bron "ai"); daarvoor is ANTHROPIC_API_KEY in .env.local nodig.
 * Vooraf compileren:
 *   npx tsc lib/uitgaven/index.ts lib/bankbestand/index.ts lib/uitgaven/advies/kern.ts lib/uitgaven/advies/indelen-ai.ts --outDir _proef/out --module commonjs --target es2020 --lib es2020,dom --strict --skipLibCheck
 */
const fs = require("fs");
const path = require("path");
const repo = path.resolve(__dirname, "..");
const out = path.join(repo, "_proef", "out");
const bb = require(path.join(out, "bankbestand", "index.js"));
const u = require(path.join(out, "uitgaven", "index.js"));
const bestand = path.resolve(process.argv[2] || "");
if (!process.argv[2] || !fs.existsSync(bestand)) throw new Error("Geef het pad naar je CSV-export mee, bijvoorbeeld _proef/export.csv");
const r = bb.leesBankbestand(path.basename(bestand), new Uint8Array(fs.readFileSync(bestand)));
if (r.status !== "gelezen") throw new Error("Bestand niet gelezen: " + r.status);
const t = r.transacties;
const maanden = u.volledigeMaanden(t).length;
const keuzesPad = path.join(repo, "_proef", "keuzes.json");
const euro = (c) => Math.round(c / 100);

let k = fs.existsSync(keuzesPad) ? JSON.parse(fs.readFileSync(keuzesPad, "utf8")) : null;
if (!k) {
  k = {
    uitleg: "Zet 'eigen' op true voor rekeningen van jullie zelf of je partner, 'inkomen' op true voor inkomen, en kies bij 'onbekend' een categorie uit 'categorieen' (of laat null).",
    categorieen: Object.keys(u.CATEGORIEEN),
    eigenRekeningen: [],
    inkomen: [],
    onbekend: [],
  };
}
const bekendeRekeningen = new Set(k.eigenRekeningen.map((x) => x.iban));
const volMaanden = new Set(u.volledigeMaanden(t));
const tVol = t.filter((x) => volMaanden.has(x.datum.slice(0, 7)));
u.rekeningKandidaten(tVol, 12).forEach((x) => {
  if (bekendeRekeningen.has(x.iban)) return;
  k.eigenRekeningen.push({ iban: x.iban, naam: x.label, keer: x.aantal, heenEuro: euro(x.heenCent), terugEuro: euro(x.terugCent),
    waarom: x.reden === "naam" ? "zelfde achternaam" : x.reden === "omschrijving" ? "spaarwoord in omschrijving" : null,
    eigen: x.waarschijnlijkEigen ? true : null });
});
const eigen = k.eigenRekeningen.filter((x) => x.eigen === true).map((x) => x.iban);
const alleEigen = new Set([...u.eigenIbansUitBestanden(t), ...eigen]);
const ik = u.inkomenKandidaten(tVol, alleEigen, maanden);
const bekendInkomen = new Map(k.inkomen.map((x) => [x.sleutel, x]));
k.inkomen = ik.map((x) => bekendInkomen.get(x.sleutel) || { sleutel: x.sleutel, naam: x.label, soort: x.soort, perMaandEuro: euro(x.gemiddeldPerMaandCent), inkomen: x.voorgesteld });
const categorieKeuzes = Object.fromEntries(k.onbekend.filter((x) => x.categorie).map((x) => [x.groep, x.categorie]));
k.afwijkingen = k.afwijkingen || [];
const afwijkingKeuzes = Object.fromEntries(k.afwijkingen.filter((x) => x.gekozen).map((x) => [x.sleutel, x.gekozen]));
const keuzes = { eigenIbans: eigen, inkomenSleutels: k.inkomen.filter((x) => x.inkomen === true).map((x) => x.sleutel), categorieKeuzes: categorieKeuzes, afwijkingen: afwijkingKeuzes };
(async () => {
let o = u.maakOverzicht(t, keuzes);
if (process.argv[3] === "--ai") {
  const namen = u.onbekendeBedrijfsnamen(o);
  if (namen.length) {
    const env = fs.readFileSync(path.join(repo, ".env.local"), "utf8").split(/\r?\n/).find((r) => r.startsWith("ANTHROPIC_API_KEY="));
    if (!env) throw new Error("ANTHROPIC_API_KEY niet gevonden in .env.local");
    const A = require(require.resolve("@anthropic-ai/sdk", { paths: [repo] }));
    const client = new (A.default || A)({ apiKey: env.slice(18).trim(), maxRetries: 2, timeout: 120000 });
    const { deelNamenInMetAI, bewaakIndeling } = require(path.join(out, "uitgaven", "advies", "indelen-ai.js"));
    const r = await deelNamenInMetAI(client, namen.map((x) => x.naam));
    if (!r.ok) console.log("AI-indeling mislukt:", r.reden);
    else {
      let n = 0;
      let teruggezet = 0;
      namen.forEach((x, i) => {
        const cat = bewaakIndeling(r.categorieen[i], x.gemiddeldCent);
        if (r.categorieen[i] && !cat) teruggezet++;
        if (!cat) return;
        k.onbekend = k.onbekend.filter((y) => y.groep !== x.groep);
        k.onbekend.push({ groep: x.groep, naam: x.naam, categorie: cat, bron: "ai" });
        categorieKeuzes[x.groep] = cat;
        n++;
      });
      console.log("AI heeft", n, "van", namen.length, "bedrijfsnamen ingedeeld" + (teruggezet ? "; " + teruggezet + " teruggezet als vraag (bedrag past niet bij de categorie)" : ""));
      o = u.maakOverzicht(t, keuzes);
    }
  }
}
const bekend = new Set(k.onbekend.map((x) => x.groep));
u.vragenOverOnbekend(o, 20, 0.95).forEach((x) => {
  if (!bekend.has(x.groep)) k.onbekend.push({ groep: x.groep, naam: x.label, keer: x.aantal, totaalEuro: euro(x.totaalCent), bedrijf: x.isBedrijf, categorie: null });
});
const bekendeAfwijkingen = new Set(k.afwijkingen.map((x) => x.sleutel));
u.groteAfwijkingen(o, 10).forEach((x) => {
  if (!bekendeAfwijkingen.has(x.sleutel)) k.afwijkingen.push({ sleutel: x.sleutel, wat: x.label, maand: x.maand, euro: euro(x.bedragCent), nu: x.aard || "niet maandelijks", voorstel: x.voorstel, gekozen: null });
});
k.uitleg = "Zet 'eigen' op true voor rekeningen van jullie zelf of je partner, 'inkomen' op true voor inkomen, kies bij 'onbekend' een categorie uit 'categorieen' (of laat null), en zet bij 'afwijkingen' 'gekozen' op \"aflossing\", \"eenmalig\" of \"jaarlijks\".";
fs.writeFileSync(keuzesPad, JSON.stringify(k, null, 2));
const s = u.maakSamenvatting(o);
s.kwaliteit && fs.writeFileSync(path.join(repo, "_proef", "samenvatting.json"), JSON.stringify(s, null, 2));
const open = k.eigenRekeningen.filter((x) => x.eigen === null).length + k.onbekend.filter((x) => !x.categorie).length + k.afwijkingen.filter((x) => !x.gekozen).length;
console.log("samenvatting gemaakt | onbekend:", s.kwaliteit.aandeelOnbekend + "% van de uitgaven | nog open vragen in keuzes.json:", open);
})().catch((e) => console.log("fout:", e && e.status, (e && e.message || "").replace(/sk-ant-[A-Za-z0-9_-]+/g, "[sleutel]").slice(0, 300)));
