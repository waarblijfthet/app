/**
 * Proef: voorlopig advies op een samenvatting in _proef/ (staat in .gitignore).
 * Leest ANTHROPIC_API_KEY uit .env.local en print die nooit. Print alleen of het gelukt is,
 * het aantal pogingen, tokens en eventuele regelfouten; het advies zelf gaat naar _proef/.
 *
 * Draaien (vanuit de repo, in je eigen terminal):
 *   npx tsc lib/uitgaven/advies/kern.ts --outDir _proef/out --module commonjs --target es2020 --lib es2020,dom --strict --skipLibCheck
 *   node scripts/proef-voorlopig-advies.cjs _proef/out
 * In de Cowork-omgeving werkt het niet: de proxy daar beantwoordt api.anthropic.com zelf met 401.
 */
const fs = require("fs");
const path = require("path");
const repo = path.resolve(__dirname, "..");
const uit = path.resolve(process.argv[2] || path.join(repo, "_proef", "out"));
const Anthropic = require(require.resolve("@anthropic-ai/sdk", { paths: [repo] }));
const AnthropicKlasse = Anthropic.default || Anthropic;
const { maakVoorlopigAdvies } = require(path.join(uit, "uitgaven", "advies", "kern.js"));

const env = fs.readFileSync(path.join(repo, ".env.local"), "utf8");
const regel = env.split(/\r?\n/).find((r) => r.startsWith("ANTHROPIC_API_KEY="));
if (!regel) throw new Error("ANTHROPIC_API_KEY niet gevonden in .env.local");
const client = new AnthropicKlasse({ apiKey: regel.slice("ANTHROPIC_API_KEY=".length).trim(), maxRetries: 2, timeout: 120000 });

const samenvatting = JSON.parse(fs.readFileSync(path.join(repo, "_proef", "samenvatting.json"), "utf8"));
(async () => {
  const t0 = Date.now();
  const r = await maakVoorlopigAdvies(client, samenvatting);
  const sec = Math.round((Date.now() - t0) / 1000);
  if (!r.ok) {
    console.log("mislukt:", r.reden, "| pogingen:", r.pogingen, "| fouten:", r.fouten);
    return;
  }
  const a = r.advies;
  const md = [
    "# Voorlopig advies (proef)",
    "",
    "_Automatisch opgesteld uit je eigen cijfers. Lees ook `aannames.md`._",
    "",
    "## " + a.kern,
    "",
    "## Wat opvalt",
    "",
    ...a.opvallend.map((o) => "**" + o.titel + "** · " + o.getal + (o.bij ? " " + o.bij : "") + "  \n" + o.uitleg + "\n"),
    "## Wat goed gaat",
    "",
    a.watGoedGaat,
    "",
    "## Wat je vanavond al kunt doen",
    "",
    a.eersteStap,
    "",
    "## Wat je volledige plan voor jullie regelt (Geldscan)",
    "",
    ...a.inHetPlan.map((x) => "- " + x),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(repo, "_proef", "voorlopig-advies.md"), md);
  fs.writeFileSync(path.join(repo, "_proef", "voorlopig-advies.json"), JSON.stringify(r, null, 2));
  console.log("gelukt | pogingen:", r.pogingen, "| tokens in/uit/cache:", r.tokens.invoer, r.tokens.uitvoer, r.tokens.cache, "|", sec, "s");
})().catch((e) => console.log("fout:", e && e.status, e && e.name, (e && e.message || "").replace(/sk-ant-[A-Za-z0-9_-]+/g, "[sleutel]").slice(0, 300)));
