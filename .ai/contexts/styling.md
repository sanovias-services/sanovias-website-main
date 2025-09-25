# Sanovias Design System

## Color Palette
Primary brand colors deliver a balance of medical trust, Mediterranean freshness, and premium positioning.

- **Primary – Mediterranean Turquoise**  
  Code: #2CA6A4
  Usage: Primary CTAs, interactive focus states, key icon accents, progress indicators.  
  Rationale: Clean, health-associated tone with a coastal freshness.

- **Secondary – Soft Gold / Champagne**
  Code: #C9A66B
  Usage: Subtle highlights (borders, small icons, dividers, stat accents), premium service tags, pricing emphasis.  
  Rationale: Signals aspirational quality without drifting into ostentatious luxury.

- **Background Neutrals**  
  - Pure White #FFFFFF – High contrast sections and hero areas.  
  - Light Sand #F7F5F2 – Soft section backgrounds to create layered elevation and warmth.  
  - Mist Gray #E6E8EA – Lines, subtle separators, muted panel fills (optional).  
  - Charcoal Text #1F2937 – Primary body text.  
  - Cool Gray #6B7280 – Secondary/supporting text.

- **Accent – Deep Navy / Teal**  
  Code: #1C3C47
  Usage: Headings over light backgrounds, navigation bar (optional), footer base, strong contrast buttons (secondary style).  
  Rationale: Stability, trust, medical professionalism.

- **Support / Semantic (Optional Future Extension)**  
  - Success: #1F8F6B  
  - Warning: #D3A447 (harmonizes with Champagne)  
  - Error: #C44545  

Accessibility Note: Ensure a minimum 4.5:1 contrast ratio. Deep Navy on Light Sand and Turquoise on White both pass for large text and most UI elements; verify edge cases (e.g., Gold on White) and pair Gold with darker backing when used for text.

## Typography (Updated System)
We employ a dual-type system pairing an elegant editorial serif with a functional UI workhorse.

- **Primary Typeface (Brand / Headings)**: 
  Font: Playfair Display (Google font)
  Styles: Bold (700) / SemiBold (600) for H1–H3, Italic for quotes & emotional accent lines.  
  Character: Aspirational, refined, medical-trust meets boutique facilitation.

- **Secondary Typeface (Body / UI)**: 
  Font: Inter (Google font)
  Styles: Regular (400) for paragraphs, Medium (500) for labels, SemiBold (600) for CTAs/navigation.  
  Character: Highly legible at small sizes, balances decorative serif.

### Usage Guidelines
| Element | Typeface | Weight / Style | Transform | Suggested Size |
|--------|----------|----------------|-----------|----------------|
| Hero H1 | Playfair Display | Bold | UPPERCASE (hero only) | clamp(2.5rem, 5vw, 3.5rem) |
| Inner H1 | Playfair Display | Bold | Title Case | 3rem / 48px |
| H2 | Playfair Display | SemiBold | Title Case | 2.25rem / 36px |
| H3 | Playfair Display | SemiBold | Title Case | 1.5rem / 24px |
| Body / Paragraph | Inter | Regular | Sentence case | 1rem–1.125rem (16–18px) |
| Small Meta | Inter | Medium | UPPERCASE (sparse) | 0.75–0.875rem |
| CTA Buttons | Inter | SemiBold | UPPERCASE | 0.875–1rem |
| Quotes / Accents | Playfair Display | Italic | As-needed | 1.125–1.25rem |

Line-Height Guidance:
- Headings: 1.1–1.2 (tight for impact)
- Body: 1.55–1.7 (comfortable reading)
- Captions / Small: 1.3–1.4

Tracking:
- Uppercase hero headings: +2 to +4 letter-spacing (CSS: tracking-wide / custom)
- Body: Normal

Fallback Stack Examples:
- Playfair Display: 'Playfair Display', Georgia, 'Times New Roman', serif
- Inter: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Oxygen, sans-serif

Performance Note: Load only required font weights (400, 500, 600, 700 + italic 400/600) to reduce CLS & font swap delays.

## UI Components (Refined)
Component styling should visually reinforce trust, clarity, and premium care without visual noise.

### Buttons
- **Primary Button**: Turquoise (#2CA6A4) background, white text, 8–10px radius, subtle inner focus ring + outer shadow on focus (accessibility).  
  Hover: Shift toward #26928F (darker by ~10%), box-shadow elevation.  
  Active: Slight scale (0.97) + darker shade.  
- **Secondary Button**: Transparent or Light Sand background with 2px Deep Navy (#1C3C47) border, Deep Navy text. Hover fills with Deep Navy, text switches to White.  
- **Tertiary / Quiet**: Text-only Inter Medium with underline on hover; used sparingly.  
- **Gold Accent Variant**: Soft Gold background (#C9A66B) with Deep Navy text reserved for premium tiers or highlighted offers (avoid overuse).
- **Disabled State**: Background #E2E8EA, text #94A3B8, cursor-not-allowed, no elevation.

### Cards
- Background: White (#FFFFFF) or Light Sand (#F7F5F2) for grouped sections.
- Border: 1px solid rgba(0,0,0,0.04) OR soft shadow (0 4px 12px -4px rgba(0,0,0,0.08)).
- Heading: Playfair Display SemiBold.
- Body: Inter Regular.
- Optional Accent Bar: 4px top strip in Turquoise or Deep Navy for categorization.

### Forms
- Inputs: 1px neutral border (#D1D5DB), 6–8px radius, focus border Turquoise with subtle glow (outline + ring).  
- Labels: Inter Medium, 0.875rem.  
- Helper / Error Text: 0.75–0.8125rem; error color #C44545.  
- Group Spacing: 1rem–1.25rem vertical.
- CTA Placement: Right-aligned (desktop) or full-width (mobile).

### Navigation
- Top bar background: White or Light Sand with subtle bottom border (rgba(0,0,0,0.06)) or translucent over hero imagery.
- Active link: Underline accent or pill with Turquoise background & white text.
- Mobile menu: Full-height overlay with Deep Navy background; links in White with Turquoise hover.

### Imagery & Iconography
- Icons: Stroke-based for clarity; accent color Turquoise or Deep Navy. Gold used only for emphasis.
- Photos: Clinical clarity + warm human care. Use soft gradients (Turquoise → Light Sand) as overlays for readability.

### Elevation System
| Level | Usage | Style |
|-------|-------|-------|
| 0 | Flat sections | none / border only |
| 1 | Cards | 0 2px 4px -2px rgba(0,0,0,0.08) |
| 2 | Interactive hover | 0 4px 12px -4px rgba(0,0,0,0.12) |
| 3 | Modals / overlays | 0 8px 28px -6px rgba(0,0,0,0.18) |

### Motion Principles
- Subtle fade + upward 8px transform for entrances.
- Button hover: 120–150ms ease-out.
- Avoid parallax or excessive motion (focus on calm assurance).

## Spacing System
- Base unit: 4px
- Common spacings: 16px, 24px, 32px, 48px, 64px

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Image Guidelines
- Use high-quality medical and location images
- Prefer images showing patient care and professional medical settings
- Use the Sanovias logo consistently without modification