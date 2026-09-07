import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../public/downloads/routebudget-preventivo-demo.pdf', import.meta.url));
const built = await readFile(new URL('../dist/downloads/routebudget-preventivo-demo.pdf', import.meta.url));
assert.equal(source.subarray(0, 5).toString(), '%PDF-');
assert.equal(createHash('sha256').update(source).digest('hex'), '3d3d23a94002976254870cbfa08afcadef24cb334c4cd037b845c1de3c0e05a9', 'Reviewed PDF changed; regenerate, inspect and review the artifact before changing this pin');
assert.deepEqual(built, source, 'Published PDF must equal reviewed source');
assert(source.length < 110_000, 'Demo PDF exceeds its documented size budget');

// Independent integer/rational oracle, not a copy of the app implementation.
const fuel = 240n * 30n * 170n / 100n;
const wage = 240n * 2400n / 72n;
const wear = 240n * 15n;
const total = fuel + wage + wear + 4500n;
const recommended = total * 100n / 80n;
const ideal = (recommended * 110n + 99n) / 100n;
assert.deepEqual([fuel, wage, wear, total, recommended, ideal, recommended - total], [12240n, 8000n, 3600n, 28340n, 35425n, 38968n, 7085n]);
const guide = await readFile(new URL('../dist/it/guide/preventivo-trasporto-pdf/index.html', import.meta.url), 'utf8');
for (const value of ['122,40', '80,00', '36,00', '283,40', '354,25', '389,68', '70,85']) assert(guide.includes(value), `Missing checked amount ${value}`);
for (const disclosure of ['DEMO', 'non sono un percorso verificato', 'non è', 'stampa desktop', '14 giorni']) assert(guide.includes(disclosure), `Missing demo disclosure ${disclosure}`);
assert(guide.includes('href="/downloads/routebudget-preventivo-demo.pdf"'));
assert(guide.includes('href="/it/app-per-autotrasportatori/"'));
const offerCents = 500n * 200n;
const remainderCents = offerCents - 89850n;
assert.equal(remainderCents, 10150n);
assert.equal(remainderCents * 10000n / offerCents, 1015n);
const kilometerPage = await readFile(new URL('../dist/it/calcolatori/costo-chilometrico-camion/index.html', import.meta.url), 'utf8');
for (const value of ['101,50', '10,15%', 'i 100 km vuoti non sono venduti']) assert(kilometerPage.includes(value), `Missing checked offer statement ${value}`);
const css = await readFile(new URL('../public/seo/seo.css', import.meta.url), 'utf8');
assert(/\.seo-prose :not\(pre\) > code\s*\{[^}]*overflow-wrap:\s*anywhere;/s.test(css), 'Inline spreadsheet formulas must wrap; keep preformatted blocks unchanged');
console.log('BOFU proof passed: reviewed PDF bytes, nine independent arithmetic checks, product links and inline-formula wrapping contract.');
