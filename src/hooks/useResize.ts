import { RefObject, useEffect, useMemo, useState } from 'react';

type UseResize = (ref: RefObject<Element>) => {
  width: number | null;
  height: number | null;
};

export const useResize: UseResize = (ref) => {
  const [sizes, setSizes] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const observer = useMemo(
    () =>
      new ResizeObserver(() => {
        setSizes({
          width: ref.current?.clientWidth || null,
          height: ref.current?.clientHeight || null,
        });
      }),
    [ref],
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return { width: sizes.width, height: sizes.height };
};
