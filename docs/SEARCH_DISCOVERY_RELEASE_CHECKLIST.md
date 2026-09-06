# Search discovery release contract

Owner request, 6 September 2026: apply this checklist to future RouteBudget editorial releases. This is a release procedure, not permission to create recurring jobs or submit unchanged URLs repeatedly.

## Before publication

1. Check existing Italian intent ownership and actual Italian search evidence. Record unavailable volumes as unavailable. A SERP experiment is not a measured high-volume keyword.
2. Use primary sources, dated facts and independently checked calculations. Clearly label examples. Check app claims against the pinned product evidence. Never fabricate human reviews, testimonials or undisclosed product capabilities.
3. Require two contextual inbound links, self-canonical, indexable HTML, truthful dates and source metadata. Pass all existing editorial, research, integrity, exploit, security and generated-site checks without weakening them.
4. Review the rendered articles, tables and links at mobile and desktop widths. Preserve the iOS scrolling fix and consent-only analytics.

## Release and live validation

1. Push an isolated branch, open PR, wait for required checks and merge without bypass. Build the merged source and deploy the same output to the existing gh-pages destination.
2. Verify live HTTP 200, correct final URL, canonical, robots directives, rendered body and store links. Check unique sitemap membership and actual XML parsing. Preserve verification files and `.nojekyll`.
3. Keep a canonical sitemap set. Overlapping historical submissions are not separate page inventories. Do not create dated query-string variants to make a status look new.

## Google

Submit or refresh the affected canonical sitemap (normally `https://routebudget.eu/sitemaps/articles-it.xml`). Inspect each new or materially changed target URL. Request indexing only after live validation and only within the available quota. Record each actual response and timestamp. Quota, authentication and CAPTCHA blockers must be reported; never bypass them. A request receipt is not proof of indexing or ranking.

## Bing

Check the correct verified property `https://routebudget.eu/`. Submit the canonical sitemap and the new or materially changed URLs once. Record the available quota, submission receipt and processing state. Inspect live availability when Bing reports a problem. Do not repeatedly consume the quota on already submitted unchanged pages. IndexNow requires a separately verified installation and must not be claimed if absent.

## ChatGPT search

Check that public content and sitemap are accessible and the robots rules allow OAI-SearchBot. Where an actual firewall is managed, verify the official published crawler IP policy; do not invent a firewall test or configuration. GPTBot training policy is separate from OAI-SearchBot discovery. ChatGPT-User access is not a substitute for search crawler eligibility. There is no manual ChatGPT indexing submission implemented by this site: report **discovery eligibility checked**, never **submitted to ChatGPT**. Track real referrals only after visitor consent; citations and visits remain unguaranteed.

Official crawler reference checked 6 September 2026: [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). Recheck current provider documentation when the interface or process changes.

## Handoff

Give the owner the live URLs and distinguish deployment, sitemap receipt, indexing-request receipt, actual index state and measured traffic. Keep failures visible. Never promise a ranking, recovery date, impression count or installation count.
