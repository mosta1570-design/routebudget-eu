# RouteBudget EU — Strategia di crescita organica

Documento operativo · mercato iniziale: Italia · lingua editoriale primaria: italiano

## 1. Mandato

Il sito RouteBudget deve funzionare come due sistemi collegati:

1. una presenza prodotto premium che spiega l'app, mostra schermate autentiche e porta agli store;
2. un motore editoriale che intercetta problemi reali dell'autotrasporto, li risolve con guide e strumenti utili e introduce l'app solo quando completa naturalmente il lavoro.

L'obiettivo non è pubblicare molte pagine. È costruire nel tempo una raccolta riconoscibile e affidabile sul calcolo economico di una tratta. Non esistono garanzie di traffico, indicizzazione o posizionamento; le decisioni si prendono sui dati disponibili e sulla qualità del contenuto.

## 2. Verità di prodotto non negoziabile

Ogni pagina, esempio e CTA deve rispettare questi confini:

- RouteBudget produce **stime operative non vincolanti**, non tariffe ufficiali o prezzi garantiti.
- Il prezzo di carburante o energia è inserito dall'utente; non esiste un feed di prezzi live.
- I pedaggi possono essere stimati, richiedere verifica o inserimento manuale; non sono una copertura esatta e in tempo reale di tutta Europa.
- La distanza stradale automatica usa un servizio online; non è navigazione turn-by-turn, routing per mezzi pesanti o traffico live.
- I calcoli principali e l'Archivio funzionano sul dispositivo; distanza online, acquisti, ripristino e sincronizzazione dell'abbonamento richiedono rete.
- Free include tre calcoli. Pro aggiunge calcoli illimitati e logo aziendale nei PDF. I prezzi sono quelli mostrati da App Store o Google Play al momento dell'acquisto.
- Il Trip Tracking con posizione in primo piano è solo iOS. Android non offre Trip Tracking, Maps o GPS del dispositivo.
- L'app supporta sette lingue, ma l'espansione editoriale parte dall'italiano e traduce solo contenuti già validati.
- Nessun account RouteBudget, pubblicità, Firebase Analytics, tracciamento tra app o cloud gestito dallo sviluppatore.

Formulazioni consigliate: “stima”, “indicativo”, “aiuta a valutare”, “prima di accettare la tratta”. Evitare: “esatto”, “garantito”, “conforme per legge”, “100% offline”, “tutti i pedaggi europei”, “profitto assicurato”.

## 3. Punto di partenza verificato

Al 1 agosto 2026:

- la landing premium e i collegamenti pubblici ad App Store e Google Play esistono;
- il repository usa `https://routebudget.eu/` come target canonico; pubblicazione sul dominio resta da verificare dopo il deploy;
- il worktree genera `/robots.txt` con scansione consentita e riferimento a `https://routebudget.eu/sitemap.xml`; disponibilità pubblica resta da verificare dopo il deploy;
- il sito pubblico precedente esponeva un sitemap bootstrap con homepage, Privacy e Termini; il worktree ora genera durante la build un inventario di 15 URL (3 fisse, 2 hub, 3 pillar, 5 guide e 2 calcolatori), da verificare sul sito solo dopo il deploy;
- il selettore IT/EN della landing cambia contenuto sulla stessa URL: le future pagine organiche dovranno invece avere URL distinte e scansionabili;
- Privacy e Termini pubblici descrivono l'app, non autorizzano automaticamente un sistema di analytics del sito.

Questa baseline evita di confondere output verificato in `dist/`, deploy pubblico, indicizzazione e crescita: sono quattro stati distinti.

## 4. Pubblico e lavori da svolgere

| Pubblico | Decisione concreta | Contenuto utile | Passaggio naturale verso RouteBudget |
| --- | --- | --- | --- |
| Autista | Capire quali voci incidono su una tratta | formula, esempio, errori da evitare | completare il calcolo con mezzo, pedaggi e tempi nell'app |
| Padroncino | Sapere il prezzo sotto il quale il viaggio non regge | costo/km, ritorno a vuoto, pareggio e margine | confrontare Minimo, Consigliato e Ideale |
| Piccola impresa | Preparare e spiegare un prezzo al cliente | struttura del preventivo, costi inclusi/esclusi | generare e condividere il PDF, conservare la tratta nell'Archivio |

Sono fuori perimetro traffico generico su camion, cronaca, patente, offerte di lavoro, turismo stradale o logistica non collegata a costi, prezzo, margine e preventivo.

## 5. Il ciclo di crescita

Ogni iterazione produce una decisione documentata:

