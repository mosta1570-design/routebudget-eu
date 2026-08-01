# RouteBudget EU — cluster di contenuto italiani

## Principio architetturale

I cluster devono costruire competenza sul lavoro economico dell'autotrasporto, non volume editoriale generico. Ogni pagina risolve un compito distinto per autisti, padroncini, dispatcher o piccole imprese di trasporto. Un pillar copre il problema completo; i supporti approfondiscono una domanda; i calcolatori danno utilità immediata; RouteBudget completa il flusso con calcolo integrato, scenari, PDF e Archivio locale.

La homepage prodotto resta `/routebudget-eu/`. I cluster italiani vivono in URL crawlable sotto `/routebudget-eu/it/`. Nessuna guida deve dipendere da un filtro o da uno stato client-side per avere un URL distinto.

**Inventario M1 nel build al 1 agosto 2026:** 3 pillar, 5 guide di supporto e 2 calcolatori. Le tabelle “M1 generato” descrivono i file presenti nel build; non equivalgono a una pubblicazione finché le URL non restituiscono `200` sul sito pubblico. Le voci indicate come backlog non appartengono all'inventario M1.

## Struttura di ogni cluster

```text
Pillar
├── guida di metodo
├── guida su una voce di costo
├── guida decisionale
├── esempio/checklist
└── calcolatore semplificato
    └── CTA al flusso completo RouteBudget
```

Ogni supporto deve collegare:

1. il pillar con un anchor descrittivo;
2. da due a sei guide o strumenti realmente correlati che completano il passaggio successivo;
3. il calcolatore appropriato, se esiste;
4. la funzione RouteBudget pertinente e una CTA verso App Store/Google Play.

Ogni pillar deve collegare tutti i supporti attivi tramite una mappa del processo, non tramite un elenco indistinto di “ultimi articoli”.

## Cluster 1 — calcolo del costo di trasporto

**Pillar:** `/routebudget-eu/it/guide/calcolo-costo-trasporto/`

**Search job:** capire quali dati servono e come trasformare una tratta in un costo operativo completo prima di valutarne il prezzo.

**Promessa editoriale:** metodo trasparente che somma carburante/energia, pedaggi, tempo autista, usura/manutenzione e ritorno a vuoto con input dell'utente. Non è una tariffa di mercato né un preventivo ufficiale.

| Supporto M1 generato | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/guide/calcolare-carburante-pedaggi-autista/` | Riunisce le tre componenti variabili più immediate | pillar; costo chilometrico; margine; due calcolatori | “Aggiungi le altre voci nel calcolo completo” |
| `/routebudget-eu/it/guide/proteggere-margine-tratta/` | Individua come costi omessi e km vuoti erodono il margine | pillar; preventivo; costo chilometrico; errori tariffa; calcolatore costo/km | “Verifica gli scenari prima di accettare” |
| `/routebudget-eu/it/calcolatori/costo-carburante-viaggio/` | Separa andata, ritorno a vuoto e totale carburante | guida metodologica; pillar; margine; calcolatore costo/km | “Completa pedaggi, autista, usura e margine nell'app” |

**Link in ingresso richiesti:** tutti i supporti M1 sopra; i pillar `costi-autotrasporto` e `preventivo-trasporto`; la landing prodotto tramite un blocco “Guide pratiche” quando la sezione editoriale è pubblica. Il calcolatore costo/km e la relativa guida appartengono al cluster `costi-autotrasporto`, ma collegano questo metodo come passaggio adiacente.

**Backlog, non M1:** approfondimenti autonomi su costo autista, usura/manutenzione e ritorno a vuoto si pubblicano solo con intento distinto e aggiornamento della mappa keyword.

## Cluster 2 — costi dell'autotrasporto

**Pillar:** `/routebudget-eu/it/guide/costi-autotrasporto/`

**Search job:** distinguere costi fissi, variabili, diretti e indiretti e attribuirli in modo ragionevole al km o alla tratta.

**Promessa editoriale:** modello organizzativo e formule base con esempi dichiarati. Non propone benchmark universali: assicurazione, ammortamento, manutenzione, energia e chilometri produttivi dipendono dall'impresa e dal mezzo.

| Supporto M1 generato | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/guide/costi-fissi-variabili-autotrasporto/` | Classificazione con tabella e metodo di ripartizione | pillar; usura/manutenzione; calcolatore costi fissi/variabili | “Ricava una quota per km da usare nella tratta” |
| `/routebudget-eu/it/guide/costo-chilometrico-camion/` | Metodo per costo/km percorso e fatturabile | pillar; costi fissi/variabili; metodo tratta; calcolatore costo/km | “Applica la formula ai dati della tratta” |
| `/routebudget-eu/it/calcolatori/costo-chilometrico-camion/` | Stima semplificata delle componenti e dei due denominatori | guida costo/km; costi fissi/variabili; metodo tratta; calcolatore carburante | “Passa a scenari e PDF in RouteBudget” |

**Link in ingresso richiesti:** pillar costo trasporto, i due supporti M1 e collegamenti contestuali da preventivo/margine. Approfondimenti su usura, costo autista e un calcolatore dedicato ai costi fissi/variabili restano backlog, non pagine M1.

