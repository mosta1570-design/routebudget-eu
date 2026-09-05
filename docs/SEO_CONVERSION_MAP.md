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
| Segnale ChatGPT → pagina | classe `chatgpt` della pagina corrente | evento locale; collector GA4 separato solo con consenso | referral autenticato, totale degli arrivi AI o installazione |
| Arrivo → CTA contestuale | viste e clic dei visitatori consenzienti | eventi minimizzati in GA4 | tutti i visitatori, lettura completa o intenzione certa |
| CTA → store | clic outbound dei visitatori consenzienti | evento `store_outbound_click` in GA4 | visita effettiva dello store o installazione |
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

## 7. Tassonomia eventi e collector GA4 approvato

Il 5 settembre 2026 il titolare ha approvato Google Analytics 4 per il sito, esclusivamente dopo l'opt-in del visitatore e con pubblicità disabilitata, accettando l'uso di cookie e identificatori pseudonimi di visita/sessione. Questa decisione sostituisce il precedente divieto assoluto di tracker soltanto per il collector GA4 descritto qui. Non autorizza analytics nell'app, altri fornitori o modifiche alla proprietà Corvian. Configurazione e prerequisiti di attivazione sono in [GA4_WEBSITE_SETUP.md](./GA4_WEBSITE_SETUP.md).

Questa sezione resta il contratto canonico per i parametri degli eventi custom. I segnali browser-locali `routebudget:analytics` non sono eventi di rete. Il collector separato deve validarli nuovamente, mapparli alla allowlist, usare `content_id` controllati e scartare proprietà libere. Non inoltrare indiscriminatamente il contenuto di un `CustomEvent`.

L'emitter locale mantiene `schema_version: 3` e rimane puro, effimero e senza richieste di rete. `source_class` resta esclusivamente su `content_landing_view`. L'autorizzazione e il trasporto GA4 sono separati da questa versione locale: un'emissione locale non è prova che Google abbia ricevuto l'evento.

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
| `schema_version` | versione intera della tassonomia custom; versione locale corrente `3` |
| `locale` | codice supportato: `it`, `en` |
| `content_id` | ID editoriale stabile, non URL completa |
| `page_type` | `landing`, `hub`, `pillar`, `guide`, `calculator`, `comparison`, `product`, `legal` |
| `source_class` | `chatgpt`, `organic_search`, `direct`, `referral`, `unknown` |
| `cta_id` | uno degli ID del registro CTA |
| `cta_position` | `inline`, `after_result`, `end`, `header`, `footer` |
| `destination` | `internal`, `app_store`, `google_play` |
| `calculator_id` | `cost-per-km`, `fuel-trip`, `fuel-surcharge`, `driving-time`, `minimum-price-margin`, `electric-van-charge-cost` |
| `asset_id` | `preventivo-pdf-sample` |
| `target_locale` | codice lingua supportato |
| `error_code` | enum tecnico documentato, per esempio `required`, `out_of_range`, `invalid_format` |

Non aggiungere proprietà libere. Ogni nuovo campo richiede un caso d'uso, un elenco di valori, revisione privacy e aggiornamento della versione dello schema.

### Classificazione sorgente locale — versione 3

La classificazione locale viene calcolata una volta al caricamento del documento senza conservare il referrer grezzo o la query. L'emitter non li inoltra; il collector può trasmettere soltanto i metadati sanitizzati della sezione successiva e soltanto dopo consenso. Si applicano queste regole, in ordine:

