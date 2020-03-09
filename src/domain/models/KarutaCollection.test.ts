import { KarutaCollection } from './KarutaCollection';
import { MOCK_KARUTA_COLLECTION } from '@helper/mocks/domain/karutas';

describe('domain/models/KarutaCollection', () => {
  describe('select', () => {
    it('should return filtered list', () => {
      const actual = KarutaCollection.select(MOCK_KARUTA_COLLECTION, {
        range: { from: 1, to: 10 },
        kimarijiList: [1],
        colorList: ['blue'],
      });
      expect(actual).toEqual([
        MOCK_KARUTA_COLLECTION.karutaList[0],
        MOCK_KARUTA_COLLECTION.karutaList[6],
        MOCK_KARUTA_COLLECTION.karutaList[7],
        MOCK_KARUTA_COLLECTION.karutaList[8],
        MOCK_KARUTA_COLLECTION.karutaList[9],
      ]);
    });

    it('should throw error when range is invalid', () => {
      expect(() => {
        KarutaCollection.select(MOCK_KARUTA_COLLECTION, {
          range: { from: 10, to: 1 },
          kimarijiList: [1],
          colorList: ['blue'],
        });
      }).toThrow();
    });
  });
});
