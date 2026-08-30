Il **costo pneumatici camion** non è il prezzo dell’ultima gomma diviso per i chilometri della tratta. Per ottenere una quota utile al preventivo servono almeno gruppo ruota, numero di pneumatici, costo realmente sostenuto, servizi collegati e durata prudente. Trattore e semirimorchio vanno separati quando hanno cicli di sostituzione diversi.

Questa pagina possiede una sola decisione: trasformare il parco pneumatici in una quota per chilometro verificabile. La [guida su usura e manutenzione](/it/guide/usura-manutenzione-camion/) resta il modello generale per officina, manutenzione e usura; il [costo chilometrico del camion](/it/guide/costo-chilometrico-camion/) unisce tutte le categorie nel consuntivo.

Per mappa completa di carburante, personale, struttura e mezzo resta il pillar sui [costi dell’autotrasporto](/it/guide/costi-autotrasporto/).

## Scheda minima da compilare

Non partire da una media trovata online. Per ogni gruppo omogeneo registra:

| Campo | Che cosa inserire | Errore da evitare |
| --- | --- | --- |
| Gruppo | sterzante, trazione, rimorchio o semirimorchio | sommare mezzi con impieghi diversi |
| Quantità | pneumatici effettivamente attribuiti al gruppo | dimenticare rimorchio o ruote gemellate |
| Costo unitario | imponibile o costo gestionale scelto, sempre con stesso criterio | mescolare importi con e senza IVA |
| Servizi | montaggio, equilibratura, smaltimento e altri costi direttamente attribuibili | aggiungere costi già compresi nel prezzo |
| Durata prevista | chilometri prudenti per quel gruppo e impiego | usare durata commerciale come garanzia |
| Recuperi | eventuale valore documentato della carcassa o credito | inventare un recupero non certo |
| Riserva separata | controlli o sostituzioni non programmate, se documentata | presentarla come previsione di guasto |

Il MIT pubblica valori indicativi nei quali i pneumatici sono una voce distinta. Sono un controllo esterno, non il dato del tuo mezzo: configurazione, missioni, pressione, carico, fondo stradale e politica di sostituzione cambiano il risultato.

## Formula per ogni gruppo

Usa una formula separata per sterzante, trazione e semirimorchio:

```text
costo netto del gruppo =
quantità × costo unitario
+ servizi attribuibili
− recuperi documentati

quota gruppo €/km = costo netto del gruppo ÷ durata prevista del gruppo in km

quota pneumatici totale €/km = somma delle quote dei gruppi
```

Se adotti una riserva tecnica autonoma:

```text
quota completa pneumatici €/km =
quota gruppi €/km + riserva documentata €/km
```

La riserva deve avere un’origine: storico aziendale coerente, contratto di manutenzione o budget deliberato. Un importo scelto “per prudenza” senza metodo rende il confronto tra mesi poco leggibile.

## Caso ricalcolabile: trattore più semirimorchio

Valori seguenti sono ipotesi didattiche, non prezzi medi italiani. Sostituiscili con fatture, preventivi e percorrenze della tua flotta.

| Gruppo | Costo completo gruppo | Durata prevista | Quota |
| --- | ---: | ---: | ---: |
| Sterzante | 1.300 € | 120.000 km | 0,0108 €/km |
| Trazione | 2.300 € | 150.000 km | 0,0153 €/km |
| Semirimorchio | 2.700 € | 180.000 km | 0,0150 €/km |

```text
quota gruppi = 0,0108 + 0,0153 + 0,0150 = 0,0411 €/km
riserva documentata dell’esempio = 0,0080 €/km
quota completa = 0,0491 €/km
```

Per una missione di 860 km totali, inclusi avvicinamento e ritorno attribuito:

```text
860 km × 0,0491 €/km = 42,23 €
```

Se il semirimorchio non partecipa alla missione, la sua quota non va caricata per abitudine. Se invece la percorrenza del trattore e quella del semirimorchio coincidono, entrambe maturano nello stesso viaggio.

## Nuovo, ricostruito e sicurezza: tenere separati i piani

Un pneumatico nuovo o ricostruito può avere costo e ciclo economico diversi. Questo basta per creare gruppi distinti nel modello; non basta per formulare conclusioni sulla sicurezza o attribuire una causa a eventuali danni.

