# RouteBudget EU — report internal linking

Verifica locale: 21 agosto 2026, dopo build Round 10. Comando: `node scripts/verify-generated.mjs --scope links`.

## Risultato

- URL canoniche/indexabili nel grafo: **50**.
- Pagine contenuto: **45** — 3 pillar, 38 guide, 3 calcolatori e 1 landing.
- Hub: **2**.
- Core/legal: homepage, privacy, termini.
- Broken href/src: **0**.
- Broken fragment: **0**.
- Orphan indexabili: **0**.
- Self-reference metadata: **0**.
- Reference verso draft/noindex: **0**.

## Copertura cluster

| Gruppo | Ingressi editoriali principali | Esito |
| --- | --- | --- |
| `pedaggio-camion-serbia-2026` | homepage, hub guide, guida pedaggi camion, guida BGTOLL | verificato nel grafo generato |
| `traghetto-camion-italia-grecia` | homepage, hub guide, guida traghetto Sardegna, guida Calais–Dover | verificato nel grafo generato |
| `pedaggio-camion-polonia-2026` | homepage, hub guide, guida pedaggi camion, guida MYTO Repubblica Ceca | verificato nel grafo generato |

I pillar restituiscono link ai supporti principali. Ogni guida supporto collega il proprio pillar. Le nuove pagine distinguono i compiti: categoria IV/TAG Serbia, quotazione cargo Italia–Grecia ed e-TOLL Polonia. RouteBudget riceve un costo già verificato e non viene presentato come sistema ufficiale di pedaggio, prenotazione o pagamento. Entrambi gli store appaiono come CTA dopo contenuto utile.

La sitemap articoli generata contiene **41 URL**; `legal.xml` 2, `calculators-it.xml` 3 e `core.xml` 4, per 50 URL complessive. Le tre nuove canonical sono presenti in `articles-it.xml`.

## Come viene misurato

Il gate legge HTML generato, risolve URL relative contro canonical origin, verifica il file locale destinazione e controlla ogni fragment contro un `id` reale. Costruisce poi il conteggio in ingresso su tutte le URL sitemap. Un’URL con zero ingressi fa fallire il comando.

Il numero assoluto di link non è un obiettivo editoriale. Navigazione, footer e relazioni contestuali non giustificano aggiungere destinazioni irrilevanti. La mappa curata resta in `SEO_INTERNAL_LINK_MAP.md`. Il gate prova raggiungibilità, non qualità semantica di ogni anchor né stato di indicizzazione Google.
