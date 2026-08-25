# RouteBudget EU — cluster SEO italiani

Data architettura: 22 agosto 2026. Stato: inventario Round 11 in validazione pre-release; baseline GSC corrente registrata nella [baseline del 22 agosto](./GSC_BASELINE_2026-08-22.md) e nella [ricerca Round 11](./SEO_RESEARCH_ROUND_11_2026-08-22.md).

## Principio

RouteBudget non pubblica un blog generico. Ogni URL risolve un lavoro economico distinto per autisti, padroncini e piccole imprese: capire il costo, controllare una voce, decidere un prezzo o preparare un riepilogo. Un pillar spiega il metodo completo; un supporto approfondisce una domanda; un calcolatore risolve un problema stretto; la landing app mostra il flusso completo senza presentarsi come TMS, navigatore o fonte ufficiale di pedaggi.

Inventario iniziale validato:

- 3 pillar;
- 41 guide di supporto;
- 3 calcolatori gratuiti;
- 1 landing app;
- hub `/it/guide/` e `/it/calcolatori/`.

Totale post-build atteso: **48 pagine contenuto**. La sitemap articoli conterrà 44 URL e l'insieme delle sitemap 53 URL indexabili; questi conteggi tecnici non equivalgono a URL già indicizzate da Google.

I tre hub tematici candidati (`/it/costi-autotrasporto/`, `/it/preventivi-trasporto/`, `/it/margini-e-tariffe/`) restano architettura futura. Non vengono indicizzati finché non hanno abbastanza pagine distinte e dati Search Console che ne giustifichino utilità. Evita thin pages.

## Cluster 1 — costo della tratta

Pillar: `/it/guide/calcolo-costo-trasporto/`

