(() => {
  const EVENT_NAME = 'routebudget:analytics';
  const SCHEMA_VERSION = 1;
  const PAGE_TYPES = new Set(['landing', 'hub', 'pillar', 'guide', 'calculator', 'comparison', 'product', 'legal']);
  const CTA_IDS = new Set([
    'download_app_generic',
    'complete_trip_app',
    'add_trip_costs_app',
    'compare_scenarios_app',
    'create_pdf_quote',
    'continue_unlimited_pro',
  ]);
  const EVENT_FIELDS = {
    content_landing_view: ['source_class'],
    language_select: ['target_locale'],
    cta_click: ['cta_id', 'cta_position', 'destination'],
    store_outbound_click: ['cta_id', 'cta_position', 'destination'],
    calculator_start: ['calculator_id'],
    calculator_complete: ['calculator_id'],
    calculator_validation_error: ['calculator_id', 'error_code'],
  };
  const VALUE_RULES = {
    source_class: (value) => ['organic_search', 'direct', 'referral', 'unknown'].includes(value),
    target_locale: (value) => /^[a-z]{2}$/.test(value),
    cta_id: (value) => CTA_IDS.has(value),
    cta_position: (value) => ['inline', 'after_result', 'end', 'header', 'footer'].includes(value),
    destination: (value) => ['internal', 'app_store', 'google_play'].includes(value),
    calculator_id: (value) => ['cost-per-km', 'fuel-trip'].includes(value),
    error_code: (value) => ['required', 'invalid_format', 'invalid_value', 'out_of_range'].includes(value),
  };

  function pageContext() {
    const locale = document.body?.dataset.locale || document.documentElement.lang.split('-')[0] || 'it';
    const pageType = document.body?.dataset.pageType || inferPageType(window.location.pathname);
    const contentId = document.body?.dataset.contentId || inferContentId(window.location.pathname, pageType);
    return {
      schema_version: SCHEMA_VERSION,
      locale: /^[a-z]{2}$/.test(locale) ? locale : 'it',
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

  document.addEventListener('click', (event) => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor) return;

    const destination = classifyStoreDestination(anchor.href);

    if (destination) {
      emit('store_outbound_click', {
        cta_id: CTA_IDS.has(anchor.dataset.analyticsId)
          ? anchor.dataset.analyticsId
          : 'download_app_generic',
        cta_position: inferPosition(anchor),
        destination,
      });
      return;
    }

    if (anchor.dataset.analyticsEvent === 'cta_click') {
      emit('cta_click', {
        cta_id: anchor.dataset.analyticsId,
        cta_position: inferPosition(anchor),
        destination: 'internal',
      });
    }
  });

  let previousLanguage = pageContext().locale;
  new MutationObserver(() => {
    const nextLanguage = document.documentElement.lang.split('-')[0];
    if (nextLanguage && nextLanguage !== previousLanguage) {
      emit('language_select', { target_locale: nextLanguage });
      previousLanguage = nextLanguage;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

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

  function inferPosition(anchor) {
    const declared = anchor.dataset.analyticsPosition;
    if (['inline', 'after_result', 'end', 'header', 'footer'].includes(declared)) return declared;
    if (anchor.closest('header')) return 'header';
    if (anchor.closest('footer')) return 'footer';
    if (anchor.closest('.calculator-result')) return 'after_result';
    if (anchor.closest('.app-cta, .index-conversion')) return 'end';
    return 'inline';
  }
})();
