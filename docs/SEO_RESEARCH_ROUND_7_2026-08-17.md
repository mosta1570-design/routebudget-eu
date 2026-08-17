# RouteBudget EU — ricerca SEO italiana round 7

Data decisione: 17 agosto 2026. Mercato principale: Italia; utilità operativa: trasporto stradale e marittimo europeo. Ricerca basata su Google Search Console autenticato, Google Suggest italiano, SERP correnti e fonti primarie. Non vengono attribuiti volume mensile, CPC, difficoltà o probabilità di ranking non disponibili.

## Punto di partenza misurato

La proprietà dominio `routebudget.eu` mostra, per il periodo 1–15 agosto 2026, 17 clic, 1.213 impressioni, CTR 1,4% e posizione media 16,9. L'Italia produce 1.138 impressioni; mobile 714. Le 79 query visibili confermano domanda per costo/km, consumo, costo viaggio, preventivo, offerte e tempi, ma quei lavori hanno già URL proprietarie. Numeri e pagine sono registrati nella [baseline del 17 agosto](./GSC_BASELINE_2026-08-17.md).

Questo round non crea altre varianti di `costo km camion`, `preventivo trasporto`, `quanto consuma un camion` o `fuel surcharge`: dividerebbe segnali già acquisiti.

## Metodo di selezione

Una nuova URL entra nel portfolio soltanto se supera tutti i gate:

1. frase osservata in Google Suggest con lingua e mercato italiani oppure domanda già visibile in GSC;
2. SERP con lavoro distinto e non posseduto dalla sitemap attuale;
3. fonte primaria corrente per regola, tariffa o sistema operativo;
4. problema che entra davvero in costo tratta, decisione prezzo e PDF RouteBudget;
5. nessuna funzione inventata: niente prenotazione, OBU, pedaggi live, routing pesante o garanzia normativa;
6. costo di manutenzione sostenibile e trigger di aggiornamento esplicito.

Suggest verifica il linguaggio usato dalle persone; non dimostra volume né conversione. Una notizia di settore dimostra il problema; non sostituisce il listino o l'autorità.

## Decisioni editoriali

### 1. `costo traghetto camion Sicilia 2026`

Problema: chi attraversa lo Stretto deve attribuire a ogni direzione tariffa, scaglione MTL, servizi separati e tempo operativo senza sommare due volte componenti già incluse.

