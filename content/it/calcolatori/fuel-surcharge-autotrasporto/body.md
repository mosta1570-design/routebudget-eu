## Risposta diretta: come si calcola il fuel surcharge nell’autotrasporto

Per stimare un fuel surcharge nel trasporto stradale merci servono quattro valori: nolo di riferimento, prezzo gasolio di riferimento, prezzo gasolio di confronto e incidenza del carburante concordata. Il calcolatore misura la variazione percentuale del gasolio, la moltiplica per l’incidenza scelta e applica il risultato al nolo base.

Il risultato è una simulazione matematica, non una tariffa ufficiale e non stabilisce se un adeguamento sia dovuto. Contratto, periodo di confronto, fonte del prezzo, soglie, arrotondamenti e trattamento fiscale possono richiedere un metodo diverso. Verifica sempre il caso concreto con il cliente e, quando necessario, con un professionista.

## Ambito preciso: autotrasporto merci su strada in Italia

Questa pagina riguarda il fuel surcharge per vettori, padroncini e piccole imprese che formulano un nolo per un trasporto merci su strada. Non calcola supplementi di compagnie aeree, bunker adjustment marittimi, tabelle automatiche dei corrieri espresso o maggiorazioni generiche della logistica.

La distinzione conta perché lo stesso nome può indicare metodi diversi. Nel trasporto stradale il calcolo deve partire dal rapporto economico concreto e da dati confrontabili. Una tabella pubblicata da un vettore per i propri servizi non diventa automaticamente il criterio adatto a un’altra impresa.

## Formula trasparente usata dal calcolatore

Il modello applica tre passaggi:

`variazione gasolio % = (prezzo confronto − prezzo riferimento) ÷ prezzo riferimento × 100`

`adeguamento nolo % = variazione gasolio % × incidenza carburante % ÷ 100`

`importo adeguamento = nolo di riferimento × adeguamento nolo % ÷ 100`

Il nolo aggiornato stimato è il nolo di riferimento più l’importo dell’adeguamento. Se il prezzo di confronto è inferiore a quello di riferimento, il risultato diventa negativo e mostra una riduzione matematica. Questo comportamento non decide se il contratto preveda un’applicazione simmetrica: rende soltanto visibile l’effetto della formula.

## Che cosa inserire nei quattro campi

### Nolo di riferimento

È l’importo sul quale vuoi applicare la variazione. Deve rappresentare la stessa base economica prevista dal criterio usato: per esempio il nolo puro, non un totale che include voci escluse dall’adeguamento. Il calcolatore non separa IVA, pedaggi, traghetti o servizi accessori.

### Prezzo gasolio di riferimento

È il prezzo base associato alla data o al periodo iniziale scelto. Annotare fonte, periodo, unità e trattamento del valore evita confronti incoerenti. Confronta dati con la stessa frequenza di aggregazione: non mescolare un prezzo settimanale con uno mensile, né un valore netto con uno lordo.

### Prezzo gasolio di confronto

È il dato osservato nel periodo da confrontare. Il calcolatore non scarica prezzi in tempo reale e non precompila valori: devi inserire il dato concordato o verificato. Il MASE pubblica serie mensili e open data sui carburanti; fatture e condizioni aziendali possono invece essere più pertinenti se il rapporto usa un criterio interno.

Il campo richiede euro per litro. Nella tabella mensile MASE i prezzi sono espressi in euro per 1.000 litri: un valore della tabella va quindi diviso per 1.000 prima di inserirlo. Controlla sempre intestazione e metadati della serie aperta, perché un file o una vista diversa può dichiarare un’unità differente.

### Incidenza carburante concordata

È la quota percentuale del nolo che il modello attribuisce al carburante. Non esiste un valore universale adatto a ogni mezzo e servizio. Distanza, massa, consumo, ritorno a vuoto, pedaggi e tempo operativo cambiano il peso del gasolio sul costo totale. Usa l’incidenza prevista dal rapporto oppure una quota aziendale documentata, senza presentarla come obbligatoria.

## Esempio pratico verificabile

Considera valori puramente illustrativi, non prezzi correnti:

| Voce | Ipotesi |
| --- | ---: |
| Nolo di riferimento | 1.200 € |
| Gasolio di riferimento | 1,60 €/L |
| Gasolio di confronto | 1,76 €/L |
| Incidenza carburante | 30% |

Il gasolio aumenta del 10%: `(1,76 − 1,60) ÷ 1,60 = 0,10`. Applicando il 30% di incidenza, l’adeguamento sul nolo è del 3%. L’importo risultante è 36 € e il nolo aggiornato stimato è 1.236 €.

L’esempio mostra il funzionamento, non suggerisce un prezzo da usare. Se il rapporto adotta un’altra fonte, una soglia minima, un periodo mobile o un’incidenza diversa, il risultato cambia.

## Come scegliere una fonte senza inventare il prezzo

Per un confronto ripetibile, conserva sempre il collegamento alla fonte e la data del dato. Il portale statistico del Ministero dell’Ambiente e della Sicurezza Energetica pubblica prezzi mensili e dataset scaricabili. Le serie ufficiali sono utili quando le parti vogliono un riferimento pubblico; non sostituiscono automaticamente il criterio contrattuale o il costo effettivo dell’impresa.

Prima del calcolo controlla:

