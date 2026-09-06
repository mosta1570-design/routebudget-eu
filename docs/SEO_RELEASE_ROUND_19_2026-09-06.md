# Italian operational guides — release 19

Owner-authorized release, 6 September 2026. Website only; no Expo app or unrelated repository change.

## New intent owners

| URL | Task | Evidence strength |
| --- | --- | --- |
| `/it/guide/borsa-carichi-per-furgoni/` | Screen a freight announcement and compare compatible offers | Exact Italian Google Suggest plus sampled Italian results and first-party platform documentation |
| `/it/guide/costo-consegna-ultimo-miglio/` | Separate stops, completed deliveries and paid units; quantify redelivery | Qualitative Italian SERP experiment and primary operational sources; no exact relevant Suggest or volume claim |
| `/it/guide/divieti-circolazione-mezzi-pesanti-2026/` | Check Italian calendar against delivery window before quotation | Exact Italian Google Suggest and official MIT decree/calendar |

Three distinct reader tasks, original labelled numerical examples, linked primary sources and explicit product limits. No assertion that these queries have no competitors, are the three largest opportunities, or guarantee traffic. No fabricated human review. Research ledger: `research/2026-09-06/report-source.md`; demand capture: `SEO_DEMAND_EVIDENCE_ROUND_19_2026-09-06.json`.

## Implementation and local verification

- Two contextual incoming sources for each new guide; only link/date maintenance on three existing pages.
- Eleven independent integer-cent/rational arithmetic assertions passed. For 34.50/240, exact 14.375% rounds half-up to 14.38%; binary floating-point `toFixed` is not used as an accounting oracle.
- Lint, build, calculator tests, 95 event/source fixtures, scrolling regressions, consent adapter, generated HTML, source/keyword/content and internal-link checks passed before approval snapshots.
- Rendered bodies and numerical tables reviewed. Representative responsive checks at 320, 375, 768 and 1280 CSS pixels: document width within viewport, readable wrapping, no sampled console errors. This is not a physical iOS device test.
- 72 published content pages plus five static routes: 77 unique sitemap URLs. Article child sitemap: 65 URLs, not 65 plus a second count for overlapping old submissions.
- Shared renderer/CSS/JavaScript, existing iOS fix, product attestations, privacy documents and consent-only GA4 unchanged. Only site inventory/core date changes inside the pinned renderer dependency set.
- New approval records pin reviewed artifacts. Historical baseline and review records remain immutable. Executable gate changes are restricted to the new release-integrity ID, digest and filename; no rule, threshold or exploit test was relaxed.
- Existing similarity warning for `costi-autotrasporto` versus `costi-fissi-variabili-autotrasporto` is retained; these new articles introduced no corresponding exception.
- Regression found during release: the forged-integrity fixture targeted the previous release filename. It now resolves and validates the active manifest approval ID, so every future release tests the active approval. The expected rejection and all other exploit assertions remain unchanged; no security rule was relaxed.

## Release acceptance

Run the full suite after the final source state is stable, including all tamper-rejection fixtures. Require green PR checks; deploy the merged source to the existing gh-pages destination. Check live HTTP, exact canonical, public HTML and sitemap membership before requesting discovery.

Apply `SEARCH_DISCOVERY_RELEASE_CHECKLIST.md` to this and future releases: Google and Bing actual submission receipts recorded separately from indexing; ChatGPT OAI-SearchBot eligibility checked, not a nonexistent manual submission. Production commit IDs and provider responses are post-deploy receipts and must not be inferred from this pre-release file.
