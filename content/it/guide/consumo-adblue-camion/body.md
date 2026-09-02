## Risposta diretta: come calcolare il consumo AdBlue del camion

Il modo più utile per stimare il **consumo AdBlue camion** è misurare quanti litri di AdBlue vengono usati rispetto ai litri di gasolio nello stesso periodo. Poi applica il rapporto osservato al gasolio previsto per la nuova tratta.

```text
rapporto AdBlue = litri AdBlue consumati ÷ litri gasolio consumati

AdBlue previsto = gasolio previsto della tratta × rapporto AdBlue

costo AdBlue = litri AdBlue previsti × prezzo effettivo al litro
```

ACEA indica come riferimento generale un impiego fra il 2% e il 6% del volume di gasolio. Non è un valore garantito per ogni motore: configurazione, carico, temperatura, missione e strategia del sistema SCR possono cambiare il dato. Il tuo storico omogeneo deve sostituire la percentuale generica appena diventa affidabile.

## Perché “litri ogni 1.000 km” può ingannare

Due camion percorrono 1.000 km ma consumano quantità diverse di gasolio. Uno lavora in pianura con carico regolare; l’altro affronta salite, attese, freddo e massa diversa. Se entrambi ricevono lo stesso AdBlue/1.000 km, il preventivo nasconde il fattore che guida il consumo.

Usa due indicatori, con ruoli distinti:

| Indicatore | Formula | Uso |
|---|---|---|
| AdBlue rispetto al gasolio | litri AdBlue ÷ litri gasolio | previsione tecnica più trasferibile |
| AdBlue per 1.000 km | litri AdBlue ÷ km × 1.000 | controllo rapido sullo stesso profilo |

Il secondo è utile per scoprire anomalie nello storico, non per copiare il dato di un altro mezzo. La base deve avere periodo, targa e profilo di lavoro riconoscibili.

## Costruire un registro senza telematica

Non serve inventare precisione. Per ogni rifornimento conserva:

- data e targa;
- km del contachilometri;
- litri di gasolio;
- litri di AdBlue;
- prezzo unitario e totale;
- pieno completo o rabbocco parziale;
- profilo dominante: lunga distanza, montagna, distribuzione, carico pesante;
- eventuale cambio mezzo, manutenzione o anomalia da non mescolare alla base normale.

Il confronto più pulito usa intervalli da pieno a pieno o periodi abbastanza lunghi da assorbire rabbocchi irregolari. Se fai un pieno AdBlue oggi e confronti soltanto il gasolio di questa settimana, il rapporto sarà falso. Abbina volumi che coprono lo stesso intervallo operativo.

## Esempio ricalcolabile su una tratta

Un trattore mostra nello storico omogeneo:

- 220 litri AdBlue;
- 5.000 litri gasolio;
- rapporto osservato: 4,4%.

La nuova missione prevede 620 km totali e un consumo gasolio di 31 l/100 km.

```text
gasolio previsto = 620 ÷ 100 × 31 = 192,2 L
AdBlue previsto = 192,2 × 0,044 = 8,4568 L
```

Con prezzo documentato di 0,78 €/L:

```text
costo AdBlue = 8,4568 × 0,78 = 6,60 €
```

La cifra sembra piccola rispetto al gasolio, ma su molte missioni diventa una voce reale. Ignorarla riduce il margine; gonfiarla con una percentuale senza fonte rende il preventivo meno credibile.

## Scenario minimo e prudente quando manca lo storico

Se hai un mezzo nuovo e nessun registro, l’intervallo ACEA può servire solo come controllo provvisorio:

```text
scenario 2% = 192,2 × 0,02 = 3,84 L
scenario 6% = 192,2 × 0,06 = 11,53 L
```

Con lo stesso prezzo di 0,78 €/L, il costo varia da 3,00 € a 8,99 €. Non scegliere automaticamente il centro dell’intervallo e non presentarlo come “consumo medio del mio camion”. Mostra l’ipotesi, conserva la fonte e sostituiscila dopo un periodo misurato.

Per missioni molto diverse crea profili distinti invece di una media unica. La guida su [quanto consuma un camion](/it/guide/quanto-consuma-un-camion/) usa lo stesso principio per il gasolio: dato comparabile prima, preventivo dopo.

## Prezzo AdBlue: usare lo stesso perimetro del gasolio

Il prezzo della tanica, della pompa e della fornitura in cisterna può avere basi diverse. Prima di confrontare:

