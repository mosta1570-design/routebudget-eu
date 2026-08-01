# RouteBudget EU — report implementazione SEO

Data: 1 agosto 2026. Tutte le modifiche restano locali.

## Sistema realizzato

- Schema JSON documentato in `content/meta.schema.json`.
- Lifecycle completo; solo `status=published` + `noindex=false` genera URL e sitemap.
- 14 pagine statiche: 3 pillar, 8 supporti, 2 calcolatori, 1 landing app.
- Due hub statici.
- Metadata unici: title, description, canonical, OG, Twitter, robots, lingua e date articolo.
- JSON-LD visibile e limitato: Organization, Person, WebSite, BreadcrumbList, Article, WebApplication o SoftwareApplication.
- Registry fonti condiviso con data/geografia/claim supportato; fonte inline permessa quando completa.
- Sitemap index con `core.xml`, `articles-it.xml`, `calculators-it.xml`, `legal.xml`.
- Manifest deterministico senza timestamp di build.
- Robots produzione e policy preview separata.
- Custom 404 `noindex,follow`.
- HTML statico utile nella homepage prima del client render.
- Event contract locale via `CustomEvent`; nessuna rete o analytics provider.
- Analizzatore opzionale di export GSC: `npm run seo:gsc-analyze -- --input ...`.

## Quality gate

`npm run seo:all` esegue:

1. build TypeScript/Vite + generazione statica;
2. audit architettura;
3. controllo ricerca live e metriche non inventate;
4. schema/lifecycle/content count;
5. link, frammenti, orphan, CTA e asset;
6. forma JSON-LD;
7. parità canonical/manifest/sitemap;
8. robots produzione/preview;
9. hreflang soltanto per traduzioni reali;
10. presenza dei 18 report richiesti.

Problemi critici producono exit code diverso da zero.

## UI e conversione

Homepage cinematica, hero, sequenza editoriale e video restano invariati. Miglioramenti stretti:

- controlli principali con curve più morbide e target accessibili;
- badge Apple e Google ufficiali, localizzati IT/EN, senza ricostruire loghi;
- CTA store ordinata App Store → Google Play;
- HTML fallback organizzato, senza H1 duplicato;
- source details e CTA leggibili sulle pagine SEO;
- tabelle orizzontalmente scrollabili e calcolatori responsive.

Link pubblici verificati dal gate:

- `https://apps.apple.com/app/id6789717191`
- `https://play.google.com/store/apps/details?id=eu.routebudget.app`

## Limiti intenzionali

- Nessun deploy o collegamento Search Console.
- Nessun provider analytics.
- Nessuna traduzione massiva o hreflang fittizia.
- Nessun dato volume/CPC/difficulty inventato.
- Nessun claim Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessuna modifica a app, RevenueCat, prezzi o store configuration.

## Elenco esatto dei file toccati da questo intervento

L'elenco esclude modifiche preesistenti nel worktree non appartenenti a questo intervento.

```text
README.md
package.json
index.html
content/site.json
content/meta.schema.json
content/sources.json
content/it/calcolatori/costo-carburante-viaggio/meta.json
content/it/calcolatori/costo-chilometrico-camion/meta.json
content/it/guide/calcolare-carburante-pedaggi-autista/meta.json
content/it/guide/calcolo-costo-trasporto/meta.json
content/it/guide/costi-autotrasporto/meta.json
content/it/guide/costi-fissi-variabili-autotrasporto/meta.json
content/it/guide/costo-chilometrico-camion/meta.json
content/it/guide/errori-calcolo-tariffa-trasporto/meta.json
content/it/guide/preventivo-trasporto/meta.json
content/it/guide/proteggere-margine-tratta/meta.json
content/it/guide/preventivo-trasporto-pdf/body.md
content/it/guide/preventivo-trasporto-pdf/meta.json
content/it/guide/ritorno-a-vuoto-autotrasporto/body.md
content/it/guide/ritorno-a-vuoto-autotrasporto/meta.json
content/it/guide/usura-manutenzione-camion/body.md
content/it/guide/usura-manutenzione-camion/meta.json
content/it/landing/app-per-autotrasportatori/body.md
content/it/landing/app-per-autotrasportatori/meta.json
scripts/build-content.mjs
scripts/verify-generated.mjs
scripts/analyze-gsc-export.mjs
scripts/seo-audit.mjs
scripts/verify-content.mjs
scripts/verify-research.mjs
scripts/verify-robots.mjs
scripts/verify-seo-reports.mjs
public/404.html
public/robots.preview.txt
public/seo/seo.css
public/store-badges/app-store-en.svg
public/store-badges/app-store-it.svg
public/store-badges/google-play-en.png
public/store-badges/google-play-it.png
src/components/CinematicHero.tsx
src/components/ProductContinuation.tsx
src/styles.css
docs/CONTENT_PUBLISHING_GUIDE.md
docs/ROUTEBUDGET_SITE_ASSETS.md
docs/GOOGLE_SEARCH_CONSOLE_SETUP.md
docs/SEARCH_CONSOLE_OPERATIONS.md
docs/SEO_WEEKLY_REVIEW_TEMPLATE.md
docs/SEO_MONTHLY_REVIEW_TEMPLATE.md
docs/SEO_EDITORIAL_WORKFLOW.md
docs/SEO_ARTICLE_TEMPLATE.md
docs/SEO_CONTENT_BRIEF_TEMPLATE.md
docs/SEO_FACT_CHECK_CHECKLIST.md
docs/SEO_6_MONTH_ROADMAP_IT.md
docs/SEO_KEYWORD_RESEARCH_IT.md
docs/SEO_SERP_RESEARCH_IT.md
docs/SEO_KEYWORD_MAP_IT.csv
docs/SEO_PIPELINE_AUDIT.md
docs/SEO_IMPLEMENTATION_REPORT.md
docs/SEO_CONTENT_CLUSTERS_IT.md
docs/SEO_INTERNAL_LINK_MAP.md
docs/SEO_INTERNAL_LINK_REPORT.md
docs/SEO_FINAL_VALIDATION_REPORT.md
```
