'use client'

import { useEffect, useState } from 'react'
import { motion, type MotionValue } from 'motion/react'
import { cocktails, type Cocktail } from '@/data/cocktails'

type Props = {
  cocktail: Cocktail
  isActive: boolean
  glassX: MotionValue<number>
  glassRotate: MotionValue<number>
  glassY: MotionValue<number>
  glassOpacity: MotionValue<number>
  glassScale: MotionValue<number>
}

type ParticleConfig = {
  size: number
  top: string
  left: string
  colorIndex: 0 | 1 | 2
  opacity: number
}

const PARTICLES: ParticleConfig[] = [
  { size: 3,  top: '8%',  left: '12%', colorIndex: 1, opacity: 0.55 },
  { size: 10, top: '14%', left: '72%', colorIndex: 0, opacity: 0.35 },
  { size: 2,  top: '22%', left: '88%', colorIndex: 1, opacity: 0.60 },
  { size: 8,  top: '30%', left: '5%',  colorIndex: 2, opacity: 0.30 },
  { size: 3,  top: '38%', left: '82%', colorIndex: 0, opacity: 0.45 },
  { size: 12, top: '18%', left: '45%', colorIndex: 2, opacity: 0.20 },
  { size: 2,  top: '55%', left: '15%', colorIndex: 1, opacity: 0.55 },
  { size: 6,  top: '45%', left: '65%', colorIndex: 0, opacity: 0.40 },
  { size: 3,  top: '62%', left: '78%', colorIndex: 1, opacity: 0.50 },
  { size: 9,  top: '25%', left: '28%', colorIndex: 2, opacity: 0.25 },
  { size: 2,  top: '72%', left: '35%', colorIndex: 0, opacity: 0.60 },
  { size: 4,  top: '10%', left: '55%', colorIndex: 1, opacity: 0.45 },
]

