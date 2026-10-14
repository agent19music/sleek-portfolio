'use client'

import { useEffect, useState } from 'react'
import { Clock, Code, EnvelopeSimple, GithubLogo, Lightbulb, LinkedinLogo, MapPin, Phone, XLogo } from '@phosphor-icons/react'
import { DATA } from '@/app/data/portfolioData'

export default function PortfolioOverview() {
  const [clock, setClock] = useState({ time: '—', difference: '' })

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const differenceMinutes = 180 + now.getTimezoneOffset()
      const absoluteMinutes = Math.abs(differenceMinutes)
      const hours = Math.floor(absoluteMinutes / 60)
      const minutes = absoluteMinutes % 60
      const difference = differenceMinutes === 0
        ? 'same time'
        : `${hours ? `${hours}h` : ''}${minutes ? ` ${minutes}m` : ''} ${differenceMinutes > 0 ? 'ahead' : 'behind'}`.trim()
      setClock({
        time: new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: true }).format(now),
        difference,
      })
    }
    updateClock()
    const timer = setInterval(updateClock, 30000)
    return () => clearInterval(timer)
  }, [])

  const socials = [
    { name: 'X', href: DATA.contact.social.X.url, icon: XLogo },
    { name: 'GitHub', href: DATA.contact.social.GitHub.url, icon: GithubLogo },
    { name: 'LinkedIn', href: DATA.contact.social.LinkedIn.url, icon: LinkedinLogo },
  ]
  const tileClass = 'flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background'
  const rowClass = 'flex min-w-0 items-center gap-4 text-sm font-mono'
  const linkClass = 'min-w-0 break-words underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring'

  return (
    <div className="mt-6 border-x border-border">
      <nav aria-label="Social links" className="border-y border-border p-4">
        <ul className="flex flex-wrap gap-2">
          {socials.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a href={href} aria-label={name} title={name} target="_blank" rel="noopener noreferrer" className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground/80 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <section aria-label="Overview" className="relative border-b border-border p-4">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden border-r border-dashed border-border sm:block" />
        <div className="relative grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          <div className={`${rowClass} sm:col-span-2`}>
            <span className={tileClass}><Code size={16} aria-hidden="true" /></span>
            <p>Full-stack Engineer @<a className={linkClass} href={DATA.work[0].href} target="_blank" rel="noopener noreferrer">GS1 Kenya</a></p>
          </div>
          <div className={`${rowClass} sm:col-span-2`}>
            <span className={tileClass}><Lightbulb size={16} aria-hidden="true" /></span>
            <p>Founder @<a className={linkClass} href={DATA.work[1].href} target="_blank" rel="noopener noreferrer">Uzski Corp</a></p>
          </div>
          <div className={rowClass}>
            <span className={tileClass}><MapPin size={16} aria-hidden="true" /></span>
            <a className={linkClass} href={DATA.locationLink} target="_blank" rel="noopener noreferrer">Nairobi, Kenya</a>
          </div>
          <div className={rowClass}>
            <span className={tileClass}><Clock size={16} aria-hidden="true" /></span>
            <p className="tabular-nums">{clock.time}<span className="text-muted-foreground">{clock.difference && ` // ${clock.difference}`}</span></p>
          </div>
          <div className={rowClass}>
            <span className={tileClass}><EnvelopeSimple size={16} aria-hidden="true" /></span>
            <a className={linkClass} href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a>
          </div>
          <div className={rowClass}>
            <span className={tileClass}><Phone size={16} aria-hidden="true" /></span>
            <a className={linkClass} href={`tel:${DATA.contact.tel.replace(/\s/g, '')}`}>{DATA.contact.tel}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
