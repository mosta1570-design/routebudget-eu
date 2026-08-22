# Ricerca SEO Round 11 — Italia, 22 agosto 2026

## Decisione editoriale

Round 11 torna interamente sul lavoro quotidiano di padroncini, autisti e piccole imprese italiane. Le tre nuove URL risolvono compiti diversi:

1. `calcolo costi trasporto camion excel` — progettare un foglio verificabile, separare dati master e singola missione, controllare validità degli input e passare a scenari/PDF;
2. `prezzo gasolio autotrasporto` — scegliere quale prezzo documentato inserire oggi senza confondere fattura, dato corrente, media mensile, IVA o beneficio fiscale;
3. `pedaggio A22 camion` — verificare classe, caselli e importo Autobrennero 2026 e trasferirlo una sola volta nel preventivo.

Non sono varianti di `costo km`, `preventivo PDF` o `pedaggio camion Italia`. Excel possiede il processo del foglio; gasolio possiede la scelta dell’input; A22 possiede un corridoio italiano e il cambio tariffario 2026.

## Metodo

Ricerca effettuata con:

- Google Suggest pubblico con `client=firefox`, `hl=it`, `gl=it`;
- SERP italiana e domande reali di imprese in ForumExcel;
- fonti primarie MIT, MIMIT, MASE, Autostrade per l’Italia e Autobrennero;
- inventario di 45 pagine pubblicate e dati GSC del 22 agosto.

Autocomplete dimostra una formulazione e un problema cercato, non il volume mensile. `volume`, CPC e keyword difficulty restano non disponibili. Nessun risultato permette di promettere traffico, ranking o installazioni.

## Matrice di scelta

| URL | Segnale di domanda | Lavoro dell’utente | Passaggio RouteBudget | Confine |
| --- | --- | --- | --- | --- |
| `/it/guide/calcolo-costi-trasporto-camion-excel/` | Suggest restituisce la query exact; due thread italiani mostrano fogli costruiti per tratta, mezzo, date e costi | creare struttura, fonti e versioni senza formule fragili | input verificati → singola tratta → tre scenari → PDF non vincolante | nessun import/export Excel; niente TMS, listino o gestione clienti |
| `/it/guide/prezzo-gasolio-autotrasporto-preventivo/` | Suggest restituisce `prezzo gasolio autotrasporto` exact | scegliere un valore coerente con data, area e trattamento contabile | prezzo documentato → costo carburante → scenari/PDF | nessun prezzo live, calcolo accise o verifica fiscale nell’app |
| `/it/guide/pedaggio-a22-camion-2026/` | Suggest per `pedaggio a22` restituisce calcolo, Brennero, costo e aumento; non viene dichiarato volume truck-specific | scegliere classe e caselli nel gestore ufficiale | totale A22 verificato → costo tratta → margine/PDF | nessun calcolo Autobrennero live, pagamento o classificazione ufficiale |

## Evidenza umana: perché Excel è un problema vero

Un’impresa italiana descrive un foglio con autotrasportatore, origine, destinazione, tipo mezzo, data e prezzo per tonnellata; il problema nasce quando la tariffa ha decorrenza e scadenza. Un secondo caso usa tabelle di chilometri, carburante, autostrada e traghetto e chiede una formula meno fragile. Non si copia la soluzione dei forum: si risponde al bisogno con un modello dati, controlli di validità e limiti chiari.

