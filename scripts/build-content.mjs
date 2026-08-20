import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

import { UNSUPPORTED_PRODUCT_CLAIMS } from './product-claim-rules.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_ROOT = path.join(ROOT, 'content');
const OUTPUT_FLAG = process.argv.indexOf('--out');
const OUTPUT_ROOT = path.resolve(
  ROOT,
  OUTPUT_FLAG >= 0 && process.argv[OUTPUT_FLAG + 1] ? process.argv[OUTPUT_FLAG + 1] : 'dist',
);

const SECTION_KEYS = ['guide', 'calcolatori', 'confronti', 'landing'];
const HUB_SECTION_KEYS = ['guide', 'calcolatori', 'confronti'];
const GUIDE_KINDS = new Set(['pillar', 'guide']);
const CONTENT_STATUSES = new Set([
  'idea',
  'researching',
  'brief-ready',
  'drafting',
  'review',
  'approved',
  'published',
  'updating',
  'retired',
]);
const APP_FEATURES = new Set([
  'complete-route-calculation',
  'cost-breakdown',
  'cost-scenarios',
  'fuel-estimate',
  'local-archive',
  'pdf-quote',
]);
const INTENT_FEATURE_COMPATIBILITY = {
  'add-trip-costs': new Set(['complete-route-calculation', 'cost-breakdown', 'fuel-estimate']),
  'complete-trip': new Set(['complete-route-calculation', 'cost-breakdown', 'cost-scenarios']),
  'pdf-quote': new Set(['local-archive', 'pdf-quote']),
  'protect-margin': new Set(['cost-breakdown', 'cost-scenarios', 'pdf-quote']),
  unlimited: new Set(['local-archive']),
};
const CTA_COPY = {
  'complete-trip': {
    eyebrow: 'Continua nell’app',
    title: 'Calcola la tratta completa.',
    body: 'Aggiungi pedaggi, autista, usura, ritorno a vuoto e scenari di prezzo in un unico flusso.',
  },
  'pdf-quote': {
    eyebrow: 'Dal calcolo al riepilogo',
    title: 'Esporta la stima in PDF.',
    body: 'Genera un riepilogo non vincolante della tratta; completa separatamente dati cliente e condizioni commerciali.',
  },
  'add-trip-costs': {
    eyebrow: 'Completa la tratta',
    title: 'Aggiungi le altre voci operative.',
    body: 'Porta carburante, pedaggi, autista, usura, ritorno a vuoto e scenari in un unico calcolo.',
  },
  'protect-margin': {
    eyebrow: 'Prima di accettare',
    title: 'Proteggi il margine della tratta.',
    body: 'Confronta prezzo minimo, consigliato e ideale prima di impegnare mezzo e tempo.',
  },
  unlimited: {
    eyebrow: 'Archivio locale',
    title: 'Riapri i calcoli recenti.',
    body: 'Ritrova le tratte salvate sul dispositivo, aggiorna le ipotesi e genera un nuovo riepilogo quando serve.',
  },
};

const CTA_ID_BY_INTENT = {
  'complete-trip': 'complete_trip_app',
  'pdf-quote': 'create_pdf_quote',
  'add-trip-costs': 'add_trip_costs_app',
  'protect-margin': 'compare_scenarios_app',
  unlimited: 'continue_unlimited_pro',
};

const config = JSON.parse(await readFile(path.join(CONTENT_ROOT, 'site.json'), 'utf8'));
const sourceRegistry = JSON.parse(await readFile(path.join(CONTENT_ROOT, 'sources.json'), 'utf8'));
validateConfig(config);
const siteUrl = `${config.origin}${config.basePath}`;
const allPages = await loadPages();
const pages = allPages.filter((page) => page.meta.status === 'published' && page.meta.noindex === false);
const pagesById = new Map(pages.map((page) => [page.id, page]));
const activeHubs = Object.keys(config.locales).flatMap((locale) =>
  HUB_SECTION_KEYS
    .filter((section) => pages.some((page) => page.locale === locale && page.section === section))
    .map((section) => ({ locale, section })),
);

validateRelationships(allPages, new Map(allPages.map((page) => [page.id, page])));

await Promise.all([
  ...pages.map((page) => writeRoute(page.urlPath, renderPage(page))),
  ...activeHubs.map(({ locale, section }) =>
    writeRoute(hubPath(locale, section), renderHub(locale, section)),
  ),
]);

