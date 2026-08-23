# RouteBudget EU — piano dei calcolatori SEO

## Obiettivo

Creare strumenti italiani utili, indicizzabili e condivisibili che risolvano un singolo passaggio del calcolo di una tratta. Ogni tool deve mostrare metodo e limiti, poi spiegare perché il flusso RouteBudget completo è più adatto alla decisione operativa e al preventivo.

I tool web non sono demo fittizie e non restituiscono numeri precompilati presentati come risultati. Non sono neppure una copia dell'app: usano input manuali, non salvano pratiche, non generano PDF e non ricostruiscono l'intero motore di pedaggi, mezzi, pause, ritorno e scenari.

## Confine tra web, app Free e Pro

| Capacità | Calcolatori web | App RouteBudget Free | RouteBudget Pro |
| --- | --- | --- | --- |
| Scopo | una domanda per volta, risultato educativo e temporaneo | flusso integrato di calcolo della tratta | uso continuativo e personalizzazione professionale |
| Input | manuali, nessun profilo persistente | route, mezzo e costi nel flusso app | come Free |
| Distanza/pedaggi | distanza e pedaggi inseriti dall'utente; nessuna promessa di tariffa ufficiale | funzioni app verificate, con stime e possibilità di controllo/manualità | come Free |
| Costi | formula limitata alla pagina | carburante/energia, pedaggi, autista, pause, usura/manutenzione e ritorno a vuoto quando applicabile | come Free |
| Prezzi | uno scenario strettamente legato allo strumento | scenari Minimo, Consigliato e Ideale | come Free |
| Output | risultato in pagina; nessun documento o archivio | preventivo PDF e Archivio locale | calcoli illimitati e logo aziendale nei PDF, secondo l'offerta corrente |
| Limite | nessun salvataggio, duplicazione o gestione cliente | tre calcoli nella versione Free, secondo l'offerta corrente | condizioni e prezzi verificabili nelle schede store |

Le condizioni commerciali possono cambiare: i testi del sito devono derivare da un'unica fonte prodotto aggiornata, e prezzi/periodi promozionali non vanno hardcodati nei contenuti SEO.

## Standard comune di calcolo

### Numeri e arrotondamento

- Nei tool web correnti mantenere numeri finiti a piena precisione durante il calcolo e arrotondare soltanto in formattazione; se un valore viene persistito o trasmesso, convertirlo in centesimi/decimale con strategia documentata. L'app continua a gestire il denaro in centesimi internamente.
- Accettare virgola o punto decimale in italiano e normalizzare senza modificare ciò che l'utente vede durante la digitazione.
- Mostrare unità nelle label (`km`, `L/100 km`, `€/L`, `€/h`, `€/km`), non soltanto nei placeholder.
- Rifiutare `NaN`, infinito, valori negativi e margine pari o superiore al 100%. Lo zero è valido solo dove ha senso, per esempio pedaggio manuale.
- Non precompilare valori “medi” senza fonte. Gli esempi possono riempire un pulsante separato “Carica esempio”, chiaramente etichettato.
- Mostrare formula, input utilizzati e data/versione della metodologia accanto al risultato.

### Modello di risultato

Ogni risultato contiene:

1. totale principale con unità e arrotondamento dichiarato;
2. dettaglio delle componenti;
3. caveat specifico, non nascosto in tooltip;
4. link alla guida metodologica;
5. CTA contestuale all'app;
6. pulsante “Ricomincia” che cancella solo lo stato locale del form.

Nessun valore utente entra nel title, canonical, URL condiviso, log analytics o markup strutturato.

## Tool 1 — costo chilometrico camion

- **URL:** `/it/calcolatori/costo-chilometrico-camion/`
- **Lancio:** Mese 1, P0
- **Intento:** “calcolatore costo chilometrico camion”, “costo camion al km”
- **Guida madre:** `/it/guide/calcolo-costo-trasporto/`

### Input

- chilometri carichi/fatturabili `loadedKm`, obbligatori e maggiori di zero;
- chilometri a vuoto `emptyKm`, facoltativi e maggiori o uguali a zero;
- consumo `fuelConsumption`, L/100 km;
- prezzo carburante `fuelPrice`;
- pedaggi totali verificati/inseriti `tollCost`;
- ore operative `operationalHours`, inserite dall'utente e comprensive delle pause che ritiene applicabili;
- costo autista orario `driverHourlyCost`;
- usura/manutenzione `wearPerKm`;
- quota costi fissi `fixedPerKm`, facoltativa e ricavabile dal Tool 5.

