# RouteBudget EU — report internal linking

Verifica locale: 20 agosto 2026, dopo build Round 9. Comando: `node scripts/verify-generated.mjs --scope links`.

## Risultato

- URL canoniche/indexabili nel grafo: **47**.
- Pagine contenuto: **42** — 3 pillar, 35 guide, 3 calcolatori e 1 landing.
- Hub: **2**.
- Core/legal: homepage, privacy, termini.
- Broken href/src: **0**.
- Broken fragment: **0**.
- Orphan indexabili: **0**.
- Self-reference metadata: **0**.
- Reference verso draft/noindex: **0**.

## Copertura cluster

| Gruppo | Link in ingresso alle nuove pagine | Esito |
| --- | ---: | --- |
| `bgtoll-camion-bulgaria-2026` | **4**: homepage, hub guide, guida pedaggio Italia, guida Ungheria | verificato nel grafo generato |
| `quanto-consuma-un-furgone` | **7**: homepage, landing app, hub, pillar costi, costo furgone/km, costo autostrada furgone, consumo camion | verificato nel grafo generato |
| `costo-autostrada-furgone` | **6**: homepage, landing app, hub, pillar costi, costo furgone/km, guida pedaggio camion | verificato nel grafo generato |

I pillar restituiscono link ai supporti principali. Ogni guida supporto collega il proprio pillar. Le pagine camion dichiarano il calcolatore pertinente; le due nuove guide N1 usano `relatedCalculator: null` e convertono verso il flusso N1 reale nell'app, evitando di presentare un tool web camion come equivalente. Entrambi gli store appaiono come CTA dopo contenuto utile.

La sitemap articoli generata contiene **38 URL**; `legal.xml` 2, `calculators-it.xml` 3 e `core.xml` 4, per 47 URL complessive. Le tre nuove canonical sono presenti in `articles-it.xml`.

## Come viene misurato

Il gate legge HTML generato, risolve URL relative contro canonical origin, verifica il file locale destinazione e controlla ogni fragment contro un `id` reale. Costruisce poi il conteggio in ingresso su tutte le URL sitemap. Un’URL con zero ingressi fa fallire il comando.

Il numero assoluto di link non è un obiettivo editoriale. Navigazione, footer e relazioni contestuali non giustificano aggiungere destinazioni irrilevanti. La mappa curata resta in `SEO_INTERNAL_LINK_MAP.md`. Il gate prova raggiungibilità, non qualità semantica di ogni anchor né stato di indicizzazione Google.
