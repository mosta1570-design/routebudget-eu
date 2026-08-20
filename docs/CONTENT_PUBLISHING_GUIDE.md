# RouteBudget EU — Content publishing guide

## Purpose

System publishes crawlable guides, calculators, and comparisons without changing React landing architecture. New editorial page requires one folder, `meta.json`, `body.md`, internal-link review, and normal production build. Generator creates final HTML, schema, breadcrumbs, non-empty hubs, content manifest, and sitemap.

Public landing base and canonical deployment target; generated editorial routes remain pending until a production deploy returns `200`:

- site: `https://routebudget.eu/`
- Italian guides: `/it/guide/`
- Italian calculators: `/it/calcolatori/`
- planned comparisons: `/it/confronti/`

## Source layout

```text
content/
  site.json
  sources.json
  meta.schema.json
  it/
    guide/
      <slug>/
        meta.json
        body.md
    calcolatori/
      <slug>/
        meta.json
        body.md
    confronti/
      <slug>/
        meta.json
        body.md
    landing/
      <slug>/
        meta.json
        body.md
scripts/
  build-content.mjs
public/seo/
  seo.css
  events.js
  calculators-core.js
  calculators.js
```

Generated HTML belongs only in `dist/`. Do not hand-edit `dist/`, a hub page, `content-manifest.json`, or `sitemap.xml`; next build replaces generated output.

## Publish a guide

1. Choose one defined query and search intent from `SEO_KEYWORD_MAP_IT.md`.
2. Confirm no existing URL already owns same intent.
3. Choose pillar and 2–6 genuinely related pages before drafting.
4. Create `content/it/guide/<slug>/meta.json` and `body.md`.
5. Write original Italian for driver, owner-operator, or transport business. Use observed workflow, formulas, examples, tables, and clear limitations.
6. Run natural-language review. Remove filler, invented facts, unverified claims, and duplicated paragraphs.
7. Run `npm run check`.
8. Inspect generated route, canonical, source links, app CTA, and related links.
9. Deploy through existing GitHub Pages workflow only after editorial approval.
10. Add deployed URL to Search Console queue described in `SEARCH_CONSOLE_OPERATIONS.md`.

## Publish a comparison

Use `content/it/confronti/<slug>/` with `kind: "comparison"` only for a distinct decision intent and neutral, verifiable criteria. A comparison must set a guide pillar, link 2–6 genuinely related pages, avoid artificial rankings, and pass the same build, editorial, production-`200`, sitemap, and Search Console gates as a guide. The `/confronti/` hub is generated only when at least one useful comparison exists.

## Required metadata

| Field | Contract |
| --- | --- |
| `slug` | lowercase ASCII words joined by hyphens; must match folder |
| `kind` | `pillar`, `guide`, `calculator`, `comparison`, or `landing` |
| `locale` | source locale, currently `it` |
| `status` | editorial lifecycle; only `published` can enter the public build |
| `title` | unique visible H1 and title basis; maximum 75 characters |
| `description` | specific 70–180 character summary |
| `eyebrow` | short editorial context above H1 |
| `published` | actual first public deployment date, `YYYY-MM-DD`; preview/build date is not publication |
| `modified` | last meaningful content change, never a cosmetic date bump |
| `reviewed` | latest accuracy/editorial review date |
| `author`, `reviewer` | approved real editorial identity |
| `primaryKeyword` | single query intent owner |
| `secondaryKeywords` | at least two related variants owned by same intent |
| `searchIntent` | informational, commercial, transactional, or combined |
| `cluster` | stable topical group |
| `topics` | at least two closely related subjects |
| `related` | at least two valid local references |
| `relatedCalculator` | relevant calculator reference, also present in `related`; use `null` when no web calculator truthfully matches the page |
| `pillar` | `guide:<slug>` for guides, calculators, and comparisons; `null` on pillar |
| `calculatorId` | `cost-per-km`, `fuel-trip`, or `fuel-surcharge` on the matching calculators; `null` on guides, pillars, and comparisons |
| `conversionIntent` | `complete-trip`, `pdf-quote`, `protect-margin`, or `unlimited` |
| `appFeature` | verified product capability used by contextual CTA |
| `translationGroup` | stable cross-language identity, not translated slug |
| `canonical` | exact generated production path |
| `ogImage` | production image path |
| `noindex` | `false` for published; required `true` for every other status |
| `sources` | authoritative HTTPS source references; time-sensitive details inline or in `sources.json` |
| `changeSummary` | meaningful reason for latest update |

