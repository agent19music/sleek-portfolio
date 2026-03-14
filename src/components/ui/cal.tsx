'use client'

import * as React from 'react'
import { getCalApi } from '@calcom/embed-react'
import { cn } from '@/lib/utils'

const CAL_NAMESPACE = '15min'
const CAL_LINK = 'uzskicorp/discovery-call'
const CAL_CONFIG = {
  layout: 'month_view',
  useSlotsViewOnSmallScreen: true,
}

export const BUDGET_OPTIONS = [
  { label: '$0 - $2k', value: '0-2k' },
  { label: '$2k - $5k', value: '2k-5k' },
  { label: '$5k - $10k', value: '5k-10k' },
  { label: '$10k+', value: '10k+' },
] as const

let calInitialized = false

function useCalEmbed() {
  React.useEffect(() => {
    if (calInitialized) return
    calInitialized = true

    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#C20019' },
          dark: { 'cal-brand': '#FF4D6A' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])
}

type CalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function CalButton({ children, className, ...props }: CalButtonProps) {
  useCalEmbed()

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'appearance-none border-0 bg-transparent p-0 m-0 font-inherit text-inherit leading-inherit text-left outline-none',
        className
      )}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify(CAL_CONFIG)}
    >
      {children}
    </button>
  )
}

type CalTextLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function CalTextLink({ children, className, ...props }: CalTextLinkProps) {
  useCalEmbed()

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'text-[#C20019] dark:text-[#FF4D6A] hover:underline underline-offset-4',
        className
      )}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify(CAL_CONFIG)}
    >
      {children}
    </button>
  )
}
