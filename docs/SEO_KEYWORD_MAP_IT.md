# RouteBudget EU — mappa keyword italiana

Aggiornamento: 11 agosto 2026. Baseline decisionale: [GSC 1–9 agosto 2026](./GSC_BASELINE_2026-08-11.md), 7 clic, 542 impressioni, CTR 1,3%, posizione media 16,8.

## Come usare questa mappa

Questa è una mappa di intenti e URL, non una previsione di traffico. Non contiene volumi, difficoltà o promesse di ranking inventati. Prima di cambiare priorità, usare query reali da Google Search Console, domande di supporto e — se disponibile — una fonte di keyword research con data e mercato documentati.

Ogni query primaria appartiene a un solo URL. Le varianti semantiche sono termini di supporto, non il motivo per creare pagine quasi duplicate. Se GSC mostra che due URL competono per lo stesso intento, scegliere il contenuto più completo, fondere ciò che serve e applicare un redirect canonico.

### Tassonomia URL vincolante

- homepage prodotto: `/`
- guide e pillar italiani: `/it/guide/{slug}/`
- strumenti italiani: `/it/calcolatori/{slug}/`
- confronti decisionali: `/it/confronti/{slug}/`

Le lingue future replicano la struttura sotto il proprio codice lingua solo dopo validazione della pagina italiana e revisione locale.

### Legenda

- Intento: `I` informativo, `T` transazionale/tool, `C` commerciale, `N` navigazionale/branded.
- Funnel: `Scoperta`, `Valutazione`, `Decisione`, `Adozione`.
- Priorità: `P0` fondazione Mese 1, `P1` estensione Mesi 2–3, `P2` subordinata a dati GSC/Mesi 4–6.
- Stato: `esistente` indica contenuto già pubblicato; `generato` indica contenuto validato nel build corrente ma ancora da verificare dopo deploy; `pianificato` non significa pubblicato o indicizzato.

## Mappa URL primaria

