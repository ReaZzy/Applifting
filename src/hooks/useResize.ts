import { useEffect, useRef } from 'react';

type UseResize = (onResize: () => void) => void;

export const useResize: UseResize = (onResize) => {
  const resize = useRef(() => {});
  useEffect(() => {
    resize.current = onResize;
  }, [onResize]);

  useEffect(() => {
    window.addEventListener('resize', resize.current);
    return () => {
      window.removeEventListener('resize', resize.current);
    };
  }, []);
};
