import { useReactQuerySubscription } from '@src/hooks/useQuerySubsription';
import { renderHook } from '@testing-library/react';
import WS from 'jest-websocket-mock';

describe('useReactQuerySubscription()', () => {
  let ws: WS;
  let cb: jest.Func;
  beforeEach(() => {
    ws = new WS('ws://fullstack.exercise.applifting.cz');
    cb = jest.fn();
  });
  afterEach(() => {
    WS.clean();
  });

  it('should be defined', () => {
    expect(useReactQuerySubscription).toBeDefined();
  });

  it("shouldn't been called on load", async () => {
    renderHook(() => useReactQuerySubscription(cb));
    await ws.connected;
    expect(cb).not.toHaveBeenCalled();
  });
  it('should be called 1 time on message', async () => {
    renderHook(() => useReactQuerySubscription(cb));
    await ws.connected;
    await ws.send('REQUEST');
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
