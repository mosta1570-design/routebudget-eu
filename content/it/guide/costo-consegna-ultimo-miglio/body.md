Il **costo per consegna nell'ultimo miglio** si ottiene dividendo il costo del giro per le consegne definite con un criterio preciso. Il problema è proprio quel divisore: colli caricati, fermate tentate e consegne riuscite non sono la stessa quantità. Per un padroncino con furgone o una piccola impresa di distribuzione, confonderli può far sembrare conveniente un servizio che assorbe tutta la giornata.

Qui costruisci un conto per giro e un confronto fra scenari. Non troverai una tariffa «giusta per tutta Italia»: servono i tuoi tempi, il tuo mezzo e il servizio concordato.

## Prima del calcolo: che cosa chiami consegna?

Fissa una definizione e mantienila nel preventivo e nel consuntivo:

- **Collo:** singola unità da movimentare. Più colli possono andare allo stesso indirizzo.
- **Fermata:** sosta del veicolo per svolgere una o più operazioni.
- **Consegna riuscita:** operazione completata secondo il criterio del servizio.
- **Unità pagata:** ciò che il contratto remunera; potrebbe non coincidere con le altre tre voci.

La ricerca [URBeLOG dell'Università Bocconi, rapporto 28 del 2017](https://green.unibocconi.eu/sites/default/files/media/attach/RR28.pdf), distingue nei dati del giro chilometri, stop e consegne effettuate. È un riferimento metodologico storico, non una fonte di prezzi aggiornati. Il nostro esempio seguente è autonomo e non riprende i costi o i risultati della sperimentazione.

Se porti tre colli allo stesso cliente, non puoi moltiplicare automaticamente il ricavo per tre. Prima devi sapere come viene pagata quell'operazione. Allo stesso modo, se il destinatario è assente, una fermata può avere un costo anche senza produrre una consegna riuscita.

## Il foglio minimo: dal deposito al rientro

Per un giro con più indirizzi, annota partenza e rientro, chilometri, ore di guida, preparazione, movimentazione e altre attività. Non fermare il conteggio all'ultima consegna se il mezzo deve ancora tornare in sede.

La relazione da usare è:

```text
Costo del giro = energia + quota tecnica del veicolo
                 + costo del lavoro + accessi e pedaggi
                 + quota fissa attribuita al giro

Costo per consegna riuscita = costo del giro / consegne riuscite
```

La quota tecnica non deve contenere costi già presenti nella quota fissa. Per costruire questi valori, parti dal [costo del furgone per km](/it/guide/costo-furgone-per-km/) e dalla distinzione fra [costi fissi e variabili](/it/guide/costi-fissi-variabili-autotrasporto/). Qui il risultato cercato è diverso: quanto costa completare una consegna dentro un giro, non quanto costa percorrere un chilometro.

Se le consegne riuscite sono zero, non dividere: registra costo del giro e nessuna consegna completata. La metrica unitaria non è calcolabile, ma la spesa esiste.

## Esempio: 30 indirizzi in programma, 27 consegne riuscite

Ipotesi didattiche, tutte sulla stessa base IVA esclusa; nessun valore è una media di mercato. Un furgone percorre 140 km. Il lavoro previsto impegna 8 ore complessive, non 8 ore di guida continua. La quota fissa esclude personale, energia e manutenzione già separati.

| Voce del giro | Calcolo | Importo |
| --- | --- | --- |
| Gasolio | 140 km × 10 l/100 km × 1,70 €/l | 23,80 € |
| Quota tecnica | 140 km × 0,12 €/km | 16,80 € |
| Lavoro | 8 ore × 22 €/h | 176,00 € |
| Quota fissa | Ipotesi attribuita una sola volta | 40,00 € |
| Accessi e pedaggi | Ipotesi del giro | 10,00 € |
| Totale | Somma delle cinque voci | **266,60 €** |

Con 30 fermate tentate, il costo medio per fermata è **8,89 €**. Se soltanto 27 consegne sono completate, il costo per consegna riuscita è invece **9,87 €**. I valori unitari sono arrotondati ai centesimi solo alla fine.

Supponiamo che il contratto paghi, esclusivamente in questo esempio, 10,50 € per consegna riuscita e nulla per i tre tentativi falliti. Il ricavo è 27 × 10,50 = **283,50 €**. La differenza rispetto al costo è 16,90 €, circa **5,96% del ricavo**, prima di eventuali altre voci non considerate e della fiscalità. Contare tutte e 30 come pagate avrebbe gonfiato il ricavo di 31,50 €.

## Un secondo passaggio può cambiare il risultato

Le [analisi operative di PTV sulle consegne dell'ultimo miglio](https://blog.ptvlogistics.com/it/trasporti-e-logistica/costi-nascosti-consegne-ultimo-miglio-che-dovresti-conoscere/) includono riconsegne, tempo del conducente ed energia fra i costi da considerare. Non usiamo percentuali internazionali come se fossero il risultato della tua impresa.

Torniamo al nostro foglio. Ipotizziamo che recuperare le tre consegne richieda 24 km extra, un'ora aggiuntiva e nessun nuovo accesso a pagamento. Con gli stessi parametri:

```text
Energia extra = 24 × 10 / 100 × 1,70 = 4,08 €
Quota tecnica extra = 24 × 0,12 = 2,88 €
Lavoro extra = 1 × 22 = 22,00 €
Costo aggiuntivo = 28,96 €
```

Se le tre consegne riescono e sono pagate 10,50 € ciascuna, il ricavo aggiuntivo è 31,50 €: restano **2,54 €** sull'operazione di recupero. È un confronto incrementale, non una tariffa consigliata. Se il recupero occupa un altro turno o richiede altri costi, il modello va ampliato: non basta conservare l'ipotesi di una sola ora.

## Meglio un prezzo per giro o per consegna?

Non esiste una risposta indipendente dai volumi e dal servizio. Chiedi che siano chiari zona, numero atteso di fermate, intervalli orari, colli, tentativi inclusi e trattamento di resi e ritiri. Un compenso per giro rende visibile l'impegno complessivo; uno per consegna richiede particolare attenzione alle unità effettivamente remunerate.

Per controllare una proposta, confronta almeno un giro con volume normale e uno con meno consegne riuscite. Mantieni esplicite le ipotesi: non assegnare probabilità inventate alle assenze. La [verifica preventivo-consuntivo](/it/guide/preventivo-consuntivo-viaggio-camion/) serve poi a sostituire le ipotesi con osservazioni confrontabili.

## RouteBudget: la base della tratta, non un ottimizzatore multi-fermata

Puoi usare RouteBudget per le componenti supportate del costo della tratta e per confrontare scenari economici. La sequenza degli indirizzi, la fattibilità del giro e il conteggio delle consegne vanno preparati esternamente. Non inserire soltanto primo e ultimo indirizzo sperando che l'app ricostruisca le soste intermedie.

Riconcilia chilometri e tempi delle tratte nel foglio del giro, senza contare più volte le stesse quote. L'app non calcola questo indicatore per consegna, non ottimizza una lista di fermate e non registra prove di avvenuta consegna. Le voci senza campo dedicato restano fuori dall'app, chiaramente distinte.

Per una verifica rapida dell'energia puoi usare il [calcolatore carburante](/it/calcolatori/costo-carburante-viaggio/). Se devi comunicare un prezzo, la guida al [preventivo di trasporto](/it/guide/preventivo-trasporto/) aiuta a distinguere il riepilogo PDF non vincolante dalle condizioni commerciali del giro. Guarda le [funzioni dell'app](/it/app-per-autotrasportatori/) se ti serve conservare e riutilizzare quella base, non sostituire un gestionale di distribuzione.

## Cinque dati da conservare domani

Segna km completi, ore operative, fermate tentate, consegne riuscite e unità pagate. Basta questa distinzione per capire se il problema è una distanza sottostimata, un tempo di servizio troppo lungo oppure un compenso legato a unità diverse da quelle che avevi contato. È un controllo concreto: il giro successivo si quota su dati migliori, non su una promessa di risparmio.
