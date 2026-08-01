import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_ROOT = path.join(ROOT, 'content');
const OUTPUT_FLAG = process.argv.indexOf('--out');
const OUTPUT_ROOT = path.resolve(
  ROOT,
  OUTPUT_FLAG >= 0 && process.argv[OUTPUT_FLAG + 1] ? process.argv[OUTPUT_FLAG + 1] : 'dist',
);

const SECTION_KEYS = ['guide', 'calcolatori', 'confronti'];
const GUIDE_KINDS = new Set(['pillar', 'guide']);
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
    eyebrow: 'Archivio operativo',
    title: 'Salva calcoli senza limite.',
    body: 'Riapri le tratte, aggiorna le ipotesi e conserva uno storico locale nel flusso completo RouteBudget.',
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
const siteUrl = `${config.origin}${config.basePath}`;
const pages = await loadPages();
const pagesById = new Map(pages.map((page) => [page.id, page]));
const activeHubs = Object.keys(config.locales).flatMap((locale) =>
  SECTION_KEYS
    .filter((section) => pages.some((page) => page.locale === locale && page.section === section))
    .map((section) => ({ locale, section })),
);

validateConfig(config);
validateRelationships(pages, pagesById);

await Promise.all([
  ...pages.map((page) => writeRoute(page.urlPath, renderPage(page))),
  ...activeHubs.map(({ locale, section }) =>
    writeRoute(hubPath(locale, section), renderHub(locale, section)),
  ),
]);

await writeFile(path.join(OUTPUT_ROOT, 'sitemap.xml'), renderSitemap(), 'utf8');
await writeFile(
  path.join(OUTPUT_ROOT, 'content-manifest.json'),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pages: pages.map(({ id, urlPath, meta }) => ({
        id,
        url: absoluteUrl(urlPath),
        title: meta.title,
        primaryKeyword: meta.primaryKeyword,
        modified: meta.modified,
      })),
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`Generated ${pages.length} content pages, ${activeHubs.length} hubs, and sitemap.xml.`);

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
  for (const page of loaded) {
    assert(!ids.has(page.id), `${page.id}: duplicate page id`);
    assert(!canonicals.has(page.urlPath), `${page.id}: duplicate canonical path`);
    ids.add(page.id);
    canonicals.add(page.urlPath);
  }

  return loaded.sort((a, b) => a.urlPath.localeCompare(b.urlPath, 'it'));
}

