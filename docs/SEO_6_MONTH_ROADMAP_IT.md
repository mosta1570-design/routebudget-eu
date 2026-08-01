# RouteBudget EU — Roadmap SEO Italia, 6 mesi

Roadmap outcome-based. Nessuna previsione di traffico, ranking, lead o installazioni; nessuna quota giornaliera di articoli. Ogni rilascio richiede qualità, fonti, verità prodotto, test tecnico e approvazione separata.

## Principi

- Italiano prima; altre lingue solo dopo prova o valore strategico.
- Cluster completi prima di espansione orizzontale.
- Aggiornare pagina esistente quando possiede già intento.
- Calcolatori utili e trasparenti prevalgono su contenuto generico.
- Search Console è feedback iniziale primario, non garanzia.
- Qualità e completezza prevalgono sul numero di URL.
- Homepage cinematica resta invariata; contenuti SEO hanno HTML rapido, leggibile e mobile.
- Nessun tracker, credenziale, deploy o integrazione esterna senza approvazione.

## Baseline da registrare prima del mese 1

```text
Dominio canonico pubblico:
Data baseline:
Pagine indexable nel manifest:
Pagine sitemap:
Pagine indicizzate note:
Errori seo:all:
Pillar/guide/calcolatori pubblici:
Stato Search Console:
Query con dati sufficienti:
Click store misurabili con metodo approvato: sì / no
```

Valori sconosciuti restano `n/d`. Non ricostruire metriche mancanti.

## Mese 1 — Fondazione e primo cluster completo

### Outcome

Sistema può creare, validare e rendere staticamente contenuti italiani senza rompere homepage, canonical, sitemap o robots.

### Lavoro

- chiudere audit tecnico/editoriale del pipeline;
- confermare schema contenuto, validatori, manifest indexable e build deterministica;
- completare ricerca keyword e SERP italiana con fonti/date, senza volume inventato;
- definire tre pillar iniziali e relazioni con guide di supporto;
- portare a qualità editoriale prime guide necessarie per coprire il percorso costo→prezzo→margine;
- validare due calcolatori iniziali: costo chilometrico e costo carburante viaggio;
- rendere hub guide e calcolatori utili, non liste vuote;
- chiudere linking iniziale, nessun orfano;
- validare metadata, canonical, JSON-LD, sitemap e robots;
- preparare Search Console senza collegarla: [GOOGLE_SEARCH_CONSOLE_SETUP.md](./GOOGLE_SEARCH_CONSOLE_SETUP.md);
- creare template editoriali e fact-check.

### Gate uscita

- [ ] build produzione e `npm run seo:all` passano;
- [ ] pagine iniziali hanno HTML statico con H1/testo/link;
- [ ] sitemap = canonical = manifest indexable;
- [ ] nessuna bozza, localhost, duplicato o orfano;
- [ ] fonti, limiti e claim prodotto revisionati;
- [ ] calcolatori mostrano formula, ipotesi e “stima”;
- [ ] mobile e accessibilità controllati;
- [ ] nessun deploy/connessione GSC eseguito senza approvazione.

### Evidenza da conservare

Risultato comandi, report audit, mappa cluster/link, screenshot rappresentativi, registro review e lista file.

## Mese 2 — Copertura iniziale, discovery e snippet

### Outcome

Libreria iniziale copre compiti essenziali senza sovrapposizioni; Search Console, se collegata dopo approvazione, può osservare URL canoniche sane.

### Lavoro

- completare soltanto supporti già previsti dai cluster iniziali;
- aggiungere esempi italiani, checklist e tabelle dove migliorano decisione;
- verificare link pillar↔supporti↔calcolatori;
- dopo deploy approvato, confermare `200`, sitemap e indicizzazione secondo setup GSC;
- ispezionare homepage, pillar e primi calcolatori; evitare richieste massive;
- confrontare title/description con SERP reale;
- cambiare snippet solo con mismatch chiaro o dati sufficienti;
- registrare prime query/pagine senza trarre conclusioni da dati preliminari;
- correggere errori di template prima di pubblicare nuove URL.

