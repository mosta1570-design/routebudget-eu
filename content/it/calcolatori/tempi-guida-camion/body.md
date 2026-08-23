## Stima subito il tempo che pesa sul costo della tratta

Questo **calcolatore dei tempi di guida per camion** risponde a una domanda economica precisa: quante ore devo considerare nel preventivo se divido la guida netta in blocchi da 4 ore e 30 minuti, aggiungo una pausa stimata tra i blocchi e sommo le altre attività?

Inserisci le ore di guida netta. Le ore dedicate ad attività fuori guida e il costo orario interno dell’autista sono facoltativi e valgono zero se lasciati vuoti. Senza costo orario ottieni la durata ma il costo mostrato resta 0 €. Il **calcolo locale** mostra le interruzioni di piano, la durata operativa stimata e il costo del tempo senza trasmettere o salvare i valori del modulo. Non calcola la strada, non legge il tachigrafo e non decide se il conducente può legalmente svolgere la missione.

La distinzione è importante. Un’ora al carico, un controllo del veicolo o la gestione dei documenti occupano tempo ma non diventano automaticamente un’interruzione. Allo stesso modo, una pausa regolamentare non può essere trattata come “altro lavoro” solo perché prolunga la missione.

## Formula usata dal calcolatore

Lo strumento applica una regola semplificata e ripetibile:

`interruzioni di piano = max(0; arrotondamento per eccesso(ore di guida netta ÷ 4,5) − 1)`

`ore di interruzione = interruzioni di piano × 0,75`

`durata operativa stimata = guida netta + altre attività + ore di interruzione`

`costo del tempo = durata operativa stimata × costo orario inserito`

Una pausa di 45 minuti equivale a 0,75 ore. I calcoli mantengono la precisione completa e gli importi vengono arrotondati soltanto quando sono mostrati.

Il conteggio inserisce 45 minuti **tra** un blocco da 4 ore e 30 minuti e il blocco di guida successivo. Non inventa quindi una pausa finale se la guida termina esattamente a 4 ore e 30 minuti o a 9 ore. L’articolo 7 del Regolamento (CE) n. 561/2006 prevede l’interruzione dopo quel periodo di guida, **a meno che inizi un periodo di riposo**. Un modulo che conosce solo un totale non sa se il conducente proseguirà, inizierà un riposo o svolgerà altre mansioni: il risultato resta una riserva economica, non una verifica legale della sequenza.

## Esempio: otto ore di guida e un’ora di altre attività

Immagina una tratta con questi dati didattici:

- guida netta prevista: **8 ore**;
- preparazione, documenti, carico e scarico: **1 ora** complessiva;
- costo orario interno: **25 €/h**.

L’arrotondamento per eccesso di `8 ÷ 4,5` dà 2 blocchi; il modello inserisce 45 minuti tra i due:

`8 h + 1 h + 0,75 h = 9,75 h`

La durata operativa stimata è **9 ore e 45 minuti**. Il costo del tempo risultante è:

`9,75 × 25 € = 243,75 €`

Il valore non è una tariffa dell’autista e non è il costo totale del trasporto. Mancano almeno carburante, pedaggi, usura, quota dei costi fissi, eventuale rientro e spese specifiche. Inoltre il costo orario corretto dipende dal metodo dell’impresa: retribuzione netta, costo del lavoro e costo interno attribuito alla missione sono numeri diversi. La guida sul [costo orario dell’autista camion](/it/guide/costo-orario-autista-camion/) aiuta a definire l’input senza confonderli.

## Che cosa mettere nelle “altre attività”

Usa il campo per tempi operativi previsti che non sono guida e non sono già le pause calcolate dal modulo. Per esempio:

- controllo iniziale del mezzo e messa in sicurezza;
- rifornimento e operazioni amministrative;
- carico o scarico svolto dal conducente;
- documenti, accessi e procedure al piazzale;
- attese che, nel caso concreto, impegnano il lavoratore;
- chiusura della missione.

