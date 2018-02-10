import { START_TRAINING_NAME, TrainingActions } from '../actions/trainings';
import { Question } from '../types';

export interface TrainingsState {
  readonly questions: Question[];
  readonly lastStartedTime?: number;
}

const initialState: TrainingsState = {
  questions: []
};

const trainingsReducer = (
  state = initialState,
  action: TrainingActions
): TrainingsState => {
  switch (action.type) {
    case START_TRAINING_NAME:
      return {
        lastStartedTime: action.payload.startedTime,
        questions: action.payload.questions
      };
    default:
      return state;
  }
};

export default trainingsReducer;