## Cluster 3 — prezzo e preventivo di trasporto

**Pillar:** `/routebudget-eu/it/guide/preventivo-trasporto/`

**Search job:** passare da costo operativo a una proposta commerciale leggibile, distinguendo copertura costi, margine target e presentazione al cliente.

**Promessa editoriale:** spiegare formule e struttura del preventivo senza suggerire prezzi “giusti” universali o guadagni garantiti.

| Supporto M1 generato | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/guide/errori-calcolo-tariffa-trasporto/` | Checklist delle voci dimenticate prima di definire una tariffa | pillar; metodo costo; margine; metodo componenti | “Controlla tutte le voci prima di accettare” |

**Link in ingresso richiesti:** pillar costo trasporto, costi autotrasporto, protezione margine e pagine calcolatore quando il risultato porta alla decisione di prezzo.

**Backlog, non M1:** margine vs ricarico, scenari Minimo/Consigliato/Ideale, preventivo PDF, punto di pareggio, tariffa/prezzo tratta, utile del viaggio e i calcolatori margine/prezzo minimo/stima preventivo. Ogni URL richiede intento distinto nella mappa keyword. Se GSC non distingue la stima preventivo dai tool margine o prezzo minimo, il flusso va integrato nell'URL più utile e il candidato non va pubblicato.

## Cluster 4 — pedaggi e preparazione della tratta

**Pillar:** `/routebudget-eu/it/guide/pedaggi-autostradali-camion/`

**Search job:** capire quali dati del mezzo e della tratta influenzano il pedaggio, dove verificare gli importi e come inserirli nel costo.

**Promessa editoriale:** orientamento e foglio di lavoro, non calcolo ufficiale o in tempo reale. Operatori, classi e regole cambiano per paese e rete.

| Supporto | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/guide/pedaggio-camion-assi-peso-classe/` | Dati del veicolo da preparare | pillar; verificare pedaggio; profilo mezzo/N1 quando pubblicato | “Configura correttamente il mezzo nell'app” |
| `/routebudget-eu/it/guide/verificare-pedaggio-camion/` | Processo e fonti primarie per controllare la stima | pillar; costo trasporto; worksheet pedaggi | “Riporta l'importo verificato nel calcolo” |
| `/routebudget-eu/it/calcolatori/somma-pedaggi-viaggio/` | Somma importi manuali per paese/tratto | metodologia; fonti operatori; pillar costo trasporto | “Completa carburante, autista e margine nell'app” |
| `/routebudget-eu/it/guide/prezzo-tratta-camion/` | Inserisce il pedaggio nella decisione commerciale | pillar; costo ritorno a vuoto; preventivo | “Valuta il prezzo completo della tratta” |

**Regola fonti:** per ogni informazione variabile indicare paese/rete, fonte primaria, data di verifica e limite. Non copiare tabelle tariffarie intere; collegare l'operatore ufficiale quando l'utente deve confermare l'importo.

## Cluster 5 — tempo operativo, autista e pause

**Pillar:** `/routebudget-eu/it/guide/durata-operativa-viaggio-camion/`

**Search job:** comprendere perché ore di guida, pause e altre attività influenzano la durata vera e il costo autista.

**Promessa editoriale:** supporto alla stima economica. Le regole su pause, riposi, eccezioni e attività sono più complesse di un semplice calcolatore; fonti ufficiali e verifica professionale restano necessarie.

