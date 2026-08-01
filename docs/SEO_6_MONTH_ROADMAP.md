# RouteBudget EU — roadmap SEO organica di 6 mesi

## Scopo e criterio di successo

Questo piano trasforma il sito in due sistemi connessi: l'esperienza prodotto premium e un motore editoriale organico. L'Italia è il mercato iniziale. Guide e calcolatori devono aiutare autisti, padroncini, dispatcher e piccole imprese di trasporto a prendere decisioni economiche migliori e, quando serve il flusso completo, portare alle schede ufficiali RouteBudget su App Store o Google Play.

Il piano non promette traffico, indicizzazione o posizionamenti. Google Search Console (GSC) è il ciclo di feedback principale: pubblicare, osservare query e pagine, migliorare ciò che mostra domanda reale, consolidare ciò che si sovrappone e tradurre solo contenuti italiani con segnali sufficienti.

## Vincoli di verità

- Descrivere RouteBudget come strumento di calcolo e decisione, non come navigatore o sistema di tariffazione ufficiale.
- I pedaggi sono stime o importi inseriti/verificati dall'utente; non promettere pedaggi esatti o in tempo reale.
- Non promettere guadagni, margini o conformità normativa. Gli esempi sono illustrativi e ogni impresa deve usare i propri costi.
- Non inventare dati, autori, clienti, recensioni, volumi di ricerca, prezzi dell'app o risultati SEO.
- Le pagine possono spiegare il conteggio delle pause operative, ma non sostituiscono la pianificazione legale o la consulenza sul Regolamento (CE) n. 561/2006.
- Mantenere separati camion pesanti e veicoli leggeri/N1 quando cambiano costi, pedaggi o regole applicabili.
- I contenuti devono riflettere le funzioni verificate: carburante/energia, pedaggi stimati, costo autista, usura/manutenzione, ritorno a vuoto, scenari Minimo/Consigliato/Ideale, PDF e Archivio locale. Android non va associato a Trip Tracking o navigazione.
- Nessuna pagina cambia la propria data di aggiornamento senza una revisione sostanziale documentata.

## Architettura e convenzioni

Il base path pubblico resta `/routebudget-eu/`. La homepage prodotto mantiene tale URL; il contenuto italiano usa percorsi crawlable completi sotto `/routebudget-eu/it/`:

- pillar e guide: `/routebudget-eu/it/guide/{slug}/`
- strumenti: `/routebudget-eu/it/calcolatori/{slug}/`
- confronti decisionali futuri: `/routebudget-eu/it/confronti/{slug}/`

Le lingue future usano lo stesso schema (`/routebudget-eu/en/`, `/routebudget-eu/de/`, `/routebudget-eu/fr/`, `/routebudget-eu/pl/`, `/routebudget-eu/ro/`, `/routebudget-eu/ar/`) e vengono pubblicate solo quando esiste una traduzione adattata e revisionata. Ogni URL deve essere staticamente renderizzato o prerenderizzato, avere canonical auto-referenziale, title e description unici, breadcrumb visibili, metadata social, dati strutturati appropriati e inclusione selettiva nella sitemap. Un cambio lingua non deve dipendere da solo stato client-side.

## Baseline prima della pubblicazione

Prima di avviare il Mese 1, registrare un punto zero senza trasformarlo in obiettivo garantito:

| Area | Baseline da registrare | Fonte |
| --- | --- | --- |
| Indicizzazione | URL validi, esclusi, errori, sitemap letta | GSC, ispezione URL |
| Domanda | query, impressioni, clic e CTR per pagina/dispositivo/paese | GSC, ultimi 28 e 90 giorni quando disponibili |
| Brand | quota osservata di query branded e non-branded, con regole di classificazione documentate | esportazione GSC |
| Conversione | clic outbound App Store/Google Play per landing e lingua | analytics privacy-conscious |
| Utilità | avvio e completamento calcolatori, errori di validazione, CTA dopo il risultato | eventi senza valori economici o dati personali |
| Qualità tecnica | stato sitemap/robots/canonical/hreflang, Core Web Vitals, errori 404 | GSC e test di build |

Se non esiste storico sufficiente, riportare `nessun dato sufficiente`; non stimare una baseline.

