// Optional browser QA: install Playwright locally or provide PLAYWRIGHT_MODULE.
// Run against a built preview: node scripts/audit-scroll-browser.mjs [base URL]
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, webkit, devices } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:4186';
const out = process.env.SCROLL_AUDIT_OUTPUT || '/tmp/routebudget-scroll-audit';
await mkdir(out, { recursive: true });
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert(routes.length > 0, 'Built root sitemap must contain routes');
const screenshotRoutes = new Set(['/', '/it/guide/guadagno-padroncino-camion/', '/it/guide/trasporto-spot-significato/', '/it/guide/conviene-comprare-furgone-elettrico/', '/it/calcolatori/costo-carburante-viaggio/']);
const profiles = [
  { name: 'webkit-touch', engine: webkit, options: devices['iPhone 13'], touch: true },
  { name: 'chrome-touch', engine: chromium, options: devices['Pixel 7'], touch: true },
  { name: 'webkit-desktop', engine: webkit, options: { viewport: { width: 1440, height: 900 } }, touch: false },
  { name: 'chrome-desktop', engine: chromium, options: { viewport: { width: 1440, height: 900 } }, touch: false },
];
const report = [];

for (const profile of profiles) {
  const browser = await profile.engine.launch(profile.engine === chromium && process.env.SCROLL_CHROME_CHANNEL ? { channel: process.env.SCROLL_CHROME_CHANNEL } : {});
  const context = await browser.newContext({ ...profile.options, reducedMotion: 'no-preference' });
  const queue = [...routes];
  await Promise.all(Array.from({ length: 3 }, async () => {
    const page = await context.newPage();
    while (queue.length) {
      const route = queue.shift();
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on('pageerror', onError);
      try {
        const response = await page.goto(`${base}${route}`, { waitUntil: 'load' });
        assert.equal(response.status(), 200, `${route}: HTTP status`);
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => {
          window.__progressWrites = 0;
          const bar = document.querySelector('.reading-progress__bar');
          if (bar) new MutationObserver(() => window.__progressWrites++).observe(bar, { attributes: true, attributeFilter: ['style'] });
        });
        const drift = [];
        for (const fraction of [0.55, 0.9, 0.3]) {
          // Programmatic bursts verify layout stability. They do not reproduce
          // physical iOS touch inertia or the native collapsing browser toolbar.
          await page.evaluate((fraction) => scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * fraction, behavior: 'instant' }), fraction);
          await page.waitForTimeout(100);
          const samples = await page.evaluate(async () => {
            const values = [];
            for (let i = 0; i < 8; i++) {
              await new Promise(requestAnimationFrame);
              const root = document.documentElement;
              values.push([scrollY, root.scrollHeight, root.scrollWidth - root.clientWidth]);
            }
            return values;
          });
          const spread = (index) => Math.max(...samples.map((v) => v[index])) - Math.min(...samples.map((v) => v[index]));
          drift.push({ scroll: spread(0), height: spread(1) });
          assert(spread(0) <= 1, `${route}: scroll position drift after stopping`);
          assert(spread(1) <= 1, `${route}: document height changes after stopping`);
          assert(samples.every((sample) => sample[2] <= 1), `${route}: horizontal document overflow`);
        }
        const ui = await page.evaluate(() => {
          const header = document.querySelector('.seo-header');
          const bar = document.querySelector('.reading-progress');
          return {
            headerPosition: header && getComputedStyle(header).position,
            headerBackdrop: header && getComputedStyle(header).backdropFilter,
            progressDisplay: bar && getComputedStyle(bar).display,
            progressWrites: window.__progressWrites,
            tableCount: document.querySelectorAll('.table-scroll').length,
          };
        });
        if (profile.touch && ui.headerPosition) {
          assert.equal(ui.headerPosition, 'relative', `${route}: touch header must scroll in document flow`);
          assert.equal(ui.headerBackdrop, 'none', `${route}: touch header must not sample moving backdrop`);
          if (ui.progressDisplay !== null) assert.equal(ui.progressDisplay, 'none', `${route}: touch progress layer must be hidden`);
          assert.equal(ui.progressWrites, 0, `${route}: touch scrolling must not update progress style`);
        }
        if (!profile.touch && ui.headerPosition) assert.equal(ui.headerPosition, 'sticky', `${route}: desktop navigation behavior must be preserved`);
        assert.equal(errors.length, 0, `${route}: page errors: ${errors.join('; ')}`);
        if (screenshotRoutes.has(route)) {
          const name = route === '/' ? 'home' : route.split('/').filter(Boolean).at(-1);
          await page.screenshot({ path: path.join(out, `${profile.name}-${name}.png`) });
        }
        report.push({ profile: profile.name, route, pass: true, drift, ...ui });
      } catch (error) {
        report.push({ profile: profile.name, route, pass: false, error: error.message });
      } finally {
        page.removeListener('pageerror', onError);
      }
    }
    await page.close();
  }));
  await browser.close();
  console.log(`${profile.name}: ${report.filter((r) => r.profile === profile.name && r.pass).length}/${routes.length} passed`);
}
await writeFile(path.join(out, 'report.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), base, routeCount: routes.length, report }, null, 2)}\n`);
const failures = report.filter((row) => !row.pass);
console.log(JSON.stringify({ routes: routes.length, checks: report.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
