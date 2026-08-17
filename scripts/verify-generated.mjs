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
const SCOPE_INDEX = process.argv.indexOf('--scope');
const SCOPE = SCOPE_INDEX >= 0 ? process.argv[SCOPE_INDEX + 1] : 'all';
const HUB_SECTIONS = new Set(['guide', 'calcolatori', 'confronti']);
const SECTION_SEGMENT_KEYS = {
  guide: 'guideSegment',
  calcolatori: 'calculatorSegment',
  confronti: 'comparisonSegment',
};
const SECTION_LABELS = {
  guide: 'Guide',
  calcolatori: 'Calcolatori',
  confronti: 'Confronti',
  landing: 'App',
};
const UNSUPPORTED_PRODUCT_CLAIMS = [
  /Google Maps/i,
  /navigazione (?:GPS|turn-by-turn)/i,
  /pedaggi (?:live|in tempo reale)/i,
  /tracciamento (?:live|in tempo reale)/i,
];

const manifest = JSON.parse(await readFile(path.join(DIST, 'content-manifest.json'), 'utf8'));
const sourcePages = await discoverSourcePages();
const sourceById = new Map(sourcePages.map((page) => [page.id, page]));
assert(!Object.hasOwn(manifest, 'generatedAt'), 'manifest must be deterministic; generatedAt is forbidden');
assert.match(manifest.revisionDate, /^\d{4}-\d{2}-\d{2}$/, 'manifest revisionDate missing');
assert.equal(manifest.pages.length, sourcePages.length, 'manifest count must match published/indexable sources');
assert.deepEqual(
  new Set(manifest.pages.map((page) => page.id)),
  new Set(sourcePages.map((page) => page.id)),
  'manifest ids must match published/indexable sources',
);

for (const page of manifest.pages) {
  const expected = sourceById.get(page.id);
  assert(expected, `manifest contains unknown page ${page.id}`);
  assert.equal(page.url, `${ORIGIN}${expected.urlPath}`, `${page.id}: manifest URL mismatch`);
  assert.equal(page.canonical, page.url, `${page.id}: manifest canonical mismatch`);
  assert.equal(page.indexable, true, `${page.id}: manifest page must be indexable`);
}

const pagePaths = manifest.pages.map((page) => new URL(page.url).pathname);
const hubPaths = [...new Set(sourcePages.filter((page) => HUB_SECTIONS.has(page.section)).map((page) => hubPath(page.locale, page.section)))].sort();
const fixedPaths = [`${BASE}/`, `${BASE}/privacy.html`, `${BASE}/terms.html`];
const indexableRoutes = [...fixedPaths, ...hubPaths, ...pagePaths];
const generatedRoutes = [...new Set(indexableRoutes)];
assert.equal(generatedRoutes.length, indexableRoutes.length, 'duplicate generated route');

const canonicalUrls = new Set();
const titles = new Set();
const descriptions = new Set();
const htmlByRoute = new Map();
const incoming = new Map(generatedRoutes.map((route) => [route, 0]));

