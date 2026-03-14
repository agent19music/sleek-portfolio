'use client'

import { useEffect, useMemo, useState } from 'react'
import { SPOTIFY_EMBED_SRCS } from '@/app/data/spotifyEmbedPlaylist'

interface SpotifyPlayerProps {
  intervalMs?: number
}

export default function SpotifyPlayer({ intervalMs = 120000 }: SpotifyPlayerProps) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const fallbackSrc = useMemo(() => SPOTIFY_EMBED_SRCS[0] ?? null, [])

  useEffect(() => {
    let mounted = true

    const fetchEmbed = async () => {
      try {
        const res = await fetch(`/api/spotify-embed?intervalMs=${intervalMs}`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Failed to fetch spotify embed source')
        const data = await res.json()
        if (!mounted) return
        setEmbedSrc(data.src ?? fallbackSrc)
        setActiveIndex(typeof data.idx === 'number' ? data.idx : 0)
      } catch {
        if (!mounted) return
        setEmbedSrc(fallbackSrc)
        setActiveIndex(0)
      }
    }

    fetchEmbed()
    const timer = setInterval(fetchEmbed, intervalMs)

    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [fallbackSrc, intervalMs])

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-black/70 dark:text-white/70">Spotify rotation</p>
        <p className="text-xs text-black/50 dark:text-white/50">
          Track {activeIndex + 1} of {SPOTIFY_EMBED_SRCS.length}
        </p>
      </div>

      {embedSrc ? (
        <iframe
          src={embedSrc}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full rounded-xl border-0"
          title="Spotify embed"
        />
      ) : (
        <div className="rounded-xl border border-neutral-200 p-4 text-sm text-black/60 dark:border-neutral-800 dark:text-white/60">
          Unable to load Spotify right now.
        </div>
      )}
    </div>
  )
}
