import {
  ANSWER_QUESTION_NAME,
  CONFIRM_CORRECT_NAME,
  FINISH_QUESTIONS_NAME,
  OPEN_NEXT_QUESTION_NAME,
  QuestionsActions,
  RESTART_QUESTIONS_NAME,
  START_EXAM_NAME,
  START_TRAINING_NAME,
} from '@src/actions/questions';
import { Answer, Karuta, Question } from '@src/types';
import {
  ColorCondition,
  KarutaStyleCondition,
  KimarijiCondition,
  QuestionState,
  RangeFromCondition,
  RangeToCondition,
} from '@src/enums';

export interface QuestionsState {
  readonly karutas: Karuta[];
  readonly currentIndex: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly lastStartedTime?: number;
  readonly trainingCondition: {
    readonly rangeFrom: RangeFromCondition;
    readonly rangeTo: RangeToCondition;
    readonly kimariji: KimarijiCondition;
    readonly color: ColorCondition;
    readonly kamiNoKuStyle: KarutaStyleCondition;
    readonly shimoNoKuStyle: KarutaStyleCondition;
  };
  readonly questionState?: QuestionState;
}

export const initialState: QuestionsState = {
  karutas: [],
  answers: [],
  currentIndex: 0,
  questions: [],
  trainingCondition: {
    color: ColorCondition.None,
    kamiNoKuStyle: KarutaStyleCondition.KanjiAndKana,
    kimariji: KimarijiCondition.None,
    rangeFrom: RangeFromCondition.One,
    rangeTo: RangeToCondition.OneHundred,
    shimoNoKuStyle: KarutaStyleCondition.KanaOnly,
  },
};

export const questions = (state = initialState, action: QuestionsActions): QuestionsState => {
  switch (action.type) {
    case START_TRAINING_NAME:
      return {
        karutas: action.payload.karutas,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
        trainingCondition: {
          ...action.meta,
        },
      };
    case START_EXAM_NAME:
      return {
        ...state,
        karutas: action.payload.karutas,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
      };
    case RESTART_QUESTIONS_NAME:
      return {
        ...state,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions,
      };
    case ANSWER_QUESTION_NAME:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer],
        questionState: action.payload.nextState,
      };
    case CONFIRM_CORRECT_NAME:
      return {
        ...state,
        questionState: action.payload.nextState,
      };
    case OPEN_NEXT_QUESTION_NAME:
      return {
        ...state,
        currentIndex: action.payload.nextIndex,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
      };
    case FINISH_QUESTIONS_NAME:
      return {
        ...state,
        questionState: action.payload.nextState,
      };
    default:
      return state;
  }
};
