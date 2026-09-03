# Follow-up: touch table scrolling

## Evidence, not a closed diagnosis

The owner confirmed PR #38 did not resolve the physical iPhone symptom. The header now leaves the viewport, so the old sticky-header hypothesis is insufficient and a stale stylesheet does not explain this particular retest. The owner also reproduced the symptom in Safari, not only Chrome.

A second 24-second recording shows approximately 18 recorded pixels of alternating vertical translation, around 20 cycles per second in stationary sections after the first table. Browser controls remain stationary. This is an observation of recorded pixels, not a measurement of DOM scroll offsets or proof of the exact WebKit defect.

The owner localized onset immediately after the paragraph beginning “Ogni viaggio deve avere una scheda chiusa.” This is the first horizontally scrollable table in the earnings guide. Its shared wrapper specified only `overflow-x: auto`; computed `overflow-y` was also `auto`. At a 390 CSS-pixel viewport, the first table had 643 pixels of content inside a 358-pixel wrapper. It created a nested scrollable view even though this two-column content can wrap naturally.

## Targeted repair

- Render a verified column count on every semantic table wrapper.
- Keep two- and three-column tables in normal vertical document flow on narrow/touch screens. Their text wraps without a nested scrollable view.
- Keep genuinely wide comparison tables horizontally scrollable and keyboard-accessible, but explicitly hide vertical overflow. No touch-event interception, forced scroll position, disabled zoom, or new animation is added.
- Scope custom WebKit scrollbar painting to fine-pointer/hover devices; touch devices retain native scrollbar behavior.
- Version the shared reading CSS and event-script URLs by their content hashes. This fixes a separate reproducible update-delivery defect, not the observed physical retest: both WebKit and Chrome reused old CSS after a simulated deployment with `max-age=600` and an unchanged URL; a content-versioned URL loaded the new bytes immediately.

The three tables in the reported guide now have no inner scroll container. Across the published inventory, 105 two/three-column tables use the reading-flow layout; 13 wider tables preserve horizontal access. Desktop tables preserve their original presentation.

## Verification

- `npm run check` passes, including semantic table-header counts and content-versioned asset assertions on every generated article/hub.
- A new asset-version assertion failed against the previous build before the renderer change.
- Browser audit: 71 routes × WebKit/Chromium × touch/desktop = 284 passing checks, including table overflow modes, content clipping, whole-document overflow, and idle scroll/layout stability.
- The reported guide was additionally checked at widths 320, 390 and 430: all three tables fit their containers exactly, with both overflow axes visible and no nested scrolling. Screenshots were inspected.
- A new scoped release-integrity record pins the renderer/CSS dependencies and generated artifacts. Previous approvals remain untouched. Article text, metadata, dates, canonical URLs, calculator formulas, indexable URL inventory and XML sitemaps are unchanged.

## Required physical confirmation

Automated desktop WebKit is not iOS WebKit plus native browser UI. The periodic physical-device oscillation has not been reproduced locally. This repair removes the strongest identified trigger; it must not be reported as a proven root-cause fix until the owner repeats the first-table scroll/stop interaction on the same iPhone.

After publication, confirm that the first table displays all text without horizontal swiping, then scroll rapidly across and below it and lift the finger completely. If shaking remains, obtain on-device scroll/viewport/layout measurements before changing another visual subsystem. Do not infer any Google ranking recovery from this UI change.
