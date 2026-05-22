'use client'

import { useEffect, useState } from 'react'
import { BookedTherapistsMockup } from './BookedTherapistsMockup'
import {
  LornaShell,
  PreviewFrame,
  type PreviewMode,
  type Theme,
} from './LornaShell'

const THEME_STORAGE_KEY = 'lorna:theme'

interface GalleryEntry {
  id: string
  index: string
  slug: string
  title: string
  blurb: string
  /** When undefined, the tile renders as a disabled "Coming soon" placeholder. */
  render?: () => React.ReactNode
}

const ENTRIES: GalleryEntry[] = [
  {
    id: 'booked-therapists',
    index: '01',
    slug: 'booked-therapists',
    title: 'Booked Therapists',
    blurb: 'Upcoming sessions list with avatars, modality, and actions.',
    render: () => <BookedTherapistsMockup />,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `placeholder-${i + 1}`,
    index: String(i + 2).padStart(2, '0'),
    slug: 'coming-soon',
    title: 'Coming soon',
    blurb: 'A new screen is being designed for this slot.',
  })),
]

export function LornaGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mode, setMode] = useState<PreviewMode>('desktop')
  const [theme, setTheme] = useState<Theme>('dark')

  // Hydrate theme from localStorage after mount to avoid SSR mismatch.
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') setTheme(stored)
  }, [])

  const handleThemeChange = (next: Theme) => {
    setTheme(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* private mode / quota — silently ignore */
    }
  }

  const selected = selectedId
    ? ENTRIES.find((e) => e.id === selectedId) ?? null
    : null

  // Preview view
  if (selected && selected.render) {
    return (
      <LornaShell
        title={selected.title}
        subtitle={`/${selected.slug}`}
        mode={mode}
        onModeChange={setMode}
        onBack={() => setSelectedId(null)}
        theme={theme}
        onThemeChange={handleThemeChange}
      >
        <PreviewFrame mode={mode}>{selected.render()}</PreviewFrame>
      </LornaShell>
    )
  }

  // Gallery view — back button is intentionally disabled on the root.
  return (
    <LornaShell
      subtitle="lorna · v0.1"
      backDisabled
      theme={theme}
      onThemeChange={handleThemeChange}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
        
          <h1
            className="mt-2 text-[40px] sm:text-[56px] leading-[1.05] text-[var(--color-porcelain)]"
            style={{ fontWeight: 590, letterSpacing: '-0.03em' }}
          >
            Some Sexy UI For Lorna
          </h1>
          <p
            className="mt-2 max-w-prose text-[14px] text-[var(--color-storm-cloud)]"
            style={{ letterSpacing: '-0.13px' }}
          >
            A small studio of polished UI mockups. Click a tile to open the
            preview, then switch between desktop and mobile to inspect the
            layout.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ENTRIES.map((entry) => {
            const isActive = !!entry.render
            const baseClasses =
              'group relative text-left aspect-[4/5] rounded-[12px] border p-4 flex flex-col justify-between transition-all duration-150'

            if (!isActive) {
              return (
                <button
                  key={entry.id}
                  type="button"
                  disabled
                  aria-disabled="true"
                  tabIndex={-1}
                  className={`${baseClasses} bg-transparent border-dashed border-[var(--color-charcoal-grey)] opacity-60 cursor-not-allowed`}
                >
                  <div>
                    <span
                      className="lorna-mono text-[11px] text-[var(--color-fog-grey)]"
                      style={{ letterSpacing: '-0.15px' }}
                    >
                      {entry.index}
                    </span>
                    <h3
                      className="mt-2.5 text-[14px] text-[var(--color-storm-cloud)]"
                      style={{ fontWeight: 510, letterSpacing: '-0.13px' }}
                    >
                      {entry.title}
                    </h3>
                  </div>
                  <p
                    className="lorna-mono text-[11px] text-[var(--color-fog-grey)]"
                    style={{ letterSpacing: '-0.15px' }}
                  >
                    soon
                  </p>
                </button>
              )
            }

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => {
                  setSelectedId(entry.id)
                  setMode('desktop')
                }}
                className={`${baseClasses} bg-[var(--color-graphite)] border-[var(--color-charcoal-grey)] [box-shadow:var(--shadow-subtle)] hover:bg-[var(--color-deep-slate)] hover:border-[var(--color-muted-ash)] hover:[box-shadow:var(--shadow-sm)] active:scale-[0.985] cursor-pointer`}
                aria-label={`Open ${entry.title} preview`}
              >
                <div>
                  <span
                    className="lorna-mono text-[11px] text-[var(--color-fog-grey)]"
                    style={{ letterSpacing: '-0.15px' }}
                  >
                    {entry.index} · {entry.slug}
                  </span>
                  <h3
                    className="mt-2.5 text-[16px] text-[var(--color-porcelain)]"
                    style={{ fontWeight: 590, letterSpacing: '-0.13px' }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-storm-cloud)]"
                    style={{ letterSpacing: '-0.11px' }}
                  >
                    {entry.blurb}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="lorna-mono text-[10px] uppercase text-[var(--color-fog-grey)]"
                    style={{ letterSpacing: '0.04em' }}
                  >
                    Open
                  </span>
                  <span
                    aria-hidden
                    className="
                      inline-flex items-center justify-center
                      h-6 w-6 rounded-full
                      bg-[var(--color-neon-lime)] text-[var(--color-ink)]
                      text-[12px]
                      transition-transform duration-150
                      group-hover:translate-x-0.5
                      group-active:scale-95
                    "
                    style={{ fontWeight: 590 }}
                  >
                    →
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </LornaShell>
  )
}
