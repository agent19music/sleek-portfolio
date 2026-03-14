'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DATA } from '@/app/data/portfolioData'

interface ExperienceItem {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
  href?: string;
  logoUrl?: string;
}

export default function ExperienceContent() {
  const experiences: ExperienceItem[] = DATA.work.map((item) => ({
    company: item.company,
    title: item.title,
    start: item.start,
    end: item.end,
    location: item.location,
    description: item.description,
    href: item.href,
    logoUrl: item.logoUrl,
  }))

  return (
    <div className="space-y-4 pb-4 text-black/70 dark:text-white/70">
      {experiences.map((exp) => (
        <article key={exp.company} className="rounded-xl border border-neutral-200/70 p-4 transition-colors duration-300 dark:border-neutral-800 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
              <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 sm:h-12 sm:w-12">
                {exp.logoUrl ? (
                  <Image
                    src={exp.logoUrl}
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-medium text-black dark:text-white">
                    {exp.company.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium text-black dark:text-white sm:text-lg">
                  {exp.href ? (
                    <Link href={exp.href} target="_blank" className="transition-colors hover:text-[#006FEE]">
                      {exp.company}
                    </Link>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className="mt-1 text-xs opacity-70 sm:text-sm">{exp.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">{exp.description}</p>
              </div>
            </div>

            <div className="text-left text-xs opacity-60 sm:text-sm lg:min-w-[180px] lg:text-right">
              <p>{exp.start} - {exp.end}</p>
              <p className="mt-1">{exp.location}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
