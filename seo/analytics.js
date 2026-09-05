(() => {
  'use strict';

  // Basic consent mode: no Google code, queue or request exists before opt-in.
  const CONSENT_KEY = 'routebudget-analytics-consent';
  const CONSENT_VERSION = 1;
  const PREFERENCE_MS = 185 * 24 * 60 * 60 * 1000;
  const COOKIE_SECONDS = 180 * 24 * 60 * 60;
  const EVENT_NAME = 'routebudget:analytics';
  const measurementId = document.currentScript?.dataset.measurementId || '';
  const validId = /^G-[A-Z0-9]+$/.test(measurementId);
  const production = window.location.origin === 'https://routebudget.eu';
  const locales = new Set(['it', 'en']);
  const pageTypes = new Set(['landing', 'hub', 'pillar', 'guide', 'calculator', 'comparison', 'product', 'legal']);
  const fields = {
    content_landing_view: { source_class: ['chatgpt', 'organic_search', 'direct', 'referral', 'unknown'] },
    language_select: { target_locale: ['it', 'en'] },
    cta_click: { cta_id: null, cta_position: null, destination: ['internal'] },
    store_outbound_click: { cta_id: null, cta_position: null, destination: ['app_store', 'google_play'] },
    calculator_start: { calculator_id: null },
    calculator_complete: { calculator_id: null },
    calculator_validation_error: { calculator_id: null, error_code: ['required', 'invalid_format', 'invalid_value', 'out_of_range'] },
    pdf_sample_preview: { asset_id: ['preventivo-pdf-sample'], cta_position: null },
    pdf_sample_download: { asset_id: ['preventivo-pdf-sample'], cta_position: null },
  };
  const sharedValues = {
    cta_id: [
      'download_app_generic', 'complete_trip_app', 'add_trip_costs_app', 'compare_scenarios_app',
      'create_pdf_quote', 'continue_unlimited_pro', 'demo-app-store', 'demo-google-play',
      'download-app-store', 'download-google-play', 'hero-app-store', 'hero-google-play',
      'hero-nav-download', 'hero-primary-download', 'hero-product-demo',
      'mobile-menu-app-store', 'mobile-menu-google-play',
    ],
    cta_position: ['inline', 'after_result', 'end', 'header', 'footer'],
    calculator_id: ['cost-per-km', 'fuel-trip', 'fuel-surcharge', 'driving-time', 'minimum-price-margin', 'electric-van-charge-cost'],
  };
  const page = pageMetadata();
  const pageLocation = canonicalLocation();
  const pageReferrer = externalReferrerOrigin();
  let activeLocale = initialLocale();
  let landing = { ...context(), source_class: 'unknown' };
  let landingObserved = false;
  let landingSent = false;
  let choice = readChoice();
  let loadState = 'idle';
  let tag = null;
  let dataLayer = null;
  let expiryTimer = null;
  let loadTimer = null;
  let documentReady = document.readyState === 'complete';
  let tagReady = false;
  const ui = createControls();

  document.addEventListener('DOMContentLoaded', () => {
    documentReady = true;
    activateTag();
  }, { once: true });

  window.addEventListener(EVENT_NAME, (event) => {
    const payload = sanitize(event.detail);
    if (!payload) return;
    if (payload.event === 'content_landing_view') {
      if (!landingObserved && !landingSent) {
        const { event: _event, ...snapshot } = payload;
        landing = snapshot;
        landingObserved = true;
      }
      return;
    }
    if (loadState === 'ready' && hasConsent()) {
      const { event: name, ...params } = payload;
      transmit(name, params);
    }
    // No interaction queue: events before consent or while the tag loads are lost.
  });

  new MutationObserver(() => {
    const next = document.documentElement.lang.split('-')[0];
    if (locales.has(next)) activeLocale = next;
    updateLabels();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.addEventListener('storage', (event) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    if (choice?.status === 'granted' && readChoice()?.status !== 'granted') stopCollection();
  });
  window.addEventListener('pageshow', () => {
    if (choice?.status === 'granted') hasConsent();
  });
  document.addEventListener('visibilitychange', () => {
    if (choice?.status === 'granted') hasConsent();
  });

  // Verify storage remains writable without renewing the original consent date.
  if (choice?.status === 'granted' && saveChoice(choice)) startCollection();
  else {
    if (choice?.status === 'granted') choice = null;
    clearAnalyticsCookies();
  }
  ui.banner.hidden = choice !== null;
  updateLabels();

  function readChoice() {
    try {
      const value = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
      if (!value || Object.keys(value).sort().join(',') !== 'status,updatedAt,version'
        || value.version !== CONSENT_VERSION || !['granted', 'denied'].includes(value.status)
        || !Number.isSafeInteger(value.updatedAt) || value.updatedAt <= 0
        || value.updatedAt > Date.now() || Date.now() - value.updatedAt >= PREFERENCE_MS) return null;
      return value;
    } catch {
      return null;
    }
  }

  function saveChoice(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
      const saved = readChoice();
      return saved?.status === value.status && saved.updatedAt === value.updatedAt;
    } catch {
      return false;
    }
  }

  function hasConsent() {
    if (choice?.status !== 'granted') return false;
    if (readChoice()?.status === 'granted') return true;
    stopCollection();
    return false;
  }

  function startCollection() {
    if (!production || !validId || !page || !pageLocation || loadState !== 'idle' || !hasConsent()) return;
    // Never adopt another script's queue: its payloads have not passed this allowlist.
    if (window.dataLayer !== undefined || window.gtag !== undefined) return;
    loadState = 'loading';
    window[`ga-disable-${measurementId}`] = false;
    dataLayer = [];
    window.dataLayer = dataLayer;
    command('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    command('set', { ads_data_redaction: true, url_passthrough: false });
    tag = document.createElement('script');
    tag.async = true;
    tag.referrerPolicy = 'no-referrer';
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    tag.onload = () => {
      if (loadState !== 'loading' || !hasConsent()) return;
      window.clearTimeout(loadTimer);
      tagReady = true;
      activateTag();
    };
    tag.onerror = failTag;
    loadTimer = window.setTimeout(failTag, 10000);
    document.head.append(tag);
    scheduleExpiry();
  }

  function activateTag() {
    // Deferred/module local-event scripts finish before DOMContentLoaded. Even a
    // cached Google tag must wait for their landing snapshot before configuration.
    if (!tagReady || !documentReady || loadState !== 'loading' || !hasConsent()) return;
    loadState = 'ready';
    command('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    command('js', new Date());
    command('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none', cookie_path: '/', cookie_flags: 'SameSite=Lax;Secure',
      cookie_expires: COOKIE_SECONDS, cookie_update: false,
      page_location: pageLocation, page_referrer: pageReferrer, page_title: page.content_id,
      language: activeLocale,
      ...acquisition(),
      // Suppress automatic URL campaign fields, including private/free-text UTMs.
      campaign_id: '(not set)', campaign_name: '(not set)',
      campaign_term: '(not set)', campaign_content: '(not set)',
    });
    if (!landingSent) {
      landingSent = true;
      const base = context();
      transmit('page_view', base);
      transmit('content_landing_view', { ...base, source_class: landing.source_class });
    }
  }

  function acquisition() {
    // Internal navigation or missing evidence must not overwrite existing GA
    // attribution. The query-free page_location prevents raw UTM fallback.
    if (landing.source_class === 'direct' || landing.source_class === 'unknown') return {};
    const pairs = {
      chatgpt: ['chatgpt.com', 'referral'], organic_search: [searchFamily(), 'organic'],
      referral: ['referral', 'referral'],
    };
    const [source, medium] = pairs[landing.source_class];
    return { campaign_source: source, campaign_medium: medium };
  }

  function searchFamily() {
    try {
      const url = new URL(pageReferrer);
      if (url.port) return 'organic_search';
      const host = url.hostname;
      if (/^(?:www\.)?google\.(?:com|it|co\.uk|de|fr|es|pt|nl|be|at|ch|ie|pl|cz|sk|hu|ro|bg|gr|dk|se|no|fi)$/.test(host)) return 'google';
      if (['bing.com', 'www.bing.com', 'cn.bing.com'].includes(host)) return 'bing';
      if (['duckduckgo.com', 'www.duckduckgo.com', 'html.duckduckgo.com', 'lite.duckduckgo.com'].includes(host)) return 'duckduckgo';
      if (['yahoo.com', 'www.yahoo.com', 'search.yahoo.com', 'it.search.yahoo.com', 'uk.search.yahoo.com', 'fr.search.yahoo.com', 'de.search.yahoo.com', 'es.search.yahoo.com', 'search.yahoo.co.jp'].includes(host)) return 'yahoo';
    } catch { /* Missing source evidence stays a bounded, unverified class. */ }
    return 'organic_search';
  }

  function command() {
    try {
      if (window.dataLayer === dataLayer) dataLayer.push(arguments);
    } catch {
      // Analytics transport never affects the site's controls or links.
    }
  }

  function transmit(name, params) {
    if (loadState !== 'ready' || !hasConsent()) return;
    command('event', name, {
      ...params, send_to: measurementId,
      page_location: pageLocation, page_referrer: pageReferrer, page_title: page.content_id,
    });
  }

  function failTag() {
    if (loadState !== 'loading') return;
    loadState = 'failed';
    window[`ga-disable-${measurementId}`] = true;
    detachTag();
    if (dataLayer) dataLayer.length = 0;
  }

  function detachTag() {
    window.clearTimeout(loadTimer);
    if (tag) {
      tag.onload = null;
      tag.onerror = null;
      tag.remove();
    }
  }

  function stopCollection() {
    const loaded = loadState !== 'idle';
    choice = { status: 'denied', updatedAt: Date.now(), version: CONSENT_VERSION };
    if (validId) window[`ga-disable-${measurementId}`] = true;
    loadState = loaded ? 'stopped' : 'idle';
    window.clearTimeout(expiryTimer);
    detachTag();
    if (dataLayer) dataLayer.length = 0;
    clearAnalyticsCookies();
    // A denied-consent update can itself ping Google. Disable then reload instead.
    // Removing a script alone cannot unload its timers or event listeners.
    if (loaded) window.location.reload();
  }

  function scheduleExpiry() {
    const saved = readChoice();
    if (saved?.status !== 'granted') return stopCollection();
    const remaining = saved.updatedAt + PREFERENCE_MS - Date.now();
    expiryTimer = window.setTimeout(() => {
      if (hasConsent()) scheduleExpiry();
    }, Math.min(remaining, 2147483647));
  }

  function clearAnalyticsCookies() {
    if (!production) return;
    try {
      const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0]);
      const allowed = ['_ga', ...(validId ? [`_ga_${measurementId.slice(2)}`] : [])];
      for (const name of allowed.filter((cookie) => names.includes(cookie))) {
        for (const domain of ['', '; Domain=routebudget.eu', '; Domain=.routebudget.eu']) {
          document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/${domain}; SameSite=Lax; Secure`;
        }
      }
    } catch {
      // The disable flag and reload still stop the runtime if cookies are blocked.
    }
  }

  function context() {
    return { schema_version: 3, locale: activeLocale, content_id: page?.content_id, page_type: page?.page_type };
  }

  function sanitize(detail) {
    try {
      if (!detail || typeof detail !== 'object' || !page) return null;
      const own = (key) => Object.getOwnPropertyDescriptor(detail, key)?.value;
      const name = own('event');
      if (typeof name !== 'string' || !Object.hasOwn(fields, name)
        || own('schema_version') !== 3 || own('content_id') !== page.content_id
        || own('page_type') !== page.page_type || own('locale') !== activeLocale) return null;
      const payload = { event: name, ...context() };
      for (const [key, values] of Object.entries(fields[name])) {
        const value = own(key);
        if (!(values || sharedValues[key]).includes(value)) return null;
        payload[key] = value;
      }
      if (name === 'language_select' && payload.target_locale !== payload.locale) return null;
      return payload;
    } catch {
      return null;
    }
  }

  function pageMetadata() {
    const dataset = document.body.dataset;
    if (dataset.contentId !== undefined || dataset.pageType !== undefined) {
      if (!/^[a-z0-9][a-z0-9:-]{0,119}$/.test(dataset.contentId || '') || !pageTypes.has(dataset.pageType)) return null;
      return { content_id: dataset.contentId, page_type: dataset.pageType };
    }
    const known = {
      '/': ['routebudget-home', 'product'], '/index.html': ['routebudget-home', 'product'],
      '/privacy.html': ['legal:privacy', 'legal'], '/terms.html': ['legal:terms', 'legal'],
      '/it/guide/': ['it:guide:hub', 'hub'], '/it/calcolatori/': ['it:calcolatori:hub', 'hub'],
      '/it/confronti/': ['it:confronti:hub', 'hub'],
    };
    const pair = known[window.location.pathname];
    return Array.isArray(pair) ? { content_id: pair[0], page_type: pair[1] } : null;
  }

  function initialLocale() {
    if (page?.content_id === 'routebudget-home') {
      try {
        const stored = window.localStorage.getItem('routebudget-site-locale');
        if (locales.has(stored)) return stored;
      } catch { /* The functional language preference is optional. */ }
    }
    const markup = document.body.dataset.locale || document.documentElement.lang.split('-')[0];
    return locales.has(markup) ? markup : 'it';
  }

  function canonicalLocation() {
    try {
      const value = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const url = new URL(value);
      const currentPath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
      if (url.origin !== 'https://routebudget.eu' || url.username || url.password
        || url.pathname !== currentPath || !/^\/(?:[a-z0-9/-]*|(?:privacy|terms)\.html)$/.test(url.pathname)) return null;
      return `${url.origin}${url.pathname}`;
    } catch {
      return null;
    }
  }

  function externalReferrerOrigin() {
    try {
      const raw = document.referrer;
      if (!/^https?:\/\//i.test(raw) || /[\u0000-\u0020\u007f]/.test(raw)) return '';
      const url = new URL(raw);
      if (url.username || url.password || url.hostname === 'routebudget.eu' || url.hostname === 'www.routebudget.eu') return '';
      return url.origin;
    } catch {
      return '';
    }
  }

  function createControls() {
    const element = (name, className, parent) => {
      const node = document.createElement(name);
      node.className = className;
      if (parent) parent.append(node);
      return node;
    };
    const banner = element('section', 'rb-analytics-banner');
    banner.id = 'rb-analytics-consent';
    banner.setAttribute('aria-labelledby', 'rb-analytics-title');
    const inner = element('div', 'rb-analytics-inner', banner);
    const title = element('h2', 'rb-analytics-title', inner);
    title.id = 'rb-analytics-title';
    title.tabIndex = -1;
    const description = element('p', 'rb-analytics-description', inner);
    const privacy = element('a', 'rb-analytics-privacy', inner);
    privacy.href = '/privacy.html#website-analytics';
    const actions = element('div', 'rb-analytics-actions', inner);
    const accept = element('button', 'rb-analytics-button', actions);
    const reject = element('button', 'rb-analytics-button', actions);
    accept.type = reject.type = 'button';
    const status = element('p', 'rb-analytics-status', inner);
    status.setAttribute('role', 'status');
    const footer = element('footer', 'rb-analytics-footer');
    const preferences = element('button', 'rb-analytics-button', footer);
    preferences.type = 'button';
    preferences.setAttribute('aria-controls', banner.id);
    preferences.addEventListener('click', () => {
      banner.hidden = false;
      status.textContent = '';
      title.focus({ preventScroll: true });
      banner.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    accept.addEventListener('click', () => {
      const value = { status: 'granted', updatedAt: Date.now(), version: CONSENT_VERSION };
      if (!saveChoice(value)) {
        if (loadState === 'loading' || loadState === 'ready') stopCollection();
        status.textContent = activeLocale === 'en'
          ? 'Your preference could not be saved. Analytics remain off.'
          : 'Impossibile salvare la preferenza. Le analisi restano disattivate.';
        return;
      }
      choice = value;
      banner.hidden = true;
      startCollection();
    });
    reject.addEventListener('click', () => {
      const denied = { status: 'denied', updatedAt: Date.now(), version: CONSENT_VERSION };
      if (!saveChoice(denied)) {
        try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Next load also fails closed if storage is unavailable. */ }
      }
      banner.hidden = true;
      stopCollection();
    });
    document.body.prepend(banner);
    document.body.append(footer);
    return { banner, title, description, privacy, accept, reject, preferences };
  }

  function updateLabels() {
    const english = activeLocale === 'en';
    ui.title.textContent = english ? 'Optional website analytics' : 'Analisi facoltative del sito';
    ui.description.textContent = english
      ? 'With your consent, Google Analytics uses cookies to measure page views and button clicks. No advertising or calculator values. You can reject or withdraw at any time in Analytics preferences. The site works either way.'
      : 'Con il tuo consenso, Google Analytics usa cookie per misurare pagine visitate e clic. Nessuna pubblicità né valori dei calcolatori. Puoi rifiutare o revocare in qualsiasi momento da Preferenze analisi. Il sito funziona in ogni caso.';
    ui.privacy.textContent = english ? 'Website privacy details' : 'Privacy del sito';
    ui.accept.textContent = english ? 'Accept analytics' : 'Accetta analisi';
    ui.reject.textContent = english ? 'Reject analytics' : 'Rifiuta analisi';
    ui.preferences.textContent = english ? 'Analytics preferences' : 'Preferenze analisi';
  }
})();