### Gate uscita

- [ ] ogni pagina ha intento proprietario e 2–5 link pertinenti;
- [ ] sitemap letta senza errore, se inviata;
- [ ] esclusioni inattese hanno diagnosi/owner;
- [ ] nessun title cambiato per poche impressioni;
- [ ] pagine aggiunte superano workflow completo;
- [ ] nessun articolo creato solo per quota.

## Mese 3 — Espansione guidata da query e refresh

### Outcome

Backlog usa evidenza reale; pagine con segnali ricevono più utilità, non testo di riempimento.

### Lavoro

- usare review settimanali per trovare query in crescita, posizioni medie 5–20 e lacune reali;
- ampliare pagine proprietarie con sotto-intenti vicini;
- creare nuova guida solo quando intento è distinto;
- aggiungere esempi riproducibili, tabelle operative e fonti primarie;
- avviare refresh per fatti volatili e claim prodotto;
- controllare cannibalizzazione query→pagine;
- definire prime opportunità tool/linkable asset se formula e limiti sono chiari;
- mantenere conversione contestuale verso app, senza prezzi o promesse nuove.

### Gate uscita

- [ ] ogni nuova azione cita query/SERP/fonte;
- [ ] refresh modifica contenuto sostanziale e date corrette;
- [ ] nessuna nuova URL duplica intento esistente;
- [ ] calcoli e fonti hanno seconda verifica;
- [ ] azioni misurate su intervallo successivo comparabile.

## Mese 4 — Consolidamento cluster vincenti

### Outcome

Cluster con evidenza diventano più completi; cluster deboli non vengono gonfiati artificialmente.

### Lavoro

- classificare cluster con trend, qualità query, indicizzazione e utilità;
- investire in cluster provati con guide/supporti mancanti o aggiornamenti;
- migliorare navigazione contestuale e link da hub/pillar;
- unire pagine sovrapposte dopo verifica manuale;
- preparare redirect e aggiornamento link/canonical/sitemap per contenuti ritirati;
- migliorare template mobile/CWV dove i dati mostrano problema;
- proporre tool gratuito solo se crea valore indipendente e formula auditabile;
- controllare azioni manuali, sicurezza e schema.

### Gate uscita

- [ ] merge e redirect hanno mapping completo;
- [ ] nessun orfano dopo consolidamento;
- [ ] link non ripetono anchor esatta in modo artificiale;
- [ ] fix performance validati per template, non solo singola URL;
- [ ] nessuna cancellazione/deploy senza approvazione.

## Mese 5 — Asset linkabili e conversione utile

### Outcome

Guide e tool aiutano un compito concreto e portano all'app con CTA coerenti, misurabili solo nei limiti privacy approvati.

### Lavoro

- costruire o migliorare checklist, tabelle e calcolatori provati dalle query;
- esplicitare formula, input, fonti, esclusioni e data di revisione;
- collegare tool a pillar e guide pertinenti;
- verificare badge App Store/Google Play e destinazioni reali;
- analizzare click store solo se measurement adapter è stato approvato e connesso legalmente;
- in assenza di misura, registrare `non misurabile` e non inferire conversioni;
- migliorare CTA dopo valore editoriale, senza bloccare tool gratuiti;
- riesaminare Privacy/Termini prima di qualunque nuova telemetria.

### Gate uscita

- [ ] tool funziona da tastiera/mobile e non invia input;
- [ ] risultato definito stima non vincolante;
- [ ] nessun claim Pro o piattaforma falso;
- [ ] click outbound non attribuiti a Search Console;
- [ ] nessun nuovo tracker introdotto senza approvazione.

## Mese 6 — Portfolio, traduzione selettiva e ciclo successivo