## Mese 1 — fondamenta e primo nucleo italiano

### Risultato atteso

Rendere il sistema pubblicabile e misurabile, quindi lanciare tre pillar, due calcolatori e cinque guide di supporto di qualità. “Lanciare” significa URL crawlable, collegato internamente, sottoposto a controllo editoriale e inserito nella sitemap; non significa garanzia di indicizzazione.

### Produzione contenuti

Pillar iniziali:

1. `/routebudget-eu/it/guide/calcolo-costo-trasporto/` — metodo completo per calcolare il costo di una tratta.
2. `/routebudget-eu/it/guide/costi-autotrasporto/` — costi fissi e variabili, costo/km e attribuzione alla singola tratta.
3. `/routebudget-eu/it/guide/preventivo-trasporto/` — dal costo al prezzo e al preventivo professionale.

Calcolatori iniziali:

1. `/routebudget-eu/it/calcolatori/costo-chilometrico-camion/`
2. `/routebudget-eu/it/calcolatori/costo-carburante-viaggio/`

Guide iniziali:

1. `/routebudget-eu/it/guide/calcolare-carburante-pedaggi-autista/`
2. `/routebudget-eu/it/guide/costi-fissi-variabili-autotrasporto/`
3. `/routebudget-eu/it/guide/costo-chilometrico-camion/`
4. `/routebudget-eu/it/guide/errori-calcolo-tariffa-trasporto/`
5. `/routebudget-eu/it/guide/proteggere-margine-tratta/`

Ogni pagina segue la mappa keyword e il cluster assegnato, contiene almeno un esempio verificabile, collega il pillar, una risorsa correlata, la funzione RouteBudget pertinente e una CTA store contestuale.

### Lavoro tecnico

- Implementare template contenuto, modello dati e build statica/prerender descritti dalla strategia generale; evitare pagine che esistono solo dopo l'esecuzione JavaScript.
- Generare sitemap XML solo con URL canonici, pubblici e `200`; tenere bozze, anteprime, filtri e pagine sottili fuori dalla sitemap.
- Verificare robots.txt, canonical, metadata, open graph, breadcrumb e gestione `404` reale.
- Preparare `Article`/`BreadcrumbList` per guide e `WebApplication` per strumenti. Non usare `AggregateRating`, recensioni o FAQ non visibili.
- Creare navigazione editoriale accessibile e una sezione contenuti coerente con il design RouteBudget, non un blog generico.
- Preservare performance: CSS e immagini essenziali, font controllati, nessuna libreria pesante per calcoli semplici.

### Search Console e misurazione

- Dopo il deployment su GitHub Pages, verificare la proprietà GSC di tipo **prefisso URL** per `https://mosta1570-design.github.io/routebudget-eu/`. Creare una Domain property solo dopo il passaggio a un dominio RouteBudget controllato via DNS.
- Inviare la sitemap e ispezionare homepage, tre pillar e due calcolatori; richiedere l'indicizzazione solo dopo QA.
- Usare come unico contratto di misurazione la tassonomia e le fasi di autorizzazione in [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md). Nessun endpoint analytics viene attivato prima della revisione privacy prevista.
- Annotare nel registro editoriale la data effettiva del primo deploy pubblico e le modifiche sostanziali; una data di build o preview non è una data di pubblicazione.

### Gate di fine mese

- Nessun URL pubblicato è orfano o duplicato.
- Formule ed esempi hanno test indipendenti e revisione product-truth.
- Mobile, tastiera, screen reader e contrasto rispettano il target WCAG 2.2 AA.
- GSC può leggere sitemap e URL; eventuali esclusioni vengono registrate, non interpretate come fallimento immediato.

## Mese 2 — completare il cluster prezzo e marginalità

### Produzione pianificata

- Pubblicare `/routebudget-eu/it/calcolatori/margine-trasporto/` e `/routebudget-eu/it/calcolatori/prezzo-minimo-tratta/`.
- Pubblicare guide su `prezzo minimo, consigliato e ideale`, `errori nel calcolo di una tariffa`, `ritorno a vuoto` e `punto di pareggio della tratta`.
- Creare una risorsa linkabile: checklist scaricabile/stampabile “Dati da raccogliere prima di quotare una tratta”, senza raccogliere email come condizione d'accesso.

