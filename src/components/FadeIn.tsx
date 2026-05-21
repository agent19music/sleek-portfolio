'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Halve both delay and duration to make the reveal snappier (~50% less obnoxious)
  const adjustedDelay = delay * 0.5
  const adjustedDuration = duration * 0.5

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, adjustedDelay * 1000)
          observer.disconnect()
        }
      },
      // Fire as soon as the element enters the viewport, with a 15% bottom
      // pre-trigger so tall sections don't appear to reveal "late".
      { threshold: 0, rootMargin: '0px 0px 15% 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [adjustedDelay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${adjustedDuration}s ease-out`,
      }}
    >
      {children}
    </div>
  )
}

