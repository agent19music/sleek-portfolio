'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

function VinylDisc({ spinning = false, className = '' }: { spinning?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`h-11 w-11 shrink-0 ${spinning ? 'animate-[spin_3s_linear_infinite]' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vinyl-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="35%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.12" />
          <stop offset="65%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
      <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="11" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="8.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="7" fill="#b91c1c" />
      <circle cx="24" cy="24" r="2" fill="#1a1a1a" />
      <circle cx="24" cy="24" r="0.8" fill="#666" />
      <circle cx="24" cy="24" r="23" fill="url(#vinyl-sheen)" />
    </svg>
  )
}

interface SpotifyPlayerProps {
  apiUrl?: string
  pollMs?: number
}

export default function SpotifyPlayer({
  apiUrl = '/api/spotify/now-playing',
  pollMs = 60000,
}: SpotifyPlayerProps) {
  const [uiTrackUrl, setUiTrackUrl] = useState<string | null>(null)
  const [uiAlbumArt, setUiAlbumArt] = useState<string | null>(null)
  const [uiSongName, setUiSongName] = useState<string | null>(null)
  const [uiArtists, setUiArtists] = useState<string | null>(null)
  const [uiLabel, setUiLabel] = useState<'Now playing' | 'Last played'>('Now playing')
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading')

  useEffect(() => {
    let cancelled = false

    const hydrateFromSpotify = async () => {
      try {
        setStatus((s) => (s === 'ready' ? s : 'loading'))
        const res = await fetch(apiUrl, { cache: 'no-store' })
        if (!res.ok) {
          setStatus('empty')
          return
        }
        const data = (await res.json()) as {
          isPlaying?: boolean
          label?: 'Now playing' | 'Last played'
          trackUrl?: string | null
          albumArt?: string | null
          songName?: string | null
          artists?: string | null
          previewUrl?: string | null
          durationMs?: number | null
          progressMs?: number | null
        }

        if (cancelled) return

        const hasTrack = Boolean(data.songName) || Boolean(data.trackUrl)
        if (!hasTrack) {
          setStatus('empty')
          setUiTrackUrl(null)
          setUiAlbumArt(null)
          setUiSongName(null)
          setUiArtists(null)
          return
        }

        setStatus('ready')
        if (data.label) setUiLabel(data.label)
        setUiTrackUrl(data.trackUrl ?? null)
        setUiAlbumArt(data.albumArt ?? null)
        setUiSongName(data.songName ?? null)
        setUiArtists(data.artists ?? null)
      } catch {
        setStatus('empty')
      }
    }

    hydrateFromSpotify()
    const t = window.setInterval(hydrateFromSpotify, pollMs)
    return () => {
      cancelled = true
      window.clearInterval(t)
    }
  }, [apiUrl, pollMs])

  return (
    <div className="w-full">

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        {status !== 'ready' ? (
          <div className="flex items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-lg bg-neutral-200/70 dark:bg-neutral-800/70 sm:h-[72px] sm:w-[72px]" />
              <div className="min-w-0">
                <div className="h-4 w-24 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                <div className="mt-2 h-4 w-48 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                <div className="mt-2 h-3 w-32 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
              </div>
            </div>
            <VinylDisc spinning={false} className="opacity-40" />
          </div>
        ) : (
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60 sm:h-[72px] sm:w-[72px]">
            {uiAlbumArt ? (
              <Image
                src={uiAlbumArt}
                alt={uiSongName ?? 'Spotify track'}
                width={72}
                height={72}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-1.5">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#1DB954] drop-shadow-[0_0_6px_rgba(29,185,84,0.6)]"
                fill="currentColor"
                style={{ filter: 'drop-shadow(0 0 4px rgba(29, 185, 84, 0.5))' }}
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">{uiLabel}</span>
            </div>

            {uiTrackUrl ? (
              <a
                href={uiTrackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer text-base font-semibold text-black hover:underline dark:text-white"
              >
                {uiSongName ?? 'Open in Spotify'}
              </a>
            ) : (
              <p className="block text-base font-semibold text-black dark:text-white">{uiSongName ?? '—'}</p>
            )}

            {uiArtists ? <p className="text-sm text-[#1DB954]">by {uiArtists}</p> : null}
          </div>

          <VinylDisc spinning />
        </div>
        )}

      </div>
    </div>
  )
}
