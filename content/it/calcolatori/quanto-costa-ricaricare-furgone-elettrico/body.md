## Risposta diretta: il costo parte dall'energia presa dalla rete

Per sapere **quanto costa ricaricare un furgone elettrico** servono il salto di carica desiderato, la capacità utilizzabile della batteria, una stima delle perdite e il prezzo effettivo dell'energia. Questo calcolatore esegue una sola operazione: stima una sessione dal livello iniziale al livello finale e mostra energia da accumulare, energia da prelevare dalla rete, costo e durata teorica.

Il **calcolo locale** non trasmette né salva i valori del modulo. Non sceglie una colonnina, non legge il veicolo e non conosce la curva di ricarica. Il risultato non è il costo completo di una consegna: mancano chilometri, consumo su strada, pedaggi, autista, usura, costi fissi e margine.

## I cinque dati da inserire

1. **Capacità utilizzabile della batteria in kWh.** Usa il dato della versione esatta. Capacità lorda e utilizzabile non sono sempre uguali.
2. **Stato di carica iniziale e finale.** Inserisci percentuali coerenti con ciò che mostra il veicolo, con il finale maggiore dell'iniziale.
3. **Perdite di ricarica in percentuale.** È la quota dell'energia prelevata dalla rete che non finisce accumulata nella batteria secondo lo scenario scelto.
4. **Prezzo effettivo in €/kWh.** Usa contratto aziendale, tariffa della sessione o altro valore documentato; non una media senza data.
5. **Potenza media assorbita dalla rete in kW.** Serve soltanto per il tempo teorico. Non confonderla con il picco pubblicizzato dalla colonnina o con la potenza massima accettata dal furgone.

## Formula di energia, costo e durata

Il salto di stato di carica è:

`delta SOC = SOC finale − SOC iniziale`

L'energia che deve essere accumulata nella batteria è:

`energia batteria = capacità utilizzabile × delta SOC ÷ 100`

Se le perdite inserite rappresentano una percentuale dell'energia presa dalla rete:

`energia rete = energia batteria ÷ (1 − perdite ÷ 100)`

Il costo energetico della sessione è:

`costo ricarica = energia rete × prezzo in €/kWh`

Con una potenza **media assorbita dalla rete**:

`durata teorica = energia rete ÷ potenza media in kW`

Il modulo accetta perdite da **0% a 50%**. È un limite prudenziale dell’interfaccia: valori superiori vengono rifiutati anche se la formula resterebbe finita sotto il 100%. Ricava la percentuale da misure confrontabili o dichiarala come ipotesi; un valore accettato non diventa automaticamente realistico.

## Esempio verificabile: batteria da 80 kWh, dal 20% all'80%

Considera un esempio didattico, non riferito a un modello specifico:

- capacità utilizzabile: **80 kWh**;
- SOC iniziale: **20%**;
- SOC finale: **80%**;
- perdite ipotizzate: **10% dell'energia di rete**;
- prezzo: **0,35 €/kWh**;
- potenza media assorbita: **11 kW**.

Il delta SOC è 60 punti percentuali. L'energia da accumulare è:

`80 × 60 ÷ 100 = 48 kWh`

Tenendo conto del 10% di perdite, l'energia stimata dalla rete è:

`48 ÷ (1 − 0,10) = 53,33 kWh`

Il costo energetico è:

`53,33 × 0,35 = 18,67 €`

La durata puramente teorica è:

`53,33 ÷ 11 = 4,85 ore`, cioè circa **4 ore e 51 minuti**.

I 18,67 € non includono eventuali costi fissi per sessione, tariffe a tempo, occupazione dopo la ricarica, parcheggio, abbonamento o imposte non comprese nel prezzo inserito. Le 4 ore e 51 minuti non sono un orario promesso: presuppongono che 11 kW siano mantenuti come media dal lato rete per tutta la sessione.

## Capacità della batteria: usa la versione, non il nome del furgone

Uno stesso modello commerciale può esistere con batterie, caricatore di bordo e configurazioni differenti. Leggi scheda tecnica, manuale o dati del veicolo effettivo. Se il costruttore comunica capacità lorda e netta, usa quella coerente con il SOC mostrato dal mezzo e annota la scelta.