| Tema/query primaria | Intento | Funnel | Tipo pagina | URL primario | Termini e domande di supporto | CTA principale | Stato / priorità |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RouteBudget EU | N/C | Adozione | landing prodotto | `/` | RouteBudget app; RouteBudget camion; app RouteBudget; scarica RouteBudget | Scarica RouteBudget su App Store o Google Play | esistente / P0 |
| app calcolo costi camion | C/T | Decisione | landing prodotto | `/` | app costo viaggio camion; app preventivo autotrasporto; software calcolo tratta camion | Calcola la tratta completa nell'app | esistente, ottimizzare / P0 |
| calcolo costo trasporto | I/C | Valutazione | pillar | `/it/guide/calcolo-costo-trasporto/` | come calcolare costo trasporto; costo tratta camion; formula costo trasporto; calcolo viaggio camion | Porta tutti i costi nel calcolo completo RouteBudget | esistente / P0 |
| costi autotrasporto | I | Scoperta | pillar | `/it/guide/costi-autotrasporto/` | costi impresa autotrasporto; voci di costo camion; costo esercizio camion; costi per tratta | Usa RouteBudget per attribuire i costi alla tratta | esistente / P0 |
| preventivo trasporto | I/C | Valutazione | pillar | `/it/guide/preventivo-trasporto/` | come fare preventivo trasporto merci; voci preventivo autotrasporto; prezzo tratta camion | Crea un preventivo PDF nell'app | esistente / P0 |
| calcolatore costo chilometrico camion | T | Decisione | calcolatore | `/it/calcolatori/costo-chilometrico-camion/` | calcolo costo camion al km; costo chilometrico autotrasporto; costo per chilometro camion; costo km bilico | Ottieni scenari e preventivo completi in RouteBudget | esistente; 82 impressioni e 3 clic GSC / P0 |
| calcolatore costo carburante viaggio | T | Valutazione | calcolatore | `/it/calcolatori/costo-carburante-viaggio/` | calcolo gasolio camion; consumo camion per tratta; litri per 100 km; costo diesel viaggio | Aggiungi pedaggi, autista e usura nell'app | esistente; 169 impressioni GSC / P0 |
| quanto consuma un camion | I | Scoperta | guida | `/it/guide/quanto-consuma-un-camion/` | consumo medio camion; consumo camion l/100 km; calcolo consumo gasolio camion; fattori consumo camion | Calcola litri e costo con i dati del mezzo | generato 11 agosto 2026; query GSC distinta / P0 |
| calcolare carburante, pedaggi e autista | I | Valutazione | guida | `/it/guide/calcolare-carburante-pedaggi-autista/` | formula carburante; pedaggi inseriti; costo orario autista; costo operativo tratta | Riunisci tutte le voci nel calcolo RouteBudget | esistente / P0 |
| costi fissi e variabili autotrasporto | I | Scoperta | guida | `/it/guide/costi-fissi-variabili-autotrasporto/` | differenza costi fissi variabili; ammortamento camion; assicurazione e bollo; costi diretti viaggio | Trasforma i costi aziendali in una quota per tratta | esistente / P0 |
| costo chilometrico camion | I | Valutazione | guida | `/it/guide/costo-chilometrico-camion/` | come calcolare costo al km; km percorsi e fatturabili; ritorno a vuoto; componenti costo/km | Applica il metodo nel calcolatore costo chilometrico | esistente / P0 |
| errori calcolo tariffa trasporto | I | Scoperta | guida | `/it/guide/errori-calcolo-tariffa-trasporto/` | costi dimenticati preventivo; tariffa troppo bassa; errori prezzo per km; pedaggi esclusi | Controlla tutte le voci con RouteBudget | esistente / P0 |
| proteggere margine della tratta | I/C | Decisione | guida | `/it/guide/proteggere-margine-tratta/` | margine eroso; ritorno a vuoto; costi non inclusi; verifica prezzo tratta | Verifica costo e scenari prima di accettare | esistente / P0 |
| costo autista viaggio | I | Valutazione | guida candidata | `/it/guide/costo-autista-viaggio/` | costo orario autista; ore operative; pause e costo autista; costo conducente per tratta | Includi tempo operativo e pause in RouteBudget | backlog M3, solo intento distinto / P1 |
| usura e manutenzione camion | I | Scoperta | guida candidata | `/it/guide/usura-manutenzione-camion/` | costo usura camion km; manutenzione per chilometro; pneumatici e manutenzione; quota usura tratta | Inserisci la tua quota per km nel calcolo completo | backlog M3, solo intento distinto / P1 |
| margine trasporto vs ricarico | I | Valutazione | guida | `/it/guide/margine-trasporto-vs-ricarico/` | differenza margine markup; formula margine preventivo; ricarico su costo trasporto | Confronta gli scenari di prezzo nell'app | pianificato M2 / P1 |
| preventivo trasporto PDF | C/I | Decisione | guida | `/it/guide/preventivo-trasporto-pdf/` | modello preventivo trasporto; preventivo professionale autotrasporto; dettaglio costi PDF | Crea il preventivo PDF con RouteBudget | pianificato M2 / P1 |
| calcolatore margine trasporto | T | Decisione | calcolatore | `/it/calcolatori/margine-trasporto/` | calcolo margine viaggio; margine sul prezzo; utile tratta; prezzo con margine | Valuta Minimo, Consigliato e Ideale in RouteBudget | pianificato M2 / P1 |
| prezzo minimo tratta camion | T/C | Decisione | calcolatore | `/it/calcolatori/prezzo-minimo-tratta/` | tariffa minima camion; prezzo minimo viaggio; break-even tratta; costo da coprire | Calcola la tratta completa prima di accettarla | pianificato M2 / P1 |
| stima preventivo trasporto online | T/C | Decisione | calcolatore candidato | `/it/calcolatori/stima-preventivo-trasporto/` | simulazione preventivo camion; preventivo autotrasporto online; costo e margine preventivo | Crea il PDF e conserva il calcolo nell'Archivio RouteBudget | backlog, solo intento distinto in GSC / P2 |
| prezzo minimo consigliato ideale | I/C | Valutazione | guida | `/it/guide/prezzo-minimo-consigliato-ideale/` | scenari prezzo trasporto; prezzo di pareggio; prezzo target; fascia preventivo | Confronta i tre scenari nell'app | pianificato M2 / P1 |
| ritorno a vuoto costo | I | Valutazione | guida | `/it/guide/costo-ritorno-a-vuoto/` | chilometri a vuoto; costo rientro vuoto; come ribaltare il ritorno sul prezzo; empty running | Includi il ritorno a vuoto nel calcolo app | pianificato M2 / P1 |
| punto di pareggio trasporto | I | Valutazione | guida | `/it/guide/punto-pareggio-trasporto/` | break-even viaggio camion; prezzo che copre i costi; utile zero tratta; soglia minima | Visualizza il prezzo minimo in RouteBudget | pianificato M2 / P1 |
| tariffa trasporto merci | C/I | Valutazione | guida decisionale | `/it/guide/tariffa-trasporto-merci/` | come stabilire tariffa trasporto; prezzo trasporto merci su strada; tariffa camion km; prezzo tratta | Crea una tariffa basata sui tuoi costi | pianificato M2, dopo query review / P1 |
| prezzo tratta camion | C/T | Decisione | guida decisionale | `/it/guide/prezzo-tratta-camion/` | quanto chiedere per una tratta; prezzo viaggio camion; costo percorso camion; quotazione trasporto | Calcola il prezzo della tratta completa nell'app | pianificato M2, se distinto da “tariffa” / P1 |
| calcolo pedaggio camion | I/T | Valutazione | guida | `/it/guide/calcolo-pedaggio-camion/` | calcolo del pedaggio per camion; classe pedaggio camion; numero assi; chilometri tariffari; concessionario | Inserisci il pedaggio verificato nel costo della tratta | generato 11 agosto 2026; query GSC distinta / P1 |
| durata operativa viaggio camion | I | Valutazione | pillar/guida | `/it/guide/durata-operativa-viaggio-camion/` | ore guida e pause; tempo viaggio camion; costo tempo tratta; orario operativo | Includi tempo e pause nel costo autista | pianificato M3 / P1 |
| pausa 4 ore e mezza 45 minuti | I | Scoperta | guida con caveat normativo | `/it/guide/pausa-guida-4-5-ore/` | pausa tachigrafo 45 minuti; tempo guida continuativa; Regolamento 561/2006; calcolo pause camion | Pianifica un costo operativo prudente nell'app | pianificato M3 / P1 |
| calcolatore costi fissi e variabili | T | Valutazione | calcolatore | `/it/calcolatori/costi-fissi-variabili/` | quota costi fissi per km; costi annuali camion; km produttivi; costo base tratta | Usa il valore per km nel calcolo RouteBudget | pianificato M3 / P1 |
| somma pedaggi viaggio camion | T | Decisione | worksheet/calcolatore | `/it/calcolatori/somma-pedaggi-viaggio/` | foglio pedaggi tratta; pedaggi per paese; totale pedaggi manuale; verifica importi | Completa carburante, autista e margine nell'app | pianificato M3 / P1 |
| guadagno autotrasportatore per viaggio | I | Valutazione | guida | `/it/guide/utile-viaggio-autotrasporto/` | utile netto tratta; ricavo meno costi; profitto viaggio camion; margine operativo tratta | Confronta costo, prezzo e utile senza promesse | pianificato M4 solo con evidenza GSC / P2 |
| calcolatore ritorno a vuoto | T | Decisione | calcolatore | `/it/calcolatori/ritorno-a-vuoto/` | costo km a vuoto; prezzo con rientro; chilometri non fatturati; costo rientro camion | Gestisci andata e ritorno nel calcolo completo | pianificato M4 solo con evidenza / P2 |
| costo furgone per km | I/C | Valutazione | guida N1 | `/it/guide/costo-furgone-per-km/` | costo chilometrico furgone Ducato; calcolo costi chilometrici furgoni; veicolo commerciale leggero; km fatturabili | Usa dati e costi del veicolo N1, separati dal camion | generato 11 agosto 2026; due query long-tail GSC / P1 |
| calcolatore costo viaggio furgone N1 | T | Decisione | calcolatore N1 | `/it/calcolatori/costo-viaggio-n1/` | calcolo furgone elettrico; costo energia kWh; costo viaggio van; veicolo leggero ≤3,5 t | Calcola il flusso N1 completo nell'app | pianificato M5, verifica scope / P2 |
| camion vs furgone N1 costi | C/I | Valutazione | confronto | `/it/confronti/costi-camion-vs-n1/` | differenze costo viaggio; pedaggi camion e N1; consumo e manutenzione; applicabilità regole | Scegli la configurazione mezzo appropriata nell'app | backlog, solo domanda verificata / P2 |

