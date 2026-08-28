Nel 2026 la disciplina italiana prevede una **franchigia di 90 minuti per ciascuna operazione di carico o scarico**. Oltre la soglia, l’indennizzo è stato introdotto con un importo base di 100 euro per ogni ora o frazione, soggetto a rivalutazione annuale. Non ogni fermo genera però 100 euro: vanno distinti attesa ed esecuzione materiale e verificati norma, importo vigente e tempi del caso concreto.

> Questa guida offre un metodo operativo per stimare costi e preparare condizioni chiare. Non è consulenza legale e non stabilisce se un indennizzo sia dovuto in uno specifico rapporto di trasporto.

La disciplina richiamata appartiene al perimetro italiano dell’autotrasporto professionale di cose per conto di terzi regolato dal decreto legislativo 286/2005. Tipo di servizio, contratto, soggetti e luogo dell’operazione vanno verificati prima di applicarla; la pagina non estende automaticamente la regola a ogni trasporto o fermo.

## Le cinque grandezze da non confondere

Attesa, operazione, indennizzo, costo e prezzo rispondono a domande diverse. Tenerli separati evita sia di perdere un costo reale sia di presentare al cliente una voce priva di fondamento.

| Grandezza | Domanda a cui risponde | Come trattarla |
| --- | --- | --- |
| Attesa | Quanto tempo passa prima dell’avvio materiale del carico o dello scarico? | Si misura separatamente per ogni evento |
| Operazione | Quanto dura l’attività materiale dal suo inizio alla fine? | Si confronta con tempi e condizioni contrattuali |
| Indennizzo legale | Esistono le condizioni per una somma prevista dalla disciplina vigente? | Si verifica su norma, importo aggiornato e documenti |
| Costo interno | Quanto costa all’impresa il tempo assorbito? | Si stima con autista, mezzo fermo e costi indiretti |
| Prezzo commerciale | Quali condizioni economiche vengono proposte al cliente? | Si esplicita nel preventivo senza spacciarlo per legge |

L’**attesa** precede l’avvio dell’operazione materiale; l’**operazione** è il carico o lo scarico vero e proprio. Se il mezzo arriva al piazzale, resta in coda e poi entra in baia, servono gli orari effettivi: “due ore presso il cliente” non basta.

## Come funziona la franchigia di 90 minuti

Il MIT ha chiarito nel 2025 che la franchigia si applica **a ogni singola operazione**. Carico e scarico hanno conteggi autonomi: i minuti non usati al carico non passano allo scarico e due attese sotto soglia non si sommano.

Per una prima lettura quantitativa:

```text
minuti eccedenti = max(0, minuti di attesa − 90)
unità di indennizzo = arrotondamento per eccesso(minuti eccedenti ÷ 60)
indennizzo teorico = unità di indennizzo × importo vigente per unità
```

L’importo base introdotto è 100 euro per ora o frazione, con **rivalutazione annuale**. In un calcolo del 2026 o successivo va quindi controllato l’importo applicabile alla data dell’evento.

L’esecuzione materiale è distinta. Il comma 3 prevede lo stesso indennizzo anche quando vengono superati i tempi di esecuzione materiale indicati nel contratto di trasporto, purché il superamento sia documentato. Non si applica automaticamente la franchigia di 90 minuti propria dell’attesa: vanno confrontati durata effettiva e tempo contrattuale, poi verificate condizioni, prova e importo vigente.

Il testo coordinato prevede inoltre che l’indennizzo non sia dovuto quando il ritardo è imputabile al vettore e disciplina la responsabilità solidale di committente e caricatore. In caso di mancato rispetto dell’onere di fornire indicazioni su luogo, orario e modalità di accesso, il vettore può dimostrare l’orario di arrivo mediante le risultanze del sistema satellitare di geolocalizzazione del veicolo o del tachigrafo intelligente di seconda generazione. Questi elementi richiedono comunque una verifica sul caso concreto.

## Esempio: carico e scarico restano separati

