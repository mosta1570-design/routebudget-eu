# RouteBudget EU — Workflow editoriale SEO

Procedura operativa standard per ideare, pubblicare, migliorare, tradurre e ritirare contenuti organici.

## 1. Principio editoriale

Una pagina nasce per aiutare un professionista del trasporto a prendere una decisione migliore. La keyword descrive il bisogno; non giustifica da sola la pubblicazione.

Google raccomanda contenuti originali, completi, affidabili e creati per le persone, con paternità e metodo trasparenti. Non richiede un conteggio di parole prestabilito e sconsiglia di cambiare date senza aggiornamenti sostanziali: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## 2. Ruoli reali, non personaggi editoriali

| Ruolo | Responsabilità | Condizione |
| --- | --- | --- |
| Responsabile editoriale | approva intento, priorità, titolo, aggiornamenti e ritiro | una persona nominata nel registro interno |
| Autore | ricerca, scrive e registra le fonti | byline reale solo se autorizzata e verificabile |
| Revisore di materia | controlla formule, terminologia, esempi e fonti del trasporto | non attribuire qualifiche non dimostrate |
| Revisore prodotto | confronta le affermazioni con app, store, Privacy e Termini correnti | obbligatorio quando si cita RouteBudget |
| Revisore locale | adatta una traduzione alla lingua e al mercato | obbligatorio prima di indicizzare una lingua nuova |
| Responsabile tecnico | valida URL, metadata, rendering, link, sitemap e deploy | firma la checklist di pubblicazione |

Una persona può coprire più ruoli, ma ogni controllo deve avere nome reale e data nel registro. Non creare autori fittizi, “redazioni” inesistenti o biografie costruite per sembrare autorevoli.

## 3. Stati del contenuto

```text
BACKLOG
→ QUALIFICATO
→ BRIEF_APPROVATO
→ BOZZA
→ REVISIONE_FONTI
→ REVISIONE_PRODOTTO_SEO
→ PRONTO
→ PUBBLICATO
→ MONITORATO
→ AGGIORNARE | TRADURRE | UNIRE | RITIRARE
```

Ogni passaggio ha un criterio di uscita. Nessun contenuto passa direttamente da bozza a pubblicato.

## 4. Intake settimanale

Le idee ammesse arrivano da:

- query e coppie query/pagina in Search Console;
- domande di supporto, solo dopo anonimizzazione;
- lacune individuate dentro un cluster esistente;
- fonti ufficiali cambiate;
- funzioni di prodotto effettivamente rilasciate;
- necessità pratica che una guida o un calcolatore può risolvere meglio.

Per ogni idea registrare:

| Campo | Domanda |
| --- | --- |
| Problema | quale decisione deve prendere il lettore? |
| Pubblico | autista, padroncino o piccola impresa? |
| Evidenza | query reale, domanda di supporto, fonte o lacuna? |
| Cluster | quale pillar rafforza? |
| Differenza | quale utilità originale aggiunge? |
| Manutenzione | quali dati possono cambiare e chi li controllerà? |
| Conversione | quale funzione RouteBudget completa il compito? |

L'idea resta nel backlog se non ha pubblico, fonte, differenza o collocazione nel cluster.

## 5. Controllo dell'intento e cannibalizzazione

Prima del brief:

1. cercare nell'inventario titolo, query, sinonimi e intento;
2. aprire le pagine già pubblicate che Google mostra per la query;
3. stabilire se serve una nuova URL, una sezione su una pagina esistente o un aggiornamento;
4. scegliere una sola pagina proprietaria dell'intento principale;
5. registrare le URL che dovranno collegarla.

Se due pagine promettono la stessa risposta allo stesso pubblico, non pubblicarne una terza. Ampliare la pagina più forte oppure pianificare un'unione con redirect.

## 6. Modello di brief

Usare questo blocco nel record del contenuto. I valori sono campi, non copy da pubblicare.

