# RouteBudget EU — mappa internal link

Data: 20 agosto 2026. Fonte: metadata validate in `content/it/**/meta.json` e link contestuali del Markdown/HTML statico.

## Entry points

| Sorgente | Destinazioni HTML principali |
| --- | --- |
| Homepage statica | hub, landing app, preventivo PDF, tre guide Round 8, privacy, termini, store |
| Hub guide | tutti i 3 pillar e i 35 supporti |
| Hub calcolatori | tutti i 3 calcolatori |
| Header/footer SEO | homepage, hub guide, hub calcolatori, landing app, privacy, termini |
| Landing app | 3 pillar, 3 calcolatori, entrambi gli store |

## Cluster costo tratta

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/calcolo-costo-trasporto/` | — | costo/km | costi, preventivo, costi diretti, margine, ritorno a vuoto, tre calcolatori |
| `guide/calcolare-carburante-pedaggi-autista/` | calcolo costo | carburante | costo/km, margine, entrambi i tool |
| `guide/quanto-consuma-un-camion/` | calcolo costo | carburante | costi diretti, fissi/variabili, calcolatore carburante |
| `guide/calcolo-pedaggio-camion/` | calcolo costo | costo/km | Austria, Eurovignette, Repubblica Ceca e calcolatore costo/km |
| `guide/pedaggio-camion-austria/` | calcolo costo | costo/km | pedaggio Italia, Repubblica Ceca, Slovenia, calcolatore costo/km |
| `guide/pedaggio-camion-svizzera/` | calcolo costo | costo/km | pedaggio Italia, Austria, Germania, calcolatore costo/km |
| `guide/pedaggio-camion-germania/` | calcolo costo | costo/km | pedaggio Italia, Paesi Bassi, Repubblica Ceca, calcolatore costo/km |
| `guide/pedaggio-camion-paesi-bassi/` | calcolo costo | costo/km | pedaggio Italia, Germania, Eurovignette, calcolatore costo/km |
| `guide/pedaggio-camion-belgio/` | calcolo costo | costo/km | pedaggio Italia, Paesi Bassi, Germania, calcolatore costo/km |
| `guide/pedaggio-camion-slovenia/` | calcolo costo | costo/km | pedaggio Italia, Austria, Germania, calcolatore costo/km |
| `guide/pedaggio-camion-francia/` | calcolo costo | costo/km | pedaggio Italia, Svizzera, costo tratta, calcolatore costo/km |
| `guide/costo-traghetto-camion-sardegna/` | calcolo costo | costo/km | preventivo, ritorno a vuoto, Sicilia, calcolatore costo/km |
| `guide/costo-traghetto-camion-sicilia/` | calcolo costo | costo/km | preventivo, Sardegna, ritorno a vuoto, calcolatore costo/km |
| `guide/eurovignette-camion-2026/` | calcolo costo | costo/km | pedaggio Italia, Paesi Bassi, Germania, calcolatore costo/km |
| `guide/pedaggio-camion-repubblica-ceca/` | calcolo costo | costo/km | pedaggio Italia, Germania, Austria, calcolatore costo/km |
| `guide/pedaggio-camion-ungheria-2026/` | calcolo costo | costo/km | pedaggio Italia, Austria, Repubblica Ceca, calcolatore costo/km |
| `guide/pedaggio-camion-danimarca-2026/` | calcolo costo | costo/km | pedaggio Italia, Eurovignette, Germania, calcolatore costo/km |
| `guide/costo-traghetto-camion-calais-dover-2026/` | calcolo costo | costo/km | Sardegna, Sicilia, preventivo PDF, calcolatore costo/km |
| `guide/bgtoll-camion-bulgaria-2026/` | calcolo costo | costo/km | pedaggio Italia, Ungheria, Repubblica Ceca, calcolatore costo/km |
| `guide/tempi-guida-riposo-camion/` | calcolo costo | costo/km | costi diretti, costo orario, attese, calcolatore costo/km |
| `guide/ritorno-a-vuoto-autotrasporto/` | calcolo costo | costo/km | costo/km guida, margine, due tool |
| `guide/proteggere-margine-tratta/` | calcolo costo | costo/km | preventivo, errori tariffa, costo/km |
| `calcolatori/costo-carburante-viaggio/` | calcolo costo | costo/km adiacente | costi diretti, margine, fuel surcharge, pillar |
| `calcolatori/fuel-surcharge-autotrasporto/` | calcolo costo | carburante | preventivo, entrambi gli altri calcolatori, landing app |

## Cluster costi autotrasporto

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/costi-autotrasporto/` | — | costo/km | fissi/variabili, costo/km storico, usura, altri pillar |
| `guide/costi-fissi-variabili-autotrasporto/` | costi autotrasporto | costo/km | costo/km, margine, errori tariffa |
| `guide/costo-chilometrico-camion/` | costi autotrasporto | costo/km | fissi/variabili, costi diretti, margine |
| `guide/costo-furgone-per-km/` | costi autotrasporto | costo/km | fissi/variabili, ritorno a vuoto, tachigrafo furgoni 2026 |
| `guide/quanto-consuma-un-furgone/` | costi autotrasporto | —, flusso N1 app | costo furgone/km, consumo camion, ritorno a vuoto, landing app |
| `guide/costo-autostrada-furgone/` | costi autotrasporto | —, flusso N1 app | costo furgone/km, consumo furgone, pedaggio camion, landing app |
| `guide/tachigrafo-furgoni-2026/` | costi autotrasporto | costo/km | costo N1, tempi guida, costo tratta |
| `guide/tabelle-costi-autotrasporto-mit-2026/` | costi autotrasporto | costo/km | costo tratta, costo/km storico, fissi/variabili |
| `guide/costo-orario-autista-camion/` | costi autotrasporto | costo/km | costo tratta, durata operativa, attese, calcolatore costo/km |
| `guide/usura-manutenzione-camion/` | costi autotrasporto | costo/km | fissi/variabili, costo/km, costo tratta |
| `calcolatori/costo-chilometrico-camion/` | calcolo costo | carburante adiacente | guida costo/km, fissi/variabili, fuel surcharge, pillar, landing app |

