import { neon } from '@neondatabase/serverless'

export interface VisitorData {
  uniqueVisitors: number
}

let didInitTable = false
let initAttempted = false

function logVisitorError(message: string, error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, error)
  }
}

function getSqlClient() {
  const connection = process.env.DATABASE_URL
  if (!connection) {
    return null
  }

  try {
    return neon(connection)
  } catch (error) {
    logVisitorError('Invalid DATABASE_URL for Neon client:', error)
    return null
  }
}

export function generateVisitorId(ip: string | null, userAgent: string | null, fingerprint?: string): string {
  if (fingerprint) {
    return `fp:${fingerprint}`
  }

  const ipPart = ip || 'unknown'
  const uaPart = userAgent || 'unknown'
  return Buffer.from(`${ipPart}-${uaPart}`).toString('base64').slice(0, 32)
}

export async function initVisitorTable(): Promise<void> {
  const sql = getSqlClient()
  if (!sql) return

  await sql`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      visitor_id TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

export async function trackVisit(visitorId: string): Promise<VisitorData> {
  const sql = getSqlClient()
  if (!sql) {
    return { uniqueVisitors: 0 }
  }

  try {
    if (!didInitTable && !initAttempted) {
      initAttempted = true
      await initVisitorTable()
      didInitTable = true
    }

    // Insert visitor if not exists
    await sql`
      INSERT INTO visitors (visitor_id)
      VALUES (${visitorId})
      ON CONFLICT (visitor_id) DO NOTHING
    `

    // Get count
    const result = await sql`SELECT COUNT(*) as count FROM visitors`
    const uniqueCount = parseInt(result[0]?.count || '0', 10)

    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    logVisitorError('Error tracking visitor:', error)
    return { uniqueVisitors: 0 }
  }
}

export async function getVisitorStats(): Promise<{ uniqueVisitors: number }> {
  const sql = getSqlClient()
  if (!sql) {
    return { uniqueVisitors: 0 }
  }

  try {
    if (!didInitTable && !initAttempted) {
      initAttempted = true
      await initVisitorTable()
      didInitTable = true
    }

    const result = await sql`SELECT COUNT(*) as count FROM visitors`
    const uniqueCount = parseInt(result[0]?.count || '0', 10)
    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    logVisitorError('Error getting visitor stats:', error)
    return { uniqueVisitors: 0 }
  }
}
