import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));
if (!args.input) {
  console.error('Usage: npm run seo:gsc-analyze -- --input export.csv [--previous previous.csv] [--out report.md]');
  process.exitCode = 1;
} else {
  const current = await loadExport(args.input);
  const previous = args.previous ? await loadExport(args.previous) : [];
  const report = renderReport(current, previous, args.input, args.previous);
  if (args.out) {
    await writeFile(path.resolve(args.out), report, 'utf8');
    console.log(`Search Console analysis written to ${path.resolve(args.out)}`);
  } else process.stdout.write(report);
}

async function loadExport(file) {
  const rows = parseCsv(await readFile(path.resolve(file), 'utf8'));
  assert(rows.length > 0, `${file}: no data rows`);
  return rows.map((row, index) => {
    const normalized = Object.fromEntries(Object.entries(row).map(([key, value]) => [normalizeHeader(key), value.trim()]));
    const query = normalized.query || normalized.topqueries || '';
    const page = normalized.page || normalized.toppages || '';
    assert(query || page, `${file}:${index + 2}: query or page required`);
    return {
      query,
      page,
      country: normalized.country || '',
      device: normalized.device || '',
      dateRange: normalized.daterange || '',
      clicks: numberValue(normalized.clicks),
      impressions: numberValue(normalized.impressions),
      ctr: percentValue(normalized.ctr),
      position: numberValue(normalized.position || normalized.averageposition),
    };
  });
}

function renderReport(current, previous, currentFile, previousFile) {
  const impressionMedian = median(current.map((row) => row.impressions));
  const ctrMedian = median(current.map((row) => row.ctr));
  const highImpressionLowCtr = current
    .filter((row) => row.impressions >= impressionMedian && row.ctr < ctrMedian)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);
  const positions = current.filter((row) => row.position >= 5 && row.position <= 20).sort((a, b) => a.position - b.position).slice(0, 25);
  const branded = current.filter((row) => /route\s*budget/i.test(row.query));
  const nonBranded = current.filter((row) => row.query && !/route\s*budget/i.test(row.query));
  const previousQueries = new Set(previous.map((row) => row.query).filter(Boolean));
  const newQueries = previous.length ? current.filter((row) => row.query && !previousQueries.has(row.query)).sort((a, b) => b.impressions - a.impressions).slice(0, 25) : [];
  const cannibalization = findCannibalization(current);
  const losses = previous.length ? findPageLosses(current, previous) : [];

  return `# RouteBudget EU — Analisi export Google Search Console

Input corrente: \`${path.basename(currentFile)}\`${previousFile ? `  \nConfronto precedente: \`${path.basename(previousFile)}\`` : ''}

Questo report usa solo righe esportate. Nessuna API, credenziale o dato viene inviato in rete. Soglie CTR/impression sono mediane relative al file, non benchmark universali.

## Sintesi

- Righe analizzate: ${current.length}
- Query branded: ${branded.length}
- Query non branded: ${nonBranded.length}
- Opportunità posizione 5–20: ${positions.length}
- Possibili cannibalizzazioni query→più pagine: ${cannibalization.length}
- Pagine con calo rispetto al file precedente: ${losses.length}${previous.length ? '' : ' (confronto non fornito)'}

## Impression elevate e CTR sotto la mediana del file

${table(highImpressionLowCtr)}

## Posizioni medie 5–20

${table(positions)}

## Nuove query rispetto al periodo precedente

${previous.length ? table(newQueries) : '_Fornire `--previous` per questa analisi._'}

## Possibile cannibalizzazione

${cannibalization.length ? cannibalization.map((item) => `- **${escapeMarkdown(item.query)}** → ${item.pages.map((page) => `\`${page}\``).join(', ')}`).join('\n') : '_Nessuna query associata a più pagine nel file._'}

## Pagine in perdita

${previous.length ? (losses.length ? losses.map((item) => `- \`${item.page}\`: impression ${item.previous} → ${item.current}`).join('\n') : '_Nessun calo osservato nelle righe confrontabili._') : '_Fornire `--previous` per questa analisi._'}

## Regole decisionali

1. Verificare intento e snippet prima di cambiare title.
2. Non reagire a poche impression isolate.
3. Espandere contenuto solo quando query pertinente mostra lacuna reale.
4. Fondere pagine solo dopo conferma di sovrapposizione stabile.
5. Non includere dati personali o input operativi nei report editoriali.
`;
}

function findCannibalization(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!row.query || !row.page || row.impressions <= 0) continue;
    const pages = map.get(row.query) ?? new Set();
    pages.add(row.page);
    map.set(row.query, pages);
  }
  return [...map.entries()].filter(([, pages]) => pages.size > 1).map(([query, pages]) => ({ query, pages: [...pages] }));
}

function findPageLosses(current, previous) {
  const sum = (rows) => {
    const map = new Map();
    for (const row of rows) if (row.page) map.set(row.page, (map.get(row.page) ?? 0) + row.impressions);
    return map;
  };
  const now = sum(current);
  const before = sum(previous);
  return [...before.entries()].filter(([page, value]) => now.has(page) && now.get(page) < value).map(([page, value]) => ({ page, previous: value, current: now.get(page) })).sort((a, b) => (a.current / a.previous) - (b.current / b.previous));
}

function table(rows) {
  if (!rows.length) return '_Nessuna riga con i criteri relativi al file._';
  return `| Query | Pagina | Click | Impression | CTR | Posizione |\n| --- | --- | ---: | ---: | ---: | ---: |\n${rows.map((row) => `| ${escapeMarkdown(row.query || '—')} | ${escapeMarkdown(row.page || '—')} | ${row.clicks} | ${row.impressions} | ${(row.ctr * 100).toFixed(2)}% | ${row.position.toFixed(1)} |`).join('\n')}`;
}

function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    if (values[index].startsWith('--')) result[values[index].slice(2)] = values[index + 1];
  }
  return result;
}

function parseCsv(value) {
  const lines = value.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  const headers = parseLine(lines.shift());
  return lines.filter(Boolean).map((line) => Object.fromEntries(headers.map((header, index) => [header, parseLine(line)[index] ?? ''])));
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

function normalizeHeader(value) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

function numberValue(value = '') {
  const normalized = value.replace(/\s/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const result = Number(normalized || 0);
  assert(Number.isFinite(result), `invalid numeric value: ${value}`);
  return result;
}

function percentValue(value = '') {
  const numeric = numberValue(value);
  return value.includes('%') ? numeric / 100 : numeric > 1 ? numeric / 100 : numeric;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function escapeMarkdown(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}
