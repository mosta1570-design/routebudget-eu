import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(ROOT, 'docs');
const keywordResearch = await readFile(path.join(docs, 'SEO_KEYWORD_RESEARCH_IT.md'), 'utf8');
const serpResearch = await readFile(path.join(docs, 'SEO_SERP_RESEARCH_IT.md'), 'utf8');
const csv = await readFile(path.join(docs, 'SEO_KEYWORD_MAP_IT.csv'), 'utf8');
const round9Demand = JSON.parse(await readFile(path.join(docs, 'SEO_DEMAND_EVIDENCE_ROUND_9_2026-08-20.json'), 'utf8'));
const round10Demand = JSON.parse(await readFile(path.join(docs, 'SEO_DEMAND_EVIDENCE_ROUND_10_2026-08-21.json'), 'utf8'));
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
  assert(['non disponibile', 'direzionale', 'verificato'].includes(row.volume_note.toLowerCase()), `keyword row ${index + 2}: metric label invalid`);
  assert(row.source_urls.split(';').every((url) => /^https:\/\//.test(url.trim())), `keyword row ${index + 2}: evidence URL invalid`);
}

assert.equal(round9Demand.schemaVersion, 1, 'Round 9 demand evidence schemaVersion mismatch');
assert.equal(round9Demand.locale, 'it', 'Round 9 demand evidence must use Italian language');
assert.equal(round9Demand.market, 'IT', 'Round 9 demand evidence must use Italian market');
assert.match(round9Demand.provider, /Google Suggest/i, 'Round 9 demand evidence provider mismatch');
assert.match(round9Demand.capturedAt, /^2026-08-20$/, 'Round 9 demand evidence capture date mismatch');
assert(Array.isArray(round9Demand.candidates) && round9Demand.candidates.length === 3, 'Round 9 demand evidence must contain three selected candidates');
for (const candidate of round9Demand.candidates) {
  assert(candidate.primaryKeyword && candidate.canonical, 'Round 9 candidate identity missing');
  assert.equal(candidate.signal, 'directional', `${candidate.primaryKeyword}: demand signal must stay directional`);
  assert.equal(candidate.volume, null, `${candidate.primaryKeyword}: unverified volume must stay null`);
  assert.equal(candidate.exactSuggestionReturned, true, `${candidate.primaryKeyword}: exact Suggest evidence missing`);
  assert(/^https:\/\/suggestqueries\.google\.com\//.test(candidate.requestUrl), `${candidate.primaryKeyword}: Google Suggest request URL invalid`);
  assert(candidate.requestUrl.includes('hl=it') && candidate.requestUrl.includes('gl=it'), `${candidate.primaryKeyword}: Italian Suggest parameters missing`);
  assert(Array.isArray(candidate.returnedSuggestions) && candidate.returnedSuggestions.length > 0, `${candidate.primaryKeyword}: returned suggestions missing`);
  assert(
    candidate.returnedSuggestions.some((suggestion) => suggestion.toLocaleLowerCase('it') === candidate.query.toLocaleLowerCase('it')),
    `${candidate.primaryKeyword}: exact query not present in captured suggestions`,
  );
  assert.equal(
    rows.filter((row) => row.target_url === candidate.canonical && row.primary_keyword === candidate.primaryKeyword).length,
    1,
    `${candidate.primaryKeyword}: demand evidence must map to exactly one keyword row`,
  );
}

assert.equal(round10Demand.schemaVersion, 1, 'Round 10 demand evidence schemaVersion mismatch');
assert.equal(round10Demand.locale, 'it', 'Round 10 demand evidence must use Italian language');
assert.equal(round10Demand.market, 'IT', 'Round 10 demand evidence must use Italian market');
assert.match(round10Demand.capturedAt, /^2026-08-21$/, 'Round 10 demand evidence capture date mismatch');
assert(Array.isArray(round10Demand.providers) && round10Demand.providers.length >= 2, 'Round 10 demand evidence providers missing');
assert(Array.isArray(round10Demand.candidates) && round10Demand.candidates.length === 3, 'Round 10 demand evidence must contain three selected candidates');
for (const candidate of round10Demand.candidates) {
  assert(candidate.primaryKeyword && candidate.canonical, 'Round 10 candidate identity missing');
  assert.equal(candidate.volume, null, `${candidate.primaryKeyword}: unverified volume must stay null`);
  assert(['directional', 'directional-serp-and-official-change'].includes(candidate.signal), `${candidate.primaryKeyword}: unsupported demand signal`);
  assert(/^https:\/\/suggestqueries\.google\.com\//.test(candidate.requestUrl), `${candidate.primaryKeyword}: Google Suggest request URL invalid`);
  assert(candidate.requestUrl.includes('hl=it') && candidate.requestUrl.includes('gl=it'), `${candidate.primaryKeyword}: Italian Suggest parameters missing`);
  if (candidate.exactSuggestionReturned === true) {
    assert(Array.isArray(candidate.returnedSuggestions) && candidate.returnedSuggestions.length > 0, `${candidate.primaryKeyword}: returned suggestions missing`);
    assert(
      candidate.returnedSuggestions.some((suggestion) => suggestion.toLocaleLowerCase('it') === candidate.query.toLocaleLowerCase('it')),
      `${candidate.primaryKeyword}: exact query not present in captured suggestions`,
    );
    assert.equal(candidate.signal, 'directional', `${candidate.primaryKeyword}: exact Suggest signal mismatch`);
  } else {
    assert.equal(candidate.exactSuggestionReturned, null, `${candidate.primaryKeyword}: unsupported exact Suggest state`);
    assert.equal(candidate.signal, 'directional-serp-and-official-change', `${candidate.primaryKeyword}: fallback signal mismatch`);
    assert(candidate.signalNote, `${candidate.primaryKeyword}: fallback evidence note missing`);
  }
  assert.equal(
    rows.filter((row) => row.target_url === candidate.canonical && row.primary_keyword === candidate.primaryKeyword).length,
    1,
    `${candidate.primaryKeyword}: demand evidence must map to exactly one keyword row`,
  );
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
    (row) => row.target_url === page.canonical && row.primary_keyword === page.primaryKeyword,
  );
  assert.equal(
    exactRows.length,
    1,
    `${page.id}: keyword map must contain exactly one row matching canonical and primaryKeyword`,
  );
}

console.log(`Research gate passed: ${rows.length} evidence-mapped Italian intents cover ${publishedPages.length} published pages; Round 9–10 demand evidence is captured and no volume/CPC/difficulty is invented.`);

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
