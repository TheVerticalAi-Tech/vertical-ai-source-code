import { useState, useEffect, useRef, ReactNode } from 'react';

// Reusable hook for intersection observer
interface ObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
}

export function useIntersectionObserver(options: ObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      { 
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '100px',
        root: options.root || null
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [options.threshold, options.rootMargin, options.root, options.once]);

  return { ref, isVisible };
}

// Reusable component for lazy loading
interface LazyLoadSectionProps {
  children?: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export function LazyLoadSection({ 
  children, 
  placeholder = "", 
  className = "", 
  threshold = 0.1,
  rootMargin = '100px',
  once = true 
}: LazyLoadSectionProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    once
  });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (placeholder || <div className={className}></div>)}
    </div>
  );
}