for (const route of [...hubPaths, ...pagePaths]) {
  const html = await readFile(routeToFile(route), 'utf8');
  htmlByRoute.set(route, html);
  verifyIndexableDocument(route, html);

  const sourcePage = sourcePages.find((page) => page.urlPath === route);
  const schema = parseSchema(route, html);
  verifySchema(route, schema, sourcePage);

  if (sourcePage) {
    assert(html.includes(config.appStoreUrl), `${route}: App Store CTA missing`);
    assert(html.includes(config.googlePlayUrl), `${route}: Google Play CTA missing`);
    assert(html.includes('store-badges/app-store-it.svg'), `${route}: official App Store badge missing`);
    assert(html.includes('store-badges/google-play-it.png'), `${route}: official Google Play badge missing`);
    assert(html.includes('data-analytics-event="store_outbound"'), `${route}: product CTA event contract missing`);
    const tableCount = (html.match(/<table>/g) || []).length;
    const accessibleTableCount = (html.match(/<div class="table-scroll" tabindex="0" role="region" aria-label="Tabella dati scorrevole \d+"><table>/g) || []).length;
    assert.equal(accessibleTableCount, tableCount, `${route}: every data table needs a named keyboard-scroll region`);
    if (sourcePage.meta.mobileH1) {
      assert(html.includes(`<span class="seo-h1__desktop">${sourcePage.meta.title}</span>`), `${route}: desktop H1 variant missing`);
      assert(html.includes(`<span class="seo-h1__mobile">${sourcePage.meta.mobileH1}</span>`), `${route}: mobile H1 variant missing`);
    }
    if (sourcePage.meta.pillar) {
      const pillar = sourceById.get(resolveReferenceId(sourcePage.locale, sourcePage.meta.pillar));
      assert(pillar && html.includes(`href="${pillar.urlPath}"`), `${route}: visible pillar link missing`);
    }
    if (sourcePage.meta.relatedCalculator) {
      const calculator = sourceById.get(resolveReferenceId(sourcePage.locale, sourcePage.meta.relatedCalculator));
      assert(calculator && html.includes(`href="${calculator.urlPath}"`), `${route}: related calculator link missing`);
    }
  }

  if (sourcePage?.section === 'calcolatori') {
    assert(html.includes('data-calculator='), `${route}: calculator form missing`);
    assert(html.includes('class="calculator-status seo-visually-hidden"'), `${route}: calculator status missing`);
    assert(html.includes('role="status"'), `${route}: calculator status role missing`);
    assert(html.includes('aria-live="polite"'), `${route}: calculator live region missing`);
    assert(html.includes('calcolo locale'), `${route}: local-processing disclosure missing`);
  }
}

for (const route of [`${BASE}/privacy.html`, `${BASE}/terms.html`]) {
  const html = await readFile(routeToFile(route), 'utf8');
  htmlByRoute.set(route, html);
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)" \/>/, `${route}: canonical missing`);
  assert.equal(canonical, `${ORIGIN}${route}`, `${route}: canonical mismatch`);
  for (const locale of ['en', 'it']) {
    assert.equal((html.match(new RegExp(`<h1[^>]*data-lang="${locale}"[^>]*>`, 'g')) || []).length, 1, `${route}: one ${locale} H1 required`);
  }
  assert(html.includes('document.documentElement.lang='), `${route}: language switch must update document language`);
}

const landing = await readFile(path.join(DIST, 'index.html'), 'utf8');
htmlByRoute.set(`${BASE}/`, landing);
verifyIndexableDocument(`${BASE}/`, landing);
const landingSchema = parseSchema(`${BASE}/`, landing);
const landingGraph = Array.isArray(landingSchema['@graph']) ? landingSchema['@graph'] : [];
assert(landingGraph.some((entry) => entry['@type'] === 'Organization' && entry['@id'] === `${ORIGIN}/#organization`), 'landing Organization identity missing');
const landingWebsite = landingGraph.find((entry) => entry['@type'] === 'WebSite');
assert.equal(landingWebsite?.publisher?.['@id'], `${ORIGIN}/#organization`, 'landing WebSite publisher must use Organization identity');
assert(landing.includes('data-static-home'), 'landing must contain useful static HTML before client rendering');
assert(!/<noscript>[\s\S]*?<h1(?:\s|>)/.test(landing), 'landing must not duplicate H1 inside noscript');
assert(landing.includes(`${BASE}/seo/events.js`), 'landing event hook missing');

for (const [route, html] of htmlByRoute) {
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const targetRoute = await verifyInternalTarget(route, match[1], htmlByRoute);
    if (targetRoute && incoming.has(targetRoute)) incoming.set(targetRoute, incoming.get(targetRoute) + 1);
  }
  for (const match of html.matchAll(/src="([^"]+)"/g)) {
    await verifyInternalTarget(route, match[1], htmlByRoute);
  }
}

for (const [route, count] of incoming) {
  if (route === `${BASE}/`) continue;
  assert(count > 0, `${route}: orphan indexable route`);
}

for (const asset of [
  'CNAME',
  'seo/seo.css',
  'seo/events.js',
  'seo/calculators.js',
  'seo/calculators-core.js',
  'store-badges/app-store-it.svg',
  'store-badges/google-play-it.png',
  'store-badges/app-store-en.svg',
  'store-badges/google-play-en.png',
  'privacy.html',
  'terms.html',
  '404.html',
]) {
  await access(path.join(DIST, asset));
}

