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

function bootAdapter({ storedLocale, readingProgress = false, progressMatches = true }) {
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
    referrer: '',
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
    location: { hostname: 'routebudget.eu', pathname: '/' },
    localStorage: { getItem: (key) => key === 'routebudget-site-locale' ? storedLocale : null },
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
