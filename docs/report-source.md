# RouteBudget Italian demand release — canonical research report

Date: 2026-09-03  
Market: Italy  
Property: `sc-domain:routebudget.eu`

## Executive finding

Measured visibility loss is dominated by removal of irrelevant private-driver query exposure, not a confirmed technical penalty. Recovery work therefore targets relevant Italian carrier intent, crawl support for four backlog pages and zero-overlap ownership for three new guides.

## Claim–source ledger

| Claim | Source | Role | Confidence |
| --- | --- | --- | --- |
| Exact Italian demand wording exists for the three selected queries | Google Suggest requests with `hl=it&gl=it`; raw payloads stored in `SEO_DEMAND_EVIDENCE_ROUND_17_2026-09-03.json` | directional demand | high for wording; no volume inference |
| EPAL 1 is 800 × 1200 mm | EPAL Italia technical sheets | primary industry source | high |
| MIT updated Italian road-haulage cost references in March 2026, including insurance, energy and tolls | MIT cost-reference page dated 17 March 2026 | primary public source | high |
| Current ATP version is valid from 25 August 2026 | UNECE ATP text/status page | treaty custodian | high |
| Italy maintains ATP test stations and experts | MIT ATP technical-control page | primary public source | high |
| Food transport requires appropriate hygiene and, when needed, temperature maintenance/control | EUR-Lex Regulation (EC) 852/2004 | primary law | high |
| 2026 Monte Bianco Italian-side class 3/4 prices and return validity | TMB-GEIE 2026 service charter | official operator | high as of access date |
| Tunnel closure schedules are forecast, mutable and require current checking | TMB-GEIE January–August 2026 forecast calendar | official operator | high for process; dates expired |
| 7-day decline is driven by private-driver mismatch correction | Authenticated GSC page/query/device comparison recorded in `GSC_RECOVERY_AUDIT_2026-09-03.md` | first-party property data | high for observed correlation; Google does not publish private cause label |

## Selection logic

1. Inspect first-party Search Console before proposing content.
2. Reject recovered visibility that came from wrong intent.
3. Require exact Italian Suggest wording; preserve volume as unknown.
4. Check canonical inventory and keyword map for collision.
5. Require direct carrier decision, original calculation asset and official supporting source.
6. State what RouteBudget does and does not do.
7. Add two contextual inbound links and verify build, canonical, structured data and sitemap.

## Chosen pages

- `costo trasporto pallet`: carrier-side allocation from complete mission cost; not a marketplace tariff page.
- `costo trasporto refrigerato`: two-counter method using vehicle km and refrigeration-unit hours; not a generic surcharge page.
- `costo traforo monte bianco camion`: official 2026 class/ticket decision; not a broad France toll duplicate.

## Rejected pages

- `costo trasporto al quintale`: overlaps unit allocation in pallet page.
- `quanto costa mantenere un camion`: overlaps established complete-cost pillars.
- `costo traforo frejus camion`: valid later candidate, rejected this round to avoid template repetition and corridor dilution.

## Sources

- https://it.epal-pallets.org/centro-stampa/schede-tecniche/
- https://www.mit.gov.it/documentazione/valori-indicativi-di-riferimento-dei-costi-di-esercizio-dellimpresa-italiana-di-6
- https://unece.org/transport/road-transport/text-and-status-agreement
- https://www.mit.gov.it/index.php/documentazione/trasporto-merci-deperibili-atp-stazioni-di-prova-ed-esperti-per-i-controlli-tecnici
- https://eur-lex.europa.eu/eli/reg/2004/852/oj/ita
- https://www.tunnelmb.net/public/files/301/01-carta-dei-servizi-ita-2026.pdf
- https://tunnelmb.net/public/files/46577/23-gennaio-agosto-10-app-2025.pdf

## Limitations

Google Suggest is directional and carries no defensible monthly volume. Search Console data is delayed. Operator tariffs and road access can change. Indexing and ranking remain Google decisions; this release removes known technical/content obstacles but does not promise a numerical outcome.
