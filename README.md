# RouteBudget EU website

Premium Italian-first RouteBudget EU site plus static organic-content engine. React powers product landing; validated Markdown generates crawlable guide and calculator pages during production build.

## Local development

Requirements: Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run check
npm run seo:all
npm run preview
```

Vite uses `/` as its production base path for the custom apex URL `https://routebudget.eu/`.

`npm run build` builds landing first, then generates guide/calculator hubs, static content pages, structured data, deterministic manifest, and split XML sitemaps into `dist/`. `npm run seo:all` is the release gate for research evidence, content schema, links, schema, sitemap, robots, hreflang, and required reports.

## Deployment

GitHub Pages currently serves the root of the `gh-pages` branch. A production release must first pass `npm run check` and `npm run seo:all`; only the generated `dist/` tree is then copied to `gh-pages` and pushed. The deployment remains an explicit release action rather than an automatic side effect of every source push.

`public/CNAME` keeps `routebudget.eu` in the uploaded Pages artifact. GitHub Pages custom-domain settings and DNS remain external deployment prerequisites.

## Public routes

- Landing page: `/`
- Italian guide hub: `/it/guide/`
- Italian calculator hub: `/it/calcolatori/`
- Italian app landing: `/it/app-per-autotrasportatori/`
- Sitemap index: `/sitemap.xml`
- Privacy policy: `/privacy.html`
- Terms: `/terms.html`

Legal pages remain plain static HTML so their existing public URLs stay stable.

## Content and assets

Landing copy lives in `src/content/siteCopy.ts`. Organic sources live in `content/<locale>/<section>/<slug>/{meta.json,body.md}`; strict fields are documented in `content/meta.schema.json`, and reusable source evidence lives in `content/sources.json`. See `docs/CONTENT_PUBLISHING_GUIDE.md` before publishing or translating. Product screenshots and image imports live in `src/assets/`. Asset provenance and disclosure live in `docs/ROUTEBUDGET_SITE_ASSETS.md`.

Optional Search Console CSV analysis (no Google API credential):

```bash
npm run seo:gsc-analyze -- --input export.csv --previous previous.csv --out report.md
```
