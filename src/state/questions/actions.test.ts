import { ActionCreatorImpl } from './actions';
import { InitializeQuestionListService } from '@src/domain/services';
import { KarutaRepository, QuestionRepository } from '@src/domain/repositories';
import {
  MOCK_ALL_KARUTA_LIST,
  MOCK_KARUTA_1,
  MOCK_KARUTA_2,
  MOCK_KARUTA_3,
  MOCK_KARUTA_4,
} from '@helper/mocks/domain/karutas';
import { MockMethods } from '@helper/jest';
import {
  MOCK_QUESTION_1,
  MOCK_QUESTION_1_STARTED,
  MOCK_QUESTION_1_ANSWERED_CORRECT,
  MOCK_QUESTION_2,
  MOCK_QUESTION_2_ANSWERED_WRONG,
} from '@helper/mocks/domain/questions';
import { MOCK_TORIFUDA_1 } from '@helper/mocks/state/questions';

describe('QuestionsActionCreator', () => {
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

  it('should create StartTrainingAction', () => {
    karutaRepositoryMethods.findAll.mockReturnValue(MOCK_ALL_KARUTA_LIST);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
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

  it('should create RestartTrainingAction', () => {
    karutaRepositoryMethods.findAll.mockReturnValue(MOCK_ALL_KARUTA_LIST);
    karutaRepositoryMethods.findByNoList.mockReturnValue([MOCK_KARUTA_1]);
    questionRepositoryMethods.findAll.mockReturnValue([
      MOCK_QUESTION_1_ANSWERED_CORRECT,
      MOCK_QUESTION_2_ANSWERED_WRONG,
    ]);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
    );
    const actual = actionCreator.restartTraining();

    const { type, payload } = actual;

    expect(type).toEqual('RESTART_TRAINING_NAME');
    expect(payload.currentQuestionId).not.toBeUndefined();
    expect(payload.totalCount).toEqual(1);

    expect(mockKarutaRepository.findByNoList).toHaveBeenCalledWith([
      MOCK_QUESTION_2_ANSWERED_WRONG.correctAnswerKarutaNo,
    ]);
    expect(mockQuestionRepository.initialize).toHaveBeenCalled();
  });

  it('should create StartExamAction', () => {
    karutaRepositoryMethods.findAll.mockReturnValue(MOCK_ALL_KARUTA_LIST);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
    );
    const actual = actionCreator.startExam();

    const { type, payload } = actual;

    expect(type).toEqual('START_EXAM_NAME');
    expect(payload.currentQuestionId).not.toBeUndefined();
    expect(payload.totalCount).toEqual(100);

    expect(mockQuestionRepository.initialize).toHaveBeenCalled();
  });

  it('should create StartQuestionAction', () => {
    karutaRepositoryMethods.findByNoList.mockReturnValue([MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3, MOCK_KARUTA_4]);
    questionRepositoryMethods.findById.mockReturnValue(MOCK_QUESTION_1);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
    );
    const startDate = new Date();
    const actual = actionCreator.startQuestion(MOCK_QUESTION_1.id, 'kanji', 'kana', startDate);

    const { type, payload } = actual;

    expect(type).toEqual('START_QUESTION_NAME');
    expect(payload.questionId).toEqual(MOCK_QUESTION_1.id);
    expect(payload.content.yomiFuda).toEqual({
      karutaNo: MOCK_KARUTA_1.no,
      shoku: MOCK_KARUTA_1.shoku.kanji,
      niku: MOCK_KARUTA_1.niku.kanji,
      sanku: MOCK_KARUTA_1.sanku.kanji,
    });
    expect(payload.content.toriFudaList).toEqual([
      {
        karutaNo: MOCK_KARUTA_1.no,
        shiku: MOCK_KARUTA_1.shiku.kana,
        kekku: MOCK_KARUTA_1.kekku.kana,
      },
      {
        karutaNo: MOCK_KARUTA_2.no,
        shiku: MOCK_KARUTA_2.shiku.kana,
        kekku: MOCK_KARUTA_2.kekku.kana,
      },
      {
        karutaNo: MOCK_KARUTA_3.no,
        shiku: MOCK_KARUTA_3.shiku.kana,
        kekku: MOCK_KARUTA_3.kekku.kana,
      },
      {
        karutaNo: MOCK_KARUTA_4.no,
        shiku: MOCK_KARUTA_4.shiku.kana,
        kekku: MOCK_KARUTA_4.kekku.kana,
      },
    ]);

    expect(mockKarutaRepository.findByNoList).toHaveBeenCalledWith(MOCK_QUESTION_1.choiceKarutaNoList);
    expect(mockQuestionRepository.update).toHaveBeenCalled();
  });

  it('should create AnswerQuestionAction', () => {
    karutaRepositoryMethods.findByNo.mockReturnValue(MOCK_KARUTA_1);
    questionRepositoryMethods.findById.mockReturnValue(MOCK_QUESTION_1_STARTED);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
    );
    const answerDate = new Date();
    const actual = actionCreator.answerQuestion(MOCK_QUESTION_1_STARTED.id, MOCK_TORIFUDA_1, answerDate);

    const { type, payload } = actual;

    expect(type).toEqual('ANSWER_QUESTION_NAME');
    expect(payload.isCorrect).toBeTruthy();
    expect(payload.selectedKarutaNo).toEqual(MOCK_TORIFUDA_1.karutaNo);
    expect(payload.correctKaruta).toEqual(MOCK_KARUTA_1);

    expect(mockKarutaRepository.findByNo).toHaveBeenCalledWith(MOCK_QUESTION_1_STARTED.correctAnswerKarutaNo);
    expect(mockQuestionRepository.update).toHaveBeenCalled();
  });

  it('should create ConfirmCorrectAction', () => {
    const actionCreator = new ActionCreatorImpl(
      karutaRepository,
      questionRepository,
      new InitializeQuestionListService(karutaRepository, questionRepository)
    );
    const actual = actionCreator.confirmCorrect();

    const { type } = actual;

    expect(type).toEqual('CONFIRM_CORRECT_NAME');
  });

  it('should create OpenNextQuestionAction', () => {
    questionRepositoryMethods.findNextById.mockReturnValue(MOCK_QUESTION_2);
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      karutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(karutaRepository, mockQuestionRepository)
    );
    const actual = actionCreator.openNextQuestionAction(MOCK_QUESTION_1.id);

    const { type, payload } = actual;

    expect(type).toEqual('OPEN_NEXT_QUESTION_NAME');
    expect(payload.currentQuestionId).toEqual(MOCK_QUESTION_2.id);
    expect(mockQuestionRepository.findNextById).toHaveBeenCalledWith(MOCK_QUESTION_1.id);
  });

  it('should create ResetQuestionAction', () => {
    const actionCreator = new ActionCreatorImpl(
      karutaRepository,
      questionRepository,
      new InitializeQuestionListService(karutaRepository, questionRepository)
    );
    const actual = actionCreator.resetQuestion();

    const { type } = actual;

    expect(type).toEqual('RESET_QUESTION_NAME');
  });

  it('should create FinishQuestionAction', () => {
    karutaRepositoryMethods.findAll.mockReturnValue([MOCK_KARUTA_1, MOCK_KARUTA_2, MOCK_KARUTA_3, MOCK_KARUTA_4]);
    questionRepositoryMethods.findAll.mockReturnValue([
      MOCK_QUESTION_1_ANSWERED_CORRECT,
      MOCK_QUESTION_2_ANSWERED_WRONG,
    ]);
    const mockKarutaRepository = { ...karutaRepository, ...karutaRepositoryMethods };
    const mockQuestionRepository = { ...questionRepository, ...questionRepositoryMethods };
    const actionCreator = new ActionCreatorImpl(
      mockKarutaRepository,
      mockQuestionRepository,
      new InitializeQuestionListService(mockKarutaRepository, mockQuestionRepository)
    );

    const actual = actionCreator.finishQuestion();

    const { type, payload } = actual;

    expect(type).toEqual('FINISH_QUESTION_NAME');
    expect(payload.correctCount).toEqual(1);
    expect(payload.averageAnswerSecond).toEqual(1.5);
    expect(payload.answerList).toEqual([
      {
        questionId: MOCK_QUESTION_1_ANSWERED_CORRECT.id,
        isCorrect: true,
        correctKaruta: MOCK_KARUTA_1,
      },
      {
        questionId: MOCK_QUESTION_2_ANSWERED_WRONG.id,
        isCorrect: false,
        correctKaruta: MOCK_KARUTA_2,
      },
    ]);
  });
});