### Formula

```text
totalKm = loadedKm + emptyKm
fuelCost = (totalKm / 100) × fuelConsumption × fuelPrice
driverCost = operationalHours × driverHourlyCost
wearCost = totalKm × wearPerKm
fixedCost = totalKm × fixedPerKm
totalOperationalCost = fuelCost + tollCost + driverCost + wearCost + fixedCost
costPerTravelledKm = totalOperationalCost / totalKm
costPerLoadedKm = totalOperationalCost / loadedKm
```

Mostrare entrambi i denominatori. “Costo per km percorso” descrive l'efficienza operativa; “costo per km fatturabile” rende visibile l'effetto del ritorno a vuoto. Nessuno dei due è automaticamente il prezzo da chiedere.

### Caveat e confine app

- Il risultato dipende dai valori dell'utente e non include imposte, rischio, tempi accessori o costi non inseriti.
- Il tool non calcola distanza reale, classe veicolo, pedaggio, pause o prezzo commerciale.
- CTA: “Aggiungi configurazione mezzo, scenari di prezzo, PDF e Archivio in RouteBudget”.

### Vettore di test

Con `loadedKm=500`, `emptyKm=100`, `31 L/100 km`, `1,75 €/L`, pedaggi `120 €`, `9 h × 25 €/h`, usura `0,18 €/km` e fissi `0,20 €/km`:

```text
fuel = 325,50 €
driver = 225,00 €
wear = 108,00 €
fixed = 120,00 €
total = 898,50 €
cost/km percorso = 1,50 € (898,50 / 600)
cost/km fatturabile = 1,80 € (898,50 / 500)
```

I test automatici devono verificare i valori non arrotondati e la formattazione finale separatamente.

## Tool 2 — costo carburante viaggio

- **URL:** `/it/calcolatori/costo-carburante-viaggio/`
- **Lancio:** Mese 1, P0
- **Intento:** “calcolatore costo carburante viaggio”, “calcolo gasolio camion”
- **Pillar:** `/it/guide/calcolo-costo-trasporto/`
- **Guida metodologica:** `/it/guide/calcolare-carburante-pedaggi-autista/`

### Input e formula

```text
distanceKm > 0
emptyReturnKm >= 0
fuelConsumption > 0
fuelPrice > 0

outboundLitres = (distanceKm / 100) × fuelConsumption
returnLitres = (emptyReturnKm / 100) × fuelConsumption
totalDistanceKm = distanceKm + emptyReturnKm
totalLitres = outboundLitres + returnLitres
outboundFuelCost = outboundLitres × fuelPrice
returnFuelCost = returnLitres × fuelPrice
totalFuelCost = outboundFuelCost + returnFuelCost
```

Mostrare distanza, litri e costo separati per andata e ritorno a vuoto, più i totali. `emptyReturnKm` è già parte del tool corrente; non creare un secondo URL parametrico.

### Vettore di test

Con `distanceKm=640`, `emptyReturnKm=120`, `32 L/100 km` e `1,75 €/L`: distanza totale `760 km`, `243,2 L`, andata `358,40 €`, ritorno `67,20 €`, totale `425,60 €`.

### Caveat e CTA

- Consumo, prezzo, carico, traffico, pendenza, temperatura e stile di guida possono cambiare il costo reale.
- Il sito non fornisce un prezzo carburante live; l'utente inserisce il prezzo pertinente.
- CTA: “Completa il costo con pedaggi, autista, usura e margine in RouteBudget”.

## Tool 3 — prezzo del trasporto e margine

- **URL:** `/it/calcolatori/prezzo-minimo-margine-tratta/`
- **Lancio:** 23 agosto 2026, P0
- **Intento:** “come calcolare il prezzo di un trasporto”, exact Google Suggest IT; secondarie “calcolo prezzo trasporto” e “prezzo minimo tratta camion”
- **Guida madre:** `/it/guide/calcolo-costo-trasporto/`
- **Confine:** converte costo completo + margine target in soglia e prezzo; l’analisi di sensibilità resta in `/it/guide/proteggere-margine-tratta/`.

### Input e formula

```text
totalCost > 0
targetMarginRate >= 0 and < 1

sellingPrice = totalCost / (1 - targetMarginRate)
profit = sellingPrice - totalCost
achievedMarginRate = profit / sellingPrice
markupRateOnCost = profit / totalCost
```

Un confronto facoltativo può mostrare perché un ricarico sul costo non equivale allo stesso margine:

