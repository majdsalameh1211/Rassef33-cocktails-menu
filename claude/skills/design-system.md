# Design System Skill — Rassef33

## Brand Identity
Rassef33 is a premium bar. The design must feel like a high-end cocktail experience.
Minimal. Dark. Elegant. Every element earns its place.

## Color Tokens

```css
:root {
  --background: #0a0a0a;
  --surface: #111111;
  --text-primary: #f5f0e8;
  --text-secondary: #a09880;
  --gold: #c9a84c;
  --gold-muted: #8a6f2e;
  --border: #1e1e1e;

  /* Cocktail specific */
  --spicy-saint: #f2e6a0;
  --golden-barrel: #c17f3a;
}
```

## Tailwind Custom Tokens
These are defined in tailwind.config.ts and must be used consistently:

| Tailwind Class | Value |
|---|---|
| bg-background | #0a0a0a |
| bg-surface | #111111 |
| text-primary | #f5f0e8 |
| text-secondary | #a09880 |
| text-gold | #c9a84c |
| border-border | #1e1e1e |
| bg-gold | #c9a84c |

## Typography Rules

### Cormorant Garamond — var(--font-cormorant)
- Used for: RASSEF33 logo, page titles, cocktail names, section headings
- Weight: 300 for large display text, 500 for headings, 600 for emphasis
- Letter spacing: tracking-widest for logo, tracking-wide for headings
- Always uppercase for the brand name RASSEF33

### Inter — var(--font-inter)
- Used for: ingredients, descriptions, labels, tags, buttons, credits
- Weight: 300 for body, 400 for labels, 500 for buttons
- Always lowercase or sentence case, never uppercase

## Spacing System
- Base unit: 4px
- Page horizontal padding: 24px (px-6)
- Section vertical gap: 48px (gap-12)
- Card inner padding: 24px (p-6)
- Element gap: 16px (gap-4)

## Component Rules

### Buttons
```tsx
// Primary button
<button className="
  px-8 py-3
  border border-gold
  text-gold
  font-inter font-light
  text-sm
  tracking-widest
  uppercase
  transition-all duration-300
  hover:bg-gold hover:text-background
">
  See All Cocktails
</button>
```

### Tags / Taste Labels
```tsx
<span className="
  px-3 py-1
  text-xs
  font-inter
  border border-current
  rounded-full
  opacity-80
">
  Sweet & Sour
</span>
```

### Cards
- Background: var(--surface) on front
- Background: cocktail color with 20% opacity on back
- Border: 1px solid var(--border)
- Border radius: 16px
- Shadow: none — flatness is intentional

## Do's and Don'ts

### Do
- Use generous whitespace
- Let typography breathe with line-height 1.6+
- Use gold sparingly — only for key accents and CTAs
- Keep backgrounds dark and deep
- Use opacity variants of cocktail colors for backgrounds

### Don't
- Never use pure white (#ffffff) — use #f5f0e8 instead
- Never use more than 2 accent colors per screen
- Never add drop shadows to cards
- Never use font sizes below 11px
- Never crowd elements — if it feels tight, add more space
- Never use animations that distract from the content

## Loading Screen Specific
- Background: #0a0a0a
- Logo: Cormorant Garamond, 300 weight, tracking-widest, #f5f0e8
- Progress bar: 2px height, gold color, full width
- Credit: Inter, 11px, #a09880, bottom center
- No images, no decorations — pure typography and the bar

## Hero Specific
- Full viewport height (100dvh)
- Logo centered vertically and horizontally
- Cocktail object placeholder: animated CSS glass, centered, below title
- CTA button: bottom quarter of screen
- Subtle gold line separator between title and object

## Cocktails Page Specific
- Filter bar sticky at top, full width
- Active filter: gold text + gold border-bottom
- Inactive filter: secondary text, no border
- Cards fill remaining viewport height
- Swipe indicator: subtle dots at bottom showing current card position