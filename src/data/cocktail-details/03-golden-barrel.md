# Golden Barrel — Design & Colors

## Cocktail Data

```typescript
{
  id: "golden-barrel",
  name: "Golden Barrel",
  description: "Rich, warm and deeply aromatic",
  taste: "Bittersweet & Aromatic",
  color: "#c9a84c",
  image: "/images/golden-barrel.jpg",
  ingredients: [
    "Whiskey",
    "Almond Liqueur",
    "Honey Liqueur",
    "Angostura Bitters",
  ],
  flavorNotes: ["honey", "almond", "bitter", "smoke"],
}
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background Dark | `#1a0e04` | Card edges, deepest shadows |
| Background Mid | `#3d1f08` | Mid background tones |
| Background Warm | `#8b4513` | Rich saddle brown center |
| Background Bright | `#c17f3a` | Warm amber peak |
| Background Gold | `#c9a84c` | Gold highlight tones |
| Background Deep | `#2d1506` | Lower dark base |
| Accent Primary | `#c9a84c` | Borders, tags, lines, dots, text labels |
| Accent Amber | `#c17f3a` | Amber — secondary accent |
| Accent Brown | `#8b4513` | Deep saddle brown — tertiary |
| Accent Glow | `#c9843044` | Radial glow overlay |

---

## Background Gradient

```css
background: linear-gradient(
  145deg,
  #1a0e04 0%,
  #3d1f08 20%,
  #8b4513 45%,
  #c17f3a 60%,
  #c9a84c 72%,
  #2d1506 100%
);
```

### Radial Overlays
```css
/* Warm gold glow — upper left */
background: radial-gradient(ellipse at 35% 28%, #c9843044 0%, transparent 52%);

/* Deep amber — lower right */
background: radial-gradient(ellipse at 70% 72%, #8b451344 0%, transparent 48%);

/* Center depth */
background: radial-gradient(ellipse at 50% 50%, #00000022 0%, transparent 60%);
```

---

## Particle System

### Particle Colors
- `#c9a84c` — gold sparkles (opacity 0.5–0.7)
- `#c17f3a` — amber (opacity 0.4–0.6)
- `#8b4513` — deep brown (opacity 0.3–0.5)

### Particle Types
- Small dots: `2–3px`, border-radius `50%`
- Medium orbs: `8–12px`, border-radius `50%`, with subtle border `0.5px solid [color]33`
- No floating ingredient objects — pure color particles only

### GSAP Float Animation
```typescript
gsap.to(".golden-barrel-particle", {
  y: -12,
  x: "random(-6, 6)",
  duration: "random(3, 5)",
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  stagger: { amount: 2.5, from: "random" }
});
```

---

## Card Front

### Border & Shadow
```css
border: 0.5px solid #c17f3a33;
box-shadow: 0 0 30px #c17f3a18, 0 0 60px #c9a84c0a;
```

### Dot Indicators
- Active: `#c9a84c`
- Inactive: `#1a0e04` with border `0.5px solid #c17f3a22`

### Counter Text
```css
color: #c9a84c88;
```

### Bottom Info Section
```css
/* Gradient overlay */
background: linear-gradient(0deg, #1a0e04ee 0%, #1a0e04aa 50%, transparent 100%);
```

- Taste label: color `#c9a84caa`
- Cocktail name: color `#f5f0e8`
- Separator line: `linear-gradient(90deg, #c9a84c55, transparent)`
- Tap hint: color `#c9a84c66`

### Flavor Tags
```css
/* All tags same accent */
border: 0.5px solid #c9a84c44;
color: #c9a84caa;
background: #c9a84c11;
```

---

## Card Back

### Background
```css
background: linear-gradient(145deg, #1a0e04 0%, #3d1f08 40%, #2d1506 100%);
```

### Accent Elements
- Section titles: color `#c9a84c`, letter-spacing 0.2em
- Ingredient bullets: `✦` color `#c9a84c`
- Ingredient text: Cormorant Garamond, color `#f5f0e8`
- Description text: Georgia italic, color `#a09880`
- Separator: `0.5px solid #8b451322`
- Tap to close: color `#c9a84c66` italic

---

## Filter Bar (Active State)
```css
border: 0.5px solid #c9a84c;
color: #c9a84c;
```

---

## Mood & Energy
**Golden Barrel** feels: rich, warm, slow, sophisticated.
The gradient moves from deep dark brown edges to a burst of amber and gold at the center — like candlelight caught in a crystal whiskey glass. Heavy, aromatic, luxurious.