### Outcome

Portfolio è mantenibile: pagine forti migliorate, sovrapposizioni ridotte, candidate traduzione scelte con criteri verificabili.

### Lavoro

- review semestrale per cluster, contenuto, tecnica, fonti e conversione;
- classificare ogni pagina: mantenere, espandere, aggiornare, unire, redirect, tradurre, ritirare;
- documentare pagine senza impressioni e decidere senza automatismi;
- selezionare traduzioni solo da pagine italiane provate o strategiche;
- per ogni lingua assegnare revisore reale, fonti locali, URL/canonical/hreflang e QA;
- validare RTL prima di arabo;
- non mass-tradurre la libreria;
- definire roadmap successiva da query, lacune e manutenzione reale;
- aggiornare registry di fatti volatili e calendario review.

### Gate uscita

- [ ] decisione lifecycle per ogni URL indicizzabile;
- [ ] traduzioni hanno domanda/valore, owner e revisore locale;
- [ ] canonical/hreflang progettati prima di indicizzazione multilingue;
- [ ] contenuti deboli non moltiplicati;
- [ ] backlog successivo contiene ipotesi testabili, non forecast.

## Scorecard mensile

Compilare con valori reali e intervalli dichiarati:

| Area | Misura | Baseline | Attuale | Interpretazione | Azione |
| --- | --- | --- | --- | --- | --- |
| Tecnica | build / `seo:all` |  |  |  |  |
| Inventario | canonical indexable |  |  |  |  |
| Indicizzazione | indicizzate / escluse inattese |  |  |  |  |
| Scoperta | query/pagine con impressioni |  |  |  |  |
| Utilità | pagine aggiornate con evidenza |  |  |  |  |
| Cluster | trend clic/impressioni per intento |  |  |  |  |
| Snippet | opportunità con evidenza sufficiente |  |  |  |  |
| Link | orfani / link rotti |  |  |  |  |
| Qualità | fatti/claim scaduti |  |  |  |  |
| Conversione | click store da fonte approvata |  |  |  |  |

Non fissare crescita percentuale obiettivo prima di una baseline affidabile. Successo operativo iniziale significa: sito scansionabile, contenuti veri e utili, errori chiusi, decisioni motivate, ciclo review funzionante.

## Registro rischi

| Rischio | Segnale | Prevenzione | Risposta |
| --- | --- | --- | --- |
| Cannibalizzazione | query alterna più URL simili | intent owner nel brief | differenziare/unire/redirect |
| Dati insufficienti | poche impressioni o periodo breve | attendere intervallo completo | nessun cambio title |
| Fatti scaduti | fonte/tariffa/norma cambia | trigger per fonte | review e aggiornamento |
| Claim prodotto falso | app/store divergono dal copy | review prodotto | rimuovere/correggere |
| Crescita pagine sottile | URL senza valore originale | gate brief | espandere esistente |
| Traduzione debole | copy letterale/non locale | revisore umano | non indicizzare |
| Misura invasiva | richiesta tracker/input | privacy gate | fermare e chiedere approvazione |
| Regressione homepage | CSS/asset condiviso cambia | visual regression | correggere prima release |

## Rituali

- Settimanale: [SEO_WEEKLY_REVIEW_TEMPLATE.md](./SEO_WEEKLY_REVIEW_TEMPLATE.md)
- Mensile: [SEO_MONTHLY_REVIEW_TEMPLATE.md](./SEO_MONTHLY_REVIEW_TEMPLATE.md)
- Editoriale: [SEO_EDITORIAL_WORKFLOW.md](./SEO_EDITORIAL_WORKFLOW.md)
- Fact-check: [SEO_FACT_CHECK_CHECKLIST.md](./SEO_FACT_CHECK_CHECKLIST.md)
- Search Console: [SEARCH_CONSOLE_OPERATIONS.md](./SEARCH_CONSOLE_OPERATIONS.md)
