# Diagnosi Google Search Console — 23 agosto 2026

## Esito

Il calo del 19–20 agosto è reale, ma non risultano una penalizzazione manuale, un problema di sicurezza, un blocco robots, una canonical globale errata o un guasto di scansione. Il cambio coincide con l’aggiornamento spam di Google distribuito dal 18 al 21 agosto 2026. La classificazione più probabile è una rivalutazione algoritmica automatica amplificata da dominio giovane e autorità esterna ancora assente.

Non è possibile promettere recupero o triplicazione delle impressioni. Sitemap e richiesta di indicizzazione aiutano scoperta e diagnosi; non acquistano ranking.

## Dati osservati

Proprietà dominio `routebudget.eu`, ricerca Web. Dati completi disponibili fino al 20 agosto.

| Metrica | Ultimi 3 mesi |
| --- | ---: |
| Clic | **24** |
| Impressioni | **1.767** |
| CTR medio | **1,4%** |
| Posizione media | **15,6** |

### Il segnale settimanale e quello giornaliero sono diversi

Dal 14 al 20 agosto il sito totalizza 808 impressioni contro 628 nei sette giorni precedenti: **+28,7%**. Dentro la stessa settimana, però, il confronto degli ultimi due giorni completi mostra la rottura:

| Metrica | 19–20 agosto | 17–18 agosto | Variazione |
| --- | ---: | ---: | ---: |
| Clic | **0** | **4** | −4 |
| Impressioni | **25** | **353** | **−92,9%** |
| CTR | **0%** | **1,1%** | −1,1 punti |
| Posizione media | **26,0** | **11,4** | −14,6 posizioni |

Il calo attraversa dispositivi e pagine, quindi non dipende da un solo template:

- Italia: 19 impressioni contro 293, **−93,5%**;
- mobile: 19 contro 231;
- desktop: 5 contro 119;
- `/it/calcolatori/`: 0 contro 77;
- calcolatore carburante: 1 contro 49;
- calcolatore costo/km: 0 contro 33.

Nelle ultime 24 ore osservate dopo la chiusura del rollout risultavano 12 impressioni, zero clic e posizione media 15,6. È un campione preliminare, non una finestra decisionale.

## Controlli tecnici Search Console

| Controllo | Evidenza |
| --- | --- |
| Azioni manuali | **Nessun problema rilevato** |
| Problemi di sicurezza | **Nessun problema rilevato** |
| Rimozioni | Nessuna richiesta negli ultimi sei mesi |
| Indicizzazione | 40 URL indicizzate, 3 escluse nel report aggiornato il 17 agosto |
| Sitemap | Quattro sitemap figlie, tutte `Success` il 22 agosto |
| Crawl | 223 richieste il 21 agosto, 96% HTTP 200, risposta media 86 ms |
| Host | Nessun problema di disponibilità negli ultimi 90 giorni |
| HTTPS | 22 URL HTTPS, 0 non HTTPS |
| Breadcrumb | 16 valide, 0 non valide |
| Link | 90 interni, **0 esterni rilevati** |

Le tre esclusioni sono:

- `http://routebudget.eu/`: reindirizzamento atteso;
- `/it/guide/preventivo-trasporto-pdf/`: rilevata ma non indicizzata;
- `/it/guide/pedaggio-camion-danimarca-2026/`: scansionata ma non indicizzata.

Il test live di `preventivo-trasporto-pdf` restituisce URL disponibile a Google, indicizzabile e con breadcrumb valido. L’esclusione indica selezione/autorità o ritardo, non blocco tecnico.

## Diagnosi causale

1. **Media confidenza — coincidenza con lo spam update.** Il crollo inizia durante il rollout ufficiale 18–21 agosto e colpisce sito, Italia e dispositivi insieme. È la spiegazione meglio allineata nel tempo, non una prova site-specific fornita da Google.
2. **Alta confidenza — autorità fragile.** Search Console non rileva link esterni. Un dominio nato ad agosto può oscillare molto anche con tecnica corretta.
3. **Media confidenza — ritmo editoriale search-first.** Le 48 pagine sono sostanziali e non duplicate, ma un’elevata velocità su dominio nuovo può assomigliare a produzione per query. Google non vieta tre pubblicazioni al giorno; vieta produzione scalata principalmente per manipolare ranking e priva di valore originale.
4. **Media confidenza — intento ambiguo isolato.** `costo-orario-autista-camion` riceve query per autista privato/NCC, fuori dal pubblico del prodotto.
5. **Bassa confidenza come causa — performance.** Lighthouse e budget sono sani; non spiegano un crollo simultaneo del 92,9%.

Audit contenuto: 48 documenti, nessun paragrafo esatto ripetuto tra pagine e massima somiglianza osservata dei 5-grammi circa 2,2%. Non emerge un sito copiato o riscritto per sinonimi.

## Correzioni della release

- chiarita nelle prime righe la destinazione trasporto merci della guida sul costo autista;
- sostituiti due riferimenti UDSC non raggiungibili con risorse ufficiali correnti;
- aggiunta dichiarazione visibile e verificata sull’assistenza AI e sulla responsabilità editoriale;
- rimossa la richiesta Manifest dalle pagine contenuto, evitando il caricamento indiretto di un’icona da circa 251 KB;
- disattivato il video hero anche su connessioni `3g`;
- aggiunta policy referrer alle pagine generate, legali e 404;
- aggiunti `.env` e varianti al `.gitignore`;
- eseguito audit completo di dipendenze di produzione e build con zero vulnerabilità; estensione CI rinviata perché la credenziale di pubblicazione corrente non dispone dello scope `workflow`;
- predisposto `/.well-known/security.txt` nella release, da verificare con risposta live `200` dopo il deploy;
- aggiunti test regressivi per disclosure, referrer policy, Manifest e security.txt.

## Piano di recupero

1. Pubblicare questa release senza cambiare URL o cancellare pagine.
2. Reinviare `sitemap.xml` una volta e testare soltanto URL sostanzialmente modificate.
3. Non cambiare title/H1 ogni giorno; attendere sette giorni completi successivi alla chiusura dell’update.
4. Confrontare 22–28 agosto con 15–21 agosto, poi 28 giorni con i 28 precedenti.
5. Dare priorità a prove originali, calcolatori e fonti italiane; nuova pagina solo per intento distinto verificato.
6. Ottenere citazioni editoriali reali da associazioni, blog di settore, partner o directory pertinenti. Nessun acquisto di link e nessuno scambio massivo.
7. Misurare click verso gli store con soluzione privacy-safe separatamente approvata; Search Console non misura installazioni.

Fonti operative: [Google Search Status Dashboard](https://status.search.google.com/), [diagnosi dei cali di traffico](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops), [politiche spam](https://developers.google.com/search/docs/essentials/spam-policies) e [linee guida sui contenuti assistiti da AI](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content). Dati GSC letti dalla proprietà autenticata; nessun export grezzo o credenziale è salvato nel repository.
