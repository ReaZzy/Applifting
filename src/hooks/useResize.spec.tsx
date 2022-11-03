import { RefObject } from 'react';
import { useResize } from '@src/hooks/useResize';
import { renderHook } from '@testing-library/react';

describe('useResize()', () => {
  it('should be defined', () => {
    expect(useResize).toBeDefined();
  });
  it('default values should be {width: undefined, height: undefined}', () => {
    const ref = {
      current: {
        clientWidth: 10,
        clientHeight: 10,
      },
    } as RefObject<Element>;
    const { result } = renderHook(() => useResize(ref));
    expect(result.current).toEqual({ width: null, height: null });
  });

  // NOTE FOR REVIEW:
  // Can't fine a proper way how to mock ResizeObserver/IntersectionObserver
  // which will run callbacks.
  // However, further tests should be like:
  // width should be 20 on resize
  // height should be 20 on resize
});
