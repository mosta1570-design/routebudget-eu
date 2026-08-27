# RouteBudget EU — Workflow editoriale SEO

Sistema Italian-first per creare contenuti utili, verificabili e coerenti col prodotto. La keyword documenta un bisogno; non giustifica da sola una pagina.

## 1. Ciclo di vita

```text
idea
→ keyword e prove SERP
→ brief
→ bozza
→ revisione fattuale
→ revisione verità prodotto
→ validazione SEO
→ preview design
→ pubblicazione
→ invio/scoperta
→ monitoraggio
→ miglioramento
```

Stati consentiti:

| Stato | Criterio ingresso | Criterio uscita |
| --- | --- | --- |
| `idea` | bisogno o opportunità registrata | pubblico, problema, cluster ed evidenza definiti |
| `researching` | ricerca approvata | keyword/intento/SERP/fonti/cannibalizzazione documentati |
| `brief-ready` | brief completo | owner e revisori approvano perimetro e valore originale |
| `drafting` | struttura approvata | bozza completa, fonti e limiti inclusi |
| `review` | bozza consegnata | fatti, prodotto, lingua, SEO, accessibilità e design approvati |
| `approved` | tutti i gate verdi | release editoriale inclusa in deploy autorizzato |
| `published` | URL pubblica `200` e canonica | monitoraggio attivo o trigger di aggiornamento |
| `updating` | evidenza di modifica | nuova review completa e rilascio approvato |
| `retired` | contenuto non più utile/corretto | redirect o esclusione deliberata documentati |

Nessun salto da `drafting` a `published`. Il deploy non è autorizzato da questo documento.

## 2. Ruoli reali

| Ruolo | Responsabilità |
| --- | --- |
| Responsabile editoriale | intento, priorità, lifecycle, approvazione |
| Autore | ricerca, bozza, registro fonti |
| Revisore fattuale | formule, norme, date, geografia, fonti |
| Revisore prodotto | claim RouteBudget vs app/store/privacy/termini correnti |
| Revisore SEO | intent owner, metadata, link, canonical, schema |
| Revisore design/accessibilità | mobile, tabelle, controlli, focus, reduced motion |
| Responsabile tecnico | build, rendering statico, sitemap, robots, test |
| Revisore locale | lingua e mercato per future traduzioni |

Una persona può coprire più ruoli, ma firma con nome reale e data nel registro interno. Non creare esperti, testimonianze, redazioni o qualifiche fittizie. Sul sito usare solo identità RouteBudget/Corvian già approvata e contatto professionale configurato; niente indirizzo di casa, telefono personale o email privata aggiuntiva.

## 3. Intake `idea`

Fonti ammesse:

- query/pagine reali Search Console;
- SERP italiana osservata e datata;
- ricerca qualitativa con operatori, consenso esplicito e note anonimizzate;
- domanda supporto anonimizzata;
- lacuna in cluster esistente;
- modifica di fonte ufficiale;
- funzione prodotto realmente rilasciata;
- compito pratico risolvibile da guida, tabella o calcolatore.

Registrare problema, lettore, evidenza, cluster, differenza, rischio di manutenzione e conversione pertinente. Scartare idee senza utilità originale o con intento già posseduto.

La ricerca qualitativa può provare che un problema operativo esiste e può migliorare esempi, formule candidate e limiti del prodotto. Non prova da sola volume di ricerca, tariffa, obbligo legale o accuratezza di una formula. Google Suggest prova la formulazione di una query, non il suo volume. Una nuova URL richiede anche almeno un segnale di domanda italiana: query GSC, intervallo Keyword Planner Italia, andamento Google Trends Italia o gap SERP documentato. Senza questo segnale, aggiornare una pagina esistente o mantenere l'idea in ricerca.

## 4. Ricerca `researching`

1. cercare query primaria e varianti italiane;
2. registrare data, luogo/lingua, dispositivo se rilevante e risultati osservati;
3. classificare intento e formati dominanti, senza inventare volumi;
4. confrontare inventario RouteBudget e possibili sovrapposizioni;
5. decidere: nuova URL, nuova sezione, aggiornamento, merge o nessuna azione;
6. raccogliere fonti primarie e segnare fatti volatili;
7. scegliere pagina proprietaria dell'intento.

Output: [SEO_CONTENT_BRIEF_TEMPLATE.md](./SEO_CONTENT_BRIEF_TEMPLATE.md).

## 5. Brief `brief-ready`

Gate:

- intento singolo e lettore definito;
- risposta promessa realistica;
- valore originale concreto: formula, esempio, tabella, checklist o tool;
- page type e URL coerenti;
- pillar, 2–5 link contestuali e link in ingresso pianificati;
- fonti, geografia, date e trigger review;
- claim prodotto verificabili;
- CTA utile e non intrusiva;
- rischio di cannibalizzazione risolto;
- nessuna metrica o forecast inventato.

## 6. Bozza `drafting`

Usare [SEO_ARTICLE_TEMPLATE.md](./SEO_ARTICLE_TEMPLATE.md).

- Risposta diretta nelle prime righe.
- Metodo, unità, ipotesi ed esclusioni visibili.
- Esempi chiaramente illustrativi; importi variabili restano modificabili.
- Tabelle responsive e leggibili senza colore.
- Fonti collegate vicino alle affermazioni e riepilogate in fondo.
- Nessun grande passaggio copiato; sintesi originale.
- CTA dopo aver fornito valore.
- Nessun H1 in `body.md`: generatore usa `title`.
- Nessun HTML, iframe, script, tracker o form esterno nel Markdown.

