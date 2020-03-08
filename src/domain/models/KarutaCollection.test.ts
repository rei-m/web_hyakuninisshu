import { KarutaCollection } from './KarutaCollection';
import { MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';

describe('domain/models/KarutaCollection', () => {
  describe('select', () => {
    it('should return filtered list', () => {
      const actual = KarutaCollection.select(MOCK_ALL_KARUTA_LIST, {
        range: { from: 1, to: 10 },
        kimarijiList: [1],
        colorList: ['blue'],
      });
      expect(actual).toEqual([
        MOCK_ALL_KARUTA_LIST[0],
        MOCK_ALL_KARUTA_LIST[6],
        MOCK_ALL_KARUTA_LIST[7],
        MOCK_ALL_KARUTA_LIST[8],
        MOCK_ALL_KARUTA_LIST[9],
      ]);
    });

    it('should throw error when karuta list is not all', () => {
      expect(() => {
        KarutaCollection.select(MOCK_ALL_KARUTA_LIST.slice(0, 10), {
          range: { from: 1, to: 10 },
          kimarijiList: [1],
          colorList: ['blue'],
        });
      }).toThrow();
    });

    it('should throw error when range is invalid', () => {
      expect(() => {
        KarutaCollection.select(MOCK_ALL_KARUTA_LIST, {
          range: { from: 10, to: 1 },
          kimarijiList: [1],
          colorList: ['blue'],
        });
      }).toThrow();
    });
  });
});
