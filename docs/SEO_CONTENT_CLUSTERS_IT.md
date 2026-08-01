# RouteBudget EU — cluster SEO italiani

Data architettura: 1 agosto 2026. Stato: preparato nel build locale, non distribuito.

## Principio

RouteBudget non pubblica un blog generico. Ogni URL risolve un lavoro economico distinto per autisti, padroncini e piccole imprese: capire il costo, controllare una voce, decidere un prezzo o preparare un riepilogo. Un pillar spiega il metodo completo; un supporto approfondisce una domanda; un calcolatore risolve un problema stretto; la landing app mostra il flusso completo senza presentarsi come TMS, navigatore o fonte ufficiale di pedaggi.

Inventario iniziale validato:

- 3 pillar;
- 8 guide di supporto;
- 2 calcolatori gratuiti;
- 1 landing app;
- hub `/it/guide/` e `/it/calcolatori/`.

I tre hub tematici candidati (`/it/costi-autotrasporto/`, `/it/preventivi-trasporto/`, `/it/margini-e-tariffe/`) restano architettura futura. Non vengono indicizzati finché non hanno abbastanza pagine distinte e dati Search Console che ne giustifichino utilità. Evita thin pages.

## Cluster 1 — costo della tratta

Pillar: `/it/guide/calcolo-costo-trasporto/`

Search job: raccogliere input e stimare un costo operativo completo prima di discutere tariffa o margine.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `calcolare-carburante-pedaggi-autista` | Allinea tre costi diretti e fonti di verifica | Calcolatore carburante o pillar |
| `ritorno-a-vuoto-autotrasporto` | Mostra effetto dei km non fatturati su tutte le voci | Calcolatore costo/km |
| `proteggere-margine-tratta` | Stress test di costo, prezzo, margine e ricarico | Scenari RouteBudget |
| calcolatore `costo-carburante-viaggio` | Litri e costo da km, L/100 km e prezzo inseriti | Aggiungere costi mancanti nell’app |

Pedaggi, costo autista e carburante restano insieme nella guida sui costi diretti: la ricerca ha mostrato intento utile, ma una seconda URL pedaggi sovrapporrebbe contenuto. Una pagina autonoma nasce solo se GSC dimostra query e compito distinti.

## Cluster 2 — costi dell’autotrasporto

Pillar: `/it/guide/costi-autotrasporto/`

Search job: distinguere costi fissi, variabili e indiretti, quindi attribuirli a periodo, chilometri e tratta.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `costi-fissi-variabili-autotrasporto` | Classifica e ripartisce le voci senza benchmark universali | Calcolatore costo/km |
| `costo-chilometrico-camion` | Ricava un costo storico da spese e km dello stesso periodo | Confronto con nuova tratta |
| `usura-manutenzione-camion` | Costruisce quota da storico aziendale evitando doppio conteggio | Inserimento quota nel calcolo |
| calcolatore `costo-chilometrico-camion` | Stima costo totale, per km percorso e per km carico | Flusso completo RouteBudget |

La guida costo/km e il calcolatore omonimo non competono: la prima usa il consuntivo di un periodo; il secondo stima una singola tratta da input dichiarati.

## Cluster 3 — preventivi, tariffe e margine

Pillar: `/it/guide/preventivo-trasporto/`

Search job: trasformare il costo in proposta leggibile senza inventare un prezzo di mercato universale.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `errori-calcolo-tariffa-trasporto` | Checklist prima dell’offerta | Ricalcolo costo/km |
| `preventivo-trasporto-pdf` | Struttura del documento, inclusioni, esclusioni e validità | PDF RouteBudget non vincolante |
| `proteggere-margine-tratta` | Punto di pareggio, ricarico, margine e sensibilità | Tre scenari prezzo |

`preventivo-trasporto` copre processo commerciale completo; `preventivo-trasporto-pdf` copre solo struttura e controllo del documento. Il confine è registrato nella mappa keyword.

## Landing app

`/it/app-per-autotrasportatori/` intercetta intento commerciale “app/software per calcolo costi e preventivi camion”. Contiene HTML statico, funzioni verificate, limiti, link a guide/calcolatori e badge ufficiali. Non dichiara routing per mezzi pesanti, Google Maps, tracking, pedaggi live o funzionalità Trip Android.

## Regole di collegamento

1. Ogni supporto include il pillar nella propria lista `related` e lo rende visibile nel rail.
2. Ogni pillar restituisce link ai supporti principali del cluster.
3. Ogni contenuto include `relatedCalculator`; il riferimento compare anche nei link correlati.
4. Ogni pagina pubblicata ha 2–5 relazioni curate; i pillar possono superare cinque per restituire l’intero cluster.
5. Guide e calcolatori sono raggiungibili dai due hub tramite anchor HTML.
6. Homepage statica collega entrambi gli hub e landing app.
7. CTA store appare dopo la risposta, usa URL reali e badge ufficiali, senza popup o urgenza.
8. Anchor descrittivi; niente inserimento automatico su ogni keyword.

## Backlog condizionato a dati

- costo autista per viaggio autonomo;
- pagina pedaggi autonoma;
- calcolatore margine;
- calcolatore prezzo minimo;
- guida durata operativa e pause con revisione normativa;
- hub tematici dedicati;
- traduzioni.

Ogni candidato richiede SERP distinta, brief, fonti, product-truth review e almeno due link in ingresso. Traduzioni solo dopo segnali italiani o valore strategico verificato; canonical e hreflang reciproci solo quando entrambe le pagine esistono.
