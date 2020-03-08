import { toChineseChar } from './number';

describe('domain/utils/number', () => {
  describe('toChineseChar', () => {
    it('should retun text when value is 100', () => {
      const actual = toChineseChar(100);
      expect(actual).toEqual('百');
    });

    it('should retun text when value is 1', () => {
      const actual = toChineseChar(1);
      expect(actual).toEqual('一');
    });

    it('should retun text when value is 10', () => {
      const actual = toChineseChar(10);
      expect(actual).toEqual('十');
    });
  });
});
