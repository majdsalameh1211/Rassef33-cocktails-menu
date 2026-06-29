# Bad Habit — Design & Colors

## Cocktail Data

```typescript
{
  id: "bad-habit",
  name: "Bad Habit",
  description: "Dangerously delicate — a floral sip you won't forget",
  taste: "Sweet · Fruity · Delicate",
  color: "#9b3a6e",
  image: "/images/bad-habit.jpg",
  ingredients: [
    "Vodka",
    "Violet Liqueur",
    "Rosé Vermouth",
    "Strawberry Syrup",
    "Fresh Lemon",
  ],
  flavorNotes: ["strawberry", "violet", "rose"],
}
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background Dark | `#1a0510` | Card edges, deepest shadows |
| Background Mid | `#3d0f28` | Mid background tones |
| Background Deep | `#6b1a44` | Deep crimson burgundy |
| Background Rose | `#9b3a6e` | Rich rose peak |
| Background Soft | `#c47aaa` | Soft violet-pink highlight |
| Background Base | `#2d0820` | Lower dark base |
| Accent Primary | `#9b3a6e` | Borders, tags, lines, dots |
| Accent Soft | `#c47aaa` | Soft violet-pink — text labels, particles |
| Accent Blush | `#e8c0d8` | Lightest blush — sparkle particles |
| Accent Purple | `#7a5588` | Violet tones — violet liqueur reference |

---

## Background Gradient

```css
background: linear-gradient(
  145deg,
  #1a0510 0%,
  #3d0f28 20%,
  #6b1a44 42%,
  #9b3a6e 58%,
  #c47aaa 72%,
  #2d0820 100%
);
```

### Radial Overlays
```css
/* Soft rose glow — upper area */
background: radial-gradient(ellipse at 35% 25%, #c47aaa44 0%, transparent 55%);

/* Deep crimson — lower area */
background: radial-gradient(ellipse at 70% 75%, #4a0f3055 0%, transparent 50%);

/* Blush highlight — center */
background: radial-gradient(ellipse at 60% 40%, #e8c0d822 0%, transparent 45%);
```

---

## Particle System

### Particle Colors
- `#e8c0d8` — soft blush sparkles (opacity 0.5–0.7)
- `#c47aaa` — violet-pink (opacity 0.4–0.7)
- `#9b3a6e` — deep rose orbs (opacity 0.2–0.4)
- `#7a5588` — purple violet (opacity 0.3–0.5)

### Particle Types
- Small dots: `2–3px`, border-radius `50%`
- Medium orbs: `8–12px`, border-radius `50%`, subtle border
- No floating ingredient objects — pure color particles only

### GSAP Float Animation
```typescript
gsap.to(".bad-habit-particle", {
  y: -14,
  x: "random(-7, 7)",
  duration: "random(2.8, 4.5)",
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
border: 0.5px solid #9b3a6e33;
box-shadow: 0 0 30px #6b1a4418, 0 0 60px #9b3a6e0a;
```

### Dot Indicators
- Active: `#9b3a6e`
- Inactive: `#1a0510` with border `0.5px solid #9b3a6e22`

### Counter Text
```css
color: #c47aaa88;
```

### Bottom Info Section
```css
/* Gradient overlay */
background: linear-gradient(0deg, #1a0510ee 0%, #1a0510aa 50%, transparent 100%);
```

- Taste label: color `#c47aaa99`
- Cocktail name: color `#fdf0f5`
- Separator line: `linear-gradient(90deg, #9b3a6e66, transparent)`
- Tap hint: color `#c47aaa66`

### Flavor Tags
```css
/* Strawberry + Rosé tags */
border: 0.5px solid #9b3a6e44;
color: #c47aaa99;
background: #9b3a6e11;

/* Violet tag */
border: 0.5px solid #7a558844;
color: #c47aaa88;
background: #7a558811;
```

---

## Card Back

### Background
```css
background: linear-gradient(145deg, #1a0510 0%, #3d0f28 40%, #2d0820 100%);
```

### Accent Elements
- Section titles: color `#c47aaa`, letter-spacing 0.2em
- Ingredient bullets: `✦` color `#9b3a6e`
- Ingredient text: Cormorant Garamond, color `#fdf0f5`
- Description text: Georgia italic, color `#a09880`
- Separator: `0.5px solid #9b3a6e22`
- Tap to close: color `#c47aaa66` italic

---

## Filter Bar (Active State)
```css
border: 0.5px solid #9b3a6e;
color: #9b3a6e;
```

---

## Mood & Energy
**Bad Habit** feels: intimate, floral, dangerously soft.
The gradient blooms from deep dark crimson to a soft dusty rose — like a dried pansy pressed between the pages of a secret. Sweet, feminine, unforgettable.
