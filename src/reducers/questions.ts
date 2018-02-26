import {
  ANSWER_QUESTION_NAME,
  CONFIRM_CORRECT_NAME,
  FINISH_QUESTIONS_NAME,
  OPEN_NEXT_QUESTION_NAME,
  QuestionsActions,
  RESTART_QUESTIONS_NAME,
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
import { QuestionState } from '../enums';

export interface QuestionsState {
  readonly currentIndex: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly lastStartedTime?: number;
  readonly trainingCondition: {
    readonly rangeFrom: number;
    readonly rangeTo: number;
    readonly kimariji: number;
    readonly color: string;
    readonly kamiNoKuStyle: number;
    readonly shimoNoKuStyle: number;
  };
  readonly questionState?: QuestionState;
}

const initialState: QuestionsState = {
  answers: [],
  currentIndex: 0,
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
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
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
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions
      };
    case RESTART_QUESTIONS_NAME:
      return {
        ...state,
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState,
        questions: action.payload.questions
      };
    case ANSWER_QUESTION_NAME:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer],
        questionState: action.payload.nextState
      };
    case CONFIRM_CORRECT_NAME:
      return {
        ...state,
        questionState: action.payload.nextState
      };
    case OPEN_NEXT_QUESTION_NAME:
      return {
        ...state,
        currentIndex: action.payload.nextIndex,
        lastStartedTime: action.payload.startedTime,
        questionState: action.payload.nextState
      };
    case FINISH_QUESTIONS_NAME:
      return {
        ...state,
        questionState: action.payload.nextState
      };
    default:
      return state;
  }
};

export default trainingsReducer;