const cname = await readFile(path.join(DIST, 'CNAME'), 'utf8');
assert.equal(cname.trim(), new URL(ORIGIN).hostname, 'CNAME must match canonical hostname');

const responsiveCss = await readFile(path.join(DIST, 'seo/seo.css'), 'utf8');
assert(responsiveCss.includes('@media (max-width: 760px)'), 'mobile article breakpoint missing');
assert(/\.calculator-fields[\s\S]*?grid-template-columns:\s*1fr/.test(responsiveCss), 'mobile calculator fields must collapse to one column');
assert(/\.seo-prose \.table-scroll[\s\S]*?overflow-x:\s*auto/.test(responsiveCss), 'article tables must scroll safely on narrow viewports');
assert(/\.seo-prose \.table-scroll:focus-visible[\s\S]*?outline:/.test(responsiveCss), 'keyboard-scroll table regions need a visible focus style');
assert(responsiveCss.includes('.store-badge-row'), 'responsive official store badge layout missing');

const notFound = await readFile(path.join(DIST, '404.html'), 'utf8');
assert(/name="robots" content="noindex,follow"/.test(notFound), '404 page must be noindex,follow');
assert.equal((notFound.match(/<h1(?:\s|>)/g) || []).length, 1, '404 page requires one H1');

await verifySitemaps(sourcePages, hubPaths, pagePaths);
await verifyHreflang(sourcePages, htmlByRoute);

const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
assert(robots.includes('User-agent: *\nAllow: /'), 'robots.txt must allow public crawling');
assert(robots.includes(`Sitemap: ${ORIGIN}${BASE}/sitemap.xml`), 'robots.txt sitemap URL mismatch');
assert(!/(?:localhost|127\.0\.0\.1|Disallow:\s*\/)/.test(robots), 'robots.txt contains unsafe production rule');

