/**
 * LazySection — renders children only when they scroll into the viewport.
 * This prevents all lazy chunks from being requested simultaneously on page load,
 * which saturates mobile connections and causes long blank periods.
 */
import { useEffect, useRef, useState, ReactNode, Suspense } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallbackHeight?: string;
  /** bg color of the skeleton shown while the section hasn't entered view yet */
  bg?: string;
}

export default function LazySection({
  children,
  fallbackHeight = '50vh',
  bg = '#070707',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start loading when section is 200px away from the viewport edge
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!visible) {
    return (
      <div
        ref={ref}
        style={{ minHeight: fallbackHeight, background: bg }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div ref={ref}>
      <Suspense fallback={<div style={{ minHeight: fallbackHeight, background: bg }} />}>
        {children}
      </Suspense>
    </div>
  );
}
