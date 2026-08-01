# RouteBudget EU — validazione finale SEO

Data: 1 agosto 2026. Ambiente: locale. Deployment: **non eseguito**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 14 pagine, 2 hub generati |
| ESLint | superato | `npm run check` exit 0 |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 8 supporti, 2 tool, 1 landing |
| Ricerca | superato | 21 intent con fonti; metriche quantitative non disponibili |
| Link | superato | 19 route, 190 archi, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive static contract | superato | breakpoint articolo, tool a una colonna, table overflow, badge wrap |
| Aggregate `npm run seo:all` | superato | exit 0; tutti i 10 step completati il 1 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

Le immagini QA esistenti a 1440×900 e 390×844 confermano composizione hero approvata e assenza di sovrapposizioni. Modifiche UI limitate a curve controlli, HTML fallback e badge store. Il tentativo di riaprire la preview localhost nel browser integrato è stato bloccato dalla sua policy URL dopo un primo connection-refused; nessun workaround usato. La validazione mobile finale usa DOM statico, CSS breakpoint e gate responsive riproducibile.

## Vincoli operativi

Nessun deploy, push, collegamento Search Console, modifica DNS, acquisto o tracking. Repository configurato per `https://routebudget.eu/`; verifica Domain property e disponibilità pubblica restano operazioni esterne post-deploy.