```text
priceFromMarkup = totalCost × (1 + markupRate)
marginFromMarkup = (priceFromMarkup - totalCost) / priceFromMarkup
```

### Vettore di test

Con costo `1.000 €` e margine target `20%`, prezzo `1.250 €`, utile `250 €`, margine `20%`, ricarico `25%`. Un semplice ricarico del `20%` produce invece prezzo `1.200 €` e margine `16,67%`.

### Caveat e CTA

- “Utile” è ricavo meno il solo costo inserito, non utile netto aziendale, reddito o risultato garantito.
- Il tool non decide se il prezzo è competitivo o accettabile per il cliente.
- CTA: “Confronta Minimo, Consigliato e Ideale nel flusso RouteBudget”.

## Tool 4 — prezzo minimo della tratta

- **URL:** `/it/calcolatori/prezzo-minimo-tratta/`
- **Lancio:** Mese 2, P1
- **Intento:** “calcolatore prezzo minimo tratta”, “tariffa minima camion”
- **Guida madre:** `/it/guide/punto-pareggio-trasporto/`

### Input e formula

Campi monetari manuali: `fuelCost`, `tollCost`, `driverCost`, `wearCost`, `allocatedFixedCost`, `emptyReturnCost`, `otherRouteCost`.

```text
breakEvenPrice = fuelCost + tollCost + driverCost + wearCost
               + allocatedFixedCost + emptyReturnCost + otherRouteCost
buffer = quotedPrice - breakEvenPrice  // only if user enters a quoted price
```

Il nome UI principale deve essere “soglia di copertura costi”. La keyword “tariffa minima” può essere spiegata nel testo, ma non deve far credere che il risultato sia una tariffa legale, ufficiale o di mercato.

### Caveat e CTA

- La soglia vale solo per le voci inserite; valori omessi rendono la stima incompleta.
- Nessun margine è incluso. Il buffer positivo non equivale automaticamente a utile netto.
- CTA: “Aggiungi margine, scenari e preventivo PDF nell'app”.

## Tool 5 — costi fissi e variabili

- **URL:** `/it/calcolatori/costi-fissi-variabili/`
- **Lancio:** Mese 3, P1
- **Intento:** “calcolatore costi fissi e variabili autotrasporto”
- **Guida madre:** `/it/guide/costi-fissi-variabili-autotrasporto/`

### Input

- totale costi fissi annuali `annualFixedCosts` oppure categorie sommate localmente;
- chilometri produttivi annuali stimati `annualProductiveKm`;
- consumo e prezzo carburante, oppure costo carburante/km già noto;
- usura/manutenzione per km `wearPerKm`;
- altri costi variabili per km `otherVariablePerKm`;
- facoltativi per una tratta di esempio: km, pedaggio manuale e costo autista manuale.

### Formula

```text
fixedCostPerKm = annualFixedCosts / annualProductiveKm
fuelCostPerKm = (consumptionL100 / 100) × fuelPricePerL
variableCostPerKm = fuelCostPerKm + wearPerKm + otherVariablePerKm
baseOperatingCostPerKm = fixedCostPerKm + variableCostPerKm

exampleRouteBaseCost = routeKm × baseOperatingCostPerKm
exampleRouteTotal = exampleRouteBaseCost + routeTollCost + routeDriverCost
```

### Caveat e CTA

- I chilometri produttivi sono una stima gestionale: usare i km totali o fatturabili cambia il denominatore e deve essere dichiarato.
- La classificazione contabile/fiscale può differire; il tool non sostituisce il consulente.
- CTA: “Porta la quota per km nella singola tratta RouteBudget”.

## Tool 6 — somma pedaggi del viaggio

- **URL:** `/it/calcolatori/somma-pedaggi-viaggio/`
- **Lancio:** Mese 3, P1
- **Intento:** “somma pedaggi viaggio camion”, supporto al cluster pedaggi
- **Guida madre:** `/it/guide/calcolo-pedaggio-camion/`

### Input e formula

L'utente aggiunge righe con etichetta libera non persistente (`paese/rete/tratta`) e importo verificato.

```text
outboundTolls = sum(outboundLegAmounts)
returnTolls = sum(returnLegAmounts)
totalTolls = outboundTolls + returnTolls
```

Non stimare importi con una matrice pubblica non mantenuta e non usare il termine “calcolo ufficiale”. Collegare le fonti primarie degli operatori nella guida, con data di revisione. CTA: “Aggiungi il totale pedaggi al costo completo in RouteBudget”.

## Tool 7 — stima semplice del preventivo

