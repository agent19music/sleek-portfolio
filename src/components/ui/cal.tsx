'use client'

import * as React from 'react'
import { getCalApi } from '@calcom/embed-react'
import { cn } from '@/lib/utils'

const CAL_NAMESPACE = '15min'
const CAL_LINK = 'uzskicorp/discovery-call'
const CAL_URL = 'https://cal.com/uzskicorp/discovery-call?duration=15'
const CAL_CONFIG = {
  layout: 'month_view',
  useSlotsViewOnSmallScreen: 'true',
} as const

type CalApi = Awaited<ReturnType<typeof getCalApi>>

let calPromise: Promise<CalApi> | null = null

function loadCal() {
  if (!calPromise) {
    calPromise = getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#C20019' },
          dark: { 'cal-brand': '#FF4D6A' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
      return cal
    })
  }

  return calPromise
}

async function openScheduler() {
  try {
    const cal = await loadCal()
    cal('modal', {
      calLink: CAL_LINK,
      config: CAL_CONFIG,
    })
  } catch {
    window.open(CAL_URL, '_blank', 'noopener,noreferrer')
  }
}

type CalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function CalButton({ children, className, onClick, onPointerEnter, ...props }: CalButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'appearance-none border-0 bg-transparent p-0 m-0 font-inherit text-inherit leading-inherit text-left outline-none',
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        void loadCal()
      }}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        void openScheduler()
      }}
    >
      {children}
    </button>
  )
}

type CalTextLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function CalTextLink({ children, className, onClick, onPointerEnter, ...props }: CalTextLinkProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'text-[#C20019] dark:text-[#FF4D6A] hover:underline underline-offset-4',
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        void loadCal()
      }}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        void openScheduler()
      }}
    >
      {children}
    </button>
  )
}
