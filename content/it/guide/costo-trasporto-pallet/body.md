## Risposta diretta: il pallet non ha una tariffa nazionale unica

Il **costo di un trasporto pallet** non si ottiene moltiplicando il numero dei bancali per un prezzo trovato online. Prima si calcola il costo reale della missione; poi si attribuisce all'ordine la quota di linea, presa, consegna, movimentazione e rischio operativo che gli appartiene. Soltanto alla fine si divide per i pallet fatturabili, se quel dato serve al preventivo.

Il formato conta, ma non basta. EPAL indica per l'Euro pallet EPAL 1 una base di **800 × 1200 mm**. Due ordini con lo stesso numero di pallet possono però occupare spazio diverso, superare pesi diversi, richiedere sponda idraulica, avere consegne separate o non essere sovrapponibili. Un prezzo serio parte quindi dalla scheda reale della spedizione.

RouteBudget aiuta a stimare le voci supportate della tratta — chilometri, carburante o energia, pedaggi, tempo autista, ritorno e usura — e a confrontare scenari di prezzo. Non misura i pallet, non calcola peso volumetrico, non prenota groupage e non applica un listino €/pallet: queste informazioni restano nel controllo operativo dell'impresa.

## Scheda pallet prima del prezzo

Se la merce occupa molto spazio rispetto al peso, verifica il [calcolo del peso volumetrico](/it/guide/calcolo-peso-volumetrico/) prima di applicare la tariffa del vettore. Se manca il muletto, chiarisci il perimetro della [consegna con sponda idraulica](/it/guide/consegna-con-sponda-idraulica/). Per scegliere fra spazio condiviso e mezzo riservato, confronta il [costo del trasporto dedicato](/it/guide/costo-trasporto-dedicato/) sullo stesso livello di servizio.

Chiedi dati che cambiano davvero mezzo e costo. Una riga per ordine dovrebbe contenere almeno:

| Campo | Perché cambia il preventivo |
| --- | --- |
| Numero e formato | determina impronta e possibilità di disposizione |
| Lunghezza × larghezza × altezza | evita di trattare fuori sagoma come EPAL standard |
| Peso lordo per pallet e totale | verifica massa, distribuzione e capacità utile |
| Sovrapponibile: sì/no | modifica lo spazio realmente utilizzabile |
| Merce e imballaggio | può richiedere cautele, attrezzature o esclusioni |
| Indirizzi e accessi | influenza km, mezzo, ZTL e manovre |
| Orari di ritiro/consegna | può creare attese o impedire altri carichi |
| Sponda, transpallet, scambio pallet | aggiunge operazioni da confermare |
| Valore e requisiti speciali | richiede verifica assicurativa e documentale |

La scheda tecnica EPAL serve a identificare il supporto. Non certifica il peso della merce, la stabilità del carico o l'idoneità del veicolo. Quando il pallet è 1200 × 1000, mezzo pallet, CP o fuori sagoma, usa la dimensione effettiva invece di chiamarlo genericamente “un bancale”.

## Due casi economici da separare

### Mezzo dedicato

Il cliente occupa la missione. Costo e prezzo dipendono dall'intero giro, anche se restano metri di pianale vuoti. Il costo ordine parte da:

```text
costo missione = carburante + pedaggi + autista + usura + quote fisse attribuite
costo ordine = costo missione + prese/consegne + movimentazioni + costi speciali verificati
```

Dividere per i pallet è un indicatore commerciale, non il motore del costo:

```text
costo per pallet = costo ordine ÷ pallet fatturabili
```

Se il camion parte dedicato con 8 pallet, il denominatore è 8; non una capienza teorica più alta.

### Groupage o carico condiviso

Il cliente occupa solo parte del mezzo, ma la quota non coincide sempre con la superficie. Peso, volume, non sovrapponibilità, deviazione, terminal, doppia movimentazione e finestra oraria possono cambiare il costo. Definisci un'unità interna coerente — posto pallet equivalente, metro lineare, kg tassabile o regola del network — e non mischiarla nello stesso calcolo.

Una base gestionale trasparente può essere:

```text
quota ordine = quota linea attribuita
             + ritiro e consegna
             + movimentazioni
             + supplementi documentati
```

Il metodo di attribuzione deve essere replicabile e verificato sui consuntivi. Non pubblicare un coefficiente come “standard italiano” se nasce solo dalla tua rete.

## Dal costo della tratta al prezzo minimo

Usa RouteBudget per la base di missione supportata. Aggiungi fuori dall'app le voci pallet che non hanno un campo dedicato e conserva la prova. Poi scegli la convenzione del margine.

Se il margine desiderato è sul ricavo:

```text
prezzo minimo = costo ordine ÷ (1 − margine)
```

Se invece usi un ricarico sul costo:

```text
prezzo = costo ordine × (1 + ricarico)
```

Le formule non sono equivalenti. Con costo 1.000 € e percentuale 20%, il ricarico porta a 1.200 €, mentre il margine sul ricavo porta a 1.250 €. Scrivi quale convenzione usa l'impresa.

