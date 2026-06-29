# Animation Skill — Rassef33

## Libraries
- Motion (Framer Motion) — all UI animations, page transitions, card flips
- GSAP + @gsap/react — loading bar, complex timelines, scroll sequences

## Motion Patterns

### Page Entrance
```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Staggered Children
```tsx
<motion.div
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

### Card Flip
```tsx
const [flipped, setFlipped] = useState(false);

// Outer container — no transform
<div style={{ perspective: 1000 }} onClick={() => setFlipped(!flipped)}>

  // Inner container — rotates
  <motion.div
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    style={{ transformStyle: "preserve-3d", position: "relative" }}
  >
    // Front face
    <div style={{ backfaceVisibility: "hidden" }}>
      Front content
    </div>

    // Back face
    <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
      Back content
    </div>
  </motion.div>
</div>
```

### Page Transition (between routes)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -30 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  {children}
</motion.div>
```

## GSAP Patterns

### Loading Progress Bar
```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const barRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  gsap.fromTo(
    barRef.current,
    { width: "0%" },
    {
      width: "100%",
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => {
        // transition to hero
      }
    }
  );
}, []);

<div className="w-full h-[2px] bg-border">
  <div ref={barRef} className="h-full bg-gold" />
</div>
```

### Text Reveal (GSAP)
```tsx
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  gsap.from(".reveal-text", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });
});
```

### Floating Particle Loop
```tsx
useGSAP(() => {
  gsap.to(".particle", {
    y: -20,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.3
  });
});
```

## CSS Keyframe Animations (for lightweight loops)

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.float { animation: float 3s ease-in-out infinite; }
.pulse { animation: pulse-glow 2s ease-in-out infinite; }
```

## Rules
- Never use Motion and GSAP on the same element at the same time
- Use Motion for discrete UI interactions (flip, entrance, exit)
- Use GSAP for continuous sequences and timelines
- Always clean up GSAP timelines on unmount
- Keep animation durations between 0.4s and 1.2s
- Never animate more than 3 things simultaneously
- Always respect prefers-reduced-motion