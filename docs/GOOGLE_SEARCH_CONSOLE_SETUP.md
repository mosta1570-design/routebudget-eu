# RouteBudget EU — Preparazione Google Search Console

Runbook da eseguire **solo dopo il deploy approvato**. Questo documento non collega Search Console, non modifica DNS, non contiene token e non autorizza un deploy.

## 1. Decisione obbligatoria prima del setup

Registrare il dominio canonico realmente pubblicato:

```text
Dominio canonico: ______________________________
URL homepage: https://__________________________/
Data verifica pubblica: ________________________
Responsabile: __________________________________
```

Una proprietà **Dominio** si inserisce senza `https://` e senza path e richiede controllo DNS. Il target configurato nel repository è `https://routebudget.eu/`; la proprietà preferita è quindi `routebudget.eu`. Una proprietà **Prefisso URL** esatta per `https://routebudget.eu/` resta opzionale per transizione o debug.

Riferimenti ufficiali: [proprietà Dominio](https://support.google.com/webmasters/answer/10431861), [verifica della proprietà](https://support.google.com/webmasters/answer/9008080).

## 2. Gate tecnico pre-deploy

Prima di aprire Search Console:

- [ ] dominio e variante canonica (`www` o apex) approvati;
- [ ] HTTPS valido, nessun contenuto misto;
- [ ] homepage e pagine editoriali restituiscono `200` senza login;
- [ ] `title`, description, H1, canonical e contenuto principale sono nell'HTML iniziale;
- [ ] canonical assoluti, autoreferenziali e sul dominio approvato;
- [ ] redirect HTTP→HTTPS e variante host→canonica senza catene;
- [ ] `/robots.txt` pubblico, senza localhost/staging e con URL sitemap corretto;
- [ ] `/sitemap.xml` XML valido, deterministico e composto solo da URL canoniche indicizzabili;
- [ ] nessuna bozza o preview nel sitemap;
- [ ] pagine importanti raggiungibili tramite link HTML normali;
- [ ] assenza di `noindex`, blocchi robots accidentali, duplicati e pagine orfane;
- [ ] dati strutturati coerenti col contenuto visibile;
- [ ] test mobile, tastiera, layout stabile e reduced motion completati;
- [ ] `npm run seo:all` e build di produzione verdi;
- [ ] nessuna credenziale, token o email privata nei file pubblici.

## 3. Sequenza post-deployment esatta

1. Confermare dominio canonico di produzione e risposta HTTPS `200` della homepage.
2. Aprire Search Console con l'account autorizzato.
3. Aggiungere una proprietà **Dominio** usando solo il dominio, senza protocollo o path.
4. Selezionare verifica DNS **TXT**.
5. **Pausa manuale:** copiare il valore mostrato da Google direttamente nel pannello DNS. Non incollarlo in issue, chat, report o repository.
6. Attendere propagazione DNS e premere **Verifica**.
7. Confermare proprietà e permessi; registrare solo data, ruolo e metodo, mai il token.
8. Ispezionare la homepage con **Controllo URL**.
9. Eseguire **Test URL pubblicato** e controllare accesso, rendering, risorse e canonical dichiarata.
10. Inviare `https://<dominio-canonico>/sitemap.xml` dalla sezione Sitemap.
11. Richiedere indicizzazione solo per homepage, pillar principali e primi calcolatori già approvati.
12. Monitorare stato del sitemap e numero di URL rilevate.
13. Monitorare indicizzazione pagine, query e pagine di destinazione.
14. Registrare ogni errore, causa, correzione, data di convalida e responsabile.

L'invio del sitemap e la richiesta di indicizzazione sono segnali di scoperta, non garanzie di scansione, indicizzazione o ranking. Per molte URL usare sitemap e link interni, non richieste manuali ripetute. Riferimenti: [creare e inviare sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Controllo URL](https://support.google.com/webmasters/answer/9012289).

## 4. Verifica DNS sicura

- Usare il record esatto emesso dalla proprietà corretta.
- Nel provider DNS, `Host/Name` è normalmente vuoto o `@`; seguire istruzioni specifiche del provider.
- Non modificare record MX, SPF, DKIM o altri TXT non correlati.
- Non rimuovere il record di verifica dopo il successo: Google può ricontrollarlo.
- Verificare il record pubblicato con uno strumento DNS, senza salvarne il valore in questo repository.
- Concedere privilegi minimi: proprietari solo a chi deve amministrare accessi; utenti completi o limitati secondo responsabilità.

### Metodo HTML opzionale

File HTML o meta tag sono adatti a una proprietà Prefisso URL, per esempio durante transizione o debug. Non sostituiscono la verifica DNS richiesta dalla proprietà Dominio. Se usati, mantenere il token nell'artefatto pubblico soltanto finché serve e non copiarlo in documentazione. Non installare Analytics o Tag Manager solo per verificare proprietà.

## 5. Checklist Controllo URL

Per homepage, ogni pillar e ogni calcolatore iniziale:

- [ ] URL appartiene alla proprietà corretta;
- [ ] risposta live `200`, senza login o interstitial;
- [ ] scansione consentita da robots;
- [ ] indicizzazione consentita, nessun `noindex`;
- [ ] canonical dichiarata coincide con URL canonica;
- [ ] dopo indicizzazione, canonical scelta da Google coincide o differenza è spiegata;
- [ ] HTML renderizzato contiene H1, testo, link e CTA reali;
- [ ] CSS, JavaScript, immagini e font necessari caricabili;
- [ ] structured data rilevato senza errori bloccanti;
- [ ] screenshot mobile leggibile e senza sovrapposizioni;
- [ ] richiesta di indicizzazione fatta una sola volta dopo modifica sostanziale.

Il test live dimostra accessibilità al crawler di ispezione, non garantisce presenza nei risultati.

## 6. Revisione indicizzazione

Ogni settimana durante avvio, poi secondo [SEARCH_CONSOLE_OPERATIONS.md](./SEARCH_CONSOLE_OPERATIONS.md):

1. confrontare manifest indicizzabile, sitemap e URL rilevate;
2. separare esclusioni intenzionali da problemi reali;
3. campionare URL per ogni motivo di esclusione;
4. controllare redirect, soft 404, duplicati, canonical alternative, `noindex` e blocchi robots;
5. correggere causa nel sito, eseguire test live, poi usare **Convalida correzione** quando disponibile;
6. non forzare indicizzazione di pagine sottili, duplicate, ritirate o non canoniche.

## 7. Mobile, Core Web Vitals e HTTPS

- Verificare template distinti: homepage video, articolo, hub e calcolatore.
- Controllare report HTTPS e problemi di risorse miste.
- Leggere Core Web Vitals per mobile e desktop: LCP, INP e CLS usano dati reali aggregati e possono non apparire con traffico insufficiente.
- Per diagnosi usare anche misure di laboratorio, senza confonderle con dati sul campo Search Console.
- Correggere causa di template; convalidare solo dopo rilascio approvato.

Riferimento: [Core Web Vitals in Search Console](https://support.google.com/webmasters/answer/9205520).

## 8. Sicurezza, azioni manuali e risultati avanzati

Controllo mensile e dopo alert:

- [ ] **Azioni manuali**: nessuna azione; se presente, congelare pubblicazioni, correggere tutte le URL coinvolte e documentare richiesta di revisione;
- [ ] **Problemi di sicurezza**: nessun contenuto compromesso, malware o ingegneria sociale; se presente, trattare come incidente;
- [ ] **Miglioramenti / risultati avanzati**: errori raggruppati per template e tipo schema;
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) su esempi pubblici;
- [ ] [Schema Markup Validator](https://validator.schema.org/) per validazione Schema.org generale;
- [ ] markup presente anche visivamente e senza recensioni, FAQ o identità inventate.

Riferimenti: [azioni manuali](https://support.google.com/webmasters/answer/9044175), [problemi di sicurezza](https://support.google.com/webmasters/answer/9044101), [test dati strutturati](https://developers.google.com/search/docs/appearance/structured-data).

## 9. Registro operativo senza segreti

```text
Proprietà: <dominio, non token>
Tipo: Domain | URL-prefix transitoria
Data verifica:
Metodo: DNS TXT | HTML transitorio
Ruolo responsabile:
Sitemap inviata:
Data invio:
Stato:
URL campione ispezionate:
Problemi aperti:
Prossima revisione:
```

Non registrare account email personali, password, token DNS, cookie, OAuth, screenshot con dati account o codici di verifica.

## 10. Stop manuali

Fermarsi e chiedere solo l'azione minima quando compare:

- login Google o 2FA;
- valore TXT/CNAME da copiare;
- accesso al provider DNS;
- concessione o modifica permessi;
- decisione sul dominio canonico;
- deploy o modifica esterna non ancora autorizzata.
