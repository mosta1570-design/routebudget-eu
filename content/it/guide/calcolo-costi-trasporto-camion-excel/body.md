## Risposta diretta: il foglio utile non è una formula unica

Per fare il **calcolo costi trasporto camion in Excel** senza perdere il controllo, separa quattro cose: dati stabili del mezzo, valori aggiornabili, singole missioni e risultati congelati. Un listino modificato oggi non deve cambiare il preventivo inviato ieri. Una tariffa valida da maggio non deve essere applicata a una spedizione di aprile. E una cella vuota non deve diventare silenziosamente zero.

La struttura più solida usa tabelle Excel, intervalli di validità, controlli visibili e un registro delle revisioni. Excel resta adatto per anagrafiche di flotta, listini e consuntivi. Fuori ufficio, RouteBudget può riunire i valori supportati di una singola tratta, mostrare tre scenari, salvarne il calcolo localmente e generare un PDF non vincolante.

## Il problema reale: trovare la tariffa valida nel giorno del viaggio

Una discussione italiana su [ForumExcel dedicata alla gestione delle spedizioni](https://www.forumexcel.it/forum/threads/gestione-spedizioni-su-strada.54288/) parte da un caso concreto: registrare trasportatore, origine, destinazione, tipo di mezzo e data, poi recuperare un prezzo per tonnellata da un listino. La difficoltà nasce quando quella tariffa ha una decorrenza e una scadenza.

È un problema gestionale, non soltanto di formula. Con intervalli sovrapposti, una ricerca può restituire il primo prezzo senza segnalare il conflitto. Senza scadenza, il vecchio valore può restare valido per sempre. Sovrascrivendo la riga precedente, non si ricostruisce più il calcolo storico.

La regola pratica è: **mai correggere una tariffa storica; chiudere la sua validità e aggiungere una nuova riga**.

## Architettura consigliata in cinque fogli

| Foglio | Contenuto | Regola di controllo |
| --- | --- | --- |
| `MEZZI` | ID mezzo, categoria, alimentazione, consumo aziendale, costo orario, criterio usura | un ID univoco per ogni configurazione |
| `TARIFFE` | tratta, mezzo, vettore, validità, unità e importo | nessun intervallo sovrapposto per la stessa chiave |
| `INPUT` | carburante, pedaggi, parametri e fonte con data | vietati valori senza unità o data di acquisizione |
| `VIAGGI` | una riga per missione e dati usati nel preventivo | celle obbligatorie e segnalazione degli errori |
| `REVISIONI` | versione, autore, data, motivo e risultato approvato | nessuna versione inviata viene sovrascritta |

Trasforma ogni area in una **Tabella Excel**, per esempio `tblMezzi`, `tblTariffe` e `tblViaggi`. Le formule strutturate resistono all’aggiunta di righe. Blocca le colonne formula e usa convalida dati per mezzo, vettore, unità e stato.

## Blueprint copiabile per tariffe e missioni

Nel foglio `TARIFFE` puoi partire da queste colonne:

| ID_tariffa | Tratta | Mezzo | Vettore | Valida_dal | Valida_al | Unità | Importo | Fonte | Versione |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| T-001 | BO-MI | AUTOARTICOLATO | V001 | 01/01/2026 | 31/03/2026 | €/t | 31,50 | accordo 04 | 1 |
| T-002 | BO-MI | AUTOARTICOLATO | V001 | 01/04/2026 | 30/06/2026 | €/t | 33,00 | accordo 07 | 2 |

Nel foglio `VIAGGI` usa almeno:

| ID_viaggio | Data | Tratta | Mezzo | Vettore | Unità_tariffa | Quantità | Km_andata | Km_ritorno | Consumo_L_100 | Prezzo_L | Pedaggi | Ore | Costo_ora | Usura_Euro_km | Altri_costi | Margine |
| --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |

A destra degli input aggiungi colonne calcolate per `Corrispondenze`, `Tariffa_unitaria`, `Importo_listino`, chilometri, litri, carburante, autista, usura, costo missione e scenario di prezzo. Restano risultati della riga, non valori da digitare a mano.

Prima di recuperare l’importo, conta quante tariffe soddisfano **tutti** i criteri. In una colonna `Corrispondenze`, con nomi di tabella coerenti, la logica può essere:

`=CONTA.PIÙ.SE(tblTariffe[Tratta];[@Tratta];tblTariffe[Mezzo];[@Mezzo];tblTariffe[Vettore];[@Vettore];tblTariffe[Unità];[@Unità_tariffa];tblTariffe[Valida_dal];"<="&[@Data];tblTariffe[Valida_al];">="&[@Data])`

Il risultato accettabile è `1`. Se vale `0`, manca una tariffa valida. Se è maggiore di `1`, esiste una sovrapposizione. Mostra `VERIFICA` e impedisci l’approvazione; non prendere automaticamente il primo risultato.

Quando il controllo vale uno, usa `FILTRO` o `SOMMA.PIÙ.SE` con gli stessi criteri per recuperare la `Tariffa_unitaria`. La funzione dipende dalla versione di Excel. Calcola poi `Importo_listino = Tariffa_unitaria × Quantità` soltanto quando le unità sono compatibili: tonnellate per `€/t`, chilometri fatturabili per `€/km`, oppure quantità `1` per una tariffa a viaggio. Conserva colonne separate per unità e quantità; sommare basi diverse produce un totale economicamente falso.

## Celle di calcolo: poche, leggibili e verificabili

Un blocco minimo per il viaggio può seguire questa logica:

| Risultato | Formula di esempio |
| --- | --- |
| Km totali | `=[@Km_andata]+[@Km_ritorno]` |
| Litri stimati | `=[@Km_totali]*[@Consumo_L_100]/100` |
| Costo carburante | `=[@Litri_stimati]*[@Prezzo_L]` |
| Costo autista | `=[@Ore]*[@Costo_ora]` |
| Usura aziendale | `=[@Km_totali]*[@Usura_Euro_km]` |
| Importo listino | `=[@Tariffa_unitaria]*[@Quantità]` dopo il controllo dell’unità |
| Costo missione | `=[@Carburante]+[@Pedaggi]+[@Autista]+[@Usura]+[@Altri_costi]` |
| Prezzo con margine sul ricavo | `=[@Costo_missione]/(1-[@Margine])` |

Sono formule gestionali, non tariffe ufficiali. Dichiara se la percentuale è margine sul ricavo o ricarico sul costo: le due convenzioni danno risultati diversi. Imposta limiti ragionevoli e avvisi, per esempio consumo nullo, margine uguale o superiore al 100%, chilometri negativi, data fuori validità o pedaggio senza fonte.

## Aggiornare input italiani senza trasformarli in verità aziendale

Il foglio deve indicare **origine e data** di ogni valore esterno. Tre fonti rispondono a tre domande diverse.

Le [tabelle MIT dei costi di esercizio aggiornate a marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6) offrono valori indicativi per classi A–D. Il Ministero segnala l’aggiornamento di assicurazione, energia e pedaggiamenti. Usale come confronto per scoprire una voce anomala o mancante, non come listino da assegnare indistintamente a ogni mezzo. La guida alle [tabelle costi autotrasporto MIT 2026](/it/guide/tabelle-costi-autotrasporto-mit-2026/) spiega come selezionare soltanto le componenti pertinenti.

Gli [open data carburanti del MIMIT](https://www.mimit.gov.it/it/open-data/elenco-dataset/carburanti-prezzi-praticati-e-anagrafica-degli-impianti) contengono prezzi comunicati dai gestori e hanno frequenza quotidiana. Sono utili per un riferimento datato o una verifica territoriale; non coincidono necessariamente con il prezzo netto pagato dalla flotta, con gli sconti della carta carburante o con il rifornimento che avverrà durante il viaggio. Nel foglio conserva valore, unità, impianto o perimetro scelto, data e URL.

Autostrade per l’Italia spiega che il [calcolo del pedaggio](https://www.autostrade.it/it/il-pedaggio/come-si-calcola-il-pedaggio) dipende da classe del veicolo, chilometri tariffari, caratteristiche del tratto e concessionario. La pagina tratta inoltre IVA e arrotondamento e indica tariffe aggiornate al 1° gennaio 2026. Un costo medio per chilometro non sostituisce quindi il controllo della rotta e della classe; registra l’importo verificato e la data. Per il metodo completo consulta la guida al [calcolo del pedaggio camion](/it/guide/calcolo-pedaggio-camion/).

## Versioni: come evitare che il passato cambi da solo

Ogni preventivo approvato dovrebbe avere un ID e una versione, per esempio `RB-2026-018-R1`. Nel foglio `REVISIONI` annota:

- data e ora del calcolo;
- responsabile della modifica;
- fonte e data di carburante e pedaggi;
- versione di listino applicata;
- celle o ipotesi cambiate;
- totale precedente e nuovo;
- stato: bozza, verificato, inviato o annullato.

Prima dell’invio, copia i risultati in un registro protetto oppure esporta uno snapshot non modificabile secondo il processo documentale dell’impresa. Non conservare soltanto formule collegate a tabelle vive: al prossimo aggiornamento potresti non ricostruire il numero visto dal cliente.

## Passaggio mobile: dove entra RouteBudget

Excel può restare la base aziendale per mezzi, consuntivi, listini e analisi mensili. RouteBudget è utile quando devi valutare **una singola tratta** con i valori già verificati: combina le voci supportate, presenta tre scenari di prezzo, conserva localmente lo snapshot del calcolo e genera un riepilogo PDF non vincolante.

Il passaggio è manuale e va controllato. RouteBudget **non importa né esporta file Excel**, non sincronizza l’anagrafica clienti e non gestisce contratti o listini con decorrenza. Può stimare una distanza stradale da origine e destinazione, ma non guida l’autista svolta per svolta, non certifica l’idoneità del percorso per un mezzo pesante e non recupera la tariffa corrente dal concessionario. Nel profilo camion applica una quota usura fissa di **0,15 €/km**; nel profilo N1 la quota è modificabile. Se il criterio aziendale del foglio è diverso, confronta la differenza e non presentare i risultati come identici.

Flusso prudente:

1. verifica in Excel mezzo, listino e versione degli input;
2. controlla percorso e pedaggi sulle fonti pertinenti;
3. inserisci nell’app soltanto i valori supportati della missione;
4. confronta i tre scenari senza trattarli come tariffe di mercato;
5. genera il PDF e aprilo prima di condividerlo;
6. conserva esternamente file inviato, dati cliente, condizioni e fonti.

La guida al [preventivo trasporto PDF](/it/guide/preventivo-trasporto-pdf/) chiarisce quali elementi sono presenti nel riepilogo RouteBudget e quali vanno completati fuori dall’app.

## Checklist prima di fidarsi del totale

- [ ] Ogni mezzo e tariffa ha un ID univoco.
- [ ] Decorrenza e scadenza sono entrambe compilate.
- [ ] Il controllo restituisce una sola tariffa valida.
- [ ] Unità, IVA e convenzione del margine sono dichiarate.
- [ ] Carburante e pedaggio riportano fonte e data.
- [ ] MIT è usato come benchmark, non come prezzo automatico.
- [ ] Km a vuoto e ore operative non sono nascosti.
- [ ] Celle formula sono protette e gli errori restano visibili.
- [ ] Ogni revisione inviata conserva uno snapshot.
- [ ] Il passaggio Excel–RouteBudget è stato verificato manualmente.
- [ ] Il PDF è stato aperto e controllato prima dell’invio.

Un foglio professionale rende evidente **quale dato era valido, da dove proveniva e quale versione ha prodotto il prezzo**. Excel mantiene memoria e struttura; RouteBudget accelera il passaggio dalla tratta controllata agli scenari e al PDF, senza sostituire il sistema aziendale.
