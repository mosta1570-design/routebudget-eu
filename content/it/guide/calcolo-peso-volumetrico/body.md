## Il pallet pesa 200 kg: perché il preventivo ne considera 432?

Non è necessariamente un errore. Un collo leggero può occupare molto spazio: il **peso volumetrico** traduce quell'ingombro in chilogrammi convenzionali. Il **peso tassabile** è il valore usato per applicare la tariffa, secondo le condizioni del servizio. Non coincide sempre con quanto leggi sulla bilancia.

Per chi prepara spedizioni in una piccola impresa, il controllo utile è questo: misura la merce già imballata, recupera il coefficiente del servizio e solo dopo confronta le offerte. Per il padroncino, invece, quel peso non sostituisce il costo del proprio viaggio.

La [guida DHL al peso addebitabile](https://www.dhl.com/it-it/home/global-forwarding/centro-di-formazione-sul-trasporto-merci/calcolo-dei-pesi-addebitabili.html) distingue peso lordo e volumetrico e spiega il confronto fra i due. Precisa anche che, nel trasporto terrestre, i coefficienti dipendono da vettore e località. Quindi **non esiste un divisore da copiare automaticamente per ogni spedizione italiana**.

## Tre numeri, tre significati

| Dato | Cosa indica |
| --- | --- |
| Peso lordo reale, kg | Merce, imballaggio e supporto effettivamente spediti |
| Volume, m³ | Ingombro esterno dei colli pronti al ritiro |
| Peso volumetrico, kg | Volume convertito con il rapporto previsto dal servizio |

Il peso tassabile deriva dal criterio contrattuale applicato a questi dati. Nel confronto semplice si prende il maggiore tra lordo e volumetrico. Minimi, arrotondamenti, merce non sovrapponibile o tassazione a metri di carico possono però richiedere regole ulteriori.

Il peso convenzionale serve alla quotazione: **non cambia la massa fisica caricata**, né autorizza a superare portata o limiti del mezzo.

## Formula con centimetri: il passaggio che evita gli errori

Se il contratto esprime il rapporto in kg/m³:

```text
Volume m³ = lunghezza cm × larghezza cm × altezza cm ÷ 1.000.000
Peso volumetrico kg = volume m³ × coefficiente kg/m³
Peso di confronto kg = maggiore tra lordo e volumetrico
```

Nel documento [BRT «Per spedire», pagina 6](https://www.brt.it/wp-content/uploads/sites/275/2023/07/Per-Spedire.pdf), il calcolo usa il rapporto previsto dal contratto; l'esempio stradale adotta 300 kg/m³. È un riferimento documentato, non la conferma che il tuo specifico servizio BRT — o un altro corriere — debba applicare oggi quel valore.

Se ricevi invece un divisore in cm³/kg, usa la formula indicata nell'offerta. Non mescolare il divisore di un servizio espresso con il coefficiente di una spedizione stradale su pallet. Chiedi conferma anche dell'unità: «300» senza kg/m³ è un dato incompleto.

## Esempio ricalcolabile: due altezze, stesso peso reale

Esempio didattico, non quotazione di un vettore. Consideriamo un pallet pronto al ritiro con base 120 × 80 cm, peso lordo 200 kg e coefficiente **ipotizzato** di 300 kg/m³.

| Configurazione | Calcolo |
| --- | --- |
| Altezza esterna 150 cm | 120 × 80 × 150 ÷ 1.000.000 = 1,44 m³ |
| Peso volumetrico | 1,44 × 300 = 432 kg |
| Peso di confronto | maggiore fra 200 e 432 = 432 kg |
| Altezza esterna ridotta a 100 cm | 0,96 m³ × 300 = 288 kg |

La differenza è **144 kg convenzionali**, non 144 kg di merce tolta. E non equivale automaticamente a una riduzione del prezzo del 33,3%: fasce tariffarie, minimi e supplementi possono lasciare invariato l'importo. Riduci l'imballaggio soltanto se protezione e stabilità della merce restano adeguate.

Per più colli diversi, prepara una riga per ciascun formato. Chiedi se il servizio confronta lordo e volumetrico sull'intera spedizione oppure collo per collo: sommare i massimi individuali e confrontare i totali non è sempre la stessa operazione.

## Scheda da compilare prima di chiedere il prezzo

Questa traccia si può copiare nella richiesta al vettore; non è un documento generato da RouteBudget.

```text
Riferimento spedizione:
Origine e destinazione, CAP compresi:
Servizio richiesto e data:
Numero colli / pallet:
Dimensioni esterne di ogni formato, in cm:
Peso lordo per collo e totale, in kg:
Volume totale, in m³:
Sovrapponibilità dichiarata:
Coefficiente e unità confermati dal vettore:
Regola per arrotondamenti, minimi e fuori sagoma:
Attrezzatura necessaria al ritiro e alla consegna:
```

Fotografa la spedizione pronta con misure leggibili, registra la pesata e conserva l'offerta con le condizioni applicate. Sono riferimenti utili per ricostruire il conteggio, non una garanzia automatica sull'esito di una contestazione.

## Il controllo se il peso in fattura sembra sbagliato

Prima di confrontare due importi, ricostruisci la stessa base:

1. La misura include pallet, imballaggio e parti sporgenti?
2. L'altezza dichiarata è quella esterna finale, non quella del solo prodotto?
3. Il numero dei colli coincide con quanto ritirato?
4. Il coefficiente appartiene al servizio effettivamente acquistato?
5. Sono stati applicati arrotondamenti o un minimo di tassazione?
6. L'importo maggiore deriva dal peso oppure da un servizio aggiuntivo?

Se manca un dato, chiedi al vettore il dettaglio della rilevazione e del criterio applicato. Modificare il peso a tentativi per far tornare un prezzo rende la verifica meno affidabile.

## Peso tassabile e costo del camion: non confonderli

Un preventivo di groupage può usare il peso tassabile. Il costo interno di un mezzo dedicato nasce invece dalla missione: percorrenza completa, energia, pedaggi, personale e altre voci aziendali. Per collegare i due livelli, usa la guida al [costo del trasporto pallet](/it/guide/costo-trasporto-pallet/) e il confronto sul [costo del trasporto dedicato](/it/guide/costo-trasporto-dedicato/).

**RouteBudget non calcola il peso volumetrico, non misura i colli e non applica i listini dei corrieri.** Se gestisci il tuo mezzo, ti aiuta a stimare le voci supportate della tratta e confrontare scenari di prezzo. Il conteggio dell'ingombro e le condizioni commerciali restano nella scheda esterna.

Vuoi passare dal dato della spedizione al costo del tuo viaggio? Parti dal [calcolatore del costo chilometrico](/it/calcolatori/costo-chilometrico-camion/), poi consulta le [funzioni effettive di RouteBudget](/it/app-per-autotrasportatori/). Il [riepilogo PDF](/it/guide/preventivo-trasporto-pdf/) non aggiunge automaticamente dimensioni, peso tassabile o condizioni personalizzate.

## Domande frequenti

### Peso volumetrico e peso tassabile sono sempre uguali?

No. Se il lordo è maggiore e il contratto usa il criterio del maggiore, prevale il lordo. Anche altri criteri contrattuali possono incidere sul peso addebitato.

### Posso usare 300 kg/m³ per qualsiasi pallet?

No. Qui è un coefficiente dichiarato per rendere verificabile l'esempio. Per un'offerta reale serve quello del vettore e del servizio scelti.

### Un pallet più basso costa sempre meno?

Riduce il volume, ma non garantisce un prezzo inferiore. Verifica fasce, minimi, sovrapponibilità e servizi accessori nella stessa offerta.
