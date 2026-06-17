'use client'

import { Camera, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

export function MemoriesGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const memories = letterConfig.memories

  return (
    <div className="relative flex flex-col items-center gap-8 px-4 py-20">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-5 py-2.5 backdrop-blur">
        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs text-primary">
          {memories.length} صور
        </span>
        <span className="text-lg font-semibold text-foreground">ذكرياتنا</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
          <Camera className="h-4 w-4 text-primary" />
        </span>
      </div>

      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {memories.map((m, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border"
          >
            <Image
              src={m.src || '/placeholder.svg'}
              alt={m.caption ?? 'ذكرى'}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              crossOrigin="anonymous"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-right text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {m.caption}
            </span>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setLightbox(null)}
            aria-label="إغلاق"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={memories[lightbox].src || '/placeholder.svg'}
              alt={memories[lightbox].caption ?? 'ذكرى'}
              fill
              sizes="100vw"
              className="object-cover"
              crossOrigin="anonymous"
            />
            {memories[lightbox].caption && (
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center text-white">
                {memories[lightbox].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
