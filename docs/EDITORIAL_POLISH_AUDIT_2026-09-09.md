# Editorial presentation and security audit — 9 September 2026

## Scope and result

Owner requested a site-wide fault/security review and clearer premium article presentation, then specifically requested softer lettering in a rounded title frame. Changes affect website CSS only; native app is untouched. This is a presentation release, not an explanation or guaranteed cure for the search decline.

- Existing Barlow 600 replaces condensed display lettering in static-page H1s; no new font or JavaScript dependency.
- Rounded 16px title frame, restrained type scale, shorter hero spacing and readable 72ch article measure.
- Shared controls use centered labels, readable line height and 14px corners. Store artwork remains unchanged inside aligned 68px targets.
- Desktop demo button label centered. Existing touch header/table/scroll compatibility mitigation and consent choices remain intact.
- Article bodies, title text, metadata, publication dates, URLs, canonicals, redirects, internal links and sitemap membership are unchanged.

## Verified checks

- `npm audit --json`: zero known vulnerabilities in dependency inventory at audit time.
- GitHub API: zero open CodeQL and Dependabot alerts. No account, DNS, billing or security-policy changes.
- Reviewed Markdown sanitizer: explicit tag/attribute allowlists, HTTPS/mailto scheme restrictions and protocol-relative URL rejection. No untrusted raw HTML path introduced.
- Source search found no `eval`, `new Function`, React raw HTML injection or direct `innerHTML` assignments in website source/runtime searched. This is not a penetration-test certification.
- `npm run check`: passed lint, build, performance, calculator fixtures, event/privacy contracts, generated content and PDF proof.
- `npm run seo:all`: passed publication integrity, 11 exploit-rejection cases, research/content/link/schema/sitemap/robots/hreflang/report gates.
- Built inventory: 72 published Italian pages, two hubs, root and two legal pages; 77 indexable URLs. Four child sitemaps; no broken internal links or orphans in generated checks.
- Browser visited all 77 routes at 320px and 1280px: one H1 per route, no document-wide horizontal overflow. Initial viewport timing mismatch affected measurement, not site; actual measured widths verified and root rechecked at 320px.
- Representative guide, PDF guide, calculator, hub and homepage checked for controls at least 44px high. Mobile article header remains relative, not sticky. Article phone/desktop title screenshots inspected.
- All non-root HTML compared byte-for-byte with published files after normalizing the shared stylesheet version only. Root HTML differs only in generated JS/CSS asset references following its CSS change. No article rewrite.
- Impeccable detector run once: no shared article stylesheet findings. Existing homepage Inter font/grid-decoration advisories retained, not new accessibility or security failures; no unrelated brand redesign.

## Limits and release policy

No physical iPhone test performed here. Existing user-confirmed scroll fix preserved, and touch-scroll regression tests passed. No assertion that visual changes caused or will reverse Google ranking changes. Rendering, indexability, index inclusion and rankings are different checks.

New append-only integrity review covers generated stylesheet-reference drift. Old reviews and executable validation rules remain; only current review ID/digest moves. No indexing request made as part of this CSS release. Prior confirmed indexing receipts must be checked before submitting duplicates.

## Italian editorial references, consulted 9 September 2026

These are relevant established publishers/platforms, not a verified ranking of traffic. Their private clicks, impressions and conversion rates are unavailable.

1. [Uomini e Trasporti: hidden operating costs](https://www.uominietrasporti.it/professione/inchiesta/le-voci-nascoste-dei-costi-aziendali-tutto-quello-che-lautotrasporto-non-vede/) — starts from an operational blind spot, connects cost categories to the reader's decisions, then routes readers to deeper reporting. Adopt problem-first framing, not their wording or unsupported industry averages.
2. [TrasportoEuropa: ministry cost update](https://www.trasportoeuropa.it/notizie/autotrasporto/il-ministero-trasporti-aggiorna-i-costi-dellautotrasporto-2/) — timely named source and explicit dated context. Adopt precise provenance and distinguish publication date from data period; never transplant a benchmark into a personal tariff.
3. [TIMOCOM: transport-cost optimization](https://www.timocom.it/blog/calcolare-costi-trasporto-trasporto-merci-su-strada-831570) — separates cost calculation, operational levers and mistakes; product connection follows reader task. Adopt useful sequence and explicit product boundary, not competitor claims or identical structure.

### RouteBudget editorial direction

For each future approved article: one precise Italian operational question; short answer; a declared simulation or documented example; independently recomputed numbers; checklist and source limitations; one relevant existing calculator/PDF proof; clear explanation of what the app cannot do. Avoid generic opening paragraphs, invented customer experience, forced keyword repetition or new pages solely to consume indexing quota. Retain current ranking titles and ownership boundaries unless evidence supports a correction.

Possible later research gaps: cost of a failed delivery/second attempt, and pallet exchange reconciliation costs. These are hypotheses, not verified high-volume keywords or approved articles. Existing last-mile, pallet transport, waiting-time and quote-versus-actual guides require overlap assessment before new publication.
