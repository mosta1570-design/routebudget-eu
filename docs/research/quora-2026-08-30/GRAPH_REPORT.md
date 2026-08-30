# Graph Report - .  (2026-08-30)

## Corpus Check
- Corpus is ~1,656 words - fits in a single context window. You may not need a graph.

## Summary
- 43 nodes · 39 edges · 9 communities
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Driver Time Pricing|Driver Time Pricing]]
- [[_COMMUNITY_Trip Profitability and N1|Trip Profitability and N1]]
- [[_COMMUNITY_Fixed Cost Allocation|Fixed Cost Allocation]]
- [[_COMMUNITY_Tire Risk and Double Counting|Tire Risk and Double Counting]]
- [[_COMMUNITY_Fuel Surcharge and Fleet Data|Fuel Surcharge and Fleet Data]]
- [[_COMMUNITY_Evidence and Safe Migration|Evidence and Safe Migration]]
- [[_COMMUNITY_Waiting Cost Evidence|Waiting Cost Evidence]]
- [[_COMMUNITY_Estimate versus Actual|Estimate versus Actual]]
- [[_COMMUNITY_Research Consent|Research Consent]]

## God Nodes (most connected - your core abstractions)
1. `Allocate fixed costs by operating days or committed hours` - 6 edges
2. `Detailed tire cost-per-kilometer model` - 5 edges
3. `Current scenario pricing model` - 4 edges
4. `Internal driver cost` - 3 edges
5. `Driver time cost spans receipt through delivery, including loading, unloading, and waiting` - 3 edges
6. `Opt-in, backward-compatible migration for detailed costing models` - 3 edges
7. `RouteBudget` - 2 edges
8. `Assess load profitability and minimum acceptable price before acceptance` - 2 edges
9. `Armando` - 2 edges
10. `Fixed transport cost items` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Opt-in, backward-compatible migration for detailed costing models` --conceptually_related_to--> `Allocate fixed costs by operating days or committed hours`  [INFERRED]
  RouteBudget_Product_Research_Log_AR.md → RouteBudget_Product_Research_Log_AR.md  _Bridges community 2 → community 5_
- `Total committed trip hours include driving, loading, unloading, waiting, and trip-bound rests` --shares_data_with--> `Allocate fixed costs by operating days or committed hours`  [EXTRACTED]
  RouteBudget_Product_Research_Log_AR.md → RouteBudget_Product_Research_Log_AR.md  _Bridges community 2 → community 0_
- `Risk of double-counting driver wage, maintenance, tires, or depreciation` --conceptually_related_to--> `Allocate fixed costs by operating days or committed hours`  [EXTRACTED]
  RouteBudget_Product_Research_Log_AR.md → RouteBudget_Product_Research_Log_AR.md  _Bridges community 2 → community 3_
- `Opt-in, backward-compatible migration for detailed costing models` --conceptually_related_to--> `Detailed tire cost-per-kilometer model`  [EXTRACTED]
  RouteBudget_Product_Research_Log_AR.md → RouteBudget_Product_Research_Log_AR.md  _Bridges community 3 → community 5_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fixed Cost Allocation Flow** — routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_fixed_cost_items, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_historical_productive_hours, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_committed_trip_hours, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_fixed_cost_allocation [EXTRACTED 1.00]
- **Planned Versus Actual Variance Flow** — routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_immutable_estimate, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_telematics_integration, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_planned_actual_report [EXTRACTED 1.00]
- **Waiting Cost and Recovery Flow** — routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_full_commitment_driver_time, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_supporting_document, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_waiting_billing_settings, routebudget_quora_graph_jpgqla_routebudget_product_research_log_ar_customer_pricing_method [INFERRED 0.85]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Driver Time Pricing"
Cohesion: 0.33
Nodes (7): Carlo Sydney, Total committed trip hours include driving, loading, unloading, waiting, and trip-bound rests, Separate internal driver cost from customer pricing method, Customer pricing by kilometer, zone, or forfait, Internal driver cost, Driver time cost spans receipt through delivery, including loading, unloading, and waiting, Pierangelo Pedemonte

### Community 1 - "Trip Profitability and N1"
Cohesion: 0.29
Nodes (7): Current scenario pricing model, Non-binding road tolls must be labeled estimates, N1 light vehicles require a separate calculation path, Assess load profitability and minimum acceptable price before acceptance, RouteBudget Research and Development Log, Return load versus empty return is decisive for trip pricing, RouteBudget

### Community 2 - "Fixed Cost Allocation"
Cohesion: 0.33
Nodes (6): Annual-kilometer allocation can understate costs during downtime and waiting, Armando, Allocate fixed costs by operating days or committed hours, Fixed transport cost items, Adjustable moving average of productive days or hours, Variable transport cost items

### Community 3 - "Tire Risk and Double Counting"
Cohesion: 0.40
Nodes (5): Risk of double-counting driver wage, maintenance, tires, or depreciation, Luca, Detailed tire cost-per-kilometer model, Optional reserve for tire inspections and unscheduled replacement, Tread-separation causes require authoritative technical verification

### Community 4 - "Fuel Surcharge and Fleet Data"
Cohesion: 0.50
Nodes (4): Documented fuel surcharge with explicit reference price and update cycle, Marco, Multiple fuel prices by station or country, Separate tractor registration, trailer registration, driver contract, and refueling countries

### Community 5 - "Evidence and Safe Migration"
Cohesion: 0.50
Nodes (4): Opt-in, backward-compatible migration for detailed costing models, Classify evidence before converting observations into formulas or features, Prelaunch unit, migration, accounting-example, localization, and RTL verification, Selected research items must become specifications, formulas, edge cases, database design, and test plans before implementation

### Community 6 - "Waiting Cost Evidence"
Cohesion: 0.50
Nodes (4): Luigi D'Antona, Supporting document for waiting evidence, Waiting allowance, hourly tariff, and documentary proof settings, Waiting cost exists economically even when recovery terms vary

### Community 7 - "Estimate versus Actual"
Cohesion: 0.67
Nodes (3): Immutable estimate snapshot at trip acceptance, Planned-versus-actual variance and realized profit report, Future GPS and telematics integration through export-capable providers or APIs

### Community 8 - "Research Consent"
Cohesion: 0.67
Nodes (3): Public attribution alone does not equal consent for product consultation, Mattia, Disclose product-research purpose and stop when contribution use is refused

## Knowledge Gaps
- **14 isolated node(s):** `RouteBudget Research and Development Log`, `N1 light vehicles require a separate calculation path`, `Variable transport cost items`, `Adjustable moving average of productive days or hours`, `Luca` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Allocate fixed costs by operating days or committed hours` connect `Fixed Cost Allocation` to `Driver Time Pricing`, `Tire Risk and Double Counting`, `Evidence and Safe Migration`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `Total committed trip hours include driving, loading, unloading, waiting, and trip-bound rests` connect `Driver Time Pricing` to `Fixed Cost Allocation`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `RouteBudget Research and Development Log`, `Non-binding road tolls must be labeled estimates`, `N1 light vehicles require a separate calculation path` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._