import { KarutaNo } from './KarutaNo';

describe('domain/models/KarutaNo', () => {
  describe('factory', () => {
    it('should create KarutaNo', () => {
      const actual = KarutaNo.create(1);
      expect(actual).toEqual(1);
    });

    it('should throw error when under min value', () => {
      expect(() => {
        KarutaNo.create(0);
      }).toThrow();
    });

    it('should throw error when over max value', () => {
      expect(() => {
        KarutaNo.create(101);
      }).toThrow();
    });
  });

  describe('toJPNString', () => {
    it('should return text', () => {
      const actual = KarutaNo.toJPNString(1);
      expect(actual).toEqual('一番');
    });
  });
});
