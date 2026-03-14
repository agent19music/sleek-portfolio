'use client'

import Image from 'next/image'

interface BannerSectionProps {
  quote?: string
  bannerImage?: string
}

export default function BannerSection({
  quote = "Find inspiration and know what do with it.",
  bannerImage = "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/banner.webp"
}: BannerSectionProps) {
  return (
    <div className="w-full mb-2 relative">
      <div className="relative overflow-hidden bg-white">
        <Image
          alt="Banner"
          width={1240}
          height={900}
          className="block w-full h-[185px] sm:h-[250px] object-cover object-center"
          src={bannerImage}
          style={{ color: 'transparent' }}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p className="text-white text-base sm:text-xl italic font-[family-name:var(--font-instrument-serif)] text-center backdrop-blur-[2px] bg-black/10 px-5 py-2.5 rounded-lg">{quote}</p>
        </div>
      </div>
    </div>
  )
}