1. **Rilevare il problema.** Search Console, domande di supporto anonimizzate, fonti ufficiali e lavoro sul prodotto alimentano il backlog.
2. **Definire intento e pagina.** Una query non è un titolo automatico: si stabiliscono utente, compito, risposta promessa e formato migliore.
3. **Pubblicare utilità originale.** Guida, tabella, esempio o calcolatore deve risolvere il compito anche senza installare l'app.
4. **Rendere la pagina scopribile.** URL stabile, HTML scansionabile, canonical, collegamenti interni e sitemap.
5. **Osservare.** Search Console misura query, impressioni, clic, CTR, pagina, Paese e dispositivo; non dimostra da solo installazioni o ricavi.
6. **Migliorare il contenuto che mostra domanda.** Titolo, introduzione, risposte mancanti, esempi, link e CTA vengono aggiornati con un'ipotesi esplicita.
7. **Espandere il cluster vincente.** Si crea supporto attorno a problemi reali, poi si localizzano solo le pagine italiane dimostrate utili.

La procedura giornaliera e i controlli di pubblicazione sono in [SEO_EDITORIAL_WORKFLOW.md](./SEO_EDITORIAL_WORKFLOW.md). Il ciclo dati è in [SEARCH_CONSOLE_OPERATIONS.md](./SEARCH_CONSOLE_OPERATIONS.md).

## 6. Architettura italiana

### Radice di prodotto

- `/` — landing premium, panoramica verificata e accesso agli store.

### Hub editoriali

- `/it/guide/` — guide e pillar.
- `/it/calcolatori/` — strumenti gratuiti e relativa spiegazione.
- `/it/confronti/` — decisioni, metodi e scenari confrontati senza classifiche artificiali.

### Spina iniziale

Pillar:

- `/it/guide/calcolo-costo-trasporto/`
- `/it/guide/costi-autotrasporto/`
- `/it/guide/preventivo-trasporto/`

Primi strumenti:

- `/it/calcolatori/costo-chilometrico-camion/`
- `/it/calcolatori/costo-carburante-viaggio/`

Guide di supporto M1 generate nel build, con pubblicazione da confermare dopo il deploy:

- `/it/guide/calcolare-carburante-pedaggi-autista/`
- `/it/guide/costi-fissi-variabili-autotrasporto/`
- `/it/guide/costo-chilometrico-camion/`
- `/it/guide/errori-calcolo-tariffa-trasporto/`
- `/it/guide/proteggere-margine-tratta/`

Il dominio personalizzato mantiene i path da `/it/` in avanti. Gli slug non includono l'anno salvo che l'anno sia parte essenziale dell'intento; gli aggiornamenti sostanziali avvengono sulla stessa URL.

## 7. Modello a cluster

Ogni pillar risponde al problema ampio e coordina pagine più specifiche.

### Cluster A — Calcolo del costo di trasporto

Pillar: `calcolo-costo-trasporto`.

Temi di supporto: costo chilometrico, carburante, pedaggi, costo autista, usura, ritorno a vuoto, durata e pause indicative, errori nella formula.

### Cluster B — Costi dell'autotrasporto

Pillar: `costi-autotrasporto`.

Temi di supporto: costi fissi e variabili, manutenzione, pneumatici, assicurazione e ammortamento, voci per singola tratta, dati da consuntivo. Quando una voce non è calcolata esplicitamente dall'app, il contenuto deve dirlo e non trasformarla in una funzione RouteBudget.

### Cluster C — Preventivo e decisione sul prezzo

Pillar: `preventivo-trasporto`.

Temi di supporto: pareggio, margine contro ricarico, prezzo minimo/consigliato/ideale, struttura del preventivo, costi da mostrare al cliente, PDF non vincolante.

Ogni contenuto di supporto deve avere:

- un link contestuale al pillar;
- da due a sei link a guide o strumenti realmente collegati;
- un link alla funzione RouteBudget pertinente;
- una CTA di download coerente con l'intento;
- almeno un link editoriale in entrata da una pagina già esistente.

Una pagina orfana non è pronta per la pubblicazione.

## 8. Portafoglio di contenuti

| Tipo | Compito principale | Elementi obbligatori | CTA primaria |
| --- | --- | --- | --- |
| Pillar | spiegare un problema completo | formula, voci, esempio, indice, fonti, collegamenti al cluster | completa la tratta nell'app |
| Guida | risolvere una domanda specifica | risposta iniziale, procedura, esempio, limiti | funzione RouteBudget pertinente |
| Calcolatore | ottenere una stima semplice | formula visibile, input minimi, risultato spiegato, ipotesi e disclaimer | completa il flusso nell'app |
| Confronto | scegliere tra metodi/scenari | criteri dichiarati, tabella equilibrata, casi d'uso | confronta gli scenari nell'app |
| Pagina prodotto | capire cosa fa l'app | screenshot reali, disponibilità e limiti | App Store o Google Play |

Non esiste una lunghezza minima SEO. La pagina termina quando il compito è risolto in modo completo e verificabile. Google raccomanda contenuti originali, affidabili e people-first, non pagine costruite per una lunghezza o per aumentare il conteggio del sito: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## 9. Principi per i calcolatori gratuiti

Gli strumenti web sono dimostrazioni utili, non versioni gratuite complete dell'app.

Devono:

