# Rassef33 — Design Layout & Components

## Site Structure

```
/ (Loading Screen)
    ↓ auto-transition after 3s
/hero (Hero Page)
    ↓ "Explore the Menu" button
/cocktails (Cocktails Page)
```

---

## Page 1 — Loading Screen

### Layout
- Full screen `100dvh` dark background `#0a0a0a`
- Two sections stacked vertically, each takes `50%` height

### Section 1 (Top Half)
- Vertically and horizontally centered
- Content:
  - `"Bar Menu"` — Inter, 11px, letter-spacing 0.35em, uppercase, color `#a09880`
  - `"RASSEF33"` — Cormorant Garamond, 42px, weight 300, letter-spacing 0.25em, uppercase, color `#f5f0e8`

### Section 2 (Bottom Half)
- Vertically and horizontally centered
- Content:
  - Progress bar — 1px height, full width with 40px horizontal padding, background `#1e1e1e`, fill color `#c9a84c`
  - `"made by majd salameh"` — Inter, 10px, letter-spacing 0.2em, uppercase, color `#a09880`

### Exit Animation Sequence
| Time | Event |
|---|---|
| 0s → 3s | GSAP fills progress bar from 0% to 100% |
| 3s → 3.3s | Brief pause at 100% |
| 3.3s → 4s | Section 1 slides UP + fades out (Motion) |
| 3.3s → 4s | Section 2 slides DOWN + fades out (Motion) — simultaneously |
| 3.5s → 4.2s | Hero page fades in from center |

---

## Page 2 — Hero Page

### Layout
- Full screen `100dvh`
- 3 layers stacked:

### Layer 1 — Background (z-index 0)
- Full screen absolute positioned
- Default: subtle radial gradient `radial-gradient(ellipse at center, #1a1208 0%, #0a0a0a 70%)`
- Overlay gradient top and bottom: `linear-gradient(to bottom, #0a0a0a99 0%, transparent 30%, transparent 70%, #0a0a0a99 100%)`
- `// TODO: swap for video/images/animated 3D object`

### Layer 2 — Content (z-index 10)
- Full screen flex column, `justify-content: space-between`
- Padding: `64px 36px 72px`
- Safe area insets top and bottom

### Top Section — Brand Stamp
- Thin gold gradient line: `linear-gradient(90deg, transparent, #c9a84c55, transparent)` height 0.5px
- `"RASSEF33"` — Cormorant Garamond, 28px, weight 300, letter-spacing 0.22em, uppercase, centered, full width, color `#f5f0e8`
- Thin gold gradient line below — same as above

### Center Section — Title Block
- Flex column, centered, gap 14px, text-align center
- `"Welcome to our"` — Inter, 11px, letter-spacing 0.35em, color `#a09880`, uppercase
- `"Cocktails"` — Cormorant Garamond, 68px, weight 300, color `#f5f0e8`, line-height 1.05
- `"Menu"` — Cormorant Garamond, 68px, weight 300, color `#c9a84c`, font-style italic, line-height 1.05
- Tagline row:
  - 28px gold gradient line left
  - `"Where every sip tells a story"` — Georgia, 17px, italic, color `#a09880`, letter-spacing 0.06em, white-space nowrap
  - 28px gold gradient line right

### Bottom Section — CTA Button
- Full width circular pill: `border-radius 100px`
- Background: `#111111`
- Border: `0.5px solid #c9a84c44`
- Box shadow: `0 0 24px #c9a84c15, 0 0 48px #c9a84c08`
- Top absolute line: gradient gold `linear-gradient(90deg, transparent 5%, #c9a84c66 50%, transparent 95%)`
- Bottom absolute line: same
- Left star: `✦` color `#c9a84c`, 12px, opacity 0.8
- Text: `"Explore the Menu"` — Cormorant Garamond, 10px, letter-spacing 0.35em, uppercase, color `#f5f0e8`
- Right star: `✦` color `#c9a84c`, 12px, opacity 0.8
- Hover state: border `#c9a84c99`, glow intensifies, text turns `#c9a84c`
- On click: navigate to `/cocktails`

### Hero Entrance Animations (Motion)
| Element | Animation |
|---|---|
| Top brand stamp | Fade in + slide down from -20px, delay 0.2s, duration 0.8s |
| "Welcome to our" | Fade in + slide up from 30px, delay 0.3s |
| "Cocktails" | Fade in + slide up from 30px, delay 0.45s |
| "Menu" | Fade in + slide up from 30px, delay 0.6s |
| Tagline | Fade in, delay 0.75s |
| Button | Fade in + slide up from 20px, delay 0.9s, duration 0.6s |

---

## Page 3 — Cocktails Page

### Overall Layout
- Full screen `100dvh`, background `#0a0a0a`
- Flex column

### Top Filter Bar
- Sticky, `z-index 20`
- Background: `#0a0a0a`
- Padding: `16px 20px 8px`
- Horizontal scrollable row, `scrollbar-width: none`
- Each filter pill:
  - Inactive: padding `6px 14px`, border-radius `20px`, color `#a09880`
  - Active: same + border `0.5px solid [cocktail accent color]`, text `[cocktail accent color]`

### Card Container
- `flex: 1`
- Margin: `8px 20px 24px` (sides and bottom)
- `border-radius: 24px`
- `overflow: hidden`
- Border: `0.5px solid [cocktail accent color]33`
- Box shadow: `0 0 30px [cocktail accent color]18`
- Swipeable — drag left/right to navigate (Motion drag)
- Swipe threshold: 80px

