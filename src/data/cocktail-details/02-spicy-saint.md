# Spicy Saint — Design & Colors

## Cocktail Data

```typescript
{
  id: "spicy-saint",
  name: "Spicy Saint",
  description: "A bold citrus kick with a fiery finish",
  taste: "Sweet & Sour",
  color: "#f5a878",
  image: "/images/spicy-saint.jpg",
  ingredients: [
    "Tequila San German",
    "Freshly Squeezed Lemon",
    "Peach Syrup",
    "Tabasco Drops",
  ],
  flavorNotes: ["citrus", "peach", "spice"],
}
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background Dark | `#2d0a05` | Card edges, deepest shadows |
| Background Mid | `#5c1a08` | Mid background tones |
| Background Warm | `#c4501a` | Center background warmth |
| Background Bright | `#e8824a` | Brightest background point |
| Background Fade | `#d4603a` | Upper mid tones |
| Background Deep | `#3d1008` | Lower dark tones |
| Accent Primary | `#f5a878` | Borders, tags, lines, dots, text labels |
| Accent Hot | `#cc3418` | Tabasco red — spice tags, secondary accent |
| Accent Light | `#f5c498` | Soft peach — sparkle particles |
| Accent Glow | `#f5a87844` | Radial glow overlay |

---

## Background Gradient

```css
background: linear-gradient(
  145deg,
  #2d0a05 0%,
  #5c1a08 20%,
  #c4501a 45%,
  #e8824a 60%,
  #d4603a 75%,
  #3d1008 100%
);
```

### Radial Overlays
```css
/* Peach warm glow — top left */
background: radial-gradient(ellipse at 30% 25%, #f5a87844 0%, transparent 55%);

/* Tabasco deep red — bottom right */
background: radial-gradient(ellipse at 75% 70%, #cc341855 0%, transparent 50%);
```

---

## Particle System

### Particle Colors
- `#f5c498` — soft peach sparkles (opacity 0.5–0.7)
- `#f5a878` — deep peach (opacity 0.4–0.6)
- `#cc3418` — tabasco red (opacity 0.4–0.6)

### Particle Types
- Small dots: `2–3px`, border-radius `50%`
- Medium orbs: `8–12px`, border-radius `50%`, with subtle border `0.5px solid [color]33`
- No floating ingredient objects — pure color particles only

### GSAP Float Animation
```typescript
gsap.to(".spicy-saint-particle", {
  y: -15,
  x: "random(-8, 8)",
  duration: "random(2.5, 4)",
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  stagger: { amount: 2, from: "random" }
});
```

---

## Card Front

### Border & Shadow
```css
border: 0.5px solid #f5a87833;
box-shadow: 0 0 30px #cc341818, 0 0 60px #f5a8780a;
```

### Dot Indicators
- Active: `#f5a878`
- Inactive: `#2d0a05` with border `0.5px solid #f5a87822`

### Counter Text
```css
color: #f5a87888;
```

### Bottom Info Section
```css
/* Gradient overlay */
background: linear-gradient(0deg, #2d0a05ee 0%, #2d0a05aa 50%, transparent 100%);
```

- Taste label: color `#f5a878aa`
- Cocktail name: color `#fdf0e8`
- Separator line: `linear-gradient(90deg, #f5a87855, transparent)`
- Tap hint: color `#f5a87866`

### Flavor Tags
```css
/* Citrus + Peach tags */
border: 0.5px solid #f5a87844;
color: #f5a878aa;
background: #f5a87811;

/* Spice tag */
border: 0.5px solid #cc341833;
color: #cc3418aa;
background: #cc341811;
```

---

## Card Back

### Background
```css
background: linear-gradient(145deg, #2d0a05 0%, #5c1a08 40%, #3d1008 100%);
```

### Accent Elements
- Section titles (INGREDIENTS, DESCRIPTION): color `#f5a878`, letter-spacing 0.2em
- Ingredient bullets: `✦` color `#f5a878`
- Ingredient text: Cormorant Garamond, color `#fdf0e8`
- Description text: Georgia italic, color `#a09880`
- Separator: `0.5px solid #cc341822`
- Tap to close: color `#f5a87866` italic

---

## Filter Bar (Active State)
```css
border: 0.5px solid #f5a878;
color: #f5a878;
```

---

## Mood & Energy
**Spicy Saint** feels: warm, daring, citrusy, alive.
The gradient moves from deep dark red at the edges to a burst of peach-orange warmth in the center — like staring into a setting sun with a chili kick.
