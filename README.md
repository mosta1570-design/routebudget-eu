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
npm run preview
```

Vite uses `/routebudget-eu/` as its production base path for the existing GitHub Pages URL.

`npm run build` builds landing first, then generates guide hubs, calculator hubs, static content pages, structured data, content manifest, and XML sitemap into `dist/`. `npm run check` also runs calculator fixtures.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` with official GitHub Pages actions. Before first deployment, set repository **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Pushes to `main` then run lint, build, and deployment.

## Public routes

- Landing page: `/routebudget-eu/`
- Italian guide hub: `/routebudget-eu/it/guide/`
- Italian calculator hub: `/routebudget-eu/it/calcolatori/`
- Privacy policy: `/routebudget-eu/privacy.html`
- Terms: `/routebudget-eu/terms.html`

Legal pages remain plain static HTML so their existing public URLs stay stable.

## Content and assets

Landing copy lives in `src/content/siteCopy.ts`. Organic sources live in `content/<locale>/<section>/<slug>/{meta.json,body.md}`. See `docs/CONTENT_PUBLISHING_GUIDE.md` before publishing or translating. Product screenshots and image imports live in `src/assets/`. Asset provenance and disclosure live in `docs/ROUTEBUDGET_SITE_ASSETS.md`.
