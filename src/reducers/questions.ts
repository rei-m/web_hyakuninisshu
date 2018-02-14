import {
  ANSWER_QUESTION_NAME,
  GO_TO_CORRECT_NAME,
  GO_TO_NEXT_QUESTION_NAME,
  QuestionsActions,
  START_EXAM_NAME,
  START_TRAINING_NAME
} from '../actions/questions';
import { Answer, Question } from '../types';

export interface QuestionsState {
  readonly currentIndex: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly currentPage: number;
  readonly lastStartedTime?: number;
}

const initialState: QuestionsState = {
  answers: [],
  currentIndex: 0,
  currentPage: 0,
  questions: []
};

const trainingsReducer = (
  state = initialState,
  action: QuestionsActions
): QuestionsState => {
  switch (action.type) {
    case START_TRAINING_NAME:
    case START_EXAM_NAME:
      return {
        answers: [],
        currentIndex: 0,
        currentPage: 0,
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
    default:
      return state;
  }
};

export default trainingsReducer;
