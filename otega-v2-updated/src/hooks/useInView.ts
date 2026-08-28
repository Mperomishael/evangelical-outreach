import { useEffect, useRef, useState } from 'react';

/** Fires once when element enters the viewport (for scroll-reveal animations). */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once !== false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
        threshold: options?.threshold ?? 0.12,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, options?.rootMargin, options?.threshold]);

  return { ref, inView };
}
