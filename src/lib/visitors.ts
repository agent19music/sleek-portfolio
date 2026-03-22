import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

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

let cachedSupabaseClient: SupabaseClient | null = null

function getSupabaseEnv() {
  // Prefer a server-only URL variable, with backward-compatible fallback.
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  return {
    supabaseUrl,
    serviceRoleKey,
  }
}

export function isVisitorDbConfigured(): boolean {
  const { supabaseUrl, serviceRoleKey } = getSupabaseEnv()
  return Boolean(supabaseUrl && serviceRoleKey)
}

function getSupabaseClient(): SupabaseClient | null {
  const { supabaseUrl, serviceRoleKey } = getSupabaseEnv()

  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }

  if (cachedSupabaseClient) {
    return cachedSupabaseClient
  }

  try {
    cachedSupabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    return cachedSupabaseClient
  } catch (error) {
    logVisitorError('Invalid Supabase configuration for visitor tracking:', error)
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
  const supabase = getSupabaseClient()
  if (!supabase) return

  const { error } = await supabase
    .from('visitors')
    .select('id', { head: true, count: 'exact' })
    .limit(1)

  if (error) {
    throw error
  }
}

export async function trackVisit(visitorId: string): Promise<VisitorData> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { uniqueVisitors: 0 }
  }

  try {
    if (!didInitTable && !initAttempted) {
      initAttempted = true
      await initVisitorTable()
      didInitTable = true
    }

    // Insert visitor if not exists
    const { error: upsertError } = await supabase
      .from('visitors')
      .upsert({ visitor_id: visitorId }, { onConflict: 'visitor_id', ignoreDuplicates: true })

    if (upsertError) {
      throw upsertError
    }

    // Get count
    const { count, error: countError } = await supabase
      .from('visitors')
      .select('*', { head: true, count: 'exact' })

    if (countError) {
      throw countError
    }

    const uniqueCount = count ?? 0

    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    logVisitorError('Error tracking visitor:', error)
    return { uniqueVisitors: 0 }
  }
}

export async function getVisitorStats(): Promise<{ uniqueVisitors: number }> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return { uniqueVisitors: 0 }
  }

  try {
    if (!didInitTable && !initAttempted) {
      initAttempted = true
      await initVisitorTable()
      didInitTable = true
    }

    const { count, error: countError } = await supabase
      .from('visitors')
      .select('*', { head: true, count: 'exact' })

    if (countError) {
      throw countError
    }

    const uniqueCount = count ?? 0
    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    logVisitorError('Error getting visitor stats:', error)
    return { uniqueVisitors: 0 }
  }
}
