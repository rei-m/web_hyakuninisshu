import { questionsReducer, questionsTypes } from '@src/state/questions';
import { initialState } from '@src/state/questions/reducers';
import * as constants from '@src/state/questions/constants';
import {
  MOCK_YOMIFUDA_1,
  MOCK_TORIFUDA_1,
  MOCK_TORIFUDA_2,
  MOCK_TORIFUDA_3,
  MOCK_TORIFUDA_4,
} from '@helper/mocks/state/questions';
import { MOCK_KARUTA_1, MOCK_KARUTA_2 } from '@helper/mocks/domain/karutas';
import { MOCK_QUESTION_1_ANSWERED_CORRECT, MOCK_QUESTION_2_ANSWERED_WRONG } from '@helper/mocks/domain/questions';

describe('state/questions/reducers/reducer', () => {
  it('should return next state when StartTrainingAction received', () => {
    const action: questionsTypes.StartTrainingAction = {
      type: constants.START_TRAINING_NAME,
      payload: {
        currentQuestionId: 1,
        totalCount: 100,
      },
      meta: {
        color: 'blue',
        kamiNoKuStyle: 'kana',
        kimariji: 1,
        rangeFrom: 51,
        rangeTo: 60,
        shimoNoKuStyle: 'kanji',
        questionAnim: 'fast',
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState: questionsTypes.State = {
      state: 'ready',
      totalCount: 100,
      currentPosition: 1,
      currentQuestion: {
        questionId: 1,
      },
      trainingCondition: {
        color: 'blue',
        kamiNoKuStyle: 'kana',
        kimariji: 1,
        rangeFrom: 51,
        rangeTo: 60,
        shimoNoKuStyle: 'kanji',
        questionAnim: 'fast',
      },
      result: undefined,
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when RestartTrainingAction received', () => {
    const action: questionsTypes.RestartTrainingAction = {
      type: constants.RESTART_TRAINING_NAME,
      payload: {
        currentQuestionId: 1,
        totalCount: 100,
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState: questionsTypes.State = {
      ...initialState,
      state: 'ready',
      totalCount: 100,
      currentPosition: 1,
      currentQuestion: {
        questionId: 1,
      },
      result: undefined,
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when StartExamAction received', () => {
    const action: questionsTypes.StartExamAction = {
      type: constants.START_EXAM_NAME,
      payload: {
        currentQuestionId: 1,
        totalCount: 100,
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState: questionsTypes.State = {
      ...initialState,
      state: 'ready',
      totalCount: 100,
      currentPosition: 1,
      currentQuestion: {
        questionId: 1,
      },
      result: undefined,
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when StartQuestionAction received', () => {
    const action: questionsTypes.StartQuestionAction = {
      type: constants.START_QUESTION_NAME,
      payload: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
      },
    };
    const actualState = questionsReducer(initialState, action);
    const expectedState: questionsTypes.State = {
      ...initialState,
      state: 'playing',
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
      },
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when AnswerQuestionAction received', () => {
    const action: questionsTypes.AnswerQuestionAction = {
      type: constants.ANSWER_QUESTION_NAME,
      payload: {
        isCorrect: true,
        selectedKarutaNo: 1,
        correctKaruta: MOCK_KARUTA_1,
      },
    };
    const playingState: questionsTypes.State = {
      ...initialState,
      state: 'playing',
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
      },
    };
    const actualState = questionsReducer(playingState, action);
    const expectedState: questionsTypes.State = {
      ...playingState,
      currentQuestion: {
        ...playingState.currentQuestion!,
        answer: {
          isCorrect: true,
          selectedKarutaNo: 1,
          correctKaruta: MOCK_KARUTA_1,
        },
      },
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when ConfirmCorrectAction received', () => {
    const action: questionsTypes.ConfirmCorrectAction = {
      type: constants.CONFIRM_CORRECT_NAME,
    };
    const answeredState: questionsTypes.State = {
      ...initialState,
      state: 'playing',
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
        answer: {
          isCorrect: true,
          selectedKarutaNo: 1,
          correctKaruta: MOCK_KARUTA_1,
        },
      },
    };
    const actualState = questionsReducer(answeredState, action);
    const expectedState: questionsTypes.State = {
      ...answeredState,
      state: 'confirm',
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when OpenNextQuestionAction received', () => {
    const action: questionsTypes.OpenNextQuestionAction = {
      type: constants.OPEN_NEXT_QUESTION_NAME,
      payload: {
        currentQuestionId: 2,
      },
    };
    const confirmedState: questionsTypes.State = {
      ...initialState,
      state: 'confirm',
      currentPosition: 1,
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
        answer: {
          isCorrect: true,
          selectedKarutaNo: 1,
          correctKaruta: MOCK_KARUTA_1,
        },
      },
    };
    const actualState = questionsReducer(confirmedState, action);
    const expectedState: questionsTypes.State = {
      ...confirmedState,
      state: 'ready',
      currentPosition: 2,
      currentQuestion: {
        questionId: 2,
      },
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when ResetQuestionAction received', () => {
    const action: questionsTypes.ResetQuestionAction = {
      type: constants.RESET_QUESTION_NAME,
    };
    const answeredState: questionsTypes.State = {
      ...initialState,
      state: 'playing',
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
        answer: {
          isCorrect: true,
          selectedKarutaNo: 1,
          correctKaruta: MOCK_KARUTA_1,
        },
      },
    };
    const actualState = questionsReducer(answeredState, action);
    const expectedState: questionsTypes.State = {
      ...answeredState,
      state: 'waiting',
      currentQuestion: undefined,
    };
    expect(actualState).toEqual(expectedState);
  });

  it('should return next state when FinishQuestionAction received', () => {
    const action: questionsTypes.FinishQuestionAction = {
      type: constants.FINISH_QUESTION_NAME,
      payload: {
        correctCount: 1,
        averageAnswerSecond: 1.5,
        answerList: [
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
        ],
      },
    };
    const answeredState: questionsTypes.State = {
      ...initialState,
      state: 'playing',
      currentQuestion: {
        questionId: 1,
        content: {
          yomiFuda: MOCK_YOMIFUDA_1,
          toriFudaList: [MOCK_TORIFUDA_1, MOCK_TORIFUDA_2, MOCK_TORIFUDA_3, MOCK_TORIFUDA_4],
        },
        answer: {
          isCorrect: true,
          selectedKarutaNo: 1,
          correctKaruta: MOCK_KARUTA_1,
        },
      },
    };
    const actualState = questionsReducer(answeredState, action);
    const expectedState: questionsTypes.State = {
      ...answeredState,
      state: 'finished',
      result: {
        correctCount: 1,
        averageAnswerSecond: 1.5,
        answerList: [
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
        ],
      },
    };
    expect(actualState).toEqual(expectedState);
  });
});
