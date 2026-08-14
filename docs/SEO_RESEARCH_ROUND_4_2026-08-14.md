# RouteBudget EU — ricerca editoriale italiana, round 4

Data ricerca e decisione: 14 agosto 2026. Mercato prioritario: Italia; estensione alle missioni europee dei vettori italiani.

## Baseline proprietaria GSC

Google Search Console, periodo 1–12 agosto 2026: **12 clic, 840 impressioni, CTR 1,4%, posizione media 15,4 e 59 query**. Sono risultati osservati per `routebudget.eu`, non volumi mensili e non una previsione di traffico.

Segnali nuovi o rafforzati:

- `tariffe trazionisti`: 1 impressione, posizione media 78;
- `calcolo del pedaggio per camion`: 3 impressioni, posizione media 57,3;
- `pedaggio mezzi pesanti`: 1 impressione, posizione media 32;
- `pedaggio per autocarri`: 1 impressione, posizione media 54;
- `pedaggio autostradale per mezzi pesanti`: 1 impressione, posizione media 88.

Il primo segnale sostiene una pagina decisionale stretta sulla subvezione. Le varianti pedaggio sostengono l'espansione del cluster per Paese, evitando una seconda guida generica italiana.

## Ricerca SERP e problema reale

La ricerca pubblica è stata eseguita su risultati italiani e fonti ufficiali correnti. Metriche di volume, CPC e difficoltà non sono disponibili; nessun numero è stato inventato.

### 1. Tariffe trazionisti

La SERP è frammentata tra forum, discussioni settoriali e pagine generiche sul costo/km. Il problema concreto è una decisione: una cifra proposta dal vettore committente copre chilometri reali, vuoto, pedaggi, tempo e costi aziendali del sub-vettore?

- [Truck Italia Forum — discussione su offerta €/km e percorrenza mensile](https://www.truck-italia-forum.com/BB3/viewtopic.php?f=152&t=6527)
- [Uomini e Trasporti — pressione economica della subvezione](https://www.uominietrasporti.it/home/ipiuletti2025-limpossibile-ricerca-di-autisti-per-una-pmi-ho-offerto-2-400-euro-al-mese-per-viaggi-in-giornata-ma-non-risponde-nessuno-cosi-la-subvezione-taglia-tariffe-e-buste-pag/)
- [Normattiva — D.Lgs. 286/2005 vigente](https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=005G0306&atto.dataPubblicazioneGazzetta=2006-01-09&qId=&tipoDettaglio=multivigenza)
- [MIT — valori indicativi dei costi di esercizio, marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6)

Confine: la pagina non possiede “tariffa trasporto merci” né pubblica un valore €/km. Possiede soltanto il controllo accept/reject di una specifica offerta di subvezione.

### 2. Pedaggio camion Svizzera

La SERP italiana mescola vignetta, servizi di pagamento e TTPCP. Per un vettore italiano il problema è determinare la tassa del camion prima del confine e trasferirla nel costo della missione senza confonderla con il contrassegno dei veicoli leggeri.

- [UDSC — ambito TTPCP e TTPCP III](https://www.bazg.admin.ch/it/tassa-sul-traffico-pesante-commisurata-alle-prestazioni-ttpcp)
- [UDSC — calcolo TTPCP](https://www.bazg.admin.ch/it/calcolo-della-ttpcp)
- [UDSC — registrazione e pagamento NMTS](https://www.bazg.admin.ch/it/nmts-tassa-registrazione-e-pagamento)

Confine: Svizzera, TTPCP, peso determinante, emissioni e NMTS. Nessuna promessa di calcolo, registrazione o pagamento ufficiale dentro RouteBudget.

### 3. Pedaggio camion Germania

La ricerca italiana mostra guide commerciali dedicate e software di calcolo pedaggi: intento distinto e valore operativo per i corridoi internazionali. Nel 2026 esiste inoltre una modifica attuale della classificazione CO₂ dei camion oltre 16 t.

- [Toll Collect — veicoli oltre 3,5 t](https://www.toll-collect.de/en/toll_collect/rund_um_die_maut/3_5_tonnen_maut/p1745_3_5_tonnen_maut.html)
- [Toll Collect — tariffe correnti e componenti](https://www.toll-collect.de/en/toll_collect/bezahlen/maut_tarife/p1745_mauttarife_07_2024.html)
- [Toll Collect — rete stradale soggetta](https://www.toll-collect.de/en/toll_collect/rund_um_die_maut/mautpflichtige_strassen/mautpflichtige_strassen.html)
- [Toll Collect — riclassificazione CO₂ dal 1° luglio 2026](https://www.toll-collect.de/en/toll_collect/rund_um_die_maut/meldungen/detailsseite_news_48128.html)

Confine: Germania, LKW-Maut, massa tecnica, assi, EURO, CO₂ e chilometri Toll Collect. Il cambio del 1° luglio 2026 riguarda la classificazione CO₂, non viene presentato come nuova tabella tariffaria.

## Tre intenti approvati

| Query primaria | Lavoro dell'utente | Ruolo RouteBudget | Anti-cannibalizzazione |
| --- | --- | --- | --- |
| `tariffe trazionisti` | decidere se un'offerta di subvezione copre missione e rischio | riunire costi, vuoto e scenari; il contratto resta esterno | non è pagina tariffa generale né costo/km universale |
| `pedaggio camion Svizzera` | verificare TTPCP/NMTS e inserirla nel prezzo | usare l'importo ufficiale verificato nel breakdown | distinta da vignetta, pedaggio Italia e GO-Maut Austria |
| `pedaggio camion Germania` | verificare LKW-Maut 2026 per mezzo e percorso | usare l'importo Toll Collect verificato nel costo completo | distinta da pedaggio Italia, Austria e Svizzera |

## Candidati respinti

- `costi extra preventivo trasporto`: intento troppo largo, sovrapposto a preventivo, attese e fuel surcharge; RouteBudget non dichiara funzioni ADR, sponda o facchinaggio dedicate.
- `costo trasporto pallet`: SERP reale ma pubblico più vicino a committenti e spedizionieri; conversione padroncino inferiore in questa fase.
- `rimborso accise gasolio 2026`: richiede manutenzione fiscale periodica e il prodotto non determina l'agevolazione.
- `pedaggi camion Europa`: overview troppo ampia; prima si costruiscono guide nazionali profonde e verificabili.

## Gate di release

- tre primary keyword e canonical unici;
- fonti ufficiali datate e separazione chiara tra stima economica e adempimento;
- link da homepage, hub, pillar e contenuti contestuali;
- schema Article/Breadcrumb, sitemap, robots, canonical e link interni verdi;
- verifica live dopo deploy;
- reinvio sitemap articoli e richiesta di indicizzazione delle tre URL in Google Search Console.

L'indicizzazione può essere richiesta, non garantita. Ranking, impressioni e tempi di scansione restano decisioni di Google.
