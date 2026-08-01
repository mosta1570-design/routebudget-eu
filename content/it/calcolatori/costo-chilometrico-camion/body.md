## Che cosa calcola questo strumento

Il calcolatore stima il costo operativo di una singola tratta e lo divide in due modi: per tutti i chilometri percorsi e per i soli chilometri carichi. La differenza rende visibile il peso di un ritorno o riposizionamento a vuoto senza trasformare il risultato in una tariffa da proporre al cliente.

Il modello somma carburante, pedaggi inseriti, tempo dell’autista, usura e una quota facoltativa di costi fissi. Non calcola un itinerario, non consulta tariffe in tempo reale e non aggiunge margine. Il calcolo avviene nel browser: i valori del modulo non vengono inviati a RouteBudget e non vengono salvati.

## Formula usata

La stima segue questi passaggi:

`km totali = km carichi + km a vuoto`

`carburante = km totali ÷ 100 × consumo L/100 km × prezzo €/L`

`autista = ore operative × costo autista €/h`

`usura = km totali × usura €/km`

`quota fissa = km totali × costi fissi €/km`

`costo operativo = carburante + pedaggi + autista + usura + quota fissa`

Il costo operativo viene poi diviso per i chilometri totali e per i chilometri carichi. Il primo rapporto descrive il costo medio di ciò che il mezzo percorre. Il secondo mostra quanto costo deve essere recuperato da ogni chilometro carico se la tratta a vuoto non genera ricavo proprio.

## Come compilare i campi

### Chilometri carichi e a vuoto

Inserisci la distanza operativa prevista, non quella in linea d’aria. I chilometri carichi sono quelli della missione con carico; i chilometri a vuoto comprendono il ritorno o il riposizionamento attribuibile al lavoro. Se una parte del riposizionamento serve anche una commessa successiva, adotta un criterio coerente per non assegnare lo stesso costo due volte.

Un ritorno a vuoto pari a zero è possibile, ma deve rappresentare un’ipotesi reale. Non eliminarlo solo per rendere il risultato più basso. Deviazioni, accessi, aree di sosta e passaggi necessari al mezzo possono aumentare la distanza effettiva.

### Consumo e prezzo carburante

Usa un consumo osservato per mezzo, massa e tipo di percorso simili. Il calcolatore applica lo stesso consumo medio ai chilometri carichi e a vuoto; se le condizioni differiscono molto, esegui due stime separate e somma i costi carburante prima di prendere una decisione.

Per il prezzo al litro usa una base coerente con la contabilità aziendale, chiarendo internamente se comprende IVA, sconti o condizioni della carta carburante. Il Weekly Oil Bulletin della Commissione europea aiuta a controllare l’andamento generale, ma fatture e accordi effettivi restano più pertinenti al tuo caso.

### Pedaggi totali

Inserisci l’importo della tratta controllato sulle fonti applicabili oppure una stima che riconosci come tale. Il campo non identifica classe, assi, paese, percorso o gestore. Tunnel, traghetti e infrastrutture speciali possono richiedere voci separate.

Se il percorso non è ancora definito, prova più ipotesi invece di presentare un pedaggio medio come tariffa certa. Prima dell’offerta verifica la tariffa in vigore per configurazione e itinerario.

### Ore operative e costo autista

Le ore operative devono rappresentare il tempo che vuoi attribuire alla missione. Possono comprendere guida, pause applicabili, carico, scarico e attese quando tali periodi rientrano nel costo aziendale. Non usare solo il tempo ideale di percorrenza se il lavoro occupa il mezzo e l’autista più a lungo.

Il costo orario non coincide necessariamente con la paga netta. Ogni impresa deve definire quali componenti pertinenti includere e mantenere lo stesso criterio nei confronti successivi. Questo strumento non determina obblighi retributivi o conformità normativa.

### Usura e quota dei costi fissi

L’usura per chilometro può comprendere manutenzione, pneumatici e una riserva documentata per interventi legati all’utilizzo. La quota fissa per chilometro può derivare da costi annui divisi per chilometri coerenti dello stesso periodo. Evita doppioni: leasing, ammortamento o assicurazione non devono entrare sia nella quota fissa sia nell’usura.

I due campi sono facoltativi perché il calcolatore non inventa valori medi. Lasciarli a zero significa escluderli, non dimostrare che il costo non esiste.

## Esempio verificabile

Considera queste ipotesi illustrative:

| Voce | Valore |
| --- | ---: |
| Chilometri carichi | 500 km |
| Ritorno a vuoto | 100 km |
| Consumo | 31 L/100 km |
| Prezzo carburante | 1,75 €/L |
| Pedaggi | 120 € |
| Tempo autista | 9 h a 25 €/h |
| Usura | 0,18 €/km |
| Quota costi fissi | 0,20 €/km |

I 600 km richiedono 186 litri, pari a **325,50 €**. Il costo autista è **225 €**, l’usura **108 €** e la quota fissa **120 €**. Aggiungendo 120 € di pedaggi, il costo operativo stimato è **898,50 €**.

Il rapporto è circa **1,50 €/km percorso** e **1,80 €/km carico**. Nessuno dei due valori è automaticamente il prezzo finale. Il secondo mostra soltanto quanto dovrebbe recuperare ogni chilometro carico per coprire le voci inserite quando i 100 km vuoti non sono fatturati separatamente.

## Come leggere il risultato

Confronta le componenti prima del totale. Se il carburante domina, controlla consumo, distanza e prezzo. Se l’autista pesa molto, verifica che le ore includano attività reali senza duplicazioni. Se la differenza fra i due costi per km è ampia, il ritorno a vuoto merita una decisione commerciale esplicita.

Esegui almeno una prova prudente: aumenta prezzo carburante, ore operative o chilometri a vuoto. La sensibilità non predice il futuro, ma mostra quali ipotesi possono rendere fragile un’offerta.

## Cosa resta fuori

Il risultato non include automaticamente:

- margine o utile desiderato;
- imposte e trattamento IVA;
- rischio commerciale, urgenza o condizioni di pagamento;
- pernottamenti, traghetti e spese non inserite;
- differenze fra percorso previsto e percorso eseguito;
- tariffe ufficiali o prezzi di mercato;
- verifica normativa delle ore e delle pause.

Un costo formalmente corretto può quindi essere incompleto se manca una voce aziendale. Conserva le ipotesi insieme al risultato e aggiornale quando cambiano percorso, mezzo, carburante o condizioni operative.

## Dal calcolo web al flusso completo

RouteBudget riunisce nel calcolo della tratta carburante o energia, pedaggi stimati o inseriti, tempo autista, pause operative, usura/manutenzione, ritorno a vuoto e scenari di prezzo. Può poi generare un PDF della stima e conservarne il calcolo nell’Archivio locale. Il calcolatore web resta intenzionalmente più limitato: non salva, non genera documenti e non riproduce gli scenari dell’app.

Prima di usare la stima, controlla distanza, consumo, pedaggi, ore, criteri di ripartizione e voci lasciate a zero. Arrotonda solo alla fine e non presentare il costo per km come tariffa minima ufficiale.
