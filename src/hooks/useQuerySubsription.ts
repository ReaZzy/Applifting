import { useLayoutEffect, useMemo, useRef } from 'react';

export const useReactQuerySubscription = <T = unknown>(
  callback: (e: MessageEvent<T>) => void,
) => {
  const wsCallback = useRef<(e: MessageEvent<T>) => void>(() => {});

  const websocket = useMemo(() => {
    return new WebSocket(
      process.env.WS_API_HOST ?? 'ws://fullstack.exercise.applifting.cz',
    );
  }, []);

  useLayoutEffect(() => {
    if (typeof callback === 'function') {
      wsCallback.current = callback;
    }
  }, [callback]);

  useLayoutEffect(() => {
    websocket.onmessage = wsCallback.current;

    return () => {
      websocket?.close();
    };
  }, [websocket]);
};
