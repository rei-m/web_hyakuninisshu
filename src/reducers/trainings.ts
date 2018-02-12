import {
  ANSWER_QUESTION_NAME,
  GO_TO_NEXT_QUESTION_NAME,
  START_TRAINING_NAME,
  TrainingActions
} from '../actions/trainings';
import { Answer, Question } from '../types';

export interface TrainingsState {
  readonly currentIndex: number;
  readonly questions: Question[];
  readonly answers: Answer[];
  readonly lastStartedTime?: number;
}

const initialState: TrainingsState = {
  answers: [],
  currentIndex: 0,
  questions: []
};

const trainingsReducer = (
  state = initialState,
  action: TrainingActions
): TrainingsState => {
  switch (action.type) {
    case START_TRAINING_NAME:
      return {
        answers: [],
        currentIndex: 0,
        lastStartedTime: action.payload.startedTime,
        questions: action.payload.questions
      };
    case ANSWER_QUESTION_NAME:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer]
      };
    case GO_TO_NEXT_QUESTION_NAME:
      return {
        ...state,
        currentIndex: action.payload.nextIndex
      };
    default:
      return state;
  }
};

export default trainingsReducer;
