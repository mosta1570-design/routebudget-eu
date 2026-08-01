## Tre voci da calcolare separatamente

Carburante, pedaggi e autista formano una parte importante del costo diretto di una tratta, ma seguono logiche diverse. Il carburante dipende da distanza, consumo e prezzo; il pedaggio dipende dall’itinerario e dal veicolo; l’autista dipende dalla durata operativa, non soltanto dai chilometri.

Calcolarli in tre blocchi rende più semplice aggiornare una proposta. Se cambia il percorso si rivedono distanza e pedaggi; se slitta l’orario si aggiorna il tempo; se cambia il prezzo del gasolio si modifica un solo input. Alla fine le tre voci confluiscono nel costo operativo insieme a usura, quote fisse e altre spese pertinenti.

Questa pagina è un controllo di coerenza fra unità e perimetro delle tre voci; non sostituisce le guide dedicate a carburante, pedaggi o lavoro dell’autista.

## Preparare i dati della tratta

Prima delle formule, annotare origine e destinazione, chilometri totali previsti, caratteristiche del mezzo e durata stimata.

| Dato | Unità | Controllo utile |
| --- | --- | --- |
| Distanza totale | km | includere deviazioni e ritorno previsto |
| Consumo medio | l/100 km | usare il mezzo o un profilo comparabile |
| Prezzo carburante | €/l | indicare data e criterio |
| Pedaggi | € | verificare assi, classe, massa e percorso |
| Guida prevista | ore | distinguere dalla durata totale |
| Altre attività | ore | carico, scarico, attese e preparazione |
| Costo autista | €/ora o €/giorno | usare il criterio interno coerente |

La distanza indicata nella richiesta può non coincidere con quella effettiva per un mezzo pesante. Divieti, accessi, tappe, parcheggi o riposizionamento modificano il viaggio. La fonte dell’itinerario deve rimanere associata al calcolo.

## Formula del costo carburante

Il primo passaggio calcola i litri:

`litri stimati = km totali × consumo medio ÷ 100`

Poi:

`costo carburante = litri stimati × prezzo al litro`

Con 540 km, consumo ipotetico di 31 l/100 km e prezzo di 1,68 €/l:

`540 × 31 ÷ 100 = 167,4 litri`

`167,4 × 1,68 € = 281,23 €`

I valori sono didattici e non descrivono un consumo o prezzo medio. Nel calcolo reale il consumo varia con carico, percorso, traffico, altimetria, temperatura e stile di guida. È preferibile usare una media storica per condizioni simili e confrontarla con il consuntivo.

## Quale prezzo al litro usare

Tre criteri sono comuni: ultimo rifornimento, media interna recente o prezzo previsto nel luogo di acquisto. Nessuno è sempre migliore; conta la coerenza.

Il prezzo dell’ultimo rifornimento è concreto ma può essere poco rappresentativo se il viaggio attraversa mercati diversi. Una media interna stabilizza oscillazioni brevi. Un valore previsto aiuta su una missione futura, ma rimane una stima. Le fonti pubbliche possono offrire un riferimento di contesto, senza sostituire il costo aziendale.

Per una tratta sensibile al carburante, affiancare uno scenario con prezzo leggermente superiore mostra quanto cambia il totale. Non è una previsione, ma un controllo di robustezza.

## Pedaggi: dalla stima alla verifica

Non esiste una sola formula europea per il pedaggio. Il costo può dipendere da Paese, rete, distanza tariffata, numero di assi, massa, classe o emissioni, orario e infrastrutture speciali. Per questo una matrice media è adatta a una prima valutazione, non a sostituire una tariffa ufficiale.

Un processo pratico distingue:

1. **stima preliminare**, per confrontare rapidamente itinerari;
2. **verifica del percorso**, con caratteristiche corrette del mezzo;
3. **voci speciali**, come tunnel, ponti, traghetti o prenotazioni;
4. **consuntivo**, per correggere lo storico dopo la missione.

Quando l’importo incide sulla proposta, controllare le tariffe in vigore presso il gestore o la fonte ufficiale pertinente. Annotare data e percorso della verifica. Una modifica di itinerario può rendere obsoleto il valore anche se i chilometri totali restano simili.

## Calcolare il costo dell’autista

Il tempo operativo comprende più della guida:

`tempo operativo = guida + carico/scarico + attese + pause pianificate + attività accessorie`

Se l’impresa usa un costo orario interno:

`costo autista di tratta = tempo operativo × costo orario`

Con 7,5 ore di tempo operativo e un costo didattico di 27 €/ora, la voce sarebbe 202,50 €. Il valore è illustrativo; il costo effettivo dipende dal modello dell’impresa e non può essere ricavato da questo esempio.

Per missioni che occupano più giornate può essere più coerente un criterio giornaliero, con eventuali componenti specifiche trattate separatamente. Non si deve applicare contemporaneamente un costo orario completo e una quota giornaliera che copre le stesse ore.

## Tempi di guida, pause e riposo

La pianificazione deve rispettare le regole applicabili sui tempi di guida e riposo. Il regolamento europeo e le condizioni concrete del viaggio vanno verificati da chi organizza la missione; un calcolatore economico non determina la conformità operativa.

Dal punto di vista del costo, pause, riposi, finestre di consegna e attese possono estendere l’occupazione di autista e mezzo. Una tratta che supera una soglia organizzativa può richiedere un secondo giorno, un pernottamento o una diversa sequenza. Il calcolo deve riflettere il piano effettivo, non una velocità media astratta.

## Esempio combinato

Proseguiamo con dati ipotetici:

| Voce | Calcolo | Risultato |
| --- | --- | ---: |
| Carburante | 540 km, 31 l/100 km, 1,68 €/l | 281,23 € |
| Pedaggi | stima verificata per l’itinerario scelto | 118,00 € |
| Autista | 7,5 ore × 27 €/ora | 202,50 € |
| Totale delle tre voci | somma | 601,73 € |

Questo totale non è il costo completo della tratta e non è un prezzo da offrire. Mancano, tra le altre possibili componenti, usura, pneumatici, manutenzione, quota dei costi fissi, ritorno non incluso, servizi speciali e margine.

## Controllare gli errori di unità

Molti errori nascono da unità incoerenti. Inserire 31 come litri per km anziché per 100 km moltiplica il risultato. Confondere minuti e ore altera il costo autista. Usare km di sola andata con pedaggi di andata e ritorno produce una base disallineata.

Mantenere le unità accanto a ogni campo e arrotondare soltanto il risultato finale. Per denaro, lavorare internamente in centesimi riduce gli errori cumulativi; la presentazione in euro avviene alla fine.

## Checklist prima di usare il totale

- [ ] I chilometri comprendono tutto il percorso previsto.
- [ ] Consumo e prezzo carburante hanno una fonte riconoscibile.
- [ ] Litri/100 km e km sono stati convertiti correttamente.
- [ ] Il mezzo inserito corrisponde a quello pianificato.
- [ ] Pedaggi e voci speciali sono separati.
- [ ] Le tariffe in vigore sono state verificate quando necessario.
- [ ] Il tempo include operazioni, attese, pause e attività finali.
- [ ] Il criterio orario o giornaliero non duplica costi.
- [ ] Il totale è ancora una stima e non un’offerta completa.

Separare le tre voci permette di vedere quale ipotesi pesa davvero. Dopo il viaggio, confrontare litri, pedaggi e ore effettive con la previsione migliora gradualmente il modello della propria attività.
