## Risposta diretta: usa il dato che rappresenta come comprerai il gasolio

Nel preventivo di un autotrasportatore, il **prezzo del gasolio** non dovrebbe essere il primo numero trovato online. Se disponi di fatture o rendiconti recenti della carta carburante, usa il costo medio aziendale coerente con il rifornimento previsto. Se quel dato manca, una media pubblica MIMIT può diventare un riferimento trasparente, scegliendo però fra rete stradale e autostradale. La serie mensile MASE serve invece soprattutto quando un contratto richiama un indice mensile: non è automaticamente il prezzo da inserire in ogni singolo viaggio.

La regola pratica è questa: **dato aziendale per stimare il costo reale, dato pubblico per costruire un'ipotesi verificabile, serie contrattuale per applicare la regola concordata**. Qualunque scelta va salvata con data, unità e trattamento IVA. RouteBudget non recupera prezzi live: il valore viene inserito dall'utente e resta quindi tua responsabilità documentarlo.

## Tre valori simili, tre domande diverse

Prima di compilare il preventivo, chiarisci quale domanda stai cercando di risolvere.

| Valore disponibile | Quando è adatto | Limite da dichiarare |
| --- | --- | --- |
| Fattura, carta carburante o accordo flotta | Stima interna del costo che l'impresa sostiene davvero | Può essere netto IVA, includere sconti o cambiare da una rete all'altra |
| Media giornaliera MIMIT | Preventivo spot quando manca un dato aziendale recente; confronto indipendente | È una media nazionale, non il prezzo garantito al prossimo distributore |
| Media mensile MASE | Base di confronto per una clausola che richiama quella serie | Ha frequenza e unità diverse da un prezzo giornaliero o da una fattura |

I [valori indicativi MIT dei costi di esercizio](https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6) sono utili come controllo esterno delle categorie di costo. Non sostituiscono però il prezzo acquistato dalla tua azienda e non sono una tariffa universale da copiare nel preventivo.

## Come scegliere il prezzo in quattro casi reali

### 1. Hai uno storico aziendale recente

Calcola un prezzo medio ponderato sui litri, non la media semplice delle cifre in fattura:

`prezzo medio = costo complessivo del gasolio ÷ litri complessivi`

Usa un periodo abbastanza vicino alla partenza e rappresentativo della rete su cui rifornisci. Se una carta flotta mostra due rifornimenti da 300 e 700 litri, il secondo deve pesare più del primo. Conserva documento e periodo; una cifra memorizzata “a occhio” non è controllabile quando il margine si riduce.

### 2. Il preventivo è urgente e non hai uno storico affidabile

