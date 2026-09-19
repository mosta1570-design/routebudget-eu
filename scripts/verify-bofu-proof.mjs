import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { calculateCostPerKm, calculateFuelTrip } from '../public/seo/calculators-core.js';

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

// Shared editorial case: rational oracle in thousandths of a euro, then cents.
// No pricing or calculator behavior change is authorized by these fixtures.
const cases = [
  { empty: 100, consumption: 31, price: 175, milli: 325500n, display: '325,50' },
  { empty: 100, consumption: 31, price: 185, milli: 344100n, display: '344,10' },
  { empty: 100, consumption: 33, price: 175, milli: 346500n, display: '346,50' },
  { empty: 130, consumption: 31, price: 175, milli: 341775n, display: '341,78' },
  { empty: 130, consumption: 33, price: 185, milli: 384615n, display: '384,62' },
];
const fuelPage = await readFile(new URL('../dist/it/calcolatori/costo-carburante-viaggio/index.html', import.meta.url), 'utf8');
for (const sample of cases) {
  const milli = BigInt(500 + sample.empty) * BigInt(sample.consumption) * BigInt(sample.price) / 10n;
  assert.equal(milli, sample.milli);
  const actual = calculateFuelTrip({ distanceKm: 500, emptyReturnKm: sample.empty, fuelConsumption: sample.consumption, fuelPrice: sample.price / 100 });
  assert(Math.abs(actual.totalFuelCost - Number(milli) / 1000) < 1e-8);
  assert(fuelPage.includes(sample.display), `Fuel article missing checked scenario ${sample.display}`);
}
const prudentMilli = cases[4].milli + 128000n + 262500n + 113400n + 126000n;
const roundedCents = (prudentMilli + 5n) / 10n;
assert.equal(roundedCents, 101452n);
assert.equal((prudentMilli - 898500n + 5n) / 10n, 11602n);
assert.equal(100000n - roundedCents, -1452n);
const prudent = calculateCostPerKm({ loadedKm: 500, emptyKm: 130, fuelConsumption: 33, fuelPrice: 1.85, tollCost: 128, operationalHours: 10.5, driverHourlyCost: 25, wearPerKm: 0.18, fixedPerKm: 0.20 });
assert(Math.abs(prudent.totalOperationalCost - Number(prudentMilli) / 1000) < 1e-8);
for (const value of ['384,62', '1.014,52', '14,52', '116,02', 'inventati']) assert(kilometerPage.includes(value), `Kilometer article missing checked scenario ${value}`);
for (const value of ['1.014,52', '14,52', 'non aspettarti', '354,25']) assert(guide.includes(value), `PDF guide missing reconciliation ${value}`);
assert(fuelPage.includes('non un consuntivo reale'));
const css = await readFile(new URL('../public/seo/seo.css', import.meta.url), 'utf8');
assert(/\.seo-prose :not\(pre\) > code\s*\{[^}]*overflow-wrap:\s*anywhere;/s.test(css), 'Inline spreadsheet formulas must wrap; keep preformatted blocks unchanged');
console.log('BOFU proof passed: reviewed PDF bytes, independent arithmetic and shared sensitivity cases, product links and inline-formula wrapping contract.');