Search job: raccogliere input e stimare un costo operativo completo prima di discutere tariffa o margine.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `calcolare-carburante-pedaggi-autista` | Allinea tre costi diretti e fonti di verifica | Calcolatore carburante o pillar |
| `quanto-consuma-un-camion` | Misura l/100 km, fattori e profili usando dati del mezzo | Calcolatore carburante |
| `prezzo-gasolio-autotrasporto-preventivo` | Sceglie un prezzo datato per la missione senza confondere costo aziendale, media pubblica e indice contrattuale | Calcolo carburante, scenario e PDF non vincolante |
| `calcolo-pedaggio-camion` | Spiega classe, assi, km tariffari, concessionari e verifica | Calcolatore costo/km con importo controllato |
| `pedaggio-a22-camion-2026` | Possiede classe Assi-Sagoma, caselli e aggiornamento Autobrennero 2026 senza pubblicare un prezzo universale | Importo A22 ufficiale nel costo tratta e nel PDF |
| `pedaggio-camion-austria` | Possiede GO-Maut, assi, classi EURO/CO₂ e sezioni speciali austriache | Calcolatore costo/km con importo ASFINAG verificato |
| `pedaggio-camion-svizzera` | Possiede TTPCP, peso determinante, classe emissioni e NMTS/TTPCP III | Calcolatore costo/km con importo UDSC verificato |
| `pedaggio-camion-germania` | Possiede LKW-Maut, rete, massa tecnica, assi, EURO e classe CO₂ 2026 | Calcolatore costo/km con importo Toll Collect verificato |
| `pedaggio-camion-paesi-bassi` | Possiede Vrachtwagenheffing, fine Eurovignetta, OBU e due finestre tariffarie 2026 | Calcolatore costo/km con importo Trucktoll/provider verificato |
| `pedaggio-camion-belgio` | Possiede Viapass, quattro zone tariffarie, IVA vallona e classe CO₂ fiamminga | Calcolatore costo/km con totale Viapass verificato |
| `pedaggio-camion-slovenia` | Possiede DarsGo, soglia oltre 3,5 t, sezioni, assi, EURO e classe CO₂ | Calcolatore costo/km con importo DARS verificato |
| `pedaggio-camion-francia` | Possiede concessionari francesi, classi camion e costi distinti di Fréjus e Monte Bianco | Calcolatore costo/km con importo ufficiale verificato |
| `costo-traghetto-camion-sardegna` | Separa preventivo marittimo, ETS/bunker, metri lineari e costo terrestre della missione | Costo tratta e preventivo con quota traghetto documentata |
| `costo-traghetto-camion-sicilia` | Possiede attraversamento dello Stretto, direzione, scaglione MTL, inclusioni e tempo operativo | Costo verificato per leg, missione completa e PDF non vincolante |
| `eurovignette-camion-2026` | Possiede tariffa temporale, Paesi aderenti, durata, assi e classi; separa l'uscita olandese | Totale pedaggi manuale con quota vignetta documentata |
| `pedaggio-camion-repubblica-ceca` | Possiede MYTO CZ, rete pesanti, massa, assi, EURO, CO₂ e dispositivo | Calcolatore costo/km con importo MYTO verificato |
| `pedaggio-camion-ungheria-2026` | Possiede HU-GO, classi J2–J5, OBU/route ticket e cambi 2026 | Calcolatore costo/km con importo HU-GO verificato |
| `pedaggio-camion-danimarca-2026` | Possiede KmToll, CO₂, LEZ e ponti Storebælt/Øresund separati | Calcolatore costo/km con importi verificati |
| `bgtoll-camion-bulgaria-2026` | Possiede BGTOLL, Route Pass, massa, assi, EURO/CO₂ e percorso dichiarato | Calcolatore costo/km con totale BGTOLL verificato |
| `costo-traghetto-camion-calais-dover-2026` | Possiede preventivo freight, nolo, BAF/ETS e confine Calais–Dover | Costo terrestre, scenari e PDF con preventivo corrente |
| `pedaggio-camion-serbia-2026` | Possiede categorie III/IV Putevi Srbije, tariffario RSD/EUR, TAG categoria IV e Toll4All | Calcolatore costo/km con importo ufficiale verificato |
| `traghetto-camion-italia-grecia` | Possiede quotazione cargo adriatica per rotta, data, unità, autisti, reefer/ADR e check-in | Costo terrestre + mare, scenari e PDF non vincolante |
| `pedaggio-camion-polonia-2026` | Possiede rete e-TOLL, massa complesso, classe EURO, PLN/km, registrazione e OBU/ELS | Calcolatore costo/km con importo e-TOLL verificato |
| `tempi-guida-riposo-camion` | Distingue le categorie di tempo e porta la durata pianificata nel costo | Calcolatore costo/km con ore verificate |
| `ritorno-a-vuoto-autotrasporto` | Mostra effetto dei km non fatturati su tutte le voci | Calcolatore costo/km |
| `proteggere-margine-tratta` | Stress test di costo, prezzo, margine e ricarico | Scenari RouteBudget |
| calcolatore `costo-carburante-viaggio` | Litri e costo da km, L/100 km e prezzo inseriti | Aggiungere costi mancanti nell’app |
| calcolatore `fuel-surcharge-autotrasporto` | Adeguamento carburante da base, quota e indice inseriti | Riportare variazione nella trattativa |

Round 11 usa domanda esclusivamente italiana: Suggest exact per `calcolo costi trasporto camion excel` e `prezzo gasolio autotrasporto`, problemi reali documentati nei forum italiani e un segnale direzionale A22 per calcolo, Brennero, costo e aumento. Nessuna evidenza fornisce volume mensile o garantisce traffico; per `pedaggio A22 camion` non viene dichiarato volume truck-specific. I calcolatori eseguono soltanto formule dichiarate da input utente.

Il filtro GSC `consumo medio camion` ha diviso 35 impressioni sul calcolatore carburante, 16 sulla guida consumo, 1 sul hub e 1 sul calcolatore costo/km. Owner informativo resta `quanto-consuma-un-camion`; il tool carburante possiede soltanto il calcolo numerico da consumo già noto.

