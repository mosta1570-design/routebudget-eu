# Ricerca SEO Round 8 — 18 agosto 2026

## Decisione editoriale

Tre nuove guide rispondono a compiti distinti svolti prima di quotare una missione:

1. `pedaggio camion Ungheria` — capire HU-GO per mezzi pesanti senza confonderlo con la e-vignette.
2. `pedaggio camion Danimarca` — stimare KmToll, classe CO₂ e ponti separati dopo l'uscita dall'Eurovignette.
3. `costo traghetto Calais Dover camion` — trasformare nolo freight, BAF ed ETS in un costo di missione verificabile.

Google Suggest in lingua e geografia italiana conferma la formulazione delle tre ricerche. Suggest prova che la frase viene proposta agli utenti, non fornisce volume mensile. Volume, CPC e keyword difficulty non sono disponibili e non vengono inventati.

## Evidenza e fonti

- Ungheria: [portale HU-GO](https://www.hu-go.hu/), [aumenti 2026 in due fasi](https://www.hu-go.hu/articles/article/toll-charge-to-increase-in-two-stages-from-2026-5) e [modifiche dal 1° maggio 2026](https://www.hu-go.hu/articles/article/information-on-changes-to-the-e-toll-system-effective-from-1-may-2026).
- Danimarca: [KmToll — quanto si paga](https://vejafgifter.dk/en/how-much-do-i-have-to-pay/), [tabella tariffaria ufficiale](https://vejafgifter.dk/media/rtopb53s/annex-b-tariff-table-_v12.pdf), [Storebælt business](https://storebaelt.dk/en/prices-and-discounts/business/) e [Øresund prices](https://www.oresundsbron.com/en/prices).
- Calais–Dover: [DFDS Freight route](https://www.dfds.com/it-it/traghetti-merci-e-logistica/rotte-e-orari/dover-calais) e [supplemento ETS DFDS](https://www.dfds.com/it-it/traghetti-merci-e-logistica/surcharge-ets). La tariffa base e i supplementi vanno verificati sul preventivo corrente; nessun prezzo medio viene presentato come universale.

Le richieste Suggest sono state controllate tramite endpoint pubblico Google con `hl=it&gl=it`: `pedaggio camion ungheria`, `pedaggio camion danimarca`, `costo traghetto calais dover camion`.

## Confini contro cannibalizzazione

- Ungheria possiede HU-GO, rete soggetta, assi/EURO/CO₂ e route ticket. Non replica la guida italiana o la e-vignette auto.
- Danimarca possiede KmToll e ponti; la guida Eurovignette conserva paesi, durata e tariffa temporale.
- Calais–Dover possiede il preventivo marittimo freight e i supplementi variabili; Sardegna e Sicilia conservano i rispettivi corridoi e listini.
- `pedaggio camion Italia` aggiorna `/it/guide/calcolo-pedaggio-camion/`; non riceve una nuova URL.
- `accise autotrasportatori 2026` non viene pubblicata: intento fiscale volatile e funzione assente nel prodotto.
- `indennità trasferta autisti camion` resta consolidata nella guida costo orario: RouteBudget riceve un costo orario verificato, non calcola diaria o payroll.

## Contratto di verità prodotto

RouteBudget non interroga i sistemi ufficiali, non assegna classe, non emette OBU o titoli e non paga pedaggi o traghetti. Il campo pedaggio manuale sostituisce la stima automatica dell'andata: va inserito una volta il totale verificato di tutte le voci attribuite all'andata. `Pedaggio ritorno` riguarda il ritorno a vuoto; un ritorno carico è una missione separata.

L'app stima durata, pause e usura dal proprio modello; non offre campi liberi per attese portuali, diaria o supplementi. Il PDF è una stima non vincolante con validità di 14 giorni. L'Archivio conserva il calcolo locale, non file PDF, contratti o versioni documentali.

## Rischio scaled content e criterio umano

Le due guide pedaggio devono avere strutture differenti: HU-GO centrata su route ticket e modifiche 2026; KmToll su CO₂, zone ambientali e ponti separati. Calais–Dover parte da un preventivo freight reale. Ogni articolo include fonti, data di verifica, esempi dichiarati, limiti e decisioni operative; nessuno riempie un template sostituendo il nome del Paese.