I dati seguenti sono soltanto ipotesi didattiche, non una ricostruzione legale né una tariffa consigliata.

| Evento | Arrivo | Inizio materiale | Attesa | Eccedenza sulla franchigia |
| --- | ---: | ---: | ---: | ---: |
| Carico | 07:30 | 09:35 | 125 min | 35 min |
| Scarico | 15:00 | 16:20 | 80 min | 0 min |

Nel carico, 35 minuti superano la franchigia: la formula produce una unità perché la norma ragiona per ora o frazione. Il valore monetario va ottenuto usando l’importo annualmente vigente, non dando per scontato il valore base. Allo scarico, gli 80 minuti restano sotto i 90; non si aggiungono ai 35 minuti eccedenti del carico.

Supponiamo inoltre che il contratto attribuisca 45 minuti all’esecuzione del carico e che l’attività materiale termini alle 10:50. La durata operativa è 75 minuti, quindi presenta uno scostamento documentabile di 30 minuti dal tempo contrattuale. Tale scostamento non è “altra attesa” e non assorbe una nuova franchigia: costituisce una fattispecie distinta da verificare secondo il comma 3 e la documentazione disponibile.

## Calcolare il costo interno del fermo

Anche senza indennizzo legale, il fermo può costare all’impresa: la soglia non cancella costo del lavoro, indisponibilità del mezzo o perdita della consegna successiva.

Nelle note di ricerca operativa raccolte per RouteBudget ricorre un problema concreto: durante la sosta il camion non produce chilometri fatturabili, ma continuano a pesare il tempo dell’autista, l’impegno del mezzo e l’eventuale ripianificazione della missione successiva. È un’osservazione di lavoro, non una misura statistica e non dimostra da sola il diritto a un indennizzo.

Una stima interna leggibile può partire da:

```text
costo interno del tempo assorbito =
ore operative × costo orario dell’autista
+ costo attribuibile del mezzo fermo
+ altri costi direttamente collegati
```

Il costo orario dell’autista non coincide con la sua retribuzione netta. Per impostare correttamente questa voce è utile la guida sul [costo orario dell’autista di camion](/it/guide/costo-orario-autista-camion/). Il mezzo fermo può inoltre assorbire una quota di leasing, assicurazione, struttura o opportunità, ma ogni componente va inserita una sola volta: se è già compresa nella quota fissa, aggiungerla di nuovo crea un doppio conteggio.

Un’attesa non diventa pausa solo perché il veicolo è fermo. La classificazione tachigrafica dipende da attività e disponibilità effettive del conducente e resta distinta dalla verifica dei [tempi di guida e riposo del camion](/it/guide/tempi-guida-riposo-camion/).

## Caso operativo ricalcolabile: consegna a un centro distributivo

Questo caso riproduce una situazione quotidiana plausibile per un piccolo vettore italiano. Orari e costi sono ipotesi dichiarate: sostituendoli con i propri dati si ottiene un calcolo verificabile, non una tariffa di mercato.

Un camion arriva per lo scarico alle 06:30, come da slot. L’operazione materiale inizia alle 08:40 e termina alle 09:30.

| Dato | Valore dell’esempio | Come sostituirlo |
| --- | ---: | --- |
| Attesa prima dello scarico | 130 min | Inizio materiale − arrivo |
| Esecuzione materiale | 50 min | Fine − inizio materiale |
| Permanenza totale sul sito | 180 min | Fine − arrivo |
| Tempo incluso nel prezzo commerciale | 60 min | Condizione concordata nel preventivo |
| Tempo aggiuntivo per il costo interno | 120 min = 2 h | Permanenza − tempo incluso |
| Costo pieno autista | 29 €/h | Proprio costo aziendale |
| Quota del mezzo fermo | 18 €/h | Quota documentata, senza doppioni |
| Ripianificazione direttamente collegata | 8 € | Costo specifico effettivamente sostenuto |

Il costo interno aggiuntivo dell’esempio è:

