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
| Distanza di andata | 640 km |
| Ritorno a vuoto | 120 km |
| Consumo medio | 32 L/100 km |
| Prezzo carburante | 1,75 €/L |

L’andata richiede circa 204,8 litri, pari a 358,40 €. Il ritorno richiede circa 38,4 litri, pari a 67,20 €. Il totale stimato è **243,2 litri e 425,60 €**.

Il numero non comprende pedaggi, costo autista, usura, tempi di attesa, traghetti, pernottamenti o margine. Non è quindi il costo della tratta e non è una tariffa da offrire.

## Controlla la sensibilità

Una stima diventa più utile quando non guardi un solo scenario. Prova almeno due variazioni:

- aumenta il prezzo al litro di 0,10 €;
- aumenta il consumo di 2 L/100 km;
- aggiungi i chilometri di un possibile ritorno senza carico;
- confronta percorso breve e percorso operativo realmente utilizzabile.

Nell’esempio, un aumento di 0,10 €/L pesa circa 24,32 € sul viaggio complessivo. Un consumo di 34 L/100 km, a distanza e prezzo invariati, porta i litri a 258,4 e il costo a circa 452,20 €. Questo non prevede il futuro: rende visibile quanto la proposta dipende da un’ipotesi.

## Quanto vale ogni centesimo prima di accettare

Per capire subito se un’offerta è fragile, non serve rifare tutto il preventivo a mente. Dopo aver ottenuto i litri totali, calcola il peso di una variazione del prezzo:

`impatto di 0,01 €/L = litri totali stimati × 0,01 €`

Nell’esempio da 243,2 litri, ogni centesimo al litro cambia il costo di circa **2,43 €**. Cinque centesimi valgono circa 12,16 €; dieci centesimi 24,32 €. Questo indicatore consente tre controlli rapidi:

| Domanda prima della conferma | Controllo |
| --- | --- |
| Quanto carburante assorbe il margine disponibile? | confronta litri × variazione con la differenza tra prezzo e costo |
| Il preventivo resterà valido per più giorni? | annota fonte, data e validità del prezzo usato |
| Sono previsti rifornimenti in Paesi diversi? | prova prezzi distinti o uno scenario prudente dichiarato |

Il [portale mensile MASE](https://sisen.mase.gov.it/dgsaie/prezzi-mensili-carburanti) e il Weekly Oil Bulletin aiutano a collocare il prezzo nel tempo. Non sostituiscono fattura, sconto o carta carburante dell’impresa. Se la variazione plausibile consuma lo spazio disponibile, il problema non si risolve scegliendo un consumo ottimistico: va rivisto prezzo, validità o criterio di adeguamento.

## Dal carburante al costo completo della tratta

Il carburante è spesso visibile e facile da aggiornare, ma non deve assorbire tutta l’attenzione. Una tratta sostenibile considera anche:

- pedaggi e infrastrutture a pagamento;
- ore operative e pause;
- costo del mezzo e manutenzione;
- ritorni, riposizionamenti e attese;
- rischio e margine desiderato;
- condizioni e validità del preventivo.

RouteBudget collega carburante o energia, pedaggi, tempo autista, pause operative, usura/manutenzione e ritorno a vuoto; confronta scenari di prezzo e crea un PDF della stima. Rischio commerciale, validità e condizioni dell’offerta restano valutazioni dell’impresa. Il calcolatore web resta deliberatamente limitato al carburante, così puoi ottenere una verifica rapida senza riprodurre il flusso completo dell’app.

Per continuare senza confondere le voci, passa al [calcolo completo del costo di trasporto](/it/guide/calcolo-costo-trasporto/), poi controlla che cosa contiene il [riepilogo preventivo PDF di RouteBudget](/it/guide/preventivo-trasporto-pdf/). Il carburante calcolato qui entra una volta sola nel costo; il PDF non aggiunge automaticamente condizioni commerciali o dati del cliente.

## Checklist prima di riportare il dato

- distanza verificata per il mezzo;
- ritorno o riposizionamento considerato;
- consumo coerente con carico e percorso;
- prezzo basato su una fonte recente e una base fiscale chiara;
- nessun arrotondamento anticipato;
- altri costi aggiunti separatamente;
- scenario prudente controllato.

Conserva insieme alla stima data, fonte del prezzo e ipotesi di consumo. Se cambia uno di questi elementi, aggiorna il calcolo prima di riutilizzarlo in una nuova offerta.
