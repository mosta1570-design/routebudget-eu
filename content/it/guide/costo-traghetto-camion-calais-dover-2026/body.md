## Costo traghetto camion Calais–Dover 2026: risposta breve

Chi cerca «costo traghetto Calais Dover camion» ha bisogno del **totale di una quotazione freight valida per data, direzione e unità**, non di un prezzo passeggeri. Quel totale va controllato insieme a BAF, ETS e supplementi, poi sommato ai costi delle due gambe stradali.

Usa questo schema:

`costo missione = strada fino al porto + totale mare verificato + strada dopo lo sbarco + costi operativi documentati`

Il totale mare, se le voci sono esposte separatamente, è:

`nolo base + BAF + ETS/FuelEU + port charge + altri supplementi applicabili`

Se l'offerta comprende già alcune componenti, non sommarle di nuovo. Nel 2026 BAF ed ETS cambiano mensilmente: usa il valore richiamato dalla quotazione freight, con data e validità. Non esiste quindi un “prezzo medio Calais–Dover” abbastanza preciso da proteggere il margine.

## Perché due camion sulla stessa nave possono costare diversamente

La tratta resta la stessa, ma l'unità commerciale no. Il prezzo può cambiare per:

- configurazione, lunghezza tariffata e direzione;
- giorno, capacità disponibile e accordo spot o contrattuale;
- mezzo pieno/vuoto e accompagnato/non accompagnato;
- reefer, merce pericolosa o unità fuori sagoma;
- persone aggiuntive, valuta e componenti incluse;
- modifica, mancata partenza o sosta del trailer.

