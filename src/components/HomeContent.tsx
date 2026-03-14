'use client'

import Link from 'next/link'
import Image from 'next/image'
import DiagonalPattern from './DiagonalPattern'
import BannerSection from './BannerSection'
import ProfileHeader from './ProfileHeader'
import ContentSection from './ContentSection'
import ContentParagraph from './ContentParagraph'
import SectionBorder from './SectionBorder'
import ExperienceContent from './ExperienceContent'
import Reachout from './Reachout'
import CallToAction from './CallToAction'
import TechStackMarquee from './TechStackMarquee'
import { Reveal } from './Reveal'
import { projects } from '@/data/projects'
import { MasonryProjectCard } from './MasonryProjectCard'
import { faqs } from '@/data/blogs'
import { FAQCard } from './FAQCard'
import GitHubActivity from './GitHubActivity'
import AboutMe from './AboutMe'
import { DATA } from '@/app/data/portfolioData'


export default function NewHeroSection() {
  return (
    <div className="min-h-screen transition-colors duration-300 relative" style={{ fontFamily: 'var(--font-hk-grotesk)' }}>
      <div className="relative mx-auto max-w-4xl">
        {/* Diagonal Patterns */}
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />

        {/* Main Content */}
        <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl sm:px-0">
          {/* Banner Section */}
          <Reveal delay={0.1}>
            <BannerSection
              bannerImage="/banner.jpg"
              quote="Get inspiration and know what to do with it."
            />
          </Reveal>

          {/* Profile Header */}
          <Reveal delay={0.2}>
            <ProfileHeader
              name={DATA.name}
              title="Software Engineer • Full-stack"
              profileImage="https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/seanpfpnobg.webp"
              socialLinks={{
                twitter: DATA.contact.social.X.url,
                github: DATA.contact.social.GitHub.url,
                linkedin: DATA.contact.social.LinkedIn.url,
              }}
            />
          </Reveal>

          {/* Content Prose */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-base">
              {/* Current Role Section */}
              <Reveal delay={0.1}>
                  <ContentSection
                    subtitle="Software Engineer • Full-stack "
                    title=""
                    className="mt-6"
                  >
                    <ContentParagraph className="mb-0 text-base sm:text-lg">
                      {DATA.summary}
                    </ContentParagraph>
                  </ContentSection>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>
              
              {/* Experience Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-10 lg:px-12 py-2">
                  <h2 className="text-base sm:text-xl mb-3  mt-4 sm:mt-6 px-4 opacity-80 font-[family-name:var(--font-instrument-serif)]">Professional Experience</h2>
                  <div className="px-4">
                    <ExperienceContent />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-4" />
              </Reveal>

              {/* Projects / Works */}
              <Reveal delay={0.1}>
                <div className="sm:px-10 lg:px-12 py-2">
                  <div className="px-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
                    <h2 className="text-base sm:text-xl opacity opacity-80 font-[family-name:var(--font-instrument-serif)]">Projects / Works</h2>
                  </div>
                  <div className="px-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 group">
                      {projects.slice(0, 6).map((project) => (
                        <MasonryProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 flex justify-end mt-6 sm:mt-8 mb-4 sm:mb-6">
                    <Link
                      href="/projects"
                      className="text-xs sm:text-sm text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80 transition-colors inline-flex items-center gap-1"
                    >
                      View All
                      <span>→</span>
                    </Link>
                  </div>

                  {/* About Me Section */}
                  <div className="px-4 mt-8 sm:mt-10 mb-8 sm:mb-10">
                    <AboutMe />
                  </div>

                  {/* Hackathons Section */}
                  <div className="px-4 mb-8 sm:mb-10">
                    <div className="mb-4 sm:mb-5">
                      <h2 className="text-base sm:text-xl opacity-80 font-(family-name:--font-instrument-serif)">
                        I like building fast
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-black/60 dark:text-white/60">
                        Hackathons I have joined
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {DATA.hackathons.map((hackathon) => (
                        <article
                          key={`${hackathon.title}-${hackathon.dates}`}
                          className="rounded-xl border border-neutral-200/70 p-4 transition-all duration-300 dark:border-neutral-800 sm:p-5"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 sm:h-12 sm:w-12">
                              <Image
                                src={hackathon.image}
                                alt={hackathon.title}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm sm:text-base font-medium text-black dark:text-white leading-snug">
                                {hackathon.title}
                              </h3>
                              <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                                {hackathon.dates}
                              </p>
                              <p className="text-xs text-black/55 dark:text-white/55">
                                {hackathon.location}
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                                {hackathon.description}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* GitHub Activity Heatmap */}
                  <div className="px-4 mb-4 sm:mb-6">
                    <GitHubActivity username="agent19music" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Thoughts Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-10 lg:px-12 py-2">
                  <div className="px-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
                    <h2 className="text-base sm:text-xl opacity-80 font-[family-name:var(--font-instrument-serif)]">Thoughts</h2>
                  </div>
                  <div className="px-4">
                    <div className="space-y-0 group">
                      {faqs.map((faq) => (
                        <FAQCard key={faq.id} faq={faq} />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Tech Stack Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-10 lg:px-12 mt-4 sm:mt-6 mb-4 sm:mb-6">
                  <div className="px-4">
                    <TechStackMarquee className="w-full" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>


              {/* call to action*/}
              <Reveal delay={0.1}>
                <div className="px-4 sm:px-0">
                  <CallToAction />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Reachout Section */}
              <Reveal delay={0.1}>
                <div className="mt-4 sm:mt-6">
                  <Reachout
                    title="Let's connect"
                    subtitle="Find me on these platforms"
                    socialLinks={{
                      twitter: DATA.contact.social.X.url,
                      github: DATA.contact.social.GitHub.url,
                      linkedin: DATA.contact.social.LinkedIn.url,
                      mail: `mailto:${DATA.contact.email}`,
                    }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
