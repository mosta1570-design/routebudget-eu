# RouteBudget EU — Google Search Console Operations

Runbook per proprietà, sitemap, indicizzazione e revisione settimanale. Search Console è il feedback editoriale primario, non un'attività di setup una tantum.

## 1. Regole di interpretazione

- L'invio di un sitemap è un suggerimento di scoperta, non garantisce scansione, indicizzazione o ranking.
- “URL disponibile per Google” nel test live non garantisce che la pagina venga indicizzata.
- Una richiesta di indicizzazione inserisce la URL in una coda; non è una priorità né una promessa.
- La posizione è una media aggregata, diversa per query, dispositivo, luogo e risultato. Non è il “rank esatto” visto manualmente.
- CTR = clic / impressioni. Va confrontato tra pagine e intenti simili, non contro una percentuale universale.
- Search Console misura il passaggio da Google al sito. Non prova installazione, calcolo nell'app o abbonamento.
- I dati recentissimi possono essere preliminari; usare giorni completi e confronti omogenei.

## 2. La proprietà corretta oggi

### Proprietà attuale: prefisso URL

Creare o usare esattamente:

```text
https://mosta1570-design.github.io/routebudget-eu/
```

Tipo: **URL-prefix property / proprietà prefisso URL**.

È la scelta corretta perché include protocollo e path del progetto GitHub Pages. Copre le URL che iniziano con quel prefisso, per esempio:

```text
https://mosta1570-design.github.io/routebudget-eu/it/guide/calcolo-costo-trasporto/
```

Non usare oggi una Domain property per `github.io`: una proprietà dominio non contiene protocollo o path e richiede controllo DNS del dominio. RouteBudget controlla il progetto sotto `/routebudget-eu/`, non il DNS del dominio condiviso `github.io`.