Per il calcolo economico registra tipo, costo, durata osservata e condizioni d’impiego. Per idoneità, montaggio, pressione, carico, danni e sostituzione segui costruttore, fornitore qualificato, officina e regole applicabili. RouteBudget non diagnostica pneumatici e questa guida non prevede cedimenti.

## Il controllo che evita il doppio conteggio

Prima di sommare la quota, apri la voce “usura/manutenzione” già utilizzata nei tuoi preventivi e scrivi cosa contiene.

| Situazione | Trattamento corretto |
| --- | --- |
| Usura comprende già pneumatici | non aggiungere nuova quota; prima separa il vecchio valore |
| Manutenzione contiene solo officina e ricambi | aggiungi pneumatici come voce autonoma |
| Noleggio full service include pneumatici | non ricaricare costo già incluso nel canone |
| Fattura straordinaria già imputata al periodo | evita di sommare anche riserva maturata per stesso evento |
| Valore MIT usato come controllo | non sommarlo ai dati aziendali |

Questo confine è più importante della precisione al quarto decimale. Sommare “manutenzione”, “usura” e “pneumatici” senza definizioni può gonfiare il costo; escludere pneumatici finché non arriva la fattura lo abbassa artificialmente.

## Consuntivo: come sostituire ipotesi con dati propri

Alla chiusura del mese o trimestre registra per ogni gruppo:

- chilometri iniziali e finali;
- sostituzioni programmate e anticipate;
- costi di acquisto e servizi;
- recuperi effettivi;
- mezzo e asse interessati;
- motivo documentato dello scostamento;
- quota usata nei preventivi del periodo.

Non cambiare retroattivamente un preventivo già inviato. Confronta quota prevista e quota maturata; poi aggiorna il parametro per offerte future. Pochi mesi possono essere distorti da una sostituzione: usa un periodo coerente con il ciclo del gruppo e conserva anche il numero di chilometri.

Quando un guasto produce indisponibilità, tieni fattura tecnica separata dal [costo del fermo camion](/it/guide/costo-fermo-camion/). Dopo la missione, trasferisci quota maturata nella scheda [preventivo-consuntivo del viaggio](/it/guide/preventivo-consuntivo-viaggio-camion/) senza riscrivere l’offerta accettata.

## Come inserirlo in RouteBudget oggi

RouteBudget calcola una componente aggregata di usura/manutenzione nella missione. Oggi non offre un registro separato per ogni pneumatico o asse. Il flusso corretto è:

1. calcolare fuori dall’app la quota pneumatici totale per km;
2. verificare cosa contiene la quota di usura già usata;
3. inserire una quota aggregata che non conti due volte gli stessi costi;
4. calcolare andata e ritorno pertinenti;
5. confrontare prezzo minimo, consigliato e ideale;
6. esportare il [preventivo PDF](/it/guide/preventivo-trasporto-pdf/) dopo aver verificato i dati.

Il PDF è una stima commerciale non vincolante. Non certifica durata, stato o sicurezza dei pneumatici e non sostituisce documenti di manutenzione.

## Checklist prima di usare la quota

- [ ] Trattore e semirimorchio sono inclusi soltanto quando pertinenti.
- [ ] Quantità e gruppi ruota sono reali.
- [ ] Costi usano criterio IVA coerente.
- [ ] Servizi e recuperi sono documentati.
- [ ] Durata prevista deriva da impiego e storico comparabili.
- [ ] Riserva e sostituzioni effettive non si sovrappongono.
- [ ] Manutenzione, noleggio e usura non contengono già la stessa spesa.
- [ ] Andata, avvicinamento e ritorno usano distanza corretta.
- [ ] La quota viene aggiornata per offerte future, non per riscrivere quelle storiche.

## Fonti e limiti

Il perimetro delle voci è stato confrontato con i [valori indicativi MIT aggiornati a marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6) e con la [Tabella D ufficiale](https://www.mit.gov.it/nfsmitgov/files/media/documentazione/2026-03/TABELLA%20D_Costi%20Esercizio%20Imprese_Modello%20costi_mar2026_pedaggi%20al%20netto%20IVA.pdf). Le formule della pagina trasformano dati aziendali dichiarati in una quota; non riproducono un valore MIT come tariffa, non forniscono una vita utile standard e non formulano diagnosi tecniche.
