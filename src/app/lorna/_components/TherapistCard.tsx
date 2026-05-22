'use client'

import Image from 'next/image'
import { ArrowRight, MapPin, Video } from 'lucide-react'
import { avatarUrl, type Therapist } from './therapists'

interface TherapistCardProps {
  therapist: Therapist
}

/**
 * A booked-session card in the Linear design language:
 * Graphite surface on Pitch Black canvas, Porcelain name, Storm Cloud
 * metadata, Subtle Link Button CTA. Mockup only — the CTA is disabled.
 *
 * Layout: a single horizontal row on `sm:` and up. On narrower screens the
 * card splits into two rows separated by a hairline divider — the top row
 * holds avatar + name + specialization, the bottom row holds the session
 * metadata, modality badge, and the View CTA. This gives each piece of
 * data full width on mobile where horizontal space is at a premium.
 */
export function TherapistCard({ therapist }: TherapistCardProps) {
  const isVideo = therapist.modality === 'video'
  const modalityLabel = isVideo ? 'Video' : therapist.location ?? 'In-person'

  return (
    <article
      className="
        bg-[var(--color-pitch-black)]
        rounded-[12px]
        px-4 py-3
        flex flex-col @sm:flex-row @sm:items-center gap-3
        border border-[var(--color-charcoal-grey)]
        [box-shadow:var(--shadow-card)]
        hover:bg-[var(--color-graphite)]
        hover:-translate-y-0.5
        hover:[box-shadow:var(--shadow-card-hover)]
        transition-all duration-200 ease-out
        relative
      "
    >
      {/* Mobile-only status badge - absolute top right */}
      {therapist.status && (
        <span
          className={`
            absolute top-3 right-4 @sm:hidden
            inline-flex items-center justify-center
            rounded-full px-2.5 py-0.5 text-[11px] font-medium
            ${
              therapist.status === 'pending'
                ? 'bg-[#F59E0B] text-white'
                : 'bg-[#10B981] text-white'
            }
          `}
          style={{ letterSpacing: '-0.1px' }}
        >
          {therapist.status === 'pending' ? 'Pending' : 'Confirmed'}
        </span>
      )}

      {/* Top row on mobile / left side on desktop: avatar + identity */}
      <div className="flex items-center gap-3 min-w-0 pr-16 @sm:pr-0 @sm:flex-1">
        <div className="shrink-0">
          <Image
            src={avatarUrl(therapist)}
            alt={therapist.name}
            width={44}
            height={44}
            className="rounded-full bg-[var(--color-deep-slate)]"
            unoptimized
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="text-[14px] text-[var(--color-porcelain)] truncate"
            style={{ fontWeight: 510, letterSpacing: '-0.13px' }}
          >
            {therapist.name}
          </h3>
          <p
            className="mt-0.5 text-[12px] text-[var(--color-storm-cloud)] truncate"
            style={{ letterSpacing: '-0.11px' }}
          >
            {therapist.specialization}
          
          </p>
        </div>
      </div>

      {/* Hairline divider — mobile only, separates identity from session meta */}
      <div className="@sm:hidden h-px w-full bg-[var(--color-charcoal-grey)]" />

      {/* Desktop session metadata column */}
      <div className="hidden @sm:flex flex-col items-end shrink-0 text-right gap-1">
        <span
          className="lorna-mono text-[12px] text-[var(--color-light-steel)]"
          style={{ letterSpacing: '-0.15px' }}
        >
          {therapist.sessionDay}
          <span className="mx-1 text-[var(--color-fog-grey)]">·</span>
          {therapist.sessionTime}
        </span>
        <div className="flex items-center gap-1.5">
          {therapist.status && (
            <span
              className={`
                inline-flex items-center justify-center
                rounded-full px-2.5 py-0.5 text-[11px] font-medium
                ${
                  therapist.status === 'pending'
                    ? 'bg-[#F59E0B] text-white'
                    : 'bg-[#10B981] text-white'
                }
              `}
              style={{ letterSpacing: '-0.1px' }}
            >
              {therapist.status === 'pending' ? 'Pending' : 'Confirmed'}
            </span>
          )}
          <span
            className="
              inline-flex items-center gap-1
              bg-[var(--color-gunmetal)]
              text-[var(--color-light-steel)]
              rounded-[6px]
              px-1.5 py-px
              text-[11px]
            "
            style={{ letterSpacing: '-0.1px' }}
          >
            {isVideo ? (
              <Video className="w-2.5 h-2.5" aria-hidden />
            ) : (
              <MapPin className="w-2.5 h-2.5" aria-hidden />
            )}
            {modalityLabel}
          </span>
        </div>
      </div>

      {/* Desktop CTA — high-contrast inverted button (Vercel-style) */}
      <button
        type="button"
        className="
          hidden @sm:flex shrink-0 h-12 w-[158px] items-center justify-center gap-1.5
          rounded-full
          bg-[var(--color-porcelain)] text-[var(--color-pitch-black)]
          hover:bg-[var(--color-light-steel)]
          text-[14px]
          transition-colors
        "
        style={{ letterSpacing: '-0.11px', fontWeight: 510 }}
      >
        View
        <ArrowRight className="w-4 h-4" aria-hidden />
      </button>

      {/* Mobile-only: session meta + CTA without labels — content speaks for itself. */}
      <div className="@sm:hidden flex flex-col gap-2.5">
        {/* Session day + time and modality inline */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="lorna-mono text-[12.5px] text-[var(--color-light-steel)]"
            style={{ letterSpacing: '-0.15px' }}
          >
            {therapist.sessionDay}
            <span className="mx-1.5 text-[var(--color-fog-grey)]">·</span>
            {therapist.sessionTime}
          </span>
          <span
            className="
              inline-flex items-center gap-1
              bg-[var(--color-gunmetal)]
              text-[var(--color-light-steel)]
              rounded-[6px]
              px-2 py-0.5
              text-[11px]
            "
            style={{ letterSpacing: '-0.1px' }}
          >
            {isVideo ? (
              <Video className="w-2.5 h-2.5" aria-hidden />
            ) : (
              <MapPin className="w-2.5 h-2.5" aria-hidden />
            )}
            {modalityLabel}
          </span>
        </div>

        {/* Full-width inverted CTA */}
        <button
          type="button"
          className="
            mt-1 flex h-12 w-full items-center justify-center gap-1.5
            rounded-full
            bg-[var(--color-porcelain)] text-[var(--color-pitch-black)]
            hover:bg-[var(--color-light-steel)]
            px-5
            text-[14px]
            transition-colors
          "
          style={{ letterSpacing: '-0.11px', fontWeight: 510 }}
        >
          View details
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </article>
  )
}
