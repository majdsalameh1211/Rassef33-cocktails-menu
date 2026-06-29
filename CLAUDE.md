# CLAUDE.md — Rassef33 Cocktails Menu

## Project Overview
Rassef33 is a mobile-first cocktail menu website for a bar, accessed via QR code.
Built as a premium, elegant, animated experience — not a standard menu.
This file is the single source of truth for Claude Code. Read it at the start of every session.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS (App Router, src/ directory, @/* alias)
- Motion (Framer Motion) for UI animations
- GSAP + @gsap/react for advanced sequences
- next/font built into Next.js for Google Fonts

## Folder Structure
src/

├── app/

│   ├── layout.tsx

│   ├── page.tsx

│   ├── hero/

│   │   └── page.tsx

│   └── cocktails/

│       └── page.tsx

├── components/

│   ├── loading/

│   │   └── LoadingScreen.tsx

│   ├── hero/

│   │   └── HeroSection.tsx

│   ├── cocktails/

│   │   ├── CocktailCard.tsx

│   │   ├── CocktailMenu.tsx

│   │   └── FilterBar.tsx

│   └── ui/

│       └── Button.tsx

├── data/

│   └── cocktails.ts

├── lib/

│   └── fonts.ts

└── styles/

└── globals.css

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| Background | #0a0a0a | Page background |
| Surface | #111111 | Card backgrounds |
| Text Primary | #f5f0e8 | Headings and body |
| Text Secondary | #a09880 | Muted labels |
| Gold Accent | #c9a84c | Buttons, highlights |
| Gold Muted | #8a6f2e | Subtle accents |
| Border | #1e1e1e | Dividers, card borders |

### Cocktail Colors

| Cocktail | Color | Hex |
|---|---|---|
| Spicy Saint | Pale yellow | #f2e6a0 |
| Golden Barrel | Deep amber | #c17f3a |

### Typography

- **Headings** — Cormorant Garamond, elegant serif, used for titles and cocktail names
- **Body** — Inter, clean sans-serif, used for ingredients and descriptions

### Layout Rules

- Mobile first, centered layout, max-width 430px
- Horizontal padding 24px
- Card height 70vh
- Border radius 16px for cards, 8px for buttons

### Animation Principles

- Smooth and subtle, never overdone
- Entrance animations use fade combined with slight upward translate
- Standard duration is 0.4s to 0.8s, hero animations use 1.2s
- Easing is ease-out for entrances and ease-in-out for loops
- Loading progress bar uses GSAP timeline
- Card flip uses Motion rotateY 180deg
- Page transitions use Motion opacity and translateY
- Floating ingredient particles use CSS keyframes

## Cocktail Data

### Spicy Saint

- **Name:** Spicy Saint
- **Description:** A bold citrus kick with a fiery finish
- **Taste:** Sweet & Sour
- **Color:** #f2e6a0
- **Image:** /images/spicy-saint.jpg
- **Ingredients:** Tequila San German, Freshly Squeezed Lemon, Peach Syrup, Tabasco Drops
- **Flavor Notes:** citrus, peach, spice

### Golden Barrel

- **Name:** Golden Barrel
- **Description:** Rich, warm and deeply aromatic
- **Taste:** Bittersweet & Aromatic
- **Color:** #c17f3a
- **Image:** /images/golden-barrel.jpg
- **Ingredients:** Whiskey, Almond Liqueur, Honey Liqueur, Angostura Bitters
- **Flavor Notes:** honey, almond, bitter, smoke

## Pages

### Page 1 — Loading Screen (/)
- Dark background, centered layout
- RASSEF33 logo text fades in
- Animated gold progress bar fills over 3 seconds using GSAP
- "made by majd salameh" credit at bottom
- Preloads all hero and cocktail assets in the background while progress bar runs
- Auto-transitions to hero page when loading completes

### Page 2 — Hero (/hero)
- Full screen, clean and minimal
- RASSEF33 as large elegant Cormorant Garamond heading
- Cocktail Menu subtitle in Inter
- Animated CSS cocktail glass as centerpiece placeholder for future 3D object
- See All Cocktails button routes to /cocktails

### Page 3 — Cocktails (/cocktails)
- Filter bar at top: All, Spicy Saint, Golden Barrel
- Swipeable cards on mobile
- Card front shows cocktail photo, name, and taste profile tag
- Card back revealed on tap shows ingredients and description
- Card back background color matches cocktail color
- Floating animated ingredient particles on card back
- Smooth swipe left and right to navigate between cocktails

## Claude Code Rules

- Read this file at the start of every session before doing anything
- Wait for explicit instructions before writing any code
- Tasks will arrive one at a time from the design chat
- Ask before making any design decisions not covered in this file
- Always confirm which files were created or modified after every task
- Never install new packages without asking first
- Keep all components small and focused, one responsibility each
- Use TypeScript strictly, no any types
- Use Tailwind for all styling, no inline styles except for dynamic cocktail colors
- Always test that the dev server runs without errors after changes