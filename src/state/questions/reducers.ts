import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionAnimCondition,
  RangeFromCondition,
  RangeToCondition,
  QuestionState,
} from '@src/enums';
import * as types from './types';
import * as constants from './constants';

export const initialState: types.State = {
  karutas: [],
  answers: [],
  currentIndex: 0,
  questions: [],
  dulation: 0,
  trainingCondition: {
    color: ColorCondition.None,
    kamiNoKuStyle: KarutaStyleCondition.KanjiAndKana,
    kimariji: KimarijiCondition.None,
    rangeFrom: RangeFromCondition.One,
    rangeTo: RangeToCondition.OneHundred,
    shimoNoKuStyle: KarutaStyleCondition.KanaOnly,
    questionAnim: QuestionAnimCondition.Normal,
  },
};

export const reducer = (state = initialState, action: types.Actions): types.State => {
  switch (action.type) {
    case constants.START_TRAINING_NAME:
      return {
        karutas: action.payload.karutas,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
        dulation: action.payload.dulation,
        trainingCondition: {
          ...action.meta,
        },
      };
    case constants.START_EXAM_NAME:
      return {
        ...state,
        karutas: action.payload.karutas,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
      };
    case constants.RESTART_QUESTIONS_NAME:
      return {
        ...state,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
      };
    case constants.ANSWER_QUESTION_NAME:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer],
        questionState: action.payload.nextState,
      };
    case constants.CONFIRM_CORRECT_NAME:
      return {
        ...state,
        questionState: action.payload.nextState,
      };
    case constants.OPEN_NEXT_QUESTION_NAME:
      return {
        ...state,
        currentIndex: action.payload.nextIndex,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
      };
    case constants.FINISH_QUESTION_NAME:
      return {
        ...state,
        questionState: QuestionState.Finished,
      };
    default:
      return state;
  }
};
