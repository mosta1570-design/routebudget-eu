# Website app imagery — 1.7.2

Owner requested current app imagery and coherent website presentation on 19 September 2026.

## Source and scope

Actual iPhone simulator captures from the native RouteBudgetEU project:

- `metadata/screenshots/raw-update-2026-09-12/it-IT/01-quote.png`: price scenarios; suggested €360.07, cost €288.05, profit €72.02.
- `metadata/screenshots/raw-update-2026-09-12/it-IT/02-route.png`: Milano–Bologna, 211 km.
- `metadata/screenshots/raw-update-2026-09-12/it-IT/04-vehicle.png`: vehicle category, axles, weight and consumption.

Release provenance: native `metadata/store/ASO-AUDIT-2026-09-12.md` records iOS 1.7.2 build 27 and Android 1.7.2 code 16 submitted for review; `scripts/compose-store-master-v2.mjs` references these captures for the approved store composition. Native `app.json` and `store.config.json` identify version 1.7.2. This record does not independently certify current store availability or identical Android UI.

## Website treatment

Screens are resized proportionally to 1080px PNG and 540/1080px AVIF. No AI-generated UI, compositing, changed values, cropping or invented controls. Existing dark visual identity, navigation and article design remain intact. iPhone platform and version are stated in IT/EN; descriptions match route/vehicle screens instead of claiming old cost/archive screens. The homepage demo, product section and hero reveal share the new assets. Hero values match the screenshot; the separate 870 km method example is explicitly identified as separate.

Historical PDF proof remains unchanged and dated; it is not represented as a screenshot or export from this release. App-specific functions remain platform-qualified. No new fuel-provider, tracking or legal-compliance claim is introduced.

## Verification

- Build, calculator, generated-link, privacy/event and performance checks passed.
- Product presentation inspected at 375px and 1440px; no document overflow. Images loaded with responsive sources. Lazy offscreen images load on approach.
- Changed article tables inspected on mobile; wide fuel sensitivity table retains the established horizontal-scroll region.
- Design detector returned no findings for changed homepage components/copy.

Automated review under owner authorization; not an independent human or physical-device review. Source publication and live deployment receipts are recorded separately.