### Card Front Structure
```
┌─────────────────────┐
│ [dots]      [x / x] │  ← top bar
│                     │
│                     │
│   [cocktail image   │
│    or object]       │  ← center (to be decided)
│                     │
│                     │
│ [taste profile]     │
│ [cocktail name]     │  ← bottom info
│ ─────────────────── │
│ [tag] [tag] [tag]   │
│ ── tap to discover ─│
└─────────────────────┘
```

### Card Info (Bottom of Front)
- Gradient overlay: `linear-gradient(0deg, [bg dark]ee 0%, [bg dark]aa 50%, transparent 100%)`
- Taste profile: Inter, 8px, letter-spacing 0.3em, uppercase, color `[accent]aa`
- Cocktail name: Cormorant Garamond, 28px, weight 300, color `#fdf0e8`, letter-spacing 0.04em
- Gold separator line: `linear-gradient(90deg, [accent]55, transparent)`
- Flavor tags: 7px, border `0.5px solid [accent]44`, color `[accent]aa`, padding `3px 8px`, border-radius `20px`, background `[accent]11`
- Tap hint: Georgia italic, 8px, color `[accent]66`, flanked by 24px gold lines

### Card Back Structure (After Flip)
```
┌─────────────────────┐
│ [taste profile]     │
│ [cocktail name]     │  ← header
│ ─────── ✦ ────────  │
│                     │
│ INGREDIENTS         │
│ ✦ Ingredient 1      │  ← list
│ ✦ Ingredient 2      │
│ ✦ Ingredient 3      │
│ ✦ Ingredient 4      │
│                     │
│ DESCRIPTION         │
│ "italic description"│  ← description
│                     │
│ ── tap to close ──  │  ← footer
└─────────────────────┘
```

### Card Flip Animation (Motion)
```tsx
// Outer container
<div style={{ perspective: 1200 }} onClick={() => setFlipped(!flipped)}>
  // Inner rotating container
  <motion.div
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
    style={{ transformStyle: "preserve-3d", position: "relative" }}
  >
    // Front face
    <div style={{ backfaceVisibility: "hidden" }}>...</div>
    // Back face
    <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>...</div>
  </motion.div>
</div>
```

### Swipe Animation (Motion)
```tsx
const x = useMotionValue(0);
const handleDragEnd = (_, info) => {
  if (info.offset.x < -80 && currentIndex < cocktails.length - 1) {
    setCurrentIndex(prev => prev + 1);
  } else if (info.offset.x > 80 && currentIndex > 0) {
    setCurrentIndex(prev => prev - 1);
  }
  animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
};

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.15}
  onDragEnd={handleDragEnd}
  style={{ x }}
/>
```

### Theme Transition
- When swiping to next cocktail, the entire background crossfades in `0.6s`
- All accent colors update simultaneously
- Use `motion.div` with `animate={{ backgroundColor }}` on background layer

### Dot Indicators
- Below card, `padding: 0 0 8px`
- One dot per cocktail
- Active dot: `[cocktail accent color]`, size `7px`
- Inactive dot: `#1e1e1e`, border `0.5px solid [accent]22`, size `7px`

---

## Shared Components

### Button (src/components/ui/Button.tsx)
```tsx
// Pill button used on hero page
// Props: label, onClick, accentColor (default #c9a84c)
```

### FilterBar (src/components/cocktails/FilterBar.tsx)
```tsx
// Props: cocktails[], activeIndex, onSelect
// Horizontal scrollable, accent color per active cocktail
```

### CocktailCard (src/components/cocktails/CocktailCard.tsx)
```tsx
// Props: cocktail (Cocktail type), isActive
// Handles flip state internally
// Uses cocktail.accentColor for all theming
```

### CocktailMenu (src/components/cocktails/CocktailMenu.tsx)
```tsx
// Props: cocktails[]
// Manages currentIndex state
// Handles swipe gesture
// Renders FilterBar + CocktailCard + dots
```

---

## Typography Scale

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Brand / Logo | Cormorant Garamond | 28–42px | 300 | #f5f0e8 |
| Hero title | Cormorant Garamond | 68px | 300 | #f5f0e8 |
| Hero accent | Cormorant Garamond | 68px | 300 | #c9a84c italic |
| Cocktail name | Cormorant Garamond | 28px | 300 | #fdf0e8 |
| Tagline | Georgia | 17px | 400 | #a09880 italic |
| Taste profile | Inter | 8px | 400 | [accent]aa |
| Ingredients | Cormorant Garamond | 14px | 300 | #f5f0e8 |
| Description | Georgia | 11px | 400 | #a09880 italic |
| Tags | Inter | 7px | 400 | [accent]aa |
| Labels | Inter | 8–11px | 400 | #a09880 |
| Credit | Inter | 10px | 300 | #a09880 |
| Button | Cormorant Garamond | 10px | 400 | #f5f0e8 |

---

## Global Design Rules

- Mobile first, max-width `430px` centered on desktop
- All backgrounds dark — never pure white
- Use `#f5f0e8` warm cream, never `#ffffff`
- Gold `#c9a84c` used sparingly — only for key accents
- No drop shadows on cards — flatness is intentional
- No border radius below `20px` on cards
- All animations respect `prefers-reduced-motion`
- Minimum touch target `44x44px`
- Never use more than 2 accent colors per screen
