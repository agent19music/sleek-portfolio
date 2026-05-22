'use client'

import { TherapistCard } from './TherapistCard'
import { therapists } from './therapists'

const upcomingCount = therapists.length

/**
 * Static UI mockup of a "booked therapists" screen in the Linear aesthetic.
 * Every interactive element is disabled — this is a visual showcase only.
 */
export function BookedTherapistsMockup() {
  return (
    <div className="bg-[var(--color-deep-slate)] w-full h-full relative">
      {/* Dark mode mesh pattern for surface texture (optional, highly transparent) */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(var(--color-porcelain) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="px-5 @sm:px-6 py-6 @sm:py-8 relative z-10">
        {/* Header */}
        <header>
          <p
            className="lorna-mono text-[11px] uppercase text-[var(--color-fog-grey)]"
            style={{ letterSpacing: '-0.1px' }}
          >
            Theraply
          </p>
          <h1
            className="mt-2 text-[26px] @sm:text-[30px] leading-[1.15] text-[var(--color-porcelain)]"
            style={{ fontWeight: 590, letterSpacing: '-0.025em' }}
          >
            Your sessions
          </h1>
          <p
            className="mt-1 text-[13px] text-[var(--color-storm-cloud)]"
            style={{ letterSpacing: '-0.11px' }}
          >
            {upcomingCount} upcoming · all confirmed
          </p>

          {/* Filter chips — all disabled. Active uses Neon Lime (the one permitted accent). */}
          <div className="mt-4 flex items-center gap-1.5">
            {(['All', 'Video', 'In-person'] as const).map((label, i) => (
              <button
                key={label}
                type="button"
                disabled
                aria-disabled="true"
                aria-pressed={i === 0}
                tabIndex={-1}
                className={
                  i === 0
                    ? 'text-[12px] px-3 py-1 rounded-full bg-[var(--color-neon-lime)] text-[var(--color-ink)] cursor-not-allowed'
                    : 'text-[12px] px-3 py-1 rounded-full bg-[var(--color-gunmetal)] text-[var(--color-storm-cloud)] opacity-80 cursor-not-allowed'
                }
                style={{ fontWeight: i === 0 ? 590 : 400, letterSpacing: '-0.11px' }}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Hairline divider */}
        <div className="mt-5 h-px bg-[var(--color-charcoal-grey)]" />

        {/* Cards list */}
        <div className="mt-4 flex flex-col gap-2">
          {therapists.map((t) => (
            <TherapistCard key={t.id} therapist={t} />
          ))}
        </div>

        {/* Footer hint */}
        <p
          className="lorna-mono mt-6 text-[11px] text-[var(--color-fog-grey)]"
          style={{ letterSpacing: '-0.15px' }}
        >
          ⌘K — reschedule
        </p>
      </div>
    </div>
  )
}
