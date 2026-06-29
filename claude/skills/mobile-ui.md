# Mobile UI Skill — Rassef33

## Core Rules
- All layouts are mobile-first, max-width 430px, centered on desktop
- Touch targets minimum 44x44px
- No hover-only interactions — everything must work on touch
- Use passive touch event listeners for performance

## Swipe Gesture Pattern (Motion)

```tsx
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const x = useMotionValue(0);
const [currentIndex, setCurrentIndex] = useState(0);

const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
  const threshold = 80;

  if (info.offset.x < -threshold && currentIndex < items.length - 1) {
    setCurrentIndex(prev => prev + 1);
  } else if (info.offset.x > threshold && currentIndex > 0) {
    setCurrentIndex(prev => prev - 1);
  }

  animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
};

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  style={{ x }}
  className="cursor-grab active:cursor-grabbing"
>
  {children}
</motion.div>
```

## Card Layout

```tsx
// Full screen card — mobile optimized
<div className="
  relative
  w-full
  h-[70vh]
  rounded-2xl
  overflow-hidden
  touch-none
  select-none
">
  {children}
</div>
```

## Filter Bar (Top Navigation)

```tsx
// Sticky top bar with horizontal scroll
<div className="
  sticky
  top-0
  z-10
  flex
  gap-3
  px-6
  py-4
  overflow-x-auto
  scrollbar-none
  bg-background
  border-b
  border-border
">
  {filters.map(filter => (
    <button
      key={filter}
      className="
        shrink-0
        px-4 py-2
        rounded-full
        text-sm
        font-inter
        transition-all
        duration-300
      "
    >
      {filter}
    </button>
  ))}
</div>
```

## Viewport & Safe Areas

```css
/* Always account for mobile notch and bottom bar */
.page-container {
  min-height: 100dvh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## Typography Scale (Mobile)

| Element | Size | Font |
|---|---|---|
| Hero title | 4rem (64px) | Cormorant Garamond |
| Section title | 2.5rem (40px) | Cormorant Garamond |
| Cocktail name | 2rem (32px) | Cormorant Garamond |
| Body text | 0.9rem (14px) | Inter |
| Label / tag | 0.75rem (12px) | Inter |
| Credit text | 0.7rem (11px) | Inter |

## Performance Rules
- Use transform and opacity only for animations (no layout-triggering props)
- Use will-change sparingly, only on actively animating elements
- Lazy load images with next/image
- Keep component re-renders minimal during swipe gestures