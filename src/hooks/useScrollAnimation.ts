import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function useScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollY = useScroll().scrollY;

  return {
    containerRef,
    scrollYProgress,
    scrollY,
  };
}

// Hook to create parallax effect
export function useParallax(offset: number = 0.5): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, (value) => value * offset);
}

// Hook to create rotation based on scroll
export function useScrollRotation(multiplier: number = 0.5): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, (value) => value * multiplier);
}

// Hook to create scale animation based on scroll
export function useScrollScale(minScale: number = 0.8, maxScale: number = 1): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 0.5, 1], [minScale, maxScale, minScale]);
}

// Hook to create opacity fade based on scroll
export function useScrollOpacity(
  startThreshold: number = 0,
  endThreshold: number = 1
): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [startThreshold, endThreshold], [0, 1]);
}

// Hook for scroll-based element visibility trigger
export function useScrollTrigger(threshold: number = 0.3): boolean {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return isVisible;
}

// Hook for scroll velocity
export function useScrollVelocity(): MotionValue<number> {
  const { scrollY } = useScroll();
  const [lastValue, setLastValue] = useState(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      const currentVelocity = (current as number) - lastValue;
      setVelocity(currentVelocity);
      setLastValue(current as number);
    });

    return () => unsubscribe();
  }, [scrollY, lastValue]);

  return useTransform(() => velocity);
}
