# RouteBudget EU — Mappa di conversione SEO

Documento operativo per collegare contenuti organici, calcolatori gratuiti e download dell'app senza confondere interesse, installazione o acquisto. Mercato iniziale: Italia.

## 1. Obiettivo e confini

La conversione deve essere la continuazione naturale del compito del lettore. Ogni pagina fornisce prima una risposta autonoma e utile; la CTA propone RouteBudget soltanto quando l'app può completare il lavoro.

Tre limiti sono non negoziabili:

- un clic da Google non dimostra che la persona abbia cliccato uno store;
- un clic verso App Store o Google Play non dimostra un'installazione;
- installazioni e acquisti aggregati non vanno attribuiti a query o persone individuali senza un sistema esplicitamente progettato, approvato e dichiarato.

Non usare countdown, urgenza artificiale, pulsanti ambigui, CTA che imitano risultati o promesse di risparmio e profitto. Non esistono garanzie di conversione.

## 2. Percorso misurabile

| Passaggio | Segnale disponibile | Fonte corretta | Cosa non dimostra |
| --- | --- | --- | --- |
| Risultato Google → pagina | query, pagina, impressione, clic, CTR | Search Console, in forma aggregata | identità, installazione o ricavo |
| Arrivo → CTA contestuale | vista e clic, solo se gli eventi web sono approvati | evento web minimizzato | lettura completa o intenzione certa |
| CTA → store | clic outbound verso lo store | evento web minimizzato | visita effettiva dello store o installazione |
| Store → installazione | installazioni e conversioni secondo le definizioni della piattaforma | App Store Connect / Google Play Console | query Google o pagina individuale d'origine |
| Uso e acquisto in app | metriche aggregate disponibili negli store e nei sistemi di abbonamento già adottati | console di prodotto | identità editoriale, query o percorso web individuale |

I report possono affiancare questi segnali per leggere una tendenza, ma non devono unirli in una falsa attribuzione persona-per-persona.

## 3. Registro delle CTA

Gli ID sono stabili e indipendenti dal testo visualizzato. Il copy può essere migliorato mantenendo lo stesso intento; ogni cambiamento va registrato.

| `cta_id` | Copy italiano di partenza | Destinazione | Quando usarla |
| --- | --- | --- | --- |
| `download_app_generic` | Scarica RouteBudget | App Store e Google Play | pagine prodotto, hub e fine di una guida generale |
| `complete_trip_app` | Completa il calcolo della tratta nell'app | App Store e Google Play | dopo formula, esempio o risultato parziale |
| `add_trip_costs_app` | Aggiungi pedaggi, autista, usura e ritorno a vuoto nell'app | App Store e Google Play | calcolatori che coprono una sola voce |
| `compare_scenarios_app` | Confronta Minimo, Consigliato e Ideale nell'app | App Store e Google Play | contenuti su prezzo, pareggio e margine |
| `create_pdf_quote` | Crea un preventivo PDF nell'app | App Store e Google Play | guide su preventivo e condivisione col cliente |
| `continue_unlimited_pro` | Continua senza il limite dei 3 calcoli con RouteBudget Pro | pagina prodotto o store | solo dopo aver spiegato Free e Pro senza mostrare prezzi hardcoded |

Il PDF è un documento operativo non vincolante. “Continua senza il limite” descrive la funzione Pro; non promette accesso gratuito né un prezzo fisso. Se le funzioni cambiano, aggiornare prima questo registro e poi tutte le pagine che usano l'ID.

URL pubblici degli store:

- App Store: `https://apps.apple.com/app/id6789717191`
- Google Play: `https://play.google.com/store/apps/details?id=eu.routebudget.app`

Mostrare entrambi quando la pagina non è specifica per piattaforma. Non inoltrare automaticamente in base al dispositivo e non nascondere una scelta disponibile.

## 4. CTA per pagina e intento

