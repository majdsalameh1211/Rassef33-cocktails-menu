'use client'

import { motion } from 'motion/react'
import { type Cocktail } from '@/data/cocktails'

type Props = {
  cocktails: Cocktail[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function FilterBar({ cocktails, activeIndex, onSelect }: Props) {
  return (
    <div
      className="flex overflow-x-auto gap-2"
      style={{
        scrollbarWidth: 'none',
        padding: '16px 20px 8px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {cocktails.map((cocktail, index) => {
        const isActive = index === activeIndex
        return (
          <motion.button
            key={cocktail.id}
            className="flex-shrink-0 font-inter text-[10px] uppercase tracking-[0.1em] rounded-[20px] cursor-pointer"
            style={{
              padding: '6px 14px',
              color: isActive ? cocktail.accentPrimary : '#d4cfc8',
              border: isActive
                ? `0.5px solid ${cocktail.accentPrimary}`
                : '0.5px solid transparent',
              background: isActive ? `${cocktail.accentPrimary}26` : 'transparent',
              transition: 'all 0.3s ease',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(index)}
          >
            {cocktail.name}
          </motion.button>
        )
      })}
    </div>
  )
}