1. Un referrer HTTP/HTTPS valido con lo stesso hostname della pagina mantiene la classe storica `direct`; un eventuale UTM viene ignorato. È navigazione interna, **non** prova di acquisizione diretta.
2. Un referrer HTTP/HTTPS con host esatto `chatgpt.com`, `www.chatgpt.com` o `chat.openai.com` dà `chatgpt`. Sono ammesse soltanto le porte standard del protocollo; credenziali, referrer malformati, schemi non web, sottodomini arbitrari e host somiglianti non sono accettati come referrer ChatGPT.
3. In assenza di navigazione interna, un solo parametro `utm_source` con valore decodificato esattamente `chatgpt.com` dà `chatgpt`, anche senza referrer riconoscibile. Chiave e valore distinguono maiuscole/minuscole; duplicati, valori abbreviati, URL al posto del valore ed encoding malformato non danno questo segnale. Frammenti e altri parametri non sono fonti di classificazione. [OpenAI documenta questo UTM nei link di referral](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq), ma chiunque può copiarlo o modificarlo: **non autentica** un arrivo da ChatGPT. Se il tag valido coesiste con un referrer esterno diverso, prevale il tag; la singola classe non distingue le due evidenze.
4. Gli host di ricerca sono confrontati con la allowlist esatta e limitata in `public/seo/events.js`: Google e domini europei comuni, Bing, DuckDuckGo e Yahoo, inclusi alcuni host nazionali di ricerca. Non è una lista globale esaustiva. Host come `google.evil.com` e `google.it.evil.example` restano `referral`, non `organic_search`.
5. Senza referrer web valido né tag ChatGPT valido, la classe è `unknown`, non `direct`. Un altro referrer web valido dà `referral`.

Il referrer può essere assente per privacy del browser, app, link copiati o policy del sito sorgente: `unknown` non significa accesso diretto e `chatgpt` non misura tutti gli arrivi AI. Nessun UTM viene aggiunto o propagato ai link. Il sito non salva `source_class` in cookie o storage e non la copia su cambi di lingua, risultati o clic store. Dopo consenso GA4 può correlare i propri eventi tramite identificatori di visita/sessione e applicare le sue definizioni di acquisizione: ciò non autentica il segnale ChatGPT né attribuisce installazioni o acquisti. La preferenza lingua funzionale resta separata. Non esiste recupero retroattivo dei visitatori precedenti all'attivazione o delle interazioni avvenute prima del consenso.

### Metadati GA4 ammessi soltanto dopo consenso

Oltre ai parametri custom, il tag Google può trattare i propri identificatori pseudonimi client/sessione, tempi, conteggi e dati automatici di visita e interazione, inclusi `first_visit`, `session_start` e `user_engagement`. Non descrivere quindi GA4 come anonimo o limitato ai soli eventi custom. Sono autorizzati i seguenti metadati controllati:

- `page_location`: URL canonica pubblica sul dominio del sito, da inventario di pagine note, senza query, frammenti o credenziali;
- `page_referrer`: soltanto origine HTTP/HTTPS valida del sito sorgente, senza percorso, query, frammenti o credenziali; stringa vuota quando assente o non valida;
- `page_title`: ID pubblico controllato del contenuto; mai titolo arbitrario del browser o testo digitato dal lettore;
- cookie GA4 `_ga` e `_ga_*`: durata massima configurata di 180 giorni, senza rinnovo a ogni attività;
- informazioni tecniche standard del servizio, con Google Signals e raccolta granulare di posizione/dispositivo disabilitati nella proprietà RouteBudget.

Il browser comunica a Google anche dati tecnici della connessione. Le impostazioni di minimizzazione non sono una promessa che il fornitore non riceva mai un indirizzo IP o intestazioni HTTP. Per dettagli su trattamento e trasferimenti consultare l'informativa sito e le fonti del documento di setup.

### Dati che non devono entrare nei parametri custom

- URL o referrer grezzi, query di ricerca, UTM liberi o altri parametri della URL;
- indirizzo IP, user agent completo, `user_id` impostato dal sito, email o fingerprint creato dal sito;
- origine, destinazione, coordinate, targa, veicolo o identificativi del conducente;
- prezzo carburante/energia, consumo, salario, pedaggio, margine o ritorno a vuoto;
- input, risultato, costo totale, prezzo suggerito o contenuto del PDF;
- testo libero, campi di supporto o valori digitati nei calcolatori.

Gli eventi dei calcolatori descrivono lo stato dell'interazione, mai la situazione economica del lettore.

## 8. Fasi privacy e infrastruttura

