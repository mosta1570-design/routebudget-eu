## Che cosa stima il calcolatore

Questo strumento trasforma distanza, **consumo già noto** e prezzo al litro in due risultati: litri stimati e costo carburante. Puoi aggiungere i chilometri di ritorno a vuoto per evitare che il preventivo consideri solo la parte caricata della missione.

Non stima quale dovrebbe essere il consumo medio del tuo mezzo. Se stai cercando “quanto consuma un camion” o devi ricavare i l/100 km dai rifornimenti, usa prima la guida per [misurare il consumo medio reale del camion](/it/guide/quanto-consuma-un-camion/), poi torna qui con il dato verificato.

Il calcolo avviene nel browser. I valori inseriti non vengono inviati a RouteBudget e non vengono memorizzati dal calcolatore. Il risultato è una stima non vincolante: rifornimenti, variazioni di prezzo e consumo reale possono produrre un consuntivo diverso.

## Hai il consumo in km/l? Prima convertilo

Il campo richiede **litri per 100 km**, non chilometri per litro. Se il tuo dato è 4 km/l, inserisci `100 ÷ 4 = 25 L/100 km`, non 4. Su 400 km a un prezzo ipotetico di 1,70 €/l, l'input corretto produce **100 litri e 170 €**; inserire 4 produrrebbe 16 litri e 27,20 €, sottostimando il costo di 142,80 €.

Se parti da più rifornimenti, usa il [metodo della media ponderata del consumo](/it/guide/quanto-consuma-un-camion/): `litri totali ÷ chilometri totali × 100`, su intervalli validi e missioni confrontabili. Il risultato è in L/100 km. Il calcolatore non riconosce automaticamente l'unità da cui proviene il numero.

## Formula applicata

Per ogni segmento viene usata questa formula:

`litri = distanza km ÷ 100 × consumo L/100 km`

`costo carburante = litri × prezzo €/L`

Andata e ritorno vengono calcolati separatamente e poi sommati. Il modello usa lo stesso consumo medio per entrambe le direzioni. Se sai che il mezzo scarico, un percorso montano o una seconda configurazione cambiano sensibilmente il consumo, esegui due stime separate e somma i risultati: anche l’app RouteBudget usa un solo profilo di consumo per lo stesso calcolo.

## Quale distanza inserire

Usa la distanza che prevedi di percorrere, non quella in linea d’aria. Controlla che il percorso sia compatibile con sagoma, massa, limitazioni e rete ammessa al mezzo. Deviazioni, ricerca di un punto sicuro, accessi al cliente e chilometri interni possono aumentare il dato reale.

Il campo “ritorno a vuoto” non deve essere usato solo quando torni al punto di partenza. Può rappresentare anche il riposizionamento necessario per raggiungere il carico successivo. Se una parte del ritorno è già coperta da un’altra commessa, attribuisci a ciascun lavoro un criterio coerente e documentabile.

## Il consumo è un input, non un risultato del calcolatore

Inserisci un consumo proveniente da dati del mezzo in condizioni simili:

- massa e tipo di carico;
- percorso autostradale, urbano o montano;
- velocità e traffico;
- stagione e uso della climatizzazione;
- pneumatici, manutenzione e stile di guida;
- presenza di ritorno scarico.

Una media di flotta può essere utile per un controllo iniziale, ma rischia di nascondere differenze fra veicoli. Quando possibile, confronta litri acquistati e chilometri percorsi su più viaggi comparabili. Evita di scegliere il consumo migliore ottenuto in una singola tratta. Il metodo di misurazione resta nella guida dedicata; qui usi un dato già misurato per calcolare litri e costo.

## Quale prezzo carburante usare

Definisci prima la base contabile: prezzo lordo o netto, con o senza sconti, coerente con il resto del preventivo. Per una tratta internazionale può essere utile stimare dove avverranno i rifornimenti. Il Weekly Oil Bulletin della Commissione europea mostra andamenti e confronti nazionali, ma la tua fonte primaria resta il prezzo effettivamente sostenuto o contrattualizzato.

Quando il preventivo resta valido per molti giorni, non fingere di conoscere il prezzo futuro. Puoi:

1. usare un valore prudente dichiarato;
2. limitare la validità dell’offerta;
3. prevedere una regola di revisione chiara, se appropriata al rapporto commerciale;
4. controllare la sensibilità con un prezzo più alto.

## Esempio di andata e ritorno

Ipotesi illustrative:

| Dato | Valore |
| --- | ---: |
| Distanza di andata | 500 km |
| Ritorno a vuoto | 100 km |
| Consumo medio | 31 L/100 km |
| Prezzo carburante | 1,75 €/L |

L’andata richiede 155 litri, pari a 271,25 €. Il ritorno richiede 31 litri, pari a 54,25 €. Il totale stimato è **186 litri e 325,50 €**. Sono dati inventati per controllare la formula, non rilevazioni di un trasportatore o prezzi correnti.

