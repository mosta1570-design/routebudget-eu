# RouteBudget EU — validazione finale SEO

Data: 18 agosto 2026. Ambiente: build locale round 8. Deployment: **da eseguire dopo commit e review**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 39 pagine contenuto, 2 hub generati |
| ESLint | superato | `npm run check` exit 0 |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 32 supporti, 3 tool, 1 landing |
| Ricerca | superato | 43 intent con fonti; 39 pagine pubblicate coperte canonical+primary |
| Link | superato | 44 route indexable, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive/accessibility contract | superato | H1 unico; tabelle keyboard-scroll; legal skip/main/aria-pressed/44px e contrasto AA |
| Performance media | superato | WebM 0,88 MB mobile e 1,38 MB desktop; MP4 fallback mantenuto |
| Dipendenze produzione | superato | `npm audit --omit=dev --audit-level=high`: 0 vulnerabilità |
| Aggregate `npm run seo:all` | superato | exit 0; tutti i 10 step completati il 18 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

Il template responsive mantiene l'identità prodotto. Ogni pagina generata espone un solo H1 uguale al titolo editoriale. Le tabelle ampie restano regioni nominative focalizzabili. Privacy e Termini hanno skip link, `<main>`, stato lingua con `aria-pressed`, target 44×44 e colore attivo più scuro. L'identità JSON-LD della homepage usa `Organization` come publisher e collega l'autore `Person` via `worksFor`.

HTML delle guide Ungheria, Danimarca e Calais–Dover contiene title unici, canonical assoluti, robots `index,follow`, breadcrumb, indice, fonti, CTA store e grafi JSON-LD con `Article` e `BreadcrumbList`. Homepage statica e IT/EN offre link alle tre nuove guide; la statica rafforza anche `preventivo-trasporto-pdf`. Link, frammenti, schema e contratti statici sono verificati dal gate riproducibile.

## Vincoli operativi

Repository configurato per `https://routebudget.eu/`. La sitemap articoli generata contiene 35 URL, comprese le tre nuove canonical; i quattro child sitemap contengono 44 route complessive. Deploy, verifica live e operazioni Search Console restano gate esterni successivi al merge; il report non li presenta come completati prima dell’esecuzione.
