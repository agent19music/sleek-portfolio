import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SpotifyImage = { url: string; height?: number; width?: number }

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

async function getSpotifyAccessToken(): Promise<string> {
  const clientId = requiredEnv('SPOTIFY_CLIENT_ID')
  const clientSecret = requiredEnv('SPOTIFY_CLIENT_SECRET')
  const refreshToken = requiredEnv('SPOTIFY_REFRESH_TOKEN')

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Spotify token request failed (${res.status}): ${text}`)
  }

  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) throw new Error('Spotify token response missing access_token')
  return data.access_token
}

function pickBestImage(images: SpotifyImage[] | undefined): string | null {
  if (!images?.length) return null
  const sorted = [...images].sort((a, b) => (b.width ?? 0) - (a.width ?? 0))
  return sorted[0]?.url ?? null
}

function toArtists(artists: Array<{ name: string }> | undefined): string {
  if (!artists?.length) return ''
  return artists.map((a) => a.name).filter(Boolean).join(', ')
}

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken()

    const commonHeaders = {
      Authorization: `Bearer ${accessToken}`,
    }

    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: commonHeaders,
      cache: 'no-store',
    })

    // 204: nothing playing
    if (nowRes.status === 204) {
      const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: commonHeaders,
        cache: 'no-store',
      })

      if (!recentRes.ok) {
        return NextResponse.json({ error: 'Unable to fetch Spotify state.' }, { status: 502 })
      }

      const recentData = (await recentRes.json()) as {
        items?: Array<{
          played_at?: string
          track?: {
            name?: string
            artists?: Array<{ name: string }>
            external_urls?: { spotify?: string }
            album?: { images?: SpotifyImage[] }
            preview_url?: string | null
            duration_ms?: number
          }
        }>
      }

      const track = recentData.items?.[0]?.track
      return NextResponse.json({
        isPlaying: false,
        label: 'Last played',
        trackUrl: track?.external_urls?.spotify ?? null,
        songName: track?.name ?? null,
        artists: toArtists(track?.artists),
        albumArt: pickBestImage(track?.album?.images),
        previewUrl: track?.preview_url ?? null,
        durationMs: track?.duration_ms ?? null,
        progressMs: 0,
        fetchedAt: new Date().toISOString(),
      })
    }

    if (!nowRes.ok) {
      const text = await nowRes.text().catch(() => '')
      return NextResponse.json(
        { error: `Spotify currently-playing failed (${nowRes.status}): ${text}` },
        { status: 502 },
      )
    }

    const nowData = (await nowRes.json()) as {
      is_playing?: boolean
      progress_ms?: number
      item?: {
        name?: string
        artists?: Array<{ name: string }>
        external_urls?: { spotify?: string }
        album?: { images?: SpotifyImage[] }
        preview_url?: string | null
        duration_ms?: number
      } | null
    }

    const track = nowData.item

    return NextResponse.json({
      isPlaying: Boolean(nowData.is_playing),
      label: nowData.is_playing ? 'Now playing' : 'Last played',
      trackUrl: track?.external_urls?.spotify ?? null,
      songName: track?.name ?? null,
      artists: toArtists(track?.artists),
      albumArt: pickBestImage(track?.album?.images),
      previewUrl: track?.preview_url ?? null,
      durationMs: track?.duration_ms ?? null,
      progressMs: nowData.progress_ms ?? 0,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Spotify unavailable.' }, { status: 500 })
  }
}

