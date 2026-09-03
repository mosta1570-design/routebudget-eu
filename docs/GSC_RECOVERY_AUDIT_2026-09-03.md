# RouteBudget GSC recovery audit — 3 September 2026

## Evidence-backed diagnosis

Latest 7 completed days versus previous 7: 0 vs 1 clicks, 36 vs 69 impressions, 0% vs 1.4% CTR, average position 41.8 vs 20.4.

The net loss is 33 impressions. One page, `/it/guide/costo-orario-autista-camion/`, lost 46 impressions while its average position improved from 2.5 to 1.5. Its previous exposure came mainly from unrelated queries such as `autista privato`, local private-driver searches and chauffeur-rental terms. Google stopped matching a truck-driver employment-cost guide to private-driver intent. This correction is larger than the total site loss and is the dominant measured cause.

Device split supports the same conclusion: desktop rose 21→31 impressions; mobile fell 47→5. The loss is not evidence of a confirmed mobile rendering defect because it is concentrated in the same mismatched query family.

## Remaining actionable deficit

- `tempi-pagamento-autotrasporto`: crawled, currently not indexed.
- `calcolo-costi-trasporto-camion-excel`: crawled, currently not indexed.
- `costo-autostrada-furgone`: discovered, currently not indexed.
- `preventivo-trasporto-pdf`: discovered, currently not indexed.

Current sitemap rows are successful. Root cache-busted sitemap read 2 September with 68 URLs. Child core, calculator, article and legal sitemaps report success. No evidence in this snapshot proves a sitemap fetch failure or site-wide penalty.

## Recovery change

Two established cost pillars now provide contextual inbound links to all four backlog URLs and to three new demand-led pages. This improves discovery paths without changing canonicals or creating duplicate sitemaps. New pages answer distinct Italian tasks and include original worksheets, formulas, worked examples, official sources and explicit product boundaries.

## Non-guarantees

Search Console data is delayed. Sitemap submission and URL inspection do not force indexing. No publisher can guarantee impressions or rankings. Success criterion is recovery of relevant Italian commercial queries, not restoration of irrelevant private-driver impressions.
