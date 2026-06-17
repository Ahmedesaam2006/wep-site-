'use client'

import { Music, Play } from 'lucide-react'
import { useState } from 'react'
import { letterConfig } from '@/lib/letter-config'

export function SongSection() {
  const [playing, setPlaying] = useState(false)
  const { youtubeId, songTitle, songArtist } = letterConfig

  return (
    <div className="relative flex flex-col items-center gap-8 px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/60 p-5 backdrop-blur">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20">
            <Music className="h-5 w-5 text-primary" />
          </span>
          <span className="text-xl font-semibold text-foreground">أغنيتنا</span>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black">
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={songTitle}
              allow="accelerated-output; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative h-full w-full"
              aria-label="تشغيل الأغنية"
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={songTitle}
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                crossOrigin="anonymous"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                  <Play className="h-7 w-7 fill-white text-white" />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-right">
                <span className="block text-sm font-semibold text-white">
                  {songTitle}
                </span>
                <span className="block text-xs text-white/70">
                  {songArtist}
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
