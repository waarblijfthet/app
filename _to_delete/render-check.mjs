import ts from 'typescript';
import fs from 'fs';
import path from 'path';
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const src = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.Preserve } }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod.exports);
  const req = (spec) => {
    let p = spec.startsWith('@/') ? spec.replace('@/', './') : spec;
    if (!p.startsWith('.')) return {};
    let f = path.resolve(path.dirname(file), p);
    for (const ext of ['.ts', '.tsx', '/index.ts']) if (fs.existsSync(f + ext)) { f = f + ext; break; }
    return load(f);
  };
  new Function('require', 'module', 'exports', js)(req, mod, mod.exports);
  cache.set(file, mod.exports);
  return mod.exports;
}
const ref = load('./lib/bruto-netto-referentie.ts');
console.log('IJKPUNTEN:', JSON.stringify(ref.BRUTO_VOOR_NETTO), 'samen', JSON.stringify(ref.BRUTO_VOOR_NETTO_SAMEN), 'meerkosten', ref.EENVERDIENER_MEERKOSTEN_5000);
const data = load('./lib/inzichten-data.ts');
const a = data.artikelen.find(x => x.slug === 'is-5000-euro-netto-goed-salaris');
const b = data.artikelen.find(x => x.slug === 'is-4000-euro-netto-goed-salaris-nederland');
const c = data.artikelen.find(x => x.slug === 'waarom-lukt-sparen-niet');
const d = data.artikelen.find(x => x.slug === 'hoeveel-geld-overhouden-einde-maand');
console.log('\n--- is-5000 excerpt ---\n' + a.excerpt);
for (const f of a.faq) if (/bruto/i.test(f.antwoord)) console.log('\n--- is-5000 FAQ: ' + f.vraag + ' ---\n' + f.antwoord);
for (const f of b.faq) if (/bruto|omslagpunt|rond €/i.test(f.antwoord)) console.log('\n--- 4000 FAQ: ' + f.vraag + ' ---\n' + f.antwoord);
for (const f of c.faq) if (/sparen|niets/i.test(f.vraag)) console.log('\n--- sparen FAQ: ' + f.vraag + ' ---\n' + f.antwoord);
for (const f of d.faq) if (/spaargeld/i.test(f.vraag)) console.log('\n--- spaargeld FAQ: ' + f.vraag + ' ---\n' + f.antwoord);
