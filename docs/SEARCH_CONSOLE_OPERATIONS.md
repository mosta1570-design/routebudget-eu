# RouteBudget EU — Operazioni Search Console

Procedura Italian-first per trasformare dati reali di Google Search Console in decisioni editoriali verificabili. Setup iniziale: [GOOGLE_SEARCH_CONSOLE_SETUP.md](./GOOGLE_SEARCH_CONSOLE_SETUP.md).

## 1. Confini

- Search Console misura visibilità e clic da Google, non installazioni, acquisti o ricavi.
- Sitemap e richieste di indicizzazione non garantiscono scansione, indicizzazione o ranking.
- Posizione è una media aggregata; privilegiare trend di impressioni e clic, non un singolo “rank”.
- Dati recenti possono essere preliminari. Usare giorni completi e intervalli comparabili.
- Analizzare coppie **query + pagina**: aggregazione per proprietà e per pagina può produrre valori diversi.
- Nessun dato va inventato. Campo vuoto resta `n/d`, non `0`.
- Nessun token, account, query potenzialmente sensibile o export grezzo entra nel repository pubblico.

Riferimenti: [Performance report](https://support.google.com/webmasters/answer/7576553), [conteggio dei dati](https://support.google.com/webmasters/answer/17011364), [clic, impressioni e posizione](https://support.google.com/webmasters/answer/7042828).

## 2. Cadenza

| Cadenza | Scopo | Output |
| --- | --- | --- |
| Settimanale | scoprire crescita, lacune e problemi tecnici | [SEO_WEEKLY_REVIEW_TEMPLATE.md](./SEO_WEEKLY_REVIEW_TEMPLATE.md) |
| Mensile | decidere priorità di cluster, consolidamenti, tool e traduzioni | [SEO_MONTHLY_REVIEW_TEMPLATE.md](./SEO_MONTHLY_REVIEW_TEMPLATE.md) |
| Dopo release | verificare URL modificate, canonical, sitemap e schema | registro rilascio + Controllo URL |
| Dopo alert | sicurezza, azione manuale, indicizzazione o rich result | incidente con proprietario e risoluzione |

Usare sempre timezone Europe/Rome e annotare intervallo, confronto, filtri, tipo di ricerca, paese e dispositivo.

## 3. Revisione settimanale

### 3.1 Preparazione dati

1. Aprire **Rendimento → Risultati di ricerca**.
2. Selezionare ultimo periodo completo disponibile e confronto omogeneo precedente.
3. Impostare ricerca Web; separare Immagini/Video solo con intento specifico.
4. Analizzare Italia e tutti i dispositivi, poi segmentare mobile/desktop se differenze sono rilevanti.
5. Esportare tabelle Query e Pagine in area di lavoro privata approvata.
6. Registrare data di estrazione e filtri; non committare export contenenti query.

### 3.2 Controlli obbligatori

- **Query in crescita:** impressioni o clic aumentano su intervalli comparabili; verificare pagina proprietaria e intento.
- **Pagine in crescita:** distinguere crescita di cluster da oscillazione di una query.
- **Pagine vicine alla prima pagina:** esaminare query con posizione media indicativamente 5–20, senza trattare posizione media come ranking esatto.
- **Molte impressioni e CTR debole:** confrontare intento, snippet e SERP reale; nessuna soglia CTR universale.
- **Indicizzate senza impressioni:** controllare se pagina è nuova, domanda assente, intento già coperto o qualità insufficiente.
- **Query rilevanti non risposte:** decidere se ampliare pagina esistente, creare una sezione o aprire nuovo brief.
- **Cannibalizzazione possibile:** stessa query/intento appare su più URL senza ruolo distinto.
- **Errori di scansione/indicizzazione:** campionare URL, trovare causa e separare esclusioni volute.
- **Orfani:** confrontare report link con validatore interno; il report Link è un campione, non inventario completo.
- **Mobile/CWV:** controllare nuovi gruppi Poor/Needs improvement e template coinvolto.
- **Dati strutturati:** raggruppare errori per schema e template; verificare markup contro contenuto visibile.
- **Sitemap:** stato leggibile, URL rilevate coerenti con manifest indicizzabile.

### 3.3 Classificazione azione

Per ogni opportunità scegliere una sola azione primaria:

| Azione | Quando |
| --- | --- |
| Mantieni | trend sano, intento coperto, nessun difetto |
| Espandi | stessa pagina deve rispondere a sotto-intento vicino |
| Riscrivi snippet | promessa corretta ma title/description non descrivono risposta |
| Collega | pagina valida ha pochi collegamenti contestuali |
| Aggiorna fatti | fonte, norma, tariffa o funzione prodotto è cambiata |
| Unisci | URL sovrapposte competono per stesso intento |
| Redirect | pagina ritirata ha sostituto netto e mapping approvato |
| Nuovo brief | intento distinto, domanda verificata e valore originale possibile |
| Indaga tecnico | problema di crawl, render, canonical, sitemap o schema |

Ogni azione richiede evidenza, owner, priorità, data e verifica successiva.

## 4. Revisione mensile

Usare periodo completo confrontabile e leggere trend per cluster, non soltanto totali sito.

1. **Cluster:** costo tratta, costo chilometrico, preventivo, margine e calcolatori; identificare query e pagine che crescono insieme.
2. **Espansioni:** selezionare sotto-intenti già osservati e non pienamente coperti.
3. **Refresh:** priorità a pagine con visibilità e informazioni aggiornabili, non a date cosmetiche.
4. **Cannibalizzazione:** confrontare query→pagine, promesse, H1 e link; unire solo dopo revisione manuale SERP/contenuto.
5. **Merge/redirect:** preparare mapping vecchia→nuova, aggiornare link, canonical e sitemap; non eliminare URL indicizzata senza piano.
6. **Tool:** proporre calcolatore solo se risolve input/output ripetibile meglio di un articolo e può mostrare formula, ipotesi e limiti.
7. **Conversione store:** Search Console non mostra click verso App Store/Google Play. Valutare trend solo se esiste misurazione privacy-safe separatamente approvata; altrimenti segnare `non misurabile`.
8. **Traduzioni:** candidare pagina italiana solo con domanda reale o valore strategico, contenuto stabile e revisore locale disponibile.
9. **Tecnica:** indicizzazione, sitemap, CWV, HTTPS, azioni manuali, sicurezza e schema.
10. **Backlog:** chiudere azioni completate, rinviare con motivo, eliminare idee senza evidenza.

## 5. Regole per cambiare title, H1 o URL

Non cambiare title dopo poche impressioni o per oscillazioni brevi.

Gate minimo per modifica title/description:

- periodo completo confrontato con periodo omogeneo;
- impressioni sufficienti a mostrare un pattern, documentate senza soglia arbitraria;
- intento e SERP verificati manualmente;
- query principale già supportata dal contenuto;
- assenza di cannibalizzazione nuova;
- ipotesi scritta e data di rivalutazione.

H1 cambia solo se risposta della pagina diventa più chiara. URL cambia solo per errore strutturale o consolidamento approvato; richiede redirect permanente, link interni, canonical e sitemap aggiornati. Non eseguire test simultanei su title, H1 e corpo se poi non è possibile attribuire effetto.

## 6. Indicizzazione e crawl

Per un motivo di esclusione:

1. campionare URL rappresentative;
2. confrontare sorgente contenuto, output build e produzione;
3. verificare status, canonical, robots, `noindex`, link in ingresso e sitemap;
4. decidere se esclusione è corretta;
5. correggere template o contenuto alla fonte;
6. eseguire `npm run seo:all` e approvazione normale;
7. dopo deploy autorizzato, test live e convalida in Search Console;
8. registrare esito, senza reinviare sitemap o richieste ogni giorno.

Una pagina indicizzata senza impressioni non è automaticamente difettosa. Valutare età, domanda, sovrapposizione, utilità e link.

## 7. Cannibalizzazione

Segnale, non prova: una query rilevante mostra più URL RouteBudget nello stesso intervallo.

Confermare manualmente:

- stessa intenzione e stesso pubblico;
- contenuti e titoli sovrapposti;
- alternanza della pagina visibile senza ruolo chiaro;
- link interni che inviano segnali contraddittori.

Possibili risposte: differenziare, ampliare proprietario principale, unire, redirect o mantenere entrambe se intenti distinti. Registrare URL proprietaria dell'intento.

## 8. Future export CSV — nessuna API richiesta

Quando esisterà uno script approvato, input atteso:

```text
query,page,country,device,clicks,impressions,ctr,position,date_range
```

Output consentiti:

- molte impressioni / CTR da rivedere;
- posizione media 5–20;
- nuove query;
- brand vs non-brand con dizionario dichiarato;
- pagine in calo su periodi comparabili;
- query condivise da più pagine;
- candidati refresh.

Regole:

- import manuale CSV, nessuna credenziale Google nel build;
- validare colonne, tipi, intervalli e filtri;
- normalizzare canonical prima di aggregare;
- non sommare percentuali CTR; ricalcolare da clic/impressioni;
- proteggere da divisione per zero;
- distinguere `0` da valore mancante;
- non committare export grezzi;
- report derivati devono includere data, filtri e limiti;
- nessuna chiamata API, OAuth o token richiesta da `npm run build` o `npm run seo:all`.

## 9. Priorità

| Priorità | Criterio |
| --- | --- |
| P0 | sicurezza, azione manuale, sito non scansionabile, canonical globale errata |
| P1 | pagine principali escluse, sitemap non leggibile, redirect/404 estesi, schema bloccante su template |
| P2 | opportunità query/pagina provata, CTR o contenuto migliorabile, cannibalizzazione confermata |
| P3 | idea esplorativa, traduzione o nuovo tool senza urgenza |

Priorità non è autorizzazione. Deploy, DNS, tracker e integrazioni esterne richiedono approvazione separata.

## 10. Registro decisioni

```text
ID:
Data:
Periodo e confronto:
Filtri:
Query/pagina/cluster:
Evidenza:
Diagnosi:
Azione:
Owner:
Rischio prodotto/fatti/SEO:
Data obiettivo:
Verifica dopo rilascio:
Esito:
Link a fonte o ticket privato:
```

Mai inserire credenziali, token, email private, input dei calcolatori o dati operativi di trasporto.