Il numero non comprende pedaggi, costo autista, usura, tempi di attesa, traghetti, pernottamenti o margine. Non è quindi il costo della tratta e non è una tariffa da offrire.

## Se il viaggio cambia, quale voce pesa di più?

Parti dai 325,50 € dell’esempio e cambia un input alla volta. Così puoi distinguere l’effetto del prezzo da quello del mezzo o del percorso.

| Prova illustrativa | Litri | Costo | Differenza dalla base |
| --- | ---: | ---: | ---: |
| Base: 600 km, 31 L/100 km, 1,75 €/L | 186 | 325,50 € | — |
| Solo prezzo a 1,85 €/L | 186 | 344,10 € | +18,60 € |
| Solo consumo a 33 L/100 km | 198 | 346,50 € | +21,00 € |
| Solo distanza a 630 km | 195,3 | 341,78 € | +16,28 € |
| Tutte e tre le variazioni insieme | 207,9 | 384,62 € | +59,12 € |

L’ultima riga si ricalcola con `630 × 33 ÷ 100 × 1,85 = 384,615 €`, arrotondati a 384,62 €. Non sommare le tre differenze isolate: quando cambiano insieme, prezzo, consumo e chilometri si moltiplicano tra loro. È una prova di sensibilità, non un consuntivo reale né una previsione del prossimo viaggio.

## Quanto vale ogni centesimo prima di accettare

Per capire subito se un’offerta è fragile, non serve rifare tutto il preventivo a mente. Dopo aver ottenuto i litri totali, calcola il peso di una variazione del prezzo:

`impatto di 0,01 €/L = litri totali stimati × 0,01 €`

Nella base da 186 litri, ogni centesimo al litro cambia il costo di **1,86 €**. Cinque centesimi valgono 9,30 €; dieci centesimi 18,60 €. Questo indicatore consente tre controlli rapidi:

| Domanda prima della conferma | Controllo |
| --- | --- |
| Quanto carburante assorbe il margine disponibile? | confronta litri × variazione con la differenza tra prezzo e costo |
| Il preventivo resterà valido per più giorni? | annota fonte, data e validità del prezzo usato |
| Sono previsti rifornimenti in Paesi diversi? | prova prezzi distinti o uno scenario prudente dichiarato |

Il [portale mensile MASE](https://sisen.mase.gov.it/dgsaie/prezzi-mensili-carburanti) e il Weekly Oil Bulletin aiutano a collocare il prezzo nel tempo. Non sostituiscono fattura, sconto o carta carburante dell’impresa. Se la variazione plausibile consuma lo spazio disponibile, il problema non si risolve scegliendo un consumo ottimistico: va rivisto prezzo, validità o criterio di adeguamento.

## Dal carburante al costo completo della tratta

Per continuare con gli stessi 500 km carichi e 100 km vuoti, apri l’[esempio del calcolatore costo chilometrico](/it/calcolatori/costo-chilometrico-camion/): aggiunge pedaggi, ore, usura e quota fissa, poi confronta il costo con un’offerta ipotetica. I 325,50 € di carburante sono già compresi nel totale: non aggiungerli una seconda volta.

La guida al [calcolo completo del costo di trasporto](/it/guide/calcolo-costo-trasporto/) serve invece a costruire il perimetro delle spese dell’impresa. Nessuno dei due moduli web prepara o salva un PDF.

## Dal calcolo gasolio al preventivo: quale strumento ti serve?

Per verificare una singola spesa, questo calcolatore gratuito è sufficiente: non devi scaricare nulla. Se invece prepari più proposte e vuoi ritrovare calcolo, scenari di prezzo e PDF, valuta il flusso descritto nella [pagina RouteBudget per autotrasportatori](/it/app-per-autotrasportatori/).

Prima di passare all’app, annota distanza, consumo, prezzo e ritorno: **i dati compilati qui non vengono trasferiti automaticamente**. L’app richiede un nuovo inserimento e un controllo delle altre voci. Puoi aprire l’[esempio PDF e confrontare i suoi importi](/it/guide/preventivo-trasporto-pdf/) per capire cosa riceverà il destinatario; dati cliente e condizioni commerciali non vengono aggiunti automaticamente.

Se stai cercando un fornitore che esegua il trasporto, questa non è una richiesta di offerta a un vettore: RouteBudget aiuta chi deve calcolare il proprio prezzo, non trova un camion disponibile.

## Checklist prima di riportare il dato

- distanza verificata per il mezzo;
- ritorno o riposizionamento considerato;
- consumo coerente con carico e percorso;
- prezzo basato su una fonte recente e una base fiscale chiara;
- nessun arrotondamento anticipato;
- altri costi aggiunti separatamente;
- scenario prudente controllato.

Conserva insieme alla stima data, fonte del prezzo e ipotesi di consumo. Se cambia uno di questi elementi, aggiorna il calcolo prima di riutilizzarlo in una nuova offerta.
