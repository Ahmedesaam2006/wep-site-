'use client'

import { useEffect, useRef, useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

function Cake() {
  return (
    <div className="relative mx-auto h-40 w-48 animate-[bob_3s_ease-in-out_infinite]">
      <div className="absolute left-1/2 top-2 z-10 h-10 w-2 -translate-x-1/2 rounded-sm bg-gradient-to-b from-rose-300 to-rose-500" />

      <div
        className="absolute left-1/2 top-[-10px] z-20 h-5 w-3 -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-500 to-yellow-200 blur-[1px]"
        style={{
          animation: 'blink-flame 0.9s ease-in-out infinite',
          boxShadow: '0 0 18px 4px rgba(251, 191, 36, 0.7)',
        }}
      />

      <div className="absolute top-10 left-1/2 h-12 w-44 -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#fdf3e0] to-[#f3dcb5]" />
      <div className="absolute top-[58px] left-1/2 h-12 w-44 -translate-x-1/2 rounded-b-lg bg-gradient-to-b from-[#7a4b2b] to-[#5a3620]" />
      <div className="absolute top-[92px] left-1/2 h-12 w-48 -translate-x-1/2 rounded-b-lg bg-gradient-to-b from-[#6b3f24] to-[#4a2c18]" />
      <div className="absolute bottom-0 left-1/2 h-3 w-52 -translate-x-1/2 rounded-full bg-zinc-200/90" />
    </div>
  )
}

export function MessageCard() {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showFull, setShowFull] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true

          const full = letterConfig.message
          let i = 0

          const id = setInterval(() => {
            i++
            setShown(full.slice(0, i))

            if (i >= full.length) {
              clearInterval(id)
              setDone(true)
            }
          }, 45)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const previewLength = 400

  const displayText =
    expanded || shown.length <= previewLength
      ? shown
      : shown.slice(0, previewLength) + '...'

  return (
    <div
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-8 px-6 py-16 text-center"
    >
      <Cake />

      <div className="max-w-md rounded-3xl border border-border bg-card/50 p-6 backdrop-blur sm:p-8">
        <p className="whitespace-pre-line text-lg leading-relaxed text-foreground sm:text-xl">
          {displayText}
          {!done && (
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
          )}
        </p>

        <div className="mt-4 flex justify-center gap-2">
         

          <button
            onClick={() => setShowFull(true)}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            🔍 تكبير
          </button>
        </div>
      </div>

      {showFull && (
        
<div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050816] p-4">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,105,180,0.15),transparent_40%)]" />

<div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />


 {/* النجوم */}
    {[...Array(80)].map((_, i) => (
      <span
        key={i}
        className="absolute animate-pulse text-pink-200"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${2 + Math.random() * 5}px`,
          opacity: Math.random() * 0.8,
        }}
      >
        ✦
      </span>
    ))}
{[...Array(12)].map((_, i) => (
  <span
    key={`heart-${i}`}
    className="absolute text-pink-400/70 drop-shadow-[0_0_8px_rgba(255,105,180,0.8)] animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${18 + Math.random() * 22}px`,
    }}
  >
    ♡
  </span>
))}
    {/* الشهب */}
    {[...Array(12)].map((_, i) => (
      <div
        key={`meteor-${i}`}
        className="absolute h-[1px] w-24 rotate-[-35deg] bg-gradient-to-r from-pink-300 to-transparent opacity-60"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-black/20 backdrop-blur-md p-6 text-right text-white border border-white/10">
            <button
              onClick={() => setShowFull(false)}
              className="mb-4 rounded bg-red-500 px-3 py-1 text-white"
            >
              ✕ إغلاق
            </button>

            <p className="whitespace-pre-line leading-8">
              {letterConfig.message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}