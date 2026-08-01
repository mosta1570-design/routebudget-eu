# RouteBudget EU — audit pipeline SEO

Audit iniziale: 1 agosto 2026. Repository: `routebudget-eu-site`. Modalità: locale, senza deploy, Search Console, credenziali o modifiche a store/app.

## Stato trovato

Il sito usava Vite 8, React 19 e TypeScript per la landing cinematica. Un generatore Node leggeva `content/<locale>/<section>/<slug>/{meta.json,body.md}`, convertiva Markdown con `marked`, sanificava HTML e scriveva pagine statiche. Erano presenti 3 pillar, 5 supporti, 2 calcolatori e due hub. Build, fixture dei calcolatori, canonical, breadcrumb, JSON-LD di base, link correlati, robots e sitemap singola funzionavano.

Aspetti validi preservati:

- homepage cinematica e composizione dei suoi blocchi;
- URL pubbliche esistenti al momento dell'audit sotto `/routebudget-eu/it/guide/` e `/routebudget-eu/it/calcolatori/`;
- formule dei due calcolatori e calcolo solo nel browser;
- Markdown separato da metadata;
- sanitizzazione HTML;
- CTA e link pubblici reali App Store/Google Play;
- nessun analytics provider o invio di input.

## Lacune trovate

1. Nessun comando `seo:all` né gate separati per ricerca, contenuto, link, schema, sitemap, robots e hreflang.
2. Metadata senza lifecycle, autore/revisore, keyword secondarie, cluster, canonical dichiarato, noindex, feature e change summary.
3. Ogni cartella contenuto entrava nel build: una bozza poteva essere indicizzata.
4. Sitemap monolitica e manifest con timestamp dinamico.
5. Verifica insufficiente per description duplicate, orphan, frammenti rotti, claim prodotto, CTA mancante e parità manifest/sitemap.
6. Solo 5 supporti; landing app statica assente.
7. Homepage utile soltanto dentro `noscript`; nessun custom 404.
8. Twitter metadata incompleta e schema privo di Organization/SoftwareApplication.
9. Nessun ingest futuro per export Search Console.
10. Documenti editoriali/GSC incompleti o non allineati allo stato finale.

## Pattern riusati da mostafa1998.site

Ispezione solo lettura. Riutilizzati: metadata editoriali espliciti, custom 404, source discipline, published/modified metadata, checklist e separazione brief→draft→review. Non riusati: branding, articoli, keyword, dati personali, HTML duplicato manualmente, sitemap manuale o schema non supportato da contenuto visibile.

Il generatore RouteBudget resta base migliore: una fonte Markdown, relazioni validate e output deterministico.

## Rischi

- Al momento dell'audit GitHub Pages usava un project path: il repository produceva `/routebudget-eu/robots.txt`; controllo del robots host-root richiedeva dominio/proprietà separata.
- Workflow GitHub può pubblicare su push a `main`; nessun push/deploy è autorizzato in questo task.
- Fonti su pedaggi, energia e normativa cambiano: dati variabili devono restare input utente o avere data/geografia.
- Query pedaggi sovrappone la guida costi diretti; nuova URL ora creerebbe cannibalizzazione.
- Modifiche ampie alla landing potrebbero rompere design approvato; scope UI limitato a spacing, curve dei controlli e badge ufficiali.

## Blocker di lancio rilevati nell’audit

Prima dell’implementazione: gate SEO mancante, contenuto iniziale incompleto, nessun 404, sitemap non scalabile, schema editoriale debole. Nessun blocker richiedeva modifica app, RevenueCat, store o deployment.

Stato finale e prove sono separati in `SEO_IMPLEMENTATION_REPORT.md` e `SEO_FINAL_VALIDATION_REPORT.md`.
