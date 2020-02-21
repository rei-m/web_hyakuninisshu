import { ActionCreatorImpl } from './actions';
import { QuestionListService } from '@src/domain/services';
import { KarutaRepository, QuestionRepository } from '@src/domain/repositories';
import { MOCK_ALL_KARUTA_LIST } from '@helper/mocks/domain/karutas';

describe('QuestionsActionCreator', () => {
  let karutaRepository: KarutaRepository;
  let karutaRepositoryMethods: {
    findAll: jest.Mock;
    findByNoList: jest.Mock;
  };
  let questionRepository: QuestionRepository;
  let questionRepositoryMethods: {
    initialize: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
  };

  beforeEach(() => {
    karutaRepositoryMethods = {
      findAll: jest.fn(),
      findByNoList: jest.fn(),
    };
    questionRepositoryMethods = {
      initialize: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };
    karutaRepository = {} as KarutaRepository;
    questionRepository = {} as QuestionRepository;
  });

  it('should create StartTrainingAction', () => {
    karutaRepositoryMethods.findAll.mockReturnValue(MOCK_ALL_KARUTA_LIST);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new QuestionListService(mockKarutaRepository, mockQuestionRepository)
    );
    const actual = actionCreator.startTraining(1, 10, 1, 'blue', 'kana', 'kanji', 'normal');

    const { type, payload, meta } = actual;

    expect(type).toEqual('START_TRAINING_NAME');
    expect(payload.currentQuestionId).not.toBeUndefined();
    expect(payload.totalCount).toEqual(10);
    expect(meta.rangeFrom).toEqual(1);
    expect(meta.rangeTo).toEqual(10);
    expect(meta.kimariji).toEqual(1);
    expect(meta.color).toEqual('blue');
    expect(meta.kamiNoKuStyle).toEqual('kana');
    expect(meta.shimoNoKuStyle).toEqual('kanji');
    expect(meta.questionAnim).toEqual('normal');

    expect(mockQuestionRepository.initialize).toHaveBeenCalled();
  });
});
