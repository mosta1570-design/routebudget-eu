# Ricerca SEO Round 9 — 20 agosto 2026

## Decisione editoriale

Il Round 9 assegna tre nuovi intenti italiani a tre URL separati:

1. `BGTOLL camion` — preparare i dati del mezzo, usare il sistema ufficiale bulgaro e attribuire il pedaggio verificato alla missione;
2. `quanto consuma un furgone` — misurare o prevedere il consumo N1 per energia, carico e allestimento;
3. `costo autostrada furgone` — distinguere categoria N1 e classe tariffaria italiana, verificare il pedaggio e riportarlo una sola volta nel costo.

La decisione combina utilità distinta, compatibilità con il prodotto e wording osservato. Non deriva da un obiettivo numerico di traffico e non garantisce indicizzazione o ranking.

## Evidenza Google Suggest

Le richieste sono state eseguite il 20 agosto 2026 sull'endpoint pubblico Google Suggest con `client=firefox`, `hl=it` e `gl=it`. Il file machine-readable è [SEO_DEMAND_EVIDENCE_ROUND_9_2026-08-20.json](./SEO_DEMAND_EVIDENCE_ROUND_9_2026-08-20.json).

| Seed | Risposta utile osservata | Lettura ammessa |
| --- | --- | --- |
| `bgtoll camion` | `bgtoll camion` | Il wording branded-operativo viene suggerito in contesto italiano |
| `quanto consuma un furgone` | exact match; diesel, elettrico, Ducato, frigo e cassonato | Esistono sotto-problemi coerenti per energia e allestimento |
| `costo autostrada furgone` | exact match; `calcolo costo autostrada furgone` | Il compito classe + pedaggio del furgone è formulato separatamente |

Google Suggest è **evidenza direzionale**, non volume mensile. Volume, CPC e keyword difficulty non sono disponibili e non vengono stimati. La presenza di una suggestion non dimostra quante ricerche avvengono né assicura traffico futuro.

## Baseline Search Console

La fotografia operativa 1–18 agosto registra 23 clic, 1.741 impressioni, CTR 1,3% e posizione media 15,5. I dati completi disponibili sono riportati in [GSC_BASELINE_2026-08-20.md](./GSC_BASELINE_2026-08-20.md). Non sono stati forniti breakdown query/URL sufficienti per attribuire volume GSC ai tre nuovi intenti; Suggest resta quindi un segnale di formulazione, non una misura quantitativa.

## Confini contro cannibalizzazione

- `BGTOLL camion` possiede Bulgaria, Route Pass, fascia di massa, assi, EURO/CO₂ e percorso dichiarato. `calcolo-pedaggio-camion` conserva classi e metodo italiano; Ungheria conserva HU-GO; Repubblica Ceca conserva MYTO CZ.
- `quanto-consuma-un-furgone` possiede L/100 km, km/l o kWh/100 km dei veicoli N1 e i fattori che alterano il consumo. `costo-furgone-per-km` conserva spese fisse, ore, manutenzione, chilometri vuoti e costo completo in €/km. `quanto-consuma-un-camion` resta dedicata ai pesanti.
- `costo-autostrada-furgone` possiede classi A/B italiane e il controllo del pedaggio per il furgone. Non diventa una seconda guida generale al costo N1 e non trasferisce automaticamente classi o tariffe camion.

Il precedente candidato duplicato viene eliminato dalla pianificazione: l'owner già pubblicato è `/it/guide/ritorno-a-vuoto-autotrasporto/`.

## Contratto di verità prodotto

RouteBudget non interroga BGTOLL o i concessionari italiani, non compra Route Pass, non assegna automaticamente la classe ufficiale e non promette un pedaggio esatto. Per i pesanti usa una stima operativa; l'utente può sostituirla con il totale verificato. Nel flusso N1 i sistemi supportati e i casi manuali dipendono dal registro dell'app: una fonte ufficiale resta necessaria.

Il profilo N1 supporta diesel, benzina, GPL, CNG ed elettrico, oltre a massa, assi, allestimento e rimorchio. I contenuti possono spiegare come portare consumo e pedaggio nel breakdown, ma non devono presentare un valore WLTP, un esempio o una tariffa esterna come dato universale. Il PDF è una stima non vincolante; l'Archivio conserva localmente il calcolo, non un contratto o un archivio cloud di PDF.

## Fonti primarie operative

- BGTOLL: [condizioni Route Pass](https://web.bgtoll.bg/Content/tc/termsandconditions.html?languageCultureName=en-GB), [calcolatore ufficiale](https://tollc.bgtoll.bg/) e [decreto tariffario 2026](https://dv.parliament.bg/DVWeb/showMaterialDV.jsp?idMat=243642).
- Consumi N1: [Fiat Ducato termico](https://www.fiat.it/professional/modello/ducato-termico), [Fiat E-Ducato](https://www.fiat.it/professional/modello/ducato-elettrico) e [simulatore Renault Professional](https://professional.renault.it/veicoli-commerciali/trafic-van/simulatore-autonomia.html).
- Autostrada furgone: [classi di pedaggio](https://www.autostrade.it/it/servizi-al-cliente/pedaggio/classi-di-pedaggio), [metodo di calcolo](https://www.autostrade.it/it/il-pedaggio/come-si-calcola-il-pedaggio) e [strumento percorso/pedaggio](https://viabilita.autostrade.it/it/viabilita/traffico).

## Risultato atteso della release

Dopo build: 42 pagine contenuto — 3 pillar, 35 guide di supporto, 3 calcolatori e 1 landing. `articles-it.xml` passa da 35 a 38 URL; il totale indexabile passa da 44 a 47. Questi sono conteggi tecnici attesi, non stato di indicizzazione Google.
