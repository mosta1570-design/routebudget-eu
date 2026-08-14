# RouteBudget EU — validazione finale SEO

Data: 14 agosto 2026. Ambiente: build locale round 4. Deployment: **da eseguire dopo commit e review**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 27 pagine contenuto, 2 hub generati |
| ESLint | superato | `npm run check` exit 0 |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 20 supporti, 3 tool, 1 landing |
| Ricerca | superato | 30 intent con fonti; dati GSC separati da volume di ricerca |
| Link | superato | 32 route indexable, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive static contract | superato | breakpoint articolo, tool a una colonna, table overflow, badge wrap |
| Aggregate `npm run seo:all` | superato | exit 0; tutti i 10 step completati il 14 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

Il template responsive resta invariato. HTML generato delle tre nuove guide contiene title unici, canonical assoluti, robots `index,follow`, breadcrumb, indice, fonti, CTA store e grafi JSON-LD con `Article` e `BreadcrumbList`. Link, frammenti, schema e contratti statici sono verificati dal gate riproducibile.

## Vincoli operativi

Repository configurato per `https://routebudget.eu/`. La sitemap articoli generata contiene 23 URL, comprese le tre nuove canonical. Deploy, verifica live e operazioni Search Console restano gate esterni successivi al merge; il report non li presenta come completati prima dell’esecuzione.
