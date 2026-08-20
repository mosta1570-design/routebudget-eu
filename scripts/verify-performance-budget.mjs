import { gzipSync } from 'node:zlib';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ASSETS = path.resolve('dist/assets');
const files = await readdir(ASSETS);

const budgets = {
  javascriptGzip: 90 * 1024,
  cssGzip: 15 * 1024,
  heroWebm: 1.5 * 1024 * 1024,
  heroMp4: 3.1 * 1024 * 1024,
  productProof: 250 * 1024,
};

const byteSize = async (name) => (await stat(path.join(ASSETS, name))).size;
const gzipSize = async (name) => gzipSync(await readFile(path.join(ASSETS, name))).byteLength;
const assertBudget = (label, actual, maximum) => {
  if (actual > maximum) {
    throw new Error(`${label} exceeds budget: ${actual} bytes > ${maximum} bytes`);
  }
};

const scripts = files.filter((name) => name.endsWith('.js'));
const styles = files.filter((name) => name.endsWith('.css'));
const webm = files.filter((name) => /routebudget-hero-.+\.webm$/.test(name));
const mp4 = files.filter((name) => /routebudget-hero-.+\.mp4$/.test(name));
const proofImages = files.filter((name) => /app-(?:scenarios|costs|archive)-.+\.png$/.test(name));

if (scripts.length === 0 || styles.length === 0) throw new Error('Bundled JavaScript and CSS assets are required');
if (webm.length !== 2 || mp4.length !== 2) throw new Error('Expected desktop and mobile hero assets in both WebM and MP4');
if (proofImages.length !== 3) throw new Error('Expected three product proof screenshots');

const javascriptGzip = (await Promise.all(scripts.map(gzipSize))).reduce((sum, size) => sum + size, 0);
const cssGzip = (await Promise.all(styles.map(gzipSize))).reduce((sum, size) => sum + size, 0);

assertBudget('JavaScript gzip total', javascriptGzip, budgets.javascriptGzip);
assertBudget('CSS gzip total', cssGzip, budgets.cssGzip);

for (const name of webm) assertBudget(name, await byteSize(name), budgets.heroWebm);
for (const name of mp4) assertBudget(name, await byteSize(name), budgets.heroMp4);
for (const name of proofImages) assertBudget(name, await byteSize(name), budgets.productProof);

console.log(
  `Performance budgets passed: JS ${javascriptGzip}B gzip, CSS ${cssGzip}B gzip, ${webm.length} WebM, ${mp4.length} MP4, ${proofImages.length} product proofs.`,
);
