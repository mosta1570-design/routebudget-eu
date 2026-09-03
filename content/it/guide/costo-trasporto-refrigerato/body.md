## Risposta diretta: servono due contatori, chilometri e ore frigo

Il **costo di un trasporto refrigerato** parte dal costo normale della missione e aggiunge ciò che esiste perché la merce viaggia a temperatura controllata. Il metodo più utile usa due contatori distinti:

- chilometri e tempo operativo del veicolo;
- ore effettive del gruppo refrigerante, comprese preriscaldamento o preraffreddamento, attese e soste pertinenti.

Un sovrapprezzo percentuale copiato da un'altra tratta può nascondere consumo del gruppo, lavaggio, controlli, attrezzatura, tempi più lunghi e ritorno. Calcola ogni voce dal dato dell'impresa; poi verifica il prezzo e il margine.

RouteBudget calcola le voci supportate della tratta e produce scenari e PDF. Non controlla la temperatura, non legge il gruppo frigo, non gestisce certificati ATP o registratori, non dimostra la catena del freddo e non offre un campo dedicato ai costi refrigerati. Queste voci vanno calcolate e documentate fuori dall'app.

## La formula operativa

```text
costo refrigerato = costo base della missione
                   + energia del gruppo frigo
                   + quota attrezzatura e manutenzione attribuita
                   + preparazione, pulizia e sanificazione
                   + tempo extra e attese
                   + altri requisiti verificati della commessa
```

Il costo base comprende carburante o energia di trazione, pedaggi, autista, usura, ritorno e quote aziendali applicabili. Non sommare una seconda volta voci già presenti.

Per un gruppo alimentato separatamente a gasolio:

```text
litri gruppo = consumo misurato in l/h × ore di funzionamento
costo energia frigo = litri gruppo × prezzo effettivo €/l
```

Per un impianto elettrico usa energia acquistata e costo coerente:

```text
costo energia frigo = kWh misurati × prezzo effettivo €/kWh
```

Non trasformare l/ora in l/100 km: preraffreddamento e attesa consumano anche a veicolo fermo.

## Scheda commessa: domande prima del numero

| Dato | Perché serve |
| --- | --- |
| Prodotto e temperatura richiesta | definisce perimetro operativo da confermare |
| Temperatura al carico | il mezzo non sempre deve abbattere prodotto caldo |
| Durata prevista porta a porta | guida ore frigo e rischio di attesa |
| Numero di aperture porte | può cambiare ciclo e recupero termico |
| Mono o multitemperatura | modifica configurazione e disponibilità mezzo |
| Volume, peso e disposizione | influenza capacità e circolazione dell'aria |
| Lavaggio o sanificazione richiesta | crea costo e tempo documentabili |
| Registrazione e documenti | chiarisce prove da consegnare al cliente |
| ATP e scadenze del mezzo | verifica idoneità, non solo prezzo |
| Piano in caso di guasto | espone costi e responsabilità da gestire |

La scheda commerciale non sostituisce procedure HACCP, istruzioni del caricatore, manuali dell'allestitore o obblighi normativi. Serve a impedire che il preventivo nasca con requisiti mancanti.

## ATP e igiene: costo non significa conformità

L'accordo ATP riguarda il trasporto internazionale di determinate derrate deperibili e le attrezzature speciali utilizzate. UNECE pubblica una versione valida dal **25 agosto 2026**. Il MIT mantiene riferimenti a stazioni di prova ed esperti per i controlli tecnici in Italia.

Il regolamento UE sull'igiene degli alimenti richiede che vani e contenitori usati per il trasporto siano mantenuti puliti e, quando necessario, che temperature appropriate possano essere mantenute e controllate. Questi riferimenti aiutano a costruire la checklist; non dicono quanto deve costare la tua commessa.

Prima dell'offerta, chi gestisce il trasporto deve verificare campo applicabile, classe del mezzo, certificati, condizioni della merce e procedure del cliente. Un PDF economico non certifica conformità.

## Misurare il gruppo frigo senza inventare percentuali

Costruisci uno storico per **mezzo + gruppo + setpoint + stagione + profilo missione**. Registra:

- ore motore del gruppo all'inizio e alla fine;
- energia o litri riforniti in un periodo confrontabile;
- temperatura esterna e setpoint;
- carico già alla temperatura corretta o da recuperare;
- numero e durata delle aperture;
- tratte urbane, autostrada e soste;
- manutenzioni o anomalie.

Calcola valori prudenti solo da missioni simili. Una media annuale unica può sottostimare estate, multi-drop o attesa con porte aperte. Se mancano dati, usa temporaneamente il dato tecnico della configurazione corretta e dichiarane il limite; sostituiscilo appena hai misure reali.

## Quota attrezzatura: non nasconderla nell'usura generica

Il gruppo frigo ha acquisto o canone, manutenzione, controlli e possibile fermo. Definisci un bacino coerente:

