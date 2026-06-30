'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const LETTERS = ['R', 'A', 'S', 'S', 'E', 'F', '3', '3']

export default function LoadingScreen() {
  const router = useRouter()

  const containerRef  = useRef<HTMLDivElement>(null)
  const topHalfRef    = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)
  const barMenuRef    = useRef<HTMLParagraphElement>(null)
  const letterRefs    = useRef<(HTMLSpanElement | null)[]>([])
  const goldRuleRef   = useRef<HTMLDivElement>(null)
  const barFillRef    = useRef<HTMLDivElement>(null)
  const barTipRef     = useRef<HTMLDivElement>(null)
  const creditRef     = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => router.push('/hero'), 1000)
      return () => clearTimeout(t)
    }

    const letters = letterRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    )

    // ── Set all initial states via GSAP (not CSS) ──────────────────────────
    gsap.set(barMenuRef.current,  { opacity: 0 })
    gsap.set(letters,             { opacity: 0, y: 6 })
    gsap.set(goldRuleRef.current, { opacity: 0, width: '0%' })
    gsap.set(creditRef.current,   { opacity: 0 })
    gsap.set(barFillRef.current,  { width: '0%' })
    gsap.set(barTipRef.current,   { opacity: 0 })

    // ── Timeline ───────────────────────────────────────────────────────────
    const tl = gsap.timeline()

    // Step 1 — t=0.1s: "BAR MENU" fades in
    tl.to(barMenuRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.1)

    // Step 2 — t=0.6s: Each letter staggers in
    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      stagger: 0.065,
    }, 0.6)

    // Step 3 — t=1.4s: Gold rule draws in
    tl.to(goldRuleRef.current, {
      opacity: 0.8,
      width: '55%',
      duration: 0.6,
      ease: 'power2.inOut',
    }, 1.4)

    // Step 4 — t=1.6s: Credit text fades in
    tl.to(creditRef.current, {
      opacity: 1,
      duration: 0.4,
    }, 1.6)

    // Step 5 — t=2.0s: Progress bar fills, tip tracks the leading edge
    const progress = { pct: 0 }

    tl.set(barTipRef.current, { opacity: 1 }, 2.0)

    tl.to(progress, {
      pct: 100,
      duration: 3,
      ease: 'none',
      onUpdate: () => {
        if (barFillRef.current) {
          barFillRef.current.style.width = `${progress.pct}%`
        }
        if (barTipRef.current) {
          barTipRef.current.style.left = `calc(${progress.pct}% - 2.5px)`
        }
      },
    }, 2.0)

    // Step 6 — t=5.1s: Split exit — top flies up, bottom flies down
    tl.to(topHalfRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    }, 5.1)

    tl.to(bottomHalfRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    }, 5.1)

    // Step 7 — t=5.9s: Navigate to hero
    tl.call(() => router.push('/hero'), [], 5.9)

  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      style={{
        height: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Background image ──────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/loading_background.png"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* ── Top half ──────────────────────────────────────────────────────── */}
      <div
        ref={topHalfRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* "BAR MENU" label */}
        <p
          ref={barMenuRef}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '17px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#a09880',
            margin: 0,
          }}
        >
          BAR MENU
        </p>

        {/* "RASSEF33" — 8 individually animated letter spans */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-cormorant)',
                fontSize: '42px',
                fontWeight: 300,
                color: '#f5f0e8',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Gold rule */}
        <div
          ref={goldRuleRef}
          style={{
            height: '0.5px',
            width: '55%',
            background: '#c9a84c',
            marginTop: '8px',
          }}
        />
      </div>

      {/* ── Bottom half ───────────────────────────────────────────────────── */}
      <div
        ref={bottomHalfRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 28px',
          gap: '10px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Progress bar track */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: '#1e1e1e',
            position: 'relative',
          }}
        >
          {/* Fill */}
          <div
            ref={barFillRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              background: '#c9a84c',
            }}
          />
          {/* Glowing tip */}
          <div
            ref={barTipRef}
            style={{
              position: 'absolute',
              top: '-2.5px',
              left: 0,
              width: '5px',
              height: '6px',
              background: '#c9a84c',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
        </div>

        {/* Credit */}
        <p
          ref={creditRef}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#a09880',
            margin: 0,
          }}
        >
          made by majd salameh
        </p>
      </div>
    </div>
  )
}
