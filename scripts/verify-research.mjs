import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
  assert(['non disponibile', 'direzionale', 'verificato'].includes(row.volume_note.toLowerCase()), `keyword row ${index + 2}: metric label invalid`);
  assert(row.source_urls.split(';').every((url) => /^https:\/\//.test(url.trim())), `keyword row ${index + 2}: evidence URL invalid`);
}

console.log(`Research gate passed: ${rows.length} evidence-mapped Italian intents; no invented volume/CPC/difficulty.`);

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