### Fase 0 — stato prima del consenso, dopo rifiuto o configurazione incompleta

- usare Search Console per domanda organica, clic, impressioni e CTR;
- usare dati aggregati delle console store per installazioni e acquisti;
- non caricare il tag Google, pixel, preconnect o richieste analytics; nessun ping senza cookie;
- la scelta funzionale di consenso/rifiuto può essere conservata per 185 giorni con versione e data, senza identificatore univoco; la preferenza lingua resta separata;
- i `CustomEvent` browser-locali restano effimeri e non vengono trasmessi;
- non tentare di attribuire una query a un'installazione.

### Fase 1 — GA4 dopo opt-in esplicito

Prerequisiti prima di abilitare il collector:

1. titolare e finalità documentati; informativa sito bilingue pubblicata, distinta da quella dell'app;
2. proprietà RouteBudget separata nell'account esistente `Default Account for Firebase`; nessuna modifica a Corvian o ad altre proprietà;
3. accesso autorizzato, termini applicabili e dati contrattuali verificati dal titolare, senza inventare paese o ragione sociale;
4. scelta esplicita Accetta/Rifiuta nel normale flusso della pagina, comandi di pari accessibilità e controllo nel footer per riaprire le preferenze; nessun consenso da scorrimento o semplice navigazione;
5. Basic consent: tag bloccato fino all'opt-in; solo `analytics_storage` può diventare `granted`, tutti i consensi pubblicitari restano `denied`;
6. Enhanced Measurement OFF e `send_page_view:false`, con una sola vista controllata dopo consenso; Google Signals, pubblicità, integrazioni Ads e raccolta granulare disabilitati nella proprietà;
7. conservazione eventi/utenti di 2 mesi con reset per nuova attività OFF; i report standard aggregati non sono limitati da questa impostazione;
8. payload minimizzato e navigazione verificata anche con JavaScript o raccolta bloccati.

GitHub Pages resta hosting statico: il collector approvato invia gli eventi al servizio GA4, non a un endpoint first-party del sito. Se manca l'ID reale della proprietà, la configurazione privacy verificata o il consenso del visitatore, restare in Fase 0. Non aggiungere altri fornitori o una raccolta di fallback.

### Revoca e confini successivi

Alla revoca, memorizzare il rifiuto, impostare subito `ga-disable` per l'ID RouteBudget, fermare il collector, cancellare soltanto i cookie GA di questo sito e ricaricare la pagina nello stato bloccato. Conservare lingua e altri dati funzionali. Verificare anche revoca durante il caricamento asincrono del tag. La revoca interrompe la raccolta futura, non cancella automaticamente dati già ricevuti da Google.

`returning_visit` rimane fuori dalla tassonomia custom. Gli identificatori standard GA4 sono ora approvati soltanto per la misurazione web consenziente; non aggiungere flag di ritorno, altri ID, fingerprint o deduplicazione tra dispositivi. Le sezioni dell'informativa dedicate all'app non autorizzano la raccolta web e restano distinte dalla nuova sezione sito.

## 9. Regole di implementazione

- Implementare una funzione tipizzata unica che accetta solo eventi e proprietà dell'allowlist.
- Validare a runtime evento, proprietà e valori enumerati; scartare ciò che non corrisponde.
- Generare `content_id` e `calculator_id` dall'inventario editoriale, non dal contenuto dell'utente.
- Derivare `source_class` nel browser, inviare solo la classe e scartare immediatamente il referrer completo.
- Impostare i metadati GA4 sanitizzati prima di qualunque `config`/evento; nessun evento custom o coda di clic viene recuperato retroattivamente dopo l'opt-in.
- Inviare `store_outbound_click` una sola volta per attivazione e non anche `cta_click`.
- Emettere `calculator_complete` al primo risultato valido; non duplicarlo se l’utente ricalcola nello stesso form senza usare “Ricomincia”.
- Collegare gli eventi PDF solo a controlli espliciti con `data-analytics-event` e `asset_id` allowlisted; nessuna inferenza automatica da URL o estensione file.
- Non bloccare `href`, apertura in nuova scheda o navigazione se il trasporto dell'evento fallisce.
- Non creare identificatori del sito né deduplicare tra dispositivi; solo gli identificatori standard GA4 approvati possono essere usati dal tag dopo consenso.
- Limitare accesso e conservazione al minimo approvato; non riutilizzare eventi per pubblicità, profilazione pubblicitaria o vendita.
- Versionare la tassonomia e mantenere un changelog con data, motivo e revisore privacy.

