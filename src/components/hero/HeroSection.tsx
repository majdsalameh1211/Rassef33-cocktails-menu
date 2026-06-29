'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import type { PanInfo } from 'motion/react'
import { heroContent } from '@/data/cocktails'

const goldLine = 'linear-gradient(90deg, transparent, #c9a84c55, transparent)'

// Updated from "slide" → "swipe"
const SLIDE_CHARS = 'swipe to explore'.split('')

const THRESHOLD = 80

function getDirection(dx: number, dy: number): 'up' | 'down' | 'left' | 'right' {
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? 'left' : 'right'
  return dy < 0 ? 'up' : 'down'
}

export default function HeroSection() {
  const router = useRouter()
  const [reducedMotion, setReducedMotion] = useState(false)

  const glowPillRef = useRef<HTMLDivElement>(null)
  const slideLetterRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Hero-level drag motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Hero fades out proportionally as it's dragged away
  const distance = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const mag = Math.sqrt((latestX as number) ** 2 + (latestY as number) ** 2)
      return Math.max(0, 1 - mag / 200)
    }
  )

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(isReduced)
    if (isReduced) return

    const CYCLE = 2600
    const TOTAL = SLIDE_CHARS.length
    let startTime: number | null = null
    let rafId: number

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = ((timestamp - startTime) % CYCLE) / CYCLE

      const pillLeft = -26 + 126 * progress
      const pillCenter = pillLeft + 13

      if (glowPillRef.current) {
        glowPillRef.current.style.left = `${pillLeft}%`
      }

      SLIDE_CHARS.forEach((char, i) => {
        if (char === ' ') return
        const el = slideLetterRefs.current[i]
        if (!el) return
        const letterPos = (i / TOTAL) * 100
        if (Math.abs(pillCenter - letterPos) < 16) {
          el.style.color = '#c9a84c'
          el.style.textShadow = '0 0 10px #c9a84c99'
        } else {
          el.style.color = '#a09880'
          el.style.textShadow = ''
        }
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dx = info.offset.x
    const dy = info.offset.y
    const mag = Math.sqrt(dx * dx + dy * dy)
    const dir = getDirection(dx, dy)

    if (mag > THRESHOLD) {
      const targets = {
        up:    { x: 0,                        y: -window.innerHeight * 1.1 },
        down:  { x: 0,                        y:  window.innerHeight * 1.1 },
        left:  { x: -window.innerWidth * 1.1, y: 0 },
        right: { x:  window.innerWidth * 1.1, y: 0 },
      }
      animate(x, targets[dir].x, { duration: 0.45, ease: [0.4, 0, 0.2, 1] })
      animate(y, targets[dir].y, { duration: 0.45, ease: [0.4, 0, 0.2, 1] })
      setTimeout(() => router.push('/cocktails'), 400)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 })
    }
  }

  return (
    // Fixed container prevents overflow flash when hero slides off screen
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <motion.div
        className="w-full h-full"
        style={reducedMotion ? {} : { x, y, opacity: distance }}
        drag={reducedMotion ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={reducedMotion ? undefined : handleDragEnd}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Layer 1 — Background */}
          {/* TODO: swap this layer for video/images/animated objects */}
          <div
            id="hero-bg"
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(ellipse at center, #1a1208 0%, #0a0a0a 70%)',
            }}
          />

          {/* Layer 2 — Overlay */}
          {/* TODO: adjust overlay opacity when real background is added */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(to bottom, #0a0a0a99 0%, transparent 30%, transparent 70%, #0a0a0a99 100%)',
            }}
          />

          {/* Layer 3 — Content */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-between"
            style={{
              paddingTop: 'max(16px, env(safe-area-inset-top))',
              paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
            }}
          >
            {/* Top section — RASSEF33 header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="h-px w-full" style={{ background: goldLine }} />
              <p
                className="font-cormorant font-light text-center uppercase text-[#f5f0e8] py-3 tracking-[0.22em]"
                style={{ fontSize: '28px' }}
              >
                RASSEF33
              </p>
              <div className="h-px w-full" style={{ background: goldLine }} />
            </motion.div>

            {/* Center section — Main title block */}
            <div className="flex flex-col items-center px-6 gap-[14px]">
              <motion.p
                className="font-inter uppercase text-[#a09880] text-[11px] tracking-[0.35em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                {heroContent.welcomeText}
              </motion.p>

              <motion.p
                className="font-cormorant font-light text-[#f5f0e8] text-[68px]"
                style={{ lineHeight: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              >
                Cocktails
              </motion.p>

              <motion.p
                className="font-cormorant font-light text-[#c9a84c] italic text-[68px]"
                style={{ lineHeight: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                Menu
              </motion.p>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              >
                <div
                  className="h-px flex-shrink-0"
                  style={{ width: '28px', background: goldLine }}
                />
                <p
                  className="text-[#a09880] whitespace-nowrap italic text-[17px] tracking-[0.06em]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {heroContent.tagline}
                </p>
                <div
                  className="h-px flex-shrink-0"
                  style={{ width: '28px', background: goldLine }}
                />
              </motion.div>
            </div>

            {/* Bottom section — swipe to explore CTA */}
            <motion.div
              className="px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            >
              {/* onClick only active for reduced-motion users; otherwise drag handles navigation */}
              <div
                style={{ padding: '12px 0', cursor: reducedMotion ? 'pointer' : 'default' }}
                onClick={reducedMotion ? () => router.push('/cocktails') : undefined}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  {/* Text row — each character is its own span */}
                  <div>
                    {SLIDE_CHARS.map((char, i) =>
                      char === ' ' ? (
                        <span key={i} style={{ display: 'inline-block', width: '5px' }} />
                      ) : (
                        <span
                          key={i}
                          ref={(el) => { slideLetterRefs.current[i] = el }}
                          style={{
                            fontFamily: 'var(--font-cormorant)',
                            fontSize: '17px',
                            fontStyle: 'italic',
                            fontWeight: 300,
                            color: '#a09880',
                            letterSpacing: '0.03em',
                            display: 'inline-block',
                            transition: 'color 0.12s ease, text-shadow 0.12s ease',
                          }}
                        >
                          {char}
                        </span>
                      )
                    )}
                  </div>

                  {/* Glow track */}
                  <div
                    style={{
                      width: '100%',
                      height: '0.5px',
                      background: '#1a1a1a',
                      position: 'relative',
                    }}
                  >
                    <div
                      ref={glowPillRef}
                      style={{
                        position: 'absolute',
                        top: '-2.5px',
                        left: '-26%',
                        height: '5px',
                        width: '26%',
                        background: 'linear-gradient(90deg, transparent, #c9a84ccc, transparent)',
                        borderRadius: '4px',
                        filter: 'blur(0.5px)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
