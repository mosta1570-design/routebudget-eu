import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(ROOT, 'public/seo/analytics.js'), 'utf8');
const localEvents = await readFile(path.join(ROOT, 'public/seo/events.js'), 'utf8');
const css = await readFile(path.join(ROOT, 'public/seo/analytics.css'), 'utf8');
const KEY = 'routebudget-analytics-consent';
const ID = 'G-TEST12345';
const NOW = Date.UTC(2026, 8, 5);
const TTL = 185 * 24 * 60 * 60 * 1000;
const COOKIE_TTL = 180 * 24 * 60 * 60;
const saved = (status = 'granted', updatedAt = NOW) => JSON.stringify({ status, updatedAt, version: 1 });
const clean = (value) => JSON.parse(JSON.stringify(value));

assert(!/(?:fetch\s*\(|sendBeacon|XMLHttpRequest|preconnect|dns-prefetch)/.test(source), 'adapter has no direct transport or speculative Google connection');
assert(!/addEventListener\(['"](?:scroll|resize)['"]/.test(source), 'consent UI installs no scrolling work');
assert(!/(?:position\s*:\s*(?:fixed|sticky)|backdrop-filter|transform\s*:|animation\s*:|transition\s*:)/.test(css), 'consent UI has no compositor/animated layers');

const fresh = boot();
assert.equal(fresh.network.length, 0, 'no network before consent');
assert.equal(fresh.window.dataLayer, undefined, 'no Google queue before consent');
assert.equal(fresh.cookiesWritten.length, 0, 'no analytics cookie before consent');
assert.equal(fresh.banner.hidden, false);
assert.equal(fresh.nodes('rb-analytics-button').length, 3, 'accept, reject and persistent preferences are available');
assert.equal(fresh.accept.className, fresh.reject.className, 'accept/reject have identical prominence');
fresh.emit('calculator_complete', { calculator_id: 'fuel-trip' });
fresh.emit('store_outbound_click', { cta_id: 'hero-app-store', cta_position: 'header', destination: 'app_store' });
fresh.reject.click();
assert.equal(fresh.network.length, 0, 'reject sends no consent ping or Google request');
assert.equal(fresh.eventCommands().length, 0, 'reject never transmits local interactions');
assert.equal(fresh.banner.hidden, true);
assert.deepEqual(JSON.parse(fresh.storage.get(KEY)), { status: 'denied', updatedAt: NOW, version: 1 }, 'only functional enum/date/version is persisted');
fresh.preferences.click();
assert.equal(fresh.banner.hidden, false, 'footer can reopen preferences after rejection');
assert.equal(fresh.focused().id, 'rb-analytics-title');
fresh.accept.click();
assert.equal(fresh.network.length, 1, 'an explicit later opt-in loads Google once');
assert.equal(fresh.network[0].src, `https://www.googletagmanager.com/gtag/js?id=${ID}`);
assert.equal(fresh.network[0].referrerPolicy, 'no-referrer', 'tag request does not leak document URL in Referer');
assert.equal(fresh.eventCommands().length, 0, 'no collection while tag is still loading');
fresh.emit('calculator_start', { calculator_id: 'fuel-trip' });
fresh.completeLoad();
assert.deepEqual(fresh.eventCommands().map((command) => command[1]), ['page_view', 'content_landing_view'], 'one page view and one separate landing event; no pre-consent/loading replay');
assert.equal(fresh.eventCommands()[1][2].source_class, 'chatgpt');
assert(!Object.hasOwn(fresh.eventCommands()[0][2], 'source_class'), 'source class exists only on content_landing_view');

const config = fresh.commands().find((command) => command[0] === 'config')[2];
assert.equal(config.send_page_view, false);
assert.equal(config.allow_google_signals, false);
assert.equal(config.allow_ad_personalization_signals, false);
assert.equal(config.cookie_expires, COOKIE_TTL);
assert.equal(config.cookie_update, false);
assert.equal(config.cookie_domain, 'none');
assert.equal(config.page_location, 'https://routebudget.eu/');
assert.equal(config.page_referrer, 'https://chatgpt.com');
assert.equal(config.page_title, 'routebudget-home');
assert.equal(config.campaign_source, 'chatgpt.com');
assert.equal(config.campaign_medium, 'referral');
for (const key of ['id', 'name', 'term', 'content']) assert.equal(config[`campaign_${key}`], '(not set)', 'raw UTM fields cannot override controlled campaign settings');
for (const command of fresh.commands().filter((item) => item[0] === 'consent')) {
  assert.equal(command[2].ad_storage, 'denied');
  assert.equal(command[2].ad_user_data, 'denied');
  assert.equal(command[2].ad_personalization, 'denied');
}
assert.deepEqual(fresh.commands().filter((item) => item[0] === 'consent').map((item) => item[2].analytics_storage), ['denied', 'granted']);
assert(!/private|secret|@|utm_source|calculator_value/.test(JSON.stringify(fresh.commands())), 'URL, title, campaign query, referrer path and free text never enter GA commands');

const previous = fresh.eventCommands().length;
fresh.emit('calculator_complete', { calculator_id: 'fuel-trip', calculator_value: 'private-value', source_class: 'chatgpt', user_id: 'secret', page_location: 'https://evil.example', event_callback: () => { throw Error('must not run'); } });
assert.equal(fresh.eventCommands().length, previous + 1);
assert.deepEqual(Object.keys(fresh.eventCommands().at(-1)[2]).sort(), ['calculator_id', 'content_id', 'locale', 'page_location', 'page_referrer', 'page_title', 'page_type', 'schema_version', 'send_to'], 'outbound mapping copies only approved fields');
const good = { event: 'calculator_complete', schema_version: 3, content_id: 'routebudget-home', page_type: 'product', locale: 'it', calculator_id: 'fuel-trip' };
for (const forged of [
  { ...good, event: '__proto__' }, { ...good, event: 'constructor' }, { ...good, event: 'purchase' },
  { ...good, schema_version: '3' }, { ...good, content_id: 'secret' }, { ...good, content_id: '../private' },
  { ...good, page_type: 'calculator' }, { ...good, locale: 'en' }, { ...good, locale: 'it;private' },
  { ...good, calculator_id: 'private-input' }, { ...good, calculator_id: ['fuel-trip'] },
  { ...good, event: 'language_select', target_locale: 'en' },
  { ...good, event: 'cta_click', cta_id: 'hero-app-store', cta_position: 'header', destination: 'app_store' },
  { ...good, event: 'store_outbound_click', cta_id: 'hero-app-store', cta_position: 'header', destination: 'internal' },
  { ...good, event: 'pdf_sample_download', asset_id: 'private-pdf', cta_position: 'end' },
  Object.create(good), null, 'secret', 3,
]) {
  const count = fresh.eventCommands().length;
  fresh.dispatch(forged);
  assert.equal(fresh.eventCommands().length, count, 'malformed or context-mismatched CustomEvent is dropped');
}
let getterCalls = 0;
const getter = { ...good };
Object.defineProperty(getter, 'calculator_id', { get() { getterCalls += 1; throw new Error('private'); } });
fresh.dispatch(getter);
assert.equal(getterCalls, 0, 'forged accessor properties are not evaluated');
const proxy = new Proxy({}, { getOwnPropertyDescriptor() { throw Error('hostile proxy'); } });
assert.doesNotThrow(() => fresh.dispatch(proxy), 'hostile proxies cannot break the site');

const stable = fresh.eventCommands().length;
fresh.emit('content_landing_view', { source_class: 'organic_search' });
fresh.preferences.click();
fresh.accept.click();
assert.equal(fresh.eventCommands().length, stable, 'repeated consent and forged later landings cannot duplicate acquisition');
assert.equal(fresh.network.length, 1);

const integrated = boot({ runEvents: true, storedLocale: 'en' });
integrated.accept.click();
integrated.completeLoad();
assert.equal(integrated.eventCommands()[0][2].locale, 'en', 'home hydration uses existing functional locale');
integrated.setLanguage('en');
assert.equal(integrated.eventCommands().length, 2, 'hydration creates no false language selection');
integrated.setLanguage('it');
assert.equal(integrated.eventCommands().at(-1)[1], 'language_select');
assert.equal(integrated.accept.textContent, 'Accetta analisi');
const storeCount = integrated.eventCommands().length;
const click = integrated.storeClick();
assert.equal(integrated.eventCommands().length, storeCount + 1, 'real local click contract maps one event per activation');
assert.equal(integrated.eventCommands().at(-1)[1], 'store_outbound_click');
assert.equal(click.prevented, false, 'outbound analytics never blocks navigation');
assert.equal(integrated.eventCommands().filter((item) => item[1] === 'page_view').length, 1, 'SPA language rerender does not send another page view');

for (const phase of ['before consent', 'while loading']) {
  const fixture = boot({ runEvents: true });
  if (phase === 'while loading') fixture.accept.click();
  fixture.setLanguage('en');
  if (phase === 'before consent') fixture.accept.click();
  fixture.completeLoad();
  const initialEvents = fixture.eventCommands();
  const initialConfig = fixture.commands().find((command) => command[0] === 'config')[2];
  assert.equal(initialConfig.language, 'en', `${phase}: config uses the currently displayed language`);
  assert.deepEqual(initialEvents.map((command) => command[1]), ['page_view', 'content_landing_view'], `${phase}: no language interaction replay or duplicate initial events`);
  assert(initialEvents.every((command) => command[2].locale === 'en'), `${phase}: both initial events use current context, not the early landing locale`);
  assert.equal(initialEvents[1][2].source_class, 'chatgpt', `${phase}: the original bounded landing source remains unchanged`);
}

for (const [name, options] of [
  ['missing id', { id: '' }], ['invalid id', { id: 'G-TEST&private=1' }], ['wrong id case', { id: 'g-test' }],
  ['localhost', { url: 'http://localhost:4173/' }], ['preview', { url: 'https://preview.example/' }],
  ['www', { url: 'https://www.routebudget.eu/' }], ['HTTP', { url: 'http://routebudget.eu/' }],
  ['foreign canonical', { canonical: 'https://evil.example/' }], ['missing canonical', { canonical: null }],
  ['unrelated canonical', { canonical: 'https://routebudget.eu/secret/' }],
  ['invalid metadata', { dataset: { contentId: 'private@value', pageType: 'product' } }],
  ['unknown page without metadata', { dataset: {}, url: 'https://routebudget.eu/arbitrary/', canonical: 'https://routebudget.eu/arbitrary/' }],
  ['unapproved existing queue', { existingLayer: [{ private: 'secret' }] }],
]) {
  const fixture = boot(options);
  fixture.accept.click();
  assert.equal(fixture.network.length, 0, `${name}: collector fails closed`);
}

for (const record of [
  saved('denied'), saved('granted', NOW - TTL), saved('granted', NOW + 1),
  '{broken', JSON.stringify({ status: 'granted', updatedAt: NOW, version: 2 }),
  JSON.stringify({ status: 'granted', updatedAt: NOW, version: 1, user_id: 'secret' }),
  JSON.stringify({ status: 'accepted', updatedAt: NOW, version: 1 }),
]) {
  const fixture = boot({ consent: record });
  assert.equal(fixture.network.length, 0, 'denied, expired, future, malformed or unknown consent never activates collection');
}
const returning = boot({ consent: saved('granted', NOW - 1000) });
assert.equal(returning.network.length, 1, 'valid saved consent may start loading on a later page');
assert.equal(JSON.parse(returning.storage.get(KEY)).updatedAt, NOW - 1000, 'return visits do not renew consent');
returning.completeLoad();
returning.advance(TTL);
returning.emit('calculator_start', { calculator_id: 'fuel-trip' });
assert.equal(returning.reloads(), 1, 'expiry disables an already running tag and reloads');
assert.equal(returning.window[`ga-disable-${ID}`], true);
assert.equal(boot({ consent: saved('granted', NOW - COOKIE_TTL * 1000) }).network.length, 1, '180-day-old consent remains valid: preference and cookie durations are separate');
assert.equal(boot({ consent: saved('denied', NOW - COOKIE_TTL * 1000) }).banner.hidden, true, '180-day-old rejection must not re-prompt');
assert.equal(boot({ consent: saved('denied', NOW - TTL) }).banner.hidden, false, '185-day-old rejection may show the choices again');

const earlyLoad = boot({ consent: saved(), readyState: 'interactive', noLanding: true });
earlyLoad.completeLoad();
assert.equal(earlyLoad.eventCommands().length, 0, 'cached Google load waits for deferred local scripts');
earlyLoad.emit('content_landing_view', { source_class: 'organic_search' });
earlyLoad.documentLoaded();
assert.equal(earlyLoad.eventCommands()[1][2].source_class, 'organic_search');
assert.equal(earlyLoad.eventCommands().filter((item) => item[1] === 'page_view').length, 1);

for (const options of [{ readError: true }, { writeError: true }, { readError: true, writeError: true }, { consent: saved(), writeError: true }]) {
  const fixture = boot(options);
  fixture.accept.click();
  assert.equal(fixture.network.length, 0, 'storage error fails closed, even with a previously granted record');
  fixture.reject.click();
  assert.equal(fixture.banner.hidden, true, 'storage failure never forces acceptance or blocks dismissing the banner');
}
const quotaRevoke = boot({ consent: saved() });
quotaRevoke.completeLoad();
quotaRevoke.setWriteError(true);
quotaRevoke.reject.click();
assert.equal(quotaRevoke.storage.has(KEY), false, 'failed refusal write removes the old grant where storage allows removal');
assert.equal(quotaRevoke.reloads(), 1);
const failedRenewal = boot({ consent: saved() });
failedRenewal.completeLoad();
failedRenewal.setWriteError(true);
failedRenewal.preferences.click();
failedRenewal.accept.click();
assert.equal(failedRenewal.reloads(), 1, 'a failed preference write while active disables the runtime immediately');
assert.equal(failedRenewal.window[`ga-disable-${ID}`], true);

const pending = boot();
pending.accept.click();
const staleLoad = pending.network[0].onload;
pending.reject.click();
staleLoad();
assert.equal(pending.eventCommands().length, 0, 'revoke-before-onload cannot revive collection');
assert.equal(pending.network[0].removed, true);
assert.equal(pending.reloads(), 1);
assert.equal(pending.window[`ga-disable-${ID}`], true);

const blocked = boot();
blocked.accept.click();
blocked.emit('calculator_complete', { calculator_id: 'fuel-trip' });
blocked.network[0].onerror();
blocked.preferences.click();
blocked.accept.click();
assert.equal(blocked.eventCommands().length, 0, 'blocked tag has no event backlog');
assert.equal(blocked.window.dataLayer.length, 0, 'failed tag clears even its initialization queue');
assert.equal(blocked.network.length, 1, 'blocked tag is not retried');
const timeout = boot();
timeout.accept.click();
timeout.fireTimer(10000);
timeout.completeLoad();
assert.equal(timeout.eventCommands().length, 0, 'tag timeout cannot leave a collecting queue');

const revoked = boot({ consent: saved(), cookie: '_ga=client; _ga_TEST12345=session; _ga_OTHER=unrelated; functional=keep' });
revoked.completeLoad();
revoked.reject.click();
assert.equal(revoked.reloads(), 1, 'withdrawal unloads the Google runtime');
assert.equal(revoked.cookiesWritten.length, 6, 'known GA cookies are expired at host and root-domain scopes');
assert(revoked.cookiesWritten.every((value) => /^_ga(?:_TEST12345)?=; Max-Age=0;/.test(value)));
assert.equal(revoked.cookie(), '_ga_OTHER=unrelated; functional=keep', 'withdrawal preserves unrelated cookies');
const networkAfterRevocation = revoked.network.length;
revoked.emit('calculator_complete', { calculator_id: 'fuel-trip' });
assert.equal(revoked.network.length, networkAfterRevocation);
assert.equal(revoked.eventCommands().length, 0, 'withdrawal clears the queue and stops all later calls');
const otherTab = boot({ consent: saved() });
otherTab.completeLoad();
otherTab.storage.set(KEY, saved('denied'));
otherTab.window.dispatchEvent({ type: 'storage', key: KEY });
assert.equal(otherTab.reloads(), 1, 'refusal in another tab revokes the current runtime');

for (const [referrer, expected] of [
  ['https://example.com/private?email=secret#private', 'https://example.com'],
  ['http://example.com:8080/private', 'http://example.com:8080'],
  ['https://routebudget.eu/private?secret', ''], ['https://www.routebudget.eu/private', ''],
  ['https://private:secret@example.com/', ''], ['javascript:secret', ''], ['//example.com/secret', ''],
  ['https://example.\tcom/secret', ''], ['not a URL', ''], ['', ''],
]) {
  const fixture = boot({ consent: saved(), referrer });
  fixture.completeLoad();
  assert.equal(fixture.eventCommands()[0][2].page_referrer, expected, 'referrer is external HTTP(S) origin only');
}
for (const [sourceClass, referrer, expectedSource, expectedMedium] of [
  ['chatgpt', '', 'chatgpt.com', 'referral'],
  ['organic_search', 'https://www.google.it/search?q=private', 'google', 'organic'],
  ['organic_search', 'https://google.co.uk/', 'google', 'organic'],
  ['organic_search', 'https://www.bing.com/', 'bing', 'organic'],
  ['organic_search', 'https://html.duckduckgo.com/html/?q=private', 'duckduckgo', 'organic'],
  ['organic_search', 'https://it.search.yahoo.com/', 'yahoo', 'organic'],
  ['organic_search', 'https://google.com.evil.example/', 'organic_search', 'organic'],
  ['organic_search', 'https://www.google.it:8080/', 'organic_search', 'organic'],
  ['organic_search', '', 'organic_search', 'organic'],
  ['referral', 'https://private-free-text.example/', 'referral', 'referral'],
  ['direct', 'https://routebudget.eu/it/guide/?private=secret', undefined, undefined],
  ['unknown', '', undefined, undefined],
]) {
  const fixture = boot({ consent: saved(), sourceClass, referrer });
  fixture.completeLoad();
  const params = fixture.commands().find((command) => command[0] === 'config')[2];
  assert.equal(params.campaign_source, expectedSource, 'acquisition source is a bounded class, never raw UTM text');
  assert.equal(params.campaign_medium, expectedMedium);
  if (expectedSource === undefined) {
    assert(!Object.hasOwn(params, 'campaign_source') && !Object.hasOwn(params, 'campaign_medium'), 'internal navigation and absent source evidence must not set synthetic acquisition labels');
    assert.equal(params.page_location, 'https://routebudget.eu/', 'omitted campaign overrides still use a query-free canonical');
    assert.equal(params.page_referrer, '', 'internal and absent referrers do not create external source evidence');
    assert(!/private|secret|utm_/.test(JSON.stringify(params)), 'omitting source overrides must not expose raw campaign fields');
  }
}
for (const [url, id, type] of [
  ['/privacy.html', 'legal:privacy', 'legal'], ['/terms.html', 'legal:terms', 'legal'],
  ['/it/guide/', 'it:guide:hub', 'hub'], ['/', 'routebudget-home', 'product'],
]) {
  const fixture = boot({ consent: saved(), dataset: {}, url: `https://routebudget.eu${url}`, canonical: `https://routebudget.eu${url}`, noLanding: true });
  fixture.completeLoad();
  assert.equal(fixture.eventCommands()[0][2].content_id, id, 'static pages without events.js have stable fallback context');
  assert.equal(fixture.eventCommands()[0][2].page_type, type);
  assert.equal(fixture.eventCommands()[1][2].source_class, 'unknown', 'fallback never invents source evidence');
}

console.log('Consent GA4 adapter passed: no pre-consent transport, strict context/enum allowlist, one nonblocking store event, canonical/referrer minimization, locale/legal fallback, expiry, blocked tags, storage failure and revocation.');

function boot(options = {}) {
  let now = NOW;
  let readError = options.readError || false;
  let writeError = options.writeError || false;
  let reloads = 0;
  let focused = null;
  let cookie = options.cookie || '';
  const storage = new Map();
  if (options.consent) storage.set(KEY, options.consent);
  if (options.storedLocale) storage.set('routebudget-site-locale', options.storedLocale);
  const elements = [];
  const mutations = [];
  const network = [];
  const cookiesWritten = [];
  const timers = new Map();
  const listeners = () => {
    const handlers = new Map();
    return {
      addEventListener(name, callback) { handlers.set(name, [...(handlers.get(name) || []), callback]); },
      dispatchEvent(event) { for (const callback of handlers.get(event.type) || []) callback(event); },
    };
  };
  class FakeElement {
    constructor(name) {
      Object.assign(this, listeners());
      this.tagName = name.toUpperCase();
      this.children = [];
      this.dataset = {};
      this.attributes = {};
      this.hidden = false;
      elements.push(this);
    }
    append(child) { this.children.push(child); if (this.tagName === 'HEAD' && child.tagName === 'SCRIPT') network.push(child); }
    prepend(child) { this.children.unshift(child); }
    setAttribute(key, value) { this.attributes[key] = value; }
    getAttribute(key) { return this.attributes[key]; }
    remove() { this.removed = true; }
    focus() { focused = this; }
    scrollIntoView() { this.scrolled = true; }
    click() { this.dispatchEvent({ type: 'click', target: this }); }
    closest(selector) { return selector.startsWith('a[href], button[data-analytics-id]') ? this : null; }
  }
  const body = new FakeElement('body');
  body.dataset = options.dataset || { contentId: 'routebudget-home', pageType: 'product', locale: 'it' };
  const head = new FakeElement('head');
  const canonical = new FakeElement('link');
  canonical.setAttribute('href', options.canonical === undefined ? 'https://routebudget.eu/?private=secret#secret' : options.canonical);
  const document = {
    ...listeners(), body, head,
    documentElement: { lang: 'it' }, readyState: options.readyState || 'complete',
    currentScript: { dataset: { measurementId: options.id === undefined ? ID : options.id } },
    referrer: options.referrer === undefined ? 'https://chatgpt.com/private-thread?email=private@example.com' : options.referrer,
    title: 'private email@example.com calculator_value',
    querySelector: (selector) => selector === 'link[rel="canonical"]' ? canonical : null,
    createElement: (name) => new FakeElement(name),
    get cookie() { return cookie; },
    set cookie(value) {
      cookiesWritten.push(value);
      const name = value.split('=')[0];
      cookie = cookie.split(';').map((part) => part.trim()).filter((part) => part.split('=')[0] !== name).join('; ');
    },
  };
  let timerId = 0;
  const window = {
    ...listeners(),
    location: Object.assign(new URL(options.url || 'https://routebudget.eu/?utm_source=chatgpt.com&utm_campaign=private&email=secret#private'), { reload: () => { reloads += 1; } }),
    localStorage: {
      getItem(key) { if (readError) throw Error('storage denied'); return storage.get(key) || null; },
      setItem(key, value) { if (writeError) throw Error('quota'); storage.set(key, value); },
      removeItem(key) { storage.delete(key); },
    },
    setTimeout(callback, delay) { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    fetch() { throw Error('unapproved fetch'); },
    navigator: { sendBeacon() { throw Error('unapproved beacon'); } },
  };
  if (options.existingLayer) window.dataLayer = options.existingLayer;
  class FakeMutationObserver { constructor(callback) { mutations.push(callback); } observe() {} }
  class FakeCustomEvent { constructor(type, init) { this.type = type; this.detail = init.detail; } }
  class FakeDate extends Date { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } }
  const context = vm.createContext({ window, document, Element: FakeElement, MutationObserver: FakeMutationObserver, CustomEvent: FakeCustomEvent, Date: FakeDate, URL, URLSearchParams, console });
  vm.runInContext(source, context, { filename: 'analytics.js' });
  const dispatch = (detail) => window.dispatchEvent({ type: 'routebudget:analytics', detail });
  const emit = (event, extra = {}) => dispatch({ event, schema_version: 3, locale: options.storedLocale || document.documentElement.lang, content_id: body.dataset.contentId, page_type: body.dataset.pageType, ...extra });
  if (options.runEvents) vm.runInContext(localEvents, context, { filename: 'events.js' });
  else if (!options.noLanding) emit('content_landing_view', { source_class: options.sourceClass || 'chatgpt' });
  const nodes = (className) => elements.filter((node) => node.className === className);
  const buttons = nodes('rb-analytics-button');
  const commands = () => clean((window.dataLayer || []).map((command) => Array.from(command)));
  return {
    window, storage, network, cookiesWritten, nodes, emit, dispatch, commands,
    banner: nodes('rb-analytics-banner')[0], accept: buttons[0], reject: buttons[1], preferences: buttons[2],
    focused: () => focused, reloads: () => reloads, cookie: () => cookie,
    eventCommands: () => commands().filter((command) => command[0] === 'event'),
    completeLoad() { network[0]?.onload?.(); },
    documentLoaded() { document.dispatchEvent({ type: 'DOMContentLoaded' }); },
    setLanguage(locale) { document.documentElement.lang = locale; mutations.forEach((callback) => callback()); },
    advance(ms) { now += ms; },
    setWriteError(value) { writeError = value; },
    fireTimer(delay) { for (const [id, timer] of timers) if (timer.delay === delay) { timers.delete(id); timer.callback(); } },
    storeClick() {
      const control = new FakeElement('a');
      control.href = 'https://apps.apple.com/app/id6789717191';
      control.dataset = { analyticsId: 'hero-app-store', analyticsPosition: 'header' };
      const event = { type: 'click', target: control, prevented: false, preventDefault() { this.prevented = true; } };
      document.dispatchEvent(event);
      return event;
    },
  };
}