Usa la [media nazionale MIMIT](https://www.mimit.gov.it/it/prezzi-carburanti-media-nazionale), indicando giorno, prodotto e canale. Il **22 agosto 2026**, la pagina ufficiale consultata riportava per il gasolio self una media di **2,128 €/L sulla rete stradale** e **2,200 €/L sulla rete autostradale**. Sono valori datati, non una tariffa permanente: prima di riusarli va controllata di nuovo la fonte.

La distinzione conta. Se il mezzo parte con serbatoio pieno da una base convenzionata, la media autostradale può sovrastimare il tuo costo. Se il viaggio richiede rifornimenti quasi esclusivamente in autostrada, usare la sola media stradale può lasciare una voce sottostimata.

### 3. Vuoi controllare una zona o un impianto

Il MIMIT pubblica anche gli [open data dei prezzi praticati dagli impianti](https://www.mimit.gov.it/index.php/it/open-data/elenco-dataset/carburanti-prezzi-praticati-e-anagrafica-degli-impianti). Possono aiutare a verificare la plausibilità del prezzo lungo il percorso. Un prezzo comunicato non garantisce però disponibilità, deviazione conveniente o condizioni della tua carta. Per il preventivo serve un'ipotesi operativa, non una falsa precisione sul distributore che l'autista userà fra alcuni giorni.

### 4. Il contratto prevede un aggiornamento periodico

Segui la fonte, il mese base e la frequenza scritti nel contratto. Il [MASE pubblica una serie mensile](https://sisen.mase.gov.it/dgsaie/prezzi-mensili-carburanti) espressa in euro per 1.000 litri: per ottenere euro al litro si divide per 1.000. Non mescolare quella media con il MIMIT giornaliero a metà del calcolo. Per soglia, quota esposta e decorrenza consulta la guida alla [clausola di adeguamento carburante](/it/guide/clausola-adeguamento-carburante-autotrasporto/) e il [calcolatore fuel surcharge](/it/calcolatori/fuel-surcharge-autotrasporto/).

## Esempio datato: lo stesso viaggio cambia di 14,28 euro

Esempio illustrativo, non tariffa consigliata. Un camion deve percorrere 640 km e il consumo operativo stimato è 31 L/100 km.

`litri previsti = 640 ÷ 100 × 31 = 198,4 L`

Applicando i due valori MIMIT self consultati il 22 agosto 2026:

| Ipotesi | Calcolo | Costo gasolio |
| --- | ---: | ---: |
| Rete stradale, 2,128 €/L | 198,4 × 2,128 | 422,20 € |
| Rete autostradale, 2,200 €/L | 198,4 × 2,200 | 436,48 € |
| Differenza | 198,4 × 0,072 | 14,28 € |

La differenza non dimostra quale prezzo sia “giusto”. Mostra perché l'ipotesi deve seguire il piano di rifornimento. Se il tuo rendiconto aziendale, confrontabile e recente, indica un costo diverso, quello può descrivere meglio la missione. Se prevedi andata carica e ritorno a vuoto, stima separatamente distanza e consumo: un solo consumo medio può nascondere il cambiamento.

L'esempio conserva i tre decimali pubblicati dal MIMIT. Il [calcolatore web del costo carburante](/it/calcolatori/costo-carburante-viaggio/) accetta questa precisione e permette di verificare litri e aritmetica. Nell'app nativa il prezzo viene invece memorizzato in centesimi per litro: **2,128 €/L diventa 2,13 €/L**. Con 198,4 litri il costo visualizzato sarebbe quindi 422,59 €, cioè 0,39 € in più rispetto al calcolo sulla fonte a tre decimali. Non presentare i due risultati come identici; il risultato resta una stima costruita sugli input effettivamente salvati.

## Lordo, netto IVA e benefici riconosciuti: non mischiarli

Il prezzo esposto alla pompa è normalmente lordo. Una fattura o un rendiconto gestionale può mostrare imponibile, IVA e totale; le tabelle aziendali possono conservare soltanto il netto. Prima del confronto scrivi accanto al valore una delle due etichette:

- **lordo IVA**, se stai ragionando sull'esborso totale;
- **netto IVA**, se il modello economico tratta l'imposta separatamente.

Non confrontare 2,128 €/L lordi con un prezzo flotta netto e concludere che la carta fa risparmiare l'intera differenza. Porta prima i valori sullo stesso perimetro. Anche eventuali benefici fiscali, crediti d'imposta o accise riconosciute vanno registrati separatamente dal prezzo fisico del rifornimento. Ammissibilità, periodo e importo richiedono documentazione e verifica professionale.

RouteBudget non calcola crediti fiscali, recuperi d'accisa o requisiti di accesso. Inserire nel campo carburante un prezzo già ridotto da un beneficio non ancora riconosciuto può trasformare un possibile vantaggio futuro in un margine immaginario.

## Metodo operativo per una piccola impresa

Una procedura di cinque minuti riduce errori e discussioni:

1. **Definisci la missione.** Distanza, ritorno, consumo previsto e zone di rifornimento.
2. **Prendi il dato migliore disponibile.** Rendiconto flotta recente; in mancanza, fonte pubblica coerente.
3. **Normalizza il valore.** Stessa unità, stesso trattamento IVA, stesso prodotto.
4. **Salva la prova.** Documento o URL, data di consultazione, valore e motivo della scelta.
5. **Calcola la tratta.** Inserisci prezzo, consumo e chilometri; aggiungi poi pedaggi, costo autista, usura e margine.
6. **Fai uno scenario prudente.** Confronta il prezzo scelto con un valore più alto plausibile prima di inviare.
7. **Dichiara la validità.** Nel preventivo indica fino a quando resta valida l'ipotesi economica.

Nel [calcolo completo del costo di trasporto](/it/guide/calcolo-costo-trasporto/) il gasolio è una voce, non il prezzo finale. RouteBudget usa il valore inserito per stimare la tratta e può generare un PDF di stima da condividere. Non legge fatture, carte carburante o portali ministeriali e non certifica il costo.

## Preventivo e fuel surcharge non sono lo stesso calcolo

Questa pagina risponde a “quale prezzo al litro inserisco oggi?”. Il fuel surcharge risponde invece a “come varia una quota del corrispettivo rispetto a una base concordata?”. Confondere i due passaggi produce tre errori frequenti:

- usare la variazione percentuale del mese come nuovo prezzo al litro;
- applicare il prezzo spot MIMIT a un contratto che indica la serie mensile MASE;
- aggiungere due volte l'aumento, prima nel costo viaggio e poi nel corrispettivo.

Prima calcola il costo operativo con un prezzo coerente. Poi, soltanto se il rapporto lo prevede e il meccanismo è verificato, tratta separatamente l'adeguamento contrattuale. Il calcolatore web mostra matematica; non interpreta il contratto e non stabilisce un diritto all'addebito.

## Checklist prima di inviare il PDF

- [ ] Prezzo, data e fonte sono salvati.
- [ ] Rete stradale, autostradale o dato flotta corrispondono al piano di rifornimento.
- [ ] Euro/litro ed euro/1.000 litri non sono stati confusi.
- [ ] Valori lordi e netti IVA sono confrontati sullo stesso perimetro.
- [ ] Consumo e distanza includono il ritorno previsto.
- [ ] Benefici fiscali non ancora riconosciuti non riducono il costo operativo.
- [ ] Pedaggi, autista, usura e margine sono calcolati come voci separate.
- [ ] Il PDF identifica una stima, non una tariffa ministeriale.
- [ ] La validità temporale del preventivo è leggibile.
- [ ] Eventuale fuel surcharge segue la fonte del contratto, non questa scelta spot.

## Metodo e data delle fonti

Pagina verificata il **22 agosto 2026** sulle fonti ufficiali MIMIT per medie nazionali e open data giornalieri, sulla serie mensile MASE e sulla pubblicazione MIT dei costi di esercizio aggiornata il 17 marzo 2026. I valori di 2,128 e 2,200 €/L fotografano la consultazione del 22 agosto: possono cambiare e vanno ricontrollati prima di un nuovo preventivo. Esempio, formule e scenario sono originali e servono a mostrare l'effetto della scelta dell'input, non a proporre un prezzo di vendita.
