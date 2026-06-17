'use client'

import { ArrowLeft, ArrowRight, Camera } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

export function MomentsSlider() {
  const moments = letterConfig.memories
  const [index, setIndex] = useState(0)
  const current = moments[index]

  const go = (dir: number) =>
    setIndex((p) => (p + dir + moments.length) % moments.length)

  return (
    <div className="relative flex flex-col items-center gap-10 px-4 py-20">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-5 py-2.5 backdrop-blur">
        <span className="text-lg font-semibold text-foreground">لحظات</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
          <Camera className="h-4 w-4 text-primary" />
        </span>
      </div>

      <div className="flex w-full max-w-md items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-card"
          aria-label="السابق"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="relative aspect-[3/4] w-44 rotate-[-4deg] rounded-sm bg-white p-2 pb-8 shadow-2xl transition-transform duration-300 sm:w-52">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              key={current.src + index}
              src={current.src || '/placeholder.svg'}
              alt={current.caption ?? 'لحظة'}
              fill
              sizes="(max-width: 640px) 70vw, 208px"
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-card"
          aria-label="التالي"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {moments.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`لحظة ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-md rounded-2xl border border-border bg-card/40 px-6 py-5 text-center text-muted-foreground backdrop-blur">
        {current.caption || 'بدون وصف'}
      </div>
    </div>
  )
}