```yaml
content_id: identificatore_stabile
status: BRIEF_APPROVATO
locale: it
page_type: pillar | guide | calculator | comparison
public_path: /routebudget-eu/it/...
pillar_path: /routebudget-eu/it/guide/...
primary_intent: informativo | calcolo | decisione | prodotto
reader: autista | padroncino | piccola_impresa
reader_job: "decisione concreta da completare"
primary_query: "linguaggio osservato o ipotesi da validare"
related_queries: []
existing_owner_url: null
answer_promise: "risultato utile, senza esagerazioni"
original_value: "formula, tabella, esempio, strumento o analisi"
required_sections: []
official_sources: []
volatile_facts: []
product_feature: "funzione verificata oppure null"
product_truth_risk: basso | medio | alto
internal_links_in: []
internal_links_out: []
cta_id: complete_trip_app
author: "persona reale da assegnare"
subject_reviewer: "persona reale da assegnare"
product_reviewer: "persona reale da assegnare"
target_publish_date: null
next_review_trigger: "data, fonte o evento prodotto"
```

Non inserire dati personali del lettore, query individuali di supporto o informazioni riservate nel brief.

## 7. Struttura della bozza

### Per guide e pillar

1. risposta diretta nelle prime righe;
2. definizione di perimetro, unità e ipotesi;
3. metodo o formula leggibile;
4. esempio italiano riproducibile, chiaramente etichettato come illustrativo;
5. tabella o checklist utile al lavoro;
6. errori e limiti;
7. fonti con ente, titolo, URL e data di consultazione;
8. collegamenti al pillar, a contenuti correlati e allo strumento pertinente;
9. CTA contestuale dopo aver fornito valore;
10. nota di aggiornamento solo se il contenuto è cambiato in modo sostanziale.

### Per confronti

- dichiarare i criteri prima della conclusione;
- confrontare metodi o scenari omogenei;
- mostrare quando ciascuna opzione è adatta;
- separare margine, ricarico, utile e prezzo;
- evitare classifiche sponsorizzate o vincitori artificiali.

### Per calcolatori

- formula e unità visibili;
- input con limiti e messaggi di errore comprensibili;
- valori iniziali etichettati come esempio, non come dato di mercato corrente;
- politica di arrotondamento documentata;
- risultato chiamato “stima”;
- elenco di voci incluse ed escluse;
- nessun invio di input o risultato nella telemetry;
- CTA dopo il risultato, senza bloccare l'utilità gratuita;
- test da tastiera, mobile, formato decimale italiano e casi limite.

Il piano tecnico dei tool è in [SEO_CALCULATORS_PLAN.md](./SEO_CALCULATORS_PLAN.md).

## 8. Controllo delle fonti e dei fatti

### Registro minimo della fonte

```text
Ente/autore:
Titolo:
URL:
Data di pubblicazione o validità:
Data di consultazione:
Affermazione supportata:
Mercato/Paese:
Prossima verifica:
```

### Checklist di revisione

- [ ] Ogni numero non illustrativo ha una fonte o una provenienza interna documentata.
- [ ] È chiaro se gli importi sono netti o lordi e se IVA/imposte sono escluse.
- [ ] Pedaggi, costi e tempi non sono descritti come esatti o vincolanti.
- [ ] Le norme sono citate con fonte primaria e non trasformate in consulenza legale.
- [ ] Le fonti italiane non sono generalizzate automaticamente ad altri Paesi.
- [ ] Le formule distinguono margine da ricarico.
- [ ] Date e prezzi soggetti a variazione hanno un trigger di revisione.
- [ ] Citazioni da fonti esterne sono brevi e il valore editoriale è originale.
- [ ] Non sono presenti statistiche, utenti, risparmi, recensioni o testimonianze inventati.

Quando una verifica non è possibile, rimuovere l'affermazione o dichiarare esplicitamente l'incertezza. Non coprire una lacuna con un tono più sicuro.

## 9. Revisione della verità RouteBudget

Quando la pagina cita l'app, confermare:

- tre calcoli Free; Pro per calcoli illimitati e logo aziendale nei PDF;
- stime di carburante/energia, pedaggi, autista, usura e ritorno a vuoto;
- scenari Minimo, Consigliato e Ideale, pareggio, costo/km e margine;
- PDF locale con dettaglio costi opzionale e condivisione di sistema;
- Archivio locale e assenza di account;
- rete necessaria per distanza online e abbonamenti;
- Trip Tracking solo iOS;
- nessun prezzo live, tariffa ufficiale, navigazione o garanzia di profitto.

Usare App Store, Google Play, Privacy e Termini correnti come fonti pubbliche. Non copiare metadata locali obsoleti senza confronto con la versione pubblicata.

## 10. Revisione linguistica italiana