function validateConfig(value) {
  assert(typeof value.name === 'string' && value.name.length > 0, 'site.json: name required');
  assert(/^https:\/\//.test(value.origin), 'site.json: HTTPS origin required');
  assert(/^\/[a-z0-9-]+$/.test(value.basePath), 'site.json: basePath must be one clean path segment');
  assert(value.locales && typeof value.locales === 'object', 'site.json: locales required');
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
    'primaryKeyword',
    'searchIntent',
    'conversionIntent',
    'translationGroup',
  ];

  for (const key of requiredStrings) {
    assert(typeof meta[key] === 'string' && meta[key].trim(), `${id}: ${key} must be a non-empty string`);
  }

  assert(meta.slug === directorySlug, `${id}: slug must match directory name`);
  assert(meta.locale === locale, `${id}: locale must match content directory`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug), `${id}: invalid slug`);
  assert(meta.title.length <= 90, `${id}: title exceeds 90 characters`);
  assert(meta.description.length >= 70 && meta.description.length <= 180, `${id}: description must be 70–180 characters`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.published), `${id}: invalid published date`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.modified), `${id}: invalid modified date`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.reviewed), `${id}: invalid reviewed date`);
  assert(new Date(meta.modified) >= new Date(meta.published), `${id}: modified predates published`);
  assert(Array.isArray(meta.topics) && meta.topics.length >= 2, `${id}: at least two topics required`);
  assert(Array.isArray(meta.related) && meta.related.length >= 2, `${id}: at least two related links required`);
  assert(Array.isArray(meta.sources), `${id}: sources must be an array`);
  assert(Object.hasOwn(CTA_COPY, meta.conversionIntent), `${id}: unknown conversionIntent`);
  assert(!/^#\s/m.test(markdown), `${id}: body.md must not contain an H1`);
  assert(!/<[A-Za-z][^>]*>/.test(markdown), `${id}: raw HTML is not allowed in Markdown`);
  assert(markdown.trim().split(/\s+/).length >= 450, `${id}: body is too short for a useful page`);

  for (const source of meta.sources) {
    assert(typeof source.label === 'string' && source.label.trim(), `${id}: source label required`);
    assert(/^https:\/\//.test(source.url), `${id}: source URL must use HTTPS`);
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
    assert(['cost-per-km', 'fuel-trip'].includes(meta.calculatorId), `${id}: unknown calculatorId`);
    assert(typeof meta.pillar === 'string', `${id}: calculator must name a pillar`);
  } else {
    assert(meta.kind === 'comparison', `${id}: comparison section requires comparison kind`);
    assert(meta.calculatorId === null, `${id}: comparison calculatorId must be null`);
    assert(typeof meta.pillar === 'string', `${id}: comparison must name a pillar`);
  }
}

function validateRelationships(allPages, byId) {
  for (const page of allPages) {
    const references = [page.meta.pillar, ...page.meta.related].filter(Boolean);
    for (const reference of references) {
      const targetId = resolveReferenceId(page.locale, reference);
      assert(byId.has(targetId), `${page.id}: unresolved internal reference ${reference}`);
      assert(targetId !== page.id, `${page.id}: page cannot link to itself`);
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
  const body = renderMarkdown(page.markdown);
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
    type: isCalculator ? 'website' : 'article',
    modified: page.meta.modified,
    schema,
    calculator: isCalculator,
    alternateLinks: renderAlternateLinks(page),
  })}
<body class="seo-body" data-content-id="${escapeAttr(page.id)}" data-page-type="${escapeAttr(page.meta.kind)}" data-locale="${escapeAttr(page.locale)}">
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  ${renderHeader(page.locale)}
  <main id="contenuto">
    <section class="seo-hero">
      <div class="seo-shell">
        ${renderBreadcrumb(page)}
        <p class="seo-eyebrow">${escapeHtml(page.meta.eyebrow)}</p>
        <h1>${escapeHtml(page.meta.title)}</h1>
        <p class="seo-hero__summary">${escapeHtml(page.meta.description)}</p>
        <div class="seo-meta" aria-label="Informazioni editoriali">
          <span>A cura di ${escapeHtml(config.author)} · ${escapeHtml(config.name)}</span>
          <span>Revisione ${formatDate(page.meta.reviewed)}</span>
          <span>${readingMinutes} min di lettura</span>
        </div>
      </div>
    </section>
    ${isCalculator ? renderCalculator(page) : ''}
    <div class="seo-shell article-layout">
      <article class="seo-prose">
        ${body}
        ${renderSources(page)}
        <section class="editorial-note" aria-labelledby="nota-editoriale">
          <h2 id="nota-editoriale">Nota editoriale</h2>
          <p>Contenuto operativo curato da RouteBudget EU e rivisto nella data indicata. Esempi e risultati sono stime non vincolanti: usa dati aziendali aggiornati e verifica tariffe, pedaggi e obblighi applicabili alla tratta.</p>
        </section>
      </article>
      <aside class="article-rail" aria-label="Approfondimenti e applicazione">
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
  };

  return `<!doctype html>
<html lang="${escapeHtml(localeConfig.languageTag)}">
${renderHead({
    title: `${title} | ${config.name}`,
    description,
    canonicalPath,
    type: 'website',
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
        <a class="button button--primary" href="${escapeAttr(config.googlePlayUrl)}" data-analytics-event="store_outbound" data-analytics-id="download_app_generic" data-analytics-position="end" data-analytics-target="google-play">Scarica RouteBudget</a>
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

function renderHead({ title, description, canonicalPath, type, modified, schema, calculator = false, alternateLinks = '' }) {
  const canonical = absoluteUrl(canonicalPath);
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#070B12" />
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    ${alternateLinks}
    <meta property="og:type" content="${escapeAttr(type)}" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:site_name" content="${escapeAttr(config.name)}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${siteUrl}/og-cover.jpg" />
    ${modified ? `<meta property="article:modified_time" content="${escapeAttr(modified)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/png" href="${config.basePath}/logo.png" />
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
        <img src="${config.basePath}/logo.png" width="42" height="42" alt="" />
        <span>RouteBudget <small>EU</small></span>
      </a>
      <nav aria-label="Navigazione principale">
        <a href="${hubPath(locale, 'guide')}">Guide</a>
        <a href="${hubPath(locale, 'calcolatori')}">Calcolatori</a>
        ${pages.some((page) => page.locale === locale && page.section === 'confronti') ? `<a href="${hubPath(locale, 'confronti')}">Confronti</a>` : ''}
        <a href="${config.basePath}/#prodotto">Prodotto</a>
      </nav>
      <a class="seo-header__app" href="${escapeAttr(config.googlePlayUrl)}" data-analytics-event="store_outbound" data-analytics-id="download_app_generic" data-analytics-position="header" data-analytics-target="google-play">Apri l’app <span aria-hidden="true">↗</span></a>
    </div>
  </header>`;
}

function renderFooter(locale) {
  return `<footer class="seo-footer">
    <div class="seo-shell seo-footer__inner">
      <div>
        <a class="seo-brand" href="${config.basePath}/">
          <img src="${config.basePath}/logo.png" width="38" height="38" loading="lazy" alt="" />
          <span>RouteBudget <small>EU</small></span>
        </a>
        <p>Costi chiari. Decisioni difendibili.</p>
      </div>
      <nav aria-label="Risorse e informazioni legali">
        <a href="${hubPath(locale, 'guide')}">Guide</a>
        <a href="${hubPath(locale, 'calcolatori')}">Calcolatori</a>
        ${pages.some((page) => page.locale === locale && page.section === 'confronti') ? `<a href="${hubPath(locale, 'confronti')}">Confronti</a>` : ''}
        <a href="${config.basePath}/privacy.html">Privacy</a>
        <a href="${config.basePath}/terms.html">Termini</a>
      </nav>
      <p>© 2026 ${escapeHtml(config.name)} · ${escapeHtml(config.author)}</p>
    </div>
  </footer>`;
}

function renderBreadcrumb(page) {
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
    <div class="app-cta__actions">
      <a class="button button--primary" href="${escapeAttr(config.googlePlayUrl)}" data-analytics-event="store_outbound" data-analytics-id="${escapeAttr(ctaId)}" data-analytics-position="end" data-analytics-target="google-play">Google Play <span aria-hidden="true">↗</span></a>
      <a class="button button--quiet" href="${escapeAttr(config.appStoreUrl)}" data-analytics-event="store_outbound" data-analytics-id="${escapeAttr(ctaId)}" data-analytics-position="end" data-analytics-target="app-store">App Store <span aria-hidden="true">↗</span></a>
    </div>
  </section>`;
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
              <div><small>${page.section === 'calcolatori' ? 'Calcolatore' : page.section === 'confronti' ? 'Confronto operativo' : page.meta.kind === 'pillar' ? 'Guida pilastro' : 'Guida pratica'}</small><strong>${escapeHtml(page.meta.title)}</strong></div>
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
      ${page.meta.sources.map((source) => `<li><a href="${escapeAttr(source.url)}" rel="noreferrer">${escapeHtml(source.label)}</a></li>`).join('\n')}
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
            <p>I campi facoltativi vuoti valgono zero. Usa valori aziendali, non medie generiche.</p>
            <div class="calculator-form__actions">
              <button class="button button--quiet" type="reset">Ricomincia</button>
              <button class="button button--primary" type="submit">Calcola il costo per km</button>
            </div>
          </div>
          <div class="calculator-error" role="alert" tabindex="-1" hidden></div>
          <p class="calculator-status seo-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>
          <output class="calculator-result" hidden>
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
          </output>
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
          <p>Il ritorno usa lo stesso consumo medio: correggilo nei tuoi dati se il mezzo scarico consuma diversamente.</p>
          <div class="calculator-form__actions">
            <button class="button button--quiet" type="reset">Ricomincia</button>
            <button class="button button--primary" type="submit">Calcola carburante</button>
          </div>
        </div>
        <div class="calculator-error" role="alert" tabindex="-1" hidden></div>
        <p class="calculator-status seo-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></p>
        <output class="calculator-result" hidden>
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
        </output>
      </form>
    </div>
  </section>`;
}

function numberField(name, label, unit, placeholder, required) {
  const id = `field-${name}`;
  return `<label class="calculator-field" for="${id}">
    <span>${escapeHtml(label)}${required ? ' <b aria-hidden="true">*</b>' : ''}</span>
    <span class="calculator-input"><input id="${id}" name="${name}" type="text" inputmode="decimal" autocomplete="off" placeholder="${escapeAttr(placeholder)}" ${required ? 'required' : ''} /><small>${escapeHtml(unit)}</small></span>
  </label>`;
}

function renderPageSchema(page) {
  const canonical = absoluteUrl(page.urlPath);
  const locale = config.locales[page.locale].languageTag;
  const breadcrumbs = breadcrumbItems(page);
  const commonGraph = [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#author`,
      name: config.author,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: config.name,
      inLanguage: locale,
      publisher: { '@id': `${siteUrl}/#author` },
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

  if (page.section !== 'calcolatori') {
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
      publisher: { '@id': `${siteUrl}/#author` },
      isPartOf: { '@id': `${siteUrl}/#website` },
      keywords: [page.meta.primaryKeyword, ...page.meta.topics].join(', '),
      citation: page.meta.sources.map((source) => source.url),
    });
  } else {
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
      isPartOf: { '@id': `${siteUrl}/#website` },
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
  return sanitizeHtml(String(parsed), {
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
}

function renderSitemap() {
  const hubEntries = activeHubs.map(({ locale, section }) => {
    const sectionPages = pages.filter((page) => page.locale === locale && page.section === section);
    return {
      path: hubPath(locale, section),
      lastmod: latestDate(sectionPages.map((page) => page.meta.modified)),
    };
  });
  const entries = [
    { path: `${config.basePath}/`, lastmod: latestDate(pages.map((page) => page.meta.modified)) },
    { path: `${config.basePath}/privacy.html` },
    { path: `${config.basePath}/terms.html` },
    ...hubEntries,
    ...pages.map((page) => ({ path: page.urlPath, lastmod: page.meta.modified })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`,
    )
    .join('\n')}
</urlset>
`;
}

function breadcrumbItems(page) {
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
  const segment = sectionSegment(locale, section);
  return `${config.basePath}/${locale}/${segment}/${slug}/`;
}

function hubPath(locale, section) {
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
  return 'Confronti';
}

function absoluteUrl(urlPath) {
  return `${config.origin}${urlPath}`;
}

async function writeRoute(urlPath, html) {
  const relative = urlPath.slice(config.basePath.length).replace(/^\//, '');
  const targetDirectory = path.join(OUTPUT_ROOT, relative);
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(path.join(targetDirectory, 'index.html'), html, 'utf8');
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
