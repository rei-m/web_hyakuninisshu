import { Kimariji } from './Kimariji';

describe('domain/models/Kimariji', () => {
  describe('factory', () => {
    it('should create Kimariji', () => {
      const actual = Kimariji.create(1);
      expect(actual).toEqual(1);
    });

    it('should throw error when invalid arg', () => {
      expect(() => {
        Kimariji.create(7);
      }).toThrow();
    });
  });

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
