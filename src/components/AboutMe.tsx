'use client'

import StackedPhotoCollection from '@/components/StackedPhotoCollection'
import { DATA } from '@/app/data/portfolioData'

export default function AboutMe() {
    return (
        <div className="w-full">
            {/* Section Header */}
            <div className="mb-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">About</p>
                <h2 className="text-xl font-bold text-black dark:text-white">Me</h2>
            </div>

            {/* Content Card */}
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                {/* Profile Image */}
                <div className="shrink-0 md:w-[20rem] lg:w-[22rem]">
                    <StackedPhotoCollection photos={DATA.photos as unknown as { id: number; src: string; alt: string; caption?: string }[]} size="medium" />
                </div>

                {/* Info Section */}
                <div className="flex-1">
                    {/* Name */}
                    <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-instrument-serif)] text-black dark:text-white mb-4">
                        Sean Motanya
                    </h3>

                    {/* Bio */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                        I&apos;m a full-stack software engineer and recent computer science graduate based in Nairobi. I enjoy designing and building intentionally crafted products that are both beautiful and useful, from backend systems to polished interfaces. There&apos;s just something about owning the entire process from start to finish that feels fulfilling.
                    </p>

                </div>
            </div>
        </div>
    )
}
