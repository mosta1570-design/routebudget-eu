# Baseline Google Search Console — 21 agosto 2026

## Finestra e metodo

Dati letti nella proprietà dominio `routebudget.eu`. La finestra Prestazioni disponibile copre **1–19 agosto 2026**. I confronti brevi usano intervalli equivalenti mostrati da Search Console. Il dato del 19 agosto e la vista ultime 24 ore sono ancora troppo piccoli e recenti per sostenere una diagnosi causale.

Questa è una fotografia pre-release Round 10. Non misura l'effetto delle tre nuove guide, non equivale a volume mensile e non garantisce traffico, ranking o indicizzazione futuri.

## Prestazioni aggregate

| Metrica | 1–19 agosto |
| --- | ---: |
| Clic | **23** |
| Impressioni | **1.749** |
| CTR medio | **1,3%** |
| Posizione media | **15,6** |

### Confronto su finestre equivalenti

| Metrica | Ultimi 7 giorni | 7 giorni precedenti | Variazione |
| --- | ---: | ---: | ---: |
| Clic | **11** | **6** | **+83%** |
| Impressioni | **909** | **598** | **+52%** |
| CTR | **1,2%** | **1,0%** | +0,2 punti |
| Posizione media | **15,8** | **13,4** | −2,4 posizioni |

La posizione media peggiora mentre impressioni e clic crescono: lettura coerente con espansione verso query e URL più lontani dalla prima pagina, non con una scomparsa generale. La singola giornata del **19 agosto** mostra 8 impressioni, 0 clic e posizione 40; la vista ultime 24 ore mostra **12 impressioni contro 12** nelle 24 ore precedenti. Numeri così bassi amplificano qualsiasi oscillazione e non provano una penalizzazione.

## Dispositivi

| Dispositivo | Clic | Impressioni | CTR calcolato | Posizione media |
| --- | ---: | ---: | ---: | ---: |
| Mobile | **9** | **1.065** | 0,85% | **10,12** |
| Desktop | **14** | **678** | 2,06% | **24,3** |
| Tablet | 0 | 6 | 0% | — |

Mobile produce il 61% delle impressioni ma un CTR inferiore al desktop. Priorità: soddisfare intento e snippet mobile, non inseguire modifiche giornaliere del title.

## Copertura indice osservata

| Stato | Conteggio o URL | Lettura operativa |
| --- | --- | --- |
| Indicizzate | **40 URL** | Stato GSC osservato; può avere ritardo rispetto a deploy e sitemap |
| Pagina con reindirizzamento | **1** | Redirect atteso da verificare come canonicalizzazione HTTP/HTTPS |
| Rilevata, ma attualmente non indicizzata | `/it/guide/preventivo-trasporto-pdf/` | Mai scansionata nella fotografia; rafforzare ingressi utili e richiedere un nuovo controllo solo dopo modifica sostanziale |
| Scansionata, ma attualmente non indicizzata | `/it/guide/pedaggio-camion-danimarca-2026/` | Scansionata il 18 agosto; contenuto distinto, fonti e link vanno conservati mentre Google rivaluta |

Azioni manuali: **nessun problema rilevato**. Problemi di sicurezza: **nessun problema rilevato**. Questi due report escludono una penalizzazione manuale o un problema di sicurezza noto; non sono una certificazione di ranking algoritmico.

## Sitemap osservate

| Sitemap figlia | URL dichiarate | Stato GSC |
| --- | ---: | --- |
| `articles-it.xml` | 38 | Operazione riuscita |
| `legal.xml` | 2 | Operazione riuscita |
| `calculators-it.xml` | 3 | Operazione riuscita |
| `core.xml` | 4 | Operazione riuscita |

Fotografia live: **47 URL dichiarate**. Dopo build Round 10 il conteggio tecnico atteso è 41 URL nella sitemap articoli e 50 URL complessive. I nuovi valori devono essere verificati sul deploy prima dell'invio a Search Console.

## Autorità e collegamenti

| Segnale GSC | Valore |
| --- | ---: |
| Link esterni rilevati | **0** |
| Link interni rilevati | **90** |

Zero link esterni è il limite di crescita più concreto osservato: sitemap e contenuti possono migliorare scoperta e pertinenza, ma non sostituiscono citazioni editoriali autentiche. Nessun acquisto di link, scambio massivo o directory spam è raccomandato.

## Cannibalizzazione confermata

Filtro query GSC `consumo medio camion`, breakdown per pagina:

| URL | Impressioni |
| --- | ---: |
| `/it/calcolatori/costo-carburante-viaggio/` | **35** |
| `/it/guide/quanto-consuma-un-camion/` | **16** |
| `/it/calcolatori/` | **1** |
| `/it/calcolatori/costo-chilometrico-camion/` | **1** |

Owner corretto: la guida `quanto-consuma-un-camion` per definizione, misurazione e fattori; il calcolatore carburante soltanto per trasformare distanza, consumo già noto e prezzo inserito in litri e costo. La release separa wording e link per rendere questo confine esplicito.

## Aggiornamento spam Google e diagnosi

Google ha distribuito l'[August 2026 spam update](https://status.search.google.com/incidents/LEubPCm2octf2uMqCFKE) dal **18 agosto 2026 alle 09:27 PDT** al **21 agosto alle 01:49 PDT**; rollout globale e per tutte le lingue. La finestra GSC termina il 19 agosto e quindi si sovrappone solo all'inizio dell'aggiornamento.

Diagnosi supportata dai dati:

1. **Nessuna prova di penalizzazione:** azioni manuali e sicurezza sono pulite; 40 URL risultano indicizzate.
2. **Nessun calo settimanale del sito:** ultimi 7 giorni +52% impressioni e +83% clic.
3. **Caduta visiva spiegata da finestra:** il 19 agosto è una giornata piccola/incompleta nel report; ultime 24 ore sono stabili 12 contro 12.
4. **Volatilità attesa:** dominio e archivio sono giovani; molte URL sono state aggiunte in pochi giorni e Google sta ancora distribuendo crawl, indicizzazione e test di query.
5. **Aggiornamento spam come contesto, non causa provata:** la sovrapposizione temporale impone di attendere dati completi post-rollout; non autorizza a dire che Google abbia colpito RouteBudget.
6. **Problemi azionabili:** intento consumo diviso, CTR mobile basso, una guida rilevata e una scansionata non indicizzate, zero link esterni.

## Protocollo post-release

1. Pubblicare solo dopo gate build, canonical, schema, link e sitemap verdi.
2. Verificare live HTTP 200, `index,follow`, canonical assoluta e presenza in `articles-it.xml` per le tre nuove URL.
3. Reinviare `sitemap.xml` una volta dopo deploy confermato.
4. Richiedere indicizzazione delle tre nuove canonical; monitorare PDF e Danimarca senza richieste ripetute prive di modifiche.
5. Confrontare almeno 7 giorni completi post-rollout con 7 giorni completi precedenti, annotando deploy e update.
6. Segmentare per pagina, query, paese e dispositivo. Nessun obiettivo “triplo” viene presentato come garanzia.