- stesso prodotto energetico nei due periodi;
- stessa unità di misura;
- stessa base territoriale e stessa frequenza di aggregazione, su due periodi diversi;
- stesso trattamento di imposte e componenti incluse;
- data di estrazione registrata;
- eventuali revisioni o note metodologiche della fonte.

Il MIT pubblica anche valori indicativi di riferimento dei costi di esercizio dell’autotrasporto. L’aggiornamento consultato del 17 marzo 2026 offre contesto sulle componenti operative, ma non è una tariffa universale e non viene usato come valore automatico in questo calcolatore.

## Adeguamento carburante, costo reale e prezzo finale

Un fuel surcharge isola una variazione: non ricostruisce l’economia completa della missione. Due tratte con lo stesso nolo possono avere ritorni, pedaggi, tempi, consumi e rischi diversi. Perciò l’adeguamento non sostituisce il [calcolo completo del costo di trasporto](/it/guide/calcolo-costo-trasporto/) né il [calcolatore del costo chilometrico camion](/it/calcolatori/costo-chilometrico-camion/).

Il flusso corretto mantiene distinti:

1. costo operativo della tratta;
2. eventuale adeguamento carburante secondo il criterio applicabile;
3. margine e prezzo commerciale;
4. contenuto del preventivo inviato al cliente.

Se vuoi stimare litri e spesa per un viaggio specifico, usa il [calcolatore del costo carburante](/it/calcolatori/costo-carburante-viaggio/). Se devi trasformare il risultato in un documento leggibile, consulta la guida al [preventivo di trasporto per autotrasportatori](/it/guide/preventivo-trasporto/).

## Varianti che questo strumento non decide

Un accordo può definire periodi, frequenza e regole diverse. Tra gli elementi da verificare possono rientrare:

- riferimento settimanale, mensile o altro periodo;
- media nazionale, dato territoriale o costo documentato;
- soglia prima dell’applicazione;
- variazione soltanto in aumento oppure anche in diminuzione;
- quota carburante fissa o ricalcolata;
- voci del nolo incluse nella base;
- numero di decimali e arrotondamento;
- data dalla quale il nuovo importo produce effetti.

Il calcolatore non interpreta clausole, non controlla documenti e non produce una fattura. La guida alla [clausola di adeguamento carburante nell'autotrasporto](/it/guide/clausola-adeguamento-carburante-autotrasporto/) organizza i controlli su fonte, periodo, base e documentazione; non sostituisce una verifica legale, fiscale o contrattuale sul rapporto concreto.

## Quando il calcolatore è utile

È utile per controllare una formula concordata, spiegare al cliente come nasce un importo, confrontare scenari e registrare le ipotesi usate. Non è adatto per copiare automaticamente una percentuale trovata online, determinare un diritto, calcolare accise o risolvere contestazioni.

Per ogni simulazione salva almeno:

- nolo base e voci comprese;
- due prezzi del gasolio;
- fonte e date;
- incidenza applicata;
- formula e arrotondamento;
- risultato prima e dopo l’adeguamento;
- riferimento alla versione condivisa.

## Dall’adeguamento alla tratta completa con RouteBudget

Il calcolatore web resta volutamente stretto: mostra solo l’effetto della variazione carburante sul nolo base. [RouteBudget per autotrasportatori e padroncini](/it/app-per-autotrasportatori/) gestisce il ragionamento operativo più ampio con costi della tratta, ritorno a vuoto, tre scenari di prezzo, archivio locale e riepilogo PDF non vincolante.

Usa il risultato del fuel surcharge come una voce controllata, non come sostituto del costo completo. Nell’app, verifica poi pedaggi, autista, usura, tempi, margine e condizioni prima di scegliere il prezzo da proporre.

## Checklist prima di usare il risultato

- [ ] La pagina riguarda davvero un trasporto merci su strada.
- [ ] I due prezzi usano stessa fonte, unità e base.
- [ ] Periodi e date sono registrati.
- [ ] L’incidenza carburante è documentata.
- [ ] Il nolo base contiene soltanto le voci previste.
- [ ] Soglie e arrotondamenti sono stati verificati.
- [ ] Aumento o diminuzione seguono il criterio applicabile.
- [ ] Il risultato è separato da IVA e altre valutazioni fiscali.
- [ ] Il preventivo finale include le condizioni necessarie.
- [ ] Nessun valore illustrativo è stato trattato come prezzo corrente.

## Domande frequenti

### Che cosa significa fuel surcharge nell’autotrasporto?

È un meccanismo usato per rendere visibile l’effetto di una variazione del carburante sul prezzo di un servizio. Metodo e applicazione dipendono dal criterio scelto o concordato; il termine da solo non definisce formula, fonte o obbligo.

### Posso usare il prezzo trovato oggi online?

Solo se fonte, periodo e base coincidono con il metodo applicabile. Annotare il dato senza contesto non basta. Preferisci una serie ufficiale o il criterio documentato nel rapporto e conserva data di consultazione.

### Il risultato è un preventivo o un importo obbligatorio?

No. È una stima matematica. Non determina obblighi, imposte, fatturazione o condizioni contrattuali e non sostituisce un preventivo completo.

### Perché il risultato può essere negativo?

Perché un prezzo di confronto inferiore al prezzo base produce una variazione negativa. Il calcolatore mostra l’effetto simmetrico della formula; devi verificare se e come il criterio applicabile gestisca le diminuzioni.
