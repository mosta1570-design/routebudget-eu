import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(ROOT, 'content/site.json'), 'utf8'));
const canonicalSitemaps = [
  'sitemaps/core.xml',
  'sitemaps/articles-it.xml',
  'sitemaps/calculators-it.xml',
  'sitemaps/legal.xml',
];
for (const location of [path.join(ROOT, 'public/robots.txt'), path.join(ROOT, 'dist/robots.txt')]) {
  const robots = await readFile(location, 'utf8');
  assert(robots.startsWith('User-agent: *\nAllow: /'), `${location}: public crawling must be allowed`);
  for (const sitemap of canonicalSitemaps) {
    assert(
      robots.includes(`Sitemap: ${config.origin}${config.basePath}/${sitemap}`),
      `${location}: missing canonical sitemap ${sitemap}`,
    );
  }
  assert(!robots.includes(`Sitemap: ${config.origin}${config.basePath}/sitemap.xml`), `${location}: failed legacy root sitemap must not be advertised`);
  assert(!/(?:localhost|127\.0\.0\.1|Disallow:\s*\/)/.test(robots), `${location}: unsafe robots rule`);
}
const preview = await readFile(path.join(ROOT, 'public/robots.preview.txt'), 'utf8');
assert.equal(preview.trim(), 'User-agent: *\nDisallow: /', 'preview robots must block all crawling');
console.log('Robots policies passed: production public, preview blocked, four proven child sitemaps referenced.');
