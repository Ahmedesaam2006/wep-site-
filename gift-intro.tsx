'use client'

import { ChevronUp, Gift } from 'lucide-react'
import { letterConfig } from '@/lib/letter-config'

export function GiftIntro({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex flex-col items-center gap-7 outline-none"
        aria-label="انقر لفتح الهدية"
      >
        <span className="relative flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 glow-pink transition-transform duration-500 group-hover:scale-105 group-active:scale-95 sm:h-56 sm:w-56">
          <span
            className="absolute inset-0 animate-[soft-pulse_2.4s_ease-in-out_infinite] rounded-3xl border border-primary/40"
            aria-hidden="true"
          />
          <Gift
            className="h-24 w-24 text-primary drop-shadow-[0_0_12px_oklch(0.72_0.19_5_/_0.7)] sm:h-28 sm:w-28"
            strokeWidth={1.5}
          />
        </span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            إلى
          </span>
          <span className="font-serif text-4xl italic text-foreground sm:text-5xl">
            {letterConfig.recipient}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs font-medium uppercase tracking-[0.25em]">
            من {letterConfig.sender}
          </span>
        </div>

        <div className="mt-2 flex flex-col items-center gap-1 text-muted-foreground">
          <ChevronUp className="h-5 w-5 animate-[bob_1.8s_ease-in-out_infinite]" />
          <span className="text-sm">انقر للفتح</span>
        </div>
      </button>
    </div>
  )
}