const sitemapFiles = renderSitemaps();
await mkdir(path.join(OUTPUT_ROOT, 'sitemaps'), { recursive: true });
await Promise.all(
  Object.entries(sitemapFiles).map(([relativePath, xml]) =>
    writeFile(path.join(OUTPUT_ROOT, relativePath), xml, 'utf8'),
  ),
);
await writeFile(
  path.join(OUTPUT_ROOT, 'content-manifest.json'),
  `${JSON.stringify(
    {
      revisionDate: latestDate(pages.map((page) => page.meta.modified)),
      pages: pages.map(({ id, urlPath, meta }) => ({
        id,
        url: absoluteUrl(urlPath),
        title: meta.title,
        description: meta.description,
        type: meta.kind,
        locale: meta.locale,
        canonical: absoluteUrl(urlPath),
        indexable: true,
        primaryKeyword: meta.primaryKeyword,
        modified: meta.modified,
      })),
      hubs: activeHubs.map(({ locale, section }) => ({
        id: `${locale}:${section}:hub`,
        url: absoluteUrl(hubPath(locale, section)),
        locale,
        section,
        indexable: true,
      })),
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`Generated ${pages.length} published pages, ${activeHubs.length} hubs, and split XML sitemaps.`);

async function loadPages() {
  const loaded = [];

  for (const locale of Object.keys(config.locales)) {
    for (const section of SECTION_KEYS) {
      const directory = path.join(CONTENT_ROOT, locale, section);
      let entries = [];

      try {
        entries = await readdir(directory, { withFileTypes: true });
      } catch (error) {
        if (error?.code === 'ENOENT') {
          continue;
        }
        throw error;
      }

      for (const entry of entries.filter((item) => item.isDirectory()).sort(byName)) {
        const sourceDirectory = path.join(directory, entry.name);
        const [metaSource, markdown] = await Promise.all([
          readFile(path.join(sourceDirectory, 'meta.json'), 'utf8'),
          readFile(path.join(sourceDirectory, 'body.md'), 'utf8'),
        ]);
        const meta = JSON.parse(metaSource);
        meta.sources = (meta.sources ?? []).map((source) => ({
          ...(sourceRegistry[source.url] ?? {}),
          ...source,
        }));
        const page = {
          id: `${locale}:${section}:${entry.name}`,
          locale,
          section,
          sourceDirectory,
          markdown,
          meta,
          urlPath: pagePath(locale, section, entry.name),
        };
        validatePage(page, entry.name);
        loaded.push(page);
      }
    }
  }

  const ids = new Set();
  const canonicals = new Set();
  const titles = new Set();
  const descriptions = new Set();
  const primaryKeywords = new Set();
  for (const page of loaded) {
    assert(!ids.has(page.id), `${page.id}: duplicate page id`);
    assert(!canonicals.has(page.urlPath), `${page.id}: duplicate canonical path`);
    assert(!titles.has(page.meta.title), `${page.id}: duplicate title`);
    assert(!descriptions.has(page.meta.description), `${page.id}: duplicate description`);
    assert(!primaryKeywords.has(page.meta.primaryKeyword), `${page.id}: duplicate primaryKeyword`);
    ids.add(page.id);
    canonicals.add(page.urlPath);
    titles.add(page.meta.title);
    descriptions.add(page.meta.description);
    primaryKeywords.add(page.meta.primaryKeyword);
  }

  return loaded.sort((a, b) => a.urlPath.localeCompare(b.urlPath, 'it'));
}

function validateConfig(value) {
  assert(typeof value.name === 'string' && value.name.length > 0, 'site.json: name required');
  assert(/^https:\/\//.test(value.origin), 'site.json: HTTPS origin required');
  assert(value.basePath === '' || /^\/[a-z0-9-]+$/.test(value.basePath), 'site.json: basePath must be empty or one clean path segment');
  assert(value.locales && typeof value.locales === 'object', 'site.json: locales required');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(value.coreLastModified), 'site.json: coreLastModified required');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(value.legalLastModified), 'site.json: legalLastModified required');
  assert(/^https:\/\/apps\.apple\.com\/app\/id\d+$/.test(value.appStoreUrl), 'site.json: valid public App Store URL required');
  assert(value.googlePlayUrl === 'https://play.google.com/store/apps/details?id=eu.routebudget.app', 'site.json: Google Play URL must target eu.routebudget.app');
}

function validatePage(page, directorySlug) {
  const { meta, markdown, locale, section, id } = page;
  const requiredStrings = [
    'slug',
    'kind',
    'locale',
    'title',
    'description',
    'eyebrow',
    'published',
    'modified',
    'reviewed',
    'status',
    'author',
    'reviewer',
    'primaryKeyword',
    'searchIntent',
    'conversionIntent',
    'translationGroup',
    'cluster',
    'appFeature',
    'canonical',
    'ogImage',
    'changeSummary',
  ];

  for (const key of requiredStrings) {
    assert(typeof meta[key] === 'string' && meta[key].trim(), `${id}: ${key} must be a non-empty string`);
  }

  assert(meta.slug === directorySlug, `${id}: slug must match directory name`);
  assert(meta.locale === locale, `${id}: locale must match content directory`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug), `${id}: invalid slug`);
  assert(CONTENT_STATUSES.has(meta.status), `${id}: invalid editorial status`);
  assert(meta.title.length <= 75, `${id}: title exceeds 75 characters`);
  assert(meta.mobileH1 === undefined || (typeof meta.mobileH1 === 'string' && meta.mobileH1.trim().length >= 10 && meta.mobileH1.length <= 75), `${id}: mobileH1 must be 10–75 characters when provided`);
  assert(meta.description.length >= 70 && meta.description.length <= 180, `${id}: description must be 70–180 characters`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.published), `${id}: invalid published date`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.modified), `${id}: invalid modified date`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.reviewed), `${id}: invalid reviewed date`);
  assert(new Date(meta.modified) >= new Date(meta.published), `${id}: modified predates published`);
  assert(new Date(meta.reviewed) >= new Date(meta.modified), `${id}: reviewed predates modified`);
  const today = dateInTimeZone(new Date(), 'Europe/Rome');
  assert(meta.published <= today, `${id}: published date is in the future`);
  assert(meta.modified <= today, `${id}: modified date is in the future`);
  assert(meta.reviewed <= today, `${id}: reviewed date is in the future`);
  assert(meta.author === config.author, `${id}: author must match configured editorial identity`);
  assert(meta.reviewer === config.author, `${id}: reviewer must use the approved real identity`);
  assert(Array.isArray(meta.secondaryKeywords) && meta.secondaryKeywords.length >= 2, `${id}: at least two secondaryKeywords required`);
  assert(Array.isArray(meta.topics) && meta.topics.length >= 2, `${id}: at least two topics required`);
  assert(Array.isArray(meta.related) && meta.related.length >= 2, `${id}: at least two related links required`);
  assert(new Set(meta.secondaryKeywords).size === meta.secondaryKeywords.length, `${id}: secondaryKeywords must be unique`);
  assert(new Set(meta.topics).size === meta.topics.length, `${id}: topics must be unique`);
  assert(new Set(meta.related).size === meta.related.length, `${id}: related links must be unique`);
  assert(Array.isArray(meta.sources), `${id}: sources must be an array`);
  assert(typeof meta.noindex === 'boolean', `${id}: noindex must be boolean`);
  assert(meta.status !== 'published' || meta.noindex === false, `${id}: published page cannot be noindex`);
  assert(meta.status === 'published' || meta.noindex === true, `${id}: non-published page must be noindex`);
  assert(meta.canonical === page.urlPath, `${id}: canonical must exactly match generated route`);
  assert(meta.ogImage.startsWith(`${config.basePath}/`), `${id}: ogImage must use the production base path`);
  assert(APP_FEATURES.has(meta.appFeature), `${id}: unsupported appFeature`);
  assert(meta.relatedCalculator === null || typeof meta.relatedCalculator === 'string', `${id}: relatedCalculator must be a reference or null`);
  assert(Object.hasOwn(CTA_COPY, meta.conversionIntent), `${id}: unknown conversionIntent`);
  assert(
    INTENT_FEATURE_COMPATIBILITY[meta.conversionIntent].has(meta.appFeature),
    `${id}: ${meta.appFeature} is incompatible with conversionIntent ${meta.conversionIntent}`,
  );
  assert(!/^#\s/m.test(markdown), `${id}: body.md must not contain an H1`);
  assert(!/<[A-Za-z][^>]*>/.test(markdown), `${id}: raw HTML is not allowed in Markdown`);
  if (meta.status === 'published') {
    assert(markdown.trim().split(/\s+/).length >= 650, `${id}: published body is too short for a useful page`);
  }
  assert(!/(?:\bTODO\b|\bTBD\b|lorem ipsum|placeholder|da completare)/i.test(markdown), `${id}: placeholder content remains`);
  const claimText = `${meta.title}\n${meta.description}\n${markdown}`;
  for (const pattern of UNSUPPORTED_PRODUCT_CLAIMS) {
    assert(!pattern.test(claimText), `${id}: unsupported product claim matches ${pattern}`);
  }

  for (const source of meta.sources) {
    assert(typeof source.label === 'string' && source.label.trim(), `${id}: source label required`);
    assert(/^https:\/\//.test(source.url), `${id}: source URL must use HTTPS`);
    assert(typeof source.publishedOrUpdated === 'string' && source.publishedOrUpdated.trim(), `${id}: source publishedOrUpdated required`);
    assert(typeof source.geography === 'string' && source.geography.trim(), `${id}: source geography required`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(source.accessedAt), `${id}: source accessedAt must be YYYY-MM-DD`);
    assert(source.accessedAt <= meta.reviewed, `${id}: source accessedAt cannot follow reviewed date`);
    assert(source.accessedAt <= today, `${id}: source accessedAt cannot be in the future`);
    assert(typeof source.supports === 'string' && source.supports.trim(), `${id}: source claim description required`);
  }

  if (section === 'guide') {
    assert(GUIDE_KINDS.has(meta.kind), `${id}: guide section accepts pillar or guide kind`);
    if (meta.kind === 'pillar') {
      assert(meta.pillar === null, `${id}: pillar page must set pillar to null`);
    } else {
      assert(typeof meta.pillar === 'string', `${id}: supporting guide must name a pillar`);
    }
    assert(meta.calculatorId === null, `${id}: guide calculatorId must be null`);
  } else if (section === 'calcolatori') {
    assert(meta.kind === 'calculator', `${id}: calculator section requires calculator kind`);
    assert(['cost-per-km', 'fuel-trip', 'fuel-surcharge'].includes(meta.calculatorId), `${id}: unknown calculatorId`);
    assert(typeof meta.pillar === 'string', `${id}: calculator must name a pillar`);
  } else if (section === 'confronti') {
    assert(meta.kind === 'comparison', `${id}: comparison section requires comparison kind`);
    assert(meta.calculatorId === null, `${id}: comparison calculatorId must be null`);
    assert(typeof meta.pillar === 'string', `${id}: comparison must name a pillar`);
  } else {
    assert(section === 'landing', `${id}: unknown content section`);
    assert(meta.kind === 'landing', `${id}: landing section requires landing kind`);
    assert(meta.calculatorId === null, `${id}: landing calculatorId must be null`);
    assert(meta.pillar === null, `${id}: landing page must not claim a guide pillar`);
  }
}

function dateInTimeZone(value, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function validateRelationships(allPages, byId) {
  for (const page of allPages) {
    const references = [page.meta.pillar, page.meta.relatedCalculator, ...page.meta.related].filter(Boolean);
    for (const reference of references) {
      const targetId = resolveReferenceId(page.locale, reference);
      assert(byId.has(targetId), `${page.id}: unresolved internal reference ${reference}`);
      assert(targetId !== page.id, `${page.id}: page cannot link to itself`);
      if (page.meta.status === 'published' && page.meta.noindex === false) {
        const target = byId.get(targetId);
        assert(target.meta.status === 'published' && target.meta.noindex === false, `${page.id}: published page links to non-indexable content ${reference}`);
      }
    }

    if (page.meta.relatedCalculator) {
      assert(byId.get(resolveReferenceId(page.locale, page.meta.relatedCalculator)).meta.kind === 'calculator', `${page.id}: relatedCalculator must target a calculator`);
      assert(page.meta.related.includes(page.meta.relatedCalculator), `${page.id}: relatedCalculator must also appear in related links`);
    }

    if (page.meta.kind === 'guide') {
      assert(page.meta.related.length <= 5, `${page.id}: supporting guide may contain at most five related links`);
      assert(page.meta.related.includes(page.meta.pillar), `${page.id}: supporting guide must link to its pillar`);
    }
  }

  const translationUrls = new Map();
  for (const page of allPages) {
    const key = `${page.meta.translationGroup}:${page.locale}`;
    assert(!translationUrls.has(key), `${page.id}: duplicate translationGroup within locale`);
    translationUrls.set(key, page.urlPath);
  }
}

function renderPage(page) {
  const isCalculator = page.section === 'calcolatori';
  const isLanding = page.section === 'landing';
  const isEditorial = page.section === 'guide' || page.section === 'confronti';
  const headings = extractHeadings(page.markdown);
  const body = isEditorial
    ? insertMobileConversion(renderMarkdown(page.markdown), page)
    : renderMarkdown(page.markdown);
  const readingMinutes = Math.max(3, Math.ceil(stripMarkdown(page.markdown).split(/\s+/).length / 220));
  const pillar = page.meta.pillar ? pagesById.get(resolveReferenceId(page.locale, page.meta.pillar)) : null;
  const related = page.meta.related.map((reference) => pagesById.get(resolveReferenceId(page.locale, reference)));
  const schema = renderPageSchema(page);

  return `<!doctype html>
<html lang="${escapeHtml(config.locales[page.locale].languageTag)}">
${renderHead({
    title: `${page.meta.title} | ${config.name}`,
    description: page.meta.description,
    canonicalPath: page.urlPath,
    type: isCalculator || isLanding ? 'website' : 'article',
    modified: page.meta.modified,
    published: page.meta.published,
    locale: page.locale,
    ogImage: absoluteUrl(page.meta.ogImage),
    schema,
    calculator: isCalculator,
    alternateLinks: renderAlternateLinks(page),
  })}
<body class="seo-body" data-content-id="${escapeAttr(page.id)}" data-page-type="${escapeAttr(page.meta.kind)}" data-locale="${escapeAttr(page.locale)}">
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  ${isEditorial ? '<div class="reading-progress" aria-hidden="true"><span class="reading-progress__bar"></span></div>' : ''}
  ${renderHeader(page.locale)}
  <main id="contenuto">
    <section class="seo-hero">
      <div class="seo-shell">
        ${renderBreadcrumb(page)}
        <p class="seo-eyebrow">${escapeHtml(page.meta.eyebrow)}</p>
        <h1>${escapeHtml(page.meta.title)}</h1>
        <p class="seo-hero__summary">${escapeHtml(page.meta.description)}</p>
        <div class="seo-meta" aria-label="Informazioni editoriali">
          <span>A cura di ${escapeHtml(page.meta.author)} · ${escapeHtml(config.name)}</span>
          <span>Revisione ${formatDate(page.meta.reviewed)}</span>
          <span>${readingMinutes} min di lettura</span>
        </div>
        ${isLanding ? `<div class="seo-hero__store-cta" aria-label="Scarica RouteBudget"><p>Disponibile per iOS e Android.</p>${renderStoreBadges(page.locale, 'complete_trip_app', 'header')}</div>` : ''}
      </div>
    </section>
    ${isCalculator ? renderCalculator(page) : ''}
    <div class="seo-shell article-layout">
      <div class="article-main">
        ${isEditorial ? renderMobileTableOfContents(headings) : ''}
        <article class="seo-prose">
          ${body}
          ${renderSources(page)}
          <section class="editorial-note" aria-labelledby="nota-editoriale">
            <h2 id="nota-editoriale">Nota editoriale</h2>
            <p>Contenuto operativo curato da RouteBudget EU e rivisto nella data indicata. Esempi e risultati sono stime non vincolanti: usa dati aziendali aggiornati e verifica tariffe, pedaggi e obblighi applicabili alla tratta.</p>
          </section>
        </article>
      </div>
      <aside class="article-rail" aria-label="Approfondimenti e applicazione">
        ${isEditorial ? renderTableOfContents(headings) : ''}
        ${pillar ? renderPillarLink(pillar) : renderHubLink(page.locale)}
        ${renderCta(page)}
      </aside>
    </div>
    ${renderRelated(related)}
  </main>
  ${renderFooter(page.locale)}
</body>
</html>`;
}

function renderHub(locale, section) {
  const localeConfig = config.locales[locale];
  const isGuides = section === 'guide';
  const isCalculators = section === 'calcolatori';
  const sectionPages = pages.filter((page) => page.locale === locale && page.section === section);
  const title = isGuides
    ? 'Guide operative per calcolare costi e tariffe di trasporto'
    : isCalculators
      ? 'Calcolatori per costi camion e viaggi'
      : 'Confronti operativi per decidere prezzo e margine';
  const description = isGuides
    ? 'Guide italiane per autisti, padroncini e piccole imprese: costo chilometrico, preventivi, margine, carburante, pedaggi e costi operativi.'
    : isCalculators
      ? 'Calcolatori gratuiti e trasparenti per stimare costo chilometrico e carburante di un viaggio senza inviare dati a RouteBudget.'
      : 'Confronti trasparenti tra metodi e scenari economici per scegliere una tariffa di trasporto senza classifiche o promesse artificiali.';
  const canonicalPath = hubPath(locale, section);
  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(canonicalPath),
    inLanguage: localeConfig.languageTag,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sectionPages.length,
      itemListElement: sectionPages.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.meta.title,
        url: absoluteUrl(page.urlPath),
      })),
    },
  };

  return `<!doctype html>
<html lang="${escapeHtml(localeConfig.languageTag)}">
${renderHead({
    title: `${title} | ${config.name}`,
    description,
    canonicalPath,
    type: 'website',
    locale,
    ogImage: `${siteUrl}/og-cover.jpg`,
    schema: hubSchema,
  })}
<body class="seo-body" data-content-id="${escapeAttr(`${locale}:${section}:hub`)}" data-page-type="hub" data-locale="${escapeAttr(locale)}">
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  ${renderHeader(locale)}
  <main id="contenuto">
    <section class="seo-hero seo-hero--index">
      <div class="seo-shell">
        <nav class="breadcrumbs" aria-label="Percorso"><a href="${config.basePath}/">RouteBudget</a><span aria-hidden="true">/</span><span aria-current="page">${sectionLabel(section)}</span></nav>
        <p class="seo-eyebrow">Centro operativo · ${escapeHtml(localeConfig.language)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="seo-hero__summary">${escapeHtml(description)}</p>
      </div>
    </section>
    <section class="seo-index seo-shell" aria-label="${isGuides ? 'Guide pubblicate' : isCalculators ? 'Calcolatori disponibili' : 'Confronti pubblicati'}">
      ${renderHubEntries(sectionPages, section)}
    </section>
    <section class="seo-shell index-conversion">
      <div>
        <p class="seo-eyebrow">Quando serve il flusso completo</p>
        <h2>Dalla stima al preventivo, nello stesso calcolo.</h2>
      </div>
      <div>
        <p>RouteBudget riunisce distanza, carburante, pedaggi, autista, usura, margine, scenari e PDF. I contenuti qui spiegano il metodo; l’app lo porta nel lavoro quotidiano.</p>
        ${renderStoreBadges(locale, 'download_app_generic', 'hub')}
      </div>
    </section>
  </main>
  ${renderFooter(locale)}
</body>
</html>`;
}

function renderHubEntries(sectionPages, section) {
  const isGuides = section === 'guide';
  const isCalculators = section === 'calcolatori';
  const sorted = [...sectionPages].sort((a, b) => {
    if (a.meta.kind === 'pillar' && b.meta.kind !== 'pillar') return -1;
    if (a.meta.kind !== 'pillar' && b.meta.kind === 'pillar') return 1;
    return a.meta.title.localeCompare(b.meta.title, 'it');
  });

  if (isGuides) {
    return renderGuidePaths(sorted);
  }

  return `<div class="seo-index__heading">
    <p>${sorted.length} risorse pubblicate</p>
    <span>${isGuides ? 'Pilastri e guide collegate' : isCalculators ? 'Calcolo locale, dati non trasmessi' : 'Metodi e scenari messi a confronto'}</span>
  </div>
  <ol class="editorial-list">
    ${sorted
      .map(
        (page, index) => `<li>
          <span class="editorial-list__number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <p class="editorial-list__type">${page.meta.kind === 'pillar' ? 'Guida pilastro' : page.meta.kind === 'calculator' ? 'Calcolatore' : page.meta.kind === 'comparison' ? 'Confronto operativo' : 'Guida pratica'}</p>
            <h2><a href="${page.urlPath}">${escapeHtml(page.meta.title)}</a></h2>
            <p>${escapeHtml(page.meta.description)}</p>
          </div>
          <a class="editorial-list__action" href="${page.urlPath}" aria-label="Apri: ${escapeAttr(page.meta.title)}">Apri <span aria-hidden="true">↗</span></a>
        </li>`,
      )
      .join('\n')}
  </ol>`;
}

function renderGuidePaths(sectionPages) {
  const pillars = sectionPages.filter((page) => page.meta.kind === 'pillar');
  const guides = sectionPages.filter((page) => page.meta.kind === 'guide');

  return `<div class="seo-index__heading">
    <p>${sectionPages.length} risorse pubblicate</p>
    <span>Tre percorsi: tratta, costi d’impresa, preventivo</span>
  </div>
  <div class="guide-paths">
    ${pillars
      .map((pillar, pathIndex) => {
        const pillarReference = `guide:${pillar.meta.slug}`;
        const children = guides
          .filter((guide) => guide.meta.pillar === pillarReference)
          .sort((a, b) => a.meta.title.localeCompare(b.meta.title, 'it'));
        return `<section class="guide-path" aria-labelledby="guide-path-${escapeAttr(pillar.meta.slug)}">
          <header class="guide-path__header">
            <span class="guide-path__number">${String(pathIndex + 1).padStart(2, '0')}</span>
            <div>
              <p class="editorial-list__type">Percorso operativo</p>
              <h2 id="guide-path-${escapeAttr(pillar.meta.slug)}"><a href="${pillar.urlPath}">${escapeHtml(pillar.meta.title)}</a></h2>
              <p>${escapeHtml(pillar.meta.description)}</p>
            </div>
            <a class="editorial-list__action" href="${pillar.urlPath}" aria-label="Apri il percorso: ${escapeAttr(pillar.meta.title)}">Inizia <span aria-hidden="true">↗</span></a>
          </header>
          <ol class="guide-path__list">
            ${children
              .map(
                (guide, index) => `<li>
                  <span>${String(index + 1).padStart(2, '0')}</span>
                  <div><h3><a href="${guide.urlPath}">${escapeHtml(guide.meta.title)}</a></h3><p>${escapeHtml(guide.meta.description)}</p></div>
                  <a href="${guide.urlPath}" aria-label="Apri: ${escapeAttr(guide.meta.title)}"><span aria-hidden="true">↗</span></a>
                </li>`,
              )
              .join('\n')}
          </ol>
        </section>`;
      })
      .join('\n')}
  </div>`;
}

function renderHead({ title, description, canonicalPath, type, modified, published, locale = 'it', ogImage = `${siteUrl}/og-cover.jpg`, schema, calculator = false, alternateLinks = '' }) {
  const canonical = absoluteUrl(canonicalPath);
  const localeConfig = config.locales[locale];
  const ogLocale = localeConfig.languageTag.replace('-', '_');
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#070B12" />
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    ${alternateLinks}
    <meta property="og:type" content="${escapeAttr(type)}" />
    <meta property="og:locale" content="${escapeAttr(ogLocale)}" />
    <meta property="og:site_name" content="${escapeAttr(config.name)}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:alt" content="${escapeAttr(`${config.name} — ${title}`)}" />
    ${published ? `<meta property="article:published_time" content="${escapeAttr(published)}" />` : ''}
    ${modified ? `<meta property="article:modified_time" content="${escapeAttr(modified)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
    <link rel="icon" type="image/png" href="${config.basePath}/logo-ui.png" />
    <link rel="manifest" href="${config.basePath}/site.webmanifest" />
    <link rel="stylesheet" href="${config.basePath}/seo/seo.css" />
    <script type="application/ld+json">${safeJson(schema)}</script>
    <script src="${config.basePath}/seo/events.js" defer></script>
    ${calculator ? `<script type="module" src="${config.basePath}/seo/calculators.js"></script>` : ''}
    <title>${escapeHtml(title)}</title>
  </head>`;
}

function renderHeader(locale) {
  return `<header class="seo-header">
    <div class="seo-header__inner">
      <a class="seo-brand" href="${config.basePath}/" aria-label="RouteBudget EU, pagina principale">
        <img src="${config.basePath}/logo-ui.png" width="42" height="42" alt="" />
        <span>RouteBudget <small>EU</small></span>
      </a>
      <nav aria-label="Navigazione principale">
        <a href="${hubPath(locale, 'guide')}">Guide</a>
        <a href="${hubPath(locale, 'calcolatori')}">Calcolatori</a>
        ${pages.some((page) => page.locale === locale && page.section === 'confronti') ? `<a href="${hubPath(locale, 'confronti')}">Confronti</a>` : ''}
        <a href="${appLandingPath(locale)}">App</a>
      </nav>
      <a class="seo-header__app" href="${appLandingPath(locale)}">Scopri l’app <span aria-hidden="true">→</span></a>
    </div>
  </header>`;
}

function renderFooter(locale) {
  return `<footer class="seo-footer">
    <div class="seo-shell seo-footer__inner">
      <div>
        <a class="seo-brand" href="${config.basePath}/">
          <img src="${config.basePath}/logo-ui.png" width="38" height="38" loading="lazy" alt="" />
          <span>RouteBudget <small>EU</small></span>
        </a>
        <p>Costi chiari. Decisioni difendibili.</p>
      </div>
      <nav aria-label="Risorse e informazioni legali">
        <a href="${hubPath(locale, 'guide')}">Guide</a>
        <a href="${hubPath(locale, 'calcolatori')}">Calcolatori</a>
        ${pages.some((page) => page.locale === locale && page.section === 'confronti') ? `<a href="${hubPath(locale, 'confronti')}">Confronti</a>` : ''}
        <a href="${appLandingPath(locale)}">App</a>
        <a href="${config.basePath}/privacy.html">Privacy</a>
        <a href="${config.basePath}/terms.html">Termini</a>
      </nav>
      <p>© 2026 ${escapeHtml(config.name)} · ${escapeHtml(config.author)}</p>
    </div>
  </footer>`;
}

function renderBreadcrumb(page) {
  if (page.section === 'landing') {
    return `<nav class="breadcrumbs" aria-label="Percorso">
      <a href="${config.basePath}/">RouteBudget</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${escapeHtml(page.meta.title)}</span>
    </nav>`;
  }
  const label = sectionLabel(page.section);
  return `<nav class="breadcrumbs" aria-label="Percorso">
    <a href="${config.basePath}/">RouteBudget</a>
    <span aria-hidden="true">/</span>
    <a href="${hubPath(page.locale, page.section)}">${label}</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">${escapeHtml(page.meta.title)}</span>
  </nav>`;
}

function renderPillarLink(pillar) {
  return `<section class="rail-link">
    <p class="rail-label">Guida pilastro</p>
    <h2><a href="${pillar.urlPath}">${escapeHtml(pillar.meta.title)}</a></h2>
    <p>${escapeHtml(pillar.meta.description)}</p>
  </section>`;
}

function renderHubLink(locale) {
  return `<section class="rail-link">
    <p class="rail-label">Centro guide</p>
    <h2><a href="${hubPath(locale, 'guide')}">Esplora il metodo completo</a></h2>
    <p>Passa dai singoli costi alla costruzione di una tariffa sostenibile.</p>
  </section>`;
}

function renderCta(page) {
  const copy = CTA_COPY[page.meta.conversionIntent];
  const ctaId = CTA_ID_BY_INTENT[page.meta.conversionIntent];
  return `<section class="app-cta">
    <p class="rail-label">${escapeHtml(copy.eyebrow)}</p>
    <h2>${escapeHtml(copy.title)}</h2>
    <p>${escapeHtml(copy.body)}</p>
    ${renderStoreBadges(page.locale, ctaId, 'article')}
  </section>`;
}

function renderStoreBadges(locale, ctaId, position) {
  const language = locale === 'it' ? 'it' : 'en';
  return `<div class="app-cta__actions store-badge-row">
    <a class="store-badge-link" href="${escapeAttr(config.appStoreUrl)}" target="_blank" rel="noreferrer" aria-label="Scarica RouteBudget su App Store" data-analytics-event="store_outbound" data-analytics-id="${escapeAttr(ctaId)}" data-analytics-position="${escapeAttr(position)}" data-analytics-target="app-store"><img src="${config.basePath}/store-badges/app-store-${language}.svg" width="120" height="40" loading="lazy" alt="Scarica su App Store" /></a>
    <a class="store-badge-link" href="${escapeAttr(config.googlePlayUrl)}" target="_blank" rel="noreferrer" aria-label="Scarica RouteBudget su Google Play" data-analytics-event="store_outbound" data-analytics-id="${escapeAttr(ctaId)}" data-analytics-position="${escapeAttr(position)}" data-analytics-target="google-play"><img src="${config.basePath}/store-badges/google-play-${language}.png" width="129" height="50" loading="lazy" alt="Disponibile su Google Play" /></a>
  </div>`;
}

function renderTableOfContents(headings) {
  const entries = headings.filter((heading) => heading.depth === 2);
  if (entries.length < 2) return '';
  return `<nav class="article-toc" aria-label="Indice della guida">
    <p class="rail-label">In questa guida</p>
    <ol>
      ${entries.map((heading) => `<li><a href="#${escapeAttr(heading.id)}">${escapeHtml(heading.label)}</a></li>`).join('\n')}
    </ol>
  </nav>`;
}

function renderMobileTableOfContents(headings) {
  const entries = headings.filter((heading) => heading.depth === 2);
  if (entries.length < 2) return '';
  return `<details class="mobile-toc">
    <summary><span>Indice della guida</span><b aria-hidden="true">+</b></summary>
    <ol>
      ${entries.map((heading) => `<li><a href="#${escapeAttr(heading.id)}">${escapeHtml(heading.label)}</a></li>`).join('\n')}
    </ol>
  </details>`;
}

function insertMobileConversion(body, page) {
  const firstHeading = body.indexOf('<h2');
  const secondHeading = firstHeading >= 0 ? body.indexOf('<h2', firstHeading + 3) : -1;
  if (secondHeading < 0) return body;
  const copy = CTA_COPY[page.meta.conversionIntent];
  const ctaId = CTA_ID_BY_INTENT[page.meta.conversionIntent];
  const conversion = `<aside class="mobile-inline-cta" aria-label="Continua con RouteBudget">
    <p class="rail-label">${escapeHtml(copy.eyebrow)}</p>
    <p class="mobile-inline-cta__title">${escapeHtml(copy.title)}</p>
    <p>${escapeHtml(copy.body)}</p>
    ${renderStoreBadges(page.locale, ctaId, 'inline')}
  </aside>`;
  return `${body.slice(0, secondHeading)}${conversion}${body.slice(secondHeading)}`;
}

function renderRelated(related) {
  return `<section class="related-section">
    <div class="seo-shell">
      <div class="related-section__heading">
        <p class="seo-eyebrow">Continua il calcolo</p>
        <h2>Passi collegati.</h2>
      </div>
      <div class="related-links">
        ${related
          .map(
            (page, index) => `<a href="${page.urlPath}">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <div><small>${page.section === 'calcolatori' ? 'Calcolatore' : page.section === 'confronti' ? 'Confronto operativo' : page.section === 'landing' ? 'App RouteBudget' : page.meta.kind === 'pillar' ? 'Guida pilastro' : 'Guida pratica'}</small><strong>${escapeHtml(page.meta.title)}</strong></div>
              <b aria-hidden="true">↗</b>
            </a>`,
          )
          .join('\n')}
      </div>
    </div>
  </section>`;
}

function renderSources(page) {
  if (page.meta.sources.length === 0) {
    return '';
  }
  return `<section class="sources" aria-labelledby="fonti-${page.meta.slug}">
    <h2 id="fonti-${page.meta.slug}">Fonti e riferimenti</h2>
    <p>Questi riferimenti aiutano a controllare regole o dati soggetti a variazione. Apri sempre la versione aggiornata prima di usarli in un preventivo.</p>
    <ul>
      ${page.meta.sources.map((source) => `<li><a href="${escapeAttr(source.url)}" rel="noreferrer">${escapeHtml(source.label)}</a><small>${escapeHtml(source.supports)} · ${escapeHtml(source.geography)} · consultata in data ${escapeHtml(formatDate(source.accessedAt))}</small></li>`).join('\n')}
    </ul>
  </section>`;
}

function renderCalculator(page) {
  if (page.meta.calculatorId === 'cost-per-km') {
    return `<section class="calculator-section" aria-labelledby="calculator-title">
      <div class="seo-shell calculator-layout">
        <div class="calculator-intro">
          <p class="seo-eyebrow">Strumento gratuito · calcolo locale</p>
          <h2 id="calculator-title">Stima il costo della tratta per km.</h2>
          <p>Nessun dato del modulo viene inviato a RouteBudget. Inserisci chilometri carichi e a vuoto: il risultato mostra entrambi i denominatori.</p>
        </div>
        <form class="calculator-form" data-calculator="cost-per-km" novalidate>
          <div class="calculator-fields">
            ${numberField('loadedKm', 'Chilometri carichi', 'km', 'es. 500', true)}
            ${numberField('emptyKm', 'Chilometri a vuoto', 'km', 'es. 100', false)}
            ${numberField('fuelConsumption', 'Consumo medio', 'L / 100 km', 'es. 31', true)}
            ${numberField('fuelPrice', 'Prezzo carburante', '€ / L', 'es. 1,75', true)}
            ${numberField('tollCost', 'Pedaggi totali della tratta', '€', 'es. 120', false)}
            ${numberField('operationalHours', 'Ore operative', 'ore', 'es. 9', true)}
            ${numberField('driverHourlyCost', 'Costo autista', '€ / ora', 'es. 25', false)}
            ${numberField('wearPerKm', 'Usura e manutenzione', '€ / km', 'es. 0,18', false)}
            ${numberField('fixedPerKm', 'Quota costi fissi', '€ / km', 'es. 0,20', false)}
          </div>
          <div class="calculator-form__footer">
            <p id="calculator-number-format">Formato numeri: virgola per i decimali (4,5), punto per le migliaia (1.000). I campi facoltativi vuoti valgono zero.</p>
            <div class="calculator-form__actions">
              <button class="button button--quiet" type="reset">Ricomincia</button>
              <button class="button button--primary" type="submit">Calcola il costo per km</button>
            </div>
          </div>
          <div id="calculator-error-${page.meta.calculatorId}" class="calculator-error" role="alert" tabindex="-1" hidden></div>
          <p class="calculator-status seo-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>
          <section class="calculator-result" aria-label="Risultato del calcolo" hidden>
            <div class="calculator-result__lead"><span>Costo operativo stimato</span><strong data-result="totalOperationalCost">—</strong></div>
            <dl>
              <div><dt>Costo per km percorso</dt><dd data-result="costPerTravelledKm">—</dd></div>
              <div><dt>Costo per km carico</dt><dd data-result="costPerLoadedKm">—</dd></div>
              <div><dt>Chilometri totali</dt><dd data-result="totalKm">—</dd></div>
              <div><dt>Carburante</dt><dd data-result="fuelCost">—</dd></div>
              <div><dt>Pedaggi</dt><dd data-result="tollCost">—</dd></div>
              <div><dt>Autista</dt><dd data-result="driverCost">—</dd></div>
              <div><dt>Usura e manutenzione</dt><dd data-result="wearCost">—</dd></div>
              <div><dt>Quota costi fissi</dt><dd data-result="fixedCost">—</dd></div>
            </dl>
            <p>Stima arrotondata. Non è il prezzo da offrire: margine, imposte, rischio e costi non inseriti restano esclusi.</p>
            <div class="calculator-result__cta">
              <p class="rail-label">Dal costo al prezzo sostenibile</p>
              <h3>Completa la tratta in RouteBudget.</h3>
              <p>Aggiungi margine, scenari e preventivo PDF mantenendo insieme tutti i costi della tratta.</p>
              ${renderStoreBadges(page.locale, 'complete_trip_app', 'after_result')}
            </div>
          </section>
        </form>
      </div>
    </section>`;
  }

  if (page.meta.calculatorId === 'fuel-surcharge') {
    return `<section class="calculator-section" aria-labelledby="calculator-title">
      <div class="seo-shell calculator-layout">
        <div class="calculator-intro">
          <p class="seo-eyebrow">Strumento gratuito · calcolo locale</p>
          <h2 id="calculator-title">Calcola l’adeguamento carburante.</h2>
          <p>Confronta due prezzi del gasolio e applica l’incidenza carburante scelta al nolo di riferimento. Nessun dato viene inviato a RouteBudget.</p>
          <p class="calculator-formula"><strong>Formula</strong><span>((prezzo confronto − prezzo riferimento) ÷ prezzo riferimento) × (incidenza ÷ 100) × nolo base</span></p>
        </div>
        <form class="calculator-form" data-calculator="fuel-surcharge" novalidate>
          <div class="calculator-fields calculator-fields--compact">
            ${numberField('baseFreight', 'Nolo di riferimento', '€', 'es. 1200', true)}
            ${numberField('baseFuelPrice', 'Prezzo gasolio di riferimento', '€ / L', 'inserisci', true)}
            ${numberField('currentFuelPrice', 'Prezzo gasolio di confronto', '€ / L', 'inserisci', true)}
            ${numberField('fuelSharePercent', 'Incidenza carburante concordata', '%', 'es. 30', true)}
          </div>
          <div class="calculator-form__footer">
            <p id="calculator-number-format">Formato numeri: virgola per i decimali (1,75), punto per le migliaia (1.000). Usa prezzi con stessa fonte, frequenza, unità e trattamento fiscale.</p>
            <div class="calculator-form__actions">
              <button class="button button--quiet" type="reset">Ricomincia</button>
              <button class="button button--primary" type="submit">Calcola adeguamento</button>
            </div>
          </div>
          <div id="calculator-error-${page.meta.calculatorId}" class="calculator-error" role="alert" tabindex="-1" hidden></div>
          <p class="calculator-status seo-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>
          <section class="calculator-result" aria-label="Risultato del calcolo" hidden>
            <div class="calculator-result__lead"><span>Nolo aggiornato stimato</span><strong data-result="adjustedFreight">—</strong></div>
            <dl>
              <div><dt>Nolo di riferimento</dt><dd data-result="baseFreight">—</dd></div>
              <div><dt>Variazione del gasolio</dt><dd data-result="fuelPriceVariationPercent">—</dd></div>
              <div><dt>Incidenza carburante applicata</dt><dd data-result="fuelSharePercent">—</dd></div>
              <div><dt>Adeguamento sul nolo</dt><dd data-result="freightAdjustmentPercent">—</dd></div>
              <div><dt>Importo dell’adeguamento</dt><dd data-result="adjustmentAmount">—</dd></div>
            </dl>
            <p>Stima matematica, non parere legale o fiscale. Verifica contratto, fonte dei prezzi, periodo, soglie, arrotondamenti e trattamento degli importi prima di usarla.</p>
            <div class="calculator-result__cta">
              <p class="rail-label">Dall’adeguamento alla tratta completa</p>
              <h3>Calcola costi, scenari e PDF in RouteBudget.</h3>
              <p>Questo strumento isola solo la variazione carburante. Nell’app puoi valutare anche pedaggi, autista, usura, ritorno a vuoto e margine.</p>
              ${renderStoreBadges(page.locale, 'add_trip_costs_app', 'after_result')}
            </div>
          </section>
        </form>
      </div>
    </section>`;
  }

  return `<section class="calculator-section" aria-labelledby="calculator-title">
    <div class="seo-shell calculator-layout">
      <div class="calculator-intro">
        <p class="seo-eyebrow">Strumento gratuito · calcolo locale</p>
        <h2 id="calculator-title">Stima litri e costo carburante.</h2>
        <p>Nessun dato del modulo viene inviato a RouteBudget. Puoi aggiungere il ritorno a vuoto senza simulare il resto della tariffa.</p>
      </div>
      <form class="calculator-form" data-calculator="fuel-trip" novalidate>
        <div class="calculator-fields calculator-fields--compact">
          ${numberField('distanceKm', 'Distanza di andata', 'km', 'es. 640', true)}
          ${numberField('fuelConsumption', 'Consumo medio', 'L / 100 km', 'es. 32', true)}
          ${numberField('fuelPrice', 'Prezzo carburante', '€ / L', 'es. 1,75', true)}
          ${numberField('emptyReturnKm', 'Ritorno a vuoto', 'km', 'es. 120', false)}
        </div>
        <div class="calculator-form__footer">
          <p id="calculator-number-format">Formato numeri: virgola per i decimali (1,75), punto per le migliaia (1.000). Il ritorno usa lo stesso consumo medio.</p>
          <div class="calculator-form__actions">
            <button class="button button--quiet" type="reset">Ricomincia</button>
            <button class="button button--primary" type="submit">Calcola carburante</button>
          </div>
        </div>
        <div id="calculator-error-${page.meta.calculatorId}" class="calculator-error" role="alert" tabindex="-1" hidden></div>
        <p class="calculator-status seo-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>
        <section class="calculator-result" aria-label="Risultato del calcolo" hidden>
          <div class="calculator-result__lead"><span>Costo carburante stimato</span><strong data-result="totalFuelCost">—</strong></div>
          <dl>
            <div><dt>Distanza andata</dt><dd data-result="outboundDistanceKm">—</dd></div>
            <div><dt>Distanza ritorno</dt><dd data-result="returnDistanceKm">—</dd></div>
            <div><dt>Chilometri totali</dt><dd data-result="totalDistanceKm">—</dd></div>
            <div><dt>Litri andata</dt><dd data-result="outboundLitres">—</dd></div>
            <div><dt>Litri ritorno</dt><dd data-result="returnLitres">—</dd></div>
            <div><dt>Litri stimati</dt><dd data-result="totalLitres">—</dd></div>
            <div><dt>Costo andata</dt><dd data-result="outboundFuelCost">—</dd></div>
            <div><dt>Costo ritorno a vuoto</dt><dd data-result="returnFuelCost">—</dd></div>
          </dl>
          <p>Stima arrotondata. Pedaggi, autista, usura, soste, margine e altri costi non sono inclusi.</p>
          <div class="calculator-result__cta">
            <p class="rail-label">Dal carburante alla tratta completa</p>
            <h3>Aggiungi pedaggi, autista, usura e margine.</h3>
            <p>RouteBudget riunisce i costi mancanti, confronta gli scenari e prepara il riepilogo PDF.</p>
            ${renderStoreBadges(page.locale, 'add_trip_costs_app', 'after_result')}
          </div>
        </section>
      </form>
    </div>
  </section>`;
}

function numberField(name, label, unit, placeholder, required) {
  const id = `field-${name}`;
  return `<label class="calculator-field" for="${id}">
    <span>${escapeHtml(label)}${required ? ' <b aria-hidden="true">*</b>' : ''}</span>
    <span class="calculator-input"><input id="${id}" name="${name}" type="text" inputmode="decimal" autocomplete="off" aria-describedby="calculator-number-format" placeholder="${escapeAttr(placeholder)}" ${required ? 'required' : ''} /><small>${escapeHtml(unit)}</small></span>
  </label>`;
}

function renderPageSchema(page) {
  const canonical = absoluteUrl(page.urlPath);
  const locale = config.locales[page.locale].languageTag;
  const breadcrumbs = breadcrumbItems(page);
  const wordCount = stripMarkdown(page.markdown).split(/\s+/).length;
  const readingMinutes = Math.max(3, Math.ceil(wordCount / 220));
  const commonGraph = [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#author`,
      name: page.meta.author,
      worksFor: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: config.name,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logo.png`,
      sameAs: [config.appStoreUrl, config.googlePlayUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: config.name,
      inLanguage: locale,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (page.section === 'guide' || page.section === 'confronti') {
    commonGraph.push({
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: page.meta.title,
      description: page.meta.description,
      url: canonical,
      mainEntityOfPage: canonical,
      datePublished: page.meta.published,
      dateModified: page.meta.modified,
      inLanguage: locale,
      author: { '@id': `${siteUrl}/#author` },
      publisher: { '@id': `${siteUrl}/#organization` },
      isPartOf: { '@id': `${siteUrl}/#website` },
      image: absoluteUrl(page.meta.ogImage),
      keywords: [page.meta.primaryKeyword, ...page.meta.secondaryKeywords].join(', '),
      about: page.meta.topics.map((topic) => ({ '@type': 'Thing', name: topic })),
      wordCount,
      timeRequired: `PT${readingMinutes}M`,
      citation: page.meta.sources.map((source) => source.url),
    });
  } else if (page.section === 'calcolatori') {
    commonGraph.push({
      '@type': 'WebApplication',
      '@id': `${canonical}#calculator`,
      name: page.meta.title,
      description: page.meta.description,
      url: canonical,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Qualsiasi browser moderno',
      browserRequirements: 'JavaScript abilitato per il calcolo interattivo',
      isAccessibleForFree: true,
      inLanguage: locale,
      author: { '@id': `${siteUrl}/#author` },
      publisher: { '@id': `${siteUrl}/#organization` },
      isPartOf: { '@id': `${siteUrl}/#website` },
    });
  } else {
    commonGraph.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonical}#application`,
      name: config.name,
      description: page.meta.description,
      url: canonical,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, iOS',
      inLanguage: locale,
      image: absoluteUrl(page.meta.ogImage),
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      isPartOf: { '@id': `${siteUrl}/#website` },
      sameAs: [config.appStoreUrl, config.googlePlayUrl],
    });
  }

  return { '@context': 'https://schema.org', '@graph': commonGraph };
}

