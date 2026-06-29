# Nise & Anise — Design & Colors

## Cocktail Data

```typescript
{
  id: "nise-anise",
  name: "Nise & Anise",
  description: "Surprising, aromatic and alive — it hits different every time",
  taste: "Sour · Sweet · Aromatic",
  color: "#e8405a",
  image: "/images/nise-anise.jpg",
  ingredients: [
    "Arak",
    "Passion Fruit Liqueur",
    "Red Grapefruit Syrup",
    "Fresh Lemon",
  ],
  flavorNotes: ["grapefruit", "passion", "arak"],
}
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background Dark | `#1a0508` | Card edges, deepest shadows |
| Background Mid | `#4a0e18` | Mid background tones |
| Background Hot | `#c42840` | Deep coral-crimson |
| Background Coral | `#e8405a` | Vivid coral peak |
| Background Pink | `#f06878` | Hot pink highlight |
| Background Base | `#3a0c18` | Lower dark base |
| Accent Primary | `#e8405a` | Borders, tags, lines, dots |
| Accent Pink | `#f06878` | Hot pink — secondary labels, particles |
| Accent Blush | `#f5c8d0` | Lightest blush — sparkle particles |
| Accent Deep | `#c8283a` | Deep crimson — tertiary accent |

---

## Background Gradient

```css
background: linear-gradient(
  145deg,
  #1a0508 0%,
  #4a0e18 18%,
  #c42840 38%,
  #e8405a 55%,
  #f06878 70%,
  #3a0c18 100%
);
```

### Radial Overlays
```css
/* Hot pink glow — upper center */
background: radial-gradient(ellipse at 40% 30%, #f5889844 0%, transparent 55%);

/* Deep crimson — lower right */
background: radial-gradient(ellipse at 65% 70%, #8a102833 0%, transparent 50%);

/* Warm coral — left side */
background: radial-gradient(ellipse at 20% 60%, #f0687822 0%, transparent 45%);
```

---

## Particle System

### Particle Colors
- `#f5c8d0` — soft blush sparkles (opacity 0.5–0.7)
- `#e8405a` — vivid coral (opacity 0.4–0.7)
- `#f06878` — hot pink (opacity 0.3–0.5)
- `#c8283a` — deep crimson orbs (opacity 0.2–0.4)

### Particle Types
- Small dots: `2–3px`, border-radius `50%`
- Medium orbs: `8–12px`, border-radius `50%`, subtle border
- No floating ingredient objects — pure color particles only

### GSAP Float Animation
```typescript
gsap.to(".nise-anise-particle", {
  y: -18,
  x: "random(-10, 10)",
  duration: "random(2, 3.5)",
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  stagger: { amount: 1.5, from: "random" }
});
```
Note: slightly faster and more energetic than other cocktails — matches the "surprising" character.

---

## Card Front

### Border & Shadow
```css
border: 0.5px solid #e8405a33;
box-shadow: 0 0 30px #e8405a18, 0 0 60px #e8405a0a;
```

### Dot Indicators
- Active: `#e8405a`
- Inactive: `#1a0508` with border `0.5px solid #e8405a22`

### Counter Text
```css
color: #e8405a88;
```

### Bottom Info Section
```css
/* Gradient overlay */
background: linear-gradient(0deg, #1a0508ee 0%, #1a0508aa 50%, transparent 100%);
```

- Taste label: color `#e8405a99`
- Cocktail name: color `#fdf0f0`
- Separator line: `linear-gradient(90deg, #e8405a66, transparent)`
- Tap hint: color `#e8405a66`

### Flavor Tags
```css
/* Grapefruit + Arak tags */
border: 0.5px solid #e8405a44;
color: #e8405a99;
background: #e8405a11;

/* Passion tag */
border: 0.5px solid #f0687844;
color: #f0687899;
background: #f0687811;
```

---

## Card Back

### Background
```css
background: linear-gradient(145deg, #1a0508 0%, #4a0e18 40%, #3a0c18 100%);
```

### Accent Elements
- Section titles: color `#f06878`, letter-spacing 0.2em
- Ingredient bullets: `✦` color `#e8405a`
- Ingredient text: Cormorant Garamond, color `#fdf0f0`
- Description text: Georgia italic, color `#a09880`
- Separator: `0.5px solid #e8405a22`
- Tap to close: color `#e8405a66` italic

---

## Filter Bar (Active State)
```css
border: 0.5px solid #e8405a;
color: #e8405a;
```

---

## Mood & Energy
**Nise & Anise** feels: electric, bold, surprising, vibrant.
The gradient blazes from deep dark crimson edges to a vivid coral-pink center — like neon light caught in a glass of iced grapefruit. It's the cocktail that catches your eye from across the room. Loud, alive, unapologetic.
