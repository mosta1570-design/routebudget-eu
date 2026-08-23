## Parti dal costo, non da una percentuale isolata

Questo **calcolatore del margine trasporto** trasforma un costo di tratta già verificato in quattro numeri leggibili: soglia di copertura dei costi, prezzo con il margine scelto, differenza in euro e ricarico equivalente sul costo. Il **calcolo locale** resta nel browser e non salva gli importi. Non suggerisce una tariffa di mercato e non può sapere quanto accetterà il cliente.

Servono due input:

- costo operativo completo della missione;
- margine target espresso come percentuale del prezzo finale.

“Completo” è la parola decisiva. Se nel costo mancano ritorno a vuoto, attese, pedaggi o quota del mezzo, il risultato sarà matematicamente corretto ma commercialmente fragile. Lo strumento non inventa ciò che non hai inserito.

## Le formule, senza confondere margine e ricarico

La soglia di copertura è uguale al costo dichiarato:

`prezzo di copertura = costo operativo inserito`

Per ottenere il margine target sul prezzo finale:

`prezzo obiettivo = costo operativo ÷ (1 − margine target)`

`differenza sul costo = prezzo obiettivo − costo operativo`

`ricarico equivalente = differenza sul costo ÷ costo operativo`

Il margine usa come denominatore il prezzo di vendita. Il ricarico usa il costo. Per questo applicare “più 20%” al costo non produce un margine del 20% sul prezzo.

Il campo margine deve essere maggiore di 0% e inferiore al 100%. A 100% il denominatore diventa zero e non esiste un prezzo finito. Percentuali molto alte possono produrre un valore matematico valido ma privo di senso per il servizio concreto: il controllo commerciale resta umano.

## Esempio verificabile: costo 1.000 €, margine 20%

Supponiamo che la missione abbia un costo operativo completo di **1.000 €** e un margine obiettivo del **20% sul prezzo finale**.

Il pareggio operativo è **1.000 €**. Il prezzo obiettivo è:

`1.000 € ÷ (1 − 0,20) = 1.250 €`

La differenza sul costo è **250 €**. Il controllo del margine dà:

`250 ÷ 1.250 = 20%`

Il ricarico equivalente sul costo è invece:

`250 ÷ 1.000 = 25%`

Se si aggiungesse invece semplicemente il 20% al costo, il prezzo sarebbe 1.200 € e il margine reale sul prezzo sarebbe `200 ÷ 1.200`, cioè **16,67%**. Il modulo mantiene visibili margine sul prezzo e ricarico sul costo.

L’esempio è didattico. Non afferma che 1.250 € sia competitivo, obbligatorio o adeguato a una tratta reale.

## Prima di premere “Calcola”: chiudi il perimetro del costo

Per una missione camion, controlla almeno:

- chilometri carichi, trasferimenti e rientro a vuoto;
- carburante o energia su distanza e consumo coerenti;
- pedaggi, vignette, traghetti e accessi pertinenti;
- ore dell’autista, pause, carico, scarico e attese previste;
- usura, pneumatici e manutenzione attribuita;
- quota dei costi fissi secondo un denominatore realistico;
- servizi speciali e spese documentate;
- rischio operativo che l’impresa decide di valorizzare.

Le tabelle MIT sui valori indicativi dei costi di esercizio aiutano a riconoscere famiglie di costo e classi di veicolo. Non sono un listino da copiare nella singola offerta. La legenda ministeriale invita a scegliere le voci pertinenti alla modalità di trasporto; sommarle tutte senza criterio può gonfiare il costo, mentre ignorarne alcune lo rende incompleto.

Se parti ancora da componenti separate, usa prima il [metodo per il costo completo del trasporto](/it/guide/calcolo-costo-trasporto/) o il [calcolatore del costo chilometrico camion](/it/calcolatori/costo-chilometrico-camion/). Questo strumento inizia dove quei calcoli finiscono.

## “Prezzo minimo” significa soglia interna, non tariffa ufficiale

Nel modulo il prezzo minimo è chiamato anche **soglia di copertura costi**. È il valore che eguaglia esclusivamente il costo inserito dall’utente. Non contiene automaticamente:

- margine;
- imposte o IVA;
- interessi e costo del capitale;
- perdite di altre missioni;
- franchigie, penali o rischio di insoluto;
- un compenso “di mercato” per urgenza o qualità del servizio.

Un valore sopra la soglia crea un differenziale positivo rispetto al costo inserito, ma non prova un utile netto aziendale. Un valore sotto la soglia segnala che, con quegli input, la missione non copre il costo dichiarato. Non è una consulenza fiscale, contabile o legale.

Se vuoi capire quanto il risultato resiste a gasolio, attese o ritorni diversi, passa alla guida per [proteggere il margine della tratta](/it/guide/proteggere-margine-tratta/). Questo modulo risponde invece a una domanda più stretta: quale prezzo corrisponde al costo e al margine inseriti.

## Dove finisce il calcolatore e inizia l'analisi di sensibilità

Questo modulo mantiene fermi i due valori inseriti: costo operativo e margine target. Non modifica carburante, chilometri, attese o rientro per cercare uno scenario più prudente. Di conseguenza il risultato risponde a **quale prezzo corrisponde a quel margine su quel costo**, non a quanto il prezzo resisterebbe a un imprevisto.

Per stressare le ipotesi usa la guida sull'[analisi di sensibilità del margine](/it/guide/proteggere-margine-tratta/), che confronta scenari e margine residuo. Torna qui quando hai un costo completo e vuoi convertirlo in soglia di copertura e prezzo con margine. La checklist sugli [errori nel calcolo della tariffa](/it/guide/errori-calcolo-tariffa-trasporto/) aiuta invece a trovare esclusioni e doppioni prima di inserire il costo.

## Dal risultato al preventivo

Il numero da inviare non basta. Un preventivo professionale dovrebbe rendere chiari almeno servizio, prezzo, validità, inclusioni, esclusioni e condizioni applicabili. Non serve mostrare al cliente ogni costo interno, ma l’impresa deve poter ricostruire come è arrivata al prezzo.

La guida al [preventivo di trasporto](/it/guide/preventivo-trasporto/) separa il calcolo interno dal documento commerciale. Ricontrolla sempre arrotondamento, IVA, condizioni e dati del cliente prima dell’invio.

## Quando passare a RouteBudget

Questo calcolatore lavora su un costo totale già pronto e non salva una pratica. Nell’app RouteBudget puoi riunire le voci supportate della tratta, confrontare gli scenari Minimo, Consigliato e Ideale e generare un riepilogo PDF non vincolante. L’Archivio locale permette di riaprire il calcolo secondo le funzioni disponibili.

Gli scenari non garantiscono profitto e non sostituiscono il controllo dell’impresa. Eventuali costi senza campo dedicato vanno gestiti separatamente e senza doppio conteggio. Usa RouteBudget per rendere coerente il passaggio **tratta → costo → prezzo → PDF**, poi applica la tua verifica commerciale prima di accettare il lavoro.