| Supporto | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/guide/costo-autista-viaggio/` | Converte ore operative e costo orario in costo tratta | pillar; costo trasporto; pausa 4,5 ore | “Includi il tempo nel costo operativo” |
| `/routebudget-eu/it/guide/pausa-guida-4-5-ore/` | Spiega il principio della pausa con caveat e fonte | pillar; costo autista; calcolo costo trasporto | “Stima l'impatto economico delle pause” |
| `/routebudget-eu/it/guide/prezzo-tratta-camion/` | Collega tempo e prezzo commerciale | pillar; margine; ritorno a vuoto | “Calcola la tratta completa nell'app” |

**Regola normativa:** non intitolare o descrivere alcuna pagina come certificatore di conformità. Indicare data e collegamento alla fonte ufficiale; chiedere revisione quando la normativa o l'interpretazione operativa cambia.

## Cluster 6 — veicoli leggeri/N1, subordinato a validazione

**Pillar candidato:** `/routebudget-eu/it/guide/costo-furgone-n1-km/`

**Search job:** stimare costi di viaggio per veicoli commerciali leggeri senza applicare automaticamente logiche dei mezzi pesanti.

| Supporto | Ruolo distinto | Link obbligatori in uscita | CTA RouteBudget |
| --- | --- | --- | --- |
| `/routebudget-eu/it/calcolatori/costo-viaggio-n1/` | Stima semplificata carburante o energia e costi manuali | pillar/metodologia; costi fissi/variabili; confronto camion/N1 | “Configura il veicolo N1 nel flusso completo” |
| `/routebudget-eu/it/confronti/costi-camion-vs-n1/` | Confronta categorie di costo e domande da verificare | pillar N1; costi autotrasporto; pedaggi | “Scegli la configurazione mezzo appropriata” |

Pubblicare questo cluster solo dopo conferma di product scope, domanda italiana e revisione normativa. Non descrivere N1 come esente o soggetto a una regola universale: peso, uso, traino, paese e data possono cambiare l'applicabilità.

## Layer trasversale dei calcolatori

I calcolatori non formano un silo separato. Ogni tool appartiene a un cluster di metodo e ha una pagina che include:

- spiegazione visibile della formula;
- definizioni e unità degli input;
- esempio riproducibile;
- limiti e data di revisione;
- link al pillar prima o dopo il risultato;
- CTA post-risultato verso la funzione RouteBudget che completa il lavoro.

Il catalogo `/routebudget-eu/it/calcolatori/`, se creato, deve essere una pagina curata con scopo e differenze tra strumenti. Non deve diventare una lista indicizzabile di combinazioni o parametri.

## Mappa dei collegamenti tra pillar

| Da | A | Motivo/anchor naturale |
| --- | --- | --- |
| Calcolo costo trasporto | Costi autotrasporto | “distinguere i costi fissi e variabili” |
| Calcolo costo trasporto | Pedaggi camion | “stimare e verificare i pedaggi della tratta” |
| Calcolo costo trasporto | Durata operativa | “includere tempo autista e pause” |
| Calcolo costo trasporto | Preventivo trasporto | “passare dal costo al prezzo” |
| Costi autotrasporto | Calcolo costo trasporto | “attribuire le voci alla singola tratta” |
| Costi autotrasporto | Preventivo trasporto | “coprire i costi prima del margine” |
| Pedaggi camion | Calcolo costo trasporto | “inserire il pedaggio nel costo totale” |
| Durata operativa | Calcolo costo trasporto | “trasformare il tempo in costo autista” |
| Preventivo trasporto | Calcolo costo trasporto | “verificare la base di costo” |
| Preventivo trasporto | Costi autotrasporto | “controllare le voci non attribuite” |

## Regole di internal linking

- Usare anchor descrittivi e variati; evitare ripetizioni forzate della keyword esatta e “clicca qui”.
- Un supporto linka il pillar nel primo terzo della pagina e lo richiama nel passaggio operativo finale.
- Limitare i link contestuali a quelli che risolvono il passo successivo. Un box finale può proporre due risorse correlate, non dieci.
- Il pillar riceve link da tutti i supporti e restituisce link a ciascuno tramite sezioni tematiche.
- Il tool linka la metodologia accanto alla formula e la funzione app dopo il risultato.
- La CTA store deve includere due destinazioni verificate; non usare interstitial o redirect opachi.
- Privacy e termini restano raggiungibili dal footer; caveat specifici restano anche nella pagina e non vengono delegati solo alle pagine legali.
- Non creare link automatici basati su ogni occorrenza di una parola. I link vengono revisionati editorialmente.
- Ogni nuovo contenuto riceve almeno due link in ingresso da pagine esistenti pertinenti prima della richiesta di indicizzazione.

## Template editoriale comune

Ogni pillar/supporto usa la stessa qualità visiva RouteBudget, con questa sequenza adattabile:

1. **Risposta breve:** cosa può decidere il lettore e quali limiti esistono.
2. **Dati necessari:** tabella con definizione, unità, fonte e frequenza di aggiornamento.
3. **Metodo:** formula leggibile e passaggi, con denaro gestito in centesimi nell'eventuale implementazione.
4. **Esempio:** numeri ipotetici chiaramente etichettati, calcolo riproducibile e nessuna promessa finanziaria.
5. **Errori e variabili:** ciò che rende la stima diversa dalla realtà.
6. **Prossimo passo:** guida correlata o calcolatore.
7. **RouteBudget:** perché l'app completa quel lavoro, con claim verificati e CTA coerente.
8. **Fonti e revisione:** autore/revisore reale, data di prima pubblicazione, data e nota dell'ultimo aggiornamento sostanziale.

FAQ solo se risponde a domande visibili e utili; niente sezioni generate per occupare spazio o markup FAQ senza contenuto in pagina.

## Quality gate e ciclo di manutenzione

Prima della pubblicazione verificare intento unico, accuratezza, italiano naturale, formule, fonti, product truth, accessibilità, link e CTA. Dopo la pubblicazione:

1. osservare in GSC query e pagina senza giudicare dai soli clic iniziali;
2. aggiungere sottotemi quando le query mostrano una domanda non soddisfatta;
3. migliorare title e introduzione quando impressioni pertinenti e CTR indicano una promessa poco chiara;
4. inserire link verso pagine che stanno acquisendo visibilità e completano il percorso;
5. fondere URL sovrapposti e redirectare il meno utile;
6. aggiornare fonti, formule e claim quando cambiano costi, norme o prodotto;
7. tradurre solo pagine italiane consolidate, preservando il cluster e adattando fonti/esempi al mercato.

La quantità di pagine non è un KPI di qualità. Se non esiste un search job distinto e un contributo reale al cluster, la pagina non va pubblicata.
