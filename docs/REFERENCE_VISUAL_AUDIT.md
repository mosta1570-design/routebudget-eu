# RouteBudget EU — Reference Visual Audit

Audit date: 2026-08-01
Primary reference: <https://dribbble.com/shots/26980078-2026-Portfolio-Adam-Roberts>
Live implementation inspected: <https://www.grilledpixels.com/>

## Inspection method

- Opened the Dribbble shot in the authenticated in-app browser at a 1440 × 900 viewport.
- Inspected the static cover, all five embedded video controls, and started an available preview. Playback state and advancing video time were verified in the page.
- The Dribbble description does not expose a clickable live-site anchor. It explicitly identifies `grilledpixels [dot]` plus the US commercial suffix, so the live site was opened directly and verified by title and visible identity.
- Inspected the live first viewport at desktop and 390 × 844 mobile sizes.
- Opened the live site's full-screen mobile menu.
- Inspected desktop navigation geometry and transition timing. Navigation uses restrained color/opacity treatment with a long, deliberate cubic-bezier transition rather than scale-heavy effects.

## Visible layout structure

The reference first viewport is one edge-to-edge black composition. Content sits directly on full-bleed media; there is no centered shell, hero card, or dashboard frame.

1. Compact top navigation runs across the viewport with logo at far left, a small primary nav cluster near the upper middle/right, and a single far-right contact action.
2. A four-part metadata field sits below the navigation:
   - identity block,
   - positioning block,
   - concise "what I do" description,
   - compact services list.
3. A large, deliberately under-filled middle region creates cinematic negative space and gives the moving media room to read.
4. Lower-left holds a four-line, all-caps display headline. Conventional sans and pixel/display typography alternate within the same statement.
5. Lower-middle/right holds the showreel action and compact factual badges.
6. A hairline footer strip anchors the bottom edge with a short availability/CTA statement on the left and inventory metadata on the right.

## Proportions and alignment

- Outer desktop padding is compact: roughly 24 px at the sides and top in the live implementation.
- Top navigation consumes little vertical space. It behaves as a registration line, not a conventional marketing header.
- Metadata columns align to a shared upper baseline but use uneven widths. The first two identity columns are visually sparse; descriptive columns are denser.
- Headline starts close to the left viewport edge and occupies roughly the lower-left half. It does not center within the page.
- Action media overlaps the central/right field, allowing media and text to feel integrated instead of separated into modules.
- Footer content aligns to viewport edges and remains visually secondary.
- Desktop composition uses a wide horizontal reading order; mobile re-stacks identity, media, headline, and metadata into a controlled vertical sequence.

## Typography roles

- Normal sans: navigation, conventional headline lines, descriptions, services, and footer utility copy.
- Pixel/display face: identity second lines, technical labels, selected headline words, compact counts, and editorial markers.
- Headline hierarchy comes from type contrast, line breaks, and compressed leading—not gradients or heavy weight.
- Small labels use tracked capitals. Descriptive text stays narrow and low-contrast.
- Pixel typography is selective. It punctuates the information system without becoming body text.

RouteBudget mapping:

- Inter will carry normal navigation, body copy, actions, and conventional headline lines, per locked brief.
- `basis33` will carry `EU`, `MARGINI`, technical labels, `COSTO REALE`, `LA TRATTA`, and compact descriptors.

## Spacing rhythm

- Tight groups: logo/identity, each metadata label/body pair, capability chip label/detail.
- Moderate groups: navigation items and metadata columns.
- Large separation: metadata field to lower headline/action field, created by a true flex spacer.
- Bottom elements are held close to the viewport edge, preserving a precise frame.
- Rhythm is intentionally uneven: dense top information, empty cinematic middle, dense lower statement, thin bottom strip.

## Responsive changes

At 390 × 844:

- Desktop navigation collapses to one compact menu trigger.
- Brand and positioning form a two-column row.
- Short identity blurb occupies the upper-left beneath the row.
- Media becomes a central vertical focal element.
- Headline moves below media and keeps explicit editorial line breaks.
- Secondary metadata continues below the first viewport; primary identity and headline remain visible.
- Type scales down structurally, but stays left-aligned and high-contrast.

Mobile menu:

- Full-screen black overlay; no dropdown card.
- Logo and close control stay in the top registration line.
- Large vertical navigation is centered in the viewport.
- Current item uses a restrained red marker; other items remain white.
- Bottom strip remains visible with CTA on left and inventory on right.

## Motion and interaction behavior

- Hero/showreel media is active, muted, and integrated into the composition.
- Motion is slow and atmospheric; it does not compete with text.
- Showreel control uses an outlined, translucent rectangular treatment.
- Navigation state changes are restrained and use a deliberate cubic-bezier transition; no bouncy or elastic motion was observed.
- Mobile menu replaces the scene at full viewport scale. Open/close control changes from menu glyph to `X`.
- No blanket scroll-reveal choreography is needed for RouteBudget. Hero media, menu transition, link stagger, hover opacity, and modal state are sufficient.

## Structure preserved for RouteBudget

- Full-bleed, locked first viewport.
- Compact navigation registration line.
- Four-column desktop metadata system and two-column mobile identity row.
- True central negative space.
- Lower-left editorial headline with selective pixel typography.
- Lower-right media/demo action plus compact factual chips.
- Hairline bottom footer strip.
- Full-screen mobile menu with staged links.
- Direct text-over-media composition and restrained motion vocabulary.

## Identity replaced for RouteBudget

- Original personal logo, name, biography, portfolio navigation, services, awards, project inventory, showreel, colors, and imagery are not reused.
- RouteBudget icon/wordmark replaces original identity.
- Product navigation replaces portfolio navigation.
- Verified cost-calculation facts replace personal services.
- Capability chips replace award marks; no awards or metrics are implied.
- RouteBudget calculation headline replaces portfolio headline.
- Original media is replaced by an original Higgsfield-generated European trucking scene.
- RouteBudget app screenshots power the product demonstration and continuation.
- Brand accent remains RouteBudget blue; reference red is not copied.

## Implementation constraints derived from audit

- Hero root must remain `relative`, `h-screen`, `w-full`, `overflow-hidden`, and black.
- Media must be a real full-bleed `<video>` with desktop/mobile art direction and poster fallback.
- Center must remain free of feature cards, device mockups, dashboards, or decorative statistics.
- First-viewport text must stay legible without a heavy opaque panel.
- Footer and action column must remain visible at all accepted viewports.
- Mobile composition may reorder content, but cannot collapse into a generic centered SaaS hero.