```text
2 h × (29 €/h + 18 €/h) + 8 € = 102 €
```

Se l’impresa vuole che il prezzo commerciale copra questo costo lasciando un margine del 15% sul prezzo, il calcolo è:

```text
prezzo commerciale minimo = 102 € ÷ (1 − 0,15) = 120 €
```

I 120 euro sono una scelta economica dell’impresa, non l’indennizzo previsto dalla legge. Sul piano normativo, l’attesa di 130 minuti supera di 40 minuti la franchigia di 90: la formula teorica produce una unità di indennizzo. L’importo di tale unità va verificato per la data dell’evento, insieme a responsabilità e documentazione. Anche i 60 minuti inclusi nel prezzo sono una condizione commerciale: non modificano la franchigia legale.

Per rifare il caso basta sostituire cinque dati: permanenza totale, minuti inclusi, costo pieno dell’autista, quota del mezzo e costo specifico. Se il tempo aggiuntivo è zero, il costo interno aggiuntivo della formula è zero; l’eventuale verifica dell’indennizzo resta separata.

## Dal costo interno al prezzo commerciale

Indennizzo legale, costo sostenuto e prezzo concordato possono differire: dipendono rispettivamente da presupposti normativi, struttura dell’impresa e condizioni del servizio.

In un preventivo è più chiaro:

- indicare la finestra o lo slot concordato;
- definire quali tempi sono inclusi nel prezzo;
- distinguere attesa precedente e durata dell’operazione;
- spiegare il criterio economico applicato agli extra;
- rinviare alla disciplina vigente quando si parla di indennizzo legale;
- evitare di addebitare in anticipo un indennizzo come se fosse già maturato.

Una voce commerciale del tipo “tempo aggiuntivo presso il sito” non dovrebbe essere presentata come “indennizzo di legge” se è semplicemente un prezzo contrattuale. Viceversa, una richiesta formulata sulla base della disciplina non dovrebbe usare una tariffa interna senza verificare l’importo legale aggiornato. Nel [preventivo di trasporto](/it/guide/preventivo-trasporto/) conviene rendere visibili ipotesi, inclusioni, esclusioni e validità, lasciando i dati sensibili di costo nel calcolo interno.

### Testo di lavoro da affiancare al PDF

Il testo seguente è una traccia informativa da adattare al servizio e far verificare da un professionista. Non è una clausola legale pronta all’uso e non va presentato come contenuto generato automaticamente da RouteBudget.

> **Tempi presso carico e scarico.** Il corrispettivo comprende fino a **[X minuti]** presso ciascun sito, calcolati secondo **[evento iniziale e finale concordati]**. Il tempo commerciale aggiuntivo, quando registrato con **[documenti/orari concordati]**, è valorizzato a **[Y euro per ora o frazione / altro criterio]**, previa verifica delle condizioni applicabili. Questa voce commerciale non sostituisce, limita né quantifica l’eventuale indennizzo previsto dalla disciplina vigente sui tempi di attesa e di esecuzione materiale.

Prima di affiancarlo al PDF del preventivo, compilare ogni parentesi, verificare coerenza con contratto e ordine di trasporto e specificare se carico e scarico hanno condizioni diverse. Evitare formule come “100 euro automatici dopo 90 minuti”: confondono prezzo concordato, importo legalmente vigente e verifica del caso concreto.

## Quali orari e documenti raccogliere

Il conteggio deve poter essere ricostruito. Prima della partenza vanno identificati punto concordato, slot e tempi previsti; durante il servizio è prudente registrare:

- ora di arrivo e disponibilità del veicolo;
- eventuale registrazione al gate o alla piattaforma;
- ora di inizio e fine del carico;
- ora di arrivo, inizio e fine dello scarico;
- comunicazioni su ritardi o indisponibilità della baia;
- riserve o annotazioni pertinenti nei documenti di trasporto.

Prenotazioni, messaggi, registri di sito, documenti firmati e dati di bordo possono contribuire, ma nessun elemento garantisce da solo l’esito di una contestazione. I dati vanno trattati secondo le regole applicabili.