## Cluster 2 — costi dell’autotrasporto

Pillar: `/it/guide/costi-autotrasporto/`

Search job: distinguere costi fissi, variabili e indiretti, quindi attribuirli a periodo, chilometri e tratta.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `costi-fissi-variabili-autotrasporto` | Classifica e ripartisce le voci senza benchmark universali | Calcolatore costo/km |
| `costo-chilometrico-camion` | Ricava un costo storico da spese e km dello stesso periodo | Confronto con nuova tratta |
| `costo-furgone-per-km` | Separa costo N1, tempo, vuoti e km fatturabili dai parametri camion | Calcolatore costo/km usato con dati del mezzo corretto |
| `quanto-consuma-un-furgone` | Misura L/100 km, km/l o kWh/100 km N1 per energia, carico e allestimento | Configurazione N1 e costo missione nell'app |
| `costo-autostrada-furgone` | Separa categoria N1, classe tariffaria A/B e pedaggio ufficiale italiano | Totale verificato inserito una volta nel breakdown N1 |
| `tachigrafo-furgoni-2026` | Verifica il perimetro transfrontaliero dal 1° luglio senza dire “tutti gli N1” | Costo della tratta con massa, attività e tempi verificati |
| `tabelle-costi-autotrasporto-mit-2026` | Legge classi A–D e voci applicabili come benchmark datato | Confronto con dati reali nel calcolatore costo/km |
| `costo-orario-autista-camion` | Separa costo aziendale, retribuzione e prezzo; costruisce un input orario | Calcolatore costo/km con dato aziendale |
| `usura-manutenzione-camion` | Costruisce quota da storico aziendale evitando doppio conteggio | Inserimento quota nel calcolo |
| `calcolo-costi-trasporto-camion-excel` | Separa anagrafiche, tariffe con decorrenza, missioni, formule e versioni del foglio | Controllo mobile e PDF RouteBudget senza import/export Excel |
| calcolatore `costo-chilometrico-camion` | Stima costo totale, per km percorso e per km carico | Flusso completo RouteBudget |

La guida costo/km e il calcolatore omonimo non competono: la prima usa il consuntivo di un periodo; il secondo stima una singola tratta da input dichiarati. `costo-furgone-per-km` possiede l'economia completa in €/km; `quanto-consuma-un-furgone` possiede il consumo per energia/allestimento; `costo-autostrada-furgone` possiede classe e pedaggio italiano. Nessuna riutilizza benchmark, esempi o regole camion come equivalenti.

## Cluster 3 — preventivi, tariffe e margine

Pillar: `/it/guide/preventivo-trasporto/`

Search job: trasformare il costo in proposta leggibile senza inventare un prezzo di mercato universale.

| Pagina | Ruolo unico | Passo successivo |
| --- | --- | --- |
| `errori-calcolo-tariffa-trasporto` | Checklist prima dell’offerta | Ricalcolo costo/km |
| `preventivo-trasporto-pdf` | Struttura del documento, inclusioni, esclusioni e validità | PDF RouteBudget non vincolante |
| `tempi-attesa-carico-scarico-autotrasporto` | Separa franchigia, prova, indennizzo, costo interno e condizione commerciale | Stima del costo; clausole gestite fuori dal PDF app |
| `proteggere-margine-tratta` | Punto di pareggio, ricarico, margine e sensibilità | Tre scenari prezzo |
| `tariffe-trazionisti` | Decide se una specifica offerta di subvezione copre km reali, tempo, vuoto, costi e cassa | Controllo missione e scenari RouteBudget |
| `clausola-adeguamento-carburante-autotrasporto` | Documenta fonte, periodo, soglia e applicazione contrattuale senza replicare il calcolatore | Verifica formula, costo tratta e condizioni con il professionista pertinente |

