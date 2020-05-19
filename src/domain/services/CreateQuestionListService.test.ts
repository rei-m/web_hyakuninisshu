import { CreateQuestionListService } from './CreateQuestionListService';
import { MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3, MOCK_KARUTA_COLLECTION } from '@helper/mocks/domain/karutas';

describe('domain/services/CreateQuestionListService', () => {
  it('should create questionList', () => {
    const service = new CreateQuestionListService();
    const actual = service.execute(MOCK_KARUTA_COLLECTION, [MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3]);
    const correctKarutaNoList = actual.map((q) => q.correctAnswerKarutaNo);

    expect(actual.length).toEqual(3);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_1.no);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_2.no);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_3.no);
  });

  it('should throw error when targetKarutaList is empty', () => {
    const service = new CreateQuestionListService();
    expect(() => {
      service.execute(MOCK_KARUTA_COLLECTION, []);
    }).toThrow();
  });
});