### Miglioramento guidato dai dati

- Eseguire review GSC settimanale per query in crescita, nuove formulazioni, CTR debole e pagine vicine a una soglia utile concordata. Non usare una posizione singola come verità assoluta.
- Migliorare title, intro, sommario e risposte solo sulla base di query pertinenti al pubblico; non inseguire ricerche generiche non qualificate.
- Aggiungere link dai nuovi contenuti alle pagine del Mese 1 e viceversa quando il collegamento risolve un passaggio reale del lavoro.

### Gate di fine mese

Continuare a espandere una pagina se acquisisce query coerenti, impressioni crescenti o uso del calcolatore. Se due URL rispondono alla stessa intenzione, scegliere una pagina primaria e fondere/redirectare prima di pubblicarne altre.

## Mese 3 — pedaggi, tempo e costo operativo reale

### Produzione pianificata

- Pubblicare il pillar `/routebudget-eu/it/guide/pedaggi-autostradali-camion/`.
- Pubblicare supporti su assi/peso/classe, come verificare un pedaggio, costo autista e durata operativa, e pause dopo periodi di guida.
- Pubblicare `/routebudget-eu/it/calcolatori/costi-fissi-variabili/` e un foglio di preparazione pedaggi che somma importi inseriti dall'utente, senza fingere un tariffario ufficiale.
- Aggiungere esempi di tratta solo con dati dichiarati come ipotetici e data/fonte per eventuali tariffe esterne.

### Autorità e distribuzione

- Cercare citazioni editoriali pertinenti presso associazioni, consulenti di flotta, blog tecnici o community di autotrasporto tramite risorse realmente utili; niente scambi di link, acquisto di link o outreach massivo.
- Citare fonti primarie per norme e operatori di pedaggio; separare chiaramente fonte, interpretazione e input dell'utente.

### Gate trimestrale

- Confrontare finestre GSC omogenee, tenendo conto che i contenuti nuovi non hanno ancora storico comparabile.
- Classificare ogni URL: `mantieni`, `migliora`, `espandi`, `consolida`, `ritira`.
- Scegliere i temi del trimestre successivo dai segnali italiani, non dal solo calendario iniziale.

## Mese 4 — consolidamento italiano e prima localizzazione selettiva

### Lavoro italiano

- Aggiornare i contenuti con impressioni ma risposta incompleta: tabelle, esempi, definizioni, link e CTA coerenti con la query.
- Pubblicare solo gap evidenziati da GSC o domande reali di supporto, con priorità a `prezzo tratta camion`, `tariffa trasporto merci` e `guadagno autotrasportatore` trattati senza promesse finanziarie.
- Pubblicare il calcolatore `ritorno-a-vuoto` se i segnali mostrano domanda e non cannibalizza il calcolo completo.

### Gate per la traduzione

Una pagina è candidata alla localizzazione solo se:

- è stabile, accurata e senza sovrapposizione con altre pagine;
- riceve query pertinenti o utilizzo reale del calcolatore per una finestra sufficiente a prendere una decisione;
- ha un ruolo chiaro nella conversione o nell'autorità tematica;
- il contenuto è trasferibile al nuovo mercato senza presupporre regole, tariffe o unità italiane.

Iniziare da un piccolo gruppo di pagine provate in una sola o due lingue prioritarie in base a domanda e capacità di revisione, non da tutte le lingue insieme.

## Mese 5 — localizzazione controllata e veicoli N1

- Continuare l'autorità italiana con una guida e un calcolatore separati per veicoli leggeri/N1 solo se prodotto, formule e applicabilità normativa sono chiaramente distinti dai camion pesanti.
- Adattare le prime pagine provate in inglese, tedesco, francese, polacco, romeno o arabo secondo priorità osservata; usare revisori madrelingua o competenti nel trasporto.
- Pubblicare URL separati, canonical auto-referenziali e coppie hreflang complete, incluso `x-default` appropriato. Non dichiarare una lingua nella sitemap finché la pagina non è pubblica e revisionata.
- Localizzare esempi, valuta/formato, terminologia e fonti; non tradurre letteralmente tariffe o regole italiane.
- Confrontare performance per pagina e lingua senza assumere che la traduzione erediti il posizionamento italiano.

