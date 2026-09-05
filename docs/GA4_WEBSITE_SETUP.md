# RouteBudget EU — GA4 website setup

Decision date: 2026-09-05. Scope: website analytics after explicit visitor opt-in, advertising disabled. This is an activation checklist, not proof that the property is already receiving data or a legal compliance certification.

**Release preparation as of 2026-09-05:** the RouteBudget property and web stream exist. In response to the independent-developer-in-Italy versus Egyptian-company question, the owner confirmed the account is in his own name as an independent developer. The unchecked processing-terms amendment is not independently a blocker for an EEA Standard customer because those terms are incorporated. No contractual checkbox was changed. The owner supplied the required notice-contact details and completed saving them in Google; the Contacts table was read back and confirmed the supplied name, email and full mailing address, with Primary contact only. No postal address is published in this repository. This document records configuration and validation requirements; deployment status and controlled Realtime test receipts belong in the owner's release report. Local test results are not evidence of production traffic. See [Google's incorporation/contact guidance](https://support.google.com/analytics/answer/3379636?hl=en).

## Ownership and isolation

The owner approved a separate RouteBudget website property in the existing **Default Account for Firebase** account. Do not create a replacement account, alter Corvian's property, link this property to Corvian/Firebase/app data, or add Ads integrations. After the account-wide impact was explained, the owner authorized the recommended privacy setup: Technical support remains ON, Modeling contributions and Recommendations are OFF, and Google products & services remains OFF. Changes to shared options affect Corvian too; this decision does not authorize other account changes.

Approved public privacy contact: **Eng. Mostafa — mosta1570@gmail.com**. Do not invent a registered legal entity, establishment country, postal address, DPO or EEA representative. If Google requires information not already verified, the owner must supply it. The target audience and reporting timezone do not establish the controller's legal country. Account terms or contractual amendments require appropriate owner authority; see [Google's processing-terms guidance](https://support.google.com/analytics/answer/3379636?hl=en).

The primary contractual-notice contact was verified separately from the website's public privacy email on 2026-09-05. The user saved the contact directly after the automated save was withheld because the email input could not be reliably read. The saved Contacts table displays the exact supplied email and Primary contact role. No DPO, EEA representative, organization or legal entity was created.

| Field | Value / evidence |
| --- | --- |
| Existing account | Default Account for Firebase; verified by owner, internal account ID not published here |
| New property | RouteBudget website only; keep the property's internal ID out of public documents |
| Web stream | `https://routebudget.eu`; keep the stream's internal ID out of public documents |
| Measurement ID | `G-ELHQ6Z5F6E` — public tag identifier, not a secret |
| Reporting timezone / currency | Europe/Rome / EUR |
| Access | Owner-controlled account; no additional viewers or public dashboard by default |
| Activation evidence | Record date, reviewer, live URL, payload test and Realtime receipt after verification |

Google's [website setup guide](https://support.google.com/analytics/answer/9304153?hl=en) explains property/stream creation and the Measurement ID. Configure only the RouteBudget property and its web stream.

## Property settings before activation

- Turn **Enhanced Measurement OFF** in the RouteBudget web stream, including automatic outbound, form, search, download, scroll, video and history-change measurement. The site owns its minimized custom store-click event. [Enhanced Measurement controls](https://support.google.com/analytics/answer/9216061?hl=en)
- Keep Google Signals, user-provided data collection, advertising personalization and Ads links OFF. Disable granular location/device collection for every available region in this property; this limits city, detailed user-agent/device and screen information. Do not alter shared account-level settings to achieve this. [Regional privacy controls](https://support.google.com/analytics/answer/12017362?hl=en)
- Set user/event retention to **2 months** and **Reset user data on new activity OFF**. This does not limit retention of standard aggregated reports; do not promise that all GA4 data disappears after two months. [Google retention controls](https://support.google.com/analytics/answer/7667196?hl=en)
- Do not enable User-ID, cross-domain linking, audiences for advertising, BigQuery export or store/subscription joins. Using the same account container does not authorize mixing properties.
- Verify the owner-approved account-level sharing settings and record their implications privately. Do not claim all sharing is OFF: Technical support remains ON, allowing Google's support representatives to access data when necessary to provide service. No other account changes are authorized by this setup.
- Four event-scoped custom dimensions are registered and verified: `content_id`, `source_class`, `cta_id`, `destination`. They cover content, source classification and store-CTA reports. Add `page_type`, `locale`, `cta_position` or calculator/asset dimensions only when a report needs them. Never register values supplied by a visitor.
- `store_outbound_click` is configured as a key event with code-based collection, counting once per event and no default monetary value. Do not create a no-code pageview rule for it or treat a store click as a purchase or installation. This setting does not establish that a real event has been received.

## Consent and loading contract

1. Render the local consent choice in normal document flow. Acceptance and refusal must be equally easy; closing/dismissing is not acceptance. Keep the content and calculators usable regardless of the choice. Provide a footer control to reopen preferences on every measured page.
2. Before consent, on refusal, with missing configuration or with an invalid/expired choice: do not load Google scripts, analytics pixels, preconnects or measurement requests. Do not send even a denied-consent ping. This is **Basic consent**, not Advanced. [Google's Basic/Advanced distinction](https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=en)
3. Keep a functional consent record (choice, version and date) for at most **185 days**, with no unique identifier. This preference duration exceeds six calendar months and is separate from the 180-day GA cookie limit. Keep the language preference separate. Handle unavailable storage without assuming consent. Do not restart the lifetime just because the visitor opens another page.
4. Only after explicit acceptance load the tag with default consent states denied, then grant `analytics_storage` alone. Keep `ad_storage`, `ad_user_data`, `ad_personalization` denied. Set `allow_google_signals:false` and `allow_ad_personalization_signals:false` in tag configuration. [Google configuration reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
5. Set `send_page_view:false` before configuration, then send one controlled pageview for the currently measured page. Enhanced Measurement OFF alone does not suppress the default tag pageview. Do not replay a queue of clicks or calculator activity that occurred before acceptance.
6. Configure GA cookie expiry at no more than **180 days** (`cookie_expires:15552000`) with `cookie_update:false`; consent-record expiry and Google event retention are separate controls. Never infer permission from existing GA cookies.
7. On withdrawal, synchronously set `window['ga-disable-' + measurementId] = true`, persist refusal, stop the adapter, clear only `_ga`/`_ga_*` cookies belonging to this site using their configured domain/path, and reload into the blocked state. Preserve language and unrelated functional data. Google's disable flag blocks cookie writes and sends; an isolated `analytics_storage:'denied'` update is not an adequate substitute for blocking. [Google disable controls](https://developers.google.com/tag-platform/security/guides/privacy)
8. Handle withdrawal while the script is still loading: callbacks must recheck consent, not revive collection. Where practical synchronize refusal across already-open same-origin tabs; never broaden cookie deletion to unrelated cookies.

The Garante requires affirmative, informed choices and accessible withdrawal. Its guidance normally forbids repeatedly presenting a rejected banner within six months unless a stated exception applies. The functional preference lasts 185 days to avoid equating six calendar months with 180 days; **do not automatically re-prompt a saved refusal before that interval**. Expired acceptance must stop collection. A footer-initiated change remains available throughout. [Garante cookie guidance §§6–8](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)

## Data contract

`public/seo/events.js` remains the **local schema-version-3 emitter**, with no network transport. A separate consent-aware collector validates its signals against [SEO_CONVERSION_MAP.md](./SEO_CONVERSION_MAP.md) before sending custom events. Loading the emitter is not the same as activating analytics.

- Send `content_id` and other custom values only from known enumerations/editorial inventory.
- `page_location`: use the public canonical site URL and a known public pathname; omit query, hash and credentials. Do not take an arbitrary canonical URL or pathname supplied by a visitor.
- `page_referrer`: valid HTTP(S) origin only, or empty string. Never send its original path, query, fragment or credentials.
- `page_title`: controlled public content ID, not the browser's arbitrary title. Set all these values before the first `config` or event so automatic Google events do not inherit raw defaults.
- `source_class` remains landing-only. Its `chatgpt` value is a bounded signal, not an authenticated referral. Do not propagate raw UTM values or add campaign tags to store links.
- The collector may set GA4 campaign source/medium from a fixed coarse mapping for external arrivals, such as `chatgpt.com` / `referral`; this is not permission to forward arbitrary UTM values. Internal arrivals and missing source evidence do not write a synthetic campaign. Google may correlate consented events using its own session attribution.
- Send `store_outbound_click` once per activation with enumerated destination (`app_store` or `google_play`), CTA and content metadata. Do not also send automatic `click` or custom `cta_click` for that activation. Transport failure must not delay or prevent navigation.
- Never send site-assigned `user_id`, names, email, licence plates, locations, routes, calculator inputs/results, prices, wages, margins, financial totals, PDF contents or free text.

GA4 still creates its own pseudonymous client/session identifiers and automatic visit/engagement information, such as first-visit, session-start and engagement events. Cookie/ID collection is covered by the new owner decision and must be disclosed; it is not anonymous/no-ID analytics. Disabling Enhanced Measurement does not make Google collect only RouteBudget's custom payloads. Google also receives connection metadata; regional collection is not a promise of exclusively EU storage or processing. Review Google's [data safeguards and international-transfer information](https://support.google.com/analytics/answer/6004245?hl=en), [processing terms](https://business.safety.google/adsprocessorterms/) and [privacy policy](https://policies.google.com/privacy).

## Reports and truthful interpretation

Start with consenting users/visits, pageviews by public content, traffic source/medium, landing `source_class`, and outbound store-click event counts by destination and CTA. Use aggregate date ranges; suppress identifying small-volume detail. Add the word **measured** or **consenting** where needed.

No historical backfill exists for visits before activation or consent. Refusal, blockers, network failures and missing referrers mean this is not a census. Source signals and standard GA4 attribution are not authenticated proof of origin. Store clicks are not installations, purchases or revenue, and this setup does not connect website identity with app/store/subscription identity. Analytics does not promise traffic, rankings or conversions.

## Release evidence — distinguish preparation from production verification

- [x] Correct owner account, RouteBudget property/stream and public Measurement ID verified; private internal IDs recorded only in owner-controlled records; Corvian property untouched. Account-wide sharing changes are documented above.
- [x] Owner confirmed independent-developer ownership in Italy; primary notice contact supplied, saved by the owner and verified in Google. No invented entity/country/address or contractual acceptance click.
- [ ] Website-specific Italian/English notice is published and describes the deployed settings; app-policy text is unchanged and clearly separate.
- [x] Property read-back confirms Enhanced Measurement OFF, Signals/advertising OFF, granular collection OFF, retention 2 months and reset OFF.
- [ ] Fresh browser: zero Google requests and GA cookies before any choice; same after refuse/dismiss and reload.
- [ ] Accept: exactly one controlled pageview; real Measurement ID; no query/hash/full referrer, raw UTM or sensitive canary appears in any Google request.
- [ ] Each store link sends one `store_outbound_click`, not also `cta_click`/automatic `click`; keyboard and new-tab navigation remain usable.
- [ ] Revoke: disable flag set immediately, only site GA cookies removed, no further collection after reload; script-load race and multiple tabs tested.
- [ ] Cookie lifetime is no more than 180 days and does not renew on ordinary activity; consent-record expiry tested independently.
- [ ] JavaScript disabled, analytics blocked, network failure and unavailable storage do not block content or calculator use.
- [ ] Controlled test receipt verified in the RouteBudget Realtime report; tests are identified as test activity, never reported as customer traffic.

Before deployment, verify ownership, required settings, privacy notice, consent/sanitization tests and release integrity. Production-only tests require the deployed canonical origin: record their results separately and do not substitute local fixtures or DOM checks for wire-level evidence. If production collection is observed before consent or sensitive data leaks, disable the collector immediately and investigate. An unavailable browser diagnostic is an explicit verification gap, not a passed test. Do not describe live receipt as confirmed merely because source files or a property exist.
