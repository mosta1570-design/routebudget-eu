(() => {
  const EVENT_NAME = 'routebudget:analytics';
  const SCHEMA_VERSION = 2;
  const HOME_LOCALE_KEY = 'routebudget-site-locale';
  const SUPPORTED_LOCALES = new Set(['it', 'en']);
  const PAGE_TYPES = new Set(['landing', 'hub', 'pillar', 'guide', 'calculator', 'comparison', 'product', 'legal']);
  const CTA_IDS = new Set([
    'download_app_generic',
    'complete_trip_app',
    'add_trip_costs_app',
    'compare_scenarios_app',
    'create_pdf_quote',
    'continue_unlimited_pro',
    'demo-app-store',
    'demo-google-play',
    'download-app-store',
    'download-google-play',
    'hero-app-store',
    'hero-google-play',
    'hero-nav-download',
    'hero-primary-download',
    'hero-product-demo',
    'mobile-menu-app-store',
    'mobile-menu-google-play',
  ]);
  const PDF_SAMPLE_IDS = new Set(['preventivo-pdf-sample']);
  const EVENT_FIELDS = {
    content_landing_view: ['source_class'],
    language_select: ['target_locale'],
    cta_click: ['cta_id', 'cta_position', 'destination'],
    store_outbound_click: ['cta_id', 'cta_position', 'destination'],
    calculator_start: ['calculator_id'],
    calculator_complete: ['calculator_id'],
    calculator_validation_error: ['calculator_id', 'error_code'],
    pdf_sample_preview: ['asset_id', 'cta_position'],
    pdf_sample_download: ['asset_id', 'cta_position'],
  };
  const REQUIRED_FIELDS = {
    content_landing_view: ['source_class'],
    language_select: ['target_locale'],
    cta_click: ['cta_id', 'cta_position', 'destination'],
    store_outbound_click: ['cta_id', 'cta_position', 'destination'],
    calculator_start: ['calculator_id'],
    calculator_complete: ['calculator_id'],
    calculator_validation_error: ['calculator_id', 'error_code'],
    pdf_sample_preview: ['asset_id', 'cta_position'],
    pdf_sample_download: ['asset_id', 'cta_position'],
  };
  const VALUE_RULES = {
    source_class: (value) => ['organic_search', 'direct', 'referral', 'unknown'].includes(value),
    target_locale: (value) => SUPPORTED_LOCALES.has(value),
    cta_id: (value) => CTA_IDS.has(value),
    cta_position: (value) => ['inline', 'after_result', 'end', 'header', 'footer'].includes(value),
    destination: (value) => ['internal', 'app_store', 'google_play'].includes(value),
    calculator_id: (value) => [
      'cost-per-km',
      'fuel-trip',
      'fuel-surcharge',
      'driving-time',
      'minimum-price-margin',
      'electric-van-charge-cost',
    ].includes(value),
    error_code: (value) => ['required', 'invalid_format', 'invalid_value', 'out_of_range'].includes(value),
    asset_id: (value) => PDF_SAMPLE_IDS.has(value),
  };
  let activeLocale = initialPageLocale();

  function pageContext() {
    const pageType = document.body?.dataset.pageType || inferPageType(window.location.pathname);
    const contentId = document.body?.dataset.contentId || inferContentId(window.location.pathname, pageType);
    return {
      schema_version: SCHEMA_VERSION,
      locale: SUPPORTED_LOCALES.has(activeLocale) ? activeLocale : 'it',
      content_id: /^[a-z0-9:-]+$/.test(contentId) ? contentId : 'routebudget-home',
      page_type: PAGE_TYPES.has(pageType) ? pageType : 'product',
    };
  }

  function emit(event, detail = {}) {
    const allowedFields = EVENT_FIELDS[event];
    if (!allowedFields) return false;

    const payload = { event, ...pageContext() };
    for (const field of allowedFields) {
      const value = detail[field];
      if (VALUE_RULES[field]?.(value)) payload[field] = value;
    }
    if (REQUIRED_FIELDS[event].some((field) => !Object.hasOwn(payload, field))) return false;

    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: Object.freeze(payload) }));
    return true;
  }

  Object.defineProperty(window, 'RouteBudgetAnalytics', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.freeze({ emit, eventName: EVENT_NAME, schemaVersion: SCHEMA_VERSION }),
  });

  emit('content_landing_view', { source_class: classifySource(document.referrer) });

  const readingProgress = document.querySelector('.reading-progress__bar');
  if (readingProgress) {
    let progressFrame = null;
    const updateReadingProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      readingProgress.style.transform = `scaleX(${progress})`;
      progressFrame = null;
    };
    const requestReadingProgress = () => {
      if (progressFrame === null) progressFrame = window.requestAnimationFrame(updateReadingProgress);
    };
    updateReadingProgress();
    window.addEventListener('scroll', requestReadingProgress, { passive: true });
    window.addEventListener('resize', requestReadingProgress);
  }

  document.addEventListener('click', (event) => {
    const control = event.target instanceof Element
      ? event.target.closest('a[href], button[data-analytics-id], [data-analytics-event^="pdf_sample_"]')
      : null;
    if (!control) return;

    const destination = control.tagName === 'A' ? classifyStoreDestination(control.href) : null;

    if (destination) {
      emit('store_outbound_click', {
        cta_id: CTA_IDS.has(control.dataset.analyticsId)
          ? control.dataset.analyticsId
          : 'download_app_generic',
        cta_position: inferPosition(control),
        destination,
      });
      return;
    }

    if (['pdf_sample_preview', 'pdf_sample_download'].includes(control.dataset.analyticsEvent)) {
      emit(control.dataset.analyticsEvent, {
        asset_id: control.dataset.analyticsAssetId,
        cta_position: inferPosition(control),
      });
      return;
    }

    if (control.dataset.analyticsEvent === 'cta_click'
      || (control.tagName === 'BUTTON' && CTA_IDS.has(control.dataset.analyticsId))) {
      emit('cta_click', {
        cta_id: control.dataset.analyticsId,
        cta_position: inferPosition(control),
        destination: 'internal',
      });
    }
  });

  let previousLanguage = activeLocale;
  new MutationObserver(() => {
    const nextLanguage = document.documentElement.lang.split('-')[0];
    if (!SUPPORTED_LOCALES.has(nextLanguage)) return;
    activeLocale = nextLanguage;
    if (nextLanguage !== previousLanguage) {
      emit('language_select', { target_locale: nextLanguage });
      previousLanguage = nextLanguage;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  function initialPageLocale() {
    const markupLocale = document.body?.dataset.locale
      || document.documentElement.lang.split('-')[0]
      || 'it';
    if (document.body?.dataset.contentId !== 'routebudget-home') {
      return SUPPORTED_LOCALES.has(markupLocale) ? markupLocale : 'it';
    }
    try {
      const storedLocale = window.localStorage.getItem(HOME_LOCALE_KEY);
      if (SUPPORTED_LOCALES.has(storedLocale)) return storedLocale;
    } catch {
      // Storage may be unavailable in privacy-restricted contexts.
    }
    return SUPPORTED_LOCALES.has(markupLocale) ? markupLocale : 'it';
  }

  function inferPageType(pathname) {
    if (pathname.endsWith('/privacy.html') || pathname.endsWith('/terms.html')) return 'legal';
    if (/\/(guide|calcolatori|confronti)\/$/.test(pathname)) return 'hub';
    if (pathname.includes('/calcolatori/')) return 'calculator';
    if (pathname.includes('/confronti/')) return 'comparison';
    if (pathname.includes('/guide/')) return 'guide';
    return 'product';
  }

  function inferContentId(pathname, pageType) {
    if (pageType === 'product') return 'routebudget-home';
    const parts = pathname.split('/').filter(Boolean);
    const slug = parts.at(-1)?.replace(/\.html$/, '') || pageType;
    return `${pageType}:${slug}`.replace(/[^a-z0-9:-]/g, '-');
  }

  function classifySource(referrer) {
    if (!referrer) return 'direct';
    try {
      const host = new URL(referrer).hostname;
      if (host === window.location.hostname) return 'direct';
      if (/(^|\.)(google|bing|duckduckgo|yahoo)\./i.test(host)) return 'organic_search';
      return 'referral';
    } catch {
      return 'unknown';
    }
  }

  function classifyStoreDestination(href) {
    try {
      const origin = new URL(href).origin;
      if (origin === 'https://play.google.com') return 'google_play';
      if (origin === 'https://apps.apple.com') return 'app_store';
    } catch {
      // Invalid URLs are never trusted store destinations.
    }
    return null;
  }

  function inferPosition(control) {
    const declared = control.dataset.analyticsPosition;
    if (['inline', 'after_result', 'end', 'header', 'footer'].includes(declared)) return declared;
    if (control.closest('header, .hero-navbar')) return 'header';
    if (control.closest('footer, .mobile-nav-overlay__footer')) return 'footer';
    if (control.closest('.calculator-result')) return 'after_result';
    if (control.closest('.app-cta, .index-conversion, .freight-download, .demo-overlay__stores')) return 'end';
    return 'inline';
  }
})();
