import {
  ANSWER_QUESTION_NAME,
  GO_TO_CORRECT_NAME,
  GO_TO_NEXT_QUESTION_NAME,
  GO_TO_RESULT_NAME,
  QuestionsActions,
  RESTART_NAME,
  START_EXAM_NAME,
  START_TRAINING_NAME
} from '../actions/questions';
import {
  COLOR_LIST,
  KIMARIJI_LIST,
  RANGE_FROM,
  RANGE_TO,
  STYLE_LIST
} from '../constants/trainings';
import { Answer, Question } from '../types';

export interface QuestionsState {
  readonly currentIndex: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly currentPage: number;
  readonly lastStartedTime?: number;
  readonly finished: boolean;
  readonly trainingCondition: {
    readonly rangeFrom: number;
    readonly rangeTo: number;
    readonly kimariji: number;
    readonly color: string;
    readonly kamiNoKuStyle: number;
    readonly shimoNoKuStyle: number;
  };
}

const initialState: QuestionsState = {
  answers: [],
  currentIndex: 0,
  currentPage: 0,
  finished: false,
  questions: [],
  trainingCondition: {
    color: COLOR_LIST[0].value,
    kamiNoKuStyle: STYLE_LIST[0].value,
    kimariji: KIMARIJI_LIST[0].value,
    rangeFrom: RANGE_FROM[0].value,
    rangeTo: RANGE_TO[9].value,
    shimoNoKuStyle: STYLE_LIST[1].value
  }
};

const trainingsReducer = (
  state = initialState,
  action: QuestionsActions
): QuestionsState => {
  switch (action.type) {
    case START_TRAINING_NAME:
      return {
        answers: [],
        currentIndex: 0,
        currentPage: 0,
        finished: false,
        lastStartedTime: action.payload.startedTime,
        questions: action.payload.questions,
        trainingCondition: {
          ...action.meta
        }
      };
    case START_EXAM_NAME:
      return {
        ...state,
        answers: [],
        currentIndex: 0,
        currentPage: 0,
        finished: false,
        lastStartedTime: action.payload.startedTime,
        questions: action.payload.questions
      };
    case RESTART_NAME:
      return {
        ...state,
        answers: [],
        currentIndex: 0,
        currentPage: 0,
        finished: false,
        lastStartedTime: action.payload.startedTime,
        questions: action.payload.questions
      };
    case ANSWER_QUESTION_NAME:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer]
      };
    case GO_TO_CORRECT_NAME:
      return {
        ...state,
        currentPage: action.payload.nextPage
      };
    case GO_TO_NEXT_QUESTION_NAME:
      return {
        ...state,
        currentIndex: action.payload.nextIndex,
        currentPage: action.payload.nextPage,
        lastStartedTime: action.payload.startedTime
      };
    case GO_TO_RESULT_NAME:
      return {
        ...state,
        finished: true
      };
    default:
      return state;
  }
};

export default trainingsReducer;