```text
quota frigo per ora = costi annui attribuibili al gruppo ÷ ore frigo realistiche annue
quota della missione = quota frigo per ora × ore frigo previste
```

In alternativa, una flotta può usare una quota per giornata o missione quando il proprio controllo di gestione lo giustifica. Non dividere per ore teoriche massime. Se canone o costo fisso generale include già attrezzatura e manutenzione, non duplicare la quota.

## Esempio ricalcolabile

Esempio didattico, non tariffa di mercato:

- costo base della missione verificato: 690 €;
- durata gruppo prevista: 9 ore;
- consumo storico comparabile: 2,4 l/h;
- prezzo interno del gasolio gruppo: 1,72 €/l;
- lavaggio richiesto e documentato: 45 €;
- 1,5 ore operative extra a 25 €/h;
- margine desiderato sul ricavo: 14%.

```text
energia gruppo = 9 × 2,4 × 1,72 = 37,15 €
tempo extra = 1,5 × 25 = 37,50 €
costo completo = 690 + 37,15 + 45 + 37,50 = 809,65 €
prezzo minimo = 809,65 ÷ 0,86 = 941,45 €
```

Manca una quota attrezzatura? Va aggiunta prima del margine. Il gruppo lavorerà 12 ore invece di 9? Cambiano energia, usura e forse tempo autista. Ricalcola; non applicare un supplemento casuale a fine preventivo.

## Attese: il camion fermo può continuare a consumare

Nel refrigerato, una coda non è solo costo autista. Il gruppo può restare acceso e la missione successiva può saltare. Per ogni attesa separa:

```text
costo attesa = ore × costo operativo del tempo
             + ore gruppo × costo energia frigo
             + eventuale quota attrezzatura applicabile
```

Non presentare automaticamente questa formula come indennizzo dovuto. Condizioni contrattuali e disciplina applicabile richiedono verifica separata. La guida sulle [attese a carico e scarico](/it/guide/tempi-attesa-carico-scarico-autotrasporto/) mostra come documentare arrivo, inizio, fine e causa.

## Dal calcolo RouteBudget al preventivo

Flusso prudente:

1. calcola in RouteBudget distanza, rientro, trazione, pedaggi, autista e usura;
2. verifica tempi e percorso con gli strumenti operativi dell'impresa;
3. calcola fuori dall'app energia gruppo, quota attrezzatura, lavaggio e requisiti speciali;
4. riconcilia tutte le voci in un costo completo;
5. applica margine o ricarico dichiarando la convenzione;
6. genera il PDF RouteBudget come riepilogo della base supportata;
7. aggiungi nel processo esterno temperatura, documenti e condizioni che il template non contiene.

Il PDF RouteBudget è una stima non vincolante. Non è un certificato ATP, un registro temperatura, una prova di consegna o un piano HACCP. Se il cliente richiede questi documenti, elencali e gestiscili separatamente.

## Errori tipici

- Applicare un “+20% frigo” senza dati del mezzo.
- Usare soli chilometri e ignorare ore del gruppo.
- Confondere carburante trazione e carburante refrigerazione.
- Dimenticare preraffreddamento, attese e aperture multiple.
- Conteggiare due volte manutenzione già nella quota fissa.
- Trattare temperatura richiesta come garantita dal preventivo.
- Presentare ATP come tariffa o attestazione generata dall'app.
- Trascurare pulizia, incompatibilità del carico e ritorno.
- Inviare un PDF senza condizioni di temperatura e documenti richiesti.

## Checklist prima di accettare

- [ ] Prodotto, setpoint e temperatura al ritiro confermati.
- [ ] Mezzo, gruppo e documenti verificati.
- [ ] Ore frigo previste oltre ai chilometri.
- [ ] Consumo basato su configurazione e periodo comparabili.
- [ ] Lavaggio, preparazione e multi-drop valorizzati.
- [ ] Attese e ritorno inclusi.
- [ ] Quote fisse senza doppio conteggio.
- [ ] Margine applicato al costo completo.
- [ ] PDF distinto da prova temperatura e certificati.
- [ ] Piano di revisione se cambiano orari o requisiti.

Il costo refrigerato diventa difendibile quando ogni euro risponde a una causa: strada, tempo, freddo, attrezzatura o servizio. RouteBudget rende solida la base della tratta; misure del gruppo e documenti dell'impresa completano la decisione.

## Fonti e limiti

UNECE pubblica [testo e stato dell'accordo ATP](https://unece.org/transport/road-transport/text-and-status-agreement). Il [MIT elenca stazioni ed esperti ATP](https://www.mit.gov.it/index.php/documentazione/trasporto-merci-deperibili-atp-stazioni-di-prova-ed-esperti-per-i-controlli-tecnici). Il [regolamento (CE) n. 852/2004](https://eur-lex.europa.eu/eli/reg/2004/852/oj/ita) tratta requisiti igienici del trasporto alimentare. Le fonti definiscono controlli e perimetro, non un prezzo universale; tariffe, consumi e responsabilità vanno verificati per impresa e commessa.
