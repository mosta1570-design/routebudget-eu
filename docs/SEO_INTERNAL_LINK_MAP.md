# RouteBudget EU — mappa internal link

Data: 11 agosto 2026. Fonte: metadata validate in `content/it/**/meta.json`.

## Entry points

| Sorgente | Destinazioni HTML principali |
| --- | --- |
| Homepage statica | hub guide, hub calcolatori, landing app, privacy, termini, store |
| Hub guide | tutti i 3 pillar e gli 11 supporti |
| Hub calcolatori | tutti i 3 calcolatori |
| Header/footer SEO | homepage, hub guide, hub calcolatori, landing app, privacy, termini |
| Landing app | 3 pillar, 3 calcolatori, entrambi gli store |

## Cluster costo tratta

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/calcolo-costo-trasporto/` | — | costo/km | costi, preventivo, costi diretti, margine, ritorno a vuoto, tre calcolatori |
| `guide/calcolare-carburante-pedaggi-autista/` | calcolo costo | carburante | costo/km, margine, entrambi i tool |
| `guide/quanto-consuma-un-camion/` | calcolo costo | carburante | costi diretti, fissi/variabili, calcolatore carburante |
| `guide/calcolo-pedaggio-camion/` | calcolo costo | costo/km | costi diretti, costo/km storico, calcolatore costo/km |
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
| `guide/costo-furgone-per-km/` | costi autotrasporto | costo/km | fissi/variabili, ritorno a vuoto, margine |
| `guide/usura-manutenzione-camion/` | costi autotrasporto | costo/km | fissi/variabili, costo/km, costo tratta |
| `calcolatori/costo-chilometrico-camion/` | calcolo costo | carburante adiacente | guida costo/km, fissi/variabili, fuel surcharge, pillar, landing app |

## Cluster preventivi

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/preventivo-trasporto/` | — | costo/km | costo tratta, costi, margine, errori, PDF, tre tool |
| `guide/errori-calcolo-tariffa-trasporto/` | preventivo | costo/km | costo tratta, margine, costi diretti |
| `guide/preventivo-trasporto-pdf/` | preventivo | costo/km | costo tratta, errori tariffa, margine |

## Regole automatiche

- reference non risolta: build fallisce;
- self-link metadata: build fallisce;
- supporto senza pillar o senza calcolatore: build fallisce;
- pagina pubblicata verso draft/noindex: build fallisce;
- href/src o fragment rotto: `seo:links` fallisce;
- route senza link in ingresso: `seo:links` fallisce;
- ogni contenuto richiede entrambi i CTA store e badge ufficiali.

La mappa descrive destinazioni, non impone anchor exact-match. Anchor restano editoriali e variati.

## Gate internal link per la release 11 agosto

Gate soddisfatto. Le tre nuove guide ricevono link dal hub `/it/guide/` e dalle relazioni curate dei pillar; restituiscono link a pillar, calcolatore e contenuti correlati:

- `calcolo-costo-trasporto` → `quanto-consuma-un-camion` e `calcolo-pedaggio-camion`;
- `costi-autotrasporto` → `costo-furgone-per-km`;
- homepage → tutte e tre le nuove guide.

Il controllo generato deve continuare a chiudere con zero URL orfani e zero link o frammenti rotti.
