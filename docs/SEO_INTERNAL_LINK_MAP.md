# RouteBudget EU — mappa internal link

Data: 1 agosto 2026. Fonte: metadata validate in `content/it/**/meta.json`.

## Entry points

| Sorgente | Destinazioni HTML principali |
| --- | --- |
| Homepage statica | hub guide, hub calcolatori, landing app, privacy, termini, store |
| Hub guide | tutti i 3 pillar e gli 8 supporti |
| Hub calcolatori | entrambi i calcolatori |
| Header/footer SEO | homepage, hub guide, hub calcolatori, landing app, privacy, termini |
| Landing app | 3 pillar, 2 calcolatori, entrambi gli store |

## Cluster costo tratta

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/calcolo-costo-trasporto/` | — | costo/km | costi, preventivo, costi diretti, margine, ritorno a vuoto, due calcolatori |
| `guide/calcolare-carburante-pedaggi-autista/` | calcolo costo | carburante | costo/km, margine, entrambi i tool |
| `guide/ritorno-a-vuoto-autotrasporto/` | calcolo costo | costo/km | costo/km guida, margine, due tool |
| `guide/proteggere-margine-tratta/` | calcolo costo | costo/km | preventivo, errori tariffa, costo/km |
| `calcolatori/costo-carburante-viaggio/` | calcolo costo | costo/km adiacente | costi diretti, margine, pillar |

## Cluster costi autotrasporto

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/costi-autotrasporto/` | — | costo/km | fissi/variabili, costo/km storico, usura, altri pillar |
| `guide/costi-fissi-variabili-autotrasporto/` | costi autotrasporto | costo/km | costo/km, margine, errori tariffa |
| `guide/costo-chilometrico-camion/` | costi autotrasporto | costo/km | fissi/variabili, costi diretti, margine |
| `guide/usura-manutenzione-camion/` | costi autotrasporto | costo/km | fissi/variabili, costo/km, costo tratta |
| `calcolatori/costo-chilometrico-camion/` | calcolo costo | carburante adiacente | guida costo/km, fissi/variabili, pillar |

## Cluster preventivi

| URL | Pillar in uscita | Calcolatore | Relazioni principali |
| --- | --- | --- | --- |
| `guide/preventivo-trasporto/` | — | costo/km | costo tratta, costi, margine, errori, PDF, due tool |
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