- [ ] Frasi dirette, terminologia da lavoro e verbi concreti.
- [ ] “Camion”, “mezzo”, “tratta”, “costo autista”, “ritorno a vuoto” usati in modo coerente.
- [ ] Nessuna sequenza artificiale di sinonimi per inserire keyword.
- [ ] Titoli descrittivi, non sensazionalistici.
- [ ] Esempi con separatore decimale, euro e unità coerenti.
- [ ] Sigle spiegate al primo uso.
- [ ] Nessun residuo di prompt, formula generica da AI o traduzione letterale.
- [ ] Un lettore esterno può completare il compito senza cercare una seconda guida.

Se automazione o AI hanno contribuito in modo sostanziale, applicare la policy editoriale sulla disclosure e documentare comunque revisione, fonti e responsabilità umana. L'automazione non è una fonte.

## 11. SEO on-page e accessibilità

- [ ] Una URL stabile, minuscola, con trattini e senza parametri per la versione canonica.
- [ ] `title` unico e descrittivo; nessuna promessa non presente nella pagina.
- [ ] Meta description utile, non elenco di keyword.
- [ ] Un solo H1 che riassume la risposta.
- [ ] Gerarchia H2/H3 logica e indice nei pillar lunghi.
- [ ] Canonical assoluto e autoreferenziale.
- [ ] `html lang="it"` per la pagina italiana.
- [ ] Immagini autentiche o dichiarate, dimensionate, compresse e con alt contestuale.
- [ ] Tabelle leggibili su mobile e comprensibili senza colore.
- [ ] Link con testo descrittivo; nessun “clicca qui”.
- [ ] Dati strutturati solo quando il contenuto visibile soddisfa davvero il tipo scelto.
- [ ] Nessun contenuto importante disponibile solo dopo interazione JavaScript.
- [ ] Focus visibile, controlli da 44 px e modalità riduzione movimento rispettata.

## 12. Internal linking prima della pubblicazione

Ogni pagina deve collegare:

1. il proprio pillar;
2. da due a sei guide o strumenti realmente correlati, includendo un calcolatore pertinente quando esiste;
3. la funzione RouteBudget pertinente;
4. App Store e Google Play tramite una CTA coerente.

Il pillar e almeno un'altra pagina devono ricevere un aggiornamento per puntare alla nuova URL. Il link nasce nel testo dove aiuta il lettore, non in blocchi automatici di pagine vagamente correlate.

## 13. Revisione conversione e privacy

- [ ] La CTA corrisponde al problema della pagina.
- [ ] La risposta utile precede la CTA.
- [ ] App Store e Google Play usano gli URL pubblici verificati.
- [ ] Nessun prezzo di abbonamento è hardcoded nel copy editoriale.
- [ ] La pagina Android non promette Trip Tracking o Maps.
- [ ] Eventuali eventi usano solo ID e valori enumerati definiti in [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md).
- [ ] Input e risultati dei calcolatori non entrano mai nel payload di analytics.
- [ ] Nessun tracker, cookie o storage è aggiunto senza approvazione privacy e disclosure aggiornata.

## 14. Gate tecnico di pubblicazione

In ambiente di preview e poi in produzione:

- [ ] `published` coincide con la data del primo deploy pubblico effettivo; la data di preview/build resta separata.
- [ ] La URL restituisce `200` senza autenticazione.
- [ ] Contenuto principale, title, description, canonical e link sono presenti nell'HTML scansionabile.
- [ ] La pagina non contiene `noindex` e non è bloccata da `robots.txt`.
- [ ] Canonical, Open Graph e URL del sitemap usano lo stesso host e path.
- [ ] La pagina è inclusa nel sitemap solo se canonica e destinata alla ricerca.
- [ ] `lastmod` riflette l'ultimo aggiornamento sostanziale, non il deploy.
- [ ] Link interni in entrata e uscita non restituiscono errori.
- [ ] CTA store, mail e legal funzionano.
- [ ] Mobile, tastiera, riduzione movimento e console browser sono stati verificati.
- [ ] La build e i controlli automatici passano.

