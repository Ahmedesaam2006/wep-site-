'use client'

import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  ms: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ms: Math.floor((diff % 1000) / 10),
  }
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'ms', label: 'مللي ثانية' },
  { key: 'seconds', label: 'ثواني' },
  { key: 'minutes', label: 'دقائق' },
  { key: 'hours', label: 'ساعات' },
  { key: 'days', label: 'أيام' },
]

export function Countdown({ onSkip }: { onSkip: () => void }) {
  const target = new Date(letterConfig.nextBirthday).getTime()
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 40)
    setTime(getTimeLeft(target))
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-12 px-4 text-center">
      <h2 className="font-medium text-accent">
        حتى عيد ميلاد{' '}
        <span className="tracking-[0.3em]">{letterConfig.recipient}</span>
      </h2>

      <div
        dir="ltr"
        className="flex items-stretch justify-center gap-1 sm:gap-3"
      >
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="flex items-stretch gap-1 sm:gap-3">
            <div className="flex min-w-[3.5rem] flex-col items-center sm:min-w-[5rem]">
              <span className="font-serif text-4xl tabular-nums text-foreground sm:text-6xl">
                {time
                  ? String(time[unit.key]).padStart(2, '0')
                  : '00'}
              </span>
              <span className="mt-2 text-[11px] text-muted-foreground sm:text-sm">
                {unit.label}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span className="self-start pt-2 font-serif text-3xl text-muted-foreground sm:text-5xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="group flex items-center gap-2 border-b border-dashed border-muted-foreground/50 pb-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>تخطي العد التنازلي</span>
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </button>
    </div>
  )
}