- [ForumExcel — gestione spedizioni su strada](https://www.forumexcel.it/forum/threads/gestione-spedizioni-su-strada.54288/)
- [ForumExcel — tabella costo trasferimento](https://www.forumexcel.it/forum/threads/tabella-costo-trasferimento.27322/)

## Evidenza corrente: prezzo gasolio

Il 22 agosto 2026 MIMIT riportava, in modalità self, **2,128 €/l** sulla rete stradale e **2,200 €/l** sulla rete autostradale. Sono medie datate, non il prezzo universale di una flotta. L’articolo insegna la gerarchia corretta: prezzo effettivo aziendale quando disponibile; dato MIMIT corrente per una stima documentata; serie MASE mensile per confronti di periodo o clausole, non come sostituto automatico della fattura.

- [MIMIT — prezzi medi nazionali](https://www.mimit.gov.it/it/prezzi-carburanti-media-nazionale)
- [MIMIT — open data quotidiani degli impianti](https://www.mimit.gov.it/index.php/it/open-data/elenco-dataset/carburanti-prezzi-praticati-e-anagrafica-degli-impianti)
- [MASE — prezzi mensili carburanti](https://sisen.mase.gov.it/dgsaie/prezzi-mensili-carburanti)

## Evidenza corrente: A22

Autobrennero dichiara un aggiornamento tariffario dell’**1,46% dal 1° gennaio 2026**. Il pedaggio dipende da chilometri, tariffa unitaria, IVA, arrotondamento, classe Assi-Sagoma, casello di entrata e uscita. Per questo la guida non pubblica un prezzo unico: porta l’utente al calcolatore ufficiale e insegna come documentare il risultato nel preventivo.

- [Autobrennero — calcolo pedaggio A22](https://www.autobrennero.it/it/in-viaggio/pedaggio/costi-autostrada/calcola-pedaggio_aKt10KBRuarchieslashU0DeUsJQ8SGt942ruW6cvmQNEaH2aawSMarchieuguale_p/)
- [Autobrennero — tariffe A22 2026](https://www.autobrennero.it/documenti/pedaggio/IT_tariffe%20A22_2026.pdf)
- [Autobrennero — sistema Assi-Sagoma](https://www.autobrennero.it/documenti/pedaggio/IT_sistema%20assi-sagoma.pdf)

## Candidati esclusi o rinviati

| Intento | Stato | Motivo |
| --- | --- | --- |
| rimborso accise autotrasportatori 2026 | rinviato | domanda reale, ma rischio fiscale e manutenzione trimestrale alti; conversione meno diretta del prezzo gasolio |
| rimborso pedaggi autostradali autotrasportatori 2026 | rinviato | finestra 2026 chiusa il 22 luglio e soglia 200.000 € netti IVA; debole per molte microimprese |
| costo trasporto pallet | backlog | query reale, ma app non modella pallet, volume, groupage, fermate o handling |
| divieti camion 2026 | backlog | forte domanda, ma RouteBudget non è calendario legale o navigatore |
| calcolo costo viaggio camion | consolidare | owner esistente: pillar e calcolatore costo/km |
| preventivo trasporto camion | consolidare | owner esistenti: preventivo trasporto e PDF |
| costo autostrada camion 5 assi | consolidare | owner esistente: calcolo pedaggio camion |

## Ribilanciamento Italia

Le vecchie guide Paese restano online perché possono servire trasportatori italiani su rotte estere e non esiste motivo tecnico per cancellarle. Perdono però il primo piano:

- homepage statica e React sostituiscono Serbia, Italia–Grecia e Polonia con Excel, gasolio Italia e A22;
- nuove pubblicazioni estere sospese;
- homepage e link contestuali italiani danno priorità a costi, preventivo, carburante e corridoio nazionale;
- hub conserva archivio completo senza trasformare la home in elenco di Paesi.

## Politica di frequenza

Tre articoli nello stesso giorno sono ammessi quando ogni URL ha intento, fonti, esempio, limite prodotto e collegamenti propri. Non esiste un tetto Google “tre al giorno”. La regola applicata è qualità e utilità indipendente, coerente con la documentazione Google sul contenuto people-first e sulle pratiche di scaled content abuse. Pubblicare molte pagine quasi identiche per intercettare varianti resta vietato dal gate editoriale interno.

## Risultato tecnico atteso

Dopo build: 48 pagine contenuto — 3 pillar, 41 guide, 3 calcolatori e 1 landing. `articles-it.xml` passa da 41 a 44 URL; totale indexable da 50 a 53. Questi sono conteggi tecnici, non stato d’indicizzazione né previsione di impressioni.