Reference format is section plus slug, for example:

```json
{
  "related": [
    "guide:calcolo-costo-trasporto",
    "calcolatori:costo-carburante-viaggio"
  ],
  "pillar": "guide:calcolo-costo-trasporto"
}
```

Build fails for missing references, duplicate page identities, invalid dates, weak descriptions, raw HTML, H1 inside Markdown, or bodies below minimum useful length.

## Markdown contract

- `body.md` starts with `##`; generator owns H1.
- Raw HTML is forbidden. Renderer parses Markdown, then sanitizes output.
- Use H2/H3 in logical order.
- Use tables only when comparison becomes clearer.
- Use blockquotes for operational cautions, not decoration.
- Link visible source claims to current primary or authoritative sources.
- Never insert scripts, iframes, forms, tracking pixels, affiliate links, or user data.
- Avoid FAQ sections created only for schema. Generator emits no FAQ schema by default.

## Internal-link contract

Every supporting guide must connect:

1. back to one pillar through `pillar`;
2. to 2–5 related guides or calculators through `related`;
3. receive contextual Markdown links from at least two other published content pages; hub navigation and generated cards do not satisfy this gate;
4. to a truthful RouteBudget app capability through `conversionIntent`;
5. to both verified store listings through generated CTA.

Pillar pages should link to all important support pages in their cluster. Calculator pages link to explanatory guide, pillar, adjacent calculator, and app workflow. Use descriptive anchor meaning; avoid “click here.”

## Updating a page

1. Identify evidence: Search Console query, stale rule/tariff, product change, user question, or documented error.
2. Update body and any affected metadata.
3. Change `modified` only for meaningful visible change.
4. Change `reviewed` after fresh accuracy review, even if no rewrite was necessary.
5. Recheck sources and remove dead or superseded URLs.
6. Confirm title change does not create keyword overlap.
7. Run full check and compare generated canonical.
8. Record change and reason in weekly SEO log.

Merge or redirect overlapping pages only with a deliberate URL migration plan. GitHub Pages redirects need an explicit implementation; never delete indexed content without mapping old intent to best live destination.

## Translation workflow

Translate proven pages only after Italian evidence meets roadmap gate. Source routing and `translationGroup` are ready for mirrored locale folders, but current generated interface chrome and date formatting are intentionally Italian-only. Before adding the first non-Italian locale, engineering must move hub, breadcrumb, editorial-note, source, CTA, footer, and date strings into a reviewed locale dictionary and add a build assertion that rejects missing translations. Then add locale to `content/site.json`, create mirrored locale section/folder, and reuse exact `translationGroup`. Localize title, examples, terms, sources, CTA copy, units, and sources where needed; do not perform literal machine-only translation.

Generator emits reciprocal hreflang and `x-default` only when at least two real translations share one translation group. Until then, Italian page has canonical only. Never point hreflang to untranslated or redirected content.

## Calculator boundary

Web calculators provide limited, transparent formulas. They do not save routes, create client PDFs, reproduce full scenarios, calculate live tolls, or create app entitlements. All form values stay in browser. Browser event hook records only calculator name and start/complete state; no entered values.

Calculator formulas live in `public/seo/calculators-core.js`. Any formula change requires:

- explanatory-content update;
- caveat review;
- fixture update in `scripts/verify-calculators.mjs`;
- output-format and mobile keyboard check;
- confirmation that web tool still does not expose full paid workflow.

## Measurement adapter

`public/seo/events.js` emits minimized browser-local signals named `routebudget:analytics`. It sends nothing over network and sets no cookie or returning-visitor identifier. The local payload already follows the controlled names and allowlist in [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md): stable `content_id`, enumerated page/event properties, and no URL path, raw referrer, form input, result, or free text. No collector may be connected before the separate privacy and consent review.

Any future analytics endpoint, persistent identifier, or returning-visitor logic requires separate consent/legal review and public privacy-policy alignment before activation. See `SEO_CONVERSION_MAP.md` for event taxonomy.

## Verification commands

```bash
npm run seo:all
npm run preview
```

Expected build products:

- one HTML file per source page;
- guide and calculator hub `index.html` files;
- `dist/sitemap.xml` index plus four deterministic child sitemaps;
- `dist/content-manifest.json` for editorial QA;
- passing calculator fixtures;
- no unresolved internal references.

Sitemap submission helps discovery but does not guarantee crawling, indexing, ranking, traffic, or conversion.
