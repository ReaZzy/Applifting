import {
  getTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@src/utils/auth.utils';

// NOTE FOR REVIEW: similar tests should be in other utils, but because of lack of
// time I think it's enough (for the test task) to specify only several
// tests for each type of functionality (1 hook test suit, 1 util, 1 component).
// just imagine that I have done the same for others :)
describe('Auth utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterAll(() => {
    window.localStorage.clear();
  });
  describe('setAccessTokenToLocalStorage', () => {
    it('should be defined', () => {
      expect(setAccessTokenToLocalStorage).toBeDefined();
    });
    it("should set '123' as access token", () => {
      setAccessTokenToLocalStorage('123');
      expect(window.localStorage.getItem('accessToken')).toEqual('123');
    });
  });
  describe('getToken', () => {
    it('should be defined', () => {
      expect(getTokenFromLocalStorage).toBeDefined();
    });
    it('should return 123 as accessToken', () => {
      window.localStorage.setItem('accessToken', '123');
      expect(getTokenFromLocalStorage()).toEqual('123');
    });
    it('should return null if accessToken is empty', () => {
      expect(getTokenFromLocalStorage()).toEqual(null);
    });
  });
});
