'use client'

import confetti from 'canvas-confetti'
import { Edit3, Heart, Share2 } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { letterConfig } from '@/lib/letter-config'

const COLORS = ['#ff4d8d', '#ffd23f', '#ff8fb1', '#a78bfa', '#4ade80', '#38bdf8']

export function Celebration({ onContinue }: { onContinue: () => void }) {
  const fired = useRef(false)

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: COLORS,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: COLORS,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 },
      colors: COLORS,
    })
  }, [])

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    const t = setTimeout(fireConfetti, 250)
    return () => clearTimeout(t)
  }, [fireConfetti])

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'عيد ميلاد سعيد',
      text: `${letterConfig.greeting} ${letterConfig.recipient}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url)
      }
    } catch {
      /* المستخدم ألغى المشاركة */
    }
  }, [])

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-lg font-semibold text-accent">
        {letterConfig.greeting}
      </p>

      <h1 className="gradient-name font-serif text-6xl font-bold italic sm:text-7xl">
        {letterConfig.recipient}
      </h1>

      <p className="text-2xl font-medium text-foreground sm:text-3xl">
        {letterConfig.subtitle}
      </p>

      <p className="flex items-center gap-2 text-muted-foreground">
        بكل
        <Heart className="h-4 w-4 fill-primary text-primary" />
        من
      </p>

      <p className="text-xl font-semibold uppercase tracking-[0.2em] text-primary">
        {letterConfig.sender}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm text-foreground backdrop-blur transition-colors hover:bg-card"
        >
          <Share2 className="h-4 w-4" />
          مشاركة
        </button>
        <button
          type="button"
          onClick={fireConfetti}
          className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm text-foreground backdrop-blur transition-colors hover:bg-card"
        >
          <Edit3 className="h-4 w-4" />
          احتفال
        </button>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-semibold text-primary-foreground glow-pink transition-transform hover:scale-105 active:scale-95"
      >
        <Heart className="h-5 w-5 fill-current" />
        افتح بطاقاتي
      </button>
    </div>
  )
}
