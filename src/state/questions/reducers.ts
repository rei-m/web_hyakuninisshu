import * as types from './types';
import * as constants from './constants';

export const initialState: types.State = {
  state: 'waiting',
  totalCount: 0,
  currentPosition: 0,
  trainingCondition: {
    rangeFrom: 1,
    rangeTo: 100,
    kimariji: null,
    color: null,
    kamiNoKuStyle: 'kanji',
    shimoNoKuStyle: 'kana',
    questionAnim: 'normal',
  },
};

export const reducer = (state = initialState, action: types.Actions): types.State => {
  switch (action.type) {
    case constants.START_TRAINING_NAME:
      return {
        ...state,
        state: 'ready',
        totalCount: action.payload.totalCount,
        currentPosition: 1,
        currentQuestion: {
          questionId: action.payload.currentQuestionId,
        },
        trainingCondition: {
          ...action.meta,
        },
        result: undefined,
      };
    case constants.RESTART_TRAINING_NAME:
      return {
        ...state,
        state: 'ready',
        totalCount: action.payload.totalCount,
        currentPosition: 1,
        currentQuestion: {
          questionId: action.payload.currentQuestionId,
        },
        result: undefined,
      };
    case constants.START_EXAM_NAME:
      return {
        ...state,
        state: 'ready',
        totalCount: action.payload.totalCount,
        currentPosition: 1,
        currentQuestion: {
          questionId: action.payload.currentQuestionId,
        },
        result: undefined,
      };
    case constants.START_QUESTION_NAME:
      return {
        ...state,
        state: 'playing',
        currentQuestion: {
          questionId: action.payload.questionId,
          content: action.payload.content,
        },
      };
    case constants.RESET_QUESTION_NAME:
      return {
        ...state,
        state: 'waiting',
        totalCount: 0,
        currentPosition: 0,
        currentQuestion: undefined,
        result: undefined,
      };
    case constants.FINISH_QUESTION_NAME:
      return {
        ...state,
        state: 'finished',
        result: {
          correctCount: action.payload.correctCount,
          averageAnswerSecond: action.payload.averageAnswerSecond,
          answerList: action.payload.answerList,
        },
      };
    case constants.ANSWER_QUESTION_NAME:
      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion!,
          answer: {
            isCorrect: action.payload.isCorrect,
            selectedKarutaNo: action.payload.selectedKarutaNo,
            correctKaruta: action.payload.correctKaruta,
          },
        },
      };
    case constants.CONFIRM_CORRECT_NAME:
      return {
        ...state,
        state: 'confirm',
      };
    case constants.OPEN_NEXT_QUESTION_NAME:
      return {
        ...state,
        state: 'ready',
        currentPosition: state.currentPosition + 1,
        currentQuestion: {
          questionId: action.payload.currentQuestionId,
        },
      };
    default:
      return state;
  }
};
