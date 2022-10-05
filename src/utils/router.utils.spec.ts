import { getPathFromRoot } from '@src/utils/router.utils';

describe('Router utils', () => {
  describe('getPathFromRoot', () => {
    it('should be defined', () => {
      expect(getPathFromRoot).toBeDefined();
    });
    it("should return '123123'", () => {
      expect(getPathFromRoot('123', '123')).toEqual('123123');
    });
    it("should return ''", () => {
      expect(getPathFromRoot('', '')).toEqual('');
    });
  });
});
