# RouteBudget EU website report

## Outcome

Rebuilt existing public site as a production-ready React + TypeScript + Tailwind CSS + Vite landing page. Direction is Italian-first, dark, cinematic, and product-led. Composition takes only broad confidence and pacing cues from the supplied reference; branding, layout, copy, imagery, and interactions are original RouteBudget work.

## Page system

- Full-viewport hero with original night-haul still, verified RouteBudget identity, direct product promise, live App Store and Google Play actions, and a concrete recommended-price proof.
- Fixed translucent top navigation with desktop anchors, IT/EN switch, App Store action, and a keyboard-accessible full-screen mobile menu.
- Operational cost equation instead of a generic feature-card grid.
- Asymmetric showcase using four authentic current Android screenshots.
- Numbered workflow for input, scenario comparison, PDF export, and local Archive.
- Audience section for driver, owner-operator, and small transport business.
- Support FAQ, public privacy/terms routes, and final two-store conversion section.

## Truth and content decisions

- App Store and Google Play availability are linked to verified public listings.
- Claims stay within current RouteBudget Android and shared app behavior.
- Toll language says estimate, not exact or official tariff.
- Core calculations and Archive are described as offline-capable; distance lookup, purchases, restore, and subscription sync remain connection-dependent.
- Android copy explicitly avoids Trip Tracking and map/navigation claims.
- No fabricated testimonials, customers, metrics, awards, ratings, or pricing.
- Italian is default. English can be switched without duplicating component markup.

## Visual system

- Palette derives from shipping RouteBudget colors and is implemented with OKLCH tokens.
- Barlow Condensed carries display hierarchy; Barlow carries body and interface copy.
- Route blue marks action and direction. Emerald appears only for positive price/margin proof.
- Movement uses restrained reveal, route-line, and hover transitions. `prefers-reduced-motion` disables nonessential motion.
- 44 px touch targets, visible focus states, semantic landmarks, descriptive screenshot alternatives, and responsive layouts support WCAG 2.2 AA goals.

## Media

- Four product screenshots and RouteBudget icon are real shipping assets.
- One AI-generated atmospheric truck still supplies hero and Open Graph art. Full provenance and disclosure: `docs/ROUTEBUDGET_SITE_ASSETS.md`.
- Higgsfield Seedance 2.0 was selected for a 5-second silent 1080p image-to-video hero. Preflight returned a 45-credit cost. Generation was not submitted because that paid spend requires separate explicit approval; no credits were consumed. The premium still remains the active fallback.

## Engineering

- Framework: React 19, TypeScript strict project references, Vite 8.
- Styling: Tailwind CSS 4 pipeline plus a committed custom design system in `src/styles.css`.
- Components: header, hero, cost equation, product showcase, workflow, audiences, support, closing CTA, footer.
- Legal pages remain static under `public/` to preserve `/privacy.html` and `/terms.html`.
- GitHub Pages base path remains `/routebudget-eu/`.
- Official GitHub Pages deployment workflow builds `dist/` after `npm run check`.

## Verification

- `npm audit`: 0 vulnerabilities at implementation time.
- `npm run check`: ESLint, TypeScript build, and Vite production build.
- Browser QA: desktop and mobile width checks, no horizontal overflow, full-screen menu open/close, Escape handling, locale switch, local links, image loading, and console-error inspection.
- Generated media reviewed visually before integration.

## Optional Higgsfield enhancement

Pending explicit approval to spend 45 Higgsfield credits, generate one Seedance 2.0 hero loop from `src/assets/hero-night-truck.jpg`, review it for truck/composition integrity, compress it for web delivery, and integrate it as a muted autoplay layer with the current still as poster and reduced-motion fallback.

## Deployment note

No live deployment was performed. Before first push-based deployment, change GitHub Pages source to **GitHub Actions** as documented in `README.md`.
