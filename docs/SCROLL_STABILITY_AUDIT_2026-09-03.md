# Touch-reading stability — 3 September 2026

## Observation and confidence

The owner supplied a 33-second iPhone screen recording showing fast scrolling and reported continued shaking after stopping. Visible routes include the padroncino earnings guide, spot transport guide and electric-van comparison. The exact iOS/browser version and physical touch input were not available.

Production `seo.css` matched the source at `f63bb98` byte for byte. The article script only updates a reading-progress transform; it does not set the document scroll position. No content virtualization or scroll-position feedback loop exists in this template.

**The physical-device symptom was not reproduced in automation.** Before changes, WebKit and Chromium showed zero idle scroll/layout drift and identical idle screenshots, both with original styles and with progress/backdrop variants disabled. Those tests cannot establish the original root cause. Sticky/backdrop layers and scroll-driven style updates remain a plausible iOS compositing trigger, not a confirmed diagnosis. WebKit documents related [sticky-element flicker](https://bugs.webkit.org/show_bug.cgi?id=263004) and [scroll-driven animation synchronization](https://bugs.webkit.org/show_bug.cgi?id=288402) issues; neither report proves this site's exact bug.

## Compatibility mitigation

- Shared reading-template header remains in document flow on narrow/touch devices, with an opaque background and no backdrop sampling. Desktop sticky navigation is preserved.
- Reading progress is hidden on touch/narrow devices and for reduced-motion users. Its JavaScript installs **no scroll/resize listeners** in those modes.
- Changing device/media preferences detaches listeners and cancels queued animation work. Desktop progress remains frame-coalesced and clamps rubber-band overscroll to 0–1.
- Touch anchor navigation uses native immediate positioning, with heading offsets adjusted for the non-sticky header.
- Tables retain their named keyboard-accessible horizontal scrolling regions. Article text, URLs, metadata, publication dates, canonical tags and sitemaps are unchanged.
- Homepage cinematic behavior and legal-page templates are unchanged; both remain in the full-route smoke test.

## Verification

The built root sitemap contains 71 routes: 66 content pages, two hubs, homepage and two legal pages. The browser audit visits every route on WebKit touch, Chromium touch, WebKit desktop and Chromium desktop.

| Profile | Passing routes |
| --- | ---: |
| WebKit / iPhone-size touch context | 71/71 |
| Chromium / Android-size touch context | 71/71 |
| WebKit / desktop | 71/71 |
| Chromium / desktop | 71/71 |

Total: **284/284 passing route/profile checks**, with three scroll-stop samples per route. Each checks HTTP 200, stable document height/scroll offset after stopping, no document-wide horizontal overflow, no page exceptions, and expected touch/desktop header behavior. Touch pages produce zero reading-progress style writes during scrolling. Representative article, calculator and homepage screenshots were inspected.

The initial browser test incorrectly expected a hidden progress element on nine template routes which never render a progress bar. That test assumption was corrected to allow absence; the complete four-profile confirmation run then passed. It was not a product defect.

Unit regression: the pre-change event adapter fails the new zero-touch-listener assertion; the patched adapter passes listener cancellation, media switching, requestAnimationFrame coalescing and overscroll bounds.

Other passing checks:

- `npm run check`
- `npm run seo:all`
- Publishing-gate exploit suite: all 11 bypass attempts rejected
- Impeccable mechanical detector on changed UI files: no findings
- `git diff --check`

The release gate initially rejected changed dependency hashes, as intended. A new scoped integrity review pins the two changed UI assets. The previous review remains untouched; neither content policy nor integrity validation was relaxed.

## Reproduce browser checks

Build and serve the output using `npm run build` and `npm run preview -- --host 127.0.0.1 --port 4186`. The optional browser audit needs Playwright and installed WebKit/Chromium browsers; it adds no runtime website dependency.

```sh
node scripts/audit-scroll-browser.mjs http://127.0.0.1:4186
```

`PLAYWRIGHT_MODULE` may point to an existing Playwright installation; `SCROLL_CHROME_CHANNEL=chrome` uses an installed Chrome; `SCROLL_AUDIT_OUTPUT` selects the evidence directory. Default artifacts stay outside the source tree under `/tmp/routebudget-scroll-audit`.

## Release boundary and remaining device check

At this audit's completion, changes are local; push, PR, merge and production deployment await separate owner confirmation. No Search Console mutation or indexing request was made. A CSS/scroll-behavior change does not require repeated sitemap submissions.

After an authorized deployment, verify production asset hashes, reload the guide on the same iPhone, then repeat fast down/up swipes, stops over tables, browser-toolbar collapse/expansion, horizontal table scrolling and back navigation. Test the three routes visible in the recording. If shaking persists, collect the exact iOS and browser versions plus a new recording; do not declare the bug closed from desktop emulation alone.

No ranking-recovery claim follows from these checks. Search visibility and the reported rendering defect require separate evidence.
