import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
export type UseIntersectionObserver = (
  ref: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit & { observe?: boolean },
) => void;
export const useIntersectionObserver: UseIntersectionObserver = (
  ref,
  callback,
  options,
) => {
  const [element, setElement] = useState<Element | null>(null);
  const intersectionObserverCallback = useRef<IntersectionObserverCallback>(
    () => {},
  );

  const observer = useMemo(() => {
    return new IntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (typeof callback === 'function') {
      intersectionObserverCallback.current = callback;
    }
  }, [callback]);

  useLayoutEffect(() => {
    if (!element) return;
    if (options?.observe) {
      observer.observe(element);
    } else {
      observer?.unobserve(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [element, observer, options?.observe]);
};