function renderAlternateLinks(page) {
  const translations = pages.filter(
    (candidate) => candidate.meta.translationGroup === page.meta.translationGroup,
  );
  if (translations.length < 2) {
    return '';
  }
  const links = translations.map(
    (translation) => `<link rel="alternate" hreflang="${escapeAttr(config.locales[translation.locale].languageTag)}" href="${escapeAttr(absoluteUrl(translation.urlPath))}" />`,
  );
  const italian = translations.find((translation) => translation.locale === 'it');
  if (italian) {
    links.push(`<link rel="alternate" hreflang="x-default" href="${escapeAttr(absoluteUrl(italian.urlPath))}" />`);
  }
  return links.join('\n    ');
}

function renderMarkdown(markdown) {
  const parsed = marked.parse(markdown, { async: false, gfm: true });
  const withHeadingIds = addHeadingIds(String(parsed));
  const sanitized = sanitizeHtml(withHeadingIds, {
    allowedTags: [
      'h2',
      'h3',
      'h4',
      'p',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'a',
      'blockquote',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'code',
      'pre',
      'hr',
      'br',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      th: ['align'],
      td: ['align'],
    },
    allowedSchemes: ['https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: /^https:\/\//.test(attribs.href ?? '')
          ? { ...attribs, rel: 'noreferrer' }
          : attribs,
      }),
    },
  });
  let tableIndex = 0;
  return sanitized.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
    tableIndex += 1;
    return `<div class="table-scroll" tabindex="0" role="region" aria-label="Tabella dati scorrevole ${tableIndex}">${table}</div>`;
  });
}

