'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMotionValue, useTransform, animate, motion, AnimatePresence } from 'motion/react'
import { cocktails } from '@/data/cocktails'
import CocktailCard from './CocktailCard'

export default function CocktailMenu() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  // Ref mirrors state so animation callbacks never capture stale closures
  const currentIndexRef = useRef(0)

  const activeCocktail = cocktails[currentIndex]

  // ── Drag ──────────────────────────────────────────────────────────────────
  const dragX = useMotionValue(0)

  // ── Glass parallax (live during drag) ─────────────────────────────────────
  const parallaxGlassX      = useTransform(dragX, [-300, 0, 300], [-60, 0, 60])
  const parallaxGlassRotate = useTransform(dragX, [-300, 0, 300], [25, 0, -25])

  // ── Glass swipe animation values ──────────────────────────────────────────
  const swipeGlassX      = useMotionValue(0)
  const swipeGlassRotate = useMotionValue(0)

  // ── Combined glass values (additive: parallax + swipe) ────────────────────
  const glassX = useTransform(
    [parallaxGlassX, swipeGlassX],
    ([p, s]) => (p as number) + (s as number)
  )
  const glassRotate = useTransform(
    [parallaxGlassRotate, swipeGlassRotate],
    ([p, s]) => (p as number) + (s as number)
  )

  // ── Initial entrance values ────────────────────────────────────────────────
  const glassY       = useMotionValue(30)
  const glassOpacity = useMotionValue(0)
  const glassScale   = useMotionValue(0.85)

  // ── Guards ────────────────────────────────────────────────────────────────
  const isGlassAnimating    = useRef(false)
  const prefersReducedMotion = useRef(false)

  // ── Mount: detect reduced motion + run first-load entrance ────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    prefersReducedMotion.current = reduced

    if (reduced) {
      glassY.set(0)
      glassOpacity.set(1)
      glassScale.set(1)
      return
    }

    const t = setTimeout(() => {
      animate(glassY,       0, { duration: 0.8, ease: 'easeOut' })
      animate(glassOpacity, 1, { duration: 0.8, ease: 'easeOut' })
      animate(glassScale,   1, { duration: 0.8, ease: 'easeOut' })
    }, 300)

    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Swipe animation state machine ─────────────────────────────────────────
  const runSwipeAnimation = (direction: 'left' | 'right', nextIndex: number) => {
    if (prefersReducedMotion.current) {
      currentIndexRef.current = nextIndex
      setCurrentIndex(nextIndex)
      return
    }

    isGlassAnimating.current = true

    const exitX       = direction === 'left' ? -500 :  500
    const exitRotate  = direction === 'left' ?  -45 :   45
    const enterX      = direction === 'left' ?  500 : -500
    const enterRotate = direction === 'left' ?   45 :  -45

    // Exit — glass rolls off screen (0.4s easeIn)
    animate(swipeGlassRotate, exitRotate, { duration: 0.4, ease: 'easeIn' })
    animate(swipeGlassX, exitX, {
      duration: 0.4,
      ease: 'easeIn',
      onComplete: () => {
        currentIndexRef.current = nextIndex
        setCurrentIndex(nextIndex)

        swipeGlassX.set(enterX)
        swipeGlassRotate.set(enterRotate)

        // Enter — spring settle
        animate(swipeGlassX, 0, { type: 'spring', stiffness: 120, damping: 20 })
        animate(swipeGlassRotate, 0, {
          type: 'spring',
          stiffness: 120,
          damping: 20,
          onComplete: () => { isGlassAnimating.current = false },
        })
      },
    })
  }

  // ── Drag end ──────────────────────────────────────────────────────────────
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const idx         = currentIndexRef.current
    const swipedLeft  = info.offset.x < -80 && idx < cocktails.length - 1
    const swipedRight = info.offset.x >  80 && idx > 0

    if (!isGlassAnimating.current) {
      if (swipedLeft)  runSwipeAnimation('left',  idx + 1)
      if (swipedRight) runSwipeAnimation('right', idx - 1)
    }

    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }

  // ── Dot / filter tap ──────────────────────────────────────────────────────
  const handleSelect = (index: number) => {
    if (index === currentIndexRef.current || isGlassAnimating.current) return
    const direction = index > currentIndexRef.current ? 'left' : 'right'
    runSwipeAnimation(direction, index)
  }

  return (
    <div className="flex flex-col h-dvh bg-[#0a0a0a] overflow-hidden">

      {/* ── SECTION 1: HEADER — tap navigates back to /hero ── */}
      <motion.div
        className="flex flex-col items-center gap-[3px] bg-[#0a0a0a]"
        style={{ padding: '12px 20px 8px', cursor: 'pointer' }}
        onClick={() => router.push('/hero')}
        whileTap={{ opacity: 0.7 }}
      >
        <div
          className="w-full"
          style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a84c66, transparent)' }}
        />
        <span className="font-cormorant text-[28px] font-light tracking-[0.22em] uppercase text-[#f5f0e8]">
          RASSEF33
        </span>
        <div
          className="w-full"
          style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a84c66, transparent)' }}
        />
        <span className="font-inter text-[11px] tracking-[0.25em] uppercase text-[#a09880]">
          Cocktails Menu
        </span>
      </motion.div>

      {/* ── SECTION 2: NAV BAR ── */}
      <div
        className="flex flex-col items-center gap-[5px] bg-[#0a0a0a]"
        style={{ padding: '6px 20px 8px', borderBottom: '0.5px solid #1a1a1a' }}
      >
        {/* Active cocktail name — fades out/in on change */}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className="font-cormorant text-[14px] font-light tracking-[0.15em] text-[#f5f0e8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeCocktail.name}
          </motion.span>
        </AnimatePresence>

        {/* Dot navigation — each dot sits in a 28×28 touch target */}
        <div className="flex items-center">
          {cocktails.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleSelect(i)}
              aria-label={`Go to ${c.name}`}
              className="flex items-center justify-center"
              style={{ width: 28, height: 28, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: i === currentIndex ? activeCocktail.accentPrimary : '#1e1e1e',
                  border: i === currentIndex ? 'none' : `0.5px solid ${activeCocktail.accentPrimary}22`,
                  transition: 'all 0.3s ease',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: CARD AREA ── */}
      <motion.div
        className="flex-1 mt-[6px] mx-[12px] mb-[64px] rounded-[24px] overflow-hidden cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        initial={{ backgroundColor: activeCocktail.bgDark }}
        animate={{ backgroundColor: activeCocktail.bgDark }}
        transition={{ duration: 0.6 }}
        style={{
          x: dragX,
          border: `0.5px solid ${activeCocktail.accentPrimary}33`,
          boxShadow: `0 0 30px ${activeCocktail.accentPrimary}18`,
        }}
      >
        <CocktailCard
          cocktail={activeCocktail}
          isActive={true}
          glassX={glassX}
          glassRotate={glassRotate}
          glassY={glassY}
          glassOpacity={glassOpacity}
          glassScale={glassScale}
        />
      </motion.div>

      {/* ── SECTION 4: FOOTER ── */}
      <div
        style={{
          background: '#0a0a0a',
          borderTop: '0.5px solid #1a1a1a',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          paddingBottom: 0,
        }}
      >
        <span
          className="font-inter text-[8px] tracking-[0.2em] uppercase"
          style={{ color: '#c9a84c', opacity: 0.7 }}
        >
          made by majd salameh
        </span>
      </div>

    </div>
  )
}
