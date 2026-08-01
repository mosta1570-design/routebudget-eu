import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const CONTENT = path.join(ROOT, 'content');
const config = JSON.parse(await readFile(path.join(CONTENT, 'site.json'), 'utf8'));
const ORIGIN = config.origin;
const BASE = config.basePath;
const SECTION_SEGMENT_KEYS = {
  guide: 'guideSegment',
  calcolatori: 'calculatorSegment',
  confronti: 'comparisonSegment',
};
const SECTION_LABELS = { guide: 'Guide', calcolatori: 'Calcolatori', confronti: 'Confronti' };

const manifest = JSON.parse(await readFile(path.join(DIST, 'content-manifest.json'), 'utf8'));
const sourcePages = await discoverSourcePages();
assert.equal(manifest.pages.length, sourcePages.length, 'manifest page count must match content sources');
assert.deepEqual(
  new Set(manifest.pages.map((page) => page.id)),
  new Set(sourcePages.map((page) => page.id)),
  'manifest page ids must match content sources',
);

const sourceById = new Map(sourcePages.map((page) => [page.id, page]));
for (const page of manifest.pages) {
  const expected = sourceById.get(page.id);
  assert(expected, `manifest contains unknown page ${page.id}`);
  assert.equal(page.url, `${ORIGIN}${expected.urlPath}`, `${page.id}: manifest URL mismatch`);
}

const pagePaths = manifest.pages.map((page) => new URL(page.url).pathname);
const hubPaths = [...new Set(sourcePages.map((page) => hubPath(page.locale, page.section)))].sort();
const fixedPaths = [`${BASE}/`, `${BASE}/privacy.html`, `${BASE}/terms.html`];
const expectedSitemapPaths = new Set([...fixedPaths, ...hubPaths, ...pagePaths]);
const canonicalUrls = new Set();
const titles = new Set();

