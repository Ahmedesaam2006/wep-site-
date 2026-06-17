'use client'

import { useState } from 'react'
import { Celebration } from '@/components/celebration'
import { Countdown } from '@/components/countdown'
import { FloatingHearts } from '@/components/floating-hearts'
import { GiftIntro } from '@/components/gift-intro'
import { MemoriesGallery } from '@/components/memories-gallery'
import { MessageCard } from '@/components/message-card'
import { MomentsSlider } from '@/components/moments-slider'
import { SongSection } from '@/components/song-section'
import { TogetherCounter } from '@/components/together-counter'

type Phase = 'gift' | 'countdown' | 'card'

export default function Page() {
  const [phase, setPhase] = useState<Phase>('gift')

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* توهج خلفي */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.3 0.1 350 / 0.5), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, oklch(0.25 0.08 30 / 0.4), transparent 70%)',
        }}
      />

      <FloatingHearts count={phase === 'card' ? 14 : 20} />

      <div className="relative z-10">
        {phase === 'gift' && <GiftIntro onOpen={() => setPhase('countdown')} />}

        {phase === 'countdown' && (
          <Countdown onSkip={() => setPhase('card')} />
        )}

        {phase === 'card' && (
          <div className="flex flex-col">
            <Celebration
              onContinue={() =>
                document
                  .getElementById('content')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            />
            <div id="content" className="flex flex-col">
              <MessageCard />
              <TogetherCounter />
              <MemoriesGallery />
              <MomentsSlider />
              <SongSection />
              <footer className="relative px-6 py-16 text-center text-sm text-muted-foreground">
                صُنع بكل حب
              </footer>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
