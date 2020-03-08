import { InitializeQuestionListService } from './InitializeQuestionListService';
import { KarutaRepository, QuestionRepository } from '../repositories';
import { MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3, MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';
import { MockMethods } from '@helper/jest';

describe('domain/services/InitializeQuestionListService', () => {
  let karutaRepository: KarutaRepository;
  let karutaRepositoryMethods: MockMethods<KarutaRepository>;
  let questionRepository: QuestionRepository;
  let questionRepositoryMethods: MockMethods<QuestionRepository>;

  beforeEach(() => {
    karutaRepositoryMethods = {
      findAll: jest.fn(),
      findByNo: jest.fn(),
      findByNoList: jest.fn(),
    };
    questionRepositoryMethods = {
      initialize: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findNextById: jest.fn(),
      update: jest.fn(),
    };
    karutaRepository = {} as KarutaRepository;
    questionRepository = {} as QuestionRepository;
  });

  it('initialize questionList', () => {
    karutaRepositoryMethods.findAll.mockReturnValue(MOCK_ALL_KARUTA_LIST);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const service = new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository);
    const actual = service.execute([MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3]);
    const correctKarutaNoList = actual.map(q => q.correctAnswerKarutaNo);

    expect(actual.length).toEqual(3);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_1.no);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_2.no);
    expect(correctKarutaNoList).toContain(MOCK_KARUTA_3.no);

    expect(mockQuestionRepository.initialize).toHaveBeenCalled();
  });

  it('should throw error when targetKarutaList is empty', () => {
    const service = new InitializeQuestionListService(karutaRepository, questionRepository);
    expect(() => {
      service.execute([]);
    }).toThrow();
  });
});