- **URL candidato:** `/it/calcolatori/stima-preventivo-trasporto/`
- **Lancio:** Mese 4 solo se GSC mostra intento distinto, P2
- **Intento:** “preventivo trasporto online”, “stima preventivo camion”
- **Guida madre:** `/it/guide/preventivo-trasporto/`

### Flusso e formula

1. Sommare manualmente carburante, pedaggi, autista, usura, quota fissi, ritorno e altri costi.
2. Scegliere `senza margine` oppure un margine target.
3. Mostrare una sintesi non nominale e non salvata.

```text
totalCost = sum(costComponents)
estimatedPrice = totalCost                         // no margin mode
estimatedPrice = totalCost / (1 - targetMargin)   // margin mode
estimatedProfit = estimatedPrice - totalCost
```

### Confine e decisione di pubblicazione

Il tool non chiede cliente, partita IVA, targa, origine/destinazione o altri dati personali; non genera PDF, non salva e non crea tre scenari. Se l'intento si sovrappone ai Tool 3 e 4, non pubblicare un nuovo URL: integrare un percorso “costo → prezzo” nel tool con più segnali e mantenere un solo canonical.

CTA: “Crea il preventivo professionale PDF e conserva il calcolo nell'Archivio RouteBudget”.

## Tool 8 — ritorno a vuoto

- **URL candidato:** `/it/calcolatori/ritorno-a-vuoto/`
- **Lancio:** Mese 4, solo con domanda verificata, P2
- **Guida madre:** `/it/guide/ritorno-a-vuoto-autotrasporto/`

### Input e formula

```text
returnFuelCost = (returnKm / 100) × returnConsumptionL100 × fuelPricePerL
returnDriverCost = returnOperationalHours × driverHourlyCost
returnWearCost = returnKm × wearPerKm
returnFixedAllocation = returnKm × fixedPerKm
emptyReturnCost = returnFuelCost + returnTollCost + returnDriverCost
                + returnWearCost + returnFixedAllocation

revisedBreakEvenPrice = outboundCost + emptyReturnCost
emptyKmShare = returnKm / (loadedKm + returnKm)
```

Non suggerire automaticamente di “ribaltare” tutto sul cliente: il risultato rende visibile il costo, mentre la decisione commerciale resta dell'utente. CTA: “Gestisci andata, ritorno e scenari nel calcolo completo”.

## Tool 9 — costo viaggio N1

- **URL candidato:** `/it/calcolatori/costo-viaggio-n1/`
- **Lancio:** Mese 5 dopo verifica product/normativa e domanda, P2
- **Guida madre:** `/it/guide/costo-furgone-per-km/`

### Modalità e formula

```text
fuelModeCost = (distanceKm / 100) × consumptionL100 × fuelPricePerL
energyModeCost = (distanceKm / 100) × consumptionKwh100 × energyPricePerKwh
vehicleOperatingCost = selectedEnergyCost + manualTolls + driverCost
                     + (distanceKm × wearPerKm) + allocatedFixedCost
```

Carburante ed energia sono modalità mutualmente esclusive. Peso, traino, paese e uso possono cambiare pedaggi e norme; nessun automatismo trasferisce regole dei camion pesanti a N1. CTA: “Configura il mezzo corretto nel flusso RouteBudget”.

## Tool non prioritario — tempo operativo e pause

Un calcolatore pubblico su pause e tachigrafo porta rischio di falsa conformità. Non lanciarlo nella prima roadmap. Se domanda e revisione esperta lo giustificano, limitarlo a una stima economica esplicitamente non normativa:

```text
estimatedDrivingHours = distanceKm / assumedAverageSpeedKmh
planningBreakCount = floor(estimatedDrivingHours / 4.5)
planningBreakHours = planningBreakCount × 0.75
estimatedOperationalHours = estimatedDrivingHours + planningBreakHours
estimatedDriverCost = estimatedOperationalHours × driverHourlyCost
```

La media è un input dell'utente, non un valore RouteBudget “corretto”. La regola semplificata non gestisce guida frazionata, altre attività, riposi giornalieri/settimanali, doppio equipaggio o deroghe. Prima della pubblicazione servono verifica normativa datata, fonte primaria e copy che non usi “conforme” o “certificato”.

## Contenuto indexable e condivisione

