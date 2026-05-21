'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  disableOnMobile?: boolean;
}

export const Reveal = ({ 
  children, 
  className = '',
  delay = 0,
  disableOnMobile = false,
}: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disableOnMobile && window.matchMedia('(max-width: 639px)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Halve the requested delay so the reveal feels more responsive
          const adjusted = delay * 0.5;
          if (adjusted > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, adjusted * 1000);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      // Fire as soon as any sliver enters the viewport, and pre-trigger
      // 15% above the fold so tall sections (e.g. Projects) don't appear
      // to reveal "late" when their top edge crosses into view.
      { threshold: 0, rootMargin: '0px 0px 15% 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, disableOnMobile]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {children}
    </div>
  );
};
