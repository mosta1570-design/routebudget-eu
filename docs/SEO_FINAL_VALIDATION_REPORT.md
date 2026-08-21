# RouteBudget EU — validazione finale SEO

Data: 21 agosto 2026. Ambiente: build locale Round 10. Deployment: **da eseguire dopo commit e review**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 45 pagine contenuto, 2 hub generati |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 38 supporti, 3 tool, 1 landing; ogni supporto ha almeno 2 ingressi contestuali |
| Ricerca | superato | 49 intent con fonti; 45 pagine pubblicate coperte una volta da canonical+primary |
| Link | superato | 50 route indexable, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive/accessibility contract | superato | H1 unico; tabelle keyboard-scroll; legal skip/main/aria-pressed/44px e contrasto AA |
| Performance budget | superato | JS 75.037 B gzip, CSS 9.174 B gzip, 2 WebM, 2 MP4 e 3 prove prodotto |
| Aggregate `npm run seo:all` | superato | exit 0; build, performance, audit, research, content, link, schema, sitemap, robots, hreflang e report completati il 21 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

Il template responsive mantiene l'identità prodotto. Ogni pagina generata espone un solo H1 uguale al titolo editoriale. Le tabelle ampie restano regioni nominative focalizzabili. Privacy e Termini hanno skip link, `<main>`, stato lingua con `aria-pressed`, target 44×44 e colore attivo più scuro. L'identità JSON-LD della homepage usa `Organization` come publisher e collega l'autore `Person` via `worksFor`.

HTML delle guide Serbia, Italia–Grecia e Polonia contiene title unici, canonical assoluti, robots `index,follow`, breadcrumb, indice, fonti, CTA store e grafi JSON-LD con `Article` e `BreadcrumbList`. Homepage statica e copy IT/EN offrono link alle tre nuove guide. Link, frammenti, schema e contratti statici sono verificati dal gate riproducibile.

Le guide non fingono integrazioni live: RouteBudget non registra né paga TAG/e-TOLL e non prenota traghetti cargo. Il totale verificato viene riportato una sola volta nel costo manuale; ritorno vuoto, PDF non vincolante e Archivio sono descritti secondo il comportamento reale del prodotto.

## Vincoli operativi

Repository configurato per `https://routebudget.eu/`. La sitemap articoli generata contiene 41 URL, comprese le tre nuove canonical; i quattro child sitemap contengono 50 route complessive: articoli 41, legal 2, calcolatori 3 e core 4.

Baseline GSC 1–19 agosto: 23 clic, 1.749 impressioni, CTR 1,3%, posizione media 15,6; ultimi 7 giorni 909 impressioni contro 598 nei 7 precedenti. Nessuna azione manuale o problema di sicurezza. Google indicava 40 URL indicizzate, 1 redirect, `preventivo-trasporto-pdf` rilevata ma non indicizzata e Danimarca scansionata ma non indicizzata. Le quattro sitemap pre-release risultavano riuscite con 38/2/3/4 URL. Il calo del 19 agosto si sovrappone all'aggiornamento spam globale 18–21 agosto, ma la coincidenza non prova una penalizzazione. Deploy, verifica live, invio sitemap e richieste di indicizzazione restano gate esterni successivi al merge.