## Esempio ricalcolabile, non tariffa di mercato

Ipotizziamo una missione dedicata con **20 pallet fatturabili**. I numeri sono solo didattici:

- base tratta già controllata: 910 €;
- presa/consegna aggiuntiva: 65 €;
- movimentazioni documentate: 120 €;
- costo ordine: 1.095 €;
- margine desiderato sul ricavo: 15%.

```text
costo tecnico per pallet = 1.095 ÷ 20 = 54,75 €
prezzo ordine = 1.095 ÷ 0,85 = 1.288,24 €
prezzo indicativo per pallet = 1.288,24 ÷ 20 = 64,41 €
```

Se il cliente riduce l'ordine a 14 pallet ma il mezzo resta dedicato e la missione non cambia, non mantenere automaticamente 64,41 € per pallet. Ricalcola il costo dell'ordine: molte voci non scendono con il numero dei bancali.

## Controllo capacità: spazio, peso e ordine delle consegne

Prima di accettare:

1. disegna la disposizione con dimensioni reali, non con il solo numero di pallet;
2. verifica peso totale e distribuzione sugli assi con dati del mezzo;
3. considera pallet non sovrapponibili e necessità di accesso durante le consegne;
4. separa merce incompatibile o soggetta a requisiti specifici;
5. includi chilometri di posizionamento e ritorno, anche se non fatturati;
6. conferma attrezzature e scambio pallet con chi esegue il servizio.

L'area geometrica di un EPAL 1 è 0,96 m², ma moltiplicarla per il numero dei pallet non dimostra che il carico entra. Pareti, passaruota, schema di carico, sicurezza, altezza e massa restano vincoli reali.

## Attese e consegne multiple

Un ordine piccolo può essere costoso quando genera una deviazione o blocca il mezzo. Registra tempo previsto e franchigia concordata; non nascondere le attese in una tariffa media per pallet. La guida sui [tempi di attesa a carico e scarico](/it/guide/tempi-attesa-carico-scarico-autotrasporto/) separa misurazione operativa, documentazione e condizioni commerciali.

Per tre consegne, calcola ogni deviazione e finestra. Se il percorso cambia dopo l'offerta, crea una revisione. Il [confronto preventivo–consuntivo](/it/guide/preventivo-consuntivo-viaggio-camion/) aiuta a trasformare deviazioni, attese e vuoti in correzioni del modello futuro.

## Cosa mettere nel PDF

Il cliente deve poter ricostruire il perimetro, non la contabilità interna. Indica:

- quantità e formato dichiarati;
- peso totale dichiarato;
- sovrapponibilità, se rilevante;
- origine, destinazione e numero di soste;
- servizio dedicato o condiviso;
- attrezzature e movimentazioni incluse;
- trattamento dello scambio pallet;
- esclusioni per attese, variazioni o fuori sagoma;
- prezzo totale, valuta e validità.

Il PDF RouteBudget riepiloga la stima e lo scenario scelto, ma non dispone di campi strutturati per quantità pallet, dimensioni, cliente o condizioni personalizzate. Completa tali dati nel processo aziendale e controlla il documento prima dell'invio. La guida al [preventivo di trasporto PDF](/it/guide/preventivo-trasporto-pdf/) distingue ciò che l'app genera da ciò che resta esterno.

## Errori che bruciano margine

- Confondere pallet standard, industriale e fuori sagoma.
- Dividere per la capienza teorica quando il cliente usa un mezzo dedicato.
- Usare €/pallet senza chiarire dedicato o groupage.
- Ignorare peso, non sovrapponibilità o ordine delle consegne.
- Dimenticare ritiro, terminal, doppia movimentazione o sponda.
- Inserire due volte un costo già presente nella base tratta.
- Applicare margine solo alla linea e non ai costi accessori.
- Presentare un esempio online come tariffa nazionale corrente.

## Checklist prima dell'offerta

- [ ] Quantità, formato, misure e peso confermati.
- [ ] Sovrapponibilità e merce dichiarate.
- [ ] Mezzo dedicato o groupage esplicitato.
- [ ] Km completi, ritorno e deviazioni compresi.
- [ ] Attese e movimentazioni valorizzate una sola volta.
- [ ] Metodo di attribuzione documentato.
- [ ] Margine distinto dal ricarico.
- [ ] PDF coerente con dati e perimetro.
- [ ] Revisione prevista se cambiano quantità o servizio.

La domanda utile non è “quanto costa un pallet?”. È: **quanto costa servire questo ordine, con questi pallet, su questa missione?** RouteBudget rende leggibile la base della tratta; scheda carico e processo commerciale completano il preventivo.

## Fonti e limiti

Le [schede tecniche EPAL Italia](https://it.epal-pallets.org/centro-stampa/schede-tecniche/) documentano formati, non tariffe di trasporto. Le [tabelle MIT aggiornate a marzo 2026](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6) offrono valori indicativi per componenti del costo di esercizio: usale per controllo, non come prezzo automatico del bancale. Capacità, fissaggio, contratto, fiscalità e requisiti della merce richiedono verifica sul caso reale.