- mostrare formula, unità, arrotondamento e ipotesi;
- usare dati inseriti dall'utente, senza dichiararli prezzi o tariffe live;
- restituire una stima e spiegare cosa manca;
- funzionare da tastiera e su schermi piccoli;
- non inviare a telemetry origine, destinazione, consumi, retribuzioni, margini o risultati;
- offrire la risposta prima della CTA;
- rimandare all'app per mezzo, pedaggi, tempo operativo, scenari, PDF e Archivio.

Non devono replicare l'intera logica Pro, produrre un preventivo legalmente vincolante o suggerire che una stima web sostituisca verifica contabile, contrattuale o tariffaria.

## 10. Misurazione senza obiettivi inventati

### Indicatore guida

**Domanda organica qualificata che raggiunge un'azione di prodotto.** Non è un singolo numero: si legge come sequenza di segnali.

| Livello | Segnale | Fonte | Lettura corretta |
| --- | --- | --- | --- |
| Scoperta | URL indicizzate, impressioni non brand | Search Console | Google trova pagine pertinenti; non implica clic |
| Pertinenza | query/pagina, clic e CTR | Search Console | la pagina risponde al linguaggio reale; CTR va confrontato per intento e posizione |
| Profondità | crescita di un cluster, link interni usati | audit editoriale e, se approvato, eventi aggregati | il tema merita espansione |
| Conversione web | CTA e clic outbound agli store | eventi minimizzati, se autorizzati | interesse per l'app, non installazione |
| Esito prodotto | installazioni/acquisti aggregati | console degli store e RevenueCat | dato di prodotto; non va unito a identità o query individuali |

Nessuna soglia iniziale viene presentata come benchmark universale. Dopo un periodo sufficiente si costruisce una baseline per tipo di pagina, Paese e dispositivo. La tassonomia e i confini di attribuzione sono in [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md).

## 11. Regole di priorità

Prima si lavora su:

1. problemi centrali per costo, prezzo, margine e preventivo;
2. query già visibili in Search Console ma risposte in modo incompleto;
3. pagine con impressioni in crescita e un chiaro miglioramento possibile;
4. strumenti che rendono una formula più facile da usare;
5. collegamenti mancanti dentro un cluster già coerente.

Si sospende o accorpa quando:

- due URL rispondono allo stesso intento;
- la pagina dipende da dati che non possono essere mantenuti;
- il contenuto attira un pubblico estraneo al prodotto;
- non esiste una risposta originale o una fonte verificabile;
- l'unico motivo di pubblicazione è una keyword o una data aggiornata.

## 12. Espansione linguistica

Italiano resta il banco di prova. Inglese, tedesco, francese, polacco, romeno e arabo entrano solo quando una pagina italiana mostra domanda pertinente, utilità stabile e un processo di manutenzione sostenibile.

Per ogni traduzione:

- creare una URL separata e scansionabile, per esempio `/en/guide/...` sul dominio corrente, mantenendo stabile quel path;
- adattare esempi, terminologia, valuta, fonti e regole locali;
- usare canonical autoreferenziale, non canonical verso l'italiano;
- collegare reciprocamente tutte le varianti pubblicate con `hreflang` completi;
- non pubblicare una lingua se navigazione, contenuto principale e CTA non sono tradotti e revisionati.

Google richiede URL alternative complete e relazioni `hreflang` reciproche: [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 13. Cadenza di governo

### Ogni settimana

- revisione Search Console su query e pagine;
- scelta di poche azioni con responsabile e ipotesi;
- controllo delle pagine nuove o modificate;
- manutenzione dei link interni.

### Ogni mese

- confronto cluster, contenuti e CTA;
- audit di sovrapposizione degli intenti;
- verifica fonti sensibili a prezzo, pedaggi e normativa;
- scelta delle pagine da espandere, unire o fermare.

### Ogni trimestre

- revisione della mappa italiana e del debito di aggiornamento;
- controllo della verità di prodotto con il codice e gli store correnti;
- decisione esplicita sulle traduzioni;
- audit privacy della misurazione.

Il piano di rilascio è mantenuto in [SEO_6_MONTH_ROADMAP.md](./SEO_6_MONTH_ROADMAP.md), mentre keyword, cluster e calcolatori hanno documenti dedicati. Questi file sono registri operativi: le modifiche devono indicare motivo e data, non simulare freschezza.

## 14. Criteri di completezza strategica

Il motore è pronto a operare quando:

- i tre pillar e i due calcolatori iniziali hanno URL, brief, responsabile e fonti;
- il sistema di contenuti genera HTML scansionabile, metadata, canonical, sitemap e link interni;
- la proprietà Search Console corretta è verificata;
- esiste una routine settimanale con registro decisioni;
- ogni pagina organica ha un percorso utile verso il prodotto;
- eventuali eventi web rispettano il piano privacy e la disclosure pubblica;
- nessuna dashboard contiene obiettivi, ranking o risultati inventati.
