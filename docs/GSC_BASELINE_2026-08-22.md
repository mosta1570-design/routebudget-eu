# Baseline Google Search Console — 22 agosto 2026

## Metodo e finestra

Dati letti nella proprietà dominio `routebudget.eu` il 22 agosto 2026. Search Console indicava ultimo aggiornamento circa cinque ore prima e dati completi fino al **20 agosto**. Il confronto principale usa **14–20 agosto** contro **7–13 agosto**, quindi due finestre complete di sette giorni.

Questa fotografia misura ricerca organica Google, non download dagli store. Impressioni, posizione e Suggest sono segnali osservati; non costituiscono volume garantito né permettono di promettere 50.000 impressioni.

## Prestazioni aggregate

| Metrica | Ultimi 3 mesi disponibili |
| --- | ---: |
| Clic | **24** |
| Impressioni | **1.767** |
| CTR medio | **1,4%** |
| Posizione media | **15,6** |

### Ultimi sette giorni contro i precedenti

| Metrica | 14–20 agosto | 7–13 agosto | Variazione |
| --- | ---: | ---: | ---: |
| Clic | **10** | **8** | **+25,0%** |
| Impressioni | **808** | **628** | **+28,7%** |
| CTR | **1,2%** | **1,3%** | −0,1 punti |
| Posizione media | **16,4** | **13,8** | −2,6 posizioni |

Non esiste un calo settimanale delle impressioni: crescono del 28,7%. La posizione media peggiora perché Google espone il sito anche su query e pagine nuove, inizialmente più lontane dalla prima pagina. Questo pattern è compatibile con espansione e test, non dimostra una penalizzazione.

## Italia e dispositivi

| Segmento | 14–20 agosto | 7–13 agosto | Variazione |
| --- | ---: | ---: | ---: |
| Impressioni dall’Italia | **696** | **591** | **+17,8%** |
| Clic dall’Italia | **10** | **7** | **+42,9%** |

L’Italia genera **86,1%** delle impressioni dell’ultima settimana. Questo conferma che il mercato italiano resta il centro della strategia; Round 11 interrompe nuove pagine Paese estere e riporta in homepage tre problemi operativi italiani.

| Dispositivo | Impressioni 14–20 agosto | Impressioni 7–13 agosto |
| --- | ---: | ---: |
| Mobile | **502** | **394** |
| Desktop | **301** | **233** |

## Pagine: crescita e contrazione

Segnali positivi osservati: `tariffe-trazionisti` +20 impressioni e +2 clic; `tabelle-costi-autotrasporto-mit-2026` +41 e +1 clic; Paesi Bassi +23 e +1 clic; Germania +15 e +1 clic; `quanto-consuma-un-camion` +32 impressioni.

Contrazioni principali: calcolatore carburante 119 contro 149; calcolatore costo/km 59 contro 77; `calcolo-costo-trasporto` 50 contro 86 ma con un clic in più; fuel surcharge 1 contro 43; `costo-furgone-per-km` 0 contro 18. Su un dominio giovane questi movimenti non consentono una diagnosi URL per URL in pochi giorni. Si consolida l’intento esistente invece di creare cloni.

## Azioni manuali, sicurezza e indice

| Report | Stato osservato |
| --- | --- |
| Azioni manuali | **0 problemi** |
| Problemi di sicurezza | **0 problemi** |
| HTTPS | **21 URL valide, 0 non HTTPS** |
| Breadcrumb | **17 valide, 0 non valide** |
| URL indicizzate | **40** |

Tre esclusioni nel report, aggiornato il 17 agosto:

- `http://routebudget.eu/`: pagina con reindirizzamento, comportamento atteso;
- `/it/guide/preventivo-trasporto-pdf/`: rilevata ma non indicizzata nella fotografia del report;
- `/it/guide/pedaggio-camion-danimarca-2026/`: scansionata ma non indicizzata, ultimo crawl 18 agosto.

Il report è ritardato rispetto alle release. Reinviare ripetutamente gli stessi URL senza modifica sostanziale non accelera l’indicizzazione.

## Sitemap e prestazioni tecniche

Il deploy live espone `sitemap.xml` con quattro sitemap figlie e **41 URL** in `articles-it.xml`, aggiornate al 21 agosto. Il build Round 11 aggiungerà tre guide italiane, portando la sitemap articoli a **44 URL** e il totale tecnico indexable da 50 a **53 URL**.

PageSpeed mobile fornito il 22 agosto: Performance 94, Accessibility 93, Best Practices 100, SEO 100; FCP 1,8 s, LCP 2,3 s, TBT 0 ms, CLS 0. Nessun dato CrUX reale disponibile. I problemi azionabili erano doppio download potenziale del video, immagini prodotto sovradimensionate, contrasto ridotto durante reveal, LCP ritardato dalla scena mobile e markup `dl` non valido. Round 11 li corregge nel codice; cache di dieci minuti e security headers restano limiti dell’hosting GitHub Pages.

## Decisione Round 11

1. Nessuna nuova guida estera.
2. Homepage ribilanciata su Excel costi, scelta del prezzo gasolio italiano e A22.
3. Pubblicazione nello stesso giorno ammessa perché le tre intenzioni sono diverse e ogni pagina ha metodo, limiti prodotto e fonti proprie.
4. Nessuna promessa di triplicare impressioni. Misura corretta: sette giorni completi contro sette, poi 28 giorni contro i 28 precedenti.
5. Dopo deploy verificato: un solo reinvio di `sitemap.xml` e richiesta di indicizzazione delle tre nuove canonical.