## Cluster preventivi

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/preventivo-trasporto/` | — | costo/km | costo tratta, costi, margine, errori, PDF, tre tool |
| `guide/errori-calcolo-tariffa-trasporto/` | preventivo | costo/km | costo tratta, margine, costi diretti |
| `guide/preventivo-trasporto-pdf/` | preventivo | costo/km | costo tratta, errori tariffa, margine |
| `guide/tempi-attesa-carico-scarico-autotrasporto/` | preventivo | costo/km | costo tratta, costo orario, durata operativa, calcolatore costo/km |
| `guide/tariffe-trazionisti/` | calcolo costo | costo/km | ritorno a vuoto, benchmark MIT, attese, calcolatore costo/km |
| `guide/clausola-adeguamento-carburante-autotrasporto/` | calcolo costo | fuel surcharge | preventivo, margine, costo tratta, calcolatore fuel surcharge |

## Regole automatiche

- reference non risolta: build fallisce;
- self-link metadata: build fallisce;
- supporto senza pillar: build fallisce; `relatedCalculator` può essere nullo quando nessun tool web rappresenta correttamente il flusso, come per N1;
- pagina pubblicata verso draft/noindex: build fallisce;
- href/src o fragment rotto: `seo:links` fallisce;
- route senza link in ingresso: `seo:links` fallisce;
- ogni contenuto richiede entrambi i CTA store e badge ufficiali.

La mappa descrive destinazioni, non impone anchor exact-match. Anchor restano editoriali e variati.

## Gate internal link per la release 12 agosto

Gate da verificare nel build. Le tre nuove guide ricevono link dal hub `/it/guide/` e dalle relazioni curate dei pillar e della guida sui costi diretti; restituiscono link a pillar, calcolatore e contenuti correlati:

- `calcolo-costo-trasporto` → `tempi-guida-riposo-camion`, `costo-orario-autista-camion` e `tempi-attesa-carico-scarico-autotrasporto`;
- `costi-autotrasporto` → `costo-orario-autista-camion` e `tempi-attesa-carico-scarico-autotrasporto`;
- `preventivo-trasporto` → `tempi-attesa-carico-scarico-autotrasporto`;
- `calcolare-carburante-pedaggi-autista` → tutte e tre le guide del costo del tempo.
- homepage → tutte e tre le guide del costo del tempo, mantenendo gli strumenti gratuiti e il pillar come prime destinazioni.

Il controllo generato deve continuare a chiudere con zero URL orfani e zero link o frammenti rotti.

## Gate internal link per la release 13 agosto

- homepage → tutte e tre le nuove guide;
- `costi-autotrasporto` → `tachigrafo-furgoni-2026` e `tabelle-costi-autotrasporto-mit-2026`;
- `costo-furgone-per-km` → `tachigrafo-furgoni-2026` contestualmente;
- `calcolo-costo-trasporto` e `calcolo-pedaggio-camion` → `pedaggio-camion-austria`;
- hub guide → tutti i 17 supporti;
- ogni nuova pagina → pillar, calcolatore e contenuti correlati.

## Gate internal link per la release 14 agosto

- homepage → `tariffe-trazionisti`, `pedaggio-camion-svizzera` e `pedaggio-camion-germania`;
- pillar `calcolo-costo-trasporto` → tutte e tre le nuove guide;
- pillar `preventivo-trasporto` e `proteggere-margine-tratta` → `tariffe-trazionisti`;
- `calcolo-pedaggio-camion` e `pedaggio-camion-austria` → guide Svizzera/Germania;
- hub guide → tutti i 20 supporti;
- ogni nuova pagina → pillar, calcolatore e contenuti correlati;
- gate generato: zero route orfane, zero target o fragment rotti.

## Gate internal link per la release 15 agosto

- homepage → `pedaggio-camion-paesi-bassi`, `pedaggio-camion-belgio` e `pedaggio-camion-slovenia`;
- pillar `calcolo-costo-trasporto` → tutte e tre le nuove guide con anchor nazionali descrittivi;
- `calcolo-pedaggio-camion` → tutte e tre le nuove guide e i sistemi Paese precedenti;
- `pedaggio-camion-germania` → Paesi Bassi e Belgio; `pedaggio-camion-austria` → Slovenia;
- hub guide → tutti i 23 supporti;
- ogni nuova pagina → pillar, calcolatore e almeno due guide di sistema correlate;
- gate generato atteso: 35 route indexabili, zero route orfane, zero target o fragment rotti.

## Gate internal link per la release 16 agosto

- hub guide → tutti i 26 supporti;
- `calcolo-costo-trasporto` → costo traghetto Sardegna, pedaggio Francia e clausola carburante;
- `calcolo-pedaggio-camion` → Francia e trafori, senza trasformare la guida italiana in overview europea;
- `preventivo-trasporto` e calcolatore fuel surcharge → guida clausola carburante;
- `preventivo-trasporto` → costo traghetto Sardegna come spesa specifica da verificare;
- ogni nuova guida → pillar, calcolatore e almeno due contenuti adiacenti;
- gate generato atteso: 38 route indexabili, zero route orfane, zero link o fragment rotti.

## Gate internal link per la release 17 agosto

- homepage → Sicilia, Eurovignette e Repubblica Ceca nelle versioni copy IT ed EN;
- hub guide → tutti i 29 supporti;
- pillar `calcolo-costo-trasporto` → tutte e tre le nuove guide con anchor descrittivi;
- pillar `preventivo-trasporto` e guida Sardegna → costo traghetto Sicilia;
- `calcolo-pedaggio-camion` e Paesi Bassi → Eurovignette, mantenendo separato Vrachtwagenheffing;
- `calcolo-pedaggio-camion`, Germania e Austria → MYTO CZ Repubblica Ceca;
- ogni nuova guida → pillar, calcolatore e tre contenuti adiacenti;
- gate generato atteso: 41 route indexabili, 32 URL in `articles-it.xml`, zero route orfane e zero target o fragment rotti.

## Gate internal link per la release 18 agosto

- homepage statica e React → Ungheria, Danimarca e Calais–Dover; homepage statica → `preventivo-trasporto-pdf`;
- hub guide → tutti i 32 supporti;
- pillar `calcolo-costo-trasporto` → tutte e tre le nuove guide con anchor descrittivi;
- `calcolo-pedaggio-camion` → HU-GO e KmToll senza trasformare la guida italiana in pagina Paese generica;
- ogni nuova guida → pillar, calcolatore e tre contenuti adiacenti;
- gate verificato: 44 route indexabili, 35 URL in `articles-it.xml`, zero route orfane, target o fragment rotti.

## Gate internal link per la release 20 agosto

- homepage statica e React → `bgtoll-camion-bulgaria-2026`, `quanto-consuma-un-furgone` e `costo-autostrada-furgone`;
- hub guide → tutti i 35 supporti;
- BGTOLL riceve ingressi da homepage, hub guide, `calcolo-pedaggio-camion` e Ungheria; restituisce link al pillar, calcolatore, guida italiana, Ungheria e Repubblica Ceca;
- `quanto-consuma-un-furgone` riceve ingressi da homepage, landing app, hub, pillar costi, costo furgone/km, costo autostrada furgone e consumo camion;
- `costo-autostrada-furgone` riceve ingressi da homepage, landing app, hub, pillar costi, costo furgone/km e guida pedaggio camion;
- ogni nuova guida restituisce esattamente le relazioni dichiarate nel proprio `meta.json`; per le due guide N1 il passo di conversione è l'app, non un calcolatore web camion presentato come equivalente;
- gate post-build atteso: 47 route indexabili, 38 URL in `articles-it.xml`, zero route orfane, target o fragment rotti.
