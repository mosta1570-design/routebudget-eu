# RouteBudget EU — ricerca SEO italiana round 6

Data decisione: 16 agosto 2026. Mercato: Italia, con utilità operativa per trasporti europei. Questa ricerca usa dati reali di Search Console, SERP italiana, Google Suggest e fonti primarie o settoriali correnti. Non attribuisce volumi mensili, keyword difficulty o garanzie di ranking non disponibili.

## Baseline Search Console

Finestra visibile nella proprietà dominio `routebudget.eu`: 1–14 agosto 2026. Lettura effettuata il 16 agosto 2026.

| Metrica | Valore |
| --- | ---: |
| Clic | 17 |
| Impressioni | 1.058 |
| CTR medio | 1,6% |
| Posizione media | 14,5 |
| Query visibili | 68 |

L'Italia genera 15 clic e 997 impressioni, quindi il 94,2% delle impressioni osservate. Mobile produce 645 impressioni, CTR 0,9% e posizione media 9,2; desktop 411 impressioni, CTR 2,7% e posizione media 22,8. Il contenuto deve quindi rispondere rapidamente e restare leggibile su telefono, senza sacrificare tabelle, fonti o limiti.

Segnali di domanda già acquisiti dal sito:

| Query | Clic | Impressioni | Posizione media | Decisione |
| --- | ---: | ---: | ---: | --- |
| `consumo medio camion` | 0 | 35 | 29,9 | posseduta dalla guida consumo; migliorare la pagina, non duplicarla |
| `costo km camion` | 0 | 13 | 27,5 | posseduta dal calcolatore costo/km |
| `preventivo trasporto` | 0 | 6 | 23,5 | posseduta dal pillar preventivo |
| `offerta di trasporto` | 0 | 5 | 15,6 | posseduta da preventivo e tariffe trazionisti |
| `mase fuel surcharge` | 0 | 4 | 10,0 | conferma interesse carburante; il calcolatore possiede la formula |
| `calcolatore dei tempi di guida` | 0 | 4 | 11,0 | guida informativa già pubblicata; nessuna promessa di conformità |
| `fuel surcharge significato` | 0 | 2 | 12,0 | supporta un intento contrattuale distinto solo se non replica il tool |

Pagine con maggiore esposizione nella stessa finestra:

| URL | Clic | Impressioni | Posizione media |
| --- | ---: | ---: | ---: |
| `/it/calcolatori/costo-chilometrico-camion/` | 6 | 139 | 15,9 |
| `/it/calcolatori/` | 1 | 279 | 12,8 |
| `/it/guide/calcolo-costo-trasporto/` | 1 | 158 | 16,6 |
| `/it/calcolatori/fuel-surcharge-autotrasporto/` | 1 | 43 | 7,2 |
| `/it/calcolatori/costo-carburante-viaggio/` | 0 | 270 | 15,3 |

Il calcolatore fuel surcharge è già vicino alla prima pagina. Una seconda pagina che possiede formula e risultato dividerebbe il segnale. La nuova guida carburante deve possedere esclusivamente contratto, documentazione e applicazione della clausola.

## Come sono state scelte le tre query

La selezione richiede quattro segnali insieme:

1. frase osservata in GSC o in Google Suggest italiano con `hl=it` e `gl=it`;
2. problema documentato nel 2026 da impresa, associazione, gestore o autorità;
3. lavoro economico che RouteBudget può sostenere senza inventare funzioni;
4. intento non posseduto da un URL esistente.

Google Suggest è usato soltanto per verificare il linguaggio della domanda. Non misura volume, conversione o difficoltà. Le notizie settoriali documentano il problema; regole e cifre sensibili vengono ricontrollate su fonte primaria.

## Le tre decisioni editoriali

### 1. `costo traghetto camion Sardegna 2026`

Problema umano: prima di accettare una tratta da o per l'isola, il vettore deve capire se il preventivo del traghetto, espresso anche per metro lineare e con componenti ETS o bunker, lascia ancora margine dopo strada, autista e ritorno.

- Google Suggest osservato: `traghetto camion sardegna`, `costo traghetto camion sardegna`.
- Evidenza 2026: rincari e impatto su autotrasporto documentati da RaiNews Sardegna, Regione Sardegna e Autorità di sistema portuale.
- Valore originale: worksheet che separa preventivo del vettore marittimo, costi terrestri, andata/ritorno e data di validità; nessun “prezzo medio” inventato.
- Confine prodotto: RouteBudget non prenota traghetti e non possiede una voce traghetto dedicata. Calcola tratta terrestre, tempo, pedaggi e margine; un eventuale totale aggregato nel pedaggio manuale deve restare documentato fuori dall'app.