## Come usare RouteBudget senza confondere stima e diritto

RouteBudget permette di impostare il costo orario dell’autista; l’app stima le ore dal percorso e dal piano di interruzioni, mentre il calcolatore web consente una simulazione economica con ore operative inserite dall’utente. Il percorso può essere questo:

1. stimare distanza, carburante, pedaggi e ore complessive;
2. includere il tempo operativo prevedibile presso carico e scarico;
3. calcolare il costo della missione con il [calcolatore del costo chilometrico del camion](/it/calcolatori/costo-chilometrico-camion/);
4. scegliere il prezzo commerciale e gestire eventuali clausole sulle attese nel contratto o documento appropriato, fuori dal PDF generato dall’app.

Il PDF dell’app riepiloga la stima ma non offre un campo libero per clausole personalizzate sulle attese. È un documento non vincolante da verificare prima dell’invio. RouteBudget non determina automaticamente la spettanza dell’indennizzo, non verifica la rivalutazione annuale e non produce una prova legale degli orari. Per integrare attese e altre componenti nella stessa base economica, si può seguire anche il metodo completo per il [calcolo del costo di trasporto](/it/guide/calcolo-costo-trasporto/).

## Errori da evitare

- Applicare una sola franchigia all’intera giornata anziché a ciascuna operazione.
- Sommare carico e scarico per superare artificialmente i 90 minuti.
- Chiamare “attesa” anche il tempo di esecuzione materiale.
- Usare sempre 100 euro senza verificare la rivalutazione vigente.
- Considerare indennizzo, costo interno e prezzo come sinonimi.
- Trasformare automaticamente un fermo in pausa del conducente.
- Presentare un PDF operativo come prova o parere legale.

## Checklist prima del preventivo o della richiesta

- [ ] Carico e scarico sono registrati come eventi separati.
- [ ] Arrivo, inizio e fine materiale sono identificabili.
- [ ] I tempi contrattuali delle operazioni sono disponibili.
- [ ] La franchigia è applicata separatamente.
- [ ] L’importo annualmente vigente è stato verificato.
- [ ] Il costo interno usa ore e costi aziendali documentati, senza doppioni.
- [ ] Il prezzo commerciale è calcolato separatamente dal costo e dall’indennizzo.
- [ ] Minuti inclusi, criterio degli extra e prova degli orari sono espliciti.
- [ ] La traccia allegata al PDF è stata compilata e verificata per quel rapporto.
- [ ] Il PDF non presenta una stima RouteBudget come prova del tempo trascorso.
- [ ] Contratto, responsabilità e documenti sono stati esaminati da chi è competente.

## Fonti e metodo

La regola è stata verificata sulla comunicazione del [MIT del 19 maggio 2025](https://www.mit.gov.it/comunicazione/news/autotrasporto-misure-significative-nel-decreto-infrastrutture) e sul [testo coordinato dell’articolo 4 del decreto-legge 73/2025 con la legge di conversione 105/2025](https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=25A04106&art.dataPubblicazioneGazzetta=2025-07-19&art.flagTipoArticolo=0&art.idArticolo=4&art.idGruppo=2&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=0&art.versione=1). Il chiarimento [FIAP dell’8 ottobre 2025](https://www.fiapautotrasporti.it/le-ultime-notizie/attese-al-carico-e-allo-scarico-fiap-chiarisce-come-funziona-la-regola-dei-90-minuti/) supporta la distinzione operativa e l’attenzione alla documentazione. L’analisi di [Uomini e Trasporti del 23 ottobre 2024](https://www.uominietrasporti.it/centonumeri/autisti-e-dintorni/435-e-il-tempo-di-attesa-media-di-un-camion-al-carico-scarico/) descrive la dimensione pratica del problema su dati di settore, ma non è usata come fonte normativa. Le due fonti istituzionali sono state ricontrollate il 28 agosto 2026; le altre fonti restano contestuali e non normative.