Non copiare automaticamente il dato di un E-Ducato, E-Scudo o E-Doblò in un altro furgone. La pagina Fiat Professional sull'E-Ducato, per esempio, dimostra che capacità e potenze dichiarate appartengono a una configurazione precisa e che la durata effettiva dipende dalle condizioni. La fonte serve a mostrare il metodo di verifica, non a fornire un default universale.

## Come stimare le perdite senza creare una precisione falsa

La differenza fra energia prelevata e aumento di energia nella batteria può includere conversione AC/DC, gestione termica, elettronica di bordo e altre utenze attive durante la sessione. Temperatura, potenza, SOC e tipo di ricarica possono cambiarla.

Se disponi di uno storico confrontabile, misura sulla stessa sessione:

1. energia indicata dalla colonnina o dal contatore dedicato;
2. capacità utilizzabile e variazione SOC del veicolo;
3. tipo di ricarica, temperatura e durata;
4. eventuale preriscaldamento o climatizzazione.

Poi calcola, per quella definizione:

`perdite osservate = (energia rete − energia batteria) ÷ energia rete × 100`

Se non hai un dato affidabile, tratta la percentuale come scenario esplicito e prova più valori plausibili. Non presentare il risultato come misura certificata.

## Prezzo per kWh e conto finale non sono sempre la stessa cosa

Per la ricarica in deposito, il prezzo può dipendere dal contratto, dal periodo, dal trattamento fiscale e dal criterio con cui l'impresa attribuisce costi di rete o impianto. Per la ricarica pubblica, controlla nell'app o sul punto di ricarica tutte le componenti prima di iniziare.

Il Regolamento (UE) 2023/1804 stabilisce obblighi di trasparenza per i prezzi ad hoc nei punti accessibili al pubblico, con regole che cambiano anche secondo potenza e data di installazione. Controlla quindi le componenti mostrate dal punto o dal fornitore e la regola applicabile prima di iniziare. Questo modulo moltiplica soltanto l'energia di rete per il prezzo in €/kWh inserito: costi a tempo, sessione, occupazione o altre componenti restano fuori e vanno aggiunti separatamente quando presenti.

## Perché il tempo mostrato è soltanto teorico

La potenza di picco non è necessariamente la media della sessione. Il veicolo e la stazione negoziano la potenza; stato di carica, temperatura, limiti del caricatore di bordo, condivisione della colonnina e curva DC possono ridurla. Vicino a un SOC elevato la potenza può diminuire sensibilmente.

Usa quindi nel campo kW una media osservata quando ne disponi. Se inserisci il valore nominale, leggi il risultato come limite matematico dello scenario, non come ora di partenza garantita. Il calcolatore non pianifica soste, disponibilità della colonnina o ricariche lungo un itinerario.

## Cosa non calcola

Il risultato non comprende:

- consumo del furgone in kWh/100 km o autonomia necessaria;
- energia già inclusa in un abbonamento o meccanismi di rimborso;
- tariffe a minuto, sessione, occupazione o parcheggio;
- potenza massima realmente accettata dal veicolo;
- curva di ricarica, preriscaldamento e gestione termica;
- tempi di attesa o indisponibilità del punto;
- costo del mezzo, dell'autista, dei pedaggi o della consegna;
- IVA e trattamento contabile se non già riflessi nel prezzo inserito.

Per misurare l'energia consumata su strada usa la guida su [quanto consuma un furgone](/it/guide/quanto-consuma-un-furgone/). Per ricostruire l'economia complessiva del mezzo usa il [costo furgone per km](/it/guide/costo-furgone-per-km/). Una sessione di ricarica non sostituisce il consumo della missione né il costo aziendale per chilometro: scegli il calcolo corrispondente alla decisione che devi prendere.

## Portare il dato nella tratta RouteBudget

Il calcolatore web produce un controllo isolato della ricarica. Nell'app RouteBudget puoi configurare un profilo N1 elettrico e usare consumo e prezzo dell'energia pertinenti per stimare la voce energetica della tratta insieme alle altre componenti supportate. L'app non legge la colonnina, non verifica il SOC e non aggiunge automaticamente tariffe a tempo o per sessione.

Conserva quindi capacità, delta SOC, energia di rete, prezzo e componenti escluse accanto alla fattura o alla schermata della sessione. Usa il risultato per capire l'ordine di grandezza della ricarica, poi completa **distanza, energia su strada, pedaggi, tempo, usura e costi aziendali** prima di decidere il prezzo del trasporto.
