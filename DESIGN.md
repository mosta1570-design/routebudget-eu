# RouteBudget EU Design System

## Theme

Dark, committed, cinematic. Scene: a transport professional checks a quote in a dim cab or dispatch office before accepting a night route. Near-black surfaces protect focus; electric blue marks action and direction; emerald appears only when margin or profitability is positive.

## Color

All website tokens use OKLCH while preserving the shipping app palette as their source.

| Role | Token | Value | Use |
|---|---|---:|---|
| Night | `--night` | `oklch(14.5% 0.018 255)` | Page and hero ground |
| Asphalt | `--asphalt` | `oklch(20.5% 0.025 255)` | Raised sections |
| Steel | `--steel` | `oklch(27% 0.035 255)` | Borders and controls |
| Route blue | `--route` | `oklch(64% 0.16 250)` | Primary action and directional light |
| Route blue bright | `--route-bright` | `oklch(75% 0.13 242)` | Small highlights only |
| Profit | `--profit` | `oklch(74% 0.19 150)` | Positive margin and success |
| Pro | `--pro` | `oklch(67% 0.16 285)` | Small Pro status accents |
| Ink | `--ink` | `oklch(98% 0.005 250)` | Primary text |
| Muted ink | `--ink-muted` | `oklch(76% 0.025 255)` | Secondary text with AA contrast |

No gradient text. Gradients may shape light, depth, or image legibility without replacing semantic color.

## Typography

- Display, body, and UI: Inter, 300 to 700. Light editorial display lines contrast with medium navigation and readable body copy.
- Technical accent: basis33, used selectively for second metadata lines, compact product labels, and selected hero phrases. It never carries paragraphs or long-form content.
- Numerals: tabular lining figures for all route-cost examples.
- Hero maximum: 68 px, minimum 28 px on narrow mobile; explicit line breaks and selective basis33 scaling preserve the title-sequence geometry.
- Body measure: 65 ch maximum.

## Layout

- Hero occupies at least one viewport and uses a 12-column editorial grid without magazine styling.
- Desktop copy sits left; truck and product interface pull right. Mobile stacks copy, status, and compact product proof.
- Sections alternate between full-width narrative compositions and tight operational details. Avoid repeated card grids.
- Content maximum: 1440 px. Reading copy maximum: 720 px.
- Responsive spacing uses a 4 px base and fluid `clamp()` values.
- Long-form pages use an editorial two-column composition: readable article plus sticky pillar/app rail. On mobile, rail follows content flow.
- Guide and calculator hubs use bordered numbered rows, not generic blog cards. Tables may scroll horizontally without widening page.

## Shape and Depth

- Interactive controls: 14 to 18 px radius.
- Capsules reserved for compact status and metadata.
- Device frames: 36 to 44 px radius, thin steel border, deep grounded shadow.
- Blur appears only in sticky navigation and full-screen mobile menu.

## Motion

- One orchestrated hero load: header, headline, copy, and action reveal in sequence.
- Slow background drift and route-line progress create forward motion without moving layout.
- Product screenshots shift by a few pixels on hover or scroll; no bounce or elastic easing.
- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- `prefers-reduced-motion: reduce` disables transforms, looping movement, smooth scroll, and entrance sequencing.

## Components

- `CinematicHero`: locked full-screen media, compact desktop navigation, IT/EN switch, four-column metadata, editorial headline, factual chips, and full-screen mobile menu.
- `DemoOverlay`: real Android screenshots in a product demonstration; never a simulated video.
- `CostEquation`: connected operational formula rather than a feature-card grid.
- `ProductShowcase`: real Android screenshots in asymmetric phone compositions.
- `WorkflowSection`: calculate, compare, export, archive flow with one continuous route line.
- `GrowthResourcesSection`: premium landing-to-content bridge featuring one pillar and two practical calculators.
- `AudienceSection`: direct copy for driver, owner-operator, and small transport company contexts.
- `FinalCta`: single high-commitment store action with public support and legal links nearby.
- Static content shell: shared brand header, breadcrumb, editorial hero, article, source note, related links, contextual app CTA, and legal footer.
- Calculator panel: explicit labelled inputs, local processing note, inline error, live output, formula explanation, and non-binding-estimate caveat.

## Accessibility

- WCAG 2.2 AA contrast for text and controls.
- 44 px minimum touch targets.
- Visible `:focus-visible` ring using Route blue bright.
- Semantic landmarks and labelled navigation.
- Menu closes with Escape and restores page scrolling.
- Decorative imagery uses empty alt text; authentic app screenshots have task-specific descriptions.
- Reduced-motion mode preserves information without animation.
