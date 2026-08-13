# RouteBudget EU — ricerca editoriale italiana, round 3

Data ricerca e decisione: 13 agosto 2026. Mercato prioritario: Italia, con estensione alle tratte europee degli operatori italiani.

## Baseline proprietaria GSC

Google Search Console, periodo 1–11 agosto 2026: **10 clic, 725 impressioni, CTR 1,4%, posizione media 15,2 e 52 query**. Questi dati descrivono la proprietà RouteBudget nel periodo osservato: non sono volumi mensili e non garantiscono traffico futuro.

Segnali già presenti includono `consumo medio camion` (24 impressioni), `costo km camion` (12), `quanto consuma un camion` (11), `preventivo trasporto` (6), `costo chilometrico camion` (5), `calcolo costo trasporto al km` (4) e `calcolo del pedaggio per camion` (2). La nuova selezione evita di creare altre pagine su consumo, preventivo generico, fuel surcharge o costo/km già assegnati.

## Regola di selezione

Ogni nuova URL deve superare quattro controlli:

1. problema distinto dall’inventario pubblicato;
2. SERP italiana o ricerca dedicata che dimostri intento, senza inventare volume;
3. fonte ufficiale aggiornata capace di sostenere i fatti volatili;
4. passaggio naturale da risposta utile a un calcolo RouteBudget realmente disponibile.

## Tre intenti approvati

| Query primaria | Problema reale | Evidenza | Ruolo RouteBudget | Confine |
| --- | --- | --- | --- | --- |
| `tachigrafo furgoni 2026` | Operatori N1 transfrontalieri devono capire se massa, rimorchio e attività rientrano nell’estensione dal 1° luglio 2026 e come il tempo incide sul costo | Circolare MIT 9674/2026, ELA e Reg. 561/2006; SERP italiana con guide dedicate alla scadenza | Raccogliere dati N1, stimare durata/costo e mostrare un segnale prudente; completare poi il preventivo | Non “tutti i furgoni”; nessuna analisi tachigrafo o garanzia legale |
| `tabelle costi autotrasporto MIT 2026` | Le tabelle A–D vengono confuse con tariffe minime o sommate integralmente, producendo benchmark errati | Pubblicazione MIT del 17 marzo 2026, legenda e Tabelle ufficiali; risultati di ricerca dedicati | Confrontare il riferimento con carburante, pedaggi, autista, usura e vuoti reali della tratta | Benchmark datato, non tariffa universale né valore importato automaticamente |
| `pedaggio camion Austria` | Una tratta italiana sul Brennero può perdere margine se GO-Maut viene trattato come pedaggio italiano o media unica | Pagine italiane ASFINAG dedicate a GO-Maut, tariffe 2026, assi, CO₂ e tratte speciali | Inserire l’importo ASFINAG verificato nel breakdown completo e nel prezzo | RouteBudget non sostituisce ASFINAG e non certifica classe o pagamento |

## Evidenza ufficiale usata

### Tachigrafo furgoni

- [MIT, Circolare prot. 9674 del 16 aprile 2026](https://www.mit.gov.it/index.php/normativa/circolare-prot-n-9674-del-16042026): dal 1° luglio 2026 il perimetro comprende veicolo o complesso oltre 2,5 t usato nel trasporto internazionale di merci o cabotaggio.
- [European Labour Authority, veicoli leggeri](https://www.ela.europa.eu/it/veicoli-leggeri-grandi-cambiamenti): G2V2 e regole operative per i veicoli commerciali leggeri interessati.
- [EUR-Lex, Regolamento 561/2006 consolidato](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A02006R0561-20241231): ambito, regole ed esenzioni da verificare cumulativamente.

### Tabelle MIT

- [MIT, valori indicativi marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6): aggiornamento di assicurazione, energia e pedaggiamenti.
- [Legenda ufficiale](https://www.mit.gov.it/nfsmitgov/files/media/documentazione/2026-03/Legenda.pdf): A su 30.000 km; B–D su 100.000 km; soltanto le voci applicabili vanno sommate.
- [Tabella D ufficiale](https://www.mit.gov.it/nfsmitgov/files/media/documentazione/2026-03/TABELLA%20D_Costi%20Esercizio%20Imprese_Modello%20costi_mar2026_pedaggi%20al%20netto%20IVA.pdf): esempio controllabile per veicoli oltre 26 t, non tariffa valida per ogni impresa.

### Pedaggio Austria

- [ASFINAG, come si paga il GO-Maut](https://www.go-maut.at/it/pagare-il-pedaggio-go/): oltre 3,5 t, costo per km e variabili di assi, EURO, CO₂ e percorso.
- [ASFINAG, tariffe 2026](https://www.go-maut.at/it/pagare-il-pedaggio-go/tariffe-pedaggio-go/): struttura valida dal 1° gennaio 2026, sezioni speciali, A13 notturna e A12 Unterinntal.
- [ASFINAG, classi CO₂](https://www.go-maut.at/it/pagine-informative/classi-di-emissione-di-co2/): cinque classi e documenti necessari alla classificazione.

## Candidati respinti

- `preventivo trasporto PDF`, `fuel surcharge`, `ritorno a vuoto`, `quanto consuma un camion`: URL già pubblicate; nuova pagina cannibalizzerebbe contenuto esistente.
- `rimborso accise gasolio 2026`: intento reale, ma richiede manutenzione fiscale trimestrale e RouteBudget non determina l’agevolazione.
- `tariffa subvezione` e `carico di ritorno`: conversione interessante, ma sovrapposizione maggiore con costo completo, margine e ritorno a vuoto.
- overview generico `pedaggi camion Europa`: utile in futuro; prima viene pubblicata una risposta nazionale profonda e verificabile sul corridoio Austria.

## Gate di release

- tre canonical unici e zero query primaria duplicata;
- risposta diretta, fonti datate e claim di prodotto verificati;
- link da homepage, hub, pillar e contenuto contestuale;
- build, schema, sitemap, robots e link interni verdi;
- verifica live di HTTP, canonical e dati strutturati;
- reinvio sitemap articoli e richiesta di indicizzazione dei tre URL in Google Search Console.
