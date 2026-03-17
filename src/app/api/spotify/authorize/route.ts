import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ')

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID

  if (!clientId) {
    return NextResponse.json(
      { error: 'Server missing SPOTIFY_CLIENT_ID.' },
      { status: 500 },
    )
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:3000/api/spotify/callback'

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: redirectUri,
    show_dialog: 'true',
  })

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
}
