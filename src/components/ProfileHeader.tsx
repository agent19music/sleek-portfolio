'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import * as React from 'react'

interface ProfileHeaderProps {
  name?: string
  title?: string
  profileImage?: string
}

export default function ProfileHeader({
  name = 'Sean Motanya',
  title = 'Software Engineer · Full-stack',
  profileImage = '/pfp.jpg',
}: ProfileHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => void
    }

    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => setTheme(newTheme))
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <header className="grid grid-cols-[auto_1fr] border-x border-y border-border">
      <div className="border-r border-border p-1">
        <div
          className="size-28 rounded-full bg-muted ring-1 ring-border sm:size-40"
          role="img"
          aria-label={`${name} profile photo`}
          style={{
            backgroundImage: `url("${profileImage}")`,
            backgroundPosition: 'center 28%',
            backgroundSize: 'cover',
          }}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-end">
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
          <h1 className="min-w-0 text-2xl font-medium leading-tight tracking-tight sm:text-[2rem]">{name}</h1>
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
            </button>
          )}
        </div>
        <p className="border-t border-border px-4 py-2 font-[family-name:var(--font-geist-pixel-circle)] text-xs text-foreground sm:text-sm">{title}</p>
      </div>
    </header>
  )
}
