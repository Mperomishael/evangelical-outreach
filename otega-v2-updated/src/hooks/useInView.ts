import { useEffect, useRef, useState } from 'react';

/** Fires when element enters viewport; also forces visible after timeout so UI never stays blank. */
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

    // Safety: never leave content invisible
    const fallback = window.setTimeout(() => setInView(true), 1200);

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return () => clearTimeout(fallback);
    }

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
        rootMargin: options?.rootMargin ?? '0px 0px -5% 0px',
        threshold: options?.threshold ?? 0.05,
      }
    );

    obs.observe(el);
    return () => {
      clearTimeout(fallback);
      obs.disconnect();
    };
  }, [once, options?.rootMargin, options?.threshold]);

  return { ref, inView };
}
