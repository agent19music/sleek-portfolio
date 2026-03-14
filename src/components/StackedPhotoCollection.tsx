"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

interface Photo {
  id: number
  src: string
  alt: string
  caption?: string
}

interface StackedPhotoCollectionProps {
  photos: Photo[]
  stackSpacing?: number
  size?: "small" | "medium" | "large"
}

export default function StackedPhotoCollection({
  photos,
  stackSpacing = 4,
  size = "medium",
}: StackedPhotoCollectionProps) {
  const [photoStack, setPhotoStack] = useState<Photo[]>(photos)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const getRandomOffset = () => {
    const randomSign = Math.random() > 0.5 ? 1 : -1
    return Math.random() * 2 * randomSign
  }

  const initialPhotoOffsets = useRef(
    photos.map(() => ({
      x: getRandomOffset(),
      y: getRandomOffset(),
      rotate: getRandomOffset() * 3,
    })),
  )

  const shuffleNext = () => {
    if (!photos.length) return
    if (!hasInteracted) setHasInteracted(true)

    const nextIdx = currentIndex % photos.length
    const nextPhotoId = photos[nextIdx]?.id
    if (!nextPhotoId) return

    setPhotoStack((prev) => {
      const item = prev.find((photo) => photo.id === nextPhotoId)
      if (!item) return prev
      const filteredStack = prev.filter((photo) => photo.id !== nextPhotoId)
      return [...filteredStack, item]
    })
    setCurrentIndex((prev) => prev + 1)
  }

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { width: "14rem", height: "14rem" }
      case "large":
        return { width: "22rem", height: "22rem" }
      default:
        return { width: "18rem", height: "18rem" }
    }
  }

  return (
    <div className="relative flex w-full select-none items-center justify-center">
      <div className="relative" style={{ ...getSizeStyles(), perspective: "1000px" }}>
        <AnimatePresence>
          {photoStack.map((photo, index) => {
            const zIndex = photoStack.length - index
            const photoIdx = photos.findIndex((p) => p.id === photo.id)
            const offset = initialPhotoOffsets.current[photoIdx] ?? { x: 0, y: 0, rotate: 0 }

            return (
              <motion.div
                key={photo.id}
                className="absolute left-0 top-0 h-full w-full cursor-pointer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: offset.x * stackSpacing,
                  y: offset.y * stackSpacing,
                  rotate: offset.rotate,
                  zIndex,
                }}
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformOrigin: "center center" }}
                onClick={shuffleNext}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") shuffleNext()
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full rounded-sm object-cover"
                  draggable={false}
                  quality={100}
                  priority={index === 0}
                />
                {!hasInteracted && <div className="pointer-events-none absolute inset-0" />}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-sm text-gray-500 md:hidden">Tap to explore</p>
      </div>
    </div>
  )
}

