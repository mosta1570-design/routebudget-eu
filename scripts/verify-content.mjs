import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const schema = JSON.parse(await readFile(path.join(CONTENT, 'meta.schema.json'), 'utf8'));
const config = JSON.parse(await readFile(path.join(CONTENT, 'site.json'), 'utf8'));
const expected = config.expectedPublished;
const required = new Set(schema.required);
const allowedFields = new Set(Object.keys(schema.properties));
for (const field of ['status', 'author', 'reviewer', 'primaryKeyword', 'secondaryKeywords', 'cluster', 'relatedCalculator', 'appFeature', 'canonical', 'ogImage', 'noindex', 'sources', 'changeSummary']) {
  assert(required.has(field), `meta schema missing required field: ${field}`);
}

const counts = { pillar: 0, guide: 0, calculator: 0, landing: 0 };
const publishedPages = [];
let published = 0;
for (const section of ['guide', 'calcolatori', 'confronti', 'landing']) {
  const directory = path.join(CONTENT, 'it', section);
  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') continue;
    throw error;
  }
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const meta = JSON.parse(await readFile(path.join(directory, entry.name, 'meta.json'), 'utf8'));
    for (const field of required) assert(Object.hasOwn(meta, field), `${section}/${entry.name}: schema field ${field} missing`);
    for (const field of Object.keys(meta)) assert(allowedFields.has(field), `${section}/${entry.name}: unsupported schema field ${field}`);
    if (meta.status === 'published' && meta.noindex === false) {
      published += 1;
      counts[meta.kind] += 1;
      publishedPages.push({
        id: `${section}/${entry.name}`,
        kind: meta.kind,
        canonical: meta.canonical,
        body: await readFile(path.join(directory, entry.name, 'body.md'), 'utf8'),
      });
    }
  }
}

assert(expected && typeof expected === 'object', 'site.json: expectedPublished inventory is required');
for (const kind of Object.keys(counts)) {
  assert(Number.isInteger(expected[kind]) && expected[kind] >= 0, `site.json: invalid expectedPublished.${kind}`);
  assert.equal(counts[kind], expected[kind], `published ${kind} inventory differs from site.json`);
}

for (const guide of publishedPages.filter((page) => page.kind === 'guide')) {
  const contextualSources = publishedPages.filter(
    (page) => page.id !== guide.id && page.body.includes(`](${guide.canonical})`),
  );
  assert(
    contextualSources.length >= 2,
    `${guide.id}: needs contextual inbound links from at least two other published content pages`,
  );
}

const temporaryOutput = await mkdtemp(path.join(os.tmpdir(), 'routebudget-seo-content-'));
try {
  const result = spawnSync(process.execPath, [path.join(ROOT, 'scripts/build-content.mjs'), '--out', temporaryOutput], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `strict content build failed:\n${result.stderr || result.stdout}`);
} finally {
  await rm(temporaryOutput, { recursive: true, force: true });
}

console.log(`Content schema passed: ${published} published pages (${counts.pillar} pillars, ${counts.guide} supports, ${counts.calculator} calculators, ${counts.landing} app landing); every support guide has at least two contextual inbound sources.`);
