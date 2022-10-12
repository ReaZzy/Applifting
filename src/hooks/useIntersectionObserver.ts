import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

type UseIntersectionObserver = (
  ref: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit & { observe?: boolean },
) => void;

export const useIntersectionObserver: UseIntersectionObserver = (
  ref,
  callback,
  options,
) => {
  const element = useRef<Element | null>(null);
  const intersectionObserverCallback = useRef<IntersectionObserverCallback>(
    () => {},
  );

  const observer = useMemo(() => {
    return new IntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    element.current = ref.current;
  }, [ref]);

  useEffect(() => {
    intersectionObserverCallback.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    if (!element.current) return;
    if (options?.observe) {
      observer.observe(element.current);
    } else {
      observer.unobserve(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element, observer, options?.observe]);
};
