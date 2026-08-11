# RouteBudget EU — baseline Google Search Console

Data estrazione: 11 agosto 2026. Periodo osservato: 1–9 agosto 2026. Proprietà: `sc-domain:routebudget.eu`.

Questa baseline registra dati effettivi di Google Search Console. Impressioni e posizione non sono volumi di ricerca né previsioni. La finestra copre nove giorni e un sito giovane; confronti futuri devono usare periodi equivalenti e annotare pubblicazioni, modifiche e richieste di indicizzazione.

## Riepilogo proprietà

| Clic | Impressioni | CTR | Posizione media |
| ---: | ---: | ---: | ---: |
| 7 | 542 | 1,3% | 16,8 |

## Paese e dispositivo

L'Italia genera 513 impressioni e 6 clic: circa il 94,6% delle impressioni e l'85,7% dei clic totali. Il dato conferma la priorità editoriale italiana, senza escludere futuri segnali europei.

| Dispositivo | Clic coerenti con CTR arrotondato | Impressioni | CTR | Posizione media |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 3 | 323 | 0,93% | 8,2 |
| Desktop | 4 | 219 | 1,83% | 29,4 |

I clic per dispositivo sono ricavati da impressioni × CTR arrotondato e coincidono con i 7 clic totali. Il mobile mostra visibilità media migliore ma CTR inferiore: title, description, risposta iniziale e leggibilità mobile sono priorità di ottimizzazione. Il desktop mostra CTR migliore su una posizione media molto più bassa; i due effetti non vanno confrontati come se fossero condizioni identiche.

## Query osservate che guidano il piano

| Query | Impressioni | Posizione media | Decisione editoriale |
| --- | ---: | ---: | --- |
| `consumo medio camion` | 19 | 31,00 | Supporto informativo sul consumo misurato, senza media universale |
| `costo km camion` | 11 | 29,82 | Continuare a separare calcolatore di tratta e guida da consuntivo |
| `quanto consuma un camion` | 9 | 49,44 | Nuova guida canonica `/it/guide/quanto-consuma-un-camion/` |
| `preventivo trasporto` | 6 | 23,50 | Rafforzare pillar preventivo e collegamento al PDF/app |
| `calcolo del pedaggio per camion` | 2 | 67,00 | Intento distinto validato; nuova guida canonica `/it/guide/calcolo-pedaggio-camion/` |
| `costo chilometrico furgone ducato` | 1 | non registrata nel campione | Segnale N1 separato dal camion |
| `calcolo costi chilometrici furgoni` | 1 | non registrata nel campione | Nuova guida canonica `/it/guide/costo-furgone-per-km/` |

Le due varianti sul consumo producono almeno 28 impressioni osservate. Le query pedaggio e furgone hanno pochi dati, ma descrivono compiti distinti e compatibili con contenuti utili; la pubblicazione non implica domanda futura né ranking garantito.

## Pagine con maggiore visibilità nel campione

| Pagina | Impressioni | Clic | Posizione media nota | Lettura operativa |
| --- | ---: | ---: | ---: | --- |
| `/it/calcolatori/costo-carburante-viaggio/` | 169 | 0 | 15,96 | Visibilità già presente; rafforzare risposta al consumo e collegamento dalla nuova guida |
| `/it/calcolatori/` | 142 | 0 | — | Hub visibile ma senza clic; migliorare descrizioni dei tool e intent match |
| `/it/guide/calcolo-costo-trasporto/` | 105 | 1 | — | Pillar centrale da usare come destinazione e sorgente di internal link |
| `/it/calcolatori/costo-chilometrico-camion/` | 82 | 3 | — | Pagina con migliore contributo clic tra quelle elencate; proteggere intento transazionale |

Un trattino indica dato non incluso nell'estrazione, non valore zero.

## Stato indicizzazione

- 17 URL indicizzati.
- 2 URL esclusi.
- esclusione HTTP: redirect atteso, nessuna azione se canonical HTTPS e redirect restano corretti;
- `/it/calcolatori/fuel-surcharge-autotrasporto/`: `Crawled - currently not indexed`, da ricontrollare dopo release, sitemap aggiornata e internal link; evitare richieste ripetute senza modifica sostanziale.

Indicizzazione non garantisce impressioni. Prima verifica: presenza del nuovo URL nella sitemap, canonical self-referencing, risposta HTTP 200, HTML statico completo e link in ingresso dal relativo hub/pillar.

## Decisioni contenuto del 11 agosto 2026

1. Pubblicare `/it/guide/quanto-consuma-un-camion/` per l'intento informativo, lasciando il calcolo numerico a `/it/calcolatori/costo-carburante-viaggio/`.
2. Sostituire il vecchio rinvio sulla pagina pedaggi con `/it/guide/calcolo-pedaggio-camion/`: metodo, classi, assi, tratta e concessionari; nessuna promessa di importo ufficiale automatico.
3. Pubblicare `/it/guide/costo-furgone-per-km/` come guida N1 separata da camion, con limiti regolatori e dati del veicolo.
4. Mantenere un solo URL canonico per ciascun intento; varianti osservate diventano keyword secondarie, non pagine duplicate.

## Obiettivo 50.000 impressioni

`50.000 ÷ 542 = 92,3`

L'aspirazione di 50.000 impressioni richiede circa 92 volte le impressioni registrate in questa baseline. Il confronto è intenzionalmente severo ma non omogeneo: 542 copre nove giorni, mentre 50.000 è un obiettivo mensile. Non costituisce previsione o garanzia.

Le leve controllabili sono: copertura di intenti reali, indicizzazione pulita, internal linking, snippet coerenti, esperienza mobile, aggiornamenti basati su dati e qualità editoriale. Ranking, domanda e tempi di Google non sono controllabili.

## Protocollo di confronto

- Conservare questa finestra senza riscriverla retroattivamente.
- Misurare nuove pagine a 7, 14 e 28 giorni dalla pubblicazione, senza attribuire causalità ai primi movimenti.
- Confrontare anche query non-branded, paese Italia, mobile e singolo URL.
- Registrare impressioni, clic, CTR, posizione e stato di indicizzazione.
- Se due pagine ricevono la stessa query, verificare cannibalizzazione prima di cambiare title o creare altro contenuto.
- Aggiornare contenuto solo quando dati o utilità lo giustificano; evitare modifiche settimanali basate su campioni minimi.