for (const route of [...hubPaths, ...pagePaths]) {
  const file = routeToFile(route);
  const html = await readFile(file, 'utf8');

  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: exactly one H1 required`);
  assert(!html.includes('[object Object]'), `${route}: object leaked into HTML`);
  assert(!html.includes('undefined'), `${route}: undefined leaked into HTML`);
  assert(!html.includes('href=""'), `${route}: empty href`);

  const title = capture(html, /<title>([^<]+)<\/title>/, `${route}: title missing`);
  assert(!titles.has(title), `${route}: duplicate title ${title}`);
  titles.add(title);

  const canonical = capture(
    html,
    /<link rel="canonical" href="([^"]+)" \/>/,
    `${route}: canonical missing`,
  );
  assert.equal(new URL(canonical).pathname, route, `${route}: canonical path mismatch`);
  assert(!canonicalUrls.has(canonical), `${route}: duplicate canonical`);
  canonicalUrls.add(canonical);

  const jsonLd = capture(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    `${route}: JSON-LD missing`,
  );
  assert.doesNotThrow(() => JSON.parse(jsonLd), `${route}: JSON-LD must parse`);
  const schema = JSON.parse(jsonLd);
  const sourcePage = sourcePages.find((page) => page.urlPath === route);
  if (sourcePage) {
    const graph = Array.isArray(schema['@graph']) ? schema['@graph'] : [];
    const breadcrumb = graph.find((entry) => entry['@type'] === 'BreadcrumbList');
    assert(breadcrumb, `${route}: BreadcrumbList missing`);
    assert.equal(
      breadcrumb.itemListElement?.[1]?.name,
      SECTION_LABELS[sourcePage.section],
      `${route}: structured breadcrumb section mismatch`,
    );
  }

  for (const target of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    await verifyInternalTarget(route, target[1]);
  }

  if (sourcePage?.section === 'calcolatori') {
    assert(html.includes('data-calculator='), `${route}: calculator form missing`);
    assert(html.includes('class="calculator-status seo-visually-hidden"'), `${route}: persistent calculator status missing`);
    assert(html.includes('role="status"'), `${route}: calculator status role missing`);
    assert(html.includes('aria-live="polite"'), `${route}: calculator status live region missing`);
    assert(html.includes('calcolo locale'), `${route}: local-processing disclosure missing`);
  }
}

for (const route of [`${BASE}/privacy.html`, `${BASE}/terms.html`]) {
  const html = await readFile(routeToFile(route), 'utf8');
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)" \/>/, `${route}: canonical missing`);
  assert.equal(canonical, `${ORIGIN}${route}`, `${route}: canonical mismatch`);
  for (const locale of ['en', 'it']) {
    assert.equal(
      (html.match(new RegExp(`<h1[^>]*data-lang="${locale}"[^>]*>`, 'g')) || []).length,
      1,
      `${route}: one ${locale} H1 required`,
    );
  }
  assert(html.includes('document.documentElement.lang='), `${route}: language switch must update document language`);
  for (const target of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    await verifyInternalTarget(route, target[1]);
  }
}

for (const asset of [
  'seo/seo.css',
  'seo/events.js',
  'seo/calculators.js',
  'seo/calculators-core.js',
  'privacy.html',
  'terms.html',
]) {
  await access(path.join(DIST, asset));
}

const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const value = decodeXml(match[1]);
  const parsed = new URL(value);
  assert.equal(parsed.origin, ORIGIN, `sitemap origin mismatch: ${value}`);
  return parsed.pathname;
});

assert.equal(new Set(sitemapPaths).size, sitemapPaths.length, 'sitemap contains duplicate URLs');
assert.deepEqual(new Set(sitemapPaths), expectedSitemapPaths, 'sitemap route set mismatch');

const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
assert(
  robots.includes(`Sitemap: ${ORIGIN}${BASE}/sitemap.xml`),
  'robots.txt sitemap URL mismatch',
);

const landing = await readFile(path.join(DIST, 'index.html'), 'utf8');
assert(
  landing.includes(`rel="canonical" href="${ORIGIN}${BASE}/"`),
  'landing canonical missing',
);
assert(landing.includes(`${BASE}/seo/events.js`), 'landing event hook missing');
assert(/<noscript>[\s\S]*?<h1(?:\s|>)/.test(landing), 'landing static fallback H1 missing');

const eventAdapter = await readFile(path.join(DIST, 'seo/events.js'), 'utf8');
assert(!eventAdapter.includes('path: window.location'), 'event payload must not expose raw page paths');
for (const eventName of [
  'content_landing_view',
  'store_outbound_click',
  'language_select',
  'calculator_start',
  'calculator_complete',
  'calculator_validation_error',
]) {
  assert(eventAdapter.includes(eventName), `event adapter missing ${eventName}`);
}
assert(eventAdapter.includes('content_id'), 'event adapter must use stable content_id');

console.log('Generated content, internal links, schema, and sitemap passed.');

async function discoverSourcePages() {
  const discovered = [];
  for (const [locale, localeConfig] of Object.entries(config.locales)) {
    for (const [section, segmentKey] of Object.entries(SECTION_SEGMENT_KEYS)) {
      const segment = localeConfig[segmentKey];
      assert(typeof segment === 'string' && segment, `${locale}: ${segmentKey} missing`);
      const directory = path.join(CONTENT, locale, section);
      let entries;
      try {
        entries = await readdir(directory, { withFileTypes: true });
      } catch (error) {
        if (error?.code === 'ENOENT') continue;
        throw error;
      }
      for (const entry of entries.filter((item) => item.isDirectory())) {
        discovered.push({
          id: `${locale}:${section}:${entry.name}`,
          locale,
          section,
          urlPath: `${BASE}/${locale}/${segment}/${entry.name}/`,
        });
      }
    }
  }
  return discovered;
}

function hubPath(locale, section) {
  const segment = config.locales[locale][SECTION_SEGMENT_KEYS[section]];
  return `${BASE}/${locale}/${segment}/`;
}

async function verifyInternalTarget(sourceRoute, href) {
  if (href.startsWith('#') || href.startsWith('mailto:')) return;
  let parsed;
  try {
    parsed = new URL(href, `${ORIGIN}${sourceRoute}`);
  } catch {
    assert.fail(`${sourceRoute}: invalid href ${href}`);
  }

  if (parsed.origin !== ORIGIN || !parsed.pathname.startsWith(`${BASE}/`)) return;
  await access(routeToFile(parsed.pathname));
}

function routeToFile(route) {
  const withoutBase = route.slice(BASE.length).replace(/^\//, '');
  if (!withoutBase || route.endsWith('/')) {
    return path.join(DIST, withoutBase, 'index.html');
  }
  return path.join(DIST, withoutBase);
}

function capture(value, pattern, message) {
  const match = value.match(pattern);
  assert(match, message);
  return match[1];
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#039;', "'");
}