La presenza nel sitemap facilita la scoperta ma non garantisce scansione o indicizzazione: [Sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## 15. Registro di pubblicazione

```text
Content ID:
URL canonica:
Titolo:
Cluster/pillar:
Intento:
Autore:
Revisori:
Data pubblicazione:
Commit/deploy:
Fonti verificate il:
Link interni aggiunti da:
CTA ID:
Sitemap verificato:
URL Inspection eseguita: sì/no + motivo
Prossimo trigger di revisione:
```

Non richiedere manualmente l'indicizzazione per ogni pagina ordinaria. Usare sitemap e link interni; riservare URL Inspection a homepage, pillar, primi calcolatori, correzioni importanti e diagnosi.

## 16. Monitoraggio dopo la pubblicazione

### Prime due settimane

Controllare raggiungibilità, rendering, canonical e scoperta. Non giudicare qualità o domanda da pochi giorni e pochi dati.

### Dopo un ciclo dati sufficiente

Usare confronti a 7 giorni per la routine e a 28 giorni per distinguere tendenza da rumore. Leggere sempre la coppia query/pagina, non soltanto il totale del sito.

| Segnale | Diagnosi da fare | Azione possibile |
| --- | --- | --- |
| Impressioni crescono, CTR debole | titolo/snippet o intento non allineato | riscrivere title e introduzione, senza clickbait |
| Posizione media indicativa 8–20 e query coerenti | risposta utile ma autorità/copertura migliorabile | colmare subtopic, aggiungere esempi e link interni |
| Una query mostra più URL | possibile sovrapposizione | scegliere proprietaria, unire o differenziare |
| Impressioni calano su 28 giorni | fonte obsoleta, concorrenza, stagionalità o problema tecnico | verificare prima di riscrivere |
| Query pertinente non è risposta | lacuna reale | ampliare la pagina o creare supporto nel cluster |
| Nessun segnale | pagina non scoperta, domanda bassa o attesa insufficiente | controllare indicizzazione e link; non clonare la keyword |

Ogni modifica nasce da un'ipotesi e viene annotata. Quando possibile cambiare un gruppo coerente di elementi, non l'intera pagina senza sapere cosa si sta testando.

## 17. Aggiornamento sostanziale

Un aggiornamento giustifica una nuova data quando cambia almeno uno di questi elementi:

- fonte, regola, prezzo di esempio o formula;
- risposta a un subtopic rilevante;
- tabella, calcolatore o esempio operativo;
- funzione RouteBudget descritta;
- struttura necessaria per risolvere meglio l'intento.

Correzioni tipografiche, cambio del copyright o ritocchi puramente estetici non modificano `dateModified` né `lastmod`.

Registro:

```text
Data:
Segnale o trigger:
Ipotesi:
Modifica sostanziale:
Fonti ricontrollate:
Link aggiornati:
CTA aggiornata:
Responsabile:
Data di riesame:
```

## 18. Unire, reindirizzare o ritirare

### Unire

Usare quando due pagine rispondono allo stesso intento. Conservare la URL più forte e completa, portare il valore utile nell'unica pagina, applicare redirect permanente dalla secondaria, aggiornare link e sitemap.

### Differenziare

Usare solo quando i compiti sono realmente diversi, per esempio formula generale contro calcolatore operativo. Titolo, introduzione, struttura e link devono rendere la distinzione evidente.

### Ritirare

Se esiste un sostituto pertinente, redirect. Se non esiste e il contenuto non deve restare, restituire uno stato di rimozione corretto, togliere URL da sitemap e link. Non reindirizzare ogni contenuto debole alla homepage.

## 19. Gate di traduzione

Tradurre una pagina italiana solo se:

- l'intento e le query osservate sono coerenti;
- il contenuto ha fonti e manutenzione solide;
- la pagina offre utilità originale, non soltanto impressioni;
- esiste domanda o una priorità di mercato motivata;
- un revisore locale è disponibile;
- esempi e regole possono essere adattati al Paese.

Flusso:

1. creare URL separata nella lingua;
2. riscrivere query, titolo, esempio, fonti e CTA per il mercato;
3. revisione di lingua e materia;
4. canonical autoreferenziale;
5. `hreflang` completo, assoluto e reciproco tra le sole varianti pubblicate;
6. link nel selettore lingua senza redirect automatico forzato;
7. inserimento nel sitemap e QA con URL Inspection.

Google specifica che ogni variante deve indicare sé stessa e le alternative con URL complete e reciproche: [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 20. Definition of done

Una pagina è completa solo quando:

- risolve il compito promesso con contenuto originale;
- fonti, formule, esempi e verità di prodotto sono approvati;
- italiano, accessibilità e UX mobile sono revisionati;
- URL, metadata, canonical, sitemap e link interni sono validi;
- CTA e misurazione rispettano intento e privacy;
- autori/revisori reali e trigger di aggiornamento sono registrati;
- il monitoraggio Search Console ha proprietario e data di riesame.