export default function CocktailCard({
  cocktail,
  isActive,
  glassX,
  glassRotate,
  glassY,
  glassOpacity,
  glassScale,
}: Props) {
  // 2D scaleX flip — no 3D context, no perspective, no preserve-3d.
  const [displayFace, setDisplayFace] = useState<'front' | 'back'>('front')
  const [phase, setPhase] = useState<'idle' | 'closing' | 'opening'>('idle')

  const currentIndex = cocktails.findIndex(c => c.id === cocktail.id)
  const particleColors = [cocktail.accentPrimary, cocktail.accentLight, cocktail.accentSecondary]

  const radialOverlays = [
    `radial-gradient(ellipse at 35% 28%, ${cocktail.accentPrimary}44 0%, transparent 55%)`,
    `radial-gradient(ellipse at 70% 72%, ${cocktail.accentSecondary}44 0%, transparent 48%)`,
    `radial-gradient(ellipse at 50% 50%, #00000022 0%, transparent 60%)`,
  ]

  useEffect(() => {
    setDisplayFace('front')
    setPhase('idle')
  }, [isActive, cocktail.id])

  const handleFlip = () => {
    if (phase !== 'idle') return
    setPhase('closing')
  }

  const handlePhaseComplete = () => {
    if (phase === 'closing') {
      setDisplayFace(prev => prev === 'front' ? 'back' : 'front')
      setPhase('opening')
    } else if (phase === 'opening') {
      setPhase('idle')
    }
  }

  return (
    <div
      className="w-full h-full cursor-pointer select-none"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ scaleX: phase === 'closing' ? 0 : 1 }}
        transition={{
          duration: 0.3,
          ease: phase === 'closing' ? 'easeIn' : 'easeOut',
        }}
        onAnimationComplete={handlePhaseComplete}
        style={{ transformOrigin: 'center center' }}
      >
        {displayFace === 'front' ? (
          /* ——— FRONT FACE ——— */
          <div
            className="absolute inset-0 rounded-[24px] overflow-hidden"
            style={{ background: cocktail.bgGradient }}
          >
            {/* Radial glow overlays */}
            {radialOverlays.map((bg, i) => (
              <div key={i} className="absolute inset-0" style={{ background: bg }} />
            ))}

            {/* Floating particles */}
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  top: p.top,
                  left: p.left,
                  backgroundColor: particleColors[p.colorIndex],
                  opacity: p.opacity,
                }}
              />
            ))}

            {/* Glass image — fixed container receives motion values; img fills it */}
            <motion.div
              key={cocktail.id}
              style={{
                position: 'absolute',
                width: '260px',
                height: '340px',
                left: '50%',
                top: '45%',
                translateX: '-50%',
                translateY: '-50%',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                x: glassX,
                y: glassY,
                rotate: glassRotate,
                opacity: glassOpacity,
                scale: glassScale,
              }}
            >
              <img
                src={cocktail.glassImage}
                alt={cocktail.name}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                  userSelect: 'none',
                }}
              />
            </motion.div>

            {/* Top bar — dots + counter */}
            <div
              className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
              style={{ padding: '16px' }}
            >
              <div className="flex items-center gap-[5px]">
                {cocktails.map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: i === currentIndex ? cocktail.accentPrimary : cocktail.bgDark,
                      border: i === currentIndex ? 'none' : `0.5px solid ${cocktail.accentPrimary}22`,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
              <span
                className="font-inter text-[10px]"
                style={{ color: `${cocktail.accentPrimary}b3` }}
              >
                {currentIndex + 1} / {cocktails.length}
              </span>
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none z-[4]"
              style={{
                height: '45%',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.4) 55%, transparent 100%)',
              }}
            />

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 z-[5]" style={{ padding: '20px' }}>
              <div className="flex flex-col gap-[6px]">
                <p
                  className="font-inter text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: cocktail.accentLight, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
                >
                  {cocktail.taste}
                </p>
                <p
                  className="font-cormorant font-light text-[36px] tracking-[0.04em]"
                  style={{ color: '#ffffff', lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
                >
                  {cocktail.name}
                </p>
                <div
                  className="h-px"
                  style={{ background: `linear-gradient(90deg, ${cocktail.accentPrimary}55, transparent)` }}
                />
                <div className="flex flex-wrap gap-1">
                  {cocktail.flavorNotes.map(note => (
                    <span
                      key={note}
                      className="text-[10px] uppercase tracking-[0.1em] rounded-[20px]"
                      style={{
                        padding: '5px 12px',
                        border: `0.5px solid ${cocktail.accentLight}99`,
                        color: cocktail.accentLight,
                        background: `${cocktail.accentPrimary}11`,
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-px flex-shrink-0"
                    style={{ width: 24, background: `linear-gradient(90deg, transparent, ${cocktail.accentPrimary}44)` }}
                  />
                  <span
                    className="text-[11px] italic whitespace-nowrap"
                    style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.5)' }}
                  >
                    tap to discover
                  </span>
                  <div
                    className="h-px flex-shrink-0"
                    style={{ width: 24, background: `linear-gradient(90deg, ${cocktail.accentPrimary}44, transparent)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ——— BACK FACE — glass not rendered here (Step 5) ——— */
          <div
            className="absolute inset-0 rounded-[24px] overflow-hidden flex flex-col"
            style={{
              background: `linear-gradient(145deg, ${cocktail.bgDark} 0%, ${cocktail.accentPrimary}18 55%, ${cocktail.bgDark} 100%)`,
              padding: '28px 24px',
            }}
          >
            {/* Header */}
            <div className="flex flex-col gap-[5px] mb-5">
              <p
                className="font-inter text-[8px] uppercase tracking-[0.3em]"
                style={{ color: `${cocktail.accentPrimary}aa` }}
              >
                {cocktail.taste}
              </p>
              <p
                className="font-cormorant font-light text-[28px] tracking-[0.04em]"
                style={{ color: '#fdf0e8', lineHeight: 1.1 }}
              >
                {cocktail.name}
              </p>
              <div
                className="self-center mt-2"
                style={{
                  width: 40,
                  height: '0.5px',
                  background: `linear-gradient(90deg, transparent, ${cocktail.accentPrimary}, transparent)`,
                }}
              />
            </div>

            {/* Ingredients */}
            <div className="flex flex-col gap-[10px] mb-5">
              <p
                className="font-inter text-[8px] uppercase tracking-[0.2em]"
                style={{ color: cocktail.accentPrimary }}
              >
                Ingredients
              </p>
              {cocktail.ingredients.map(ing => (
                <div key={ing} className="flex items-center gap-2">
                  <span className="text-[10px] flex-shrink-0" style={{ color: cocktail.accentPrimary }}>
                    ✦
                  </span>
                  <span className="font-cormorant font-light text-[15px] text-[#f5f0e8]">
                    {ing}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-5" style={{ height: '0.5px', backgroundColor: `${cocktail.accentPrimary}22` }} />

            {/* Description */}
            <div className="flex flex-col gap-[8px] flex-1">
              <p
                className="font-inter text-[8px] uppercase tracking-[0.2em]"
                style={{ color: cocktail.accentPrimary }}
              >
                Description
              </p>
              <p
                className="text-[12px]"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  color: '#a09880',
                  lineHeight: 1.6,
                }}
              >
                {cocktail.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-center mt-4">
              <span
                className="text-[8px] italic"
                style={{ fontFamily: 'Georgia, serif', color: `${cocktail.accentPrimary}66` }}
              >
                tap to close
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
