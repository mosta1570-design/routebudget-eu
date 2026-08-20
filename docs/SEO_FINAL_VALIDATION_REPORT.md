# RouteBudget EU — validazione finale SEO

Data: 20 agosto 2026. Ambiente: build locale Round 9. Deployment: **da eseguire dopo commit e review**.

## Stato verifiche

| Gate | Stato | Evidenza |
| --- | --- | --- |
| TypeScript + Vite build | superato | 42 pagine contenuto, 2 hub generati |
| Calculator fixtures | superato | costo/km e carburante |
| Content schema/lifecycle | superato | 3 pillar, 35 supporti, 3 tool, 1 landing; ogni supporto ha almeno 2 ingressi contestuali |
| Ricerca | superato | 46 intent con fonti; 42 pagine pubblicate coperte una volta da canonical+primary |
| Link | superato | 47 route indexable, 0 broken, 0 orphan |
| Structured data | superato | JSON parse + tipi/entità richiesti |
| Sitemap | superato | index + 4 child; parità con canonical manifest |
| Robots | superato | produzione allow; preview disallow; sitemap corretta |
| Hreflang | superato | nessun alternate prima di traduzioni reali |
| Responsive/accessibility contract | superato | H1 unico; tabelle keyboard-scroll; legal skip/main/aria-pressed/44px e contrasto AA |
| Performance budget | superato | JS 74.723 B gzip, CSS 9.174 B gzip, 2 WebM, 2 MP4 e 3 prove prodotto |
| Aggregate `npm run seo:all` | superato | exit 0; build, performance, audit, research, content, link, schema, sitemap, robots, hreflang e report completati il 20 agosto 2026 |

## Controlli di verità e privacy

- Link store esatti per Apple ID e package Android `eu.routebudget.app`.
- Badge ufficiali Apple/Google IT/EN, checksum documentati.
- Nessun claim Android Trip, Google Maps, navigazione, tracking o pedaggi live.
- Nessun rating, review count, download count, tariffa, risparmio o testimonial inventato.
- Nessun analytics provider, cookie o invio input; event adapter resta locale.
- Nessuna credenziale, token, email account privata o input operativo aggiunto ai report/pagine SEO.

## UI

Il template responsive mantiene l'identità prodotto. Ogni pagina generata espone un solo H1 uguale al titolo editoriale. Le tabelle ampie restano regioni nominative focalizzabili. Privacy e Termini hanno skip link, `<main>`, stato lingua con `aria-pressed`, target 44×44 e colore attivo più scuro. L'identità JSON-LD della homepage usa `Organization` come publisher e collega l'autore `Person` via `worksFor`.

HTML delle guide BGTOLL, consumo furgone e costo autostrada furgone contiene title unici, canonical assoluti, robots `index,follow`, breadcrumb, indice, fonti, CTA store e grafi JSON-LD con `Article` e `BreadcrumbList`. Homepage statica e copy IT/EN offrono link alle tre nuove guide. Link, frammenti, schema e contratti statici sono verificati dal gate riproducibile.

Le guide N1 non fingono che un calcolatore web camion sia equivalente: `relatedCalculator` resta nullo e il passo di conversione porta al flusso N1 reale nell'app. BGTOLL chiarisce che RouteBudget non interroga né paga il sistema bulgaro; il totale ufficiale verificato viene riportato una sola volta nel breakdown.

## Vincoli operativi

Repository configurato per `https://routebudget.eu/`. La sitemap articoli generata contiene 38 URL, comprese le tre nuove canonical; i quattro child sitemap contengono 47 route complessive: articoli 38, legal 2, calcolatori 3 e core 4.

Baseline GSC 1–18 agosto: 23 clic, 1.741 impressioni, CTR 1,3%, posizione media 15,5; 40 URL indicate come indicizzate, 1 redirect, `preventivo-trasporto-pdf` rilevata ma non indicizzata e Danimarca scansionata ma non indicizzata. Le quattro sitemap pre-release risultavano riuscite con 35/2/3/4 URL. Deploy, verifica live, invio sitemap e richieste di indicizzazione restano gate esterni successivi al merge; il report non li presenta come completati prima dell'esecuzione.