| Pagina | Compito risolto dalla pagina | CTA primaria | Messaggio di continuità |
| --- | --- | --- | --- |
| `/it/guide/` | scegliere una guida pertinente | `download_app_generic` | l'app riunisce il calcolo completo |
| `/it/guide/calcolo-costo-trasporto/` | capire formula e voci della tratta | `complete_trip_app` | applica le voci al proprio viaggio |
| `/it/guide/costi-autotrasporto/` | distinguere costi e dati necessari | `complete_trip_app` | porta i dati in un calcolo di tratta |
| `/it/guide/preventivo-trasporto/` | strutturare prezzo e preventivo | `create_pdf_quote` | genera e condividi il PDF dall'app |
| `/it/calcolatori/` | scegliere uno strumento semplice | `download_app_generic` | usa l'app per il flusso completo |
| `/it/calcolatori/costo-chilometrico-camion/` | stimare una singola metrica €/km | `complete_trip_app` | completa mezzo, tempo, pedaggi e scenari |
| `/it/calcolatori/costo-carburante-viaggio/` | stimare il costo carburante da input propri | `add_trip_costs_app` | aggiungi le altre voci operative |
| `/it/confronti/` e pagine figlie | scegliere tra metodi o scenari | `compare_scenarios_app` | confronta i tre scenari nell'app |

Una nuova pagina sceglie una sola CTA primaria dal registro. Una CTA secondaria è ammessa soltanto se serve un passaggio diverso e non compete visivamente con la primaria.

## 5. Posizione e comportamento

### Guide e pillar

1. link testuali all'app possono comparire nel corpo quando spiegano una funzione;
2. una CTA contestuale può apparire dopo la prima risposta completa o l'esempio, mai prima del valore;
3. una CTA conclusiva riassume il passaggio successivo;
4. il blocco store presenta copy, due destinazioni e limiti pertinenti.

### Calcolatori

1. input, formula, ipotesi e risultato restano utilizzabili senza download;
2. la CTA primaria compare dopo il risultato;
3. errori di validazione non aprono CTA o paywall;
4. nessun risultato viene oscurato per forzare il clic;
5. il copy dice quali voci aggiunge l'app, non che la stima web è “sbagliata”.

### Interazioni vietate

- overlay all'apertura, interstitial prima della risposta o finta notifica di sistema;
- CTA ripetuta a ogni sezione o sticky che copre contenuto e controlli;
- preselezione silenziosa dello store, apertura automatica o redirect al caricamento;
- eventi che rallentano o impediscono la navigazione se la raccolta fallisce;
- varianti che nascondono limiti essenziali del prodotto.

## 6. Guardrail della verità di prodotto

CTA, microcopy e pagine di destinazione devono dire coerentemente che:

- RouteBudget produce stime operative, non tariffe ufficiali, risultati esatti o profitto garantito;
- carburante o energia sono dati inseriti dall'utente, non prezzi live;
- pedaggi e distanza richiedono verifica; non sono navigazione truck o traffico in tempo reale;
- Free comprende tre calcoli; Pro offre calcoli illimitati e logo aziendale nei PDF;
- i prezzi sono quelli mostrati dallo store al momento dell'acquisto;
- Trip Tracking è disponibile soltanto su iOS; Android non offre Trip Tracking, Maps o GPS del dispositivo;
- calcoli e Archivio sono locali, mentre distanza online e abbonamenti richiedono rete;
- il preventivo PDF è una stima condivisibile e non un'offerta legalmente vincolante.

Non usare numeri di clienti, recensioni, risparmi, installazioni, conversion rate o risultati economici senza una fonte reale, corrente e pubblicabile.

## 7. Tassonomia eventi proposta

Questa è una specifica, non un'autorizzazione a installare analytics. Finché la revisione privacy del sito non è conclusa, la fase predefinita è Search Console senza tracker web.

Questa sezione è l'unico contratto canonico per eventi trasmessi. I segnali browser-locali `routebudget:analytics` dell'implementazione corrente non sono eventi di rete e possono usare nomi o campi diversi. Non devono essere inoltrati così come sono: un collector futuro, approvato separatamente, deve mapparli alla allowlist seguente, sostituire qualsiasi path con `content_id` e scartare proprietà libere.

| Evento | Quando scatta | Proprietà ammesse | Note |
| --- | --- | --- | --- |
| `content_landing_view` | una volta per caricamento della pagina editoriale | base + `source_class` | classificare la sorgente e scartare il referrer grezzo |
| `language_select` | scelta esplicita di una lingua | base + `target_locale` | non usare come identificatore persistente |
| `cta_click` | attivazione di una CTA interna o non-store | base + CTA | non duplicare un clic store |
| `store_outbound_click` | attivazione del link App Store o Google Play | base + CTA + destinazione | misura soltanto il clic in uscita |
| `calculator_start` | prima interazione valida con il tool | base + calcolatore | una volta per caricamento; nessun valore input |
| `calculator_complete` | primo risultato valido mostrato | base + calcolatore | una volta per sessione del form; “Ricomincia” apre una nuova sessione; nessun risultato, costo o classe di importo |
| `calculator_validation_error` | errore mostrato dopo un tentativo | base + calcolatore + `error_code` | codice enumerato, mai testo o valore inserito |
| `pdf_sample_preview` | apertura esplicita dell’anteprima del PDF dimostrativo | base + `asset_id` + posizione | soltanto per asset dimostrativi allowlisted; mai per un PDF utente |
| `pdf_sample_download` | download esplicito del PDF dimostrativo | base + `asset_id` + posizione | misura il download del campione, non la creazione di un preventivo nell’app |