Riferimenti Google: [URL-prefix property](https://support.google.com/webmasters/answer/10432366) e [Domain property](https://support.google.com/webmasters/answer/10431861).

### Proprietà futura: vero dominio posseduto

Solo dopo aver acquistato e configurato un dominio RouteBudget controllato, creare:

```text
<dominio-posseduto>
```

Tipo: **Domain property / proprietà dominio**, senza `https://` e senza path. Verifica obbligatoria tramite record DNS TXT o CNAME. Copre protocolli e sottodomini di quel dominio.

| Momento | Proprietà | Verifica | Uso |
| --- | --- | --- | --- |
| GitHub Pages corrente | `https://mosta1570-design.github.io/routebudget-eu/` | file HTML o meta tag | dati esatti del progetto e del suo path |
| Futuro dominio posseduto | `<dominio-posseduto>` | DNS | vista complessiva di protocolli e sottodomini |
| Debug futuro opzionale | `https://www.<dominio-posseduto>/` | ereditata o metodo consentito | analisi del prefisso canonico specifico |

Non eliminare la proprietà GitHub Pages dopo una migrazione: conserva lo storico e serve a controllare il passaggio. I dati delle due proprietà non vengono uniti in un'unica serie storica.

## 3. Verifica della proprietà GitHub Pages

Stato operativo: **da confermare nell'account Search Console**. La presenza del sito non dimostra che la proprietà sia già verificata.

Metodo consigliato per l'attuale prefisso: file HTML.

1. Aggiungere la proprietà prefisso esatta.
2. Scaricare da Search Console il file `google<token>.html`.
3. Copiarlo senza rinominarlo o modificarlo in `public/`.
4. Eseguire build e deploy.
5. Verificare nel browser una risposta `200` da:

   ```text
   https://mosta1570-design.github.io/routebudget-eu/google<token>.html
   ```

6. Premere **Verifica** in Search Console.
7. Conservare il file in repository e produzione: Google ricontrolla periodicamente il token.
8. Registrare account proprietario, metodo e data in un vault operativo, non in questo repository pubblico.

Alternativa: meta tag di verifica nella `<head>` della landing. Il tag deve essere presente nell'HTML servito e non va rimosso durante i redesign. Non aggiungere Google Analytics o Tag Manager soltanto per verificare la proprietà; non sono necessari e introdurrebbero una decisione privacy separata.

Google descrive metodi, persistenza del token e permessi del proprietario in [Verify your site ownership](https://support.google.com/webmasters/answer/9008080).

## 4. Preflight tecnico del sito

Snapshot del worktree al 1 agosto 2026, da ricontrollare dopo il deploy:

| Controllo | Stato osservato | Azione |
| --- | --- | --- |
| HTTPS e landing pubblica | presente | verificare `200` dopo ogni deploy |
| Sitemap | generato in `dist/sitemap.xml`, 15 URL nel build verificato | confermare stesso inventario sulla URL pubblica dopo il deploy |
| Riferimento sitemap | presente nell'artefatto di build `/routebudget-eu/robots.txt`; endpoint pubblico da confermare | inviare il sitemap solo dopo verifica `200` in produzione |
| Robots sul vero host root | non verificato | controllare `https://mosta1570-design.github.io/robots.txt`; un file nel path progetto non sostituisce automaticamente quello alla radice host |
| Canonical | landing, hub e 10 pagine organiche hanno canonical assoluto; pagine legali restano invariate | verificare canonical pubbliche e decisione separata sulle pagine legali |
| Route organiche profonde | 10 pagine e 2 hub generati come HTML statico nel build; deploy non eseguito in questo lavoro | confermare `200` all'accesso diretto dopo il deploy |
| Lingue | toggle IT/EN sulla stessa landing | per contenuti SEO usare URL distinte; niente `hreflang` verso contenuto non pubblicato |
| Pagine legali | pubbliche | preservare URL e copy; non usarle come pagine di acquisizione |

Prima di dichiarare “Search Console ready”, ogni URL organica deve superare:

- richiesta diretta senza sessione → `200`;
- contenuto principale e metadata presenti nell'HTML renderizzato;
- assenza di `noindex` e blocchi di scansione;
- canonical assoluto coerente;
- almeno un link interno da una pagina scansionabile;
- inclusione nel sitemap se destinata ai risultati di ricerca;
- nessun redirect verso la sola homepage per mascherare una route mancante.

## 5. Gestione del sitemap

URL prevista dopo il deploy, da confermare con risposta pubblica `200`:

```text
https://mosta1570-design.github.io/routebudget-eu/sitemap.xml
```

### Regole di generazione

- Generare il sitemap dall'inventario reale dei contenuti durante la build; non mantenere a mano una libreria in crescita.
- Includere solo URL canoniche, pubbliche, indexable e con risposta `200`.
- Usare URL assolute con host e base path correnti.
- Escludere preview, bozze, redirect, errori, parametri, duplicati e pagine `noindex`.
- Usare `<lastmod>` solo per l'ultimo cambiamento sostanziale verificabile.
- Non aggiornare `lastmod` per copyright, deploy o correzioni cosmetiche.
- Non usare `<priority>` o `<changefreq>` come leva: Google li ignora.
- Validare XML, duplicati e parità con l'inventario prima del deploy.

Spina iniziale già presente nel build e da confermare dopo il deploy:

```text
/routebudget-eu/it/guide/
/routebudget-eu/it/guide/calcolo-costo-trasporto/
/routebudget-eu/it/guide/costi-autotrasporto/
/routebudget-eu/it/guide/preventivo-trasporto/
/routebudget-eu/it/guide/calcolare-carburante-pedaggi-autista/
/routebudget-eu/it/guide/costi-fissi-variabili-autotrasporto/
/routebudget-eu/it/guide/costo-chilometrico-camion/
/routebudget-eu/it/guide/errori-calcolo-tariffa-trasporto/
/routebudget-eu/it/guide/proteggere-margine-tratta/
/routebudget-eu/it/calcolatori/
/routebudget-eu/it/calcolatori/costo-chilometrico-camion/
/routebudget-eu/it/calcolatori/costo-carburante-viaggio/
```

L'hub `/routebudget-eu/it/confronti/` resta pianificato e deve entrare nel sitemap solo dopo la pubblicazione di contenuto autonomo utile.

Le pagine hub entrano nel sitemap solo quando contengono un'introduzione utile e link a contenuti reali, non quando sono liste vuote.

### Invio

1. Aprire la proprietà prefisso corretta.
2. Aprire **Sitemaps**.
3. Inviare `sitemap.xml` o la URL completa richiesta dall'interfaccia.
4. Registrare data, stato e numero di URL rilevate.
5. Controllare errori di lettura e differenze tra URL inviate e indicizzate.
6. Non reinviare ogni settimana un sitemap già accessibile e aggiornato; correggere gli errori alla fonte.

Google richiede URL assolute e definisce l'invio come semplice hint: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) e [Sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## 6. Coda iniziale di URL Inspection

Dopo il primo deploy del motore organico, ispezionare in ordine:

1. `https://mosta1570-design.github.io/routebudget-eu/`
2. i tre pillar italiani;
3. i due primi calcolatori;
4. gli hub `/routebudget-eu/it/guide/` e `/routebudget-eu/it/calcolatori/` se hanno contenuto autonomo;
5. una guida di supporto rappresentativa.

Per ciascuna URL:

1. aprire la proprietà che la contiene;
2. incollare la URL assoluta;
3. leggere prima lo stato della versione indicizzata;
4. eseguire **Test live URL** dopo un nuovo deploy o una correzione;
5. verificare fetch, indicizzazione consentita, canonical dichiarata e risorse renderizzate;
6. richiedere indicizzazione solo se nuova, sostanzialmente aggiornata o appena corretta;
7. annotare esito e problema, senza ripetere la richiesta ogni giorno.

Il test live può differire dalla versione indicizzata e non predice il canonical scelto da Google. Riferimento: [URL Inspection tool](https://support.google.com/webmasters/answer/9012289).

## 7. Riunione settimanale: 45–60 minuti

Responsabile: proprietario editoriale. Partecipanti minimi: SEO/editor, prodotto quando emergono claim o CTA, tecnico quando compaiono problemi di scansione.

### A. Controllo salute — 10 minuti

- Page indexing: nuove esclusioni o crescite anomale.
- Sitemaps: ultimo accesso, errori, URL rilevate.
- HTTPS, usabilità e miglioramenti strutturati se presenti.
- URL prioritarie nuove/modificate: stato indicizzato contro live.

Non tentare di “far indicizzare tutto”. Classificare prima le URL che devono davvero comparire in ricerca.

### B. Preparazione del report Performance — 10 minuti

Impostazioni base:

- tipo di ricerca: **Web**;
- intervallo breve: ultimi 7 giorni completi contro i 7 precedenti;
- intervallo tendenza: ultimi 28 giorni completi contro i 28 precedenti;
- Paese: Italia per il report principale, poi tutti i Paesi per anomalie;
- dispositivo: vista complessiva, poi mobile/desktop;
- metriche: clic, impressioni, CTR, posizione media;
- dimensioni: Query e Pagine.

Esportare la tabella quando serve un registro stabile. Non confrontare un periodo di 7 giorni con uno di lunghezza o giorni della settimana diversi.

### C. Separazione brand / non brand — 5 minuti

Filtro brand suggerito, da adattare alle varianti realmente osservate:

```regex
(?i)route\s?budget|routebudget\s?eu
```

- **Brand:** query che corrispondono al filtro.
- **Non brand:** query che non corrispondono.

Verificare manualmente falsi positivi. Una crescita brand può derivare da store o comunicazione; la crescita non brand misura meglio l'espansione editoriale.

### D. Analisi query/pagina — 20 minuti

Lavorare in entrambe le direzioni:

1. **Query → Pagine:** selezionare una query, poi aprire la scheda Pagine. Rivela sovrapposizione o risposta distribuita.
2. **Pagina → Query:** selezionare una pagina, poi aprire Query. Rivela linguaggio reale, subtopic e intenti inattesi.

Creare le seguenti coorti. Sono segnali operativi, non regole di ranking:

| Coorte | Come riconoscerla | Domanda da porre | Azione candidata |
| --- | --- | --- | --- |
| Impressioni in crescita | delta positivo sia assoluto sia relativo, non solo base minuscola | la query è pertinente al pubblico? | espandere risposta o cluster |
| Vicino alla prima pagina | posizione media indicativa 8–20 con query coerente | manca profondità, link o chiarezza? | migliorare pagina esistente |
| Alta visibilità, CTR debole | impressioni sufficienti e CTR sotto pagine comparabili | title/snippet promette la risposta giusta? | riscrivere titolo/intro senza clickbait |
| Gap di contenuto | query pertinente ma risposta parziale | sezione o pagina nuova? | prima ampliare; creare URL solo per intento distinto |
| Perdita | calo su 28 giorni, non solo settimana | tecnico, stagionale, fonte vecchia o concorrenza? | diagnosticare prima di riscrivere |
| Cannibalizzazione | più URL per la stessa query/intento | qual è la proprietaria? | unire, redirect o differenziare |
| Link interno | pagina promettente isolata | quali pagine autorevoli la rendono raggiungibile? | aggiungere link contestuali |

Google raccomanda di osservare soprattutto trend di impressioni e clic, non la posizione isolata: [Performance report overview](https://support.google.com/webmasters/answer/7576553). Definizioni ufficiali: [impressions, clicks, CTR and position](https://support.google.com/webmasters/answer/7042828).

### E. Decisioni — 10 minuti

Uscire dalla riunione con poche azioni realizzabili, ognuna con:

```text
Data:
Pagina/query:
Segnale 7d e 28d:
Diagnosi:
Ipotesi:
Azione:
Responsabile:
Scadenza:
Data di riesame:
```

Una dashboard senza decisioni non completa il workflow.

## 8. Template del rapporto settimanale

```markdown
# SEO weekly — AAAA-MM-GG

## Salute
- proprietà:
- sitemap:
- nuove URL indicizzate:
- problemi prioritari:

## Performance
| Segmento | Clic | Impressioni | CTR | Posizione media | Confronto |
| --- | ---: | ---: | ---: | ---: | --- |
| Totale | — | — | — | — | 7d vs 7d |
| Non brand IT | — | — | — | — | 28d vs 28d |
| Mobile IT | — | — | — | — | 28d vs 28d |

## Opportunità query/pagina
| Query | Pagina | Segnale | Intento | Azione |
| --- | --- | --- | --- | --- |

## Perdite/anomalie
| Pagina | Segnale | Diagnosi da verificare | Owner |
| --- | --- | --- | --- |

## Decisioni
1. ...

## Verifiche della settimana precedente
- ipotesi:
- modifica:
- segnale attuale:
- continuare / annullare / attendere:
```

I trattini indicano dati da compilare, non risultati o obiettivi impliciti.

## 9. Triage dell'indicizzazione

| Stato o sintomo | Controlli | Risposta corretta |
| --- | --- | --- |
| URL sconosciuta | sitemap, link in entrata, `200`, deploy corretto | aggiungere scoperta; ispezionare pagina prioritaria |
| Scoperta, non indicizzata | qualità, duplicazione, server, cluster | migliorare utilità/link; non richiedere in loop |
| Scansionata, non indicizzata | canonical, duplicati, contenuto sottile o simile | consolidare o rendere l'intento distinto |
| Google sceglie altro canonical | canonical dichiarata, redirect, link e sitemap incoerenti | allineare tutti i segnali |
| Bloccata/noindex | robots, meta/header, ambiente preview | correggere soltanto se la pagina deve essere pubblica |
| Soft 404 | contenuto insufficiente o risposta da pagina vuota | creare pagina utile o restituire stato corretto |
| 404 su route profonda | hosting SPA/statico non configurato | generare file/route statica; non reindirizzare tutto alla home |
| Errore server/risorse | deploy, asset base path, JavaScript | correggere e testare live |

Validare la correzione su alcune URL rappresentative; non inviare richieste indiscriminate.

## 10. Revisione mensile

Ogni mese:

- confrontare 28 giorni con i 28 precedenti e, se disponibile, con il periodo stagionale pertinente;
- leggere performance per cluster, non soltanto per URL;
- confrontare brand/non brand, Italia/altri Paesi, mobile/desktop;
- individuare query importanti non attribuite a una pagina proprietaria;
- verificare pagine con più URL in competizione;
- controllare fonti, date e funzioni RouteBudget cambiate;
- confrontare clic organici con clic outbound aggregati, senza unire identità;
- scegliere pagine da aggiornare, unire, tradurre o ritirare;
- aggiornare roadmap e backlog.

Search Console può omettere righe di query a basso volume e aggrega dati diversamente per proprietà e pagina; i totali non devono essere trattati come dataset individuale completo. Approfondimento: [Performance report overview](https://support.google.com/webmasters/answer/7576553) e [metriche del rendimento](https://support.google.com/webmasters/answer/7042828).

## 11. Migrazione a un dominio posseduto

Prima del cambio:

- verificare la nuova Domain property via DNS;
- aggiungere anche il prefisso canonico nuovo se utile al debug;
- pubblicare stesso contenuto e path sul nuovo host;
- aggiornare canonical, Open Graph, sitemap, link assoluti e `hreflang`;
- predisporre redirect permanenti uno-a-uno dalle vecchie URL;
- testare homepage, pillar, calcolatori, legal e asset;
- conservare entrambe le proprietà Search Console.

Dopo il cambio:

- inviare il sitemap del nuovo host nella nuova proprietà;
- ispezionare un campione di URL nuove e vecchie;
- verificare canonical scelta e redirect;
- monitorare errori, impressioni e clic su entrambe le proprietà;
- non rimuovere vecchio host, redirect o verifica finché Google e utenti li usano.

Non inserire URL del nuovo dominio nel sitemap GitHub Pages prima della migrazione effettiva.

## 12. Criteri di operatività

Search Console è operativa quando:

- la proprietà prefisso esatta è verificata e ha almeno due proprietari autorizzati o un piano di continuità;
- il token di verifica resta disponibile dopo i deploy;
- sitemap e URL canoniche coincidono;
- il sito genera pagine profonde con `200` e HTML scansionabile;
- esiste un report settimanale con decisioni e owner;
- richieste di indicizzazione e aggiornamenti sono registrati;
- nessuno descrive sitemap, test live o posizione media come garanzia.

## Fonti operative Google

- [Domain property](https://support.google.com/webmasters/answer/10431861)
- [URL-prefix property](https://support.google.com/webmasters/answer/10432366)
- [Verify your site ownership](https://support.google.com/webmasters/answer/9008080)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
- [Performance report overview](https://support.google.com/webmasters/answer/7576553)
- [Performance metrics definitions](https://support.google.com/webmasters/answer/7042828)
