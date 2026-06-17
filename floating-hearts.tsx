'use client'

import { useEffect, useState } from 'react'

const HEART_CHARS = ['❤', '💖', '💕', '🩷', '✨']

type HeartConfig = {
  left: number
  size: number
  duration: number
  delay: number
  char: string
  opacity: number
}

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const [hearts, setHearts] = useState<HeartConfig[]>([])

  useEffect(() => {
    setHearts(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 26,
        duration: 7 + Math.random() * 9,
        delay: Math.random() * 10,
        char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
        opacity: 0.4 + Math.random() * 0.5,
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  )
}