function extractHeadings(markdown) {
  const counts = new Map();
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{2,4})\s+(.+?)\s*#*$/))
    .filter(Boolean)
    .map((match) => {
      const label = stripMarkdown(match[2]);
      const base = headingSlug(label);
      const count = counts.get(base) ?? 0;
      counts.set(base, count + 1);
      return {
        depth: match[1].length,
        label,
        id: count === 0 ? base : `${base}-${count + 1}`,
      };
    });
}

function addHeadingIds(html) {
  const headings = [];
  return html.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (match, depth, inner) => {
    const label = inner.replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
    const base = headingSlug(label);
    const duplicates = headings.filter((id) => id === base || id.startsWith(`${base}-`)).length;
    const id = duplicates === 0 ? base : `${base}-${duplicates + 1}`;
    headings.push(id);
    return `<h${depth} id="${escapeAttr(id)}">${inner}</h${depth}>`;
  });
}

function headingSlug(value) {
  const slug = String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'sezione';
}

function renderSitemaps() {
  const hubEntries = activeHubs.map(({ locale, section }) => {
    const sectionPages = pages.filter((page) => page.locale === locale && page.section === section);
    return {
      path: hubPath(locale, section),
      lastmod: latestDate(sectionPages.map((page) => page.meta.modified)),
    };
  });
  const groups = {
    'sitemaps/core.xml': [
      { path: `${config.basePath}/`, lastmod: config.coreLastModified },
      ...hubEntries,
      ...pages
        .filter((page) => page.section === 'landing')
        .map((page) => ({ path: page.urlPath, lastmod: page.meta.modified })),
    ],
    'sitemaps/articles-it.xml': pages
      .filter((page) => page.locale === 'it' && ['guide', 'confronti'].includes(page.section))
      .map((page) => ({ path: page.urlPath, lastmod: page.meta.modified })),
    'sitemaps/calculators-it.xml': pages
      .filter((page) => page.locale === 'it' && page.section === 'calcolatori')
      .map((page) => ({ path: page.urlPath, lastmod: page.meta.modified })),
    'sitemaps/legal.xml': [
      { path: `${config.basePath}/privacy.html`, lastmod: config.legalLastModified },
      { path: `${config.basePath}/terms.html`, lastmod: config.legalLastModified },
    ],
  };

  const files = Object.fromEntries(
    Object.entries(groups).map(([relativePath, entries]) => [relativePath, renderUrlSet(entries)]),
  );
  files['sitemap.xml'] = renderSitemapIndex(
    Object.entries(groups).map(([relativePath, entries]) => ({
      path: `${config.basePath}/${relativePath}`,
      lastmod: latestDate(entries.map((entry) => entry.lastmod).filter(Boolean)),
    })),
  );
  return files;
}

