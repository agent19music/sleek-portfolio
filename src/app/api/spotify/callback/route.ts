import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SCOPES_NEEDED = [
  'user-read-currently-playing',
  'user-read-recently-played',
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization denied: ${error}` },
      { status: 403 },
    )
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code from Spotify.' },
      { status: 400 },
    )
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Server missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET.' },
      { status: 500 },
    )
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:3000/api/spotify/callback'
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
    cache: 'no-store',
  })

  if (!tokenRes.ok) {
    const text = await tokenRes.text().catch(() => '')
    return NextResponse.json(
      { error: `Token exchange failed (${tokenRes.status}): ${text}` },
      { status: 502 },
    )
  }

  const tokens = (await tokenRes.json()) as {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    scope?: string
    token_type?: string
  }

  const grantedScopes = (tokens.scope ?? '').split(' ')
  const missingScopes = SCOPES_NEEDED.filter((s) => !grantedScopes.includes(s))

  return NextResponse.json({
    message: 'Spotify OAuth success. Copy the refresh_token into your .env as SPOTIFY_REFRESH_TOKEN.',
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_in: tokens.expires_in,
    scope: tokens.scope,
    missing_scopes: missingScopes.length ? missingScopes : undefined,
  })
}