### Changelog locale

| Data | Versione | Motivo | Stato privacy |
| --- | --- | --- | --- |
| 2026-09-05 | emitter locale `3` | `chatgpt` limitato alla landing; host allowlisted, tag esatto, referrer assente → `unknown`; emitter senza rete | Fase 0 prima della successiva approvazione GA4 |
| 2026-09-05 | decisione collector GA4 separato | opt-in, cookie/ID Google dichiarati, metadati sanitizzati, pubblicità OFF, proprietà RouteBudget separata | Approvato dal titolare; attivazione subordinata a configurazione e QA in GA4_WEBSITE_SETUP.md |

## 10. Report consentiti

Se la Fase 1 è attiva, i report coprono soltanto i visitatori consenzienti e gli eventi effettivamente ricevuti. Rifiuto, ad blocker, errori di rete e referrer assenti limitano la copertura; non stimare il totale reale usando questi conteggi come censimento. Nessun recupero storico o garanzia di traffico, ranking o conversione. Sono utili soltanto aggregazioni sufficientemente ampie:

| Domanda | Calcolo | Lettura corretta |
| --- | --- | --- |
| Da dove arrivano le visite misurate? | sorgente/mezzo GA4 e `source_class` della landing per periodo | segnali di acquisizione dei consenzienti, non provenienza autenticata o tutte le visite |
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
- [ ] Proprietà RouteBudget e ID reale verificati; Corvian e impostazioni condivise dell'account non sono modificati.
- [ ] Nessuna richiesta Google o cookie GA prima dell'opt-in, dopo rifiuto o dopo revoca e reload.
- [ ] Accetta/Rifiuta, riapertura dal footer, scelta a 185 giorni e storage non disponibile sono testati.
- [ ] Enhanced Measurement OFF, pubblicità/Signals OFF e retention 2 mesi/reset OFF verificati nella proprietà reale.
- [ ] Cookie GA massimo 180 giorni senza rinnovo; revoca anche durante il caricamento del tag verificata.
- [ ] Ogni interazione emette al massimo l'evento previsto; i clic store non sono duplicati.
- [ ] Payload e log non contengono valori digitati, risultati, URL o referrer grezzi.
- [ ] Input validi, errori, refresh, back/forward e nuova scheda sono testati.
- [ ] Errori di rete non bloccano il lettore e non producono retry invasivi.
- [ ] Tastiera, screen reader, mobile e riduzione del movimento restano funzionanti.
- [ ] Dashboard e alert usano aggregazioni, non identità.

## 13. Responsabilità e revisione

Il responsabile editoriale possiede copy e mappa pagina→CTA. Il responsabile prodotto approva ogni affermazione sull'app. Il responsabile tecnico mantiene link, schema e prove di configurazione. Il titolare Eng. Mostafa (`mosta1570@gmail.com`) ha approvato il passaggio GA4 consenziente qui descritto; modifiche ulteriori richiedono nuova valutazione e autorizzazione. L'approvazione non equivale a una certificazione legale di conformità.

Rivedere questo documento quando cambiano funzioni, limiti Free/Pro, URL degli store, architettura del sito, fornitore di misurazione o informativa. La routine query/pagina e i confini delle metriche Search Console sono definiti in [SEARCH_CONSOLE_OPERATIONS.md](./SEARCH_CONSOLE_OPERATIONS.md); il controllo editoriale è in [SEO_EDITORIAL_WORKFLOW.md](./SEO_EDITORIAL_WORKFLOW.md).
