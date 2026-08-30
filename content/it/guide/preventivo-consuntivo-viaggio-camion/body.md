Confrontare **preventivo e consuntivo del viaggio camion** risponde a una domanda precisa: il prezzo accettato ha prodotto il margine previsto dopo chilometri, gasolio, pedaggi e ore realmente sostenuti? Senza confronto, una tratta può sembrare redditizia nel PDF e perdere margine durante esecuzione.

Regola base: il preventivo accettato resta una fotografia immutabile. Il consuntivo è un secondo documento con dati effettivi e scostamenti. Aggiornare vecchio calcolo con prezzi nuovi cancella prova di ciò che si sapeva quando offerta è stata accettata.

Il confronto della singola missione alimenta, senza sostituirlo, il controllo mensile sul [guadagno del padroncino](/it/guide/guadagno-padroncino-camion/).

## Due colonne con stesso perimetro

Confronto funziona soltanto se categorie coincidono.

| Voce | Preventivo | Consuntivo |
| --- | --- | --- |
| Distanza | itinerario e ritorno ipotizzati | km effettivi attribuiti alla missione |
| Carburante | litri stimati × prezzo assunto | litri e costo documentati o criterio dichiarato |
| Pedaggi | stima per percorso e classe | addebiti effettivi della missione |
| Autista | ore operative previste × costo interno | ore effettivamente impegnate × stesso criterio |
| Usura | km previsti × quota | km effettivi × quota vigente per quel periodo |
| Costi specifici | traghetto, servizi, attese previste | spese effettive pertinenti |
| Prezzo cliente | importo accettato | stesso importo più sole variazioni concordate |

Non confrontare prezzo lordo con costi netti senza criterio IVA coerente. Non aggiungere al consuntivo fattura annuale intera se preventivo usa quota per km: confronta stessa unità economica.

## Formule minime

```text
scostamento voce = costo consuntivo − costo preventivo

scostamento totale = costo totale consuntivo − costo totale preventivo

utile previsto = prezzo accettato − costo preventivo
utile effettivo = ricavo effettivo − costo consuntivo

margine previsto = utile previsto ÷ prezzo accettato
margine effettivo = utile effettivo ÷ ricavo effettivo
```

Uno scostamento positivo del costo è sfavorevole. Uno negativo indica costo inferiore al previsto, ma va controllato: potrebbe derivare da dato mancante, non da efficienza.

## Caso ricalcolabile: margine scende di 8,5 punti

Valori sono ipotesi didattiche. Preventivo usa 780 km, 270 litri a 1,68 €/l, 116 € di pedaggi, 13,5 ore autista a 30 €/h e usura a 0,14 €/km. Prezzo accettato: 1.500 €.

Consuntivo registra 822 km, 298 litri a costo medio attribuito di 1,74 €/l, 128 € di pedaggi e 15 ore autista. Quota usura resta 0,14 €/km.

| Voce | Preventivo | Consuntivo | Scostamento |
| --- | ---: | ---: | ---: |
| Carburante | 453,60 € | 518,52 € | +64,92 € |
| Pedaggi | 116,00 € | 128,00 € | +12,00 € |
| Autista | 405,00 € | 450,00 € | +45,00 € |
| Usura | 109,20 € | 115,08 € | +5,88 € |
| **Totale** | **1.083,80 €** | **1.211,60 €** | **+127,80 €** |

```text
utile previsto = 1.500 − 1.083,80 = 416,20 €
margine previsto = 416,20 ÷ 1.500 = 27,75%

utile effettivo = 1.500 − 1.211,60 = 288,40 €
margine effettivo = 288,40 ÷ 1.500 = 19,23%
```

Prezzo non ha generato perdita, ma 127,80 € di utile previsto sono scomparsi e margine è sceso di circa 8,5 punti percentuali. Decisione utile non è “aumentare sempre prezzo”: è identificare causa ripetibile.

## Dalla differenza alla causa

Per ogni scostamento aggiungi un codice semplice:

| Codice | Causa possibile | Azione prima della prossima offerta |
| --- | --- | --- |
| KM | deviazione, avvicinamento o ritorno sottostimato | correggere distanza totale e ipotesi di ritorno |
| FUEL-Q | litri superiori al previsto | aggiornare consumo per mezzo e missione comparabile |
| FUEL-P | prezzo effettivo superiore | usare prezzo datato o scenario prudente |
| TOLL | itinerario o classe non corretti | verificare percorso, assi e fonte ufficiale |
| TIME | attese, operazioni o riposi sottostimati | stimare ore di impegno complete |
| WEAR | quota tecnica obsoleta | aggiornare consuntivo manutenzione e pneumatici |
| SCOPE | servizio extra non incluso | chiarire inclusioni, esclusioni e variazioni |

