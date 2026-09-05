import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(ROOT, 'public/seo/events.js'), 'utf8');

assert(!/(?:fetch\s*\(|sendBeacon|XMLHttpRequest|gtag\s*\(|fbq\s*\()/.test(source), 'local event adapter must not transmit or load analytics');
assert(!/(?:localStorage|sessionStorage)\s*\.\s*(?:setItem|removeItem|clear)\s*\(|document\s*\.\s*cookie/.test(source), 'source classification must not write storage or use cookies');

class FakeControl {
  constructor({ tagName, href = '', dataset = {}, containers = [] }) {
    this.tagName = tagName;
    this.href = href;
    this.dataset = dataset;
    this.containers = containers;
  }

  closest(selector) {
    if (selector.startsWith('a[href], button[data-analytics-id]')) return this;
    if (this.containers.some((container) => selector.includes(container))) return {};
    return null;
  }
}

const sourceCases = [
  ['ChatGPT web', 'https://chatgpt.com/', '', 'chatgpt'],
  ['ChatGPT www', 'https://www.chatgpt.com/c/private-thread?email=private@example.com', '', 'chatgpt'],
  ['ChatGPT HTTP', 'http://chatgpt.com/', '', 'chatgpt'],
  ['ChatGPT default HTTPS port', 'https://chatgpt.com:443/', '', 'chatgpt'],
  ['ChatGPT default HTTP port', 'http://chatgpt.com:80/', '', 'chatgpt'],
  ['ChatGPT uppercase host', 'HTTPS://CHATGPT.COM/', '', 'chatgpt'],
  ['legacy ChatGPT', 'https://chat.openai.com/', '', 'chatgpt'],
  ['legacy ChatGPT HTTP', 'http://chat.openai.com/c/private-thread', '', 'chatgpt'],
  ['ChatGPT suffix spoof', 'https://chatgpt.com.evil.example/', '', 'referral'],
  ['ChatGPT prefix spoof', 'https://notchatgpt.com/', '', 'referral'],
  ['ChatGPT arbitrary subdomain', 'https://evil.chatgpt.com/', '', 'referral'],
  ['legacy ChatGPT suffix spoof', 'https://chat.openai.com.evil.example/', '', 'referral'],
  ['legacy ChatGPT arbitrary subdomain', 'https://www.chat.openai.com/', '', 'referral'],
  ['OpenAI is not ChatGPT', 'https://openai.com/', '', 'referral'],
  ['ChatGPT nonstandard port', 'https://chatgpt.com:8443/', '', 'referral'],
  ['ChatGPT trailing dot not allowlisted', 'https://chatgpt.com./', '', 'referral'],
  ['ChatGPT text in path', 'https://example.com/chatgpt.com/', '', 'referral'],
  ['ChatGPT text in referrer query', 'https://example.com/?utm_source=chatgpt.com', '', 'referral'],
  ['credentials claiming ChatGPT', 'https://chatgpt.com@evil.example/', '', 'unknown'],
  ['credentials on ChatGPT host', 'https://private:secret@chatgpt.com/', '', 'unknown'],
  ['missing referrer', '', '', 'unknown'],
  ['malformed referrer', 'not a URL', '', 'unknown'],
  ['relative referrer', '/chatgpt.com/', '', 'unknown'],
  ['protocol-relative referrer', '//chatgpt.com/', '', 'unknown'],
  ['missing slash referrer', 'https:chatgpt.com', '', 'unknown'],
  ['referrer whitespace', ' https://chatgpt.com/', '', 'unknown'],
  ['referrer control character', 'https://chatgpt.\tcom/', '', 'unknown'],
  ['invalid referrer host', 'https://%zz/', '', 'unknown'],
  ['FTP referrer', 'ftp://chatgpt.com/', '', 'unknown'],
  ['file referrer', 'file://chatgpt.com/private', '', 'unknown'],
  ['JavaScript referrer', 'javascript:alert(1)', '', 'unknown'],
  ['data referrer', 'data:text/plain,https://chatgpt.com', '', 'unknown'],
  ['blob referrer', 'blob:https://chatgpt.com/private', '', 'unknown'],
  ['internal navigation', 'https://routebudget.eu/it/guide/?private=secret', '', 'direct'],
  ['internal HTTP navigation', 'http://routebudget.eu/', '', 'direct'],
  ['internal navigation cannot renew attribution', 'https://routebudget.eu/it/guide/', '?utm_source=chatgpt.com', 'direct'],
  ['internal lookalike', 'https://routebudget.eu.evil.example/', '', 'referral'],
  ['exact UTM without referrer', '', '?utm_source=chatgpt.com', 'chatgpt'],
  ['exact UTM with private fields', '', '?email=private%40example.com&utm_source=chatgpt.com&route=private-route&token=private-token', 'chatgpt'],
  ['encoded exact UTM', '', '?utm_source=chatgpt%2Ecom', 'chatgpt'],
  ['exact UTM with generic referral', 'https://example.com/', '?utm_source=chatgpt.com', 'chatgpt'],
  ['exact UTM with missing trusted referrer', 'not-a-referrer', '?utm_source=chatgpt.com', 'chatgpt'],
  ['exact UTM with search referrer', 'https://www.google.it/', '?utm_source=chatgpt.com', 'chatgpt'],
  ['short UTM is not official signal', '', '?utm_source=chatgpt', 'unknown'],
  ['uppercase UTM value', '', '?utm_source=ChatGPT.com', 'unknown'],
  ['uppercase UTM key', '', '?UTM_SOURCE=chatgpt.com', 'unknown'],
  ['UTM suffix spoof', '', '?utm_source=chatgpt.com.evil.example', 'unknown'],
  ['UTM prefix spoof', '', '?utm_source=notchatgpt.com', 'unknown'],
  ['UTM subdomain', '', '?utm_source=www.chatgpt.com', 'unknown'],
  ['UTM URL rather than value', '', '?utm_source=https%3A%2F%2Fchatgpt.com', 'unknown'],
  ['UTM leading whitespace', '', '?utm_source=+chatgpt.com', 'unknown'],
  ['UTM trailing whitespace', '', '?utm_source=chatgpt.com%20', 'unknown'],
  ['UTM extra path', '', '?utm_source=chatgpt.com%2F', 'unknown'],
  ['UTM empty', '', '?utm_source=', 'unknown'],
  ['UTM missing value', '', '?utm_source', 'unknown'],
  ['unrelated UTM field', '', '?utm_medium=chatgpt.com', 'unknown'],
  ['embedded UTM string', '', '?private=utm_source%3Dchatgpt.com', 'unknown'],
  ['duplicate same source', '', '?utm_source=chatgpt.com&utm_source=chatgpt.com', 'unknown'],
  ['duplicate conflicting source', '', '?utm_source=chatgpt.com&utm_source=evil.example', 'unknown'],
  ['duplicate reversed source', '', '?utm_source=evil.example&utm_source=chatgpt.com', 'unknown'],
  ['malformed percent escape', '', '?utm_source=chatgpt.com&private=%ZZ', 'unknown'],
  ['truncated percent escape', '', '?utm_source=chatgpt.com&private=%', 'unknown'],
  ['invalid query UTF-8', '', '?utm_source=chatgpt.com&private=%C3%28', 'unknown'],
  ['invalid encoded source', '', '?utm_source=chatgpt.com%00', 'unknown'],
  ['fragment does not supply UTM', '', '#utm_source=chatgpt.com', 'unknown'],
  ['valid ChatGPT referrer unaffected by malformed query', 'https://chatgpt.com/', '?utm_source=other&private=%ZZ', 'chatgpt'],
  ['Google global', 'https://www.google.com/search?q=private-query', '', 'organic_search'],
  ['Google Italy', 'https://www.google.it/', '', 'organic_search'],
  ['Google Germany bare host', 'https://google.de/', '', 'organic_search'],
  ['Google UK', 'https://www.google.co.uk/', '', 'organic_search'],
  ['Google France HTTP', 'http://www.google.fr/', '', 'organic_search'],
  ['Google Spain', 'https://www.google.es/', '', 'organic_search'],
  ['Google Poland', 'https://www.google.pl/', '', 'organic_search'],
  ['Google Netherlands', 'https://www.google.nl/', '', 'organic_search'],
  ['Google suffix spoof', 'https://google.evil.com/', '', 'referral'],
  ['Google country suffix spoof', 'https://www.google.it.evil.example/', '', 'referral'],
  ['Google prefix spoof', 'https://notgoogle.com/', '', 'referral'],
  ['Google arbitrary subdomain', 'https://evil.google.com/', '', 'referral'],
  ['Google unknown country domain', 'https://google.invalid/', '', 'referral'],
  ['Google nonstandard port', 'https://google.com:8443/', '', 'referral'],
  ['Bing', 'https://www.bing.com/search?q=private-query', '', 'organic_search'],
  ['Bing bare HTTP', 'http://bing.com/', '', 'organic_search'],
  ['Bing suffix spoof', 'https://bing.evil.com/', '', 'referral'],
  ['Bing arbitrary country domain', 'https://bing.it/', '', 'referral'],
  ['DuckDuckGo', 'https://duckduckgo.com/?q=private-query', '', 'organic_search'],
  ['DuckDuckGo www', 'https://www.duckduckgo.com/', '', 'organic_search'],
  ['DuckDuckGo HTML', 'https://html.duckduckgo.com/html/', '', 'organic_search'],
  ['DuckDuckGo suffix spoof', 'https://duckduckgo.evil.com/', '', 'referral'],
  ['Yahoo search', 'https://search.yahoo.com/', '', 'organic_search'],
  ['Yahoo Italy search', 'https://it.search.yahoo.com/', '', 'organic_search'],
  ['Yahoo UK search', 'https://uk.search.yahoo.com/', '', 'organic_search'],
  ['Yahoo Japan search', 'https://search.yahoo.co.jp/', '', 'organic_search'],
  ['Yahoo suffix spoof', 'https://yahoo.evil.com/', '', 'referral'],
  ['Yahoo country suffix spoof', 'https://it.search.yahoo.com.evil.example/', '', 'referral'],
  ['other external referral', 'https://example.com/private-path?email=private@example.com', '', 'referral'],
];
const classificationFailures = [];
for (const [name, referrer, query, expected] of sourceCases) {
  const fixture = bootAdapter({ referrer, query });
  const landing = fixture.events[0];
  if (landing.source_class !== expected) classificationFailures.push(`${name}: expected ${expected}, got ${landing.source_class}`);
  assert.deepEqual(Object.keys(landing).sort(), ['content_id', 'event', 'locale', 'page_type', 'schema_version', 'source_class'], `${name}: landing must contain only allowlisted fields`);
  assert(!/private|secret|@|https?:|utm_source/.test(JSON.stringify(landing)), `${name}: raw URLs, source tags and private values must never be emitted`);
  assert.equal(fixture.events.length, 1, `${name}: source classification must emit only once`);
}
assert.deepEqual(classificationFailures, [], 'landing source classification regression fixtures');

const harness = bootAdapter({ storedLocale: 'en' });
assert.equal(harness.events.length, 1, 'landing must emit exactly once at startup');
assert.deepEqual(
  harness.events[0],
  {
    event: 'content_landing_view',
    schema_version: 3,
    locale: 'en',
    content_id: 'routebudget-home',
    page_type: 'product',
    source_class: 'unknown',
  },
  'landing payload must use the hydrated home locale and controlled context',
);

harness.documentElement.lang = 'en';
harness.notifyLanguageMutation();
assert.equal(harness.events.length, 1, 'hydrating the stored locale must not emit a false language selection');

harness.documentElement.lang = 'it';
harness.notifyLanguageMutation();
assert.deepEqual(
  harness.events.at(-1),
  {
    event: 'language_select',
    schema_version: 3,
    locale: 'it',
    content_id: 'routebudget-home',
    page_type: 'product',
    target_locale: 'it',
  },
  'a real supported language change must emit once with the new locale',
);

harness.click(new FakeControl({
  tagName: 'A',
  href: 'https://apps.apple.com/app/id6789717191',
  dataset: { analyticsId: 'hero-app-store' },
  containers: ['.hero-navbar'],
}));
assert.deepEqual(
  harness.events.at(-1),
  {
    event: 'store_outbound_click',
    schema_version: 3,
    locale: 'it',
    content_id: 'routebudget-home',
    page_type: 'product',
    cta_id: 'hero-app-store',
    cta_position: 'header',
    destination: 'app_store',
  },
  'store clicks must retain their controlled CTA id and placement',
);

harness.click(new FakeControl({
  tagName: 'BUTTON',
  dataset: { analyticsId: 'hero-product-demo', analyticsPosition: 'inline' },
}));
assert.equal(harness.events.at(-1).event, 'cta_click', 'instrumented non-store buttons must emit cta_click');
assert.equal(harness.events.at(-1).cta_id, 'hero-product-demo');

harness.click(new FakeControl({
  tagName: 'A',
  href: '/seo/preventivo.pdf',
  dataset: {
    analyticsEvent: 'pdf_sample_preview',
    analyticsAssetId: 'preventivo-pdf-sample',
    analyticsPosition: 'end',
  },
}));
assert.equal(harness.events.at(-1).event, 'pdf_sample_preview', 'explicit PDF preview controls must use the PDF contract');
assert.equal(harness.events.at(-1).asset_id, 'preventivo-pdf-sample');

harness.click(new FakeControl({
  tagName: 'A',
  href: '/seo/preventivo.pdf',
  dataset: {
    analyticsEvent: 'pdf_sample_download',
    analyticsAssetId: 'preventivo-pdf-sample',
    analyticsPosition: 'end',
  },
}));
assert.equal(harness.events.at(-1).event, 'pdf_sample_download', 'explicit PDF downloads must use a distinct event');

const eventCount = harness.events.length;
assert.equal(
  harness.window.RouteBudgetAnalytics.emit('calculator_start', { calculator_id: 'unknown-calculator' }),
  false,
  'invalid enum values must be rejected',
);
assert.equal(
  harness.window.RouteBudgetAnalytics.emit('pdf_sample_download', { asset_id: 'private-user-pdf', cta_position: 'end' }),
  false,
  'uncontrolled PDF ids must be rejected',
);
assert.equal(harness.events.length, eventCount, 'rejected payloads must not dispatch browser events');

assert.equal(harness.window.RouteBudgetAnalytics.schemaVersion, 3, 'adapter must expose the versioned contract');
assert.equal(harness.window.RouteBudgetAnalytics.emit('content_landing_view', { source_class: 'unapproved-ai-provider' }), false, 'source classes must remain enumerated');
const chatgptLanding = bootAdapter({ query: '?utm_source=chatgpt.com&email=private@example.com' });
chatgptLanding.window.RouteBudgetAnalytics.emit('calculator_complete', {
  calculator_id: 'fuel-trip',
  source_class: 'chatgpt',
  referrer: 'https://chatgpt.com/private-thread',
  query: 'private-query',
  url: 'https://routebudget.eu/?email=private@example.com',
});
assert.deepEqual(chatgptLanding.events.at(-1), {
  event: 'calculator_complete', schema_version: 3, locale: 'it', content_id: 'routebudget-home', page_type: 'product', calculator_id: 'fuel-trip',
}, 'source classification belongs only to the current landing, never calculator events or arbitrary detail fields');
chatgptLanding.click(new FakeControl({ tagName: 'A', href: 'https://apps.apple.com/app/id6789717191', dataset: { analyticsId: 'hero-app-store' } }));
assert(!Object.hasOwn(chatgptLanding.events.at(-1), 'source_class'), 'store outbound events must not imply source-to-store attribution');
chatgptLanding.documentElement.lang = 'en';
chatgptLanding.notifyLanguageMutation();
assert(!Object.hasOwn(chatgptLanding.events.at(-1), 'source_class'), 'language events must not propagate source attribution');
assert.equal(bootAdapter({ referrer: 'https://routebudget.eu/' }).events[0].source_class, 'direct', 'a new internal document must not inherit ChatGPT attribution');

console.log(`Browser-local event contract passed: ${sourceCases.length} source fixtures, v3 landing-only classification, privacy allowlist, locale hydration, CTA/store, and PDF sample.`);

const touch = bootAdapter({ readingProgress: true, progressMatches: false });
assert.equal(touch.windowListeners.size, 0, 'touch/reduced-motion reading must not install scroll or resize handlers');
assert.equal(touch.progressWrites.length, 0, 'touch reading must not write the progress layer');
touch.setProgressMatches(true);
assert.equal(touch.windowListeners.size, 2, 'desktop can enable progress after a media change');
touch.window.scrollY = 100;
touch.windowListeners.get('scroll')();
touch.windowListeners.get('scroll')();
assert.equal(touch.frames.size, 1, 'scroll events must coalesce into one animation frame');
touch.flushFrames();
assert.equal(touch.progressWrites.at(-1), 'scaleX(0.5)', 'desktop progress must reflect document position');
touch.window.scrollY = -50;
touch.windowListeners.get('scroll')();
touch.flushFrames();
assert.equal(touch.progressWrites.at(-1), 'scaleX(0)', 'rubber-band overscroll must clamp to zero');
touch.window.scrollY = 10_000;
touch.windowListeners.get('scroll')();
touch.flushFrames();
assert.equal(touch.progressWrites.at(-1), 'scaleX(1)', 'bottom overscroll must clamp to one');
touch.windowListeners.get('resize')();
touch.setProgressMatches(false);
assert.equal(touch.frames.size, 0, 'switching to touch/reduced-motion must cancel queued work');
assert.equal(touch.windowListeners.size, 0, 'switching modes must detach both listeners');
assert.equal(touch.progressWrites.at(-1), null, 'disabled progress must clear its inline transform');
touch.setProgressMatches(true);
assert.equal(touch.windowListeners.size, 2, 're-enabling desktop progress must not duplicate listeners');
console.log('Reading motion passed: zero touch scroll work, desktop coalescing, overscroll bounds, media changes, and cancellation.');

function bootAdapter({ storedLocale, readingProgress = false, progressMatches = true, referrer = '', query = '' } = {}) {
  const events = [];
  const listeners = new Map();
  const windowListeners = new Map();
  const frames = new Map();
  const progressWrites = [];
  let frameId = 0;
  let mediaCallback;
  const progressMedia = {
    matches: progressMatches,
    addEventListener: (_name, callback) => { mediaCallback = callback; },
  };
  const progressBar = { style: {
    set transform(value) { progressWrites.push(value); },
    removeProperty: () => progressWrites.push(null),
  } };
  let mutationCallback = null;
  const documentElement = { lang: 'it', scrollHeight: 1_000 };
  const document = {
    body: {
      dataset: {
        contentId: 'routebudget-home',
        locale: 'it',
        pageType: 'product',
      },
    },
    documentElement,
    referrer,
    querySelector: () => readingProgress ? progressBar : null,
    addEventListener: (name, listener) => listeners.set(name, listener),
  };
  class FakeCustomEvent {
    constructor(type, options) {
      this.type = type;
      this.detail = options.detail;
    }
  }
  class FakeMutationObserver {
    constructor(callback) {
      mutationCallback = callback;
    }

    observe() {}
  }
  const window = {
    innerHeight: 800,
    scrollY: 0,
    location: new URL(`https://routebudget.eu/${query}`),
    localStorage: { getItem: (key) => {
      assert.equal(key, 'routebudget-site-locale', 'the existing locale preference is the only permitted storage read');
      return storedLocale;
    } },
    dispatchEvent: (event) => events.push({ ...event.detail }),
    matchMedia: () => progressMedia,
    requestAnimationFrame: (callback) => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: (id) => frames.delete(id),
    addEventListener: (name, callback) => windowListeners.set(name, callback),
    removeEventListener: (name) => windowListeners.delete(name),
  };

  vm.runInNewContext(source, {
    CustomEvent: FakeCustomEvent,
    Element: FakeControl,
    MutationObserver: FakeMutationObserver,
    URL,
    URLSearchParams,
    console,
    document,
    window,
  }, { filename: 'events.js' });

  return {
    windowListeners,
    frames,
    progressWrites,
    setProgressMatches(matches) { progressMedia.matches = matches; mediaCallback(); },
    flushFrames() {
      const queued = [...frames.values()];
      frames.clear();
      queued.forEach((callback) => callback());
    },
    click(control) {
      listeners.get('click')({ target: control });
    },
    documentElement,
    events,
    notifyLanguageMutation() {
      mutationCallback();
    },
    window,
  };
}
