'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

export function TogetherCounter() {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const since = new Date(letterConfig.togetherSince).getTime()
    const update = () =>
      setDays(Math.floor((Date.now() - since) / 86_400_000))
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
      <Heart className="h-8 w-8 animate-[soft-pulse_2s_ease-in-out_infinite] fill-primary text-primary" />
      <p className="text-muted-foreground">معاً منذ</p>
      <p className="font-serif text-6xl font-bold tabular-nums text-foreground sm:text-7xl">
        {days.toLocaleString('ar-EG')}
      </p>
      <p className="text-lg text-accent">يوماً من الحب</p>
    </div>
  )
}
