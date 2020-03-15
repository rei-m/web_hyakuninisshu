import { Kimariji } from './Kimariji';

describe('domain/models/Kimariji', () => {
  describe('values', () => {
    it('should return all Kimariji', () => {
      const actual = Kimariji.values;
      expect(actual).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('toJPNString', () => {
    it('should return text', () => {
      const actual = Kimariji.toJPNString(1);
      expect(actual).toEqual('一字決まり');
    });
  });
});