La [pagina freight DFDS della rotta Dover–Calais](https://www.dfds.com/fr-fr/ferries-fret-et-logistique/routes-et-horaires/douvres-calais) distingue trailer, reefer, merci pericolose e trasporto accompagnato, rinvia a una richiesta di quotazione e segnala che possono applicarsi costi ulteriori. Questo è il punto: una tabella di supplementi aiuta a verificare il conto, ma non sostituisce il nolo assegnato al mezzo.

## Le righe che devi riconciliare prima di quotare il cliente

| Voce | Che cosa controllare | Errore frequente |
| --- | --- | --- |
| Nolo base | direzione, data, unità, lunghezza, pieno/vuoto e valuta | usare una tariffa auto o un prezzo di un'altra unità |
| BAF/MGO | mese, importo per lane metre e inclusione nel totale | riutilizzare il valore del mese precedente |
| ETS/FuelEU | mese, fascia EUA, unità di calcolo e inclusione | aggiungere la voce anche quando è già nel totale |
| Port charge | soglia di lunghezza e valuta | credere che ogni diritto portuale sia nel nolo |
| Autista/persone | primo conducente, secondo conducente e servizi | presumere che “accompagnato” includa tutto |
| Merce speciale | ADR/IMDG, reefer, animali o fuori sagoma | richiedere un prezzo standard per un carico non standard |
| Demurrage o modifica | franchigia, scaglioni e condizioni | ignorare il costo di un trailer fermo o di una variazione |
| Imposte e cambio | totale netto/lordo e politica valutaria interna | mescolare euro e sterline con un cambio non documentato |

Il prospetto ufficiale [DFDS Freight Surcharges 2026](https://assets.ctfassets.net/z860498abl84/7tc9ZRYcfXsFbKoDzE3Nzz/b12b41e7487d8961812487408d89ce61/Dover_Surcharges_2026.pdf) rende concrete alcune differenze. Per Dover–Calais indica, in euro, un port charge efficace dal 1° gennaio 2026 di 13 euro fino a 12 metri e 20 euro oltre 12 metri; riporta inoltre 12 euro per attraversamento con merce pericolosa e 10,90 euro per ogni persona oltre la prima. Le unità fuori sagoma e il demurrage seguono regole proprie.

Questi importi sono **singole voci pubblicate**, non il costo del traghetto. Vanno applicati soltanto quando il mezzo e la condizione rientrano nel prospetto e la quotazione non li ha già incorporati.

## BAF agosto 2026: dato di controllo, non tariffa annuale

BAF significa Bunker Adjustment Factor: adegua il costo del combustibile marittimo. DFDS lo calcola con un periodo di osservazione e lo aggiorna per il mese successivo.

La [tabella BAF DFDS](https://www.dfds.com/en/freight-ferries-and-logistics/surcharges/baf-surcharges) valida per agosto 2026 usa il periodo 20 giugno–20 luglio 2026. Per Dover–Calais, nella fascia corrispondente al valore MGO pubblicato, espone **3,09 euro per lane metre**. La pagina di rotta conferma 3,09 euro per agosto, dopo 3,27 euro in luglio.

Quel numero serve a verificare una quotazione di agosto. Non usarlo per settembre, come nolo completo, senza lane metres confermati, se il BAF è già incluso o con una valuta diversa senza cambio tracciato.

La formula di controllo è `lane metres accettati × BAF del mese`. La lunghezza da usare è quella riconosciuta dal vettore, non una misura scelta a memoria per tutti i bilici.

## ETS e FuelEU: perché la riga cambia ogni mese

L'EU ETS attribuisce un costo alle emissioni marittime coperte. La [Commissione europea](https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector_en) precisa che i viaggi tra un porto UE e un porto esterno all'UE ricadono nel sistema per il 50% delle emissioni della traversata; dal 2026 entrano nel perimetro anche metano e protossido di azoto per le navi interessate. Questo quadro normativo non permette a un trasportatore di calcolare da solo la surcharge commerciale del singolo imbarco.

DFDS aggiorna la propria [tabella ETS](https://www.dfds.com/en/freight-ferries-and-logistics/ets-surcharges) ogni mese usando la media del prezzo delle quote EUA nel periodo dichiarato. Per agosto 2026 la media pubblicata è 79,28 euro per allowance; la cella Dover–Calais della fascia 75,01–80,00 vale **0,54 euro per lane metre**. DFDS dichiara inoltre che dal 1° gennaio 2025 un premium FuelEU, calcolato sull'uso contrattualizzato di biocarburante per rotta, viene aggiunto alla surcharge ETS.

Anche 0,54 euro è una fotografia di agosto, non una promessa per una data futura. Chiedi sempre se la riga ETS/FuelEU è separata, inclusa nel nolo o aggiornata al momento della partenza.

## Check-in: il terminal aperto non elimina code e controlli

I terminal freight DFDS di Calais e Dover sono indicati come aperti 24 ore su 24. Non significa check-in senza cut-off, partenza garantita o attraversamento senza attesa. Il riferimento operativo resta la conferma freight: orario di presentazione, documenti, procedura per il carico e istruzioni del porto.

Non trasferire al camion un orario letto su una pagina passeggeri. Per una quotazione economica conserva almeno tre tempi distinti:

1. guida stradale fino al terminal;
2. finestra operativa tra arrivo, check-in, controlli, attesa, imbarco e sbarco;
3. guida dal porto di arrivo alla consegna.

Sul lato francese, il Port Boulogne Calais mette a disposizione [e-border](https://www.portboulognecalais.fr/en/cross-channel-freight/disembark-at-the-port-of-calais/with-e-border-organise-your-border-controls/): allo sbarco un camion o trailer può ricevere stato verde oppure arancione; nel secondo caso il conducente o il vettore deve seguire l'evoluzione dello stato prima di lasciare il porto. È una prova pratica del motivo per cui “tempo di navigazione” e “tempo produttivo della missione” non coincidono.

Attese, controlli e procedure doganali dipendono dal carico e dalla pratica. Non inventare una durata standard. Definisci internamente quale tempo è attribuibile, con quale costo autista e con quali condizioni lo ribalti al cliente.

## Le due gambe stradali non spariscono sul traghetto

Per un vettore italiano la missione può comprendere centinaia di chilometri prima di Calais e una seconda tratta da Dover alla destinazione britannica. Separa distanza, carburante, pedaggi, guida e pause sul continente; nolo e operazioni marittime; strada, tempo e usura nel Regno Unito; infine l'eventuale rientro vuoto o la nuova missione caricata.

Il [metodo completo per il costo di trasporto](/it/guide/calcolo-costo-trasporto/) aiuta a non fermarsi al nolo. Dividere il totale mare per i soli chilometri della tratta britannica può produrre un indicatore utile per quella gamba, ma non rappresenta il costo complessivo partito dall'Italia. Scegli prima l'unità di analisi: missione, chilometro totale oppure chilometro carico.

## Richiesta freight: dati minimi per un'offerta confrontabile

Invia la stessa scheda a ogni vettore o intermediario:

- Calais–Dover o Dover–Calais, sola andata o ritorno;
- data, finestra possibile e necessità di priorità;
- targa o tipo di unità richiesto dalla procedura;
- motrice e semirimorchio, solo trailer oppure altra configurazione;
- lunghezza, larghezza, altezza, peso e numero di assi;
- pieno o vuoto, accompagnato o non accompagnato;
- merce ordinaria, refrigerata, pericolosa, animale o fuori sagoma;
- numero di conducenti o persone;
- valuta desiderata e trattamento di IVA/imposte;
- richiesta esplicita di inclusioni, esclusioni e data di scadenza.

Poi crea una matrice: stesso mezzo, stessa direzione, stessa data, stessi servizi. Confrontare soltanto i totali di due e-mail è rischioso se una include BAF, ETS e port charge e l'altra li lascia fuori.

## Come attribuire il traghetto in RouteBudget senza falsare il dettaglio

RouteBudget **non prenota traghetti, non consulta tariffe cargo e non possiede campi dedicati a ferry, BAF, ETS, check-in o attese**. Calcola invece le voci supportate: distanza stradale, carburante, pedaggi, tempo autista derivato dalla guida e dalle pause, usura, ritorno e scenari di margine.

Prima prepara fuori dall'app un foglio per direzione con nolo, BAF, ETS/FuelEU, port charge, supplementi, valuta, fonte e validità. Se decidi di portare il totale mare dentro il calcolo attraverso **Pedaggio manuale**, ricorda la regola decisiva: quel valore sostituisce l'intera stima automatica dei pedaggi di andata.

Inserisci quindi una sola volta:

`Pedaggio manuale = tutti i pedaggi stradali verificati dell'andata + totale mare attribuito all'andata`

Non lasciare fuori i pedaggi francesi o italiani pensando che restino automatici. Non aggiungere di nuovo BAF ed ETS se il totale del fornitore li comprende. Se vuoi incorporare anche un costo operativo calcolato esternamente, annotalo nel foglio: nell'app resterà dentro una somma aggregata e non avrà un'etichetta marina dedicata.

**Pedaggio ritorno** serve al rientro vuoto e va compilato con il totale verificato della direzione di ritorno. Se il camion torna carico, crea una missione separata: cliente, ricavo, distanza e struttura economica sono diversi.

Il PDF RouteBudget è un riepilogo non vincolante, con validità preimpostata a 14 giorni. La riga manuale non separa nolo, BAF, ETS e port charge; conserva e, se necessario, allega la quotazione freight originale. L'Archivio salva lo snapshot del calcolo, non il PDF del vettore, la prenotazione o i documenti doganali. Per strutturare correttamente l'offerta usa anche la guida al [preventivo di trasporto PDF](/it/guide/preventivo-trasporto-pdf/).

## Errori che bruciano il margine sulla Manica

- copiare un prezzo passeggeri o auto;
- trattare BAF di agosto come valore annuale;
- chiamare “ETS” un importo non riconciliato con mese e lane metres;
- sommare BAF o ETS già inclusi nel totale;
- dimenticare port charge, ADR, fuori sagoma o seconda persona;
- usare la lunghezza fisica invece di quella accettata in quotazione;
- confondere terminal aperto 24/7 con assenza di cut-off o attesa;
- valutare solo la navigazione e non le due gambe stradali;
- mescolare sterline ed euro senza fonte e data del cambio;
- usare Pedaggio manuale lasciando fuori gli altri pedaggi dell'andata;
- inserire il ritorno sia nell'andata sia in Pedaggio ritorno;
- archiviare il calcolo ma perdere offerta, condizioni e scadenza del fornitore.

## Checklist prima di inviare il preventivo

- [ ] Quotazione freight per data, direzione e unità reali.
- [ ] Nolo base e totale finale distinti.
- [ ] Lane metres confermati dal fornitore.
- [ ] BAF del mese verificato e contato una volta.
- [ ] ETS/FuelEU verificato e contato una volta.
- [ ] Port charge e supplementi applicabili controllati.
- [ ] Valuta, imposte, inclusioni e scadenza annotate.
- [ ] Check-in freight e documenti confermati.
- [ ] Tempi operativi separati dalla sola guida stradale.
- [ ] Gamba continentale e gamba britannica calcolate.
- [ ] Andata e ritorno trattati come direzioni distinte.
- [ ] Dettaglio del fornitore conservato fuori da RouteBudget.
- [ ] Pedaggio manuale contiene tutti i pedaggi outbound e il mare una sola volta.

La risposta professionale non è un numero universale: è una quotazione freight datata, riconciliata e inserita nel costo completo prima del margine. Per misurare l'effetto unitario usa il [calcolatore del costo chilometrico camion](/it/calcolatori/costo-chilometrico-camion/); per rotte italiane più lunghe, consulta la guida al [traghetto camion Sardegna](/it/guide/costo-traghetto-camion-sardegna/).