- Formulazioni osservate: `traghetto camion Sicilia`, `costo traghetto Sicilia camion` e varianti sullo Stretto.
- Fonte primaria: [Caronte & Tourist — tariffe mezzi commerciali](https://www.carontetourist.it/it/stretto-messina/merci/tariffe-automezzi-commerciali), con periodo di validità e direzioni distinte.
- Prova del problema: [Uomini e Trasporti](https://www.uominietrasporti.it/professione/ufficio-traffico/trasportatori-siciliani-proclamato-fermo-dei-servizi-dal-14-al-18-aprile/) documenta pressione 2026 su carburante, tariffe marittime ed ETS; non fornisce il prezzo.
- Confine: Sicilia/Stretto, non Sardegna e non guida generica alle prenotazioni.
- Flusso prodotto: importo verificato per leg → pedaggio manuale andata/ritorno senza doppioni → carburante, tempo, pause, usura e vuoto → scenari → PDF non vincolante → Archivio locale.
- Aggiornamento: prima di ogni preventivo e quando il gestore cambia il listino; i valori visibili nell'articolo sono datati agosto 2026, non medie.

### 2. `eurovignette camion 2026`

Problema: un vettore diretto a nord può acquistare una vignetta per Paese o periodo sbagliato, confondere assi/classi oppure credere che l'Eurovignette copra ancora i Paesi Bassi.

- Formulazioni osservate: `eurovignette camion`, `costo eurovignette camion`, `tariffe eurovignette 2026`.
- Fonte primaria: [informazioni ufficiali Eurovignettes](https://www.eurovignettes.eu/portal/information/information) e [tabella tariffe 2026](https://www.eurovignettes.eu/portal/en/tariffs/tariffs?reset=true).
- Novità operativa: i Paesi Bassi sono usciti dal sistema il 1° luglio 2026; la pagina olandese resta proprietaria di `Vrachtwagenheffing`.
- Confine: tariffa temporale nei Paesi aderenti, non una panoramica di ogni pedaggio europeo.
- Flusso prodotto: costo ufficiale datato → input manuale → missione completa e scenari → PDF; RouteBudget non acquista la vignetta, non determina la classe e non certifica la copertura.
- Aggiornamento: a ogni modifica del portale, delle adesioni o del tariffario annuale.

### 3. `pedaggio camion Repubblica Ceca 2026`

Problema: chi prepara una tratta ceca deve distinguere MYTO CZ dalla e-vignette auto e verificare rete, massa, assi, EURO, CO₂ e dispositivo prima di fissare il prezzo.

- Formulazioni osservate: `pedaggio camion Repubblica Ceca`, `MYTO CZ camion`, `calcolo pedaggio Repubblica Ceca`.
- Fonte primaria: [portale della pubblica amministrazione ceca](https://portal.gov.cz/en/sluzby-vs/road-toll-charges-S6739), [tariffe MYTO 2026](https://myto.gov.cz/cs/emytne/sazby-mytneho-2026) e [calcolatore ufficiale](https://myto.gov.cz/en/customer-services/toll-calculator/route-based).
- Confine: soli veicoli pesanti e rete MYTO; nessuna pagina e-vignette auto e nessuna promessa di conformità.
- Flusso prodotto: stima ufficiale verificata → pedaggio manuale → costi di missione, ritorno e scenari → PDF non vincolante e Archivio locale.
- Aggiornamento: al cambio di tariffa, rete, regole veicolo o condizioni dispositivo.

## Portfolio scartato

| Tema | Decisione |
| --- | --- |
| software/app preventivi autotrasporto | landing app e pillar preventivo possiedono già intento; nuova URL cannibalizzerebbe |
| fac simile preventivo PDF | guida `preventivo-trasporto-pdf` già proprietaria |
| costo trasporto pallet | intento prevalente del committente; RouteBudget non calcola pallet o multi-stop |
| calcolo metri lineari camion | domanda utile, ma prodotto non calcola LDM; richiederebbe tool distinto prima della pagina |
| archivio preventivi | funzione reale, ma nessun segnale sufficiente per una URL autonoma; usata nel workflow delle guide |
| pedaggio camion Ungheria o Danimarca | opportunità future; priorità inferiore e maggiore rischio di aggiornamento rispetto ai tre lavori scelti |
| accise/rimborsi gasolio | intento fiscale ad alta volatilità che il prodotto non gestisce |

## Protocollo people-first e automazione responsabile

Google non richiede di nascondere lo strumento di scrittura; richiede contenuto utile, originale e affidabile. Il rischio nasce dalla produzione su scala senza valore, non dalla presenza di assistenza automatizzata in sé. Questa release applica controlli umani e tecnici verificabili:

- una sola query primaria e un solo lavoro per pagina;
- fonti lette prima della bozza, con data, geografia e claim supportato;
- esempi ricalcolati e ipotesi dichiarate;
- prezzi volatili marcati come fotografie datate;
- nessuna esperienza, intervista, cliente o test inventato;
- limiti RouteBudget visibili vicino al workflow;
- revisione separata di fonti, prodotto, SEO, accessibilità e build;
- link interni curati, non inserimento meccanico di anchor exact-match;
- trigger di aggiornamento e nessuna promessa di indicizzazione o traffico.

Riferimenti Google: [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [contenuti generativi](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) e [spam policy sullo scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content-abuse).

## Gate release

- [x] primary keyword, title, description e canonical unici;
- [x] intenti separati da Sardegna, Paesi Bassi, pedaggio generale e pagina prodotto;
- [x] fonti primarie, cifre datate e limiti prodotto;
- [x] link in ingresso da homepage, pillar e pagine adiacenti;
- [x] tabelle accessibili da tastiera e leggibili su mobile;
- [x] generator, schema, calcolatori, link, sitemap e robots verificabili;
- [ ] verifica pubblica `200`, canonical e sitemap dopo deploy;
- [ ] invio sitemap e richiesta indice registrati dopo conferma operativa.
