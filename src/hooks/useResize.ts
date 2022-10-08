import { RefObject, useEffect, useMemo, useState } from 'react';

type UseResize = (ref: RefObject<Element>) => {
  width?: number;
  height?: number;
};

export const useResize: UseResize = (ref) => {
  const [sizes, setSizes] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  const observer = useMemo(
    () =>
      new ResizeObserver(() => {
        setSizes({
          width: ref.current?.clientWidth,
          height: ref.current?.clientHeight,
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