`preventivo-trasporto` copre il processo commerciale completo; `preventivo-trasporto-pdf` copre struttura e controllo del documento; `calcolo-costi-trasporto-camion-excel` possiede architettura e versioni del foglio interno; `tariffe-trazionisti` parte invece da un'offerta ricevuta nella subvezione e termina con una decisione accept/reject. Il confine è registrato nella mappa keyword.

## Landing app

`/it/app-per-autotrasportatori/` intercetta intento commerciale “app/software per calcolo costi e preventivi camion”. Contiene HTML statico, funzioni verificate, limiti, link a guide/calcolatori e badge ufficiali. Non dichiara routing per mezzi pesanti, Google Maps, tracking, pedaggi live o funzionalità Trip Android.

## Regole di collegamento

1. Ogni supporto include il pillar nella propria lista `related` e lo rende visibile nel rail.
2. Ogni pillar restituisce link ai supporti principali del cluster.
3. Ogni contenuto include `relatedCalculator` quando un tool web rappresenta correttamente il compito; i flussi privi di equivalente usano `null` e convertono verso l'app senza claim impropri.
4. Ogni pagina pubblicata ha 2–5 relazioni curate; i pillar possono superare cinque per restituire l’intero cluster.
5. Guide e calcolatori sono raggiungibili dai due hub tramite anchor HTML.
6. Homepage statica collega entrambi gli hub e landing app.
7. CTA store appare dopo la risposta, usa URL reali e badge ufficiali, senza popup o urgenza.
8. Anchor descrittivi; niente inserimento automatico su ogni keyword.

Round 11 assegna almeno due ingressi contestuali a ciascuna nuova guida: pillar costo e preventivo verso Excel; consumo e clausola verso prezzo gasolio; metodo pedaggio e pillar costo verso A22. I tre supporti restituiscono pillar, calcolatore e contenuti pertinenti. Il grafo deve chiudere con zero URL orfane e zero link rotti.

GSC rileva 0 link esterni e 90 interni. Nuovi contenuti e internal linking non sostituiscono autorità editoriale: crescita off-site deve arrivare da citazioni reali e pertinenti, non da acquisto link o directory massive.

## Backlog condizionato a dati

- calcolatore margine;
- calcolatore prezzo minimo;
- calcolatore N1 autonomo, solo dopo domanda transazionale sufficiente e verifica prodotto;
- worksheet somma pedaggi, solo se distinto dalla guida pubblicata;
- calcolatore tachigrafico o di conformità, solo con scope prodotto e revisione normativa dedicati;
- hub tematici dedicati;
- traduzioni.
- guida `costo trasporto ADR` soltanto dopo scope prodotto e revisione legale/sicurezza; rifiutata nel Round 10 per mismatch con funzioni reali.

Ogni candidato richiede SERP distinta, brief, fonti, product-truth review e almeno due link in ingresso. Traduzioni solo dopo segnali italiani o valore strategico verificato; canonical e hreflang reciproci solo quando entrambe le pagine esistono.

## Round 13 — decisioni operative italiane

| Pagina | Cluster | Ruolo unico | Confine prodotto |
| --- | --- | --- | --- |
| `guadagno-padroncino-camion` | preventivi, tariffe e margine | missione → risultato mese → cassa → obblighi esterni | nessuna contabilità, imposta, contribuzione o promessa di utile |
| `conviene-comprare-furgone-elettrico` | costi dell'autotrasporto | fattibilità dei giri prima, convenienza incrementale poi | nessun consiglio di acquisto, TCO garantito o colonnina live |
| `trasporto-spot-significato` | preventivi, tariffe e margine | definizione più decisione su una singola offerta breve | nessuna borsa carichi, quotazione live o verifica cliente |

Le tre pagine si collegano soltanto quando il passaggio operativo è reale: carico spot nel conto del padroncino; tecnologia del mezzo nel costo mensile; missione occasionale nel profilo energetico N1. Non esiste variante geografica, sinonimica o tradotta automatica. Il batch del 25 agosto risponde a tre lavori distinti verificati; non istituisce una cadenza fissa di tre URL al giorno.
