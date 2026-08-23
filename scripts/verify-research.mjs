import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(ROOT, 'docs');
const keywordResearch = await readFile(path.join(docs, 'SEO_KEYWORD_RESEARCH_IT.md'), 'utf8');
const serpResearch = await readFile(path.join(docs, 'SEO_SERP_RESEARCH_IT.md'), 'utf8');
const csv = await readFile(path.join(docs, 'SEO_KEYWORD_MAP_IT.csv'), 'utf8');
const config = JSON.parse(await readFile(path.join(ROOT, 'content/site.json'), 'utf8'));
const productionPrefix = `${config.basePath}/`;
const localePrefixes = Object.keys(config.locales).map((locale) => `${productionPrefix}${locale}/`);

for (const [name, value] of [['keyword research', keywordResearch], ['SERP research', serpResearch]]) {
  assert(value.includes('1 agosto 2026'), `${name}: research date missing`);
  assert(/non disponibil/i.test(value), `${name}: unavailable metrics must be labelled`);
  assert(/https:\/\//.test(value), `${name}: evidence URLs missing`);
  assert(!/(?:volume mensile|CPC|keyword difficulty)\s*[:=]\s*\d/i.test(value), `${name}: invented metric detected`);
}

const rows = parseCsv(csv);
assert(rows.length >= 15, 'keyword map needs at least 15 mapped intents');
for (const field of ['primary_keyword', 'search_intent', 'target_url', 'serp_evidence', 'volume_note', 'source_urls', 'anti_cannibalization_note']) {
  assert(Object.hasOwn(rows[0], field), `keyword map missing column: ${field}`);
}
for (const [index, row] of rows.entries()) {
  assert(row.primary_keyword, `keyword row ${index + 2}: query missing`);
  assert(
    row.target_url === productionPrefix || localePrefixes.some((prefix) => row.target_url.startsWith(prefix)),
    `keyword row ${index + 2}: production target URL required`,
  );
  assert(['non disponibile', 'direzionale', 'verificato'].includes(row.volume_note.toLocaleLowerCase('it')), `keyword row ${index + 2}: metric label invalid`);
  assert(row.source_urls.split(';').map((url) => url.trim()).filter(Boolean).every((url) => /^https:\/\//.test(url)), `keyword row ${index + 2}: evidence URL invalid`);
  assert(row.anti_cannibalization_note.trim().length >= 30, `keyword row ${index + 2}: anti-cannibalization decision too short`);
}

const evidenceFiles = (await readdir(docs, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /^SEO_DEMAND_EVIDENCE_[A-Z0-9_-]+\.json$/.test(entry.name))
  .map((entry) => entry.name)
  .sort();
assert(evidenceFiles.length > 0, 'no dynamic demand-evidence files found');

const evidenceIds = new Set();
let evidenceCandidates = 0;
for (const file of evidenceFiles) {
  const demand = JSON.parse(await readFile(path.join(docs, file), 'utf8'));
  assert.equal(demand.schemaVersion, 1, `${file}: schemaVersion mismatch`);
  assert.equal(demand.locale, 'it', `${file}: language must be Italian`);
  assert.equal(demand.market, 'IT', `${file}: market must be Italy`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(demand.capturedAt ?? ''), `${file}: capturedAt invalid`);
  assert(Array.isArray(demand.candidates) && demand.candidates.length > 0, `${file}: candidates missing`);
  assert([demand.provider, ...(demand.providers ?? [])].filter(Boolean).length > 0, `${file}: provider missing`);
  assert(
    ['monthly_search_volume', 'cpc', 'keyword_difficulty'].every((metric) => demand.method?.unavailableMetrics?.includes(metric)),
    `${file}: unavailable metrics policy incomplete`,
  );

  for (const candidate of demand.candidates) {
    evidenceCandidates += 1;
    assert(/^demand:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.id ?? ''), `${file}: candidate id invalid`);
    assert(!evidenceIds.has(candidate.id), `${file}: duplicate demand id ${candidate.id}`);
    evidenceIds.add(candidate.id);
    assert(candidate.primaryKeyword && candidate.canonical && candidate.query, `${candidate.id}: identity missing`);
    assert(/^\/it\/.+\/$/.test(candidate.canonical), `${candidate.id}: Italian canonical required`);
    assert(['publish', 'update', 'merge', 'reject'].includes(candidate.decision), `${candidate.id}: decision invalid`);
    assert.equal(candidate.volume, null, `${candidate.id}: unverified volume must remain null`);
    assert(typeof candidate.signal === 'string' && candidate.signal.trim(), `${candidate.id}: signal missing`);

    if (candidate.requestUrl?.startsWith('https://suggestqueries.google.com/')) {
      const request = new URL(candidate.requestUrl);
      assert.equal(request.searchParams.get('hl'), 'it', `${candidate.id}: Suggest hl must be it`);
      assert.equal(request.searchParams.get('gl'), 'it', `${candidate.id}: Suggest gl must be IT`);
    }
    if (candidate.exactSuggestionReturned === true) {
      assert(Array.isArray(candidate.returnedSuggestions) && candidate.returnedSuggestions.length > 0, `${candidate.id}: returnedSuggestions missing`);
      assert(
        candidate.returnedSuggestions.some((suggestion) => normalize(suggestion) === normalize(candidate.query)),
        `${candidate.id}: exact query is absent from captured suggestions`,
      );
    } else if (candidate.exactSuggestionReturned === false || candidate.exactSuggestionReturned === null) {
      assert(typeof candidate.signalNote === 'string' && candidate.signalNote.trim().length >= 20, `${candidate.id}: non-exact evidence needs an explicit signalNote`);
    }
    if (Array.isArray(candidate.sourceUrls)) {
      assert(candidate.sourceUrls.every((url) => /^https:\/\//.test(url)), `${candidate.id}: evidence URLs must use HTTPS`);
    }

    if (['publish', 'update'].includes(candidate.decision)) {
      const matches = rows.filter(
        (row) => row.target_url === candidate.canonical
          && normalize(row.primary_keyword) === normalize(candidate.primaryKeyword),
      );
      assert.equal(matches.length, 1, `${candidate.id}: evidence must map to one canonical/primary keyword row`);
    }
  }
}

const publishedPages = [];
for (const section of ['guide', 'calcolatori', 'confronti', 'landing']) {
  const directory = path.join(ROOT, 'content', 'it', section);
  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') continue;
    throw error;
  }
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const meta = JSON.parse(await readFile(path.join(directory, entry.name, 'meta.json'), 'utf8'));
    if (meta.status === 'published' && meta.noindex === false) {
      publishedPages.push({ id: `${section}/${entry.name}`, canonical: meta.canonical, primaryKeyword: meta.primaryKeyword });
    }
  }
}

for (const page of publishedPages) {
  const exactRows = rows.filter(
    (row) => row.target_url === page.canonical && normalize(row.primary_keyword) === normalize(page.primaryKeyword),
  );
  assert.equal(exactRows.length, 1, `${page.id}: keyword map must contain exactly one canonical/primaryKeyword owner`);
}

console.log(
  `Research gate passed: ${rows.length} Italian keyword intents cover ${publishedPages.length} published pages; `
  + `${evidenceCandidates} candidates loaded dynamically from ${evidenceFiles.length} evidence files with no invented volume/CPC/difficulty.`,
);

function normalize(value) {
  return String(value).normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase('it').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function parseCsv(value) {
  const lines = value.trim().split(/\r?\n/);
  const headers = parseLine(lines.shift());
  return lines.map((line) => Object.fromEntries(headers.map((header, index) => [header, parseLine(line)[index] ?? ''])));
}

function parseLine(line) {
  const cells = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') quoted = !quoted;
    else if (character === ',' && !quoted) {
      cells.push(current);
      current = '';
    } else current += character;
  }
  cells.push(current);
  return cells;
}