### 2. `pedaggio camion Francia 2026`

Problema umano: il costo non è “Francia al km” in astratto. Cambiano concessionario, classe, percorso e infrastrutture speciali; Fréjus e Monte Bianco possono modificare la convenienza dell'intera missione.

- Google Suggest osservato: `calcolo pedaggio francia camion`, `pedaggio frejus camion`, `pedaggio monte bianco camion`.
- Evidenza 2026: tariffe e classificazioni pubblicate da gestori e fonti istituzionali, con tabelle specifiche per i trafori.
- Valore originale: metodo che separa autostrada e tunnel, classe 3/4, direzione, ritorno, restrizioni e data della verifica.
- Confine prodotto: RouteBudget non è collegato ai concessionari. L'importo ufficiale verificato viene usato come pedaggio manuale e sostituisce la stima economica automatica.

### 3. `clausola adeguamento carburante autotrasporto`

Problema umano: un calcolo corretto non serve se contratto, riferimento MASE, periodo, base del nolo e modalità di aggiornamento non sono documentati o vengono confusi con un contributo pubblico.

- GSC osserva già `mase fuel surcharge` e `fuel surcharge significato`; Suggest conferma `clausola adeguamento carburante` e `clausola adeguamento costo carburante`.
- Evidenza 2026: richieste di chiarimento e contestazioni descritte da FIAP e CNA, con disciplina vigente verificata sul testo normativo.
- Valore originale: percorso decisionale e dossier minimo; non un facsimile contrattuale e non una seconda calcolatrice.
- Confine prodotto: il calcolatore esistente mostra la formula; RouteBudget stima il costo della tratta e produce un PDF di stima. Nessuno dei due determina un obbligo, interpreta un contratto o genera consulenza legale.

## Opportunità respinte in questa release

| Tema | Motivo del rinvio |
| --- | --- |
| `rimborso accise gasolio autotrasporto 2026` | intento fiscale forte ma prodotto non gestisce eleggibilità, domanda o credito; rischio YMYL e manutenzione trimestrale elevati |
| `pedaggio camion Polonia 2026` | cambi e‑TOLL reali e fit alto, ma il seed esatto non ha restituito Suggest italiano nel controllo; resta backlog documentato |
| `divieti camion 2026` | domanda ampia ma prodotto non certifica itinerario o conformità; aggiornamento legale frequente |
| `indennità trasferta autisti 2026` | si sovrappone al costo orario e l'app non possiede una voce giornaliera dedicata |
| `consumo AdBlue camion` | intento distinto e Suggest presente, ma RouteBudget non espone una voce AdBlue dedicata; conversione inferiore |
| nuovi articoli su ritorno a vuoto, preventivo o costo/km | intenti già posseduti; una nuova URL sarebbe duplicazione |

## Protocollo people-first e uso responsabile dell'automazione

Google dichiara di valutare qualità, originalità, utilità e affidabilità, non il solo mezzo di produzione. L'uso esteso di automazione per creare molte pagine senza valore può invece rientrare nello scaled content abuse. Questa release segue quindi un protocollo più stretto della semplice generazione testuale:

- una sola query primaria e un lavoro reale per pagina;
- SERP e fonti lette prima della bozza, non riscritte dopo;
- calcolo originale ricalcolato e ipotesi dichiarate;
- fonte primaria accanto a ogni cifra o regola volatile;
- data di verifica e trigger di aggiornamento;
- nessuna esperienza di guida, cliente, test o intervista inventata;
- nessuna funzione RouteBudget non presente nel prodotto;
- se il prodotto non risolve una parte, il limite viene detto nella pagina;
- revisione legale, prodotto, SEO, link e build prima del deploy;
- tre pagine sostanziali, non varianti generate della stessa pagina.

Riferimenti Google: [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [uso di contenuti generativi](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) e [contenuto non commodity per AI Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Gate di pubblicazione

- [x] tre primary keyword e tre canonical unici;
- [x] fonti vive e claim volatili datati;
- [x] formule ed esempi ricalcolati;
- [x] nessun claim di prenotazione, tariffa live, compliance o contratto automatico;
- [x] link in ingresso da pillar o pagina adiacente;
- [x] zero URL orfani e zero link rotti;
- [x] Article/Breadcrumb schema valido e coerente col visibile;
- [x] sitemap include i tre canonical;
- [ ] produzione restituisce `200` prima di richiesta indice;
- [ ] baseline e data richiesta indice registrate senza promessa di indicizzazione.