## Mese 6 — consolidamento, seconda ondata e piano successivo

- Tradurre un secondo piccolo gruppo solo se il primo è tecnicamente sano e ha segnali utili; le sei lingue sono un orizzonte, non una quota obbligatoria.
- Eseguire audit di cannibalizzazione, link interni, contenuti orfani, redirect, canonical, hreflang, sitemap e Core Web Vitals.
- Unire o ritirare pagine deboli/duplicate quando miglioramento e differenziazione non sono giustificati; applicare redirect `301` verso la risorsa più utile.
- Aggiornare screenshot e affermazioni di prodotto se l'app cambia; ricontrollare store link e disponibilità.
- Produrre il backlog dei successivi 90 giorni separando: espansioni di vincitori, refresh, nuovi gap, localizzazioni e debito tecnico.
- Documentare cosa è stato imparato, non solo cosa è stato pubblicato.

## Cadenza operativa ricorrente

### Ogni settimana

1. Controllare GSC: indicizzazione, query/impressioni/clic/CTR, dispositivi e paesi.
2. Segnalare query pertinenti in crescita, pagine con molte impressioni e CTR debole, cali non spiegati e gap di risposta.
3. Selezionare al massimo poche modifiche ad alto valore; registrare ipotesi, intervento e data.
4. Controllare pagine nuove e aggiornate su mobile, link, CTA, errori e dati strutturati.
5. Verificare che le pagine organiche conducano naturalmente al calcolatore o all'app, senza CTA ripetitive.

### Ogni mese

- Confrontare intervalli coerenti e distinguere brand/non-brand, lingua, dispositivo e tipo pagina.
- Rivedere cluster e mappa keyword; assegnare ogni nuova pagina a una sola intenzione primaria.
- Eseguire un campione editoriale per accuratezza, italiano naturale, fonti, date e product truth.
- Prioritizzare aggiornamenti di pagine con segnali prima di aumentare il volume editoriale.

### Ogni trimestre

- Audit tecnico completo e revisione della struttura interna dei link.
- Decisione esplicita per ogni contenuto: mantenere, migliorare, espandere, consolidare o ritirare.
- Riesame delle funzioni RouteBudget, delle policy privacy e delle regole/condizioni esterne citate.

## Scorecard senza promesse

La scorecard descrive ciò che si osserva; non imposta garanzie di crescita.

| Categoria | Metriche | Decisione che informa |
| --- | --- | --- |
| Copertura | URL indicizzati, esclusioni, errori sitemap, canonical selezionata da Google | correggere scoperta e duplicazione |
| Domanda | query, impressioni, clic, CTR, paese, dispositivo | titoli, intenti, nuovi supporti |
| Qualità pagina | query soddisfatte, scroll/ritorno se misurati lecitamente, uso tool, errori | espandere o semplificare |
| Conversione | CTA visibili, clic app contestuali, store scelto, conversione post-risultato | collocazione e copy CTA |
| Autorità | link editoriali pertinenti e menzioni verificabili | risorse da aggiornare e distribuire |
| Manutenzione | pagine aggiornate con modifiche reali, duplicati consolidati, link rotti | salute del catalogo |

## Responsabilità e definizione di “done”

| Ruolo | Responsabilità minima |
| --- | --- |
| SEO/editorial | intent, outline, fonti, brief, link, registro modifiche, analisi GSC |
| Esperto prodotto/trasporto | verifica formule, applicabilità, caveat e funzioni RouteBudget |
| Engineering | rendering crawlable, metadata, sitemap, accessibilità, analytics e test |
| Revisore italiano | naturalezza, chiarezza, terminologia professionale e assenza di affermazioni gonfiate |
| Localization reviewer | adattamento culturale, fonti locali e parità semantica tra hreflang |

Una pagina è “done” solo quando intent, formula/fonti, product truth, accessibilità, metadata, link interni, CTA, analytics consentite e preview mobile sono stati verificati. Pubblicare non chiude il lavoro: apre il ciclo Search Console.
