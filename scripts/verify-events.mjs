import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(ROOT, 'public/seo/events.js'), 'utf8');

assert(!/(?:fetch\s*\(|sendBeacon|XMLHttpRequest|gtag\s*\(|fbq\s*\()/.test(source), 'local event adapter must not transmit or load analytics');

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

const harness = bootAdapter({ storedLocale: 'en' });
assert.equal(harness.events.length, 1, 'landing must emit exactly once at startup');
assert.deepEqual(
  harness.events[0],
  {
    event: 'content_landing_view',
    schema_version: 2,
    locale: 'en',
    content_id: 'routebudget-home',
    page_type: 'product',
    source_class: 'direct',
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
    schema_version: 2,
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
    schema_version: 2,
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

console.log('Browser-local event contract passed: locale hydration, CTA/store, PDF sample, and allowlist enforcement.');

function bootAdapter({ storedLocale }) {
  const events = [];
  const listeners = new Map();
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
    referrer: '',
    querySelector: () => null,
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
    location: { hostname: 'routebudget.eu', pathname: '/' },
    localStorage: { getItem: (key) => key === 'routebudget-site-locale' ? storedLocale : null },
    dispatchEvent: (event) => events.push({ ...event.detail }),
    requestAnimationFrame: (callback) => callback(),
    addEventListener() {},
  };

  vm.runInNewContext(source, {
    CustomEvent: FakeCustomEvent,
    Element: FakeControl,
    MutationObserver: FakeMutationObserver,
    URL,
    console,
    document,
    window,
  }, { filename: 'events.js' });

  return {
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