- verifica data e luogo;
- separa prezzo unitario da costo di consegna;
- usa importi netti o lordi in modo coerente con il resto del calcolo;
- non mischiare acquisto occasionale e contratto flotta senza nota;
- conserva fattura o scontrino di riferimento.

Non trasformare il prezzo trovato online in prezzo aziendale. Per il gasolio vale la stessa regola spiegata nella guida sul [prezzo da usare nel preventivo](/it/guide/prezzo-gasolio-autotrasporto-preventivo/).

## AdBlue, usura e manutenzione non sono la stessa voce

AdBlue viene consumato durante l’uso e va trattato come materiale operativo. Non nasconderlo nella quota usura se vuoi controllarne lo scostamento. Manutenzione del sistema SCR, guasto, fermo o sostituzione di componenti sono eventi diversi: non possono essere previsti moltiplicando litri per un prezzo.

Evita anche questo doppio conteggio:

1. aggiungi AdBlue come percentuale del costo gasolio;
2. lo inserisci di nuovo fra “altri fluidi” nella quota di manutenzione;
3. applichi un ulteriore supplemento commerciale senza verificare se già incluso.

Una riga, una regola, una fonte.

## Portare il dato nel costo completo della tratta

Prima stima il gasolio con il [calcolatore carburante della tratta](/it/calcolatori/costo-carburante-viaggio/). Poi calcola AdBlue con il rapporto aziendale e aggiungilo fuori dal calcolatore alla scheda completa:

```text
costo completo = carburante + AdBlue + pedaggi + autista + usura + quota fissa + altre spese verificate
```

Se vuoi esprimere tutte le voci in €/km per controllo, dividi il costo AdBlue per i chilometri totali della stessa missione. Nel [calcolatore costo km camion](/it/calcolatori/costo-chilometrico-camion/) non esiste un campo AdBlue dedicato: non attribuire all’output una voce che lo strumento non calcola.

## Come usarlo con RouteBudget senza falsa automazione

RouteBudget stima gasolio o energia dalle distanze e dagli input supportati, insieme a pedaggi, autista, usura, ritorno e scenari di prezzo. L’app **non calcola né aggiunge automaticamente AdBlue**. Conserva quindi il calcolo AdBlue nella tua scheda esterna e considera il risultato app come stima delle voci dichiarate.

Puoi salvare il calcolo locale e generare il PDF RouteBudget per la stima supportata. Se vuoi mostrare AdBlue come voce commerciale separata, completa il documento o le condizioni fuori dall’app e indica il metodo. Non dichiarare che il PDF nativo certifica litri, qualità del prodotto o conformità del sistema SCR.

## Quando aggiornare il rapporto

Ricalcola dopo:

- cambio trattore, motore o configurazione;
- modifica stabile del profilo di carico;
- passaggio fra lunga distanza e distribuzione;
- cambi stagionali rilevanti osservati nei dati;
- manutenzione del sistema che rompe la continuità dello storico;
- almeno un periodo completo con rifornimenti abbinabili.

Non correggere silenziosamente i vecchi preventivi. Il nuovo rapporto vale per nuove stime; il consuntivo conserva dati realmente osservati.

## Checklist prima del preventivo

- [ ] Litri AdBlue e gasolio coprono lo stesso intervallo.
- [ ] Mezzo e profilo operativo sono omogenei.
- [ ] Rabbocchi parziali non vengono trattati come consumo completo.
- [ ] Prezzo al litro ha data, documento e perimetro IVA coerente.
- [ ] Percentuale generica indicata come provvisoria.
- [ ] AdBlue non duplicato in manutenzione o altri fluidi.
- [ ] Costo aggiunto ai chilometri totali, compreso il vuoto.
- [ ] App e PDF non descritti come calcolo automatico AdBlue.

## Fonti e limiti

[ACEA](https://www.acea.auto/fact/diesel-exhaust-fluid-adblue/) descrive AdBlue e indica un intervallo orientativo del 2–6% del volume di gasolio. [Volkswagen Veicoli Commerciali](https://www.volkswagen-veicolicommerciali.it/it/service/servizi-e-assistenza/ricambi-oli-motore-fluidi/liquido-adblue.html) ricorda che il consumo dipende anche da condizioni operative e temperatura. Il [MIT](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6) fornisce il quadro corrente dei costi d’esercizio italiani, non un prezzo AdBlue live. Manuale del costruttore e dati della flotta restano riferimenti decisivi per il singolo mezzo.