const eventAdapter = await readFile(path.join(DIST, 'seo/events.js'), 'utf8');
assert(!/(?:fetch\s*\(|sendBeacon|XMLHttpRequest|gtag\s*\(|fbq\s*\()/.test(eventAdapter), 'event adapter must not send data or load analytics');
assert(!eventAdapter.includes('path: window.location'), 'event payload must not expose raw page paths');
for (const eventName of ['content_landing_view', 'store_outbound_click', 'language_select', 'calculator_start', 'calculator_complete', 'calculator_validation_error']) {
  assert(eventAdapter.includes(eventName), `event adapter missing ${eventName}`);
}
assert(eventAdapter.includes('content_id'), 'event adapter must use stable content_id');

console.log(`SEO generated gate passed (${SCOPE}): ${sourcePages.length} pages, ${hubPaths.length} hubs, 4 child sitemaps, zero broken links/orphans.`);

function verifyIndexableDocument(route, html) {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: exactly one H1 required`);
  assert(!html.includes('[object Object]'), `${route}: object leaked into HTML`);
  assert(!html.includes('undefined'), `${route}: undefined leaked into HTML`);
  assert(!html.includes('href=""'), `${route}: empty href`);
  assert(!/(?:localhost|127\.0\.0\.1)/.test(html), `${route}: development URL leaked`);
  assert(!/(?:\bTODO\b|\bTBD\b|lorem ipsum|da completare)/i.test(html), `${route}: placeholder content leaked`);
  for (const pattern of UNSUPPORTED_PRODUCT_CLAIMS) assert(!pattern.test(html), `${route}: unsupported product claim ${pattern}`);
  assert(/<meta name="robots" content="index,follow,max-image-preview:large" \/>/.test(html), `${route}: indexable robots directive missing`);

  const title = capture(html, /<title>([^<]+)<\/title>/, `${route}: title missing`);
  assert(!titles.has(title), `${route}: duplicate title ${title}`);
  titles.add(title);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"\s*\/>/, `${route}: description missing`);
  assert(!descriptions.has(description), `${route}: duplicate description`);
  descriptions.add(description);
  for (const name of ['twitter:title', 'twitter:description', 'twitter:image']) {
    assert(html.includes(`<meta name="${name}"`), `${route}: ${name} missing`);
  }
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)" \/>/, `${route}: canonical missing`);
  const parsed = new URL(canonical);
  assert.equal(parsed.protocol, 'https:', `${route}: canonical must use HTTPS`);
  assert.equal(parsed.origin, ORIGIN, `${route}: canonical origin mismatch`);
  assert.equal(parsed.pathname, route, `${route}: canonical path mismatch`);
  assert(!canonicalUrls.has(canonical), `${route}: duplicate canonical`);
  canonicalUrls.add(canonical);
}

function parseSchema(route, html) {
  const jsonLd = capture(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/, `${route}: JSON-LD missing`);
  assert.doesNotThrow(() => JSON.parse(jsonLd), `${route}: JSON-LD must parse`);
  return JSON.parse(jsonLd);
}

function verifySchema(route, schema, sourcePage) {
  assert.equal(schema['@context'], 'https://schema.org', `${route}: schema context mismatch`);
  if (!sourcePage) {
    assert(['CollectionPage', undefined].includes(schema['@type']), `${route}: unsupported hub schema`);
    return;
  }
  const graph = Array.isArray(schema['@graph']) ? schema['@graph'] : [];
  assert(graph.length >= 4, `${route}: structured graph incomplete`);
  assert(graph.some((entry) => entry['@type'] === 'WebSite'), `${route}: WebSite missing`);
  assert(graph.some((entry) => entry['@type'] === 'Organization'), `${route}: Organization missing`);
  const breadcrumb = graph.find((entry) => entry['@type'] === 'BreadcrumbList');
  assert(breadcrumb, `${route}: BreadcrumbList missing`);
  assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), breadcrumb.itemListElement.map((_, index) => index + 1), `${route}: breadcrumb positions invalid`);
  if (sourcePage.section !== 'landing') {
    assert.equal(breadcrumb.itemListElement?.[1]?.name, SECTION_LABELS[sourcePage.section], `${route}: breadcrumb section mismatch`);
  }
  const requiredType = sourcePage.section === 'calcolatori' ? 'WebApplication' : sourcePage.section === 'landing' ? 'SoftwareApplication' : 'Article';
  assert(graph.some((entry) => entry['@type'] === requiredType), `${route}: ${requiredType} missing`);
  assert(!graph.some((entry) => ['AggregateRating', 'Review', 'Offer'].includes(entry['@type'])), `${route}: unsupported commercial/review schema`);
}

async function verifySitemaps(pages, hubs, paths) {
  const expectedChildren = [
    `${BASE}/sitemaps/articles-it.xml`,
    `${BASE}/sitemaps/calculators-it.xml`,
    `${BASE}/sitemaps/core.xml`,
    `${BASE}/sitemaps/legal.xml`,
  ];
  const indexXml = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
  assert(indexXml.includes('<sitemapindex '), 'sitemap.xml must be a sitemap index');
  const children = extractLocPaths(indexXml);
  assert.deepEqual(children.sort(), expectedChildren.sort(), 'sitemap index children mismatch');

  const expected = {
    'articles-it.xml': paths.filter((route) => {
      const page = pages.find((item) => item.urlPath === route);
      return page?.locale === 'it' && ['guide', 'confronti'].includes(page.section);
    }),
    'calculators-it.xml': paths.filter((route) => pages.find((item) => item.urlPath === route)?.section === 'calcolatori'),
    'core.xml': [`${BASE}/`, ...hubs, ...paths.filter((route) => pages.find((item) => item.urlPath === route)?.section === 'landing')],
    'legal.xml': [`${BASE}/privacy.html`, `${BASE}/terms.html`],
  };
  const all = [];
  for (const [file, routes] of Object.entries(expected)) {
    const xml = await readFile(path.join(DIST, 'sitemaps', file), 'utf8');
    assert(xml.includes('<urlset '), `${file}: urlset missing`);
    const actual = extractLocPaths(xml);
    assert.equal(new Set(actual).size, actual.length, `${file}: duplicate URL`);
    assert.deepEqual(new Set(actual), new Set(routes), `${file}: route set mismatch`);
    for (const date of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) assert.match(date[1], /^\d{4}-\d{2}-\d{2}$/, `${file}: invalid lastmod`);
    all.push(...actual);
  }
  assert.equal(new Set(all).size, all.length, 'URL appears in more than one child sitemap');
  assert.deepEqual(new Set(all), new Set(generatedRoutes), 'sitemap URLs must match canonical indexable routes');
}

function extractLocPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const value = decodeXml(match[1]);
    const parsed = new URL(value);
    assert.equal(parsed.origin, ORIGIN, `sitemap origin mismatch: ${value}`);
    assert.equal(parsed.search, '', `sitemap URL must not contain query: ${value}`);
    assert.equal(parsed.hash, '', `sitemap URL must not contain fragment: ${value}`);
    return parsed.pathname;
  });
}

async function verifyHreflang(pages, htmlMap) {
  const groups = new Map();
  for (const page of pages) {
    const list = groups.get(page.meta.translationGroup) ?? [];
    list.push(page);
    groups.set(page.meta.translationGroup, list);
  }
  for (const group of groups.values()) {
    for (const page of group) {
      const html = htmlMap.get(page.urlPath);
      const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)];
      if (group.length === 1) {
        assert.equal(alternates.length, 0, `${page.urlPath}: hreflang must wait for real translation`);
        continue;
      }
      const expected = new Set(group.map((item) => `${config.locales[item.locale].languageTag}|${ORIGIN}${item.urlPath}`));
      for (const alternate of alternates) {
        if (alternate[1] === 'x-default') continue;
        expected.delete(`${alternate[1]}|${alternate[2]}`);
      }
      assert.equal(expected.size, 0, `${page.urlPath}: reciprocal hreflang incomplete`);
    }
  }
}

async function discoverSourcePages() {
  const discovered = [];
  const sections = ['guide', 'calcolatori', 'confronti', 'landing'];
  for (const locale of Object.keys(config.locales)) {
    for (const section of sections) {
      const directory = path.join(CONTENT, locale, section);
      let entries;
      try {
        entries = await readdir(directory, { withFileTypes: true });
      } catch (error) {
        if (error?.code === 'ENOENT') continue;
        throw error;
      }
      for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
        const meta = JSON.parse(await readFile(path.join(directory, entry.name, 'meta.json'), 'utf8'));
        if (meta.status !== 'published' || meta.noindex !== false) continue;
        discovered.push({
          id: `${locale}:${section}:${entry.name}`,
          locale,
          section,
          meta,
          urlPath: section === 'landing' ? `${BASE}/${locale}/${entry.name}/` : `${BASE}/${locale}/${config.locales[locale][SECTION_SEGMENT_KEYS[section]]}/${entry.name}/`,
        });
      }
    }
  }
  return discovered;
}

function resolveReferenceId(locale, reference) {
  const [section, slug] = reference.split(':');
  return `${locale}:${section}:${slug}`;
}

function hubPath(locale, section) {
  const segment = config.locales[locale][SECTION_SEGMENT_KEYS[section]];
  return `${BASE}/${locale}/${segment}/`;
}

async function verifyInternalTarget(sourceRoute, href, htmlMap) {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  let parsed;
  try {
    parsed = new URL(href, `${ORIGIN}${sourceRoute}`);
  } catch {
    assert.fail(`${sourceRoute}: invalid URL ${href}`);
  }
  if (parsed.origin !== ORIGIN || !parsed.pathname.startsWith(`${BASE}/`)) return null;
  await access(routeToFile(parsed.pathname));
  if (parsed.hash) {
    const targetHtml = htmlMap.get(parsed.pathname) ?? await readFile(routeToFile(parsed.pathname), 'utf8');
    const id = decodeURIComponent(parsed.hash.slice(1));
    assert(new RegExp(`id=["']${escapeRegex(id)}["']`).test(targetHtml), `${sourceRoute}: broken fragment ${href}`);
  }
  return parsed.pathname;
}

function routeToFile(route) {
  const withoutBase = route.slice(BASE.length).replace(/^\//, '');
  if (!withoutBase || route.endsWith('/')) return path.join(DIST, withoutBase, 'index.html');
  return path.join(DIST, withoutBase);
}

function capture(value, pattern, message) {
  const match = value.match(pattern);
  assert(match, message);
  return match[1];
}

function decodeXml(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#039;', "'")
    .replaceAll('&amp;', '&');
}

assert.equal(decodeXml('&quot;'), '"');
assert.equal(decodeXml('&amp;quot;'), '&quot;');
assert.equal(decodeXml('&amp;lt;'), '&lt;');

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
