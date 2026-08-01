## Usura e manutenzione devono entrare in ogni tratta

Il costo del camion non finisce al distributore. Pneumatici, tagliandi, riparazioni e componenti consumati dai chilometri vanno trasformati in una quota coerente e inseriti nella stima della missione. Non esiste un importo valido per ogni flotta: il dato più affidabile nasce dai consuntivi dello stesso mezzo o di un gruppo realmente comparabile.

La quota serve a distribuire costi irregolari su viaggi regolari. Non sostituisce il piano di manutenzione, non anticipa ogni guasto e non rappresenta un fondo contabilmente vincolato. È uno strumento gestionale per evitare che un preventivo sembri redditizio solo perché una spesa tecnica arriverà il mese successivo.

## Separare le voci prima di calcolare

| Gruppo | Esempi | Base di ripartizione possibile |
| --- | --- | --- |
| Manutenzione programmata | tagliandi e interventi previsti | km o ore tra interventi |
| Pneumatici | acquisto, montaggio e gestione | km effettivi del ciclo |
| Riparazioni | componenti e manodopera non programmati | storico per periodo e km |
| Usura operativa | quota tecnica definita dall’impresa | km, ore o missione |
| Fermo mezzo | perdita di disponibilità e costi collegati | registro separato, non stima automatica |
| Ammortamento o leasing | costo capitale o canone | criterio amministrativo verificato |

Usura, manutenzione e ammortamento non sono sinonimi. Se una quota “costo mezzo” comprende già pneumatici e riparazioni, aggiungerli una seconda volta gonfia il totale. Documentare cosa contiene ogni campo è più importante del numero di decimali.

## Tre metodi pratici

### Consuntivo per chilometro

Somma le spese tecniche di un periodo e dividile per i chilometri dello stesso periodo:

`quota manutenzione per km = spese tecniche attribuibili / km totali coerenti`

È il metodo più leggibile quando il registro è completo. Usare lo stesso perimetro temporale per numeratore e denominatore; dodici mesi di fatture divisi per tre mesi di chilometri producono un dato inutilizzabile.

### Ciclo previsto per componente

Per pneumatici o interventi programmati si può usare:

`quota componente per km = costo previsto del ciclo / km previsti del ciclo`

Il costo e la durata devono venire da preventivi, storico e indicazioni pertinenti al mezzo. Non copiare una percorrenza generica: carico, strada, pressione, stile operativo e configurazione possono cambiare il risultato.

### Riserva storica per riparazioni

Quando le spese sono irregolari, usare più periodi comparabili può ridurre l’effetto di un singolo mese anomalo. Escludere interventi eccezionali solo se la scelta è documentata; eliminarli perché “troppo alti” nasconde il rischio invece di misurarlo.

## Esempio numerico con ipotesi dichiarate

Esempio didattico, non costo medio di mercato. L’impresa crea tre quote:

| Voce ipotetica | Costo del ciclo | Distanza attribuita | Quota risultante |
| --- | ---: | ---: | ---: |
| Manutenzione programmata | 7.200 € | 90.000 km | 0,08 €/km |
| Pneumatici | 3.600 € | 60.000 km | 0,06 €/km |
| Riparazioni da storico interno | 2.400 € | 80.000 km | 0,03 €/km |
| Totale tecnico | — | — | 0,17 €/km |

Per una missione di 580 km, compreso un ritorno a vuoto:

`580 × 0,17 = 98,60 €`

Tutti gli importi e le durate sono inventati per spiegare il metodo. Non sono tariffe attuali, preventivi di officina o intervalli consigliati. Ogni impresa deve sostituirli con fatture, preventivi, chilometri e indicazioni tecniche pertinenti.

Il calcolo mostra anche perché il ritorno a vuoto conta: il mezzo continua a consumare componenti durante i chilometri senza carico. Applicare la quota solo alla distanza fatturata sottostima il costo fisico.

## Costruire un registro utilizzabile

Un registro minimo può contenere:

- data, mezzo e chilometraggio;
- categoria dell’intervento;
- costo netto secondo la convenzione aziendale;
- componente interessato;
- manutenzione programmata o riparazione;
- eventuale fermo mezzo, tenuto separato;
- documento o preventivo di origine;
- nota su spese eccezionali.

Rivedere la quota con frequenza definita, per esempio al termine di un periodo gestionale, e registrare la data di modifica. Non aggiornare il parametro dopo ogni piccola fattura se questo rende il valore instabile; non lasciarlo invariato per anni se mezzo e costi sono cambiati.

## Segmentare senza creare falsa precisione

Una flotta eterogenea richiede gruppi coerenti: trattore recente e mezzo anziano, lunga percorrenza e distribuzione urbana, configurazioni di assi o pneumatici diverse non hanno necessariamente lo stesso profilo tecnico.

La segmentazione è utile quando esistono abbastanza dati. Con pochi interventi, una quota per singolo mezzo può oscillare troppo. In quel caso usare una classe comparabile e dichiarare il limite. Evitare coefficienti sofisticati senza dati che li sostengano.

## Manutenzione gestionale e sicurezza

La Commissione europea sottolinea che veicoli correttamente mantenuti e funzionanti sono rilevanti per sicurezza ed efficienza. La Direttiva 2014/45/UE stabilisce un quadro per i controlli tecnici periodici, ma non fornisce una quota economica universale per chilometro.

Il calcolo di costo non sostituisce manutenzione prevista dal costruttore, controlli applicabili, ispezioni o decisioni tecniche dell’officina. Se un componente richiede intervento, una riserva economica nel preventivo non rende il mezzo idoneo alla circolazione.

## Inserire la quota nella stima RouteBudget

RouteBudget combina gli input dell’utente per stimare il costo operativo. Inserire una quota di usura/manutenzione costruita con metodo coerente, quindi verificare che non sia già compresa in un’altra voce. I tre scenari di prezzo aiutano a vedere l’effetto sul margine; non garantiscono utile né sostituiscono consuntivi.

Conservare localmente calcolo e data del parametro permette di riaprire una tratta sapendo quale ipotesi era attiva. Quando la quota cambia, aggiornare il calcolo prima di riutilizzare un vecchio preventivo.

## Limiti da tenere visibili

- Un guasto specifico non è prevedibile da una media.
- Una quota storica può non riflettere un mezzo appena acquistato.
- Preventivi e ricambi cambiano nel tempo e per fornitore.
- Il costo del fermo non coincide con la fattura di riparazione.
- Ammortamento, leasing e manutenzione possono sovrapporsi se definiti male.
- I dati di settore non sostituiscono quelli della flotta.

## Checklist mensile o trimestrale

- [ ] Fatture e chilometri coprono lo stesso periodo.
- [ ] Ogni voce ha una categoria chiara.
- [ ] Pneumatici e riparazioni non sono contati due volte.
- [ ] Chilometri a vuoto entrano nel denominatore e nella tratta.
- [ ] Mezzi diversi sono raggruppati solo se comparabili.
- [ ] Spese eccezionali sono spiegate, non cancellate.
- [ ] Quota, data di revisione e fonte sono registrate.
- [ ] Piano tecnico e obblighi di controllo restano separati dal calcolo economico.

Una quota semplice, documentata e aggiornata vale più di una cifra “media” senza origine. Il suo scopo è rendere visibile oggi il costo tecnico che il mezzo produrrà lungo il lavoro.
