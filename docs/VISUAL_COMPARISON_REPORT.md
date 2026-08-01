# RouteBudget EU — Visual Comparison Report

Status: **passed with final Higgsfield media**
Audit date: 2026-08-01

## Compared sources

- Dribbble reference: <https://dribbble.com/shots/26980078-2026-Portfolio-Adam-Roberts>
- Live reference identified by the shot: <https://www.grilledpixels.com/>
- Local RouteBudget preview: <http://127.0.0.1:4174/>
- Detailed reference notes: [REFERENCE_VISUAL_AUDIT.md](./REFERENCE_VISUAL_AUDIT.md)

## Captured evidence

Reference:

- [Dribbble reference — 1440 × 900](./visual-comparison/reference-dribbble-1440x900.png)
- [Live reference — 1440 × 900](./visual-comparison/reference-live-1440x900.png)
- [Live reference — 390 × 844](./visual-comparison/reference-live-390x844.png)

RouteBudget first viewport:

- [1440 × 900](./visual-comparison/routebudget-1440x900.png)
- [1280 × 832](./visual-comparison/routebudget-1280x832.png)
- [1024 × 768](./visual-comparison/routebudget-1024x768.png)
- [390 × 844](./visual-comparison/routebudget-390x844.png)
- [393 × 852](./visual-comparison/routebudget-393x852.png)
- [375 × 812](./visual-comparison/routebudget-375x812.png)

Interaction and continuation:

- [Open mobile menu — 390 × 844](./visual-comparison/routebudget-menu-390x844.png)
- [Real-product demo — 1440 × 900](./visual-comparison/routebudget-demo-1440x900.png)
- [Editorial cost continuation — 1440 × 900](./visual-comparison/routebudget-continuation-1440x900.png)

All files were recaptured after final Higgsfield integration and verified at the pixel dimensions in their names.

## Geometry verification

Browser measurements confirm one exact viewport-tall hero and no horizontal overflow at every acceptance size.

| Viewport | Hero | Document width | Headline top–bottom | Action top–bottom | Footer bottom | Result |
|---|---:|---:|---:|---:|---:|---|
| 1440 × 900 | 1440 × 900 | 1440 | 599.7–833.6 | 704.9–833.6 | 884.0 | Pass |
| 1280 × 832 | 1280 × 832 | 1280 | 531.7–765.6 | 636.9–765.6 | 816.0 | Pass |
| 1024 × 768 | 1024 × 768 | 1024 | 499.9–701.6 | 574.9–701.6 | 752.0 | Pass |
| 390 × 844 | 390 × 844 | 390 | 554.3–661.5 | 674.3–771.7 | 828.0 | Pass |
| 393 × 852 | 393 × 852 | 393 | 561.5–669.5 | 682.3–779.7 | 836.0 | Pass |
| 375 × 812 | 375 × 812 | 375 | 526.4–629.5 | 642.3–739.7 | 796.0 | Pass |

The 16 px bottom safety margin remains intact at every viewport. Headline, action, chips, and footer do not overlap.

## Structural comparison

### Outer padding and navigation

- Reference: compact edge registration line, minimal controls, no sticky SaaS header.
- RouteBudget: 56 px desktop outer padding and 20 px mobile padding; compact logo, six unboxed links, restrained language switch, subtle blue download state.
- Result: same horizontal registration behavior and low navigation weight. RouteBudget keeps necessary product destinations without adding pills or a header surface.

### Four-column information grid

- Reference: identity and positioning at left, concise description and services at right.
- RouteBudget: brand, `COSTI & MARGINI`, solved problem, and five core functions occupy corresponding columns.
- Result: desktop baselines and density closely match. Mobile becomes a two-by-two grid so every field remains visible without a card.

### Negative space

- Reference: large empty cinematic center separates metadata from lower statement.
- RouteBudget: true flex spacer preserves the same empty field. Truck imagery occupies the right/middle region without adding interface mockups in the center.
- Result: strong match.

### Headline and lower-right action