Non sommare una voce due volte. Se il tempo di carico è già compreso nelle ore inserite, non aggiungerlo di nuovo nel costo totale fuori dal calcolatore. Se un’attesa può essere classificata come disponibilità, altra mansione, interruzione o riposo, la classificazione non deriva dalla durata né dal fatto che il camion sia fermo. Va verificata sui fatti e sulle regole applicabili. La pagina sui [tempi di attesa al carico e scarico](/it/guide/tempi-attesa-carico-scarico-autotrasporto/) tratta separatamente l’aspetto economico e documentale.

## Perché la pausa intera e non il frazionamento 15 + 30

Il regolamento consente, alle condizioni dell’articolo 7, di sostituire i 45 minuti consecutivi con almeno 15 minuti seguiti da almeno 30 minuti. L’ordine conta. Questo strumento non chiede una sequenza cronologica e non vede ciò che il tachigrafo ha registrato; rappresentare due segmenti separati senza orari darebbe un’apparenza di precisione che i dati non sostengono.

Per il preventivo viene quindi usato un unico blocco equivalente di 45 minuti. Il totale economico resta lo stesso, ma la collocazione reale della pausa può cambiare orario di arrivo, parcheggio disponibile e finestra del cliente. Prima di impegnare il viaggio costruisci una timeline vera, non soltanto una somma.

## Cosa non verifica questo strumento

Il risultato non controlla:

- ore già guidate dal conducente nella giornata o nelle settimane precedenti;
- limite giornaliero ordinario, eventuali estensioni e loro utilizzo precedente;
- riposi giornalieri o settimanali, riduzioni e compensazioni;
- equipaggio multiplo, traghetto o treno;
- deroghe eccezionali e relativa documentazione;
- corretta registrazione di guida, altre mansioni e disponibilità;
- divieti di circolazione, finestre di consegna o parcheggi;
- idoneità del percorso al veicolo.

Una tratta può sembrare sostenibile nel modulo e non esserlo per la storia concreta dell’autista. Può anche richiedere un riposo al posto di una delle interruzioni mostrate. Per limiti, sequenza e casi da verificare usa la guida completa sui [tempi di guida e riposo camion](/it/guide/tempi-guida-riposo-camion/) e consulta il testo ufficiale vigente.

## Dal tempo al costo completo

Dopo il calcolo, porta il costo del tempo dentro un quadro coerente:

1. verifica i chilometri totali, compreso l’eventuale rientro;
2. calcola carburante o energia con consumo e prezzo pertinenti;
3. inserisci i pedaggi controllati presso i gestori;
4. aggiungi usura e quote aziendali senza duplicazioni;
5. usa la durata operativa prudente per il costo autista;
6. solo alla fine valuta prezzo e margine.

Il [calcolatore del costo chilometrico camion](/it/calcolatori/costo-chilometrico-camion/) combina manualmente queste voci. Se hai già chiuso il costo operativo, il [calcolatore di prezzo minimo e margine](/it/calcolatori/prezzo-minimo-margine-tratta/) mantiene distinti copertura dei costi, margine e ricarico.

## Usare RouteBudget senza scambiare una stima per conformità

Nell’app RouteBudget puoi partire dalla tratta e riunire carburante o energia, pedaggi, tempo dell’autista, pause stimate, usura, rientro e scenari di prezzo. Puoi poi generare un riepilogo PDF non vincolante e conservarne il calcolo nell’Archivio locale secondo le funzioni disponibili.

RouteBudget non acquisisce né analizza i dati del tachigrafo, non conosce le ore residue personali e non certifica la conformità del viaggio. Controlla sempre cronologia del conducente, condizioni dell’operazione e fonti ufficiali prima della partenza. Il valore di questo calcolatore è più semplice e concreto: impedire che 45 minuti e attività fuori guida spariscano dal budget solo perché non sono chilometri.