### Proprietà base e valori controllati

| Proprietà | Valori ammessi |
| --- | --- |
| `schema_version` | versione intera della tassonomia; versione corrente `2` |
| `locale` | codice supportato, inizialmente `it` |
| `content_id` | ID editoriale stabile, non URL completa |
| `page_type` | `landing`, `hub`, `pillar`, `guide`, `calculator`, `comparison`, `product`, `legal` |
| `source_class` | `organic_search`, `direct`, `referral`, `unknown` |
| `cta_id` | uno degli ID del registro CTA |
| `cta_position` | `inline`, `after_result`, `end`, `header`, `footer` |
| `destination` | `internal`, `app_store`, `google_play` |
| `calculator_id` | `cost-per-km`, `fuel-trip`, `fuel-surcharge`, `driving-time`, `minimum-price-margin`, `electric-van-charge-cost` |
| `asset_id` | `preventivo-pdf-sample` |
| `target_locale` | codice lingua supportato |
| `error_code` | enum tecnico documentato, per esempio `required`, `out_of_range`, `invalid_format` |

Non aggiungere proprietà libere. Ogni nuovo campo richiede un caso d'uso, un elenco di valori, revisione privacy e aggiornamento della versione dello schema.

### Dati che non devono mai entrare negli eventi

- URL completa, parametri, query di ricerca o referrer completo;
- indirizzo IP conservato, user agent completo, ID utente, email o fingerprint;
- origine, destinazione, coordinate, targa, veicolo o identificativi del conducente;
- prezzo carburante/energia, consumo, salario, pedaggio, margine o ritorno a vuoto;
- input, risultato, costo totale, prezzo suggerito o contenuto del PDF;
- testo libero, campi di supporto o valori digitati nei calcolatori.

Gli eventi dei calcolatori descrivono lo stato dell'interazione, mai la situazione economica del lettore.

## 8. Fasi privacy e infrastruttura

### Fase 0 — predefinita

- usare Search Console per domanda organica, clic, impressioni e CTR;
- usare dati aggregati delle console store per installazioni e acquisti;
- non caricare tracker, cookie, pixel o storage del sito;
- non tentare di attribuire una query a un'installazione.

### Fase 1 — eventi minimizzati, solo dopo approvazione

Prerequisiti:

1. responsabile e finalità documentati;
2. base giuridica, necessità di consenso e gestione delle preferenze valutate per i mercati serviti;
3. informativa dedicata al sito pubblicata prima della raccolta;
4. endpoint, fornitore, data location, accessi, retention e cancellazione approvati;
5. payload testato contro questa allowlist e privato dei dati vietati;
6. navigazione funzionante anche con JavaScript o raccolta bloccati.

GitHub Pages è hosting statico e non costituisce da solo un endpoint first-party per ricevere eventi, anche quando pubblicato su `routebudget.eu`. Se non esiste un endpoint controllato o un fornitore sottoposto a revisione privacy e contrattuale, restare alla Fase 0. Non aggiungere un tracker di terze parti per colmare il vuoto.

### Fase 2 — visita di ritorno, rinviata

`returning_visit` è **fuori dallo schema attivo**. Potrà essere valutato soltanto se serve una decisione editoriale reale e se storage, consenso, durata e informativa sono stati approvati. Anche in quel caso usare al massimo un flag locale breve, non un identificatore unico e non una cronologia di navigazione.

La Privacy e i Termini pubblici correnti descrivono l'app. Non devono essere interpretati come consenso o informativa sufficiente per analytics del sito. Qualunque raccolta web richiede una verifica separata prima del deploy.

## 9. Regole di implementazione

