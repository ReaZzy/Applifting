import { getToken, setAccessToken } from '@src/utils/auth.utils';

describe('Auth utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterAll(() => {
    window.localStorage.clear();
  });
  describe('setAccessToken', () => {
    it('should be defined', () => {
      expect(setAccessToken).toBeDefined();
    });
    it("should set '123' as access token", () => {
      setAccessToken('123');
      expect(window.localStorage.getItem('accessToken')).toEqual('123');
    });
  });
  describe('getToken', () => {
    it('should be defined', () => {
      expect(getToken).toBeDefined();
    });
    it('should return 123 as accessToken', () => {
      window.localStorage.setItem('accessToken', '123');
      expect(getToken()).toEqual('123');
    });
    it('should return null if accessToken is empty', () => {
      expect(getToken()).toEqual(null);
    });
  });
});
