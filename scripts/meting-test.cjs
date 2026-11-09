/**
 * Tests voor de meting van de uitgavenscan (lib/uitgavenscan/meting.ts en verloop.ts). Draaien:
 *   npx --prefix <repo> tsc <repo>/lib/uitgavenscan/meting.ts <repo>/lib/uitgavenscan/verloop.ts --outDir ~/bbtest/out --module commonjs --target es2020 --lib es2020,dom --strict --skipLibCheck
 *   cp <repo>/scripts/meting-test.cjs ~/bbtest/meting-test.js && node ~/bbtest/meting-test.js
 */
const assert = require("assert");
const m = require("./out/meting.js");
const v = require("./out/verloop.js");
let ok = 0;
const t = (naam, fn) => { fn(); ok++; console.log("ok  " + naam); };
const S = "a1b2c3d4-0000-4000-8000-000000000000";

t("meting: alleen vaste keuzes en kleine tellingen", () => {
  assert.ok(m.valideerMeting({ sessie_id: S, scherm: "bank", apparaat: "mobiel", kenmerken: { bank: "rabobank" } }).ok);
  assert.ok(m.valideerMeting({ sessie_id: S, scherm: "gelezen", apparaat: "desktop", kenmerken: { formaat: "pdf", aantalMaanden: 4, aiIndeling: true } }).ok);
  const fout = (x) => assert.strictEqual(m.valideerMeting(x).ok, false);
  fout({ sessie_id: S, scherm: "bestaat_niet" });
  fout({ sessie_id: "x", scherm: "bank" });
  fout({ sessie_id: S, scherm: "bank", kenmerken: { bank: "<script>" } });
  fout({ sessie_id: S, scherm: "bank", kenmerken: { inkomen: 6010 } }); // geen bedragen, onbekend kenmerk
  fout({ sessie_id: S, scherm: "bank", kenmerken: { aantalMaanden: 4.5 } });
  fout({ sessie_id: S, scherm: "bank", kenmerken: { onbekendProcent: 101 } });
  fout({ sessie_id: S, scherm: "bank", extra: 1 });
  assert.strictEqual(m.valideerMeting({ sessie_id: S, scherm: "bank", apparaat: "tv" }).meting.apparaat, "onbekend");
});

t("verloop: trechter, afhaken per scherm, per bank, eigen rondes apart", () => {
  const nu = Date.parse("2026-11-10T12:00:00Z");
  const oud = "2026-11-10T10:00:00Z";
  const tijden = (tot, extra = []) => {
    const o = {};
    m.SCHERMEN.forEach((s, i) => { if (i <= m.schermIndex(tot) && (!s.soms || extra.includes(s.id))) o[s.id] = oud; });
    return o;
  };
  const rij = (id, tot, kenmerken = {}, extra = {}) => ({
    sessie_id: id, created_at: oud, updated_at: oud, huidig_scherm: tot, max_scherm_index: m.schermIndex(tot),
    apparaat: extra.apparaat || "mobiel", eigenaar: extra.eigenaar || false, kenmerken, tijden: tijden(tot, extra.soms || []),
  });
  const rijen = [
    rij("1", "start"),
    rij("2", "downloaden", { bank: "ing", downloadPlek: "app" }),
    rij("3", "downloaden", { bank: "rabobank", leesfout: "wachtwoord" }),
    rij("4", "voorlopig_advies", { bank: "rabobank", adviesStatus: "gemaakt" }, { apparaat: "desktop", soms: ["wat_is_dit"] }),
    rij("5", "aanvraag_verzonden", { bank: "rabobank", adviesStatus: "gemaakt" }, { apparaat: "desktop" }),
    rij("6", "aanvraag_verzonden", { bank: "rabobank" }, { eigenaar: true }),
    { ...rij("7", "inkomen", { bank: "ing" }), updated_at: "2026-11-10T11:50:00Z" }, // nog bezig
  ];
  const r = v.berekenVerloop(rijen, { nu });
  assert.strictEqual(r.aantalEigen, 1);
  assert.deepStrictEqual(r.trechter.map((x) => x.aantal), [6, 5, 3, 2, 2, 1, 1]);
  const scherm = (id) => r.schermen.find((s) => s.id === id);
  assert.strictEqual(scherm("start").afgehaakt, 1);
  assert.strictEqual(scherm("downloaden").afgehaakt, 2);
  assert.strictEqual(scherm("inkomen").afgehaakt, 0); // nog bezig
  assert.strictEqual(scherm("wat_is_dit").gezien, 1); // alleen wie het kreeg
  assert.strictEqual(scherm("aanvraag_verzonden").afgehaakt, 0);
  assert.strictEqual(r.nogBezig, 1);
  const rabo = r.perBank.find((g) => g.sleutel === "rabobank");
  assert.deepStrictEqual([rabo.gestart, rabo.gelezen, rabo.advies, rabo.aanvraag], [3, 2, 2, 1]);
  assert.deepStrictEqual(r.leesfouten, [{ fout: "wachtwoord", aantal: 1 }]);
  assert.strictEqual(r.mediaanMinutenTotAdvies, 0);
  assert.strictEqual(v.berekenVerloop(rijen, { nu, eigenTonen: true }).trechter[0].aantal, 7);
});

console.log(ok + " tests geslaagd");