- Implementare una funzione tipizzata unica che accetta solo eventi e proprietà dell'allowlist.
- Validare a runtime evento, proprietà e valori enumerati; scartare ciò che non corrisponde.
- Generare `content_id` e `calculator_id` dall'inventario editoriale, non dal contenuto dell'utente.
- Derivare `source_class` nel browser, inviare solo la classe e scartare immediatamente il referrer completo.
- Inviare `store_outbound_click` una sola volta per attivazione e non anche `cta_click`.
- Emettere `calculator_complete` al primo risultato valido; non duplicarlo se l’utente ricalcola nello stesso form senza usare “Ricomincia”.
- Collegare gli eventi PDF solo a controlli espliciti con `data-analytics-event` e `asset_id` allowlisted; nessuna inferenza automatica da URL o estensione file.
- Non bloccare `href`, apertura in nuova scheda o navigazione se il trasporto dell'evento fallisce.
- Evitare identificatori persistenti e deduplicazione tra dispositivi.
- Limitare accesso e conservazione al minimo approvato; non riutilizzare eventi per pubblicità, profilazione o vendita.
- Versionare la tassonomia e mantenere un changelog con data, motivo e revisore privacy.

## 10. Report consentiti

Se la Fase 1 è attiva, sono utili soltanto aggregazioni sufficientemente ampie:

| Domanda | Calcolo | Lettura corretta |
| --- | --- | --- |
| Quali pagine portano a un passo prodotto? | `store_outbound_click / content_landing_view` per pagina e periodo | tasso di clic outbound, non installazione |
| Quale CTA è più coerente con l'intento? | clic per `cta_id` e `cta_position` tra pagine simili | segnale di interesse, non prova causale |
| Il calcolatore viene completato? | `calculator_complete / calculator_start` per tool | usabilità del tool; non qualità del risultato |
| Quale store viene scelto? | clic per `destination` | scelta del link, non quota utenti o installazioni |
| Quale cluster genera domanda? | Search Console per pagina/cluster, affiancato ai clic outbound aggregati | lettura di tendenza senza unione individuale |

Non costruire report per persona, sequenze individuali, cohort fingerprinted o join tra query, sessione web, store e abbonamento. Se i volumi sono piccoli, allargare periodo o livello di aggregazione; non esporre righe che rendono riconoscibile un individuo.

## 11. Esperimenti di conversione

Ogni test deve avere:

```text
Data e responsabile:
Pagine incluse:
Intento del lettore:
Ipotesi:
Una sola variabile principale:
Evento e denominatore:
Periodo di osservazione:
Rischio per chiarezza, accessibilità e privacy:
Esito: mantenere | annullare | inconcludente
```

Testare prima chiarezza del copy, pertinenza della funzione e posizione dopo il valore. Non dichiarare un vincitore con volume insufficiente, non fermare un test quando appare un risultato favorevole e non ottimizzare clic ottenuti nascondendo limiti o rendendo la risposta gratuita meno utile.

## 12. Checklist di rilascio e QA

### CTA

- [ ] L'ID appartiene al registro e l'intento corrisponde alla pagina.
- [ ] La risposta utile o il risultato precede la CTA.
- [ ] App Store e Google Play aprono gli URL pubblici corretti, anche in nuova scheda.
- [ ] Il copy non promette esattezza, risparmio, ranking, installazione o profitto.
- [ ] Limiti di piattaforma e rete rilevanti sono visibili.
- [ ] La navigazione funziona con JavaScript disabilitato o raccolta bloccata.

### Eventi, soltanto se approvati

- [ ] Informativa sito, preferenze e configurazione corrispondono alla decisione privacy.
- [ ] Ogni interazione emette al massimo l'evento previsto; i clic store non sono duplicati.
- [ ] Payload e log non contengono valori digitati, risultati, URL o referrer grezzi.
- [ ] Input validi, errori, refresh, back/forward e nuova scheda sono testati.
- [ ] Errori di rete non bloccano il lettore e non producono retry invasivi.
- [ ] Tastiera, screen reader, mobile e riduzione del movimento restano funzionanti.
- [ ] Dashboard e alert usano aggregazioni, non identità.

## 13. Responsabilità e revisione

Il responsabile editoriale possiede copy e mappa pagina→CTA. Il responsabile prodotto approva ogni affermazione sull'app. Il responsabile tecnico mantiene link e schema. Il responsabile privacy autorizza ogni passaggio oltre la Fase 0.

Rivedere questo documento quando cambiano funzioni, limiti Free/Pro, URL degli store, architettura del sito, fornitore di misurazione o informativa. La routine query/pagina e i confini delle metriche Search Console sono definiti in [SEARCH_CONSOLE_OPERATIONS.md](./SEARCH_CONSOLE_OPERATIONS.md); il controllo editoriale è in [SEO_EDITORIAL_WORKFLOW.md](./SEO_EDITORIAL_WORKFLOW.md).
