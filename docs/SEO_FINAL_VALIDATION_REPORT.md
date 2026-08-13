# RouteBudget EU — validazione finale SEO

Data: 13 agosto 2026. Ambiente: build locale di release. Deployment: **da eseguire dopo commit e review**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 24 pagine contenuto, 2 hub generati |
| ESLint | superato | `npm run check` exit 0 |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 17 supporti, 3 tool, 1 landing |
| Ricerca | superato | 27 intent con fonti; dati GSC separati da volume di ricerca |
| Link | superato | 29 route indexable, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive static contract | superato | breakpoint articolo, tool a una colonna, table overflow, badge wrap |
| Aggregate `npm run seo:all` | superato | exit 0; tutti i 10 step completati il 13 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

La preview locale nel browser integrato conferma hero, gerarchia, breadcrumb, indice, fonti e CTA store sulle tre nuove guide. Il template responsive resta invariato; link, frammenti, schema e contratti statici sono verificati dal gate riproducibile.

## Vincoli operativi

Repository configurato per `https://routebudget.eu/`. Deploy, verifica live e operazioni Search Console restano gate esterni successivi al merge; il report non li presenta come completati prima dell’esecuzione.
