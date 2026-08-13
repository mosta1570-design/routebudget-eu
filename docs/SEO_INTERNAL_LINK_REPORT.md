# RouteBudget EU — report internal linking

Verifica locale: 13 agosto 2026. Comando: `node scripts/verify-generated.mjs --scope links`.

## Risultato

- URL canoniche/indexabili nel grafo: **29**.
- Pagine contenuto: **24**.
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
| `tachigrafo-furgoni-2026` | homepage, hub, pillar costi, guida N1 | verificato nel grafo generato |
| `tabelle-costi-autotrasporto-mit-2026` | homepage, hub, pillar costi | verificato nel grafo generato |
| `pedaggio-camion-austria` | homepage, hub, pillar tratta, guida pedaggio Italia | verificato nel grafo generato |

I pillar restituiscono link ai supporti principali. Ogni guida supporto collega il proprio pillar; ogni pagina contenuto include il calcolatore dichiarato. Entrambi gli store appaiono come CTA dopo contenuto utile.

## Come viene misurato

Il gate legge HTML generato, risolve URL relative contro canonical origin, verifica il file locale destinazione e controlla ogni fragment contro un `id` reale. Costruisce poi il conteggio in ingresso su tutte le URL sitemap. Un’URL con zero ingressi fa fallire il comando.

Il numero assoluto di link non è un obiettivo editoriale. Navigazione, footer e relazioni contestuali non giustificano aggiungere destinazioni irrilevanti. La mappa curata resta in `SEO_INTERNAL_LINK_MAP.md`.
