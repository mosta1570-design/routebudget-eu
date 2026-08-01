import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(ROOT, 'package.json'), 'utf8'));
const site = JSON.parse(await readFile(path.join(ROOT, 'content/site.json'), 'utf8'));
const audit = await readFile(path.join(ROOT, 'docs/SEO_PIPELINE_AUDIT.md'), 'utf8');
const requiredScripts = ['seo:audit', 'seo:research-check', 'seo:content-check', 'seo:links', 'seo:schema', 'seo:sitemap', 'seo:robots', 'seo:hreflang', 'seo:build', 'seo:report', 'seo:all'];
for (const name of requiredScripts) assert(packageJson.scripts[name], `package.json missing ${name}`);
assert.equal(site.googlePlayUrl, 'https://play.google.com/store/apps/details?id=eu.routebudget.app', 'Google Play target mismatch');
assert.match(site.appStoreUrl, /^https:\/\/apps\.apple\.com\/app\/id\d+$/, 'App Store target invalid');
assert(audit.length > 1500, 'SEO pipeline audit is incomplete');
const packageText = JSON.stringify(packageJson);
assert(!/(?:google-analytics|gtag|facebook-pixel|segment|mixpanel)/i.test(packageText), 'unapproved analytics dependency found');
console.log('SEO architecture audit passed: reproducible scripts, verified store targets, no analytics provider.');
