# Baseline Google Search Console — 20 agosto 2026

## Finestra e metodo

Dati letti nella proprietà dominio `routebudget.eu`. La finestra Prestazioni copre 1–18 agosto 2026. Questa è una fotografia pre-release Round 9: non misura l'effetto delle tre nuove guide e non garantisce traffico o indicizzazione futuri.

## Prestazioni aggregate

| Metrica | Valore |
| --- | ---: |
| Clic | 23 |
| Impressioni | 1.741 |
| CTR medio | 1,3% |
| Posizione media | 15,5 |

Non è stato registrato in questa baseline un breakdown completo per query, pagina, paese o dispositivo. I valori aggregati non vengono convertiti in volume mensile, CPC o keyword difficulty.

## Copertura indice osservata

| Stato | Conteggio o URL | Lettura operativa |
| --- | --- | --- |
| Indicizzate | 40 URL | Stato osservato, non parità garantita con sitemap future |
| Pagina con reindirizzamento | 1 | Redirect atteso da verificare come canonicalizzazione HTTP/HTTPS |
| Rilevata, ma attualmente non indicizzata | `/it/guide/preventivo-trasporto-pdf/` | Rafforzare link utili; non creare duplicati né richiedere ripetutamente senza modifica reale |
| Scansionata, ma attualmente non indicizzata | `/it/guide/pedaggio-camion-danimarca-2026/` | Conservare contenuto distinto e fonti; monitorare dopo il prossimo crawl |

Il conteggio “indicizzate” è quello mostrato da Search Console e può avere ritardo rispetto a deploy, sitemap e crawl. Non viene interpretato come prova che tutte le URL siano già servite o escluse correttamente: HTTP 200, canonical, robots e sitemap restano verifiche live separate.

## Sitemap osservate

| Sitemap figlia | URL dichiarate | Stato GSC |
| --- | ---: | --- |
| `articles-it.xml` | 35 | Operazione riuscita |
| `legal.xml` | 2 | Operazione riuscita |
| `calculators-it.xml` | 3 | Operazione riuscita |
| `core.xml` | 4 | Operazione riuscita |

Totale dichiarato nella fotografia pre-release: 44 URL. Dopo il build Round 9 il valore tecnico atteso è 38 URL nella sitemap articoli e 47 URL complessive. Questi nuovi conteggi devono essere confermati sul deploy live prima dell'invio a Search Console.

## Azioni Round 9

1. Pubblicare soltanto dopo build, canonical e link gate verdi.
2. Verificare live HTTP 200, `index,follow`, canonical assoluta e presenza nelle sitemap generate per le tre nuove URL.
3. Reinviare l'indice sitemap una volta, dopo deploy confermato.
4. Richiedere ispezione/indicizzazione per le tre nuove canonical; nessuna richiesta viene dichiarata completata in questo documento.
5. Monitorare separatamente `preventivo-trasporto-pdf` e la guida Danimarca senza trasformare lo stato GSC in errore tecnico certo.
6. Confrontare finestre equivalenti e annotare data di deploy; evitare attribuzioni causali su pochi giorni.

## Baseline di confronto

La prossima revisione deve mantenere la finestra, distinguere branded/non-branded e registrare per URL clic, impressioni, CTR, posizione e stato indice. Obiettivi commerciali o di impressioni non sono garantiti da pubblicazione, sitemap o richiesta di indicizzazione.