Un solo viaggio non basta per cambiare ogni parametro. Tre o più missioni comparabili possono mostrare schema; evento eccezionale va mantenuto separato.

## Snapshot: cosa congelare quando cliente accetta

Conserva almeno:

- data e versione del preventivo;
- origine, destinazione e km assunti;
- ritorno carico, vuoto o escluso;
- consumo e prezzo carburante usati;
- pedaggi dichiarati come stima quando non vincolanti;
- ore e costo autista;
- quota usura/manutenzione;
- costi specifici inclusi ed esclusi;
- scenario scelto e margine target;
- prezzo e validità;
- PDF inviato.

Se cliente richiede modifica, crea nuova versione. Non sostituire file precedente con stesso nome senza traccia.

## Consuntivo: dati minimi e qualità della prova

Per chiudere missione:

- km iniziali/finali o fonte telematica identificata;
- litri e importi attribuiti, con regola per rifornimenti che coprono più viaggi;
- pedaggi effettivi riconciliati;
- ore di guida separate da carico, scarico, attesa e altre attività;
- ritorno effettivo;
- costi extra e documento collegato;
- ricavo finale e variazioni accettate;
- nota su dati stimati rimasti tali.

Telematica può aiutare, ma non rende ogni dato automaticamente disponibile o corretto. Contratti, accesso API, privacy e attribuzione tra missioni vanno verificati prima di automatizzare.

## Evitare tre falsi miglioramenti

### Consumo migliore perché manca rifornimento

Se camion fa rifornimento dopo chiusura missione, registrare zero litri non prova efficienza. Attribuisci consumo con metodo coerente o lascia dato come stima segnalata.

### Margine migliore perché quota fissa è sparita

Consuntivo con soli costi “pagati oggi” può escludere assicurazione, leasing e struttura. Mantieni stessa [ripartizione dei costi fissi](/it/guide/costi-fissi-variabili-autotrasporto/) usata nel preventivo.

### Utile peggiore perché costo è contato due volte

Se usura include pneumatici, non aggiungere intera fattura gomme. Se costo autista è nella struttura, non duplicarlo come voce oraria. Ogni categoria deve avere definizione scritta.

Per ricostruire prima voce usa la scheda sul [costo pneumatici del camion](/it/guide/costo-pneumatici-camion/). Se differenza nasce da indisponibilità, separa costi tecnici, personale e capacità persa con il metodo sul [costo del fermo camion](/it/guide/costo-fermo-camion/).

## Come usare RouteBudget oggi

RouteBudget calcola scenari di costo e prezzo, salva calcoli localmente ed esporta preventivo PDF. Questo supporta snapshot iniziale. Oggi app **non** importa automaticamente telematica, non riconcilia fatture e non produce un report automatico preventivo-versus-consuntivo o utile realizzato.

Flusso onesto:

1. crea calcolo e scegli scenario prima della missione;
2. salva voce in archivio locale ed esporta PDF;
3. conserva PDF come snapshot;
4. registra dati effettivi in scheda separata;
5. ricostruisci consuntivo con stesse categorie;
6. usa differenze per aggiornare prossima offerta nel [calcolatore del prezzo minimo](/it/calcolatori/prezzo-minimo-margine-tratta/).

Non descrivere confronto manuale come funzione automatica dell’app. Valore attuale è rendere preventivo strutturato e riapribile; consuntivo resta processo operativo esterno.

## Scheda pronta da copiare

```text
Missione / cliente:
Data accettazione:
Versione preventivo:
Prezzo accettato:

VOCE                 PREVISTO     EFFETTIVO     SCOSTAMENTO     CAUSA
Km totali
Litri / prezzo
Carburante €
Pedaggi €
Ore autista / costo
Usura €
Costi specifici €
Totale €

Utile previsto:
Utile effettivo:
Margine previsto:
Margine effettivo:
Azione per prossima offerta:
Dati ancora stimati:
```

## Fonti e natura dell’evidenza

Categorie sono state confrontate con i [valori indicativi MIT di marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6). Esistenza del lavoro gestionale preventivo-consuntivo è riscontrabile anche in [software italiano di analisi costi trasporto](https://www.ideagrip.it/moduli/analisi-costi/), citato come evidenza di categoria e non come autorità o prova di volume. Struttura snapshot-scostamento deriva inoltre da ricerca messa a disposizione del proprietario di RouteBudget con consenso; osservazioni non diventano automaticamente funzioni del prodotto.