## Regole di cannibalizzazione per i temi più vicini

| Coppia o gruppo | Confine editoriale |
| --- | --- |
| `calcolo-costo-trasporto` vs `costo-chilometrico-camion` | Il pillar spiega il metodo completo e le decisioni; il tool esegue un calcolo semplificato. Il tool non diventa una seconda guida generale. |
| `quanto-consuma-un-camion` vs calcolatore carburante | La guida risponde a consumo, misurazione e fattori; il calcolatore trasforma distanza, l/100 km e prezzo inseriti in litri e costo. |
| `costi-autotrasporto` vs `costi-fissi-variabili-autotrasporto` | Il pillar presenta l'intero modello di costo; la guida approfondisce classificazione e attribuzione dei costi aziendali. |
| `preventivo-trasporto` vs `preventivo-trasporto-pdf` | Il pillar copre dal costo al prezzo e alla proposta; il supporto copre struttura, contenuto e presentazione del documento PDF. |
| `tariffa-trasporto-merci` vs `prezzo-tratta-camion` | “Tariffa” tratta il metodo commerciale; “prezzo tratta” risponde a una decisione specifica con checklist. Pubblicare il secondo solo se query e outline risultano distinti. |
| `margine-trasporto` vs `prezzo-minimo-tratta` | Il primo parte da costo e margine target; il secondo determina la soglia di copertura costi. Nessuno dei due promette una tariffa di mercato. |
| `calcolo-pedaggio-camion` vs costi diretti vs futuro worksheet | La guida pedaggio possiede classe, assi, km tariffari e concessionari; la guida costi diretti integra il valore nella tratta; un eventuale worksheet potrà solo sommare importi inseriti e verificati. |
| `durata-operativa` vs `pausa-guida-4-5-ore` | Il pillar collega tempo e costo; la guida normativa è limitata alla pianificazione indicativa e rimanda alle fonti ufficiali. |
| camion pesante vs N1 | URL, formule, esempi e disclaimer separati. Non riutilizzare automaticamente regole, pedaggi o pause tra classi di veicolo. |

## Termini da non presidiare con pagine fuorvianti

Non creare pagine progettate per “pedaggio camion esatto”, “tariffe ufficiali universali”, “prezzo gasolio in tempo reale”, “navigatore camion RouteBudget”, “guadagno garantito”, “tariffa minima legale garantita” o “conformità tachigrafo automatica”. Se tali query compaiono in GSC, chiarire il limite nella pagina pertinente invece di promettere la funzione cercata.

## Protocollo di aggiornamento con Search Console

1. Esportare per ogni URL query, impressioni, clic, CTR, posizione media, dispositivo e paese su finestre comparabili.
2. Etichettare le query `branded`, `non-branded pertinente`, `non pertinente` senza alterare retroattivamente la regola.
3. Aggiungere come termine di supporto una query solo se la pagina può soddisfarla senza cambiare intento.
4. Se la query richiede un nuovo lavoro distinto, preparare un brief e verificare sovrapposizioni prima di assegnare un URL.
5. Aggiornare stato e priorità della mappa con data, motivazione e proprietario; non cambiare title ogni settimana per rumore statistico.
6. Dopo una modifica sostanziale, annotare la data e osservare una finestra adeguata prima di attribuire l'effetto.