Per calcolatori: formula e arrotondamento documentati, input validati, risultato chiamato “stima”, dati mantenuti nel browser, nessuna tariffa live o precisione ufficiale promessa.

## 7. Review `review`

### 7.1 Fatti

Eseguire [SEO_FACT_CHECK_CHECKLIST.md](./SEO_FACT_CHECK_CHECKLIST.md). Ogni dato variabile ha fonte, contesto, data, geografia e trigger. Se non verificabile: rimuovere o dichiarare incertezza.

### 7.2 Verità prodotto

Confrontare app installata, store pubblici, Privacy e Termini correnti. Confermare soltanto funzioni realmente disponibili. Regole correnti da ricontrollare prima di ogni pubblicazione:

- RouteBudget fornisce stime operative non vincolanti;
- Free ha calcoli limitati; Pro sblocca calcoli illimitati e logo aziendale nei PDF;
- nessun account RouteBudget;
- PDF e archivio seguono comportamento effettivo dell'app;
- Trip Tracking non va promesso su Android;
- nessuna navigazione, prezzo pedaggio live, tariffa ufficiale o garanzia di profitto;
- nessun prezzo abbonamento hardcoded nel copy editoriale.

### 7.3 SEO e tecnica

- title, description e H1 unici;
- URL minuscola stabile, canonical assoluta autoreferenziale;
- `lang="it"`, breadcrumb e schema coerenti col visibile;
- almeno un link HTML in ingresso; pillar/related validi;
- pagina indicizzabile solo se `approved`;
- `published`, `modified`, `reviewed` veritieri;
- static HTML contiene risposta principale;
- build e `npm run seo:all` verdi.

### 7.4 Design/accessibilità

- mobile 320/375/768 e desktop controllati;
- nessuna sovrapposizione o overflow;
- tabelle scrollabili/leggibili;
- focus visibile, label, tastiera, target adeguati;
- contrasto, zoom e reduced motion;
- hero video homepage non caricato su articoli.

## 8. Approvazione `approved`

Registro:

```text
Content ID:
URL prevista:
Autore:
Revisore fattuale / data:
Revisore prodotto / data:
Revisore SEO / data:
Revisore design / data:
Build SHA:
Risultato seo:all:
Approvazione pubblicazione:
```

Non registrare account, token, email private o dati di lettori.

Il registro eseguibile vive in `content/publishing/`:

- `publication-manifest.json` collega ogni pagina nuova o modificata a `demandEvidenceId`, confine d'intento, prova prodotto, fonti primarie e approvazione;
- `reviews/*.json` lega l'approvazione alla fingerprint esatta di `meta.json` + `body.md`, quindi ogni modifica successiva invalida il record;
- `product-features.json` accetta soltanto funzioni rilasciate con prova versionata nel repository;
- `scripts/verify-publish-gate.mjs` controlla mercato IT, cannibalizzazione, fonti, link, CTA e parità dello schema generato.

Il record `migration-baseline` è soltanto uno snapshot d'integrità delle pagine già pubblicate: non certifica una revisione umana e non autorizza modifiche future. Un record con `reviewMode: automated-with-owner-authorization` dichiara espressamente controlli automatizzati e autorizzazione del proprietario; non deve essere descritto come revisione umana, legale, contabile o specialistica indipendente.

Eseguire `npm run seo:publish-gate` dopo il build oppure `npm run seo:all`, che include la gate. Non aggiornare una fingerprint per far passare CI: correggere il contenuto/evidenza e registrare una nuova decisione.

## 9. Pubblicazione e scoperta

Dopo deploy separatamente autorizzato:

1. verificare `200`, HTTPS, HTML, canonical, robots e sitemap;
2. controllare link, store CTA, schema e mobile;
3. impostare `published` sulla prima data pubblica reale;
4. verificare `lastmod` soltanto per modifica sostanziale;
5. usare Search Console secondo [GOOGLE_SEARCH_CONSOLE_SETUP.md](./GOOGLE_SEARCH_CONSOLE_SETUP.md);
6. richiedere indicizzazione manuale solo per homepage, pillar e primi calcolatori;
7. annotare URL, data, release e trigger di revisione.

## 10. Monitoraggio e miglioramento

Usare review [settimanale](./SEO_WEEKLY_REVIEW_TEMPLATE.md) e [mensile](./SEO_MONTHLY_REVIEW_TEMPLATE.md). Un aggiornamento richiede evidenza: query, fatto cambiato, claim prodotto, problema tecnico o errore editoriale. Non cambiare title sulla base di poche impressioni; non cambiare date per sembrare recente.

Possibili esiti: mantenere, espandere, aggiornare fonti, migliorare link, unire, redirect, tradurre o ritirare.

## 11. Traduzioni

Italiano resta mercato iniziale. Tradurre solo pagine provate da dati italiani o valore strategico documentato, con URL crawlable distinta, title/description/H1 localizzati, canonical autoreferenziale, hreflang reciproco, esempi/fonti locali e revisore umano. Arabo richiede RTL verificato. Nessun redirect basato solo sulla lingua browser.

## 12. Uso di automazione o AI

Automazione può aiutare struttura e controlli; non è fonte né revisore. Contenuto resta soggetto a verifica umana, prodotto e linguistica. Dichiarare l’assistenza materiale nella nota editoriale visibile e documentarla nel flusso interno; non generare esperienze, autori, dati, citazioni o consenso. Nessuna quota giornaliera: completezza e qualità prevalgono sul numero di pagine.
