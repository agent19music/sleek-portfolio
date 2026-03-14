'use client'

import { useEffect, useState } from 'react'
import { getOrCreateVisitorId } from '@/lib/fingerprint'
import { Eye } from 'lucide-react'

interface VisitorStats {
  uniqueVisitors: number
  dbConfigured?: boolean
}

function getOrdinalSuffix(value: number): 'st' | 'nd' | 'rd' | 'th' {
  const absValue = Math.abs(value)
  const lastTwoDigits = absValue % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th'
  }

  switch (absValue % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function VisitorCount({ className }: { className?: string }) {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function trackAndFetchStats() {
      try {
        const fingerprint = getOrCreateVisitorId()

        await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fingerprint }),
          cache: 'no-store'
        })

        const response = await fetch('/api/visitors', {
          method: 'GET',
          cache: 'no-store'
        })

        if (response.ok) {
          const data = await response.json()
          setStats({
            uniqueVisitors: data.uniqueVisitors || 0,
            dbConfigured: data.dbConfigured,
          })
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Failed to fetch visitor stats:', error)
        }
      } finally {
        setLoading(false)
      }
    }

    trackAndFetchStats()
  }, [])

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2">
        <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>
    )
  }

  if (!stats) {
    return null
  }

  if (stats.dbConfigured === false) {
    return (
      <div className={`inline-flex items-center gap-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2.5 ${className || ''}`}>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Visitor tracking disabled (Neon not configured)
        </span>
      </div>
    )
  }

  const ordinalSuffix = getOrdinalSuffix(stats.uniqueVisitors)

  return (
    <div className={`inline-flex items-center gap-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2.5 ${className || ''}`}>
      <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
        <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
      </div>
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        You are the <span className="font-semibold text-black dark:text-white">{stats.uniqueVisitors.toLocaleString()}<sup className="text-[10px]">{ordinalSuffix}</sup></span> visitor
      </span>
    </div>
  )
}