function renderUrlSet(entries) {
  const sorted = [...entries].sort((a, b) => a.path.localeCompare(b.path));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sorted
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`,
    )
    .join('\n')}
</urlset>
`;
}

function renderSitemapIndex(entries) {
  const sorted = [...entries].sort((a, b) => a.path.localeCompare(b.path));
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sorted
    .map(
      (entry) => `  <sitemap>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </sitemap>`,
    )
    .join('\n')}
</sitemapindex>
`;
}

function breadcrumbItems(page) {
  if (page.section === 'landing') {
    return [
      { name: 'RouteBudget', url: `${siteUrl}/` },
      { name: page.meta.title, url: absoluteUrl(page.urlPath) },
    ];
  }
  return [
    { name: 'RouteBudget', url: `${siteUrl}/` },
    {
      name: sectionLabel(page.section),
      url: absoluteUrl(hubPath(page.locale, page.section)),
    },
    { name: page.meta.title, url: absoluteUrl(page.urlPath) },
  ];
}

function resolveReferenceId(locale, reference) {
  const [section, slug, extra] = String(reference).split(':');
  assert(SECTION_KEYS.includes(section) && slug && !extra, `Invalid internal reference: ${reference}`);
  return `${locale}:${section}:${slug}`;
}

function pagePath(locale, section, slug) {
  if (section === 'landing') {
    return `${config.basePath}/${locale}/${slug}/`;
  }
  const segment = sectionSegment(locale, section);
  return `${config.basePath}/${locale}/${segment}/${slug}/`;
}

function hubPath(locale, section) {
  assert(HUB_SECTION_KEYS.includes(section), `No hub exists for section: ${section}`);
  const segment = sectionSegment(locale, section);
  return `${config.basePath}/${locale}/${segment}/`;
}

function sectionSegment(locale, section) {
  if (section === 'guide') return config.locales[locale].guideSegment;
  if (section === 'calcolatori') return config.locales[locale].calculatorSegment;
  return config.locales[locale].comparisonSegment;
}

function sectionLabel(section) {
  if (section === 'guide') return 'Guide';
  if (section === 'calcolatori') return 'Calcolatori';
  if (section === 'landing') return 'App';
  return 'Confronti';
}

function appLandingPath(locale) {
  const landing = pages.find((page) => page.locale === locale && page.section === 'landing');
  assert(landing, `${locale}: one published app landing is required`);
  return landing.urlPath;
}

function absoluteUrl(urlPath) {
  return `${config.origin}${urlPath}`;
}

async function writeRoute(urlPath, html) {
  const relative = urlPath.slice(config.basePath.length).replace(/^\//, '');
  const targetDirectory = path.join(OUTPUT_ROOT, relative);
  await mkdir(targetDirectory, { recursive: true });
  const normalizedHtml = `${html.replace(/[ \t]+$/gm, '').trim()}\n`;
  await writeFile(path.join(targetDirectory, 'index.html'), normalizedHtml, 'utf8');
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function latestDate(values) {
  return [...values].sort().at(-1);
}

function safeJson(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function escapeXml(value) {
  return escapeHtml(value);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function byName(a, b) {
  return a.name.localeCompare(b.name);
}
