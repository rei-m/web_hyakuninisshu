import { KarutaImageNo } from './KarutaImageNo';

describe('domain/models/KarutaImageNo', () => {
  describe('factory', () => {
    it('should create KarutaImageNo', () => {
      const actual = KarutaImageNo.create('001');
      expect(actual).toEqual('001');
    });

    it('should throw error when invalid arg', () => {
      expect(() => {
        KarutaImageNo.create('1');
      }).toThrow();
    });
  });
});
