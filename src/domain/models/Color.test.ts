import { Color } from './Color';

describe('domain/models/Color', () => {
  describe('factory', () => {
    it('should create Color', () => {
      const actual = Color.create('blue');
      expect(actual).toEqual('blue');
    });

    it('should throw error when invalid arg', () => {
      expect(() => {
        Color.create('hoge');
      }).toThrow();
    });
  });

  describe('values', () => {
    it('should return all color', () => {
      const actual = Color.values;
      expect(actual).toEqual(['blue', 'pink', 'yellow', 'green', 'orange']);
    });
  });

  describe('toJPNString', () => {
    it('should return text when blue', () => {
      const actual = Color.toJPNString('blue');
      expect(actual).toEqual('青色');
    });
    it('should return text when pink', () => {
      const actual = Color.toJPNString('pink');
      expect(actual).toEqual('桃色');
    });
    it('should return text when yellow', () => {
      const actual = Color.toJPNString('yellow');
      expect(actual).toEqual('黄色');
    });
    it('should return text when green', () => {
      const actual = Color.toJPNString('green');
      expect(actual).toEqual('緑色');
    });
    it('should return text when orange', () => {
      const actual = Color.toJPNString('orange');
      expect(actual).toEqual('橙色');
    });
  });
});