- La spiegazione, la formula, l'esempio, i caveat e i link devono essere presenti nell'HTML prerenderizzato; il risultato personale resta client-side.
- Canonical fisso sul tool senza query string. I parametri utente non generano pagine indicizzabili.
- Il pulsante “Condividi” condivide l'URL pulito del tool, non i valori inseriti. Un'eventuale copia testuale del risultato richiede azione esplicita e non include dati personali.
- Title e description descrivono una “stima con i tuoi dati”, non “costo esatto”, “tariffa ufficiale” o “guadagno garantito”.
- Dati strutturati: `WebApplication` e `BreadcrumbList` solo con proprietà verificabili; nessun rating, numero utenti o prezzo inventato. Il contenuto esplicativo resta comprensibile senza markup.

## Mobile e accessibilità

Requisiti minimi per ogni tool:

- layout a colonna singola sui telefoni, riepilogo non sticky se copre input o tastiera;
- touch target di almeno 44 × 44 px e spaziatura sufficiente tra controlli;
- `inputmode="decimal"` per importi/consumi e `inputmode="numeric"` quando ammessi solo interi, mantenendo label HTML persistenti;
- gruppi con `fieldset`/`legend` per modalità carburante/energia o andata/ritorno;
- istruzioni prima del campo, esempi dopo la label e unità programmaticamente associate;
- errori inline collegati con `aria-describedby`, focus sul primo errore dopo submit e riepilogo errori per form lunghi;
- risultato annunciato con una live region `polite` solo dopo azione esplicita; non annunciare ogni tasto premuto;
- ordine di tab logico, focus visibile, supporto tastiera completo e nessun significato affidato al solo colore;
- numeri con tabular figures, contrasto WCAG 2.2 AA, zoom al 200% senza perdita e supporto `prefers-reduced-motion`;
- pulsante di calcolo testuale e stato loading solo se esiste lavoro asincrono reale; i calcoli locali devono essere immediati;
- non bloccare copia, selezione o funzioni di password manager/autofill senza ragione.

## Privacy-conscious measurement

Il contratto unico per nomi evento, proprietà consentite e fasi di autorizzazione è [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md). In Fase 0 il segnale browser-locale `routebudget:analytics` non usa endpoint, cookie o identificatori e applica già la stessa allowlist: nessun path, referrer, input, risultato o campo libero entra nel payload. Un eventuale collector resta vietato finché non supera la revisione indicata nella mappa.

Non inviare importi, chilometri, consumi, paesi/tratte, testo libero, fingerprint o identificatori pubblicitari. I calcoli restano nel browser e lo stato viene eliminato al reset/refresh salvo decisione privacy esplicita e documentata.

## Rollout e gate

| Fase | Tool | Gate prima del rilascio |
| --- | --- | --- |
| Mese 1 | costo chilometrico; costo carburante | formule/test, QA italiano, rendering, mobile/a11y, analytics senza valori |
| Mese 2 | margine; prezzo minimo | revisione terminologica margine/ricarico; label “copertura costi”; anti-cannibalizzazione |
| Mese 3 | fissi/variabili; somma pedaggi | metodo denominatore revisionato; fonti pedaggi; nessuna tariffa automatica |
| Mese 4 | stima preventivo; ritorno a vuoto | query GSC distinta, utilità non duplicata, confine app chiaro |
| Mese 5+ | N1; eventuale tempo/pause | verifica product scope e normativa; fonti/localizzazione; domanda dimostrata |

Le versioni in inglese, tedesco, francese, polacco, romeno e arabo si creano solo per tool italiani stabili, usati e revisionati. Occorre adattare termini, separatori, unità, fonti e caveat; non basta tradurre la UI.

## Checklist di accettazione per singolo tool

- [ ] Intento e URL sono unici nella mappa keyword.
- [ ] Formula documentata, revisionata e coperta da casi nominali, zero, limite, decimali e input non validi.
- [ ] I risultati dei vettori di test coincidono su mobile e desktop.
- [ ] Nessun valore di esempio appare come risultato finché l'utente non lo carica esplicitamente.
- [ ] Caveat specifico visibile accanto al risultato.
- [ ] Nessuna funzione dell'app, store availability o condizione Pro è inventata o obsoleta.
- [ ] CTA primaria corrisponde all'intento e le due destinazioni store sono verificate.
- [ ] Formula e contenuto sono disponibili nel markup crawlable.
- [ ] Canonical, breadcrumb, metadata, sitemap e dati strutturati sono validi.
- [ ] Tastiera, screen reader, zoom, contrasto, touch e tastiera numerica mobile sono verificati.
- [ ] Analytics non ricevono input, PII o testo libero e rispettano la privacy policy.
- [ ] GSC review e data di revisione metodologica sono assegnate a un proprietario reale.
