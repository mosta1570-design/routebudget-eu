# RouteBudget EU — report internal linking

Verifica locale: 1 agosto 2026. Comando: `node scripts/verify-generated.mjs --scope links`.

## Risultato

- URL canoniche/indexabili nel grafo: **19**.
- Pagine contenuto: **14**.
- Hub: **2**.
- Core/legal: homepage, privacy, termini.
- Collegamenti interni unici per coppia sorgente→destinazione: **190**.
- Minimo link in ingresso, homepage esclusa: **2**.
- Broken href/src: **0**.
- Broken fragment: **0**.
- Orphan indexabili: **0**.
- Self-reference metadata: **0**.
- Reference verso draft/noindex: **0**.

## Copertura cluster

| Gruppo | Link in ingresso alle nuove pagine | Esito |
| --- | ---: | --- |
| `preventivo-trasporto-pdf` | 2 | pillar + hub |
| `ritorno-a-vuoto-autotrasporto` | 2 | pillar + hub |
| `usura-manutenzione-camion` | 2 | pillar + hub |
| landing `app-per-autotrasportatori` | 16 | homepage, hub, header/footer contenuti |

I pillar restituiscono link ai supporti principali. Ogni guida supporto collega il proprio pillar; ogni pagina contenuto include il calcolatore dichiarato. Entrambi gli store appaiono come CTA dopo contenuto utile.

## Come viene misurato

Il gate legge HTML generato, risolve URL relative contro canonical origin, verifica il file locale destinazione e controlla ogni fragment contro un `id` reale. Costruisce poi il conteggio in ingresso su tutte le URL sitemap. Un’URL con zero ingressi fa fallire il comando.

Il numero 190 non è un obiettivo editoriale. Include navigazione, footer e relazioni contestuali; non giustifica aggiungere link irrilevanti. La mappa curata resta in `SEO_INTERNAL_LINK_MAP.md`.