- Reference: four-line lower-left headline alternates sans and pixel type; showreel and badges sit lower-right.
- RouteBudget: exact locked line breaks alternate Inter and basis33. `PRIMA DI ACCETTARE` uses a controlled compact scale so it stays on one line at 1024 px. Demo action and three factual capability chips align to the headline baseline.
- Result: strong match with RouteBudget copy and product truth.

### Footer strip

- Reference: hairline bottom strip, short CTA left, inventory right.
- RouteBudget: availability and underlined download action left; `7 lingue • Preventivi PDF • Archivio locale` right.
- Result: same edge anchor and secondary visual weight.

### Mobile composition and menu

- Reference: compact identity row, central media, editorial lower headline, full-screen black navigation.
- RouteBudget: two-column metadata system, truck crop through the center, lower headline/action/chips, exact full-screen navigation with 500 ms fade and 60 ms staged link delays from 100–400 ms.
- Result: no dropdown card, no clipping, no horizontal overflow, and all required controls stay visible at 375 × 812.

## Corrections made during comparison

1. Removed the former centered rounded hero shell and all gradient headline styling.
2. Replaced sticky SaaS navigation with a compact transparent registration line.
3. Added a true flex spacer so center remains visually empty.
4. Reduced the longest headline line independently at tablet/desktop widths to preserve the mandated line break.
5. Added mobile-specific type clamps and compact chip padding; the 375 × 812 footer now retains a 16 px bottom safety margin.
6. Added an art-directed 720 × 1280 derivative of the approved Higgsfield source so the European cab-over truck remains visible behind the mobile information grid and headline.
7. Replaced the small dropdown menu with a portal-rendered full-screen overlay, focus target, body lock, Escape handling, and inert background.
8. Replaced a fake-video path with a real-product screenshot overlay.
9. Rebuilt continuation sections as editorial rows, cost tables, and asymmetric real-device compositions instead of alternating SaaS cards.
10. Restored visible guide, calculator, support, privacy, and terms links below the conversion experience.

## Intentional differences

- RouteBudget identity, logo, trucking media, copy, capability facts, and verified store links replace all personal-portfolio identity.
- RouteBudget blue replaces the reference red state color.
- Award marks become truthful capability chips; no awards or statistics are implied.
- Demo uses authentic RouteBudget Android screenshots, not a portfolio showreel.
- Long-form continuation and SEO routes use RouteBudget product truth rather than portfolio projects.

## Final-media verification

Higgsfield generated the approved 8-second Seedance 2.0 scene at 1920 × 1080, 24 fps. The user manually confirmed the 72-credit generation; Unlimited mode remained off and no paid plan was purchased. Sampled beginning, middle, and ending frames preserve a stable European cab-over truck, wet-road reflections, and clean desktop copy space without generated text or logos. Final shipped MP4s append an endpoint-deduplicated reverse sequence, producing a smooth 16-second ping-pong loop instead of a hard end-to-start cut.

Final shipped assets:

- `routebudget-hero-desktop.mp4`: 1920 × 1080 H.264, 2,997,259 bytes;
- `routebudget-hero-mobile.mp4`: 720 × 1280 H.264, 1,349,620 bytes;
- `routebudget-hero-poster.webp`: 1920 × 1080, approximately 49 KB.

Browser verification at every acceptance viewport confirmed:

- desktop viewports select the 1920 × 1080 source;
- mobile viewports select the 720 × 1280 source;
- every selected source reaches `readyState = 4` and plays muted inline;
- desktop and mobile sources report an exact 16-second duration;
- a complete desktop cycle remained unpaused across the forward/reverse turnaround and reset from 15.8597 seconds to 0.0159 seconds;
- the hero exactly matches viewport height;
- document width exactly matches viewport width;
- headline, actions, chips, and footer retain their measured safety gaps;
- contrast remains readable through sampled video frames rather than only the poster;
- `prefers-reduced-motion` handling pauses the video at frame zero;
- all comparison screenshots now show final integrated media.

No substitute generator was used. See [HIGGSFIELD_ASSET_REPORT.md](./HIGGSFIELD_ASSET_REPORT.md) for prompt, settings, provenance, and optimization details.
