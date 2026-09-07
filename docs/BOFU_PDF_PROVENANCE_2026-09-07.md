# Reproducible BOFU PDF demonstration

This is a synthetic example, not a customer quote, verified route price, native-device recording or independent testimonial. Generated on 7 September 2026 from the app source already pinned by the site's product-evidence gate.

- App commit: `3ea946e5c988aca4da3c778544a5dd6b8391b750`.
- Unmodified template `src/services/preventivoTemplate.ts`: SHA-256 `2c84b64c26c6a535723519cdd86f6d92e3bcc75d4a2898b44ba3f3bbe0862120`.
- Unmodified calculation owner `src/hooks/useRouteCalc.ts`: SHA-256 `b52dc095e9a2000fc743a5be6d702acbbaf1ff94e89444542edc8f0226fa1300`.
- Export: `buildPreventivoHtml` using the ready `computeRouteBreakdown` result; Italian locale, cost breakdown visible, no company logo, issue date `2026-09-07T10:00:00Z`.
- Print: isolated desktop Chromium, A4, scale 0.9, print backgrounds, no network. Native print layout may differ. No template wording or formula was changed.
- Final PDF: `public/downloads/routebudget-preventivo-demo.pdf`, SHA-256 `3d3d23a94002976254870cbfa08afcadef24cb334c4cd037b845c1de3c0e05a9`, 98,005 bytes, one A4 page, no PDF JavaScript, no form or customer identity.

## Inputs

`origin: Bologna (DEMO)`, `destination: Milano (DEMO)`, `distanceKm: 240`, truck 5 axles/40 tonnes, `consumptionL100: 30`, `fuelPriceCentsPerL: 170`, `wageCentsPerH: 2400`, `manualTollCents: 4500`, `profitMargin: 0.2`, `selectedScenario: recommended`, no empty return. Route names are demo labels; distance and toll are deliberately not presented as current route evidence.

The pinned model uses 72 km/h and 15 cents/km wear. Independent arithmetic: fuel 12,240 cents, wage 8,000, wear 3,600, toll 4,500; total 28,340. Recommended = total / 0.8 = 35,425. Ideal = ceil(35,425 × 1.1) = 38,968. Modeled operating profit at the selected price is 7,085 cents. VAT and taxes are excluded by the template. This is not complete business profitability if costs are missing.

The source was extracted read-only from that commit into an isolated temporary directory. The current Expo checkout was not edited. Source hashes were checked against the immutable attestation. A first independent wage expectation assumed 80 km/h and correctly failed against the actual 72 km/h constant; the documented oracle was corrected before authoring public amounts. The final page and PDF agree with the pinned code and independent rational arithmetic.

The final PDF was rendered to PNG and visually inspected: all cost rows, three scenarios, selected total, 14-day validity and non-binding footer visible on one page. A two-page preliminary print was not published. This review is automated/operator-assisted, not an independent legal or human professional certification.

`scripts/verify-bofu-proof.mjs` checks artifact bytes, deployment copy, size, numerical values, demo disclosures and links. Any new PDF must be regenerated, rendered, reviewed and explicitly repinned; changing a hash alone is not a review. No real customer or account analytics data is included in this public record.
